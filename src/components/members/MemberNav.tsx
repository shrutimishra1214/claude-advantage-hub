"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../icons";
import { useMemberLine } from "./MemberLine";

export type NavGroup = { label: string; links: { href: string; icon: keyof typeof Icon; label: string; badge?: string }[] };

function useActive() {
  const path = usePathname();
  const { base } = useMemberLine();
  return (href: string) => (href === base ? path === href : path === href || path.startsWith(`${href}/`));
}

/** Sidebar on desktop. */
export function MemberSidebar({ groups }: { groups: NavGroup[] }) {
  const active = useActive();
  return (
    <nav aria-label="Member area" className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-line bg-paper/60 p-4 lg:block">
      {groups.map((g) => (
      <div key={g.label} className="mb-5">
      <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted/80">{g.label}</p>
      <ul className="grid gap-0.5">
        {g.links.map((l) => {
          const I = Icon[l.icon];
          const on = active(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={on ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${on ? "bg-white font-semibold text-ink shadow-soft ring-1 ring-line" : "text-ink-soft hover:bg-white/70 hover:text-ink"}`}
              >
                <I className={`h-4 w-4 ${on ? "text-accent" : "text-ink-muted"}`} /> {l.label}
                {l.badge && <span className="ml-auto rounded bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">{l.badge}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
      ))}
    </nav>
  );
}

/** Scrollable tab bar on phones and tablets. */
export function MemberTabs({ groups }: { groups: NavGroup[] }) {
  const memberLinks = groups.flatMap((g) => g.links);
  const active = useActive();
  return (
    <nav aria-label="Member area" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur lg:hidden">
      <ul className="flex gap-1 overflow-x-auto px-4 py-2">
        {memberLinks.map((l) => {
          const on = active(l.href);
          return (
            <li key={l.href} className="shrink-0">
              <Link href={l.href} aria-current={on ? "page" : undefined} className={`block rounded-md px-3 py-1.5 text-sm ${on ? "bg-accent-soft font-semibold text-accent-deep" : "text-ink-soft"}`}>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
