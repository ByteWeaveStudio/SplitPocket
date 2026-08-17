import { CtaLink } from "~/components/cta-link";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import {
  formatDate,
  formatDateShort,
  postPath,
  relatedPosts,
  type Post,
} from "~/content/posts";
import { cn, ruledRow } from "~/lib/utils";
import { SITE_URL, SIGN_UP_URL } from "~/lib/urls";

/**
 * The blog article shell: header, machine-readable JSON-LD, prose styling,
 * one CTA, and related reading. Post bodies live in the route files and use
 * the primitives below, `Ledger` above all, so the ledger motif carries
 * into the writing and every worked example visibly reconciles.
 */

/**
 * Prose rhythm, applied with descendant variants rather than a plugin (the
 * site has no typography plugin). Only direct children are targeted, so the
 * primitives below keep their own spacing.
 */
const PROSE = [
  "leading-relaxed",
  "[&>*:first-child]:mt-0",
  "[&>p]:mt-5 [&>p]:text-pretty [&>p]:text-muted-foreground",
  "[&>p:first-of-type]:text-lg [&>p:first-of-type]:text-foreground",
  "[&>h2]:mt-12 [&>h2]:scroll-mt-20 [&>h2]:text-balance [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight",
  "[&>h3]:mt-8 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:tracking-tight",
  "[&>ul]:mt-5 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:text-muted-foreground",
  "[&>ol]:mt-5 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-5 [&>ol]:text-muted-foreground",
  "[&>blockquote]:mt-6 [&>blockquote]:border-l-2 [&>blockquote]:border-primary [&>blockquote]:pl-5 [&>blockquote]:text-pretty [&>blockquote]:text-foreground",
  "[&_strong]:font-medium [&_strong]:text-foreground",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
  "[&_code]:money [&_code]:text-[0.95em] [&_code]:text-foreground",
].join(" ");

export function Article({
  post,
  summary,
  children,
}: {
  post: Post;
  /** "The short version": the three things a skimmer should leave with. */
  summary: string[];
  children: React.ReactNode;
}) {
  const related = relatedPosts(post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        articleSection: post.topic,
        wordCount: post.minutes * 200,
        author: { "@type": "Organization", name: "SplitPocket", url: `${SITE_URL}/` },
        publisher: { "@type": "Organization", name: "SplitPocket", url: `${SITE_URL}/` },
        isPartOf: { "@type": "Blog", name: "The SplitPocket ledger", url: `${SITE_URL}/blog/` },
        mainEntityOfPage: `${SITE_URL}${postPath(post.slug)}`,
        image: `${SITE_URL}/og/og-default.png`,
        abstract: summary.join(" "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${SITE_URL}${postPath(post.slug)}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <article>
          <header className="mx-auto max-w-3xl px-6 pb-10 pt-12 md:pt-16">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <a
                href="/blog/"
                className="rounded transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Blog
              </a>
              <span aria-hidden className="px-2 text-border">
                /
              </span>
              <span>{post.topic}</span>
            </nav>
            <h1 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              {post.description}
            </p>
            <p className="money mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>{post.minutes} min read</span>
            </p>
          </header>

          <div className="mx-auto max-w-3xl px-6 pb-16 md:pb-24">
            <aside
              aria-label="Summary"
              className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                The short version
              </p>
              <ul className="mt-3 space-y-2">
                {summary.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-pretty">
                    <CheckMark />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className={cn("mt-12", PROSE)}>{children}</div>

            <aside className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-balance text-xl font-semibold tracking-tight">
                Do this in SplitPocket
              </h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                Both halves of your money in one app: what you spend on your
                own, and what you split. Offline, and no ads.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-5">
                <CtaLink href={SIGN_UP_URL}>Get started</CtaLink>
                <a
                  href="/compare/"
                  className="rounded-lg text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Compare with Splitwise and others
                </a>
              </div>
            </aside>
          </div>
        </article>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="border-t border-border">
            <div className="mx-auto max-w-3xl px-6 py-14">
              <h2
                id="related-heading"
                className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Keep reading
              </h2>
              <ul className="mt-5">
                {related.map((r) => (
                  <li key={r.slug} className={ruledRow[1]}>
                    <a
                      href={postPath(r.slug)}
                      className="group flex flex-col gap-1 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="money w-16 shrink-0 text-sm text-muted-foreground">
                        {formatDateShort(r.date)}
                      </span>
                      <span className="text-pretty font-medium group-hover:text-primary">
                        {r.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <a
                  href="/blog/"
                  className="text-primary underline underline-offset-4"
                >
                  All articles
                </a>
              </p>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-1 shrink-0 text-primary"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

type LedgerRow = {
  label: string;
  /** Second line under the label: a rate, a share, a note. */
  sub?: string;
  amount: string;
  tone?: "positive" | "negative" | "muted";
};

const TONE: Record<NonNullable<LedgerRow["tone"]>, string> = {
  positive: "text-positive",
  negative: "text-negative",
  muted: "text-muted-foreground",
};

/**
 * A worked example rendered as a statement: mono amounts, a ruled total.
 * Every example on this blog reconciles. If a `total` is given, it is the
 * exact sum of the rows above it.
 */
export function Ledger({
  title,
  note,
  rows,
  total,
  caption,
}: {
  title: string;
  note?: string;
  rows: LedgerRow[];
  total?: LedgerRow;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-medium">{title}</p>
          {note && <p className="text-xs text-muted-foreground">{note}</p>}
        </div>
        <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
          {rows.map((row) => (
            <div
              key={`${row.label}-${row.amount}`}
              className="flex items-baseline justify-between gap-6 py-2.5"
            >
              <dt className="text-pretty">
                {row.label}
                {row.sub && (
                  <span className="block text-xs text-muted-foreground">{row.sub}</span>
                )}
              </dt>
              <dd className={cn("money shrink-0 tabular-nums", row.tone && TONE[row.tone])}>
                {row.amount}
              </dd>
            </div>
          ))}
        </dl>
        {total && (
          <div className="mt-3 flex items-baseline justify-between gap-6">
            <p className={cn("text-sm font-medium", total.tone && TONE[total.tone])}>
              {total.label}
            </p>
            <p className={cn("money text-sm font-medium", total.tone && TONE[total.tone])}>
              {total.amount}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

/** An aside inside the prose: a caveat, a rule of thumb, a warning. */
export function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 border-l-2 border-primary pl-5">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-pretty text-muted-foreground">{children}</p>
    </aside>
  );
}
