import Link from "next/link";
import type { ReactNode } from "react";

export function PageHead({ eyebrow, title, lead, back, children }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; back?: { href: string; label: string }; children?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 border-b border-line pb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {back && <Link href={back.href} className="text-sm font-medium text-ink-muted hover:text-ink">← {back.label}</Link>}
        {eyebrow && <p className={`eyebrow ${back ? "mt-4" : ""}`}>{eyebrow}</p>}
        <h1 className="mt-2 text-3xl md:text-4xl">{title}</h1>
        {lead && <p className="mt-3 text-lg leading-relaxed text-ink-muted">{lead}</p>}
      </div>
      {children}
    </header>
  );
}
