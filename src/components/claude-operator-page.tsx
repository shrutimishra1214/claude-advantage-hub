import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Code2, Download, ExternalLink, Layers3, PenTool, Presentation, Table2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import cover from "@/assets/claude-operator-cover.jpg.asset.json";

const topics = [
  { icon: Users, title: "Cowork", description: "Think, plan, and execute together." },
  { icon: Code2, title: "Claude Code", description: "Build and iterate faster." },
  { icon: PenTool, title: "Design", description: "Create and visualise." },
  { icon: Table2, title: "Excel", description: "Analyse and work with data." },
  { icon: Presentation, title: "PowerPoint", description: "Create stunning presentations." },
];

export default function ClaudeOperatorPage() {
  return (
    <div className="operator-page min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/"><ArrowLeft /> Book Hub</Link>
          </Button>
          <span className="font-serif text-xl">Kaelis Voss</span>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-16 md:pb-20 md:pt-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">New from Kaelis Voss</p>
            <h1 className="mt-5 text-balance font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">The Claude <span className="text-accent">Operator</span></h1>
            <p className="mt-7 text-pretty text-xl font-medium leading-snug sm:text-2xl">Master Claude AI for advanced workflows.</p>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">A practical, step-by-step guide to working with Claude across Claude Code, design, Cowork, Excel, PowerPoint, and more.</p>
            <Button asChild className="mt-8 h-11 bg-accent px-5 text-accent-foreground hover:bg-accent/90">
              <a href="#inside">Explore what’s inside <ArrowRight /></a>
            </Button>
          </div>
          <div className="mx-auto w-full max-w-[390px] md:mr-0">
            <img src={cover.url} alt="The Claude Operator book cover by Kaelis Voss" className="block h-auto w-full shadow-cover" loading="eager" />
          </div>
        </section>

        <section id="inside" className="border-t border-border bg-card py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Inside the book</p>
            <h2 className="mt-4 max-w-2xl text-balance font-serif text-4xl sm:text-5xl">Make Claude part of your real work.</h2>
            <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">Explore the tools and workflows featured in The Claude Operator.</p>
            <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {topics.map(({ icon: Icon, title, description }) => (
                <div key={title} className="min-h-44 bg-card p-6">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.6} />
                  <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
              <div className="flex min-h-44 flex-col justify-end bg-secondary p-6">
                <Layers3 className="h-6 w-6 text-accent" strokeWidth={1.6} />
                <h3 className="mt-6 font-serif text-2xl">And more</h3>
                <p className="mt-2 text-sm text-muted-foreground">Practical ways to get more from Claude.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-accent"><BookOpen className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-widest">Companion resources</span></div>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Resources for readers</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">The book includes companion resources. Details will be available here soon.</p>
            </div>
            <Button asChild variant="outline" className="w-fit border-border">
              <Link to="/">Browse all books <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 text-xs text-muted-foreground"><span>© {new Date().getFullYear()} Kaelis Voss</span><span>The Claude Operator</span></div>
      </footer>
    </div>
  );
}