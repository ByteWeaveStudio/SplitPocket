/**
 * Seeds the DEV Supabase project with the demo account the marketing
 * screenshots are shot from: demo@splitpocket.app plus three friends, a
 * "Goa trip" group, a "Flat 4B" group, and a month of personal activity.
 *
 * Idempotent-ish: safe to re-run — it reuses existing users and skips
 * seeding if the Goa trip group already exists.
 *
 * Credentials are read from ../SplitPocket/backend/.env and never printed.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const envFile = resolve(import.meta.dirname, "../../SplitPocket/backend/.env");
const env = Object.fromEntries(
  readFileSync(envFile, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const URL_ = env.SUPABASE_URL;
const KEY = env.SUPABASE_SECRET_KEY;
if (!URL_ || !KEY) throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY missing from backend/.env");

const HEADERS = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
};

async function api(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${URL_}${path}`, {
    method,
    headers: { ...HEADERS, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

async function ensureUser(email, fullName, password) {
  try {
    const created = await api("/auth/v1/admin/users", {
      method: "POST",
      body: {
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      },
    });
    console.log(`created user ${email}`);
    return created.id;
  } catch (e) {
    // Already exists — look it up.
    const list = await api(`/auth/v1/admin/users?page=1&per_page=200`);
    const users = list.users ?? list;
    const found = users.find((u) => u.email === email);
    if (!found) throw e;
    console.log(`reusing user ${email}`);
    return found.id;
  }
}

function insert(table, rows) {
  return api(`/rest/v1/${table}`, {
    method: "POST",
    body: rows,
    headers: { Prefer: "return=representation" },
  });
}

// Equal split in minor units, remainder to the first shares.
function equalSplit(total, n) {
  const base = Math.floor(total / n);
  return Array.from({ length: n }, (_, i) => base + (i < total - base * n ? 1 : 0));
}

// Never commit the real value — pass it in:  DEMO_PASSWORD=... node scripts/seed-demo.mjs
const DEMO_PASSWORD = process.env.DEMO_PASSWORD;
if (!DEMO_PASSWORD) throw new Error("Set the DEMO_PASSWORD environment variable first");
const demo = await ensureUser("demo@splitpocket.app", "Aarav Mehta", DEMO_PASSWORD);
const priya = await ensureUser("priya@splitpocket.app", "Priya Nair", `${DEMO_PASSWORD}-p`);
const arjun = await ensureUser("arjun@splitpocket.app", "Arjun Rao", `${DEMO_PASSWORD}-a`);
const sam = await ensureUser("sam@splitpocket.app", "Sam Iyer", `${DEMO_PASSWORD}-s`);

// Demo account thinks in rupees.
await api(`/rest/v1/profiles?id=eq.${demo}`, {
  method: "PATCH",
  body: { default_currency: "INR" },
});

const existing = await api(
  `/rest/v1/groups?name=eq.${encodeURIComponent("Goa trip")}&created_by=eq.${demo}&select=id`,
);
if (existing.length > 0) {
  console.log("Goa trip already seeded — nothing to do");
  process.exit(0);
}

const cats = await api(`/rest/v1/categories?user_id=is.null&select=id,name`);
const cat = (name) => {
  const c = cats.find((c) => c.name === name);
  if (!c) throw new Error(`missing category ${name}`);
  return c.id;
};

// ---- Goa trip (4 friends, INR) -------------------------------------------
const [goa] = await insert("groups", {
  name: "Goa trip",
  description: "Five days in Baga",
  currency: "INR",
  created_by: demo,
});
await insert(
  "group_members",
  [
    { group_id: goa.id, user_id: demo, role: "owner" },
    { group_id: goa.id, user_id: priya, role: "member" },
    { group_id: goa.id, user_id: arjun, role: "member" },
    { group_id: goa.id, user_id: sam, role: "member" },
  ],
);

// [description, payer, total ₹, category, date, participants]
const ALL = [demo, priya, arjun, sam];
const goaExpenses = [
  ["Flights", demo, 17280, "Travel", "2026-08-01", ALL],
  ["Villa — three nights", priya, 24000, "Travel", "2026-08-01", ALL],
  ["Scooter rentals", demo, 2400, "Transport", "2026-08-02", ALL],
  ["Beach shack dinner", arjun, 3840, "Food & Drinks", "2026-08-02", ALL],
  ["Groceries for the villa", priya, 1240, "Groceries", "2026-08-03", ALL],
  ["Parasailing", demo, 6000, "Entertainment", "2026-08-03", [demo, arjun, sam]],
  ["Taxis", sam, 1860, "Transport", "2026-08-04", ALL],
  ["Café breakfast", demo, 960, "Food & Drinks", "2026-08-05", ALL],
];

for (const [description, payer, rupees, category, date, people] of goaExpenses) {
  const total = Math.round(rupees * 100);
  const [expense] = await insert("expenses", {
    user_id: payer,
    group_id: goa.id,
    category_id: cat(category),
    description,
    amount_minor: total,
    currency: "INR",
    date,
  });
  const shares = equalSplit(total, people.length);
  await insert(
    "expense_splits",
    people.map((uid, i) => ({
      expense_id: expense.id,
      user_id: uid,
      owed_minor: shares[i],
      method: "equal",
    })),
  );
}

await insert("settlements", {
  group_id: goa.id,
  from_user_id: sam,
  to_user_id: demo,
  amount_minor: 200000,
  currency: "INR",
  note: "UPI",
  settled_at: "2026-08-05T18:30:00Z",
});

// ---- Flat 4B (3 flatmates, INR) ------------------------------------------
const [flat] = await insert("groups", {
  name: "Flat 4B",
  description: "Rent, bills, and the fridge",
  currency: "INR",
  created_by: demo,
});
const FLAT = [demo, priya, arjun];
await insert(
  "group_members",
  [
    { group_id: flat.id, user_id: demo, role: "owner" },
    { group_id: flat.id, user_id: priya, role: "member" },
    { group_id: flat.id, user_id: arjun, role: "member" },
  ],
);

const flatExpenses = [
  ["August rent", demo, 45000, "Housing & Rent", "2026-08-01", FLAT],
  ["Electricity bill", priya, 2310, "Utilities", "2026-08-03", FLAT],
  ["Wi-Fi", demo, 1199, "Utilities", "2026-08-04", FLAT],
  ["Groceries", arjun, 4480, "Groceries", "2026-08-05", FLAT],
];
for (const [description, payer, rupees, category, date, people] of flatExpenses) {
  const total = Math.round(rupees * 100);
  const [expense] = await insert("expenses", {
    user_id: payer,
    group_id: flat.id,
    category_id: cat(category),
    description,
    amount_minor: total,
    currency: "INR",
    date,
  });
  const shares = equalSplit(total, people.length);
  await insert(
    "expense_splits",
    people.map((uid, i) => ({
      expense_id: expense.id,
      user_id: uid,
      owed_minor: shares[i],
      method: "equal",
    })),
  );
}

// ---- Demo user's personal month ------------------------------------------
const personal = [
  ["Salary", 85000, "Salary", "2026-08-01", "income"],
  ["Coffee", 180, "Food & Drinks", "2026-08-01", "expense"],
  ["Groceries", 1640, "Groceries", "2026-08-02", "expense"],
  ["Metro card top-up", 500, "Transport", "2026-08-02", "expense"],
  ["Gym membership", 1500, "Health", "2026-08-03", "expense"],
  ["Netflix", 649, "Subscriptions", "2026-08-03", "expense"],
  ["Movie night", 700, "Entertainment", "2026-08-04", "expense"],
  ["Freelance payment", 12000, "Salary", "2026-08-04", "income"],
  ["New shirt", 1299, "Shopping", "2026-08-05", "expense"],
  ["Coffee", 210, "Food & Drinks", "2026-08-05", "expense"],
  ["Medicines", 340, "Health", "2026-08-06", "expense"],
  ["Birthday gift for Ma", 1500, "Gifts", "2026-08-06", "expense"],
];
await insert(
  "expenses",
  personal.map(([description, rupees, category, date, kind]) => ({
    user_id: demo,
    category_id: cat(category),
    description,
    amount_minor: Math.round(rupees * 100),
    currency: "INR",
    date,
    kind,
  })),
);

console.log(`seeded. goa=${goa.id} flat=${flat.id}`);
console.log("sign in as demo@splitpocket.app with the DEMO_PASSWORD you set");
