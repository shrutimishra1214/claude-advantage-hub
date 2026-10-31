import { isOfferable, products, type Currency, type ProductId } from "./products";

// After the main purchase the buyer walks through these offers in order.
// Accepting or declining an offer moves them to the next step.
export type StepId = "toolkit-upgrade" | "masterclass" | "masterclass-essentials" | "agent-kit" | "agent-blueprints";

type Step = {
  product: ProductId;
  kind: "upsell" | "downsell";
  onAccept: StepId | "done";
  onDecline: StepId | "done";
  // A one-time price for this offer, instead of the product's normal price.
  price?: Record<Currency, number>;
};

export const steps: Record<StepId, Step> = {
  // Book buyers can add the Toolkit for less than buying it on its own.
  "toolkit-upgrade": { product: "toolkit", kind: "upsell", onAccept: "masterclass", onDecline: "masterclass", price: { INR: 149900, USD: 5900 } },
  masterclass: { product: "masterclass", kind: "upsell", onAccept: "agent-kit", onDecline: "masterclass-essentials" },
  "masterclass-essentials": { product: "masterclass-essentials", kind: "downsell", onAccept: "agent-kit", onDecline: "agent-kit" },
  "agent-kit": { product: "agent-kit", kind: "upsell", onAccept: "done", onDecline: "agent-blueprints" },
  "agent-blueprints": { product: "agent-blueprints", kind: "downsell", onAccept: "done", onDecline: "done" },
};

export const FIRST_STEP: StepId = "toolkit-upgrade";

export const isStepId = (v: unknown): v is StepId => typeof v === "string" && v in steps;

// Owning the full version of an offer makes its cheaper version pointless.
const coveredBy: Partial<Record<ProductId, ProductId>> = {
  "masterclass-essentials": "masterclass",
  "agent-blueprints": "agent-kit",
};

function shouldShow(step: StepId, owned: ProductId[]) {
  const product = steps[step].product;
  const cover = coveredBy[product];
  return isOfferable(product) && !owned.includes(product) && !(cover && owned.includes(cover));
}

export function stepPrice(step: StepId, currency: Currency) {
  return (steps[step].price ?? products[steps[step].product].price)[currency];
}

/** Walks forward from `start` to the first offer worth showing, or "done". */
export function resolveStep(start: StepId | "done", owned: ProductId[]): StepId | "done" {
  let current = start;
  for (let i = 0; i < 10 && current !== "done"; i++) {
    if (shouldShow(current, owned)) return current;
    current = steps[current].onDecline;
  }
  return "done";
}

export function stepUrl(step: StepId | "done") {
  return step === "done" ? "/thank-you" : `/offer/${step}`;
}
