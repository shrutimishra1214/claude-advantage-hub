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
    base: "",
    members: "/members",
    themeClass: "",
    systemProduct: "toolkit",
    bookProduct: "book",
    primaryTier: "toolkit",
    tiers: ["book", "toolkit", "bundle"],
    nav: [
      { href: "/#overview", label: "Overview" },
      { href: "/#whats-inside", label: "What's Inside" },
      { href: "/#workflows", label: "Workflows" },
      { href: "/#prompt-library", label: "Prompt Library" },
      { href: "/#templates", label: "Templates" },
      { href: "/#challenge", label: "30-Day Challenge" },
      { href: "/#faq", label: "FAQ" },
    ],
    disclaimer:
      "Microsoft Copilot, Microsoft 365, Word, Excel, PowerPoint, Outlook, Teams and other Microsoft product names are trademarks of Microsoft Corporation. The Microsoft Copilot Advantage is an independently created educational product and is not affiliated with, sponsored by, or endorsed by Microsoft.",
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
    primaryTier: "claude-system",
    tiers: ["claude-book", "claude-system", "claude-bundle", "claude-operator"],
    nav: [
      { href: "/claude-advantage#overview", label: "Overview" },
      { href: "/claude-advantage#system", label: "The System" },
      { href: "/claude-advantage#workflows", label: "Workflows" },
      { href: "/claude-advantage#claude-code", label: "Code, Cowork & Design" },
      { href: "/claude-advantage#challenge", label: "30-Day Transformation" },
      { href: "/claude-advantage#faq", label: "FAQ" },
    ],
    disclaimer:
      "Claude, Claude Code and related names are trademarks of Anthropic, PBC. The Claude Advantage is an independently created educational product and is not affiliated with, sponsored by, or endorsed by Anthropic.",
  },
};

export const lineOfProduct = (id: ProductId): LineId => (id.startsWith("claude-") ? "claude" : "copilot");
