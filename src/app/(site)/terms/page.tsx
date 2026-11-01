import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & conditions" };

export default function Terms() {
  return (
    <LegalPage title="Terms & conditions" updated="1 November 2026">
      <p>These terms apply to purchases of digital products from {site.name} on this website. By buying, you agree to them.</p>
      <h2>Digital products</h2>
      <p>All products are digital (ebooks, PDFs, templates and online video lessons). Nothing is shipped physically. You receive access immediately after payment.</p>
      <h2>Licence</h2>
      <p>Your purchase gives you a personal, non-transferable licence to use the product. You may not resell, share, republish or distribute the files, in whole or in part, without written permission. Team licences are available on request.</p>
      <h2>Payments</h2>
      <p>
        {site.inrForIndia
          ? "Orders from India are paid in INR and processed securely by Razorpay. Orders from everywhere else are paid in USD through our online reseller Paddle.com: Paddle.com is the Merchant of Record for those orders, and also handles customer service inquiries about payment and returns for them."
          : "All orders are paid in USD through our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders, and also handles customer service inquiries about payment and returns."}
        We never see or store your full card details. Sales tax or VAT is calculated at checkout where it applies.
      </p>
      <h2>Refunds</h2>
      <p>See our <a href="/refund-policy">refund policy</a>.</p>
      <h2>No affiliation</h2>
      <p>{site.disclaimer}</p>
      <h2>Liability</h2>
      <p>The content is for educational purposes. Software features change over time, and results depend on your Microsoft 365 plan and how you use it. To the extent permitted by law, our liability is limited to the amount you paid.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
    </LegalPage>
  );
}
