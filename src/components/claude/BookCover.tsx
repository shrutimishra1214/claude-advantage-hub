/** The Claude Operator's cover art, drawn flat (it has no cover image yet), in the books' black, white and gold style. Size it with the wrapper's text size. */
export function OperatorCoverArt({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-between bg-[#111] px-[9%] py-[10%] text-center uppercase ${className}`} style={{ fontFamily: "var(--font-display)" }}>
      <span className="text-[0.55em] tracking-[0.3em] text-white/70">Advanced level</span>
      <span className="leading-[0.86]">
        <span className="block text-[2.1em] font-black tracking-tight text-[#E7B437]">The</span>
        <span className="block text-[3.1em] font-black tracking-tight text-white">Claude</span>
        <span className="block text-[2.25em] font-black tracking-tight text-[#E7B437]">Operator</span>
      </span>
      <span className="h-px w-1/3 bg-[#E7B437]/70" />
      <span className="text-[0.62em] font-semibold leading-snug tracking-[0.08em] text-white/80">Advanced workflows, Claude Code, Design &amp; Cowork</span>
      <span className="text-[0.6em] font-semibold tracking-[0.4em] text-white/80">Kaelis Voss</span>
    </div>
  );
}
