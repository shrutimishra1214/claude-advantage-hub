export type Currency = "INR" | "USD";

export type ProductId =
  | "book"
  | "vault"
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
    short: "The complete ebook (PDF)",
    price: { INR: 49900, USD: 2700 },
    compareAt: { INR: 99900, USD: 4900 },
    delivery: { kind: "file", file: "copilot-advantage.pdf", filename: "The-Microsoft-Copilot-Advantage.pdf" },
    ready: true,
    bullets: [
      "The Copilot Playbook: 39 step-by-step chapters across all 9 apps",
      "The Prompt Library, organised by the work you're doing",
      "The Workflow & Loop Library for real business scenarios",
      "The 90-Day Mastery Plan, one habit at a time",
      "Agent building, safety & governance, and business-case guides",
      "Companion templates, prompts and practice files",
    ],
  },
  vault: {
    id: "vault",
    name: "Copilot Prompt Vault",
    short: "300+ ready-to-copy prompts",
    price: { INR: 29900, USD: 1700 },
    compareAt: { INR: 79900, USD: 3900 },
    delivery: { kind: "file", file: "copilot-prompt-vault.pdf", filename: "Copilot-Prompt-Vault.pdf" },
    ready: false,
    bullets: [
      "300+ prompts organised by app and by job role",
      "Copy, paste, and fill in the blanks",
      "Prompts for email, reports, analysis, meetings and slides",
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

export const isProductId = (v: unknown): v is ProductId =>
  typeof v === "string" && v in products;

export function isTestMode() {
  return (process.env.RAZORPAY_KEY_ID ?? "").startsWith("rzp_test_");
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
