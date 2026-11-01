"use client";

import { useActionState } from "react";
import { requestSignIn, type LoginState } from "./actions";

export function LoginForm({ line, next }: { line: string; next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(requestSignIn, { sent: false });

  if (state.sent) {
    return (
      <div role="status" className="card p-6 text-left">
        <p className="font-semibold">Check your inbox</p>
        <p className="mt-2 leading-relaxed text-ink-muted">
          If <strong className="text-ink">{state.email}</strong> has bought a member product, a sign-in link is on its way. It works for 15 minutes.
          Nothing there after a few minutes? Check your spam folder, or try the email you paid with.
        </p>
        {state.devLink && (
          <p className="mt-4 break-all rounded-lg bg-paper p-3 text-sm">
            <span className="font-semibold">Development only:</span>{" "}
            <a className="text-accent underline" href={state.devLink}>open the sign-in link</a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-3 text-left">
      <input type="hidden" name="line" value={line} />
      <input type="hidden" name="next" value={next} />
      <label className="grid gap-1.5 text-sm font-medium">
        <span>Email you used to pay</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input" />
      </label>
      {state.error && <p role="alert" className="text-sm text-red-700">{state.error}</p>}
      <button className="btn-primary" disabled={pending}>{pending ? "Sending…" : "Email me a sign-in link"}</button>
    </form>
  );
}
