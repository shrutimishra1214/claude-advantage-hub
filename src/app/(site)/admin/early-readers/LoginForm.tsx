"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, "");
  return (
    <form action={action} className="grid gap-3">
      <label className="grid gap-1.5 text-sm font-medium">
        <span>Admin password</span>
        <input name="password" type="password" required autoComplete="current-password" className="input" />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button className="btn-primary" disabled={pending}>{pending ? "Checking…" : "Sign in"}</button>
    </form>
  );
}
