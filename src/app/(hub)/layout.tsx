import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

// The book reader pages, merged in from claude-advantage-hub. They keep their
// own design system (Tailwind v4, compiled to /hub/hub.css by tools/hub-css), so
// they get a root layout of their own and never load the main site's styles.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  authors: [{ name: "Kaelis Voss" }],
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function HubLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/hub/hub.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
