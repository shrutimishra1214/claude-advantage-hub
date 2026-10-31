import type { Metadata } from "next";
import { NewPrompt } from "@/components/members/MyPromptPages";
import { PageHead } from "@/components/members/PageHead";

export const metadata: Metadata = { title: "New prompt" };

export default function NewPromptPage() {
  return (
    <>
      <PageHead back={{ href: "/members/prompts", label: "Prompt Library" }} eyebrow="My prompts" title="Add your own prompt" lead="Save the prompts that work for you, so you never write them from scratch again. Use [brackets] for the parts that change." />
      <div className="mt-8 max-w-3xl"><NewPrompt /></div>
    </>
  );
}
