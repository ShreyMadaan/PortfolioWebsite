
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fetchProjectReadme } from "./fetchProjectReadme.js";
import { buildProjectImagePrompt } from "./projectImagePrompt.js";

import projects from "../src/data/projects.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MODEL = "@cf/black-forest-labs/flux-1-schnell";

const OUTPUT_DIRECTORY = path.resolve(
    __dirname,
    "../public/generated/projects"
);

async function generateProjectPreview(projectId) {
    // Restrict project IDs to safe filenames.
    if (!/^[a-z0-9-]+$/.test(projectId)) {
        throw new Error("Invalid project ID");
    }

    const project = projects.find(
        (item) => item.id === projectId
    );

    if (!project) {
        throw new Error(`Project not found: ${projectId}`);
    }

    const outputPath = path.join(
        OUTPUT_DIRECTORY,
        `${projectId}.jpg`
    );

    // Avoid spending inference quota unnecessarily.
    try {
        await fs.access(outputPath);
        console.log("Existing AI preview found. Skipping generation.");
        return outputPath;
    } catch {
        // No cached image exists.
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
        throw new Error("Cloudflare credentials are missing");
    }

    const repository = {
        name: project.title,
        full_name: `ShreyMadaan/${project.title}`,
    };

    console.log(`Fetching README for ${project.title}...`);

    const readme = await fetchProjectReadme(
        repository,
        process.env.GITHUB_TOKEN
    );

    const prompt = buildProjectImagePrompt(project, readme);

    if (!prompt || prompt.length > 2048) {
        throw new Error("Invalid image prompt length");
    }

    console.log(`Prompt ready (${prompt.length} characters)`);
    console.log(`Generating AI preview for ${project.title}...`);

    const endpoint =
        `https://api.cloudflare.com/client/v4/accounts/` +
        `${accountId}/ai/run/${MODEL}`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt,
            steps: 4,
        }),
        signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
            `Cloudflare API error (${response.status}): ` +
            errorBody.slice(0, 500)
        );
    }

    const data = await response.json();

    if (data.success === false) {
        throw new Error(
            `Cloudflare inference failed: ${JSON.stringify(data.errors)}`
        );
    }

    const base64Image = data.result?.image;

    if (!base64Image || typeof base64Image !== "string") {
        throw new Error("Cloudflare did not return an image");
    }

    const imageBuffer = Buffer.from(base64Image, "base64");

    // Check for JPEG file signature.
    if (
        imageBuffer.length < 4 ||
        imageBuffer[0] !== 0xff ||
        imageBuffer[1] !== 0xd8 ||
        imageBuffer[2] !== 0xff
    ) {
        throw new Error("Invalid JPEG response");
    }

    await fs.mkdir(OUTPUT_DIRECTORY, { recursive: true });

    // Exclusive write prevents accidentally overwriting an existing image.
    try {
        await fs.writeFile(outputPath, imageBuffer, { flag: "wx" });
    } catch (error) {
        if (error.code !== "EEXIST") throw error;
    }

    console.log(`AI preview saved: ${outputPath}`);

    return outputPath;
}

const projectId = process.argv[2];

if (!projectId) {
    console.error(
        "Usage: node scripts/generateProjectPreview.js <project-id>"
    );
    process.exitCode = 1;
} else {
    generateProjectPreview(projectId).catch((error) => {
        console.error("Generation failed:", error.message);
        process.exitCode = 1;
    });
}
