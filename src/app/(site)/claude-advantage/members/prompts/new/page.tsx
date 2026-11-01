import type { Metadata } from "next";
import { NewPrompt } from "@/components/members/MyPromptPages";
import { PageHead } from "@/components/members/PageHead";
import { claudePromptCategories } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "New prompt" };

export default function ClaudeNewPrompt() {
  return (
    <>
      <PageHead back={{ href: "/claude-advantage/members/prompts", label: "Prompt Library" }} eyebrow="My prompts" title="Add your own prompt" lead="Save the prompts that work for you. Use [brackets] for the parts that change." />
      <div className="mt-8 max-w-3xl"><NewPrompt categories={claudePromptCategories} /></div>
    </>
  );
}
