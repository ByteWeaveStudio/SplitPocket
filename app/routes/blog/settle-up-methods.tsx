import type { Route } from "./+types/settle-up-methods";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("settle-up-methods");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Record the settlement for the amount that actually moved, on the day it moved, with the method in the description.",
        "Pay the exact figure. Rounding up leaves a credit that turns into a small mystery three weeks later.",
        "'I'll get the next one' is an unrecorded loan, and it's the single most common way group ledgers go wrong.",
      ]}
    >
      <p>
        Splitting is the part apps are built for. Settling is the part that
        actually ends the argument, and it's mostly a discipline problem,
        not a payments problem. The money is easy to send. Recording it so
        nobody has to ask again is the bit people skip.
      </p>

      <h2>The payment: use whatever's already open</h2>
      <ul>
        <li>
          <strong>UPI</strong> for anything domestic in India: instant, free,
          exact to the paisa, and it leaves a reference you can point at.
        </li>
        <li>
          <strong>Bank transfer</strong> for larger amounts, or when the
          person's UPI limit is in the way.
        </li>
        <li>
          <strong>Cash</strong> when you're standing next to each other and
          the amount is small. Record it immediately, because cash is the
          only method that leaves no trace at all.
        </li>
        <li>
          <strong>Cross-border</strong>: whatever's cheapest between the two
          of you. Agree who absorbs the fee before you send, not after.
        </li>
      </ul>
      <p>
        SplitPocket doesn't{" "}
        <a href="/blog/debt-simplification-explained/">move money</a>. It
        records that you did. That's
        deliberate: no payment rails to lock you into a country, no cut of
        your transfers, no reason for the app to know your bank.
      </p>

      <h2>The recording: three fields, ten seconds</h2>
      <Ledger
        title="Settlement"
        note="recorded the same evening"
        rows={[
          { label: "Priya → you", sub: "UPI · 6 August", amount: "₹4,628.33" },
        ]}
        total={{ label: "Priya's balance in the group", amount: "₹0.00", tone: "positive" }}
      />
      <p>
        Who paid whom, how much, and when. Put the method in the note, "UPI"
        or "cash to Arjun at the station", because in four months the
        question won't be whether it was paid but how, and a two-word note
        answers it instantly.
      </p>

      <Note title="Pay the exact number">
        The balance says ₹4,628.33 and the temptation is to send ₹4,630 and
        wave it off. Now there's a ₹1.67 credit floating in the group that
        will confuse someone at the next settle-up. UPI does paise. Use them.
      </Note>

      <h2>Partial settlements are fine</h2>
      <p>
        If Kabir can send ₹8,000 today and the remaining ₹4,290 on payday,
        record the ₹8,000 today. The balance drops, the group can see it
        dropped, and nobody has to hold a promise in their head. A ledger
        that only accepts complete payments quietly encourages people to pay
        nothing until they can pay everything.
      </p>

      <h2>Who records it</h2>
      <p>
        Whoever pays, at the moment they pay. They're the one holding the
        phone with the transfer confirmation on it. The receiver's job is to
        notice it appear and say nothing if it's right. If a settlement shows
        up that you don't recognise, ask that day, not at the next trip.
      </p>

      <h2>The four ways this goes wrong</h2>
      <ol>
        <li>
          <strong>"I'll get the next one."</strong> An unrecorded loan
          between friends, priced by nobody, remembered differently by each
          side. It's the most common source of quiet resentment in a group,
          and it costs ten seconds to avoid.
        </li>
        <li>
          <strong>Paying outside the ledger and forgetting to record it.</strong>{" "}
          The balance stays open, someone chases it, and now the person who
          paid feels accused. Record it as you send it, in the same minute.
        </li>
        <li>
          <strong>Settling a group that isn't finished.</strong> Two more
          expenses land after everyone paid, and you're back to three
          transfers. Close the expenses first, then settle. Pick a cut-off
          and say it out loud.
        </li>
        <li>
          <strong>Netting in your head.</strong> "You owe me 400, I owe you
          250, just give me 150." Correct, and unrecorded, and now the app
          and reality disagree. Let the balances do the netting; they're
          better at it and they remember.
        </li>
      </ol>

      <h2>Settle on a date, not on a mood</h2>
      <p>
        The best thing a group can do is agree a day: the last evening of a
        trip, the 3rd of the month for a flat, the Sunday after a wedding.
        Asking becomes routine instead of pointed, and nobody has to be the
        one who brings it up.
      </p>
      <p>
        When the group reads "settled up", that's the real product. Not the
        splitting, but the fact that nobody is keeping score any more.
      </p>
    </Article>
  );
}
