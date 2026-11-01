import type { Metadata } from "next";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { Ebook } from "@/components/Mockups";
import { Checklist, OperatorScaleQuiz, SkillActions } from "@/components/members/ClaudeMembers";
import { MemberLineProvider } from "@/components/members/MemberLine";
import { Shell } from "@/components/Shell";
import { nextMove, operatorCheck, operatorLoop, operatorPlan, operatorScale, opSkills, opWorkflows, riskTiers } from "@/lib/claude/operator";

// The address printed in The Claude Operator. Readers get the Operator Toolkit, free.
export const metadata: Metadata = {
  title: { absolute: "The Claude Operator Toolkit | Kaelis Voss" },
  description: "The companion toolkit for The Claude Operator: the Skills Library, 25 ready-to-run workflows, the Operator Scale and the 30-Day Operator Plan.",
  alternates: { canonical: "/mastering-Claude-AI" },
};

const sections = [
  ["skills", "Skills Library"],
  ["workflows", "25 Workflows"],
  ["loop", "Operator Loop & Check"],
  ["scale", "Operator Scale"],
  ["plan", "30-Day Operator Plan"],
  ["updates", "Updates"],
] as const;

export default function OperatorToolkit() {
  const groups = Array.from(new Set(opWorkflows.map((w) => w.group)));
  return (
    <Shell line="claude">
      <MemberLineProvider line="claude" base="/claude-advantage/members">
        <section className="border-b border-line bg-paper pb-14 pt-28 md:pt-36">
          <div className="container grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">For readers of The Claude Operator</p>
              <h1 className="mt-4 text-4xl leading-tight md:text-5xl">Your Operator Toolkit</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
                Everything the chapters refer to, ready to use today instead of retyping it: every Skill Drop as a SKILL.md, the 25 workflows, the Operator Loop and Check, the Operator Scale and the 30-Day Operator Plan.
              </p>
              <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
                {sections.map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
              </nav>
            </div>
            <Ebook book="operator" className="hidden w-40 md:block" />
          </div>
        </section>

        <div className="container max-w-5xl py-14">
          <section id="skills" className="scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">The Skills Library</h2>
            <p className="section-lead">Download a SKILL.md, put it in its own folder, zip the folder and upload it in Claude&apos;s Skills settings. Test every skill on real inputs before you rely on it.</p>
            <ul className="mt-8 grid gap-3">
              {opSkills.filter((s) => s.skill).map((s) => (
                <li key={s.n} className="rounded-xl border border-line bg-white p-5">
                  <p className="font-mono text-xs text-accent">Skill #{s.n} · Chapter {s.chapter}</p>
                  <h3 className="mt-1 text-xl">{s.name}</h3>
                  <details className="mt-3 rounded-lg bg-ink text-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                      Show SKILL.md <SkillActions name={s.name} text={s.skill} />
                    </summary>
                    <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap border-t border-white/10 p-4 font-mono text-[12.5px] leading-relaxed">{s.skill}</pre>
                  </details>
                </li>
              ))}
            </ul>
          </section>

          <section id="workflows" className="mt-20 scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">25 ready-to-run workflows</h2>
            <p className="section-lead">Input → Claude does → You review → Output. Always run the Operator Check at the review step.</p>
            <div className="mt-8 grid gap-8">
              {groups.map((g) => (
                <div key={g}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">{g}</h3>
                  <ul className="mt-3 grid gap-2">
                    {opWorkflows.filter((w) => w.group === g).map((w) => (
                      <li key={w.n} className="grid gap-2 rounded-lg border border-line bg-white p-4 text-sm sm:grid-cols-[1.1fr_1fr_1.4fr_1fr_1fr]">
                        <span className="font-semibold"><span className="font-mono text-accent">{w.n}.</span> {w.title}</span>
                        <span className="text-ink-muted">{w.input}</span>
                        <span>{w.claude}</span>
                        <span className="text-ink-muted">Review: {w.review}</span>
                        <span className="font-medium">{w.output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="loop" className="mt-20 grid scroll-mt-20 gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-ink p-6 text-white">
              <h2 className="text-2xl !text-white">The Operator Loop</h2>
              <ol className="mt-4 grid gap-3">{operatorLoop.map((s, i) => <li key={s.step}><span className="font-mono text-[#E7B437]">{i + 1}. {s.step}</span><span className="block text-sm text-white/70">{s.body}</span></li>)}</ol>
            </div>
            <div className="rounded-xl border border-line bg-white p-6">
              <h2 className="text-2xl">The Operator Check</h2>
              <ol className="mt-4 grid gap-2">{operatorCheck.map((q, i) => <li key={q} className="flex gap-2"><span className="font-mono text-accent">{i + 1}</span>{q}</li>)}</ol>
              <h3 className="mt-6 text-lg">Three risk tiers</h3>
              <ul className="mt-2 grid gap-1.5 text-sm">{riskTiers.map((t) => <li key={t.name}><strong>{t.name}.</strong> <span className="text-ink-muted">{t.body}</span></li>)}</ul>
            </div>
          </section>

          <section id="scale" className="mt-20 scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">The Operator Scale</h2>
            <p className="section-lead">Tick what&apos;s true today. Your level is the highest with at least three of four ticks.</p>
            <div className="mt-8"><OperatorScaleQuiz levels={operatorScale} moves={nextMove} /></div>
          </section>

          <section id="plan" className="mt-20 scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">The 30-Day Operator Plan</h2>
            <p className="section-lead">Four weeks, one stage a week, then Capstone 5 on days 29 and 30. Saved in this browser.</p>
            <div className="mt-8 grid gap-10">
              {operatorPlan.map((w) => (
                <div key={w.week}>
                  <h3 className="text-xl"><span className="text-accent">Week {w.week}:</span> {w.name}</h3>
                  <p className="mt-1 text-ink-muted">{w.goal}</p>
                  <div className="mt-3"><Checklist prefix="opplan" items={w.days.map((d) => ({ id: `opplan-${d.day}`, num: d.day, text: d.task, note: `Chapter ${d.ch}` }))} /></div>
                  <p className="mt-3 rounded-lg border border-accent/30 bg-accent-soft/40 p-3 text-sm"><strong>Friday check:</strong> {w.friday}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="updates" className="mt-20 scroll-mt-20 rounded-xl border border-line bg-paper p-6">
            <h2 className="text-2xl">Keeping current</h2>
            <p className="mt-2 leading-relaxed text-ink-muted">
              Claude changes often: features, menus, names, plan availability and limits may differ from the book. When a change affects a workflow in the book, the note will be posted here. Last reviewed for the first edition (October 2026).
            </p>
          </section>

          <section className="mt-20 rounded-xl bg-ink p-8 text-white md:p-12">
            <p className="text-sm font-semibold text-[#E7B437]">Go further</p>
            <h2 className="mt-2 text-3xl !text-white md:text-4xl">Work through the book in the Operator track</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">The Operator Edition adds the member area: every chapter&apos;s action steps, failure modes and takeaways with progress tracking, plus the complete Claude Advantage System.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BuyButton tier="claude-operator" label="Get the Operator Edition" className="!py-4" />
              <Link href="/claude-advantage" className="btn-secondary !border-white/25 !bg-transparent !py-4 !text-white hover:!bg-white/10">See The Claude Advantage</Link>
            </div>
          </section>
        </div>
      </MemberLineProvider>
    </Shell>
  );
}
