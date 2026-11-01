import { Icon } from "../icons";
import { AppTile } from "./AppChip";
import { Sidebar } from "./Sidebar";

const tiles = [
  { icon: "book", title: "Prompt Library", meta: "250+ recipes" },
  { icon: "flow", title: "Workflow Vault", meta: "100 workflows" },
  { icon: "doc", title: "Templates", meta: "30+ templates" },
  { icon: "wand", title: "Prompt Builder", meta: "4 steps" },
  { icon: "printer", title: "Cheat Sheets", meta: "10 printables" },
  { icon: "calendar", title: "30-Day Challenge", meta: "Week 2 of 4" },
] as const;

/** What a member sees after signing in. */
export function DashboardPreview() {
  return (
    <div className="window" role="img" aria-label="Preview of the member dashboard: progress, today's workflow and every tool">
      <div className="window-bar"><i /><i /><i /><span className="ml-3 text-[11px] text-ink-muted">Copilot Advantage · Dashboard</span></div>
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1 p-4 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs text-ink-muted">Good morning</p>
              <p className="font-display text-xl font-semibold md:text-2xl">Welcome to the Copilot Advantage</p>
            </div>
            <div className="w-full max-w-xs">
              <p className="flex justify-between text-xs"><span className="font-semibold">Day 12 of 30</span><span className="text-ink-muted">40%</span></p>
              <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-paper-tint"><span className="grow-x block h-full w-[40%] rounded-full bg-accent" /></span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-line p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Continue learning</p>
              <p className="mt-2 font-semibold">Week 2 · Excel: explain what changed</p>
              <p className="mt-1 text-sm text-ink-muted">Lesson 3 of 5 · 8 min left</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white"><Icon.play className="h-3 w-3" /> Resume</span>
            </div>
            <div className="rounded-lg border border-accent/30 bg-accent-soft/50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-deep">Today&apos;s workflow</p>
              <p className="mt-2 font-semibold">Email → Action</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
                {(["Outlook", "Copilot", "Teams"] as const).map((a, i) => (
                  <span key={a} className="flex items-center gap-1.5">
                    {i > 0 && <Icon.arrow className="h-3 w-3 text-ink-muted" />}
                    <span className="flex items-center gap-1 rounded border border-line bg-white px-1.5 py-1"><AppTile app={a} className="h-4 w-4 text-[8px]" /> {a}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tiles.map((t) => {
              const I = Icon[t.icon];
              return (
                <li key={t.title} className="rounded-lg border border-line p-3.5">
                  <I className="h-5 w-5 text-accent" />
                  <p className="mt-2.5 text-sm font-semibold">{t.title}</p>
                  <p className="text-xs text-ink-muted">{t.meta}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
