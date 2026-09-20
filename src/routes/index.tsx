import { createFileRoute } from "@tanstack/react-router";
import BookHub from "@/components/book-hub";

const title = "Kaelis Voss | Practical Books for Working with AI";
const description =
  "Explore practical AI books by Kaelis Voss, including The Claude Advantage, The Microsoft Copilot Advantage, and Agentic AI Bible.";

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
