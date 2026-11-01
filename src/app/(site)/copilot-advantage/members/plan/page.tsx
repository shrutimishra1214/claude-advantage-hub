import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { NinetyDayPlan } from "@/components/members/Trackers";
import { derailment } from "@/lib/toolkit/method";

export const metadata: Metadata = { title: "90-Day Plan" };

export default function Plan() {
  return (
    <>
      <PageHead eyebrow="Chapter 38 · The 90-Day Plan" title="Master Copilot in 90 days, one habit at a time" lead="Each week adds a single new practice, anchored to something you already do and sustained before the next. Foundations before applications; habits before systems." />
      <div className="mt-8"><NinetyDayPlan /></div>
      <section className="mt-12 rounded-xl border border-line bg-paper p-6">
        <h2 className="text-lg">When you get derailed</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {derailment.map((d) => <li key={d.name}><p className="font-semibold">{d.name}</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">{d.fix}</p></li>)}
        </ul>
      </section>
    </>
  );
}
