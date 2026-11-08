"use client";

import { useState } from "react";
import Link from "next/link";
import { subscribeToBrevo } from "@/hub/lib/brevo";
import { Button } from "@/hub/components/ui/button";
import { Input } from "@/hub/components/ui/input";
import { toast, Toaster } from "sonner";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Sparkles, Zap, Target, Mail, Star, Lock, Quote, ClipboardList, Compass, Layers } from "lucide-react";
import bookCover from "@/hub/assets/book-cover.jpeg";
import { freeSamples } from "@/lib/files";

// The book is sold on this site now: every former Amazon link goes to its sales page.
const BOOK_URL = "/claude-advantage#pricing";
const FREE = freeSamples.claude;

const BOOK = {
  title: "The Claude Advantage",
  subtitle:
    "A Practical Guide to Prompting, AI Systems and High-Performance Workflows That Give You a Daily Competitive Edge",
  author: "Kaelis Voss",
  hook: "Most professionals are using AI at just 10% of its potential. This book shows you how to unlock the other 90%.",
};

const bonuses = [
  { icon: Zap, title: "Master Prompt Vault", desc: "500 copy-paste prompts across 14 business functions." },
  { icon: Target, title: "90-Day Roadmap", desc: "Three phase workbooks: Foundation, Integration and Mastery, week by week." },
  { icon: Compass, title: "7-Day Discovery Playbook", desc: "One idea a day, with prompts and A/B tests, from first chat to confident user." },
  { icon: BookOpen, title: "Workflow Template & Implementation Guide", desc: "Turn a recurring task into a documented, repeatable Claude workflow." },
  { icon: ClipboardList, title: "AI Governance Starter Kit", desc: "Usage policy, RACI, vendor scorecard, risk map and incident response, one page each." },
  { icon: Layers, title: "Framework Flashcards", desc: "The book's ten frameworks, one printable card each. Free above." },
];

const testimonials = [
  {
    quote:
      "This guide is a roadmap for anyone looking to move beyond basic AI interactions and into deep workflow integration.",
    name: "Verified Purchase",
    role: "Amazon Review · ★★★★★ · Mastering Claude AI",
  },
  {
    quote:
      "An excellent guide for helping you implement AI into your business using Claude. I read it from start to finish and will keep it as a reference guide.",
    name: "John H",
    role: "Amazon Review · ★★★★★ · United Kingdom",
  },
  {
    quote:
      "The author explains how Claude can become a thinking partner for writing, research, planning, communication, and workflow design.",
    name: "Kristi Dement",
    role: "Amazon Review · ★★★★★ · A Smart and Practical Guide",
  },
  {
    quote:
      "A useful guide for anyone looking to get more value from AI tools. The focus on workflows and real-world applications makes it especially helpful.",
    name: "Michel Bacha",
    role: "Amazon Review · ★★★★★ · Practical and Very Relevant",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const brevoSubscribe = subscribeToBrevo;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || null;
    try {
      const result = await brevoSubscribe({ data: { email: cleanEmail, name: cleanName } });
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
    toast.success("You're in! Your flashcards are ready to download.");
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
          <Button asChild variant="outline" size="sm" className="rounded-full border-border bg-card/60 text-foreground/80 backdrop-blur hover:text-foreground">
            <Link href="/">
              <ArrowLeft />
              Book Hub
            </Link>
          </Button>
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href={BOOK_URL}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 backdrop-blur transition-colors hover:border-gold/50 hover:text-foreground"
            >
              Get the book <ArrowRight className="h-3 w-3" />
            </Link>
            <a
              href="#claim"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur transition-colors hover:border-gold/50"
            >
              Free flashcards <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Free download
            </div>

            <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              Ten frameworks.
              <br />
              <span className="text-gradient-gold">Ten flashcards.</span>
              <br />
              Free.
            </h1>

            <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              {BOOK.subtitle}
            </p>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {BOOK.hook} Start with the ten frameworks from <em>The Claude Advantage</em>,
              one printable card each. Drop your email and download them now.
            </p>

            {/* Form / success */}
            <div id="claim" className="mt-8 max-w-xl scroll-mt-24">
              {done ? (
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <p className="font-semibold text-foreground">You're on the list.</p>
                    <a href={FREE.href} download className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold">
                      Download the Framework Flashcards <ArrowRight className="h-4 w-4" />
                    </a>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {FREE.meta}. The full bonus pack comes with the book.{" "}
                      <Link href={BOOK_URL} className="font-semibold text-gold underline underline-offset-4">See what's included</Link>
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
                        Get the free flashcards
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" /> No spam. Unsubscribe anytime. Bought the book?{" "}
                    <Link href="/library" className="underline underline-offset-4 hover:text-foreground">Open your library</Link>
                  </div>
                </form>
              )}
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-nowrap items-center gap-4 text-sm text-muted-foreground sm:gap-6">
              <div className="shrink-0">
                <div className="flex items-center gap-1 whitespace-nowrap text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 font-display text-2xl text-foreground">4.9</span>
                </div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Reader rating</div>
              </div>
              <div className="hidden h-10 w-px shrink-0 bg-border sm:block" />
              <div className="shrink-0">
                <div className="whitespace-nowrap font-display text-2xl text-foreground">17</div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Chapters</div>
              </div>
              <div className="hidden h-10 w-px shrink-0 bg-border sm:block" />
              <div className="shrink-0">
                <div className="whitespace-nowrap font-display text-2xl text-foreground">5</div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Parts</div>
              </div>
              <div className="hidden h-10 w-px shrink-0 bg-border sm:block" />
              <div className="shrink-0">
                <div className="whitespace-nowrap font-display text-2xl text-foreground">500+</div>
                <div className="whitespace-nowrap text-xs uppercase tracking-wider">Prompts</div>
              </div>
            </div>
          </div>

          {/* Book cover */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-gradient-gold opacity-20 blur-3xl" />
            <div className="relative">
              <Link href={BOOK_URL} className="block transition-transform hover:scale-[1.01]">
                <img
                  src={bookCover.src}
                  alt={`${BOOK.title} by ${BOOK.author} - book cover`}
                  className="animate-float w-full max-w-md rounded-md shadow-cover"
                  loading="eager"
                />
              </Link>
              <Link
                href={BOOK_URL}
                className="absolute -bottom-4 -right-4 hidden rotate-3 items-center gap-1.5 rounded-lg border border-gold/40 bg-card/90 px-3 py-2 text-xs uppercase tracking-[0.2em] text-gold shadow-gold backdrop-blur transition-colors hover:border-gold sm:inline-flex"
              >
                Get the book <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Comes with the book
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
              The full
              <br />
              <span className="text-gradient-gold">reader bonus pack</span>.
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
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={BOOK_URL} className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">
              Get the book and the bonus pack <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-muted-foreground">With <em>The Claude Operator</em> and its Operator Toolkit, in one purchase.</span>
          </div>
        </section>

        {/* Testimonials */}
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

        {/* Bottom CTA */}
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Mail className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
            Start with the <span className="text-gradient-gold">frameworks</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Scroll up, drop your email, and download the ten Framework Flashcards free.
            The full bonus pack comes with the book.
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
          <Link
            href={BOOK_URL}
            className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold/80 transition-colors hover:text-gold"
          >
            Get the book <ArrowRight className="h-3 w-3" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
