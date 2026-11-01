import type { ReactNode } from "react";
import { BuyButton } from "./BuyButton";
import { Icon } from "./icons";
import { Ebook } from "./Mockups";
import { Reveal } from "./Reveal";
import { TierPrice } from "./TierPrice";
import { getCurrency } from "@/lib/currency";
import type { LineId } from "@/lib/lines";
import { bundleCopy, tierCopy, type TierCopy } from "@/lib/offer";
import { formatPrice, isTierOfferable, tiers, type TierId } from "@/lib/products";
import { site } from "@/lib/site";

// The Book / Complete / Pro comparison and the two-system bundles. Both product
// pages and the homepage use these, so tiers read the same everywhere.

const lineTiers: Record<LineId, [TierId, TierId, TierId]> = {
  copilot: ["book", "complete", "pro"],
  claude: ["claude-book", "claude-complete", "claude-pro"],
};

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 leading-snug">
      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.4} />
      <span>{children}</span>
    </li>
  );
}

function Bullets({ copy }: { copy: TierCopy }) {
  const shown = copy.shown ?? copy.bullets.length;
  const rest = copy.bullets.slice(shown);
  return (
    <div className="mt-6 text-[15px]">
      {copy.intro && <p className="font-semibold">{copy.intro}</p>}
      <ul className="mt-3 grid gap-2.5">{copy.bullets.slice(0, shown).map((b) => <Check key={b}>{b}</Check>)}</ul>
      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-sm font-semibold text-accent [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">See all {copy.bullets.length} inclusions</span>
            <span className="hidden group-open:inline">Show fewer</span>
          </summary>
          <ul className="mt-3 grid gap-2.5">{rest.map((b) => <Check key={b}>{b}</Check>)}</ul>
        </details>
      )}
    </div>
  );
}

export async function PricingTiers({ line }: { line: LineId }) {
  const currency = await getCurrency();
  const [bookId, completeId, proId] = lineTiers[line];
  const card = (id: TierId, recommended = false) => {
    const copy = tierCopy[id as keyof typeof tierCopy];
    const t = tiers[id];
    const open = isTierOfferable(id);
    return (
      <div
        id={id === bookId ? "book" : undefined}
        className={`relative flex h-full scroll-mt-24 flex-col rounded-xl bg-white p-7 ${
          recommended ? "order-first border-2 border-accent shadow-lift lg:order-none" : "border border-line"
        }`}
      >
        {recommended && (
          <span className="absolute -top-3 left-7 rounded bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">Recommended</span>
        )}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${recommended ? "text-accent" : "text-ink-muted"}`}>{t.label}</p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">{copy.formula}</p>
          </div>
          {id === bookId &&
            (line === "claude" ? (
              <span className="flex shrink-0 items-end">
                <Ebook book="claude" className="w-[52px]" sizes="52px" />
                <Ebook book="operator" className="-ml-3 w-[44px]" sizes="44px" />
              </span>
            ) : (
              <Ebook book="copilot" className="w-[52px] shrink-0" sizes="52px" />
            ))}
        </div>
        <h3 className="mt-4 text-xl">{copy.tagline}</h3>
        <p className="mt-5 font-display text-5xl font-semibold tracking-tight"><TierPrice tier={id} fallback={formatPrice(t.price[currency], currency)} /></p>
        <p className="mt-1 text-sm text-ink-muted">{open ? "One-time payment" : "Coming soon"}</p>
        <Bullets copy={copy} />
        <div className="mt-auto pt-8">
          <BuyButton tier={id} label={copy.cta} showPrice={false} variant={recommended ? "primary" : "secondary"} className="w-full" />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* On phones Complete comes first; from lg up the columns read Book, Complete, Pro. */}
      <Reveal className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
        {card(bookId)}
        {card(completeId, true)}
        {card(proId)}
      </Reveal>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-muted">
        <span className="flex items-center gap-2"><Icon.shield className="h-4 w-4 text-accent" /> {site.guaranteeDays}-day money-back guarantee</span>
        <span className="flex items-center gap-2"><Icon.lock className="h-4 w-4 text-accent" /> Secure checkout by {currency === "INR" ? "Razorpay" : "Paddle"}</span>
        <span className="flex items-center gap-2"><Icon.download className="h-4 w-4 text-accent" /> Instant access after payment</span>
      </div>
    </>
  );
}

/** Both systems together. Needs a CheckoutProvider above it (Shell, or the homepage's). */
export async function Bundles() {
  const currency = await getCurrency();
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {bundleCopy.bundles.map((b) => {
        const open = isTierOfferable(b.id);
        return (
          <div key={b.id} className="flex flex-col rounded-xl border border-line bg-white p-7">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">{b.label}</p>
              <p className="text-sm font-semibold text-ink-soft">{b.formula}</p>
            </div>
            <p className="mt-4 font-display text-4xl font-semibold tracking-tight"><TierPrice tier={b.id} fallback={formatPrice(tiers[b.id].price[currency], currency)} /></p>
            <p className="mt-1 text-sm text-ink-muted">{open ? "One-time payment" : "Coming soon"}</p>
            <p className="mt-4 leading-relaxed text-ink-muted">{b.body}</p>
            <div className="mt-auto pt-7">
              <BuyButton tier={b.id} label={bundleCopy.cta} showPrice={false} variant="secondary" className="w-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
