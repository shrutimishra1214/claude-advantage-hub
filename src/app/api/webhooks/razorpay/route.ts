import { NextResponse } from "next/server";
import { fetchOrder, verifyWebhookSignature } from "@/lib/razorpay";
import { isProductId, type ProductId } from "@/lib/products";
import { sendPurchaseEmail } from "@/lib/email";

// Razorpay calls this for every captured payment, even if the buyer closed the
// tab before returning to the site. It's what sends the download email.
export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifyWebhookSignature(raw, req.headers.get("x-razorpay-signature") ?? ""))
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  const event = JSON.parse(raw);
  if (event.event !== "payment.captured") return NextResponse.json({ ok: true });

  const payment = event.payload?.payment?.entity;
  if (!payment?.order_id) return NextResponse.json({ ok: true });

  const order = await fetchOrder(payment.order_id);
  const items = (order.notes.items ?? "").split(",").filter(isProductId) as ProductId[];
  if (items.length && order.notes.email) {
    await sendPurchaseEmail({ to: order.notes.email, name: order.notes.name ?? "", items, paymentId: payment.id });
  }
  return NextResponse.json({ ok: true });
}
