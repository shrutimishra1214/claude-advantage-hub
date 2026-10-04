import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Code2, Download, Layers3, PenTool, Presentation, Star, Table2, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { subscribeToBrevo } from "@/lib/brevo.functions";
import { operatorBonuses } from "@/lib/operator-bonuses";

const amazonUrl = "https://www.amazon.com/dp/B0HLTJ9LZC";
const topics = [
  { icon: Users, title: "Cowork", description: "Think, plan, and execute together." },
  { icon: Code2, title: "Claude Code", description: "Build and iterate faster." },
  { icon: PenTool, title: "Design", description: "Create and visualise." },
  { icon: Table2, title: "Excel", description: "Analyse and work with data." },
  { icon: Presentation, title: "PowerPoint", description: "Create stunning presentations." },
];

export default function ClaudeOperatorPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const subscribe = useServerFn(subscribeToBrevo);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const result = await subscribe({ data: { email: email.trim().toLowerCase(), name: name.trim() || null, listId: 8 } });
      if (!result.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      toast.success("You're in! Your toolkit is ready below.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="operator-page min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 bg-accent px-5 text-accent-foreground hover:bg-accent/90">
                <a href="#claim">Get the free toolkit <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" className="h-11 border-border">
                <a href={amazonUrl} target="_blank" rel="noopener noreferrer"><Star /> View on Amazon</a>
              </Button>
            </div>
          </div>
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" aria-label="View The Claude Operator on Amazon" className="mx-auto block w-full max-w-[390px] md:mr-0">
            <img src="/claude-operator-cover.jpg" alt="The Claude Operator book cover by Kaelis Voss" className="block h-auto w-full shadow-cover" loading="eager" />
          </a>
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

        <section id="bonuses" className="scroll-mt-8 border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-2 text-accent"><BookOpen className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-widest">Companion resources</span></div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">The Operator toolkit.</h2>
            <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">Practical resources to help you put the book to work. Join the reader list below to get started.</p>

            <div id="claim" className="mt-12 max-w-xl scroll-mt-24 border-t-2 border-accent pt-6">
              {done ? (
                <div role="status" className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                  <div><h3 className="font-serif text-2xl">You're on the list.</h3><p className="mt-2 text-sm text-muted-foreground">Your toolkit is ready to download below. Watch your inbox for future Claude Operator resources.</p></div>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h3 className="font-serif text-2xl">Get the free bonuses</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Enter your email to join the reader list and explore the companion resources.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <label className="text-sm font-medium">First name <span className="font-normal text-muted-foreground">(optional)</span><input type="text" autoComplete="given-name" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
                    <label className="text-sm font-medium">Email address<input type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
                  </div>
                  <Button type="submit" disabled={loading} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">{loading ? "Sending..." : "Send me the free bonuses"} <ArrowRight /></Button>
                  <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime. <a href="#downloads" className="underline underline-offset-4 hover:text-foreground">Or skip ahead to the files.</a></p>
                </form>
              )}
            </div>

            <div id="downloads" className="mt-14 scroll-mt-8 grid gap-x-10 sm:grid-cols-2">
              {operatorBonuses.filter((bonus) => bonus.file !== "Operator-Toolkit.zip").map(({ icon: Icon, title, desc, url, file }, index) => (
                <div key={title} className="flex gap-5 border-t border-border py-6">
                  <span className="min-w-7 pt-1 text-xs font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <Icon className="mb-3 h-5 w-5 text-accent" strokeWidth={1.6} />
                    <h3 className="font-serif text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    <Button asChild variant="link" className="mt-3 h-auto justify-start px-0 text-accent"><a href={url} download={file}><Download /> Download</a></Button>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6 border-border"><Link to="/mastering-Claude-AI/resources">Browse the full library <ArrowRight /></Link></Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 text-xs text-muted-foreground"><span>© {new Date().getFullYear()} Kaelis Voss</span><span>The Claude Operator</span></div>
      </footer>
    </div>
  );
}
