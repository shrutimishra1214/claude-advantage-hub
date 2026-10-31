import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">Practical, no-jargon guides that help busy professionals get real results from AI at work.</p>
          <p className="mt-4 text-sm">
            <a className="font-medium text-brand-violet hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Book</p>
          <ul className="mt-3 grid gap-2 text-sm text-ink-muted">
            <li><a href="/#toolkit" className="hover:text-ink">The toolkit</a></li>
            <li><a href="/#curriculum" className="hover:text-ink">Curriculum</a></li>
            <li><a href="/#look-inside" className="hover:text-ink">Look inside</a></li>
            <li><a href="/#reviews" className="hover:text-ink">Reader stories</a></li>
            <li><a href="/#faq" className="hover:text-ink">FAQ</a></li>
            <li><Link href="/thank-you" className="hover:text-ink">My library</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Policies</p>
          <ul className="mt-3 grid gap-2 text-sm text-ink-muted">
            <li><Link href="/terms" className="hover:text-ink">Terms &amp; conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-ink">Privacy policy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-ink">Refund policy</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-ink">Delivery policy</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/5">
        <div className="container flex flex-col gap-3 py-6 text-xs leading-relaxed text-ink-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
