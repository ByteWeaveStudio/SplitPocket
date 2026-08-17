import type { Route } from "./+types/compare";
import { FinalCta } from "~/components/final-cta";
import { CloudCheckIcon, KeyIcon, WalletIcon } from "~/components/feature-icons";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { cn, ruledRow } from "~/lib/utils";
import { seoMeta } from "~/lib/seo";
import { SITE_URL } from "~/lib/urls";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    // The brand is already in the title, so no suffix.
    title: "SplitPocket vs Splitwise, Tricount and Settle Up",
    description:
      "SplitPocket next to Splitwise, Tricount and Settle Up, row by row: both halves of your money in one app, entry that works fully offline, and no ads.",
    path: "/compare/",
    image: "/og/compare.png",
  });
}

/**
 * Competitor facts are compiled from each app's own website and app-store
 * listing. The date appears once, in the legal line at the foot, so the
 * claims are attributable without hedging in the body of the page. Re-check
 * the rows before each launch push and move the date.
 */
const VERIFIED = "August 2026";

const APPS = ["SplitPocket", "Splitwise", "Tricount", "Settle Up"] as const;

type Cell = "yes" | "no" | "limited";

type Row = {
  feature: string;
  /** Says what the row means, and qualifies anything that isn't a plain yes. */
  detail?: string;
  values: [Cell, Cell, Cell, Cell];
};

const ROWS: Row[] = [
  {
    feature: "Split equally, by exact amounts, by percentage",
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    feature: "Simplified settle-up",
    detail: "the fewest payments that clear every debt",
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    feature: "Groups with their own currency",
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    feature: "Export your data",
    detail: "CSV, whenever you want it",
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    feature: "Your own expenses and income, outside any group",
    detail: "the other three are built for shared costs only",
    values: ["yes", "no", "no", "no"],
  },
  {
    feature: "Monthly category reports for your own money",
    detail: "where your own month went, by category",
    values: ["yes", "no", "no", "no"],
  },
  {
    feature: "Budgets for your own spending",
    values: ["yes", "no", "no", "no"],
  },
  {
    feature: "Works fully offline, syncs later",
    detail: "the others cache data, and some actions still want a connection",
    values: ["yes", "limited", "limited", "limited"],
  },
  {
    feature: "No ads",
    detail: "the others show ads in their free versions",
    values: ["yes", "limited", "limited", "limited"],
  },
];

const DIFFERENTIATORS = [
  {
    title: "Both halves of your money",
    body: "Every app here splits group costs well. SplitPocket also tracks what you spend alone, with categories, income and monthly reports. One app instead of two.",
    Icon: WalletIcon,
  },
  {
    title: "Works offline, always",
    body: "It reads from your device and queues what you add. The basement restaurant and the flight home are ordinary conditions, not error screens.",
    Icon: CloudCheckIcon,
  },
  {
    title: "Private by design",
    body: "No ads, no data selling, no third-party trackers, and nothing feeding your ledger to an AI. Spending data says a lot about a person.",
    Icon: KeyIcon,
  },
];

/**
 * One factual line about what each app is, then the gap. No links out and no
 * praise: this is a page for people deciding to move, and the concession is
 * only there to keep the comparison credible.
 */
const RIVALS = [
  {
    name: "Coming from Splitwise",
    reality:
      "It splits group costs, and that's the whole scope. Your own spending lives somewhere else: a second app, a spreadsheet, or nowhere.",
    gain: "Both halves in one ledger, with monthly category reports and budgets on the personal side. No ads in an app that can see your pharmacy bills, and no limit on how much you log.",
  },
  {
    name: "Coming from Tricount",
    reality:
      "Built around a single trip. When the trip ends, so does the app's usefulness. The flat, the monthly bills and your own budget need something else.",
    gain: "The group you started in Goa still works for rent, the cook and the electricity bill. Recurring expenses log themselves, and you get reports on your own month.",
  },
  {
    name: "Coming from Settle Up",
    reality:
      "Group balances, cleanly done, and nothing past them. Adding an expense still expects a connection.",
    gain: "Entry that saves at the table and syncs later, your own expenses and income in the same place, and no ads.",
  },
  {
    name: "Coming from a spreadsheet",
    reality:
      "Fine for one organiser who enjoys formulas. It stops being fine the moment two people are entering rows, or one expense isn't split by everyone.",
    gain: "Splits that reconcile without you checking, partial splits in two taps instead of a formula, and balances everyone watches on their own phone.",
  },
];

const FAQS = [
  {
    q: "Is SplitPocket a Splitwise alternative?",
    a: "Yes. It does the same core job (groups, splits by amount or percentage, balances, simplified settle-up) and adds your own expenses, income, monthly reports and budgets in the same app. It also works fully offline and carries no ads.",
  },
  {
    q: "How do I move a group over from another app?",
    a: "Settle the group where it is, recreate it here with the same people and currency, add your recurring lines, and start with the next expense. About ten minutes. Export a CSV from the old app first if you want to keep the history.",
  },
  {
    q: "Does SplitPocket work without a connection?",
    a: "Yes. It reads from your device and queues what you add, so an expense entered on a flight or in a basement is saved the moment you tap save and syncs when you're back.",
  },
  {
    q: "Does SplitPocket show ads or sell my data?",
    a: "No to both. No ads, no data selling, and no third-party analytics or trackers, in the app or on this website.",
  },
  {
    q: "Does everyone in a group need an account?",
    a: "Yes. That's what lets each person add expenses from their own phone and see the balances move.",
  },
  {
    q: "Which currencies are supported?",
    a: "Ten, each following the real ISO 4217 rules for decimals, symbol placement and grouping. A group has one currency, and amounts are stored as whole minor units, so every split reconciles exactly.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/compare/#faq`,
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare/` },
      ],
    },
  ],
};

export default function Compare() {
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
            SplitPocket vs Splitwise, Tricount and Settle Up.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Whatever you split with today does half the job. SplitPocket does
            both halves: the money you share and the money you spend on your
            own. Offline, and without ads.
          </p>
        </section>

        {/* The three claims a competitor could copy only one of. */}
        <section aria-labelledby="differentiators-heading" className="border-t border-border">
          <h2 id="differentiators-heading" className="sr-only">
            What's different
          </h2>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:gap-0 md:py-20">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal
                key={d.title}
                stagger={i}
                className="md:border-l md:border-border md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="text-primary">
                  <d.Icon />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-pretty text-muted-foreground">{d.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Feature matrix */}
        <section id="table" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Side by side
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Four rows where everyone ties, five where they don't.
              </p>
            </Reveal>

            <p aria-hidden className="mt-10 text-sm text-muted-foreground md:hidden">
              Scroll the table sideways to see all four →
            </p>
            <div className="mt-4 -mx-6 overflow-x-auto px-6 md:mt-10">
              <table className="w-full min-w-[48rem] border-collapse text-left">
                <caption className="sr-only">
                  Feature comparison of SplitPocket, Splitwise, Tricount and
                  Settle Up, checked in {VERIFIED}.
                </caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="py-3 pr-6 text-sm font-medium">
                      Feature
                    </th>
                    {APPS.map((app) => (
                      <th
                        key={app}
                        scope="col"
                        className={cn(
                          "w-32 px-3 py-3 text-center text-sm font-medium",
                          app === "SplitPocket" && "text-primary",
                        )}
                      >
                        {app}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* The head keeps its rule (it separates head from body); the
                    last row drops its, so the table doesn't close on a line
                    the legend below then has to clear. */}
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-border align-top last:border-b-0"
                    >
                      <th scope="row" className="py-4 pr-6 font-normal">
                        <span className="font-medium">{row.feature}</span>
                        {row.detail && (
                          <span className="mt-0.5 block text-sm text-muted-foreground">
                            {row.detail}
                          </span>
                        )}
                      </th>
                      {row.values.map((value, i) => (
                        <td key={APPS[i]} className="px-3 py-4 text-center">
                          <Mark value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mark value="yes" /> yes
              </span>
              <span className="flex items-center gap-2">
                <Mark value="limited" /> partly, or with conditions
              </span>
              <span className="flex items-center gap-2">
                <Mark value="no" /> not what the app is for
              </span>
            </p>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Splitwise, Tricount and Settle Up are built for shared costs
              only. Tracking your own spending means a second app. That's the
              gap SplitPocket was built to close.
            </p>
          </div>
        </section>

        {/* Honest per-app notes */}
        <section id="apps" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                What you gain by switching
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Whichever you're on today: what's missing, and what replaces it.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-x-16 md:grid-cols-2">
              {RIVALS.map((rival, i) => (
                <Reveal
                  key={rival.name}
                  stagger={Math.floor(i / 2)}
                  className={cn("py-8", ruledRow[2])}
                >
                  <h3 className="text-xl font-semibold tracking-tight">{rival.name}</h3>
                  <p className="mt-3 text-pretty text-muted-foreground">{rival.reality}</p>
                  <p className="mt-3 text-pretty">
                    <span className="font-medium text-primary">In SplitPocket: </span>
                    <span>{rival.gain}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Switching */}
        <section id="switching" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Moving over takes ten minutes
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Five steps, and you're on one ledger instead of two. Most
                groups do it between one trip ending and the next being booked.
              </p>
            </Reveal>
            <Reveal stagger={1}>
              <ol>
                {[
                  {
                    title: "Settle where you are",
                    body: "Close out the group in your old app, so nobody carries a balance across the move.",
                  },
                  {
                    title: "Export a CSV and keep it",
                    body: "Your old history stays readable and yours. Most apps here export it in a couple of taps.",
                  },
                  {
                    title: "Create the group here",
                    body: "Name it, pick the currency, invite the same people. Two minutes.",
                  },
                  {
                    title: "Add the recurring lines",
                    body: "Rent, internet, the cook, the subscriptions, with the split you already agreed. They log themselves after that.",
                  },
                  {
                    title: "Start with the next expense",
                    body: "Not the last one. The first thing anyone buys goes in the new group, and the old app is done.",
                  },
                ].map((step, i) => (
                  <li key={step.title} className={cn("flex gap-4 py-4", ruledRow[1])}>
                    <span aria-hidden className="money text-primary">
                      {i + 1}
                    </span>
                    <p className="text-pretty">
                      <span className="font-medium">{step.title}</span>
                      <span className="mt-0.5 block text-muted-foreground">{step.body}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* FAQ, also emitted as FAQPage JSON-LD above. */}
        <section id="faq" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Questions people actually ask
              </h2>
            </Reveal>
            <dl className="mt-10 grid gap-x-16 md:grid-cols-2">
              {FAQS.map((item, i) => (
                <Reveal
                  key={item.q}
                  stagger={Math.floor(i / 2)}
                  className={cn("py-6", ruledRow[2])}
                >
                  <dt className="text-pretty font-medium">{item.q}</dt>
                  <dd className="mt-2 text-pretty text-muted-foreground">{item.a}</dd>
                </Reveal>
              ))}
            </dl>
            <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
              Still deciding? The blog has a{" "}
              <a
                href="/blog/choosing-an-expense-splitting-app/"
                className="text-primary underline underline-offset-4"
              >
                twelve-question checklist
              </a>{" "}
              you can run against any app in five minutes, this one included.
            </p>
          </div>
        </section>

        <FinalCta />

        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="max-w-3xl text-xs text-muted-foreground">
              Feature details for Splitwise, Tricount and Settle Up were
              checked against their own websites and app-store listings in{" "}
              {VERIFIED}. Splitwise, Tricount and Settle Up are trademarks of
              their respective owners; SplitPocket is not affiliated with,
              endorsed by, or sponsored by any of them. Spot something out of
              date?{" "}
              <a
                href="mailto:hello@splitpocket.app"
                className="underline underline-offset-4"
              >
                hello@splitpocket.app
              </a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/** yes / partly / no, drawn in the illustration grammar. */
function Mark({ value }: { value: Cell }) {
  const label = value === "yes" ? "Yes" : value === "limited" ? "Partly" : "No";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        value === "yes" && "text-primary",
        value === "limited" && "text-muted-foreground",
        value === "no" && "text-muted-foreground/50",
      )}
    >
      <svg
        viewBox="0 0 20 20"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {value === "yes" && <path d="m4 10.5 4 4 8-9" />}
        {value === "limited" && <path d="M4 13h12M4 7h12" />}
        {value === "no" && <path d="M5 10h10" />}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
