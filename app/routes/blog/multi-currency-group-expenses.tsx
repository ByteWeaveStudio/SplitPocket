import type { Route } from "./+types/multi-currency-group-expenses";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("multi-currency-group-expenses");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Give the group one currency, the one you'll actually settle in, and convert each expense as you enter it.",
        "Use the rate you were actually charged, from your card statement, and write the original amount into the description.",
        "Never re-convert old expenses at a new rate: balances would move for people who didn't spend anything.",
      ]}
    >
      <p>
        Three of you land in Bali having already paid for flights in rupees,
        eat at Changi in Singapore dollars, and pay for the villa in
        rupiah, a number with six digits in it. Somebody suggests "we'll
        work it out at the end". Nobody works it out at the end.
      </p>
      <p>
        A group in SplitPocket has one currency, on purpose. Here's how to
        run a three-currency trip inside it honestly.
      </p>

      <h2>Pick the currency you'll settle in</h2>
      <p>
        Not the currency you're spending in. The one the final transfers
        will happen in. For a group of friends who all bank in India, that's
        rupees, even for a trip where you never touch a rupee. Set it when
        you create the group, before the first expense, because it's the one
        decision that's annoying to change later.
      </p>

      <h2>Convert at entry, using the rate you were actually charged</h2>
      <p>
        There are three rates on any given day: the mid-market rate you see
        when you search, the rate your card gave you, and the rate the
        airport counter gave you. Only one of them describes money that
        actually left your account. Use the rate from your statement, since it
        already includes the forex markup, which is a real cost somebody has
        to bear.
      </p>
      <Ledger
        title="Bali: three currencies, one ledger"
        note="group currency: INR · 3 people"
        rows={[
          {
            label: "Flights",
            sub: "paid in INR",
            amount: "₹12,400.00",
          },
          {
            label: "Villa, 4 nights",
            sub: "IDR 1,850,000 @ 195 per ₹1",
            amount: "₹9,487.18",
          },
          {
            label: "Changi dinner",
            sub: "SGD 42.00 @ ₹65.00",
            amount: "₹2,730.00",
          },
        ]}
        total={{ label: "Trip total", amount: "₹24,617.18" }}
        caption="Rates shown are illustrative. Use whatever your own statement says."
      />
      <p>
        Split three ways, that's ₹8,205.73, ₹8,205.73 and ₹8,205.72. The odd
        two paise go to the first two shares so the column still totals
        ₹24,617.18 exactly. This is the entire reason money should be handled
        in whole minor units rather than floating-point rupees.
      </p>

      <h2>Put the original amount in the description</h2>
      <p>
        <code>Villa 4 nights, IDR 1,850,000 @ 195</code>. It costs you four
        seconds and it settles every future argument, because the person
        querying the number can check your arithmetic instead of your
        memory. It also means the expense still makes sense in eight months
        when someone is doing their taxes.
      </p>

      <Note title="Never re-convert history">
        If you go back and re-price last week's villa at today's rate,
        everyone's balance changes even though nobody spent anything. The
        rate on the day the money moved is the honest one. Convert once,
        record it, leave it alone.
      </Note>

      <h2>Minor units are not always two decimals</h2>
      <p>
        A rupee is 100 paise and a dollar is 100 cents, so people assume
        every currency has two decimal places. The yen has none: ¥1,500 is
        1,500 minor units, and "¥1,500.00" is a formatting bug. Dinars have
        three. An app that stores everything as "amount × 100" gets Japan
        wrong, and gets it wrong silently.
      </p>
      <p>
        SplitPocket handles ten currencies using the real ISO 4217 rules for
        each: how many decimal places, how the symbol is placed, how digits
        are grouped. ₹1,00,000 groups differently from $100,000, and both
        are printed the way the people reading them expect.
      </p>

      <h2>The cash pool problem</h2>
      <p>
        Someone changes ₹15,000 into rupiah at the airport and becomes the
        group's wallet for the week. Don't log the exchange as an expense:
        no money has been spent, it's just changed shape. Instead:
      </p>
      <ul>
        <li>
          The pool holder logs each thing the cash pays for as a normal
          expense, paid by them, converted at the rate they got at the
          counter.
        </li>
        <li>
          Anyone who contributed to the pool records it as a settlement to
          <a href="/blog/settle-up-methods/">the pool holder</a>, because
          that's money that genuinely moved between two
          people.
        </li>
        <li>
          Leftover cash at the end goes back proportionally, or gets recorded
          as a settlement in the other direction. Either way it's a real
          transfer, not an expense.
        </li>
      </ul>

      <h2>Settling across borders</h2>
      <p>
        Settle in the group's currency, using whatever rail is cheapest
        between the two people involved: UPI at home, a transfer app across
        borders. Record the settlement for the amount the ledger says, and
        if the transfer fee came out of the receiver's end, log that fee as
        its own small expense rather than fudging the settlement amount.
      </p>
      <p>
        The principle underneath all of this: <strong>the ledger records what
        happened, not what should have happened</strong>. Fees happened. Bad
        airport rates happened. Write them down and the numbers stay
        trustworthy.
      </p>
    </Article>
  );
}
