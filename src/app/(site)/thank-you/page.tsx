import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Header";
import { FunnelProgress } from "@/components/FunnelProgress";
import { Icon } from "@/components/icons";
import { lineOfProduct, lines } from "@/lib/lines";
import { filesFor, groupNames, type FileGroup } from "@/lib/files";
import { memberProducts, ownedOnThisDevice } from "@/lib/member";
import { products } from "@/lib/products";
import { getSession, readLibraryToken } from "@/lib/session";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Your library", robots: { index: false } };

const covers: Partial<Record<string, string>> = {
  book: "/images/cover.jpg",
  "claude-book": "/images/claude-cover.jpg",
  "claude-operator-book": "/claude-operator-cover.jpg",
};

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  const grant = readLibraryToken(t);
  const session = await getSession();
  const device = grant ? null : await ownedOnThisDevice();
  const owned = grant?.owned ?? device?.owned ?? [];
  const name = session?.customer.name.split(" ")[0];
  const email = grant?.email ?? (device?.email || undefined);
  const query = grant && t ? `?t=${encodeURIComponent(t)}` : "";
  const line = owned.some((p) => p.startsWith("claude-")) ? "claude" : "copilot";

  return (
    <div className={`${lines[line].themeClass} relative min-h-dvh overflow-hidden bg-canvas text-ink`}>
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,.16),transparent_65%)]" />
      <header className="container flex h-20 items-center justify-center"><Logo line={line} /></header>

      <main className="container max-w-3xl pb-24 pt-6">
        {owned.length === 0 ? (
          <div className="card mt-10 p-10 text-center">
            <h1 className="text-3xl font-medium">Your library</h1>
            <p className="mt-4 text-lg text-ink-muted">
              Open the link in your purchase email, or sign in with the email you paid with, to see your downloads. Can&apos;t find it? Email{" "}
              <a className="font-semibold text-brand-violet" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and we&apos;ll resend it.
            </p>
            <Link href="/login?next=/library" className="btn-primary mt-8">Sign in</Link>
          </div>
        ) : (
          <>
            {session && !grant && <FunnelProgress current={3} />}
            <div className="mt-12 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-lift"><Icon.check className="h-8 w-8" /></span>
              <h1 className="mt-6 text-4xl font-medium md:text-5xl">{name ? `You're all set, ${name}!` : "Your library"}</h1>
              {email && <p className="mt-4 text-lg text-ink-muted">We also email your download link to <strong className="text-ink">{email}</strong>.</p>}
            </div>

            <ul className="mt-12 grid gap-6">
              {owned.map((id) => {
                const p = products[id];
                const files = filesFor(id);
                const groups = (Object.keys(groupNames) as FileGroup[]).filter((g) => files.some((f) => f.group === g));
                // A library link opens pages that need the device cookie through /members/enter.
                const via = (next: string) => (grant && t ? `/members/enter?t=${encodeURIComponent(t)}&next=${encodeURIComponent(next)}` : next);
                return (
                  <li key={id} className="card overflow-hidden">
                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                      {covers[id] ? (
                        <Image src={covers[id]} alt="" width={64} height={84} className="rounded-md object-cover shadow-soft" />
                      ) : (
                        <span className="icon-tile h-16 w-16 shrink-0">
                          {p.delivery.kind === "file" ? <Icon.doc className="h-7 w-7" /> : <Icon.video className="h-7 w-7" />}
                        </span>
                      )}
                      <div className="flex-1">
                        <h2 className="text-lg font-medium">{p.name}</h2>
                        <p className="text-ink-muted">{files.length ? `${p.short} · ${files.length} ${files.length === 1 ? "file" : "files"} included` : p.short}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {memberProducts.includes(id) && p.delivery.kind === "access" ? (
                          <a href={via(lines[lineOfProduct(id)].members)} className="btn-primary !py-3">
                            Open {lines[lineOfProduct(id)].name.replace(/^The /, "the ")} <Icon.arrow className="h-4 w-4" />
                          </a>
                        ) : p.delivery.kind === "file" ? (
                          <a href={`/api/download/${id}${query}`} className="btn-primary !py-3">
                            <Icon.download className="h-5 w-5" /> Download the book
                          </a>
                        ) : (
                          <p className="max-w-[220px] text-sm text-ink-muted">{p.delivery.note}</p>
                        )}
                        {id === "claude-operator-book" && (
                          <a href={via("/claude-advantage/operator-toolkit")} className="btn-secondary !py-3">
                            Toolkit page <Icon.arrow className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    {files.length > 0 && (
                      <div className="border-t border-line bg-paper/60 px-6 py-5">
                        {groups.map((g) => (
                          <section key={g} className="mt-5 first:mt-0">
                            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">{groupNames[g]}</h3>
                            <ul className="mt-2 divide-y divide-line">
                              {files.filter((f) => f.group === g).map((f) => (
                                <li key={f.id} className="flex items-center gap-4 py-3">
                                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white text-[10px] font-bold uppercase tracking-wide text-ink-muted">
                                    {f.key.endsWith(".zip") ? "ZIP" : "PDF"}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium leading-snug">{f.title}</p>
                                    <p className="text-sm leading-snug text-ink-muted">{f.desc} <span className="whitespace-nowrap">· {f.meta}</span></p>
                                  </div>
                                  <a href={`/api/files/${f.id}${query}`} aria-label={`Download ${f.title}`} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold hover:border-ink/30">
                                    <Icon.download className="h-4 w-4" /> <span className="hidden sm:inline">Download</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-center text-sm text-ink-muted">
              Using another device? <Link href="/login" className="font-semibold text-brand-violet">Sign in with your email</Link> to open this library there.
            </p>
            <p className="mt-10 text-center text-sm text-ink-muted">
              Need help? Email <a className="font-semibold text-brand-violet" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
