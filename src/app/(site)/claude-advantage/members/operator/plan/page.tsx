import type { Metadata } from "next";
import { Checklist, DoneCount } from "@/components/members/ClaudeMembers";
import { Locked } from "@/components/members/Locked";
import { PageHead } from "@/components/members/PageHead";
import { claudeAccess } from "@/lib/claude/access";
import { operatorPlan } from "@/lib/claude/operator";

export const metadata: Metadata = { title: "30-Day Operator Plan" };

export default async function OperatorPlan() {
  const { operator } = await claudeAccess();
  if (!operator) return <Locked what="The 30-Day Operator Plan" body="It's part of The Claude Operator advanced level." href="/claude-advantage#pricing" />;
  return (
    <>
      <PageHead eyebrow="Chapter 23 · Your 30-Day Operator Plan" title="Thirty days, one stage a week" lead="Five working days of 30–45 minutes, and a Friday check. Missed a day? Move the plan back a day rather than doubling up. Days 29 and 30 are Capstone 5.">
        <DoneCount ids={operatorPlan.flatMap((w) => w.days.map((d) => `opplan-${d.day}`))} label="days done" />
      </PageHead>
      <div className="mt-10 grid gap-12">
        {operatorPlan.map((w) => (
          <section key={w.week}>
            <h2 className="text-2xl"><span className="text-accent">Week {w.week}:</span> {w.name}</h2>
            <p className="mt-1 text-ink-muted">{w.goal}</p>
            <div className="mt-4">
              <Checklist prefix="opplan" items={w.days.map((d) => ({ id: `opplan-${d.day}`, num: d.day, text: d.task, note: `Chapter ${d.ch}` }))} />
            </div>
            <p className="mt-4 rounded-xl border border-accent/30 bg-accent-soft/40 p-4 text-sm"><strong>Friday check:</strong> {w.friday}</p>
          </section>
        ))}
        <section className="rounded-xl bg-ink p-6 text-white">
          <h2 className="text-xl">Days 29 and 30 · Capstone 5</h2>
          <p className="mt-2 text-white/75">Switch on your AI Chief of Staff: connect the five modules, verify them, and measure what you get back.</p>
        </section>
      </div>
    </>
  );
}

