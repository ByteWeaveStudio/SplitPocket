import { type RouteConfig, index, route } from "@react-router/dev/routes";

// One file per post: each article ships in its own JS chunk, and
// `prerender: true` picks every static path up without extra config.
// Adding a post = a file here + an entry in app/content/posts.json.
const posts = [
  "choosing-an-expense-splitting-app",
  "group-expense-etiquette",
  "read-a-category-report",
  "settle-up-methods",
  "recurring-expenses",
  "monthly-budget-that-holds",
  "privacy-in-expense-apps",
  "roommate-expense-system",
  "multi-currency-group-expenses",
  "offline-first-expense-tracking",
  "debt-simplification-explained",
  "equal-exact-or-percentage",
  "group-trip-expenses",
  "split-a-restaurant-bill",
  "split-rent-fairly",
];

export default [
  index("routes/home.tsx"),
  route("features", "routes/features.tsx"),
  route("groups", "routes/groups.tsx"),
  route("compare", "routes/compare.tsx"),
  route("blog", "routes/blog/index.tsx"),
  ...posts.map((slug) => route(`blog/${slug}`, `routes/blog/${slug}.tsx`)),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  // Linked from the Google Play listing: must stay reachable without login.
  route("delete-account", "routes/delete-account.tsx"),
  // Prerendered to /404/index.html; postbuild copies it to docs/404.html,
  // which GitHub Pages serves for any unknown path.
  route("404", "routes/not-found.tsx"),
] satisfies RouteConfig;
