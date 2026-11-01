import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { QuickWins } from "@/components/members/Trackers";

export const metadata: Metadata = { title: "12 Quick Wins" };

export default function QuickWinsPage() {
  return (
    <>
      <PageHead eyebrow="Before you begin" title="12 quick wins" lead="Each pays off the first time you try it and costs almost nothing to learn. Do one tomorrow; tick it off when you have." />
      <div className="mt-8"><QuickWins /></div>
      <p className="mt-8 rounded-xl border border-line bg-paper p-5 text-sm leading-relaxed text-ink-soft">
        <strong className="text-ink">The habit behind the wins:</strong> none is a trick, and each turns a repeated task into a repeatable one. Pick one, run it for a week, and the rest will start to feel obvious.
      </p>
    </>
  );
}
