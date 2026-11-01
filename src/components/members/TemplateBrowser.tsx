"use client";

import { useState } from "react";
import { appColor, type App } from "@/lib/system";
import type { Template } from "@/lib/toolkit/templates";
import { CopyButton } from "../product/CopyButton";
import { PromptBlockClient } from "./PromptBlockClient";

export function TemplateBrowser({ templates }: { templates: Template[] }) {
  const apps = Array.from(new Set(templates.map((t) => t.app))) as App[];
  const [app, setApp] = useState<App>(apps[0]);
  const shown = templates.filter((t) => t.app === app);

  return (
    <div>
      <div role="tablist" aria-label="Templates by app" className="flex flex-wrap gap-2">
        {apps.map((a) => (
          <button key={a} type="button" role="tab" aria-selected={a === app} onClick={() => setApp(a)} className="chip gap-2">
            <span className={`h-2 w-2 rounded-full ${appColor[a]}`} aria-hidden /> {a}
            <span className="text-ink-muted">{templates.filter((t) => t.app === a).length}</span>
          </button>
        ))}
      </div>
      <ul key={app} role="tabpanel" className="fade-swap mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((t) => {
          const outline = `${t.title}\n\n${t.outline.map((o) => `• ${o}`).join("\n")}`;
          return (
            <li key={t.id} className="flex flex-col rounded-xl border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg">{t.title}</h3>
                  <p className="mt-0.5 text-sm text-ink-muted">{t.purpose}</p>
                </div>
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${appColor[t.app]}`} aria-hidden />
              </div>
              <div className="mt-4 rounded-lg border border-line bg-paper p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Structure</span>
                  <CopyButton text={outline} className="border border-line bg-white text-ink hover:border-ink/30" />
                </div>
                <ol className="mt-2 grid gap-1 text-sm">
                  {t.outline.map((o, i) => <li key={o} className="flex gap-2"><span className="w-4 font-mono text-xs leading-5 text-ink-muted">{i + 1}</span>{o}</li>)}
                </ol>
              </div>
              <div className="mt-3"><PromptBlockClient text={t.prompt} /></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
