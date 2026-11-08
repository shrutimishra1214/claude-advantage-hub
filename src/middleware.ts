import { NextResponse, type NextRequest } from "next/server";

// Keeps the member areas and the Operator Toolkit closed to anyone who hasn't bought them.
// It runs before any member page is rendered, so nothing from those pages is
// sent to visitors without access; they go to /login instead. It checks the
// same signed cookies as src/lib/member.ts, with Web Crypto so it also runs on
// Cloudflare Workers.

const areas = [
  { line: "copilot", prefix: "/copilot-advantage/members", unlocks: ["toolkit", "copilot-pro"] },
  { line: "claude", prefix: "/claude-advantage/members", unlocks: ["claude-system", "claude-operator"] },
  // The Operator Toolkit comes with The Claude Operator, inside every Claude tier.
  { line: "claude", prefix: "/claude-advantage/operator-toolkit", unlocks: ["claude-operator-book", "claude-operator"] },
] as const;

type Signed = { owned?: string[]; exp?: number };

const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

/** Verifies a token made by sign() in src/lib/signing.ts and returns its payload, or null. */
async function verify(token: string | undefined, secret: string): Promise<Signed | null> {
  const [payload, sig] = token?.split(".") ?? [];
  if (!payload || !sig) return null;
  try {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("HMAC", key, fromB64url(sig), new TextEncoder().encode(payload));
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as Signed;
    return typeof data.exp === "number" && data.exp > Date.now() / 1000 ? data : null;
  } catch {
    return null;
  }
}

/** Matches isTestMode() in src/lib/products.ts: no live payment keys yet, so the areas are open for previewing. */
function previewing() {
  const razorpayLive = (process.env.RAZORPAY_KEY_ID ?? "").startsWith("rzp_live_");
  const paddleLive = process.env.PADDLE_ENVIRONMENT === "production" && Boolean(process.env.PADDLE_API_KEY);
  return process.env.NODE_ENV !== "production" || (!razorpayLive && !paddleLive);
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const area = areas.find((a) => pathname === a.prefix || pathname.startsWith(`${a.prefix}/`));
  if (!area || previewing()) return NextResponse.next();

  const secret = process.env.APP_SECRET ?? "";
  if (secret.length >= 32) {
    // Cookies from before product lines existed only ever granted the Copilot Toolkit.
    const member = await verify(req.cookies.get("kv_member")?.value, secret);
    const session = await verify(req.cookies.get("kv_session")?.value, secret);
    const owned = [...(member ? member.owned ?? ["toolkit"] : []), ...(session?.owned ?? [])];
    if (owned.some((p) => (area.unlocks as readonly string[]).includes(p))) return NextResponse.next();
  }

  const login = new URL("/login", req.url);
  login.searchParams.set("line", area.line);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/copilot-advantage/members/:path*", "/claude-advantage/members/:path*", "/claude-advantage/operator-toolkit/:path*"] };
