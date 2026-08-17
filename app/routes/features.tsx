import type { Route } from "./+types/features";
import { FinalCta } from "~/components/final-cta";
import { ChartIcon, TagIcon, WalletIcon } from "~/components/feature-icons";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { PhoneFrame } from "~/components/screenshot-frame";
import { FEATURES, FEATURE_GROUPS } from "~/content/features";
import { cn, ruledRow } from "~/lib/utils";
import { seoMeta } from "~/lib/seo";
import { SITE_URL } from "~/lib/urls";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    // The brand is already in the title, so no suffix.
    title: "SplitPocket features: track, split, settle",
    description:
      "Every SplitPocket feature in one place: expenses and income, categories, budgets and monthly reports, group splits three ways, simplified settle-up, offline sync and CSV export.",
    path: "/features/",
    image: "/og/features.png",
  });
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Features", item: `${SITE_URL}/features/` },
      ],
    },
    {
      "@type": "ItemList",
      name: "SplitPocket features",
      numberOfItems: FEATURES.length,
      itemListElement: FEATURES.map((feature, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: feature.name,
        description: feature.detail,
      })),
    },
  ],
};

const SHOTS = {
  addExpensePhone: "/screenshots/add-expense-phone.webp",
  reportsPhone: "/screenshots/reports-phone.webp",
};

export default function Features() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-12 md:pt-16">
          <h1 className="max-w-4xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-tight">
            Everything, included.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            {FEATURES.length} features, one plan, nothing locked behind a
            paywall. Both halves of your money: what you spend on your own,
            and what you split with everyone else.
          </p>
        </section>

        {/* Personal finance: the half the splitting apps don't do. */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:py-20 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Your money, one ledger.
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-lg text-muted-foreground">
                Expenses and income in one place, sorted into categories that
                match how you actually spend. This is the half the splitting
                apps leave to a spreadsheet.
              </p>
              <ul className="mt-8 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <TagIcon />
                  </span>
                  14 categories built in. Add your own in one tap.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <WalletIcon />
                  </span>
                  Income counts too, so the month nets out properly.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <ChartIcon />
                  </span>
                  Every month gets a report, broken down by category.
                </li>
              </ul>
            </Reveal>
            <Reveal stagger={2} className="flex justify-center gap-6">
              <PhoneFrame
                src={SHOTS.addExpensePhone}
                alt="Adding an expense in SplitPocket: amount, description, category, date"
                className="w-48 sm:w-56"
              />
              <PhoneFrame
                src={SHOTS.reportsPhone}
                alt="A monthly category report in SplitPocket"
                className="w-48 translate-y-10 sm:w-56"
              />
            </Reveal>
          </div>
        </section>

        {/* The full index, in four groups. */}
        {FEATURE_GROUPS.map((group) => (
          <section
            key={group.title}
            aria-labelledby={groupId(group.title)}
            className="border-t border-border"
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
              <Reveal>
                <h2
                  id={groupId(group.title)}
                  className="text-balance text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  {group.title}
                </h2>
                <p className="mt-3 text-pretty text-muted-foreground">{group.blurb}</p>
              </Reveal>
              <ul>
                {group.features.map((feature, i) => (
                  <Reveal
                    as="li"
                    key={feature.name}
                    stagger={i}
                    className={cn("flex items-start gap-4 py-5", ruledRow[1])}
                  >
                    <span className="mt-1 text-primary">
                      <feature.Icon />
                    </span>
                    <div>
                      <p className="font-medium">{feature.name}</p>
                      <p className="mt-1 text-pretty text-muted-foreground">
                        {feature.detail}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Where to go next, now that you know what's in the box. */}
        <section aria-labelledby="next-heading" className="border-t border-border">
          <h2 id="next-heading" className="sr-only">
            Next
          </h2>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:gap-0 md:py-20">
            <Reveal className="md:pr-12">
              <h3 className="text-balance text-2xl font-semibold tracking-tight">
                See splitting in detail
              </h3>
              <p className="mt-3 text-pretty text-muted-foreground">
                The three split methods worked through, what settle-up does to
                eight tangled debts, and the three steps from dinner to done.
              </p>
              <p className="mt-5">
                <a
                  href="/groups/"
                  className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  How groups work
                </a>
              </p>
            </Reveal>
            <Reveal stagger={2} className="md:border-l md:border-border md:pl-12">
              <h3 className="text-balance text-2xl font-semibold tracking-tight">
                Comparing against another app?
              </h3>
              <p className="mt-3 text-pretty text-muted-foreground">
                Splitwise, Tricount and Settle Up, row by row. Four rows where
                everyone ties, five where they don't.
              </p>
              <p className="mt-5">
                <a
                  href="/compare/"
                  className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  See the comparison
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

/** Stable heading id for `aria-labelledby`, from the group title. */
function groupId(title: string) {
  return title.toLowerCase().replace(/[^a-z]+/g, "-");
}
