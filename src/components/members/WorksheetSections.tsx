import type { ReactNode } from "react";
import { BusinessCase, FailureLog, MeetingChecklist, TimeAudit, VerificationChecklist } from "./Worksheets";

const worksheets: { id: string; ch: string; title: string; lead: string; body: ReactNode }[] = [
  { id: "time-audit", ch: "Chapter 1", title: "Time Audit", lead: "For five workdays, note every recurring task that takes 30 minutes or more. Circle the three most repetitive: these are what you rebuild first.", body: <TimeAudit /> },
  { id: "business-case", ch: "Chapter 5", title: "Business Case", lead: "Hours saved times your rate, against the license. Walk in with the one number almost nobody in the room will have computed.", body: <BusinessCase /> },
  { id: "verification", ch: "Chapter 34", title: "Verification Checklist", lead: "Pick where the output is going; the checklist matches the depth of checking to the cost of being wrong.", body: <VerificationChecklist /> },
  { id: "meeting-to-action", ch: "Chapters 17–18", title: "Meeting-to-Action Checklist", lead: "The before, the during and the warm fifteen minutes after, so every meeting ends in owners, dates and a sent follow-up.", body: <MeetingChecklist /> },
  { id: "failure-log", ch: "Chapter 9", title: "Failure Log", lead: "One line per bad answer, tagged with its layer. After two weeks, the pattern tells you what to fix.", body: <FailureLog /> },
];

/** The book's worksheets, shared by the member area and the public book companion. */
export function WorksheetSections({ only }: { only?: string[] } = {}) {
  const list = only ? worksheets.filter((w) => only.includes(w.id)) : worksheets;
  return (
    <>
      <nav aria-label="Worksheets" className="mt-6 flex flex-wrap gap-2">
        {list.map((w) => <a key={w.id} href={`#${w.id}`} className="chip">{w.title}</a>)}
      </nav>
      <div className="mt-10 grid gap-12">
        {list.map((w) => (
          <section key={w.id} id={w.id} className="min-w-0 scroll-mt-32 rounded-xl border border-line p-5 md:p-8">
            <p className="font-mono text-xs text-accent">{w.ch}</p>
            <h2 className="mt-1 text-2xl">{w.title}</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{w.lead}</p>
            <div className="mt-6">{w.body}</div>
          </section>
        ))}
      </div>
    </>
  );
}
