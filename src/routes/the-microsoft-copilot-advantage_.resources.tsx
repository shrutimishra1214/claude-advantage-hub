import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { bonuses } from "@/lib/bonuses";
import { downloadBonus } from "@/lib/download";

export const Route = createFileRoute("/the-microsoft-copilot-advantage_/resources")({
  component: ResourcesPage,
  head: () => ({
    meta: [
      { title: "Bonus Resources | The Microsoft Copilot Advantage" },
      {
        name: "description",
        content:
          "Download every free companion resource for The Microsoft Copilot Advantage: prompt libraries, cheatsheets, playbooks and checklists.",
      },
      { property: "og:title", content: "Bonus Resources | The Microsoft Copilot Advantage" },
      {
        property: "og:description",
        content:
          "Every free companion resource for readers of The Microsoft Copilot Advantage, available to download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ResourcesPage() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="copilot-hub min-h-screen bg-hero-surface">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Link to="/the-microsoft-copilot-advantage" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-20 pt-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-3xl font-bold md:text-5xl">
              The full <span className="text-gradient-brand">bonus library</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Every companion resource for <em>The Microsoft Copilot Advantage</em>,
              free to download. No sign-up needed.
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
                  <button
                    onClick={() => downloadBonus(bonus)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:opacity-70"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
            Want new Copilot resources as they're released?{" "}
            <Link to="/the-microsoft-copilot-advantage" hash="claim" className="font-semibold text-foreground underline underline-offset-4">
              Join the reader list
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
