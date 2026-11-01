// Copy and sample content for the sales page. Edit here, not in the page.

export type App = "Word" | "Excel" | "PowerPoint" | "Outlook" | "Teams" | "OneNote" | "Copilot";

export const appColor: Record<App, string> = {
  Word: "bg-app-word",
  Excel: "bg-app-excel",
  PowerPoint: "bg-app-powerpoint",
  Outlook: "bg-app-outlook",
  Teams: "bg-app-teams",
  OneNote: "bg-app-onenote",
  Copilot: "bg-app-copilot",
};

export const proofPoints = ["250+ Prompt Recipes", "100+ Workflows", "30+ Templates", "30-Day Transformation"];

export const usualWay = ["Ask", "Get an answer", "Copy", "Paste", "Move on"];
export const advantageWay = ["Goal", "Context", "Source", "Prompt", "Refine", "Workflow", "Repeat"];

export const problems = [
  { icon: "inbox", title: "Too Much Email", body: "Spend less time drafting, summarizing, sorting, and following up." },
  { icon: "users", title: "Too Many Meetings", body: "Turn meetings into decisions, actions, owners, and follow-ups." },
  { icon: "refresh", title: "Too Much Manual Work", body: "Use Copilot to transform repetitive tasks into repeatable workflows." },
  { icon: "layers", title: "Too Much AI Information", body: "Stop trying to become an AI expert. Learn the workflows that actually matter." },
] as const;

export const transformation = [
  { title: "Learn", body: "Understand how Copilot works." },
  { title: "Apply", body: "Use proven prompts and recipes." },
  { title: "Workflow", body: "Turn individual prompts into repeatable systems." },
  { title: "Automate Your Thinking", body: "Build a personal Copilot operating system for everyday work." },
];

export const tools = [
  { n: "01", icon: "compass", title: "Copilot Quickstart", body: "From your first prompt to your first useful workflow.", href: "#quickstart" },
  { n: "02", icon: "book", title: "Prompt Recipe Library", body: "250+ recipes organized around real work.", href: "#prompt-library" },
  { n: "03", icon: "flow", title: "Copilot Workflow Vault", body: "100 repeatable workflows. The centerpiece.", href: "#workflows" },
  { n: "04", icon: "doc", title: "Template Vault", body: "30+ Word, Excel, PowerPoint, Outlook and Teams templates.", href: "#templates" },
  { n: "05", icon: "wand", title: "Prompt Builder", body: "Build the right prompt step by step.", href: "#prompt-builder" },
  { n: "06", icon: "calendar", title: "30-Day Transformation", body: "A guided path that builds the habit.", href: "#challenge" },
  { n: "07", icon: "printer", title: "Cheat Sheets", body: "Printable references for every app.", href: "#cheat-sheets" },
] as const;

export const quickstart = [
  "Copilot fundamentals",
  "Which Copilot features you have access to",
  "Prompting fundamentals",
  "Context",
  "Sources",
  "Follow-up prompting",
  "Your first workflow",
];

export const recipeCategories = ["Write", "Analyze", "Research", "Email", "Meetings", "Create", "Plan", "Decide", "Present", "Communicate"] as const;
export type RecipeCategory = (typeof recipeCategories)[number];

export type Recipe = {
  id: string;
  category: RecipeCategory;
  app: App;
  title: string;
  goal: string;
  when: string;
  provide: string;
  prompt: string;
  expected: string;
  followUp: string;
  advanced: string;
  example: string;
};

// Sample recipes shown in the library preview.
export const recipes: Recipe[] = [
  {
    id: "email-thread",
    category: "Email",
    app: "Outlook",
    title: "Turn a long thread into a decision",
    goal: "Understand a long email thread in one minute and know what you need to do.",
    when: "You're added to a thread with 15+ replies, or you're back from time off.",
    provide: "The email thread (open it in Outlook) and your role in the conversation.",
    prompt:
      "Summarize this email thread for me. I'm the [your role]. List: 1) the decision being discussed, 2) where people agree and disagree, 3) any questions addressed to me, and 4) what I need to do next, with deadlines.",
    expected: "A short summary, a list of open questions for you, and your next actions with dates.",
    followUp: "Draft a reply that answers the questions addressed to me and confirms the next steps. Keep it under 120 words.",
    advanced: "Add: 'Flag any commitments someone made on my behalf, and anything that conflicts with what I said earlier in the thread.'",
    example: "A 22-message vendor thread becomes: decision (switch to annual billing), 2 questions for you, 1 action due Friday.",
  },
  {
    id: "meeting-actions",
    category: "Meetings",
    app: "Teams",
    title: "Meeting to action plan",
    goal: "Leave every meeting with clear decisions, owners and deadlines.",
    when: "Straight after a Teams meeting that was recorded or transcribed.",
    provide: "The meeting recap or transcript, and the people who attended.",
    prompt:
      "From this meeting, list every decision made and every action item. For each action, give the owner, the deadline (or 'not agreed'), and the exact quote it came from. Then list anything that was discussed but not decided.",
    expected: "A decisions list, an action table (action · owner · deadline · source) and open items.",
    followUp: "Write a follow-up email to the attendees with the decisions and the action table. Professional, friendly, under 200 words.",
    advanced: "Add: 'Compare these actions with the ones from last week's meeting and flag anything that is now overdue.'",
    example: "A 45-minute project call becomes 3 decisions, 7 actions with owners, and 2 open questions for next week.",
  },
  {
    id: "analyze-table",
    category: "Analyze",
    app: "Excel",
    title: "Find what changed in the numbers",
    goal: "Spot the trends and outliers in a spreadsheet without building formulas.",
    when: "You have monthly figures and need to explain what happened.",
    provide: "A table in Excel (formatted as a table), and the question you need answered.",
    prompt:
      "Analyze this table. Show me the three biggest changes compared with last month, the likely reasons based on the data, and any rows that look unusual. Explain it in plain language for a non-finance reader.",
    expected: "Three key changes with numbers, possible drivers, and flagged outliers.",
    followUp: "Create a chart that shows the biggest change, and write two sentences I can paste into a status update.",
    advanced: "Add: 'Suggest one formula column that would make this analysis easier to repeat next month, and explain what it does.'",
    example: "Regional sales data becomes: West down 12% (two lost accounts), Online up 18%, one duplicate invoice flagged.",
  },
  {
    id: "exec-brief",
    category: "Write",
    app: "Word",
    title: "One-page executive brief",
    goal: "Turn messy notes and source files into a brief a senior leader will actually read.",
    when: "You need to brief a manager or executive on a topic before a decision.",
    provide: "Your notes and 1–3 reference files, plus who the brief is for and the decision they face.",
    prompt:
      "Using [file 1] and [file 2], write a one-page brief for [audience] who needs to decide [decision]. Structure: situation, key facts, options with pros and cons, recommendation, and next steps. Use short paragraphs and no jargon.",
    expected: "A one-page brief with a clear recommendation, ready to edit in Word.",
    followUp: "Shorten this to a 5-bullet executive summary I can put at the top.",
    advanced: "Add: 'List the three questions this executive is most likely to ask, with a short answer for each, as an appendix.'",
    example: "Three vendor proposals and your notes become a one-page comparison with a clear recommendation.",
  },
  {
    id: "present-deck",
    category: "Present",
    app: "PowerPoint",
    title: "Document to presentation",
    goal: "Create a first draft deck from a document you already have.",
    when: "You've written a report and need to present it.",
    provide: "The Word document or PDF, the audience and the time you have.",
    prompt:
      "Create a 10-slide presentation from [document] for [audience]. One key message per slide, a title that states the takeaway, and speaker notes for each slide. End with a slide of decisions needed.",
    expected: "A 10-slide draft with takeaway titles and speaker notes.",
    followUp: "Make slide 4 simpler: one chart and no more than 15 words.",
    advanced: "Add: 'Create a 3-slide version for a 5-minute slot, keeping only what the audience must know.'",
    example: "A 12-page project report becomes a 10-slide steering committee update with speaker notes.",
  },
];

export const workflowCategories = ["Email", "Meetings", "Word", "Excel", "PowerPoint", "Research", "Projects", "Management", "Communication", "Personal Productivity"];

export const sampleWorkflow = {
  title: "Meeting → Action Plan",
  steps: [
    { app: "Teams" as App, label: "Teams Meeting", note: "Record or transcribe the meeting" },
    { app: "Copilot" as App, label: "Meeting Recap", note: "Summarize what was discussed" },
    { app: "Copilot" as App, label: "Decisions", note: "Pull out what was agreed" },
    { app: "Copilot" as App, label: "Action Items", note: "List every task mentioned" },
    { app: "Excel" as App, label: "Owners & Deadlines", note: "Assign and date each action" },
    { app: "Outlook" as App, label: "Follow-Up Email", note: "Send the plan to attendees" },
  ],
};

export type Flow = { title: string; outcome: string; steps: { label: string; app?: App }[] };

export const crossAppFlows: Flow[] = [
  {
    title: "Research → Executive Presentation",
    outcome: "From scattered sources to a deck leadership can act on.",
    steps: [{ label: "Research" }, { label: "Copilot", app: "Copilot" }, { label: "Structured Brief" }, { label: "Word", app: "Word" }, { label: "PowerPoint", app: "PowerPoint" }, { label: "Executive Presentation" }],
  },
  {
    title: "Meeting → Follow-Up",
    outcome: "Every meeting ends with owners, dates and a sent email.",
    steps: [{ label: "Teams", app: "Teams" }, { label: "Meeting Recap" }, { label: "Decisions" }, { label: "Action Items" }, { label: "Outlook", app: "Outlook" }, { label: "Follow-Up" }],
  },
  {
    title: "Data → Decision",
    outcome: "Turn a spreadsheet into a recommendation, not just a chart.",
    steps: [{ label: "Excel", app: "Excel" }, { label: "Analysis" }, { label: "Insights" }, { label: "Recommendations" }, { label: "PowerPoint", app: "PowerPoint" }, { label: "Executive Presentation" }],
  },
  {
    title: "Email → Action",
    outcome: "Your inbox becomes a task list with owners.",
    steps: [{ label: "Outlook", app: "Outlook" }, { label: "Summary" }, { label: "Decision" }, { label: "Task" }, { label: "Owner" }, { label: "Follow-Up" }],
  },
];

export const templates: { app: App; kind: "doc" | "sheet" | "slide" | "mail" | "board"; items: string[] }[] = [
  { app: "Word", kind: "doc", items: ["Executive Brief", "Decision Memo", "Meeting Brief", "Research Report", "Project Update", "Business Case", "Strategy Document", "Executive Summary"] },
  { app: "Excel", kind: "sheet", items: ["KPI Dashboard", "Project Tracker", "Budget Tracker", "Action Tracker", "Decision Matrix", "Time-Savings Calculator"] },
  { app: "PowerPoint", kind: "slide", items: ["Executive Update", "Business Review", "Project Review", "Strategy Presentation", "Research Presentation", "Proposal Deck"] },
  { app: "Outlook", kind: "mail", items: ["Meeting Follow-Up", "Executive Update", "Client Follow-Up", "Difficult Conversation", "Introduction Email"] },
  { app: "Teams", kind: "board", items: ["Meeting Agenda", "Meeting Notes", "Decision Log", "Action Register"] },
];

export const formula = [
  { letter: "G", word: "Goal", q: "What do you want Copilot to accomplish?", example: "Summarize the Q3 vendor review" },
  { letter: "C", word: "Context", q: "Why does this matter?", example: "for my director, who decides on renewal Friday" },
  { letter: "S", word: "Source", q: "What information should Copilot use?", example: "using the attached review and last week's email thread" },
  { letter: "E", word: "Expectations", q: "What should the final result look like?", example: "as 5 bullets and a one-line recommendation" },
];

export const formulaChain = ["Better prompts", "Better outputs", "Better workflows", "Better work"];

export const weeks = [
  { n: 1, title: "Become a Copilot User", body: "Prompting, context, refinement, files, email.", days: "Days 1–7" },
  { n: 2, title: "Master Microsoft 365", body: "Word, Excel, PowerPoint, Outlook, Teams, OneNote / Loop.", days: "Days 8–14" },
  { n: 3, title: "Become a Power User", body: "Research, analysis, meetings, presentations, projects, decision-making.", days: "Days 15–21" },
  { n: 4, title: "Build Your Personal AI Work System", body: "Build and refine your own email, meeting, research, data, presentation, and planning workflows.", days: "Days 22–30" },
];

export const cheatSheets = [
  { title: "Ultimate Copilot Cheat Sheet", tag: "Essentials" },
  { title: "25 Best Copilot Prompts", tag: "Prompts" },
  { title: "Word Cheat Sheet", tag: "Word", app: "Word" as App },
  { title: "Excel Cheat Sheet", tag: "Excel", app: "Excel" as App },
  { title: "PowerPoint Cheat Sheet", tag: "PowerPoint", app: "PowerPoint" as App },
  { title: "Outlook Cheat Sheet", tag: "Outlook", app: "Outlook" as App },
  { title: "Teams Cheat Sheet", tag: "Teams", app: "Teams" as App },
  { title: "10 Follow-Up Prompts", tag: "Prompts" },
  { title: "G-C-S-E Prompt Formula", tag: "Framework" },
  { title: "30-Day Challenge Tracker", tag: "Tracker" },
];

export const audiences = [
  { icon: "user", title: "Professionals", body: "Spend less time on repetitive work." },
  { icon: "users", title: "Managers", body: "Turn meetings, reports, and communication into streamlined workflows." },
  { icon: "target", title: "Executives", body: "Get faster briefings, analysis, summaries, and decision support." },
  { icon: "building", title: "Business Owners", body: "Spend less time creating documents, emails, presentations, and reports." },
  { icon: "briefcase", title: "Consultants", body: "Research faster and produce polished deliverables." },
  { icon: "grid", title: "Microsoft 365 Users", body: "Get more value from the tools you already use." },
] as const;

// Share of time a well-run Copilot workflow could plausibly save in each area.
// Deliberately conservative; shown to visitors as an estimate.
export const savingsAreas = [
  { id: "email", label: "Email", hours: 6, rate: 0.25 },
  { id: "meetings", label: "Meetings", hours: 6, rate: 0.2 },
  { id: "reports", label: "Reports", hours: 3, rate: 0.3 },
  { id: "presentations", label: "Presentations", hours: 2, rate: 0.3 },
  { id: "research", label: "Research", hours: 3, rate: 0.25 },
  { id: "data", label: "Data analysis", hours: 2, rate: 0.2 },
];

// Shown until genuine customer testimonials exist.
export const outcomes = [
  { title: "Clear your inbox faster", body: "Summarize long threads, draft replies in your voice, and turn emails into tasks." },
  { title: "Leave every meeting with a plan", body: "Decisions, owners, deadlines and a follow-up email, minutes after the call ends." },
  { title: "Start documents at 70%, not 0%", body: "Briefs, memos and reports drafted from your own notes and files." },
  { title: "Explain your numbers", body: "Ask Excel what changed and why, in plain language, without complex formulas." },
  { title: "Build decks from what you've written", body: "Turn a document into a structured presentation with speaker notes." },
  { title: "Know exactly what to ask", body: "Use the G-C-S-E formula and Prompt Builder instead of guessing." },
];

export const faqs = [
  { q: "Do I need to be good at AI?", a: "No. The product is designed for professionals who want practical results rather than technical AI knowledge." },
  { q: "Which Microsoft apps does this cover?", a: "Word, Excel, PowerPoint, Outlook, Teams, OneNote / Loop and relevant Microsoft 365 Copilot experiences." },
  { q: "Is this just a collection of prompts?", a: "No. The core of the product is the Workflow Vault. Prompts are components of repeatable workflows." },
  {
    q: "Do I need a Microsoft Copilot subscription?",
    a: "Availability of Copilot features varies by Microsoft account, subscription, organization, and license. Each workflow is labeled with the Copilot capabilities it needs, so you can see what works with the access you have.",
  },
  {
    q: "Will this work if Microsoft changes Copilot?",
    a: "The product focuses on durable workflows and prompting principles. Interface-specific instructions may be updated as Microsoft changes its products.",
  },
  { q: "Is this affiliated with Microsoft?", a: "No. This is an independently created educational and productivity resource." },
  { q: "Is there a book?", a: "Yes. The Microsoft Copilot Advantage book can be purchased separately or as part of the Complete Bundle." },
];

export const builder = {
  task: ["Write", "Analyze", "Research", "Summarize", "Create", "Plan", "Compare", "Decide"],
  material: ["Email", "Document", "Spreadsheet", "Meeting", "Presentation", "Research", "Multiple sources"],
  audience: ["Manager", "Executive", "Client", "Team", "Customer", "General"],
  output: ["Bullets", "Table", "Email", "Report", "Presentation", "Executive Summary", "Action Plan"],
};
