import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/icons";
import { AppTile } from "@/components/product/AppChip";
import { CheatSheets } from "@/components/product/CheatSheets";
import { DashboardPreview } from "@/components/product/DashboardPreview";
import { HeroVisual } from "@/components/product/HeroVisual";
import { Ebook, ProductScene } from "@/components/Mockups";
import { PromptBuilder } from "@/components/product/PromptBuilder";
import { PromptLibrary } from "@/components/product/PromptLibrary";
import { SavingsCalculator } from "@/components/product/SavingsCalculator";
import { TemplateVault } from "@/components/product/TemplateVault";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Shell";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { testimonials } from "@/lib/content";
import { getCurrency } from "@/lib/currency";
import { formatPrice, products, proPrice, tiers, type TierId } from "@/lib/products";
import { site } from "@/lib/site";
import {
  advantageWay,
  audiences,
  crossAppFlows,
  faqs,
  formula,
  formulaChain,
  outcomes,
  problems,
  proofPoints,
  quickstart,
  recipeCategories,
  sampleWorkflow,
  tools,
  transformation,
  usualWay,
  weeks,
  workflowCategories,
} from "@/lib/system";

export const metadata: Metadata = {
  title: { absolute: site.seoTitle },
  alternates: { canonical: "/copilot-advantage" },
};

function SectionHead({ eyebrow, title, lead, center = true }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title mt-4">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 leading-snug">
      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.4} />
      <span>{children}</span>
    </li>
  );
}

// Lets a flow step's entrance be staggered by its position.
const stagger = (i: number) => ({ ["--i" as string]: i });

export default async function Home() {
  const currency = await getCurrency();
  const price = (id: TierId) => formatPrice(tiers[id].price[currency], currency);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: site.productName,
      description: site.description,
      image: `${site.url}/images/cover.jpg`,
      brand: { "@type": "Brand", name: site.name },
      offers: (["book", "toolkit", "bundle"] as const).map((id) => ({
        "@type": "Offer",
        name: tiers[id].name,
        price: (tiers[id].price.USD / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${site.url}/#pricing`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ───────────── Hero ───────────── */}
      <section id="overview" className="relative scroll-mt-16 overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="container grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="hero-in eyebrow">The Complete Microsoft 365 AI Productivity System</p>
            <h1 className="hero-in mt-5 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem]" style={{ animationDelay: "60ms" }}>
              Turn Microsoft Copilot Into Your <span className="text-accent">AI Work Assistant</span>
            </h1>
            <p className="hero-in mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl" style={{ animationDelay: "120ms" }}>
              Stop asking random questions and start using Copilot through repeatable workflows that help you write, analyze, research, communicate, plan, and get
              more done across Microsoft 365.
            </p>
            <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
              <BuyButton label="Get the Copilot Advantage" className="!py-4" />
              <a href="#whats-inside" className="btn-secondary !py-4">
                See What&apos;s Inside <span aria-hidden>↓</span>
              </a>
            </div>
            <ul className="hero-in mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-ink-soft" style={{ animationDelay: "240ms" }}>
              {proofPoints.map((p, i) => (
                <li key={p} className="flex items-center gap-3">
                  {i > 0 && <span className="text-line-strong" aria-hidden>•</span>}
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-in lg:pl-6" style={{ animationDelay: "200ms" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ───────────── Random questions vs. a workflow ───────────── */}
      <section className="border-y border-line bg-paper py-16 md:py-20">
        <div className="container max-w-5xl">
          <Reveal className="grid gap-10">
            <div>
              <p className="text-sm font-semibold text-ink-muted">Most people use Copilot like this:</p>
              <ol className="mt-4 flex flex-wrap items-center gap-2">
                {usualWay.map((s, i) => (
                  <li key={s} className="flow-step flex items-center gap-2" style={stagger(i)}>
                    {i > 0 && <Icon.arrow className="h-4 w-4 text-ink-muted/60" />}
                    <span className={`rounded-md border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink-muted ${i === usualWay.length - 1 ? "line-through decoration-ink-muted/40" : ""}`}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl border border-accent/25 bg-white p-5 shadow-soft md:p-7">
              <p className="text-sm font-semibold text-accent">The Copilot Advantage:</p>
              <ol className="mt-4 flex flex-wrap items-center gap-2">
                {advantageWay.map((s, i) => (
                  <li key={s} className="flow-step flex items-center gap-2" style={stagger(i + usualWay.length)}>
                    {i > 0 && <Icon.arrow className="h-4 w-4 text-accent/60" />}
                    <span className={`rounded-md px-3.5 py-2 text-sm font-semibold ${s === "Workflow" ? "bg-ink text-white" : "bg-accent-soft text-accent-deep"}`}>{s}</span>
                  </li>
                ))}
                <li className="flow-step flex items-center gap-2 pl-1 text-sm font-medium text-accent" style={stagger(13)}>
                  <Icon.refresh className="h-4 w-4" /> again tomorrow
                </li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Problem ───────────── */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2 className="section-title mt-4">You&apos;re probably using Copilot wrong.</h2>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-ink-muted">
              <p>Most people use Copilot as an occasional chatbot. They ask a question, get an answer, copy something, and move on.</p>
              <p className="font-medium text-ink">The real power comes when you turn Copilot into repeatable workflows.</p>
              <p>Instead of simply teaching you more prompts, The Microsoft Copilot Advantage teaches you how to build systems around the work you already do.</p>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {problems.map((p, i) => {
              const I = Icon[p.icon];
              return (
                <li key={p.title}>
                  <Reveal delay={i * 70} className="card h-full p-6">
                    <span className="icon-tile h-10 w-10"><I className="h-5 w-5" /></span>
                    <h3 className="mt-5 text-lg">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-muted">{p.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────── Transformation ───────────── */}
      <section className="section border-t border-line bg-paper">
        <div className="container">
          <SectionHead eyebrow="The transformation" title="From AI Curiosity to AI-Powered Productivity" />
          <Reveal className="relative mt-14">
            <span aria-hidden className="grow-x absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-accent/40 md:block" />
            <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
              {transformation.map((t, i) => (
                <li key={t.title} className="flow-step relative flex gap-5 md:flex-col md:items-center md:text-center" style={stagger(i * 2)}>
                  <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full border font-display text-lg font-semibold ${i === 3 ? "border-accent bg-accent text-white" : "border-line-strong bg-white"}`}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl md:mt-5">{t.title}</h3>
                    <p className="mt-1.5 text-ink-muted">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ───────────── What you get ───────────── */}
      <section id="whats-inside" className="section scroll-mt-16">
        <div className="container">
          <SectionHead eyebrow="What's inside" title="Everything You Need to Make Copilot Actually Useful" lead="One system. Seven powerful tools." />
          <Reveal className="mx-auto mt-14 max-w-5xl">
            <ProductScene line="copilot" />
            <p className="mt-4 text-center text-sm text-ink-muted">Ebook · Member toolkit · Mobile access · Printable cheat sheets</p>
          </Reveal>
          <Reveal className="mt-14">
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((t, i) => {
                const I = Icon[t.icon];
                const hero = i === 2;
                return (
                  <li key={t.n} className={`bg-white ${hero ? "lg:row-span-2" : ""}`}>
                    <a href={t.href} className={`flex h-full flex-col p-6 transition ${hero ? "bg-ink text-white hover:bg-ink-soft" : "hover:bg-paper"}`}>
                      <span className="flex items-center justify-between">
                        <span className={`font-mono text-xs ${hero ? "text-white/60" : "text-ink-muted"}`}>{t.n}</span>
                        <I className={`h-5 w-5 ${hero ? "text-white" : "text-accent"}`} />
                      </span>
                      <span className="mt-8 block font-display text-lg font-semibold">{t.title}</span>
                      <span className={`mt-1.5 block text-sm leading-relaxed ${hero ? "text-white/70" : "text-ink-muted"}`}>{t.body}</span>
                      {hero && <span className="mt-auto pt-8 text-sm font-semibold">The centerpiece <span aria-hidden>→</span></span>}
                    </a>
                  </li>
                );
              })}
              <li className="flex items-center bg-paper p-6 lg:hidden">
                <p className="text-sm leading-relaxed text-ink-muted">Every tool connects. Recipes feed workflows, templates finish them, and the 30-day path turns them into habits.</p>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 01 · Quickstart */}
      <section id="quickstart" className="scroll-mt-20 pb-20 md:pb-28">
        <div className="container">
          <Reveal className="card grid gap-10 p-6 md:grid-cols-2 md:p-12">
            <div>
              <p className="font-mono text-sm text-accent">01 — Copilot Quickstart</p>
              <h3 className="mt-3 text-3xl md:text-4xl">Start Using Copilot With Confidence</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">A guided introduction that takes you from your first prompt to your first useful workflow.</p>
              <a href="#pricing" className="link-arrow mt-6">Explore Quickstart <Icon.arrow className="btn-arrow h-4 w-4" /></a>
            </div>
            <ol className="grid content-start border-l border-line">
              {quickstart.map((q, i) => {
                const last = i === quickstart.length - 1;
                return (
                  <li key={q} className="relative flex items-center gap-4 py-2.5 pl-6">
                    <span className={`absolute -left-[5px] h-2.5 w-2.5 rounded-full ring-2 ring-white ${last ? "bg-accent" : "bg-line-strong"}`} />
                    <span className="w-5 font-mono text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className={last ? "font-semibold text-accent" : "font-medium"}>{q}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 02 · Prompt Recipe Library */}
      <section id="prompt-library" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <SectionHead center={false} eyebrow="02 — Prompt Recipe Library" title="250+ Ready-to-Use Prompt Recipes" lead={<>Don&apos;t just collect prompts. Learn prompts organized around real work.</>} />
            <Reveal className="lg:pb-1">
              <p className="text-sm font-semibold">10 categories</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {recipeCategories.map((c) => <li key={c} className="rounded-md border border-line bg-white px-2.5 py-1 text-sm text-ink-soft">{c}</li>)}
              </ul>
            </Reveal>
          </div>
          <Reveal className="mt-12"><PromptLibrary /></Reveal>
          <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-ink-muted">Every recipe includes: goal · when to use it · what to provide · the prompt · expected output · follow-up · advanced version · example.</p>
            <a href="#pricing" className="link-arrow shrink-0">Explore the Prompt Library <Icon.arrow className="btn-arrow h-4 w-4" /></a>
          </Reveal>
        </div>
      </section>

      {/* 03 · Workflow Vault */}
      <section id="workflows" className="section scroll-mt-16 bg-ink text-white">
        <div className="container grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="eyebrow !text-white/60">03 — Copilot Workflow Vault</p>
            <h2 className="section-title mt-4">100 Repeatable Workflows</h2>
            <p className="mt-4 text-white/70">This is the centerpiece of the product.</p>
            <div className="mt-8 grid gap-1 border-l-2 border-accent pl-5 text-2xl font-semibold leading-snug md:text-3xl">
              <p className="text-white/55">A prompt helps you do one thing.</p>
              <p>A workflow helps you get the whole job done.</p>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {workflowCategories.map((c) => <li key={c} className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-white/80">{c}</li>)}
            </ul>
            <a href="#pricing" className="link-arrow mt-10 !text-white hover:!text-white/80">Explore the Workflow Vault <Icon.arrow className="btn-arrow h-4 w-4" /></a>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-xl bg-white p-5 text-ink shadow-window md:p-7">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Sample workflow</p>
                <span className="rounded bg-accent-soft px-2 py-1 text-[11px] font-semibold text-accent-deep">Meetings</span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">{sampleWorkflow.title}</p>
              <ol className="relative mt-6 grid gap-2.5">
                <span aria-hidden className="grow-y absolute bottom-6 left-[19px] top-6 w-px bg-line-strong" />
                {sampleWorkflow.steps.map((s, i) => (
                  <li key={s.label} className="flow-step relative flex items-center gap-4" style={stagger(i)}>
                    <AppTile app={s.app} className="relative h-10 w-10 text-sm ring-4 ring-white" />
                    <span className="min-w-0 flex-1 rounded-lg border border-line px-4 py-2.5">
                      <span className="block font-semibold">{s.label}</span>
                      <span className="block text-sm text-ink-muted">{s.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Cross-app workflows ───────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Cross-app workflows"
            title="Where Copilot Gets Really Powerful"
            lead="The real advantage comes from connecting workflows across Microsoft 365, so the output of one app becomes the input to the next."
          />
          <div className="mt-14 grid gap-5">
            {crossAppFlows.map((f, fi) => (
              <Reveal key={f.title} delay={fi * 60} className="card p-5 md:p-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-xl">{f.title}</h3>
                  <p className="text-sm text-ink-muted">{f.outcome}</p>
                </div>
                <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
                  {f.steps.map((s, i) => {
                    const last = i === f.steps.length - 1;
                    return (
                      <li key={s.label + i} className="flow-step relative flex items-center" style={stagger(i)}>
                        <span
                          className={`flex min-h-[52px] w-full items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-semibold lg:mr-7 ${
                            last ? "border-accent bg-accent text-white" : s.app ? "border-line bg-white" : "border-line bg-paper"
                          }`}
                        >
                          {s.app && <AppTile app={s.app} className="h-6 w-6 text-[10px]" />}
                          <span className="min-w-0 leading-tight">{s.label}</span>
                        </span>
                        {!last && <Icon.arrow className="absolute right-1.5 hidden h-4 w-4 text-ink-muted lg:block" />}
                      </li>
                    );
                  })}
                </ol>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Template Vault ───────────── */}
      <section id="templates" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container">
          <SectionHead eyebrow="Template Vault" title="Stop Starting From a Blank Page" lead="Professional templates designed to work with your Copilot workflows." />
          <Reveal className="mt-12"><TemplateVault /></Reveal>
        </div>
      </section>

      {/* ───────────── G-C-S-E formula ───────────── */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The framework" title="The 4-Part Copilot Prompt Formula" lead="Every strong prompt answers four questions. Learn them once and use them everywhere." />
          <Reveal className="mt-14">
            <div className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
              {formula.map((f, i) => (
                <div key={f.letter} className={`flow-step p-6 md:p-8 ${i % 2 ? "sm:border-l sm:border-line" : ""} ${i > 1 ? "sm:border-t sm:border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`} style={stagger(i)}>
                  <span className="font-display text-7xl font-bold leading-none text-accent">{f.letter}</span>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em]">{f.word}</p>
                  <p className="mt-2 text-lg leading-snug">{f.q}</p>
                  <p className="mt-5 rounded-md bg-paper px-3 py-2 font-mono text-[12.5px] leading-relaxed text-ink-soft">“{f.example}”</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="rounded-lg bg-ink px-5 py-3 font-display text-sm font-semibold tracking-wide text-white sm:text-base md:text-lg">GOAL + CONTEXT + SOURCE + EXPECTATIONS</p>
            {formulaChain.map((c, i) => (
              <div key={c} className="flow-step flex flex-col items-center gap-3" style={stagger(i + 4)}>
                <span aria-hidden className="text-accent">↓</span>
                <p className={`font-display font-semibold ${i === formulaChain.length - 1 ? "text-3xl text-accent md:text-4xl" : "text-xl text-ink-soft"}`}>{c}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ───────────── Prompt Builder ───────────── */}
      <section id="prompt-builder" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container">
          <SectionHead eyebrow="Prompt Builder · try it" title="Build the Right Copilot Prompt in Seconds" lead={<>Don&apos;t know what to ask? Build your prompt step by step.</>} />
          <Reveal className="mt-12"><PromptBuilder /></Reveal>
          <p className="mt-8 text-center text-sm text-ink-muted">This builder works right here. It&apos;s also part of the Toolkit, next to the recipes and workflows it feeds.</p>
        </div>
      </section>

      {/* ───────────── 30-Day Transformation ───────────── */}
      <section id="challenge" className="section scroll-mt-16">
        <div className="container">
          <SectionHead
            eyebrow="30-Day Copilot Transformation"
            title={<>Don&apos;t Just Learn Copilot. Build the Habit.</>}
            lead="A 30-day guided path from occasional Copilot user to confident AI-powered professional."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {weeks.map((w, i) => {
              const last = i === weeks.length - 1;
              return (
                <li key={w.n}>
                  <Reveal delay={i * 80} className={`flex h-full flex-col rounded-xl border p-6 ${last ? "border-ink bg-ink text-white" : "border-line bg-white"}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-[0.16em] ${last ? "text-white/60" : "text-accent"}`}>Week {w.n}</span>
                      <span className={`text-xs ${last ? "text-white/60" : "text-ink-muted"}`}>{w.days}</span>
                    </div>
                    <h3 className="mt-4 text-xl">{w.title}</h3>
                    <p className={`mt-2 leading-relaxed ${last ? "text-white/75" : "text-ink-muted"}`}>{w.body}</p>
                    <span className="mt-auto flex gap-1 pt-6" aria-hidden>
                      {Array.from({ length: last ? 9 : 7 }).map((_, d) => (
                        <span key={d} className={`h-1.5 flex-1 rounded-full ${last ? "bg-white/25" : "bg-accent/20"}`} />
                      ))}
                    </span>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 text-center">
            <BuyButton label="Start the 30-Day Transformation" showPrice={false} variant="dark" />
          </div>
        </div>
      </section>

      {/* ───────────── Cheat sheets ───────────── */}
      <section id="cheat-sheets" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container">
          <SectionHead eyebrow="Cheat sheets" title="Keep the Most Useful Copilot Knowledge at Your Fingertips" lead="Ten printable one-page references to keep next to your keyboard." />
          <Reveal className="mt-14"><CheatSheets /></Reveal>
        </div>
      </section>

      {/* ───────────── Member dashboard ───────────── */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Your member dashboard" title="Everything in One Place" lead="Pick up where you left off, run today's workflow, and reach every tool in one click." />
          <Reveal className="mx-auto mt-12 max-w-5xl"><DashboardPreview /></Reveal>
        </div>
      </section>

      {/* ───────────── Who it's for ───────────── */}
      <section className="section border-t border-line bg-paper">
        <div className="container">
          <SectionHead eyebrow="Who it's for" title="Built for People Who Have Work to Do" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => {
              const I = Icon[a.icon];
              return (
                <li key={a.title}>
                  <Reveal delay={(i % 3) * 70} className="card flex h-full gap-4 p-6">
                    <span className="icon-tile h-10 w-10 shrink-0"><I className="h-5 w-5" /></span>
                    <div>
                      <h3 className="text-lg">{a.title}</h3>
                      <p className="mt-1 leading-relaxed text-ink-muted">{a.body}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <Reveal className="mx-auto mt-10 max-w-2xl rounded-xl border border-accent/30 bg-white p-6 text-center">
            <p className="font-display text-2xl font-semibold">You do not need to be an AI expert.</p>
            <p className="mt-2 text-ink-muted">If you can write an email in Outlook, you can follow every workflow in this system.</p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Time savings ───────────── */}
      <section id="savings" className="section scroll-mt-16">
        <div className="container">
          <SectionHead
            eyebrow="Time savings"
            title="What Could You Do With an Extra Few Hours Every Week?"
            lead="The goal isn't to work faster just for the sake of working faster. It's to spend less time on repetitive work and more time on work that requires your judgment."
          />
          <Reveal className="mx-auto mt-12 max-w-5xl"><SavingsCalculator /></Reveal>
        </div>
      </section>

      {/* ───────────── Testimonials, or what you'll be able to do ───────────── */}
      {testimonials.length > 0 ? (
        <section id="reviews" className="section scroll-mt-16 border-t border-line bg-paper">
          <div className="container">
            <SectionHead eyebrow="From our readers" title="What People Are Saying" />
            <Reveal className="mt-14"><VideoTestimonials items={testimonials} /></Reveal>
          </div>
        </section>
      ) : (
        <section className="section border-t border-line bg-paper">
          <div className="container">
            <SectionHead eyebrow="Outcomes" title="What You'll Be Able to Do" />
            <Reveal className="mt-14">
              <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {outcomes.map((o, i) => (
                  <li key={o.title} className="bg-white p-6 md:p-8">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-lg">{o.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-muted">{o.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* ───────────── Pricing ───────────── */}
      <section id="pricing" className="section scroll-mt-16">
        <div className="container">
          <SectionHead eyebrow="Pricing" title="Start Building Your Copilot Advantage" lead="One-time payment. Instant access. Yours to keep." />

          <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
            <Reveal className="card flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Book</p>
                  <h3 className="mt-2 text-xl">The Microsoft Copilot Advantage</h3>
                </div>
                <Ebook book="copilot" className="w-[58px] shrink-0" sizes="60px" />
              </div>
              <p className="mt-6 font-display text-5xl font-semibold tracking-tight">{price("book")}</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]">
                {products.book.bullets.map((b) => <Check key={b}>{b}</Check>)}
              </ul>
              <BuyButton tier="book" label="Get the Book" showPrice={false} variant="secondary" className="mt-auto w-full" />
            </Reveal>

            <Reveal delay={80} className="relative flex h-full flex-col rounded-xl border-2 border-accent bg-white p-7 shadow-lift">
              <span className="absolute -top-3 left-7 rounded bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Most popular</span>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Toolkit</p>
              <h3 className="mt-2 text-xl">The Copilot Advantage Toolkit</h3>
              <p className="mt-6 font-display text-5xl font-semibold tracking-tight">{price("toolkit")}</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]">
                {products.toolkit.bullets.map((b) => <Check key={b}>{b}</Check>)}
              </ul>
              <BuyButton tier="toolkit" label="Get the Toolkit" showPrice={false} className="mt-auto w-full" />
            </Reveal>

            <Reveal delay={160} className="relative flex h-full flex-col rounded-xl bg-ink p-7 text-white shadow-window lg:-my-5 lg:py-12">
              <span className="absolute -top-3 left-7 rounded bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink ring-1 ring-ink">Everything included</span>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Complete Bundle</p>
                  <h3 className="mt-2 text-xl">Book + Toolkit</h3>
                </div>
                <span className="flex shrink-0 items-end">
                  <Ebook book="copilot" className="w-[50px]" sizes="50px" />
                  <span className="-ml-3 grid h-[52px] w-10 place-items-center rounded bg-accent shadow-book"><Icon.grid className="h-5 w-5" /></span>
                </span>
              </div>
              <p className="mt-6 font-display text-5xl font-semibold tracking-tight">{price("bundle")}</p>
              <p className="mt-2 text-sm text-white/70">The complete system: read the method, then run it.</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]">
                <Check>Everything in the Book</Check>
                <Check>Everything in the Toolkit</Check>
                {["250+ recipes, 100 workflows, 30+ templates", "30-Day Transformation & Prompt Builder", "Cheat sheets & cross-app workflow library"].map((b) => (
                  <li key={b} className="pl-6 text-white/65">{b}</li>
                ))}
              </ul>
              <BuyButton tier="bundle" label="Get the Complete Bundle" showPrice={false} className="mt-auto w-full !bg-white !text-ink hover:!bg-paper" />
            </Reveal>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-muted">
            <span className="flex items-center gap-2"><Icon.shield className="h-4 w-4 text-accent" /> {site.guaranteeDays}-day money-back guarantee</span>
            <span className="flex items-center gap-2"><Icon.lock className="h-4 w-4 text-accent" /> Secure checkout by {currency === "INR" ? "Razorpay" : "Paddle"}</span>
            <span className="flex items-center gap-2"><Icon.download className="h-4 w-4 text-accent" /> Instant access after payment</span>
          </div>

          {/* Pro: listed, never sold until it exists. */}
          <Reveal className="mt-14 flex flex-col gap-6 rounded-xl border border-dashed border-line-strong bg-paper p-6 md:flex-row md:items-center md:p-8">
            <div className="md:w-64 md:shrink-0">
              <span className="rounded bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted ring-1 ring-line">Coming soon</span>
              <h3 className="mt-3 text-xl">Copilot Advantage Pro</h3>
              <p className="mt-1 font-display text-2xl font-semibold text-ink-muted">{formatPrice(proPrice[currency], currency)}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Everything in the Complete Bundle, plus:</p>
              <ul className="mt-3 grid gap-x-6 gap-y-2 text-[15px] text-ink-soft sm:grid-cols-2">
                {["Advanced Executive Workflows", "Advanced Prompt Builder", "Workflow Builder", "Industry-specific workflow packs", "Future product updates"].map((b) => <Check key={b}>{b}</Check>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-4">Questions, answered</h2>
            <p className="mt-5 text-ink-muted">
              Something else? Email <a className="font-semibold text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </p>
            <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
              <Image src="/images/author.jpg" alt="Kaelis Voss" width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-1 ring-line" />
              {/* TODO: replace with the author's own bio. */}
              <p className="text-sm leading-relaxed text-ink-muted">
                <span className="block font-semibold text-ink">Created by {site.name}</span>
                Practical, no-jargon guides for professionals who want real results from Microsoft 365.
              </p>
            </div>
          </Reveal>
          <div className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line bg-white transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                  </span>
                </summary>
                <p className="answer pb-6 pr-10 leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-[0.12] invert" />
        <div className="container relative max-w-3xl text-center">
          <Reveal>
            <h2 className="text-4xl leading-[1.08] md:text-6xl">
              Your AI Advantage Isn&apos;t Another Prompt.
              <span className="mt-2 block text-white/55">It&apos;s a better way of working.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              You don&apos;t need to become an AI expert. You need a system that helps you use Copilot effectively when the work actually matters.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <BuyButton label="Get the Copilot Advantage" className="!py-4" />
              <BuyButton tier="bundle" label="Get the Book + Toolkit" variant="secondary" className="!border-white/25 !bg-transparent !py-4 !text-white hover:!bg-white/10" />
            </div>
            <p className="mt-6 text-sm text-white/50">{site.guaranteeDays}-day money-back guarantee · Instant access</p>
          </Reveal>
        </div>
      </section>

      <StickyBuyBar />
    </Shell>
  );
}
