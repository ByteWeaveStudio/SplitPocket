import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
// Hashed URLs for the two above-the-fold fonts; preloading them starts the
// fetch alongside the CSS instead of after it, which is what LCP waits on.
import bricolageWoff2 from "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url";
import geistWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import "./app.css";

export const links: Route.LinksFunction = () => [
  // Icon set from the brand kit. The .ico carries 16/32/48 for the browsers
  // and pinned-tab surfaces that still ignore SVG; everything modern takes
  // the SVG and scales it.
  { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "preload",
    as: "font",
    href: bricolageWoff2,
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "font",
    href: geistWoff2,
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#faf9f6" />
        <Meta />
        <Links />
        <script
          // Light is the default; restore a saved dark choice before first
          // paint so returning dark users never see a light flash.
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("theme-dark");document.querySelector('meta[name="theme-color"]').setAttribute("content","#04060a")}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="text/x-direction-contract"
          // React strips JSX comments from output, so the contract ships in an
          // inert script tag to stay greppable in the built HTML.
          dangerouslySetInnerHTML={{
            __html: `
THESIS: A ledger that feels human — the page itself demonstrates the app's exactness; it refuses the gradient-hero, card-grid SaaS lander.
OWN-WORLD: Warm paper ground, hairline statement rules, emerald reserved for action and positive money, tabular Geist Mono figures as texture, Bricolage Grotesque display, duotone stroke illustrations; one blue-black passage, one emerald flood.
STORY: A visitor sees expense management and group splitting in one breath, watches amounts reconcile to zero, trusts the math and the privacy, and signs up at my.splitpocket.app.
FIRST VIEWPORT: Sticky paper nav; left, display headline + subhead + Get started + a settle-up ledger strip whose mono amounts reconcile; right, browser-framed real dashboard with an overlapping phone.
FORM: Brief-pinned — user-approved plan architecture; pinned direction beats the roll, no seed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
`,
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page not found" : "Something went wrong";
    details =
      error.status === 404
        ? "That page doesn't exist. Head back to the start."
        : error.statusText || details;
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{message}</h1>
      <p className="text-muted-foreground">{details}</p>
      <a href="/" className="text-primary underline underline-offset-4">
        Back to splitpocket.app
      </a>
    </main>
  );
}
