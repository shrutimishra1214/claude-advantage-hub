import type { Metadata } from "next";
import ClaudeOperatorPage from "@/hub/components/claude-operator-page";

const title = "The Claude Operator | Kaelis Voss";
const description = "Explore The Claude Operator by Kaelis Voss, a practical guide to mastering Claude AI for advanced workflows across Claude Code, design, Cowork, Excel, PowerPoint, and more.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "book" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <ClaudeOperatorPage />;
}
