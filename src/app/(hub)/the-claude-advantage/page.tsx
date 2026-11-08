import type { Metadata } from "next";
import LandingPage from "@/hub/components/landing-page";

const title = "The Claude Advantage | Free Framework Flashcards";
const description = "Download the ten frameworks from The Claude Advantage by Kaelis Voss as free printable flashcards. The full reader bonus pack comes with the book.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "book" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <LandingPage />;
}
