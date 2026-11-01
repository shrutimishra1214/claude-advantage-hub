import { NextResponse } from "next/server";
import { createOrder } from "@/lib/razorpay";
import { isOfferable, isTierId, isTierOfferable, products, tiers, type Currency, type ProductId } from "@/lib/products";
import { isStepId, stepPrice, steps } from "@/lib/funnel";
import { getSession, type Customer } from "@/lib/session";
import { getCurrency } from "@/lib/currency";
import { PADDLE_INTENT_TTL, type PaddleIntent } from "@/lib/fulfil";
import { isPaddleConfigured, paddleEnvironment, paddlePriceId } from "@/lib/paddle";
import { sign } from "@/lib/signing";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9 ()-]{8,18}$/;

function readCustomer(raw: unknown): Customer | null {
  if (!raw || typeof raw !== "object") return null;
  const { name, email, contact } = raw as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || name.length > 100) return null;
  if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 200) return null;
  if (contact !== undefined && contact !== "" && (typeof contact !== "string" || !PHONE.test(contact))) return null;
  return { name: name.trim(), email: email.trim().toLowerCase(), contact: typeof contact === "string" ? contact.trim() : "" };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  let items: ProductId[];
  let customer: Customer | null;
  let currency: Currency;
  let amount: number;
  let description: string;
  let step = "";
  let priceId: string | null;

  if (body.step !== undefined) {
    // One-tap upsell or downsell after the main purchase.
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Your session expired. Please start again." }, { status: 401 });
    const stepId: unknown = body.step;
    if (!isStepId(stepId)) return NextResponse.json({ error: "Unknown offer" }, { status: 400 });
    const product = steps[stepId].product;
    if (!isOfferable(product) || session.owned.includes(product))
      return NextResponse.json({ error: "This offer isn't available" }, { status: 400 });
    items = [product];
    customer = session.customer;
    currency = session.currency;
    amount = stepPrice(stepId, currency);
    description = products[product].name;
    step = stepId;
    priceId = paddlePriceId({ step: stepId });
  } else {
    // Main checkout: the book, the toolkit or both, at that tier's price.
    const tierId: unknown = body.tier;
    if (!isTierId(tierId) || !isTierOfferable(tierId)) return NextResponse.json({ error: "This option isn't available yet" }, { status: 400 });
    customer = readCustomer(body.customer);
    if (!customer) return NextResponse.json({ error: "Please enter a valid name and email" }, { status: 400 });
    // Decided by the visitor's country on the server, never by the browser.
    currency = await getCurrency();
    items = tiers[tierId].items;
    amount = tiers[tierId].price[currency];
    description = tiers[tierId].name;
    priceId = paddlePriceId({ tier: tierId });
  }

  // Paddle takes every payment except INR, at the price set in its dashboard
  // (with a GBP override for the UK).
  if (currency !== "INR") {
    if (!isPaddleConfigured() || !priceId) {
      console.error(`Paddle is not configured for ${step || "this tier"}: set PADDLE_API_KEY, PADDLE_CLIENT_TOKEN and the price ID`);
      return NextResponse.json({ error: "Card payments aren't available right now. Please try again later." }, { status: 503 });
    }
    const intent: PaddleIntent = { items, priceId, step, name: customer.name, email: customer.email, contact: customer.contact };
    return NextResponse.json({
      provider: "paddle",
      clientToken: process.env.PADDLE_CLIENT_TOKEN,
      environment: paddleEnvironment(),
      priceId,
      intent: sign(intent, PADDLE_INTENT_TTL),
      customer,
    });
  }

  try {
    const order = await createOrder({
      amount,
      currency,
      receipt: `kv_${Date.now()}`,
      notes: {
        items: items.join(","),
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
        currency,
        step,
      },
    });
    return NextResponse.json({
      provider: "razorpay",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      customer,
      description,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 502 });
  }
}
