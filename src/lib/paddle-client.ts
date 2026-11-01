"use client";

import { initializePaddle, type Paddle, type PaddleEventData } from "@paddle/paddle-js";

// Browser side of Paddle. Paddle.js can only be initialized once per page, with
// one event callback, so prices and checkout share this instance, and the
// checkout that's open registers its handlers here. Only the public client-side
// token ever reaches the browser; the API key stays on the server.

export type PaddleConfig = { token: string; environment: "sandbox" | "production" };

let instance: Promise<Paddle> | null = null;
let handlers: ((e: PaddleEventData) => void) | null = null;

// Every checkout, including ones Paddle opens itself from a payment link, is a one-page overlay.
const checkoutSettings = { displayMode: "overlay", variant: "one-page", theme: "light", showAddDiscounts: false } as const;

export function getPaddle({ token, environment }: PaddleConfig): Promise<Paddle> {
  instance ??= initializePaddle({ token, environment, eventCallback: (e) => handlers?.(e), checkout: { settings: checkoutSettings } }).then((p) => {
    if (!p) {
      instance = null;
      throw new Error("Couldn't load the payment window. Check your connection and try again.");
    }
    return p;
  });
  return instance;
}

/** Routes Paddle's checkout events to the checkout that's open now (or to nothing). */
export function onPaddleEvent(fn: ((e: PaddleEventData) => void) | null) {
  handlers = fn;
}
