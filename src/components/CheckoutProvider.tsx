"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { checkout, CheckoutDismissed } from "@/lib/checkout-client";
import { formatPrice, type Currency } from "@/lib/products";
import { Icon } from "./icons";

type Prices = { book: number; bookCompare: number; vault: number; vaultCompare: number };
type Ctx = { open: () => void; currency: Currency; prices: Prices };

const CheckoutContext = createContext<Ctx | null>(null);

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside <CheckoutProvider>");
  return ctx;
}

export function CheckoutProvider({
  currency,
  prices,
  bumpAvailable,
  children,
}: {
  currency: Currency;
  prices: Prices;
  bumpAvailable: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", contact: "" });
  const [bump, setBump] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  const open = useCallback(() => {
    setError("");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, busy]);

  const total = prices.book + (bump && bumpAvailable ? prices.vault : 0);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const next = await checkout({ customer: form, bump: bump && bumpAvailable });
      router.push(next);
    } catch (err) {
      if (!(err instanceof CheckoutDismissed)) setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <CheckoutContext.Provider value={{ open, currency, prices }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <button aria-label="Close checkout" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => !busy && setOpen(false)} />
          <form
            onSubmit={onSubmit}
            className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl md:max-w-lg md:rounded-3xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-violet">Secure checkout</p>
                <h2 id="checkout-title" className="mt-1 text-2xl font-medium">Complete your order</h2>
              </div>
              <button type="button" onClick={() => !busy && setOpen(false)} className="rounded-full p-2 text-ink-muted hover:bg-ink/5" aria-label="Close">
                <Icon.x />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-paper-tint p-4">
              <Image src="/images/cover.jpg" alt="" width={56} height={71} className="rounded-md shadow-soft" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-snug">The Microsoft Copilot Advantage</p>
                <p className="text-sm text-ink-muted">Ebook (PDF) · instant download</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(prices.book, currency)}</p>
                <p className="text-xs text-ink-muted line-through">{formatPrice(prices.bookCompare, currency)}</p>
              </div>
            </div>

            {bumpAvailable && (
              <label className={`mt-4 block cursor-pointer rounded-2xl border-2 border-dashed p-4 transition ${bump ? "border-brand-orange bg-orange-50" : "border-brand-orange/50 hover:bg-orange-50/50"}`}>
                <span className="flex items-start gap-3">
                  <input type="checkbox" aria-label="Add the Copilot Prompt Vault" checked={bump} onChange={(e) => setBump(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-brand-orange" />
                  <span>
                    <span className="block font-semibold">
                      Yes! Add the Copilot Prompt Vault for {formatPrice(prices.vault, currency)}{" "}
                      <span className="font-normal text-ink-muted line-through">{formatPrice(prices.vaultCompare, currency)}</span>
                    </span>
                    <span className="mt-1 block text-sm text-ink-muted">
                      300+ copy-and-paste prompts organised by app and job role. Only available with this order.
                    </span>
                  </span>
                </span>
              </label>
            )}

            <div className="mt-6 grid gap-3">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Full name</span>
                <input ref={firstField} required autoComplete="name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Email <span className="font-normal text-ink-muted">(your download link is sent here)</span></span>
                <input required type="email" autoComplete="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Phone <span className="font-normal text-ink-muted">(optional, speeds up UPI)</span></span>
                <input type="tel" autoComplete="tel" className="input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
              <span className="text-ink-muted">Total</span>
              <span className="text-2xl font-bold">{formatPrice(total, currency)}</span>
            </div>

            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button type="submit" disabled={busy} className="btn-accent mt-5 w-full">
              <Icon.lock className="h-5 w-5" />
              {busy ? "Opening secure payment…" : `Pay ${formatPrice(total, currency)} securely`}
            </button>

            <p className="mt-4 text-center text-xs text-ink-muted">
              Secured by Razorpay · {currency === "INR" ? "UPI, cards, net banking & wallets" : "All major cards"}
            </p>
          </form>
        </div>
      )}
    </CheckoutContext.Provider>
  );
}
