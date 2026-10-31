import { createHmac } from "node:crypto";
import { safeEqualHex } from "./signing";

const API = "https://api.razorpay.com/v1";

function credentials() {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
  return { id, secret };
}

async function call<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const { id, secret } = credentials();
  const res = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Razorpay ${path} failed: ${data?.error?.description ?? res.status}`);
  return data as T;
}

export type RzpOrder = {
  id: string;
  amount: number;
  amount_paid: number;
  currency: string;
  status: "created" | "attempted" | "paid";
  notes: Record<string, string>;
};

export type RzpPayment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  email?: string;
  contact?: string;
};

export const createOrder = (body: { amount: number; currency: string; receipt: string; notes: Record<string, string> }) =>
  call<RzpOrder>("/orders", { method: "POST", body });

export const fetchOrder = (id: string) => call<RzpOrder>(`/orders/${encodeURIComponent(id)}`);

export const fetchPayment = (id: string) => call<RzpPayment>(`/payments/${encodeURIComponent(id)}`);

export const capturePayment = (id: string, amount: number, currency: string) =>
  call<RzpPayment>(`/payments/${encodeURIComponent(id)}/capture`, { method: "POST", body: { amount, currency } });

/** Checks the signature Razorpay Checkout returns after a successful payment. */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const expected = createHmac("sha256", credentials().secret).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}
