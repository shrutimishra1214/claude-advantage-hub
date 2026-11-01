import { BookOpen, BriefcaseBusiness, FileSpreadsheet, Files, Layers3, ListChecks, Presentation, Workflow } from "lucide-react";

export const operatorBonuses = [
  {
    icon: Workflow,
    title: "Skills Library",
    desc: "32 readable skills with tests, plus install-ready ZIPs for Claude.",
    file: "skills-library.zip",
  },
  {
    icon: BriefcaseBusiness,
    title: "Five Role Packs",
    desc: "Starter setups for consultants, marketers, founders, operations managers, and finance leads.",
    file: "role-packs.zip",
  },
  {
    icon: BookOpen,
    title: "50 Claude Workflows",
    desc: "Ready-to-run workflows for research, marketing, operations, finance, and management.",
    file: "50-Claude-Workflows-for-Professionals.pdf",
  },
  {
    icon: FileSpreadsheet,
    title: "Working Workbooks",
    desc: "The Chief of Staff Ledger, skill test sheet, and monthly review workbook.",
    file: "workbooks.zip",
  },
  {
    icon: Files,
    title: "Templates",
    desc: "Briefing, delegation, design, project rules, team AI policy, and a 30-day plan.",
    file: "templates.zip",
  },
  {
    icon: ListChecks,
    title: "Practice Files",
    desc: "Audit, forecast, and monthly review exercises with a guide and answer key.",
    file: "practice-files.zip",
  },
  {
    icon: Presentation,
    title: "Printable Posters",
    desc: "The Operator Loop and the Three Questions as print-ready PDFs.",
    file: "posters.zip",
  },
  {
    icon: Layers3,
    title: "Complete Operator Toolkit",
    desc: "Everything in one ZIP, including the README and all original folders.",
    file: "Operator-Toolkit.zip",
  },
].map((bonus) => ({ ...bonus, url: `/operator-toolkit/${bonus.file}` }));