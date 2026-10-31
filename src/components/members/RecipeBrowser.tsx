"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recipeCategories } from "@/lib/system";
import type { Recipe } from "@/lib/toolkit/recipes";
import { Icon } from "../icons";
import { AppChip } from "../product/AppChip";
import { useProgress } from "./progress";

export function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
  const { saved } = useProgress();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return recipes.filter((r) => {
      if (cat === "Saved" ? !saved.includes(r.id) : cat !== "All" && r.category !== cat) return false;
      const text = `${r.title} ${r.goal} ${r.when} ${r.prompt} ${r.app}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [recipes, q, cat, saved]);

  const filters = ["All", ...recipeCategories, "Saved"];

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search recipes</span>
        <Icon.search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input className="input !pl-11" placeholder="Search: email, meeting, Excel, summarize…" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
        {filters.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className="chip !py-1">
            {c === "Saved" && <Icon.check className="mr-1 h-3.5 w-3.5" />}{c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-muted" aria-live="polite">{shown.length} {shown.length === 1 ? "recipe" : "recipes"}</p>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {shown.map((r) => (
          <li key={r.id}>
            <Link href={`/members/prompts/${r.id}`} className="flex h-full flex-col rounded-xl border border-line p-5 transition hover:border-ink/20 hover:shadow-lift">
              <span className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{r.category}</span>
                <AppChip app={r.app} size="xs" />
              </span>
              <span className="mt-2 font-semibold">{r.title}</span>
              <span className="mt-1 text-sm leading-relaxed text-ink-muted">{r.goal}</span>
              {saved.includes(r.id) && <span className="mt-3 text-xs font-semibold text-accent">Saved</span>}
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-line-strong p-8 text-center text-ink-muted">
          {cat === "Saved" ? "Nothing saved yet. Open a recipe and press Save." : "No recipes match. Try another word, or the Prompt Builder."}
        </p>
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
