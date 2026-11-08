import { cookies } from "next/headers";
import { lines, type LineId } from "./lines";
import { isTestMode, type ProductId } from "./products";
import { getSession } from "./session";
import { sign, verify } from "./signing";

// Every buyer gets a year-long cookie listing what they own, set when they pay,
// open the link in their purchase email or sign in. It opens their library, the
// Operator Toolkit for Claude Book buyers and, for member products, the member areas.
export type Member = { email: string; name: string; owned: ProductId[]; preview: boolean };

const COOKIE = "kv_member";
const TTL = 60 * 60 * 24 * 365;

/** Products that unlock a member area. */
export const memberProducts: ProductId[] = ["toolkit", "copilot-pro", "claude-system", "claude-operator"];
export const ownsMemberProduct = (owned: ProductId[]) => owned.some((p) => memberProducts.includes(p));
/** @deprecated kept for older call sites */
export const ownsToolkit = ownsMemberProduct;

const linesUnlockedBy: Record<LineId, ProductId[]> = {
  copilot: ["toolkit", "copilot-pro"],
  claude: ["claude-system", "claude-operator"],
};

export async function setMember(m: { email: string; name: string; owned: ProductId[] }) {
  const jar = await cookies();
  const prev = verify<{ email: string; owned?: ProductId[] }>(jar.get(COOKIE)?.value);
  const carried = prev && prev.email === m.email ? prev.owned ?? ["toolkit"] : [];
  const owned = Array.from(new Set([...carried, ...m.owned]));
  jar.set(COOKIE, sign({ email: m.email, name: m.name, owned }, TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL,
  });
}

/** The member of a line's area, or a preview member (owning everything) while developing or using test keys. */
export async function getMember(line: LineId = "copilot"): Promise<Member | null> {
  const unlocks = linesUnlockedBy[line];
  // Cookies from before product lines existed only ever granted the Copilot Toolkit.
  const saved = verify<{ email: string; name: string; owned?: ProductId[] }>((await cookies()).get(COOKIE)?.value);
  if (saved) {
    const owned = saved.owned ?? ["toolkit"];
    if (owned.some((p) => unlocks.includes(p))) return { email: saved.email, name: saved.name, owned, preview: false };
  }
  const session = await getSession();
  if (session && session.owned.some((p) => unlocks.includes(p)))
    return { email: session.customer.email, name: session.customer.name, owned: session.owned, preview: false };
  if (process.env.NODE_ENV !== "production" || isTestMode())
    return { email: "", name: "", owned: [...memberProducts], preview: true };
  return null;
}

export const memberHome = (line: LineId) => lines[line].members;

/** The buyer signed in on this device, from their signed cookies only. Never a preview member, never anything the browser claims. */
export async function getSignedInBuyer(): Promise<{ email: string } | null> {
  const saved = verify<{ email: string }>((await cookies()).get(COOKIE)?.value);
  if (saved?.email) return { email: saved.email };
  const session = await getSession();
  return session?.customer.email ? { email: session.customer.email } : null;
}

/** Pages that open for owners of one of these products (besides the member areas). */
export const readerAreas = [{ prefix: "/claude-advantage/operator-toolkit", unlocks: ["claude-operator-book", "claude-operator"] as ProductId[] }];

/** Where a buyer goes after signing in: `next` when they own it, else their first member area, else their library. */
export function memberLanding(owned: ProductId[], next?: string | null): string {
  const inside = (prefix: string) => !!next && (next === prefix || next.startsWith(`${prefix}/`) || next.startsWith(`${prefix}#`));
  const open = (Object.keys(linesUnlockedBy) as LineId[]).filter((line) => owned.some((p) => linesUnlockedBy[line].includes(p)));
  if (open.some((line) => inside(lines[line].members))) return next!;
  if (readerAreas.some((a) => inside(a.prefix) && owned.some((p) => a.unlocks.includes(p)))) return next!;
  if (next === "/library") return next;
  return open[0] ? lines[open[0]].members : "/library";
}

/** Everything this device's buyer owns: from the year-long cookie and the checkout session. */
export async function ownedOnThisDevice(): Promise<{ email: string; owned: ProductId[] } | null> {
  const saved = verify<{ email: string; owned?: ProductId[] }>((await cookies()).get(COOKIE)?.value);
  const session = await getSession();
  const owned = Array.from(new Set([...(saved ? saved.owned ?? ["toolkit"] : []), ...(session?.owned ?? [])]));
  const email = saved?.email || session?.customer.email || "";
  return owned.length ? { email, owned } : null;
}
