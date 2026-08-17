import type { Route } from "./+types/recurring-expenses";
import { Article, Ledger, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("recurring-expenses");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "List every charge that repeats, put the annual ones on a monthly line, and read the total once.",
        "A fairly normal list comes to ₹26,097 a month, or ₹313,164 a year decided by past-you.",
        "Set the repeats to log themselves, so what's left in your ledger is the part you actually choose each day.",
      ]}
    >
      <p>
        You make maybe forty spending decisions a month. Most of your money
        isn't in any of them. It's in the charges that arrive whether you
        think about them or not, and because they don't feel like decisions,
        they never get reviewed.
      </p>

      <h2>Find them: one hour, three months of statements</h2>
      <p>
        Open the last three months of every account and card, and write down
        anything that appears in all three at roughly the same amount. Add
        the annual ones you know about: insurance, domain names, the
        professional membership, the yearly plan you took because it was
        cheaper.
      </p>
      <p>
        Include the ones you're slightly embarrassed by. Especially those.
      </p>

      <h2>A normal list</h2>
      <Ledger
        title="Everything that repeats"
        note="per month"
        rows={[
          { label: "Rent", sub: "your share", amount: "₹19,200.00" },
          { label: "Cook", sub: "shared, your third", amount: "₹3,000.00" },
          { label: "Gym", sub: "used twice last month", amount: "₹1,500.00" },
          { label: "Health insurance", sub: "₹14,400.00 a year ÷ 12", amount: "₹1,200.00" },
          { label: "Internet", sub: "shared, your third", amount: "₹400.00" },
          { label: "Phone", amount: "₹399.00" },
          { label: "Video subscription", amount: "₹149.00" },
          { label: "Cloud storage", amount: "₹130.00" },
          { label: "Music", amount: "₹119.00" },
        ]}
        total={{ label: "Fixed, every month", amount: "₹26,097.00" }}
        caption="× 12 = ₹313,164.00 a year, decided by past-you and re-authorised by nobody."
      />

      <h2>Read the total before you read the lines</h2>
      <p>
        The interesting number isn't the ₹149 video subscription. It's the
        ₹26,097. That's the floor of your month, the amount you spend before
        you've bought a coffee. Everything you agonise about at the till
        happens above that line.
      </p>
      <p>
        Two useful ways to look at it:
      </p>
      <ul>
        <li>
          <strong>As a share of income.</strong> On ₹86,000 a month, ₹26,097
          is 30% committed before the month starts. That's a fact about your
          flexibility, not your discipline.
        </li>
        <li>
          <strong>As days of work.</strong> Nine days a month goes to
          standing charges. Which nine days would you like back?
        </li>
      </ul>

      <h2>The three questions per line</h2>
      <ol>
        <li>
          <strong>Did I use it last month?</strong> The gym at ₹1,500 for two
          visits is ₹750 a visit. Either go, or pay per class, or stop.
        </li>
        <li>
          <strong>Is it the right size?</strong> The 2 TB cloud plan you
          bought when you were shooting video. The phone plan from before
          wifi calling. Same service, smaller tier, no lifestyle change.
        </li>
        <li>
          <strong>Would I sign up for it today at this price?</strong> If
          not, that's not inertia, that's a decision you've been quietly
          renewing every month.
        </li>
      </ol>

      <Note title="The small ones are worth more than they look">
        Music, video and cloud storage together are ₹398 a month, or ₹4,776 a
        year. Not life-changing, but it's a weekend away, and it's currently
        being spent by nobody in particular.
      </Note>

      <h2>Then set them to log themselves</h2>
      <p>
        Once you know the list, turn each one into a recurring expense with
        its real category and date. Rent on the 1st, phone on the 4th,
        insurance on the day it actually leaves. Shared ones go in the flat's
        group with their agreed split, so your third shows up as your third.
      </p>
      <p>
        Two things happen after that. Your monthly report becomes honest:
        it stops looking like you spend nothing on housing because you forgot
        to log rent. And your day-to-day ledger becomes small enough to read,
        because it now contains only the spending you're actually choosing.
      </p>

      <h2>Put a date in the calendar</h2>
      <p>
        Once a year, in a month that isn't December, sit with the list for
        twenty minutes. Cancel one thing, resize one thing, renegotiate one
        thing. On a list like the one above, a routine review that finds
        ₹1,800 a month is ₹21,600 a year for a third of an hour's work, a
        better hourly rate than almost anything else you'll do that day.
      </p>
    </Article>
  );
}
