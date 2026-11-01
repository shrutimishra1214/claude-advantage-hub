import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/members/PageHead";
import { EditablePrompt } from "@/components/members/EditablePrompt";
import { PromptBlock } from "@/components/members/PromptBlock";
import { SaveButton } from "@/components/members/RecipeBrowser";
import { AppChip } from "@/components/product/AppChip";
import { recipeById, recipes } from "@/lib/toolkit/recipes";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: recipeById((await params).id)?.title ?? "Recipe" };
}

export default async function RecipePage({ params }: Props) {
  const r = recipeById((await params).id);
  if (!r) notFound();
  const related = recipes.filter((x) => x.category === r.category && x.id !== r.id).slice(0, 3);

  return (
    <article>
      <PageHead back={{ href: "/copilot-advantage/members/prompts", label: "Prompt Library" }} eyebrow={r.category} title={r.title} lead={r.goal}>
        <SaveButton id={r.id} />
      </PageHead>

      <div className="mt-8 grid gap-8">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">App</dt><dd className="mt-1.5"><AppChip app={r.app} /></dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">When to use it</dt><dd className="mt-1 leading-relaxed">{r.when}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">What to provide Copilot</dt><dd className="mt-1 leading-relaxed">{r.provide}</dd></div>
        </dl>

        <div>
          <EditablePrompt id={r.id} prompt={r.prompt} followUp={r.followUp} />
          <p className="mt-2 text-sm text-ink-muted">Replace anything in [brackets] before sending, or press Customize to save your own version.</p>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-line p-5"><dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Expected output</dt><dd className="mt-1.5 leading-relaxed">{r.expected}</dd></div>
          <div className="rounded-xl border border-line p-5"><dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Example</dt><dd className="mt-1.5 leading-relaxed">{r.example}</dd></div>
        </dl>

        <PromptBlock label="Advanced version: add this" text={r.advanced} dark={false} />

        {related.length > 0 && (
          <section className="border-t border-line pt-8">
            <h2 className="text-lg">More {r.category.toLowerCase()} recipes</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {related.map((x) => (
                <li key={x.id}>
                  <Link href={`/copilot-advantage/members/prompts/${x.id}`} className="block h-full rounded-xl border border-line p-4 transition hover:border-ink/20 hover:shadow-lift">
                    <span className="font-semibold">{x.title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{x.goal}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
