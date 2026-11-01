import type { Metadata } from "next";
import Image from "next/image";
import { Ebook } from "@/components/Mockups";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { getCurrency } from "@/lib/currency";
import { lines } from "@/lib/lines";
import { formatPrice, tiers } from "@/lib/products";
import { site } from "@/lib/site";

// The kaelisvoss.com front door: one card per product line.

export const metadata: Metadata = {
  title: { absolute: "Kaelis Voss | AI Productivity Systems for Professionals" },
  description: "Practical books and toolkits for getting real work done with AI: The Microsoft Copilot Advantage and The Claude Advantage.",
  alternates: { canonical: "/" },
};

const company = [
  { href: "/contact", label: "Contact" },
  { href: "/thank-you", label: "My library" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund policy" },
];

export default async function Home() {
  const currency = await getCurrency();
  const from = (id: "book" | "claude-book") => formatPrice(tiers[id].price[currency], currency);
  const copilot = lines.copilot;
  const claude = lines.claude;

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-sans text-[13px] font-bold uppercase tracking-[0.14em]">{site.name}</Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href={copilot.base} className="btn-ghost !px-2.5">Copilot</Link>
          <Link href={claude.base} className="btn-ghost !px-2.5">Claude</Link>
        </nav>
      </header>

      <main>
        <section className="container pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="eyebrow">Books &amp; toolkits by {site.name}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight md:text-6xl">
            Get real work done with AI, not just conversations.
          </h1>
          <p className="section-lead max-w-2xl">
            Practical systems for professionals: the prompts, workflows and habits that turn an AI assistant into part of how you work. Pick the tool you use.
          </p>
        </section>

        <section className="container grid gap-6 pb-20 md:grid-cols-2 md:pb-28">
          <Link href={copilot.base} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper transition hover:border-ink/20 hover:shadow-lift">
            <div className="flex h-72 items-center justify-center bg-app-word/5 px-8">
              <Ebook book="copilot" className="w-44" sizes="180px" priority />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">For Microsoft 365</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">{copilot.name}™</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{copilot.descriptor}. Prompts, workflows and templates across Word, Excel, PowerPoint, Outlook and Teams.</p>
              <p className="mt-auto flex items-center justify-between pt-6 text-sm">
                <span className="text-ink-muted">Book from {from("book")}</span>
                <span className="link-arrow font-semibold">Explore <Icon.arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </p>
            </div>
          </Link>

          <Link href={claude.base} className="line-claude group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper text-ink transition hover:border-ink/20 hover:shadow-lift">
            <div className="flex h-72 items-center justify-center gap-4 bg-canvas px-8">
              <Ebook book="claude" className="w-44" sizes="180px" priority />
              <Ebook book="operator" className="hidden w-32 sm:block" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">For Claude</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">{claude.name}™</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{claude.descriptor}, with The Claude Operator as the advanced level: Projects, Claude Code, Cowork and Design.</p>
              <p className="mt-auto flex items-center justify-between pt-6 text-sm">
                <span className="text-ink-muted">Book from {from("claude-book")}</span>
                <span className="link-arrow font-semibold">Explore <Icon.arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </p>
            </div>
          </Link>
        </section>

        <section className="border-t border-line bg-paper">
          <div className="container flex max-w-3xl flex-col items-start gap-5 py-16 sm:flex-row sm:items-center">
            <Image src="/images/author.jpg" alt={site.name} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover ring-1 ring-line" />
            {/* TODO: replace with the author's own bio. */}
            <p className="leading-relaxed text-ink-muted">
              <span className="block font-semibold text-ink">{site.name}</span>
              Practical, no-jargon guides for professionals who want real results from the AI tools they already have.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="container flex flex-col gap-6 py-10 text-sm text-ink-muted md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <a className="font-medium text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {company.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-ink">{l.label}</Link></li>)}
          </ul>
        </div>
        <div className="container grid gap-2 pb-8 text-xs leading-relaxed text-ink-muted">
          <p>{copilot.disclaimer}</p>
          <p>{claude.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
