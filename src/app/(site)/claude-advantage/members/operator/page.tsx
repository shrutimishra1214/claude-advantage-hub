import type { Metadata } from "next";
import Link from "next/link";
import { DoneCount, OperatorScaleQuiz } from "@/components/members/ClaudeMembers";
import { Locked } from "@/components/members/Locked";
import { PageHead } from "@/components/members/PageHead";
import { claudeAccess } from "@/lib/claude/access";
import { nextMove, operatorCheck, operatorLoop, operatorScale, opChapters, opParts, riskTiers } from "@/lib/claude/operator";

export const metadata: Metadata = { title: "Operator Track" };
const O = "/claude-advantage/members/operator";

export default async function OperatorHome() {
  const { operator } = await claudeAccess();
  if (!operator)
    return <Locked what="The Claude Operator" body="The advanced level: build an AI Chief of Staff with every Skill Drop, 25 Operator workflows and the 30-day Operator plan." href="/claude-advantage#pricing" />;
  return (
    <>
      <PageHead eyebrow="The Claude Operator · Advanced level" title="Build your AI Chief of Staff" lead="A small, tested system of Claude workflows that prepares, reports, analyses, drafts and builds, and leaves you the decisions.">
        <DoneCount ids={opChapters.flatMap((c) => c.actions.map((_, i) => `op-${c.n}-${i}`))} label="action steps done" />
      </PageHead>

      <section className="mt-10">
        <h2 className="text-2xl">The Operator Loop</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-5">
          {operatorLoop.map((s, i) => (
            <li key={s.step} className="rounded-xl border border-line bg-white p-4">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="mt-1 font-semibold">{s.step}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="text-lg">The Operator Check</h2>
          <ol className="mt-3 grid gap-1.5 text-sm">{operatorCheck.map((q, i) => <li key={q} className="flex gap-2"><span className="font-mono text-accent">{i + 1}</span>{q}</li>)}</ol>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="text-lg">Three risk tiers</h2>
          <ul className="mt-3 grid gap-2 text-sm">{riskTiers.map((t) => <li key={t.name}><strong>{t.name}.</strong> <span className="text-ink-muted">{t.body}</span></li>)}</ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl">Where are you on the Operator Scale?</h2>
        <p className="mt-1 text-ink-muted">Tick what's true of your work today. Re-take it every quarter.</p>
        <div className="mt-4"><OperatorScaleQuiz levels={operatorScale} moves={nextMove} /></div>
      </section>

      <section className="mt-12 grid gap-10">
        {opParts.map((p) => (
          <div key={p.n}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Part {p.n} · {p.title}</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {p.chapters.map((n) => {
                const c = opChapters.find((x) => x.n === n)!;
                return (
                  <li key={n}>
                    <Link href={`${O}/${n}`} className="flex h-full gap-4 rounded-xl border border-line bg-white p-4 transition hover:border-ink/20 hover:shadow-lift">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-sm text-ink-muted">{n}</span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug">{c.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{c.oneLine}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {p.capstone && <p className="mt-3 text-sm text-ink-muted"><strong className="text-ink">Capstone {p.n - 1}:</strong> {p.capstone}</p>}
          </div>
        ))}
      </section>
    </>
  );
}
