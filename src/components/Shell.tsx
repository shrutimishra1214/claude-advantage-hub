import type { ReactNode } from "react";
import { getCurrency } from "@/lib/currency";
import { lines, type LineId } from "@/lib/lines";
import { isTierOfferable, tiers } from "@/lib/products";
import { CheckoutProvider, type TierOption } from "./CheckoutProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";

// Book covers shown next to tiers that include a book; other tiers show a tile.
const covers: Partial<Record<string, string>> = {
  book: "/images/cover.jpg",
  complete: "/images/cover.jpg",
  pro: "/images/cover.jpg",
  "claude-book": "/images/claude-cover.jpg",
  "claude-complete": "/images/claude-cover.jpg",
  "claude-pro": "/images/claude-cover.jpg",
};

/** Page chrome and the checkout sheet for one product line, priced in the visitor's currency. */
export async function Shell({ line = "copilot", children }: { line?: LineId; children: ReactNode }) {
  const currency = await getCurrency();
  const L = lines[line];
  const options = L.tiers.map<TierOption>((id) => ({
    id,
    name: tiers[id].name,
    label: tiers[id].label,
    price: tiers[id].price[currency],
    available: isTierOfferable(id),
    cover: covers[id],
  }));
  return (
    <div className={`${L.themeClass} min-h-dvh bg-canvas text-ink`}>
      <CheckoutProvider currency={currency} tiers={options} primaryTier={L.primaryTier}>
        <Header line={line} />
        <main>{children}</main>
        <Footer line={line} />
      </CheckoutProvider>
    </div>
  );
}
