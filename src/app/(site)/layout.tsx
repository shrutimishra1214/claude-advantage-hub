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
  title: { default: site.seoTitle, template: `%s | ${site.productName}` },
  description: site.description,
  keywords: [
    "Microsoft Copilot",
    "Microsoft Copilot guide",
    "Microsoft Copilot prompts",
    "Microsoft Copilot workflows",
    "Microsoft 365 Copilot",
    "Copilot prompts for work",
    "Microsoft Copilot templates",
    "Copilot productivity system",
    "AI productivity for professionals",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.seoTitle,
    description: site.description,
    type: "website",
    siteName: site.productName,
    images: [{ url: "/images/cover.jpg", width: 1100, height: 1392, alt: site.productName }],
  },
  twitter: { card: "summary_large_image", title: site.seoTitle, description: site.description },
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
