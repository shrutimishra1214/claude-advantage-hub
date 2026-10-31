import { NextResponse } from "next/server";
import { ownsToolkit, setMember } from "@/lib/member";
import { readLibraryToken } from "@/lib/session";

// The "Open the Copilot Advantage" link in purchase emails lands here.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t");
  const grant = readLibraryToken(token);
  if (!grant || !ownsToolkit(grant.owned)) return NextResponse.redirect(new URL(token ? `/thank-you?t=${encodeURIComponent(token)}` : "/members", url));
  await setMember({ email: grant.email, name: "" });
  return NextResponse.redirect(new URL("/members", url));
}
