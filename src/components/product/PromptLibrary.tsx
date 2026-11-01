"use client";

import { useState } from "react";
import { recipes } from "@/lib/system";
import { AppChip } from "./AppChip";
import { CopyButton } from "./CopyButton";

/** A working sample of the Prompt Recipe Library: pick a recipe, see every part of it. */
export function PromptLibrary() {
  const [id, setId] = useState(recipes[0].id);
  const r = recipes.find((x) => x.id === id)!;

  const fields = [
    ["Goal", r.goal],
    ["When to use it", r.when],
    ["What to provide Copilot", r.provide],
  ];
  const after = [
    ["Expected output", r.expected],
    ["Follow-up prompt", r.followUp],
    ["Advanced version", r.advanced],
    ["Example", r.example],
  ];

  return (
    <div className="window">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[11px] text-ink-muted">Prompt Recipe Library</span></div>
      <div className="grid md:grid-cols-[230px_1fr]">
        <div role="tablist" aria-label="Sample recipes" className="flex gap-2 overflow-x-auto border-b border-line bg-paper/60 p-3 md:flex-col md:gap-1 md:border-b-0 md:border-r">
          {recipes.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={x.id === id}
              onClick={() => setId(x.id)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-left transition md:w-full ${x.id === id ? "bg-white shadow-soft ring-1 ring-line" : "hover:bg-white/70"}`}
            >
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent">{x.category}</span>
              <span className="block whitespace-nowrap text-sm font-medium md:whitespace-normal">{x.title}</span>
            </button>
          ))}
        </div>

        <article key={r.id} role="tabpanel" className="fade-swap min-w-0 p-5 md:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{r.category}</span>
            <AppChip app={r.app} />
          </div>
          <h3 className="mt-3 text-xl md:text-2xl">{r.title}</h3>

          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            {fields.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{k}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-lg bg-ink p-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">The prompt</span>
              <CopyButton text={r.prompt} className="text-white/80 hover:bg-white/10 hover:text-white" />
            </div>
            <p className="mt-2 font-mono text-[13px] leading-relaxed">{r.prompt}</p>
          </div>

          <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {after.map(([k, v]) => (
              <div key={k} className="border-t border-line pt-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{k}</dt>
                <dd className="mt-1 text-sm leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </div>
  );
}
