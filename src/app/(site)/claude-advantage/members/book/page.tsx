import type { Metadata } from "next";
import Link from "next/link";
import { DoneCount } from "@/components/members/ClaudeMembers";
import { PageHead } from "@/components/members/PageHead";
import { advChapters, advParts } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "The Book" };

export default function ClaudeBook() {
  return (
    <>
      <PageHead eyebrow="The Claude Advantage · Book companion" title="Every chapter, put to work" lead="The key idea, what's inside and three actions for each of the 17 chapters. Read a chapter, then come here to do it.">
        <DoneCount ids={advChapters.flatMap((c) => c.actions.map((_, i) => `adv-${c.n}-${i}`))} label="actions done" />
      </PageHead>
      <div className="mt-10 grid gap-12">
        {advParts.map((part, pi) => (
          <section key={part}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Part {pi + 1} · {part}</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {advChapters.filter((c) => c.part === part).map((c) => (
                <li key={c.n}>
                  <Link href={`/claude-advantage/members/book/${c.n}`} className="flex h-full gap-4 rounded-xl border border-line bg-white p-4 transition hover:border-ink/20 hover:shadow-lift">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-sm text-ink-muted">{c.n}</span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{c.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{c.keyIdea}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
