import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { WorksheetSections } from "@/components/members/WorksheetSections";

export const metadata: Metadata = { title: "Worksheets" };

export default function ClaudeWorksheets() {
  return (
    <>
      <PageHead eyebrow="Worksheets" title="Measure, then verify" lead="Audit where your time goes before you start, and check work in proportion to the stakes. Saved in this browser." />
      <WorksheetSections only={["time-audit", "verification"]} />
    </>
  );
}
