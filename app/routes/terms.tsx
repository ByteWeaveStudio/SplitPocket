import type { Route } from "./+types/terms";
import { SiteFooter } from "~/components/footer";
import { SiteNav } from "~/components/nav";
import { seoMeta } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return seoMeta({
    title: "Terms of use | SplitPocket",
    description:
      "The terms that apply when you use SplitPocket: your account, your data, what we promise, and what we don't.",
    path: "/terms/",
  });
}

export default function Terms() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-prose px-6 py-16 md:py-20">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Terms of use
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 6, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-muted-foreground [&_li]:text-muted-foreground">
          <section>
            <p className="!mt-0">
              These terms apply when you use SplitPocket, operated by
              ByteWeave Studio. Creating an account means you agree to them.
            </p>
          </section>

          <section>
            <h2>The service</h2>
            <p>
              You log expenses and income, create groups, split costs, see
              balances and record settlements. SplitPocket does the math. It
              does not move money: payments between people happen outside the
              app, however you choose to make them.
            </p>
          </section>

          <section>
            <h2>Your account</h2>
            <p>
              Keep your credentials to yourself and give us accurate
              information. You're responsible for what happens under your
              account. You must be old enough to hold one where you live.
            </p>
          </section>

          <section>
            <h2>Your data</h2>
            <p>
              What you record in SplitPocket is yours. You give us only the
              permission needed to store it, sync it and show it to the group
              members you share it with. Nothing more. See the{" "}
              <a
                href="/privacy/"
                className="text-primary underline underline-offset-4"
              >
                privacy policy
              </a>{" "}
              for the full picture.
            </p>
          </section>

          <section>
            <h2>Fair use</h2>
            <p>
              Don't use SplitPocket to break the law, to harass people, or to
              probe, overload, or interfere with the service. We can suspend
              accounts that do.
            </p>
          </section>

          <section>
            <h2>What we promise, and what we don't</h2>
            <p>
              We work to keep SplitPocket fast, correct and available, but it
              is provided "as is". Balances and splits are arithmetic on the
              data you enter, not financial, legal or tax advice. To the
              extent the law allows, we're not liable for indirect damages or
              for arguments between group members.
            </p>
          </section>

          <section>
            <h2>Ending things</h2>
            <p>
              You can stop using SplitPocket whenever you like and ask us to
              delete your account. We can close accounts that break these
              terms, and we'll say why.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If these terms change materially, we'll update this page and the
              date at the top. Continuing to use the service after a change
              means you accept it.
            </p>
          </section>

          <section>
            <h2>Law and contact</h2>
            <p>
              These terms are governed by the laws of India. Questions:{" "}
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
