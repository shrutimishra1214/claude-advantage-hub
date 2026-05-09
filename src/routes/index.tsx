import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Zap, Target, Mail } from "lucide-react";
import bookCover from "@/assets/book-cover.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

const bonuses = [
  { icon: Sparkles, title: "60+ Elite Prompt Templates", desc: "Copy-paste prompts for emails, reports, proposals, research and strategic thinking." },
  { icon: Target, title: "The 90-Day Roadmap", desc: "Week-by-week actions to go from beginner to fluent Claude power user." },
  { icon: Zap, title: "Role-Specific Playbooks", desc: "Sales, Operations, Marketing, Finance, HR and Consulting workflows." },
  { icon: BookOpen, title: "Glossary & Companion Guides", desc: "The reference library that keeps compounding long after you finish the book." },
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
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gradient-gold shadow-gold" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              KAELIS VOSS
            </span>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Reader Bonus Pack
          </span>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> For readers of the book
            </div>

            <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              Your free
              <br />
              <span className="text-gradient-gold">Claude Advantage</span>
              <br />
              bonus pack
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Thanks for buying the book. Drop your email below and I'll send the
              full resource library straight to your inbox — 60+ prompt templates,
              the 90-day roadmap, role-specific playbooks, and the companion glossary.
            </p>

            {/* Form / success */}
            <div className="mt-8 max-w-xl">
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
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-xl border-border bg-card/60 px-4 backdrop-blur placeholder:text-muted-foreground"
                    />
                    <Input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-border bg-card/60 px-4 backdrop-blur placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-12 w-full rounded-xl bg-gradient-gold text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.01] hover:opacity-95"
                  >
                    {loading ? "Sending…" : (
                      <>
                        Send me the free resources
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No spam. One email with your full bonus pack.
                  </p>
                </form>
              )}
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <div className="font-display text-2xl text-foreground">5.0★</div>
                <div className="text-xs uppercase tracking-wider">Reader rating</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl text-foreground">17</div>
                <div className="text-xs uppercase tracking-wider">Chapters</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl text-foreground">60+</div>
                <div className="text-xs uppercase tracking-wider">Prompt templates</div>
              </div>
            </div>
          </div>

          {/* Book cover */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-gradient-gold opacity-20 blur-3xl" />
            <img
              src={bookCover}
              alt="The Claude Advantage by Kaelis Voss — book cover"
              className="animate-float w-full max-w-md rounded-md shadow-cover"
              loading="eager"
            />
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              What's inside the bonus pack
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
              Everything you need
              <br />
              to <span className="text-gradient-gold">10x your output</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {bonuses.map((b) => (
              <div
                key={b.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold/40"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-gold text-primary-foreground shadow-gold">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Mail className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
            Ready to claim your <span className="text-gradient-gold">edge</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Enter your email above and the entire library lands in your inbox — free
            for every reader of The Claude Advantage.
          </p>
        </section>

        <footer className="border-t border-border/60 py-8 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} Kaelis Voss · The Claude Advantage
        </footer>
      </div>
    </div>
  );
}
