import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Zap, Target, Mail, Star, Lock, Quote } from "lucide-react";
import bookCover from "@/assets/book-cover.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

const bonuses = [
  { num: "01", icon: Sparkles, title: "60+ Elite Prompt Templates", desc: "Copy-paste prompts for emails, reports, proposals, research and strategic thinking." },
  { num: "02", icon: Target, title: "The 90-Day Roadmap", desc: "Week-by-week actions to go from beginner to fluent Claude power user." },
  { num: "03", icon: Zap, title: "Role-Specific Playbooks", desc: "Sales, Operations, Marketing, Finance, HR and Consulting workflows." },
  { num: "04", icon: BookOpen, title: "Glossary & Companion Guides", desc: "The reference library that keeps compounding long after you finish the book." },
];

const testimonials = [
  {
    quote: "Finally a book that goes beyond the hype. The prompt library alone saved me hours every week.",
    name: "Verified Reader",
    role: "Amazon Review · ★★★★★",
  },
  {
    quote: "The 90-day roadmap turned AI from a curiosity into a competitive advantage for my team.",
    name: "Verified Reader",
    role: "Amazon Review · ★★★★★",
  },
];

function Index() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: email.trim().toLowerCase(), name: name.trim() || null });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already on the list — check your inbox!");
        setDone(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }
    setDone(true);
    toast.success("You're in! Resources are on the way.");
  }

  return (
    <div className="min-h-screen bg-page text-foreground">
      <Toaster theme="dark" position="top-center" />

      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0 binary-bg opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-spotlight" />

      <div className="relative">
        {/* Top bar */}
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-gold shadow-gold">
              <span className="font-display text-sm font-semibold text-primary-foreground">K</span>
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Kaelis Voss</div>
              <div className="font-display text-sm italic text-foreground/80">The Claude Advantage</div>
            </div>
          </div>
          <a
            href="#claim"
            className="hidden items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 backdrop-blur transition-colors hover:border-gold/50 hover:text-foreground sm:inline-flex"
          >
            Claim bonus pack <ArrowRight className="h-3 w-3" />
          </a>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-secondary/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Exclusive · For Readers
            </div>

            <h1 className="font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.25rem]">
              The <span className="italic text-gradient-gold">Claude Advantage</span>
              <br />
              <span className="text-foreground/95">Reader Bonus Pack.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Thanks for buying the book. Drop your email below and I'll send the
              full resource library straight to your inbox — <span className="text-foreground/90">60+ prompt templates, the 90-day roadmap, role-specific playbooks, and the companion glossary.</span>
            </p>

            {/* Form / success */}
            <div id="claim" className="mt-8 max-w-xl scroll-mt-24">
              {done ? (
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <p className="font-semibold text-foreground">You're on the list.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Check your inbox in the next few minutes — your resources are
                      on the way. If you don't see anything, peek in spam or promotions.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md sm:p-6"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-lg border-border bg-background/40 px-4 placeholder:text-muted-foreground/70"
                    />
                    <Input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-lg border-border bg-background/40 px-4 placeholder:text-muted-foreground/70"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-12 w-full rounded-lg bg-gradient-gold text-base font-semibold tracking-wide text-primary-foreground shadow-gold transition-transform hover:scale-[1.005] hover:opacity-95"
                  >
                    {loading ? "Sending…" : (
                      <>
                        Send me the free resources
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" /> No spam. One email with your full bonus pack. Unsubscribe anytime.
                  </div>
                </form>
              )}
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div>
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 font-display text-xl text-foreground">5.0</span>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em]">Reader rating</div>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div>
                <div className="font-display text-2xl text-foreground">17</div>
                <div className="text-[11px] uppercase tracking-[0.2em]">Chapters</div>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div>
                <div className="font-display text-2xl text-foreground">60+</div>
                <div className="text-[11px] uppercase tracking-[0.2em]">Prompt templates</div>
              </div>
            </div>
          </div>

          {/* Book cover */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-gradient-gold opacity-20 blur-3xl" />
            <div className="relative">
              <div className="absolute -inset-x-6 -bottom-6 -top-2 -z-10 rounded-md bg-gold/10 blur-2xl" />
              <img
                src={bookCover}
                alt="The Claude Advantage by Kaelis Voss — book cover"
                className="animate-float w-full max-w-md rounded-md shadow-cover"
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 hidden rotate-3 rounded-lg border border-gold/40 bg-card/90 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gold shadow-gold backdrop-blur sm:block">
                Kindle Bestseller
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                The Bonus Pack
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                Everything you need to <span className="italic text-gradient-gold">compound</span> your edge.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Four resources, delivered as a single email. Designed to be opened on Monday and useful by Friday.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {bonuses.map((b) => (
              <div
                key={b.title}
                className="group relative bg-card/60 p-8 backdrop-blur transition-colors hover:bg-card"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-gold text-primary-foreground shadow-gold">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-2xl italic text-gold/40">{b.num}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            What readers are saying
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative rounded-2xl border border-border bg-card/40 p-8 backdrop-blur"
              >
                <Quote className="absolute -top-3 left-6 h-6 w-6 rounded-full bg-card p-1 text-gold" />
                <blockquote className="font-display text-xl leading-snug text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-gradient-gold shadow-gold" />
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-card/60 backdrop-blur">
            <Mail className="h-6 w-6 text-gold" />
          </div>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Ready to claim your <span className="italic text-gradient-gold">edge</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Scroll up, drop your email, and the entire library lands in your inbox — free
            for every reader of The Claude Advantage.
          </p>
          <a
            href="#claim"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            Take me to the form <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        <footer className="border-t border-border/60 py-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} Kaelis Voss · The Claude Advantage
        </footer>
      </div>
    </div>
  );
}
