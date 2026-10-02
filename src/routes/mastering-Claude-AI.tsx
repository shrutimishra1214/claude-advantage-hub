import { createFileRoute } from "@tanstack/react-router";
import ClaudeOperatorPage from "@/components/claude-operator-page";

const title = "The Claude Operator | Kaelis Voss";
const description = "Explore The Claude Operator by Kaelis Voss, a practical guide to mastering Claude AI for advanced workflows across Claude Code, design, Cowork, Excel, PowerPoint, and more.";

export const Route = createFileRoute("/mastering-Claude-AI")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClaudeOperatorPage,
});