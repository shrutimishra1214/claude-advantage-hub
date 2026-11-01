import { Icon } from "./icons";

export function FunnelProgress({ current }: { current: 1 | 2 | 3 }) {
  const labels = ["Order complete", "Special offer", "Your library"];
  return (
    <ol className="mx-auto flex max-w-xl items-center justify-between gap-2 text-xs font-semibold sm:text-sm">
      {labels.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${done ? "bg-emerald-500 text-white" : active ? "bg-ink text-white" : "bg-ink/10 text-ink-muted"}`}>
              {done ? <Icon.check className="h-4 w-4" /> : n}
            </span>
            <span className={active || done ? "text-ink" : "text-ink-muted"}>{label}</span>
            {n < 3 && <span className={`hidden h-px flex-1 sm:block ${done ? "bg-emerald-500" : "bg-ink/10"}`} />}
          </li>
        );
      })}
    </ol>
  );
}
