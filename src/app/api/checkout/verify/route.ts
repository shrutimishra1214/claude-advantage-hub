import { NextResponse } from "next/server";
import { capturePayment, fetchOrder, fetchPayment, verifyPaymentSignature } from "@/lib/razorpay";
import { isProductId, type ProductId } from "@/lib/products";
import { completePurchase } from "@/lib/fulfil";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { orderId, paymentId, signature } = body ?? {};
  if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!verifyPaymentSignature(orderId, paymentId, signature))
    return NextResponse.json({ error: "Payment could not be verified" }, { status: 400 });

  try {
    const [order, payment] = await Promise.all([fetchOrder(orderId), fetchPayment(paymentId)]);
    if (payment.order_id !== order.id || payment.amount !== order.amount)
      return NextResponse.json({ error: "Payment does not match order" }, { status: 400 });

    let status = payment.status;
    if (status === "authorized") status = (await capturePayment(payment.id, payment.amount, payment.currency)).status;
    if (status !== "captured") return NextResponse.json({ error: "Payment not completed" }, { status: 402 });

    // Items come from the order we created on the server, never from the browser.
    const notes = order.notes;
    const items = (notes.items ?? "").split(",").filter(isProductId) as ProductId[];
    const customer = { name: notes.name ?? "", email: notes.email ?? "", contact: notes.contact ?? "" };

    const next = await completePurchase({ customer, currency: notes.currency === "USD" ? "USD" : "INR", items, step: notes.step ?? "" });
    return NextResponse.json({ next });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't confirm your payment. If you were charged, email us and we'll sort it out." }, { status: 502 });
  }
}
