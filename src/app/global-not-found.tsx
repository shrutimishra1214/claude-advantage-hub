import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Link from "next/link";
import "./(site)/globals.css";

const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = { title: "Page not found | Kaelis Voss" };

// Shown for URLs that match neither root layout.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <main className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <p className="font-display text-7xl font-medium accent-em">404</p>
            <h1 className="mt-4 text-2xl font-medium">This page doesn&apos;t exist</h1>
            <Link href="/" className="btn-primary mt-8">Back to home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
