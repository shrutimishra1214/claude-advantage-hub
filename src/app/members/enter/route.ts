import { NextResponse } from "next/server";
import { lineOfProduct, lines } from "@/lib/lines";
import { memberProducts, ownsMemberProduct, setMember } from "@/lib/member";
import { readLibraryToken } from "@/lib/session";

// The "Open your member area" link in purchase emails lands here.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t");
  const grant = readLibraryToken(token);
  if (!grant || !ownsMemberProduct(grant.owned)) return NextResponse.redirect(new URL(token ? `/thank-you?t=${encodeURIComponent(token)}` : "/members", url));
  await setMember({ email: grant.email, name: "", owned: grant.owned });
  const first = grant.owned.find((p) => memberProducts.includes(p))!;
  return NextResponse.redirect(new URL(lines[lineOfProduct(first)].members, url));
}
