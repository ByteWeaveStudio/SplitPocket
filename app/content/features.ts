/**
 * The canonical feature list, grouped the way the features page presents it.
 *
 * One source for two surfaces: /features/ renders every group with the long
 * `detail`, the home page renders the `highlight` subset with the short
 * `blurb` and links across. Adding a feature = one entry here.
 */
import {
  BellIcon,
  ChartIcon,
  CloudCheckIcon,
  ExportIcon,
  GlobeIcon,
  JarIcon,
  KeyIcon,
  MoonIcon,
  RepeatIcon,
  ScaleIcon,
  ScanIcon,
  SplitIcon,
  TagIcon,
  TemplateIcon,
  UsersIcon,
  WalletIcon,
} from "~/components/feature-icons";

export type Feature = {
  name: string;
  /** One clause, lowercase: the compact home-page list. */
  blurb: string;
  /** A sentence or two: the features page. */
  detail: string;
  Icon: () => React.JSX.Element;
  /** Shown in the short list on the home page. */
  highlight?: boolean;
};

export type FeatureGroup = {
  title: string;
  blurb: string;
  features: Feature[];
};

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Your own ledger",
    blurb: "The half of your money nobody else is involved in.",
    features: [
      {
        name: "Expenses and income",
        blurb: "your own spending, next to the shared kind.",
        detail:
          "Log what you spend and what comes in, in the same app as the money you share. The month nets out properly instead of only counting what left.",
        Icon: WalletIcon,
        highlight: true,
      },
      {
        name: "Categories that fit",
        blurb: "14 built in, yours in one tap.",
        detail:
          "Fourteen categories out of the box. Need a fifteenth? Make it in one tap and it's there from then on.",
        Icon: TagIcon,
      },
      {
        name: "Monthly reports",
        blurb: "where the month went, by category.",
        detail:
          "One month at a time, broken down by category. You see the shape of your spending instead of a wall of rows.",
        Icon: ChartIcon,
        highlight: true,
      },
      {
        name: "Budgets",
        blurb: "a monthly line you can see coming.",
        detail:
          "Set a monthly figure and watch it fill. You find out you're close before you're over, not after.",
        Icon: JarIcon,
      },
    ],
  },
  {
    title: "Groups and splitting",
    blurb: "The half you share, down to the last paisa.",
    features: [
      {
        name: "Three split methods",
        blurb: "equally, by amounts, or by percent.",
        detail:
          "Equally when everyone had the same, by exact amounts when they didn't, by percentage when the shares are already agreed. The parts always add back up to the total.",
        Icon: SplitIcon,
        highlight: true,
      },
      {
        name: "Simplified settle-up",
        blurb: "the fewest payments that clear every debt.",
        detail:
          "Five people paying each other in a circle becomes the shortest list of payments that leaves everyone at zero.",
        Icon: ScaleIcon,
        highlight: true,
      },
      {
        name: "Groups for anything",
        blurb: "trips, flats, dinners: one currency each.",
        detail:
          "One group for the Goa trip, one for the flat, one for the Thursday dinners. Each has its own members and its own currency.",
        Icon: UsersIcon,
      },
      {
        name: "Ten currencies",
        blurb: "exact to the minor unit, ₹ to ¥.",
        detail:
          "Ten currencies, each following the real ISO 4217 rules for decimals, symbol placement and grouping. Amounts are stored as whole minor units, so nothing drifts.",
        Icon: GlobeIcon,
      },
    ],
  },
  {
    title: "Less typing",
    blurb: "The entries that shouldn't need you at all.",
    features: [
      {
        name: "Recurring expenses",
        blurb: "rent and subscriptions log themselves.",
        detail:
          "Rent, the internet bill, the cook, the subscriptions. Set each one up once with the split you already agreed, and it appears on schedule.",
        Icon: RepeatIcon,
        highlight: true,
      },
      {
        name: "Receipt scanning",
        blurb: "point at the paper, get the expense.",
        detail:
          "Point the camera at the receipt and the amount comes back filled in. Fix anything that's off, then save.",
        Icon: ScanIcon,
        highlight: true,
      },
      {
        name: "Expense templates",
        blurb: "the usual coffee, one tap.",
        detail:
          "Turn what you buy over and over into a template. One tap logs the usual coffee, at the usual price, in the usual category.",
        Icon: TemplateIcon,
      },
      {
        name: "Reminders",
        blurb: "a nudge before rent day, not after.",
        detail:
          "A nudge the day before rent is due, and when a group balance has been sitting unsettled. Useful, not naggy.",
        Icon: BellIcon,
      },
    ],
  },
  {
    title: "Your data, your device",
    blurb: "What happens when the signal drops, and when you leave.",
    features: [
      {
        name: "Offline-first sync",
        blurb: "add now, sync when you're back.",
        detail:
          "It reads from your device and queues what you add. A flight, a basement or a dead signal is an ordinary Tuesday, not an error message.",
        Icon: CloudCheckIcon,
        highlight: true,
      },
      {
        name: "CSV export",
        blurb: "your data leaves with you, anytime.",
        detail:
          "Every expense, income entry and settlement, as CSV, whenever you want it. Leaving is always available, which is what makes staying a choice.",
        Icon: ExportIcon,
        highlight: true,
      },
      {
        name: "Google and Apple sign-in",
        blurb: "one tap in, no new password.",
        detail:
          "Sign in with Google or Apple and skip inventing another password. Email and password works too, if you'd rather not involve either.",
        Icon: KeyIcon,
      },
      {
        name: "Light and dark",
        blurb: "warm paper by day, blue-black by night.",
        detail:
          "Both themes ship with the app, and it follows your system setting until you tell it otherwise.",
        Icon: MoonIcon,
      },
    ],
  },
];

export const FEATURES: Feature[] = FEATURE_GROUPS.flatMap((g) => g.features);

/** The short list the home page shows before sending you to /features/. */
export const HIGHLIGHTS: Feature[] = FEATURES.filter((f) => f.highlight);
