import { NextResponse } from "next/server";
import { recordPurchase } from "@/lib/buyers";
import { sendPurchaseEmail } from "@/lib/email";
import type { PaddleIntent } from "@/lib/fulfil";
import { fetchCustomer, verifyPaddleWebhook, type PaddleTransaction } from "@/lib/paddle";
import { verify } from "@/lib/signing";

// Paddle calls this when a transaction completes, even if the buyer closed the
// tab before returning to the site. It's what sends the access email.
export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifyPaddleWebhook(raw, req.headers.get("paddle-signature") ?? ""))
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  const event = JSON.parse(raw);
  if (event.event_type !== "transaction.completed") return NextResponse.json({ ok: true });

  const txn = event.data as PaddleTransaction;
  const intent = verify<PaddleIntent>(txn.custom_data?.kv);
  if (!intent || !txn.items.some((i) => i.price.id === intent.priceId)) {
    console.error(`Paddle transaction ${txn.id} has no valid order attached; not fulfilled automatically`);
    return NextResponse.json({ ok: true });
  }

  const email = txn.customer_id ? (await fetchCustomer(txn.customer_id)).email : intent.email;
  await recordPurchase({ email, name: intent.name, items: intent.items });
  await sendPurchaseEmail({ to: email, name: intent.name, items: intent.items, paymentId: txn.id });
  return NextResponse.json({ ok: true });
}
