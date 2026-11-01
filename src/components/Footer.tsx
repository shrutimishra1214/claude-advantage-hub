import Link from "next/link";
import { lines } from "@/lib/lines";
import { site } from "@/lib/site";

// One restrained footer for the whole site: the brand, the two products, the
// company and legal pages, and both independence disclaimers.

const columns = [
  {
    title: "Products",
    links: [
      { href: "/copilot-advantage", label: "Microsoft Copilot Advantage" },
      { href: "/claude-advantage", label: "Claude Advantage" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Member login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

// `line` is kept so product pages can pass it; the footer is the same everywhere.
export function Footer(_: { line?: string } = {}) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-ink">{site.name}</Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">{site.tagline}</p>
          <p className="mt-3 text-sm">
            <a className="font-medium text-accent hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 grid gap-2 text-sm text-ink-muted">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container grid gap-2 py-6 text-xs leading-relaxed text-ink-muted">
          <p>{lines.copilot.disclaimer}</p>
          <p>{lines.claude.disclaimer}</p>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
