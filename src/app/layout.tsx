import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"], style: ["normal", "italic"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: ["500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.bookTitle} | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.bookTitle,
    description: site.description,
    type: "website",
    images: [{ url: "/images/cover.jpg", width: 1100, height: 1392, alt: site.bookTitle }],
  },
  twitter: { card: "summary_large_image", title: site.bookTitle, description: site.description },
};

export const viewport: Viewport = { themeColor: "#F6F3EE" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
