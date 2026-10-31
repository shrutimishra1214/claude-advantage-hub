// The book's real structure, taken from its table of contents and chapter
// headers. Keep this in sync with the book when a new edition ships.

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Power User" | "All levels";

export const levelStyle: Record<Level, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Intermediate: "bg-sky-50 text-sky-700 ring-sky-600/15",
  Advanced: "bg-violet-50 text-violet-700 ring-violet-600/15",
  "Power User": "bg-orange-50 text-orange-700 ring-orange-600/15",
  "All levels": "bg-ink/5 text-ink-soft ring-ink/10",
};

export type Chapter = { n: number; title: string; read: string; level: Level; apps: string };

export type Part = { n: number; title: string; summary: string; outcomes: string[]; chapters: Chapter[] };

const ch = (n: number, title: string, read: string, level: Level, apps: string): Chapter => ({ n, title, read, level, apps });

export const parts: Part[] = [
  {
    n: 1,
    title: "Welcome to the AI-Powered Workplace",
    summary: "What Copilot really changes about your work, and how to get the most from this book.",
    outcomes: ["Spot the method gap between access and advantage", "Trust Copilot exactly as far as it has earned", "Run a full day on three simple anchors"],
    chapters: [
      ch(1, "Turn Copilot Access Into a Real Advantage", "8 min", "Beginner", "Copilot Chat"),
      ch(2, "Understand Copilot Enough to Trust It Correctly", "8 min", "Beginner", "All"),
      ch(3, "Run a Full AI-Powered Workday", "8 min", "Beginner", "Chat, Outlook, Teams"),
    ],
  },
  {
    n: 2,
    title: "The Copilot Ecosystem",
    summary: "Which product is which, and what you are actually licensed for.",
    outcomes: ["Tell every Copilot product apart in seconds", "Build the business case for your licence", "Get IT to unlock what you actually need"],
    chapters: [
      ch(4, "Know Exactly Which Copilot You're Using", "7 min", "Beginner", "All"),
      ch(5, "Build the Business Case for Your License", "7 min", "Intermediate", "Admin"),
      ch(6, "Get IT to Say Yes to What You Need", "7 min", "Intermediate", "Admin"),
    ],
  },
  {
    n: 3,
    title: "Prompt Engineering",
    summary: "The one reusable skill under every chapter that follows. Learn it once and every app gets easier.",
    outcomes: ["Build any prompt from its five working parts", "Read a weak answer backward and fix it in one turn", "Turn your best prompts into reusable templates"],
    chapters: [
      ch(7, "Write Prompts That Work on the First Try", "7 min", "Beginner", "All"),
      ch(8, "Stop Writing Prompts From Scratch Forever", "7 min", "Intermediate", "All"),
      ch(9, "Fix Any Bad Copilot Answer in Two Turns", "7 min", "Intermediate", "All"),
    ],
  },
  {
    n: 4,
    title: "Word",
    summary: "Turning Word from a typing tool into a drafting partner.",
    outcomes: ["Turn Word into a drafting and editing partner", "Go from rough idea to structured draft in minutes", "Handle 80-page documents without reading every page"],
    chapters: [
      ch(10, "Write Documents in Half the Time", "7 min", "Beginner", "Word"),
      ch(11, "Master 80-Page Documents Without Reading Them All", "7 min", "Intermediate", "Word"),
    ],
  },
  {
    n: 5,
    title: "Excel",
    summary: "Using Copilot as an analyst that explains its work, not a black box.",
    outcomes: ["Ask messy data questions in plain language", "Turn a four-hour report into thirty minutes", "Verify every number before you trust it"],
    chapters: [
      ch(12, "Analyze Any Spreadsheet Without Being a Data Scientist", "8 min", "Intermediate", "Excel"),
      ch(13, "Turn a 4-Hour Report Into 30 Minutes", "7 min", "Intermediate", "Excel"),
    ],
  },
  {
    n: 6,
    title: "PowerPoint",
    summary: "From bullet points to boardroom-ready storytelling.",
    outcomes: ["Build a boardroom deck from a document in minutes", "Win the room with answer-first storytelling", "Rehearse the tough questions before they're asked"],
    chapters: [
      ch(14, "Build a Boardroom Deck From a Document in Minutes", "7 min", "Intermediate", "PowerPoint"),
      ch(15, "Win the Room With Answer-First Storytelling", "7 min", "Advanced", "PowerPoint"),
    ],
  },
  {
    n: 7,
    title: "Outlook",
    summary: "Reclaiming hours a week from email and meeting overhead.",
    outcomes: ["Reclaim hours a week from your inbox", "Walk into every meeting already prepared", "Leave every meeting with the follow-up drafted"],
    chapters: [
      ch(16, "Reclaim Hours a Week From Your Inbox", "8 min", "Beginner", "Outlook"),
      ch(17, "Never Walk Into a Meeting Unprepared Again", "7 min", "Intermediate", "Outlook, Teams"),
    ],
  },
  {
    n: 8,
    title: "Teams",
    summary: "Making meetings and chat searchable, summarisable and actionable.",
    outcomes: ["Catch up on any meeting four times faster", "Find any decision buried in chat in seconds", "Turn the stream of chat into durable knowledge"],
    chapters: [
      ch(18, "Catch Up on Any Meeting 4x Faster", "8 min", "Beginner", "Teams"),
      ch(19, "Find Any Decision Buried in Chat in Seconds", "7 min", "Intermediate", "Teams"),
    ],
  },
  {
    n: 9,
    title: "OneNote, Loop & the Broader Toolkit",
    summary: "Turning personal notes, shared workspaces and your company's knowledge into things you can ask.",
    outcomes: ["Turn your notes graveyard into a searchable brain", "Mine your company knowledge without getting lost", "Keep shared work live in one place with Loop"],
    chapters: [
      ch(20, "Turn Your Notes Graveyard Into a Searchable Brain", "8 min", "Intermediate", "OneNote, Loop"),
      ch(21, "Mine Your Company's Knowledge Without Getting Lost", "7 min", "Intermediate", "SharePoint, OneDrive, Whiteboard"),
    ],
  },
  {
    n: 10,
    title: "Chat, Pages & Notebooks",
    summary: "The three surfaces where AI work is asked, made durable, and given a project's worth of memory.",
    outcomes: ["Run Copilot Chat as your command centre", "Stop losing your best AI work in the scroll", "Give every project its own grounded AI brain"],
    chapters: [
      ch(22, "Run Copilot Chat as Your Command Center", "8 min", "Intermediate", "Copilot Chat"),
      ch(23, "Stop Losing Your Best AI Work in the Scroll", "7 min", "Intermediate", "Copilot Pages"),
      ch(24, "Give Every Project Its Own AI Brain", "7 min", "Advanced", "Copilot Notebooks"),
    ],
  },
  {
    n: 11,
    title: "Copilot Studio & Custom Agents",
    summary: "Crossing from user to builder: when agents are worth building, and how to give them hands safely.",
    outcomes: ["Decide when an agent is worth building", "Ship an agent that survives real users", "Give an agent hands without regret"],
    chapters: [
      ch(25, "Decide When to Build an Agent (and When Not To)", "8 min", "Advanced", "Copilot Studio"),
      ch(26, "Ship an Agent That Actually Works", "7 min", "Advanced", "Copilot Studio"),
      ch(27, "Give Your Agent Hands Without Regret", "7 min", "Power User", "Copilot Studio"),
    ],
  },
  {
    n: 12,
    title: "Executive & Small Business Systems",
    summary: "Running the whole operating rhythm from one seat, whether you lead an organisation or a practice of one.",
    outcomes: ["Run the whole operating rhythm from one seat", "Field a team's output as one person", "Keep judgment, voice and presence yours"],
    chapters: [
      ch(28, "Lead With AI Without Becoming Its Output", "7 min", "Power User", "All"),
      ch(29, "Field a Whole Team's Output as One Person", "7 min", "Intermediate", "All"),
    ],
  },
  {
    n: 13,
    title: "End-to-End Automation",
    summary: "Chaining single skills into complete, repeatable processes, automating only what is safe.",
    outcomes: ["Map any process before you automate it", "Classify every step: automate or keep human", "Adapt proven workflow patterns to your own work"],
    chapters: [
      ch(30, "Automate Any Process the Right Way", "7 min", "Advanced", "All + Studio"),
      ch(31, "Grab a Proven Workflow and Adapt It", "7 min", "Advanced", "All + Studio"),
    ],
  },
  {
    n: 14,
    title: "Security, Governance & Responsible AI",
    summary: "The guardrails every professional and team needs before scaling Copilot.",
    outcomes: ["Use Copilot safely without the panic or the incident", "Govern AI without killing the value", "Catch the error before it reaches the client"],
    chapters: [
      ch(32, "Use Copilot Safely Without the Panic or the Incident", "7 min", "Intermediate", "Admin, All"),
      ch(33, "Govern AI Without Killing the Value", "7 min", "Advanced", "Admin"),
      ch(34, "Catch the Error Before It Reaches the Client", "8 min", "Intermediate", "All"),
    ],
  },
  {
    n: 15,
    title: "The Prompt Library",
    summary: "Every prompt in the book in one reference, organised by the work you're doing.",
    outcomes: ["Find the right prompt for any job instantly", "Adapt, never copy: build the prompt the library lacks", "Compose from six repeatable shapes"],
    chapters: [ch(35, "Find the Right Prompt for Any Job Instantly", "Reference", "All levels", "All")],
  },
  {
    n: 16,
    title: "The Workflow & Loop Library",
    summary: "Every complete workflow in the book, organised by the situation you face, with the human decision point marked.",
    outcomes: ["Find the right workflow for any scenario", "See where your judgment stays in every workflow", "Compose from four repeatable patterns"],
    chapters: [ch(36, "Find the Right Workflow for Any Scenario", "Reference", "All levels", "All")],
  },
  {
    n: 17,
    title: "Mastery, Habits & the 90-Day Plan",
    summary: "Turning everything into one practice, built over ninety days and kept current for good.",
    outcomes: ["Assemble the whole book into one practice", "Build the system in 90 days, one habit at a time", "Keep your skills current as Copilot evolves"],
    chapters: [
      ch(37, "Assemble the Whole Book Into One Practice", "6 min", "Power User", "All"),
      ch(38, "Master Copilot in 90 Days, One Habit at a Time", "6 min", "All levels", "All"),
      ch(39, "Keep Your Skills Fresh Forever", "6 min", "All levels", "All"),
    ],
  },
];

export const allChapters = parts.flatMap((p) => p.chapters);

export const stats = {
  parts: parts.length,
  chapters: allChapters.length,
  apps: 9,
  pages: "175+",
  readingMinutes: allChapters.reduce((sum, c) => sum + (parseInt(c.read, 10) || 0), 0),
};

export const levelCounts = (["Beginner", "Intermediate", "Advanced", "Power User"] as const).map((level) => ({
  level,
  count: allChapters.filter((c) => c.level === level).length,
}));

/** Pages from the book shown in the "Look inside" gallery. */
export const samplePages = [
  { src: "/images/pages/page-2.jpg", caption: "Contents: 17 parts, 39 chapters" },
  { src: "/images/pages/page-5.jpg", caption: "Chapter 1: every chapter opens with read time, level, apps and the key idea" },
  { src: "/images/pages/page-7.jpg", caption: "Chapter 2: real cases of what goes wrong, and why" },
  { src: "/images/pages/page-160.jpg", caption: "The Prompt Library: each prompt with what it's for and the expert upgrade" },
  { src: "/images/pages/page-165.jpg", caption: "The Workflow Library: four patterns behind every workflow" },
  { src: "/images/pages/page-174.jpg", caption: "The 90-Day Plan: one new habit at a time" },
];
