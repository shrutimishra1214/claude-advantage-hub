import data from "./chapters.json";

// One entry per chapter of the book, extracted from the print edition:
// what the reader will be able to do, the key idea, the exercises and the
// boxes that close each chapter.
export type Chapter = {
  n: number;
  title: string;
  part: number;
  partTitle: string;
  read: string;
  level: string;
  apps: string;
  able: string[];
  keyIdea: string;
  mistakes: string;
  tips: string;
  yourTurn: { task: string; good: string }[];
};

export const chapters = data as Chapter[];
export const chapterByN = (n: number) => chapters.find((c) => c.n === n);

export const parts = Array.from(new Map(chapters.map((c) => [c.part, c.partTitle])).entries()).map(([n, title]) => ({
  n,
  title,
  chapters: chapters.filter((c) => c.part === n),
}));

/**
 * Splits a "Common mistakes" paragraph into items. Each mistake opens with a
 * short "-ing" phrase, e.g. "Trusting fluency. Wrong answers arrive…".
 */
export function splitMistakes(text: string): { lead: string; body: string }[] {
  if (!text) return [];
  return text.split(/(?<=[.”"])\s+(?=[A-Z][a-z]+ing\b[^.]{0,70}\.\s)/).map((p) => {
    const m = p.match(/^([A-Z][a-z]+ing\b[^.]{0,70}\.)\s+([\s\S]+)$/);
    return m ? { lead: m[1], body: m[2] } : { lead: "", body: p };
  });
}
