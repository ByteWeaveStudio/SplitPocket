import type { Route } from "./+types/home";
import { CtaLink } from "~/components/cta-link";
import {
  ChartIcon,
  CloudCheckIcon,
  KeyIcon,
  MoonIcon,
  TagIcon,
  WalletIcon,
} from "~/components/feature-icons";
import { FinalCta } from "~/components/final-cta";
import { SiteFooter } from "~/components/footer";
import { HeroLedger } from "~/components/hero-ledger";
import {
  ActivityIllustration,
  GroupIllustration,
  ReceiptIllustration,
} from "~/components/illustrations";
import { SiteNav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { BrowserFrame, PhoneFrame } from "~/components/screenshot-frame";
import { SplitDemo } from "~/components/split-demo";
import { FEATURES, HIGHLIGHTS } from "~/content/features";
import { POSTS, formatDateShort, postPath } from "~/content/posts";
import { cn, ruledRow } from "~/lib/utils";
import { seoMeta } from "~/lib/seo";
import { SIGN_UP_URL } from "~/lib/urls";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    title: "SplitPocket | Track what you spend, split what you share",
    description:
      "Track what you spend and split what you share, in one app. Works offline, syncs everywhere, no ads, and we never sell your data.",
    path: "/",
  });
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SplitPocket",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://splitpocket.app/",
  description:
    "Expense management and group splitting in one app: track personal spending, split shared expenses equally, by amounts, or by percentage, and settle up with the fewest payments.",
};

// Real captures of the running app, produced by scripts/shots.mjs.
const SHOTS: Record<string, string | undefined> = {
  dashboardDesktop: "/screenshots/dashboard-desktop.webp",
  dashboardPhone: "/screenshots/dashboard-phone.webp",
  addExpensePhone: "/screenshots/add-expense-phone.webp",
  reportsPhone: "/screenshots/reports-phone.webp",
  groupDesktop: "/screenshots/group-desktop.webp",
  darkDesktop: "/screenshots/dark-desktop.webp",
};

const VALUES = [
  {
    title: "Logged in seconds",
    body: "Amount, description, done. Nothing else is required before you can put the phone down.",
    Illustration: ReceiptIllustration,
  },
  {
    title: "Splits that add up",
    body: "Equally, by exact amounts, or by percentage. Always reconciles to the last paisa.",
    Illustration: GroupIllustration,
  },
  {
    title: "Works with no signal",
    body: "Add an expense on a flight. It saves the moment you tap save, and syncs when you're back.",
    Illustration: ActivityIllustration,
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              {/* The headline is the LCP element, and it must paint immediately,
                  so the hero's entrance motion lives on the ledger strip only. */}
              <h1 className="text-balance text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-tight">
                Know where your money went. Split what you shared.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
                One app for both halves: what you spend on your own, and what
                you split with everyone else. Works offline. No ads.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <CtaLink href={SIGN_UP_URL} size="lg">
                  Get started
                </CtaLink>
                <a
                  href="/groups/"
                  className="rounded-lg text-sm font-medium text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-12">
                <HeroLedger />
              </div>
            </div>
            <div className="relative">
              <BrowserFrame
                src={SHOTS.dashboardDesktop}
                srcSet="/screenshots/dashboard-desktop-md.webp 1440w, /screenshots/dashboard-desktop.webp 2880w"
                sizes="(min-width: 1024px) 44vw, 92vw"
                alt="The SplitPocket dashboard: month-to-date spending, what you're owed, and recent activity"
                loading="eager"
                fetchPriority="high"
              />
              <PhoneFrame
                src={SHOTS.dashboardPhone}
                alt="The SplitPocket dashboard on a phone"
                className="absolute -bottom-10 -left-4 hidden w-40 sm:block lg:-left-8 lg:w-44"
              />
            </div>
          </div>
        </section>

        {/* Value row */}
        <section aria-labelledby="values-heading" className="border-t border-border">
          <h2 id="values-heading" className="sr-only">
            Why SplitPocket
          </h2>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:gap-0 md:py-20">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                stagger={i}
                className="md:border-l md:border-border md:px-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <v.Illustration className="text-primary" />
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-pretty text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Personal finance */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Your money, one ledger.
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-lg text-muted-foreground">
                Expenses and income in one place, sorted into categories that
                match how you actually spend.
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

        {/* Group splitting: the short version, with the detail on /groups/ */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Split it fairly. Settle it once.
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                One group per trip, flat or dinner. Split it equally, by exact
                amounts, or by percentage. When you settle, SplitPocket works
                out the fewest payments that clear everyone.
              </p>
              <p className="mt-6">
                <a
                  href="/groups/"
                  className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  How groups work
                </a>
              </p>
            </Reveal>
            <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
              <Reveal stagger={1}>
                <SplitDemo />
              </Reveal>
              <Reveal stagger={2}>
                <BrowserFrame
                  src={SHOTS.groupDesktop}
                  alt="A SplitPocket group: members, balances, expenses, and a suggested settle-up"
                />
                <p className="mt-4 text-sm text-muted-foreground">
                  Balances read the way you'd say them out loud: gets back,
                  owes, settled up.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Feature highlights. The full index lives on /features/. */}
        <section aria-labelledby="features-heading" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <Reveal className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
              <h2
                id="features-heading"
                className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
              >
                Everything, included.
              </h2>
              <p className="text-muted-foreground">One app for the whole job.</p>
            </Reveal>
            <ul className="mt-10 grid gap-x-16 md:grid-cols-2">
              {HIGHLIGHTS.map((f, i) => (
                <Reveal
                  as="li"
                  key={f.name}
                  stagger={Math.floor(i / 2)}
                  className={cn("flex items-start gap-4 py-4", ruledRow[2])}
                >
                  <span className="mt-0.5 text-primary">
                    <f.Icon />
                  </span>
                  <p className="text-pretty">
                    <span className="font-medium">{f.name}</span>{" "}
                    <span className="text-muted-foreground">· {f.blurb}</span>
                  </p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8">
              <a
                href="/features/"
                className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                See all {FEATURES.length} features
              </a>
            </p>
          </div>
        </section>

        {/* Comparison + writing: the two questions a visitor has next */}
        <section aria-labelledby="reading-heading" className="border-t border-border">
          <h2 id="reading-heading" className="sr-only">
            Read more
          </h2>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:gap-0 md:py-20">
            <Reveal className="md:pr-12">
              <h3 className="text-balance text-2xl font-semibold tracking-tight">
                Coming from Splitwise?
              </h3>
              <p className="mt-3 text-pretty text-muted-foreground">
                Row by row against Splitwise, Tricount and Settle Up, what you
                gain, and the ten-minute way to move a group across.
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
            <Reveal stagger={2} className="md:border-l md:border-border md:pl-12">
              <h3 className="text-balance text-2xl font-semibold tracking-tight">
                Notes on money you share
              </h3>
              <ul className="mt-4">
                {POSTS.slice(0, 3).map((p) => (
                  <li key={p.slug} className={ruledRow[1]}>
                    <a
                      href={postPath(p.slug)}
                      className="group flex items-baseline gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="money shrink-0 text-sm text-muted-foreground">
                        {formatDateShort(p.date)}
                      </span>
                      <span className="text-pretty transition-colors group-hover:text-primary">
                        {p.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5">
                <a
                  href="/blog/"
                  className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  All {POSTS.length} articles
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Offline + privacy, in the app's dark theme */}
        <section className="theme-dark border-t border-border bg-background text-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Private by design.
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-lg text-muted-foreground">
                No ads. We don't sell your data, and nothing feeds your
                receipts to an AI. Spending data says a lot about a person, so
                we hold as little of it as the app can run on.
              </p>
              <ul className="mt-8 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <CloudCheckIcon />
                  </span>
                  It reads from your device and queues what you add, so no
                  signal is not an error.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <KeyIcon />
                  </span>
                  Your data is yours. Export the lot as CSV whenever you want.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <MoonIcon />
                  </span>
                  This is the real dark theme. The whole app ships in both.
                </li>
              </ul>
              <p className="mt-8">
                <a
                  href="/privacy/"
                  className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Read the privacy policy
                </a>
              </p>
            </Reveal>
            <Reveal stagger={2}>
              <BrowserFrame
                src={SHOTS.darkDesktop}
                alt="The SplitPocket dashboard in the dark theme"
              />
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
