import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckoutProvider, type TierOption } from "@/components/CheckoutProvider";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/icons";
import { Ebook } from "@/components/Mockups";
import { Bundles } from "@/components/Pricing";
import { Reveal } from "@/components/Reveal";
import { getCurrency } from "@/lib/currency";
import { lines } from "@/lib/lines";
import { bundleCopy, sharedFaqs } from "@/lib/offer";
import { formatPrice, isTierOfferable, tiers, type TierId } from "@/lib/products";
import { site } from "@/lib/site";

// The kaelisvoss.com front door: the brand, its method, and the two flagship systems.

export const metadata: Metadata = {
  title: { absolute: site.brandTitle },
  description: site.brandDescription,
  keywords: ["AI productivity system", "AI work systems", "AI workflow systems", "AI productivity for professionals", "Microsoft Copilot productivity", "Claude workflows"],
  alternates: { canonical: "/" },
  openGraph: { title: site.brandTitle, description: site.brandDescription, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.brandTitle, description: site.brandDescription },
};

const nav = [
  { href: "#products", label: "Products" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

const method = [
  { k: "Understand", v: "Learn what the AI can actually do." },
  { k: "Structure", v: "Give it the right goal, context, sources, and expectations." },
  { k: "Workflow", v: "Connect AI to the work you already do." },
  { k: "System", v: "Turn successful workflows into repeatable systems." },
];

const without = ["Ask", "Get answer", "Copy", "Paste", "Rewrite", "Repeat"];
const withSystem = ["Goal", "Context", "Source", "AI", "Refine", "Workflow", "Repeatable Result"];
const stack = ["Prompts", "Context", "Templates", "Workflows", "Implementation", "Systems"];
const work = ["Emails", "Meetings", "Documents", "Research", "Analysis", "Presentations", "Projects", "Decisions", "Planning"];

const bundleTiers: TierId[] = ["both-complete", "both-pro"];

function Head({ eyebrow, title, lead, center = true }: { eyebrow?: string; title: string; lead?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title mt-4">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

function Flow({ steps, strong }: { steps: string[]; strong?: boolean }) {
  return (
    <ol className="grid justify-items-center gap-1.5">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s} className="flow-step grid justify-items-center gap-1.5" style={{ ["--i" as string]: i }}>
            {i > 0 && <span aria-hidden className={strong ? "text-white/40" : "text-ink-muted/50"}>↓</span>}
            <span
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                strong ? (last ? "bg-white text-ink" : s === "AI" ? "bg-accent text-white" : "bg-white/10 text-white") : "border border-line bg-white text-ink-muted"
              }`}
            >
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default async function Home() {
  const currency = await getCurrency();
  const from = (id: TierId) => formatPrice(tiers[id].price[currency], currency);
  const copilot = lines.copilot;
  const claude = lines.claude;
  const bundleOptions = bundleTiers.map<TierOption>((id) => ({
    id,
    name: tiers[id].name,
    label: tiers[id].label,
    price: tiers[id].price[currency],
    available: isTierOfferable(id),
  }));

  return (
    <CheckoutProvider currency={currency} tiers={bundleOptions} primaryTier="both-complete">
      <div className="min-h-dvh bg-canvas text-ink">
        <header className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-sans text-[13px] font-bold uppercase tracking-[0.14em]">{site.name}</Link>
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {nav.map((l) => <a key={l.href} href={l.href} className="btn-ghost !px-2.5">{l.label}</a>)}
          </nav>
          <a href="#products" className="btn-primary whitespace-nowrap !px-4 !py-2.5 !text-sm">Explore the Systems</a>
        </header>

        <main>
          {/* ───────────── Hero ───────────── */}
          <section className="container pb-16 pt-16 md:pb-24 md:pt-24">
            <p className="eyebrow">{site.name}</p>
            <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight md:text-6xl">{site.tagline}</h1>
            <p className="section-lead max-w-2xl">
              Kaelis Voss creates practical guides, workflows, and digital systems that help professionals turn powerful AI tools into repeatable ways of working.
            </p>
            <p className="mt-8 max-w-2xl border-l-2 border-accent pl-5 text-lg font-medium leading-relaxed">
              AI tools are powerful. Your workflow determines how much value you get from them.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="btn-primary !py-4">Explore the Systems <Icon.arrow className="btn-arrow h-4 w-4" /></a>
              <a href="#how-it-works" className="btn-secondary !py-4">How It Works</a>
            </div>
          </section>

          {/* ───────────── The two systems ───────────── */}
          <section id="products" className="scroll-mt-8 pb-20 md:pb-28">
            <div className="container">
              <Head title="Two AI systems. One better way to work." />
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper">
                  <div className="flex h-72 items-center justify-center bg-app-word/5 px-8">
                    <Ebook book="copilot" className="w-44" sizes="180px" priority />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{copilot.name}™</h3>
                    <p className="mt-1 font-medium text-ink-soft">{copilot.descriptor}</p>
                    <p className="mt-4 leading-relaxed text-ink-muted"><span className="font-semibold text-ink">Best for:</span> Professionals who live in Microsoft 365.</p>
                    <p className="mt-auto pt-6 text-sm text-ink-muted">Book {from("book")} · Complete {from("complete")} · Pro {from("pro")}</p>
                    <Link href={copilot.base} className="btn-primary mt-4">Explore Copilot Advantage <Icon.arrow className="btn-arrow h-4 w-4" /></Link>
                  </div>
                </div>

                <div className="line-claude flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-paper text-ink">
                  <div className="flex h-72 items-center justify-center gap-4 bg-canvas px-8">
                    <Ebook book="claude" className="w-44" sizes="180px" priority />
                    <Ebook book="operator" className="hidden w-32 sm:block" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{claude.name}™</h3>
                    <p className="mt-1 font-medium text-ink-soft">{claude.descriptor}</p>
                    <p className="mt-4 leading-relaxed text-ink-muted">
                      <span className="font-semibold text-ink">Best for:</span> Professionals who want advanced AI workflows across research, writing, analysis, coding, projects, and creative work.
                    </p>
                    <p className="mt-auto pt-6 text-sm text-ink-muted">Book {from("claude-book")} · Complete {from("claude-complete")} · Pro {from("claude-pro")}</p>
                    <Link href={claude.base} className="btn-primary mt-4">Explore Claude Advantage <Icon.arrow className="btn-arrow h-4 w-4" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────── Core idea and method ───────────── */}
          <section id="how-it-works" className="section scroll-mt-8 border-t border-line bg-paper">
            <div className="container">
              <Head
                eyebrow="How it works"
                title="AI Tools Are Not the Advantage. Knowing How to Use Them Is."
                lead="The tools keep getting better. The real advantage comes from knowing how to turn them into repeatable workflows."
              />
              <Reveal className="mt-14">
                <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                  {method.map((m, i) => (
                    <li key={m.k} className="bg-white p-6 md:p-8">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em]">{m.k}</p>
                      <p className="mt-2 text-lg leading-snug">{m.v}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>

          {/* ───────────── Before and after ───────────── */}
          <section className="section">
            <div className="container max-w-4xl">
              <Head title="A system, not a pile of prompts." />
              <Reveal className="mt-12 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-paper p-6 md:p-8">
                  <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Without a system</p>
                  <div className="mt-6"><Flow steps={without} /></div>
                  <p className="mt-6 text-center text-sm text-ink-muted">Starts from scratch every time.</p>
                </div>
                <div className="rounded-xl bg-ink p-6 text-white shadow-window md:p-8">
                  <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-white/60">With a system</p>
                  <div className="mt-6"><Flow steps={withSystem} strong /></div>
                  <p className="mt-6 text-center text-sm text-white/70">Built once. Reused every week.</p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ───────────── Value proposition ───────────── */}
          <section className="section border-t border-line bg-paper">
            <div className="container grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <p className="eyebrow">What you get</p>
                <h2 className="section-title mt-4">Don&apos;t collect prompts. Build a workflow.</h2>
                <div className="mt-6 grid gap-4 text-lg leading-relaxed text-ink-muted">
                  <p>Cheap AI products focus on the number of prompts. A prompt on its own helps you once.</p>
                  <p className="font-medium text-ink">Kaelis Voss builds the whole system around the prompt, so the result is something you can reuse.</p>
                  <p>The goal isn&apos;t to use AI more. It&apos;s to use it better.</p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <ol className="mx-auto grid max-w-sm justify-items-center gap-1.5 text-center">
                  {stack.map((s, i) => {
                    const last = i === stack.length - 1;
                    return (
                      <li key={s} className="grid w-full justify-items-center gap-1.5">
                        {i > 0 && <span aria-hidden className="font-semibold text-accent">+</span>}
                        <span className={`w-full rounded-lg px-5 py-3 font-display text-lg font-semibold ${last ? "bg-ink text-white" : "border border-line bg-white"}`}>{s}</span>
                      </li>
                    );
                  })}
                </ol>
              </Reveal>
            </div>
          </section>

          {/* ───────────── Product philosophy ───────────── */}
          <section className="section">
            <div className="container max-w-4xl text-center">
              <Head title="Built for people who actually have work to do." />
              <Reveal className="mx-auto mt-6 grid max-w-2xl gap-4 text-lg leading-relaxed text-ink-muted">
                <p>Kaelis Voss products are designed around real work: emails, meetings, documents, research, analysis, presentations, projects, decisions, and planning.</p>
                <p>Every system is built to help you move from one-off AI interactions to repeatable workflows.</p>
              </Reveal>
              <ul className="mt-10 flex flex-wrap justify-center gap-2">
                {work.map((w) => <li key={w} className="rounded-md border border-line bg-white px-4 py-2 font-medium">{w}</li>)}
              </ul>
            </div>
          </section>

          {/* ───────────── Bundles ───────────── */}
          <section id="bundles" className="section scroll-mt-8 border-t border-line bg-paper">
            <div className="container max-w-5xl">
              <Head eyebrow="Both systems" title={bundleCopy.title} lead={bundleCopy.lead} />
              <Reveal className="mt-12"><Bundles /></Reveal>
            </div>
          </section>

          {/* ───────────── About ───────────── */}
          <section id="about" className="section scroll-mt-8">
            <div className="container flex max-w-3xl flex-col items-start gap-6 sm:flex-row">
              <Image src="/images/author.jpg" alt={site.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-line" />
              {/* TODO: replace with the author's own bio. */}
              <div>
                <p className="eyebrow">About</p>
                <h2 className="mt-3 text-3xl">We don&apos;t sell AI information. We build AI work systems.</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  Kaelis Voss is an independent publisher of practical guides, workflows, and digital systems for professionals. Each product is built to stay useful long after
                  the first read: methods you can apply, workflows you can reuse, and systems you can grow.
                </p>
              </div>
            </div>
          </section>

          {/* ───────────── FAQ ───────────── */}
          <section id="faq" className="section scroll-mt-8 border-t border-line bg-paper">
            <div className="container grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <p className="eyebrow">FAQ</p>
                <h2 className="section-title mt-4">Questions, answered</h2>
                <p className="mt-5 text-ink-muted">
                  Something else? Email <a className="font-semibold text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                </p>
              </Reveal>
              <div className="border-t border-line">
                {sharedFaqs.map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line bg-white transition-transform duration-300 group-open:rotate-45" aria-hidden>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                      </span>
                    </summary>
                    <p className="pb-6 pr-10 leading-relaxed text-ink-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CheckoutProvider>
  );
}
