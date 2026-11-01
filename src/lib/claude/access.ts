import { getMember } from "../member";

/** What the current visitor can open in the Claude member area. */
export async function claudeAccess() {
  const member = await getMember("claude");
  const owns = (p: "claude-system" | "claude-operator") => Boolean(member && (member.preview || member.owned.includes(p)));
  return { member, system: owns("claude-system"), operator: owns("claude-operator") };
}
