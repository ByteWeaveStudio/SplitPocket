import type { Route } from "./+types/group-expense-etiquette";
import { Article, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("group-expense-etiquette");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Log it the same day, describe it in words a stranger would recognise, and never round to a nice number.",
        "Agree a spending line and a settle date up front, since both remove the need for anyone to be the one who brings it up.",
        "Raise mistakes as mistakes, immediately, and let settled months stay settled.",
      ]}
    >
      <p>
        Shared money doesn't break friendships through big betrayals. It
        breaks them through small unspoken accounting: the sense that
        someone is always a little ahead, and nobody wants to be the person
        who mentions it.
      </p>
      <p>
        These nine rules are what a group needs to agree on, roughly in the
        order they matter.
      </p>

      <h2>1. Log it the same day</h2>
      <p>
        Ideally at the counter, while the amount is on a screen in front of
        you. An expense entered three days later is entered wrong; an expense
        entered next week isn't entered. This one rule prevents most of the
        others from ever being needed.
      </p>

      <h2>2. Describe it like a stranger will read it</h2>
      <p>
        "Groceries: milk, bread, detergent" takes four extra seconds and
        pre-empts every question. "Stuff, ₹1,840" invites one. People don't
        dispute amounts; they dispute amounts they can't picture.
      </p>

      <h2>3. Agree a spending line before the trip</h2>
      <p>
        Above some number (₹2,000 is a reasonable default), you ask the
        group before spending on its behalf. Below it, just buy it. Without
        a line, every purchase is a judgement call, and the person who
        spends most confidently ends up setting everyone's budget.
      </p>

      <h2>4. Don't split what one person consumed</h2>
      <p>
        The three cocktails, the extra baggage, the massage.{" "}
        <a href="/blog/equal-exact-or-percentage/">Untick the
        people it doesn't apply to</a>, or put it on exact amounts. Splitting an
        individual indulgence across the group is the fastest way to make
        the careful people stop suggesting places.
      </p>

      <h2>5. Never round to a nice number</h2>
      <p>
        ₹1,127 is ₹1,127. Rounding up feels generous the first time and
        feels like a small tax by the fourth month, and it's always the
        same person absorbing it. The app does paise; let it.
      </p>

      <h2>6. Settle on a date, not on a mood</h2>
      <p>
        The last evening of the trip. The 3rd of the month. The Sunday after
        the wedding. When there's a date, asking is routine. When there
        isn't, asking is an accusation, so nobody asks, and the balance ages
        into something awkward.
      </p>

      <h2>7. One group, one purpose</h2>
      <p>
        Don't run the Goa trip through the flat's group, and don't reuse last
        year's group for this year's trip. A group is a container with a
        beginning and an end; when it's settled and finished, it should stay
        that way so its numbers remain readable.
      </p>

      <h2>8. If you're the organiser, you're not the treasurer</h2>
      <p>
        Someone always ends up fronting the villa and chasing the transfers.
        The rest of the group should notice that this is work and that it
        involves lending real money for real days. Rotate who pays for the
        big things when you can, and pay the organiser first when you settle.
      </p>

      <h2>9. Raise mistakes as mistakes, on the day</h2>
      <p>
        "I think the cab got logged twice" is a sentence about an entry.
        "Some of these numbers look off" is a sentence about a person. Fix
        the entry, say what you changed, and move on. And once a month or a
        trip is settled, leave it settled. Reopening closed history is how
        a group stops trusting the ledger entirely.
      </p>

      <Note title="The rule under all nine">
        Everything should be visible to everyone, all the time. Almost every
        awkward conversation about shared money is really about someone
        holding information nobody else has.
      </Note>

      <h2>Two things worth saying out loud on day one</h2>
      <ul>
        <li>
          <strong>What counts as shared.</strong> Food, transport, stays,
          activities everyone joins. Not souvenirs, not one person's upgrade,
          not the taxi you took alone because you left early.
        </li>
        <li>
          <strong>What happens if someone can't pay on time.</strong> A
          partial settlement is fine and normal. Deciding that in advance
          means the person who's short doesn't have to invent an excuse.
        </li>
      </ul>

      <h2>Why this is worth the ten minutes</h2>
      <p>
        The goal isn't precision for its own sake. It's that at the end of
        the trip everyone owes exactly what they think they owe, pays it in
        one transfer, and nobody is quietly keeping a second ledger in their
        head. That second ledger is the expensive one.
      </p>
    </Article>
  );
}
