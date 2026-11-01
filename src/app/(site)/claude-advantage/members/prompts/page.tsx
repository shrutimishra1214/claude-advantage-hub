import type { Metadata } from "next";
import { ClaudePromptBrowser } from "@/components/members/ClaudeMembers";
import { Locked } from "@/components/members/Locked";
import { PageHead } from "@/components/members/PageHead";
import { claudeAccess } from "@/lib/claude/access";
import { claudePromptCategories, claudePrompts } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "Prompt Library" };

export default async function ClaudePrompts() {
  const { system } = await claudeAccess();
  if (!system) return <Locked what="The Prompt Library" body="It's part of The Claude Advantage™ Complete." href="/claude-advantage#pricing" />;
  return (
    <>
      <PageHead eyebrow="Prompt Library" title="High-performance prompts, ready to make yours" lead="The book's Master Prompt Library and the System's prompts for Projects, Claude Code, Cowork and Design. Customize any prompt, or add your own." />
      <div className="mt-8"><ClaudePromptBrowser prompts={claudePrompts} categories={claudePromptCategories} /></div>
    </>
  );
}
