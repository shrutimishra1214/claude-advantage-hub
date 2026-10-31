import Link from "next/link";
import { appColor, cheatSheets } from "@/lib/system";
import { Icon } from "../icons";

/** Printable one-page references, drawn as A4 sheets. */
/** Pass `links` (one per sheet, in order) to make each preview open its sheet. */
export function CheatSheets({ links }: { links?: string[] } = {}) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      {cheatSheets.map((c, i) => (
        <li key={c.title} className="group relative">
          {links && <Link href={links[i]} className="absolute inset-0 z-10" aria-label={`Open ${c.title}`} />}
          <div className="relative aspect-[210/297] overflow-hidden rounded-md border border-line bg-white p-3 shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
            <div className="flex items-center justify-between">
              <span className={`h-1.5 w-8 rounded-full ${c.app ? appColor[c.app] : "bg-accent"}`} />
              <span className="text-[7px] font-bold uppercase tracking-wider text-ink-muted">{c.tag}</span>
            </div>
            <p className="mt-2 font-display text-[11px] font-bold leading-tight">{c.title}</p>
            {i === 8 ? (
              <div className="mt-3 grid grid-cols-2 gap-1">
                {["G", "C", "S", "E"].map((l) => <span key={l} className="grid aspect-square place-items-center rounded bg-accent-soft font-display text-sm font-bold text-accent">{l}</span>)}
              </div>
            ) : i === 9 ? (
              <div className="mt-3 grid grid-cols-6 gap-0.5">
                {Array.from({ length: 30 }).map((_, d) => <span key={d} className={`aspect-square rounded-[2px] ${d < 12 ? "bg-accent" : "border border-line"}`} />)}
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2">
                {Array.from({ length: 6 }).map((_, k) => (
                  <span key={k} className="grid gap-0.5">
                    <span className="block h-1 w-3/4 rounded-full bg-ink/30" />
                    <span className="skel !h-1 w-full" />
                    <span className="skel !h-1 w-5/6" />
                  </span>
                ))}
              </div>
            )}
            <span className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-[7px] text-ink-muted">
              <span>Copilot Advantage</span><Icon.printer className="h-2.5 w-2.5" />
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-snug">{c.title}</p>
          <p className="text-xs text-ink-muted">PDF · printable</p>
        </li>
      ))}
    </ul>
  );
}
