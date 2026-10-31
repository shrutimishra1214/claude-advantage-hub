"use client";

import { useCallback, useEffect, useState } from "react";

// Progress is kept in this browser. Members who switch devices start the
// checklist again, but keep access to everything.
type Progress = { days: number[]; lessons: string[]; steps: Record<string, number[]>; saved: string[]; chapters: number[]; turns: string[]; weeks: number[]; wins: number[] };

const KEY = "kv-progress";
const EVENT = "kv-progress";
const empty: Progress = { days: [], lessons: [], steps: {}, saved: [], chapters: [], turns: [], weeks: [], wins: [] };

function read(): Progress {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return empty;
  }
}

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function useProgress() {
  const [p, setP] = useState<Progress>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setP(read());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(read());
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Storage blocked: progress just won't persist.
    }
    setP(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return {
    ...p,
    ready,
    // The next day to do: one past the highest finished day.
    currentDay: Math.min(30, (p.days.length ? Math.max(...p.days) : 0) + 1),
    toggleDay: (d: number) => update((x) => ({ ...x, days: toggle(x.days, d) })),
    toggleLesson: (id: string) => update((x) => ({ ...x, lessons: toggle(x.lessons, id) })),
    toggleStep: (wf: string, i: number) => update((x) => ({ ...x, steps: { ...x.steps, [wf]: toggle(x.steps[wf] ?? [], i) } })),
    toggleSaved: (id: string) => update((x) => ({ ...x, saved: toggle(x.saved, id) })),
    toggleChapter: (n: number) => update((x) => ({ ...x, chapters: toggle(x.chapters, n) })),
    toggleTurn: (key: string) => update((x) => ({ ...x, turns: toggle(x.turns, key) })),
    toggleWeek: (w: number) => update((x) => ({ ...x, weeks: toggle(x.weeks, w) })),
    toggleWin: (i: number) => update((x) => ({ ...x, wins: toggle(x.wins, i) })),
  };
}
