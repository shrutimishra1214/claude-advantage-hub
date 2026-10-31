"use client";

import { useEffect, useRef } from "react";

/** A thin accent line along the top that fills as you read down the page. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    const onScroll = () => (frame ||= requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left scale-x-0 bg-accent" />;
}
