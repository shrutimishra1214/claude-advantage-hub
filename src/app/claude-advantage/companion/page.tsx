import type { Metadata } from "next";
import { BuyButton } from "@/components/BuyButton";
import { BookCover } from "@/components/claude/BookCover";
import { Checklist } from "@/components/members/ClaudeMembers";
import { MemberLineProvider } from "@/components/members/MemberLine";
import { PromptBlock } from "@/components/members/PromptBlock";
import { Shell } from "@/components/Shell";
import { claudePrompts, contextTemplates, roadmap, roadmapMonths } from "@/lib/claude/advantage";

// Companion resources for readers of The Claude Advantage (Appendix C).
export const metadata: Metadata = {
  title: { absolute: "The Claude Advantage: Companion Resources | Kaelis Voss" },
  description: "Companion resources for The Claude Advantage: the Master Prompt Library, the context templates and the 90-day roadmap workbook.",
  alternates: { canonical: "/claude-advantage/companion" },
};

export default function ClaudeCompanion() {
  const book = claudePrompts.filter((p) => p.fromBook);
  const cats = Array.from(new Set(book.map((p) => p.category)));
  return (
    <Shell line="claude">
      <MemberLineProvider line="claude" base="/claude-advantage/members">
        <section className="border-b border-line bg-paper pb-14 pt-28 md:pt-36">
          <div className="container grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">For readers of The Claude Advantage</p>
              <h1 className="mt-4 text-4xl leading-tight md:text-5xl">Companion Resources</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">The Master Prompt Library, the templates for the frameworks in the book, and the 90-Day Roadmap workbook, kept current as Claude evolves.</p>
              <nav className="mt-6 flex flex-wrap gap-2" aria-label="On this page">
                {[["prompts", "Master Prompt Library"], ["templates", "Templates"], ["roadmap", "90-Day Roadmap"]].map(([id, l]) => <a key={id} href={`#${id}`} className="chip">{l}</a>)}
              </nav>
            </div>
            <BookCover book="advantage" className="hidden w-40 text-[10px] md:block" />
          </div>
        </section>
        <div className="container max-w-5xl py-14">
          <section id="prompts" className="scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">Master Prompt Library</h2>
            <p className="section-lead">Replace the bracketed elements with your context. Starting structures, not finished products.</p>
            {cats.map((c) => (
              <div key={c} className="mt-10">
                <h3 className="text-xl">{c}</h3>
                <div className="mt-4 grid gap-4">
                  {book.filter((p) => p.category === c).map((p) => (
                    <div key={p.id}>
                      <p className="mb-2 font-semibold">{p.title}</p>
                      <PromptBlock label="Prompt" text={p.prompt} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section id="templates" className="mt-20 scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">Templates</h2>
            <p className="section-lead">The context documents from Chapter 3. Copy, fill in, and load into your Projects.</p>
            <div className="mt-8 grid gap-6">
              {contextTemplates.map((t) => (
                <div key={t.id}>
                  <p className="font-semibold">{t.title}</p>
                  <p className="mb-2 text-sm text-ink-muted">{t.use}</p>
                  <PromptBlock label="Template" text={t.body} dark={false} />
                </div>
              ))}
            </div>
          </section>
          <section id="roadmap" className="mt-20 scroll-mt-20">
            <h2 className="section-title !text-3xl md:!text-4xl">The 90-Day Roadmap workbook</h2>
            <p className="section-lead">Tick off each week&apos;s actions. Saved in this browser.</p>
            {roadmapMonths.map((m) => (
              <div key={m.m} className="mt-10">
                <h3 className="text-2xl"><span className="text-accent">Month {m.m}</span> · {m.title}</h3>
                {roadmap.filter((w) => w.month === m.m).map((w) => (
                  <div key={w.w} className="mt-5">
                    <p className="font-semibold">Week {w.w}: {w.title}</p>
                    <div className="mt-2"><Checklist prefix={`road-${w.w}`} items={w.actions.map((text) => ({ text }))} /></div>
                  </div>
                ))}
                <p className="mt-4 rounded-lg border border-accent/30 bg-accent-soft/40 p-3 text-sm"><strong>Milestone:</strong> {m.milestone}</p>
              </div>
            ))}
          </section>
          <section className="mt-20 rounded-xl bg-ink p-8 text-white md:p-12">
            <h2 className="text-3xl !text-white md:text-4xl">Turn the book into a working system</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">The Claude Advantage System adds the member area: a library you can customize and save, the Workflow Vault, the Context Kit and the 30-Day Transformation.</p>
            <div className="mt-8"><BuyButton label="Get the System" className="!py-4" /></div>
          </section>
        </div>
      </MemberLineProvider>
    </Shell>
  );
}
