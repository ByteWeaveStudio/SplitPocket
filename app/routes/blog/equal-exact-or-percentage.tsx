import type { Route } from "./+types/equal-exact-or-percentage";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("equal-exact-or-percentage");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Equally is right when everyone consumed roughly the same, and you exclude people by unticking them, not by switching methods.",
        "Exact amounts are right when you can point at a rupee figure that belongs to one person.",
        "Percentages are right when the ratio is a standing agreement, like rent or shared bills.",
      ]}
    >
      <p>
        Three buttons: equally, by amounts, by percentage. Most people press
        the first one for everything, which works until the evening someone
        orders a starter and someone else orders four cocktails. Here's when
        each method is the fair one, and what the app does with the paise.
      </p>

      <h2>Equally: the default, and usually correct</h2>
      <p>
        A ₹2,400 dinner between four people is ₹600 each. Nothing to think
        about. The interesting case is when the total doesn't divide cleanly:
      </p>
      <Ledger
        title="₹100.00 split three ways"
        note="largest remainder"
        rows={[
          { label: "Priya", amount: "₹33.34" },
          { label: "Arjun", amount: "₹33.33" },
          { label: "Sam", amount: "₹33.33" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹100.00", tone: "positive" }}
        caption="Not ₹33.33 each, which would quietly lose a paisa on every single split."
      />
      <p>
        Money is counted in whole paise, so a third of ₹100 doesn't exist.
        Someone has to take the extra paisa, and the honest rule is to give
        it to whoever's exact share had the largest fraction left over. Over
        a year of dinners it's worth nothing. Over a year of dinners it also
        never once fails to reconcile, which is worth quite a lot.
      </p>
      <Note title="Excluding someone isn't a different method">
        If Sam didn't eat, keep the split equal and untick Sam. Switching to
        exact amounts to work around one absent person is how a group ends up
        with three inconsistent conventions by Thursday.
      </Note>

      <h2>By exact amounts: when a rupee figure belongs to one person</h2>
      <p>
        A ₹2,480 grocery run where ₹680 of it is Sam's protein powder. The
        rest is genuinely shared:
      </p>
      <Ledger
        title="Groceries: ₹2,480.00"
        note="₹1,800 shared, ₹680 Sam's"
        rows={[
          { label: "You", sub: "quarter of ₹1,800", amount: "₹450.00" },
          { label: "Priya", sub: "quarter of ₹1,800", amount: "₹450.00" },
          { label: "Arjun", sub: "quarter of ₹1,800", amount: "₹450.00" },
          { label: "Sam", sub: "₹450.00 + ₹680.00", amount: "₹1,130.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹2,480.00", tone: "positive" }}
      />
      <p>
        Exact amounts are also what you use for a restaurant bill where
        everyone ordered differently. Work out each person's share of the
        subtotal, <a href="/blog/split-a-restaurant-bill/">scale it for tax
        and tip</a>, and type in four numbers. The app
        won't let you save until they sum to the total, which is the check
        you'd otherwise skip.
      </p>

      <h2>By percentage: when the ratio is the agreement</h2>
      <p>
        Rent split by room size. Bills split by who's actually home. A couple
        who count as two people in a four-person flat. In all of these, the
        ratio is the thing you agreed on, and the rupee amount changes every
        month:
      </p>
      <Ledger
        title="Monthly bills: ₹6,000.00"
        note="35 / 35 / 30"
        rows={[
          { label: "Rohan", sub: "35%", amount: "₹2,100.00" },
          { label: "Meera", sub: "35%", amount: "₹2,100.00" },
          { label: "Kabir", sub: "30%", amount: "₹1,800.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹6,000.00", tone: "positive" }}
      />
      <p>
        Percentages have to total exactly 100%. Ninety-nine point nine isn't
        a rounding difference, it's an unfinished decision, and the app says
        so rather than silently absorbing it.
      </p>

      <h2>Choosing, in one line each</h2>
      <ul>
        <li>
          Did everyone consume roughly the same amount? →{" "}
          <strong>Equally</strong>, unticking anyone who wasn't in it.
        </li>
        <li>
          Can you point at a rupee amount that belongs to one person? →{" "}
          <strong>Exact amounts</strong>.
        </li>
        <li>
          Is there a standing agreement about the ratio? →{" "}
          <strong>Percentage</strong>.
        </li>
      </ul>

      <h2>Five mistakes that make friends quietly annoyed</h2>
      <ol>
        <li>
          <strong>Splitting equally with someone who wasn't there.</strong>{" "}
          The most common one, and the one people never mention out loud.
        </li>
        <li>
          <strong>Rounding to a nice number.</strong> "Just make it ₹1,100"
          on a ₹1,127 share is ₹27. Thirty times a year it's ₹810 that came
          out of one specific pocket.
        </li>
        <li>
          <strong>Skipping small ones.</strong> Small and frequent is the
          expensive kind. The ₹90 auto three times a week is ₹14,000 a year.
        </li>
        <li>
          <strong>Changing the method retroactively.</strong> Re-splitting
          last month's expenses because someone raised it is how a group
          stops trusting the ledger. Fix genuine errors; leave settled
          history alone.
        </li>
        <li>
          <strong>Writing "stuff" in the description.</strong> Nobody
          disputes an amount they can recognise. Everyone disputes "stuff".
        </li>
      </ol>

      <h2>Percentages and amounts do different jobs</h2>
      <p>
        Percentages express a ratio; amounts express an outcome. When you
        know the ratio and the total moves, use percentages. When you know
        the answer in rupees, use amounts. Trying to express "Sam owes
        exactly ₹680 extra" as a percentage is a calculation you'll get
        subtly wrong, every month, in a way nobody notices for half a year.
      </p>
    </Article>
  );
}
