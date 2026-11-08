import type { Metadata } from "next";
import OperatorResources from "@/hub/components/operator-resources";

const title = "Companion Resources | The Claude Operator";
const description = "The Operator Toolkit for The Claude Operator by Kaelis Voss: skills, workflows, templates, workbooks and practice files. The posters are free; the toolkit comes with the book.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <OperatorResources />;
}
