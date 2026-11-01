import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact us" };

export default function Contact() {
  return (
    <LegalPage title="Contact us" updated="31 October 2026">
      <p>We&apos;re happy to help with orders, downloads, refunds or questions about the book.</p>
      <p>Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
      {/* TODO: payment providers (Paddle, and Razorpay KYC if INR is turned on) may ask for a business address on this page. */}
      <p>We reply within one business day.</p>
    </LegalPage>
  );
}
