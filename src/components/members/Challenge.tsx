"use client";

import Link from "next/link";
import { days as copilotDays, weekTitles as copilotWeekTitles, type Day } from "@/lib/toolkit/learning";
import { Icon } from "../icons";
import { PromptBlockClient } from "./PromptBlockClient";
import { useProgress } from "./progress";

/** The 30-day path. Defaults to the Copilot plan; other lines pass their own days. */
export function Challenge({ days = copilotDays, weekTitles = copilotWeekTitles }: { days?: Day[]; weekTitles?: Record<1 | 2 | 3 | 4, string> }) {
  const p = useProgress();
  const weeks = [1, 2, 3, 4] as const;

  return (
    <div className="grid gap-10">
      <div>
        <p className="text-sm font-semibold">{p.days.length} of 30 days done</p>
        <ol className="mt-3 grid grid-cols-10 gap-1.5" aria-label="Progress by day">
          {days.map((d) => (
            <li key={d.day}>
              <a href={`#day-${d.day}`} className={`grid aspect-square place-items-center rounded-md text-xs font-semibold transition ${p.days.includes(d.day) ? "bg-accent text-white" : d.day === p.currentDay ? "border-2 border-accent text-accent" : "border border-line text-ink-muted hover:border-ink/30"}`} aria-label={`Day ${d.day}${p.days.includes(d.day) ? ", done" : ""}`}>
                {d.day}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {weeks.map((w) => (
        <section key={w}>
          <h2 className="text-xl"><span className="text-accent">Week {w}</span> · {weekTitles[w]}</h2>
          <ol className="mt-4 grid gap-3">
            {days.filter((d) => d.week === w).map((d) => {
              const done = p.days.includes(d.day);
              const today = d.day === p.currentDay;
              return (
                <li key={d.day} id={`day-${d.day}`} className={`scroll-mt-32 rounded-xl border p-5 ${today ? "border-accent ring-1 ring-accent" : "border-line"} ${done ? "bg-paper" : ""}`}>
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={() => p.toggleDay(d.day)}
                      aria-pressed={done}
                      aria-label={`Mark day ${d.day} ${done ? "not done" : "done"}`}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${done ? "border-accent bg-accent text-white" : "border-line-strong text-ink-muted hover:border-ink/40"}`}
                    >
                      {done ? <Icon.check className="h-4 w-4" strokeWidth={2.6} /> : <span className="text-xs font-semibold">{d.day}</span>}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Day {d.day}{today && <span className="ml-2 text-accent">· Today</span>}</p>
                      <h3 className="mt-0.5 text-lg">{d.title}</h3>
                      <p className="mt-1 leading-relaxed text-ink-soft">{d.task}</p>
                      {d.prompt && <div className="mt-3"><PromptBlockClient text={d.prompt} /></div>}
                      {d.link && <Link href={d.link} className="link-arrow mt-3 text-sm">Open what you need <Icon.arrow className="btn-arrow h-4 w-4" /></Link>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
