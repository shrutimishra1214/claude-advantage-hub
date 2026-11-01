import type { Metadata } from "next";
import { Checklist, DoneCount } from "@/components/members/ClaudeMembers";
import { PageHead } from "@/components/members/PageHead";
import { roadmap, roadmapMonths } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "90-Day Roadmap" };

export default function Roadmap() {
  return (
    <>
      <PageHead eyebrow="Chapter 17 · The 90-Day Claude Mastery Roadmap" title="Twelve weeks to Claude fluency" lead="Foundation, then workflow integration, then team deployment. Tick off each action as you do it.">
        <DoneCount ids={roadmap.flatMap((w) => w.actions.map((_, i) => `road-${w.w}-${i}`))} label="actions done" />
      </PageHead>
      <div className="mt-10 grid gap-12">
        {roadmapMonths.map((m) => (
          <section key={m.m}>
            <h2 className="text-2xl"><span className="text-accent">Month {m.m}</span> · {m.title}</h2>
            <div className="mt-5 grid gap-8">
              {roadmap.filter((w) => w.month === m.m).map((w) => (
                <div key={w.w}>
                  <h3 className="text-lg">Week {w.w}: {w.title}</h3>
                  <div className="mt-3"><Checklist prefix={`road-${w.w}`} items={w.actions.map((text) => ({ text }))} /></div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-accent/30 bg-accent-soft/40 p-4 text-sm"><strong>Milestone:</strong> {m.milestone}</p>
          </section>
        ))}
      </div>
    </>
  );
}
