import type { Route } from "./+types/split-a-restaurant-bill";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("split-a-restaurant-bill");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Split the subtotal by what each person ordered, then scale every share by the same factor for tax and tip.",
        "One multiplication does the whole table: no per-item tax math, no arguing about whose dish carried the service charge.",
        "An equal split of an unequal table can move ₹240 from the person who ate least to the person who ate most.",
      ]}
    >
      <p>
        The bill arrives, someone says "shall we just split it four ways?",
        and the person who had soup and water says "sure". That's the moment
        the ledger goes quietly wrong. Here's the fair way, and it takes one
        multiplication.
      </p>

      <h2>The bill</h2>
      <Ledger
        title="Dinner for four"
        note="Saturday"
        rows={[
          { label: "Food and drinks (subtotal)", amount: "₹3,240.00" },
          { label: "GST at 5%", amount: "₹162.00" },
          { label: "Tip at 10% of subtotal", amount: "₹324.00" },
        ]}
        total={{ label: "Total to pay", amount: "₹3,726.00" }}
      />
      <p>
        Four people, four very different appetites. What each person actually
        ordered, before tax and tip:
      </p>
      <Ledger
        title="Who ordered what"
        note="subtotal only"
        rows={[
          { label: "You", amount: "₹1,020.00" },
          { label: "Priya", amount: "₹640.00" },
          { label: "Arjun", amount: "₹980.00" },
          { label: "Sam", amount: "₹600.00" },
        ]}
        total={{ label: "Matches the subtotal", amount: "₹3,240.00", tone: "positive" }}
      />

      <h2>Scale, don't itemise</h2>
      <p>
        You don't need to work out the tax on each dish. Tax and tip are both
        proportional to the subtotal, so everyone's share grows by the same
        factor:
      </p>
      <blockquote>
        ₹3,726.00 ÷ ₹3,240.00 = 1.15, so every subtotal share is multiplied by
        1.15.
      </blockquote>
      <Ledger
        title="Final shares"
        note="subtotal × 1.15"
        rows={[
          { label: "You", sub: "₹1,020.00 × 1.15", amount: "₹1,173.00" },
          { label: "Priya", sub: "₹640.00 × 1.15", amount: "₹736.00" },
          { label: "Arjun", sub: "₹980.00 × 1.15", amount: "₹1,127.00" },
          { label: "Sam", sub: "₹600.00 × 1.15", amount: "₹690.00" },
        ]}
        total={{ label: "Adds up exactly", amount: "₹3,726.00", tone: "positive" }}
      />
      <p>
        In SplitPocket, that's one expense of ₹3,726.00 split{" "}
        <a href="/blog/equal-exact-or-percentage/">
          <strong>by exact amounts</strong>
        </a>
        . Type the four numbers; the app
        refuses to save until they add up to the total, which is exactly the
        check you want at 11pm.
      </p>

      <h2>What the lazy split costs</h2>
      <p>
        An equal four-way split of ₹3,726.00 is ₹931.50 each. Compare that to
        the fair shares:
      </p>
      <Ledger
        title="Equal split vs fair split"
        note="difference per person"
        rows={[
          { label: "You", sub: "₹931.50 instead of ₹1,173.00", amount: "−₹241.50", tone: "positive" },
          { label: "Priya", sub: "₹931.50 instead of ₹736.00", amount: "+₹195.50", tone: "negative" },
          { label: "Arjun", sub: "₹931.50 instead of ₹1,127.00", amount: "−₹195.50", tone: "positive" },
          { label: "Sam", sub: "₹931.50 instead of ₹690.00", amount: "+₹241.50", tone: "negative" },
        ]}
        caption="Sam pays ₹241.50 extra for a soup. Once is generosity; every Saturday is a subscription."
      />

      <h2>The cases that need a second line</h2>
      <ul>
        <li>
          <strong>Shared starters.</strong> Add the plates you genuinely
          shared into a separate equal split, and keep individual orders on
          the exact-amounts line. Two expenses is fine. Two expenses is
          honest.
        </li>
        <li>
          <strong>Drinks when half the table doesn't drink.</strong> Same
          answer: separate expense, split among the people who drank. This is
          the single most common source of quiet resentment in a group.
        </li>
        <li>
          <strong>A service charge you didn't agree to.</strong> It's part of
          the total, so it scales like tax. If you get it removed, remove it
          before you split.
        </li>
        <li>
          <strong>Someone paid partly in cash.</strong> Record the full bill
          against whoever's card was charged, then record the cash as a
          settlement from the person who handed it over. Two clean rows beat
          one confusing one.
        </li>
      </ul>

      <Note title="A rule that keeps it quick">
        Under about ₹500 of difference between the biggest and smallest
        order, just split equally and move on. Precision is a tool for
        fairness, not a personality.
      </Note>

      <h2>Do it before the card machine arrives</h2>
      <p>
        The whole thing is: total, four numbers, save. It takes less time
        than the card machine takes to boot, and the balances are settled
        before anyone stands up. That's the difference between a group that
        keeps using an app and a group that goes back to "I'll get you next
        time", a promise nobody has ever kept twice.
      </p>
    </Article>
  );
}
