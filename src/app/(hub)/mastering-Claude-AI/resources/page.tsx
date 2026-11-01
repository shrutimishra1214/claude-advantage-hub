import type { Metadata } from "next";
import OperatorResources from "@/hub/components/operator-resources";

const title = "Bonus Resources | The Claude Operator";
const description = "Download the complete companion toolkit for The Claude Operator by Kaelis Voss, including skills, workflows, templates, workbooks, and practice files.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <OperatorResources />;
}
