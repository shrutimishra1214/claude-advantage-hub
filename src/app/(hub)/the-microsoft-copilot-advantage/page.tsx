import type { Metadata } from "next";
import CopilotLandingPage from "@/hub/components/copilot-landing-page";

const title = "The Microsoft Copilot Advantage — Free Reader Bonus Pack";
const description = "Bought The Microsoft Copilot Advantage? Claim the free bonus pack: prompt vault, 90-day roadmap, workbooks, playbooks and framework cards.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "book" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <CopilotLandingPage />;
}
