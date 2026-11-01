import type { ProductId, TierId } from "./products";

// The site sells two product lines that share checkout, accounts and the
// member-area machinery, each with its own pages, theme and content.

export type LineId = "copilot" | "claude";

export type Line = {
  id: LineId;
  name: string;
  descriptor: string;
  /** Logo wordmark, one entry per line. */
  wordmark: [string, string];
  mark: string;
  base: string;
  members: string;
  themeClass: string;
  systemProduct: ProductId;
  bookProduct: ProductId;
  primaryTier: TierId;
  tiers: TierId[];
  nav: { href: string; label: string }[];
  disclaimer: string;
};

export const lines: Record<LineId, Line> = {
  copilot: {
    id: "copilot",
    name: "The Microsoft Copilot Advantage",
    descriptor: "The Complete Microsoft 365 AI Productivity System",
    wordmark: ["The Microsoft", "Copilot Advantage"],
    mark: "CA",
    base: "/copilot-advantage",
    members: "/copilot-advantage/members",
    themeClass: "",
    systemProduct: "toolkit",
    bookProduct: "book",
    primaryTier: "complete",
    tiers: ["book", "complete", "pro", "both-complete", "both-pro"],
    nav: [
      { href: "/copilot-advantage#overview", label: "Overview" },
      { href: "/copilot-advantage#whats-inside", label: "What's Inside" },
      { href: "/copilot-advantage#workflows", label: "Workflows" },
      { href: "/copilot-advantage#prompt-library", label: "Prompt Library" },
      { href: "/copilot-advantage#templates", label: "Templates" },
      { href: "/copilot-advantage#challenge", label: "30-Day Challenge" },
      { href: "/copilot-advantage#faq", label: "FAQ" },
    ],
    disclaimer:
      "Microsoft Copilot Advantage™ is an independent educational product and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft Copilot, Microsoft 365, Word, Excel, PowerPoint, Outlook and Teams are trademarks of Microsoft Corporation.",
  },
  claude: {
    id: "claude",
    name: "The Claude Advantage",
    descriptor: "The Complete Claude AI Workflow System",
    wordmark: ["The Claude", "Advantage"],
    mark: "C",
    base: "/claude-advantage",
    members: "/claude-advantage/members",
    themeClass: "line-claude",
    systemProduct: "claude-system",
    bookProduct: "claude-book",
    primaryTier: "claude-complete",
    tiers: ["claude-book", "claude-complete", "claude-pro", "both-complete", "both-pro"],
    nav: [
      { href: "/claude-advantage#overview", label: "Overview" },
      { href: "/claude-advantage#system", label: "The System" },
      { href: "/claude-advantage#workflows", label: "Workflows" },
      { href: "/claude-advantage#claude-code", label: "Beyond Chat" },
      { href: "/claude-advantage#pricing", label: "Pricing" },
      { href: "/claude-advantage#challenge", label: "30-Day Transformation" },
      { href: "/claude-advantage#faq", label: "FAQ" },
    ],
    disclaimer:
      "Claude Advantage™ is an independent educational product and is not affiliated with, endorsed by, or sponsored by Anthropic. Claude and Claude Code are trademarks of Anthropic, PBC.",
  },
};

export const lineOfProduct = (id: ProductId): LineId => (id.startsWith("claude-") ? "claude" : "copilot");
