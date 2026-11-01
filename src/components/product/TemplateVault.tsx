"use client";

import { useState } from "react";
import { appColor, templates } from "@/lib/system";
import { AppChip } from "./AppChip";

type Kind = (typeof templates)[number]["kind"];

/** A small, realistic page preview for each kind of template. */
function Preview({ kind, title, color }: { kind: Kind; title: string; color: string }) {
  if (kind === "sheet")
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-line bg-white">
        <div className={`h-1.5 ${color}`} />
        <p className="px-2.5 pt-2 text-[9px] font-bold">{title}</p>
        <div className="m-2.5 grid grid-cols-4 overflow-hidden rounded-sm border border-line text-[7px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={`h-3 border-b border-r border-line ${i < 4 ? "bg-paper-tint" : ""}`}>
              {i >= 4 && i % 4 === 3 && <span className={`m-0.5 block h-1.5 rounded-sm ${color} opacity-60`} style={{ width: `${30 + ((i * 17) % 60)}%` }} />}
            </span>
          ))}
        </div>
      </div>
    );
  if (kind === "slide")
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md border border-line bg-paper p-2">
        <div className="aspect-video w-full rounded-sm bg-white p-2 shadow-soft">
          <p className="text-[9px] font-bold leading-tight">{title}</p>
          <div className="mt-1.5 grid grid-cols-[1fr_40%] gap-1.5">
            <span className="grid gap-1"><span className="skel w-full" /><span className="skel w-4/5" /><span className="skel w-3/5" /></span>
            <span className="flex items-end gap-0.5">
              {[40, 65, 50, 85].map((h) => <span key={h} className={`flex-1 rounded-t-sm ${color} opacity-70`} style={{ height: `${h * 0.3}px` }} />)}
            </span>
          </div>
        </div>
      </div>
    );
  if (kind === "mail")
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-line bg-white p-2.5 text-[8px] text-ink-muted">
        <p className="border-b border-line pb-1"><b className="text-ink">To</b> team@company.com</p>
        <p className="border-b border-line py-1"><b className="text-ink">Subject</b> {title}</p>
        <span className="mt-2 grid gap-1"><span className="skel w-1/3" /><span className="skel w-full" /><span className="skel w-11/12" /><span className="skel w-4/5" /><span className="skel w-1/4" /></span>
      </div>
    );
  if (kind === "board")
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-line bg-white p-2.5">
        <p className="text-[9px] font-bold">{title}</p>
        <ul className="mt-2 grid gap-1.5">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-sm border ${i === 1 ? `${color} border-transparent` : "border-line-strong"}`} />
              <span className="skel flex-1" />
              <span className="h-2 w-5 rounded-full bg-paper-tint" />
            </li>
          ))}
        </ul>
      </div>
    );
  return (
    <div className="flex aspect-[4/3] w-full justify-center overflow-hidden rounded-md border border-line bg-paper pt-2.5">
      <div className="w-[68%] rounded-t-sm bg-white p-2.5 shadow-soft">
        <span className={`block h-1 w-6 rounded-full ${color}`} />
        <p className="mt-1.5 text-[8.5px] font-bold leading-tight">{title}</p>
        <span className="mt-2 grid gap-1"><span className="skel w-full" /><span className="skel w-11/12" /><span className="skel w-4/5" /></span>
        <span className="mt-2 block h-1 w-1/2 rounded-full bg-ink/25" />
        <span className="mt-1.5 grid gap-1"><span className="skel w-full" /><span className="skel w-3/4" /></span>
      </div>
    </div>
  );
}

export function TemplateVault() {
  const [app, setApp] = useState(templates[0].app);
  const group = templates.find((t) => t.app === app)!;

  return (
    <div>
      <div role="tablist" aria-label="Templates by app" className="flex flex-wrap justify-center gap-2">
        {templates.map((t) => (
          <button key={t.app} type="button" role="tab" aria-selected={t.app === app} onClick={() => setApp(t.app)} className="chip gap-2">
            <span className={`h-2 w-2 rounded-full ${appColor[t.app]}`} aria-hidden />
            {t.app} <span className="text-ink-muted">{t.items.length}</span>
          </button>
        ))}
      </div>
      <ul key={app} role="tabpanel" className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {group.items.map((title, i) => (
          <li key={title} className="fade-swap card p-3 transition hover:-translate-y-0.5 hover:shadow-lift" style={{ animationDelay: `${i * 40}ms` }}>
            <Preview kind={group.kind} title={title} color={appColor[app]} />
            <div className="mt-3 flex items-center justify-between gap-2 px-0.5">
              <p className="min-w-0 truncate text-sm font-semibold">{title}</p>
              <AppChip app={app} size="xs" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
