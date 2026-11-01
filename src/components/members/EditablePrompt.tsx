"use client";

import { useState } from "react";
import { Icon } from "../icons";
import { CopyButton } from "../product/CopyButton";
import { useMyPrompts } from "./myPrompts";

/**
 * A built-in prompt the member can rewrite for their own work. Their version
 * replaces the original everywhere it's shown, until they reset it.
 */
export function EditablePrompt({ id, prompt, followUp, label = "The prompt" }: { id: string; prompt: string; followUp?: string; label?: string }) {
  const { doc, status, actions } = useMyPrompts();
  const mine = doc.edits[id];
  const [editing, setEditing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [draft, setDraft] = useState({ prompt: "", followUp: "", notes: "" });

  const current = mine && !showOriginal ? mine : { prompt, followUp: followUp ?? "", notes: "" };

  function startEditing() {
    setDraft({ prompt: mine?.prompt ?? prompt, followUp: mine?.followUp ?? followUp ?? "", notes: mine?.notes ?? "" });
    setShowOriginal(false);
    setEditing(true);
  }

  function save() {
    const unchanged = draft.prompt.trim() === prompt && draft.followUp.trim() === (followUp ?? "") && !draft.notes.trim();
    actions.setEdit(id, unchanged ? null : { prompt: draft.prompt.trim(), followUp: draft.followUp.trim(), notes: draft.notes.trim() });
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="rounded-xl border-2 border-accent p-4 md:p-5">
        <p className="text-sm font-semibold">Make it yours</p>
        <p className="text-xs text-ink-muted">Replace the [brackets] with what you always use, or rewrite it completely. Your version is saved to your prompt library.</p>
        <label className="mt-4 grid gap-1.5 text-sm font-medium">
          {label}
          <textarea autoFocus rows={6} className="input resize-y font-mono !text-[13px] leading-relaxed" value={draft.prompt} onChange={(e) => setDraft({ ...draft, prompt: e.target.value })} />
        </label>
        {followUp !== undefined && (
          <label className="mt-3 grid gap-1.5 text-sm font-medium">
            Follow-up prompt
            <textarea rows={3} className="input resize-y font-mono !text-[13px] leading-relaxed" value={draft.followUp} onChange={(e) => setDraft({ ...draft, followUp: e.target.value })} />
          </label>
        )}
        <label className="mt-3 grid gap-1.5 text-sm font-medium">
          <span>Your notes <span className="font-normal text-ink-muted">(optional: when you use it, what worked)</span></span>
          <textarea rows={2} className="input resize-y !text-sm" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={save} disabled={!draft.prompt.trim()} className="btn-primary !px-4 !py-2.5 !text-sm"><Icon.check className="h-4 w-4" /> Save my version</button>
          <button type="button" onClick={() => setEditing(false)} className="btn-secondary !px-4 !py-2.5 !text-sm">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <div className="rounded-lg bg-ink p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
            {label}
            {mine && <span className={`rounded px-1.5 py-0.5 text-[10px] ${showOriginal ? "bg-white/15 text-white/80" : "bg-accent text-white"}`}>{showOriginal ? "Original" : "Your version"}</span>}
          </span>
          <span className="flex items-center gap-1">
            <button type="button" onClick={startEditing} disabled={status === "loading"} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-50">
              <Icon.wand className="h-3.5 w-3.5" /> {mine ? "Edit" : "Customize"}
            </button>
            <CopyButton text={current.prompt} className="text-white/80 hover:bg-white/10 hover:text-white" />
          </span>
        </div>
        <p className="mt-2 whitespace-pre-wrap font-mono text-[13.5px] leading-relaxed">{current.prompt}</p>
      </div>

      {followUp !== undefined && current.followUp && (
        <div className="rounded-lg border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Follow-up prompt</span>
            <CopyButton text={current.followUp} className="border border-line bg-white text-ink hover:border-ink/30" />
          </div>
          <p className="mt-2 whitespace-pre-wrap font-mono text-[13.5px] leading-relaxed">{current.followUp}</p>
        </div>
      )}

      {mine && !showOriginal && mine.notes && (
        <p className="rounded-lg border border-accent/30 bg-accent-soft/40 px-4 py-3 text-sm"><strong>Your notes:</strong> {mine.notes}</p>
      )}

      {mine && (
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
          <button type="button" onClick={() => setShowOriginal(!showOriginal)} className="font-semibold hover:text-ink">{showOriginal ? "Show my version" : "Show original"}</button>
          <button
            type="button"
            onClick={() => confirm("Reset this prompt to the original? Your version will be deleted.") && actions.setEdit(id, null)}
            className="font-semibold hover:text-red-700"
          >
            Reset to original
          </button>
          <span>Saved {new Date(mine.updatedAt).toLocaleDateString()}</span>
        </p>
      )}
    </div>
  );
}
