"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recipeCategories } from "@/lib/system";
import { bookPrompts } from "@/lib/toolkit/method";
import type { Recipe } from "@/lib/toolkit/recipes";
import { Icon } from "../icons";
import { AppChip } from "../product/AppChip";
import { useMyPrompts } from "./myPrompts";
import { useProgress } from "./progress";
import { SaveStatus } from "./SaveStatus";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const bookList = bookPrompts.flatMap((c) => c.prompts.map((p) => ({ ...p, category: c.category, id: `book:${slug(p.name)}`, href: `/copilot-advantage/members/library#${slug(c.category)}` })));

export function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
  const { saved } = useProgress();
  const { doc } = useMyPrompts();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const words = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);
  const matches = (text: string) => words.every((w) => text.toLowerCase().includes(w));

  const shown = useMemo(
    () =>
      recipes.filter((r) => {
        if (cat === "Saved" && !saved.includes(r.id)) return false;
        if (cat === "My prompts" && !doc.edits[r.id]) return false;
        if (!["All", "Saved", "My prompts"].includes(cat) && r.category !== cat) return false;
        return matches(`${r.title} ${r.goal} ${r.when} ${r.prompt} ${r.app} ${doc.edits[r.id]?.prompt ?? ""} ${doc.edits[r.id]?.notes ?? ""}`);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recipes, words, cat, saved, doc],
  );
  // The member's own prompts show under All, My prompts, and their own category.
  const own = doc.custom.filter(
    (c) => (cat === "All" || cat === "My prompts" || c.category === cat) && matches(`${c.title} ${c.prompt} ${c.notes} ${c.category} ${c.app}`),
  );
  // Book prompts the member customized, shown under My prompts.
  const bookMine = cat === "My prompts" ? bookList.filter((b) => doc.edits[b.id] && matches(`${b.name} ${doc.edits[b.id].prompt}`)) : [];
  const mineCount = doc.custom.length + Object.keys(doc.edits).filter((id) => recipes.some((r) => r.id === id) || bookList.some((b) => b.id === id)).length;

  const filters = ["All", "My prompts", ...recipeCategories, "Saved"];
  const total = shown.length + own.length + bookMine.length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block flex-1">
          <span className="sr-only">Search prompts</span>
          <Icon.search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input className="input !pl-11" placeholder="Search: email, meeting, Excel, summarize…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <Link href="/copilot-advantage/members/prompts/new" className="btn-primary shrink-0 !py-3">+ New prompt</Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter prompts">
        {filters.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className="chip !py-1">
            {c === "Saved" && <Icon.check className="mr-1 h-3.5 w-3.5" />}
            {c}
            {c === "My prompts" && mineCount > 0 && <span className="ml-1.5 rounded bg-accent px-1.5 text-[11px] font-semibold text-white">{mineCount}</span>}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink-muted" aria-live="polite">{total} {total === 1 ? "prompt" : "prompts"}</p>
        <SaveStatus />
      </div>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {own.map((c) => (
          <li key={c.id}>
            <Link href={`/copilot-advantage/members/prompts/my/${c.id}`} className="flex h-full flex-col rounded-xl border border-accent/40 bg-accent-soft/30 p-5 transition hover:border-accent hover:shadow-lift">
              <span className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{c.category}</span>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">My prompt</span>
              </span>
              <span className="mt-2 font-semibold">{c.title}</span>
              <span className="mt-1 line-clamp-2 font-mono text-[12.5px] leading-relaxed text-ink-muted">{c.prompt}</span>
            </Link>
          </li>
        ))}
        {bookMine.map((b) => (
          <li key={b.id}>
            <Link href={b.href} className="flex h-full flex-col rounded-xl border border-line p-5 transition hover:border-ink/20 hover:shadow-lift">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">Book prompt · {b.category}</span>
              <span className="mt-2 font-semibold">{b.name}</span>
              <span className="mt-1 line-clamp-2 font-mono text-[12.5px] leading-relaxed text-ink-muted">{doc.edits[b.id].prompt}</span>
              <span className="mt-3 text-xs font-semibold text-accent">Your version</span>
            </Link>
          </li>
        ))}
        {shown.map((r) => (
          <li key={r.id}>
            <Link href={`/copilot-advantage/members/prompts/${r.id}`} className="flex h-full flex-col rounded-xl border border-line p-5 transition hover:border-ink/20 hover:shadow-lift">
              <span className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{r.category}</span>
                <AppChip app={r.app} size="xs" />
              </span>
              <span className="mt-2 font-semibold">{r.title}</span>
              <span className="mt-1 text-sm leading-relaxed text-ink-muted">{r.goal}</span>
              <span className="mt-3 flex gap-3 text-xs font-semibold text-accent empty:hidden">
                {doc.edits[r.id] && <span>Your version</span>}
                {saved.includes(r.id) && <span>Saved</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {total === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-line-strong p-8 text-center text-ink-muted">
          {cat === "Saved" ? (
            "Nothing saved yet. Open a prompt and press Save."
          ) : cat === "My prompts" ? (
            <>
              <p>Your prompts live here: the ones you write, and any built-in prompt you customize.</p>
              <Link href="/copilot-advantage/members/prompts/new" className="btn-primary mt-4 !py-2.5 !text-sm">+ Add your first prompt</Link>
            </>
          ) : (
            "No prompts match. Try another word, or the Prompt Builder."
          )}
        </div>
      )}
    </div>
  );
}

export function SaveButton({ id }: { id: string }) {
  const { saved, toggleSaved } = useProgress();
  const on = saved.includes(id);
  return (
    <button type="button" onClick={() => toggleSaved(id)} aria-pressed={on} className={on ? "btn-primary !px-4 !py-2.5 !text-sm" : "btn-secondary !px-4 !py-2.5 !text-sm"}>
      <Icon.check className="h-4 w-4" /> {on ? "Saved" : "Save"}
    </button>
  );
}
