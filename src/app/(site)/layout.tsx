import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Source_Serif_4 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
// Headlines on The Claude Advantage pages.
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.brandTitle, template: `%s | ${site.name}` },
  description: site.brandDescription,
  keywords: [
    "AI productivity system",
    "AI work systems",
    "AI workflow systems",
    "AI productivity for professionals",
    "Microsoft Copilot productivity",
    "Copilot workflows",
    "Claude workflows",
    "Claude AI productivity",
  ],
  openGraph: { title: site.brandTitle, description: site.brandDescription, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.brandTitle, description: site.brandDescription },
};

export const viewport: Viewport = { themeColor: "#FFFFFF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions (Grammarly and others) add attributes to <html> and <body> before React loads.
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
