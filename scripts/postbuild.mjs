/**
 * Copies the prerendered build into docs/ for GitHub Pages (branch /docs
 * publishing) and adds the Pages plumbing the build itself doesn't know
 * about: CNAME, .nojekyll, a root-level 404.html, and sitemap.xml.
 *
 * The sitemap is derived from the prerendered output itself, so a new route
 * can never be missing from it. llms.txt is not written here: it lives in
 * public/ (see scripts/llms.mjs) so the dev server serves it too.
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";

const SRC = "build/client";
const DEST = "docs";
const SITE = "https://splitpocket.app";

if (!existsSync(`${SRC}/index.html`)) {
  throw new Error(`${SRC}/index.html missing. Did the prerender run?`);
}

rmSync(DEST, { recursive: true, force: true });
cpSync(SRC, DEST, { recursive: true });

// Every route is prerendered and Pages serves 404.html for unknown paths,
// so the SPA fallback shell is dead weight.
rmSync(`${DEST}/__spa-fallback.html`, { force: true });

// Keep the custom domain and raw file serving across every push.
writeFileSync(`${DEST}/CNAME`, "splitpocket.app\n");
writeFileSync(`${DEST}/.nojekyll`, "");

// GitHub Pages serves /404.html for unknown paths.
if (existsSync(`${DEST}/404/index.html`)) {
  copyFileSync(`${DEST}/404/index.html`, `${DEST}/404.html`);
} else {
  throw new Error("404/index.html missing from prerender output");
}

// Guard: never ship an empty shell.
const home = readFileSync(`${DEST}/index.html`, "utf8");
if (!home.includes("<h1") || !home.includes("SplitPocket")) {
  throw new Error("docs/index.html has no real content. Prerender broken?");
}

const { posts } = JSON.parse(readFileSync("app/content/posts.json", "utf8"));
posts.sort((a, b) => b.date.localeCompare(a.date));

for (const page of [
  "features",
  "groups",
  "privacy",
  "terms",
  "delete-account",
  "compare",
  "blog",
]) {
  if (!existsSync(`${DEST}/${page}/index.html`)) {
    throw new Error(`docs/${page}/index.html missing from prerender output`);
  }
}
for (const post of posts) {
  const file = `${DEST}/blog/${post.slug}/index.html`;
  if (!existsSync(file)) {
    throw new Error(`${file} missing. Is the route registered in app/routes.ts?`);
  }
  if (!readFileSync(file, "utf8").includes("<h1")) {
    throw new Error(`${file} prerendered without a heading`);
  }
  // Each post points og:image at its own card; a missing file would ship a
  // broken share preview that nothing else would catch.
  if (!existsSync(`${DEST}/og/blog/${post.slug}.png`)) {
    throw new Error(
      `${DEST}/og/blog/${post.slug}.png missing. Run: node scripts/og-image.mjs`,
    );
  }
}
for (const card of ["og-default", "blog", "compare", "features", "groups"]) {
  if (!existsSync(`${DEST}/og/${card}.png`)) {
    throw new Error(`${DEST}/og/${card}.png missing. Run: node scripts/og-image.mjs`);
  }
}
// Comes from public/ via scripts/llms.mjs, which `npm run build` runs first.
if (!existsSync(`${DEST}/llms.txt`)) {
  throw new Error(`${DEST}/llms.txt missing. Run: node scripts/llms.mjs`);
}

// --- closing CTA -----------------------------------------------------------
// Each page hashes its own path into the pool in app/content/cta.ts, so two
// pages can collide on the same sign-off without anyone noticing. Warn rather
// than throw: it's cosmetic, and the fix is to add a line to the pool.
const ctas = new Map();
for (const page of ["", "features", "groups", "compare", "blog"]) {
  const html = readFileSync(`${DEST}/${page}/index.html`.replace("//", "/"), "utf8");
  const match = html.match(/<section class="bg-primary[^"]*">.*?<h2[^>]*>([^<]+)</);
  if (!match) throw new Error(`No closing CTA found on /${page}`);
  ctas.set(page || "home", match[1]);
}
const dupes = [...ctas].filter(
  ([, cta], _i, all) => all.filter(([, other]) => other === cta).length > 1,
);
if (dupes.length) {
  console.warn(
    `⚠ Duplicate closing CTAs: ${dupes.map(([p, c]) => `${p} → "${c}"`).join(", ")}. ` +
      `Add a line to app/content/cta.ts to break the tie.`,
  );
}

/** Every prerendered page, as a site-absolute path with a trailing slash. */
function collectPaths(dir = DEST, prefix = "/") {
  const paths = [];
  if (existsSync(`${dir}/index.html`)) paths.push(prefix);
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // assets/ is hashed JS and CSS; 404 must never be indexed.
    if (entry.name === "assets" || entry.name === "404") continue;
    paths.push(...collectPaths(`${dir}/${entry.name}`, `${prefix}${entry.name}/`));
  }
  return paths;
}

// --- sitemap.xml -----------------------------------------------------------
// Derived from the prerendered pages themselves, so a new route can never be
// missing from it. Written to BOTH docs/ (what Pages serves) and public/ (so
// the dev server serves it too, like robots.txt and llms.txt) — public/ is a
// build behind until the next build, which is fine for a dev-only copy.
const lastmod = new Map(posts.map((p) => [`/blog/${p.slug}/`, p.date]));
const paths = collectPaths().sort((a, b) => a.localeCompare(b));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => {
    const date = lastmod.get(path);
    return `  <url>
    <loc>${SITE}${path}</loc>${date ? `\n    <lastmod>${date}</lastmod>` : ""}
  </url>`;
  })
  .join("\n")}
</urlset>
`;
writeFileSync(`${DEST}/sitemap.xml`, sitemap);
writeFileSync("public/sitemap.xml", sitemap);

console.log(
  `docs/ ready for GitHub Pages: ${paths.length} pages, ${posts.length} blog posts, sitemap.xml written`,
);
