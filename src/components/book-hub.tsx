import claudeCover from "@/assets/book-cover.jpeg";
import copilotCover from "@/assets/copilot-cover.jpg.asset.json";

const books = [
  {
    volume: "Volume I",
    status: "Available Now",
    title: "The Claude Advantage",
    blurb:
      "Mastering the Constitutional AI framework. A deep dive into prompt engineering techniques and ethical alignment specifically for the Anthropic ecosystem.",
    cta: "View Book Hub",
    href: "/the-claude-advantage",
    cover: claudeCover,
    badge: "bg-brand-claude/10 text-brand-claude",
    button:
      "bg-brand-claude text-brand-claude-foreground ring-brand-claude hover:brightness-110",
    reverse: false,
  },
  {
    volume: "Volume II",
    status: "New Release",
    title: "The Microsoft Copilot Advantage",
    blurb:
      "Orchestrating the Office Graph. Strategies for enterprise-grade automation across the modern productivity stack using custom GPTs and Semantic Kernel.",
    cta: "Explore Hub",
    href: "/the-microsoft-copilot-advantage",
    cover: copilotCover.url,
    badge: "bg-brand-copilot/10 text-brand-copilot",
    button:
      "bg-brand-copilot text-brand-copilot-foreground ring-brand-copilot hover:brightness-110",
    reverse: true,
  },
  {
    volume: "Special Edition",
    status: "Reference Manual",
    title: "Agentic AI Bible",
    blurb:
      "Architecting Autonomous Workflows. The definitive technical reference for multi-agent systems, memory management, and long-horizon reasoning.",
    cta: "Access Resources",
    href: "/agentic-ai-bible",
    cover: claudeCover,
    badge: "bg-brand-bible/10 text-brand-bible",
    button:
      "bg-brand-bible text-brand-bible-foreground ring-brand-bible hover:brightness-110",
    reverse: false,
  },
];

export default function BookHub() {
  return (
    <div className="book-hub min-h-screen bg-background text-foreground selection:bg-surface-strong">
      <nav className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="/" className="text-lg font-medium tracking-tight">
            Kaelis Voss
          </a>
          <div className="flex items-center gap-8">
            <a
              href="#books"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Books
            </a>
            <a
              href="#about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </a>
            <a
              href="#newsletter"
              className="rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-hairline transition-colors hover:bg-surface"
            >
              Subscribe
            </a>
          </div>
        </div>
      </nav>

      <header className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-8 text-balance font-serif text-5xl leading-tight sm:text-7xl">
            Practical writing for <span className="italic">tech-led</span> minds.
          </h1>
          <p className="max-w-[46ch] text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Kaelis Voss publishes companion hubs for books that sit at the intersection of technology, human behavior, and clear thinking — from AI systems to articulation training.
          </p>
        </div>
      </header>

      <main id="books" className="pb-32">
        <div className="mx-auto max-w-5xl space-y-12 px-6">
          {books.map((book, i) => (
            <section
              key={book.title}
              className={`relative grid gap-12 rounded-[var(--radius-panel)] bg-surface p-8 ring-1 ring-hairline sm:p-12 ${
                book.reverse
                  ? "lg:grid-cols-[400px_1fr]"
                  : "lg:grid-cols-[1fr_400px]"
              } items-center`}
            >
              <div className={book.reverse ? "order-1 lg:order-2 lg:pl-8" : ""}>
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${book.badge}`}
                  >
                    {book.volume}
                  </span>
                  <span className="h-px w-8 bg-surface-strong" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {book.status}
                  </span>
                </div>
                <h2 className="mb-4 text-balance font-serif text-4xl">{book.title}</h2>
                <p className="mb-8 max-w-[48ch] text-pretty text-base text-muted-foreground">
                  {book.blurb}
                </p>
                <a
                  href={book.href}
                  className={`inline-flex items-center rounded-lg py-2 pl-3 pr-4 text-sm font-medium shadow-sm ring-1 transition-[filter] ${book.button}`}
                >
                  <span className="mr-2">{book.cta}</span>
                  <span className="opacity-70">→</span>
                </a>
              </div>
              <div
                className={
                  book.reverse ? "order-2 lg:order-1" : ""
                }
              >
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title} by Kaelis Voss`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-auto w-full rounded-[min(1vw,12px)] shadow-2xl outline-1 -outline-offset-1 outline-hairline"
                />
              </div>
            </section>
          ))}
        </div>
      </main>

      <section id="about" className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-widest text-ink-muted">
                Author
              </h3>
              <p className="font-serif text-3xl">Kaelis Voss</p>
            </div>
            <div className="space-y-8">
              <p className="max-w-[56ch] text-pretty text-lg leading-relaxed">
                Kaelis is a systems architect and researcher focused on the intersection of
                human cognition and automated reasoning. Through a decade of experience in
                machine learning and software infrastructure, they provide the mental models
                necessary to navigate the second wave of the AI revolution.
              </p>
              <div className="border-t border-ink-muted/20 pt-8">
                <p className="text-sm text-ink-muted">Inquiries: studio@kaelisvoss.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="newsletter" className="border-t border-hairline py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
            <div className="max-w-[35ch]">
              <h4 className="mb-4 text-sm font-semibold">Weekly Intelligence</h4>
              <p className="mb-6 text-sm text-muted-foreground">
                Receive updates on new research, book releases, and framework updates
                directly in your inbox.
              </p>
              <form className="flex w-full gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  className="flex-1 rounded-lg border border-hairline bg-surface px-4 py-2 text-sm transition-shadow focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground shadow-sm transition-colors hover:opacity-90"
                >
                  Join
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="mb-2 font-medium text-foreground">Connect</span>
              <a href="#" className="transition-colors hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                LinkedIn
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-24 flex items-center justify-between border-t border-hairline pt-8">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              © 2026 Kaelis Voss Publishing
            </p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Built for the Agentic Era
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
