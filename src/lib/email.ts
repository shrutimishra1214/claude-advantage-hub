import { products, type ProductId } from "./products";
import { libraryToken } from "./session";
import { site } from "./site";

/** Emails the buyer a link to their library. Skipped (logged) when Resend isn't configured. */
export async function sendPurchaseEmail(opts: { to: string; name: string; items: ProductId[]; paymentId: string }) {
  const link = `${site.url}/thank-you?t=${libraryToken({ email: opts.to, owned: opts.items })}`;
  const list = opts.items.map((id) => `<li style="margin:0 0 6px">${products[id].name}</li>`).join("");
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;color:#0B1030">
    <h1 style="font-size:22px">Thank you, ${escapeHtml(opts.name.split(" ")[0] || "there")}!</h1>
    <p>Your purchase is confirmed. Here's what you bought:</p>
    <ul>${list}</ul>
    <p><a href="${link}" style="display:inline-block;background:#0B1030;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">Open your library</a></p>
    <p style="color:#5B6083;font-size:13px">Payment ID: ${opts.paymentId}. Keep this email: the link above lets you download your files again.</p>
  </div>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[email] RESEND_API_KEY not set; would email ${opts.to}: ${link}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Razorpay may deliver the same webhook more than once.
      "Idempotency-Key": `purchase-${opts.paymentId}`,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? `${site.name} <${site.contactEmail}>`,
      to: [opts.to],
      subject: `Your ${site.bookTitle} purchase`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
