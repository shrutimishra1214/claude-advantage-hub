import { NextResponse } from "next/server";
import { getMember } from "@/lib/member";
import { isPromptStoreAvailable, loadMyPrompts, sanitize, saveMyPrompts } from "@/lib/my-prompts";

// A member's prompt library. 503 means "no database here: keep it in the browser".

export async function GET() {
  const member = await getMember();
  if (!member) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!isPromptStoreAvailable()) return NextResponse.json({ error: "No prompt storage" }, { status: 503 });
  return NextResponse.json(await loadMyPrompts(member.email), { headers: { "Cache-Control": "private, no-store" } });
}

export async function PUT(req: Request) {
  const member = await getMember();
  if (!member) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!isPromptStoreAvailable()) return NextResponse.json({ error: "No prompt storage" }, { status: 503 });
  const raw = await req.text();
  if (raw.length > 2_000_000) return NextResponse.json({ error: "Your prompt library is too large to save" }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const doc = sanitize(body);
  await saveMyPrompts(member.email, doc);
  return NextResponse.json(doc);
}
