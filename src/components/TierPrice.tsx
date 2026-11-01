"use client";

import type { TierId } from "@/lib/products";
import { useCheckout } from "./CheckoutProvider";

/** A tier's price as Paddle quotes it for this visitor, or `fallback` (the site's own price) until Paddle answers. */
export function TierPrice({ tier, fallback }: { tier: TierId; fallback: string }) {
  return <>{useCheckout().paddlePrice(tier) ?? fallback}</>;
}
