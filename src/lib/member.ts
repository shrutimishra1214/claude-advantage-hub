import { cookies } from "next/headers";
import { lines, type LineId } from "./lines";
import { isTestMode, type ProductId } from "./products";
import { getSession } from "./session";
import { sign, verify } from "./signing";

// Buyers of a member product get a year-long cookie for the member area, set
// when they pay or when they open the link in their purchase email.
export type Member = { email: string; name: string; owned: ProductId[]; preview: boolean };

const COOKIE = "kv_member";
const TTL = 60 * 60 * 24 * 365;

/** Products that unlock a member area. */
export const memberProducts: ProductId[] = ["toolkit", "claude-system", "claude-operator"];
export const ownsMemberProduct = (owned: ProductId[]) => owned.some((p) => memberProducts.includes(p));
/** @deprecated kept for older call sites */
export const ownsToolkit = ownsMemberProduct;

const linesUnlockedBy: Record<LineId, ProductId[]> = {
  copilot: ["toolkit"],
  claude: ["claude-system", "claude-operator"],
};

export async function setMember(m: { email: string; name: string; owned: ProductId[] }) {
  const jar = await cookies();
  const prev = verify<{ email: string; owned?: ProductId[] }>(jar.get(COOKIE)?.value);
  const carried = prev && prev.email === m.email ? prev.owned ?? ["toolkit"] : [];
  const owned = Array.from(new Set([...carried, ...m.owned])).filter((p) => memberProducts.includes(p));
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

/** Where a member goes after signing in: `next` when it's inside an area they own, else the first area they own. */
export function memberLanding(owned: ProductId[], next?: string | null): string {
  const open = (Object.keys(linesUnlockedBy) as LineId[]).filter((line) => owned.some((p) => linesUnlockedBy[line].includes(p)));
  const target = next && open.find((line) => next === lines[line].members || next.startsWith(`${lines[line].members}/`));
  return target ? next! : lines[open[0] ?? "copilot"].members;
}
