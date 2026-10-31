import { Icon } from "../icons";

const items = [
  { icon: "home", label: "Home" },
  { icon: "book", label: "Prompt Library" },
  { icon: "flow", label: "Workflow Vault" },
  { icon: "doc", label: "Templates" },
  { icon: "calendar", label: "30-Day Challenge" },
  { icon: "wand", label: "Prompt Builder" },
  { icon: "printer", label: "Cheat Sheets" },
] as const;

/** The member area's navigation, as drawn in previews. */
export function Sidebar({ active = "Home" }: { active?: string }) {
  return (
    <nav aria-hidden className="hidden w-48 shrink-0 border-r border-line bg-paper/60 p-3 md:block">
      <p className="flex items-center gap-2 px-2 pb-4 pt-1 text-[11px] font-bold uppercase tracking-wider">
        <span className="grid h-5 w-5 place-items-center rounded bg-ink text-[8px] text-white">CA</span> Copilot Advantage
      </p>
      <ul className="grid gap-0.5">
        {items.map((it) => {
          const I = Icon[it.icon];
          const on = it.label === active;
          return (
            <li key={it.label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] ${on ? "bg-white font-semibold text-ink shadow-soft" : "text-ink-muted"}`}>
              <I className={`h-3.5 w-3.5 ${on ? "text-accent" : ""}`} /> {it.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
