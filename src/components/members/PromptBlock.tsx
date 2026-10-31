import { CopyButton } from "../product/CopyButton";

/** A prompt to paste into Copilot, with a copy button. */
export function PromptBlock({ label = "The prompt", text, dark = true }: { label?: string; text: string; dark?: boolean }) {
  return (
    <div className={`rounded-lg p-4 ${dark ? "bg-ink text-white" : "border border-line bg-paper"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-white/60" : "text-ink-muted"}`}>{label}</span>
        <CopyButton text={text} className={dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "border border-line bg-white text-ink hover:border-ink/30"} />
      </div>
      <p className="mt-2 font-mono text-[13.5px] leading-relaxed">{text}</p>
    </div>
  );
}
