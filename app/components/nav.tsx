import { useLocation } from "react-router";
import { BrandMark } from "~/components/brand-mark";
import { CtaLink } from "~/components/cta-link";
import { ThemeToggle } from "~/components/theme-toggle";
import { cn } from "~/lib/utils";
import { SIGN_IN_URL, SIGN_UP_URL } from "~/lib/urls";

/**
 * Pages only. An in-page anchor here would scroll on one route and navigate
 * on every other, which is two behaviours for one control.
 */
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/features/", label: "Features" },
  { href: "/groups/", label: "Groups" },
  { href: "/compare/", label: "Compare" },
  { href: "/blog/", label: "Blog" },
];

export function SiteNav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          aria-label="SplitPocket home"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <BrandMark withWordmark />
        </a>
        <nav
          aria-label="Site"
          className="hidden items-center gap-7 self-stretch text-sm text-muted-foreground md:flex"
        >
          {LINKS.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex h-full items-center transition-colors hover:text-foreground",
                  // The rule sits on the header's own bottom border, so the
                  // current page reads as a tab rather than as bold text.
                  current &&
                    "relative font-medium text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={SIGN_IN_URL}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground max-[380px]:hidden"
          >
            Log in
          </a>
          <CtaLink href={SIGN_UP_URL} size="sm">
            Get started
          </CtaLink>
        </div>
      </div>
    </header>
  );
}

/**
 * Trailing slashes are normalised away on both sides: the prerender renders
 * `/features` while GitHub Pages serves `/features/`, and a mismatch between
 * the two would flip the highlight on hydration.
 *
 * Sections match their children, so a blog post keeps Blog lit.
 */
function isCurrent(pathname: string, href: string) {
  const path = pathname.replace(/\/+$/, "");
  const target = href.replace(/\/+$/, "");
  if (!target) return !path;
  return path === target || path.startsWith(`${target}/`);
}
