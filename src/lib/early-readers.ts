import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { redis, redisConfig } from "./kv";

// The early reader program: the first few applicants each claim a spot,
// get the book free, and record an honest video review in return.

export const TOTAL_SPOTS = 3;

export type Application = {
  name: string;
  email: string;
  role: string;
  usage: string;
  linkedin: string;
  claimedAt: string;
};

const KEY = "early-readers";

// Claims a spot atomically: no duplicate emails, never more than TOTAL_SPOTS.
// Returns the spot number, -1 when full, or -2 when this email already has one.
const CLAIM_SCRIPT = `
if redis.call('HEXISTS', KEYS[1], ARGV[1]) == 1 then return -2 end
if redis.call('HLEN', KEYS[1]) >= tonumber(ARGV[3]) then return -1 end
redis.call('HSET', KEYS[1], ARGV[1], ARGV[2])
return redis.call('HLEN', KEYS[1])
`;

// ── Storage: Upstash Redis (Vercel KV) in production, a JSON file locally ──
const FILE = path.join(process.cwd(), ".data", "early-readers.json");

async function readFileStore(): Promise<Record<string, Application>> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function writeFileStore(data: Record<string, Application>) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

/** False on a live site with no database connected: applications can't be saved. */
export function isStoreConfigured() {
  return Boolean(redisConfig()) || process.env.NODE_ENV !== "production";
}

// ── Public API ──

export async function countClaimed(): Promise<number> {
  if (redisConfig()) return Math.min(TOTAL_SPOTS, await redis<number>(["HLEN", KEY]));
  if (!isStoreConfigured()) return 0;
  return Math.min(TOTAL_SPOTS, Object.keys(await readFileStore()).length);
}

export async function claimSpot(app: Application): Promise<number> {
  const email = app.email.toLowerCase();
  if (redisConfig()) {
    return redis<number>(["EVAL", CLAIM_SCRIPT, 1, KEY, email, JSON.stringify(app), TOTAL_SPOTS]);
  }
  const data = await readFileStore();
  if (data[email]) return -2;
  if (Object.keys(data).length >= TOTAL_SPOTS) return -1;
  data[email] = app;
  await writeFileStore(data);
  return Object.keys(data).length;
}

export async function listApplications(): Promise<Application[]> {
  const rows = redisConfig()
    ? Object.values(
        (await redis<string[]>(["HGETALL", KEY])).reduce<Record<string, Application>>((acc, v, i, arr) => {
          if (i % 2 === 0) acc[v] = JSON.parse(arr[i + 1]);
          return acc;
        }, {}),
      )
    : Object.values(await readFileStore());
  return rows.sort((a, b) => a.claimedAt.localeCompare(b.claimedAt));
}

/** Frees a spot, e.g. for a fake application or someone who dropped out. */
export async function releaseSpot(email: string) {
  if (redisConfig()) return void (await redis(["HDEL", KEY, email.toLowerCase()]));
  const data = await readFileStore();
  delete data[email.toLowerCase()];
  await writeFileStore(data);
}
