"use client";

import { useState } from "react";
import { levelStyle, type Part } from "@/lib/curriculum";
import { Icon } from "./icons";

export function Curriculum({ parts }: { parts: Part[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([1]));
  const allOpen = open.size === parts.length;

  const toggle = (n: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button type="button" className="btn-ghost !py-2" onClick={() => setOpen(allOpen ? new Set() : new Set(parts.map((p) => p.n)))}>
          {allOpen ? "Collapse all" : "Expand all 17 parts"}
        </button>
      </div>
      <ol className="grid gap-3">
        {parts.map((part) => {
          const isOpen = open.has(part.n);
          return (
            <li key={part.n} className={`card overflow-hidden transition-shadow ${isOpen ? "shadow-lift" : ""}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`part-${part.n}`}
                  onClick={() => toggle(part.n)}
                  className="flex w-full items-center gap-4 p-5 text-left md:gap-6 md:p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paper-tint font-display text-sm font-bold text-brand-violet">
                    {String(part.n).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold leading-snug">{part.title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">
                      {part.chapters.length} {part.chapters.length === 1 ? "chapter" : "chapters"} · {part.summary}
                    </span>
                  </span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 transition ${isOpen ? "rotate-45" : ""}`}>
                    <Icon.x className="h-4 w-4 rotate-45" />
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div id={`part-${part.n}`} className="grid gap-6 border-t border-ink/[0.07] bg-paper/60 p-5 md:grid-cols-[1fr_1.5fr] md:p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">You&apos;ll be able to</p>
                    <ul className="mt-3 grid gap-2">
                      {part.outcomes.map((o) => (
                        <li key={o} className="flex gap-2.5 text-[15px] leading-snug">
                          <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" /> {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="grid gap-2">
                    {part.chapters.map((c) => (
                      <li key={c.n} className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-white p-4 ring-1 ring-ink/[0.06]">
                        <span className="font-display text-sm font-bold text-ink-muted">Ch {c.n}</span>
                        <span className="min-w-0 flex-1 basis-48 font-semibold leading-snug">{c.title}</span>
                        <span className="flex flex-wrap items-center gap-2 text-xs">
                          <span className={`rounded-full px-2.5 py-1 font-semibold ring-1 ring-inset ${levelStyle[c.level]}`}>{c.level}</span>
                          <span className="rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft">{c.read}</span>
                          <span className="rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft">{c.apps}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
