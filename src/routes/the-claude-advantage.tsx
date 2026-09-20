import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/landing-page";

export const Route = createFileRoute("/the-claude-advantage")({
  head: () => ({
    meta: [
      { title: "The Claude Advantage — Free Reader Bonus Pack" },
      { name: "description", content: "Claim the free companion resources for The Claude Advantage by Kaelis Voss." },
      { property: "og:title", content: "The Claude Advantage — Free Reader Bonus Pack" },
      { property: "og:description", content: "Claim the free companion resources for The Claude Advantage by Kaelis Voss." },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
