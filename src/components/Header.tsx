"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight" aria-label="Kaelis Voss home">
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-xl bg-spectrum text-sm text-white shadow-lift">KV</span>
      Kaelis Voss
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-ink/5 bg-white/75 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <a href="/#toolkit" className="btn-ghost">Toolkit</a>
          <a href="/#curriculum" className="btn-ghost">Curriculum</a>
          <a href="/#look-inside" className="btn-ghost">Look inside</a>
          <a href="/#faq" className="btn-ghost">FAQ</a>
        </nav>
        <BuyButton label="Get the toolkit" variant="primary" showPrice={false} className="!px-5 !py-2.5 !text-sm" />
      </div>
    </header>
  );
}
