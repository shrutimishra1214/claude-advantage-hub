import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/members/PageHead";
import { CheatSheets as Previews } from "@/components/product/CheatSheets";
import { cheatSheets } from "@/lib/toolkit/learning";

export const metadata: Metadata = { title: "Cheat Sheets" };

export default function CheatSheetsPage() {
  return (
    <>
      <PageHead eyebrow="Cheat sheets" title="Keep it next to your keyboard" lead="One-page references. Open one and print it, or save it as a PDF." />
      <div className="mt-8"><Previews links={cheatSheets.map((c) => `/copilot-advantage/members/cheat-sheets/${c.id}`)} /></div>
      <p className="mt-8 text-sm text-ink-muted">
        Prefer a list? {cheatSheets.map((c, i) => <span key={c.id}>{i > 0 && " · "}<Link className="text-accent hover:underline" href={`/copilot-advantage/members/cheat-sheets/${c.id}`}>{c.title}</Link></span>)}
      </p>
    </>
  );
}
