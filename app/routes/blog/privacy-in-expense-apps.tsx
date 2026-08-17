import type { Route } from "./+types/privacy-in-expense-apps";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("privacy-in-expense-apps");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "A month of expenses reveals your health, your relationships, your religion and your income, usually more than your messages do.",
        "If an app is ad-supported, the advertiser is the customer, and 'anonymised' spending data is famously easy to re-identify.",
        "Six questions to ask any expense app, and the answers SplitPocket gives.",
      ]}
    >
      <p>
        People guard their chat history and hand over their spending without
        a second thought. It's the wrong way round. A month of expenses is
        one of the most revealing datasets a person produces: more precise
        than a diary, and unlike a diary, it's structured, timestamped, and
        trivially searchable.
      </p>

      <h2>What one ordinary month says about you</h2>
      <Ledger
        title="One ordinary month, read back to you"
        note="what each line discloses"
        rows={[
          { label: "Pharmacy, four times", sub: "an ongoing condition", amount: "₹3,240.00" },
          { label: "Same restaurant, Thursdays", sub: "a relationship, and roughly when it started", amount: "₹8,900.00" },
          { label: "Temple donation, monthly", sub: "your religion", amount: "₹1,100.00" },
          { label: "Rent", sub: "your neighbourhood and your income bracket", amount: "₹19,200.00" },
          { label: "Salary credited on the 1st", sub: "your employer and your pay", amount: "₹86,000.00" },
        ]}
        caption="None of these are secrets on their own. Together they're a profile no one asked you to consent to."
      />
      <p>
        This is why financial data is regulated more tightly than almost
        anything else, and why "we only share aggregated, anonymised data
        with partners" deserves more suspicion than it usually gets.
        Spending patterns are close to a fingerprint: a handful of dated
        transactions is generally enough to pick one person out of a large
        supposedly-anonymous dataset.
      </p>

      <h2>Follow the money, not the marketing</h2>
      <p>
        Every app has to be paid for by someone. There are broadly three
        models, and they produce very different products:
      </p>
      <ul>
        <li>
          <strong>You pay.</strong> A subscription or a one-off price. Your
          interests and the app's are aligned; it just has to be worth the
          money.
        </li>
        <li>
          <strong>Advertisers pay.</strong> Now the app's customer is the
          advertiser and you're the inventory. Ad SDKs typically ship device
          identifiers off to networks whose privacy policies you never see,
          and the incentive is to know as much about you as possible.
        </li>
        <li>
          <strong>Data buyers pay.</strong> The quiet one. Nobody advertises
          this on the app-store page; you find it in a clause about
          "partners" and "research".
        </li>
      </ul>
      <p>
        You can usually tell which one you're in by reading two things: the
        privacy policy's sharing section, and the app-store data-safety
        label. If the label lists financial info collected and linked to your
        identity for advertising, that's the whole answer.
      </p>

      <h2>Six questions worth asking</h2>
      <ol>
        <li>
          <strong>Does it show ads?</strong> If yes, assume some data goes to
          an ad network.
        </li>
        <li>
          <strong>Who else gets the data?</strong> Look for "partners",
          "affiliates", "service providers" and read what they're allowed to
          do with it.
        </li>
        <li>
          <strong>Is there third-party analytics?</strong> Session recording
          and behavioural analytics in a finance app means a third party
          holds a copy of your screens.
        </li>
        <li>
          <strong>Does your data train an AI model?</strong> An increasingly
          common clause, often buried in an "improving our services"
          sentence.
        </li>
        <li>
          <strong>Can you export everything?</strong> An app that can't emit
          a CSV is an app that's holding your history hostage.
        </li>
        <li>
          <strong>Can you actually delete it?</strong> Deleting the app is
          not deleting the account.
        </li>
      </ol>

      <h2>Where SplitPocket stands</h2>
      <p>
        We'd rather state it plainly than make you find it in a policy:
      </p>
      <ul>
        <li>
          <strong>No ads.</strong> Not now, not as a free tier, not as
          "relevant offers".
        </li>
        <li>
          <strong>No selling your data</strong>, to anyone, for anything.
        </li>
        <li>
          <strong>No third-party analytics or trackers</strong>, not in the
          app, and not on this website. The page you're reading loads no
          third-party scripts at all.
        </li>
        <li>
          <strong>No feeding your ledger to AI systems.</strong>
        </li>
        <li>
          <strong>Your data leaves with you</strong> as CSV, whenever you
          want it.
        </li>
        <li>
          <strong>Access rules live in the database</strong>, enforced
          per-row, not just checked in the app. Group members see the
          group's expenses; your personal expenses are yours.
        </li>
      </ul>
      <p>
        The full text is on the{" "}
        <a href="/privacy/">privacy page</a>, and it's short enough to read
        in one sitting, which is itself a design decision.
      </p>

      <Note title="Offline-first is a privacy feature too">
        <a href="/blog/offline-first-expense-tracking/">An app that reads from
        your own device</a> doesn't need to phone home
        every time you glance at a balance. Fewer requests means less
        metadata about when you open the app, where you are, and what you're
        looking at.
      </Note>

      <h2>The test that matters</h2>
      <p>
        Imagine your expense history printed out and handed to a stranger who
        wanted to sell you something. That's the actual risk model for
        ad-supported finance apps. Not a dramatic breach, just the ordinary
        daily business of the thing. Pick an app whose business doesn't
        require it.
      </p>
    </Article>
  );
}
