import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Header";
import { MemberSidebar, MemberTabs } from "@/components/members/MemberNav";
import { getMember } from "@/lib/member";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: { default: "Member area", template: `%s · ${site.productName}` }, robots: { index: false, follow: false } };

export default async function MembersLayout({ children }: { children: ReactNode }) {
  const member = await getMember();

  return (
    <div className="min-h-dvh bg-white">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          <Logo compact />
          <div className="flex items-center gap-3 text-sm">
            {member?.preview && <span className="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">Preview mode</span>}
            {member?.email && <span className="hidden text-ink-muted sm:inline">{member.email}</span>}
            <Link href="/" className="btn-ghost">Website</Link>
          </div>
        </div>
      </header>

      {member ? (
        <div className="flex pt-16">
          <MemberSidebar />
          <div className="min-w-0 flex-1">
            <MemberTabs />
            <main className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">{children}</main>
          </div>
        </div>
      ) : (
        <main className="mx-auto max-w-lg px-4 pt-32 text-center">
          <h1 className="text-3xl">Open your member area</h1>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Use the <strong className="text-ink">Open the Copilot Advantage</strong> link in your purchase email. It signs you in on this device for a year.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Can&apos;t find the email? Write to <a className="font-semibold text-accent" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we&apos;ll resend it.
          </p>
          <Link href="/#pricing" className="btn-secondary mt-8">Not a member yet? See the Toolkit</Link>
        </main>
      )}
    </div>
  );
}
