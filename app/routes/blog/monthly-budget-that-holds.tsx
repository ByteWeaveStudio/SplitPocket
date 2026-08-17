import type { Route } from "./+types/monthly-budget-that-holds";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("monthly-budget-that-holds");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Set limits from the median of your last three months, not from the person you'd like to be.",
        "Cut exactly one category at a time. Budgets that cut five collapse in week three.",
        "Check on the 10th and the 20th, when the month can still be steered.",
      ]}
    >
      <p>
        Most budgets are written on a Sunday evening with a feeling of
        resolve, and abandoned by the 19th. Not because the person lacked
        discipline, but because the numbers were invented. A budget built from
        wishes fails on contact with an ordinary week.
      </p>
      <p>
        Here's the version that holds: it starts from what you actually
        spent.
      </p>

      <h2>Step 1: get three months of your own numbers</h2>
      <p>
        Not one month. One month is an anecdote; it contains a wedding, or a
        laptop, or a fortnight when you were away. Three months of category
        totals is enough to see the shape.
      </p>
      <Ledger
        title="What actually happened"
        note="Jan · Feb · Mar"
        rows={[
          { label: "Rent", sub: "19,200 · 19,200 · 19,200", amount: "fixed" },
          { label: "Groceries", sub: "8,900 · 9,600 · 8,150", amount: "median 8,900" },
          { label: "Eating out", sub: "6,200 · 4,800 · 7,400", amount: "median 6,200" },
          { label: "Bills", sub: "3,900 · 4,600 · 4,180", amount: "median 4,180" },
          { label: "Transport", sub: "3,100 · 2,900 · 3,050", amount: "median 3,050" },
        ]}
        caption="Use the median, not the mean. One unusual month shouldn't set your grocery budget."
      />

      <h2>Step 2: set the lines</h2>
      <p>
        Three different rules, depending on what kind of cost it is:
      </p>
      <ul>
        <li>
          <strong>Fixed costs get their exact number.</strong> Rent is
          ₹19,200. There is no judgement to make.
        </li>
        <li>
          <strong>Variable costs get the median plus about 10%.</strong>{" "}
          You're not trying to squeeze them, you're trying to notice them.
          Groceries at ₹9,800 is a line you'll usually come in under.
        </li>
        <li>
          <strong>Seasonal costs get their highest month.</strong> Bills at
          ₹4,600, because the summer electricity bill is not a moral failing.
        </li>
      </ul>
      <Ledger
        title="April's budget"
        note="one deliberate cut"
        rows={[
          { label: "Rent", sub: "fixed", amount: "₹19,200.00" },
          { label: "Groceries", sub: "median + 10%", amount: "₹9,800.00" },
          { label: "Eating out", sub: "cut from ₹6,200 median", amount: "₹5,500.00" },
          { label: "Bills", sub: "highest of three months", amount: "₹4,600.00" },
          { label: "Transport", sub: "median + 10%", amount: "₹3,400.00" },
        ]}
        total={{ label: "Monthly total", amount: "₹42,500.00" }}
      />

      <h2>Step 3: cut exactly one thing</h2>
      <p>
        This is the rule people skip and the reason their budget dies. Every
        category you cut is a decision you have to keep making all month.
        One is sustainable. Five is a diet.
      </p>
      <p>
        Above, eating out drops from ₹6,200 to ₹5,500, an 11% cut, roughly
        one restaurant meal. Everything else is set at what you already do.
        Next month, if the ₹5,500 held, cut something else. A budget is a
        ratchet, not a leap.
      </p>

      <Note title="A budget is a line you can see coming">
        Its job is not to punish you at the end of the month. Its job is to
        tell you on the 14th that groceries are running hot, while there are
        still sixteen days to do something about it.
      </Note>

      <h2>Step 4: two check-ins, on the 10th and the 20th</h2>
      <p>
        By the 10th you should be at roughly a third of each line; by the
        20th, roughly two thirds. Two-thirds of the grocery budget is
        ₹6,533. If you're at ₹8,100 on the 20th, you have ten days and
        ₹1,700, and now you know it.
      </p>
      <p>
        Reviewing on the last day of the month is not budgeting. It's
        bookkeeping with a side of regret.
      </p>

      <h2>The four traps</h2>
      <ol>
        <li>
          <strong>Categories too broad to act on.</strong> "Shopping
          ₹12,400" tells you nothing you can change. Split it until each
          line suggests a decision.
        </li>
        <li>
          <strong>Forgetting the annual bills.</strong> Insurance, domain
          renewals,{" "}
          <a href="/blog/recurring-expenses/">the yearly subscription</a>.
          Divide them by twelve and give
          them a monthly line, or they'll blow up one month a year and you'll
          call that month "unusual" every single year.
        </li>
        <li>
          <strong>Ignoring shared spend.</strong> If your flatmate pays the
          electricity and you settle up monthly, your share is real money.
          It belongs in the picture, which is why keeping your own ledger
          and your group ledgers in one app matters more than it sounds.
        </li>
        <li>
          <strong>Budgeting income you haven't got.</strong> Use last
          month's actual income, not this month's hoped-for freelance
          invoice.
        </li>
      </ol>

      <h2>What "holding" actually looks like</h2>
      <p>
        Not five green categories. A budget is working if you exceeded one
        line, knew about it on the 20th, and chose it anyway. The alternative
        (finding out on the 3rd of next month that ₹7,000 went somewhere)
        is the thing you're actually trying to fix.
      </p>
    </Article>
  );
}
