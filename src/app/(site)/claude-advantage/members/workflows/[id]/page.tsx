import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/members/PageHead";
import { PromptBlock } from "@/components/members/PromptBlock";
import { chains, systemWorkflows } from "@/lib/claude/advantage";

type Props = { params: Promise<{ id: string }> };
const all = [...systemWorkflows, ...chains];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: all.find((c) => c.id === id)?.title ?? "Workflow" };
}

export default async function ClaudeWorkflow({ params }: Props) {
  const { id } = await params;
  const c = all.find((x) => x.id === id);
  if (!c) notFound();
  return (
    <article>
      <PageHead back={{ href: "/claude-advantage/members/workflows", label: "Workflow Vault" }} eyebrow={c.fromBook ? "From the book · Chapter 7" : "The Claude Advantage System"} title={c.title} lead={c.output} />
      <p className="mt-6 rounded-lg border border-line bg-paper px-4 py-3 text-sm"><strong>Input:</strong> {c.input}</p>
      <ol className="relative mt-8 grid gap-4">
        <span aria-hidden className="absolute bottom-8 left-5 top-8 w-px bg-line-strong" />
        {c.steps.map((s, i) => (
          <li key={s.name} className="relative flex gap-4">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm text-white ring-4 ring-canvas">{i + 1}</span>
            <div className="min-w-0 flex-1 rounded-xl border border-line bg-white p-5">
              <h3 className="text-lg">{s.name}</h3>
              {s.prompt ? <div className="mt-3"><PromptBlock label="Prompt" text={s.prompt} /></div> : <p className="mt-1 text-sm text-ink-muted">Write this step's prompt in your own words, using Role, Context, Task, Format and Constraints.</p>}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 rounded-xl border border-accent/30 bg-accent-soft/40 p-4 text-sm"><strong>Output:</strong> {c.output}</p>
    </article>
  );
}
