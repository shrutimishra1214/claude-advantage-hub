import type { Metadata } from "next";
import CopilotLandingPage from "@/hub/components/copilot-landing-page";

const title = "The Microsoft Copilot Advantage | Free Outlook Playbook";
const description = "Download the free Outlook Inbox-Zero Playbook: 60+ Microsoft Copilot prompts for triage, replies and follow-through, from The Microsoft Copilot Advantage.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "book" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <CopilotLandingPage />;
}
