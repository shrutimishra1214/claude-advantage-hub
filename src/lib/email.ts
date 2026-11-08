import { sendBrevoEmail } from "./brevo";
import { products, type ProductId } from "./products";
import { libraryToken } from "./session";
import { site } from "./site";

/** Emails the buyer a link to their library. Logged instead when Brevo isn't configured. */
export async function sendPurchaseEmail(opts: { to: string; name: string; items: ProductId[]; paymentId: string }) {
  const token = libraryToken({ email: opts.to, owned: opts.items });
  const link = `${site.url}/thank-you?t=${token}`;
  const memberLine = opts.items.some((i) => i.startsWith("claude-")) ? "Open the Claude Advantage" : "Open the Copilot Advantage";
  const member = opts.items.some((i) => ["toolkit", "copilot-pro", "claude-system", "claude-operator"].includes(i))
    ? `<p><a href="${site.url}/members/enter?t=${token}" style="display:inline-block;background:#1F1D1A;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600">${memberLine}</a></p>`
    : "";
  const list = opts.items.map((id) => `<li style="margin:0 0 6px">${products[id].name}</li>`).join("");
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;color:#0B1030">
    <h1 style="font-size:22px">Thank you, ${escapeHtml(opts.name.split(" ")[0] || "there")}!</h1>
    <p>Your purchase is confirmed. Here's what you bought:</p>
    <ul>${list}</ul>
    ${member}
    <p><a href="${link}" style="display:inline-block;background:#0B1030;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">Open your library</a></p>
    <p style="color:#5B6083;font-size:13px">Payment ID: ${opts.paymentId}. Keep this email: the link above lets you download your files again.</p>
  </div>`;

  const sent = await sendBrevoEmail({
    to: opts.to,
    subject: `Your purchase from ${site.name}`,
    html,
    // Payment providers may deliver the same webhook more than once.
    onceKey: `purchase-${opts.paymentId}`,
  });
  if (!sent) console.info(`[email] Brevo not configured; would email ${opts.to}: ${link}`);
}

/** Emails a member a short-lived sign-in link from /login. Logged instead when Brevo isn't configured. */
export async function sendLoginEmail(opts: { to: string; name: string; link: string; product: string }) {
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;color:#0B1030">
    <h1 style="font-size:22px">Sign in, ${escapeHtml(opts.name.split(" ")[0] || "there")}</h1>
    <p>Here's your link to ${escapeHtml(opts.product)}. It works for the next 15 minutes and keeps you signed in on that device for a year.</p>
    <p><a href="${opts.link}" style="display:inline-block;background:#1F1D1A;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600">Open my member area</a></p>
    <p style="color:#5B6083;font-size:13px">Didn't ask for this? You can ignore this email; nobody can sign in without the link.</p>
  </div>`;
  const sent = await sendBrevoEmail({ to: opts.to, subject: `Your sign-in link for ${opts.product}`, html });
  if (!sent) console.info(`[email] Brevo not configured; sign-in link for ${opts.to}: ${opts.link}`);
}

/** Tells the applicant their spot is reserved and notifies the owner. Logged instead when Brevo isn't configured. */
export async function sendEarlyReaderEmails(a: { name: string; email: string; role: string; usage: string; linkedin: string; spot: number }) {
  const send = async (to: string, subject: string, html: string, onceKey: string) => {
    if (!(await sendBrevoEmail({ to, subject, html, onceKey }))) console.info(`[email] Brevo not configured; would email ${to}: ${subject}`);
  };

  await send(
    a.email,
    `Your early reader spot is reserved (#${a.spot})`,
    `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;color:#0B1030">
      <h1 style="font-size:22px">You're in, ${escapeHtml(a.name.split(" ")[0])}!</h1>
      <p>You've claimed early reader spot <strong>#${a.spot}</strong> for <em>${site.bookTitle}</em>.</p>
      <p>We'll send your free copy within 2 business days. After reading, record an honest 60-second video about your experience and reply to that email with it.</p>
    </div>`,
    `early-reader-${a.email}`,
  );
  await send(
    site.contactEmail,
    `New early reader: ${a.name} (spot #${a.spot})`,
    `<p><strong>${escapeHtml(a.name)}</strong> &lt;${escapeHtml(a.email)}&gt;</p>
     <p>Role: ${escapeHtml(a.role)}<br>Uses Copilot: ${escapeHtml(a.usage)}<br>LinkedIn: ${escapeHtml(a.linkedin || "-")}</p>
     <p>Send them the book from your library and manage spots at ${site.url}/admin/early-readers</p>`,
    `early-reader-owner-${a.email}`,
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
