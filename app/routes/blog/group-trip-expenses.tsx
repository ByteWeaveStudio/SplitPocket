import type { Route } from "./+types/group-trip-expenses";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("group-trip-expenses");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Log each expense as it happens, against whoever actually paid, so the trip's accounting is already done when you land.",
        "Not every expense is split by everyone: the scooter and the rafting only involve the people who went.",
        "Seven expenses across four people produce three payments at the end, totalling ₹16,171.67, and everyone nets to zero.",
      ]}
    >
      <p>
        Six days in Manali, four friends, one person who ends up paying for
        the villa because they had the card handy. By day three nobody
        remembers who covered the cab. By day six there's a WhatsApp thread
        with the word "roughly" in it. Here's the whole trip run properly,
        with every number shown.
      </p>

      <h2>Set the group up before you leave</h2>
      <p>
        One group, named for the trip, in one currency, with the four of you
        in it. That's the entire setup. Do it at the airport while you're
        waiting, not on day four when the arguing starts.
      </p>

      <h2>The seven expenses</h2>
      <p>
        Each one logged by the person who paid, in the moment, in about ten
        seconds. Notice that three of them aren't split by everyone.
      </p>
      <Ledger
        title="Manali: all expenses"
        note="6 days · 4 people"
        rows={[
          { label: "Airport cab", sub: "Priya paid · split 4 ways", amount: "₹3,600.00" },
          { label: "Villa, 3 nights", sub: "You paid · split 4 ways", amount: "₹18,000.00" },
          { label: "Groceries", sub: "Arjun paid · split 4 ways", amount: "₹2,480.00" },
          { label: "Dinner, day 2", sub: "Sam paid · split 4 ways", amount: "₹4,200.00" },
          { label: "Scooter rental", sub: "Priya paid · you, Priya, Arjun", amount: "₹1,600.00" },
          { label: "Rafting", sub: "You paid · Priya, Arjun, Sam", amount: "₹6,000.00" },
          { label: "Fuel", sub: "Arjun paid · split 4 ways", amount: "₹900.00" },
        ]}
        total={{ label: "Trip total", amount: "₹36,780.00" }}
      />
      <p>
        The scooter was rented by three of you; Sam didn't ride. You sat out
        the rafting. Those two exclusions are the whole reason a group app
        beats a spreadsheet. In a spreadsheet, "everyone except Sam" is a
        formula you get wrong at 1am.
      </p>

      <h2>What each person paid, and what each person owed</h2>
      <Ledger
        title="Paid out of pocket"
        rows={[
          { label: "You", sub: "villa + rafting", amount: "₹24,000.00" },
          { label: "Priya", sub: "cab + scooter", amount: "₹5,200.00" },
          { label: "Arjun", sub: "groceries + fuel", amount: "₹3,380.00" },
          { label: "Sam", sub: "dinner", amount: "₹4,200.00" },
        ]}
        total={{ label: "Matches the trip total", amount: "₹36,780.00", tone: "positive" }}
      />
      <Ledger
        title="Fair share of what was spent"
        note="after the two partial splits"
        rows={[
          { label: "You", sub: "no rafting", amount: "₹7,828.33" },
          { label: "Priya", amount: "₹9,828.33" },
          { label: "Arjun", amount: "₹9,828.34" },
          { label: "Sam", sub: "no scooter", amount: "₹9,295.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹36,780.00", tone: "positive" }}
        caption="The scooter's ₹1,600 divides into three as ₹533.33, ₹533.33 and ₹533.34, so the stray paisa lands on Arjun."
      />

      <h2>The balances</h2>
      <p>
        Paid minus owed. Positive means the trip owes you; negative means you
        owe the trip.
      </p>
      <Ledger
        title="Net position"
        rows={[
          { label: "You", sub: "gets back", amount: "+₹16,171.67", tone: "positive" },
          { label: "Priya", sub: "owes", amount: "−₹4,628.33", tone: "negative" },
          { label: "Arjun", sub: "owes", amount: "−₹6,448.34", tone: "negative" },
          { label: "Sam", sub: "owes", amount: "−₹5,095.00", tone: "negative" },
        ]}
        total={{ label: "Sums to zero, as it must", amount: "₹0.00", tone: "positive" }}
      />

      <h2>Settling: three payments, not twelve</h2>
      <p>
        Twenty-odd individual debts came out of those seven expenses: you
        owe Priya for the cab, Priya owes you for the villa, and so on in
        both directions.{" "}
        <a href="/blog/debt-simplification-explained/">Almost all of it
        cancels</a>. What's left is one payment
        per person who owes:
      </p>
      <Ledger
        title="Settle up"
        note="3 payments"
        rows={[
          { label: "Priya → you", amount: "₹4,628.33" },
          { label: "Arjun → you", amount: "₹6,448.34" },
          { label: "Sam → you", amount: "₹5,095.00" },
        ]}
        total={{ label: "Clears every debt", amount: "₹16,171.67", tone: "positive" }}
      />
      <p>
        Three transfers on the train home and the group reads "settled up".
        Nobody had to reconstruct anything, because nothing was ever
        reconstructed. It was recorded as it happened.
      </p>

      <Note title="The one habit that makes this work">
        Log it while you're standing at the counter. Not tonight, not on the
        flight back. An expense you enter three days later is an expense you
        enter wrong, and an expense you never enter is a friend paying for
        you without knowing it.
      </Note>

      <h2>Four things worth agreeing on day one</h2>
      <ul>
        <li>
          <strong>Who books the big things.</strong> One person fronting the
          villa is fine. It's visible in the ledger from minute one, so it
          never feels like a favour being called in later.
        </li>
        <li>
          <strong>What counts as group spend.</strong> Food, transport,
          stays, activities everyone joins. Not souvenirs, not that person's
          extra massage.
        </li>
        <li>
          <strong>A spending line.</strong> Above, say, ₹2,000, ask the group
          before you buy on its behalf.
        </li>
        <li>
          <strong>When you settle.</strong> Pick the last evening, or the day
          after you're all home. A date, not a mood.
        </li>
      </ul>

      <h2>And when the signal dies</h2>
      <p>
        It will: in the valley, on the drive, in the basement restaurant
        with the good food. SplitPocket writes to your device first and syncs
        when you're back on a network, so the ledger is never a reason to
        say "I'll add it later". Later is where trips lose ₹4,000.
      </p>
    </Article>
  );
}
