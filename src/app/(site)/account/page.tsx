import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { getSignedInBuyer } from "@/lib/member";
import { paddleSdk } from "@/lib/paddle";
import { customerIdForEmail } from "@/lib/paddle-store";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Your account", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Opens the Paddle-hosted customer portal (receipts, invoices, payment details)
// for the buyer signed in on this device. Their Paddle customer ID is looked up
// here on the server from their verified email, never taken from the browser.
export default async function AccountPage() {
  const buyer = await getSignedInBuyer();
  if (!buyer) redirect("/login");

  let portalUrl: string | null = null;
  let problem: "no-account" | "error" | null = null;
  try {
    const customerId = await customerIdForEmail(buyer.email);
    if (!customerId) problem = "no-account";
    else portalUrl = (await paddleSdk().customerPortalSessions.create(customerId, [])).urls.general.overview;
  } catch (err) {
    console.error("[account] Couldn't open the customer portal", err);
    problem = "error";
  }
  // redirect() works by throwing, so it stays outside the try.
  if (portalUrl) redirect(portalUrl);

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <main className="container flex flex-1 items-center justify-center py-24">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl">Your account</h1>
          <p className="mt-3 leading-relaxed text-ink-muted">
            {problem === "no-account"
              ? `We couldn't find a Paddle purchase for ${buyer.email}. If you paid with a different email, sign in with that one.`
              : "Your receipts and payment details couldn't be opened just now. Please try again in a minute."}
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            Need a hand? Write to <a className="font-semibold text-accent" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/login" className="btn-secondary">Sign in with another email</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
