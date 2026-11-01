import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { Checklist } from "@/components/members/ClaudeMembers";
import { advChapters } from "@/lib/claude/advantage";

type Props = { params: Promise<{ n: string }> };

// Where to practise each chapter in the member area.
const M = "/claude-advantage/members";
const tools: Record<number, { href: string; label: string }[]> = {
  2: [{ href: `${M}/builder`, label: "Prompt Builder" }],
  3: [{ href: `${M}/context`, label: "Context Kit templates" }],
  4: [{ href: `${M}/prompts`, label: "Professional Communications prompts" }],
  5: [{ href: `${M}/prompts/research-brief-generator`, label: "Research Brief Generator" }, { href: `${M}/workflows/research-to-brief`, label: "Research workflow" }],
  6: [{ href: `${M}/prompts/strategic-options-analysis`, label: "Strategic Options Analysis" }, { href: `${M}/prompts/pre-mortem-analysis`, label: "Pre-Mortem Analysis" }],
  7: [{ href: `${M}/workflows`, label: "Prompt chains and blueprints" }],
  8: [{ href: `${M}/context`, label: "Project setups" }, { href: `${M}/prompts`, label: "Your prompt library" }],
  16: [{ href: `${M}/worksheets#verification`, label: "Verification checklist" }],
  17: [{ href: `${M}/roadmap`, label: "90-Day Roadmap tracker" }],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = Number((await params).n);
  const c = advChapters.find((x) => x.n === n);
  return { title: c ? `Ch ${c.n}: ${c.title}` : "Chapter" };
}

export default async function ClaudeChapter({ params }: Props) {
  const n = Number((await params).n);
  const c = advChapters.find((x) => x.n === n);
  if (!c) notFound();
  const prev = advChapters.find((x) => x.n === c.n - 1);
  const next = advChapters.find((x) => x.n === c.n + 1);
  return (
    <article>
      <Link href={`${M}/book`} className="text-sm font-medium text-ink-muted hover:text-ink">← The Book</Link>
      <p className="eyebrow mt-4">Part · {c.part}</p>
      <h1 className="mt-2 text-3xl md:text-4xl"><span className="text-ink-muted">{c.n}.</span> {c.title}</h1>
      <blockquote className="mt-8 rounded-xl bg-ink p-6 text-white md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Key idea</p>
        <p className="mt-2 font-display text-2xl leading-snug md:text-3xl">{c.keyIdea}</p>
      </blockquote>
      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Inside this chapter</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {c.topics.map((t) => <li key={t} className="flex gap-2 rounded-lg border border-line bg-white p-3 text-sm"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{t}</li>)}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="text-xl">Do this week</h2>
        <div className="mt-4"><Checklist prefix={`adv-${c.n}`} items={c.actions.map((text) => ({ text }))} /></div>
      </section>
      {tools[c.n] && (
        <section className="mt-8 rounded-xl border border-accent/30 bg-accent-soft/40 p-5">
          <p className="text-sm font-semibold">Tools for this chapter</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {tools[c.n].map((t) => <li key={t.href}><Link href={t.href} className="link-arrow text-sm">{t.label} <Icon.arrow className="btn-arrow h-4 w-4" /></Link></li>)}
          </ul>
        </section>
      )}
      <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Chapters">
        {prev ? <Link href={`${M}/book/${prev.n}`} className="rounded-xl border border-line p-4 hover:border-ink/20"><span className="text-xs text-ink-muted">← Chapter {prev.n}</span><span className="block font-semibold">{prev.title}</span></Link> : <span />}
        {next && <Link href={`${M}/book/${next.n}`} className="rounded-xl border border-line p-4 text-right hover:border-ink/20"><span className="text-xs text-ink-muted">Chapter {next.n} →</span><span className="block font-semibold">{next.title}</span></Link>}
      </nav>
    </article>
  );
}
