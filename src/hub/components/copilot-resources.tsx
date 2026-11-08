"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Toaster } from "@/hub/components/ui/sonner";
import { bonuses } from "@/hub/lib/bonuses";
import { downloadBonus } from "@/hub/lib/download";

export default function CopilotResources() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="copilot-hub min-h-screen bg-hero-surface">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Link href="/the-microsoft-copilot-advantage" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-20 pt-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-3xl font-bold md:text-5xl">
              The <span className="text-gradient-brand">Copilot packs</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Six practical packs for <em>The Microsoft Copilot Advantage</em>. The Outlook
              playbook is free. All six come with the Complete system.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {bonuses.map((bonus) => {
              const Icon = bonus.icon;
              return (
                <div
                  key={bonus.title}
                  className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card-lift"
                >
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: bonus.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-lg font-semibold">{bonus.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{bonus.desc}</p>
                  {bonus.free ? (
                    <button
                      onClick={() => downloadBonus(bonus)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:opacity-70"
                    >
                      <Download className="h-4 w-4" />
                      Download free
                    </button>
                  ) : (
                    <Link href="/copilot-advantage#pricing" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
                      Included in Complete →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
            Already bought?{" "}
            <Link href="/library" className="font-semibold text-foreground underline underline-offset-4">
              Open your library
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
