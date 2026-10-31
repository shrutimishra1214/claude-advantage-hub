"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StepId } from "@/lib/funnel";
import { checkout, CheckoutDismissed } from "@/lib/checkout-client";
import { Icon } from "./icons";

export function OfferActions({ step, cta, decline, declineHref }: { step: StepId; cta: string; decline: string; declineHref: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function accept() {
    setBusy(true);
    setError("");
    try {
      router.push(await checkout({ step }));
    } catch (err) {
      if (!(err instanceof CheckoutDismissed)) setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button type="button" onClick={accept} disabled={busy} className="btn-spectrum w-full max-w-md !py-5 !text-lg">
        {busy ? "Opening secure payment…" : cta}
        {!busy && <Icon.arrow className="h-5 w-5" />}
      </button>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <Link href={declineHref} className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline">
        {decline}
      </Link>
    </div>
  );
}
