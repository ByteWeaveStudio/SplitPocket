/**
 * Renders every OG card (1200×630) into public/og/ from inline HTML set in
 * the brand's own faces and palette: the default card, one for the blog
 * index, one for the comparison page, and one per blog post (titles read
 * from app/content/posts.json). Re-run whenever a headline, a post title or
 * the brand changes:
 *
 *   node scripts/og-image.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

mkdirSync("public/og/blog", { recursive: true });

const font = (pkg, file) =>
  `file://${resolve(`node_modules/@fontsource-variable/${pkg}/files/${file}`)}`;

const CSS = `
  @font-face {
    font-family: "Bricolage Grotesque";
    src: url("${font("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2")}") format("woff2");
    font-weight: 200 800;
  }
  @font-face {
    font-family: "Geist Mono";
    src: url("${font("geist-mono", "geist-mono-latin-wght-normal.woff2")}") format("woff2");
    font-weight: 100 900;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #faf9f6;
    font-family: "Bricolage Grotesque", sans-serif;
    color: #0d130f;
    padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .brand { display: flex; align-items: center; gap: 18px; }
  .mark { display: block; }
  .word { font-size: 34px; font-weight: 700; letter-spacing: -0.02em; }
  .word .pocket { color: #007654; }
  .kicker {
    font-family: "Geist Mono", monospace; font-size: 22px;
    letter-spacing: 0.04em; text-transform: uppercase; color: #5d665f;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 78px; font-weight: 650; letter-spacing: -0.025em;
    line-height: 1.04; max-width: 980px;
  }
  h1.long { font-size: 60px; line-height: 1.08; max-width: 1010px; }
  .ledger {
    font-family: "Geist Mono", monospace; font-size: 24px;
    letter-spacing: -0.02em; font-variant-numeric: tabular-nums;
    color: #5d665f; display: flex; gap: 28px; align-items: baseline;
  }
  .ledger .settled { color: #007750; }
  .rule { position: absolute; left: 80px; right: 80px; height: 1px; background: #e0e2dc; }
`;

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The kit's two-figure mark, light-background stops (brand/README.md). */
const MARK = `<svg class="mark" viewBox="0 0 60 64" width="53" height="56" aria-hidden>
  <defs>
    <linearGradient id="ma" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="27.7" y2="64">
      <stop offset="0" stop-color="#2bcb96"/><stop offset="1" stop-color="#0baa7c"/>
    </linearGradient>
    <linearGradient id="mb" gradientUnits="userSpaceOnUse" x1="32.3" y1="0" x2="60" y2="64">
      <stop offset="0" stop-color="#008f67"/><stop offset="1" stop-color="#007654"/>
    </linearGradient>
  </defs>
  <g fill="url(#ma)">
    <circle cx="10.72" cy="7" r="7"/>
    <path d="M0 18 H8.2 C16.97 18 27.7 27.08 27.7 34.51 V64 C12.46 64 0 53.88 0 41.51 Z"/>
  </g>
  <g fill="url(#mb)">
    <circle cx="49.28" cy="7" r="7"/>
    <path d="M60 18 H51.8 C43.03 18 32.3 27.08 32.3 34.51 V64 C47.53 64 60 53.88 60 41.51 Z"/>
  </g>
</svg>`;

/** One card: brand lockup, optional kicker, headline, ruled mono footer. */
function card({ kicker, title, footer }) {
  const long = title.length > 44;
  return `<!doctype html>
<html><head><style>${CSS}</style></head>
<body>
  <div class="brand">${MARK}<div class="word">split<span class="pocket">pocket</span></div></div>
  <div>
    ${kicker ? `<div class="kicker">${escape(kicker)}</div>` : ""}
    <h1${long ? ' class="long"' : ""}>${escape(title)}</h1>
  </div>
  <div class="rule" style="bottom: 150px"></div>
  <div class="ledger">${footer}</div>
</body></html>`;
}

const mono = (parts) => parts.join('<span>·</span>');

const { posts } = JSON.parse(readFileSync("app/content/posts.json", "utf8"));
const month = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const CARDS = [
  {
    file: "public/og/og-default.png",
    html: card({
      title: "Know where your money went. Split what you shared.",
      footer: mono([
        "<span>₹4,320.00</span>",
        "<span>split 4 ways</span>",
        "<span>₹1,080.00 each</span>",
        '<span class="settled">settled ✓</span>',
      ]),
    }),
  },
  {
    file: "public/og/blog.png",
    html: card({
      kicker: "Blog",
      title: "Notes on money you share.",
      footer: mono([
        `<span>${posts.length} guides</span>`,
        "<span>splitting · budgets · trips</span>",
        '<span class="settled">the math reconciles</span>',
      ]),
    }),
  },
  {
    file: "public/og/features.png",
    html: card({
      kicker: "Features",
      title: "Everything, included.",
      footer: mono([
        "<span>track · split · settle</span>",
        "<span>no tiers</span>",
        '<span class="settled">nothing held back</span>',
      ]),
    }),
  },
  {
    file: "public/og/groups.png",
    html: card({
      kicker: "Groups",
      title: "Split it fairly. Settle it once.",
      footer: mono([
        "<span>equally · by amount · by percent</span>",
        '<span class="settled">fewest payments</span>',
      ]),
    }),
  },
  {
    file: "public/og/compare.png",
    html: card({
      kicker: "Compare",
      title: "SplitPocket vs Splitwise, Tricount and Settle Up.",
      footer: mono([
        "<span>both halves of your money</span>",
        "<span>offline</span>",
        '<span class="settled">no ads</span>',
      ]),
    }),
  },
  ...posts.map((post) => ({
    file: `public/og/blog/${post.slug}.png`,
    html: card({
      kicker: post.topic,
      title: post.title,
      footer: mono([
        `<span>${month(post.date)}</span>`,
        `<span>${post.minutes} min read</span>`,
        '<span class="settled">splitpocket.app</span>',
      ]),
    }),
  })),
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const { file, html } of CARDS) {
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // These cards are flat brand colours and text, so an indexed palette is
  // lossless to the eye and about a third of the size. They are committed
  // to the repo, so the saving is worth the extra second here.
  const shot = await page.screenshot();
  await sharp(shot).png({ palette: true, effort: 10 }).toFile(file);
}
await browser.close();
console.log(`${CARDS.length} OG cards written to public/og/`);
