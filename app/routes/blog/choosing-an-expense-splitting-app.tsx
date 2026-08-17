import type { Route } from "./+types/choosing-an-expense-splitting-app";
import { Article, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("choosing-an-expense-splitting-app");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Test three things in the store before you commit a trip to an app: aeroplane mode, ₹100 split three ways, and the taps it takes to add an expense.",
        "Ask who pays for the app. Ads in a finance app mean an ad network gets to know something about your spending.",
        "Decide up front whether you want shared costs only, or your own money in the same place.",
      ]}
    >
      <p>
        Choosing the app is a five-minute decision that six people then live
        inside for a week, and switching mid-trip is genuinely painful, because the
        history doesn't come with you. So it's worth five real minutes.
      </p>
      <p>
        Here are twelve questions, roughly in order of how much they'll
        annoy you if you get them wrong.
      </p>

      <h2>The three tests you can run in four minutes</h2>
      <ol>
        <li>
          <strong>Aeroplane mode.</strong> Turn it on, open the app. Do you
          see your data, or a spinner? Then add an expense. Does it save?
          Force-quit, reopen, still offline. Is it still there? Most
          shortlists get shorter right here.
        </li>
        <li>
          <strong>₹100 split three ways.</strong> The shares should be
          ₹33.34, ₹33.33 and ₹33.33 and they should total exactly ₹100. If
          you see ₹33.33 three times, the app is losing a paisa per split and
          you now know how it treats money generally.
        </li>
        <li>
          <strong>Count the taps.</strong> From opening the app to a saved
          expense. Anything over about five and nobody will log the ₹90 auto,
          which means the ledger is wrong in exactly the small, frequent way
          that adds up.
        </li>
      </ol>

      <h2>The nine questions to ask before you commit</h2>
      <ol>
        <li>
          <strong>Shared costs only, or your own money too?</strong> Most
          splitting apps are for group expenses and nothing else. If you also
          want to know where your own month went, you either want one app
          that does both or you're accepting two.
        </li>
        <li>
          <strong>Can it split by exact amounts and percentage?</strong> Not
          just equally. Rent by room size and a restaurant bill by what
          people ordered both need more than an equal split.
        </li>
        <li>
          <strong>Does it simplify debts?</strong> Twenty IOUs should become
          three or four payments, and you should still be able to see the
          original expenses behind them.
        </li>
        <li>
          <strong>Who pays for the app?</strong> If it shows ads,{" "}
          <a href="/blog/privacy-in-expense-apps/">an ad network gets to know
          something about a finance app's user</a>. That's
          the trade; make it knowingly.
        </li>
        <li>
          <strong>What does the privacy policy allow?</strong> Read the
          sharing clause and the app-store data-safety label. Look for
          "partners", third-party analytics, and anything about training
          models.
        </li>
        <li>
          <strong>Can you export everything as CSV?</strong> The exit is a
          feature. An app you can leave is an app you can trust for a year.
        </li>
        <li>
          <strong>Does everyone need an account?</strong> Some apps let
          people join by link without signing up; others (SplitPocket
          included) need each member to have an account. Neither is wrong,
          but find out before you invite five people.
        </li>
        <li>
          <strong>Does it get your currency right?</strong> Not just the
          symbol, but the decimal places and the digit grouping. ₹1,00,000 and
          ¥1,500 are both correct and both break naive implementations.
        </li>
        <li>
          <strong>Will it be here next year?</strong> Who makes it, do they
          ship, and is there a way to get your data out if the answer changes.
        </li>
      </ol>

      <Note title="The question that isn't on the list">
        Feature count. Every app in this category has more features than any
        group uses. What separates them is what happens in the four seconds
        between "I paid" and "it's recorded", and what the company does with
        the data afterwards.
      </Note>

      <h2>Our answers, briefly</h2>
      <ul>
        <li>
          <strong>Offline:</strong> reads come from your device, writes queue
          and sync. Aeroplane mode is not a special case.
        </li>
        <li>
          <strong>The paisa test:</strong> integer minor units and
          largest-remainder distribution, so every split reconciles exactly.
        </li>
        <li>
          <strong>Both halves:</strong> personal expenses and income with
          categories and monthly reports, alongside groups and splits.
        </li>
        <li>
          <strong>Splits:</strong> equally, by exact amounts, by percentage;
          simplified settle-up with the underlying expenses still visible.
        </li>
        <li>
          <strong>Business model:</strong> no ads, no data selling, no
          third-party trackers.
        </li>
        <li>
          <strong>Exit:</strong> CSV export, whenever you want it.
        </li>
        <li>
          <strong>Accounts:</strong> yes, every group member has one.
        </li>
      </ul>
      <p>
        For a row-by-row comparison against Splitwise, Tricount and Settle
        Up, see the <a href="/compare/">comparison page</a>.
      </p>

      <h2>And one piece of advice about switching</h2>
      <p>
        Don't migrate an open group. Settle whatever you're running now, then
        start the next trip or the next month in the new app. Carrying half a
        ledger across is how you end up with two sources of truth and a
        conversation nobody enjoys.
      </p>
    </Article>
  );
}
