import { cn } from "~/lib/utils";

/**
 * CSS-only device frames around real app screenshots, so captures stay
 * re-shootable without any compositing. Until the screenshot pipeline runs,
 * `src` may be omitted and a neutral labeled placeholder renders instead —
 * never fabricated UI.
 */

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="flex size-full items-center justify-center bg-muted"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent 0 14px, color-mix(in oklch, var(--border) 45%, transparent) 14px 15px)",
      }}
    >
      <span className="money rounded-md bg-background/90 px-2.5 py-1 text-[11px] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function BrowserFrame({
  src,
  srcSet,
  sizes,
  alt,
  width = 1440,
  height = 900,
  className,
  fetchPriority,
  loading = "lazy",
}: {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fetchPriority?: "high";
  loading?: "lazy" | "eager";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/5",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-2 border-b border-border bg-secondary/60 px-3.5">
        {/* macOS traffic lights, canonical colors */}
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full border border-black/10 bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full border border-black/10 bg-[#febc2e]" />
          <span className="size-2.5 rounded-full border border-black/10 bg-[#28c840]" />
        </span>
        <span className="money ml-2 rounded-md bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
          my.splitpocket.app
        </span>
      </div>
      <div className="aspect-[16/10]">
        {src ? (
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchPriority={fetchPriority}
            className="size-full object-cover object-top"
          />
        ) : (
          <Placeholder label="app screenshot" />
        )}
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  width = 390,
  height = 844,
  className,
  loading = "lazy",
}: {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <div
      className={cn(
        "rounded-[2.25rem] border border-border bg-card p-2 shadow-xl shadow-foreground/10",
        className,
      )}
    >
      <div className="aspect-[390/844] overflow-hidden rounded-[1.75rem] border border-border/60">
        {src ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            className="size-full object-cover object-top"
          />
        ) : (
          <Placeholder label="app screenshot" />
        )}
      </div>
    </div>
  );
}
