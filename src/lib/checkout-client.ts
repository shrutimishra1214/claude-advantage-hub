"use client";

type OrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  customer: { name: string; email: string; contact: string };
  description: string;
};

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

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
  return data as T;
}

/**
 * Creates an order on our server, opens Razorpay, then confirms the payment
 * on our server. Resolves with the URL of the next funnel step.
 */
export async function checkout(orderBody: Record<string, unknown>): Promise<string> {
  const [order] = await Promise.all([postJson<OrderResponse>("/api/checkout/order", orderBody), loadRazorpay()]);

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
