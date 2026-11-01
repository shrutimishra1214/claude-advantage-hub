"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useCheckout } from "./CheckoutProvider";

/** Phone-only purchase bar that appears once the hero's buttons scroll away. */
export function StickyBuyBar() {
  const { open, currency, tier, tiers, primaryTier, paddlePrice } = useCheckout();
  const [show, setShow] = useState(false);
  const main = tier(primaryTier);
  const offer = main.available ? main : tiers.find((t) => t.available) ?? main;

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 900;
      setShow(window.scrollY > 800 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!offer.available) return null;
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
    >
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white/95 p-2.5 pl-4 shadow-lift backdrop-blur-xl">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{offer.name}</p>
          <p className="text-xs text-ink-muted"><span className="font-semibold text-ink">{paddlePrice(offer.id) ?? formatPrice(offer.price, currency)}</span> · instant access</p>
        </div>
        <button type="button" onClick={() => open(offer.id)} tabIndex={show ? 0 : -1} className="btn-primary whitespace-nowrap !px-4 !py-2.5 !text-sm">Get the {offer.label}</button>
      </div>
    </div>
  );
}
