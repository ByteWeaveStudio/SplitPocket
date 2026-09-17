/**
 * Writes public/llms.txt: the whole site as one plain-text index, for agents
 * that would rather read a list than crawl. Format follows the llms.txt
 * convention.
 *
 * It lives in public/ rather than being generated after the build so that
 * the dev server serves it too — same as robots.txt. `npm run build` runs
 * this first; run it by hand after editing app/content/posts.json:
 *
 *   node scripts/llms.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://splitpocket.app";
const { posts } = JSON.parse(readFileSync("app/content/posts.json", "utf8"));
posts.sort((a, b) => b.date.localeCompare(a.date));

writeFileSync(
  "public/llms.txt",
  `# SplitPocket

> One app for both halves of your money: track what you spend and earn on
> your own, and split what you share. Create groups, split equally, by exact
> amounts or by percentage, see who owes whom, and settle up with the fewest
> payments. Works offline, syncs when you're back, no ads, no data selling.

## Product

- [Home](${SITE}/): what SplitPocket is, in short, with links to the detail.
- [Features](${SITE}/features/): every feature, grouped: personal ledger, groups and splitting, automation, and data.
- [Groups](${SITE}/groups/): how group splitting works, the three split methods, and simplified settle-up.
- [Comparison](${SITE}/compare/): SplitPocket vs Splitwise, Tricount and Settle Up, row by row, with an FAQ.

## Blog

${posts
  .map((post) => `- [${post.title}](${SITE}/blog/${post.slug}/): ${post.description}`)
  .join("\n")}

## Legal

- [Privacy policy](${SITE}/privacy/): what data is stored, what is never done with it.
- [Terms](${SITE}/terms/): terms of use.
- [Delete your account](${SITE}/delete-account/): how to delete a SplitPocket account, what is erased and what is kept.

## Index

- [Sitemap](${SITE}/sitemap.xml)
`,
);

console.log(`public/llms.txt written (${posts.length} posts)`);
