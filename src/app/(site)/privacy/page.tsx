import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" updated="31 October 2026">
      <p>This policy explains what personal information {site.name} collects when you use this website and buy our products.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Your name, email address and (optionally) phone number when you place an order.</li>
        <li>Payment details, which are handled entirely by Razorpay (orders from India) or Paddle (all other orders). We do not receive or store your card or bank details.</li>
        <li>A small cookie that remembers your purchases and currency choice on this device.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To process your order, deliver your products, send your receipt and download links, and respond to support requests. We do not sell your information.</p>
      <h2>Who we share it with</h2>
      <p>Only the services needed to run the store: Razorpay and Paddle (payments; Paddle acts as Merchant of Record for orders outside India), our email provider (sending your download link) and our hosting provider.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete your information at any time by emailing <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</p>
    </LegalPage>
  );
}
