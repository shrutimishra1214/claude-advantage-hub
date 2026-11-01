import { NextResponse } from "next/server";
import { memberLanding, ownsMemberProduct, setMember } from "@/lib/member";
import { readLibraryToken } from "@/lib/session";

// The "Open your member area" link in purchase emails, and the sign-in links
// sent from /login, land here. `next` returns the member to the page they wanted.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t");
  const grant = readLibraryToken(token);
  if (!grant) return NextResponse.redirect(new URL("/login?expired=1", url));
  if (!ownsMemberProduct(grant.owned)) return NextResponse.redirect(new URL(`/thank-you?t=${encodeURIComponent(token!)}`, url));
  await setMember({ email: grant.email, name: "", owned: grant.owned });
  return NextResponse.redirect(new URL(memberLanding(grant.owned, url.searchParams.get("next")), url));
}
