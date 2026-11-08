import { redis, redisConfig } from "./kv";
import { site } from "./site";

// Brevo (api.brevo.com, v3): reader-list signups and the site's emails
// (purchase confirmations, sign-in links, early reader notices), with one key.

/** BREVO_API_KEY, cleaned of stray quotes; null (with the reason logged) when missing or not a v3 key. */
export function brevoApiKey(): string | null {
  const key = process.env.BREVO_API_KEY?.trim().replace(/^['"]|['"]$/g, "");
  if (!key) {
    console.error("[Brevo] BREVO_API_KEY is not configured");
    return null;
  }
  if (!key.startsWith("xkeysib-")) {
    console.error("[Brevo] BREVO_API_KEY does not look like a Brevo v3 API key");
    return null;
  }
  return key;
}

/** EMAIL_FROM ("Name <address>" or a bare address) as Brevo's sender. The address must be a verified sender in Brevo. */
function sender() {
  const raw = (process.env.EMAIL_FROM ?? `${site.name} <${site.contactEmail}>`).trim().replace(/^['"]|['"]$/g, "");
  const m = raw.match(/^(.*?)\s*<([^>]+)>$/);
  return m ? { name: m[1].trim() || site.name, email: m[2].trim() } : { name: site.name, email: raw };
}

/**
 * Sends one email through Brevo's transactional API. Returns false (logged) when
 * Brevo isn't configured; throws when Brevo refuses, so a webhook gets retried.
 *
 * Brevo has no idempotency key, so `onceKey` stands in for one: with a database
 * connected, the same key sends only once (a webhook delivered twice emails once).
 */
export async function sendBrevoEmail(opts: { to: string; subject: string; html: string; onceKey?: string }): Promise<boolean> {
  const key = brevoApiKey();
  if (!key) return false;

  const lock = opts.onceKey && redisConfig() ? `email-sent:${opts.onceKey}` : null;
  if (lock && (await redis<string | null>(["SET", lock, "1", "NX", "EX", 60 * 60 * 24 * 30])) !== "OK") {
    console.info(`[email] Already sent ${opts.onceKey}; skipping the repeat`);
    return true;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", "api-key": key },
    body: JSON.stringify({ sender: sender(), to: [{ email: opts.to }], subject: opts.subject, htmlContent: opts.html }),
  });
  if (!res.ok) {
    // Not sent: free the key so the retry can send it.
    if (lock) await redis(["DEL", lock]).catch(() => {});
    throw new Error(`Brevo email failed: ${res.status} ${await res.text()}`);
  }
  return true;
}
