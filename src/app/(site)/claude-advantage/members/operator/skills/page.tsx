import type { Metadata } from "next";
import Link from "next/link";
import { SkillActions } from "@/components/members/ClaudeMembers";
import { Locked } from "@/components/members/Locked";
import { PageHead } from "@/components/members/PageHead";
import { claudeAccess } from "@/lib/claude/access";
import { opSkills } from "@/lib/claude/operator";

export const metadata: Metadata = { title: "Skills Library" };

export default async function SkillsLibrary() {
  const { operator } = await claudeAccess();
  if (!operator) return <Locked what="The Skills Library" body="Every Skill Drop from The Claude Operator, ready to install, is part of the advanced level." href="/claude-advantage#pricing" />;
  return (
    <>
      <PageHead eyebrow="The Claude Operator · Skills Library" title="Your AI workforce, ready to install" lead="Every Skill Drop from the book. Download a SKILL.md, put it in its own folder, zip the folder and upload it in Claude's Skills settings. Test each one before you rely on it." />
      <ul className="mt-8 grid gap-4">
        {opSkills.filter((s) => s.skill).map((s) => (
          <li key={s.n} id={`skill-${s.n}`} className="scroll-mt-32 rounded-xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-accent">Skill #{s.n} · <Link href={`/claude-advantage/members/operator/${s.chapter}`} className="hover:underline">Chapter {s.chapter}</Link></p>
                <h2 className="mt-1 text-xl">{s.name}</h2>
              </div>
            </div>
            {s.intro && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.intro}</p>}
            <details className="mt-3 rounded-lg bg-ink text-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                Show SKILL.md <SkillActions name={s.name} text={s.skill} />
              </summary>
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap border-t border-white/10 p-4 font-mono text-[12.5px] leading-relaxed">{s.skill}</pre>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
