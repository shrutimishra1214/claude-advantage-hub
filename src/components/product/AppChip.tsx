import { appColor, type App } from "@/lib/system";

/** An app name with a small coloured marker. No Microsoft logos. */
export function AppChip({ app, size = "sm" }: { app: App; size?: "xs" | "sm" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded border border-line bg-white font-medium text-ink-soft ${size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${appColor[app]}`} aria-hidden />
      {app}
    </span>
  );
}

/** A letter tile standing in for an app in product previews. */
export function AppTile({ app, className = "h-7 w-7 text-xs" }: { app: App; className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md font-bold text-white ${appColor[app]} ${className}`} aria-hidden>
      {app === "Copilot" ? "AI" : app[0]}
    </span>
  );
}
