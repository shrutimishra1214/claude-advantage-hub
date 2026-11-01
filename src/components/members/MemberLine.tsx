"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LineId } from "@/lib/lines";

// Which product line's member area this is, so shared components keep
// progress and saved prompts separate per product and link within it.
const Ctx = createContext<{ line: LineId; base: string }>({ line: "copilot", base: "/members" });

export function MemberLineProvider({ line, base, children }: { line: LineId; base: string; children: ReactNode }) {
  return <Ctx.Provider value={{ line, base }}>{children}</Ctx.Provider>;
}

export const useMemberLine = () => useContext(Ctx);
