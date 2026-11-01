import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { EditablePrompt } from "@/components/members/EditablePrompt";
import { contextTemplates, projectTypes } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "Context Kit" };

export default function ContextKit() {
  return (
    <>
      <PageHead eyebrow="Chapter 3 · Context is everything" title="Your Context Kit" lead="Write these once and Claude starts every session like a senior colleague who knows your work. Customize each template and it's saved to your library." />
      <div className="mt-10 grid gap-10">
        {contextTemplates.map((t) => (
          <section key={t.id} id={t.id} className="scroll-mt-32">
            <h2 className="text-2xl">{t.title}</h2>
            <p className="mt-1 max-w-2xl text-ink-muted">{t.use}</p>
            <div className="mt-4"><EditablePrompt id={`context:${t.id}`} prompt={t.body} label="Template" /></div>
          </section>
        ))}
        <section>
          <h2 className="text-2xl">Six Projects worth setting up</h2>
          <p className="mt-1 text-ink-muted">Start with one. Each gets its own Project Instructions.</p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {projectTypes.map((p, i) => (
              <li key={p.title} className="rounded-xl border border-line bg-white p-5">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <p className="mt-1 font-semibold">{p.title} Project</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
