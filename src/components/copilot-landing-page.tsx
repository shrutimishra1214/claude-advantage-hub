import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToBrevo } from "@/lib/brevo.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Zap, Target, Mail, Star, Lock, Quote, ExternalLink, ClipboardList, Compass, Layers } from "lucide-react";
import copilotCover from "@/assets/copilot-cover.jpg.asset.json";

const AMAZON_LISTING_URL =
  "https://www.amazon.com/Microsoft-Copilot-Advantage-Professionals-PowerPoint/dp/B0HJM9VP3G";

const BOOK = {
  title: "The Microsoft Copilot Advantage",
  subtitle:
    "A Practical Guide for Beginners & Professionals to Master AI Across Word, Excel, Outlook, PowerPoint & Teams with Proven Frameworks to Save Hours & Automate Work",
  author: "Kaelis Voss",
  hook: "Most professionals use Copilot for a fraction of what it can do. This book shows you the rest.",
};

const bonuses = [
  { icon: ClipboardList, title: "AI Policy and Governance Starter Toolkit", desc: "Templates and risk checklists to build safe, compliant AI usage policies for teams and clients." },
  { icon: Target, title: "90-Day Roadmap", desc: "Week-by-week actions to go from beginner to fluent Copilot power user." },
  { icon: BookOpen, title: "Phase Wise Workbook", desc: "Structured exercises and worksheets for each phase of your AI journey." },
  { icon: Compass, title: "7-Day Discovery Playbook", desc: "A fast-track guide to uncover your highest-leverage Copilot use cases in one week." },
  { icon: Zap, title: "Master Prompt Vault", desc: "Copy-paste prompts for Word, Excel, Outlook, PowerPoint and Teams." },
  { icon: Layers, title: "Chapter Framework Cards", desc: "Quick-reference cards that distill every chapter into actionable frameworks." },
];

const testimonials = [
  {
    quote:
      "A clear, practical path to using Copilot inside the apps I already work in every single day.",
    name: "Verified Purchase",
    role: "Amazon Review · ★★★★★",
  },
  {
    quote:
      "The workflows for Excel and Outlook alone saved me hours in my first week.",
    name: "Verified Purchase",
    role: "Amazon Review · ★★★★★",
  },
];

export default function CopilotLandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const brevoSubscribe = useServerFn(subscribeToBrevo);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || null;
    try {
      const result = await brevoSubscribe({
        data: { email: cleanEmail, name: cleanName, listId: 7 },
      });
      if (!result.ok) {
        setLoading(false);
        toast.error("Email signup is being fixed. Please try again shortly.");
        return;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Could not add you to the list. Please try again.");
      return;
    }
    setLoading(false);
    setDone(true);
    toast.success("You're in! Resources are on the way.");
  }

  return (
    <div className="min-h-screen bg-page text-foreground">
      <Toaster theme="dark" position="top-center" />

      <div className="pointer-events-none fixed inset-0 binary-bg opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-spotlight" />

      <div className="relative">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="/" className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gradient-gold shadow-gold" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              KAELIS VOSS
            </span>
          </a>
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={AMAZON_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 backdrop-blur transition-colors hover:border-gold/50 hover:text-foreground"
            >
              View on Amazon <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="#claim"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur transition-colors hover:border-gold/50"
            >
              Claim bonus pack <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> For readers of the book
            </div>

            <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              Your free
              <br />
              <span className="text-gradient-gold">Copilot Advantage</span>
              <br />
              bonus pack
            </h1>

            <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              {BOOK.subtitle}
            </p>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {BOOK.hook} Bought the book? Drop your email below and I'll send the
              full resource library straight to your inbox: prompts, the 90-day
              roadmap, workbooks and framework cards.
            </p>

            <div id="claim" className="mt-8 max-w-xl scroll-mt-24">
              {done ? (
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <p className="font-semibold text-foreground">You're on the list.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Check your inbox in the next few minutes. If you don't see
                      anything, peek in spam or promotions.
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
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" /> No spam. One email with your full bonus pack.
                  </div>
                </form>
              )}
            </div>

            <div className="mt-10 flex flex-nowrap items-center gap-4 text-sm text-muted-foreground sm:gap-6">
              <div className="shrink-0">
                <div className="flex items-center gap-1 whitespace-nowrap text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Reader rating</div>
              </div>
              <div className="hidden h-10 w-px shrink-0 bg-border sm:block" />
              <div className="shrink-0">
                <div className="whitespace-nowrap font-display text-2xl text-foreground">9</div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Microsoft apps</div>
              </div>
              <div className="hidden h-10 w-px shrink-0 bg-border sm:block" />
              <div className="shrink-0">
                <div className="whitespace-nowrap font-display text-2xl text-foreground">6</div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Bonuses</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-gradient-gold opacity-20 blur-3xl" />
            <div className="relative">
              <a
                href={AMAZON_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-[1.01]"
              >
                <img
                  src={copilotCover.url}
                  alt={`${BOOK.title} by ${BOOK.author} - book cover`}
                  className="animate-float w-full max-w-md rounded-md shadow-cover"
                  loading="eager"
                />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              What's inside the bonus pack
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
              Everything you need
              <br />
              to <span className="text-gradient-gold">automate your work</span>.
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

        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            What readers are saying
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative rounded-2xl border border-border bg-card/40 p-8 backdrop-blur"
              >
                <Quote className="absolute -top-3 left-6 h-6 w-6 rounded-full bg-card p-1 text-gold" />
                <blockquote className="text-lg leading-relaxed text-foreground/90">
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

        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Mail className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
            Ready to claim your <span className="text-gradient-gold">edge</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Scroll up, drop your email, and the entire library lands in your inbox, free
            for every reader of The Microsoft Copilot Advantage.
          </p>
          <a
            href="#claim"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            Take me to the form <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        <footer className="border-t border-border/60 py-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} {BOOK.author} · {BOOK.title}
          </p>
          <a
            href={AMAZON_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold/80 transition-colors hover:text-gold"
          >
            Amazon listing <ExternalLink className="h-3 w-3" />
          </a>
        </footer>
      </div>
    </div>
  );
}
