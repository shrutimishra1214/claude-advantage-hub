"use client";

import { useEffect, useSyncExternalStore } from "react";
import { emptyMyPrompts, type CustomPrompt, type MyPrompts, type PromptEdit } from "@/lib/toolkit/my-prompts-types";

// One copy of the member's prompt library per page, shared by every component.
// Saved to their account when the site has a database, otherwise in this browser.

type Status = "loading" | "account" | "browser";
type State = { doc: MyPrompts; status: Status; saving: boolean; error: string };

const LOCAL = "kv-my-prompts";
let state: State = { doc: emptyMyPrompts, status: "loading", saving: false, error: "" };
let started = false;
const listeners = new Set<() => void>();

const emit = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

function readLocal(): MyPrompts {
  try {
    return { ...emptyMyPrompts, ...JSON.parse(localStorage.getItem(LOCAL) ?? "{}") };
  } catch {
    return emptyMyPrompts;
  }
}

function writeLocal(doc: MyPrompts) {
  try {
    localStorage.setItem(LOCAL, JSON.stringify(doc));
  } catch {
    // Storage blocked: changes last until the page closes.
  }
}

async function load() {
  try {
    const res = await fetch("/api/members/prompts", { cache: "no-store" });
    if (res.status === 503) return emit({ doc: readLocal(), status: "browser" });
    if (!res.ok) throw new Error();
    emit({ doc: await res.json(), status: "account" });
  } catch {
    emit({ doc: readLocal(), status: "browser", error: "Couldn't reach your saved prompts. Changes are kept in this browser for now." });
  }
}

// Saves run one at a time, always sending the latest version.
let saving: Promise<void> = Promise.resolve();
function persist(doc: MyPrompts) {
  writeLocal(doc);
  if (state.status !== "account") return;
  emit({ saving: true });
  saving = saving.then(async () => {
    try {
      const res = await fetch("/api/members/prompts", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state.doc) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error);
      emit({ saving: false, error: "" });
    } catch (err) {
      emit({ saving: false, error: (err as Error).message || "Couldn't save to your account. Your changes are kept in this browser; try again shortly." });
    }
  });
}

function update(fn: (d: MyPrompts) => MyPrompts) {
  const doc = fn(state.doc);
  emit({ doc });
  persist(doc);
}

const now = () => new Date().toISOString();
const newId = () => Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => (b % 36).toString(36)).join("") + Date.now().toString(36);

export const myPrompts = {
  setEdit(id: string, edit: Omit<PromptEdit, "updatedAt"> | null) {
    update((d) => {
      const edits = { ...d.edits };
      if (edit) edits[id] = { ...edit, updatedAt: now() };
      else delete edits[id];
      return { ...d, edits };
    });
  },
  addCustom(c: Omit<CustomPrompt, "id" | "createdAt" | "updatedAt">) {
    const item: CustomPrompt = { ...c, id: newId(), createdAt: now(), updatedAt: now() };
    update((d) => ({ ...d, custom: [item, ...d.custom] }));
    return item.id;
  },
  updateCustom(id: string, patch: Partial<CustomPrompt>) {
    update((d) => ({ ...d, custom: d.custom.map((c) => (c.id === id ? { ...c, ...patch, id, updatedAt: now() } : c)) }));
  },
  deleteCustom(id: string) {
    update((d) => ({ ...d, custom: d.custom.filter((c) => c.id !== id) }));
  },
};

export function useMyPrompts() {
  useEffect(() => {
    if (!started) {
      started = true;
      load();
    }
  }, []);
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
    () => state,
  );
}
