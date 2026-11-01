"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";
import { lines, type LineId } from "@/lib/lines";
import { Icon } from "./icons";

export function Logo({ compact = false, line = "copilot" }: { compact?: boolean; line?: LineId }) {
  const L = lines[line];
  return (
    <Link href={L.base || "/"} className="flex items-center gap-2.5" aria-label={`${L.name}, home`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md font-bold tracking-tight text-white ${line === "claude" ? "bg-accent font-serif text-base" : "bg-ink font-display text-[13px]"}`}>{L.mark}</span>
      <span className={`whitespace-nowrap font-sans text-[12.5px] font-bold uppercase leading-[1.15] tracking-[0.08em] ${compact ? "hidden sm:block" : ""}`}>
        {L.wordmark[0]}
        <br />
        {L.wordmark[1]}
      </span>
    </Link>
  );
}

export function Header({ line = "copilot" }: { line?: LineId }) {
  const L = lines[line];
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
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || menu ? "border-line bg-canvas/90 backdrop-blur-xl" : "border-transparent bg-canvas/0"}`}>
      <div className="container flex h-16 items-center justify-between gap-6">
        <Logo line={line} />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {L.nav.map((l) => (
            <a key={l.href} href={l.href} className="btn-ghost whitespace-nowrap !px-2.5">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BuyButton label={line === "claude" ? "Get the Claude Advantage" : "Get the Copilot Advantage"} showPrice={false} arrow={false} className="!hidden whitespace-nowrap !px-4 !py-2.5 !text-sm sm:!inline-flex" />
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
        <nav id="mobile-menu" aria-label="Main" className="fade-swap h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-canvas xl:hidden">
          <ul className="container grid py-4">
            {L.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenu(false)} className="flex items-center justify-between border-b border-line py-4 text-lg font-medium">
                  {l.label} <Icon.arrow className="h-4 w-4 text-ink-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div className="container pb-8" onClick={() => setMenu(false)}>
            <BuyButton label={line === "claude" ? "Get the Claude Advantage" : "Get the Copilot Advantage"} className="w-full !py-4" />
          </div>
        </nav>
      )}
    </header>
  );
}
