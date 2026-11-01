import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MembersFrame } from "@/components/members/MembersFrame";
import { getMember } from "@/lib/member";
import { claudeGroups } from "@/lib/member-nav";

export const metadata: Metadata = { title: { default: "Member area", template: "%s · The Claude Advantage" }, robots: { index: false, follow: false } };

export default async function ClaudeMembersLayout({ children }: { children: ReactNode }) {
  return <MembersFrame line="claude" groups={claudeGroups} member={await getMember("claude")}>{children}</MembersFrame>;
}
