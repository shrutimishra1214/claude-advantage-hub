import { createHmac, timingSafeEqual } from "node:crypto";

function secret() {
  const s = process.env.APP_SECRET;
  if (!s || s.length < 32) throw new Error("APP_SECRET must be set to a random string of at least 32 characters");
  return s;
}

const b64 = (buf: Buffer | string) => Buffer.from(buf).toString("base64url");

function mac(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Signs a JSON payload that expires after `ttlSeconds`. */
export function sign<T extends object>(data: T, ttlSeconds: number): string {
  const payload = b64(JSON.stringify({ ...data, exp: Math.floor(Date.now() / 1000) + ttlSeconds }));
  return `${payload}.${mac(payload)}`;
}

/** Returns the payload if the signature is valid and unexpired, else null. */
export function verify<T>(token: string | undefined | null): T | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(mac(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000) return null;
    return data as T;
  } catch {
    return null;
  }
}

export function safeEqualHex(a: string, b: string) {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}
