import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { redis, redisConfig } from "./kv";
import type { ProductId } from "./products";

// Who bought what, by email, so buyers can sign in to their member area again
// from /login on any device. Written on every confirmed payment.

export type Buyer = { email: string; name: string; owned: ProductId[] };

const key = (email: string) => `buyer:${email.trim().toLowerCase()}`;

// ── Storage: Upstash Redis in production, a JSON file locally ──
const FILE = path.join(process.cwd(), ".data", "buyers.json");

async function readFileStore(): Promise<Record<string, Buyer>> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

export async function getBuyer(email: string): Promise<Buyer | null> {
  if (redisConfig()) {
    const raw = await redis<string | null>(["GET", key(email)]);
    return raw ? (JSON.parse(raw) as Buyer) : null;
  }
  if (process.env.NODE_ENV === "production") return null;
  return (await readFileStore())[key(email)] ?? null;
}

/** Adds a purchase to the buyer's record. Safe to call more than once for the same payment, and never throws, so it can't hold up a checkout. */
export async function recordPurchase(p: { email: string; name: string; items: ProductId[] }) {
  try {
    await savePurchase(p);
  } catch (error) {
    console.error(`[buyers] Couldn't record the purchase for ${p.email}`, error);
  }
}

async function savePurchase(p: { email: string; name: string; items: ProductId[] }) {
  const email = p.email.trim().toLowerCase();
  if (!email) return;
  const prev = await getBuyer(email);
  const buyer: Buyer = { email, name: p.name || prev?.name || "", owned: Array.from(new Set([...(prev?.owned ?? []), ...p.items])) };
  if (redisConfig()) {
    await redis(["SET", key(email), JSON.stringify(buyer)]);
    return;
  }
  if (process.env.NODE_ENV === "production") {
    console.error(`[buyers] No database connected; ${email} won't be able to sign in from /login`);
    return;
  }
  const all = await readFileStore();
  all[key(email)] = buyer;
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(all, null, 2));
}

/** True the first time in a minute for this email, so the login form can't be used to flood an inbox. */
export async function allowLoginEmail(email: string): Promise<boolean> {
  if (!redisConfig()) return true;
  return (await redis<string | null>(["SET", `login-sent:${key(email)}`, "1", "EX", 60, "NX"])) === "OK";
}
