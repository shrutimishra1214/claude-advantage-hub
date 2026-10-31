import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/members/PrintButton";
import { cheatSheets, days, type CheatSheet } from "@/lib/toolkit/learning";
import { recipes } from "@/lib/toolkit/recipes";
import { site } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: cheatSheets.find((c) => c.id === id)?.title ?? "Cheat sheet" };
}

// "25 best prompts" is built from the recipe library so the two never drift apart.
function sectionsFor(sheet: CheatSheet): CheatSheet["sections"] {
  if (sheet.id !== "best-25") return sheet.sections;
  const picks = recipes.slice(0, 25);
  return [
    { heading: "Prompts 1–13", items: picks.slice(0, 13).map((r) => `${r.title}: ${r.prompt}`) },
    { heading: "Prompts 14–25", items: picks.slice(13).map((r) => `${r.title}: ${r.prompt}`) },
  ];
}

export default async function Sheet({ params }: Props) {
  const { id } = await params;
  const sheet = cheatSheets.find((c) => c.id === id);
  if (!sheet) notFound();
  const sections = sectionsFor(sheet);

  return (
    <article>
      <div className="no-print mb-6 flex items-center justify-between gap-4">
        <Link href="/members/cheat-sheets" className="text-sm font-medium text-ink-muted hover:text-ink">← Cheat Sheets</Link>
        <PrintButton />
      </div>
      <div className="print-sheet mx-auto max-w-[800px] rounded-lg border border-line bg-white p-8 shadow-soft md:p-12">
        <div className="flex items-center justify-between border-b-2 border-ink pb-3">
          <h1 className="text-2xl md:text-3xl">{sheet.title}</h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">Copilot Advantage</span>
        </div>

        {sheet.id === "tracker" ? (
          <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {days.map((d) => (
              <li key={d.day} className="flex items-start gap-2 rounded border border-line p-2 text-xs">
                <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border border-ink/40" />
                <span><b>Day {d.day}</b> · {d.title}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className={`mt-6 grid gap-x-10 gap-y-6 ${sheet.id === "best-25" ? "" : "sm:grid-cols-2"}`}>
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-accent">{s.heading}</h2>
                <ul className="mt-2 grid gap-1.5 text-[13.5px] leading-snug">
                  {s.items.map((it) => <li key={it} className="flex gap-2"><span className="text-accent">›</span><span>{it}</span></li>)}
                </ul>
              </section>
            ))}
          </div>
        )}
        <p className="mt-8 border-t border-line pt-3 text-[10px] text-ink-muted">{site.productName} · Replace anything in [brackets] before sending. Always check facts and numbers.</p>
      </div>
    </article>
  );
}
