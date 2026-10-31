import type { ReactNode } from "react";
import { Shell } from "./Shell";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Shell>
      <article className="container max-w-3xl pb-24 pt-32 md:pt-40">
        <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated {updated}</p>
        <div className="mt-10 grid gap-5 leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-brand-violet [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </article>
    </Shell>
  );
}
