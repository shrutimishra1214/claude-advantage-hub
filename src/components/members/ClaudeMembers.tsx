"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SimplePrompt } from "@/lib/claude/advantage";
import { Icon } from "../icons";
import { CopyButton } from "../product/CopyButton";
import { useMemberLine } from "./MemberLine";
import { useMyPrompts } from "./myPrompts";
import { useProgress } from "./progress";
import { SaveStatus } from "./SaveStatus";

// Client pieces of the Claude member area.

/** A done/not-done circle bound to a progress key. */
export function Tick({ id, label, children }: { id: string; label: string; children?: React.ReactNode }) {
  const { turns, toggleTurn } = useProgress();
  const on = turns.includes(id);
  return (
    <button type="button" onClick={() => toggleTurn(id)} aria-pressed={on} aria-label={label} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${on ? "border-accent bg-accent text-white" : "border-line-strong text-ink-muted hover:border-ink/40"}`}>
      {on ? <Icon.check className="h-4 w-4" strokeWidth={2.6} /> : children}
    </button>
  );
}

/** A checklist whose items remember being done. */
export function Checklist({ prefix, items }: { prefix: string; items: { text: string; note?: string; id?: string; num?: number }[] }) {
  const { turns } = useProgress();
  return (
    <ol className="grid gap-3">
      {items.map((it, i) => {
        const id = it.id ?? `${prefix}-${i}`;
        const done = turns.includes(id);
        return (
          <li key={id} className={`flex gap-4 rounded-xl border border-line p-4 ${done ? "bg-paper" : "bg-white"}`}>
            <Tick id={id} label={`Mark item ${it.num ?? i + 1} ${done ? "not done" : "done"}`}><span className="text-xs font-semibold">{it.num ?? i + 1}</span></Tick>
            <div className="min-w-0">
              <p className={`leading-relaxed ${done ? "text-ink-muted" : "font-medium"}`}>{it.text}</p>
              {it.note && <p className="mt-1 text-sm text-ink-muted">{it.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** How many of a set of progress keys are done. */
export function DoneCount({ ids, label }: { ids: string[]; label: string }) {
  const { turns, ready } = useProgress();
  const n = ids.filter((id) => turns.includes(id)).length;
  const pct = Math.round((n / Math.max(1, ids.length)) * 100);
  return (
    <div className="w-full max-w-xs">
      <p className="flex justify-between text-sm"><span className="font-semibold">{n} of {ids.length} {label}</span><span className="text-ink-muted">{pct}%</span></p>
      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-paper-tint"><span className="block h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${ready ? pct : 0}%` }} /></span>
    </div>
  );
}

/** Copy a skill, or download it as SKILL.md ready to upload. */
export function SkillActions({ name, text }: { name: string; text: string }) {
  return (
    <span className="flex items-center gap-1">
      <CopyButton text={text} className="text-white/80 hover:bg-white/10 hover:text-white" />
      <button
        type="button"
        onClick={() => {
          const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
          const a = Object.assign(document.createElement("a"), { href: url, download: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-SKILL.md` });
          a.click();
          URL.revokeObjectURL(url);
        }}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
      >
        <Icon.download className="h-3.5 w-3.5" /> SKILL.md
      </button>
    </span>
  );
}

/** The Claude Prompt Library: the book's prompts plus the member's own. */
export function ClaudePromptBrowser({ prompts, categories }: { prompts: SimplePrompt[]; categories: string[] }) {
  const { base } = useMemberLine();
  const { doc } = useMyPrompts();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const words = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);
  const matches = (t: string) => words.every((w) => t.toLowerCase().includes(w));

  const shown = prompts.filter((p) => {
    if (cat === "My prompts" && !doc.edits[p.id]) return false;
    if (!["All", "My prompts"].includes(cat) && p.category !== cat) return false;
    return matches(`${p.title} ${p.prompt} ${p.category} ${doc.edits[p.id]?.prompt ?? ""}`);
  });
  const own = doc.custom.filter((c) => (cat === "All" || cat === "My prompts" || c.category === cat) && matches(`${c.title} ${c.prompt} ${c.notes}`));
  const mineCount = doc.custom.length + Object.keys(doc.edits).length;
  const total = shown.length + own.length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block flex-1">
          <span className="sr-only">Search prompts</span>
          <Icon.search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input className="input !pl-11" placeholder="Search: proposal, research, meeting, code…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <Link href={`${base}/prompts/new`} className="btn-primary shrink-0 !py-3">+ New prompt</Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter prompts">
        {["All", "My prompts", ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className="chip !py-1">
            {c}
            {c === "My prompts" && mineCount > 0 && <span className="ml-1.5 rounded bg-accent px-1.5 text-[11px] font-semibold text-white">{mineCount}</span>}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink-muted" aria-live="polite">{total} {total === 1 ? "prompt" : "prompts"}</p>
        <SaveStatus />
      </div>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {own.map((c) => (
          <li key={c.id}>
            <Link href={`${base}/prompts/my/${c.id}`} className="flex h-full flex-col rounded-xl border border-accent/40 bg-accent-soft/30 p-5 transition hover:border-accent hover:shadow-lift">
              <span className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{c.category}</span>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">My prompt</span>
              </span>
              <span className="mt-2 font-semibold">{c.title}</span>
              <span className="mt-1 line-clamp-2 font-mono text-[12.5px] leading-relaxed text-ink-muted">{c.prompt}</span>
            </Link>
          </li>
        ))}
        {shown.map((p) => (
          <li key={p.id}>
            <Link href={`${base}/prompts/${p.id}`} className="flex h-full flex-col rounded-xl border border-line bg-white p-5 transition hover:border-ink/20 hover:shadow-lift">
              <span className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{p.category}</span>
                {p.fromBook && <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">From the book</span>}
              </span>
              <span className="mt-2 font-semibold">{p.title}</span>
              <span className="mt-1 line-clamp-2 font-mono text-[12.5px] leading-relaxed text-ink-muted">{doc.edits[p.id]?.prompt ?? p.prompt}</span>
              {doc.edits[p.id] && <span className="mt-3 text-xs font-semibold text-accent">Your version</span>}
            </Link>
          </li>
        ))}
      </ul>
      {total === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-line-strong p-8 text-center text-ink-muted">
          {cat === "My prompts" ? (
            <>
              <p>Your prompts live here: the ones you write, and any library prompt you customize.</p>
              <Link href={`${base}/prompts/new`} className="btn-primary mt-4 !py-2.5 !text-sm">+ Add your first prompt</Link>
            </>
          ) : (
            "No prompts match. Try another word, or the Prompt Builder."
          )}
        </div>
      )}
    </div>
  );
}

/** The dashboard's "where you are" row: today's day, the next chapter, and the Operator track. */
export function ClaudeHomeProgress({ chapters, days, operatorOpen }: { chapters: { n: number; title: string; keyIdea: string }[]; days: { day: number; title: string; task: string }[]; operatorOpen: boolean }) {
  const { base } = useMemberLine();
  const p = useProgress();
  const today = days[p.currentDay - 1];
  const next = chapters.find((c) => !p.chapters.includes(c.n)) ?? chapters[chapters.length - 1];
  const opDone = p.turns.filter((t) => t.startsWith("op-")).length;
  const cards = [
    { label: `30-Day Transformation · Day ${p.currentDay} of 30`, title: today.title, body: today.task, href: `${base}/challenge`, cta: p.days.length ? "Continue" : "Start Day 1" },
    { label: `The Book · ${chapters.length} chapters`, title: `Ch ${next.n}: ${next.title}`, body: next.keyIdea, href: `${base}/book/${next.n}`, cta: "Open this chapter" },
    operatorOpen
      ? { label: `Operator · ${opDone} action steps done`, title: "Build your AI Chief of Staff", body: "Delegate whole jobs, package them as tested skills, and run them on a schedule.", href: `${base}/operator`, cta: "Open the Operator track" }
      : { label: "Operator · Advanced level", title: "Go from user to Operator", body: "The Claude Operator adds the advanced track: skills, 25 workflows and the 30-day Operator plan.", href: `${base}/operator`, cta: "See the advanced level" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cards.map((c, i) => (
        <Link key={c.label} href={c.href} className={`group flex flex-col rounded-xl border p-5 transition hover:shadow-lift ${i === 0 ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/20"}`}>
          <span className={`text-[11px] font-semibold uppercase tracking-wider ${i === 0 ? "text-white/60" : "text-ink-muted"}`}>{c.label}</span>
          <span className="mt-2 font-display text-lg font-medium leading-snug">{c.title}</span>
          <span className={`mt-1 line-clamp-3 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-ink-muted"}`}>{c.body}</span>
          <span className={`mt-auto pt-4 text-sm font-semibold ${i === 0 ? "text-white" : "text-accent"}`}>{c.cta} →</span>
        </Link>
      ))}
    </div>
  );
}

/** The Operator Scale self-assessment: your level is the highest with at least three of four ticks. */
export function OperatorScaleQuiz({ levels, moves }: { levels: { level: number; name: string; quote: string; items: string[] }[]; moves: string[] }) {
  const { turns, toggleTurn } = useProgress();
  const ticked = (l: number) => levels[l - 1].items.filter((_, i) => turns.includes(`scale-${l}-${i}`)).length;
  const level = Math.max(1, ...levels.filter((l) => ticked(l.level) >= 3).map((l) => l.level));
  return (
    <div>
      <div className="rounded-xl bg-ink p-5 text-white">
        <p className="text-sm text-white/60">Your Operator level today</p>
        <p className="mt-1 font-display text-3xl">Level {level}: {levels[level - 1].name}</p>
        <p className="mt-2 text-sm text-white/75">{level < 5 ? `Next move: ${moves[level - 1].replace(/^Level \d → \d: /, "")}` : "Keep your portfolio reviewed for quality, cost and time saved."}</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {levels.map((l) => (
          <fieldset key={l.level} className="rounded-xl border border-line bg-white p-4">
            <legend className="px-1 text-sm font-semibold">Level {l.level}: {l.name} <span className="font-normal text-ink-muted">“{l.quote}”</span></legend>
            <ul className="mt-2 grid gap-2">
              {l.items.map((it, i) => {
                const id = `scale-${l.level}-${i}`;
                return (
                  <li key={id}>
                    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-accent" checked={turns.includes(id)} onChange={() => toggleTurn(id)} />
                      <span>{it}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
