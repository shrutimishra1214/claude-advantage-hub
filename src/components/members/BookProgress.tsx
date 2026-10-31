"use client";

import Link from "next/link";
import type { Chapter } from "@/lib/toolkit/book";
import { Icon } from "../icons";
import { useProgress } from "./progress";

export function BookMeter({ total }: { total: number }) {
  const { chapters } = useProgress();
  const pct = Math.round((chapters.length / total) * 100);
  return (
    <div className="w-full max-w-xs">
      <p className="flex justify-between text-sm"><span className="font-semibold">{chapters.length} of {total} chapters done</span><span className="text-ink-muted">{pct}%</span></p>
      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-paper-tint"><span className="block h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} /></span>
    </div>
  );
}

export function ChapterRow({ c }: { c: Chapter }) {
  const { chapters } = useProgress();
  const done = chapters.includes(c.n);
  return (
    <Link href={`/members/book/${c.n}`} className="group flex items-start gap-4 rounded-xl border border-line p-4 transition hover:border-ink/20 hover:shadow-lift">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm ${done ? "bg-accent text-white" : "border border-line-strong text-ink-muted"}`}>
        {done ? <Icon.check className="h-4 w-4" strokeWidth={2.6} /> : c.n}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-snug">{c.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{c.keyIdea}</span>
        <span className="mt-2 block text-xs text-ink-muted">{c.read} · {c.level}{c.apps && c.apps !== "All" ? ` · ${c.apps}` : ""}</span>
      </span>
    </Link>
  );
}

export function ChapterDone({ n }: { n: number }) {
  const { chapters, toggleChapter } = useProgress();
  const done = chapters.includes(n);
  return (
    <button type="button" onClick={() => toggleChapter(n)} aria-pressed={done} className={done ? "btn-primary !px-4 !py-2.5 !text-sm" : "btn-secondary !px-4 !py-2.5 !text-sm"}>
      <Icon.check className="h-4 w-4" /> {done ? "Chapter done" : "Mark chapter done"}
    </button>
  );
}

export function YourTurn({ n, steps }: { n: number; steps: Chapter["yourTurn"] }) {
  const { turns, toggleTurn } = useProgress();
  return (
    <ol className="grid gap-3">
      {steps.map((s, i) => {
        const key = `${n}-${i}`;
        const done = turns.includes(key);
        return (
          <li key={key} className={`flex gap-4 rounded-xl border p-5 ${done ? "border-line bg-paper" : "border-line bg-white"}`}>
            <button
              type="button"
              onClick={() => toggleTurn(key)}
              aria-pressed={done}
              aria-label={`Mark exercise ${i + 1} ${done ? "not done" : "done"}`}
              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${done ? "border-accent bg-accent text-white" : "border-line-strong text-ink-muted hover:border-ink/40"}`}
            >
              {done ? <Icon.check className="h-3.5 w-3.5" strokeWidth={2.6} /> : <span className="text-xs font-semibold">{i + 1}</span>}
            </button>
            <div className="min-w-0">
              <p className={`font-medium leading-relaxed ${done ? "text-ink-muted" : ""}`}>{s.task}</p>
              {s.good && (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-app-excel">What good looks like: </span>{s.good}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
