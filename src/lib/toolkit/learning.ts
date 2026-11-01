// The Copilot Quickstart, the 30-day path and the cheat sheets.

export type Lesson = { id: string; title: string; minutes: number; body: string[]; tryThis?: string };

export const quickstart: Lesson[] = [
  {
    id: "fundamentals",
    title: "Copilot fundamentals",
    minutes: 4,
    body: [
      "Copilot is an AI assistant built into Microsoft 365. It reads what you give it, and in some versions your emails, files and meetings, then writes, summarizes and analyzes for you.",
      "It is not a search engine and it is not always right. Treat every answer as a first draft from a fast, capable assistant: useful, but yours to check.",
      "The rule that matters most: Copilot can only work with what it can see. Better input gives better output.",
    ],
    tryThis: "Explain what you can and can't help me with in my job as a [your role]. Give 5 specific examples.",
  },
  {
    id: "access",
    title: "Which Copilot features you have access to",
    minutes: 5,
    body: [
      "There are several versions of Copilot. Copilot Chat, available with many work and school accounts, can write, summarize and research, and works with files you upload or paste.",
      "Microsoft 365 Copilot, a paid license, adds Copilot inside Word, Excel, PowerPoint, Outlook and Teams, and can work with your emails, files, calendar and meetings.",
      "Every workflow in the Vault lists what it needs. If you don't have a feature, most workflows still work by pasting the content into Copilot Chat. Ask your IT team which license you have.",
    ],
    tryThis: "Open Copilot and ask: 'What can you access in my Microsoft 365 account?'",
  },
  {
    id: "prompting",
    title: "Prompting fundamentals",
    minutes: 5,
    body: [
      "A prompt is just an instruction. The difference between a weak and a strong prompt is detail: what you want, why, from what, and in what shape.",
      "Use the G-C-S-E formula: Goal (what to do), Context (why, and for whom), Source (what to use), Expectations (format, length, tone).",
      "Weak: 'Summarize this.' Strong: 'Summarize this report for my director, who decides on renewal Friday. Use only the attached file. Five bullets and a one-line recommendation.'",
    ],
    tryThis: "Rewrite this weak prompt using Goal, Context, Source and Expectations: 'Write an email about the project.'",
  },
  {
    id: "context",
    title: "Context",
    minutes: 3,
    body: [
      "Context is the step people skip most, and the one that changes results most. Tell Copilot who the output is for and what will happen with it.",
      "'For my manager' and 'for a client who is unhappy about a delay' produce very different emails from the same facts.",
    ],
    tryThis: "Take a prompt you used this week and add one sentence of context. Compare the two answers.",
  },
  {
    id: "sources",
    title: "Sources",
    minutes: 3,
    body: [
      "Point Copilot at the right material: an email thread, a document, a table, a meeting. In Microsoft 365 Copilot you can reference files directly; in Copilot Chat, upload or paste them.",
      "Tell it to stick to the source. 'Use only this document. If something isn't covered, say so' prevents made-up details.",
    ],
    tryThis: "Using only [document], answer: [question]. If the document doesn't say, tell me.",
  },
  {
    id: "follow-up",
    title: "Follow-up prompting",
    minutes: 3,
    body: [
      "The first answer is a starting point. Most of the value comes from the second and third prompts: shorter, more formal, add a table, focus on risks.",
      "Keep the conversation going in the same chat so Copilot remembers the context.",
    ],
    tryThis: "After any answer, try: 'Make it half as long', 'What did you leave out?', and 'Put that in a table.'",
  },
  {
    id: "first-workflow",
    title: "Your first workflow",
    minutes: 10,
    body: [
      "A workflow is a sequence of prompts that finishes a whole job. Your first one: Email → Action. Summarize a long thread, decide, turn it into a task, and send the follow-up.",
      "Open it in the Workflow Vault and run it on a real thread today. When you've done it twice, it becomes a habit.",
    ],
  },
];

export type Day = { day: number; week: 1 | 2 | 3 | 4; title: string; task: string; prompt?: string; link?: string };

export const weekTitles: Record<1 | 2 | 3 | 4, string> = {
  1: "Become a Copilot User",
  2: "Master Microsoft 365",
  3: "Become a Power User",
  4: "Build Your Personal AI Work System",
};

export const days: Day[] = [
  { day: 1, week: 1, title: "Your first real prompt", task: "Ask Copilot to explain how it can help in your role, then try one suggestion.", prompt: "Give me 5 specific ways you can save me time in my job as a [role] this week.", link: "/copilot-advantage/members/quickstart" },
  { day: 2, week: 1, title: "Goal, context, source, expectations", task: "Rewrite three of your usual requests using the G-C-S-E formula.", link: "/copilot-advantage/members/builder" },
  { day: 3, week: 1, title: "Add context", task: "Send the same request twice, with and without context. Compare the answers." },
  { day: 4, week: 1, title: "Refine with follow-ups", task: "Take one answer through three follow-ups: shorter, a table, what's missing.", prompt: "What did you leave out? Put the answer in a table." },
  { day: 5, week: 1, title: "Work from a file", task: "Summarize a document you need to read anyway.", link: "/copilot-advantage/members/prompts/summarize-report" },
  { day: 6, week: 1, title: "Summarize an email thread", task: "Use the thread recipe on the longest thread in your inbox.", link: "/copilot-advantage/members/prompts/email-thread" },
  { day: 7, week: 1, title: "Draft a reply in your voice", task: "Draft three replies with Copilot and edit them before sending.", link: "/copilot-advantage/members/prompts/draft-reply" },
  { day: 8, week: 2, title: "Word: first draft from notes", task: "Turn your notes into a first draft of something you're writing this week.", link: "/copilot-advantage/members/prompts/first-draft-from-notes" },
  { day: 9, week: 2, title: "Word: rewrite for a reader", task: "Adapt one document for a different audience.", link: "/copilot-advantage/members/prompts/rewrite-for-audience" },
  { day: 10, week: 2, title: "Excel: what changed?", task: "Ask Copilot to explain the biggest changes in a table you use.", link: "/copilot-advantage/members/prompts/analyze-table" },
  { day: 11, week: 2, title: "Excel: formulas", task: "Have Copilot add one useful formula column and explain it.", link: "/copilot-advantage/members/prompts/explain-a-formula" },
  { day: 12, week: 2, title: "PowerPoint: document to deck", task: "Build a first-draft deck from a document.", link: "/copilot-advantage/members/workflows/doc-to-deck" },
  { day: 13, week: 2, title: "Outlook and Teams", task: "Prepare for tomorrow's most important meeting with Copilot.", link: "/copilot-advantage/members/prompts/meeting-prep" },
  { day: 14, week: 2, title: "OneNote / Loop", task: "Summarize your notes from this week and turn them into next actions.", prompt: "Summarize these notes and list the next actions, with owners where mentioned." },
  { day: 15, week: 3, title: "Research brief", task: "Get up to speed on a topic you need for work.", link: "/copilot-advantage/members/prompts/research-brief" },
  { day: 16, week: 3, title: "Compare options", task: "Compare three options for a real choice you're facing.", link: "/copilot-advantage/members/prompts/compare-options" },
  { day: 17, week: 3, title: "Meeting → Action Plan", task: "Run the full workflow after one meeting today.", link: "/copilot-advantage/members/workflows/meeting-action-plan" },
  { day: 18, week: 3, title: "Find themes in feedback", task: "Analyze comments, reviews or survey answers.", link: "/copilot-advantage/members/prompts/survey-themes" },
  { day: 19, week: 3, title: "Present with confidence", task: "Get feedback on a deck before you present it.", link: "/copilot-advantage/members/prompts/slide-feedback" },
  { day: 20, week: 3, title: "Plan a project", task: "Draft a plan for a project you're starting or running.", link: "/copilot-advantage/members/prompts/project-plan" },
  { day: 21, week: 3, title: "Pressure-test a decision", task: "Ask Copilot to argue against a decision you're about to make.", link: "/copilot-advantage/members/prompts/pros-cons" },
  { day: 22, week: 4, title: "Map your repeat work", task: "List the 5 tasks you do every week that take the most time.", prompt: "Here are my recurring tasks: [list]. Which could Copilot help with most, and how?" },
  { day: 23, week: 4, title: "Your email workflow", task: "Choose or adapt an email workflow and run it twice.", link: "/copilot-advantage/members/workflows/email-to-action" },
  { day: 24, week: 4, title: "Your meeting workflow", task: "Make meeting prep and follow-up automatic.", link: "/copilot-advantage/members/workflows/meeting-prep-pack" },
  { day: 25, week: 4, title: "Your research workflow", task: "Run Research → Presentation on a real question.", link: "/copilot-advantage/members/workflows/research-to-presentation" },
  { day: 26, week: 4, title: "Your data workflow", task: "Run Data → Decision on a real spreadsheet.", link: "/copilot-advantage/members/workflows/data-to-decision" },
  { day: 27, week: 4, title: "Your presentation workflow", task: "Turn a document into a presentation, then simplify it.", link: "/copilot-advantage/members/workflows/doc-to-deck" },
  { day: 28, week: 4, title: "Your planning workflow", task: "Do the Friday Weekly Review.", link: "/copilot-advantage/members/workflows/weekly-review" },
  { day: 29, week: 4, title: "Measure your time saved", task: "Fill in the Time-Savings Calculator template for your workflows.", link: "/copilot-advantage/members/templates" },
  { day: 30, week: 4, title: "Your personal Copilot system", task: "Write down your 5 workflows and when you'll use each. Print the cheat sheet and keep it by your desk.", link: "/copilot-advantage/members/cheat-sheets" },
];

export type CheatSheet = { id: string; title: string; sections: { heading: string; items: string[] }[] };

export const cheatSheets: CheatSheet[] = [
  {
    id: "ultimate",
    title: "Ultimate Copilot Cheat Sheet",
    sections: [
      { heading: "The formula", items: ["Goal: what to do", "Context: why, and for whom", "Source: what to use", "Expectations: format, length, tone"] },
      { heading: "Always", items: ["Point Copilot at the source", "Say who the output is for", "Ask for a format (bullets, table, email)", "Check facts, numbers and names", "Refine with follow-ups"] },
      { heading: "Never", items: ["Paste confidential data where your policy doesn't allow it", "Send without reading", "Accept numbers you can't trace to a source"] },
      { heading: "Best follow-ups", items: ["Make it shorter", "Put it in a table", "What did you leave out?", "Make it more formal / friendlier", "Explain your reasoning"] },
    ],
  },
  {
    id: "best-25",
    title: "25 Best Copilot Prompts",
    sections: [], // Filled from the recipe library on the page.
  },
  {
    id: "word",
    title: "Word Cheat Sheet",
    sections: [
      { heading: "Draft", items: ["Draft a [document] for [audience] from [file]", "Turn these notes into a first draft", "Write [ADD DETAIL] where facts are missing"] },
      { heading: "Edit", items: ["Shorten to [n] words", "Rewrite for [audience]", "Make the tone more [formal/friendly]", "Turn this section into a table"] },
      { heading: "Understand", items: ["Summarize this document in 7 bullets", "What are the key decisions in this document?", "What questions does this leave unanswered?"] },
    ],
  },
  {
    id: "excel",
    title: "Excel Cheat Sheet",
    sections: [
      { heading: "Before you start", items: ["Format your data as a table (Ctrl+T)", "Use clear column headers", "Save to OneDrive or SharePoint"] },
      { heading: "Analyze", items: ["What are the 3 biggest changes?", "Which [category] drives most of the total?", "Show me this as a chart", "Highlight rows where [condition]"] },
      { heading: "Formulas", items: ["Add a column that calculates [x]", "Explain this formula in plain language", "Which rows could give wrong results?"] },
    ],
  },
  {
    id: "powerpoint",
    title: "PowerPoint Cheat Sheet",
    sections: [
      { heading: "Create", items: ["Create a presentation from [file]", "10 slides, one message each, takeaway titles", "Add speaker notes to every slide"] },
      { heading: "Improve", items: ["Make slide [n] simpler: one visual, 15 words", "Does this deck tell a clear story?", "Which 3 slides would you cut?"] },
      { heading: "Prepare", items: ["What questions will [audience] ask?", "Summarize this deck as a one-page handout"] },
    ],
  },
  {
    id: "outlook",
    title: "Outlook Cheat Sheet",
    sections: [
      { heading: "Read", items: ["Summarize this thread: decision, disagreements, asks of me", "Which unread emails need me today?"] },
      { heading: "Write", items: ["Draft a reply: my answer is [x], under 120 words", "Decline this politely and offer [alternative]", "Write a follow-up with decisions and an action table"] },
      { heading: "Plan", items: ["Where is my focus time next week?", "Which meetings could I skip or shorten?"] },
    ],
  },
  {
    id: "teams",
    title: "Teams Cheat Sheet",
    sections: [
      { heading: "During and after meetings", items: ["What has been decided so far?", "List action items with owners and deadlines", "What was discussed but not decided?", "I missed this meeting: what do I need to know?"] },
      { heading: "Chats and channels", items: ["Summarize this chat from the last week", "What decisions were made in this channel?", "Write a short announcement about [change]"] },
    ],
  },
  {
    id: "follow-ups",
    title: "10 Follow-Up Prompts",
    sections: [
      {
        heading: "Use after any answer",
        items: [
          "Make it half as long.",
          "Put that in a table.",
          "What did you leave out?",
          "Explain your reasoning step by step.",
          "Rewrite it for [audience].",
          "Give me three alternative versions.",
          "Which parts are you least sure about?",
          "Turn this into an action list with owners.",
          "What questions will people ask about this?",
          "Write a one-line summary I can use as a subject line.",
        ],
      },
    ],
  },
  {
    id: "gcse",
    title: "G-C-S-E Prompt Formula",
    sections: [
      { heading: "G · Goal", items: ["What do you want Copilot to accomplish?", "Start with a verb: summarize, draft, compare, analyze"] },
      { heading: "C · Context", items: ["Why does this matter?", "Who is it for, and what will they do with it?"] },
      { heading: "S · Source", items: ["What information should Copilot use?", "A thread, a file, a table, a meeting, or the web"] },
      { heading: "E · Expectations", items: ["What should the result look like?", "Format, length, tone, and what to do if information is missing"] },
    ],
  },
  {
    id: "tracker",
    title: "30-Day Challenge Tracker",
    sections: [], // Drawn as a grid of days on the page.
  },
];
