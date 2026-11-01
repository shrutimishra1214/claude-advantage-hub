import type { App } from "../system";

// The Workflow Vault. A workflow chains prompts across apps to finish a whole job.
export type WorkflowStep = { app: App; title: string; instruction: string; prompt?: string };

export type Workflow = {
  id: string;
  category: string;
  title: string;
  outcome: string;
  minutes: number;
  // What the member needs for this to work, so nobody hits a wall halfway.
  requires: string;
  steps: WorkflowStep[];
};

export const workflows: Workflow[] = [
  {
    id: "email-to-action",
    category: "Email",
    title: "Email → Action",
    outcome: "A long thread becomes a decision, a task and a follow-up.",
    minutes: 10,
    requires: "Copilot in Outlook (Microsoft 365 Copilot), or paste the thread into Copilot Chat.",
    steps: [
      { app: "Outlook", title: "Summarize the thread", instruction: "Open the thread and ask Copilot for a summary focused on decisions.", prompt: "Summarize this thread. What's being decided, where do people disagree, and what is being asked of me?" },
      { app: "Copilot", title: "Make the decision", instruction: "Use the summary to decide, or ask Copilot to lay out the options.", prompt: "Based on this thread, what are my options, and what are the pros and cons of each?" },
      { app: "Copilot", title: "Turn it into a task", instruction: "Define the task, owner and deadline.", prompt: "Write the next action as a task: what needs doing, who owns it, and by when." },
      { app: "Outlook", title: "Send the follow-up", instruction: "Reply to the thread with the decision and the task.", prompt: "Draft a reply confirming the decision, the owner and the deadline. Under 100 words." },
    ],
  },
  {
    id: "inbox-zero-hour",
    category: "Email",
    title: "The 20-Minute Inbox Reset",
    outcome: "Your inbox sorted into reply, delegate, read later and ignore.",
    minutes: 20,
    requires: "Microsoft 365 Copilot with access to your mailbox.",
    steps: [
      { app: "Outlook", title: "Triage", instruction: "Ask Copilot to rank what needs you.", prompt: "List my unread emails that need a reply or decision from me, ranked by urgency, with one line each." },
      { app: "Outlook", title: "Reply to the top three", instruction: "Open each and draft a reply with Copilot.", prompt: "Draft a reply. My answer is: [answer]. Under 100 words." },
      { app: "Copilot", title: "Delegate", instruction: "Draft hand-offs for anything someone else should handle.", prompt: "Write a short hand-off message to [person] for this email, with the context they need and the deadline." },
      { app: "Outlook", title: "Schedule the rest", instruction: "Flag 'read later' items and block 20 minutes for them tomorrow." },
    ],
  },
  {
    id: "meeting-action-plan",
    category: "Meetings",
    title: "Meeting → Action Plan",
    outcome: "Decisions, owners, deadlines and a sent follow-up, minutes after the call.",
    minutes: 10,
    requires: "Copilot in Teams (Microsoft 365 Copilot) and a transcribed meeting.",
    steps: [
      { app: "Teams", title: "Open the meeting recap", instruction: "After the meeting, open the recap or transcript in Teams." },
      { app: "Copilot", title: "Pull out decisions", instruction: "Ask for everything that was agreed.", prompt: "List every decision made in this meeting, with the exact quote it came from." },
      { app: "Copilot", title: "List action items", instruction: "Ask for every task that was mentioned.", prompt: "List every action item with owner and deadline. Mark 'not agreed' where no owner or date was set." },
      { app: "Excel", title: "Track owners and deadlines", instruction: "Paste the actions into the Action Tracker template so nothing is lost." },
      { app: "Outlook", title: "Send the follow-up email", instruction: "Send the plan to everyone who attended.", prompt: "Write a follow-up email with the decisions and an action table. Friendly, under 200 words." },
    ],
  },
  {
    id: "meeting-prep-pack",
    category: "Meetings",
    title: "Meeting Prep Pack",
    outcome: "Walk into any meeting with context, questions and a position.",
    minutes: 8,
    requires: "Microsoft 365 Copilot (for emails and files), or paste the context into Copilot Chat.",
    steps: [
      { app: "Outlook", title: "Gather the context", instruction: "Ask Copilot to find what's relevant.", prompt: "Find the emails and files related to [meeting] from the last [2 weeks] and summarize them." },
      { app: "Copilot", title: "Find the open questions", instruction: "Identify what's undecided.", prompt: "What are the open questions and likely decisions for this meeting?" },
      { app: "Copilot", title: "Decide your position", instruction: "Prepare your points.", prompt: "Suggest 3 points I should make and the objections I should expect." },
      { app: "Teams", title: "Share an agenda", instruction: "Post a short agenda in the meeting chat before you start.", prompt: "Write a 3-item agenda with the decision we need at the end." },
    ],
  },
  {
    id: "notes-to-brief",
    category: "Word",
    title: "Notes → Executive Brief",
    outcome: "Messy notes and source files become a one-page brief.",
    minutes: 25,
    requires: "Copilot in Word (Microsoft 365 Copilot).",
    steps: [
      { app: "Word", title: "Start from the template", instruction: "Open the Executive Brief template." },
      { app: "Word", title: "Draft from your sources", instruction: "Reference your notes and files.", prompt: "Using [file 1] and [file 2], draft this brief for [audience] who must decide [decision]. Situation, key facts, options, recommendation, next steps." },
      { app: "Word", title: "Tighten it", instruction: "Cut to one page.", prompt: "Shorten this to one page without losing any decision or number." },
      { app: "Word", title: "Add the summary", instruction: "Put a summary at the top.", prompt: "Write a 5-bullet executive summary for the top of this document." },
      { app: "Outlook", title: "Send it", instruction: "Send with a two-line cover note.", prompt: "Write a two-line cover email for this brief, stating the decision needed and the deadline." },
    ],
  },
  {
    id: "data-to-decision",
    category: "Excel",
    title: "Data → Decision",
    outcome: "A spreadsheet becomes a recommendation, not just a chart.",
    minutes: 30,
    requires: "Copilot in Excel (Microsoft 365 Copilot). Format your data as a table first.",
    steps: [
      { app: "Excel", title: "Analyze", instruction: "Ask what changed and why.", prompt: "What are the 3 biggest changes compared with last period, and what in the data explains them?" },
      { app: "Excel", title: "Find the insight", instruction: "Look for the pattern that matters.", prompt: "Which segment or category is driving most of the change? Show it in a chart." },
      { app: "Copilot", title: "Recommend", instruction: "Turn the insight into options.", prompt: "Based on this analysis, recommend 2–3 actions with the expected impact of each." },
      { app: "PowerPoint", title: "Present", instruction: "Build a short deck for decision-makers.", prompt: "Create a 5-slide presentation of this analysis: finding, evidence, options, recommendation, decision needed." },
    ],
  },
  {
    id: "doc-to-deck",
    category: "PowerPoint",
    title: "Document → Presentation",
    outcome: "A report becomes a structured deck with speaker notes.",
    minutes: 30,
    requires: "Copilot in PowerPoint (Microsoft 365 Copilot). The document must be saved in OneDrive or SharePoint.",
    steps: [
      { app: "PowerPoint", title: "Create from the file", instruction: "Use Copilot's 'create from file' with your document.", prompt: "Create a 10-slide presentation from [document] for [audience]. One message per slide, takeaway titles, speaker notes." },
      { app: "PowerPoint", title: "Fix the story", instruction: "Check the flow.", prompt: "Does this deck tell a clear story? Suggest a better order if not." },
      { app: "PowerPoint", title: "Simplify slides", instruction: "Cut text on crowded slides.", prompt: "Make slide [number] simpler: one visual and no more than 15 words." },
      { app: "Word", title: "Prepare a handout", instruction: "Optional: a one-page summary for the audience.", prompt: "Summarize this presentation as a one-page handout." },
    ],
  },
  {
    id: "research-to-presentation",
    category: "Research",
    title: "Research → Executive Presentation",
    outcome: "From scattered sources to a deck leadership can act on.",
    minutes: 45,
    requires: "Copilot Chat with web access, plus Copilot in Word and PowerPoint for the later steps.",
    steps: [
      { app: "Copilot", title: "Research", instruction: "Build a sourced overview.", prompt: "Research [topic] for [purpose]. Give me the key facts, the main debates and the sources." },
      { app: "Copilot", title: "Structure a brief", instruction: "Organize the findings.", prompt: "Turn this into a structured brief: question, findings, implications for us, open questions." },
      { app: "Word", title: "Write it up", instruction: "Paste into the Research Report template and refine." },
      { app: "PowerPoint", title: "Build the deck", instruction: "Create the presentation from the Word document.", prompt: "Create an 8-slide executive presentation from this report, ending with the decision needed." },
    ],
  },
  {
    id: "project-kickoff",
    category: "Projects",
    title: "Project Kickoff in an Afternoon",
    outcome: "Plan, tracker, risks and kickoff email, ready to go.",
    minutes: 60,
    requires: "Copilot Chat; Copilot in Excel and Outlook make the later steps faster.",
    steps: [
      { app: "Copilot", title: "Draft the plan", instruction: "Get phases, tasks and owners.", prompt: "Create a project plan to [goal] by [date] with [team]. Phases, tasks, owners, durations, dependencies." },
      { app: "Copilot", title: "List the risks", instruction: "Find what could go wrong.", prompt: "List the top 7 risks for this plan with likelihood, impact and mitigation." },
      { app: "Excel", title: "Build the tracker", instruction: "Paste the tasks into the Project Tracker template." },
      { app: "Outlook", title: "Send the kickoff email", instruction: "Tell the team what's happening.", prompt: "Write a kickoff email: the goal, why it matters, the timeline, each person's role, and the first meeting." },
    ],
  },
  {
    id: "one-to-one",
    category: "Management",
    title: "Better One-to-Ones",
    outcome: "Prepared, focused one-to-ones with clear follow-ups.",
    minutes: 15,
    requires: "Copilot Chat; Microsoft 365 Copilot can pull recent emails and chats.",
    steps: [
      { app: "Copilot", title: "Review recent work", instruction: "Summarize what your report has been working on.", prompt: "Summarize my recent emails and chats with [person]: their wins, open issues and anything they asked me for." },
      { app: "Copilot", title: "Plan the conversation", instruction: "Choose what to cover.", prompt: "Suggest an agenda for a 30-minute one-to-one with [person], including one piece of recognition and one development topic." },
      { app: "Teams", title: "Take notes", instruction: "Keep notes in the Meeting Notes template during the conversation." },
      { app: "Outlook", title: "Follow up", instruction: "Confirm what you agreed.", prompt: "Write a short follow-up to [person] confirming what we agreed and the next steps." },
    ],
  },
  {
    id: "change-announcement",
    category: "Communication",
    title: "Announce a Change",
    outcome: "A change explained clearly, with questions answered before they're asked.",
    minutes: 30,
    requires: "Copilot Chat; Copilot in Word and Outlook for drafting.",
    steps: [
      { app: "Copilot", title: "Clarify the message", instruction: "Get the core message straight.", prompt: "Help me explain [change] in three sentences: what, why, and what people need to do." },
      { app: "Word", title: "Write an FAQ", instruction: "Answer the questions people will ask.", prompt: "Write an FAQ with the 10 questions [audience] will most likely ask about this change." },
      { app: "Teams", title: "Post the announcement", instruction: "A short post for the team channel.", prompt: "Write a Teams post announcing this change, under 150 words, linking to the FAQ." },
      { app: "Outlook", title: "Brief the managers", instruction: "Give managers talking points first.", prompt: "Write talking points for managers to explain this change to their teams, including likely concerns." },
    ],
  },
  {
    id: "weekly-review",
    category: "Personal Productivity",
    title: "The Friday Weekly Review",
    outcome: "Close the week and plan the next one in 20 minutes.",
    minutes: 20,
    requires: "Microsoft 365 Copilot (for calendar and email), or paste your notes into Copilot Chat.",
    steps: [
      { app: "Outlook", title: "Review the week", instruction: "See what happened.", prompt: "Summarize my week: key meetings, decisions, and anything I committed to that's still open." },
      { app: "Copilot", title: "Send your status update", instruction: "Use the status update recipe.", prompt: "Write a status update for [project]: done, next, risks, decisions needed. Under 200 words." },
      { app: "Outlook", title: "Plan next week", instruction: "Protect time for priorities.", prompt: "Look at next week's calendar. My priorities are [priorities]. Where should I block focus time?" },
      { app: "OneNote", title: "Capture lessons", instruction: "Write down one thing that worked and one to change." },
    ],
  },
];

export const workflowById = (id: string) => workflows.find((w) => w.id === id);
