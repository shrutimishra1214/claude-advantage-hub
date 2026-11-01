import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { lines } from "@/lib/lines";

// Signs a member out on this device: both the member cookie and the purchase
// session grant access, so both go.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const jar = await cookies();
  jar.delete("kv_member");
  jar.delete("kv_session");
  const L = url.searchParams.get("line") === "claude" ? lines.claude : lines.copilot;
  return NextResponse.redirect(new URL(L.base, url));
}
