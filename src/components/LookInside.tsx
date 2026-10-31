"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "./icons";

type Page = { src: string; caption: string };

export function LookInside({ pages }: { pages: Page[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + pages.length) % pages.length)), [pages.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  return (
    <>
      <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-6 lg:gap-4">
        {pages.map((p, i) => (
          <li key={p.src} className="w-[62%] shrink-0 snap-center sm:w-[40%] md:w-auto">
            <button type="button" onClick={() => setIndex(i)} className="group block w-full text-left" aria-label={`Enlarge page: ${p.caption}`}>
              <span className="relative block overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-ink/10 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lift">
                <Image src={p.src} alt={p.caption} width={849} height={1100} sizes="(min-width:1024px) 190px, (min-width:768px) 30vw, 62vw" className="h-auto w-full" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition group-hover:bg-ink/25 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">Enlarge</span>
                </span>
              </span>
              <span className="mt-3 block text-[13px] leading-snug text-ink-muted">{p.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-ink/90 backdrop-blur" role="dialog" aria-modal="true" aria-label="Book page preview" onClick={close}>
          <div className="flex items-center justify-between p-4 text-white/80">
            <span className="text-sm">{index + 1} / {pages.length}</span>
            <button type="button" onClick={close} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Close preview"><Icon.x /></button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => step(-1)} className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-8" aria-label="Previous page">
              <Icon.arrow className="h-5 w-5 rotate-180" />
            </button>
            <figure className="flex flex-col items-center">
              {/* As tall as the screen allows, but never wider than it. */}
              <span className="relative block aspect-[849/1100] h-[min(calc(100dvh-150px),calc(84vw*1100/849))] overflow-hidden rounded-lg bg-white shadow-2xl">
                <Image src={pages[index].src} alt={pages[index].caption} fill sizes="(min-width:768px) 700px, 90vw" className="object-contain" />
              </span>
              <figcaption className="mt-3 max-w-md text-center text-sm text-white/80">{pages[index].caption}</figcaption>
            </figure>
            <button type="button" onClick={() => step(1)} className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-8" aria-label="Next page">
              <Icon.arrow className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
