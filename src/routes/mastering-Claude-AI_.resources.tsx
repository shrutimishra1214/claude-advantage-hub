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
    <main className="operator-page min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground"><Link to="/mastering-Claude-AI"><ArrowLeft /> Back to book page</Link></Button>
          <span className="font-serif text-xl">Kaelis Voss</span>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Companion resources</p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl">The Operator toolkit.</h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">Every companion resource for <em>The Claude Operator</em>, free to download. No sign-up needed.</p>
        <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {operatorBonuses.map(({ icon: Icon, title: name, desc, url, file }, index) => (
            <article key={name} className="flex gap-5 border-t border-border py-6">
              <span className="min-w-7 pt-1 text-xs font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <Icon className="mb-3 h-5 w-5 text-accent" strokeWidth={1.6} />
                <h2 className="font-serif text-xl">{name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <Button asChild variant="link" className="mt-3 h-auto justify-start px-0 text-accent"><a href={url} download={file}><Download /> Download</a></Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}