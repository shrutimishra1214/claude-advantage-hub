"use client";

import { useMyPrompts } from "./myPrompts";

/** Where the member's prompts are kept, and whether the last change has saved. */
export function SaveStatus() {
  const { status, saving, error } = useMyPrompts();
  if (status === "loading") return null;
  if (error) return <p role="alert" className="max-w-sm rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">{error}</p>;
  return (
    <p className="text-xs text-ink-muted" aria-live="polite">
      {saving ? "Saving…" : status === "account" ? "Saved to your account · available on any device" : "Saved in this browser"}
    </p>
  );
}
