import { BookMockup } from "@/components/BookMockup";
import { BuyButton } from "@/components/BuyButton";
import { Curriculum } from "@/components/Curriculum";
import { Icon } from "@/components/icons";
import { LookInside } from "@/components/LookInside";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Shell";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { anatomy, apps, audience, faqs, pains, research, testimonials, toolkit } from "@/lib/content";
import { allChapters, levelCounts, levelStyle, parts, samplePages, stats } from "@/lib/curriculum";
import { getCurrency } from "@/lib/currency";
import { formatPrice, products } from "@/lib/products";
import { site } from "@/lib/site";

const hours = Math.round((stats.readingMinutes / 60) * 2) / 2;

export default async function Home() {
  const currency = await getCurrency();
  const book = products.book;
  const [playbook, prompts, workflows, plan, ...rest] = toolkit;

  return (
    <Shell>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-brand-blue/20 blur-[120px]" />
          <div className="absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-brand-pink/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-brand-orange/15 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(11,16,48,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,16,48,.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="container grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="hero-in">
              <span className="eyebrow"><Icon.sparkle className="h-4 w-4 text-brand-violet" /> The complete Microsoft 365 Copilot toolkit</span>
            </div>
            <div className="hero-in" style={{ animationDelay: "80ms" }}>
              <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.03] sm:text-6xl lg:text-[4.25rem]">
                Everything you need to <span className="text-spectrum animate-shimmer">master Copilot</span>, in one book.
              </h1>
            </div>
            <div className="hero-in" style={{ animationDelay: "160ms" }}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
                {stats.chapters} step-by-step chapters, a ready-to-use Prompt Library, proven workflows and a 90-day plan, covering
                all 9 apps from your first prompt to your own custom agents.
              </p>
            </div>
            <div className="hero-in" style={{ animationDelay: "240ms" }}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BuyButton label="Get the toolkit" />
                <a href="#look-inside" className="btn-ghost !py-4">Look inside the book <Icon.arrow className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="hero-in" style={{ animationDelay: "320ms" }}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-muted">
                <li className="flex items-center gap-2"><Icon.download className="h-4 w-4 text-brand-violet" /> Instant PDF download</li>
                <li className="flex items-center gap-2"><Icon.shield className="h-4 w-4 text-brand-violet" /> {site.guaranteeDays}-day money-back guarantee</li>
                <li className="flex items-center gap-2"><Icon.lock className="h-4 w-4 text-brand-violet" /> Secure checkout</li>
              </ul>
            </div>
          </div>

          <div className="hero-in relative mx-auto w-full max-w-[540px] px-10 py-6 sm:px-20" style={{ animationDelay: "200ms" }}>
            <BookMockup priority className="mx-auto max-w-[260px] sm:max-w-[320px] lg:max-w-[360px]" />
            <FloatChip className="left-0 top-0" icon="book" title={`${stats.chapters} chapters`} sub={`${stats.parts} parts · ${stats.apps} apps`} />
            <FloatChip className="right-0 top-[40%]" icon="sparkle" title="Prompt Library" sub="Organised by task" delay="1.2s" />
            <FloatChip className="bottom-[14%] left-0" icon="loop" title="Workflow Library" sub="Real scenarios" delay="2.4s" />
            <FloatChip className="bottom-0 right-4" icon="clock" title="90-Day Plan" sub="One habit a week" delay="0.6s" />
          </div>
        </div>

        {/* Stats */}
        <div className="container mt-16 md:mt-20">
          <dl className="mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-3xl border border-ink/[0.07] bg-white/70 shadow-soft backdrop-blur md:grid-cols-5">
            {[
              [String(stats.apps), "Copilot apps covered"],
              [String(stats.parts), "Parts"],
              [String(stats.chapters), "Step-by-step chapters"],
              [stats.pages, "Pages"],
              [`${hours} hrs`, "To read the core"],
            ].map(([value, label], i) => (
              <div
                key={label}
                className={`border-ink/[0.07] p-5 text-center md:p-6 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i > 0 ? "md:border-l" : ""} ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-extrabold md:text-4xl">{value}</span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14">
          <Marquee items={allChapters.map((c) => c.title)} />
        </div>
      </section>

      {/* ───────────── Problem + research ───────────── */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Why most people stall</span>
            <h2 className="section-title mt-5">Your licence buys access. <span className="text-spectrum">Method</span> builds the advantage.</h2>
            <p className="section-lead">Most people try Copilot twice, decide it&apos;s a toy, and go back to the old way. Not because it doesn&apos;t work, but because nobody showed them how.</p>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="h-full rounded-3xl bg-paper-tint p-8">
                  <span className="font-display text-sm font-bold text-brand-violet">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="grain relative mt-16 overflow-hidden rounded-[2rem] bg-ink p-8 text-white md:p-12">
              <div aria-hidden className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-brand-violet/40 blur-[100px]" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">What the research shows</p>
                  <p className="mt-3 font-display text-2xl font-bold leading-snug">People who learn the method pull ahead, fast.</p>
                </div>
                <dl className="grid gap-8 sm:grid-cols-3">
                  {research.map((r) => (
                    <div key={r.value}>
                      <dt className="sr-only">{r.label}</dt>
                      <dd>
                        <span className="block font-display text-5xl font-extrabold text-spectrum">{r.value}</span>
                        <span className="mt-2 block font-semibold">{r.label}</span>
                        <span className="block text-sm text-white/65">{r.detail}</span>
                        <span className="mt-3 block text-xs text-white/40">{r.source}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Toolkit bento ───────────── */}
      <section id="toolkit" className="section scroll-mt-16">
        <div className="container">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">What&apos;s in the toolkit</span>
            <h2 className="section-title mt-5">Not just a book. <span className="text-spectrum">A complete Copilot system.</span></h2>
            <p className="section-lead">A playbook to learn from, libraries to work from, and a plan to make it stick. Everything you need, in one place.</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Reveal className="md:col-span-2 lg:row-span-2">
              <article className="grain relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-10">
                <div aria-hidden className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-spectrum opacity-40 blur-[90px]" />
                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-spectrum"><Icon.book className="h-6 w-6" /></span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">{playbook.where}</span>
                </div>
                <h3 className="relative mt-6 text-2xl font-bold md:text-3xl">{playbook.title}</h3>
                <p className="relative mt-3 max-w-md leading-relaxed text-white/70">{playbook.body}</p>
                <ol className="relative mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {parts.slice(0, 14).map((p) => (
                    <li key={p.n} className={`${p.n > 8 ? "hidden sm:flex" : "flex"} min-w-0 items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2 text-sm text-white/85`}>
                      <span className="font-display text-xs font-bold text-white/45">{String(p.n).padStart(2, "0")}</span>
                      <span className="truncate">{p.title}</span>
                    </li>
                  ))}
                </ol>
                <p className="relative mt-3 text-sm text-white/50 sm:hidden">+ 6 more parts in the full curriculum below</p>
              </article>
            </Reveal>

            <Reveal className="md:col-span-2" delay={80}>
              <ToolkitCard item={prompts} wide />
            </Reveal>
            <Reveal delay={120}><ToolkitCard item={workflows} /></Reveal>
            <Reveal delay={160}><ToolkitCard item={plan} /></Reveal>
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}><ToolkitCard item={item} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Apps ───────────── */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Every app you use at work</span>
            <h2 className="section-title mt-5">One guide. All 9 apps.</h2>
            <p className="section-lead">Each app gets hands-on chapters: what Copilot can do there, the prompts that work, and step-by-step workflows for real tasks.</p>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((a, i) => {
              const AppIcon = Icon[a.icon];
              return (
                <Reveal key={a.name} delay={(i % 3) * 80}>
                  <article className="group h-full rounded-3xl border border-ink/[0.07] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-soft transition group-hover:scale-110" style={{ background: a.color }}>
                        <AppIcon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">{a.name}</h3>
                        <p className="text-sm font-semibold" style={{ color: a.color }}>{a.verb}</p>
                      </div>
                    </div>
                    <p className="mt-5 leading-relaxed text-ink-muted">{a.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── Chapter anatomy ───────────── */}
      <section className="section grain relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-violet/30 blur-[140px]" />
        <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Built to be used, not just read</span>
            <h2 className="section-title mt-5">Every chapter follows the same proven format</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">You always know what you&apos;ll get, how long it takes, and what to do next. Skim it, jump to the app you need, or read it cover to cover.</p>

            {/* Chapter header, as it appears in the book */}
            <div className="mt-10 rounded-3xl bg-white p-6 text-ink shadow-2xl md:p-7">
              <p className="font-display text-4xl font-extrabold text-brand-blue">1</p>
              <p className="mt-1 font-display text-xl font-bold">Turn Copilot Access Into a Real Advantage</p>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 text-sm sm:grid-cols-4">
                {[["Read", "8 min"], ["Level", "Beginner"], ["Apps", "Copilot Chat"], ["Prereqs", "None"]].map(([k, v]) => (
                  <div key={k} className="bg-paper-tint px-3 py-2.5">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm"><strong className="text-brand-blue">TIME SAVED</strong> · Find the 3 tasks to automate first · Set a measurable baseline</p>
              <div className="mt-4 rounded-xl border border-ink/10 px-4 py-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-blue">Key idea</p>
                <p className="mt-1 italic text-ink-soft">The gap between access and advantage is method, not tools.</p>
              </div>
            </div>
          </Reveal>

          <ol className="grid gap-3 sm:grid-cols-2">
            {anatomy.map((a, i) => (
              <li key={a.label}>
                <Reveal delay={(i % 2) * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.07]">
                    <span className="font-display text-sm font-bold text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-2 font-semibold">{a.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{a.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Learning path + curriculum ───────────── */}
      <section id="curriculum" className="section scroll-mt-16">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The full curriculum</span>
            <h2 className="section-title mt-5">From your first prompt to your <span className="text-spectrum">own custom agents</span></h2>
            <p className="section-lead">Every chapter is labelled by level, so you can start where you are and grow at your own pace.</p>
          </Reveal>

          <Reveal>
            <ol className="relative mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              <span aria-hidden className="absolute left-[12%] right-[12%] top-8 hidden h-0.5 bg-spectrum opacity-40 lg:block" />
              {levelCounts.map(({ level, count }, i) => (
                <li key={level} className="relative text-center">
                  <span className={`relative mx-auto grid h-16 w-16 place-items-center rounded-full font-display text-xl font-extrabold shadow-lift ring-1 ring-inset ${levelStyle[level]}`}>
                    {count}
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">{level}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {count} chapters · {["the foundations", "everyday mastery in every app", "storytelling, agents & automation", "run your whole operation"][i]}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-sm text-ink-muted">Plus the Prompt Library, the Workflow Library and the 90-Day Plan, for every level.</p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-4xl">
            <Curriculum parts={parts} />
          </div>
        </div>
      </section>

      {/* ───────────── Look inside ───────────── */}
      <section id="look-inside" className="section scroll-mt-16 bg-white">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="eyebrow">Look inside</span>
            <h2 className="section-title mt-5">See the real pages</h2>
            <p className="section-lead">Clean layouts, clear frameworks, and reference tables you&apos;ll come back to. Tap any page to enlarge it.</p>
          </Reveal>
          <Reveal><LookInside pages={samplePages} /></Reveal>
        </div>
      </section>

      {/* ───────────── Testimonials ───────────── */}
      <section id="reviews" className="section scroll-mt-16">
        <div className="container">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="eyebrow">Reader stories</span>
            <h2 className="section-title mt-5">Hear it from the people using it</h2>
            <p className="section-lead">Real readers, real workdays, unscripted.</p>
          </Reveal>
          <Reveal><VideoTestimonials items={testimonials} /></Reveal>
        </div>
      </section>

      {/* ───────────── Audience ───────────── */}
      <section className="section bg-white">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <span className="eyebrow">Who it&apos;s for</span>
            <h2 className="section-title mt-5">Written for people with real work to do</h2>
            <p className="section-lead">No coding. No technical background. Just practical ways to get more done with the tools you already have.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {audience.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 90}>
                <div className="h-full rounded-3xl border border-ink/[0.07] p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-violet/10 text-brand-violet"><Icon.check className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-bold">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Pricing ───────────── */}
      <section id="pricing" className="section scroll-mt-16">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="section-title">Get the complete toolkit</h2>
            <p className="section-lead">One payment. Everything included. Yours to keep.</p>
          </Reveal>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] p-[2px] shadow-lift">
              <div className="absolute inset-0 bg-spectrum" aria-hidden />
              <div className="relative grid gap-10 rounded-[calc(2rem-2px)] bg-white p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <BookMockup className="mx-auto max-w-[250px]" />
                <div>
                  <span className="eyebrow">Instant access</span>
                  <h3 className="mt-5 text-3xl font-bold md:text-4xl">{book.name}</h3>
                  <p className="mt-2 text-ink-muted">The complete Copilot toolkit · PDF ebook</p>
                  <ul className="mt-6 grid gap-3">
                    {book.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-violet text-white"><Icon.check className="h-3.5 w-3.5" /></span> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-end gap-3">
                    <span className="font-display text-5xl font-extrabold">{formatPrice(book.price[currency], currency)}</span>
                    <span className="pb-1.5 text-lg text-ink-muted line-through">{formatPrice(book.compareAt![currency], currency)}</span>
                    <span className="mb-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Launch price</span>
                  </div>
                  <BuyButton label="Get the complete toolkit" showPrice={false} className="mt-7 w-full sm:w-auto" />
                  <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                    <Icon.lock className="h-4 w-4" /> One-time payment · Instant PDF download · Secured by Razorpay
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-ink/[0.07] bg-white p-8 text-center sm:flex-row sm:text-left">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Icon.shield className="h-8 w-8" /></span>
              <div>
                <h3 className="text-lg font-bold">{site.guaranteeDays}-day money-back guarantee</h3>
                <p className="mt-1 leading-relaxed text-ink-muted">Read it, try the workflows, and if it doesn&apos;t save you time, email us within {site.guaranteeDays} days for a full refund. No questions asked.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Author ───────────── */}
      <section className="section bg-white">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-spectrum font-display text-2xl font-bold text-white shadow-lift">KV</span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">About the author</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Kaelis Voss</h2>
            {/* TODO: replace with the author's own bio and photo. */}
            <p className="section-lead">
              Kaelis Voss writes practical, no-jargon guides that help working professionals get real results from new technology.
              This book was written for everyone who has Copilot switched on but hasn&apos;t yet seen what it can really do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="section scroll-mt-16">
        <div className="container max-w-3xl">
          <Reveal className="text-center">
            <h2 className="section-title">Questions, answered</h2>
          </Reveal>
          <div className="mt-12 grid gap-3">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="card group p-6 open:shadow-lift">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 transition group-open:rotate-45">
                      <Icon.x className="h-4 w-4 rotate-45" />
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-ink-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="px-4 pb-24 md:pb-28">
        <Reveal>
          <div className="grain relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white md:py-24">
            <div aria-hidden className="absolute inset-x-0 -bottom-40 mx-auto h-80 w-[80%] rounded-full bg-spectrum opacity-50 blur-[100px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Stop experimenting. Start mastering.</h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{stats.chapters} chapters. All 9 apps. The prompts, the workflows and the plan, in one complete toolkit.</p>
              <BuyButton label="Get the toolkit" className="mt-9" />
            </div>
          </div>
        </Reveal>
      </section>

      <StickyBuyBar />
    </Shell>
  );
}

function FloatChip({ className, icon, title, sub, delay = "0s" }: { className: string; icon: "book" | "sparkle" | "loop" | "clock"; title: string; sub: string; delay?: string }) {
  const ChipIcon = Icon[icon];
  return (
    <div
      className={`absolute z-10 hidden animate-float items-center sm:flex gap-2.5 rounded-2xl border border-white/60 bg-white/80 p-2 pr-3.5 shadow-lift backdrop-blur-xl sm:gap-3 sm:p-2.5 sm:pr-4 ${className}`}
      style={{ animationDelay: delay, animationDuration: "8s" }}
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-spectrum text-white sm:h-9 sm:w-9"><ChipIcon className="h-4 w-4 sm:h-5 sm:w-5" /></span>
      <span>
        <span className="block text-xs font-bold leading-tight sm:text-sm">{title}</span>
        <span className="block text-[11px] leading-tight text-ink-muted sm:text-xs">{sub}</span>
      </span>
    </div>
  );
}

function ToolkitCard({ item, wide = false }: { item: (typeof toolkit)[number]; wide?: boolean }) {
  const CardIcon = Icon[item.icon];
  return (
    <article className="card group flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-paper-tint text-brand-violet transition group-hover:bg-spectrum group-hover:text-white"><CardIcon className="h-5 w-5" /></span>
        <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-semibold text-ink-muted">{item.where}</span>
      </div>
      <h3 className={`mt-5 font-bold ${wide ? "text-2xl" : "text-lg"}`}>{item.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-muted">{item.body}</p>
      {item.tags && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {item.tags.map((t) => (
            <li key={t} className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink-soft">{t}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
