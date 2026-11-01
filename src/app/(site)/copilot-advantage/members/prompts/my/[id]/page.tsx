import type { Metadata } from "next";
import { MyPrompt } from "@/components/members/MyPromptPages";

export const metadata: Metadata = { title: "My prompt" };

export default async function MyPromptPage({ params }: { params: Promise<{ id: string }> }) {
  return <MyPrompt id={(await params).id} />;
}
