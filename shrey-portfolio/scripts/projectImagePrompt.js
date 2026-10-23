
import { projectVisualConcepts } from "./projectVisualConcepts.js";

const MAX_PROMPT_LENGTH = 2048;

const categoryVisuals = {
    Java: "An intricate visualization of algorithms, data structures, and interconnected computing systems.",
    Backend: "A sophisticated server architecture with interconnected processing nodes and flowing data.",
    Frontend: "A polished digital experience with layered interactive surfaces and elegant visual depth.",
    Fullstack: "A connected ecosystem of frontend interfaces, backend services, and data processing.",
    AI: "An intelligent neural processing network with luminous connections and structured information flows.",
};

export function buildProjectImagePrompt(project, readme = "") {
    const projectId = String(project.id || "").toLowerCase();

    const visualConcept =
        projectVisualConcepts[projectId] ||
        (Array.isArray(project.categories)
            ? project.categories.map((category) => categoryVisuals[category])
                .find(Boolean)
            : null) ||
        "A distinctive technical visualization of a software engineering system.";

    const prompt = `
Create a sophisticated, photorealistic 3D technical illustration
for a premium software engineer portfolio.

PRIMARY VISUAL SCENE:
${visualConcept}

ART DIRECTION:
Near-black charcoal environment, electric blue and violet
lighting, intricate technical geometry, high-quality materials,
cinematic depth, clean composition, precise visual details.

COMPOSITION:
Wide landscape scene suitable for a 16:9 portfolio card.
Keep the important subject inside the central 70% of the image.
Leave generous margins for cropping.

IMPORTANT:
This is an illustration, not a title card, poster, dashboard,
website screenshot, or user interface.

ABSOLUTE RESTRICTIONS:
No text, letters, numbers, labels, titles, typography, logos,
watermarks, human faces, or generic light-streak backgrounds.
Do not write the project's name anywhere in the image.
`.trim();

    return prompt.slice(0, MAX_PROMPT_LENGTH);
}
