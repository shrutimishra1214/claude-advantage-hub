import type { Metadata } from "next";
import { Challenge } from "@/components/members/Challenge";
import { PageHead } from "@/components/members/PageHead";
import { claudeDays, claudeWeekTitles } from "@/lib/claude/transformation";

export const metadata: Metadata = { title: "30-Day Transformation" };

export default function ClaudeChallenge() {
  return (
    <>
      <PageHead eyebrow="30-Day Claude Transformation" title="From Claude user to AI-enabled professional" lead="One task a day, 10–30 minutes, on real work. Tick it off when you're done." />
      <div className="mt-8"><Challenge days={claudeDays} weekTitles={claudeWeekTitles} /></div>
    </>
  );
}
