import type { Metadata } from "next";
import { BookMeter, ChapterRow } from "@/components/members/BookProgress";
import { PageHead } from "@/components/members/PageHead";
import { chapters, parts } from "@/lib/toolkit/book";

export const metadata: Metadata = { title: "The Book" };

export default function Book() {
  return (
    <>
      <PageHead
        eyebrow="Book companion"
        title="Every chapter, put to work"
        lead="The key idea, the exercises and what good looks like for all 39 chapters. Read a chapter in the book, then come here to do it."
      >
        <BookMeter total={chapters.length} />
      </PageHead>
      <div className="mt-10 grid gap-12">
        {parts.map((p) => (
          <section key={p.n}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Part {p.n} · {p.title}</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {p.chapters.map((c) => <li key={c.n}><ChapterRow c={c} /></li>)}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
