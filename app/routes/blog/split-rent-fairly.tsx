import type { Route } from "./+types/split-rent-fairly";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("split-rent-fairly");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Equal shares are the fastest answer and often the wrong one, but they're the only ones nobody has to defend.",
        "Half equal, half by room area is the fairest formula for most flats: you all share the kitchen, only the bedrooms differ.",
        "Whatever you pick, write it down as percentages and let the app do the arithmetic every month.",
      ]}
    >
      <p>
        Three people, one flat, one rent. One bedroom has a balcony and the
        morning light. One is a box beside the kitchen with a window onto the
        stairwell. Dividing the rent into three equal parts is the fastest
        answer, and it is quite often the wrong one.
      </p>
      <p>
        Here are three ways to divide it that you can actually defend at the
        dinner table, with the exact math for each. The flat rents for{" "}
        <strong>₹48,000 a month</strong>.
      </p>

      <h2>Start with the number that doesn't move</h2>
      <p>
        Whatever you agree, the shares have to add up to exactly ₹48,000:
        not ₹47,999.99, not ₹48,000.02. That sounds obvious until you divide
        by three and start rounding. Every method below reconciles to the
        paisa, because a rent split that leaks two rupees a month is a rent
        split someone will eventually re-litigate.
      </p>

      <h2>Method 1: equally</h2>
      <Ledger
        title="Rent split equally"
        note="3 people"
        rows={[
          { label: "Rohan, large room", amount: "₹16,000.00" },
          { label: "Meera, middle room", amount: "₹16,000.00" },
          { label: "Kabir, small room", amount: "₹16,000.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹48,000.00", tone: "positive" }}
      />
      <p>
        Use it when the rooms are genuinely comparable, or when you'd rather
        not put a price on your friendships. Its real advantage is social:
        nobody has to argue for it, and nobody feels measured.
      </p>

      <h2>Method 2: half equal, half by room area</h2>
      <p>
        You all pay for the kitchen, the living room, the wifi and the
        landlord's mood. Only the bedrooms differ. So split half the rent
        equally and the other half by bedroom area. The rooms are 180, 140
        and 120 square feet, 440 in total.
      </p>
      <Ledger
        title="₹24,000 equally + ₹24,000 by area"
        note="440 sq ft of bedrooms"
        rows={[
          { label: "Rohan", sub: "180 sq ft · ₹8,000.00 + ₹9,818.18", amount: "₹17,818.18" },
          { label: "Meera", sub: "140 sq ft · ₹8,000.00 + ₹7,636.36", amount: "₹15,636.36" },
          { label: "Kabir", sub: "120 sq ft · ₹8,000.00 + ₹6,545.46", amount: "₹14,545.46" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹48,000.00", tone: "positive" }}
        caption="The smallest room pays 9% less than an equal share; the largest pays 11% more."
      />
      <p>
        Look closely at Kabir's line. His share of the area portion is{" "}
        <code>120 ÷ 440 × ₹24,000</code>. That comes to ₹6,545.4545…, a fraction
        of a paisa. Somebody has to absorb the leftover. The honest way is
        largest-remainder: the odd paisa goes to whoever's fractional part
        was biggest, which here is Kabir. It is one paisa. The point is that
        the column still totals ₹48,000.00.
      </p>
      <Note title="Don't weight by area alone">
        Pure area splits punish the small room twice: it's smaller and it
        pays for a share of a kitchen it doesn't own. Splitting the shared
        half equally is what keeps the formula defensible.
      </Note>

      <h2>Method 3: by agreement, written as percentages</h2>
      <p>
        Sometimes the split isn't a formula, it's a negotiation. Someone
        works from home and uses the flat twelve hours a day. Someone took
        the small room in exchange for a smaller share. Someone's partner is
        over four nights a week. Settle it in conversation, then write the
        outcome as percentages so the arithmetic can't drift later.
      </p>
      <Ledger
        title="Rent split 40 / 32 / 28"
        note="agreed in April"
        rows={[
          { label: "Rohan", sub: "40%", amount: "₹19,200.00" },
          { label: "Meera", sub: "32%", amount: "₹15,360.00" },
          { label: "Kabir", sub: "28%", amount: "₹13,440.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹48,000.00", tone: "positive" }}
      />

      <h2>The four things that actually cause arguments</h2>
      <p>
        Not the method. These:
      </p>
      <ul>
        <li>
          <strong>The partner who stays over.</strong> Agree a line before
          it's a grievance: a number of nights a month, or a flat monthly
          add to that person's share. Any rule beats an atmosphere.
        </li>
        <li>
          <strong>Moving in mid-month.</strong> Pro-rate the share, not the
          rent. Meera's ₹15,360 share, joining on the 12th of a 31-day month,
          is <code>₹15,360 × 20 ÷ 31 = ₹9,909.68</code>.
        </li>
        <li>
          <strong>Room-specific bills.</strong> The AC in one bedroom, the
          extra fridge. Log them as their own expense with their own split.
          Folding them into rent hides them forever.
        </li>
        <li>
          <strong>The deposit.</strong> It isn't rent. Record who put in what,
          leave it out of the monthly split, and settle it at move-out
          against whatever the landlord actually returns.
        </li>
      </ul>

      <h2>Set it up once, then forget it</h2>
      <p>
        In SplitPocket: one group for the flat, in your currency, with the
        three of you in it. Add rent as a recurring expense on the 1st, split
        by percentage using whichever set you agreed. Whoever pays the
        landlord logs it as the payer, and the other two show as owing their
        share the moment the month turns over.
      </p>
      <p>
        Then the bills, the groceries and the plumber go into the same group
        through the month, and on settle-up day the app tells you the fewest
        payments that clear everything. No spreadsheet, no monthly
        negotiation, no one keeping quiet score.
      </p>
      <p>
        The method matters less than writing it down. Pick one this week, put
        it in the group, and never have the conversation again.
      </p>
    </Article>
  );
}
