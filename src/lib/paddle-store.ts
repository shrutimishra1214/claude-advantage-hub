import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { redis, redisConfig } from "./kv";
import type { ProductId } from "./products";

// A mirror of Paddle state from verified webhooks: customers (keyed on the
// Paddle customer ID), each buyer's Paddle customer ID (keyed on email), and
// completed transactions (keyed on the Paddle transaction ID). Webhooks arrive
// at least once and in any order, so every write is an upsert, and an older
// customer event never overwrites a newer one.
//
// These records are live business data, never test litter: don't delete them.

export type PaddleCustomer = { customerId: string; email: string; updatedAt: string };
export type PaddleTransactionRecord = {
  transactionId: string;
  customerId: string | null;
  email: string;
  items: ProductId[];
  currency: string;
  completedAt: string;
};

const customerKey = (id: string) => `paddle:customer:${id}`;
const emailKey = (email: string) => `paddle:customer-by-email:${email.trim().toLowerCase()}`;
const transactionKey = (id: string) => `paddle:transaction:${id}`;

// ── Storage: Upstash Redis in production, a JSON file locally ──
const FILE = path.join(process.cwd(), ".data", "paddle.json");

async function readFileStore(): Promise<Record<string, unknown>> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function get<T>(key: string): Promise<T | null> {
  if (redisConfig()) {
    const raw = await redis<string | null>(["GET", key]);
    return raw ? (JSON.parse(raw) as T) : null;
  }
  if (process.env.NODE_ENV === "production") return null;
  return ((await readFileStore())[key] as T) ?? null;
}

async function set(key: string, value: unknown) {
  if (redisConfig()) {
    await redis(["SET", key, JSON.stringify(value)]);
    return;
  }
  // Throwing makes the webhook answer with an error, so Paddle retries once a database is connected.
  if (process.env.NODE_ENV === "production") throw new Error("No database connected: set KV_REST_API_URL and KV_REST_API_TOKEN");
  const all = await readFileStore();
  all[key] = value;
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(all, null, 2));
}

/** Removes one entry of the email → customer index (the customer record itself is kept). */
async function remove(key: string) {
  if (redisConfig()) {
    await redis(["DEL", key]);
    return;
  }
  if (process.env.NODE_ENV === "production") throw new Error("No database connected: set KV_REST_API_URL and KV_REST_API_TOKEN");
  const all = await readFileStore();
  delete all[key];
  await writeFile(FILE, JSON.stringify(all, null, 2));
}

/** Upserts a customer, unless what's stored is newer (events can arrive out of order). */
export async function saveCustomer(c: PaddleCustomer) {
  const prev = await get<PaddleCustomer>(customerKey(c.customerId));
  if (prev && prev.updatedAt > c.updatedAt) return;
  const email = c.email.trim().toLowerCase();
  await set(customerKey(c.customerId), { ...c, email });
  await set(emailKey(email), c.customerId);
  // A changed email: the old one no longer leads to this customer's portal.
  if (prev && prev.email !== email && (await get<string>(emailKey(prev.email))) === c.customerId) await remove(emailKey(prev.email));
}

/** Upserts a completed transaction; receiving it twice changes nothing. */
export async function saveTransaction(t: PaddleTransactionRecord) {
  await set(transactionKey(t.transactionId), { ...t, email: t.email.trim().toLowerCase() });
}

/** The Paddle customer ID for a buyer's email, from verified webhooks only. */
export function customerIdForEmail(email: string) {
  return get<string>(emailKey(email));
}
