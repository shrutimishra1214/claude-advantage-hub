import Link from "next/link";
import { Icon } from "../icons";

/** Shown in place of a member page the visitor hasn't bought. */
export function Locked({ what, body, href }: { what: string; body: string; href: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-line bg-paper p-8 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink text-white"><Icon.lock className="h-5 w-5" /></span>
      <h1 className="mt-5 text-2xl">{what} isn&apos;t part of your purchase yet</h1>
      <p className="mt-3 leading-relaxed text-ink-muted">{body}</p>
      <Link href={href} className="btn-primary mt-6">See what&apos;s included</Link>
    </div>
  );
}
