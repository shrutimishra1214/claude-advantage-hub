import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Header";

const product = [
  { href: "/#overview", label: "Overview" },
  { href: "/#whats-inside", label: "What's Inside" },
  { href: "/#workflows", label: "Workflows" },
  { href: "/#templates", label: "Templates" },
  { href: "/#faq", label: "FAQ" },
  { href: "/thank-you", label: "My library" },
];
const company = [
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund policy" },
  { href: "/shipping-policy", label: "Delivery policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            The Microsoft Copilot Advantage™ · {site.descriptor}. Created by {site.name}.
          </p>
          <p className="mt-3 text-sm">
            <a className="font-medium text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        {[{ title: "Product", links: product }, { title: "Company", links: company }].map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 grid gap-2 text-sm text-ink-muted">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/#") ? <a href={l.href} className="hover:text-ink">{l.label}</a> : <Link href={l.href} className="hover:text-ink">{l.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-6 text-xs leading-relaxed text-ink-muted md:flex-row md:justify-between md:gap-10">
          <p className="shrink-0">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-3xl md:text-right">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
