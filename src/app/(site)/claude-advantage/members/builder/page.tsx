import type { Metadata } from "next";
import { BriefBuilder } from "@/components/members/BriefBuilder";
import { PageHead } from "@/components/members/PageHead";

export const metadata: Metadata = { title: "Prompt Builder" };

export default function ClaudeBuilder() {
  return (
    <>
      <PageHead eyebrow="Chapter 2 · The anatomy of a high-performance prompt" title="Build the prompt in five parts" lead="Role, Context, Task, Format, Constraints. Fill the parts, add a multiplier, copy the prompt." />
      <div className="mt-8"><BriefBuilder /></div>
    </>
  );
}
