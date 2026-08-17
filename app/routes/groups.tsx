import type { Route } from "./+types/groups";
import { FinalCta } from "~/components/final-cta";
import { GlobeIcon, ScaleIcon, SplitIcon, UsersIcon } from "~/components/feature-icons";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { BrowserFrame, PhoneFrame } from "~/components/screenshot-frame";
import { SplitDemo } from "~/components/split-demo";
import { cn, ruledRow } from "~/lib/utils";
import { seoMeta } from "~/lib/seo";
import { SITE_URL } from "~/lib/urls";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    // The brand is already in the title, so no suffix.
    title: "SplitPocket groups: split fairly, settle once",
    description:
      "How group splitting works in SplitPocket: split equally, by exact amounts or by percentage, watch balances update as you go, and settle with the fewest payments that clear everyone.",
    path: "/groups/",
    image: "/og/groups.png",
  });
}

const SHOTS = {
  groupDesktop: "/screenshots/group-desktop.webp",
  addExpensePhone: "/screenshots/add-expense-phone.webp",
  balancesPhone: "/screenshots/balances-phone.webp",
  settlementPhone: "/screenshots/settlement-phone.webp",
};

const STEPS = [
  {
    title: "Add what happened",
    body: "A dinner, a cab, the villa. Log it to the group, in the group's currency, and tick who it was for.",
    alt: "Adding a shared expense in SplitPocket",
    shot: SHOTS.addExpensePhone,
  },
  {
    title: "See who owes whom",
    body: "Balances move as you go: who gets back, who owes, who's square. Everyone sees the same numbers on their own phone.",
    alt: "Group balances in SplitPocket",
    shot: SHOTS.balancesPhone,
  },
  {
    title: "Settle up",
    body: "Pay by UPI, cash or transfer, then record it. One payment can close three debts at once.",
    alt: "Recording a settlement in SplitPocket",
    shot: SHOTS.settlementPhone,
  },
] as const;

const METHODS = [
  {
    name: "Equally",
    body: "The right answer most of the time. Four people, one bill, one number each. Odd paise go to whoever paid rather than disappearing.",
    example: "₹4,320.00 ÷ 4 = ₹1,080.00 each",
    Icon: SplitIcon,
    href: "/blog/split-a-restaurant-bill/",
    linkText: "Splitting a restaurant bill",
  },
  {
    name: "By exact amounts",
    body: "For the bill where one person had the starter and two didn't drink. Type what each person owes; it won't save until the parts match the total.",
    example: "₹1,890 + ₹1,240 + ₹1,190 = ₹4,320.00",
    Icon: UsersIcon,
    href: "/blog/equal-exact-or-percentage/",
    linkText: "Equal, exact or percentage",
  },
  {
    name: "By percentage",
    body: "For shares agreed once that don't change: rent by room size, bills by who's actually home. Set them when the group starts and every expense follows.",
    example: "40% / 35% / 25% of ₹4,320.00",
    Icon: GlobeIcon,
    href: "/blog/split-rent-fairly/",
    linkText: "Splitting rent fairly",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Groups", item: `${SITE_URL}/groups/` },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to split and settle a group expense in SplitPocket",
      description:
        "Add the shared expense to a group, watch the balances move, then settle up with the fewest payments.",
      step: STEPS.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.body,
      })),
    },
  ],
};

export default function Groups() {
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
            Split it fairly. Settle it once.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            One group per trip, flat or dinner. Split it equally, by exact
            amounts, or by percentage. When you settle, SplitPocket works out
            the fewest payments that clear everyone.
          </p>
        </section>

        {/* The demo first: it answers the question faster than prose does. */}
        <section aria-labelledby="demo-heading" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <h2 id="demo-heading" className="sr-only">
              A group, worked through
            </h2>
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
              <Reveal>
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

        {/* How it works */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Three steps from the bill arriving to nobody owing anyone.
              </p>
            </Reveal>
            <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
              {STEPS.map((step, i) => (
                <Reveal as="li" key={step.title} stagger={i}>
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden className="money text-2xl text-primary">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-pretty text-muted-foreground">{step.body}</p>
                  <PhoneFrame src={step.shot} alt={step.alt} className="mt-6 w-44 sm:w-48" />
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* The three split methods */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Three ways to split
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Pick per expense, not per group. Whichever you use, the parts
                have to match the total before it saves.
              </p>
            </Reveal>
            {/* Three across on wide screens, where they form a single row and
                so carry no rules at all; stacked below, they're ruled apart. */}
            <div className="mt-10 grid gap-x-16 lg:grid-cols-3">
              {METHODS.map((method, i) => (
                <Reveal key={method.name} stagger={i} className={cn("py-8", ruledRow[3])}>
                  <div className="flex items-center gap-3">
                    <span className="text-primary">
                      <method.Icon />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight">{method.name}</h3>
                  </div>
                  <p className="mt-3 text-pretty text-muted-foreground">{method.body}</p>
                  <p className="money mt-4 text-sm text-primary">{method.example}</p>
                  <p className="mt-4">
                    <a
                      href={method.href}
                      className="rounded-lg text-sm text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {method.linkText}
                    </a>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Settle-up, in the app's dark theme */}
        <section className="theme-dark border-t border-border bg-background text-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:py-20 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                One payment, three debts closed.
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-lg text-muted-foreground">
                After a week away, five people can be carrying eight separate
                debts that mostly cancel out. SplitPocket nets them off and
                gives you the shortest list of payments that leaves everyone
                at zero.
              </p>
              <ul className="mt-8 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <ScaleIcon />
                  </span>
                  Nobody pays someone who owes them. The circle gets cut first.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <UsersIcon />
                  </span>
                  Pay by UPI, cash or transfer, then record it. SplitPocket
                  never touches your money.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-primary">
                    <SplitIcon />
                  </span>
                  Settled expenses stay in the history. The trip still reads
                  next year.
                </li>
              </ul>
              <p className="mt-8">
                <a
                  href="/blog/debt-simplification-explained/"
                  className="rounded-lg text-sm font-medium text-primary underline decoration-border underline-offset-8 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  How debt simplification works
                </a>
              </p>
            </Reveal>
            <Reveal stagger={2} className="flex justify-center">
              <PhoneFrame
                src={SHOTS.settlementPhone}
                alt="A suggested settle-up in SplitPocket, in the dark theme"
                className="w-52 sm:w-60"
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
