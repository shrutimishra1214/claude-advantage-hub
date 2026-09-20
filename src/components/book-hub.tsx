import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import claudeCover from "@/assets/book-cover.jpeg";
import { Button } from "@/components/ui/button";

const books = [
  {
    label: "Reader bonus hub",
    title: "The Claude Advantage",
    blurb:
      "A practical guide to prompting, AI systems, and high-performance workflows that give you a daily competitive edge.",
    cta: "Open reader hub",
    href: "/the-claude-advantage" as const,
    amazonUrl:
      "https://www.amazon.com/Claude-Advantage-Practical-High-Performance-Competitive/dp/B0H5XJDMJ5/ref=tmm_pap_swatch_0",
    cover: claudeCover,
    accent: "text-brand-claude",
    button: "bg-brand-claude text-brand-claude-foreground hover:brightness-110",
    available: true,
  },
  {
    label: "Reader bonus hub",
    title: "The Microsoft Copilot Advantage",
    blurb:
      "A beginner-friendly guide to using Copilot across Word, Excel, Outlook, PowerPoint, Teams, and the wider Microsoft workspace.",
    cta: "Open reader hub",
    href: "/the-microsoft-copilot-advantage" as const,
    amazonUrl: "https://www.amazon.com/dp/B0HJM9VP3G",
    cover: "/copilot-cover.jpg",
    accent: "text-brand-copilot",
    button: "bg-brand-copilot text-brand-copilot-foreground hover:brightness-110",
    available: true,
  },
  {
    label: "Coming soon",
    title: "Agentic AI Bible",
    blurb:
      "A practical reference for understanding and building capable AI agents, autonomous workflows, and multi-agent systems.",
    cover: "/agentic-ai-bible-cover.jpg",
    accent: "text-brand-bible",
    available: false,
  },
];

export default function BookHub() {
  return (
    <div className="book-hub min-h-screen bg-background text-foreground selection:bg-surface-strong">
      <header className="border-b border-hairline">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="font-serif text-xl">
            Kaelis Voss
          </Link>
          <a
            href="#books"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore the books
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Books by Kaelis Voss
          </p>
          <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[1.05] sm:text-7xl">
            Practical guides for working better with AI.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Clear, useful books for professionals who want to turn AI into stronger thinking, better systems, and work
            that gets results.
          </p>
        </section>

        <section id="books" className="border-t border-hairline py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The collection</p>
                <h2 className="mt-3 font-serif text-4xl">Choose your next guide.</h2>
              </div>
              <BookOpen className="hidden h-7 w-7 text-muted-foreground sm:block" />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {books.map((book, index) => (
                <article key={book.title} className="flex min-w-0 flex-col">
                  {book.amazonUrl ? (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${book.title} on Amazon (opens in a new tab)`}
                      className="group block aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-surface ring-1 ring-hairline transition-shadow hover:ring-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title} by Kaelis Voss`}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                      />
                    </a>
                  ) : (
                    <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-surface ring-1 ring-hairline">
                      <img
                        src={book.cover}
                        alt={`Cover of ${book.title} by Kaelis Voss`}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col pt-6">
                    <p className={`text-xs font-semibold uppercase tracking-widest ${book.accent}`}>{book.label}</p>
                    <h3 className="mt-3 text-balance font-serif text-3xl leading-tight">{book.title}</h3>
                    <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {book.blurb}
                    </p>
                    {book.available && book.href && book.cta && book.button ? (
                      <Button asChild className={`mt-6 w-full sm:w-fit ${book.button}`}>
                        <Link to={book.href}>
                          {book.cta}
                          <ArrowRight />
                        </Link>
                      </Button>
                    ) : (
                      <div className="mt-6 inline-flex h-9 w-fit items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        Reader hub coming soon
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-16 text-ink-foreground sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1fr_2fr] md:gap-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">About the author</p>
            <div>
              <h2 className="font-serif text-3xl">Kaelis Voss</h2>
              <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
                Kaelis Voss writes practical guides that help professionals understand AI, use it with confidence, and
                apply it to real work.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kaelis Voss</p>
          <p>Practical books for working with AI.</p>
        </div>
      </footer>
    </div>
  );
}
