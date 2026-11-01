import type { Day } from "../toolkit/learning";

// The 30-Day Claude Transformation: from Claude user to Claude power user to
// AI-enabled professional, one short task a day, built on the book's method.

const M = "/claude-advantage/members";

export const claudeWeekTitles: Record<1 | 2 | 3 | 4, string> = {
  1: "Brief Claude Like a Senior Colleague",
  2: "Produce at Speed",
  3: "Build Workflows That Run Themselves",
  4: "Become an Operator",
};

export const claudeDays: Day[] = [
  { day: 1, week: 1, title: "The brilliant new hire", task: "Read Chapter 1. Take one task you'd normally one-shot and develop it over three or four turns.", link: `${M}/book/1` },
  { day: 2, week: 1, title: "Find your level", task: "Read Chapter 2 and place yourself honestly on the five-level Prompting Hierarchy.", link: `${M}/book/2` },
  { day: 3, week: 1, title: "Five parts, every time", task: "Rebuild your three most common requests with Role, Context, Task, Format and Constraints.", link: `${M}/builder` },
  { day: 4, week: 1, title: "Your Professional Brief", task: "Fill in your Professional Brief. Let Claude interview you if you're stuck.", link: `${M}/context` },
  { day: 5, week: 1, title: "Your voice", task: "Build your Communication Style Guide from three pieces of your best writing.", prompt: "Here are three pieces of my writing that I'm proud of: [paste]. What patterns define my communication style? Then draft my Communication Style Guide.", link: `${M}/context` },
  { day: 6, week: 1, title: "Your first Project", task: "Create a Project for your main area of work using the Project Instructions template.", link: `${M}/context` },
  { day: 7, week: 1, title: "Test the briefing", task: "In your new Project, ask: “What do you know about how I work, and what are my standards?” Fix whatever's missing." },
  { day: 8, week: 2, title: "Batch your email", task: "Run the email processing workflow from Chapter 4 for one whole day.", link: `${M}/book/4` },
  { day: 9, week: 2, title: "The hard email", task: "Draft your most difficult pending message with the Difficult Message prompt.", link: `${M}/prompts/difficult-message-draft` },
  { day: 10, week: 2, title: "Research in an hour", task: "Run a real question through the Research Brief Generator, then Source Synthesis.", link: `${M}/prompts/research-brief-generator` },
  { day: 11, week: 2, title: "Argue with yourself", task: "Put your next recommendation through the Assumption Stress Test.", link: `${M}/prompts/assumption-stress-test` },
  { day: 12, week: 2, title: "Fail before you fail", task: "Run a pre-mortem on a plan you're committed to.", link: `${M}/prompts/pre-mortem-analysis` },
  { day: 13, week: 2, title: "Documents in stages", task: "Build your next report with the Executive Report Structure prompt, then write section by section.", link: `${M}/prompts/executive-report-structure` },
  { day: 14, week: 2, title: "Narrative before slides", task: "Plan your next presentation with the Presentation Narrative prompt before touching a slide.", link: `${M}/prompts/presentation-narrative` },
  { day: 15, week: 3, title: "Audit your work", task: "Read Chapter 7 and list every task you repeat weekly. Score each on time and how mechanical it is.", link: `${M}/book/7` },
  { day: 16, week: 3, title: "Your first chain", task: "Run the Meeting Notes Chain on your next meeting.", link: `${M}/workflows/meeting-notes` },
  { day: 17, week: 3, title: "The Friday report", task: "Run the Weekly Status Report Chain from a five-minute brain dump.", link: `${M}/workflows/weekly-status` },
  { day: 18, week: 3, title: "Adapt a blueprint", task: "Pick one of the ten workflow blueprints that fits your role and adapt it.", link: `${M}/workflows` },
  { day: 19, week: 3, title: "Your prompt library", task: "Save your five best prompts to My prompts, with a note on when to use each.", link: `${M}/prompts` },
  { day: 20, week: 3, title: "Your Claude OS", task: "Read Chapter 8. Sketch the Projects your work needs and create the second one.", link: `${M}/book/8` },
  { day: 21, week: 3, title: "Verify to the stakes", task: "Read Chapter 16. Classify the data you use with Claude, and adopt the verification protocol.", link: `${M}/book/16` },
  { day: 22, week: 4, title: "From user to operator", task: "Take the Operator Self-Assessment on the Operator Scale.", link: `${M}/operator` },
  { day: 23, week: 4, title: "The Operator Loop", task: "Take one weekly task all the way round: Brief, Delegate, Verify, Package, Automate.", link: `${M}/operator/2` },
  { day: 24, week: 4, title: "Delegate a half-day job", task: "Write a delegation brief with a review page, and review the result in five minutes.", link: `${M}/operator/5` },
  { day: 25, week: 4, title: "Code, safely", task: "Run the safe first build workflow on a small script you need.", link: `${M}/workflows/code-safe-start` },
  { day: 26, week: 4, title: "Create the real thing", task: "Use the Design workflow to turn one idea into a visual concept.", link: `${M}/workflows/design-iterate` },
  { day: 27, week: 4, title: "Your first skill", task: "Turn your best delegated job into a skill from the Skills Library.", link: `${M}/operator/skills` },
  { day: 28, week: 4, title: "Test it", task: "Test that skill on three real inputs, including one designed to trip it up.", link: `${M}/operator/8` },
  { day: 29, week: 4, title: "Measure", task: "Fill in your Time Audit again and compare it with Day 1.", link: `${M}/worksheets` },
  { day: 30, week: 4, title: "Your Claude system", task: "Write down your Projects, your five go-to prompts and your three workflows, and when you use each. That's your system." },
];
