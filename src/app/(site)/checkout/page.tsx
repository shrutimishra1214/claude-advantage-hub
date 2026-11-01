import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { paddleClientConfig } from "@/lib/paddle";
import { PaymentLink } from "./PaymentLink";

export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: false } };

// Paddle's "default payment link": checkouts Paddle starts outside the sales
// pages (invoices, links made in the dashboard) arrive here as ?_ptxn=txn_…
export default function CheckoutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <main className="container flex flex-1 items-center justify-center py-24">
        <PaymentLink paddle={paddleClientConfig()} />
      </main>
      <Footer />
    </div>
  );
}
