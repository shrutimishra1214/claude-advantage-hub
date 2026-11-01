"use client";

import { useId, useState } from "react";
import { builder } from "@/lib/system";
import { CopyButton } from "./CopyButton";

const verb: Record<string, string> = {
  Write: "Write", Analyze: "Analyze", Research: "Research", Summarize: "Summarize",
  Create: "Create", Plan: "Plan", Compare: "Compare", Decide: "Help me decide on",
};
const source: Record<string, string> = {
  Email: "Use the email thread I have open. Don't add facts that aren't in it.",
  Document: "Use the document [name or reference the file].",
  Spreadsheet: "Use the table in [name or reference the workbook].",
  Meeting: "Use the meeting recap or transcript from [meeting name].",
  Presentation: "Use the presentation [name or reference the file].",
  Research: "Use reliable, recent sources and tell me which ones you used.",
  "Multiple sources": "Use [file 1], [file 2] and the related email thread, and say which source each point comes from.",
};
const context: Record<string, string> = {
  Manager: "This is for my manager, who needs a clear update and to know what I need from them.",
  Executive: "This is for a senior executive with very little time. Lead with the conclusion and the decision needed.",
  Client: "This is for a client. Keep it professional, clear and free of internal jargon.",
  Team: "This is for my team. Make the next steps and owners obvious.",
  Customer: "This is for a customer. Keep it friendly, plain and helpful.",
  General: "This is for a general audience with no background on the topic.",
};
const expectations: Record<string, string> = {
  Bullets: "Format it as 5–7 concise bullets, most important first.",
  Table: "Format it as a table with clear column headings.",
  Email: "Format it as a ready-to-send email with a subject line, under 200 words.",
  Report: "Format it as a short report with headings: summary, findings, recommendations.",
  Presentation: "Format it as a slide-by-slide outline: a takeaway title and 3 bullets per slide.",
  "Executive Summary": "Format it as an executive summary: conclusion first, then 3 supporting points, under 150 words.",
  "Action Plan": "Format it as an action plan table: task, owner, deadline.",
};

type Key = keyof typeof builder;
const steps: { key: Key; title: string }[] = [
  { key: "task", title: "What do you want Copilot to do?" },
  { key: "material", title: "What are you working with?" },
  { key: "audience", title: "Who is the audience?" },
  { key: "output", title: "What should the output look like?" },
];

/** A working prompt builder: four choices in, a G-C-S-E prompt out. */
export function PromptBuilder() {
  const [pick, setPick] = useState<Record<Key, string>>({ task: "Summarize", material: "Meeting", audience: "Executive", output: "Executive Summary" });
  const [topic, setTopic] = useState("");
  const topicId = useId();

  const parts = [
    { l: "G", label: "Goal", text: `${verb[pick.task]} ${topic.trim() || "[what it's about]"}.` },
    { l: "C", label: "Context", text: context[pick.audience] },
    { l: "S", label: "Source", text: source[pick.material] },
    { l: "E", label: "Expectations", text: `${expectations[pick.output]} If anything important is missing, list it at the end instead of guessing.` },
  ];
  const prompt = parts.map((p) => p.text).join(" ");

  return (
    <div className="window">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[11px] text-ink-muted">Prompt Builder</span></div>
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-6 p-5 md:p-7">
          {steps.map((s, i) => (
            <fieldset key={s.key}>
              <legend className="flex items-center gap-2.5 text-sm font-semibold">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-ink text-[11px] text-white">{i + 1}</span>
                <span><span className="text-ink-muted">Step {i + 1} · </span>{s.title}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {builder[s.key].map((opt) => (
                  <button key={opt} type="button" aria-pressed={pick[s.key] === opt} onClick={() => setPick({ ...pick, [s.key]: opt })} className="chip">
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
          <div>
            <label htmlFor={topicId} className="text-sm font-semibold">What is it about? <span className="font-normal text-ink-muted">(optional)</span></label>
            <input id={topicId} className="input mt-2 !py-2.5" placeholder="e.g. the Q3 vendor review" value={topic} maxLength={120} onChange={(e) => setTopic(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col border-t border-line bg-paper/70 p-5 md:p-7 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Your prompt</p>
            <CopyButton text={prompt} className="border border-line bg-white text-ink hover:border-ink/30" />
          </div>
          <ol className="mt-4 grid flex-1 content-start gap-3" aria-live="polite">
            {parts.map((p) => (
              <li key={p.l} className="flex gap-3 rounded-lg border border-line bg-white p-3.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent font-display text-sm font-bold text-white" title={p.label}>{p.l}</span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{p.label}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">Paste it into Copilot, fill in anything in [brackets], then refine with a follow-up.</p>
        </div>
      </div>
    </div>
  );
}
