import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Delivery policy" };

export default function Delivery() {
  return (
    <LegalPage title="Delivery policy" updated="31 October 2026">
      <p>All {site.name} products are digital. Nothing is shipped physically and there are no shipping charges.</p>
      <h2>Delivery time</h2>
      <p>Downloadable products are available immediately on the confirmation page after payment, and a download link is emailed to you within a few minutes. Video courses and kits are delivered by email, with access details sent within 24 hours.</p>
      <h2>Didn&apos;t receive it?</h2>
      <p>Check your spam folder, then email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we&apos;ll resend it.</p>
    </LegalPage>
  );
}
