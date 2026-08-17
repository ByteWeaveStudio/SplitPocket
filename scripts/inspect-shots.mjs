/**
 * Inspection captures of the site itself (not the app). Serves nothing —
 * expects `npm run preview` (sirv on :4173) to be running. Outputs PNGs to
 * assets/raw/site-inspect/ (gitignored).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "assets/raw/site-inspect";
mkdirSync(OUT, { recursive: true });

const base = "http://localhost:4173";
const browser = await chromium.launch();

async function capture(name, { width, height, path = "/", fullPage = true, theme = "light", interact }) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  // Theme is class-driven with light as default; the head script restores it.
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  if (fullPage) {
    // Walk the page so lazy images load before the stitched capture,
    // then wait until every image has actually decoded.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await Promise.all(
        [...document.images].map((img) =>
          img.complete ? undefined : new Promise((r) => (img.onload = img.onerror = r)),
        ),
      );
    });
    await page.waitForTimeout(400);
  }
  if (interact) await interact(page);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
  await page.close();
  console.log(`${name}.png`);
}

await capture("home-desktop-full", { width: 1440, height: 900 });
await capture("home-mobile-full", { width: 390, height: 844 });
await capture("home-desktop-hero", { width: 1440, height: 900, fullPage: false });
await capture("home-desktop-dark", { width: 1440, height: 900, theme: "dark" });
await capture("privacy-desktop", { width: 1440, height: 900, path: "/privacy/" });

// Hydration can lag the static HTML: retry the mode click until its input shows.
async function switchMode(page, mode, probeLabel) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await page.getByRole("button", { name: mode }).click();
    try {
      await page.getByLabel(probeLabel).waitFor({ timeout: 2000 });
      return;
    } catch {
      await page.waitForTimeout(500);
    }
  }
  throw new Error(`mode ${mode} never activated`);
}

// Split demo interactions: switch to Amounts (mismatch state), then Percent.
await capture("split-demo-amounts", {
  width: 1440,
  height: 900,
  fullPage: false,
  interact: async (page) => {
    await page.locator("#groups").scrollIntoViewIfNeeded();
    await switchMode(page, "Amounts", "Amount for Priya");
    await page.getByLabel("Amount for Priya").fill("900");
    await page.waitForTimeout(300);
    await page.locator("#groups").screenshot({ path: `${OUT}/split-demo-amounts-crop.png` });
  },
});
await capture("split-demo-percent", {
  width: 1440,
  height: 900,
  fullPage: false,
  interact: async (page) => {
    await page.locator("#groups").scrollIntoViewIfNeeded();
    await switchMode(page, "Percent", "Percentage for You");
    await page.getByLabel("Percentage for You").fill("40");
    await page.getByLabel("Percentage for Priya").fill("30");
    await page.getByLabel("Percentage for Arjun").fill("20");
    await page.getByLabel("Percentage for Sam").fill("10");
    await page.waitForTimeout(300);
    await page.locator("#groups").screenshot({ path: `${OUT}/split-demo-percent-crop.png` });
  },
});

await browser.close();
console.log("done");
