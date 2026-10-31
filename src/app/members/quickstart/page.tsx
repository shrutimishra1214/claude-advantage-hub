import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { LessonDone } from "@/components/members/LessonDone";
import { PageHead } from "@/components/members/PageHead";
import { PromptBlock } from "@/components/members/PromptBlock";
import { quickstart } from "@/lib/toolkit/learning";

export const metadata: Metadata = { title: "Quickstart" };

export default function Quickstart() {
  const total = quickstart.reduce((s, l) => s + l.minutes, 0);
  return (
    <>
      <PageHead eyebrow="Copilot Quickstart" title="Start using Copilot with confidence" lead={`From your first prompt to your first useful workflow, in ${total} minutes.`} />
      <ol className="mt-8 grid gap-6">
        {quickstart.map((l, i) => (
          <li key={l.id} id={l.id} className="scroll-mt-32 rounded-xl border border-line p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")} · {l.minutes} min</p>
                <h2 className="mt-1 text-2xl">{l.title}</h2>
              </div>
              <LessonDone id={l.id} />
            </div>
            <div className="mt-4 grid max-w-2xl gap-3 leading-relaxed text-ink-soft">
              {l.body.map((b) => <p key={b}>{b}</p>)}
            </div>
            {l.tryThis && <div className="mt-5"><PromptBlock label="Try this now" text={l.tryThis} /></div>}
            {l.id === "first-workflow" && (
              <Link href="/members/workflows/email-to-action" className="btn-primary mt-5 !py-3">Open Email → Action <Icon.arrow className="btn-arrow h-4 w-4" /></Link>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
