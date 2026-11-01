import type { Metadata } from "next";
import { PageHead } from "@/components/members/PageHead";
import { Troubleshooter } from "@/components/members/Trackers";
import { firstThree } from "@/lib/toolkit/method";

export const metadata: Metadata = { title: "Troubleshooting" };

export default function Troubleshooting() {
  return (
    <>
      <PageHead eyebrow="Appendix A" title="Troubleshooting" lead="Most of the time Copilot is not broken; it is unlicensed, switched off, ungrounded, or in the wrong mode." />
      <section className="mt-8 rounded-xl bg-ink p-6 text-white">
        <p className="text-sm font-semibold text-white/70">Ask these three first</p>
        <ol className="mt-3 grid gap-2 md:grid-cols-3">{firstThree.map((q, i) => <li key={q} className="flex gap-3"><span className="font-mono text-white/50">{i + 1}</span>{q}</li>)}</ol>
      </section>
      <div className="mt-8"><Troubleshooter /></div>
      <p className="mt-8 text-sm text-ink-muted">Settings and menus move. Confirm current behavior on Microsoft&apos;s official support pages.</p>
    </>
  );
}
