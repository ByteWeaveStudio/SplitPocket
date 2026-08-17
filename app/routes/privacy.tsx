import type { Route } from "./+types/privacy";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { seoMeta } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    title: "Privacy policy | SplitPocket",
    description:
      "How SplitPocket handles your data: no ads, no data selling, no third-party trackers.",
    path: "/privacy/",
  });
}

export default function Privacy() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-prose px-6 py-16 md:py-20">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 6, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-muted-foreground [&_li]:text-muted-foreground">
          <section>
            <p className="!mt-0">
              What data SplitPocket handles, why, and what we will never do
              with it. SplitPocket is operated by ByteWeave Studio.
            </p>
          </section>

          <section>
            <h2>What we don't do</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>We don't show ads.</li>
              <li>We don't sell your data, to anyone, for anything.</li>
              <li>
                We don't run third-party analytics or trackers, not in the
                app, not on this website.
              </li>
              <li>We don't feed your data to AI systems.</li>
            </ul>
          </section>

          <section>
            <h2>What we store</h2>
            <p>
              <strong className="text-foreground">Account data.</strong> Your
              email, name, and password (stored only as a secure hash). Sign
              in with Google or Apple and we receive your name and email from
              them.
            </p>
            <p>
              <strong className="text-foreground">Ledger data.</strong> The
              expenses, income, categories, groups, splits, balances and
              settlements you create. That's the product. We store it so you
              can see it on all your devices.
            </p>
            <p>
              <strong className="text-foreground">On your device.</strong> An
              offline copy in your browser's local storage, so the app works
              without a connection. Signing out deletes it.
            </p>
          </section>

          <section>
            <h2>Who can see what</h2>
            <p>
              Members of a group see that group's expenses, balances and
              settlements. That's what a group is. Your own expenses and
              income are visible only to you. These rules are enforced in the
              database itself (row-level security), not just in the app.
            </p>
          </section>

          <section>
            <h2>Who processes data for us</h2>
            <p>
              SplitPocket runs on Supabase (database, authentication) and
              standard cloud hosting. They process data on our behalf to run
              the service, and for nothing else.
            </p>
          </section>

          <section>
            <h2>Security</h2>
            <p>
              Data moves over TLS and is protected by per-row database access
              policies. Passwords are hashed. No system is perfectly secure,
              but nothing here is clever for the sake of it.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              You can read and correct your data in the app. To delete your
              account and everything in it, email us and we'll do it.
              SplitPocket operates under the laws of India; depending on where
              you live, your local law may give you more rights than this.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If this policy changes, we'll update this page and the date at
              the top. We won't quietly weaken it.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions or requests:{" "}
              <a
                href="mailto:hello@splitpocket.app"
                className="text-primary underline underline-offset-4"
              >
                hello@splitpocket.app
              </a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
