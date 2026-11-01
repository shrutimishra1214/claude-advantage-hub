import { EventName, type EventEntity } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";
import { recordPurchase } from "@/lib/buyers";
import { sendPurchaseEmail } from "@/lib/email";
import type { PaddleIntent } from "@/lib/fulfil";
import { fetchCustomer, paddleSdk } from "@/lib/paddle";
import { saveCustomer, saveTransaction } from "@/lib/paddle-store";
import { verify } from "@/lib/signing";

// Paddle's notification destination. Every delivery is verified with the
// webhook's signing secret (not the API key) before anything else happens.
// Paddle retries anything that doesn't get a 2xx, and may deliver an event
// more than once or out of order, so every handler below is idempotent.

export async function POST(req: Request) {
  // The raw body, exactly as sent: a parsed and re-serialized body fails verification.
  const raw = await req.text();
  const signature = req.headers.get("paddle-signature") ?? "";
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[paddle] PADDLE_WEBHOOK_SECRET is not set; the delivery will be retried");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  let event: EventEntity;
  try {
    event = await paddleSdk().webhooks.unmarshal(raw, secret, signature);
  } catch (err) {
    console.error("[paddle] Rejected a webhook that failed verification", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.eventType) {
      case EventName.TransactionCompleted:
        await onTransactionCompleted(event.data, event.occurredAt);
        break;
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        await saveCustomer({ customerId: event.data.id, email: event.data.email, updatedAt: event.data.updatedAt });
        break;
      // Everything is sold as one-time purchases, so there are no subscription events to handle.
      default:
        break;
    }
  } catch (err) {
    // A failure here gets a 500, so Paddle delivers the event again later.
    console.error(`[paddle] Couldn't handle ${event.eventType} ${event.eventId}`, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

type CompletedTransaction = Extract<EventEntity, { eventType: EventName.TransactionCompleted }>["data"];

/** Records the purchase, links the buyer to their Paddle customer and sends the access email (once per payment). */
async function onTransactionCompleted(txn: CompletedTransaction, occurredAt: string) {
  const kv = txn.customData && typeof txn.customData === "object" ? (txn.customData as Record<string, unknown>).kv : undefined;
  const intent = verify<PaddleIntent>(typeof kv === "string" ? kv : null);
  const customer = txn.customerId ? await fetchCustomer(txn.customerId) : null;
  if (customer) await saveCustomer({ customerId: customer.id, email: customer.email, updatedAt: occurredAt });

  // Only our own checkouts carry a signed order; anything else (say, a payment link
  // made by hand in the dashboard) is mirrored but needs fulfilling by hand.
  if (!intent || !txn.items.some((i) => i.price?.id === intent.priceId)) {
    console.error(`[paddle] Transaction ${txn.id} has no valid order attached; not fulfilled automatically`);
    return;
  }

  const email = customer?.email ?? intent.email;
  await saveTransaction({ transactionId: txn.id, customerId: txn.customerId, email, items: intent.items, currency: txn.currencyCode, completedAt: occurredAt });
  await recordPurchase({ email, name: intent.name, items: intent.items });
  await sendPurchaseEmail({ to: email, name: intent.name, items: intent.items, paymentId: txn.id });
}
