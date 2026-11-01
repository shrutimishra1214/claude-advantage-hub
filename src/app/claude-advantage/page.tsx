import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/icons";
import { ProductScene } from "@/components/Mockups";
import { BriefBuilder } from "@/components/members/BriefBuilder";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Shell";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { getCurrency } from "@/lib/currency";
import { lines } from "@/lib/lines";
import { formatPrice, products, tiers, type TierId } from "@/lib/products";
import { site } from "@/lib/site";
import { claudeDays, claudeWeekTitles } from "@/lib/claude/transformation";

const L = lines.claude;
const title = "Claude Prompts, Workflows & Systems | The Claude Advantage";
const description =
  "The complete Claude AI workflow system for professionals: advanced prompts, workflows for research, writing, analysis, Projects, Claude Code, Cowork and Design, and a 30-day transformation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/claude-advantage" },
  openGraph: { title, description, type: "website", siteName: L.name },
  twitter: { card: "summary_large_image", title, description },
};

const usual = ["Ask", "Get answer", "Copy", "Paste", "Repeat"];
const advantage = ["Goal", "Context", "Claude", "Research", "Reason", "Create", "Refine", "Workflow", "Result"];
const flow = ["Research", "Claude", "Analyze", "Synthesize", "Create", "Refine", "Deliver"];

const modules = [
  { k: "Claude Workflow Vault", v: "100+ advanced AI workflows", icon: "flow" },
  { k: "Prompt System", v: "250+ advanced prompt recipes", icon: "book" },
  { k: "Research System", v: "Research → Analyze → Synthesize", icon: "search" },
  { k: "Claude Code", v: "Build with Claude", icon: "grid" },
  { k: "Claude Cowork", v: "Delegate real work", icon: "briefcase" },
  { k: "Claude Design", v: "Create & iterate", icon: "wand" },
  { k: "Project System", v: "Turn conversations into ongoing work", icon: "layers" },
  { k: "AI Work System", v: "30-day Claude transformation", icon: "calendar" },
] as const;

const areas = [
  { k: "Research", v: "Research complex topics and turn scattered information into structured insights." },
  { k: "Writing", v: "Draft, rewrite, refine and transform professional content in your voice." },
  { k: "Analysis", v: "Analyze documents, data and information to uncover what matters." },
  { k: "Projects", v: "Build persistent workspaces around ongoing work, so every session starts briefed." },
  { k: "Code", v: "Use Claude for software, scripts, debugging and technical workflows, safely." },
  { k: "Cowork", v: "Delegate complex multi-step work and review it in minutes." },
  { k: "Design", v: "Turn ideas into polished visual and product concepts." },
  { k: "Business", v: "Create strategies, reports, proposals and decision documents." },
];

const ecosystem = [
  ["The Book", "The Claude Advantage: the mental model, the method and role playbooks."],
  ["Prompt Library", "The book's Master Prompt Library, ready to customize and save as yours."],
  ["Workflow Vault", "Prompt chains and blueprints that turn one prompt into a finished job."],
  ["Context Kit", "Professional Brief, Company Brain, Style Guide and Project instructions."],
  ["Claude Code Workflows", "A safe first build, from spec to tested script."],
  ["Cowork Workflows", "Delegation briefs and the five-minute review."],
  ["Design Workflows", "Three directions, the real thing, then a critique."],
  ["Research Systems", "Frame, research, synthesize, deliver: with sources."],
  ["30-Day Transformation", "One task a day, from user to power user."],
  ["Advanced AI Playbooks", "The Claude Operator: skills, 25 workflows and your AI Chief of Staff."],
];

const audience = ["Professionals", "Executives", "Consultants", "Entrepreneurs", "Creators", "Researchers", "Analysts", "Developers", "Knowledge workers"];

const faqs = [
  { q: "I already use Claude. Is this for me?", a: "Yes. It's built for people who use Claude but sense they're getting a fraction of its value. The system moves you from asking questions to running repeatable workflows." },
  { q: "Do I need to be technical?", a: "No. Everything outside the Claude Code workflows is plain-language work: research, writing, analysis, planning and delegation. The coding workflows start from a safe, step-by-step first build." },
  { q: "Which Claude plan do I need?", a: "Most of the system works on any Claude plan. Some features, such as Projects, Research, Claude Code, Cowork and Design, depend on your plan and region, and change over time. Each workflow says what it needs." },
  { q: "What's the difference between The Claude Advantage and The Claude Operator?", a: "The Claude Advantage is the core system: the mental model, prompting, context and workflows. The Claude Operator is the advanced level: building an AI Chief of Staff with delegated jobs, tested skills and scheduled workflows." },
  { q: "What happens when Claude changes?", a: "The system teaches durable methods rather than button locations. Interface-specific details are updated in the member area as Claude evolves." },
  { q: "Is this affiliated with Anthropic?", a: "No. The Claude Advantage is an independently created educational product. Claude is a product of Anthropic, PBC." },
];

function Head({ eyebrow, title, lead, center = true }: { eyebrow: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

function Check({ children }: { children: ReactNode }) {
  return <li className="flex gap-2.5 leading-snug"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.4} /><span>{children}</span></li>;
}

const stagger = (i: number) => ({ ["--i" as string]: i });

/** The workspace mockup: the system's modules around a workflow being run. */
function Workspace() {
  return (
    <div className="window" role="img" aria-label="Preview of The Claude Advantage workspace: modules around a research workflow">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[11px] text-ink-muted">The Claude Advantage · Workspace</span></div>
      <div className="grid md:grid-cols-[200px_1fr]">
        <ul className="hidden border-r border-line bg-paper/70 p-3 md:block" aria-hidden>
          {modules.map((m, i) => {
            const I = Icon[m.icon];
            return (
              <li key={m.k} className={`flex items-start gap-2 rounded-md px-2 py-2 ${i === 2 ? "bg-white shadow-soft" : ""}`}>
                <I className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${i === 2 ? "text-accent" : "text-ink-muted"}`} />
                <span>
                  <span className={`block text-[11px] font-semibold leading-tight ${i === 2 ? "" : "text-ink-soft"}`}>{m.k}</span>
                  <span className="block text-[10px] leading-tight text-ink-muted">{m.v}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="p-4 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Research System · running</p>
          <p className="mt-1 font-display text-lg">Market entry brief for the leadership offsite</p>
          <ol className="mt-4 flex flex-wrap items-center gap-1.5">
            {flow.map((s, i) => (
              <li key={s} className="flex items-center gap-1.5">
                {i > 0 && <Icon.arrow className="h-3 w-3 text-ink-muted" />}
                <span className={`rounded px-2 py-1 text-[11px] font-semibold ${s === "Claude" ? "bg-accent text-white" : i < 4 ? "bg-ink text-white" : "border border-line bg-white text-ink-muted"}`}>{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Research brief", "doc"],
              ["Data analysis", "chart"],
              ["Strategy memo", "pages"],
              ["Presentation", "slides"],
              ["Code workspace", "grid"],
              ["Project space", "layers"],
            ].map(([t, icon]) => {
              const I = Icon[icon as "doc"];
              return (
                <div key={t} className="rounded-lg border border-line bg-white p-3">
                  <I className="h-4 w-4 text-accent" />
                  <p className="mt-2 text-[11px] font-semibold">{t}</p>
                  <span className="mt-2 grid gap-1"><span className="skel w-full" /><span className="skel w-4/5" /></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ClaudeAdvantage() {
  const currency = await getCurrency();
  const price = (id: TierId) => formatPrice(tiers[id].price[currency], currency);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: L.name,
      description,
      brand: { "@type": "Brand", name: site.name },
      offers: L.tiers.map((id) => ({
        "@type": "Offer",
        name: tiers[id].name,
        price: (tiers[id].price.USD / 100).toFixed(2),
        priceCurrency: "USD",
        url: `${site.url}/claude-advantage#pricing`,
      })),
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  return (
    <Shell line="claude">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ───────────── Hero ───────────── */}
      <section id="overview" className="relative scroll-mt-16 overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="hero-in eyebrow">The Claude Advantage™ · {L.descriptor}</p>
            <h1 className="hero-in mt-5 text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]" style={{ animationDelay: "60ms" }}>
              Stop chatting with Claude.
              <span className="mt-1 block italic text-accent">Start working with Claude.</span>
            </h1>
            <p className="hero-in mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl" style={{ animationDelay: "120ms" }}>
              The complete system for turning Claude into a serious AI work partner.
            </p>
            <p className="hero-in mt-3 font-display text-xl italic text-ink-soft" style={{ animationDelay: "160ms" }}>Research. Create. Analyze. Code. Design. Work.</p>
            <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "200ms" }}>
              <BuyButton label="Get the Claude Advantage" className="!py-4" />
              <a href="#system" className="btn-secondary !py-4">See the system <span aria-hidden>↓</span></a>
            </div>
            <p className="hero-in mt-6 text-sm text-ink-muted" style={{ animationDelay: "260ms" }}>
              250+ prompts • 100+ workflows • Advanced Claude systems • 30-day transformation
            </p>
          </div>
          <div className="hero-in" style={{ animationDelay: "200ms" }}><Workspace /></div>
        </div>
      </section>

      {/* ───────────── The transformation ───────────── */}
      <section className="border-y border-line bg-paper py-16 md:py-24">
        <div className="container grid max-w-5xl gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="rounded-xl border border-line bg-white/60 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Basic Claude user</p>
            <ol className="mt-5 grid gap-2">
              {usual.map((s, i) => (
                <li key={s} className="flow-step flex items-center gap-3 text-ink-muted" style={stagger(i)}>
                  <span className="font-mono text-xs">{i + 1}</span>
                  <span className={i === usual.length - 1 ? "italic" : ""}>{s}.</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-ink-muted">Useful. Forgettable. Starts from zero every time.</p>
          </Reveal>
          <Reveal delay={120} className="rounded-xl border border-ink bg-ink p-6 text-white shadow-window">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E7B437]">Claude Advantage user</p>
            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {advantage.map((s, i) => (
                <li key={s} className="flow-step flex items-center gap-2" style={stagger(i + 5)}>
                  {i > 0 && <Icon.arrow className="h-3.5 w-3.5 text-white/40" />}
                  <span className={`rounded-md px-3 py-1.5 text-sm font-semibold ${s === "Claude" ? "bg-accent" : s === "Result" ? "bg-white text-ink" : "bg-white/10"}`}>{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-white/70">Briefed, structured, verified, and repeatable tomorrow.</p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Key message ───────────── */}
      <section className="section">
        <Reveal className="container max-w-4xl text-center">
          <p className="font-display text-3xl leading-snug md:text-5xl">
            Claude is powerful.
            <span className="block text-ink-muted">But your workflow determines how much value you get from it.</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">The Claude Advantage teaches you how to build those workflows.</p>
        </Reveal>
      </section>

      {/* ───────────── The system ───────────── */}
      <section id="system" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container">
          <Head eyebrow="The system" title="One operating system for serious Claude work" lead="Eight modules that work together, so a conversation becomes a workflow, and a workflow becomes your system." />
          <Reveal className="mt-14">
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((m, i) => {
                const I = Icon[m.icon];
                return (
                  <li key={m.k} className={`flex flex-col p-6 ${i === 0 ? "bg-ink text-white" : "bg-white"}`}>
                    <I className={`h-5 w-5 ${i === 0 ? "text-[#E7B437]" : "text-accent"}`} />
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">{m.k}</p>
                    <p className={`mt-1 font-display text-lg leading-snug ${i === 0 ? "text-white/85" : "text-ink-soft"}`}>{m.v}</p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ───────────── What you'll work on ───────────── */}
      <section id="workflows" className="section scroll-mt-16">
        <div className="container">
          <Head eyebrow="Where it works" title="Research. Create. Analyze. Code. Design. Work." lead="Every area comes with prompts, workflows and the method to make them yours." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((a, i) => (
              <li key={a.k}>
                <Reveal delay={(i % 4) * 60} className="h-full border-t-2 border-ink pt-5">
                  <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl">{a.k}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{a.v}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Code, Cowork & Design ───────────── */}
      <section id="claude-code" className="section scroll-mt-16 bg-ink text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow !text-[#E7B437]">Beyond chat</p>
            <h2 className="section-title mt-4 !text-white">Code. Cowork. Design.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Claude now does real work beyond the chat window. The system shows you how to use it safely: brief the job, give only the access it needs, review the result in
              minutes, and keep the decisions that matter.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {[
              ["Claude Code", "A safe first build: spec, plan, small steps, tests and a README. Work on copies; save points before every change."],
              ["Cowork", "Hand off a half-day job with a delegation brief and a review page, then check it in five minutes."],
              ["Design", "Three directions first, then the real, editable piece, then a critique from your audience's point of view."],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 80} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-display text-2xl">{k}</p>
                <p className="mt-2 leading-relaxed text-white/70">{v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Ecosystem + books ───────────── */}
      <section className="section">
        <div className="container">
          <Head eyebrow="What you get" title="Much more than a book or a prompt list" lead="A complete ecosystem: the books for the method, the member area for the work." />
          <Reveal className="mx-auto mt-14 max-w-5xl">
            <ProductScene line="claude" extraBook="operator" />
            <p className="mt-4 text-center text-sm text-ink-muted">Ebooks · Member system · Mobile access · Printable worksheets</p>
          </Reveal>
          <div className="mt-14">
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {ecosystem.map(([k, v]) => (
                <li key={k} className="bg-white p-5">
                  <p className="font-semibold">{k}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── Prompt builder ───────────── */}
      <section className="section border-t border-line bg-paper">
        <div className="container">
          <Head eyebrow="Try it" title="Brief Claude like a senior colleague" lead="Role, Context, Task, Format, Constraints: the five parts behind every prompt in the system. Fill them in and copy the prompt." />
          <Reveal className="mt-12"><BriefBuilder /></Reveal>
        </div>
      </section>

      {/* ───────────── 30-day ───────────── */}
      <section id="challenge" className="section scroll-mt-16">
        <div className="container">
          <Head eyebrow="30-Day Claude Transformation" title="Claude user → power user → AI-enabled professional" lead="One short task a day on real work, four weeks, one clear direction." />
          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {([1, 2, 3, 4] as const).map((w, i) => (
              <li key={w}>
                <Reveal delay={i * 70} className={`flex h-full flex-col rounded-xl border p-6 ${w === 4 ? "border-ink bg-ink text-white" : "border-line bg-white"}`}>
                  <span className={`text-xs font-bold uppercase tracking-[0.16em] ${w === 4 ? "text-[#E7B437]" : "text-accent"}`}>Week {w}</span>
                  <h3 className="mt-3 text-xl">{claudeWeekTitles[w]}</h3>
                  <ul className={`mt-3 grid gap-1 text-sm ${w === 4 ? "text-white/70" : "text-ink-muted"}`}>
                    {claudeDays.filter((d) => d.week === w).slice(0, 4).map((d) => <li key={d.day}>Day {d.day} · {d.title}</li>)}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Who it's for ───────────── */}
      <section className="section border-t border-line bg-paper">
        <div className="container max-w-4xl text-center">
          <Head eyebrow="Who it's for" title="For people who already use Claude, and want far more from it" />
          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {audience.map((a) => <li key={a} className="rounded-md border border-line bg-white px-4 py-2 font-medium">{a}</li>)}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl font-display text-2xl italic leading-snug text-ink-soft">
            “I&apos;m using Claude as a chatbot. I could be using it as a work system.”
          </p>
        </div>
      </section>

      {/* ───────────── Pricing ───────────── */}
      <section id="pricing" className="section scroll-mt-16">
        <div className="container">
          <Head eyebrow="Pricing" title="Choose your level" lead="One-time payment. Instant access. Yours to keep." />
          <div className="mt-16 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Reveal className="card flex h-full flex-col p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Book</p>
              <h3 className="mt-2 text-xl">The Claude Advantage</h3>
              <p className="mt-6 font-display text-5xl">{price("claude-book")}</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]">{products["claude-book"].bullets.map((b) => <Check key={b}>{b}</Check>)}</ul>
              <BuyButton tier="claude-book" label="Get the Book" showPrice={false} variant="secondary" className="mt-auto w-full" />
            </Reveal>
            <Reveal delay={60} className="relative flex h-full flex-col rounded-xl border-2 border-accent bg-white p-7 shadow-lift">
              <span className="absolute -top-3 left-7 rounded bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Most popular</span>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Complete digital system</p>
              <h3 className="mt-2 text-xl">The Claude Advantage System</h3>
              <p className="mt-6 font-display text-5xl">{price("claude-system")}</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]">{products["claude-system"].bullets.map((b) => <Check key={b}>{b}</Check>)}</ul>
              <BuyButton tier="claude-system" label="Get the System" showPrice={false} className="mt-auto w-full" />
            </Reveal>
            <Reveal delay={120} className="card flex h-full flex-col p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Complete Bundle</p>
              <h3 className="mt-2 text-xl">Book + System</h3>
              <p className="mt-6 font-display text-5xl">{price("claude-bundle")}</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]"><Check>Everything in the Book</Check><Check>Everything in the System</Check></ul>
              <BuyButton tier="claude-bundle" label="Get the Bundle" showPrice={false} variant="secondary" className="mt-auto w-full" />
            </Reveal>
            <Reveal delay={180} className="relative flex h-full flex-col rounded-xl bg-ink p-7 text-white shadow-window">
              <span className="absolute -top-3 left-7 rounded bg-[#E7B437] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Advanced level</span>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Operator Edition</p>
              <h3 className="mt-2 text-xl">Everything + The Claude Operator</h3>
              <p className="mt-6 font-display text-5xl">{price("claude-operator")}</p>
              <ul className="mb-9 mt-7 grid gap-3 text-[15px]">
                <Check>The Book and the complete System</Check>
                {products["claude-operator"].bullets.map((b) => <Check key={b}>{b}</Check>)}
              </ul>
              <BuyButton tier="claude-operator" label="Become an Operator" showPrice={false} className="mt-auto w-full !bg-white !text-ink hover:!bg-paper" />
            </Reveal>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-muted">
            <span className="flex items-center gap-2"><Icon.shield className="h-4 w-4 text-accent" /> {site.guaranteeDays}-day money-back guarantee</span>
            <span className="flex items-center gap-2"><Icon.lock className="h-4 w-4 text-accent" /> Secure checkout by {currency === "INR" ? "Razorpay" : "Paddle"}</span>
            <span className="flex items-center gap-2"><Icon.download className="h-4 w-4 text-accent" /> Instant access after payment</span>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="section scroll-mt-16 border-t border-line bg-paper">
        <div className="container grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-4">Questions, answered</h2>
            <p className="mt-5 text-ink-muted">Something else? Email <a className="font-semibold text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
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
      <section className="bg-ink py-24 text-white md:py-32">
        <Reveal className="container max-w-3xl text-center">
          <h2 className="text-4xl leading-[1.05] !text-white md:text-6xl">
            Stop chatting with Claude.
            <span className="mt-1 block italic text-[#E7B437]">Start working with Claude.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-white/75">Master Claude. Build better workflows. Do more with AI.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <BuyButton label="Get the Claude Advantage" className="!py-4" />
            <BuyButton tier="claude-operator" label="Go advanced: Operator Edition" variant="secondary" className="!border-white/25 !bg-transparent !py-4 !text-white hover:!bg-white/10" />
          </div>
          <p className="mt-6 text-sm text-white/50">Complete Digital System · {site.guaranteeDays}-day money-back guarantee</p>
        </Reveal>
      </section>

      <StickyBuyBar />
    </Shell>
  );
}
