"use client";

import { useRef, type ReactNode } from "react";

/** Gently tilts its child toward the pointer on devices that have one. */
export function TiltBook({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--ry", `${x * 14}deg`);
    ref.current.style.setProperty("--rx", `${-y * 10}deg`);
  }
  function reset() {
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`[perspective:1400px] ${className}`}>
      <div className="transition-transform duration-500 ease-out motion-reduce:transition-none [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}
