import type { StepId } from "./funnel";
import type { TierId } from "./products";

// What each tier is, in one place, so the product pages, the homepage, the
// checkout and the upgrade offers all use the same words.
//   Book = Learn · Complete = Learn + Implement · Pro = Build + Systemize

export type TierCopy = {
  tagline: string;
  formula: string;
  /** Introduces the list, e.g. "Everything in Complete, plus:". */
  intro?: string;
  bullets: string[];
  /** How many bullets to show before "See everything" on the pricing cards. */
  shown?: number;
  cta: string;
};

const book = { tagline: "Understand what is possible.", formula: "Learn", cta: "Get the Book" };
const complete = { tagline: "Put it into practice.", formula: "Learn + Implement", cta: "Get the Complete System" };
const pro = { tagline: "Build a repeatable AI work system.", formula: "Build + Systemize", cta: "Build Your AI Work System" };

export const tierCopy: Record<Exclude<TierId, "both-complete" | "both-pro">, TierCopy> = {
  book: {
    ...book,
    bullets: [
      "The complete guide: 39 chapters, 175+ pages",
      "Copilot across Word, Excel, PowerPoint, Outlook and Teams",
      "The G-C-S-E prompting framework",
      "Practical, worked examples",
    ],
  },
  complete: {
    ...complete,
    intro: "The Book, plus the full implementation system:",
    bullets: [
      "Complete Microsoft Copilot guide",
      "250+ professional prompt recipes",
      "100 repeatable Copilot workflows",
      "Microsoft 365 template vault",
      "30-Day Copilot Transformation",
      "Prompt Builder",
      "Copilot cheat sheets",
      "Workflow implementation resources",
      "Members area and resource dashboard",
      "Future updates",
    ],
  },
  pro: {
    ...pro,
    intro: "Everything in Complete, plus:",
    shown: 7,
    bullets: [
      "Personal Copilot Work System",
      "Advanced workflow architecture",
      "Role-specific systems",
      "Advanced workflow builder",
      "Expanded workflow library",
      "Weekly planning system",
      "Major future updates",
      "Email workflow system",
      "Meeting workflow system",
      "Research workflow system",
      "Document workflow system",
      "Excel workflow system",
      "Presentation workflow system",
      "Project management workflows",
      "Decision-making workflows",
    ],
  },
  "claude-book": {
    ...book,
    bullets: [
      "The complete guide to working with Claude",
      "Prompting, research, writing and analysis",
      "Projects, documents, Claude Code and design",
      "Practical, worked examples",
    ],
  },
  "claude-complete": {
    ...complete,
    intro: "The Book, plus the full implementation system:",
    shown: 10,
    bullets: [
      "Complete Claude AI guide",
      "250+ advanced prompt recipes",
      "100+ advanced workflows",
      "Research System",
      "Writing System",
      "Analysis System",
      "Workflow Vault",
      "Prompt Builder",
      "30-Day Transformation",
      "Members area and resource dashboard",
      "Project workflows",
      "Document workflows",
      "Claude Code workflows",
      "Claude design workflows",
      "Cheat sheets",
      "Future updates",
    ],
  },
  "claude-pro": {
    ...pro,
    tagline: "Build a repeatable AI work system.",
    intro: "Everything in Complete, plus:",
    shown: 7,
    bullets: [
      "Personal AI Operating System",
      "Advanced automation and agentic workflow architecture",
      "Professional role systems",
      "Advanced prompt architecture",
      "Advanced workflow builder",
      "The Claude Operator, the advanced companion book",
      "Major future updates",
      "Advanced Research System",
      "Advanced project workflows",
      "Advanced document workflows",
      "Claude Code workflow library",
      "Claude design workflows",
      "Expanded workflow library",
    ],
  },
};

/** The tier each upgrade offer takes the buyer to. */
export const upgradeTier: Record<StepId, keyof typeof tierCopy> = {
  "complete-upgrade": "complete",
  "pro-upgrade": "pro",
  "claude-complete-upgrade": "claude-complete",
  "claude-pro-upgrade": "claude-pro",
};

export const bundleCopy = {
  title: "Build your complete AI work system.",
  lead: "Get both Kaelis Voss systems together and build a broader AI workflow across the tools you already use.",
  cta: "Get Both Systems",
  bundles: [
    {
      id: "both-complete" as const,
      label: "Both Complete",
      formula: "Learn + Implement",
      body: "The Microsoft Copilot Advantage™ Complete and The Claude Advantage™ Complete: both guides and both implementation systems.",
    },
    {
      id: "both-pro" as const,
      label: "Both Pro",
      formula: "Build + Systemize",
      body: "The Microsoft Copilot Advantage™ Pro and The Claude Advantage™ Pro: everything in both Complete systems, plus both advanced work systems.",
    },
  ],
};

/** Questions every product page and the homepage answer the same way. */
export const sharedFaqs = [
  {
    q: "What is the difference between the Book and Complete?",
    a: "The Book teaches the framework and practical methods. Complete includes the Book plus the full implementation system, including prompts, workflows, templates, builders, cheat sheets, and transformation resources.",
  },
  {
    q: "What is the difference between Complete and Pro?",
    a: "Complete is designed to help you learn and implement the system. Pro is designed for people who want to build and systemize their own advanced AI workflows.",
  },
  {
    q: "Is the Toolkit sold separately?",
    a: "No. The implementation resources are included with Complete and Pro. There is no standalone Toolkit.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. The systems are designed for professionals who want practical ways to use AI in their existing work. No programming background is required for the core workflows.",
  },
  {
    q: "Who are these products for?",
    a: "Professionals, managers, executives, consultants, entrepreneurs, researchers, creators, analysts, developers, and knowledge workers who want to use AI more effectively.",
  },
  {
    q: "Are these official Microsoft or Anthropic products?",
    a: "No. Kaelis Voss is an independent publisher and educational brand. The Microsoft Copilot Advantage is an independent educational product and is not affiliated with or endorsed by Microsoft. The Claude Advantage is an independent educational product and is not affiliated with or endorsed by Anthropic.",
  },
];
