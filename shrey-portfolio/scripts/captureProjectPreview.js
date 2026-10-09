
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import validatePreviewUrl from "./validatePreviewUrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREVIEW_DIRECTORY = path.join(
  __dirname,
  "../public/generated/projects"
);

async function captureProjectPreview(url, projectId) {
  let browser;

  try {
    // Validate the initial website URL.
    if (!(await validatePreviewUrl(url))) {
      console.warn(`Blocked unsafe preview URL: ${url}`);
      return null;
    }

    // Only allow safe filenames.
    if (!/^[a-z0-9-]+$/.test(projectId)) {
      throw new Error("Invalid project ID");
    }

    fs.mkdirSync(PREVIEW_DIRECTORY, {
      recursive: true,
    });

    const outputPath = path.join(
      PREVIEW_DIRECTORY,
      `${projectId}.png`
    );

    console.log(`Capturing preview for ${projectId}...`);
    console.log(`URL: ${url}`);

    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      viewport: {
        width: 1600,
        height: 900,
      },
      deviceScaleFactor: 1,
      serviceWorkers: "block",
      acceptDownloads: false,
    });

    // Validate every request, including redirects and subresources.
    await context.route("**/*", async (route) => {
      const requestURL = route.request().url();

      // Browser-internal resources are not network requests.
      if (
        requestURL.startsWith("data:") ||
        requestURL.startsWith("blob:")
      ) {
        await route.continue();
        return;
      }

      if (!(await validatePreviewUrl(requestURL))) {
        console.warn(`Blocked browser request: ${requestURL}`);
        await route.abort();
        return;
      }

      await route.continue();
    });

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    await page.screenshot({
      path: outputPath,
      fullPage: false,
      animations: "disabled",
    });

    console.log(
      `Preview saved: public/generated/projects/${projectId}.png`
    );

    return outputPath;
  } catch (error) {
    console.error(
      `Could not capture preview for ${projectId}: ${error.message}`
    );

    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default captureProjectPreview;
