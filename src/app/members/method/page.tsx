import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BriefBuilder } from "@/components/members/BriefBuilder";
import { PageHead } from "@/components/members/PageHead";
import { PromptBlock } from "@/components/members/PromptBlock";
import { anchors, fiveParts, ladder, multipliers, rungs, safeUse, shapes, steering, symptoms, triage } from "@/lib/toolkit/method";

export const metadata: Metadata = { title: "The Method" };

const sections = [
  ["five-parts", "Five-part brief"],
  ["shapes", "Six shapes"],
  ["fix", "Fix a bad answer"],
  ["verify", "Verify to the stakes"],
  ["anchors", "Three anchors"],
  ["triage", "Inbox triage"],
  ["safe-use", "Safe use"],
] as const;

function Section({ id, ch, title, lead, children }: { id: string; ch: string; title: string; lead: string; children: ReactNode }) {
  return (
    <section id={id} className="min-w-0 scroll-mt-32 border-t border-line pt-10">
      <p className="font-mono text-xs text-accent">{ch}</p>
      <h2 className="mt-1 text-2xl md:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{lead}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Method() {
  return (
    <>
      <PageHead eyebrow="The Method" title="The method behind every workflow" lead="The book's durable frameworks, as tools. Learn the method, not the menu: these keep working when the buttons move." />
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="chip">{label}</a>)}
      </nav>

      <div className="mt-10 grid gap-14">
        <Section id="five-parts" ch="Chapter 7" title="The five-part brief" lead="A prompt is a briefing. Brief Copilot like a capable stranger: completely, compactly, with the deliverable defined.">
          <ol className="grid gap-3 md:grid-cols-5">
            {fiveParts.map((p, i) => (
              <li key={p.key} className="rounded-xl border border-line p-4">
                <span className="font-mono text-xs text-accent">{i + 1}</span>
                <p className="mt-1 font-semibold">{p.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.why}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6"><BriefBuilder /></div>
          <h3 className="mt-8 text-lg">Read failures backward</h3>
          <table className="mt-3 w-full text-left text-sm">
            <thead><tr className="border-b border-line text-ink-muted"><th className="py-2 pr-4 font-semibold">The symptom</th><th className="py-2 font-semibold">The missing part</th></tr></thead>
            <tbody>{symptoms.map((s) => <tr key={s.symptom} className="border-b border-line"><td className="py-2.5 pr-4">{s.symptom}</td><td className="py-2.5 font-semibold text-accent">{s.missing}</td></tr>)}</tbody>
          </table>
        </Section>

        <Section id="shapes" ch="Chapter 8" title="Six shapes cover nearly all knowledge work" lead="You do not face a thousand tasks. You face six shapes, wearing a thousand costumes. Name the shape before you prompt.">
          <div className="grid gap-4 md:grid-cols-2">
            {shapes.map((s) => (
              <div key={s.name} className="rounded-xl border border-line p-5">
                <h3 className="text-lg">{s.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.what}</p>
                <p className="mt-1 text-sm text-ink-muted">{s.load}</p>
                <div className="mt-4"><PromptBlock label={`${s.name} template`} text={s.template} /></div>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-lg">Two force multipliers</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {multipliers.map((m) => (
              <div key={m.name} className="rounded-xl border border-line p-5">
                <p className="font-semibold">{m.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{m.body}</p>
                <div className="mt-3"><PromptBlock label="Append" text={m.append} dark={false} /></div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="fix" ch="Chapter 9" title="Fix any bad answer in two turns" lead="Diagnose, don't reword. One targeted turn usually fixes it, two at most. A failure that survives three is telling you the problem is structural.">
          <ol className="grid gap-3 md:grid-cols-2">
            {ladder.map((l) => (
              <li key={l.n} className="rounded-xl border border-line p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Layer {l.n}</p>
                <p className="mt-1 text-lg font-semibold">{l.name}</p>
                <p className="mt-2 text-sm text-ink-muted"><strong className="text-ink">The tell:</strong> {l.tell}</p>
                <p className="mt-1 text-sm text-ink-muted"><strong className="text-ink">The fix:</strong> {l.fix}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-8 text-lg">The steering moves</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead><tr className="border-b border-line text-ink-muted"><th className="py-2 pr-4 font-semibold">Move</th><th className="py-2 pr-4 font-semibold">When</th><th className="py-2 font-semibold">Say</th></tr></thead>
              <tbody>
                {steering.map((s) => (
                  <tr key={s.move} className="border-b border-line align-top">
                    <td className="py-3 pr-4 font-semibold">{s.move}</td>
                    <td className="py-3 pr-4 text-ink-muted">{s.when}</td>
                    <td className="py-3 font-mono text-[12.5px]">{s.say}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6"><PromptBlock label="The compiled brief (run it, then paste the result into a new chat)" text="Compile everything I've asked for in this conversation, including every correction, into one complete prompt using Role, Context, Task, Format and Constraints. Don't answer it; just write the prompt." /></div>
        </Section>

        <Section id="verify" ch="Chapters 2 and 34" title="Verify to the stakes" lead="Match the depth of verification to the cost of being wrong: heavy where the stakes are heavy, light where they are not.">
          <ol className="grid gap-3 md:grid-cols-4">
            {rungs.map((r) => (
              <li key={r.n} className="flex flex-col rounded-xl border border-line p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Rung {r.n}</p>
                <p className="mt-1 font-semibold">{r.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{r.examples}</p>
                <ul className="mt-3 grid gap-1 text-sm">{r.checks.map((c) => <li key={c}>· {c}</li>)}</ul>
              </li>
            ))}
          </ol>
          <Link href="/members/worksheets#verification" className="link-arrow mt-5 text-sm">Open the Verification checklist →</Link>
        </Section>

        <Section id="anchors" ch="Chapter 3" title="The three anchors" lead="If you build only three habits from the whole book, build these. Each one's output becomes the next one's input.">
          <div className="grid gap-4 lg:grid-cols-3">
            {anchors.map((a, i) => (
              <div key={a.name} className="flex flex-col rounded-xl border border-line p-5">
                <p className="font-mono text-xs text-accent">0{i + 1} · {a.when}</p>
                <h3 className="mt-1 text-lg">{a.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{a.why}</p>
                <div className="mt-4 grid gap-2">{a.prompts.map((p) => <PromptBlock key={p} label="Prompt" text={p} />)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="triage" ch="Chapter 16" title="Inbox triage: five decisions" lead="Every message gets exactly one classification on first touch. Classification is cheaper than reading.">
          <ol className="grid gap-3 sm:grid-cols-5">
            {triage.map((t) => <li key={t.name} className="rounded-xl border border-line p-4"><p className="font-semibold">{t.name}</p><p className="mt-1 text-sm text-ink-muted">{t.body}</p></li>)}
          </ol>
          <div className="mt-4"><PromptBlock text="Sort today's unread mail into Decide, Reply, Delegate, File, Drop. One line each. Treat anything from [names] as priority. Draft replies for the Reply pile but do not send them." /></div>
        </Section>

        <Section id="safe-use" ch="Chapter 32" title="Safe use: five everyday decisions" lead="The real enterprise risk is not the AI leaking data out. It is the AI surfacing data that was already overshared.">
          <ol className="grid gap-3 sm:grid-cols-5">
            {safeUse.map((s, i) => <li key={s.name} className="rounded-xl border border-line p-4"><p className="font-mono text-xs text-accent">{i + 1}</p><p className="font-semibold">{s.name}</p><p className="mt-1 text-sm text-ink-muted">{s.body}</p></li>)}
          </ol>
        </Section>
      </div>
    </>
  );
}
