import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { ClaudeHomeProgress } from "@/components/members/ClaudeMembers";
import { advChapters, chains, claudePrompts, systemWorkflows } from "@/lib/claude/advantage";
import { claudeAccess } from "@/lib/claude/access";
import { opSkills, opWorkflows } from "@/lib/claude/operator";
import { claudeDays } from "@/lib/claude/transformation";

export const metadata: Metadata = { title: { absolute: "Member area · The Claude Advantage" } };

const M = "/claude-advantage/members";

export default async function ClaudeHome() {
  const { member, operator } = await claudeAccess();
  const first = member?.name.split(" ")[0];
  const modules = [
    { href: `${M}/prompts`, icon: "book", title: "Prompt Library", meta: `${claudePrompts.length} prompts, plus your own` },
    { href: `${M}/workflows`, icon: "flow", title: "Workflow Vault", meta: `${chains.length + systemWorkflows.length} workflows and chains` },
    { href: `${M}/context`, icon: "user", title: "Context Kit", meta: "Brief, Company Brain, Style Guide, Projects" },
    { href: `${M}/book`, icon: "pages", title: "The Book", meta: `${advChapters.length} chapters, put to work` },
    { href: `${M}/builder`, icon: "wand", title: "Prompt Builder", meta: "Role, Context, Task, Format, Constraints" },
    { href: `${M}/operator/skills`, icon: "layers", title: "Skills Library", meta: `${opSkills.length} ready-to-install skills · Operator` },
    { href: `${M}/operator/workflows`, icon: "refresh", title: "Operator Workflows", meta: `${opWorkflows.length} ready-to-run workflows · Operator` },
    { href: `${M}/roadmap`, icon: "clock", title: "90-Day Roadmap", meta: "Foundation, integration, team" },
  ] as const;
  return (
    <div className="grid gap-10">
      <header>
        <p className="text-sm text-ink-muted">{first ? `Welcome back, ${first}` : "Welcome"}</p>
        <h1 className="mt-1 text-3xl md:text-4xl">Stop chatting with Claude. Start working with it.</h1>
      </header>
      <ClaudeHomeProgress chapters={advChapters} days={claudeDays} operatorOpen={operator} />
      <section>
        <h2 className="text-lg">Your system</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => {
            const I = Icon[m.icon];
            return (
              <li key={m.href}>
                <Link href={m.href} className="flex h-full flex-col rounded-xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift">
                  <I className="h-5 w-5 text-accent" />
                  <span className="mt-3 font-semibold">{m.title}</span>
                  <span className="mt-0.5 text-sm text-ink-muted">{m.meta}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="rounded-xl border border-line bg-paper p-6">
        <h2 className="text-lg">Claude is powerful. Your workflow decides how much value you get from it.</h2>
        <ol className="mt-4 grid gap-3 text-ink-soft md:grid-cols-3">
          {["Build your Context Kit once: every session starts briefed.", "Do one day of the 30-Day Transformation each workday.", "Turn what you repeat into chains, then skills."].map((s, i) => (
            <li key={s} className="flex gap-3"><span className="font-mono text-sm text-accent">0{i + 1}</span>{s}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
