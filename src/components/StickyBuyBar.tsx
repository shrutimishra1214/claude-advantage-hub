"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useCheckout } from "./CheckoutProvider";

/** Phone-only purchase bar that appears once the hero's button scrolls away. */
export function StickyBuyBar() {
  const { open, currency, prices } = useCheckout();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > 700 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/90 p-2.5 pl-4 shadow-lift backdrop-blur-xl">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">The Complete Copilot Toolkit</p>
          <p className="text-xs text-ink-muted">
            <span className="font-semibold text-ink">{formatPrice(prices.book, currency)}</span>{" "}
            <span className="line-through">{formatPrice(prices.bookCompare, currency)}</span> · instant PDF
          </p>
        </div>
        <button type="button" onClick={open} tabIndex={show ? 0 : -1} className="btn-spectrum !px-5 !py-3 !text-sm">Get it now</button>
      </div>
    </div>
  );
}
