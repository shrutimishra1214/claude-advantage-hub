import { Icon } from "../icons";
import { AppTile } from "./AppChip";
import { Sidebar } from "./Sidebar";

/** The product ecosystem: the member area with its tools around it. */
export function HeroVisual() {
  return (
    <div className="relative" aria-label="Preview of the Copilot Advantage member area" role="img">
      <div className="window">
        <div className="window-bar"><i /><i /><i /><span className="ml-3 truncate text-[11px] text-ink-muted">Copilot Advantage · Workflow Vault</span></div>
        <div className="flex">
          <Sidebar active="Workflow Vault" />
          <div className="min-w-0 flex-1 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Meetings · Workflow 14</p>
                <p className="truncate text-[15px] font-semibold">Meeting → Action Plan</p>
              </div>
              <span className="shrink-0 rounded bg-accent-soft px-2 py-1 text-[10px] font-semibold text-accent-deep">6 steps · 10 min</span>
            </div>
            <ol className="mt-4 grid gap-2">
              {[
                ["Teams", "Open the meeting recap", true],
                ["Copilot", "List decisions and action items", true],
                ["Excel", "Add owners and deadlines", false],
                ["Outlook", "Send the follow-up email", false],
              ].map(([app, label, done], i) => (
                <li key={label as string} className={`flex items-center gap-3 rounded-lg border p-2.5 ${i === 2 ? "border-accent bg-accent-soft/40" : "border-line"}`}>
                  <AppTile app={app as "Teams"} className="h-6 w-6 text-[10px]" />
                  <span className="min-w-0 flex-1 truncate text-[12px] font-medium">{label as string}</span>
                  {done ? (
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-app-excel text-white"><Icon.check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-line-strong" />
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-3 rounded-lg bg-ink p-3 font-mono text-[10.5px] leading-relaxed text-white/85">
              <span className="text-white/50">Prompt ›</span> From this meeting, list every decision and action item. For each action, give the owner and deadline…
            </div>
          </div>
        </div>
      </div>

      {/* Tools around the main window. Hidden on small screens to keep the hero clean. */}
      <div className="absolute -bottom-10 -left-8 hidden w-44 rounded-xl border border-line bg-white p-3 shadow-lift lg:block xl:-left-14">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold"><Icon.calendar className="h-3.5 w-3.5 text-accent" /> 30-Day Challenge</p>
        <p className="mt-2 text-[11px] text-ink-muted">Day 12 of 30</p>
        <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-paper-tint"><span className="block h-full w-[40%] rounded-full bg-accent" /></span>
      </div>
      <div className="absolute -right-6 -top-6 hidden w-48 rounded-xl border border-line bg-white p-3 shadow-lift lg:block xl:-right-10">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold"><Icon.wand className="h-3.5 w-3.5 text-accent" /> Prompt Builder</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {["Summarize", "Meeting", "Executive", "Bullets"].map((t) => (
            <span key={t} className="rounded border border-accent/40 bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent-deep">{t}</span>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-8 right-10 hidden w-40 rounded-xl border border-line bg-white p-3 shadow-lift lg:block">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold"><Icon.doc className="h-3.5 w-3.5 text-app-word" /> Decision Memo</p>
        <span className="mt-2 grid gap-1"><span className="skel w-full" /><span className="skel w-4/5" /><span className="skel w-3/5" /></span>
      </div>
    </div>
  );
}
