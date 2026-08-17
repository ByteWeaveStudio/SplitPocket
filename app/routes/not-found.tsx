import type { Route } from "./+types/not-found";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Page not found | SplitPocket" },
    { name: "robots", content: "noindex" },
  ];
}

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        That page doesn't exist. Nothing's broken, the link just points nowhere.
      </p>
      <a href="/" className="text-primary underline underline-offset-4">
        Back to splitpocket.app
      </a>
    </main>
  );
}
