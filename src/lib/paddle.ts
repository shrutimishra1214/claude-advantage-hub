import { Environment, Paddle } from "@paddle/paddle-node-sdk";
import type { StepId } from "./funnel";
import type { TierId } from "./products";

// Paddle takes every payment except INR (USD, and GBP in the UK). It is the merchant of record:
// it charges the buyer, handles sales tax and VAT, and pays out to you.
// Prices live in the Paddle dashboard; their IDs come from the environment.

/**
 * "sandbox" or "production", read from PADDLE_ENVIRONMENT. Never defaulted: if
 * it's unset or misspelled, Paddle stays switched off and the error is logged,
 * so the site can't quietly run against the wrong Paddle account.
 */
export function paddleEnvironment(): "sandbox" | "production" | null {
  const env = process.env.PADDLE_ENVIRONMENT;
  if (env === "sandbox" || env === "production") return env;
  if (process.env.PADDLE_API_KEY || process.env.PADDLE_CLIENT_TOKEN)
    console.error(`PADDLE_ENVIRONMENT must be "sandbox" or "production" (got ${env ? `"${env}"` : "nothing"}); Paddle is switched off until it's set.`);
  return null;
}
const API = () => (paddleEnvironment() === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com");

export const isPaddleConfigured = () => Boolean(process.env.PADDLE_API_KEY && process.env.PADDLE_CLIENT_TOKEN && paddleEnvironment());

/** What the browser needs for prices and checkout: the public client-side token, never the API key. */
export function paddleClientConfig(): { token: string; environment: "sandbox" | "production" } | null {
  const environment = paddleEnvironment();
  const token = process.env.PADDLE_CLIENT_TOKEN;
  return environment && token ? { token, environment } : null;
}

/** The setting that holds each tier's Paddle price ID (named as in the Paddle catalog). */
export const tierPriceSetting: Record<TierId, string> = {
  book: "PADDLE_PRICE_COPILOT_BOOK",
  complete: "PADDLE_PRICE_COPILOT_BOOK_COMPLETE",
  pro: "PADDLE_PRICE_COPILOT_BOOK_PRO",
  "claude-book": "PADDLE_PRICE_CLAUDE_BOOK",
  "claude-complete": "PADDLE_PRICE_CLAUDE_BOOK_COMPLETE",
  "claude-pro": "PADDLE_PRICE_CLAUDE_BOOK_PRO",
  "both-complete": "PADDLE_PRICE_BOTH_SYSTEMS_COMPLETE",
  "both-pro": "PADDLE_PRICE_BOTH_SYSTEMS_PRO",
};

/** The setting for each one-time upgrade offered after a purchase. */
export const stepPriceSetting: Record<StepId, string> = {
  "complete-upgrade": "PADDLE_PRICE_UPGRADE_COPILOT_TO_COMPLETE",
  "pro-upgrade": "PADDLE_PRICE_UPGRADE_COPILOT_TO_PRO",
  "claude-complete-upgrade": "PADDLE_PRICE_UPGRADE_CLAUDE_TO_COMPLETE",
  "claude-pro-upgrade": "PADDLE_PRICE_UPGRADE_CLAUDE_TO_PRO",
};

/** The Paddle price for a tier, or for a one-time offer after checkout. */
export function paddlePriceId(what: { tier: TierId } | { step: StepId }): string | null {
  const key = "tier" in what ? tierPriceSetting[what.tier] : stepPriceSetting[what.step];
  return process.env[key] || null;
}

async function call<T>(path: string): Promise<T> {
  const key = process.env.PADDLE_API_KEY;
  if (!key) throw new Error("PADDLE_API_KEY must be set");
  if (!paddleEnvironment()) throw new Error('PADDLE_ENVIRONMENT must be "sandbox" or "production"');
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
 * The Paddle Node SDK, for webhook verification and customer portal sessions.
 * Throws when PADDLE_ENVIRONMENT isn't set, rather than guessing an account.
 */
export function paddleSdk() {
  const env = paddleEnvironment();
  if (!env) throw new Error('PADDLE_ENVIRONMENT must be "sandbox" or "production"');
  return new Paddle(process.env.PADDLE_API_KEY ?? "", { environment: env === "production" ? Environment.production : Environment.sandbox });
}
