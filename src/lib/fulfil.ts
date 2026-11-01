import { recordPurchase } from "./buyers";
import { firstStepFor, isStepId, resolveStep, stepUrl, steps } from "./funnel";
import { ownsMemberProduct, setMember } from "./member";
import type { Currency, ProductId } from "./products";
import { getSession, setSession, type Customer } from "./session";

/**
 * Records a confirmed payment in the buyer's session (whichever provider took
 * it) and returns where they go next in the funnel.
 */
export async function completePurchase(p: { customer: Customer; currency: Currency; items: ProductId[]; step: string }) {
  const previous = await getSession();
  const carried = previous && previous.customer.email === p.customer.email ? previous.owned : [];
  const owned = Array.from(new Set([...carried, ...p.items]));
  await setSession({ customer: p.customer, currency: p.currency, owned });
  // The webhook records it too; this covers the buyer who's already back on the site.
  await recordPurchase({ email: p.customer.email, name: p.customer.name, items: p.items });
  if (ownsMemberProduct(owned)) await setMember({ email: p.customer.email, name: p.customer.name, owned });
  const next = isStepId(p.step) ? resolveStep(steps[p.step].onAccept, owned) : resolveStep(firstStepFor(p.items), owned);
  return stepUrl(next);
}

// What we promised to sell, signed into the Paddle checkout so the server can
// check the transaction it gets back against it.
export type PaddleIntent = { items: ProductId[]; priceId: string; step: string; name: string; email: string; contact: string };
export const PADDLE_INTENT_TTL = 60 * 60 * 24 * 7;
