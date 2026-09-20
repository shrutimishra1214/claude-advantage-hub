import { createFileRoute } from "@tanstack/react-router";
import CopilotLandingPage from "@/components/copilot-landing-page";

const title = "The Microsoft Copilot Advantage — Free Reader Bonus Pack";
const description =
  "Bought The Microsoft Copilot Advantage? Claim the free bonus pack: prompt vault, 90-day roadmap, workbooks, playbooks and framework cards.";

export const Route = createFileRoute("/the-microsoft-copilot-advantage")({
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
  component: CopilotLandingPage,
});
