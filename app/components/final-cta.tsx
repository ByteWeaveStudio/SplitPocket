import { useLocation } from "react-router";
import { CtaLink } from "~/components/cta-link";
import { ctaFor } from "~/content/cta";
import { SIGN_UP_URL } from "~/lib/urls";

/**
 * The emerald band that closes every marketing page. The pitch varies by
 * page (see `app/content/cta.ts`); the button never does, because the pitch
 * is what should feel written and the action is what should feel predictable.
 */
export function FinalCta() {
  const { pathname } = useLocation();
  const cta = ctaFor(pathname);

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-lg text-primary-foreground">
            {cta.body}
          </p>
          {cta.ledger && (
            <p className="money mt-5 border-t border-primary-foreground/25 pt-4 text-sm text-primary-foreground">
              {cta.ledger}
            </p>
          )}
        </div>
        <CtaLink href={SIGN_UP_URL} variant="onEmerald" size="lg">
          Get started
        </CtaLink>
      </div>
    </section>
  );
}
