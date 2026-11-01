import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { TemplateBrowser } from "@/components/members/TemplateBrowser";
import { templates } from "@/lib/toolkit/templates";

export const metadata: Metadata = { title: "Templates" };

export default function Templates() {
  return (
    <>
      <PageHead eyebrow="Template Vault" title="Stop starting from a blank page" lead="Copy the structure into a new document, sheet, deck or email, then use the prompt to have Copilot fill it from your sources." />
      <div className="mt-8"><TemplateBrowser templates={templates} /></div>
    </>
  );
}
