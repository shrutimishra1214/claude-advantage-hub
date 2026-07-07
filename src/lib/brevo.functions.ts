import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BREVO_LIST_ID = 6;

const inputSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  name: z.string().trim().max(100).optional().nullable(),
});

export const subscribeToBrevo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) throw new Error("BREVO_API_KEY is not configured");

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
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Brevo] ${res.status}: ${body}`);
      throw new Error(`Brevo request failed (${res.status})`);
    }

    return { ok: true };
  });