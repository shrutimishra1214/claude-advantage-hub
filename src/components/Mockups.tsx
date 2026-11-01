import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { OperatorCoverArt } from "./claude/BookCover";
import type { LineId } from "@/lib/lines";

// Product mockups for digital products: the ebooks on a tablet, the member
// toolkit in a browser, the phone view and the printables. Sizes inside the
// scene use container units (cqw), so it scales as one picture at any width.

export type EbookId = "copilot" | "claude" | "operator";

const covers: Record<Exclude<EbookId, "operator">, { src: string; w: number; h: number; alt: string }> = {
  copilot: { src: "/images/cover.jpg", w: 1100, h: 1392, alt: "The Microsoft Copilot Advantage ebook cover" },
  claude: { src: "/images/claude-cover.jpg", w: 972, h: 1269, alt: "The Claude Advantage ebook cover" },
};

const cq: CSSProperties = { containerType: "inline-size" };

/** A cover, filling its box. */
export function Cover({ book, sizes = "300px", priority = false }: { book: EbookId; sizes?: string; priority?: boolean }) {
  if (book === "operator") {
    return (
      <div role="img" aria-label="The Claude Operator ebook cover" className="h-full w-full" style={cq}>
        <div className="h-full text-[6cqw]"><OperatorCoverArt /></div>
      </div>
    );
  }
  const c = covers[book];
  return <Image src={c.src} alt={c.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />;
}

/** A tablet in portrait. */
export function Tablet({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    // The outer box takes the size and position, so the bezel's % padding is measured against the device.
    <div className={className} style={style}>
      <div className="rounded-[7%/5.3%] bg-[#17171A] p-[3.6%] shadow-[0_30px_60px_-25px_rgba(14,23,38,.55),inset_0_0_0_1px_rgba(255,255,255,.08)]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[3%/2.2%] bg-black">{children}</div>
      </div>
    </div>
  );
}

/** A phone in portrait. */
export function Phone({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={style}>
      <div className="rounded-[16%/7.6%] bg-[#17171A] p-[4.5%] shadow-[0_24px_50px_-20px_rgba(14,23,38,.55),inset_0_0_0_1px_rgba(255,255,255,.08)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[12%/5.6%] bg-white">
          <span aria-hidden className="absolute left-1/2 top-[1.6%] z-10 h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-[#17171A]" />
          {children}
        </div>
      </div>
    </div>
  );
}

/** An ebook on a tablet, on its own. */
export function Ebook({ book, className = "", sizes, priority }: { book: EbookId; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <Tablet className={className}>
      <Cover book={book} sizes={sizes} priority={priority} />
    </Tablet>
  );
}

const copy: Record<LineId, {
  ebook: EbookId;
  app: string;
  nav: string[];
  title: string;
  steps: string[];
  prompt: string;
  sheets: [[string, string], [string, string]];
}> = {
  copilot: {
    ebook: "copilot",
    app: "Copilot Advantage · Complete",
    nav: ["Home", "Prompt Library", "Workflow Vault", "Templates", "Prompt Builder", "30-Day Challenge", "Cheat Sheets"],
    title: "Meeting → Action Plan",
    steps: ["Open the meeting recap", "List decisions and actions", "Add owners and deadlines", "Send the follow-up"],
    prompt: "From this meeting, list every decision and action item, with an owner and a deadline for each…",
    sheets: [["Copilot in Word", "Cheat sheet"], ["30-Day Challenge", "Tracker"]],
  },
  claude: {
    ebook: "claude",
    app: "The Claude Advantage · System",
    nav: ["Home", "Prompt System", "Workflow Vault", "Context Kit", "Project System", "Operator Track", "30-Day Plan"],
    title: "Research → Synthesize → Brief",
    steps: ["Write the research brief", "Pull and test the sources", "Synthesize the findings", "Draft the decision brief"],
    prompt: "You're a senior analyst. Here is my goal, my audience and what a great answer looks like…",
    sheets: [["Your Professional Brief", "Worksheet"], ["30-Day Transformation", "Tracker"]],
  },
};

/** A printable page: a worksheet or a 30-day tracker. Spacing is in cqw (the scene's width), since % padding on an absolute box would be too. */
function Sheet({ title, sub, kind, className }: { title: string; sub: string; kind: "list" | "grid"; className: string }) {
  return (
    <div className={`absolute flex aspect-[8.5/11] flex-col rounded-[0.3cqw] bg-white p-[1.6cqw] shadow-[0_18px_40px_-18px_rgba(14,23,38,.45),0_0_0_1px_rgba(14,23,38,.06)] ${className}`}>
      <span className="text-[0.62cqw] font-semibold uppercase tracking-[0.14em] text-accent">{sub}</span>
      <span className="mt-[0.3cqw] border-b-[0.15cqw] border-accent pb-[0.6cqw] font-display text-[1.15cqw] font-semibold leading-tight text-ink">{title}</span>
      {kind === "list" ? (
        <>
          {[["Goal", [92, 70]], ["Context", [86, 64, 78]], ["Checklist", null]].map(([h, rows]) => (
            <span key={h as string} className="mt-[1cqw] block">
              <span className="block text-[0.7cqw] font-bold text-ink">{h as string}</span>
              {rows ? (
                <span className="mt-[0.4cqw] grid gap-[0.45cqw]">
                  {(rows as number[]).map((w, i) => <span key={i} className="block h-[0.35cqw] rounded-full bg-ink/10" style={{ width: `${w}%` }} />)}
                </span>
              ) : (
                <span className="mt-[0.4cqw] grid gap-[0.5cqw]">
                  {[80, 62, 74, 56].map((w, i) => (
                    <span key={i} className="flex items-center gap-[0.5cqw]">
                      <span className={`h-[0.75cqw] w-[0.75cqw] shrink-0 rounded-[0.12cqw] border border-ink/30 ${i < 2 ? "border-accent bg-accent" : ""}`} />
                      <span className="block h-[0.35cqw] rounded-full bg-ink/10" style={{ width: `${w}%` }} />
                    </span>
                  ))}
                </span>
              )}
            </span>
          ))}
        </>
      ) : (
        <span className="mt-[1cqw] grid grid-cols-6 gap-[0.3cqw]">
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className={`grid aspect-square place-items-center rounded-[0.2cqw] border text-[0.55cqw] font-semibold ${i < 12 ? "border-accent/40 bg-accent-soft text-accent" : "border-ink/15 text-ink/40"}`}>{i < 12 ? "✓" : i + 1}</span>
          ))}
        </span>
      )}
      <span className="mt-auto flex justify-between pt-[0.6cqw] text-[0.5cqw] text-ink-muted"><span>Kaelis Voss</span><span>Printable</span></span>
    </div>
  );
}

/** Everything the buyer gets, as one picture: ebook, member toolkit, phone and printables. */
export function ProductScene({ line, extraBook, className = "", priority = false, floor = true }: { line: LineId; extraBook?: EbookId; className?: string; priority?: boolean; floor?: boolean }) {
  const c = copy[line];
  return (
    <div className={`relative aspect-[16/9] w-full ${className}`} style={cq} role="img" aria-label={`The ${line === "claude" ? "Claude" : "Copilot"} Advantage: ebook, member toolkit, mobile access and printables`}>
      {floor && <div aria-hidden className="absolute inset-x-[6%] bottom-[2%] h-[8%] rounded-[50%] bg-ink/20 blur-2xl" />}

      {/* The member toolkit in a browser */}
      <div className="absolute left-[21%] top-0 w-[72%] overflow-hidden rounded-[1.2cqw] border border-line bg-white shadow-window">
        <div className="flex items-center gap-[0.5cqw] border-b border-line bg-paper px-[1.4cqw] py-[1cqw]">
          {[0, 1, 2].map((i) => <i key={i} className="block h-[0.8cqw] w-[0.8cqw] rounded-full bg-line-strong" />)}
          <span className="ml-[1cqw] truncate text-[1.05cqw] text-ink-muted">{c.app}</span>
        </div>
        <div className="flex h-[38cqw]">
          <div className="w-[26%] shrink-0 border-r border-line bg-paper p-[1.2cqw]">
            {c.nav.map((n, i) => (
              <span key={n} className={`mb-[0.4cqw] block truncate rounded-[0.5cqw] px-[0.8cqw] py-[0.6cqw] text-[1.05cqw] font-medium ${i === 2 ? "bg-accent text-white" : "text-ink-soft"}`}>{n}</span>
            ))}
          </div>
          <div className="min-w-0 flex-1 p-[1.8cqw]">
            <span className="block text-[0.85cqw] font-semibold uppercase tracking-wider text-ink-muted">Workflow</span>
            <span className="mt-[0.3cqw] block truncate font-display text-[1.7cqw] font-semibold text-ink">{c.title}</span>
            <div className="mt-[1.4cqw] grid gap-[0.8cqw]">
              {c.steps.map((s, i) => (
                <span key={s} className={`flex items-center gap-[1cqw] rounded-[0.6cqw] border px-[1cqw] py-[0.8cqw] text-[1.1cqw] font-medium ${i === 2 ? "border-accent bg-accent-soft/50" : "border-line"}`}>
                  <span className={`grid h-[1.9cqw] w-[1.9cqw] shrink-0 place-items-center rounded-full text-[0.9cqw] font-bold ${i < 2 ? "bg-accent text-white" : "border border-line-strong text-ink-muted"}`}>{i < 2 ? "✓" : i + 1}</span>
                  <span className="truncate text-ink">{s}</span>
                </span>
              ))}
            </div>
            <div className="mt-[1.4cqw] rounded-[0.6cqw] bg-ink p-[1.2cqw] font-mono text-[0.95cqw] leading-relaxed text-white/80">
              <span className="text-white/45">Prompt › </span>{c.prompt}
            </div>
          </div>
        </div>
      </div>

      {/* Printables */}
      <Sheet title={c.sheets[1][0]} sub={c.sheets[1][1]} kind="grid" className="right-[1%] top-[30%] w-[21%] rotate-[5deg]" />
      <Sheet title={c.sheets[0][0]} sub={c.sheets[0][1]} kind="list" className="right-[11%] top-[37%] w-[21%] -rotate-[3deg]" />

      {/* The ebook(s) */}
      {extraBook && (
        <Tablet className="absolute left-[14%] top-[10%] w-[24%] -rotate-[2deg]">
          <Cover book={extraBook} sizes="(min-width: 1024px) 200px, 25vw" />
        </Tablet>
      )}
      <Tablet className="absolute left-0 top-[20%] w-[30%]">
        <Cover book={c.ebook} sizes="(min-width: 1024px) 260px, 30vw" priority={priority} />
      </Tablet>

      {/* Phone */}
      <Phone className="absolute left-[27%] top-[42%] w-[12%]">
        <div className="flex h-full flex-col p-[9%] pt-[20%]">
          <span className="text-[0.75cqw] font-semibold uppercase tracking-wider text-accent">Prompt</span>
          <span className="mt-[6%] block font-display text-[1.15cqw] font-semibold leading-tight text-ink">{c.title}</span>
          <span className="mt-[10%] grid gap-[0.5cqw]">
            {[100, 85, 92, 70, 80].map((w, i) => <span key={i} className="block h-[0.4cqw] rounded-full bg-ink/10" style={{ width: `${w}%` }} />)}
          </span>
          <span className="mt-[12%] grid gap-[0.4cqw]">
            {["Your role", "Your goal"].map((t) => <span key={t} className="rounded-[0.4cqw] border border-line px-[8%] py-[5%] text-[0.7cqw] text-ink-muted">{t}</span>)}
          </span>
          <span className="mt-auto block rounded-[0.6cqw] bg-accent py-[7%] text-center text-[0.8cqw] font-semibold text-white">Copy prompt</span>
        </div>
      </Phone>
    </div>
  );
}
