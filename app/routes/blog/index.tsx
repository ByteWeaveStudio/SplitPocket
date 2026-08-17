import type { Route } from "./+types/index";
import { FinalCta } from "~/components/final-cta";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { POSTS, formatDate, formatDateShort, postPath } from "~/content/posts";
import { ruledRow } from "~/lib/utils";
import { seoMeta } from "~/lib/seo";
import { SITE_URL } from "~/lib/urls";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    title: "Guides to splitting rent, bills and trips | SplitPocket",
    description:
      "Plain guides to splitting rent, bills, trips and dinners fairly, with the math worked through and nothing padded out.",
    path: "/blog/",
    image: "/og/blog.png",
  });
}

const [FEATURED, ...REST] = POSTS;

/** Blog + ItemList so crawlers and agents get the whole index in one read. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog/`,
      name: "The SplitPocket blog",
      description:
        "Guides to splitting rent, bills, trips and dinners, and to knowing where your own month went.",
      url: `${SITE_URL}/blog/`,
      inLanguage: "en",
      publisher: { "@type": "Organization", name: "SplitPocket", url: `${SITE_URL}/` },
      blogPost: POSTS.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        articleSection: post.topic,
        url: `${SITE_URL}${postPath(post.slug)}`,
      })),
    },
    {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: POSTS.length,
      itemListElement: POSTS.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        url: `${SITE_URL}${postPath(post.slug)}`,
      })),
    },
  ],
};

function topicCounts() {
  const counts = new Map<string, number>();
  for (const post of POSTS) counts.set(post.topic, (counts.get(post.topic) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export default function BlogIndex() {
  const topics = topicCounts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-12 md:pt-16">
          <h1 className="max-w-3xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-tight">
            Notes on money you share.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            {POSTS.length} guides to splitting rent, bills, trips and dinners,
            and to knowing where your own month went. Every example is worked
            through with real numbers.
          </p>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {/* The separator trails its own item so a wrap never starts with a dot. */}
            {topics.map(([topic, count], i) => (
              <span key={topic} className="flex items-center gap-3">
                <span className="whitespace-nowrap">
                  {topic} <span className="money text-xs">{count}</span>
                </span>
                {i < topics.length - 1 && (
                  <span aria-hidden className="text-border">
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </section>

        {/* Latest, given the room to be read first. */}
        <section aria-labelledby="latest-heading" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <h2
              id="latest-heading"
              className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
            >
              Latest
            </h2>
            <Reveal className="mt-6">
              <a
                href={postPath(FEATURED.slug)}
                className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8"
              >
                <p className="money text-sm text-muted-foreground">
                  {formatDate(FEATURED.date)} · {FEATURED.topic} ·{" "}
                  {FEATURED.minutes} min
                </p>
                <h3 className="mt-3 max-w-3xl text-balance text-2xl font-semibold tracking-tight group-hover:text-primary md:text-3xl">
                  {FEATURED.title}
                </h3>
                <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
                  {FEATURED.description}
                </p>
                <p className="mt-5 text-sm font-medium text-primary">Read it →</p>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Everything else, as a statement: date, title, topic. */}
        <section aria-labelledby="all-heading" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <h2
              id="all-heading"
              className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
            >
              Everything else
            </h2>
            <ul className="mt-6">
              {REST.map((post, i) => (
                // The rule sits on the li, not the anchor: every anchor is the
                // first child of its own li, so `first:` would never fire.
                <Reveal as="li" key={post.slug} stagger={Math.min(i, 8)} className={ruledRow[1]}>
                  <a
                    href={postPath(post.slug)}
                    className="group grid gap-x-8 gap-y-1 py-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:grid-cols-[5.5rem_minmax(0,1fr)_11rem] md:items-baseline"
                  >
                    <span className="money text-sm text-muted-foreground">
                      {formatDateShort(post.date)}
                    </span>
                    <span>
                      <span className="text-pretty text-lg font-medium group-hover:text-primary">
                        {post.title}
                      </span>
                      <span className="mt-1 block text-pretty text-muted-foreground">
                        {post.description}
                      </span>
                    </span>
                    <span className="whitespace-nowrap text-sm text-muted-foreground md:text-right">
                      {post.topic}
                      <span aria-hidden className="px-2 text-border">
                        ·
                      </span>
                      <span className="money">{post.minutes} min</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Reading this as a machine?{" "}
              <a href="/llms.txt" className="text-primary underline underline-offset-4">
                /llms.txt
              </a>{" "}
              lists every page on this site in plain text.
            </p>
          </div>
        </section>

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
