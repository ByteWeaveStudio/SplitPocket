import { SITE_URL } from "~/lib/urls";

/**
 * Standard meta set for a prerendered page. `path` must match the served
 * URL exactly — GitHub Pages 301s `/privacy` to `/privacy/`, so subpages
 * pass the trailing-slash form and the sitemap uses the same strings.
 */
export function seoMeta({
  title,
  description,
  path,
  image = "/og/og-default.png",
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  /** ISO date; emitted as `article:published_time` for article pages. */
  publishedTime?: string;
}) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image}`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "SplitPocket" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    ...(publishedTime
      ? [{ property: "article:published_time", content: publishedTime }]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}

const BRAND_SUFFIX = " | SplitPocket";
/** Google truncates the SERP title around here; longer titles get cut. */
const TITLE_LIMIT = 60;

/**
 * Appends the brand only when it still fits in the SERP. Post headlines are
 * written for the page, not for the tab, so several are long enough that the
 * suffix would push the useful words out of the snippet.
 */
export function brandedTitle(title: string) {
  return title.length + BRAND_SUFFIX.length <= TITLE_LIMIT
    ? `${title}${BRAND_SUFFIX}`
    : title;
}

/** Meta for one blog post, from its `posts.json` entry. */
export function articleMeta(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
}) {
  return seoMeta({
    title: brandedTitle(post.title),
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: `/og/blog/${post.slug}.png`,
    type: "article",
    publishedTime: post.date,
  });
}
