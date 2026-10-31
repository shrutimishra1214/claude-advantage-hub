"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 font-display text-xl font-medium tracking-tight" aria-label="Kaelis Voss home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-[15px] italic text-paper transition-transform duration-500 group-hover:-rotate-12">kv</span>
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-line bg-paper/80 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`}>
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
