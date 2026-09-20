import {
  BookOpen,
  FileSpreadsheet,
  Mail,
  Presentation,
  Users,
  Zap,
} from "lucide-react";
import wordPrompts from "@/assets/copilot-bonuses/50-Copilot-Prompts-for-Word.pdf.asset.json";
import excelCheatsheet from "@/assets/copilot-bonuses/Excel-Formula-and-Analysis-Cheatsheet.pdf.asset.json";
import outlookPlaybook from "@/assets/copilot-bonuses/Outlook-Inbox-Zero-Playbook.pdf.asset.json";
import powerpointKit from "@/assets/copilot-bonuses/PowerPoint-Storytelling-Kit.pdf.asset.json";
import teamsPack from "@/assets/copilot-bonuses/Teams-Meeting-Productivity-Pack.pdf.asset.json";
import automationChecklist from "@/assets/copilot-bonuses/The-Automation-Checklist.pdf.asset.json";

export type Bonus = {
  icon: typeof BookOpen;
  color: string;
  title: string;
  desc: string;
  file: string;
  url: string;
};

export const bonuses: Bonus[] = [
  {
    icon: BookOpen,
    color: "var(--brand-purple)",
    title: "50+ Copilot Prompts for Word",
    desc: "Ready-to-paste prompts to draft, summarize, and polish documents in seconds.",
    file: "50-Copilot-Prompts-for-Word.pdf",
    url: wordPrompts.url,
  },
  {
    icon: FileSpreadsheet,
    color: "var(--brand-green)",
    title: "Excel Formula & Analysis Cheatsheet",
    desc: "Turn raw data into forecasts, charts, and insights with one-line Copilot prompts.",
    file: "Excel-Formula-and-Analysis-Cheatsheet.pdf",
    url: excelCheatsheet.url,
  },
  {
    icon: Mail,
    color: "var(--brand-blue)",
    title: "Outlook Inbox-Zero Playbook",
    desc: "Templates to tame email, draft replies, and stay ahead of your inbox every day.",
    file: "Outlook-Inbox-Zero-Playbook.pdf",
    url: outlookPlaybook.url,
  },
  {
    icon: Presentation,
    color: "var(--brand-orange)",
    title: "PowerPoint Storytelling Kit",
    desc: "Frameworks and prompt starters for stunning decks that actually land.",
    file: "PowerPoint-Storytelling-Kit.pdf",
    url: powerpointKit.url,
  },
  {
    icon: Users,
    color: "var(--brand-pink)",
    title: "Teams Meeting Productivity Pack",
    desc: "Prompts for recaps, action items, and better collaboration, automatically.",
    file: "Teams-Meeting-Productivity-Pack.pdf",
    url: teamsPack.url,
  },
  {
    icon: Zap,
    color: "var(--brand-purple)",
    title: "Automation Checklist",
    desc: "Step-by-step system to turn repetitive tasks into Copilot-powered workflows.",
    file: "The-Automation-Checklist.pdf",
    url: automationChecklist.url,
  },
];
