/**
 * The closing pitch, in ten versions.
 *
 * Each page draws one from this pool, so nobody walking the site reads the
 * same sign-off twice. The pick is derived from the page's own path rather
 * than from `Math.random()`: every route here is prerendered to static HTML,
 * so a real per-render roll would produce one headline in the file on disk
 * and a different one on hydration — React would swap the text under the
 * reader on first paint. Hashing the path is arbitrary enough to read as
 * random, and it stays put.
 *
 * Adding a page picks up a line automatically; adding a line reshuffles the
 * set. `scripts/postbuild.mjs` warns if two pages land on the same headline.
 */
export type Cta = {
  title: string;
  body: string;
  /** Optional mono line, in the ledger treatment. */
  ledger?: string;
};

export const CTAS: Cta[] = [
  {
    title: "Start your ledger.",
    body: "It takes under a minute.",
    ledger: "₹0.00 left over, every time.",
  },
  {
    title: "Try it on the next dinner.",
    body: "One group, one expense, one settle-up. That's the whole test.",
    ledger: "₹4,320.00 · split 4 ways · settled",
  },
  {
    title: "Nobody likes being the bank.",
    body: "Log it, split it, and let the app do the chasing.",
  },
  {
    title: "Settle the trip you got back from.",
    body: "Then never think about it again.",
    ledger: "8 debts → 3 payments",
  },
  {
    title: "Stop doing this in a spreadsheet.",
    body: "Two taps beats a formula, and everyone sees it update.",
  },
  {
    title: "Log one expense.",
    body: "That's the entire trial. If it isn't faster than what you use now, you've lost a minute.",
    ledger: "amount · description · done",
  },
  {
    title: "Find out where the month went.",
    body: "One report, by category, from your very first month in.",
  },
  {
    title: "Rent is due again soon.",
    body: "Set it up once and stop being the person who reminds everyone.",
    ledger: "recurring · splits itself · every month",
  },
  {
    title: "Both halves of your money.",
    body: "What you share and what you don't, in one place, from the first entry.",
  },
  {
    title: "Split the next bill properly.",
    body: "Equally, exactly, or by percent. It reconciles either way.",
    ledger: "₹4,320.00 ÷ 4 = ₹1,080.00",
  },
  {
    title: "Stop keeping score in your head.",
    body: "Log the expense, split it, settle up. You'll remember none of it, and that's the point.",
  },
];

/**
 * The pages that close with a CTA. A page's position here indexes into a
 * fixed shuffle of the pool, which is what guarantees five pages get five
 * *different* lines — hashing each path independently collided twice at this
 * pool size, and would again at any other. Anything not listed falls back to
 * the hash, so a new page still gets a line without touching this file.
 */
const PAGES = ["/", "/features", "/groups", "/compare", "/blog"];

/** FNV-1a. Small, stable, and identical in Node and the browser. */
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * A fixed permutation of the pool. Seeded Fisher-Yates rather than a stride,
 * so the guarantee survives adding or removing lines: any first N entries of
 * a permutation are distinct, whatever N and the pool size happen to be.
 */
function shuffle(n: number) {
  const order = Array.from({ length: n }, (_, i) => i);
  let seed = 0x9e3779b9;
  for (let i = n - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

const ORDER = shuffle(CTAS.length);

/**
 * The pool entry for a page. Trailing slashes are normalised away because the
 * prerender renders `/features` while Pages serves `/features/`, and the two
 * must resolve to the same line or the text would swap on hydration.
 */
export function ctaFor(path: string): Cta {
  const clean = path.replace(/\/+$/, "") || "/";
  const listed = PAGES.indexOf(clean);
  return CTAS[listed === -1 ? hash(clean) % CTAS.length : ORDER[listed]];
}
