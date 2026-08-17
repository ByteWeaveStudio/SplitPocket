import { cn } from "~/lib/utils";

/** Anchor styled as the product's primary/secondary action. */
export function CtaLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "onEmerald";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        variant === "primary" &&
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        variant === "secondary" &&
          "border border-border bg-card text-foreground hover:bg-secondary",
        variant === "onEmerald" &&
          "bg-background text-foreground shadow-sm hover:bg-background/90",
        className,
      )}
    >
      {children}
    </a>
  );
}
