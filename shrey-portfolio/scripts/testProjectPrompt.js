
import { fetchProjectReadme } from "./fetchProjectReadme.js";
import { buildProjectImagePrompt } from "./projectImagePrompt.js";
import projects from "../src/data/projects.json" with { type: "json" };

async function main() {
    const project = projects.find(
        (project) => project.id === "huffmancompressor"
    );

    if (!project) {
        throw new Error("HuffmanCompressor not found");
    }

    const repository = {
        name: project.title,
        full_name: "ShreyMadaan/HuffmanCompressor",
    };

    const readme = await fetchProjectReadme(repository);

    console.log("README fetched:", readme.length, "characters");

    const prompt = buildProjectImagePrompt(project, readme);

    console.log("\n=== GENERATED IMAGE PROMPT ===\n");
    console.log(prompt);

    // These checks must remain inside main()
    console.log("\nPrompt length:", prompt.length);

    if (prompt.length > 2048) {
        throw new Error("Image prompt exceeds model limit");
    }

    console.log("Prompt validation passed!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
