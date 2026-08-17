import type { Config } from "@react-router/dev/config";

export default {
  // Pure static output: no server anywhere, every route prerendered to HTML.
  ssr: false,
  prerender: true,
  // Ship the full route manifest in the initial HTML — a static host can't
  // answer /__manifest requests.
  routeDiscovery: { mode: "initial" },
} satisfies Config;
