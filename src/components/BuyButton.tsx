"use client";

import { formatPrice } from "@/lib/products";
import { useCheckout } from "./CheckoutProvider";
import { Icon } from "./icons";

export function BuyButton({ label = "Get the book", variant = "spectrum", showPrice = true, className = "" }: {
  label?: string;
  variant?: "spectrum" | "primary";
  showPrice?: boolean;
  className?: string;
}) {
  const { open, currency, prices } = useCheckout();
  return (
    <button type="button" onClick={open} className={`${variant === "spectrum" ? "btn-spectrum" : "btn-primary"} ${className}`}>
      {label}
      {showPrice && <span className="opacity-80">· {formatPrice(prices.book, currency)}</span>}
      <Icon.arrow className="h-5 w-5" />
    </button>
  );
}
