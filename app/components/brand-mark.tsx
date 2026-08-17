import { useId } from "react";
import { cn } from "~/lib/utils";

/**
 * The two-figure mark from the brand kit (`brand/svg/splitpocket-mark.svg`),
 * inlined rather than loaded as an image so it costs no request and flips
 * with the theme in the same paint as everything else — the gradient stops
 * read `--logo-1..4`, which `.theme-dark` overrides.
 *
 * The wordmark stays live text: it's Bricolage Grotesque 700, already loaded
 * for the headings, and "split" / "pocket" take the two-tone treatment the
 * kit specifies.
 */
export function BrandMark({
  withWordmark = false,
  className,
}: {
  withWordmark?: boolean;
  className?: string;
}) {
  // Two BrandMarks render per page (nav and footer); duplicate gradient ids
  // would be invalid and let one instance paint from the other's defs.
  const id = useId();

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 60 64"
        // 60:64 aspect; 28px tall matches the wordmark's cap height.
        width="26.25"
        height="28"
        className="shrink-0"
        role="img"
        aria-label="SplitPocket"
      >
        <defs>
          <linearGradient
            id={`${id}-a`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="27.7"
            y2="64"
          >
            <stop offset="0" stopColor="var(--logo-1)" />
            <stop offset="1" stopColor="var(--logo-2)" />
          </linearGradient>
          <linearGradient
            id={`${id}-b`}
            gradientUnits="userSpaceOnUse"
            x1="32.3"
            y1="0"
            x2="60"
            y2="64"
          >
            <stop offset="0" stopColor="var(--logo-3)" />
            <stop offset="1" stopColor="var(--logo-4)" />
          </linearGradient>
        </defs>
        <g fill={`url(#${id}-a)`}>
          <circle cx="10.72" cy="7" r="7" />
          <path d="M0 18 H8.2 C16.97 18 27.7 27.08 27.7 34.51 V64 C12.46 64 0 53.88 0 41.51 Z" />
        </g>
        <g fill={`url(#${id}-b)`}>
          <circle cx="49.28" cy="7" r="7" />
          <path d="M60 18 H51.8 C43.03 18 32.3 27.08 32.3 34.51 V64 C47.53 64 60 53.88 60 41.51 Z" />
        </g>
      </svg>
      {withWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight">
          split<span className="text-primary">pocket</span>
        </span>
      )}
    </span>
  );
}
