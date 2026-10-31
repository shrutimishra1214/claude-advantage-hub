import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { EditablePrompt } from "@/components/members/EditablePrompt";
import { bookPrompts } from "@/lib/toolkit/method";

export const metadata: Metadata = { title: "The Book's Prompt Library" };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Library() {
  const total = bookPrompts.reduce((n, c) => n + c.prompts.length, 0);
  return (
    <>
      <PageHead
        eyebrow="Chapter 35 · The Prompt Library"
        title="The book's named prompts, ready to use"
        lead={`${total} prompts across seven functions, each with what it's for, the expert upgrade, and a version you can copy. Adapt, never copy blindly: fill every [slot] with your task's reality.`}
      />
      <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
        {bookPrompts.map((c) => <a key={c.category} href={`#${slug(c.category)}`} className="chip">{c.category}</a>)}
      </nav>
      <div className="mt-10 grid gap-12">
        {bookPrompts.map((c, ci) => (
          <section key={c.category} id={slug(c.category)} className="scroll-mt-32">
            <h2 className="text-2xl"><span className="text-accent">{ci + 1} ·</span> {c.category}</h2>
            <p className="mt-1 text-ink-muted">{c.blurb}</p>
            <div className="mt-5 grid gap-4">
              {c.prompts.map((p) => (
                <div key={p.name} className="rounded-xl border border-line p-5">
                  <h3 className="text-lg">{p.name}</h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">{p.for}</p>
                  <div className="mt-4"><EditablePrompt id={`book:${slug(p.name)}`} prompt={p.template} /></div>
                  <p className="mt-3 text-sm text-ink-muted"><strong className="text-ink">Expert upgrade:</strong> {p.upgrade}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
