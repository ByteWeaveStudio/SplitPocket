import type { Route } from "./+types/roommate-expense-system";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("roommate-expense-system");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "One group, recurring lines for the fixed costs, everything else logged as it's bought. Twenty minutes to set up.",
        "Settle on a fixed date every month, not when someone finally gets annoyed enough to bring it up.",
        "A real month: ₹69,750 across five kinds of expense, closed with two payments.",
      ]}
    >
      <p>
        Flatshares don't fail over rent. They fail over the ₹340 of milk and
        bread that one person keeps buying, the electricity bill that lands
        in one person's name, and the plumber nobody wanted to call. The
        amounts are small and the resentment compounds monthly.
      </p>
      <p>
        Here is a system that takes twenty minutes to set up and about thirty
        seconds a week to run. Three flatmates, one flat, real numbers.
      </p>

      <h2>The twenty-minute setup</h2>
      <ol>
        <li>
          <strong>One group.</strong> Named for the flat, in your currency,
          with everyone in it. Not one group per bill: one group, forever.
        </li>
        <li>
          <strong>Recurring lines for the fixed costs.</strong> Rent on the
          1st, internet on the 5th, the cook on the 1st. They log themselves
          from then on, with the split you agreed once.
        </li>
        <li>
          <strong>An agreed settle date.</strong> The 3rd of the month, say.
          Put it in the calendar. It is far easier to pay on a date than to
          decide when to ask.
        </li>
        <li>
          <strong>A spending line.</strong> Anything over ₹2,000 on the
          flat's behalf gets a message first. Below it, just buy it and log
          it.
        </li>
      </ol>

      <h2>What goes in the group, and what doesn't</h2>
      <p>
        In: rent, utilities, internet, cook and cleaner, shared groceries,
        gas, repairs, the shared streaming subscription, anything for the
        flat itself. Out: your own food deliveries, your own laundry, the
        friend who stayed a weekend, anything you'd be uncomfortable
        itemising to the other two.
      </p>
      <p>
        Your personal spending doesn't disappear. It lives in your own
        ledger in the same app, with its own categories and its own monthly
        report. That's the point of having both halves in one place: the
        flat's money and your money stop being two separate mental systems.
      </p>

      <h2>A full month</h2>
      <p>
        Rent is <a href="/blog/split-rent-fairly/">split 40 / 32 / 28 by room
        size</a>. Everything else is equal.
        Groceries were eleven separate trips by whoever was passing the shop.
      </p>
      <Ledger
        title="Flat 402, March"
        note="3 flatmates"
        rows={[
          { label: "Rent", sub: "Rohan paid · 40 / 32 / 28", amount: "₹48,000.00" },
          { label: "Cook", sub: "Meera paid · equal", amount: "₹9,000.00" },
          { label: "Groceries", sub: "Kabir paid · 11 entries · equal", amount: "₹8,400.00" },
          { label: "Electricity", sub: "Meera paid · equal", amount: "₹3,150.00" },
          { label: "Internet", sub: "Rohan paid · equal", amount: "₹1,200.00" },
        ]}
        total={{ label: "Month total", amount: "₹69,750.00" }}
      />
      <Ledger
        title="What each person owes"
        note="their share of the month"
        rows={[
          { label: "Rohan", sub: "₹19,200.00 rent + ₹7,250.00", amount: "₹26,450.00" },
          { label: "Meera", sub: "₹15,360.00 rent + ₹7,250.00", amount: "₹22,610.00" },
          { label: "Kabir", sub: "₹13,440.00 rent + ₹7,250.00", amount: "₹20,690.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹69,750.00", tone: "positive" }}
      />
      <Ledger
        title="Net position on the 3rd"
        note="paid − owed"
        rows={[
          { label: "Rohan", sub: "paid ₹49,200.00", amount: "+₹22,750.00", tone: "positive" },
          { label: "Meera", sub: "paid ₹12,150.00", amount: "−₹10,460.00", tone: "negative" },
          { label: "Kabir", sub: "paid ₹8,400.00", amount: "−₹12,290.00", tone: "negative" },
        ]}
        total={{ label: "Sums to zero", amount: "₹0.00", tone: "positive" }}
      />
      <p>
        Two transfers close the month: Meera sends Rohan ₹10,460.00 and Kabir
        sends Rohan ₹12,290.00. Five expense categories, fifteen individual
        entries, thirty seconds of settling.
      </p>

      <Note title="Rotate who fronts the big bills">
        Rohan paying rent every month means Rohan is lending the flat ₹22,750
        for three days, every month, forever. It's fine if everyone knows;
        it's corrosive if nobody's said it out loud. Either rotate it or
        acknowledge it.
      </Note>

      <h2>The five rules that make it survive a year</h2>
      <ul>
        <li>
          <strong>Log at the shop, not at home.</strong> The entry takes ten
          seconds while you're standing at the counter and never happens once
          you've put the bags down.
        </li>
        <li>
          <strong>Name things properly.</strong> "Groceries: milk, bread,
          detergent" not "stuff". Nobody queries a line they can picture.
        </li>
        <li>
          <strong>Never round.</strong> ₹1,127 is ₹1,127. Rounding to a nice
          number feels generous once and feels like a tax after four months.
        </li>
        <li>
          <strong>Fix mistakes, don't relitigate months.</strong> Edit the
          wrong entry, say what you changed, move on. Reopening a settled
          month is how a flat stops trusting the ledger.
        </li>
        <li>
          <strong>Keep the deposit out of it.</strong> It isn't an expense.
          Record who paid what into it, and settle it against whatever the
          landlord actually returns.
        </li>
      </ul>

      <h2>When someone moves out</h2>
      <p>
        Settle the group to zero on their last day, not "we'll sort it once
        the deposit comes back", which is how ₹18,000 ends up owed to someone
        who's moved cities. Then handle the deposit as its own conversation,
        with its own numbers, in writing.
      </p>
      <p>
        Pro-rate their final month by day: a ₹15,360 share for 20 days of a
        31-day month is <code>₹15,360 × 20 ÷ 31 = ₹9,909.68</code>. Log it as
        an exact-amounts split, add the new flatmate, and the recurring lines
        carry on as if nothing happened.
      </p>
    </Article>
  );
}
