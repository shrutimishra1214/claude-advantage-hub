import { NextResponse } from "next/server";
import { claimSpot, isStoreConfigured, TOTAL_SPOTS } from "@/lib/early-readers";
import { sendEarlyReaderEmails } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USAGE = ["Every day", "A few times a week", "Rarely", "Not yet"];

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Bots fill every field, including this hidden one.
  if (body.website) return NextResponse.json({ spot: 0 });

  const name = str(body.name, 100);
  const email = str(body.email, 200).toLowerCase();
  const role = str(body.role, 120);
  const usage = USAGE.includes(body.usage) ? body.usage : "";
  const linkedin = str(body.linkedin, 200);

  if (!name || !EMAIL.test(email) || !role || !usage)
    return NextResponse.json({ error: "Please fill in your name, email, role and how often you use Copilot." }, { status: 400 });
  if (body.agree !== true)
    return NextResponse.json({ error: "Please agree to record a short, honest video review." }, { status: 400 });
  if (!isStoreConfigured())
    return NextResponse.json({ error: "Applications aren't open yet. Please check back soon." }, { status: 503 });

  try {
    const spot = await claimSpot({ name, email, role, usage, linkedin, claimedAt: new Date().toISOString() });
    if (spot === -1) return NextResponse.json({ error: `Sorry, all ${TOTAL_SPOTS} spots were just claimed.`, full: true }, { status: 409 });
    if (spot === -2) return NextResponse.json({ error: "You've already claimed a spot with this email. We'll be in touch soon." }, { status: 409 });

    await sendEarlyReaderEmails({ name, email, role, usage, linkedin, spot }).catch((err) => console.error(err));
    return NextResponse.json({ spot });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't save your application. Please try again." }, { status: 502 });
  }
}
