"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Download, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/hub/components/ui/sonner";
import { bonuses } from "@/hub/lib/bonuses";
import { downloadBonus } from "@/hub/lib/download";
import { subscribeToBrevo } from "@/hub/lib/brevo";
import { Button } from "@/hub/components/ui/button";

// The book is sold on this site now: the former Amazon buttons go to its sales page.
const BOOK_URL = "/copilot-advantage#pricing";

function BookLink({ className }: { className: string }) {
  return (
    <Link href={BOOK_URL} className={className}>
      <Star className="h-4 w-4" />
      Get the book
    </Link>
  );
}

export default function CopilotLandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const brevoSubscribe = subscribeToBrevo;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const result = await brevoSubscribe({
        data: {
          email: email.trim().toLowerCase(),
          name: name.trim() || null,
          listId: 7,
        },
      });
      if (!result.ok) {
        toast.error("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
    toast.success("You're in! Your playbook is ready to download.");
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="copilot-hub min-h-screen bg-hero-surface">
        {/* Nav */}
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Button asChild variant="outline" size="sm" className="rounded-full bg-card">
            <Link href="/">
              <ArrowLeft />
              Book Hub
            </Link>
          </Button>
          <div className="flex items-center gap-2 md:gap-3">
            <BookLink className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:opacity-90" />
            <a
              href="#claim"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm transition hover:shadow-md"
            >
              Free Playbook
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-8 md:grid-cols-2 md:items-center md:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-purple)" }} />
              Free download
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Your free <span className="text-gradient-brand">Outlook Inbox-Zero Playbook</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              60+ Copilot prompts for triage, replies and follow-through, with a daily
              rhythm that keeps the inbox from refilling. From the makers of{" "}
              <em>The Microsoft Copilot Advantage</em>. Drop your email and download it now.
            </p>

            <div id="claim" className="mt-8 scroll-mt-24">
              {done ? (
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card-lift">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" style={{ color: "var(--brand-green)" }} />
                  <div>
                    <p className="font-display font-semibold">You're on the list.</p>
                    <a
                      href="/free/Outlook-Inbox-Zero-Playbook.pdf"
                      download
                      className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                      style={{ backgroundImage: "var(--gradient-hero)" }}
                    >
                      <Download className="h-4 w-4" /> Download the playbook
                    </a>
                    <p className="mt-3 text-sm text-muted-foreground">
                      PDF · 8 pages. The other five Copilot packs come with the{" "}
                      <Link href={BOOK_URL} className="font-semibold text-foreground underline underline-offset-4">Complete system</Link>.
                    </p>
                  </div>
                </div>
              ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-border bg-card p-4 shadow-card-lift md:p-5"
              >
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="Your first name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:opacity-60"
                />
                <input
                  type="email"
                  required
                  placeholder="you@work.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:opacity-70"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                {loading ? "Sending..." : "Get the free playbook →"}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime. Already bought?{" "}
                <Link href="/library" className="underline underline-offset-4 transition hover:text-foreground">
                  Open your library
                </Link>
              </p>
              </form>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {["Instant download", "Printable PDF", "Free"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--brand-green)" }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 md:items-end">
            <div className="relative">
              <div
                className="absolute -inset-6 -z-10 rounded-[3rem] opacity-40 blur-3xl"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              />
              <img
                src="/copilot-cover.jpg"
                alt="The Microsoft Copilot Advantage book cover by Kaelis Voss"
                className="w-full max-w-sm rotate-1 rounded-2xl shadow-glow ring-1 ring-black/5"
              />
            </div>
            <BookLink className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:shadow-md" />
          </div>
        </section>

        {/* Bonuses */}
        <section id="bonuses" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              The six <span className="text-gradient-brand">Copilot packs</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              The Outlook playbook is free. All six come with the Complete system,
              alongside the book.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {bonuses.map((bonus) => {
              const { icon: Icon, color, title, desc } = bonus;
              return (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card-lift"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                {bonus.free ? (
                  <button
                    onClick={() => downloadBonus(bonus)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:opacity-70"
                  >
                    <Download className="h-4 w-4" />
                    Download free
                  </button>
                ) : (
                  <Link href={BOOK_URL} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
                    Included in Complete →
                  </Link>
                )}
              </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link href="/the-microsoft-copilot-advantage/resources" className="underline underline-offset-4 transition hover:text-foreground">
              Browse the full library
            </Link>
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Kaelis Voss. AI that works. Results that matter.</p>
            <div className="flex items-center gap-4">
              <span>Companion resources for The Microsoft Copilot Advantage.</span>
              <BookLink className="inline-flex items-center gap-1.5 font-semibold text-foreground transition hover:opacity-70" />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
