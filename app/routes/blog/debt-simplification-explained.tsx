import type { Route } from "./+types/debt-simplification-explained";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("debt-simplification-explained");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Simplifying debts nets every person to a single number, then matches the people who owe against the people who are owed.",
        "Twenty separate IOUs between five friends collapse into four payments, and nobody's total changes by a paisa.",
        "The floor is (people who owe) + (people who are owed) − 1 payments, unless amounts happen to match exactly.",
      ]}
    >
      <p>
        Five friends, one weekend, five people who each paid for something.
        That produces twenty separate debts: every person owes every payer a
        slice of what that payer covered. Nobody is making twenty transfers.
        Here's how twenty becomes four, and why it's not a trick.
      </p>

      <h2>The weekend</h2>
      <Ledger
        title="Who paid for what"
        note="5 people · everything split equally"
        rows={[
          { label: "Dinner (you)", amount: "₹4,000.00" },
          { label: "Cab (Priya)", amount: "₹1,500.00" },
          { label: "Tickets (Arjun)", amount: "₹3,500.00" },
          { label: "Snacks (Sam)", amount: "₹1,000.00" },
          { label: "Fuel (Neha)", amount: "₹500.00" },
        ]}
        total={{ label: "Total spent", amount: "₹10,500.00" }}
        caption="Everything split five ways, so every person's fair share is ₹2,100.00."
      />
      <p>
        Each of those five expenses creates four IOUs, one from each person
        who didn't pay. Twenty debts in total, pointing in every direction.
        You owe Priya ₹300 for the cab; Priya owes you ₹800 for dinner. Both
        of those are true, and paying both would be ridiculous.
      </p>

      <h2>Step one: net everyone to a single number</h2>
      <p>
        For each person, take what they paid and subtract their ₹2,100 share.
        That single number is the only thing that matters about them.
      </p>
      <Ledger
        title="Net position"
        note="paid − ₹2,100.00 share"
        rows={[
          { label: "You", sub: "paid ₹4,000.00", amount: "+₹1,900.00", tone: "positive" },
          { label: "Arjun", sub: "paid ₹3,500.00", amount: "+₹1,400.00", tone: "positive" },
          { label: "Priya", sub: "paid ₹1,500.00", amount: "−₹600.00", tone: "negative" },
          { label: "Sam", sub: "paid ₹1,000.00", amount: "−₹1,100.00", tone: "negative" },
          { label: "Neha", sub: "paid ₹500.00", amount: "−₹1,600.00", tone: "negative" },
        ]}
        total={{ label: "Sums to zero, as it must", amount: "₹0.00", tone: "positive" }}
      />
      <p>
        Two people are owed ₹3,300 between them. Three people owe ₹3,300
        between them. The whole problem is now: move ₹3,300 from that side to
        this side, in as few moves as possible.
      </p>

      <h2>Step two: match the biggest debt to the biggest credit</h2>
      <p>
        Take whoever owes the most and whoever is owed the most, and transfer
        the smaller of the two amounts. One of them is now settled and drops
        out. Repeat.
      </p>
      <Ledger
        title="Settle up"
        note="4 payments"
        rows={[
          { label: "Neha → you", sub: "clears Neha; you're still owed ₹300.00", amount: "₹1,600.00" },
          { label: "Sam → you", sub: "clears you; Sam still owes ₹800.00", amount: "₹300.00" },
          { label: "Sam → Arjun", sub: "clears Sam; Arjun is still owed ₹600.00", amount: "₹800.00" },
          { label: "Priya → Arjun", sub: "clears both", amount: "₹600.00" },
        ]}
        total={{ label: "Total moved", amount: "₹3,300.00", tone: "positive" }}
      />
      <p>
        Twenty debts, four transfers. Check any individual: Neha paid ₹500
        and handed over ₹1,600, so she's out ₹2,100, exactly her share. Sam
        paid ₹1,000 and transferred ₹1,100, so he's out ₹2,100. You paid
        ₹4,000 and received ₹1,900, so you're out ₹2,100.
      </p>

      <h2>Why four is the floor here</h2>
      <p>
        With three people owing and two owed, the minimum is{" "}
        <code>3 + 2 − 1 = 4</code> payments, unless some subset of the
        debtors adds up exactly to one of the creditors, in which case you
        save a transfer. Here the debts are ₹600, ₹1,100 and ₹1,600, and no
        combination of them makes ₹1,900 or ₹1,400. So four it is.
      </p>
      <p>
        This is the useful mental model: <strong>every payment settles at
        least one person</strong>. The last one settles two. That's why the
        count is one less than the number of people involved on both sides.
      </p>

      <Note title="Simplification never moves money between people">
        It changes who hands cash to whom, never how much anyone is up or
        down. Neha owed the group ₹1,600 before and after; the only thing
        that changed is that she pays it in one transfer instead of four.
      </Note>

      <h2>When you don't want it simplified</h2>
      <p>
        Occasionally you do want the raw debts. If Sam borrowed ₹800 from
        Arjun personally and would rather pay Arjun directly, the simplified
        view telling him to pay you instead feels wrong, even though it's
        arithmetically identical. Two things help:
      </p>
      <ul>
        <li>
          <strong>The expenses are still there.</strong> Simplification is a
          view over the balances, not a rewrite of history. Every original
          expense, with its payer and its split, stays exactly as entered.
        </li>
        <li>
          <strong>You can just pay someone else.</strong> Record the
          settlement that actually happened. The balances take it into
          account and re-suggest the rest.
        </li>
      </ul>

      <h2>What this saves you in practice</h2>
      <p>
        A five-day trip with four people and fifteen expenses generates sixty
        raw debts. Simplified, it's usually three payments. The saving isn't
        the transfer fee. It's that nobody has to hold the whole tangle in
        their head, and nobody ends up as the group's unpaid accountant.
      </p>
    </Article>
  );
}
