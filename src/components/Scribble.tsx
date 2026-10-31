// Hand-drawn pen marks. Each path uses pathLength=1 so the `.draw` CSS can
// animate any of them drawing in, regardless of its real length.

type Props = { className?: string; delay?: number };

export function Underline({ className = "", delay = 0 }: Props) {
  return (
    <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden className={`draw pointer-events-none ${className}`}>
      <path
        pathLength={1}
        d="M3 13.5C52 6.8 118 4.2 178 6.1c41 1.3 77 4.6 118 9.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ animationDelay: `${delay}ms` }}
      />
    </svg>
  );
}

export function Circle({ className = "", delay = 0 }: Props) {
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden className={`draw pointer-events-none ${className}`}>
      <path
        pathLength={1}
        d="M150 12C112 2 38 6 14 30c-18 18 6 40 70 44 58 4 108-8 112-30 3-18-30-31-78-33"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ animationDelay: `${delay}ms` }}
      />
    </svg>
  );
}

/** A loose curved arrow, drawn pointing down-right; rotate/flip with classes. */
export function Arrow({ className = "", delay = 0 }: Props) {
  return (
    <svg viewBox="0 0 90 70" aria-hidden className={`draw pointer-events-none ${className}`}>
      <path pathLength={1} d="M4 6c18 2 44 10 56 28 6 9 9 18 10 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animationDelay: `${delay}ms` }} />
      <path pathLength={1} d="M58 50l12 13 10-15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: `${delay + 700}ms` }} />
    </svg>
  );
}
