import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Download, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { subscribeToBrevo } from "@/lib/brevo.functions";
import { operatorBonuses } from "@/lib/operator-bonuses";

const amazonUrl = "https://www.amazon.com/dp/B0HLTJ9LZC";

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
      toast.success("You're on the reader list!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="operator-page min-h-screen bg-hero-surface">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Button asChild variant="outline" size="sm" className="rounded-full bg-card">
            <Link to="/"><ArrowLeft /> Book Hub</Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              <a href={amazonUrl} target="_blank" rel="noopener noreferrer"><Star /> Review on Amazon</a>
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden rounded-full bg-card sm:inline-flex">
              <a href="#claim">Claim Bonuses</a>
            </Button>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-8 md:grid-cols-2 md:items-center md:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand-operator" />
              Free companion toolkit for readers
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Your <span className="text-gradient-brand">Claude Operator toolkit</span> is ready.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Thanks for reading <em>The Claude Operator</em>. Get the skills library, workflows, workbooks, templates, and practice files that pair with the book.
            </p>

            <div id="claim" className="mt-8 scroll-mt-24">
              {done ? (
                <div role="status" className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-card-lift">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brand-operator" />
                  <div>
                    <p className="font-display font-semibold">You're on the list.</p>
                    <p className="mt-1 text-sm text-muted-foreground">Your toolkit is ready to download below. We'll email you about future Claude Operator resources.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-4 shadow-card-lift md:p-5">
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input aria-label="First name (optional)" type="text" autoComplete="given-name" maxLength={100} placeholder="Your first name (optional)" value={name} onChange={(event) => setName(event.target.value)} className="min-w-0 flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30" />
                    <input aria-label="Email address" type="email" autoComplete="email" maxLength={254} required placeholder="you@work.com" value={email} onChange={(event) => setEmail(event.target.value)} className="min-w-0 flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30" />
                  </div>
                  <Button type="submit" disabled={loading} className="mt-3 h-12 w-full rounded-md bg-brand-operator text-brand-operator-foreground shadow-glow hover:bg-brand-operator/90">
                    {loading ? "Sending..." : "Send me the free bonuses →"}
                  </Button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    No spam. Unsubscribe anytime. We'll email you when new resources drop.{" "}
                    <a href="#bonuses" className="underline underline-offset-4 transition hover:text-foreground">Or skip ahead to the files.</a>
                  </p>
                </form>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {["Instant access", "Complete toolkit", "ZIP + PDF + editable files"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-brand-operator" />{item}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 md:items-end">
            <img src="/claude-operator-cover.jpg" alt="The Claude Operator book cover by Kaelis Voss" className="w-full max-w-sm rounded-lg shadow-glow" loading="eager" />
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="rounded-full bg-card"><a href={amazonUrl} target="_blank" rel="noopener noreferrer"><Star /> Review on Amazon</a></Button>
              <Button asChild variant="outline" className="rounded-full bg-card"><a href="/operator-toolkit/Operator-Toolkit.zip" download="Operator-Toolkit.zip"><Download /> Download full toolkit</a></Button>
            </div>
          </div>
        </section>

        <section id="bonuses" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">What's inside your <span className="text-gradient-brand">bonus toolkit</span></h2>
            <p className="mt-3 text-muted-foreground">The complete companion collection for putting the book into practice.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {operatorBonuses.map(({ icon: Icon, title, desc, url, file }) => (
              <article key={title} className="flex flex-col rounded-lg border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card-lift">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-operator text-brand-operator-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
                <Button asChild variant="link" className="mt-5 h-auto justify-start px-0 text-foreground hover:text-brand-operator">
                  <a href={url} download={file}><Download /> Download</a>
                </Button>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link to="/mastering-Claude-AI/resources" className="underline underline-offset-4 transition hover:text-foreground">Browse the full library</Link>
          </p>
        </section>
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Kaelis Voss. AI that works. Results that matter.</p>
            <span>Companion resources for The Claude Operator.</span>
          </div>
        </footer>
      </main>
    </>
  );
}