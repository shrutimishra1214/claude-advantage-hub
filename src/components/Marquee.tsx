/** Two rows of chapter titles drifting in opposite directions. Decorative. */
export function Marquee({ items }: { items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  return (
    <div aria-hidden className="relative grid gap-3 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      {rows.map((row, r) => (
        <div key={r} className={`flex w-max gap-3 ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"} hover:[animation-play-state:paused]`}>
          {[...row, ...row].map((t, i) => (
            <span key={i} className="whitespace-nowrap rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-soft">
              {t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
