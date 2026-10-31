"use client";

import { useState } from "react";
import { savingsAreas } from "@/lib/system";

const WEEKS_PER_YEAR = 46;

/** Hours spent per area in, a conservative estimate of hours recovered out. */
export function SavingsCalculator() {
  const [hours, setHours] = useState<Record<string, number>>(Object.fromEntries(savingsAreas.map((a) => [a.id, a.hours])));
  const weekly = savingsAreas.reduce((sum, a) => sum + hours[a.id] * a.rate, 0);
  const spent = savingsAreas.reduce((sum, a) => sum + hours[a.id], 0);
  const fmt = (n: number) => (Math.round(n * 2) / 2).toLocaleString("en-US", { maximumFractionDigits: 1 });

  return (
    <div className="window">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[11px] text-ink-muted">Time-Savings Calculator</span></div>
      <div className="grid md:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-5 p-5 md:p-7">
          <p className="text-sm font-semibold">Hours you spend each week on…</p>
          {savingsAreas.map((a) => (
            <label key={a.id} className="grid gap-2">
              <span className="flex items-center justify-between text-sm">
                <span className="font-medium">{a.label}</span>
                <span className="tabular-nums text-ink-muted"><b className="text-ink">{hours[a.id]}</b> hrs</span>
              </span>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={hours[a.id]}
                onChange={(e) => setHours({ ...hours, [a.id]: Number(e.target.value) })}
                className="w-full accent-accent"
                aria-label={`${a.label}, hours per week`}
              />
            </label>
          ))}
        </div>
        <div className="flex flex-col justify-center border-t border-line bg-ink p-6 text-white md:border-l md:border-t-0 md:p-8">
          <p className="text-sm text-white/70">Potential time recovered</p>
          <p className="mt-2 font-display text-6xl font-semibold tabular-nums tracking-tight" aria-live="polite">
            {fmt(weekly)}<span className="ml-2 text-2xl font-medium text-white/70">hrs / week</span>
          </p>
          <p className="mt-3 text-white/80">About <b className="text-white">{fmt(weekly * WEEKS_PER_YEAR)} hours</b> a year, from the {spent} hours a week you spend on this work.</p>
          <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/60">
            An estimate, not a guarantee. It assumes Copilot workflows reduce time spent by 20–30% depending on the task. Your results depend on your work, your
            Copilot access and how you use it.
          </p>
        </div>
      </div>
    </div>
  );
}
