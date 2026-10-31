import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { redis, redisConfig } from "./kv";
import { emptyMyPrompts, LIMITS, type CustomPrompt, type MyPrompts, type PromptEdit } from "./toolkit/my-prompts-types";

// Stored per member, keyed by a hash of their email, so it follows them to any device.

const keyFor = (email: string) => `prompts:${createHash("sha256").update(email.toLowerCase() || "preview").digest("hex").slice(0, 32)}`;
const fileFor = (email: string) => path.join(process.cwd(), ".data", `${keyFor(email).replace(":", "-")}.json`);

/** False on a live site with no database: the browser keeps prompts instead. */
export const isPromptStoreAvailable = () => Boolean(redisConfig()) || process.env.NODE_ENV !== "production";

export async function loadMyPrompts(email: string): Promise<MyPrompts> {
  try {
    const raw = redisConfig() ? await redis<string | null>(["GET", keyFor(email)]) : await readFile(fileFor(email), "utf8");
    return raw ? sanitize(JSON.parse(raw)) : emptyMyPrompts;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return emptyMyPrompts;
    throw err;
  }
}

export async function saveMyPrompts(email: string, doc: MyPrompts) {
  const json = JSON.stringify(doc);
  if (redisConfig()) return void (await redis(["SET", keyFor(email), json]));
  await mkdir(path.dirname(fileFor(email)), { recursive: true });
  await writeFile(fileFor(email), json);
}

// ── Validation: only well-formed, size-limited data is ever stored ──

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const date = (v: unknown) => (typeof v === "string" && !Number.isNaN(Date.parse(v)) ? v : new Date().toISOString());

export function sanitize(raw: unknown): MyPrompts {
  const doc = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const edits: Record<string, PromptEdit> = {};
  const rawEdits = doc.edits && typeof doc.edits === "object" ? (doc.edits as Record<string, Record<string, unknown>>) : {};
  for (const [id, e] of Object.entries(rawEdits).slice(0, LIMITS.edits)) {
    if (!/^[a-z0-9:-]{1,100}$/.test(id) || !e || typeof e !== "object") continue;
    const prompt = str(e.prompt, LIMITS.text).trim();
    if (!prompt) continue;
    edits[id] = { prompt, followUp: str(e.followUp, LIMITS.text), notes: str(e.notes, LIMITS.text), updatedAt: date(e.updatedAt) };
  }
  const custom: CustomPrompt[] = [];
  for (const c of (Array.isArray(doc.custom) ? doc.custom : []).slice(0, LIMITS.custom) as Record<string, unknown>[]) {
    if (!c || typeof c !== "object" || typeof c.id !== "string" || !/^[a-z0-9]{6,40}$/.test(c.id)) continue;
    const title = str(c.title, LIMITS.short).trim();
    const prompt = str(c.prompt, LIMITS.text).trim();
    if (!title || !prompt) continue;
    custom.push({
      id: c.id,
      title,
      category: str(c.category, 40) || "Other",
      app: str(c.app, 40),
      prompt,
      followUp: str(c.followUp, LIMITS.text),
      notes: str(c.notes, LIMITS.text),
      createdAt: date(c.createdAt),
      updatedAt: date(c.updatedAt),
    });
  }
  return { edits, custom };
}
