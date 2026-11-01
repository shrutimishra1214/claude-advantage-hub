"use client";

import { getPaddle, onPaddleEvent } from "./paddle-client";

type RazorpayOrder = {
  provider: "razorpay";
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  customer: { name: string; email: string; contact: string };
  description: string;
};

type PaddleOrder = {
  provider: "paddle";
  clientToken: string;
  environment: "sandbox" | "production";
  priceId: string;
  intent: string;
  customer: { name: string; email: string; contact: string };
};

type OrderResponse = RazorpayOrder | PaddleOrder;

type RazorpayResult = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void };
  }
}

let scriptPromise: Promise<void> | null = null;
export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Couldn't load the payment window. Check your connection and try again."));
    };
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export class CheckoutDismissed extends Error {}

async function payWithPaddle(order: PaddleOrder): Promise<string> {
  const P = await getPaddle({ token: order.clientToken, environment: order.environment });
  const transactionId = await new Promise<string>((resolve, reject) => {
    let completed = false;
    onPaddleEvent((e) => {
      if (e.name === "checkout.completed" && e.data?.transaction_id) {
        completed = true;
        resolve(e.data.transaction_id);
      }
      if (e.name === "checkout.closed" && !completed) reject(new CheckoutDismissed());
      if (e.name === "checkout.error") {
        P.Checkout.close();
        reject(new Error("The payment window couldn't load. Please try again in a moment."));
      }
    });
    // The exact price the buyer chose, with the email they entered prefilled.
    P.Checkout.open({
      items: [{ priceId: order.priceId, quantity: 1 }],
      customer: { email: order.customer.email },
      customData: { kv: order.intent },
      settings: { displayMode: "overlay", variant: "one-page", theme: "light", showAddDiscounts: false },
    });
  });
  onPaddleEvent(null);
  P.Checkout.close();
  const { next } = await postJson<{ next: string }>("/api/checkout/paddle", { transactionId });
  return next;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
  return data as T;
}

/**
 * Creates an order on our server, opens Razorpay (India) or Paddle (everywhere
 * else), then confirms the payment on our server. Resolves with the URL of the next funnel step.
 */
export async function checkout(orderBody: Record<string, unknown>): Promise<string> {
  const order = await postJson<OrderResponse>("/api/checkout/order", orderBody);
  if (order.provider === "paddle") return payWithPaddle(order);
  await loadRazorpay();

  const result = await new Promise<RazorpayResult>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "Kaelis Voss",
      description: order.description,
      image: "/icon.svg",
      prefill: { name: order.customer.name, email: order.customer.email, contact: order.customer.contact },
      theme: { color: "#2251CC" },
      handler: resolve,
      modal: { ondismiss: () => reject(new CheckoutDismissed()), confirm_close: true },
    });
    rzp.open();
  });

  const { next } = await postJson<{ next: string }>("/api/checkout/verify", {
    orderId: result.razorpay_order_id,
    paymentId: result.razorpay_payment_id,
    signature: result.razorpay_signature,
  });
  return next;
}
