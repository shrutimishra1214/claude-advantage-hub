import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Header";
import { FunnelProgress } from "@/components/FunnelProgress";
import { Icon } from "@/components/icons";
import { OfferActions } from "@/components/OfferActions";
import { offerCopy } from "@/lib/content";
import { isStepId, resolveStep, stepUrl, steps } from "@/lib/funnel";
import { formatPrice, products } from "@/lib/products";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Special offer", robots: { index: false } };

export default async function OfferPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  const session = await getSession();
  if (!session || !isStepId(step)) redirect("/");

  // Skip offers that aren't available or that the buyer already owns.
  const resolved = resolveStep(step, session.owned);
  if (resolved !== step) redirect(stepUrl(resolved));

  const product = products[steps[step].product];
  const copy = offerCopy[step];
  const { currency } = session;
  const price = product.price[currency];
  const compare = product.compareAt?.[currency];
  const declineHref = stepUrl(resolveStep(steps[step].onDecline, session.owned));

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,.18),transparent_65%)]" />
      <header className="container flex h-20 items-center justify-center"><Logo /></header>

      <main className="container max-w-3xl pb-24 pt-6">
        <FunnelProgress current={2} />

        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-center text-sm text-emerald-800">
          <strong>Thanks, {session.customer.name.split(" ")[0]}!</strong> Your payment went through. Don&apos;t close this page: your downloads are on the next screen.
        </div>

        <div className="mt-12 text-center">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] md:text-5xl">{copy.headline}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">{copy.lead}</p>
        </div>

        <div className="card mt-12 p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-violet">{product.short}</p>
              <h2 className="mt-1 text-2xl font-bold">{product.name}</h2>
            </div>
            <div className="text-right">
              {compare && <p className="text-ink-muted line-through">{formatPrice(compare, currency)}</p>}
              <p className="font-display text-4xl font-extrabold">{formatPrice(price, currency)}</p>
            </div>
          </div>
          <ul className="mt-8 grid gap-3 border-t border-ink/10 pt-8">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed">
                <Icon.check className="mt-0.5 h-5 w-5 shrink-0 text-brand-violet" /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <OfferActions step={step} cta={`${copy.cta} · ${formatPrice(price, currency)}`} decline={copy.decline} declineHref={declineHref} />
          </div>
          <p className="mt-6 text-center text-xs text-ink-muted">
            Your details are already filled in. Just confirm with UPI, OTP or your card. Covered by the same money-back guarantee.
          </p>
        </div>
      </main>
    </div>
  );
}
