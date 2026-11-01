import { cookies } from "next/headers";
import { sign, verify } from "./signing";
import type { Currency, ProductId } from "./products";

// The buyer's purchases during this visit, kept in a signed cookie so the
// upsell pages can prefill checkout and the thank-you page can list downloads.
export type Customer = { name: string; email: string; contact: string };
export type Session = { customer: Customer; currency: Currency; owned: ProductId[] };

const COOKIE = "kv_session";
const TTL = 60 * 60 * 24 * 30;

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  return verify<Session>(jar.get(COOKIE)?.value);
}

export async function setSession(session: Session) {
  const jar = await cookies();
  jar.set(COOKIE, sign(session, TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL,
  });
}

// Links in purchase emails carry their own token so they work on any device.
export type LibraryGrant = { email: string; owned: ProductId[] };
export const LIBRARY_TTL = 60 * 60 * 24 * 365;
export const libraryToken = (grant: LibraryGrant) => sign(grant, LIBRARY_TTL);
export const readLibraryToken = (token: string | undefined | null) => verify<LibraryGrant>(token);
