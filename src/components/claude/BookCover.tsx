/** A clean 3D-style book mockup in the books' cover style (black, white and gold type). */
export function BookCover({ book, className = "" }: { book: "advantage" | "operator"; className?: string }) {
  const operator = book === "operator";
  return (
    <div className={`relative aspect-[6/9] [perspective:1200px] ${className}`} role="img" aria-label={operator ? "The Claude Operator book" : "The Claude Advantage book"}>
      <div className="absolute inset-0 rounded-r-md rounded-l-sm bg-[#111] shadow-book [transform:rotateY(-14deg)] [transform-origin:left]">
        <span aria-hidden className="absolute inset-y-0 left-0 w-3 rounded-l-sm bg-gradient-to-r from-black/60 to-transparent" />
        <div className="flex h-full flex-col items-center justify-between px-[9%] py-[10%] text-center uppercase" style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-[0.55em] tracking-[0.3em] text-white/70">{operator ? "Advanced level" : "Work smarter. Think clearer."}</span>
          <span className="leading-[0.86]">
            <span className="block text-[2.1em] font-black tracking-tight text-[#E7B437]">The</span>
            <span className="block text-[3.1em] font-black tracking-tight text-white">Claude</span>
            <span className="block text-[2.25em] font-black tracking-tight text-[#E7B437]">{operator ? "Operator" : "Advantage"}</span>
          </span>
          <span className="h-px w-1/3 bg-[#E7B437]/70" />
          <span className="text-[0.62em] font-semibold leading-snug tracking-[0.08em] text-white/80">
            {operator ? "Advanced workflows, Claude Code, Design & Cowork" : "Systems, elite prompts & high-performance workflows"}
          </span>
          <span className="text-[0.6em] font-semibold tracking-[0.4em] text-white/80">Kaelis Voss</span>
        </div>
      </div>
    </div>
  );
}
