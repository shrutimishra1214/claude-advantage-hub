import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { claudeGlossary } from "@/lib/claude/advantage";
import { operatorGlossary } from "@/lib/claude/operator";

export const metadata: Metadata = { title: "Glossary" };

export default function ClaudeGlossary() {
  const terms = [...claudeGlossary, ...operatorGlossary].sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <>
      <PageHead eyebrow="Glossary" title="The vocabulary of working with Claude" lead="Terms from The Claude Advantage and The Claude Operator, in plain English." />
      <dl className="mt-8 grid gap-x-10 md:grid-cols-2">
        {terms.map(([t, d]) => (
          <div key={t} className="border-b border-line py-4">
            <dt className="font-semibold">{t}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{d}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
