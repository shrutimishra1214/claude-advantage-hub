import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund policy" };

export default function Refunds() {
  return (
    <LegalPage title="Refund policy" updated="1 November 2026">
      <p>Every purchase is covered by a <strong>{site.guaranteeDays}-day money-back guarantee</strong>.</p>
      <h2>How to request a refund</h2>
      <p>Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> within {site.guaranteeDays} days of purchase with the email address you used to buy and the payment or order ID from your receipt.</p>
      <p>If you paid in USD, your order was processed by Paddle, our reseller and Merchant of Record. You can also request a refund directly through Paddle using the link in your receipt email, or at <a href="https://paddle.net" target="_blank" rel="noopener noreferrer">paddle.net</a>.</p>
      <h2>When you&apos;ll get it</h2>
      <p>Approved refunds are issued to your original payment method within 5–7 business days. Your bank may take a few extra days to show it.</p>
      <h2>Add-ons</h2>
      <p>Each product (including add-ons bought after the main purchase) can be refunded on its own.</p>
    </LegalPage>
  );
}
