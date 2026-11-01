import { isOfferable, products, type Currency, type ProductId } from "./products";

// After a purchase the buyer is offered the next tier up, once: Book buyers
// are offered Complete, Complete buyers are offered Pro.
export type StepId = "complete-upgrade" | "pro-upgrade" | "claude-complete-upgrade" | "claude-pro-upgrade";

type Step = {
  product: ProductId;
  kind: "upsell";
  onAccept: StepId | "done";
  onDecline: StepId | "done";
  // Only offered to buyers who own this (Pro builds on Complete).
  requires?: ProductId;
};

export const steps: Record<StepId, Step> = {
  "complete-upgrade": { product: "toolkit", kind: "upsell", onAccept: "pro-upgrade", onDecline: "done" },
  "pro-upgrade": { product: "copilot-pro", kind: "upsell", onAccept: "done", onDecline: "done", requires: "toolkit" },
  "claude-complete-upgrade": { product: "claude-system", kind: "upsell", onAccept: "claude-pro-upgrade", onDecline: "done" },
  "claude-pro-upgrade": { product: "claude-operator", kind: "upsell", onAccept: "done", onDecline: "done", requires: "claude-system" },
};

/** The first offer after a purchase, in the line the buyer bought from. */
export const firstStepFor = (items: ProductId[]): StepId =>
  items.some((i) => i.startsWith("claude-")) ? "claude-complete-upgrade" : "complete-upgrade";

export const isStepId = (v: unknown): v is StepId => typeof v === "string" && v in steps;

function shouldShow(step: StepId, owned: ProductId[]) {
  const { product, requires } = steps[step];
  return isOfferable(product) && !owned.includes(product) && (!requires || owned.includes(requires));
}

/** An upgrade costs the difference between the tier the buyer has and the one above it. */
export function stepPrice(step: StepId, currency: Currency) {
  return products[steps[step].product].price[currency];
}

/** Walks forward from `start` to the first offer worth showing, or "done". */
export function resolveStep(start: StepId | "done", owned: ProductId[]): StepId | "done" {
  let current = start;
  for (let i = 0; i < 10 && current !== "done"; i++) {
    if (shouldShow(current, owned)) return current;
    // Already owning an upgrade means the next one up may still apply.
    current = owned.includes(steps[current].product) ? steps[current].onAccept : steps[current].onDecline;
  }
  return "done";
}

export function stepUrl(step: StepId | "done") {
  return step === "done" ? "/thank-you" : `/offer/${step}`;
}
