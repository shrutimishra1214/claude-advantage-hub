// A member's own prompt library: their versions of built-in prompts, and
// prompts they wrote themselves. Shared by the server store and the browser.

export type PromptEdit = { prompt: string; followUp?: string; notes?: string; updatedAt: string };

export type CustomPrompt = {
  id: string;
  title: string;
  category: string;
  app: string;
  prompt: string;
  followUp: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type MyPrompts = { edits: Record<string, PromptEdit>; custom: CustomPrompt[] };

export const emptyMyPrompts: MyPrompts = { edits: {}, custom: [] };

export const LIMITS = { custom: 500, edits: 1000, text: 6000, short: 120 };
