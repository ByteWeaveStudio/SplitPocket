import { BrandMark } from "~/components/brand-mark";
import { SIGN_IN_URL } from "~/lib/urls";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs space-y-3">
          <BrandMark withWordmark />
          <p className="text-sm text-muted-foreground">
            Track what you spend. Split what you share.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-12 gap-y-8 text-sm">
          <div className="space-y-3">
            <p className="font-medium">Product</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/features/" className="transition-colors hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="/groups/" className="transition-colors hover:text-foreground">
                  Group splitting
                </a>
              </li>
              <li>
                <a href={SIGN_IN_URL} className="transition-colors hover:text-foreground">
                  Log in
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-medium">Learn</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/blog/" className="transition-colors hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="/compare/" className="transition-colors hover:text-foreground">
                  Compare
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-medium">Legal</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/privacy/" className="transition-colors hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms/" className="transition-colors hover:text-foreground">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <p className="text-xs text-muted-foreground">© 2026 SplitPocket</p>
      </div>
    </footer>
  );
}
