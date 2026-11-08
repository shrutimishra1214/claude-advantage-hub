import { NextResponse } from "next/server";

// TEMPORARY: shows which settings the live site can see, as yes/no and setting
// names only, never values. Remove once the Cloudflare setup is confirmed.
export const dynamic = "force-dynamic";

const expected = [
  "APP_SECRET",
  "PADDLE_ENVIRONMENT",
  "PADDLE_API_KEY",
  "PADDLE_CLIENT_TOKEN",
  "PADDLE_WEBHOOK_SECRET",
  "PADDLE_PRICE_COPILOT_BOOK",
  "PADDLE_PRICE_CLAUDE_BOOK",
  "KV_REST_API_URL",
  "KV_REST_API_TOKEN",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "ADMIN_PASSWORD",
];

export function GET() {
  const env = process.env;
  const env_ = env.PADDLE_ENVIRONMENT;
  return NextResponse.json(
    {
      present: Object.fromEntries(expected.map((k) => [k, Boolean(env[k])])),
      paddleEnvironmentValid: env_ === "sandbox" || env_ === "production" ? env_ : env_ ? "set, but not exactly sandbox/production" : "missing",
      clientTokenKind: env.PADDLE_CLIENT_TOKEN?.startsWith("live_") ? "live_" : env.PADDLE_CLIENT_TOKEN?.startsWith("test_") ? "test_" : env.PADDLE_CLIENT_TOKEN ? "unexpected prefix" : "missing",
      // Names only, to spot misnamed settings.
      paddleNamesSeen: Object.keys(env).filter((k) => k.startsWith("PADDLE_")).sort(),
      totalSettingsSeen: Object.keys(env).length,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
