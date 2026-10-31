import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Header";
import { FunnelProgress } from "@/components/FunnelProgress";
import { Icon } from "@/components/icons";
import { products } from "@/lib/products";
import { getSession, readLibraryToken } from "@/lib/session";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Your library", robots: { index: false } };

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  const grant = readLibraryToken(t);
  const session = await getSession();
  const owned = grant?.owned ?? session?.owned ?? [];
  const name = session?.customer.name.split(" ")[0];
  const email = grant?.email ?? session?.customer.email;
  const query = grant && t ? `?t=${encodeURIComponent(t)}` : "";

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,.16),transparent_65%)]" />
      <header className="container flex h-20 items-center justify-center"><Logo /></header>

      <main className="container max-w-3xl pb-24 pt-6">
        {owned.length === 0 ? (
          <div className="card mt-10 p-10 text-center">
            <h1 className="text-3xl font-bold">Your library</h1>
            <p className="mt-4 text-lg text-ink-muted">
              Open the link in your purchase email to see your downloads on this device. Can&apos;t find it? Email{" "}
              <a className="font-semibold text-brand-violet" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we&apos;ll resend it.
            </p>
            <Link href="/" className="btn-primary mt-8">Back to home</Link>
          </div>
        ) : (
          <>
            {session && !grant && <FunnelProgress current={3} />}
            <div className="mt-12 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-lift"><Icon.check className="h-8 w-8" /></span>
              <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">{name ? `You're all set, ${name}!` : "Your library"}</h1>
              {email && <p className="mt-4 text-lg text-ink-muted">We also email your download link to <strong className="text-ink">{email}</strong>.</p>}
            </div>

            <ul className="mt-12 grid gap-4">
              {owned.map((id) => {
                const p = products[id];
                return (
                  <li key={id} className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                    {id === "book" ? (
                      <Image src="/images/cover.jpg" alt="" width={64} height={81} className="rounded-md shadow-soft" />
                    ) : (
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-spectrum text-white">
                        {p.delivery.kind === "file" ? <Icon.doc className="h-7 w-7" /> : <Icon.video className="h-7 w-7" />}
                      </span>
                    )}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold">{p.name}</h2>
                      <p className="text-ink-muted">{p.short}</p>
                    </div>
                    {p.delivery.kind === "file" ? (
                      <a href={`/api/download/${id}${query}`} className="btn-primary !py-3">
                        <Icon.download className="h-5 w-5" /> Download
                      </a>
                    ) : (
                      <p className="max-w-[220px] text-sm text-ink-muted">{p.delivery.note}</p>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-center text-sm text-ink-muted">
              Need help? Email <a className="font-semibold text-brand-violet" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
