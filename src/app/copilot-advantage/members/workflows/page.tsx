import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHead } from "@/components/members/PageHead";
import { AppTile } from "@/components/product/AppChip";
import { workflowCategories } from "@/lib/system";
import { workflows } from "@/lib/toolkit/workflows";

export const metadata: Metadata = { title: "Workflow Vault" };

export default function Workflows() {
  const groups = workflowCategories.map((c) => ({ c, items: workflows.filter((w) => w.category === c) })).filter((g) => g.items.length);
  return (
    <>
      <PageHead eyebrow="Copilot Workflow Vault" title="Repeatable workflows" lead="A prompt helps you do one thing. A workflow helps you get the whole job done. Pick one, run it on real work, and tick off each step." />
      <div className="mt-8 grid gap-10">
        {groups.map((g) => (
          <section key={g.c}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">{g.c}</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {g.items.map((w) => (
                <li key={w.id}>
                  <Link href={`/copilot-advantage/members/workflows/${w.id}`} className="flex h-full flex-col rounded-xl border border-line p-5 transition hover:border-ink/20 hover:shadow-lift">
                    <span className="font-semibold">{w.title}</span>
                    <span className="mt-1 text-sm leading-relaxed text-ink-muted">{w.outcome}</span>
                    <span className="mt-4 flex items-center gap-1">
                      {w.steps.map((s, i) => (
                        <span key={i} className="flex items-center gap-1">
                          {i > 0 && <Icon.arrow className="h-3 w-3 text-ink-muted/60" />}
                          <AppTile app={s.app} className="h-6 w-6 text-[10px]" />
                        </span>
                      ))}
                      <span className="ml-auto text-xs text-ink-muted">~{w.minutes} min</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
