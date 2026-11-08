import type { ProductId } from "./products";

// Every file a buyer can download, besides the books themselves. Each belongs to
// one product: owning the product unlocks the file. Files live in private-files/
// (local) and the PRODUCT_FILES R2 bucket (production), under `key`, and are only
// served through /api/files/[id] after an ownership check.
//
//   Copilot Book      the book
//   Copilot Complete  the six Copilot packs (the book promises no bonuses)
//   Claude Book       both books, the Claude Advantage reader bonuses (promised on
//                     its "Your Free Reader Bonuses" page) and the Operator Toolkit
//                     (The Claude Operator's QR code unlocks it)
//   Claude Complete   the advanced reference set
//
// A few files are also free samples on the companion pages: see `freeSamples`.

export type FileGroup = "start" | "workbooks" | "prompts" | "skills" | "reference";

export const groupNames: Record<FileGroup, string> = {
  start: "Start here",
  workbooks: "Workbooks and planners",
  prompts: "Prompts and workflows",
  skills: "Skills, templates and practice files",
  reference: "Quick reference",
};

export type ProductFile = {
  id: string;
  product: ProductId;
  title: string;
  desc: string;
  group: FileGroup;
  key: string;
  /** The name the buyer's download is saved as. */
  filename: string;
  /** "12 pages", "32 skills", ... */
  meta: string;
};

const f = (product: ProductId, group: FileGroup, id: string, key: string, title: string, desc: string, meta: string): ProductFile => ({
  id,
  product,
  group,
  key,
  title,
  desc,
  meta,
  filename: key.split("/").pop()!,
});

export const productFiles: ProductFile[] = [
  // ── The Microsoft Copilot Advantage: Complete ──
  f("toolkit", "prompts", "copilot-word", "copilot/50-Copilot-Prompts-for-Word.pdf", "50+ Copilot Prompts for Word", "Draft, rewrite, summarise and polish documents, grounded in your own files.", "PDF · 7 pages"),
  f("toolkit", "prompts", "copilot-excel", "copilot/Excel-Formula-and-Analysis-Cheatsheet.pdf", "Excel Formula & Analysis Cheatsheet", "70+ one-line prompts for formulas, cleaning, analysis, forecasts and charts.", "PDF · 10 pages"),
  f("toolkit", "prompts", "copilot-outlook", "copilot/Outlook-Inbox-Zero-Playbook.pdf", "Outlook Inbox-Zero Playbook", "60+ prompts for triage, replies and follow-through, with a daily rhythm.", "PDF · 8 pages"),
  f("toolkit", "prompts", "copilot-powerpoint", "copilot/PowerPoint-Storytelling-Kit.pdf", "PowerPoint Storytelling Kit", "Four narrative frameworks and slide-by-slide prompts for decks that land.", "PDF · 9 pages"),
  f("toolkit", "prompts", "copilot-teams", "copilot/Teams-Meeting-Productivity-Pack.pdf", "Teams Meeting Productivity Pack", "60+ prompts for before, during and after meetings, for 9 meeting types.", "PDF · 11 pages"),
  f("toolkit", "workbooks", "copilot-automation", "copilot/The-Automation-Checklist.pdf", "The Automation Checklist", "Choose between a prompt, a scheduled prompt, an agent or a flow, then build it.", "PDF · 10 pages"),

  // ── The Claude Advantage: reader bonuses (Claude Book) ──
  f("claude-book", "start", "claude-7-day", "claude/7-Day-Discovery-Playbook.pdf", "7-Day Discovery Playbook", "One idea a day, with prompts and A/B tests, from first chat to confident user.", "PDF · 28 pages"),
  f("claude-book", "start", "claude-flashcards", "claude/Framework-Flashcards.pdf", "Framework Flashcards", "The book's ten frameworks, one printable card each.", "PDF · 11 pages"),
  f("claude-book", "workbooks", "claude-phase-1", "claude/90-Day-Roadmap-Phase-1-Workbook.pdf", "90-Day Roadmap: Phase 1 Workbook", "Days 1 to 30, Foundation: workflow audit, Context Stack, communication and research.", "PDF · 14 pages"),
  f("claude-book", "workbooks", "claude-phase-2", "claude/90-Day-Roadmap-Phase-2-Workbook.pdf", "90-Day Roadmap: Phase 2 Workbook", "Days 31 to 60, Integration: role playbook, team AI policy and training.", "PDF · 12 pages"),
  f("claude-book", "workbooks", "claude-phase-3", "claude/90-Day-Roadmap-Phase-3-Workbook.pdf", "90-Day Roadmap: Phase 3 Workbook", "Days 61 to 90, Mastery: prompt library audit, business case and capability review.", "PDF · 14 pages"),
  f("claude-book", "prompts", "claude-vault", "claude/Master-Prompt-Vault.pdf", "Master Prompt Vault", "500 copy-paste prompts across 14 business functions.", "PDF · 145 pages"),
  f("claude-book", "prompts", "claude-workflow-guide", "claude/Workflow-Template-and-Implementation-Guide.pdf", "Workflow Template & Implementation Guide", "Turn a recurring task into a documented, repeatable Claude workflow.", "PDF · 10 pages"),
  f("claude-book", "workbooks", "claude-governance", "claude/AI-Governance-Starter-Kit.pdf", "AI Governance Starter Kit", "Usage policy, RACI, vendor scorecard, risk map and incident response, one page each.", "PDF · 9 pages"),

  // ── The Claude Operator: the Operator Toolkit (Claude Book) ──
  f("claude-operator-book", "start", "operator-all", "operator/Operator-Toolkit.zip", "The complete Operator Toolkit", "Everything below in one download.", "ZIP · 0.9 MB"),
  f("claude-operator-book", "skills", "operator-skills", "operator/skills-library.zip", "Skills Library", "32 skills, each ready to upload to Claude and with its own five-input test set.", "ZIP · 32 skills"),
  f("claude-operator-book", "skills", "operator-roles", "operator/role-packs.zip", "Five Role Packs", "Set-ups and skills for consultants, finance, founders, marketing and operations.", "ZIP · 5 roles"),
  f("claude-operator-book", "prompts", "operator-workflows", "operator/50-Claude-Workflows-for-Professionals.pdf", "50 Claude Workflows for Professionals", "Ten ready-to-run workflows each for research, marketing, operations, finance and management.", "PDF · 5 pages"),
  f("claude-operator-book", "skills", "operator-templates", "operator/templates.zip", "Templates", "Briefing pack, delegation brief, design brief, project rulebook, AI-use policy and the 30-day plan.", "ZIP · 6 templates"),
  f("claude-operator-book", "workbooks", "operator-workbooks", "operator/workbooks.zip", "Working Workbooks", "Chief of Staff Ledger, ROI scorecards, skill test sheet and the monthly review workbook.", "ZIP · 3 Excel files"),
  f("claude-operator-book", "skills", "operator-practice", "operator/practice-files.zip", "Practice Files", "Three rehearsal workbooks for Part 3, a guide and a separate answer key.", "ZIP · 3 workbooks"),
  f("claude-operator-book", "reference", "operator-posters", "operator/posters.zip", "Printable Posters", "The Operator Loop and the Three Questions, one page each.", "ZIP · 2 posters"),

  // ── The Claude Advantage: Complete ──
  f("claude-system", "reference", "claude-handbook", "claude/Claude-Features-Handbook.pdf", "The Complete Claude Features Handbook", "28 Claude features, with step-by-step use, examples, trade-offs and a decision guide.", "PDF · 43 pages"),
  f("claude-system", "reference", "claude-command-cards", "claude/Claude-Command-Cards.pdf", "Claude Command Cards", "Printable reference for Claude Code commands, slash commands, Cowork, Chrome and Office.", "PDF · 4 pages"),
];

export const fileById = (id: string) => productFiles.find((x) => x.id === id);
export const filesFor = (product: ProductId) => productFiles.filter((x) => x.product === product);

/** Free on the companion pages, for an email address. Served from public/free/. */
export const freeSamples = {
  copilot: { title: "Outlook Inbox-Zero Playbook", href: "/free/Outlook-Inbox-Zero-Playbook.pdf", meta: "PDF · 8 pages" },
  claude: { title: "Framework Flashcards", href: "/free/Claude-Advantage-Framework-Flashcards.pdf", meta: "PDF · 11 pages" },
  operator: { title: "The Operator Loop and Three Questions posters", href: "/free/Operator-Posters.zip", meta: "ZIP · 2 posters" },
} as const;
