import Link from "next/link";
import { lines, type LineId } from "@/lib/lines";
import { site } from "@/lib/site";
import { Logo } from "./Header";

const copilotLinks = [
  { href: "/copilot-advantage#overview", label: "Overview" },
  { href: "/copilot-advantage#whats-inside", label: "What's Inside" },
  { href: "/copilot-advantage#workflows", label: "Workflows" },
  { href: "/copilot-advantage#templates", label: "Templates" },
  { href: "/copilot-advantage#faq", label: "FAQ" },
  { href: "/thank-you", label: "My library" },
  { href: "/login?line=copilot", label: "Member login" },
];
const company = [
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refund policy" },
  { href: "/shipping-policy", label: "Delivery policy" },
];

const claudeLinks = [
  { href: "/claude-advantage#overview", label: "Overview" },
  { href: "/claude-advantage#system", label: "The System" },
  { href: "/claude-advantage#workflows", label: "Workflows" },
  { href: "/claude-advantage#pricing", label: "Pricing" },
  { href: "/claude-advantage#faq", label: "FAQ" },
  { href: "/thank-you", label: "My library" },
  { href: "/login?line=claude", label: "Member login" },
];

export function Footer({ line = "copilot" }: { line?: LineId }) {
  const L = lines[line];
  const product = line === "claude" ? claudeLinks : copilotLinks;
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo line={line} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {L.name}™ · {L.descriptor}. Created by {site.name}.
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
                  {l.href.startsWith("/copilot-advantage#") ? <a href={l.href} className="hover:text-ink">{l.label}</a> : <Link href={l.href} className="hover:text-ink">{l.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-6 text-xs leading-relaxed text-ink-muted md:flex-row md:justify-between md:gap-10">
          <p className="shrink-0">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-3xl md:text-right">{L.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
