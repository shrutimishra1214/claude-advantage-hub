"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../icons";

type NavLink = { href: string; icon: keyof typeof Icon; label: string };

export const memberGroups: { label: string; links: NavLink[] }[] = [
  { label: "Start", links: [
    { href: "/members", icon: "home", label: "Home" },
    { href: "/members/quick-wins", icon: "sparkle", label: "12 Quick Wins" },
    { href: "/members/quickstart", icon: "compass", label: "Quickstart" },
  ] },
  { label: "Learn", links: [
    { href: "/members/book", icon: "pages", label: "The Book" },
    { href: "/members/method", icon: "target", label: "The Method" },
    { href: "/members/plan", icon: "clock", label: "90-Day Plan" },
    { href: "/members/challenge", icon: "calendar", label: "30-Day Challenge" },
  ] },
  { label: "Use", links: [
    { href: "/members/prompts", icon: "book", label: "Prompt Library" },
    { href: "/members/library", icon: "chat", label: "Book Prompts" },
    { href: "/members/workflows", icon: "flow", label: "Workflow Vault" },
    { href: "/members/templates", icon: "doc", label: "Templates" },
    { href: "/members/builder", icon: "wand", label: "Prompt Builder" },
    { href: "/members/worksheets", icon: "grid", label: "Worksheets" },
  ] },
  { label: "Reference", links: [
    { href: "/members/cheat-sheets", icon: "printer", label: "Cheat Sheets" },
    { href: "/members/troubleshooting", icon: "gear", label: "Troubleshooting" },
    { href: "/members/glossary", icon: "notebook", label: "Glossary" },
  ] },
];

export const memberLinks = memberGroups.flatMap((g) => g.links);

function useActive() {
  const path = usePathname();
  return (href: string) => (href === "/members" ? path === href : path.startsWith(href));
}

/** Sidebar on desktop. */
export function MemberSidebar() {
  const active = useActive();
  return (
    <nav aria-label="Member area" className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-line bg-paper/60 p-4 lg:block">
      {memberGroups.map((g) => (
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
export function MemberTabs() {
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
