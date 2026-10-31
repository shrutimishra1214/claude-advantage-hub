"use client";

import type { Workflow } from "@/lib/toolkit/workflows";
import { Icon } from "../icons";
import { AppTile } from "../product/AppChip";
import { PromptBlockClient } from "./PromptBlockClient";
import { useProgress } from "./progress";

/** A workflow's steps as a checklist that remembers where you got to. */
export function WorkflowSteps({ wf }: { wf: Workflow }) {
  const { steps, toggleStep } = useProgress();
  const done = steps[wf.id] ?? [];

  return (
    <>
      <p className="text-sm text-ink-muted" aria-live="polite">{done.length} of {wf.steps.length} steps done</p>
      <ol className="relative mt-4 grid gap-4">
        <span aria-hidden className="absolute bottom-8 left-5 top-8 w-px bg-line-strong" />
        {wf.steps.map((s, i) => {
          const checked = done.includes(i);
          return (
            <li key={i} className="relative flex gap-4">
              <AppTile app={s.app} className="relative h-10 w-10 text-sm ring-4 ring-white" />
              <div className={`min-w-0 flex-1 rounded-xl border p-5 transition ${checked ? "border-line bg-paper" : "border-line"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Step {i + 1} · {s.app}</p>
                    <h3 className={`mt-1 text-lg ${checked ? "text-ink-muted line-through decoration-ink-muted/40" : ""}`}>{s.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStep(wf.id, i)}
                    aria-pressed={checked}
                    aria-label={`Mark step ${i + 1} ${checked ? "not done" : "done"}`}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${checked ? "border-app-excel bg-app-excel text-white" : "border-line-strong text-transparent hover:border-ink/40 hover:text-ink-muted"}`}
                  >
                    <Icon.check className="h-4 w-4" strokeWidth={2.6} />
                  </button>
                </div>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.instruction}</p>
                {s.prompt && <div className="mt-4"><PromptBlockClient text={s.prompt} /></div>}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
