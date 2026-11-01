import data from "./operator-chapters.json";

// The Claude Operator: the advanced level, drawn from the book "The Claude
// Operator" (Kaelis Voss). Chapters, skills and failure modes are extracted
// from the print edition; the playbook items below are transcribed from it.

export type OpSkill = { n: number; name: string; intro: string; skill: string };
export type OpChapter = {
  n: number;
  title: string;
  inThis: string[];
  takeaways: string[];
  actions: string[];
  oneLine: string;
  skills: OpSkill[];
  failures: { title: string; body: string }[];
};

export const opChapters = data as OpChapter[];
export const opChapterByN = (n: number) => opChapters.find((c) => c.n === n);
export const opSkills = opChapters.flatMap((c) => c.skills.map((s) => ({ ...s, chapter: c.n })));

export const opParts = [
  { n: 1, title: "Hire Your Chief of Staff", chapters: [1, 2, 3, 4], capstone: null },
  { n: 2, title: "Delegate, Package, Automate", chapters: [5, 6, 7, 8, 9, 10], capstone: "The Monday Morning Executive Brief" },
  { n: 3, title: "Analyse and Decide", chapters: [11, 12, 13], capstone: "The Monthly Business Review" },
  { n: 4, title: "Create and Communicate", chapters: [14, 15, 16], capstone: "Launch a Product in One Afternoon" },
  { n: 5, title: "Build", chapters: [17, 18, 19, 20], capstone: "Your Team's Tracker" },
  { n: 6, title: "Switch On Your Chief of Staff", chapters: [21, 22, 23], capstone: "Switch On Your AI Chief of Staff" },
];

export const operatorLoop = [
  { step: "Brief", body: "State the outcome, inputs, limits and what “done” looks like. Ask for assumptions and sources." },
  { step: "Delegate", body: "Give Claude only the access the job needs, read-only by default. It produces a draft, not a sent message." },
  { step: "Verify", body: "Run the Operator Check before you rely on the result." },
  { step: "Package", body: "Save the brief, with what you learned, as a skill so you never write it again." },
  { step: "Automate", body: "Schedule what's proven, within its risk tier, and keep approvals where they belong." },
];

export const operatorCheck = [
  "What was assumed?",
  "What sources support each key claim or figure?",
  "What can I verify independently, and how?",
  "What is the most damaging way this could be wrong?",
  "What needs my approval before it is used or sent?",
  "What part should never be automated?",
];

export const riskTiers = [
  { name: "Automate freely", body: "Errors are cheap and easy to catch: gathering, cleaning, first drafts for you alone." },
  { name: "Automate with review", body: "The result reaches other people. It can run on a schedule, but it can't send itself." },
  { name: "Keep human-controlled", body: "It could cost money, harm someone or be impossible to undo. Claude may prepare; a person decides and acts." },
];

export const operatorScale = [
  { level: 1, name: "User", quote: "Claude answers my questions.", items: ["I mostly use Claude to answer questions or explain things.", "I start a new conversation for almost everything.", "I copy Claude's answers into other tools myself.", "Claude saves me minutes, not hours."] },
  { level: 2, name: "Collaborator", quote: "Claude helps me do my work.", items: ["I use Claude every week for real work: drafts, analysis, documents.", "I have at least one Project with my context loaded.", "I refine Claude's output with targeted feedback instead of starting again.", "I still do every step between one Claude task and the next."] },
  { level: 3, name: "Operator", quote: "Claude runs whole jobs for me.", items: ["I regularly hand Claude a job with several steps and review the finished result.", "Claude works directly with my files or connected apps.", "I write a brief with a clear definition of done before I delegate.", "I have a consistent way of checking delegated work before I use it."] },
  { level: 4, name: "System Builder", quote: "My workflows run as tested skills.", items: ["At least three of my recurring tasks run from skills I built.", "I have tested my skills and updated them when they went wrong.", "At least one workflow runs on a schedule without me starting it.", "I can say roughly how many hours a month my workflows save."] },
  { level: 5, name: "AI Manager", quote: "I manage a team of workflows.", items: ["I look after a portfolio of workflows the way a manager looks after a team.", "Other people use skills or workflows I built.", "I have clear rules for what is automated freely, what is reviewed, and what stays human.", "I review my workflows regularly for quality, cost and time saved."] },
];

export const nextMove = [
  "Level 1 → 2: Build a Project around your most repeated task (Ch. 4).",
  "Level 2 → 3: Delegate one complete multi-step job (Ch. 5).",
  "Level 3 → 4: Turn that job into a tested skill (Ch. 7–8).",
  "Level 4 → 5: Give your workflows owners, risk tiers and review rules (Ch. 8, 22).",
];

export type OpWorkflow = { n: number; group: string; title: string; input: string; claude: string; review: string; output: string };

const w = (n: number, group: string, title: string, input: string, claude: string, review: string, output: string): OpWorkflow => ({ n, group, title, input, claude, review, output });

export const opWorkflows: OpWorkflow[] = [
  w(1, "Research and preparation", "Meeting prep", "Calendar invite, past notes", "Researches attendees and topics, drafts questions (Meeting Brief)", "Questions and any claims about people", "One-page brief"),
  w(2, "Research and preparation", "Market scan", "A market or question", "Searches, compares sources, cites each claim (Research)", "Two sources opened and checked", "Research summary with sources"),
  w(3, "Research and preparation", "Competitor watch", "Named competitors", "Checks for changes since last run (Competitor Watch)", "Anything flagged as new", "“What changed” note"),
  w(4, "Research and preparation", "New-project briefing pack", "Project documents", "Summarises, lists decisions, gaps and risks", "Gaps and risks list", "Briefing pack in a Project"),
  w(5, "Research and preparation", "Decision memo", "A decision and the options", "Sets out options, trade-offs and a recommendation (Executive Brief)", "The recommendation", "One-page memo"),
  w(6, "Communication and content", "Inbox triage", "Your inbox", "Sorts, flags actions, drafts replies (Inbox Triage)", "Every draft before sending", "Action list and drafts"),
  w(7, "Communication and content", "Meeting follow-up", "Meeting notes", "Writes decisions, owners and a follow-up email", "Names, dates and commitments", "Email ready to send"),
  w(8, "Communication and content", "Proposal", "Brief, past proposals", "Drafts scope, approach and timeline (Proposal)", "Pricing and scope", "Proposal draft"),
  w(9, "Communication and content", "Presentation", "Findings or a report", "Builds the storyline, then the slides (Deck Storyliner)", "Every number on every slide", "Deck on your template"),
  w(10, "Communication and content", "Launch kit", "Product brief, brand system", "Creates announcement, posts, email and visuals (Launch Kit)", "Claims and final approval to publish", "Launch assets"),
  w(11, "Operations", "Weekly status", "Tracker, email, files", "Summarises progress, risks and next steps (Weekly Report)", "Risks and anything sent upward", "Status update draft"),
  w(12, "Operations", "Monday brief", "Email, calendar, files", "Builds the week's priorities and deadlines (Executive Brief)", "Priorities", "One-page brief"),
  w(13, "Operations", "SOP from a walkthrough", "Recording or email thread", "Writes a numbered procedure with an owner and a failure step", "Steps against how it's really done", "Written SOP"),
  w(14, "Operations", "Weekly data merge", "Several exports", "Merges, cleans and checks, then logs the run", "The log and the totals check", "One clean file"),
  w(15, "Operations", "Folder tidy", "A messy folder", "Plans moves as a dry run, then applies them and logs every change (File Tidy)", "The dry-run table", "Organised folder and log"),
  w(16, "Finance and analysis", "Spreadsheet audit", "A workbook", "Checks formulas, links and hard-coded numbers (Spreadsheet Audit)", "Each flagged cell", "Issues list with cell references"),
  w(17, "Finance and analysis", "Formula explainer", "A complex model", "Explains each formula in plain English (Formula Explainer)", "Anything marked unclear", "Model guide"),
  w(18, "Finance and analysis", "Forecast check", "A forecast", "Lists and tests every assumption (Assumption Checker)", "Assumptions marked weak", "Assumptions register"),
  w(19, "Finance and analysis", "Variance commentary", "Budget and actuals", "Explains each significant variance, with cell citations (Variance Commentary)", "Every explanation against the source", "Commentary for the pack"),
  w(20, "Finance and analysis", "Monthly Business Review", "Month's numbers and notes", "Builds the MBR: results, variances, decisions needed (Monthly Review)", "Every figure, and the decisions", "MBR pack"),
  w(21, "Building and managing", "Tool spec", "A rough idea", "Writes a one-page spec with a risk tier (Tool Spec Writer)", "Items marked [check]", "Build-ready spec"),
  w(22, "Building and managing", "Team tracker", "The spec", "Plans, builds and tests version one", "Test list and sharing settings", "Working shared tool"),
  w(23, "Building and managing", "Change review", "A proposed change", "Lists what changed and what depends on it (Change Reviewer)", "The verdict", "Accept, test or hold"),
  w(24, "Building and managing", "Post-mortem", "A failed result", "Diagnoses the failure type and writes a new rule and test (Post-Mortem)", "The new rule", "Fix, rule and test input"),
  w(25, "Building and managing", "Weekly Operator Review", "Job logs, workflow register", "Reports what ran, failed or went unread (Weekly Operator Review)", "The headline items", "Decisions: grow, keep, fix or retire"),
];

export type PlanDay = { day: number; task: string; ch: string };
export const operatorPlan: { week: number; name: string; goal: string; days: PlanDay[]; friday: string }[] = [
  {
    week: 1, name: "Brief", goal: "Claude knows your work well enough that you never explain yourself twice.",
    days: [
      { day: 1, task: "Run the Operator Self-Assessment. Write down your level and your three most repeated tasks.", ch: "1" },
      { day: 2, task: "Write your About Me & My Work context, including your three data buckets.", ch: "4, 22" },
      { day: 3, task: "Build your briefing pack: one Project for your main area of work, with its key documents.", ch: "4" },
      { day: 4, task: "Check your privacy setting, and list your irreversible actions.", ch: "22" },
      { day: 5, task: "Connect the two apps you use most (usually email and calendar), read access first.", ch: "5–6" },
    ],
    friday: "Start a new conversation in your Project and ask, “What do you know about how I work, and what are my rules?” If the answer surprises you, fix the context before Week 2.",
  },
  {
    week: 2, name: "Delegate", goal: "Three real jobs handed off, each checked with the Operator Check.",
    days: [
      { day: 6, task: "Use the Task Router on your task list. Pick three jobs to delegate.", ch: "3" },
      { day: 7, task: "Delegate job 1 with a Delegation Brief. Check the result and note the time saved.", ch: "5" },
      { day: 8, task: "Delegate job 2.", ch: "5" },
      { day: 9, task: "Delegate job 3. Choose one that uses a connector.", ch: "5, 6" },
      { day: 10, task: "Set up your Monday brief as a one-off run, and read it critically.", ch: "9" },
    ],
    friday: "For each job, write one line: time before, time after, what you had to fix. That's the start of your ROI Ledger.",
  },
  {
    week: 3, name: "Package", goal: "Turn what worked in Week 2 into skills that work the same way every time.",
    days: [
      { day: 11, task: "Turn your best delegated job into a skill.", ch: "7" },
      { day: 12, task: "Test it with the Skill Test Harness, using three real inputs.", ch: "8" },
      { day: 13, task: "Turn the second job into a skill and test it.", ch: "7, 8" },
      { day: 14, task: "Run Role Setup, and install your Role Pack's role skill.", ch: "21" },
      { day: 15, task: "Turn your Monday brief into a skill, and add Brand Voice or House Style if you write for others.", ch: "7, 14" },
    ],
    friday: "Run each new skill on something you haven't tried it on. If you have to correct the same thing twice, fix the skill, not the output.",
  },
  {
    week: 4, name: "Automate", goal: "Schedule what's proven, and connect it into one system.",
    days: [
      { day: 16, task: "Schedule the Monday brief. Keep approvals on Manual.", ch: "9" },
      { day: 17, task: "Schedule one more Tier 1 job: Inbox Triage, a monitor or a weekly report.", ch: "9, 18" },
      { day: 18, task: "Set up your Monthly Business Review for month-end.", ch: "13" },
      { day: 19, task: "Build your first ROI Ledger.", ch: "22" },
      { day: 20, task: "Run your first Weekly Operator Review.", ch: "23" },
    ],
    friday: "Look at the logs of everything that ran this week. Did each job run, produce what you expected, and did you read it? Anything you didn't read is a candidate to switch off.",
  },
];

export const operatorGlossary: [string, string][] = [
  ["AI Chief of Staff", "The system you build in the book: five modules that prepare, report, analyse, communicate and build, leaving you the decisions."],
  ["AI Manager", "Level 5 of the Operator Scale: you run a portfolio of workflows, each with an owner, a risk tier and a review rhythm."],
  ["Approval setting", "Whether Claude pauses for your approval before acting (Manual), checks each action automatically (Auto), or doesn't pause (Skip)."],
  ["Artifact", "Something Claude makes that you can keep, edit and share, such as a document, deck, design or small tool."],
  ["Assumption register", "A table of every input a forecast uses, with its value, source, range and confidence."],
  ["Briefing pack", "The one- or two-page document every later module reads before it starts work: your work, your context and your rules."],
  ["Chief of Staff Ledger", "Your running record of modules built, skills in your library and hours saved."],
  ["Operator Check", "Six questions to ask before you trust any result: assumptions, sources, independent checks, worst error, approvals, and what never to automate."],
  ["Operator Loop", "Brief, Delegate, Verify, Package, Automate: the method every chapter uses."],
  ["Operator Scale", "Five levels from User to AI Manager, measuring how much work gets done without you."],
  ["Risk tier", "Automate freely, automate with review, or keep human-controlled, set by the consequence of an unnoticed error."],
  ["ROI Scorecard", "Hours before, hours after, minus the time you spend checking."],
  ["Skill", "A saved, tested set of instructions Claude can load for a job, so it works the same way every time."],
];
