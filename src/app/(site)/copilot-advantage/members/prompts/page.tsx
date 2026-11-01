import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { RecipeBrowser } from "@/components/members/RecipeBrowser";
import { recipes } from "@/lib/toolkit/recipes";

export const metadata: Metadata = { title: "Prompt Library" };

export default function Prompts() {
  return (
    <>
      <PageHead eyebrow="Prompt Recipe Library" title="Prompts organized around real work" lead="Find a recipe, make it yours with Customize, or add the prompts that already work for you. Everything you change is kept in My prompts." />
      <div className="mt-8"><RecipeBrowser recipes={recipes} /></div>
    </>
  );
}
