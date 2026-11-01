import type { Metadata } from "next";
import LandingPage from "@/hub/components/landing-page";

const title = "The Claude Advantage | Free Reader Bonus Pack";
const description = "Claim the free companion resources for The Claude Advantage by Kaelis Voss.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "book" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <LandingPage />;
}
