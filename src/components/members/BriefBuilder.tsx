"use client";

import { useState } from "react";
import { fiveParts, multipliers } from "@/lib/toolkit/method";
import { CopyButton } from "../product/CopyButton";

type Key = (typeof fiveParts)[number]["key"];

/** The book's five-part brief as a form: fill the parts, copy a labeled prompt. */
export function BriefBuilder() {
  const [v, setV] = useState<Record<Key, string>>({ role: "", context: "", task: "", format: "", constraints: "" });
  const [extra, setExtra] = useState<string[]>([]);
  const filled = fiveParts.filter((p) => v[p.key].trim());
  const prompt = [
    ...fiveParts.filter((p) => v[p.key].trim()).map((p) => `${p.label}: ${v[p.key].trim()}`),
    ...multipliers.filter((m) => extra.includes(m.name)).map((m) => m.append),
  ].join("\n");

  return (
    <div className="window">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[11px] text-ink-muted">Five-Part Brief</span></div>
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4 p-5 md:p-7">
          {fiveParts.map((p, i) => (
            <label key={p.key} className="grid gap-1.5">
              <span className="flex items-baseline gap-2 text-sm font-semibold">
                <span className="grid h-5 w-5 place-items-center rounded bg-ink text-[10px] text-white">{i + 1}</span>
                {p.label} <span className="font-normal text-ink-muted">· {p.q}</span>
              </span>
              <textarea
                rows={p.key === "context" ? 3 : 2}
                className="input resize-y !py-2.5 text-sm"
                placeholder={p.hint}
                value={v[p.key]}
                onChange={(e) => setV({ ...v, [p.key]: e.target.value })}
              />
            </label>
          ))}
          <fieldset>
            <legend className="text-sm font-semibold">Add a multiplier</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {multipliers.map((m) => (
                <button key={m.name} type="button" aria-pressed={extra.includes(m.name)} onClick={() => setExtra(extra.includes(m.name) ? extra.filter((x) => x !== m.name) : [...extra, m.name])} className="chip">
                  {m.name}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col border-t border-line bg-paper/70 p-5 md:p-7 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{filled.length} of 5 parts</p>
            {prompt && <CopyButton text={prompt} className="border border-line bg-white text-ink hover:border-ink/30" />}
          </div>
          <span className="mt-2 flex gap-1" aria-hidden>
            {fiveParts.map((p) => <span key={p.key} className={`h-1.5 flex-1 rounded-full ${v[p.key].trim() ? "bg-accent" : "bg-line"}`} />)}
          </span>
          <pre className="mt-4 min-h-[180px] flex-1 whitespace-pre-wrap rounded-lg bg-ink p-4 font-mono text-[13px] leading-relaxed text-white">
            {prompt || "Fill in the parts on the left. Labels like “Context:” stop Copilot blending your background into your instructions."}
          </pre>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">Most strong prompts run 60–150 words. Dense beats long.</p>
        </div>
      </div>
    </div>
  );
}
