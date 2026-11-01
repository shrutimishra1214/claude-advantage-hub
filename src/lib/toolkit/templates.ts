import type { App } from "../system";

// The Template Vault: a structure to copy into the app, and the prompt that fills it.
export type Template = { id: string; app: App; title: string; purpose: string; outline: string[]; prompt: string };

const t = (app: App, title: string, purpose: string, outline: string[], prompt: string): Template => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + app.toLowerCase(),
  app,
  title,
  purpose,
  outline,
  prompt,
});

export const templates: Template[] = [
  // Word
  t("Word", "Executive Brief", "Brief a senior leader before a decision.", ["Title and date", "The decision needed (one sentence)", "Situation", "Key facts (3–5 bullets)", "Options with pros and cons", "Recommendation", "Next steps and owners"], "Using [sources], fill in this executive brief for [audience] who must decide [decision]. Keep it to one page."),
  t("Word", "Decision Memo", "Record a decision and the reasoning behind it.", ["Decision", "Date and decision-maker", "Context", "Options considered", "Why this option", "Risks and mitigations", "Who needs to know"], "Write a decision memo for [decision], using [sources]. Be factual and keep the reasoning clear for someone reading it in a year."),
  t("Word", "Meeting Brief", "Prepare yourself or others for a meeting.", ["Meeting purpose", "Attendees and their interests", "Background", "Open questions", "Our position", "Desired outcome"], "Prepare a meeting brief for [meeting] using the related emails and files."),
  t("Word", "Research Report", "Present findings on a question.", ["Question", "Summary of findings", "Method and sources", "Findings in detail", "Implications for us", "Open questions", "Sources"], "Turn this research into a report using the structure provided. Cite sources for every finding."),
  t("Word", "Project Update", "Report progress to stakeholders.", ["Status: on track / at risk / off track", "Done since last update", "Next steps", "Risks and blockers", "Decisions needed", "Key dates"], "Write a project update for [project] using [notes or files]. Under one page."),
  t("Word", "Business Case", "Justify an investment or change.", ["Summary", "Problem or opportunity", "Proposed solution", "Costs", "Benefits (with numbers)", "Risks", "Alternatives considered", "Recommendation"], "Draft a business case for [proposal] using [data]. Mark any number that's an estimate."),
  t("Word", "Strategy Document", "Set direction for a team or initiative.", ["Where we are", "Where we want to be", "Guiding principles", "Priorities (3–5)", "What we will stop doing", "Measures of success", "Timeline"], "Draft a strategy document for [team or initiative] using [inputs]. Keep priorities to five or fewer."),
  t("Word", "Executive Summary", "Summarize a long document for busy readers.", ["Conclusion first", "3 supporting points", "What we recommend", "What we need from you"], "Write an executive summary of [document] in under 200 words, conclusion first."),
  // Excel
  t("Excel", "KPI Dashboard", "Track the handful of numbers that matter.", ["KPI name", "Target", "This month", "Last month", "Change %", "Status", "Owner", "Comment"], "Using this KPI table, tell me which KPIs are off target, why, and draft one line of commentary for each."),
  t("Excel", "Project Tracker", "Keep tasks, owners and dates in one place.", ["Task", "Phase", "Owner", "Start", "Due", "Status", "Dependency", "Notes"], "Look at this tracker and list overdue tasks, tasks due this week, and any owner with too many open tasks."),
  t("Excel", "Budget Tracker", "Compare spending with budget.", ["Category", "Budget", "Actual", "Variance", "Variance %", "Forecast", "Comment"], "Analyze this budget tracker. Which categories are over budget, by how much, and what's the forecast for year end?"),
  t("Excel", "Action Tracker", "Make sure meeting actions get done.", ["Action", "Owner", "Due date", "Source meeting", "Status", "Last update"], "List open actions that are overdue or have no owner, grouped by owner."),
  t("Excel", "Decision Matrix", "Compare options fairly.", ["Criteria", "Weight", "Option A score", "Option B score", "Option C score", "Weighted totals"], "Calculate weighted totals for this decision matrix and explain the result in plain language."),
  t("Excel", "Time-Savings Calculator", "Measure the time your Copilot workflows save.", ["Task", "Times per week", "Minutes before", "Minutes with Copilot", "Minutes saved per week", "Hours saved per year"], "Add formulas to calculate minutes saved per week and hours saved per year, and summarize the total."),
  // PowerPoint
  t("PowerPoint", "Executive Update", "A 5-slide update for leadership.", ["Headline and status", "Progress against goals", "Key risks", "Decisions needed", "Next steps"], "Create a 5-slide executive update for [project] using [document]. Takeaway titles on every slide."),
  t("PowerPoint", "Business Review", "Monthly or quarterly performance review.", ["Summary", "Results vs targets", "What drove the results", "Customer or market insight", "Plan for next period", "Asks"], "Create a business review deck from [data or report] for [period]."),
  t("PowerPoint", "Project Review", "Look back on a project and capture lessons.", ["Objectives", "What we delivered", "What went well", "What we'd change", "Lessons for next time", "Thank-yous"], "Create a project review deck for [project] using [notes]."),
  t("PowerPoint", "Strategy Presentation", "Present direction and priorities.", ["The situation", "Where we're going", "Our priorities", "How we'll get there", "What it means for you", "Next 90 days"], "Create a strategy presentation from [strategy document] for [audience]."),
  t("PowerPoint", "Research Presentation", "Share findings with stakeholders.", ["The question", "Key findings", "Evidence", "Implications", "Recommendations", "Questions"], "Create a research presentation from [report], 8 slides, ending with recommendations."),
  t("PowerPoint", "Proposal Deck", "Pitch an idea or a piece of work.", ["The problem", "Why now", "Our proposal", "How it works", "Costs and timeline", "Why us", "Next step"], "Create a proposal deck for [client or audience] using [brief]."),
  // Outlook
  t("Outlook", "Meeting Follow-Up", "Confirm what was agreed.", ["Thank-you line", "Decisions", "Action table (action, owner, date)", "Next meeting"], "Write a meeting follow-up using these decisions and actions: [paste]."),
  t("Outlook", "Executive Update", "A short email update for a senior leader.", ["One-line status", "3 bullets of progress", "1 risk", "Decision or help needed"], "Write an executive update email on [project], under 120 words."),
  t("Outlook", "Client Follow-Up", "Keep momentum after a client conversation.", ["Thanks and recap", "What we heard", "What we'll do next", "What we need from you", "Proposed next meeting"], "Write a client follow-up after [meeting], professional and warm, under 180 words."),
  t("Outlook", "Difficult Conversation", "Deliver unwelcome news well.", ["Direct statement of the news", "Brief reason", "Impact on them", "What we're doing about it", "Offer to talk"], "Write an email telling [person] that [news]. Honest, kind, and clear about next steps."),
  t("Outlook", "Introduction Email", "Connect two people.", ["Why you're connecting them", "One line about each person", "Suggested next step"], "Write an introduction between [person A] and [person B] explaining why they should talk. Under 100 words."),
  // Teams
  t("Teams", "Meeting Agenda", "Run focused meetings.", ["Purpose", "Decisions needed", "Agenda items with time and owner", "Pre-reading"], "Write a meeting agenda for [meeting] with timings that fit [length]."),
  t("Teams", "Meeting Notes", "Capture what matters during a meeting.", ["Attendees", "Key points", "Decisions", "Actions (owner, date)", "Parking lot"], "Turn this transcript into meeting notes using this structure."),
  t("Teams", "Decision Log", "Keep a shared record of team decisions.", ["Date", "Decision", "Made by", "Reason", "Link to source"], "From this channel's recent conversations, list decisions made, with date and who made them."),
  t("Teams", "Action Register", "A shared list of team actions.", ["Action", "Owner", "Due", "Status", "Notes"], "From our recent meetings, list all open actions with owners and due dates."),
];

export const templateById = (id: string) => templates.find((x) => x.id === id);
