import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Header";
import { lines, type LineId } from "@/lib/lines";
import type { Member } from "@/lib/member";
import { site } from "@/lib/site";
import { MemberLineProvider } from "./MemberLine";
import { MemberSidebar, MemberTabs, type NavGroup } from "./MemberNav";

/** The member-area chrome for a product line, or the sign-in prompt when there's no member. */
export function MembersFrame({ line, groups, member, children }: { line: LineId; groups: NavGroup[]; member: Member | null; children: ReactNode }) {
  const L = lines[line];
  return (
    <div className={`${L.themeClass} min-h-dvh bg-canvas text-ink`}>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          <Logo compact line={line} />
          <div className="flex items-center gap-3 text-sm">
            {member?.preview && <span className="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">Preview mode</span>}
            {member?.email && <span className="hidden text-ink-muted sm:inline">{member.email}</span>}
            <Link href={L.base || "/"} className="btn-ghost">Website</Link>
            {member && !member.preview && <a href={`/logout?line=${line}`} className="btn-ghost">Sign out</a>}
          </div>
        </div>
      </header>

      {member ? (
        <MemberLineProvider line={line} base={L.members}>
          <div className="flex pt-16">
            <MemberSidebar groups={groups} />
            <div className="min-w-0 flex-1">
              <MemberTabs groups={groups} />
              <main className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">{children}</main>
            </div>
          </div>
        </MemberLineProvider>
      ) : (
        <main className="mx-auto max-w-lg px-4 pt-32 text-center">
          <h1 className="text-3xl">Open your member area</h1>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Sign in with the email you used to pay, and we&apos;ll email you a link that opens it on this device.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href={`/login?line=${line}`} className="btn-primary">Member login</Link>
            <Link href={`${L.base}#pricing`} className="btn-secondary">Not a member yet? See what&apos;s included</Link>
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            Trouble signing in? Write to <a className="font-semibold text-accent" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </main>
      )}
    </div>
  );
}
