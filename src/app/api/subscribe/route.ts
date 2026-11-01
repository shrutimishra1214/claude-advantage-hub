import { NextResponse } from "next/server";

// Reader-list signups from the book companion pages (ported from the
// claude-advantage-hub server function). Brevo lists: 6 The Claude Advantage,
// 7 The Microsoft Copilot Advantage, 8 The Claude Operator.
const LISTS = new Set([6, 7, 8]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown; name?: unknown; listId?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const listId = body?.listId ?? 6;
  if (!EMAIL.test(email) || email.length > 254 || name.length > 100 || typeof listId !== "number" || !LISTS.has(listId)) {
    return NextResponse.json({ ok: false, status: 400, reason: "invalid_input" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim().replace(/^['"]|['"]$/g, "");
  if (!apiKey) {
    console.error("[Brevo] BREVO_API_KEY is not configured");
    return NextResponse.json({ ok: false, status: 500, reason: "missing_api_key" });
  }
  if (!apiKey.startsWith("xkeysib-")) {
    console.error("[Brevo] BREVO_API_KEY does not look like a Brevo v3 API key");
    return NextResponse.json({ ok: false, status: 401, reason: "invalid_api_key" });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({ email, attributes: name ? { FIRSTNAME: name } : {}, listIds: [listId], updateEnabled: true }),
  });
  if (!res.ok) {
    console.error(`[Brevo] ${res.status}: ${await res.text()}`);
    return NextResponse.json({ ok: false, status: res.status, reason: res.status === 401 ? "invalid_api_key" : "brevo_error" });
  }
  return NextResponse.json({ ok: true });
}
