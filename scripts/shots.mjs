/**
 * Captures real app screenshots for the marketing site from the local app
 * (frontend on :5173, backend on :8000, seeded via seed-demo.mjs).
 *
 *   node scripts/shots.mjs <goa-trip-group-id>
 *
 * PNG masters → assets/raw/app/ (gitignored), then sharp converts to WebP
 * q85 in public/screenshots/.
 */
import { chromium } from "playwright";
import { mkdirSync, readdirSync } from "node:fs";
import sharp from "sharp";

const GOA_ID = process.argv[2];
if (!GOA_ID) throw new Error("usage: node scripts/shots.mjs <goa-group-id>");

const APP = "http://localhost:5173";
const RAW = "assets/raw/app";
const OUT = "public/screenshots";
mkdirSync(RAW, { recursive: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// Log in once, keep the session.
const loginPage = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  locale: "en-IN",
});
await loginPage.goto(`${APP}/auth/sign-in`, { waitUntil: "networkidle" });
await loginPage.getByLabel(/email/i).fill("demo@splitpocket.app");
await loginPage.getByLabel(/password/i).fill(process.env.DEMO_PASSWORD ?? "");
await loginPage.getByRole("button", { name: /sign in/i }).click();
await loginPage.waitForURL(`${APP}/`, { timeout: 20000 });
await loginPage.waitForTimeout(1500);
const storageState = await loginPage.context().storageState();
await loginPage.close();
console.log("signed in");

async function shot(name, { width, height, path, theme = "light", prepare }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    storageState,
    colorScheme: theme,
    locale: "en-IN",
  });
  const page = await context.newPage();
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
  await page.goto(`${APP}${path}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  if (prepare) await prepare(page);
  await page.screenshot({ path: `${RAW}/${name}.png` });
  await context.close();
  console.log(`${name}.png`);
}

const phone = { width: 390, height: 844 };
const desktop = { width: 1440, height: 900 };

await shot("dashboard-desktop", { ...desktop, path: "/" });
await shot("dark-desktop", { ...desktop, path: "/", theme: "dark" });
await shot("dashboard-phone", { ...phone, path: "/" });
await shot("reports-phone", { ...phone, path: "/reports" });
await shot("group-desktop", { ...desktop, path: `/groups/${GOA_ID}` });

await shot("add-expense-phone", {
  ...phone,
  path: "/",
  prepare: async (page) => {
    await page.getByRole("button", { name: /add expense/i }).first().click();
    await page.waitForTimeout(900);
  },
});

await shot("balances-phone", {
  ...phone,
  path: `/groups/${GOA_ID}`,
  prepare: async (page) => {
    await page.getByText(/balances/i).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  },
});

await shot("settlement-phone", {
  ...phone,
  path: `/groups/${GOA_ID}`,
  prepare: async (page) => {
    await page.getByRole("button", { name: /record/i }).first().click();
    await page.waitForTimeout(900);
  },
});

await browser.close();

// Convert masters to WebP.
for (const file of readdirSync(RAW).filter((f) => f.endsWith(".png"))) {
  const out = `${OUT}/${file.replace(".png", ".webp")}`;
  await sharp(`${RAW}/${file}`).webp({ quality: 85 }).toFile(out);
  console.log(out);
}
console.log("done");
