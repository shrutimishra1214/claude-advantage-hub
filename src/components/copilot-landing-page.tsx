import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CheckCircle2, Download, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { bonuses } from "@/lib/bonuses";
import { downloadBonus } from "@/lib/download";
import { subscribeToBrevo } from "@/lib/brevo.functions";
import { Button } from "@/components/ui/button";

export const AMAZON_URL = "https://www.amazon.com/dp/B0HJM9VP3G";

function AmazonLink({ className }: { className: string }) {
  return (
    <a
      href={AMAZON_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Star className="h-4 w-4" />
      Review on Amazon
    </a>
  );
}

export default function CopilotLandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const brevoSubscribe = useServerFn(subscribeToBrevo);

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
    toast.success("You're in! Your resources are on the way.");
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="copilot-hub min-h-screen bg-hero-surface">
        {/* Nav */}
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Button asChild variant="outline" size="sm" className="rounded-full bg-card">
            <Link to="/">
              <ArrowLeft />
              Book Hub
            </Link>
          </Button>
          <div className="flex items-center gap-2 md:gap-3">
            <AmazonLink className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:opacity-90" />
            <a
              href="#claim"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm transition hover:shadow-md"
            >
              Claim Bonuses
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-8 md:grid-cols-2 md:items-center md:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand-purple)" }} />
              Free companion toolkit for readers
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Your <span className="text-gradient-brand">Copilot bonus vault</span> is ready.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Thanks for grabbing <em>The Microsoft Copilot Advantage</em>. Drop your email
              to instantly unlock every checklist, prompt library, and template that
              pairs with the book.
            </p>

            <div id="claim" className="mt-8 scroll-mt-24">
              {done ? (
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card-lift">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" style={{ color: "var(--brand-green)" }} />
                  <div>
                    <p className="font-display font-semibold">You're on the list.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Check your inbox in the next few minutes. Your six PDF resources are on the way. If you don't see them, check spam or promotions.
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
                {loading ? "Sending..." : "Send me the free bonuses →"}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime. We'll email you when new Copilot resources drop.{" "}
                <a href="#bonuses" className="underline underline-offset-4 transition hover:text-foreground">
                  Or skip ahead to the files.
                </a>
              </p>
              </form>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {["Instant access", "Lifetime updates", "PDF + editable templates"].map((t) => (
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
            <AmazonLink className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:shadow-md" />
          </div>
        </section>

        {/* Bonuses */}
        <section id="bonuses" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              What's inside your <span className="text-gradient-brand">bonus vault</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Six free companion resources that turn every chapter of the book into
              real, applied results.
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
                <button
                  onClick={() => downloadBonus(bonus)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:opacity-70"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link to="/the-microsoft-copilot-advantage/resources" className="underline underline-offset-4 transition hover:text-foreground">
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
              <AmazonLink className="inline-flex items-center gap-1.5 font-semibold text-foreground transition hover:opacity-70" />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
