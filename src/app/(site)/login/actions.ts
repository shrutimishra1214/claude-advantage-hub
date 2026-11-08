"use server";

import { allowLoginEmail, getBuyer } from "@/lib/buyers";
import { sendLoginEmail } from "@/lib/email";
import { lines, type LineId } from "@/lib/lines";
import { memberLanding } from "@/lib/member";
import { loginToken } from "@/lib/session";
import { site } from "@/lib/site";

export type LoginState = { sent: boolean; email?: string; error?: string; devLink?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Emails a sign-in link to any buyer. The reply is the same
// whether or not the email has bought anything, so the form can't be used to
// find out who the customers are.
export async function requestSignIn(_: LoginState, form: FormData): Promise<LoginState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const next = String(form.get("next") ?? "");
  const line: LineId = form.get("line") === "claude" ? "claude" : "copilot";
  if (!EMAIL.test(email) || email.length > 254) return { sent: false, error: "Enter the email address you used to pay." };

  try {
    if (!(await allowLoginEmail(email))) return { sent: true, email };
    const buyer = await getBuyer(email);
    if (!buyer || buyer.owned.length === 0) return { sent: true, email };

    const landing = memberLanding(buyer.owned, next || lines[line].members);
    const link = `${site.url}/members/enter?t=${loginToken({ email, owned: buyer.owned })}&next=${encodeURIComponent(landing)}`;
    const product = landing.startsWith(lines.claude.members)
      ? lines.claude.name
      : landing.startsWith(lines.copilot.members)
        ? lines.copilot.name
        : landing.startsWith("/claude-advantage/operator-toolkit")
          ? "The Claude Operator Toolkit"
          : "your Kaelis Voss library";
    await sendLoginEmail({ to: email, name: buyer.name, link, product });
    // Without an email service in development, show the link instead.
    const devLink = process.env.NODE_ENV !== "production" && !process.env.BREVO_API_KEY ? link : undefined;
    return { sent: true, email, devLink };
  } catch (error) {
    console.error("[login] Couldn't send a sign-in link", error);
    return { sent: false, error: "We couldn't send the email just now. Please try again in a minute." };
  }
}
