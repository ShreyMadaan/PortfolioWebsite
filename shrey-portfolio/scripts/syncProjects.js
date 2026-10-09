import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import captureProjectPreview from "./captureProjectPreview.js";


const GITHUB_USERNAME = "ShreyMadaan";
const githubToken = process.env.GITHUB_TOKEN;

const API_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(
    __dirname,
    "../src/data/projects.json"
);

// ==============================
// TECHNOLOGY MAPPING
// ==============================

const technologyMap = {
    java: "Java",
    javascript: "JavaScript",
    typescript: "TypeScript",

    react: "React",
    redux: "Redux",
    "redux-toolkit": "Redux Toolkit",

    "spring-boot": "Spring Boot",
    spring: "Spring",

    mysql: "MySQL",
    sql: "SQL",
    mongodb: "MongoDB",

    html: "HTML",
    css: "CSS",
    tailwind: "Tailwind CSS",

    vite: "Vite",
    maven: "Maven",
    docker: "Docker",

    "node-js": "Node.js",
    nodejs: "Node.js",
    express: "Express",

    "tmdb-api": "TMDB API",
    ai: "AI",

    dsa: "DSA",
    cli: "CLI",
};


// ==============================
// CATEGORY MAPPING
// ==============================

const categoryMap = {
    frontend: "Frontend",
    backend: "Backend",
    "full-stack": "Full Stack",
    java: "Java",
};


// ==============================
// TRANSFORM GITHUB REPOSITORY
// ==============================


async function transformRepository(repository) {
    const technologies = [];

    // GitHub automatically detects the primary language
    if (repository.language) {
        technologies.push(repository.language);
    }

    // Convert GitHub topics into technologies
    repository.topics.forEach((topic) => {
        const technology = technologyMap[topic];

        if (
            technology &&
            !technologies.includes(technology)
        ) {
            technologies.push(technology);
        }
    });

    // Convert GitHub topics into categories
    const categories = repository.topics
        .filter((topic) => categoryMap[topic])
        .map((topic) => categoryMap[topic]);

    const projectId = repository.name.toLowerCase();

    let image = null;
    let imageSource = null;

    // Priority 1: Use a manually provided repository preview.
    const previewImageUrl =
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repository.name}/${repository.default_branch}/portfolio-preview.png`;

    try {
        const previewResponse = await fetch(previewImageUrl, {
            method: "HEAD",
        });

        if (previewResponse.ok) {
            image = previewImageUrl;
            imageSource = "repository";
        }
    } catch (error) {
        console.warn(
            `Could not check repository preview for ${repository.name}:`,
            error.message
        );
    }

    // Priority 2: Capture the live website if no manual preview exists.
    if (!image && repository.homepage?.trim()) {
        const liveURL = repository.homepage.trim();

        try {
            const parsedURL = new URL(liveURL);

            if (
                parsedURL.protocol === "https:" ||
                parsedURL.protocol === "http:"
            ) {
                const screenshotFileName = `${projectId}.png`;

                const screenshotPath = path.join(
                    process.cwd(),
                    "public",
                    "generated",
                    "projects",
                    screenshotFileName
                );

                // Reuse an existing screenshot instead of regenerating it.
                if (fs.existsSync(screenshotPath)) {
                    console.log(
                        `Using cached screenshot for ${repository.name}`
                    );

                    image = `/generated/projects/${screenshotFileName}`;
                    imageSource = "screenshot";
                } else {
                    const capturedPath = await captureProjectPreview(
                        liveURL,
                        projectId
                    );

                    if (capturedPath) {
                        image = `/generated/projects/${screenshotFileName}`;
                        imageSource = "screenshot";
                    }
                }
            }
        } catch (error) {
            console.warn(
                `Skipping live preview for ${repository.name}:`,
                error.message
            );
        }
    }

    // Priority 3: AI-generated preview (future milestone).

    return {
        id: projectId,

        title: repository.name,

        description: repository.description || "",

        categories,

        technologies,

        github: repository.html_url,

        live: repository.homepage || null,

        image,

        imageSource,
    };
}



// ==============================
// SYNC PROJECTS
// ==============================

async function syncProjects() {
    try {
        console.log("Fetching GitHub repositories...");

        const response = await fetch(API_URL, {
            headers: {
                Accept: "application/vnd.github+json",
                ...(githubToken && {
                    Authorization: `Bearer ${githubToken}`,
                }),
            },
        });

        if (!response.ok) {
            throw new Error(
                `GitHub API request failed: ${response.status}`
            );
        }

        const repositories = await response.json();

        console.log(
            `Found ${repositories.length} public repositories.`
        );


        // ==============================
        // FILTER PORTFOLIO REPOSITORIES
        // ==============================

        const portfolioRepositories =
            repositories.filter((repository) =>
                repository.topics.includes("portfolio")
            );

        console.log(
            `Found ${portfolioRepositories.length} portfolio repositories.`
        );


        // ==============================
        // DISPLAY RAW GITHUB DATA
        // ==============================

        portfolioRepositories.forEach(
            (repository) => {
                console.log("----------------------------");

                console.log(
                    `Name: ${repository.name}`
                );

                console.log(
                    `Description: ${repository.description}`
                );

                console.log(
                    `Language: ${repository.language}`
                );

                console.log(
                    `Topics: ${repository.topics.join(", ")}`
                );

                console.log(
                    `GitHub: ${repository.html_url}`
                );

                console.log(
                    `Live: ${repository.homepage ||
                    "Not deployed"
                    }`
                );
            }
        );


        // ==============================
        // TRANSFORM DATA
        // ==============================

        const portfolioProjects = await Promise.all(
            portfolioRepositories.map(
                transformRepository
            )
        );


        // ==============================
        // DISPLAY GENERATED DATA
        // ==============================

        fs.writeFileSync(
            OUTPUT_FILE,
            JSON.stringify(portfolioProjects, null, 2) + "\n",
            "utf8"
        );

        console.log(
            "\nSuccessfully generated src/data/projects.json"
        );

        console.log("\nGenerated portfolio data:");

        console.log(
            JSON.stringify(
                portfolioProjects,
                null,
                2
            )
        );

    } catch (error) {
        console.error("Project sync failed:");
        console.error(error);
    }
}

syncProjects();