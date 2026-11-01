import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { WorksheetSections } from "@/components/members/WorksheetSections";

export const metadata: Metadata = { title: "Worksheets" };

export default function Worksheets() {
  return (
    <>
      <PageHead eyebrow="Worksheets" title="Fill them in on screen" lead="The book's worksheets, working. What you enter is saved in this browser." />
      <WorksheetSections />
    </>
  );
}
