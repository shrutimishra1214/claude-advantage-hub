import type { ReactNode } from "react";
import { getCurrency } from "@/lib/currency";
import { isTierOfferable, tiers, type TierId } from "@/lib/products";
import { CheckoutProvider, type TierOption } from "./CheckoutProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Page chrome plus the checkout sheet, priced in the visitor's currency. */
export async function Shell({ children }: { children: ReactNode }) {
  const currency = await getCurrency();
  const options = (Object.keys(tiers) as TierId[]).map<TierOption>((id) => ({
    id,
    name: tiers[id].name,
    label: tiers[id].label,
    price: tiers[id].price[currency],
    available: isTierOfferable(id),
  }));
  return (
    <CheckoutProvider currency={currency} tiers={options}>
      <Header />
      <main>{children}</main>
      <Footer />
    </CheckoutProvider>
  );
}
