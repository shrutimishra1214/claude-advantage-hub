import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { ChapterDone, YourTurn } from "@/components/members/BookProgress";
import { chapterByN, chapters, splitMistakes } from "@/lib/toolkit/book";

type Props = { params: Promise<{ n: string }> };

// Where to go in the member area to practise each chapter.
const tools: Record<number, { href: string; label: string }[]> = {
  1: [{ href: "/members/worksheets#time-audit", label: "Time Audit worksheet" }],
  3: [{ href: "/members/method#anchors", label: "The three anchors, with prompts" }],
  5: [{ href: "/members/worksheets#business-case", label: "Business Case calculator" }],
  7: [{ href: "/members/method#five-parts", label: "The five-part brief" }, { href: "/members/builder", label: "Prompt Builder" }],
  8: [{ href: "/members/method#shapes", label: "The six shapes, as templates" }],
  9: [{ href: "/members/method#fix", label: "Fix a bad answer" }],
  10: [{ href: "/members/workflows/notes-to-brief", label: "Notes → Executive Brief workflow" }],
  11: [{ href: "/members/prompts/summarize-report", label: "Summarize a long report" }],
  12: [{ href: "/members/workflows/data-to-decision", label: "Data → Decision workflow" }],
  13: [{ href: "/members/library#analysis-data", label: "Analysis prompts from the book" }],
  14: [{ href: "/members/workflows/doc-to-deck", label: "Document → Presentation workflow" }],
  16: [{ href: "/members/method#triage", label: "The five-way triage" }, { href: "/members/workflows/inbox-zero-hour", label: "Inbox Reset workflow" }],
  17: [{ href: "/members/workflows/meeting-prep-pack", label: "Meeting Prep Pack workflow" }],
  18: [{ href: "/members/worksheets#meeting-to-action", label: "Meeting-to-Action checklist" }, { href: "/members/workflows/meeting-action-plan", label: "Meeting → Action Plan workflow" }],
  19: [{ href: "/members/library#meetings-communication", label: "The Decision Hunt prompt" }],
  32: [{ href: "/members/method#safe-use", label: "The five safe-use decisions" }],
  34: [{ href: "/members/worksheets#verification", label: "Verification checklist" }, { href: "/members/method#verify", label: "The verification ladder" }],
  35: [{ href: "/members/library", label: "The book's Prompt Library, ready to use" }],
  36: [{ href: "/members/workflows", label: "Workflow Vault" }],
  38: [{ href: "/members/plan", label: "90-Day Plan tracker" }],
  39: [{ href: "/members/troubleshooting", label: "Troubleshooting" }, { href: "/members/glossary", label: "Glossary" }],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = chapterByN(Number((await params).n));
  return { title: c ? `Ch ${c.n}: ${c.title}` : "Chapter" };
}

function Boxes({ title, text }: { title: string; text: string }) {
  const items = title === "Common mistakes" ? splitMistakes(text) : text ? [{ lead: "", body: text }] : [];
  if (!items.length) return null;
  return (
    <section className="rounded-xl border border-line p-6">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">{title}</h2>
      <ul className="mt-4 grid gap-4">
        {items.map((it, i) => (
          <li key={i} className="leading-relaxed text-ink-soft">
            {it.lead && <strong className="text-ink">{it.lead} </strong>}{it.body}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ChapterPage({ params }: Props) {
  const c = chapterByN(Number((await params).n));
  if (!c) notFound();
  const i = chapters.indexOf(c);
  const prev = chapters[i - 1];
  const next = chapters[i + 1];

  return (
    <article>
      <Link href="/members/book" className="text-sm font-medium text-ink-muted hover:text-ink">← The Book</Link>
      <p className="eyebrow mt-4">Part {c.part} · {c.partTitle}</p>
      <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h1 className="text-3xl md:text-4xl"><span className="text-ink-muted">{c.n}.</span> {c.title}</h1>
        <ChapterDone n={c.n} />
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
        <span>Read · {c.read}</span><span>Level · {c.level}</span><span>Apps · {c.apps}</span>
      </p>

      <blockquote className="mt-8 rounded-xl bg-ink p-6 text-white md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Key idea</p>
        <p className="mt-2 font-display text-2xl font-semibold leading-snug md:text-3xl">{c.keyIdea}</p>
      </blockquote>

      {c.able.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">You&apos;ll be able to</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {c.able.map((a) => <li key={a} className="flex gap-2 rounded-lg border border-line p-3 text-sm"><Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{a.charAt(0).toUpperCase() + a.slice(1)}</li>)}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl">Your turn</h2>
        <p className="mt-1 text-sm text-ink-muted">Do these on real work this week. Tick each one off when it meets the bar.</p>
        <div className="mt-4"><YourTurn n={c.n} steps={c.yourTurn} /></div>
      </section>

      {tools[c.n] && (
        <section className="mt-8 rounded-xl border border-accent/30 bg-accent-soft/40 p-5">
          <p className="text-sm font-semibold">Tools for this chapter</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {tools[c.n].map((t) => <li key={t.href}><Link href={t.href} className="link-arrow text-sm">{t.label} <Icon.arrow className="btn-arrow h-4 w-4" /></Link></li>)}
          </ul>
        </section>
      )}

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Boxes title="Common mistakes" text={c.mistakes} />
        <Boxes title="Pro tips" text={c.tips} />
      </div>

      <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Chapters">
        {prev ? <Link href={`/members/book/${prev.n}`} className="rounded-xl border border-line p-4 hover:border-ink/20"><span className="text-xs text-ink-muted">← Chapter {prev.n}</span><span className="block font-semibold">{prev.title}</span></Link> : <span />}
        {next && <Link href={`/members/book/${next.n}`} className="rounded-xl border border-line p-4 text-right hover:border-ink/20"><span className="text-xs text-ink-muted">Chapter {next.n} →</span><span className="block font-semibold">{next.title}</span></Link>}
      </nav>
    </article>
  );
}
