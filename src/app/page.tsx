import Image from "next/image";
import { BookMockup } from "@/components/BookMockup";
import { BuyButton } from "@/components/BuyButton";
import { CountUp } from "@/components/CountUp";
import { Curriculum } from "@/components/Curriculum";
import { GuaranteeStamp } from "@/components/GuaranteeStamp";
import { Icon } from "@/components/icons";
import { LookInside } from "@/components/LookInside";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Arrow, Circle, Underline } from "@/components/Scribble";
import { Shell } from "@/components/Shell";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { TiltBook } from "@/components/TiltBook";
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
      <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-40">
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />

        <div className="container grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="hero-in eyebrow">A practical guide by {site.name}</p>
            <h1 className="hero-in mt-6 text-[2.75rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.6rem]" style={{ animationDelay: "80ms" }}>
              Everything you need to{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="accent-em">master Copilot</span>,
                <Underline className="absolute -bottom-2 left-0 h-3 w-[calc(100%-0.4em)] text-pen md:-bottom-3 md:h-4" delay={900} />
              </span>{" "}
              in one book.
            </h1>
            <p className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl" style={{ animationDelay: "160ms" }}>
              {stats.chapters} step-by-step chapters, a ready-to-use Prompt Library, proven workflows and a 90-day plan. All 9 apps,
              from your very first prompt to your own custom agents.
            </p>
            <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "240ms" }}>
              <BuyButton label="Get the toolkit" />
              <a href="#look-inside" className="btn-ghost !py-4">
                Look inside the book <Icon.arrow className="btn-arrow h-4 w-4" />
              </a>
            </div>
            <ul className="hero-in mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted" style={{ animationDelay: "320ms" }}>
              {["Instant PDF download", `${site.guaranteeDays}-day money-back guarantee`, "Secure checkout"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Icon.check className="h-4 w-4 text-accent" /> {t}</li>
              ))}
            </ul>
          </div>

          <div className="hero-in relative mx-auto w-full max-w-[520px] px-10 py-8 sm:px-16" style={{ animationDelay: "200ms" }}>
            <TiltBook>
              <BookMockup priority className="mx-auto max-w-[260px] sm:max-w-[320px] lg:max-w-[350px]" />
            </TiltBook>
            <IndexCard className="left-0 top-2 -rotate-3" icon="book" title={`${stats.chapters} chapters`} sub={`${stats.parts} parts · ${stats.apps} apps`} />
            <IndexCard className="right-0 top-[42%] rotate-2" icon="sparkle" title="Prompt Library" sub="Organised by task" delay="1.2s" />
            <IndexCard className="bottom-6 left-2 rotate-1" icon="clock" title="90-Day Plan" sub="One habit a week" delay="2.4s" />
            <div className="absolute -bottom-2 right-0 hidden w-40 text-right sm:block" aria-hidden>
              <Arrow className="ml-auto mr-10 h-14 w-16 rotate-180 text-pen" delay={1600} />
              <p className="hand -mt-1 text-2xl leading-tight">all 9 apps,<br />one book</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mt-16 md:mt-24">
          <Reveal>
            <dl className="grid grid-cols-2 border-y border-line md:grid-cols-5">
              {[
                { n: stats.apps, label: "Copilot apps covered" },
                { n: stats.parts, label: "Parts" },
                { n: stats.chapters, label: "Step-by-step chapters" },
                { n: 175, suffix: "+", label: "Pages" },
                { n: hours, decimals: 1, suffix: " hrs", label: "To read the core" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 py-7 text-center md:py-9 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${i > 0 ? "md:border-l" : ""} ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-medium md:text-5xl">
                      <CountUp to={s.n} suffix={s.suffix} decimals={s.decimals} />
                    </span>
                    <span className="mt-2 block text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-12">
          <Marquee items={allChapters.map((c) => c.title)} />
        </div>
      </section>

      {/* ───────────── Problem + research ───────────── */}
      <section className="section border-t border-line bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">01 · Why most people stall</p>
              <h2 className="section-title mt-6">
                Your licence buys access. <span className="accent-em">Method</span> builds the advantage.
              </h2>
              <p className="section-lead">
                Most people try Copilot twice, decide it&apos;s a toy, and go back to the old way. Not because it doesn&apos;t work,
                but because nobody showed them how.
              </p>
            </Reveal>
            <ol className="self-end divide-y divide-line border-y border-line">
              {pains.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 90}>
                    <div className="group flex gap-6 py-7">
                      <span className="w-6 font-display text-3xl italic text-ink/25 transition-colors duration-300 group-hover:text-pen">{i + 1}</span>
                      <div>
                        <h3 className="text-2xl font-medium">{p.title}</h3>
                        <p className="mt-2 leading-relaxed text-ink-muted">{p.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal>
            <figure className="mx-auto mt-24 max-w-4xl text-center">
              <span aria-hidden className="block font-display text-7xl leading-none text-accent/30">&ldquo;</span>
              <blockquote className="-mt-4 font-display text-3xl font-normal italic leading-snug md:text-5xl">
                Access is what your license buys. Advantage is what your method builds.
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink-muted">From Chapter 1, <cite className="not-italic">The Microsoft Copilot Advantage</cite></figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <div className="grain relative mt-24 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper md:p-14">
              <div className="relative grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">What the research shows</p>
                  <p className="mt-4 font-display text-3xl font-normal leading-snug">People who learn the method pull ahead, <em className="text-[#9DB0FF]">fast</em>.</p>
                </div>
                <dl className="grid gap-10 sm:grid-cols-3">
                  {research.map((r) => (
                    <div key={r.value} className="border-t border-paper/15 pt-6">
                      <dt className="sr-only">{r.label}</dt>
                      <dd>
                        <span className="block font-display text-6xl font-normal">{r.value}</span>
                        <span className="mt-3 block font-semibold">{r.label}</span>
                        <span className="block text-sm text-paper/60">{r.detail}</span>
                        <span className="mt-4 block text-xs text-paper/40">{r.source}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Toolkit ───────────── */}
      <section id="toolkit" className="section scroll-mt-16">
        <div className="container">
          <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">02 · What&apos;s in the toolkit</p>
              <h2 className="section-title mt-6">Not just a book. A complete <span className="accent-em">Copilot system</span>.</h2>
            </div>
            <p className="text-lg leading-relaxed text-ink-muted">
              A playbook to learn from, libraries to work from, and a plan to make it stick. Everything you need, in one place.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Reveal className="md:col-span-2 lg:row-span-2">
              <article className="grain group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink p-8 text-paper md:p-10">
                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-paper/20 transition-transform duration-500 group-hover:-rotate-6">
                    <Icon.book className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/50">{playbook.where}</span>
                </div>
                <h3 className="relative mt-8 text-3xl font-normal md:text-4xl">{playbook.title}</h3>
                <p className="relative mt-3 max-w-md leading-relaxed text-paper/70">{playbook.body}</p>
                <ol className="relative mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                  {parts.slice(0, 14).map((p) => (
                    <li key={p.n} className={`${p.n > 8 ? "hidden sm:flex" : "flex"} min-w-0 items-baseline gap-3 border-t border-paper/10 py-2.5 text-sm text-paper/85`}>
                      <span className="w-5 shrink-0 font-display italic text-paper/40">{p.n}</span>
                      <span className="truncate">{p.title}</span>
                    </li>
                  ))}
                </ol>
                <p className="relative mt-3 text-sm text-paper/50 sm:hidden">+ 6 more parts in the full curriculum below</p>
              </article>
            </Reveal>

            <Reveal className="md:col-span-2" delay={80}><ToolkitCard item={prompts} wide /></Reveal>
            <Reveal delay={120}><ToolkitCard item={workflows} /></Reveal>
            <Reveal delay={160}><ToolkitCard item={plan} /></Reveal>
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}><ToolkitCard item={item} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Apps ───────────── */}
      <section className="section border-y border-line bg-white">
        <div className="container">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">03 · Every app you use at work</p>
            <h2 className="section-title mt-6">One guide. <span className="accent-em">All nine</span> apps.</h2>
            <p className="section-lead">Each app gets hands-on chapters: what Copilot can do there, the prompts that work, and step-by-step workflows for real tasks.</p>
          </Reveal>
          <Reveal className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((a) => {
              const AppIcon = Icon[a.icon];
              return (
                <div key={a.name} className="h-full">
                  <article className="group h-full bg-white p-7 transition-colors duration-300 hover:bg-paper md:p-8">
                    <div className="flex items-center gap-4">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                        style={{ background: `${a.color}14`, color: a.color }}
                      >
                        <AppIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-xl font-medium">{a.name}</h3>
                        <p className="text-sm text-ink-muted">{a.verb}</p>
                      </div>
                    </div>
                    <p className="mt-5 leading-relaxed text-ink-muted">{a.body}</p>
                  </article>
                </div>
              );
            })}
          </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Chapter anatomy ───────────── */}
      <section className="section grain relative overflow-hidden bg-ink text-paper">
        <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper/50">04 · Built to be used, not just read</p>
            <h2 className="section-title mt-6">Every chapter follows the same <em className="text-[#9DB0FF]">proven</em> format</h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">You always know what you&apos;ll get, how long it takes, and what to do next. Skim it, jump to the app you need, or read it cover to cover.</p>

            {/* Chapter header, as it appears in the book */}
            <div className="relative mt-12 -rotate-1 rounded-2xl bg-white p-6 text-ink shadow-2xl transition-transform duration-500 hover:rotate-0 md:p-7">
              <span aria-hidden className="absolute -top-3 left-10 h-6 w-24 rotate-2 bg-[#F3E7B3]/90 shadow-sm" />
              <p className="font-display text-4xl font-medium text-accent">1</p>
              <p className="mt-1 font-display text-xl font-medium">Turn Copilot Access Into a Real Advantage</p>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line text-sm sm:grid-cols-4">
                {[["Read", "8 min"], ["Level", "Beginner"], ["Apps", "Copilot Chat"], ["Prereqs", "None"]].map(([k, v]) => (
                  <div key={k} className="bg-paper px-3 py-2.5">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-accent">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-xl bg-accent-soft px-4 py-3 text-sm"><strong className="text-accent">TIME SAVED</strong> · Find the 3 tasks to automate first · Set a measurable baseline</p>
              <div className="mt-4 rounded-xl border border-line px-4 py-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Key idea</p>
                <p className="mt-1 font-display italic text-ink-soft">The gap between access and advantage is method, not tools.</p>
              </div>
            </div>
          </Reveal>

          <ol className="grid gap-x-8 sm:grid-cols-2">
            {anatomy.map((a, i) => (
              <li key={a.label}>
                <Reveal delay={(i % 2) * 80} className="h-full">
                  <div className="group flex h-full gap-4 border-t border-paper/15 py-5">
                    <span className="font-display text-2xl italic text-paper/30 transition-colors duration-300 group-hover:text-[#9DB0FF]">{i + 1}</span>
                    <div>
                      <p className="font-semibold">{a.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-paper/60">{a.body}</p>
                    </div>
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
            <p className="eyebrow">05 · The full curriculum</p>
            <h2 className="section-title mt-6">From your first prompt to your <span className="accent-em">own custom agents</span></h2>
            <p className="section-lead">Every chapter is labelled by level, so you can start where you are and grow at your own pace.</p>
          </Reveal>

          <Reveal>
            <ol className="relative mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              <span aria-hidden className="grow-x absolute left-[12%] right-[12%] top-8 hidden h-px bg-ink/25 lg:block" />
              {levelCounts.map(({ level, count }, i) => (
                <li key={level} className="relative text-center">
                  <span className={`relative mx-auto grid h-16 w-16 place-items-center rounded-full font-display text-2xl font-medium ring-1 ring-inset ${levelStyle[level]}`}>
                    {count}
                  </span>
                  <p className="mt-4 font-display text-xl font-medium">{level}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {count} chapters · {["the foundations", "everyday mastery in every app", "storytelling, agents & automation", "run your whole operation"][i]}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-center text-sm text-ink-muted">Plus the Prompt Library, the Workflow Library and the 90-Day Plan, for every level.</p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-4xl">
            <Curriculum parts={parts} />
          </div>
        </div>
      </section>

      {/* ───────────── Look inside ───────────── */}
      <section id="look-inside" className="section scroll-mt-16 border-y border-line bg-white">
        <div className="container">
          <Reveal className="relative mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow">06 · Look inside</p>
            <h2 className="section-title mt-6">
              See the{" "}
              <span className="relative inline-block">
                real pages
                <Circle className="absolute -inset-x-5 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2.5rem)] text-pen" delay={300} />
              </span>
            </h2>
            <p className="section-lead">Clean layouts, clear frameworks, and reference tables you&apos;ll come back to. Tap any page to enlarge it.</p>
          </Reveal>
          <Reveal><LookInside pages={samplePages} /></Reveal>
        </div>
      </section>

      {/* ───────────── Testimonials (only once real reader videos exist) ───────────── */}
      {testimonials.length > 0 && (
        <section id="reviews" className="section scroll-mt-16">
          <div className="container">
            <Reveal className="mx-auto mb-14 max-w-3xl text-center">
              <p className="eyebrow">Reader stories</p>
              <h2 className="section-title mt-6">Hear it from the people <span className="accent-em">using it</span></h2>
              <p className="section-lead">Real readers, real workdays, unscripted.</p>
            </Reveal>
            <Reveal><VideoTestimonials items={testimonials} /></Reveal>
          </div>
        </section>
      )}

      {/* ───────────── Audience ───────────── */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow">07 · Who it&apos;s for</p>
            <h2 className="section-title mt-6">Written for people with <span className="accent-em">real work</span> to do</h2>
            <p className="section-lead">No coding. No technical background. Just practical ways to get more done with the tools you already have.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {audience.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 90}>
                <div className="group h-full rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="icon-tile h-10 w-10 group-hover:border-accent group-hover:text-accent"><Icon.check className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-xl font-medium">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Pricing ───────────── */}
      <section id="pricing" className="section scroll-mt-16 border-t border-line bg-white">
        <div className="container">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow">08 · Get your copy</p>
            <h2 className="section-title mt-6">Get the <span className="accent-em">complete</span> toolkit</h2>
            <p className="section-lead">One payment. Everything included. Yours to keep.</p>
          </Reveal>
          <Reveal>
            <div className="relative grid gap-10 rounded-[2rem] border border-line bg-paper p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <TiltBook>
                <BookMockup className="mx-auto max-w-[250px]" />
              </TiltBook>
              <div>
                <h3 className="text-3xl font-medium md:text-4xl">{book.name}</h3>
                <p className="mt-2 text-ink-muted">The complete Copilot toolkit · PDF ebook</p>
                <ul className="mt-6 grid gap-3">
                  {book.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      <Icon.check className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-end gap-3">
                  <span className="font-display text-6xl font-medium leading-none">{formatPrice(book.price[currency], currency)}</span>
                  <span className="pb-1 text-lg text-ink-muted line-through">{formatPrice(book.compareAt![currency], currency)}</span>
                  <span className="hand pb-1 text-2xl">launch price!</span>
                </div>
                <BuyButton label="Get the complete toolkit" showPrice={false} className="mt-8 w-full sm:w-auto" />
                <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                  <Icon.lock className="h-4 w-4" /> One-time payment · Instant PDF download · Secured by Razorpay
                </p>
              </div>
              <GuaranteeStamp className="absolute -right-3 -top-10 hidden w-32 rotate-12 md:grid lg:-right-8 lg:w-36" />
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <GuaranteeStamp className="relative w-24 shrink-0 md:hidden" />
              <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-emerald-700 md:grid"><Icon.shield className="h-7 w-7" /></span>
              <div>
                <h3 className="text-xl font-medium">{site.guaranteeDays}-day money-back guarantee</h3>
                <p className="mt-1 leading-relaxed text-ink-muted">Read it, try the workflows, and if it doesn&apos;t save you time, email us within {site.guaranteeDays} days for a full refund. No questions asked.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Author ───────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mx-auto block h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-lift">
              <Image src="/images/author.jpg" alt="Kaelis Voss" width={160} height={160} className="h-full w-full object-cover" />
            </span>
            <p className="eyebrow mt-8">About the author</p>
            <h2 className="mt-4 text-4xl font-medium md:text-5xl">Kaelis Voss</h2>
            {/* TODO: replace with the author's own bio. */}
            <p className="section-lead">
              Kaelis Voss writes practical, no-jargon guides that help working professionals get real results from new technology.
              This book was written for everyone who has Copilot switched on but hasn&apos;t yet seen what it can really do.
            </p>
            <p className="hand mt-6 text-3xl" aria-hidden>Enjoy the book! ~ Kaelis</p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section id="faq" className="section scroll-mt-16 border-t border-line bg-white">
        <div className="container grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">09 · FAQ</p>
            <h2 className="section-title mt-6">Questions, <span className="accent-em">answered</span></h2>
            <p className="mt-5 text-ink-muted">
              Something else? Email <a className="font-semibold text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </p>
          </Reveal>
          <div className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper">
                    <Icon.x className="h-4 w-4 rotate-45" />
                  </span>
                </summary>
                <p className="answer pb-6 pr-12 leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="px-4 py-20 md:py-28">
        <Reveal>
          <div className="grain relative mx-auto grid max-w-[1200px] items-center gap-10 overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-paper md:grid-cols-[1.4fr_1fr] md:px-16 md:py-20">
            <div className="relative">
              <h2 className="text-4xl font-normal leading-tight md:text-6xl">
                Stop experimenting. <em className="text-[#9DB0FF]">Start mastering.</em>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-paper/70">{stats.chapters} chapters. All 9 apps. The prompts, the workflows and the plan, in one complete toolkit.</p>
              <BuyButton label="Get the toolkit" className="mt-9" />
            </div>
            <div className="relative hidden md:block">
              <BookMockup className="mx-auto max-w-[230px] rotate-6" />
            </div>
          </div>
        </Reveal>
      </section>

      <StickyBuyBar />
    </Shell>
  );
}

/** A small paper card pinned beside the book; slightly askew, like it was placed by hand. */
function IndexCard({ className, icon, title, sub, delay = "0s" }: { className: string; icon: "book" | "sparkle" | "clock"; title: string; sub: string; delay?: string }) {
  const CardIcon = Icon[icon];
  return (
    <div className={`absolute z-10 hidden sm:block ${className}`}>
      <div className="flex animate-float items-center gap-3 rounded-xl border border-line bg-white p-2.5 pr-4 shadow-lift" style={{ animationDelay: delay, animationDuration: "8s" }}>
        <span className="icon-tile h-9 w-9 rounded-lg"><CardIcon className="h-[18px] w-[18px]" /></span>
        <span>
          <span className="block text-sm font-semibold leading-tight">{title}</span>
          <span className="block text-xs leading-tight text-ink-muted">{sub}</span>
        </span>
      </div>
    </div>
  );
}

function ToolkitCard({ item, wide = false }: { item: (typeof toolkit)[number]; wide?: boolean }) {
  const CardIcon = Icon[item.icon];
  return (
    <article className="card group flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <span className="icon-tile h-11 w-11 group-hover:-rotate-6 group-hover:border-accent group-hover:text-accent"><CardIcon className="h-5 w-5" /></span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{item.where}</span>
      </div>
      <h3 className={`mt-6 font-medium ${wide ? "text-3xl" : "text-xl"}`}>{item.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-muted">{item.body}</p>
      {item.tags && (
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {item.tags.map((t) => (
            <li key={t} className="rounded-md bg-paper px-2.5 py-1 font-mono text-xs text-ink-soft ring-1 ring-line">{t}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
