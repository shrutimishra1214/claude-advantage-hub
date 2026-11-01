export type Currency = "INR" | "USD";

export type ProductId =
  | "book"
  | "toolkit"
  | "claude-book"
  | "claude-system"
  | "claude-operator"
  | "masterclass"
  | "masterclass-essentials"
  | "agent-kit"
  | "agent-blueprints";

export type Delivery =
  | { kind: "file"; file: string; filename: string }
  // Hosted content (videos, course portal). Access details are emailed.
  | { kind: "access"; note: string };

export type Product = {
  id: ProductId;
  name: string;
  short: string;
  // Prices in the smallest unit: paise for INR, cents for USD.
  price: Record<Currency, number>;
  compareAt?: Record<Currency, number>;
  delivery: Delivery;
  // Only ready products are sold on the live site. In Razorpay test mode
  // every product is shown so the whole funnel can be tried end to end.
  ready: boolean;
  bullets: string[];
};

export const products: Record<ProductId, Product> = {
  book: {
    id: "book",
    name: "The Microsoft Copilot Advantage",
    short: "The complete guide (PDF)",
    price: { INR: 49900, USD: 1999 },
    delivery: { kind: "file", file: "copilot-advantage.pdf", filename: "The-Microsoft-Copilot-Advantage.pdf" },
    ready: true,
    bullets: [
      "The complete guide: 39 chapters, 175+ pages",
      "Copilot fundamentals",
      "Microsoft 365 workflows",
      "The G-C-S-E prompting framework",
      "Practical, worked examples",
    ],
  },
  toolkit: {
    id: "toolkit",
    name: "The Copilot Advantage Toolkit",
    short: "Prompt Library, Workflow Vault, templates and the 30-day path",
    price: { INR: 199900, USD: 7900 },
    // Delivered as the member area at /members.
    delivery: { kind: "access", note: "Open the member area: everything in the Toolkit, in one place." },
    // TODO: set to true once the member area holds what the sales page promises
    // (250+ recipes, 100 workflows, 30+ templates). See src/lib/toolkit/.
    ready: false,
    bullets: [
      "250+ Prompt Recipes",
      "100 Workflows",
      "30+ Templates",
      "30-Day Transformation",
      "Prompt Builder",
      "Cheat Sheets",
      "Cross-App Workflow Library",
    ],
  },
  "claude-book": {
    id: "claude-book",
    name: "The Claude Advantage",
    short: "Master Advanced Claude AI Workflows (PDF)",
    price: { INR: 49900, USD: 1999 },
    delivery: { kind: "file", file: "claude-advantage.pdf", filename: "The-Claude-Advantage.pdf" },
    // Put claude-advantage.pdf in private-files/ before selling it.
    ready: true,
    bullets: ["The complete guide to working with Claude", "Prompting, research, writing and analysis", "Projects, Claude Code, Cowork and Design", "Practical, worked examples"],
  },
  "claude-system": {
    id: "claude-system",
    name: "The Claude Advantage System",
    short: "Prompt system, workflow vault, playbooks and the 30-day transformation",
    price: { INR: 199900, USD: 7900 },
    // Delivered as the member area at /claude-advantage/members.
    delivery: { kind: "access", note: "Open the member area: the whole Claude Advantage system in one place." },
    // TODO: set to true once the member area holds what the sales page promises
    // (250+ prompts, 100+ workflows). See src/lib/claude/.
    ready: false,
    bullets: [
      "250+ Advanced Prompt Recipes",
      "100+ Advanced AI Workflows",
      "Claude Code, Cowork & Design workflows",
      "Research & Project systems",
      "Context Kit templates & role playbooks",
      "30-Day Claude Transformation",
      "Prompt Builder & worksheets",
    ],
  },
  "claude-operator": {
    id: "claude-operator",
    name: "The Claude Operator",
    short: "The advanced level: the book and the Operator track",
    price: { INR: 99900, USD: 4900 },
    // The PDF, plus the Operator track in the member area. Put claude-operator.pdf in private-files/.
    delivery: { kind: "file", file: "claude-operator.pdf", filename: "The-Claude-Operator.pdf" },
    ready: true,
    bullets: [
      "The Claude Operator book: 23 chapters and 5 capstones",
      "Build your AI Chief of Staff, module by module",
      "The Skills Library: every Skill Drop, ready to install",
      "25 ready-to-run Operator workflows",
      "The 30-Day Operator Plan and the Operator Scale",
    ],
  },
  masterclass: {
    id: "masterclass",
    name: "Copilot Advantage Masterclass",
    short: "Video lessons for all 9 apps",
    price: { INR: 199900, USD: 9700 },
    compareAt: { INR: 499900, USD: 19700 },
    delivery: { kind: "access", note: "Course access is sent to your email." },
    ready: false,
    bullets: [
      "Watch every workflow from the book done live, on screen",
      "9 modules, one per app, in short focused lessons",
      "Practice files so you can follow along",
      "Lifetime access, including future updates",
    ],
  },
  "masterclass-essentials": {
    id: "masterclass-essentials",
    name: "Masterclass Essentials",
    short: "Video lessons for Outlook, Excel and Teams",
    price: { INR: 99900, USD: 4700 },
    compareAt: { INR: 199900, USD: 9700 },
    delivery: { kind: "access", note: "Course access is sent to your email." },
    ready: false,
    bullets: [
      "The three apps people use most at work",
      "Same lessons and practice files as the full Masterclass",
      "Lifetime access",
    ],
  },
  "agent-kit": {
    id: "agent-kit",
    name: "Copilot Studio Agent Kit",
    short: "10 agent templates with build videos",
    price: { INR: 149900, USD: 6700 },
    compareAt: { INR: 299900, USD: 12900 },
    delivery: { kind: "access", note: "Kit access is sent to your email." },
    ready: false,
    bullets: [
      "10 ready-to-build custom agents for real business tasks",
      "Step-by-step build videos for each one",
      "Instructions, knowledge-source setups and test prompts included",
    ],
  },
  "agent-blueprints": {
    id: "agent-blueprints",
    name: "Agent Blueprints",
    short: "The 10 agent templates as a PDF",
    price: { INR: 49900, USD: 2700 },
    compareAt: { INR: 149900, USD: 6700 },
    delivery: { kind: "file", file: "copilot-agent-blueprints.pdf", filename: "Copilot-Agent-Blueprints.pdf" },
    ready: false,
    bullets: [
      "All 10 agent templates from the Agent Kit",
      "Written build steps, without the videos",
    ],
  },
};

// What a visitor can choose on the sales page. A tier is a price for a set of products.
export type TierId = "book" | "toolkit" | "bundle" | "claude-book" | "claude-system" | "claude-bundle" | "claude-operator";

export type Tier = { id: TierId; name: string; label: string; items: ProductId[]; price: Record<Currency, number> };

export const tiers: Record<TierId, Tier> = {
  book: { id: "book", name: "The Microsoft Copilot Advantage", label: "Book", items: ["book"], price: products.book.price },
  toolkit: { id: "toolkit", name: "The Copilot Advantage Toolkit", label: "Toolkit", items: ["toolkit"], price: products.toolkit.price },
  bundle: { id: "bundle", name: "Book + Toolkit", label: "Complete Bundle", items: ["book", "toolkit"], price: { INR: 249900, USD: 9900 } },
  "claude-book": { id: "claude-book", name: "The Claude Advantage (Book)", label: "Book", items: ["claude-book"], price: products["claude-book"].price },
  "claude-system": { id: "claude-system", name: "The Claude Advantage System", label: "System", items: ["claude-system"], price: products["claude-system"].price },
  "claude-bundle": { id: "claude-bundle", name: "Book + System", label: "Complete Bundle", items: ["claude-book", "claude-system"], price: { INR: 249900, USD: 9900 } },
  // The advanced level: everything in the Complete Bundle plus The Claude Operator.
  "claude-operator": {
    id: "claude-operator",
    name: "The Claude Operator Edition",
    label: "Operator",
    items: ["claude-book", "claude-system", "claude-operator"],
    price: { INR: 399900, USD: 14900 },
  },
};

// Shown as "Coming soon" and never sold until it exists.
// Each line lists a Pro tier as "Coming soon" at this price.
export const proPrice: Record<Currency, number> = { INR: 399900, USD: 14900 };

export const isTierId = (v: unknown): v is TierId => typeof v === "string" && v in tiers;

export function isTierOfferable(id: TierId) {
  return tiers[id].items.every(isOfferable);
}

export const isProductId = (v: unknown): v is ProductId =>
  typeof v === "string" && v in products;

/**
 * True until either provider takes real money. Every product is then shown so
 * the whole funnel can be tried; once one provider is live, only ready products are.
 */
export function isTestMode() {
  const razorpayLive = (process.env.RAZORPAY_KEY_ID ?? "").startsWith("rzp_live_");
  const paddleLive = process.env.PADDLE_ENVIRONMENT === "production" && Boolean(process.env.PADDLE_API_KEY);
  return !razorpayLive && !paddleLive;
}

export function isOfferable(id: ProductId) {
  return products[id].ready || isTestMode();
}

export function formatPrice(minor: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: minor % 100 === 0 ? 0 : 2,
  }).format(minor / 100);
}
