"use client";

import Link from "next/link";
import { chapters } from "@/lib/toolkit/book";
import { days, weekTitles } from "@/lib/toolkit/learning";
import { ninetyDay, quickWins } from "@/lib/toolkit/method";
import { workflows } from "@/lib/toolkit/workflows";
import { Icon } from "../icons";
import { useProgress } from "./progress";

/** The progress-aware part of the dashboard: where you are and what's next. */
export function DashboardProgress() {
  const p = useProgress();
  const today = days[p.currentDay - 1];
  const pct = Math.round((p.days.length / 30) * 100);
  const started = p.days.length > 0 || p.lessons.length > 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-xl border border-line p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-semibold">Day {p.currentDay} of 30</p>
          <p className="text-sm text-ink-muted">{p.days.length} days done · {pct}%</p>
        </div>
        <span className="mt-3 block h-2 overflow-hidden rounded-full bg-paper-tint">
          <span className="block h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${p.ready ? pct : 0}%` }} />
        </span>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          {started ? "Continue learning" : "Start here"} · Week {today.week}: {weekTitles[today.week]}
        </p>
        <p className="mt-1.5 text-xl font-semibold">{today.title}</p>
        <p className="mt-1 text-ink-muted">{today.task}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/copilot-advantage/members/challenge" className="btn-primary !px-4 !py-2.5 !text-sm">
            <Icon.play className="h-3.5 w-3.5" /> {started ? "Continue" : "Start Day 1"}
          </Link>
          {!started && <Link href="/copilot-advantage/members/quickstart" className="btn-secondary !px-4 !py-2.5 !text-sm">Read the Quickstart first</Link>}
        </div>
      </div>

      <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-deep">Today&apos;s workflow</p>
        <TodayWorkflow day={p.currentDay} />
      </div>
    </div>
  );
}


function TodayWorkflow({ day }: { day: number }) {
  // Rotates through the vault so there's always something to practise.
  const wf = workflows[(day - 1) % workflows.length];
  return (
    <>
      <p className="mt-1.5 text-xl font-semibold">{wf.title}</p>
      <p className="mt-1 text-ink-soft">{wf.outcome}</p>
      <p className="mt-3 text-sm text-ink-muted">{wf.steps.length} steps · about {wf.minutes} min</p>
      <Link href={`/copilot-advantage/members/workflows/${wf.id}`} className="link-arrow mt-5 text-sm">
        Run this workflow <Icon.arrow className="btn-arrow h-4 w-4" />
      </Link>
    </>
  );
}

/** Where the member is in the book, the 90-day plan and the quick wins. */
export function DashboardBook() {
  const p = useProgress();
  const next = chapters.find((c) => !p.chapters.includes(c.n)) ?? chapters[chapters.length - 1];
  const allWeeks = ninetyDay.flatMap((x) => x.weeks);
  const week = allWeeks.find((w) => !p.weeks.includes(w.w)) ?? allWeeks[allWeeks.length - 1];
  const nextWin = quickWins.findIndex((_, i) => !p.wins.includes(i));

  const cards = [
    { label: `The Book · ${p.chapters.length} of ${chapters.length} chapters`, title: `Ch ${next.n}: ${next.title}`, body: next.keyIdea, href: `/copilot-advantage/members/book/${next.n}`, cta: "Do this chapter" },
    { label: `90-Day Plan · week ${week.w} of ${allWeeks.length}`, title: week.title, body: week.body, href: "/copilot-advantage/members/plan", cta: "Open the plan" },
    nextWin >= 0
      ? { label: `Quick wins · ${p.wins.length} of 12 tried`, title: quickWins[nextWin].title, body: quickWins[nextWin].body, href: "/copilot-advantage/members/quick-wins", cta: "Try it tomorrow" }
      : { label: "Quick wins · all 12 tried", title: "Every quick win done", body: "Now turn them into habits with the 90-Day Plan.", href: "/copilot-advantage/members/plan", cta: "Open the plan" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cards.map((c) => (
        <Link key={c.label} href={c.href} className="group flex flex-col rounded-xl border border-line p-5 transition hover:border-ink/20 hover:shadow-lift">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{c.label}</span>
          <span className="mt-2 font-semibold leading-snug">{c.title}</span>
          <span className="mt-1 line-clamp-3 text-sm leading-relaxed text-ink-muted">{c.body}</span>
          <span className="link-arrow mt-auto pt-4 text-sm">{c.cta} <Icon.arrow className="btn-arrow h-4 w-4" /></span>
        </Link>
      ))}
    </div>
  );
}
