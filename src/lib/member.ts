import { cookies } from "next/headers";
import { isTestMode, type ProductId } from "./products";
import { getSession } from "./session";
import { sign, verify } from "./signing";

// Toolkit owners get a year-long cookie for the member area, set when they
// pay or when they open the link in their purchase email.
export type Member = { email: string; name: string; preview: boolean };

const COOKIE = "kv_member";
const TTL = 60 * 60 * 24 * 365;

export const ownsToolkit = (owned: ProductId[]) => owned.includes("toolkit");

export async function setMember(m: { email: string; name: string }) {
  (await cookies()).set(COOKIE, sign(m, TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL,
  });
}

/** The signed-in member, or a preview member while developing or using test keys. */
export async function getMember(): Promise<Member | null> {
  const saved = verify<{ email: string; name: string }>((await cookies()).get(COOKIE)?.value);
  if (saved) return { ...saved, preview: false };
  const session = await getSession();
  if (session && ownsToolkit(session.owned)) return { email: session.customer.email, name: session.customer.name, preview: false };
  if (process.env.NODE_ENV !== "production" || isTestMode()) return { email: "", name: "", preview: true };
  return null;
}
