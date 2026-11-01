import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { lines } from "@/lib/lines";
import { site } from "@/lib/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: { absolute: `Member login | ${site.name}` }, robots: { index: false, follow: false } };

// Sign-in for the member areas: buyers get a one-click link by email.
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ line?: string; next?: string; expired?: string }> }) {
  const sp = await searchParams;
  const line = sp.line === "claude" ? "claude" : "copilot";
  const L = lines[line];
  return (
    <Shell line={line}>
      <section className="container max-w-md pb-24 pt-32 text-center md:pt-40">
        <p className="eyebrow">Member login</p>
        <h1 className="mt-4 text-4xl">Open your member area</h1>
        <p className="mt-4 leading-relaxed text-ink-muted">
          Enter the email you used to buy {L.name}, and we&apos;ll email you a link that signs you in. No password needed.
        </p>
        {sp.expired && (
          <p role="alert" className="mt-6 rounded-lg border border-line bg-paper p-3 text-sm">That sign-in link has expired. Ask for a new one below.</p>
        )}
        <div className="mt-8">
          <LoginForm line={line} next={sp.next ?? ""} />
        </div>
        <p className="mt-8 text-sm text-ink-muted">
          Not a member yet? <Link href={`${L.base}#pricing`} className="font-semibold text-accent">See what&apos;s included</Link>
          <br />
          Trouble signing in? Write to <a className="font-semibold text-accent" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </section>
    </Shell>
  );
}
