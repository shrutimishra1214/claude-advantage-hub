// Reader-list signups. The hub called a TanStack server function; here the
// same call goes to the /api/subscribe route, which holds the Brevo key.

export type SubscribeInput = { email: string; name?: string | null; listId?: 6 | 7 | 8 };
export type SubscribeResult = { ok: true } | { ok: false; status: number; reason: string };

export async function subscribeToBrevo({ data }: { data: SubscribeInput }): Promise<SubscribeResult> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  return (await res.json()) as SubscribeResult;
}
