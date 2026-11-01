import { createHmac } from "node:crypto";
import type { StepId } from "./funnel";
import type { TierId } from "./products";
import { safeEqualHex } from "./signing";

// Paddle takes every payment except INR (USD, and GBP in the UK). It is the merchant of record:
// it charges the buyer, handles sales tax and VAT, and pays out to you.
// Prices live in the Paddle dashboard; their IDs come from the environment.

export const paddleEnvironment = () => (process.env.PADDLE_ENVIRONMENT === "production" ? "production" : "sandbox");
const API = () => (paddleEnvironment() === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com");

export const isPaddleConfigured = () => Boolean(process.env.PADDLE_API_KEY && process.env.PADDLE_CLIENT_TOKEN);

/** The Paddle price for a tier, or for a one-time offer after checkout. */
export function paddlePriceId(what: { tier: TierId } | { step: StepId }): string | null {
  const key = "tier" in what ? `PADDLE_PRICE_${what.tier}` : `PADDLE_PRICE_STEP_${what.step}`;
  return process.env[key.toUpperCase().replace(/-/g, "_")] || null;
}

async function call<T>(path: string): Promise<T> {
  const key = process.env.PADDLE_API_KEY;
  if (!key) throw new Error("PADDLE_API_KEY must be set");
  const res = await fetch(`${API()}${path}`, { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" });
  const body = await res.json();
  if (!res.ok) throw new Error(`Paddle ${path} failed: ${body?.error?.detail ?? res.status}`);
  return body.data as T;
}

export type PaddleTransaction = {
  id: string;
  status: "draft" | "ready" | "billed" | "paid" | "completed" | "canceled" | "past_due";
  customer_id: string | null;
  currency_code: string;
  custom_data: Record<string, string> | null;
  items: { price: { id: string } }[];
};

export const fetchTransaction = (id: string) => call<PaddleTransaction>(`/transactions/${encodeURIComponent(id)}`);
export const fetchCustomer = (id: string) => call<{ id: string; email: string; name: string | null }>(`/customers/${encodeURIComponent(id)}`);

/** Paid or completed: the money has been collected. */
export const isPaid = (t: PaddleTransaction) => t.status === "paid" || t.status === "completed";

/**
 * Checks the Paddle-Signature header ("ts=…;h1=…"): an HMAC-SHA256 of
 * "ts:body" with the webhook's secret, sent within the last five minutes.
 */
export function verifyPaddleWebhook(rawBody: string, header: string) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  const parts = Object.fromEntries(header.split(";").map((p) => p.split("=") as [string, string]));
  const ts = Number(parts.ts);
  if (!parts.h1 || !ts || Math.abs(Date.now() / 1000 - ts) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${parts.ts}:${rawBody}`).digest("hex");
  return safeEqualHex(expected, parts.h1);
}
