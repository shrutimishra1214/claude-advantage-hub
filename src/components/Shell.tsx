import type { ReactNode } from "react";
import { getCurrency } from "@/lib/currency";
import { isOfferable, products } from "@/lib/products";
import { CheckoutProvider } from "./CheckoutProvider";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollProgress } from "./ScrollProgress";

/** Page chrome plus the checkout sheet, priced in the visitor's currency. */
export async function Shell({ children }: { children: ReactNode }) {
  const currency = await getCurrency();
  const { book, vault } = products;
  return (
    <CheckoutProvider
      currency={currency}
      bumpAvailable={isOfferable("vault")}
      prices={{
        book: book.price[currency],
        bookCompare: book.compareAt![currency],
        vault: vault.price[currency],
        vaultCompare: vault.compareAt![currency],
      }}
    >
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </CheckoutProvider>
  );
}
