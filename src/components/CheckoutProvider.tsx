"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { checkout, CheckoutDismissed } from "@/lib/checkout-client";
import { formatPrice, type Currency, type TierId } from "@/lib/products";
import { Icon } from "./icons";

// `cover` is the book image shown next to tiers that include a book; tiers without one show a tile.
export type TierOption = { id: TierId; name: string; label: string; price: number; available: boolean; cover?: string };
type Ctx = { open: (tier?: TierId) => void; currency: Currency; tiers: TierOption[]; tier: (id: TierId) => TierOption; primaryTier: TierId };

const CheckoutContext = createContext<Ctx | null>(null);

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used inside <CheckoutProvider>");
  return ctx;
}

const blurb: Record<TierId, string> = {
  book: "Learn · the complete guide (PDF)",
  complete: "Learn + Implement · the Book and the full implementation system",
  pro: "Build + Systemize · Complete, plus the advanced work systems",
  "claude-book": "Learn · The Claude Advantage and The Claude Operator (PDF)",
  "claude-complete": "Learn + Implement · the Book and the full implementation system",
  "claude-pro": "Build + Systemize · Complete, plus the advanced work systems",
  "both-complete": "Both Complete systems: Copilot and Claude",
  "both-pro": "Both Pro systems: Copilot and Claude",
};

export function CheckoutProvider({ currency, tiers, primaryTier, children }: { currency: Currency; tiers: TierOption[]; primaryTier: TierId; children: ReactNode }) {
  const router = useRouter();
  const available = tiers.filter((t) => t.available);
  const [selected, setSelected] = useState<TierId | null>(null);
  const [form, setForm] = useState({ name: "", email: "", contact: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const tier = useCallback((id: TierId) => tiers.find((t) => t.id === id)!, [tiers]);

  const open = useCallback(
    (id: TierId = primaryTier) => {
      const choice = tiers.find((t) => t.id === id && t.available) ?? tiers.find((t) => t.available);
      if (!choice) return;
      setError("");
      setSelected(choice.id);
    },
    [tiers, primaryTier],
  );
  const close = useCallback(() => !busy && setSelected(null), [busy]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close]);

  const chosen = selected ? tier(selected) : null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!chosen) return;
    setBusy(true);
    setError("");
    try {
      router.push(await checkout({ customer: form, tier: chosen.id }));
    } catch (err) {
      if (!(err instanceof CheckoutDismissed)) setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <CheckoutContext.Provider value={{ open, currency, tiers, tier, primaryTier }}>
      {children}
      {chosen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <button aria-label="Close checkout" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close} />
          <form onSubmit={onSubmit} className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl md:max-w-lg md:rounded-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Secure checkout</p>
                <h2 id="checkout-title" className="mt-1 text-2xl">Complete your order</h2>
              </div>
              <button type="button" onClick={close} className="rounded-lg p-2 text-ink-muted hover:bg-paper" aria-label="Close"><Icon.x /></button>
            </div>

            <fieldset className="mt-6 grid gap-2">
              <legend className="sr-only">Choose what to buy</legend>
              {available.map((t) => (
                <label
                  key={t.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${t.id === chosen.id ? "border-accent bg-accent-soft/60 ring-1 ring-accent" : "border-line hover:border-ink/30"}`}
                >
                  <input type="radio" name="tier" value={t.id} checked={t.id === chosen.id} onChange={() => setSelected(t.id)} className="h-4 w-4 shrink-0 accent-accent" />
                  {!t.cover ? (
                    <span className="grid h-[52px] w-10 shrink-0 place-items-center rounded-md bg-ink text-white"><Icon.grid className="h-5 w-5" /></span>
                  ) : (
                    <Image src={t.cover} alt="" width={40} height={51} className="shrink-0 rounded shadow-soft" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 font-semibold leading-snug">
                      {t.label}
                      {(t.id === "complete" || t.id === "claude-complete") && <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Recommended</span>}
                    </span>
                    <span className="block text-sm text-ink-muted">{blurb[t.id]}</span>
                  </span>
                  <span className="font-semibold">{formatPrice(t.price, currency)}</span>
                </label>
              ))}
            </fieldset>

            <div className="mt-6 grid gap-3">
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Full name</span>
                <input ref={firstField} required autoComplete="name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                <span>Email <span className="font-normal text-ink-muted">(your access link is sent here)</span></span>
                <input required type="email" autoComplete="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              {currency === "INR" && (
                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Phone <span className="font-normal text-ink-muted">(optional, speeds up UPI)</span></span>
                  <input type="tel" autoComplete="tel" className="input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                </label>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <span className="text-ink-muted">Total</span>
              <span className="text-2xl font-semibold">{formatPrice(chosen.price, currency)}</span>
            </div>

            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button type="submit" disabled={busy} className="btn-primary mt-5 w-full !py-4">
              <Icon.lock className="h-5 w-5" />
              {busy ? "Opening secure payment…" : currency === "INR" ? `Pay ${formatPrice(chosen.price, currency)} securely` : "Continue to secure payment"}
            </button>
            <p className="mt-4 text-center text-xs text-ink-muted">
              {currency === "INR" ? "Secured by Razorpay · UPI, cards, net banking & wallets" : "Secured by Paddle, our reseller · Sales tax or VAT added at checkout where it applies"}
            </p>
          </form>
        </div>
      )}
    </CheckoutContext.Provider>
  );
}
