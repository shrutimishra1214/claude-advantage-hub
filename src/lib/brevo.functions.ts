import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  name: z.string().trim().max(100).optional().nullable(),
});

export const subscribeToBrevo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.BREVO_API_KEY?.trim().replace(/^['"]|['"]$/g, "");
    const brevoListId = 6;

    if (!apiKey) {
      console.error("[Brevo] BREVO_API_KEY is not configured");
      return { ok: false, status: 500, reason: "missing_api_key" } as const;
    }

    if (!apiKey.startsWith("xkeysib-")) {
      console.error("[Brevo] BREVO_API_KEY does not look like a Brevo v3 API key");
      return { ok: false, status: 401, reason: "invalid_api_key" } as const;
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: data.email,
        attributes: data.name ? { FIRSTNAME: data.name } : {},
        listIds: [brevoListId],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Brevo] ${res.status}: ${body}`);
      return {
        ok: false,
        status: res.status,
        reason: res.status === 401 ? "invalid_api_key" : "brevo_error",
      } as const;
    }

    return { ok: true } as const;
  });