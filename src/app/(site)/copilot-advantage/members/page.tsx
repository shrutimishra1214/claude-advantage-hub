import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { DashboardBook, DashboardProgress } from "@/components/members/Dashboard";
import { getMember } from "@/lib/member";
import { cheatSheets, quickstart } from "@/lib/toolkit/learning";
import { recipes } from "@/lib/toolkit/recipes";
import { templates } from "@/lib/toolkit/templates";
import { workflows } from "@/lib/toolkit/workflows";
import { chapters } from "@/lib/toolkit/book";
import { bookPrompts } from "@/lib/toolkit/method";

export const metadata: Metadata = { title: { absolute: "Member area · The Microsoft Copilot Advantage" } };

const tools = [
  { href: "/copilot-advantage/members/book", icon: "pages", title: "The Book", meta: `${chapters.length} chapters, every exercise` },
  { href: "/copilot-advantage/members/method", icon: "target", title: "The Method", meta: "Brief, shapes, fixes, verification" },
  { href: "/copilot-advantage/members/library", icon: "chat", title: "Book Prompts", meta: `${bookPrompts.reduce((n, c) => n + c.prompts.length, 0)} named prompts` },
  { href: "/copilot-advantage/members/worksheets", icon: "grid", title: "Worksheets", meta: "Time audit, business case, checklists" },
  { href: "/copilot-advantage/members/prompts", icon: "book", title: "Prompt Library", meta: `${recipes.length} recipes` },
  { href: "/copilot-advantage/members/workflows", icon: "flow", title: "Workflow Vault", meta: `${workflows.length} workflows` },
  { href: "/copilot-advantage/members/templates", icon: "doc", title: "Templates", meta: `${templates.length} templates` },
  { href: "/copilot-advantage/members/builder", icon: "wand", title: "Prompt Builder", meta: "4 steps to a better prompt" },
  { href: "/copilot-advantage/members/cheat-sheets", icon: "printer", title: "Cheat Sheets", meta: `${cheatSheets.length} printables` },
  { href: "/copilot-advantage/members/quickstart", icon: "compass", title: "Quickstart", meta: `${quickstart.length} short lessons` },
] as const;

export default async function Dashboard() {
  const member = await getMember();
  const first = member?.name.split(" ")[0];

  return (
    <div className="grid gap-10">
      <header>
        <p className="text-sm text-ink-muted">{first ? `Welcome back, ${first}` : "Welcome"}</p>
        <h1 className="mt-1 text-3xl md:text-4xl">Welcome to the Copilot Advantage</h1>
      </header>

      <DashboardProgress />

      <section>
        <h2 className="text-lg">Your book</h2>
        <div className="mt-4"><DashboardBook /></div>
      </section>

      <section>
        <h2 className="text-lg">Your system</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const I = Icon[t.icon];
            return (
              <li key={t.href}>
                <Link href={t.href} className="group flex h-full items-start gap-4 rounded-xl border border-line p-5 transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift">
                  <span className="icon-tile h-10 w-10 shrink-0"><I className="h-5 w-5 text-accent" /></span>
                  <span>
                    <span className="block font-semibold">{t.title}</span>
                    <span className="block text-sm text-ink-muted">{t.meta}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-paper p-6">
        <h2 className="text-lg">How to get the most from this</h2>
        <ol className="mt-4 grid gap-3 text-ink-soft md:grid-cols-3">
          {["Try one of the 12 Quick Wins tomorrow.", "Read a chapter, then do its exercises in The Book.", "Add one habit a week with the 90-Day Plan."].map((s, i) => (
            <li key={s} className="flex gap-3"><span className="font-mono text-sm text-accent">0{i + 1}</span>{s}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
