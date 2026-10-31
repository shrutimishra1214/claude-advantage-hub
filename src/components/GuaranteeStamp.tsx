import { site } from "@/lib/site";

/** A round rubber-stamp badge with its text slowly turning. */
export function GuaranteeStamp({ className = "" }: { className?: string }) {
  const text = `${site.guaranteeDays}-DAY MONEY-BACK GUARANTEE • NO QUESTIONS ASKED • `;
  return (
    <div className={`grid aspect-square place-items-center ${className}`} role="img" aria-label={`${site.guaranteeDays}-day money-back guarantee`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow text-ink" aria-hidden>
        <defs>
          <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-sans text-[15px] font-semibold tracking-[0.18em]">
          <textPath href="#stamp-circle">{text}</textPath>
        </text>
      </svg>
      <div className="grid h-[52%] w-[52%] place-items-center rounded-full border-2 border-dashed border-ink/25 text-center">
        <span>
          <span className="block font-display text-4xl font-medium leading-none">{site.guaranteeDays}</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">days</span>
        </span>
      </div>
    </div>
  );
}
