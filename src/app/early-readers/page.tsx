import type { Metadata } from "next";
import { BookMockup } from "@/components/BookMockup";
import { BuyButton } from "@/components/BuyButton";
import { EarlyReaderForm } from "@/components/EarlyReaderForm";
import { Icon } from "@/components/icons";
import { Shell } from "@/components/Shell";
import { SpotsMeter } from "@/components/SpotsMeter";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { REQUIRED_TESTIMONIALS, testimonials } from "@/lib/content";
import { countClaimed, TOTAL_SPOTS } from "@/lib/early-readers";

export const metadata: Metadata = {
  title: "Early reader program",
  description: "Get The Microsoft Copilot Advantage free in exchange for an honest 60-second video review. Only 3 spots.",
};

const steps = [
  { icon: "sparkle", title: "Claim a spot", body: "Fill in the short form below. The first 3 people get in." },
  { icon: "book", title: "Get the book free", body: "Your complete copy arrives by email within 2 business days." },
  { icon: "video", title: "Share an honest review", body: "Within 14 days, record a 60-second video on your phone. Good or bad, just honest." },
] as const;

export default async function EarlyReaders() {
  const programOver = testimonials.length >= REQUIRED_TESTIMONIALS;
  const claimed = programOver ? TOTAL_SPOTS : await countClaimed();
  const left = TOTAL_SPOTS - claimed;

  return (
    <Shell>
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />

        <div className="container grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow">Early reader program</span>
            <h1 className="mt-6 text-[2.4rem] font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              {programOver ? (
                <>The early reader program has <span className="accent-em">wrapped up</span>.</>
              ) : left === 0 ? (
                <>Our early readers are <span className="accent-em">reading now</span>.</>
              ) : (
                <>Read it <span className="accent-em">free</span>. Tell us what you really think.</>
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
              {programOver
                ? "Thank you to our first readers. Here's what they had to say."
                : left === 0
                  ? `All ${TOTAL_SPOTS} spots have been claimed. Their honest video reviews will be published here soon.`
                  : `We're giving ${TOTAL_SPOTS} professionals the complete Copilot toolkit before launch, in exchange for an honest 60-second video review.`}
            </p>
            {!programOver && left > 0 && (
              <a href="#apply" className="btn-primary mt-8">Claim a spot <Icon.arrow className="h-5 w-5" /></a>
            )}
          </div>

          <div className="card relative p-6 md:p-8">
            <SpotsMeter claimed={claimed} total={TOTAL_SPOTS} />
            {left === 0 && !programOver && (
              <p className="mt-5 rounded-2xl bg-paper-tint p-4 text-sm leading-relaxed text-ink-soft">
                Every spot has been claimed. Thank you for the interest! The book is available now, and reader reviews will appear here soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {programOver ? (
        <section className="section pt-0">
          <div className="container">
            <VideoTestimonials items={testimonials} />
            <div className="mt-14 text-center"><BuyButton label="Get the toolkit" /></div>
          </div>
        </section>
      ) : (
        <>
          <section className="section bg-white">
            <div className="container">
              <h2 className="section-title text-center">How it works</h2>
              <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
                {steps.map((s, i) => {
                  const StepIcon = Icon[s.icon];
                  return (
                    <li key={s.title} className="relative rounded-3xl bg-paper-tint p-7">
                      <span className="absolute right-6 top-6 font-display text-5xl font-medium text-ink/[0.06]">{i + 1}</span>
                      <span className="icon-tile h-12 w-12 bg-white"><StepIcon className="h-6 w-6" /></span>
                      <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section id="apply" className="section scroll-mt-16">
            <div className="container grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="text-center lg:text-left">
                <BookMockup className="mx-auto max-w-[220px] lg:mx-0" />
                <h2 className="mt-10 text-2xl font-medium md:text-3xl">What you get</h2>
                <ul className="mt-4 grid gap-2.5 text-left">
                  {["The complete ebook: 39 chapters, all 9 apps", "The Prompt Library, Workflow Library and 90-Day Plan", "Your review featured on this site (with your permission)"].map((t) => (
                    <li key={t} className="flex gap-3"><Icon.check className="mt-0.5 h-5 w-5 shrink-0 text-brand-violet" /> {t}</li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 md:p-10">
                {left > 0 ? (
                  <>
                    <h2 className="text-2xl font-medium md:text-3xl">Claim your spot</h2>
                    <p className="mt-2 text-ink-muted">{left === 1 ? "Only 1 spot left." : `${left} spots left.`} First come, first served.</p>
                    <div className="mt-8"><EarlyReaderForm /></div>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink text-white"><Icon.lock className="h-7 w-7" /></span>
                    <h2 className="mt-6 text-2xl font-medium md:text-3xl">All {TOTAL_SPOTS} spots are claimed</h2>
                    <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-muted">
                      Applications are closed. You can still get the complete toolkit today, covered by our money-back guarantee.
                    </p>
                    <BuyButton label="Get the toolkit" className="mt-8" />
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </Shell>
  );
}
