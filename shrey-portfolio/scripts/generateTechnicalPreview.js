
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths relative to this script, regardless of terminal location.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIRECTORY = path.resolve(
    __dirname,
    "../public/generated/projects"
);

export async function generateTechnicalPreview(projectId) {
    if (projectId !== "huffmancompressor") {
        throw new Error(`No technical template for ${projectId}`);
    }

    const width = 1600;
    const height = 900;

    // Generate illustrative frequency bars.
    const bars = [95, 150, 110, 210, 135, 175]
        .map((value, index) => `
            <rect
                x="${145 + index * 72}"
                y="${590 - value}"
                width="44"
                height="${value}"
                rx="8"
                fill="${index % 2 === 0 ? "#38bdf8" : "#818cf8"}"
            />
        `)
        .join("");

    // Huffman tree visualization.
    const nodes = [
        [870, 290],
        [740, 410],
        [1000, 410],
        [670, 540],
        [810, 540],
        [930, 540],
        [1070, 540],
    ];

    const edges = [
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4],
        [2, 5],
        [2, 6],
    ]
        .map(([a, b]) => `
            <line
                x1="${nodes[a][0]}"
                y1="${nodes[a][1]}"
                x2="${nodes[b][0]}"
                y2="${nodes[b][1]}"
                stroke="#38bdf8"
                stroke-width="5"
                opacity="0.75"
            />
        `)
        .join("");

    const circles = nodes
        .map(([x, y]) => `
            <circle
                cx="${x}"
                cy="${y}"
                r="22"
                fill="#12233e"
                stroke="#60a5fa"
                stroke-width="5"
            />
        `)
        .join("");

    // Build the complete SVG.
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${width}"
         height="${height}"
         viewBox="0 0 ${width} ${height}">

        <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#080e1c"/>
                <stop offset="100%" stop-color="#15243f"/>
            </linearGradient>
        </defs>

        <rect
            width="${width}"
            height="${height}"
            fill="url(#bg)"
        />

        <!-- Project heading -->
        <text
            x="100"
            y="120"
            font-family="Arial, sans-serif"
            font-size="64"
            font-weight="bold"
            fill="#f8fafc">
            Huffman Coding
        </text>

        <text
            x="100"
            y="175"
            font-family="Arial, sans-serif"
            font-size="30"
            fill="#94a3b8">
            Lossless File Compression
        </text>

        <!-- Frequency visualization -->
        <text
            x="145"
            y="310"
            font-family="Arial, sans-serif"
            font-size="32"
            fill="#e2e8f0">
            Byte Frequencies
        </text>

        ${bars}

        <!-- Huffman tree -->
        <text
            x="760"
            y="220"
            font-family="Arial, sans-serif"
            font-size="32"
            fill="#e2e8f0">
            Huffman Tree
        </text>

        ${edges}
        ${circles}

        <!-- Compressed archive -->
        <rect
            x="1240"
            y="360"
            width="250"
            height="220"
            rx="20"
            fill="#112d35"
            stroke="#34d399"
            stroke-width="5"
        />

        <text
            x="1365"
            y="460"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="46"
            fill="#6ee7b7">
            .huff
        </text>

        <text
            x="1365"
            y="510"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="26"
            fill="#a7f3d0">
            Archive
        </text>

        <!-- Processing pipeline -->
        <text
            x="800"
            y="790"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="28"
            fill="#93c5fd">
            Frequency Analysis → Tree Construction → Binary Encoding
        </text>

    </svg>`;

    // Ensure output directory exists.
    await fs.mkdir(OUTPUT_DIRECTORY, { recursive: true });

    const outputPath = path.join(
        OUTPUT_DIRECTORY,
        `${projectId}.svg`
    );

    // Read existing preview to detect changes.
    let existingContent = null;

    try {
        existingContent = await fs.readFile(outputPath, "utf8");
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }

    // Skip writing when content is identical.
    if (existingContent === svg) {
        console.log(`Technical preview unchanged: ${outputPath}`);
        return outputPath;
    }

    // Create or update the preview.
    await fs.writeFile(outputPath, svg, "utf8");

    console.log(`Technical preview saved: ${outputPath}`);

    return outputPath;
}

// Execute only when run directly, not when imported.
if (
    process.argv[1] &&
    path.resolve(process.argv[1]) === __filename
) {
    generateTechnicalPreview(process.argv[2]).catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
