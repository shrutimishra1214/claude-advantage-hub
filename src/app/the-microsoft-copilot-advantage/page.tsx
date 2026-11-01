import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { BriefBuilder } from "@/components/members/BriefBuilder";
import { PromptBlock } from "@/components/members/PromptBlock";
import { NinetyDayPlan } from "@/components/members/Trackers";
import { WorksheetSections } from "@/components/members/WorksheetSections";
import { Shell } from "@/components/Shell";
import { bookPrompts, shapes } from "@/lib/toolkit/method";

// The address printed in the book. Readers get every tool the book promises, free.
export const metadata: Metadata = {
  title: "Book Companion Toolkit",
  description: "The companion toolkit for The Microsoft Copilot Advantage: worksheets, prompt templates and the 90-Day Tracker.",
  alternates: { canonical: "/the-microsoft-copilot-advantage" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Companion() {
  return (
    <Shell>
      <section className="border-b border-line bg-paper pb-14 pt-28 md:pt-36">
        <div className="container grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">For readers of the book</p>
            <h1 className="mt-4 text-4xl leading-tight md:text-5xl">Your Companion Toolkit</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Every hands-on tool in the book, ready to use: the worksheets you fill in, the prompt templates you copy, and the tracker you run the 90-day plan on.
              Kept current as Copilot changes.
            </p>
            <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
              {[["worksheets", "Worksheets"], ["prompt-builder", "Prompt Builder"], ["templates", "Prompt templates"], ["tracker", "90-Day Tracker"]].map(([id, l]) => (
                <a key={id} href={`#${id}`} className="chip">{l}</a>
              ))}
            </nav>
          </div>
          <Image src="/images/cover.jpg" alt="The Microsoft Copilot Advantage" width={150} height={190} className="hidden rounded shadow-book md:block" priority />
        </div>
      </section>

      <div className="container max-w-5xl py-14">
        <section id="worksheets" className="scroll-mt-20">
          <h2 className="section-title !text-3xl md:!text-4xl">Worksheets</h2>
          <p className="section-lead">Filled in on screen and saved in your browser.</p>
          <WorksheetSections />
        </section>

        <section id="prompt-builder" className="mt-20 scroll-mt-20">
          <h2 className="section-title !text-3xl md:!text-4xl">The Prompt Builder</h2>
          <p className="section-lead">The five-part brief from Chapter 7: role, context, task, format, constraints.</p>
          <div className="mt-8"><BriefBuilder /></div>
        </section>

        <section id="templates" className="mt-20 scroll-mt-20">
          <h2 className="section-title !text-3xl md:!text-4xl">Prompt templates</h2>
          <p className="section-lead">The six shapes from Chapter 8 and the book&apos;s best prompts by function from Chapter 35, with named slots so you adapt rather than retype.</p>
          <h3 className="mt-10 text-xl">The six shapes</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {shapes.map((s) => <div key={s.name} className="rounded-xl border border-line p-5"><p className="font-semibold">{s.name}</p><p className="mt-1 text-sm text-ink-muted">{s.what}</p><div className="mt-3"><PromptBlock label="Template" text={s.template} /></div></div>)}
          </div>
          {bookPrompts.slice(1).map((c) => (
            <div key={c.category} id={slug(c.category)} className="mt-12 scroll-mt-20">
              <h3 className="text-xl">{c.category}</h3>
              <p className="mt-1 text-ink-muted">{c.blurb}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {c.prompts.map((p) => (
                  <div key={p.name} className="flex flex-col rounded-xl border border-line p-5">
                    <p className="font-semibold">{p.name}</p>
                    <p className="mt-1 text-sm text-ink-muted">{p.for}</p>
                    <div className="mt-3 flex-1"><PromptBlock label="Template" text={p.template} /></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="tracker" className="mt-20 scroll-mt-20">
          <h2 className="section-title !text-3xl md:!text-4xl">The 90-Day Tracker</h2>
          <p className="section-lead">One habit a week, anchored to something you already do. Tick it off here or download it as a spreadsheet.</p>
          <div className="mt-8"><NinetyDayPlan isPublic /></div>
        </section>

        <section className="mt-20 overflow-hidden rounded-xl bg-ink p-8 text-white md:p-12">
          <p className="text-sm font-semibold text-white/60">Go further</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Turn the book into a daily system</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
            The Toolkit adds the member area: a chapter-by-chapter companion with every exercise, the Prompt Recipe Library, the Workflow Vault, templates, the 30-Day Challenge and printable cheat sheets.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BuyButton label="Get the Toolkit" className="!py-4" />
            <Link href="/copilot-advantage#whats-inside" className="btn-secondary !border-white/25 !bg-transparent !py-4 !text-white hover:!bg-white/10">See what&apos;s inside</Link>
          </div>
        </section>
      </div>
    </Shell>
  );
}
