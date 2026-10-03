import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
    docker: "Docker",
    html: "HTML",
    css: "CSS",
    tailwind: "Tailwind CSS",
    vite: "Vite",
    "node-js": "Node.js",
    express: "Express",
    "tmdb-api": "TMDB API",
    ai: "AI",
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

function transformRepository(repository) {
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

    return {
        id: repository.name.toLowerCase(),

        title: repository.name,

        description:
            repository.description || "",

        categories,

        technologies,

        github: repository.html_url,

        live: repository.homepage || null,
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

        const portfolioProjects =
            portfolioRepositories.map(
                transformRepository
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