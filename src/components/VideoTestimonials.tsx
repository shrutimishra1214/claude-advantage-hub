"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/content";
import { site } from "@/lib/site";
import { Icon } from "./icons";

export function VideoTestimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  if (items.length === 0) return <EarlyReaderInvite />;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="card group overflow-hidden">
            <button type="button" onClick={() => setActive(t)} className="relative block aspect-[4/5] w-full overflow-hidden bg-ink" aria-label={`Play video review from ${t.name}`}>
              <Image src={t.poster} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift backdrop-blur transition group-hover:scale-110">
                <Icon.play className="ml-1 h-6 w-6" />
              </span>
              <span className="absolute inset-x-5 bottom-5 text-left text-white">
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-white/75">{t.role}</span>
              </span>
            </button>
            <figcaption className="p-5 text-[15px] leading-relaxed text-ink-soft">“{t.quote}”</figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label={`Video review from ${active.name}`} onClick={() => setActive(null)}>
          <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <video src={active.videoSrc} poster={active.poster} controls autoPlay playsInline className="aspect-[9/16] max-h-[85dvh] w-full rounded-2xl bg-black object-contain" />
            <button type="button" onClick={() => setActive(null)} className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close video">
              <Icon.x />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function EarlyReaderInvite() {
  const subject = encodeURIComponent("Early reader program: Copilot Advantage");
  return (
    <div className="card relative overflow-hidden p-8 md:p-12">
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-spectrum opacity-20 blur-3xl" />
      <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="eyebrow"><Icon.video className="h-4 w-4" /> Early reader program</span>
          <h3 className="mt-5 text-2xl font-bold md:text-3xl">Be one of the first readers and get the book free</h3>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            We&apos;re inviting a small group of professionals to read the book before launch. In return, we ask for an honest
            60-second video about your experience, good or bad.
          </p>
          <a href={`mailto:${site.contactEmail}?subject=${subject}`} className="btn-primary mt-7">
            Apply to be an early reader <Icon.arrow className="h-5 w-5" />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`grid aspect-[9/16] place-items-center rounded-2xl border border-dashed border-ink/15 bg-paper-tint ${i === 1 ? "translate-y-6" : ""}`}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink-muted shadow-soft">
                <Icon.play className="ml-0.5 h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
