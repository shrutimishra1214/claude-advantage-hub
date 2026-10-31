import { Icon } from "./icons";

/** Three "seat" cards showing which early reader spots are claimed and which are open. */
export function SpotsMeter({ claimed, total, compact = false }: { claimed: number; total: number; compact?: boolean }) {
  const left = Math.max(0, total - claimed);
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className={`font-display font-medium leading-none ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}>
          {left === 0 ? (
            <>All spots claimed</>
          ) : (
            <>
              <span className="accent-em">{left}</span> of {total} {left === 1 ? "spot" : "spots"} left
            </>
          )}
        </p>
        <p className="text-sm font-medium text-ink-muted">{claimed} claimed</p>
      </div>

      {/* segmented progress */}
      <div className="mt-4 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }} aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-2 rounded-full ${i < claimed ? "bg-ink" : "bg-ink/10"}`} />
        ))}
      </div>

      <ol className={`mt-6 grid grid-cols-3 ${compact ? "gap-2.5" : "gap-3 md:gap-4"}`} aria-label={`${claimed} of ${total} spots claimed`}>
        {Array.from({ length: total }, (_, i) => {
          const taken = i < claimed;
          return (
            <li
              key={i}
              aria-label={`Spot ${i + 1}: ${taken ? "claimed" : "open"}`}
              className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl text-center transition ${
                compact ? "aspect-[4/5] p-3" : "aspect-[3/4] p-4"
              } ${taken ? "bg-ink text-white" : "border-2 border-dashed border-brand-violet/40 bg-white"}`}
            >
              {taken ? (
                <>
                  <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,.35),transparent_65%)]" />
                  <span className={`relative grid place-items-center rounded-full bg-white/10 ${compact ? "h-10 w-10" : "h-14 w-14"}`}>
                    <svg viewBox="0 0 24 24" className={compact ? "h-5 w-5" : "h-7 w-7"} fill="currentColor" aria-hidden>
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z" />
                    </svg>
                  </span>
                  <span className={`relative mt-3 inline-flex items-center gap-1 font-semibold ${compact ? "text-xs" : "text-sm"}`}>
                    <Icon.check className="h-4 w-4 text-emerald-400" /> Claimed
                  </span>
                </>
              ) : (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-violet/60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-violet" />
                  </span>
                  <span className={`mt-3 font-semibold text-brand-violet ${compact ? "text-xs" : "text-sm"}`}>Open</span>
                </>
              )}
              <span className={`relative mt-1 whitespace-nowrap font-display font-bold ${taken ? "text-white/50" : "text-ink-muted"} ${compact ? "text-[11px]" : "text-xs"}`}>
                SPOT {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
