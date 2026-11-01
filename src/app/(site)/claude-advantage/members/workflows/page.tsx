import type { Metadata } from "next";
import Link from "next/link";
import { Locked } from "@/components/members/Locked";
import { PageHead } from "@/components/members/PageHead";
import { claudeAccess } from "@/lib/claude/access";
import { chains, systemWorkflows, type Chain } from "@/lib/claude/advantage";

export const metadata: Metadata = { title: "Workflow Vault" };

function Card({ c }: { c: Chain }) {
  return (
    <Link href={`/claude-advantage/members/workflows/${c.id}`} className="flex h-full flex-col rounded-xl border border-line bg-white p-5 transition hover:border-ink/20 hover:shadow-lift">
      <span className="font-semibold">{c.title}</span>
      <span className="mt-1 text-sm text-ink-muted">{c.output}</span>
      <span className="mt-4 flex flex-wrap items-center gap-1 text-[11px] font-medium text-ink-soft">
        {c.steps.map((s, i) => <span key={s.name} className="flex items-center gap-1">{i > 0 && <span className="text-ink-muted">→</span>}<span className="rounded border border-line bg-paper px-1.5 py-0.5">{s.name}</span></span>)}
      </span>
    </Link>
  );
}

export default async function ClaudeWorkflows() {
  const { system } = await claudeAccess();
  if (!system) return <Locked what="The Workflow Vault" body="It's part of The Claude Advantage™ Complete." href="/claude-advantage#pricing" />;
  return (
    <>
      <PageHead eyebrow="Workflow Vault" title="Chains that turn one prompt into a finished job" lead="Each workflow passes one step's output into the next. Run it on real work, then adapt the prompts to your context." />
      <section className="mt-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">Research, Projects, Code, Cowork and Design</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">{systemWorkflows.map((c) => <li key={c.id}><Card c={c} /></li>)}</ul>
      </section>
      <section className="mt-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">From the book · Chapter 7 chains and blueprints</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">{chains.map((c) => <li key={c.id}><Card c={c} /></li>)}</ul>
      </section>
      <p className="mt-10 text-sm text-ink-muted">Going further? The Operator track adds <Link className="font-semibold text-accent" href="/claude-advantage/members/operator/workflows">25 ready-to-run Operator workflows</Link>.</p>
    </>
  );
}
