"use client";

import { formatPrice, type TierId } from "@/lib/products";
import { useCheckout } from "./CheckoutProvider";
import { Icon } from "./icons";

/** Opens checkout on a tier. Until that tier is on sale it shows as "Coming soon". */
export function BuyButton({ tier: tierProp, label, variant = "primary", showPrice = true, arrow = true, className = "" }: {
  tier?: TierId;
  label?: string;
  variant?: "primary" | "dark" | "secondary";
  showPrice?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const { open, currency, tier: get, primaryTier } = useCheckout();
  const tier = tierProp ?? primaryTier;
  const t = get(tier);
  const cls = `btn-${variant} ${className}`;
  if (!t.available)
    return (
      <button type="button" disabled className={cls}>
        {t.label}: coming soon
      </button>
    );
  return (
    <button type="button" onClick={() => open(tier)} className={cls}>
      {label ?? `Get the ${t.label}`}
      {showPrice && <span>— {formatPrice(t.price, currency)}</span>}
      {arrow && <Icon.arrow className="btn-arrow h-4 w-4" />}
    </button>
  );
}
