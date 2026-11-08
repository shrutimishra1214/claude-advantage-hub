import type { Metadata } from "next";
import CopilotResources from "@/hub/components/copilot-resources";

const title = "Copilot Packs | The Microsoft Copilot Advantage";
const description = "Six Microsoft Copilot packs for Word, Excel, Outlook, PowerPoint, Teams and automation. The Outlook playbook is free; all six come with the Complete system.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <CopilotResources />;
}
