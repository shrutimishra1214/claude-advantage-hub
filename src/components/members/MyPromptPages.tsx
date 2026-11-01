"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { recipeCategories } from "@/lib/system";
import type { CustomPrompt } from "@/lib/toolkit/my-prompts-types";
import { Icon } from "../icons";
import { CopyButton } from "../product/CopyButton";
import { useMemberLine } from "./MemberLine";
import { useMyPrompts } from "./myPrompts";
import { SaveStatus } from "./SaveStatus";

const copilotApps = ["", "Copilot", "Word", "Excel", "PowerPoint", "Outlook", "Teams", "OneNote"];
const claudeApps = ["", "Claude chat", "Projects", "Claude Code", "Cowork", "Design", "Research"];
type Draft = Pick<CustomPrompt, "title" | "category" | "app" | "prompt" | "followUp" | "notes">;
const blank = (category: string): Draft => ({ title: "", category, app: "", prompt: "", followUp: "", notes: "" });

function PromptForm({ initial, categories = [...recipeCategories], submitLabel, onSubmit, onCancel }: { initial: Draft; categories?: string[]; submitLabel: string; onSubmit: (d: Draft) => void; onCancel: () => void }) {
  const [d, setD] = useState(initial);
  const { line } = useMemberLine();
  const apps = line === "claude" ? claudeApps : copilotApps;
  const set = (k: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setD({ ...d, [k]: e.target.value });
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (d.title.trim() && d.prompt.trim()) onSubmit({ ...d, title: d.title.trim(), prompt: d.prompt.trim(), followUp: d.followUp.trim(), notes: d.notes.trim() });
      }}
    >
      <label className="grid gap-1.5 text-sm font-semibold">
        Name
        <input required maxLength={120} className="input" placeholder="e.g. Weekly update to my director" value={d.title} onChange={set("title")} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold">
          Category
          <select className="input" value={d.category} onChange={set("category")}>
            {[...categories, "Other"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          App <span className="sr-only">(optional)</span>
          <select className="input" value={d.app} onChange={set("app")}>
            {apps.map((a) => <option key={a} value={a}>{a || "Any app"}</option>)}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold">
        The prompt
        <textarea required rows={7} className="input resize-y font-mono !text-[13px] leading-relaxed" placeholder="Role: … Context: … Task: … Format: … Constraints: …  Use [brackets] for the parts that change each time." value={d.prompt} onChange={set("prompt")} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        <span>Follow-up prompt <span className="font-normal text-ink-muted">(optional)</span></span>
        <textarea rows={3} className="input resize-y font-mono !text-[13px] leading-relaxed" value={d.followUp} onChange={set("followUp")} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        <span>Notes <span className="font-normal text-ink-muted">(optional: when to use it, what to provide)</span></span>
        <textarea rows={2} className="input resize-y !text-sm" value={d.notes} onChange={set("notes")} />
      </label>
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" disabled={!d.title.trim() || !d.prompt.trim()}><Icon.check className="h-4 w-4" /> {submitLabel}</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export function NewPrompt({ categories }: { categories?: string[] }) {
  const router = useRouter();
  const { base } = useMemberLine();
  const { status, actions } = useMyPrompts();
  if (status === "loading") return <p className="text-ink-muted">Loading your prompts…</p>;
  return (
    <PromptForm
      initial={blank(categories?.[0] ?? "Write")}
      submitLabel="Save prompt"
      categories={categories}
      onCancel={() => router.push(`${base}/prompts`)}
      onSubmit={(d) => router.push(`${base}/prompts/my/${actions.addCustom(d)}`)}
    />
  );
}

export function MyPrompt({ id, categories }: { id: string; categories?: string[] }) {
  const router = useRouter();
  const { base } = useMemberLine();
  const { doc, status, actions } = useMyPrompts();
  const [editing, setEditing] = useState(false);
  const p = doc.custom.find((c) => c.id === id);

  if (status === "loading") return <p className="text-ink-muted">Loading your prompt…</p>;
  if (!p)
    return (
      <div className="rounded-xl border border-dashed border-line-strong p-8 text-center">
        <p className="font-semibold">This prompt isn&apos;t in your library.</p>
        <Link href={`${base}/prompts`} className="link-arrow mt-3 text-sm">Back to the Prompt Library</Link>
      </div>
    );

  return (
    <article>
      <Link href={`${base}/prompts`} className="text-sm font-medium text-ink-muted hover:text-ink">← Prompt Library</Link>
      <div className="mt-4 flex flex-col gap-4 border-b border-line pb-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">My prompts · {p.category}{p.app && ` · ${p.app}`}</p>
          <h1 className="mt-2 text-3xl md:text-4xl">{p.title}</h1>
        </div>
        <SaveStatus />
      </div>

      {editing ? (
        <div className="mt-8">
          <PromptForm
            initial={p}
            categories={categories}
            submitLabel="Save changes"
            onCancel={() => setEditing(false)}
            onSubmit={(d) => {
              actions.updateCustom(p.id, d);
              setEditing(false);
            }}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          <div className="rounded-lg bg-ink p-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">The prompt</span>
              <CopyButton text={p.prompt} className="text-white/80 hover:bg-white/10 hover:text-white" />
            </div>
            <p className="mt-2 whitespace-pre-wrap font-mono text-[13.5px] leading-relaxed">{p.prompt}</p>
          </div>
          {p.followUp && (
            <div className="rounded-lg border border-line bg-paper p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Follow-up prompt</span>
                <CopyButton text={p.followUp} className="border border-line bg-white text-ink hover:border-ink/30" />
              </div>
              <p className="mt-2 whitespace-pre-wrap font-mono text-[13.5px] leading-relaxed">{p.followUp}</p>
            </div>
          )}
          {p.notes && <p className="rounded-lg border border-line p-4 leading-relaxed text-ink-soft"><strong className="text-ink">Notes:</strong> {p.notes}</p>}
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setEditing(true)} className="btn-primary !px-4 !py-2.5 !text-sm"><Icon.wand className="h-4 w-4" /> Edit</button>
            <button
              type="button"
              onClick={() => {
                if (!confirm(`Delete “${p.title}”? This can't be undone.`)) return;
                actions.deleteCustom(p.id);
                router.push(`${base}/prompts`);
              }}
              className="btn-secondary !px-4 !py-2.5 !text-sm hover:!border-red-300 hover:!text-red-700"
            >
              <Icon.x className="h-4 w-4" /> Delete
            </button>
            <span className="text-xs text-ink-muted">Last edited {new Date(p.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </article>
  );
}
