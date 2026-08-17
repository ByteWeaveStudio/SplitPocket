import type { Route } from "./+types/offline-first-expense-tracking";
import { Article, Note } from "~/components/article";
import { getPost } from "~/content/posts";
import { articleMeta } from "~/lib/seo";

const post = getPost("offline-first-expense-tracking");

export function meta({}: Route.MetaArgs) {
  return articleMeta(post);
}

export default function Post() {
  return (
    <Article
      post={post}
      summary={[
        "Offline-first means reads come from your device and writes queue locally, so the app never waits for a network to show you your own data.",
        "Server-first apps fail in the exact places you spend money: basements, aeroplanes, foreign SIMs, festival grounds.",
        "The real cost of a spinner isn't the wait. It's the expense you decide to enter later and never enter at all.",
      ]}
    >
      <p>
        The restaurant with the good food is in a basement. The trek starts
        where the signal stops. Your new foreign SIM activates the day after
        you land. Somehow, the places you spend money in groups are exactly
        the places with no bars, and most expense apps treat that as an
        unusual condition rather than the normal one.
      </p>

      <h2>What "offline" usually means in practice</h2>
      <p>
        Most apps are server-first: the phone is a window onto a database
        somewhere else. Tap add, and the app asks the server to write it.
        With no connection you get one of three outcomes, and all three are
        bad:
      </p>
      <ul>
        <li>
          <strong>The spinner.</strong> Fifteen seconds of nothing, then a
          timeout. You put the phone away.
        </li>
        <li>
          <strong>The lost entry.</strong> The form clears, the error toast
          disappears before you read it, and the expense simply never
          existed.
        </li>
        <li>
          <strong>The double.</strong> You tap add twice because the first
          one didn't seem to work. Both eventually arrive. Now the group's
          balances are wrong in a way nobody spots until settle-up.
        </li>
      </ul>
      <p>
        The expensive failure isn't any of those, though. It's the fourth
        one: you see there's no signal, you decide to add it later, and later
        never comes. A trip loses ₹4,000 that way and no error was ever
        shown.
      </p>

      <h2>What offline-first means instead</h2>
      <p>
        Offline-first inverts the relationship. Your device holds the data;
        the server is where devices meet to agree. Concretely:
      </p>
      <ul>
        <li>
          <strong>Reads never touch the network.</strong> Opening the app,
          scrolling a month, checking a balance. All of it comes from local
          storage, so it's instant on a train and instant on wifi. The speed
          isn't a bonus feature, it's the same property as the offline
          support.
        </li>
        <li>
          <strong>Writes commit locally, then queue.</strong> The expense is
          real the moment you save it. Sync happens when there's a network,
          in the background, without you thinking about it.
        </li>
        <li>
          <strong>The queue survives.</strong> Close the app, fly for nine
          hours, land, open it, and the entries you made at 30,000 feet upload
          themselves.
        </li>
      </ul>
      <p>
        That's how SplitPocket works: reads come from your device, changes
        sync when you're back. There is no offline mode to switch on, because
        there's no online mode to fall out of.
      </p>

      <Note title="The honest limit">
        Offline-first makes your own actions reliable; it can't tell you what
        someone else did while you were both offline. If Priya adds a ₹3,000
        expense in a valley and you're in a different valley, neither of you
        sees the other's entry until you both have signal. Every synced
        system has this property. What matters is that nothing is lost when
        the two ledgers finally meet.
      </Note>

      <h2>
        Four questions to ask{" "}
        <a href="/blog/choosing-an-expense-splitting-app/">any app you're
        evaluating</a>
      </h2>
      <ol>
        <li>
          <strong>Turn on aeroplane mode and open it.</strong> Do you see
          your data, or a loading state? This single test sorts most apps
          into two piles in about four seconds.
        </li>
        <li>
          <strong>Add an expense in aeroplane mode.</strong> Does it save, or
          does it argue?
        </li>
        <li>
          <strong>Force-quit, then reopen, still offline.</strong> Is the
          entry still there? A queue that only lives in memory isn't a queue.
        </li>
        <li>
          <strong>Reconnect.</strong> Does it sync by itself, or wait for you
          to pull-to-refresh in the right screen?
        </li>
      </ol>

      <h2>Why this is a design decision, not a feature</h2>
      <p>
        You can't add offline support to a server-first app as a checkbox.
        It changes where the truth lives, how identifiers are generated, what
        happens to an edit made in two places, and what the UI shows while
        something is pending. Teams either build it in from the start or ship
        a cache and call it offline.
      </p>
      <p>
        The visible symptom of the difference is boring and constant: an
        offline-first app opens instantly, always, on the worst network you
        have. That's most of the reason logging an expense in SplitPocket
        takes seconds rather than "seconds, when it's working".
      </p>

      <h2>The habit it protects</h2>
      <p>
        Shared-expense tracking only works if everyone logs things as they
        happen. Every second of friction between "I paid" and "it's
        recorded" is a chance for the entry to never exist, and a ledger
        with holes in it is worse than no ledger, because people trust it.
        Offline-first is, in the end, a way of removing the best excuse
        anyone has.
      </p>
    </Article>
  );
}
