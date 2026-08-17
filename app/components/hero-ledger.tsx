/**
 * The hero's proof element: a settle-up strip whose amounts reconcile
 * exactly — ₹4,320 paid, split four ways, three transfers of ₹1,080 close
 * it. Illustrative of shipped split math; rows carry the app's `.money`
 * treatment and rise in sequence on load.
 */

const TRANSFERS = [
  { from: "Priya", amount: "₹1,080.00" },
  { from: "Arjun", amount: "₹1,080.00" },
  { from: "Sam", amount: "₹1,080.00" },
];

export function HeroLedger() {
  return (
    <div className="rise-in max-w-sm rounded-xl border border-border bg-card/80 p-4 text-sm shadow-sm" style={{ "--stagger": 4 } as React.CSSProperties}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-medium">Goa trip, flights</p>
        <p className="text-xs text-muted-foreground">4 friends</p>
      </div>
      <div className="mt-3 space-y-1.5">
        <div
          className="rise-in flex items-baseline justify-between gap-4"
          style={{ "--stagger": 5 } as React.CSSProperties}
        >
          <span className="text-muted-foreground">You paid</span>
          <span className="money">₹4,320.00</span>
        </div>
        {TRANSFERS.map((t, i) => (
          <div
            key={t.from}
            className="rise-in flex items-baseline justify-between gap-4"
            style={{ "--stagger": 6 + i } as React.CSSProperties}
          >
            <span className="text-muted-foreground">{t.from} → you</span>
            <span className="money">{t.amount}</span>
          </div>
        ))}
      </div>
      <div
        className="rise-in mt-3 flex items-center justify-between gap-4 border-t border-border pt-3"
        style={{ "--stagger": 9 } as React.CSSProperties}
      >
        <span className="font-medium text-positive">Settled, one payment each</span>
        <svg
          viewBox="0 0 20 20"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="text-positive"
        >
          <path d="m4 10.5 4 4 8-9" />
        </svg>
      </div>
    </div>
  );
}
