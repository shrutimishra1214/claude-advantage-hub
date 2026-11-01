"use client";

import { useEffect, useState } from "react";

/** useState that survives reloads in this browser. */
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      // Unreadable or blocked storage: start fresh.
    }
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage blocked: the worksheet still works for this visit.
    }
  }, [key, value, loaded]);
  return [value, setValue] as const;
}
