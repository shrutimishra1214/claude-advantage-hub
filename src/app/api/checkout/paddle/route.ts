import { NextResponse } from "next/server";
import { completePurchase, type PaddleIntent } from "@/lib/fulfil";
import { fetchCustomer, fetchTransaction, isPaid } from "@/lib/paddle";
import { verify } from "@/lib/signing";

// Called by the browser when Paddle's checkout reports success. The
// transaction is re-read from Paddle and matched to the order we signed.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const transactionId: unknown = body?.transactionId;
  if (typeof transactionId !== "string" || !/^txn_[a-z0-9]+$/i.test(transactionId))
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  try {
    // Paddle can take a moment to move a transaction to "paid".
    let txn = await fetchTransaction(transactionId);
    for (let i = 0; i < 5 && !isPaid(txn); i++) {
      await new Promise((r) => setTimeout(r, 1500));
      txn = await fetchTransaction(transactionId);
    }
    if (!isPaid(txn)) return NextResponse.json({ error: "Payment not completed" }, { status: 402 });

    const intent = verify<PaddleIntent>(txn.custom_data?.kv);
    if (!intent || !txn.items.some((i) => i.price.id === intent.priceId))
      return NextResponse.json({ error: "Payment does not match order" }, { status: 400 });

    // The email entered in Paddle's checkout is the one we deliver to.
    const email = txn.customer_id ? (await fetchCustomer(txn.customer_id)).email.toLowerCase() : intent.email;
    const next = await completePurchase({
      customer: { name: intent.name, email, contact: intent.contact },
      // The currency Paddle charged, so the upgrade offers show the same one.
      currency: txn.currency_code === "GBP" ? "GBP" : "USD",
      items: intent.items,
      step: intent.step,
    });
    return NextResponse.json({ next });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't confirm your payment. If you were charged, email us and we'll sort it out." }, { status: 502 });
  }
}
