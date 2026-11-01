import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { glossary } from "@/lib/toolkit/method";

export const metadata: Metadata = { title: "Glossary" };

export default function Glossary() {
  return (
    <>
      <PageHead eyebrow="Appendix B" title="The Copilot vocabulary" lead="The words that recur through the book, defined in one place." />
      <dl className="mt-8 grid gap-x-10 md:grid-cols-2">
        {glossary.map(([term, def]) => (
          <div key={term} className="border-b border-line py-4">
            <dt className="font-semibold">{term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{def}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
