import {
  BookOpen,
  FileSpreadsheet,
  Mail,
  Presentation,
  Users,
  Zap,
} from "lucide-react";

export type Bonus = {
  icon: typeof BookOpen;
  color: string;
  title: string;
  desc: string;
  file: string;
  content: string;
};

export const bonuses: Bonus[] = [
  {
    icon: BookOpen,
    color: "var(--brand-purple)",
    title: "50+ Copilot Prompts for Word",
    desc: "Ready-to-paste prompts to draft, summarize, and polish documents in seconds.",
    file: "copilot-word-prompts.md",
    content: `# Copilot Prompts for Microsoft Word

## Drafting
- Draft a one-page project proposal for [topic] aimed at [audience], in a confident, plain-English tone.
- Write a first draft of a policy document about [topic] with headings, numbered rules, and a short summary.
- Turn these bullet points into flowing prose: [paste bullets].
- Create a customer-facing announcement about [change], under 300 words.

## Rewriting & polishing
- Rewrite this section to be 30% shorter without losing meaning.
- Make this paragraph more direct and remove hedging language.
- Rewrite this for a non-technical reader at a 9th-grade reading level.
- Give me three alternative openings for this document.

## Summarizing
- Summarize this document in five bullet points a busy executive can read in 30 seconds.
- List every decision, owner, and deadline mentioned in this document as a table.
- What questions would a skeptical reviewer ask about this document?

## Structure
- Suggest a better heading structure for this document and explain why.
- Add a table of contents and an executive summary.
- Convert this document into a one-page briefing note.

## Reuse
- Turn this document into an email announcement.
- Turn this document into a 10-slide presentation outline.
- Extract the action items into a checklist.
`,
  },
  {
    icon: FileSpreadsheet,
    color: "var(--brand-green)",
    title: "Excel Formula & Analysis Cheatsheet",
    desc: "Turn raw data into forecasts, charts, and insights with one-line Copilot prompts.",
    file: "copilot-excel-cheatsheet.md",
    content: `# Copilot Excel Cheatsheet

## Getting started
- Copilot works best on a formatted table (Ctrl+T) with clear header names.
- Keep one row per record and avoid merged cells.

## Analysis prompts
- Show me the top 10 rows by [column] and explain what they have in common.
- Add a column that flags rows where [column] is above average.
- Break down total [metric] by [category] and by month.
- Identify outliers in [column] and explain how you found them.
- Which [category] grew fastest over the last 6 periods?

## Formula prompts
- Write a formula that returns [result] based on [conditions].
- Explain what this formula does, step by step: [paste formula].
- This formula returns an error — tell me why and give a corrected version.
- Convert this nested IF into a cleaner IFS or SWITCH formula.

## Charts & summaries
- Create a chart that best shows the trend in [metric] over time.
- Build a PivotTable summarising [metric] by [dimension].
- Write a three-sentence summary of what this data shows.

## Forecasting
- Project the next 6 months of [metric] and state your assumptions.
- What would [metric] be if [driver] increased by 10%?
`,
  },
  {
    icon: Mail,
    color: "var(--brand-blue)",
    title: "Outlook Inbox-Zero Playbook",
    desc: "Templates to tame email, draft replies, and stay ahead of your inbox every day.",
    file: "copilot-outlook-playbook.md",
    content: `# Outlook Inbox-Zero Playbook

## The daily 15-minute routine
1. Summarize: "Summarize everything that arrived since yesterday and flag what needs me."
2. Triage: reply in under 2 minutes, delegate, defer to a task, or delete.
3. Draft: use Copilot for every reply longer than three sentences.
4. Close the loop: "List emails I promised to follow up on and haven't."

## Reply prompts
- Draft a polite reply declining this request and offering an alternative.
- Reply confirming the meeting and asking for an agenda.
- Write a short, friendly chase-up for this unanswered email.
- Draft a reply that acknowledges the complaint, apologises, and proposes next steps.

## Tone controls
- Make it warmer. / Make it more formal. / Make it shorter. / Remove the apology.

## Thread management
- Summarize this thread and list who owes what by when.
- What was actually decided in this thread?
- Catch me up on this thread in three bullets.

## Weekly review
- Summarize the key themes in my inbox this week.
- List unresolved requests waiting on me.
`,
  },
  {
    icon: Presentation,
    color: "var(--brand-orange)",
    title: "PowerPoint Storytelling Kit",
    desc: "Frameworks and prompt starters for stunning decks that actually land.",
    file: "copilot-powerpoint-kit.md",
    content: `# PowerPoint Storytelling Kit

## Story frameworks
- **SCR:** Situation → Complication → Resolution.
- **Before / After / Bridge:** where we are, where we could be, how we get there.
- **Pyramid:** answer first, then three supporting reasons, then evidence.

## Build prompts
- Create a presentation from this document using the Situation-Complication-Resolution structure.
- Turn these notes into a 10-slide deck with one idea per slide: [paste notes].
- Add a strong opening slide that states the decision I'm asking for.

## Improve prompts
- Rewrite every slide title as a full-sentence takeaway.
- This slide is too dense — split it into two and cut the text by half.
- Suggest a visual or chart type for this slide.
- Add speaker notes for each slide, 30 seconds of speech per slide.

## Before you present
- What are the three toughest questions I'll get from this audience?
- Summarize this deck into a 60-second verbal pitch.
`,
  },
  {
    icon: Users,
    color: "var(--brand-pink)",
    title: "Teams Meeting Productivity Pack",
    desc: "Prompts for recaps, action items, and better collaboration — automatically.",
    file: "copilot-teams-pack.md",
    content: `# Teams Meeting Productivity Pack

## During the meeting
- What have I missed so far?
- What questions have been asked that nobody answered?
- Summarize the discussion on [topic] so far.

## After the meeting
- Write a recap with decisions, owners, and deadlines in a table.
- List every action item assigned to me.
- What points were disagreed on, and what were the arguments on each side?
- Draft a follow-up email to attendees with the recap and next steps.

## Chat & channels
- Summarize this channel's activity from the past week.
- Catch me up on anything that mentions [project].
- Draft a clear status update for this channel based on the last 10 messages.

## Meeting hygiene that makes Copilot better
- Always record and transcribe.
- Put an agenda in the invite — Copilot uses it for structure.
- Say names out loud when assigning actions.
`,
  },
  {
    icon: Zap,
    color: "var(--brand-purple)",
    title: "Automation Checklist",
    desc: "Step-by-step system to turn repetitive tasks into Copilot-powered workflows.",
    file: "copilot-automation-checklist.md",
    content: `# Copilot Automation Checklist

## 1. Find the work worth automating
- [ ] List every task you repeated more than 3 times this month.
- [ ] Mark each as: rules-based, judgement-based, or creative.
- [ ] Start with rules-based tasks that take 10+ minutes.

## 2. Write it down before you automate it
- [ ] Describe the task in plain steps.
- [ ] Note the inputs, the output, and what "good" looks like.
- [ ] Save a great example of the finished output.

## 3. Turn it into a prompt
- [ ] Give role, context, task, format, and tone.
- [ ] Paste your best example as a reference.
- [ ] Save the prompt somewhere reusable.

## 4. Test and tighten
- [ ] Run it on three real cases.
- [ ] Note where it fails and add a rule for each failure.
- [ ] Decide what a human must always check.

## 5. Scale it
- [ ] Share the prompt with your team.
- [ ] Review monthly and retire prompts that no longer fit.
- [ ] Track time saved so you know what's working.
`,
  },
];
