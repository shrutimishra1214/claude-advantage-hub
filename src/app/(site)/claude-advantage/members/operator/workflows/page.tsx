import type { Metadata } from "next";
import { Locked } from "@/components/members/Locked";
import { PageHead } from "@/components/members/PageHead";
import { claudeAccess } from "@/lib/claude/access";
import { opWorkflows } from "@/lib/claude/operator";

export const metadata: Metadata = { title: "Operator Workflows" };

export default async function OperatorWorkflows() {
  const { operator } = await claudeAccess();
  if (!operator) return <Locked what="The Operator workflows" body="The 25 ready-to-run workflows are part of The Claude Advantage™ Pro." href="/claude-advantage#pricing" />;
  const groups = Array.from(new Set(opWorkflows.map((w) => w.group)));
  return (
    <>
      <PageHead eyebrow="The Operator Playbook · Section 3" title="25 ready-to-run workflows" lead="Input → Claude does → You review → Output. The skill in brackets does most of the work. Always run the Operator Check at the review step." />
      <div className="mt-10 grid gap-10">
        {groups.map((g) => (
          <section key={g}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">{g}</h2>
            <ul className="mt-3 grid gap-3">
              {opWorkflows.filter((w) => w.group === g).map((w) => (
                <li key={w.n} className="rounded-xl border border-line bg-white p-5">
                  <p className="font-semibold"><span className="font-mono text-accent">{w.n}.</span> {w.title}</p>
                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-4">
                    {[["Input", w.input], ["Claude does", w.claude], ["You review", w.review], ["Output", w.output]].map(([k, v]) => (
                      <div key={k}><dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{k}</dt><dd className="mt-0.5 leading-relaxed">{v}</dd></div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
