import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

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

export const viewport: Viewport = { themeColor: "#FBFAFF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
