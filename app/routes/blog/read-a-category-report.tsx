import type { Route } from "./+types/read-a-category-report";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("read-a-category-report");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Read the fixed share first: what's already decided tells you how much of the month you could actually influence.",
        "One large one-off distorts everything, so check whether the surprising line is a habit or an event.",
        "A category you can't act on is a category that's too broad. Split it until each line suggests a decision.",
      ]}
    >
      <p>
        A monthly report is not a scoreboard. It's a document with four
        questions in it, and if you only look at the biggest bar you'll miss
        three of them. Here's a real-looking month, read properly.
      </p>

      <Ledger
        title="March, by category"
        note="₹61,340.00 total"
        rows={[
          { label: "Rent", sub: "31% of the month", amount: "₹19,200.00" },
          { label: "Groceries", sub: "15%", amount: "₹9,340.00" },
          { label: "Health", sub: "15%", amount: "₹8,900.00" },
          { label: "Eating out", sub: "12%", amount: "₹7,100.00" },
          { label: "Shopping", sub: "10%", amount: "₹6,200.00" },
          { label: "Bills", sub: "7%", amount: "₹4,180.00" },
          { label: "Transport", sub: "5%", amount: "₹3,250.00" },
          { label: "Other", sub: "5%", amount: "₹3,170.00" },
        ]}
        total={{ label: "Total", amount: "₹61,340.00" }}
      />

      <h2>Question 1: how much of this was already decided?</h2>
      <p>
        Add the lines you had no say in this month. Rent and bills come to
        ₹23,380, and <strong>38% of the month was settled before it
        started</strong>. That number is more useful than any individual
        category, because it tells you how much of your spending is even
        available to change.
      </p>
      <p>
        If the fixed share is high, the leverage isn't in skipping coffees.
        It's in the annual conversation about rent, insurance and
        subscriptions.
      </p>

      <h2>Question 2: is the surprising line a habit or an event?</h2>
      <p>
        Health at ₹8,900 is the eye-catching one. But ₹6,500 of it was a
        single dental appointment. Strip it out and health is ₹2,400, which
        is the normal month, and the total becomes ₹54,840.
      </p>
      <p>
        The question to ask of any spike: <em>will this line look like this
        again next month?</em> An event needs no response beyond noticing it.
        A habit needs a decision.
      </p>

      <h2>Question 3: what moved since last month?</h2>
      <p>
        Levels are less informative than changes. Groceries at ₹9,340 means
        nothing on its own; groceries at ₹9,340 after two months around
        ₹8,500 means something started: a flatmate left, prices moved, or
        you've been buying dinner ingredients you don't cook.
      </p>
      <p>
        Flip back through two or three months in the report. It takes ten
        seconds and it's where nearly all the useful information lives.
      </p>

      <h2>Question 4: what isn't in here?</h2>
      <p>
        Every report has holes. The usual ones:
      </p>
      <ul>
        <li>
          <strong>Cash.</strong> Untracked cash spending is invisible by
          definition. If your ledger shows ₹200 of cash a month, it's not
          measuring reality.
        </li>
        <li>
          <strong>Money someone else fronted.</strong> Your third of the
          flat's ₹21,750 of shared costs is real spending, even if it left
          your account as one settlement to a flatmate. Read the personal
          report and the group balances in the same sitting.
        </li>
        <li>
          <strong>Cards you didn't connect, accounts you forgot.</strong> The
          partner's card, the company card you use personally, the wallet
          balance.
        </li>
      </ul>

      <h2>Three traps</h2>
      <ol>
        <li>
          <strong>The one-off that rewrites the story.</strong> Covered
          above, and the most common misreading there is. One flight, one
          repair, one gift can make a normal month look like a crisis.
        </li>
        <li>
          <strong>Categories too broad to act on.</strong> "Shopping ₹6,200"
          and "Other ₹3,170" are 15% of the month explaining nothing. If a
          line doesn't suggest a decision, it's the wrong line. Split
          shopping into clothes, home and gifts and the answer usually
          appears immediately.
        </li>
        <li>
          <strong>Comparing yourself to a benchmark.</strong> The right
          comparison is your own last three months. Somebody else's grocery
          bill is a different city, a different household and a different
          diet.
        </li>
      </ol>

      <Note title="Two minutes, once a month">
        Read the fixed share, find the biggest mover, check whether the
        surprise is an event, and pick one thing to change. That's the whole
        ritual. Reports that take an hour don't get read twice.
      </Note>

      <h2>Then turn it into next month's budget</h2>
      <p>
        A report you only look at is a report that changes nothing. Take the
        <a href="/blog/monthly-budget-that-holds/">median of the last three
        months</a> for each category, add about 10% to
        the variable ones, cut exactly one line on purpose, and you have next
        month's budget, built from evidence rather than intention.
      </p>
    </Article>
  );
}
