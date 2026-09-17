import type { Route } from "./+types/delete-account";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { seoMeta } from "~/lib/seo";
import { APP_URL } from "~/lib/urls";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    title: "Delete your account | SplitPocket",
    description:
      "How to delete your SplitPocket account and what happens to your data: what is erased, what stays for your groups, and how long it takes.",
    path: "/delete-account/",
  });
}

/**
 * Google Play requires a publicly reachable URL, outside the app and outside
 * any login, that names the app, gives the steps to request deletion, and
 * says which data is erased, which is kept, and for how long. Everything on
 * this page exists to answer one of those four questions — keep it that way.
 */
export default function DeleteAccount() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-prose px-6 py-16 md:py-20">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Delete your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: September 17, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-muted-foreground [&_li]:text-muted-foreground">
          <section>
            <p className="!mt-0">
              This page explains how to delete your account in{" "}
              <strong className="text-foreground">SplitPocket</strong>, the
              expense tracking and bill splitting app by ByteWeave Studio, and
              exactly what happens to your data when you do. Deleting is
              permanent: there is no undo and no recovery window.
            </p>
          </section>

          <section>
            <h2>Delete from inside the app</h2>
            <ol className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-6 text-muted-foreground">
              {[
                "Open SplitPocket on your phone, or sign in at my.splitpocket.app.",
                "Go to Settings.",
                "Tap Delete account.",
                "Confirm. Your account and data are erased straight away, and you're signed out on every device.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="money mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary"
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p>
              The app is at{" "}
              <a
                href={APP_URL}
                className="text-primary underline underline-offset-4"
              >
                my.splitpocket.app
              </a>{" "}
              — the same account, the same Settings screen, if you'd rather do
              it on a bigger screen.
            </p>
          </section>

          <section>
            <h2>If you can't sign in</h2>
            <p>
              Email{" "}
              <a
                href="mailto:hello@splitpocket.app?subject=Account%20deletion%20request"
                className="text-primary underline underline-offset-4"
              >
                hello@splitpocket.app
              </a>{" "}
              from the address on the account and ask us to delete it. We
              confirm it's you, delete the account, and reply when it's done —
              within 30 days, and usually the same week. We won't try to talk
              you out of it.
            </p>
          </section>

          <section>
            <h2>What gets deleted</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Your account itself: email address, name, password hash, and
                any Google or Apple sign-in link.
              </li>
              <li>
                Your personal ledger: every expense and income entry you
                recorded on your own, with its categories and notes.
              </li>
              <li>
                Your profile and settings: display name, photo, currency and
                theme preferences.
              </li>
              <li>
                Your group memberships: you're removed from every group you
                were in, and your name and email disappear from them.
              </li>
              <li>
                The offline copy on your device, cleared when you're signed
                out.
              </li>
            </ul>
          </section>

          <section>
            <h2>What stays, and why</h2>
            <p>
              Expenses you added to a{" "}
              <strong className="text-foreground">shared group</strong> stay in
              that group, with your name and email removed — they show as
              "Removed member". They're part of other people's balances: erase
              a ₹4,000 dinner you paid for and everyone else's share of it
              silently changes, so a settled trip stops adding up. The same
              goes for settlements recorded between you and another member.
            </p>
            <p>
              None of it is linked to you any more, and none of it can be used
              to identify or contact you.
            </p>
          </section>

          <section>
            <h2>How long it takes</h2>
            <p>
              Deletion from the live database is immediate. Encrypted backups
              are kept on a rolling schedule and the deleted data ages out of
              them{" "}
              <strong className="text-foreground">within 30 days</strong>;
              backups are only ever used to restore the service after a
              failure, never to bring an account back.
            </p>
            <p>
              We keep nothing else afterwards. There is no shadow copy, no
              archive, and nothing is passed to anyone — see the{" "}
              <a
                href="/privacy/"
                className="text-primary underline underline-offset-4"
              >
                privacy policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Uninstalling isn't deleting</h2>
            <p>
              Removing the app from your phone leaves your account and your
              data on the server, so you can sign in again later. Use Delete
              account if you want it gone.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about deletion, or anything else about your data:{" "}
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
