"use client";

import { useState } from "react";
import { ladder, rungs } from "@/lib/toolkit/method";
import { Icon } from "../icons";
import { CopyButton } from "../product/CopyButton";
import { useStored } from "./useStored";

const num = (s: string) => Math.max(0, Number(s) || 0);
const fmt = (n: number, d = 1) => n.toLocaleString("en-US", { maximumFractionDigits: d });

// ── Time Audit (Chapter 1) ──
type AuditRow = { task: string; perWeek: string; minutes: string; target: boolean; done: string };
const blankRow: AuditRow = { task: "", perWeek: "", minutes: "", target: false, done: "" };

export function TimeAudit() {
  const [rows, setRows] = useStored<AuditRow[]>("kv-ws-audit", [
    { ...blankRow, task: "Weekly status report", perWeek: "1", minutes: "60" },
    { ...blankRow, task: "Inbox triage", perWeek: "5", minutes: "40" },
    { ...blankRow, task: "Meeting recaps and follow-ups", perWeek: "6", minutes: "20" },
    { ...blankRow },
  ]);
  const set = (i: number, patch: Partial<AuditRow>) => setRows(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const hours = (r: AuditRow) => (num(r.perWeek) * num(r.minutes)) / 60;
  const total = rows.reduce((s, r) => s + hours(r), 0);
  const targets = rows.filter((r) => r.target);
  const targetHours = targets.reduce((s, r) => s + hours(r), 0);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink-muted">
              <th className="py-2 pr-3 font-semibold">Recurring task (30+ min)</th>
              <th className="w-24 py-2 pr-3 font-semibold">Times / week</th>
              <th className="w-24 py-2 pr-3 font-semibold">Minutes each</th>
              <th className="w-20 py-2 pr-3 font-semibold">Hrs / wk</th>
              <th className="w-20 py-2 font-semibold">Top 3</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line">
                <td className="py-2 pr-3"><input aria-label="Task" className="input !py-2 text-sm" value={r.task} onChange={(e) => set(i, { task: e.target.value })} placeholder="e.g. Monthly board pack" /></td>
                <td className="py-2 pr-3"><input aria-label="Times per week" inputMode="decimal" className="input !py-2 text-sm" value={r.perWeek} onChange={(e) => set(i, { perWeek: e.target.value })} /></td>
                <td className="py-2 pr-3"><input aria-label="Minutes each" inputMode="decimal" className="input !py-2 text-sm" value={r.minutes} onChange={(e) => set(i, { minutes: e.target.value })} /></td>
                <td className="py-2 pr-3 font-semibold tabular-nums">{fmt(hours(r))}</td>
                <td className="py-2">
                  <input type="checkbox" aria-label="Target task" checked={r.target} disabled={!r.target && targets.length >= 3} onChange={(e) => set(i, { target: e.target.checked })} className="h-4 w-4 accent-accent" />
                </td>
                <td><button type="button" aria-label="Remove row" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="rounded p-1 text-ink-muted hover:bg-paper hover:text-ink"><Icon.x className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={() => setRows([...rows, { ...blankRow }])} className="btn-ghost mt-2">+ Add task</button>

      {targets.length > 0 && (
        <div className="mt-4 grid gap-3">
          <p className="text-sm font-semibold">For each target: what does a finished version look like?</p>
          {rows.map((r, i) => r.target && (
            <label key={i} className="grid gap-1 text-sm">
              <span className="text-ink-muted">{r.task || "Untitled task"}</span>
              <input className="input !py-2 text-sm" placeholder="e.g. A one-page summary with decisions and owners" value={r.done} onChange={(e) => set(i, { done: e.target.value })} />
            </label>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-paper p-5"><p className="text-sm text-ink-muted">Recurring work, per week</p><p className="mt-1 text-3xl font-semibold tabular-nums">{fmt(total)} hrs</p></div>
        <div className="rounded-xl bg-ink p-5 text-white">
          <p className="text-sm text-white/70">Your opportunity (top {targets.length || 3} tasks)</p>
          {targets.length ? <p className="mt-1 text-3xl font-semibold tabular-nums">{fmt(targetHours)} hrs / week</p> : <p className="mt-2 text-white/80">Tick your three most repetitive tasks in the Top 3 column.</p>}
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-muted">This is your baseline. Re-check it after a month on the method, and again at the end of the 90-Day Plan.</p>
    </div>
  );
}

// ── Business Case (Chapter 5) ──
export function BusinessCase() {
  const [v, setV] = useStored("kv-ws-case", { minutesPerWeek: "90", rate: "60", license: "30", people: "1" });
  const minutes = num(v.minutesPerWeek);
  const rate = num(v.rate);
  const license = num(v.license);
  const people = Math.max(1, num(v.people));
  const valuePerMonth = ((minutes * 4.33) / 60) * rate * people;
  const costPerMonth = license * people;
  const breakEven = rate > 0 ? Math.ceil((license / rate) * 60) : 0;
  const multiple = costPerMonth > 0 ? valuePerMonth / costPerMonth : 0;
  const summary = `Business case: Microsoft 365 Copilot for ${people} ${people === 1 ? "person" : "people"}
Time saved: ${minutes} minutes per person per week (from our time audit)
Value of that time: ${fmt(valuePerMonth, 0)} per month at ${rate} per hour
License cost: ${fmt(costPerMonth, 0)} per month
It pays for itself at ${breakEven} minutes saved per person per month. The audit shows about ${fmt(minutes * 4.33, 0)}.
Return: about ${fmt(multiple)}x the license cost.`;

  const field = (key: keyof typeof v, label: string, suffix: string) => (
    <label className="grid gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      <span className="relative">
        <input inputMode="decimal" className="input !py-2.5 !pr-24" value={v[key]} onChange={(e) => setV({ ...v, [key]: e.target.value })} />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted">{suffix}</span>
      </span>
    </label>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="grid content-start gap-4">
        {field("minutesPerWeek", "Time saved per person", "min / week")}
        {field("rate", "Loaded hourly cost of that time", "per hour")}
        {field("license", "License price per person", "per month")}
        {field("people", "Number of people", "people")}
        <p className="text-xs leading-relaxed text-ink-muted">Use the hours from your Time Audit. License prices change: check Microsoft&apos;s current price for your plan.</p>
      </div>
      <div className="flex flex-col rounded-xl bg-ink p-6 text-white">
        <p className="text-sm text-white/70">Your break-even sentence</p>
        <p className="mt-2 font-display text-2xl font-semibold leading-snug">“It pays for itself at {breakEven} minutes a month.”</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-sm">
          <div><dt className="text-white/60">Value / month</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{fmt(valuePerMonth, 0)}</dd></div>
          <div><dt className="text-white/60">Cost / month</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{fmt(costPerMonth, 0)}</dd></div>
          <div><dt className="text-white/60">Return</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{fmt(multiple)}x</dd></div>
        </dl>
        <div className="mt-auto flex justify-end pt-6"><CopyButton text={summary} className="bg-white/10 text-white hover:bg-white/20" /></div>
      </div>
    </div>
  );
}

// ── Verification checklist (Chapter 34) ──
export function VerificationChecklist() {
  const [rung, setRung] = useState(3);
  const [checked, setChecked] = useState<string[]>([]);
  const r = rungs[rung - 1];
  const checks = rung === 4 ? [...rungs[2].checks, ...r.checks.slice(1)] : r.checks;
  const done = checks.every((c) => checked.includes(c));
  return (
    <div>
      <p className="text-sm font-semibold">Where is this output going?</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-4" role="radiogroup">
        {rungs.map((x) => (
          <button key={x.n} type="button" role="radio" aria-checked={rung === x.n} onClick={() => { setRung(x.n); setChecked([]); }} className={`rounded-lg border p-3 text-left text-sm transition ${rung === x.n ? "border-accent bg-accent-soft ring-1 ring-accent" : "border-line hover:border-ink/30"}`}>
            <span className="block text-xs font-bold uppercase tracking-wider text-accent">Rung {x.n}</span>
            <span className="block font-semibold">{x.name}</span>
            <span className="block text-xs text-ink-muted">{x.examples}</span>
          </button>
        ))}
      </div>
      <ul className="mt-5 grid gap-2">
        {checks.map((c) => (
          <li key={c}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-3">
              <input type="checkbox" className="h-4 w-4 accent-accent" checked={checked.includes(c)} onChange={() => setChecked(checked.includes(c) ? checked.filter((x) => x !== c) : [...checked, c])} />
              <span className={checked.includes(c) ? "text-ink-muted line-through" : ""}>{c}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className={`mt-4 rounded-lg px-4 py-3 text-sm font-semibold ${done ? "bg-app-excel/10 text-app-excel" : "bg-paper text-ink-muted"}`} aria-live="polite">
        {done ? "Cleared for this rung. Ship it." : `${checks.length - checks.filter((c) => checked.includes(c)).length} checks left before this can go out.`}
      </p>
    </div>
  );
}

// ── Meeting-to-Action checklist (Chapters 17 and 18) ──
const meetingSteps = [
  { phase: "Before", items: ["Decide: attend, delegate or decline", "Run the pre-meeting brief (who, what's open, last commitments)", "Decide your position: the one thing Copilot can't do for you", "Make sure transcription will be on"] },
  { phase: "During", items: ["Start transcription", "Mark decisions aloud: “The decision is…”", "Spend attention on the room; let the transcript scribe"] },
  { phase: "After (the warm fifteen)", items: ["Generate the recap", "Warm-pass: correct misattributed actions and missing decisions", "Every action has an owner and a date", "Follow-up sent within the hour", "Actions added to your tracker"] },
];

export function MeetingChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (k: string) => setChecked(checked.includes(k) ? checked.filter((x) => x !== k) : [...checked, k]);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {meetingSteps.map((p) => (
          <div key={p.phase} className="rounded-xl border border-line p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{p.phase}</p>
            <ul className="mt-3 grid gap-2">
              {p.items.map((it) => (
                <li key={it}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-accent" checked={checked.includes(it)} onChange={() => toggle(it)} />
                    <span className={checked.includes(it) ? "text-ink-muted line-through" : ""}>{it}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setChecked([])} className="btn-ghost mt-3">Reset for the next meeting</button>
    </div>
  );
}

// ── Failure log (Chapter 9) ──
type Failure = { date: string; what: string; layer: string };

export function FailureLog() {
  const [log, setLog] = useStored<Failure[]>("kv-ws-failures", []);
  const [what, setWhat] = useState("");
  const [layer, setLayer] = useState(ladder[0].name);
  const counts = ladder.map((l) => ({ name: l.name, n: log.filter((f) => f.layer === l.name).length }));
  return (
    <div>
      <form
        className="grid gap-3 sm:grid-cols-[1fr_200px_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!what.trim()) return;
          setLog([{ date: new Date().toISOString().slice(0, 10), what: what.trim(), layer }, ...log]);
          setWhat("");
        }}
      >
        <input className="input !py-2.5 text-sm" placeholder="What went wrong? e.g. invented a deadline in the client email" value={what} onChange={(e) => setWhat(e.target.value)} aria-label="What went wrong" />
        <select className="input !py-2.5 text-sm" value={layer} onChange={(e) => setLayer(e.target.value)} aria-label="Failure layer">
          {ladder.map((l) => <option key={l.n}>{l.name}</option>)}
        </select>
        <button className="btn-primary !py-2.5 !text-sm">Log it</button>
      </form>
      {log.length > 0 && (
        <>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
            {counts.map((c) => <span key={c.name}>{c.name}: <b className="text-ink">{c.n}</b></span>)}
          </p>
          <ul className="mt-3 grid gap-2">
            {log.slice(0, 20).map((f, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-line p-3 text-sm">
                <span className="shrink-0 font-mono text-xs text-ink-muted">{f.date}</span>
                <span className="flex-1">{f.what}</span>
                <span className="shrink-0 rounded bg-paper px-2 py-0.5 text-xs font-semibold">{f.layer}</span>
                <button type="button" aria-label="Delete entry" onClick={() => setLog(log.filter((_, j) => j !== i))} className="text-ink-muted hover:text-ink"><Icon.x className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-muted">Review it after two weeks: the pattern in your misses tells you which habit to fix at the source.</p>
        </>
      )}
    </div>
  );
}
