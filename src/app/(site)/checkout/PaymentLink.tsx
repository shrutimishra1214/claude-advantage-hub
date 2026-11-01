"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPaddle, onPaddleEvent, type PaddleConfig } from "@/lib/paddle-client";

// Loads Paddle.js. When the URL carries ?_ptxn=…, Paddle opens that
// transaction's checkout by itself.
export function PaymentLink({ paddle }: { paddle: PaddleConfig | null }) {
  const [state, setState] = useState<"loading" | "open" | "done" | "none" | "error">("loading");

  useEffect(() => {
    const hasTransaction = new URLSearchParams(window.location.search).has("_ptxn");
    if (!paddle || !hasTransaction) return setState("none");
    onPaddleEvent((e) => {
      if (e.name === "checkout.loaded") setState("open");
      if (e.name === "checkout.completed") setState("done");
      if (e.name === "checkout.error") setState("error");
    });
    getPaddle(paddle).catch(() => setState("error"));
    return () => onPaddleEvent(null);
  }, [paddle]);

  const copy = {
    loading: ["Opening secure checkout…", "This takes a moment."],
    open: ["Complete your payment", "Your secure checkout is open."],
    done: ["Payment complete. Thank you.", "Your receipt and access details are on their way to your email."],
    none: ["Nothing to pay here", "This page opens payment links sent by Kaelis Voss. To buy, choose a system below."],
    error: ["The checkout couldn't open", "Please try the link again in a moment, or write to us and we'll sort it out."],
  }[state];

  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="text-3xl">{copy[0]}</h1>
      <p className="mt-3 text-ink-muted">{copy[1]}</p>
      {(state === "none" || state === "done" || state === "error") && (
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/copilot-advantage" className="btn-secondary">Copilot Advantage</Link>
          <Link href="/claude-advantage" className="btn-secondary">Claude Advantage</Link>
        </div>
      )}
    </div>
  );
}
