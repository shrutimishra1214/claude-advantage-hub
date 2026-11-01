"use client";

import { CopyButton } from "../product/CopyButton";

/** The light prompt block, for use inside client components. */
export function PromptBlockClient({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-ink p-3.5 text-white">
      <p className="min-w-0 flex-1 font-mono text-[13px] leading-relaxed">{text}</p>
      <CopyButton text={text} className="shrink-0 text-white/80 hover:bg-white/10 hover:text-white" />
    </div>
  );
}
