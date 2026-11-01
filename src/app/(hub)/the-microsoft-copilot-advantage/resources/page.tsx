import type { Metadata } from "next";
import CopilotResources from "@/hub/components/copilot-resources";

const title = "Bonus Resources | The Microsoft Copilot Advantage";
const description = "Download every free companion resource for The Microsoft Copilot Advantage: prompt libraries, cheatsheets, playbooks and checklists.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <CopilotResources />;
}
