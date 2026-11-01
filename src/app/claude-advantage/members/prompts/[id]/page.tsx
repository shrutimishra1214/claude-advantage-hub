import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditablePrompt } from "@/components/members/EditablePrompt";
import { PageHead } from "@/components/members/PageHead";
import { claudePromptById, claudePrompts } from "@/lib/claude/advantage";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: claudePromptById((await params).id)?.title ?? "Prompt" };
}

export default async function ClaudePrompt({ params }: Props) {
  const p = claudePromptById((await params).id);
  if (!p) notFound();
  const related = claudePrompts.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  return (
    <article>
      <PageHead back={{ href: "/claude-advantage/members/prompts", label: "Prompt Library" }} eyebrow={`${p.category}${p.fromBook ? " · From the book" : ""}`} title={p.title} />
      <div className="mt-8">
        <EditablePrompt id={p.id} prompt={p.prompt} />
        <p className="mt-2 text-sm text-ink-muted">Replace everything in [brackets] with your context. Press Customize to save your own version.</p>
      </div>
      {related.length > 0 && (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="text-lg">More {p.category.toLowerCase()} prompts</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {related.map((x) => (
              <li key={x.id}><Link href={`/claude-advantage/members/prompts/${x.id}`} className="block rounded-xl border border-line bg-white p-4 font-semibold hover:border-ink/20">{x.title}</Link></li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
