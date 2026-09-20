import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import claudeCover from "@/assets/book-cover.jpeg";
import copilotCover from "@/assets/copilot-cover.jpg.asset.json";

const books = [
  {
    title: "The Claude Advantage",
    subtitle:
      "A Practical Guide to Prompting, AI Systems and High-Performance Workflows That Give You a Daily Competitive Edge",
    cover: claudeCover,
    to: "/the-claude-advantage" as const,
    amazon: "https://www.amazon.com/dp/B0GZ5Z49D1",
  },
  {
    title: "The Microsoft Copilot Advantage",
    subtitle:
      "A Practical Guide for Beginners & Professionals to Master AI Across Word, Excel, Outlook, PowerPoint & Teams",
    cover: copilotCover.url,
    to: "/the-microsoft-copilot-advantage" as const,
    amazon:
      "https://www.amazon.com/Microsoft-Copilot-Advantage-Professionals-PowerPoint/dp/B0HJM9VP3G",
  },
];

export default function BookHub() {
  return (
    <div className="min-h-screen bg-page text-foreground">
      <div className="pointer-events-none fixed inset-0 binary-bg opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-spotlight" />

      <div className="relative">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gradient-gold shadow-gold" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              KAELIS VOSS
            </span>
          </div>
        </header>

        <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Book bonus hub
          </div>
          <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
            Kaelis Voss
            <br />
            <span className="text-gradient-gold">Book Hub</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Pick the book you're reading and claim its free companion resource
            pack: prompts, roadmaps, workbooks and framework cards.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-24 md:grid-cols-2">
          {books.map((b) => (
            <div
              key={b.title}
              className="group flex flex-col rounded-2xl border border-border bg-card/40 p-8 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold/40"
            >
              <Link to={b.to} className="relative block">
                <div className="absolute inset-0 -z-10 bg-gradient-gold opacity-20 blur-3xl" />
                <img
                  src={b.cover}
                  alt={`${b.title} book cover`}
                  className="mx-auto w-full max-w-xs rounded-md shadow-cover transition-transform group-hover:scale-[1.02]"
                  loading="eager"
                />
              </Link>
              <h2 className="mt-8 font-display text-2xl uppercase leading-tight">
                {b.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{b.subtitle}</p>
              <Link
                to={b.to}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.01]"
              >
                Claim free bonuses
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={b.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold/80 transition-colors hover:text-gold"
              >
                View on Amazon <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </section>

        <footer className="border-t border-border/60 py-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Kaelis Voss
          </p>
        </footer>
      </div>
    </div>
  );
}
