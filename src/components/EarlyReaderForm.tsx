"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

const USAGE = ["Every day", "A few times a week", "Rarely", "Not yet"];

export function EarlyReaderForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", role: "", usage: "", linkedin: "", website: "", agree: false });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [spot, setSpot] = useState<number | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/early-readers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        if (data.full) router.refresh();
      } else {
        setSpot(data.spot);
        router.refresh();
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (spot !== null) {
    return (
      <div className="text-center" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-lift"><Icon.check className="h-8 w-8" /></span>
        <h3 className="mt-6 text-2xl font-medium md:text-3xl">Spot #{spot} is yours!</h3>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-ink-muted">
          We&apos;ve reserved your place. Your free copy arrives by email within 2 business days. Keep an eye on <strong className="text-ink">{form.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          <span>Full name</span>
          <input required autoComplete="name" className="input" value={form.name} onChange={set("name")} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          <span>Email</span>
          <input required type="email" autoComplete="email" className="input" value={form.email} onChange={set("email")} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          <span>Your role</span>
          <input required placeholder="e.g. Project manager" autoComplete="organization-title" className="input" value={form.role} onChange={set("role")} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          <span>How often do you use Copilot?</span>
          <select required className="input" value={form.usage} onChange={set("usage")}>
            <option value="" disabled>Choose one</option>
            {USAGE.map((u) => <option key={u}>{u}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        <span>LinkedIn profile <span className="font-normal text-ink-muted">(optional)</span></span>
        <input type="url" placeholder="https://linkedin.com/in/…" className="input" value={form.linkedin} onChange={set("linkedin")} />
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={form.website} onChange={set("website")} />

      <label className="mt-1 flex cursor-pointer items-start gap-3 rounded-2xl bg-paper-tint p-4 text-sm leading-relaxed">
        <input type="checkbox" required checked={form.agree} onChange={set("agree")} className="mt-0.5 h-5 w-5 shrink-0 accent-brand-violet" />
        <span>
          I&apos;ll read the book and record an honest 60-second video review within 14 days, and I&apos;m happy for Kaelis Voss to
          share it on this website.
        </span>
      </label>

      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={busy} className="btn-accent mt-1 w-full">
        {busy ? "Reserving your spot…" : "Claim my free spot"} {!busy && <Icon.arrow className="h-5 w-5" />}
      </button>
      <p className="text-center text-xs text-ink-muted">No payment needed. We only use your details to send the book and arrange your review.</p>
    </form>
  );
}
