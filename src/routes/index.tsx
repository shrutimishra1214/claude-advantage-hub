import { createFileRoute } from "@tanstack/react-router";
import BookHub from "@/components/book-hub";

const title = "Kaelis Voss Book Hub — Free Reader Bonus Packs";
const description =
  "Claim the free companion resources for Kaelis Voss books: The Claude Advantage and The Microsoft Copilot Advantage.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookHub,
});
