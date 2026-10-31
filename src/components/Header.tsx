"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";
import { Icon } from "./icons";

export const navLinks = [
  { href: "/#overview", label: "Overview" },
  { href: "/#whats-inside", label: "What's Inside" },
  { href: "/#workflows", label: "Workflows" },
  { href: "/#prompt-library", label: "Prompt Library" },
  { href: "/#templates", label: "Templates" },
  { href: "/#challenge", label: "30-Day Challenge" },
  { href: "/#faq", label: "FAQ" },
];

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="The Microsoft Copilot Advantage, home">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink font-display text-[13px] font-bold tracking-tight text-white">CA</span>
      <span className={`font-display text-[12.5px] whitespace-nowrap font-bold uppercase leading-[1.15] tracking-[0.08em] ${compact ? "hidden sm:block" : ""}`}>
        The Microsoft
        <br />
        Copilot Advantage
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || menu ? "border-line bg-white/90 backdrop-blur-xl" : "border-transparent bg-white/0"}`}>
      <div className="container flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="btn-ghost whitespace-nowrap !px-2.5">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BuyButton label="Get the Copilot Advantage" showPrice={false} arrow={false} className="!hidden whitespace-nowrap !px-4 !py-2.5 !text-sm sm:!inline-flex" />
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink xl:hidden"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            {menu ? <Icon.x className="h-5 w-5" /> : <Icon.menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <nav id="mobile-menu" aria-label="Main" className="fade-swap h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white xl:hidden">
          <ul className="container grid py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenu(false)} className="flex items-center justify-between border-b border-line py-4 text-lg font-medium">
                  {l.label} <Icon.arrow className="h-4 w-4 text-ink-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div className="container pb-8" onClick={() => setMenu(false)}>
            <BuyButton label="Get the Copilot Advantage" className="w-full !py-4" />
          </div>
        </nav>
      )}
    </header>
  );
}
