import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MembersFrame } from "@/components/members/MembersFrame";
import { getMember } from "@/lib/member";
import { copilotGroups } from "@/lib/member-nav";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: { default: "Member area", template: `%s · ${site.productName}` }, robots: { index: false, follow: false } };

export default async function MembersLayout({ children }: { children: ReactNode }) {
  return <MembersFrame line="copilot" groups={copilotGroups} member={await getMember("copilot")}>{children}</MembersFrame>;
}
