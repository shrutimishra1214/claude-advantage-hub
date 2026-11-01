// GBP is charged to visitors in the UK, INR only when site.inrForIndia is on, USD to everyone else.
export type Currency = "INR" | "USD" | "GBP";

// What a buyer can own. Customers never buy these one by one: they buy a tier
// (below), and each tier is a set of these. "toolkit" and "claude-system" are
// the implementation systems inside Complete; there is no standalone Toolkit.
export type ProductId = "book" | "toolkit" | "copilot-pro" | "claude-book" | "claude-operator-book" | "claude-system" | "claude-operator";

export type Delivery =
  | { kind: "file"; file: string; filename: string }
  // Hosted content (the member areas). Access details are emailed.
  | { kind: "access"; note: string };

export type Product = {
  id: ProductId;
  name: string;
  short: string;
  // Prices in the smallest unit (cents, pence, paise). For the products inside a
  // tier, this is the price of upgrading to them after buying the tier below.
  price: Record<Currency, number>;
  delivery: Delivery;
  // Only ready products are sold. A tier goes on sale once every product in it is ready.
  ready: boolean;
};

export const products: Record<ProductId, Product> = {
  book: {
    id: "book",
    name: "The Microsoft Copilot Advantage™ (Book)",
    short: "The complete guide (PDF)",
    price: { USD: 2499, GBP: 1999, INR: 99900 },
    delivery: { kind: "file", file: "copilot-advantage.pdf", filename: "The-Microsoft-Copilot-Advantage.pdf" },
    ready: true,
  },
  toolkit: {
    id: "toolkit",
    name: "The Microsoft Copilot Advantage™ implementation system",
    short: "Included in Complete",
    price: { USD: 7400, GBP: 5900, INR: 599900 },
    // Delivered as the member area at /copilot-advantage/members.
    delivery: { kind: "access", note: "Open the member area: the whole implementation system in one place." },
    // TODO: set to true once the member area holds what the sales page promises
    // (250+ recipes, 100 workflows, the template vault). See src/lib/toolkit/.
    ready: false,
  },
  "copilot-pro": {
    id: "copilot-pro",
    name: "The Microsoft Copilot Advantage™ Pro systems",
    short: "Included in Pro",
    price: { USD: 5000, GBP: 4000, INR: 399900 },
    delivery: { kind: "access", note: "Open the member area: your Pro systems are there." },
    // TODO: set to true once the Pro systems exist in the member area.
    ready: false,
  },
  "claude-book": {
    id: "claude-book",
    name: "The Claude Advantage™ (Book)",
    short: "The complete guide (PDF)",
    price: { USD: 2499, GBP: 1999, INR: 99900 },
    delivery: { kind: "file", file: "claude-advantage.pdf", filename: "The-Claude-Advantage.pdf" },
    // Put claude-advantage.pdf in private-files/ before selling it.
    ready: true,
  },
  // Sold only inside the Claude Book tier, together with The Claude Advantage.
  "claude-operator-book": {
    id: "claude-operator-book",
    name: "The Claude Operator (Book)",
    short: "The advanced companion guide (PDF)",
    price: { USD: 0, GBP: 0, INR: 0 },
    // Put claude-operator.pdf in private-files/ before selling it.
    delivery: { kind: "file", file: "claude-operator.pdf", filename: "The-Claude-Operator.pdf" },
    ready: true,
  },
  "claude-system": {
    id: "claude-system",
    name: "The Claude Advantage™ implementation system",
    short: "Included in Complete",
    price: { USD: 9400, GBP: 6900, INR: 799900 },
    // Delivered as the member area at /claude-advantage/members.
    delivery: { kind: "access", note: "Open the member area: the whole implementation system in one place." },
    // TODO: set to true once the member area holds what the sales page promises
    // (250+ prompts, 100+ workflows). See src/lib/claude/.
    ready: false,
  },
  "claude-operator": {
    id: "claude-operator",
    name: "The Claude Advantage™ Pro systems",
    short: "Included in Pro",
    price: { USD: 6000, GBP: 5000, INR: 499900 },
    // The Operator track and the Pro systems in the member area at /claude-advantage/members.
    delivery: { kind: "access", note: "Open the member area: the Operator track and your Pro systems." },
    ready: true,
  },
};

// What a visitor can choose: three tiers per product, plus two bundles of both.
export type TierId = "book" | "complete" | "pro" | "claude-book" | "claude-complete" | "claude-pro" | "both-complete" | "both-pro";

export type Tier = { id: TierId; name: string; label: string; items: ProductId[]; price: Record<Currency, number> };

const COPILOT_COMPLETE: ProductId[] = ["book", "toolkit"];
// The Claude Book tier is both books: The Claude Advantage and The Claude Operator.
const CLAUDE_BOOKS: ProductId[] = ["claude-book", "claude-operator-book"];
const CLAUDE_COMPLETE: ProductId[] = [...CLAUDE_BOOKS, "claude-system"];

export const tiers: Record<TierId, Tier> = {
  book: { id: "book", name: "The Microsoft Copilot Advantage™ Book", label: "Book", items: ["book"], price: products.book.price },
  complete: { id: "complete", name: "The Microsoft Copilot Advantage™ Complete", label: "Complete", items: COPILOT_COMPLETE, price: { USD: 9900, GBP: 7900, INR: 699900 } },
  pro: { id: "pro", name: "The Microsoft Copilot Advantage™ Pro", label: "Pro", items: [...COPILOT_COMPLETE, "copilot-pro"], price: { USD: 14900, GBP: 11900, INR: 1099900 } },
  "claude-book": { id: "claude-book", name: "The Claude Advantage™ Book, with The Claude Operator", label: "Book", items: CLAUDE_BOOKS, price: products["claude-book"].price },
  "claude-complete": { id: "claude-complete", name: "The Claude Advantage™ Complete", label: "Complete", items: CLAUDE_COMPLETE, price: { USD: 11900, GBP: 8900, INR: 899900 } },
  "claude-pro": { id: "claude-pro", name: "The Claude Advantage™ Pro", label: "Pro", items: [...CLAUDE_COMPLETE, "claude-operator"], price: { USD: 17900, GBP: 13900, INR: 1399900 } },
  "both-complete": { id: "both-complete", name: "Both Systems: Complete", label: "Both Complete", items: [...COPILOT_COMPLETE, ...CLAUDE_COMPLETE], price: { USD: 16900, GBP: 12900, INR: 1299900 } },
  "both-pro": { id: "both-pro", name: "Both Systems: Pro", label: "Both Pro", items: [...COPILOT_COMPLETE, "copilot-pro", ...CLAUDE_COMPLETE, "claude-operator"], price: { USD: 24900, GBP: 19900, INR: 1899900 } },
};

export const isTierId = (v: unknown): v is TierId => typeof v === "string" && v in tiers;

/** A tier is on sale once every product in it is ready. Until then it shows as "Coming soon". */
export function isTierOfferable(id: TierId) {
  return tiers[id].items.every(isOfferable);
}

export const isProductId = (v: unknown): v is ProductId =>
  typeof v === "string" && v in products;

/** True until either provider takes real money. The member areas stay open for previewing until then. */
export function isTestMode() {
  const razorpayLive = (process.env.RAZORPAY_KEY_ID ?? "").startsWith("rzp_live_");
  const paddleLive = process.env.PADDLE_ENVIRONMENT === "production" && Boolean(process.env.PADDLE_API_KEY);
  return !razorpayLive && !paddleLive;
}

export function isOfferable(id: ProductId) {
  return products[id].ready;
}

export function formatPrice(minor: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : currency === "GBP" ? "en-GB" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: minor % 100 === 0 ? 0 : 2,
  }).format(minor / 100);
}
