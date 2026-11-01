import type { Metadata } from "next";
import { Challenge } from "@/components/members/Challenge";
import { PageHead } from "@/components/members/PageHead";

export const metadata: Metadata = { title: "30-Day Challenge" };

export default function ChallengePage() {
  return (
    <>
      <PageHead eyebrow="30-Day Copilot Transformation" title="Build the habit, one day at a time" lead="Each day takes 10–20 minutes on real work. Tick it off when you're done; your progress is saved in this browser." />
      <div className="mt-8"><Challenge /></div>
    </>
  );
}
