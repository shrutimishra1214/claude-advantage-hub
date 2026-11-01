import type { Metadata } from "next";
import { MyPrompt } from "@/components/members/MyPromptPages";
import { claudePromptCategories } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "My prompt" };

export default async function ClaudeMyPrompt({ params }: { params: Promise<{ id: string }> }) {
  return <MyPrompt id={(await params).id} categories={claudePromptCategories} />;
}
