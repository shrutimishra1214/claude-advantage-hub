import type { NavGroup } from "@/components/members/MemberNav";

// Member-area navigation for each product line.

export const copilotGroups: NavGroup[] = [
  { label: "Start", links: [
    { href: "/copilot-advantage/members", icon: "home", label: "Home" },
    { href: "/copilot-advantage/members/quick-wins", icon: "sparkle", label: "12 Quick Wins" },
    { href: "/copilot-advantage/members/quickstart", icon: "compass", label: "Quickstart" },
  ] },
  { label: "Learn", links: [
    { href: "/copilot-advantage/members/book", icon: "pages", label: "The Book" },
    { href: "/copilot-advantage/members/method", icon: "target", label: "The Method" },
    { href: "/copilot-advantage/members/plan", icon: "clock", label: "90-Day Plan" },
    { href: "/copilot-advantage/members/challenge", icon: "calendar", label: "30-Day Challenge" },
  ] },
  { label: "Use", links: [
    { href: "/copilot-advantage/members/prompts", icon: "book", label: "Prompt Library" },
    { href: "/copilot-advantage/members/library", icon: "chat", label: "Book Prompts" },
    { href: "/copilot-advantage/members/workflows", icon: "flow", label: "Workflow Vault" },
    { href: "/copilot-advantage/members/templates", icon: "doc", label: "Templates" },
    { href: "/copilot-advantage/members/builder", icon: "wand", label: "Prompt Builder" },
    { href: "/copilot-advantage/members/worksheets", icon: "grid", label: "Worksheets" },
  ] },
  { label: "Reference", links: [
    { href: "/copilot-advantage/members/cheat-sheets", icon: "printer", label: "Cheat Sheets" },
    { href: "/library", icon: "printer", label: "Downloads" },
    { href: "/copilot-advantage/members/troubleshooting", icon: "gear", label: "Troubleshooting" },
    { href: "/copilot-advantage/members/glossary", icon: "notebook", label: "Glossary" },
  ] },
];

const C = "/claude-advantage/members";
export const claudeGroups: NavGroup[] = [
  { label: "Start", links: [
    { href: C, icon: "home", label: "Home" },
    { href: `${C}/context`, icon: "user", label: "Context Kit" },
  ] },
  { label: "Learn", links: [
    { href: `${C}/book`, icon: "pages", label: "The Book" },
    { href: `${C}/roadmap`, icon: "clock", label: "90-Day Roadmap" },
    { href: `${C}/challenge`, icon: "calendar", label: "30-Day Transformation" },
  ] },
  { label: "Use", links: [
    { href: `${C}/prompts`, icon: "book", label: "Prompt Library" },
    { href: `${C}/workflows`, icon: "flow", label: "Workflow Vault" },
    { href: `${C}/builder`, icon: "wand", label: "Prompt Builder" },
    { href: `${C}/worksheets`, icon: "grid", label: "Worksheets" },
  ] },
  { label: "Operator · Advanced", links: [
    { href: `${C}/operator`, icon: "target", label: "Operator Track", badge: "Adv" },
    { href: `${C}/operator/skills`, icon: "layers", label: "Skills Library" },
    { href: `${C}/operator/workflows`, icon: "refresh", label: "Operator Workflows" },
    { href: `${C}/operator/plan`, icon: "calendar", label: "30-Day Operator Plan" },
  ] },
  { label: "Reference", links: [
    { href: `${C}/glossary`, icon: "notebook", label: "Glossary" },
    { href: "/library", icon: "printer", label: "Downloads" },
  ] },
];
