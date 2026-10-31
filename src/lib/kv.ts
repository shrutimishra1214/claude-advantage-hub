// Upstash Redis (Vercel KV) over its REST API. Used where data must survive
// across devices; each feature keeps a local file fallback for development.

export function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

export async function redis<T>(command: (string | number)[]): Promise<T> {
  const cfg = redisConfig()!;
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(`Redis ${command[0]} failed: ${data.error ?? res.status}`);
  return data.result as T;
}
