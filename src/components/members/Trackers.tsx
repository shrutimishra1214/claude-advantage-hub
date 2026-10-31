"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ninetyDay, quickWins, troubleshooting } from "@/lib/toolkit/method";
import { Icon } from "../icons";
import { useProgress } from "./progress";

function Tick({ on, onClick, label, children }: { on: boolean; onClick: () => void; label: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} aria-label={label} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${on ? "border-accent bg-accent text-white" : "border-line-strong text-ink-muted hover:border-ink/40"}`}>
      {on ? <Icon.check className="h-4 w-4" strokeWidth={2.6} /> : children}
    </button>
  );
}

function downloadCsv() {
  const rows = [["Phase", "Week", "Practice", "What to do", "Anchored to", "Done"]];
  ninetyDay.forEach((p) => p.weeks.forEach((w) => rows.push([p.phase, String(w.w), w.title, w.body, "", ""])));
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "90-Day-Copilot-Plan.csv" });
  a.click();
  URL.revokeObjectURL(url);
}

/** In the public companion, links into the member area are hidden unless they point at a worksheet on the same page. */
const publicLink = (link: string) => (link.startsWith("/members/worksheets#") ? link.replace("/members/worksheets", "") : null);

export function NinetyDayPlan({ isPublic = false }: { isPublic?: boolean }) {
  const { weeks, toggleWeek } = useProgress();
  const total = ninetyDay.reduce((n, p) => n + p.weeks.length, 0);
  const current = Math.min(total, (weeks.length ? Math.max(...weeks) : 0) + 1);
  return (
    <div className="grid gap-10">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">Week {current} of {total} · {weeks.length} weeks done</p>
          <button type="button" onClick={downloadCsv} className="btn-secondary !px-3 !py-2 !text-sm"><Icon.download className="h-4 w-4" /> Download as spreadsheet</button>
        </div>
        <span className="mt-2 flex gap-1" aria-hidden>
          {Array.from({ length: total }).map((_, i) => <span key={i} className={`h-2 flex-1 rounded-full ${weeks.includes(i + 1) ? "bg-accent" : i + 1 === current ? "bg-accent/40" : "bg-line"}`} />)}
        </span>
      </div>
      {ninetyDay.map((p, pi) => (
        <section key={p.phase}>
          <h2 className="text-xl"><span className="text-accent">Phase {pi + 1}</span> · {p.phase} <span className="text-base font-normal text-ink-muted">({p.days})</span></h2>
          <ol className="mt-4 grid gap-3">
            {p.weeks.map((w) => {
              const on = weeks.includes(w.w);
              return (
                <li key={w.w} className={`flex gap-4 rounded-xl border p-5 ${w.w === current ? "border-accent ring-1 ring-accent" : "border-line"} ${on ? "bg-paper" : ""}`}>
                  <Tick on={on} onClick={() => toggleWeek(w.w)} label={`Mark week ${w.w} ${on ? "not done" : "done"}`}><span className="text-xs font-semibold">{w.w}</span></Tick>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Week {w.w}{w.w === current && <span className="ml-2 text-accent">· This week</span>}</p>
                    <h3 className="mt-0.5 text-lg">{w.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-soft">{w.body}</p>
                    {(isPublic ? publicLink(w.link) : w.link) && (
                      <Link href={(isPublic ? publicLink(w.link) : w.link)!} className="link-arrow mt-2 text-sm">Open the tool <Icon.arrow className="btn-arrow h-4 w-4" /></Link>
                    )}
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

export function QuickWins() {
  const { wins, toggleWin } = useProgress();
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {quickWins.map((q, i) => {
        const on = wins.includes(i);
        return (
          <li key={q.title} className={`flex gap-4 rounded-xl border p-5 ${on ? "border-line bg-paper" : "border-line"}`}>
            <Tick on={on} onClick={() => toggleWin(i)} label={`Mark quick win ${i + 1} ${on ? "not tried" : "tried"}`}><span className="text-xs font-semibold">{i + 1}</span></Tick>
            <div>
              <h3 className="font-semibold">{q.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{q.body}</p>
              <p className="mt-2 text-xs">
                {q.ch.map((c, j) => <span key={c}>{j > 0 && " · "}<Link href={`/members/book/${c}`} className="font-semibold text-accent hover:underline">Chapter {c}</Link></span>)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Troubleshooter() {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return troubleshooting
      .map((g) => ({ ...g, items: g.items.filter((it) => words.every((w) => `${it.snag} ${it.fix} ${g.area}`.toLowerCase().includes(w))) }))
      .filter((g) => g.items.length);
  }, [q]);
  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search problems</span>
        <Icon.search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input className="input !pl-11" placeholder="Describe the problem: missing button, recap, Excel, can't find file…" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      <div className="mt-8 grid gap-10">
        {groups.map((g) => (
          <section key={g.area}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">{g.area}</h2>
            <ul className="mt-3 grid gap-3">
              {g.items.map((it) => (
                <li key={it.snag} className="rounded-xl border border-line p-5">
                  <p className="font-semibold">{it.snag}</p>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{it.fix}</p>
                  {it.admin && <p className="mt-2 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">May need your IT admin</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
        {groups.length === 0 && <p className="rounded-xl border border-dashed border-line-strong p-8 text-center text-ink-muted">Nothing matches. The remaining causes are almost always licensing, permissions or a tenant policy: take the exact symptom to IT.</p>}
      </div>
    </div>
  );
}
