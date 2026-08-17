/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Row classes for the site's ruled lists: a hairline *between* rows, never
 * above the first or below the last. The rule therefore lives on each row's
 * top edge, and the whole first row opts out.
 *
 * Keyed by the number of columns the list reaches at its widest, because that
 * is how many rows make up the first row — and by the breakpoint each list
 * widens at, which is `md` for two columns and `lg` for three throughout.
 *
 * Every class is written out in full rather than composed, so Tailwind's
 * scanner sees each one as a literal in the source.
 */
export const ruledRow = {
  1: "border-t border-border first:border-t-0",
  2: "border-t border-border first:border-t-0 md:[&:nth-child(-n+2)]:border-t-0",
  3: "border-t border-border first:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0",
} as const;
