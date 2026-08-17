import { useId, useState } from "react";
import { cn } from "~/lib/utils";

/**
 * Live demonstration of the app's shipped split math. Money is handled the
 * app's way — integer minor units (paise), largest-remainder distribution —
 * so every mode reconciles to the exact total. Validation copy matches the
 * app verbatim.
 */

type Mode = "equal" | "amounts" | "percent";

const PEOPLE = ["You", "Priya", "Arjun", "Sam"] as const;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

function formatMinor(minor: number) {
  return inr.format(minor / 100);
}

/** Parse a decimal string into integer minor units; null when invalid. */
function parseMinor(text: string): number | null {
  const trimmed = text.trim();
  if (!/^\d{1,7}(\.\d{0,2})?$/.test(trimmed)) return null;
  return Math.round(parseFloat(trimmed) * 100);
}

/** Split `total` proportionally to `weights`, remainder to largest shares. */
function distribute(total: number, weights: number[]): number[] {
  const weightSum = weights.reduce((a, b) => a + b, 0);
  if (weightSum === 0) return weights.map(() => 0);
  const raw = weights.map((w) => (total * w) / weightSum);
  const floors = raw.map(Math.floor);
  let remainder = total - floors.reduce((a, b) => a + b, 0);
  const order = raw
    .map((value, index) => ({ frac: value - Math.floor(value), index }))
    .sort((a, b) => b.frac - a.frac || a.index - b.index);
  for (const { index } of order) {
    if (remainder <= 0) break;
    floors[index] += 1;
    remainder -= 1;
  }
  return floors;
}

const MODES: Array<{ key: Mode; label: string }> = [
  { key: "equal", label: "Equally" },
  { key: "amounts", label: "Amounts" },
  { key: "percent", label: "Percent" },
];

export function SplitDemo({ className }: { className?: string }) {
  const baseId = useId();
  const [amountText, setAmountText] = useState("2400");
  const [mode, setMode] = useState<Mode>("equal");
  const [selected, setSelected] = useState<boolean[]>([true, true, true, true]);
  const [amountInputs, setAmountInputs] = useState<string[]>(["600", "600", "600", "600"]);
  const [percentInputs, setPercentInputs] = useState<string[]>(["25", "25", "25", "25"]);

  const total = parseMinor(amountText);
  const activeCount = selected.filter(Boolean).length;

  let shares: Array<number | null> = PEOPLE.map(() => null);
  let error: string | null = null;

  if (total === null) {
    error = "Enter an amount to split.";
  } else if (mode === "equal") {
    const equalShares = distribute(
      total,
      selected.map((on) => (on ? 1 : 0)),
    );
    shares = equalShares.map((s, i) => (selected[i] ? s : null));
  } else if (mode === "amounts") {
    const parsed = PEOPLE.map((_, i) => (selected[i] ? parseMinor(amountInputs[i] || "0") : null));
    if (parsed.some((p, i) => selected[i] && p === null)) {
      error = "Enter an amount for each person.";
    } else {
      const sum = parsed.reduce<number>((a, b) => a + (b ?? 0), 0);
      if (sum !== total) {
        error = "The split amounts must add up to the total.";
      }
      shares = parsed;
    }
  } else {
    const parsedPct = PEOPLE.map((_, i) => {
      if (!selected[i]) return null;
      const t = (percentInputs[i] || "").trim();
      if (!/^\d{1,3}(\.\d{0,2})?$/.test(t)) return null;
      return Math.round(parseFloat(t) * 100); // basis points
    });
    if (parsedPct.some((p, i) => selected[i] && p === null)) {
      error = "Enter a percentage for each person.";
    } else {
      const bpSum = parsedPct.reduce<number>((a, b) => a + (b ?? 0), 0);
      if (bpSum !== 10000) {
        error = "Percentages must add up to exactly 100%.";
      } else {
        const active = PEOPLE.map((_, i) => selected[i]);
        const activeWeights = parsedPct.filter((_, i) => active[i]) as number[];
        const dist = distribute(total, activeWeights);
        let cursor = 0;
        shares = PEOPLE.map((_, i) => (active[i] ? dist[cursor++] : null));
      }
    }
  }

  const shareSum = shares.reduce<number>((a, b) => a + (b ?? 0), 0);
  const reconciles = total !== null && !error && shareSum === total;

  function togglePerson(index: number) {
    setSelected((prev) => {
      if (prev[index] && prev.filter(Boolean).length === 1) return prev;
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-xl shadow-foreground/5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">Try a split</h3>
        <p className="text-xs text-muted-foreground">Same math as the app</p>
      </div>

      <div className="mt-4">
        <label htmlFor={`${baseId}-amount`} className="text-sm text-muted-foreground">
          Amount
        </label>
        <div className="mt-1.5 flex items-center rounded-lg border border-input bg-background focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
          <span aria-hidden className="money pl-3 text-lg text-muted-foreground">
            ₹
          </span>
          <input
            id={`${baseId}-amount`}
            inputMode="decimal"
            value={amountText}
            onChange={(e) => setAmountText(e.target.value)}
            className="money w-full bg-transparent px-2 py-2.5 text-lg outline-none"
            aria-describedby={`${baseId}-status`}
          />
        </div>
      </div>

      <div
        role="group"
        aria-label="Split method"
        className="mt-4 grid grid-cols-3 rounded-lg bg-secondary p-1"
      >
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            aria-pressed={mode === m.key}
            onClick={() => setMode(m.key)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              mode === m.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-border border-y border-border">
        {PEOPLE.map((name, i) => (
          <li key={name} className="flex items-center gap-3 py-2.5">
            <input
              id={`${baseId}-p${i}`}
              type="checkbox"
              checked={selected[i]}
              onChange={() => togglePerson(i)}
              className="size-4 accent-primary"
            />
            <label htmlFor={`${baseId}-p${i}`} className="flex-1 text-sm">
              {name}
            </label>
            {mode === "amounts" && selected[i] && (
              <span className="flex items-center gap-1">
                <span aria-hidden className="money text-xs text-muted-foreground">
                  ₹
                </span>
                <input
                  aria-label={`Amount for ${name}`}
                  inputMode="decimal"
                  value={amountInputs[i]}
                  onChange={(e) =>
                    setAmountInputs((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                  }
                  className="money w-20 rounded-md border border-input bg-background px-2 py-1 text-right text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                />
              </span>
            )}
            {mode === "percent" && selected[i] && (
              <span className="flex items-center gap-1">
                <input
                  aria-label={`Percentage for ${name}`}
                  inputMode="decimal"
                  value={percentInputs[i]}
                  onChange={(e) =>
                    setPercentInputs((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                  }
                  className="money w-14 rounded-md border border-input bg-background px-2 py-1 text-right text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                />
                <span aria-hidden className="money text-xs text-muted-foreground">
                  %
                </span>
              </span>
            )}
            {mode !== "amounts" && (
              <span
                className={cn(
                  "money w-24 text-right text-sm",
                  shares[i] === null ? "text-muted-foreground/50" : "",
                )}
              >
                {selected[i] && shares[i] !== null && !error ? formatMinor(shares[i]) : "—"}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {activeCount} {activeCount === 1 ? "person" : "people"}
        </p>
        <p id={`${baseId}-status`} aria-live="polite" className="text-right text-sm">
          {error ? (
            <span className="text-negative">{error}</span>
          ) : reconciles ? (
            <span className="text-positive">
              Adds up exactly: <span className="money">{formatMinor(shareSum)}</span>
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
