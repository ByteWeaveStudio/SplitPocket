import data from "./posts.json";

/**
 * Blog index. Metadata lives in `posts.json` so the build scripts can read
 * the same list without compiling TypeScript (sitemap, llms.txt);
 * each post's body lives in its own route file under `app/routes/blog/`,
 * which keeps every article in its own JS chunk.
 *
 * `date` is the publication date. Adding a post takes three edits: an entry
 * in `posts.json`, a route file in `app/routes/blog/`, and the slug in the
 * `posts` array in `app/routes.ts`.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Reading time in minutes, ~200 words per minute. */
  minutes: number;
  topic: string;
};

/** Newest first, the order the index and the feeds present. */
export const POSTS: Post[] = [...(data.posts as Post[])].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string): Post {
  const post = POSTS.find((p) => p.slug === slug);
  // A missing slug is an authoring bug, and it should fail the build rather
  // than prerender a page with an empty title.
  if (!post) throw new Error(`No post metadata for slug "${slug}" in posts.json`);
  return post;
}

export function postPath(slug: string) {
  return `/blog/${slug}/`;
}

/** Same topic first, then the most recent of the rest. */
export function relatedPosts(slug: string, count = 3): Post[] {
  const post = getPost(slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  const sameTopic = others.filter((p) => p.topic === post.topic);
  const rest = others.filter((p) => p.topic !== post.topic);
  return [...sameTopic, ...rest].slice(0, count);
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "11 June 2026", parsed as UTC so the date never shifts by timezone. */
export function formatDate(iso: string) {
  return DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/** "11 Jun", the mono stamp on index rows. */
export function formatDateShort(iso: string) {
  const [, month, day] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${day} ${months[Number(month) - 1]}`;
}
