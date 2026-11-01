import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { PromptBuilder } from "@/components/product/PromptBuilder";

export const metadata: Metadata = { title: "Prompt Builder" };

export default function Builder() {
  return (
    <>
      <PageHead eyebrow="Prompt Builder" title="Build the right prompt in seconds" lead="Choose four things, add what it's about, and copy a complete Goal, Context, Source, Expectations prompt." />
      <div className="mt-8"><PromptBuilder /></div>
    </>
  );
}
