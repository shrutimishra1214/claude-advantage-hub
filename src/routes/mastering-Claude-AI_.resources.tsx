import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { operatorBonuses } from "@/lib/operator-bonuses";

const title = "Bonus Resources | The Claude Operator";
const description = "Download the complete companion toolkit for The Claude Operator by Kaelis Voss, including skills, workflows, templates, workbooks, and practice files.";

export const Route = createFileRoute("/mastering-Claude-AI_/resources")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <main className="operator-page min-h-screen bg-hero-surface">
      <header className="mx-auto flex max-w-6xl items-center px-6 py-6">
        <Button asChild variant="outline" size="sm" className="rounded-full bg-card"><Link to="/mastering-Claude-AI"><ArrowLeft /> Back to book page</Link></Button>
      </header>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold md:text-5xl">The full <span className="text-gradient-brand">bonus library</span></h1>
          <p className="mt-4 text-muted-foreground">Every companion resource for <em>The Claude Operator</em>, free to download. No sign-up needed.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {operatorBonuses.map(({ icon: Icon, title: name, desc, url, file }) => (
            <article key={name} className="flex flex-col rounded-lg border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card-lift">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-operator text-brand-operator-foreground"><Icon className="h-5 w-5" /></div>
              <h2 className="font-display text-lg font-semibold">{name}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
              <Button asChild variant="link" className="mt-5 h-auto justify-start px-0 text-foreground hover:text-brand-operator"><a href={url} download={file}><Download /> Download</a></Button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}