"use client";

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

type PaddleEvent = { name: string; data?: { transaction_id?: string } };
type PaddleJs = {
  Environment: { set: (env: string) => void };
  Initialize: (opts: { token: string; eventCallback: (e: PaddleEvent) => void }) => void;
  Checkout: { open: (opts: Record<string, unknown>) => void; close: () => void };
};

type RazorpayResult = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };

declare global {
  interface Window {
    Paddle?: PaddleJs;
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

// Paddle.js can only be initialized once, with one event callback, so the
// checkout that is currently open registers its handlers here.
let paddleReady: Promise<PaddleJs> | null = null;
let paddleHandlers: { done: (txn: string) => void; closed: () => void; failed: () => void } | null = null;

function loadPaddle(token: string, environment: string) {
  paddleReady ??= new Promise<PaddleJs>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    s.onload = () => {
      const P = window.Paddle!;
      if (environment === "sandbox") P.Environment.set("sandbox");
      P.Initialize({
        token,
        eventCallback: (e) => {
          if (e.name === "checkout.completed" && e.data?.transaction_id) paddleHandlers?.done(e.data.transaction_id);
          if (e.name === "checkout.closed") paddleHandlers?.closed();
          if (e.name === "checkout.error") paddleHandlers?.failed();
        },
      });
      resolve(P);
    };
    s.onerror = () => {
      paddleReady = null;
      reject(new Error("Couldn't load the payment window. Check your connection and try again."));
    };
    document.body.appendChild(s);
  });
  return paddleReady;
}

export class CheckoutDismissed extends Error {}

async function payWithPaddle(order: PaddleOrder): Promise<string> {
  const P = await loadPaddle(order.clientToken, order.environment);
  const transactionId = await new Promise<string>((resolve, reject) => {
    let completed = false;
    paddleHandlers = {
      done: (txn) => {
        completed = true;
        resolve(txn);
      },
      closed: () => !completed && reject(new CheckoutDismissed()),
      failed: () => {
        P.Checkout.close();
        reject(new Error("The payment window couldn't load. Please try again in a moment."));
      },
    };
    P.Checkout.open({
      items: [{ priceId: order.priceId, quantity: 1 }],
      customer: { email: order.customer.email },
      customData: { kv: order.intent },
      settings: { displayMode: "overlay", theme: "light", showAddDiscounts: false },
    });
  });
  paddleHandlers = null;
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
