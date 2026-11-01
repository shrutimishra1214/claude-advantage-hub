import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { Checklist, SkillActions } from "@/components/members/ClaudeMembers";
import { Locked } from "@/components/members/Locked";
import { claudeAccess } from "@/lib/claude/access";
import { opChapterByN, opChapters, opParts } from "@/lib/claude/operator";

type Props = { params: Promise<{ n: string }> };
const O = "/claude-advantage/members/operator";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = opChapterByN(Number((await params).n));
  return { title: c ? `Operator Ch ${c.n}: ${c.title}` : "Operator chapter" };
}

export default async function OperatorChapter({ params }: Props) {
  const { operator } = await claudeAccess();
  if (!operator) return <Locked what="The Claude Operator" body="This chapter is part of the advanced level." href="/claude-advantage#pricing" />;
  const c = opChapterByN(Number((await params).n));
  if (!c) notFound();
  const part = opParts.find((p) => p.chapters.includes(c.n))!;
  const prev = opChapterByN(c.n - 1);
  const next = opChapterByN(c.n + 1);
  return (
    <article>
      <Link href={O} className="text-sm font-medium text-ink-muted hover:text-ink">← Operator Track</Link>
      <p className="eyebrow mt-4">Part {part.n} · {part.title}</p>
      <h1 className="mt-2 text-3xl md:text-4xl"><span className="text-ink-muted">{c.n}.</span> {c.title}</h1>

      <blockquote className="mt-8 rounded-xl bg-ink p-6 text-white md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Chapter in one line</p>
        <p className="mt-2 font-display text-2xl leading-snug md:text-3xl">{c.oneLine}</p>
      </blockquote>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">In this chapter</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">{c.inThis.map((t) => <li key={t} className="flex gap-2 rounded-lg border border-line bg-white p-3 text-sm"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{t}</li>)}</ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl">Action steps</h2>
        <p className="mt-1 text-sm text-ink-muted">Three things to do this week.</p>
        <div className="mt-4"><Checklist prefix={`op-${c.n}`} items={c.actions.map((text) => ({ text }))} /></div>
      </section>

      {c.skills.map((s) => (
        <section key={s.n} className="mt-10">
          <h2 className="text-xl">Skill Drop #{s.n}: {s.name}</h2>
          {s.intro && <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">{s.intro}</p>}
          {s.skill && (
            <div className="mt-4 rounded-lg bg-ink p-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">SKILL.md</span>
                <SkillActions name={s.name} text={s.skill} />
              </div>
              <pre className="mt-3 max-h-[480px] overflow-auto whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed">{s.skill}</pre>
            </div>
          )}
        </section>
      ))}

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-line bg-white p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Key takeaways</h2>
          <ul className="mt-3 grid gap-3">{c.takeaways.map((t) => <li key={t} className="flex gap-2 leading-relaxed"><Icon.check className="mt-1 h-4 w-4 shrink-0 text-accent" />{t}</li>)}</ul>
        </section>
        {c.failures.length > 0 && (
          <section className="rounded-xl border border-line bg-white p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Failure mode</h2>
            {c.failures.map((f) => (
              <div key={f.title} className="mt-3">
                <p className="font-semibold">{f.title.charAt(0).toUpperCase() + f.title.slice(1)}</p>
                <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed text-ink-soft">{f.body.split("• ").filter(Boolean).map((b) => <li key={b}>{b.trim()}</li>)}</ul>
              </div>
            ))}
          </section>
        )}
      </div>

      <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Chapters">
        {prev ? <Link href={`${O}/${prev.n}`} className="rounded-xl border border-line p-4 hover:border-ink/20"><span className="text-xs text-ink-muted">← Chapter {prev.n}</span><span className="block font-semibold">{prev.title}</span></Link> : <span />}
        {next && <Link href={`${O}/${next.n}`} className="rounded-xl border border-line p-4 text-right hover:border-ink/20"><span className="text-xs text-ink-muted">Chapter {next.n} →</span><span className="block font-semibold">{next.title}</span></Link>}
      </nav>
    </article>
  );
}
