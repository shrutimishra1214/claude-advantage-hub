// The book's method, as tools: frameworks, anchors, the verification ladder,
// the 90-day plan and the reference sections. Chapter numbers point back to the book.

export const quickWins = [
  { title: "Run a morning brief before the inbox", body: "Ask Copilot what arrived, what changed, and what today's meetings need. You start the day with a map instead of the pile.", ch: [3] },
  { title: "Run the recap loop after every meeting", body: "Transcript to summary, then action items, then a follow-up draft, while it is still warm. The single most reproducible gain in the product.", ch: [3, 18] },
  { title: "Name the source type in your question", body: "“In our meetings…”, “from the policy library…”, “in mail from the client…” pre-aims retrieval and sharpens the answer for free.", ch: [22] },
  { title: "Brief in five parts, not one line", body: "Role, context, task, format, and constraints. A short briefing beats a vague ask every time.", ch: [7] },
  { title: "Add “ask me three questions first”", body: "Append it to any prompt and the model surfaces its assumptions as questions instead of guessing.", ch: [8] },
  { title: "Match one strong example instead of adjectives", body: "Paste your best previous version and say “match this.” An example is a specification words cannot equal.", ch: [8] },
  { title: "Verify to the stakes, not everything", body: "A brainstorm needs a glance; a client number needs tracing. Match scrutiny to the cost of being wrong.", ch: [2, 34] },
  { title: "Adopt the DECIDED convention in chat", body: "Write “DECIDED:” before a real decision. One word makes every future search find it.", ch: [19] },
  { title: "Promote the keepers to a Page", body: "When a chat produces something worth revisiting, send it to a Page instead of letting it die in the scroll.", ch: [23] },
  { title: "Switch deliberately between Work and Web", body: "Work mode for your data, Web mode for the world. The wrong mode is behind most “useless” answers.", ch: [22] },
  { title: "Close the laptop and let the transcript scribe", body: "In the meetings that matter, spend your attention on the room; the recap has the words.", ch: [18] },
  { title: "Save your best prompt as a template", body: "Replace the specifics with named slots and file it. A prompt solves a task once; a template solves the task type forever.", ch: [7, 15] },
];

// ── The five-part brief (Chapter 7) ──
export const fiveParts = [
  { key: "role", label: "Role", q: "Who is speaking, and to whom?", hint: "You are my account lead writing to a client…", why: "Conditions vocabulary, depth and emphasis. The highest return per word, and the part beginners skip most." },
  { key: "context", label: "Context", q: "What would a capable stranger need to know?", hint: "The client is worried our Q3 delivery is slipping, after a call where they raised timing and budget.", why: "The situation, audience, stakes, history and sources. Not everything you know: what they need." },
  { key: "task", label: "Task", q: "One verb, one deliverable.", hint: "Draft a short status email that owns the delay and lays out the revised plan.", why: "Fails when it is a topic instead of an action, or stacks several deliverables into one breath." },
  { key: "format", label: "Format", q: "What is the shape of done?", hint: "Three short paragraphs, plain language.", why: "Sections, length ceilings, table columns, answer-first. The cheapest quality lever there is." },
  { key: "constraints", label: "Constraints", q: "What are the guardrails?", hint: "Under 150 words; reassuring but honest; do not invent any dates we did not agree.", why: "What to exclude, what not to invent. Where verification enters the prompt itself." },
] as const;

export const symptoms = [
  { symptom: "Generic enough to describe anyone's project", missing: "Context" },
  { symptom: "Right content, wrong voice or seniority", missing: "Role" },
  { symptom: "A sprawling answer you had to mine", missing: "Format" },
  { symptom: "Confident specifics you never supplied", missing: "Constraints" },
  { symptom: "Competent, but simply not what you needed", missing: "Task (it was a topic, not an action)" },
];

// ── The six shapes and two multipliers (Chapter 8) ──
export const shapes = [
  {
    name: "Brief",
    what: "Assemble a situation from scattered sources so a human can act. Morning triage, call prep, catch-up.",
    load: "Context and constraints heavy; role thin.",
    template: "Context: I need to [act on what] by [when]. Sources: [mail / meetings / files, time window]. Task: give me a prioritized picture of what changed, what is open, and what needs me. Format: [n] bullets, most urgent first. Constraints: only from these sources; mark anything you could not verify.",
  },
  {
    name: "Extract",
    what: "Unstructured to structured. Action items from transcripts, terms from contracts. Prose in, a table out.",
    load: "The most reliable shape. Add an “unclear” marker so ambiguity surfaces.",
    template: "From [source], extract every [item type] into a table with columns: [columns]. Quote the passage each row came from. Where something is ambiguous, write UNCLEAR rather than guessing.",
  },
  {
    name: "Draft",
    what: "An artifact from supplied materials in a house style. Reports, sections, emails.",
    load: "Demands an example. You write the judgment; it assembles the evidence.",
    template: "Role: you are [who] writing for [audience]. Using [sources], draft [artifact]. Match the structure and tone of this example: [paste]. Format: [sections, length]. Mark any claim not supported by the sources with [VERIFY].",
  },
  {
    name: "Transform",
    what: "Same truth, new shape. Rewrites, translations, length and tone changes.",
    load: "Role and format carry it. One essential constraint: no new facts.",
    template: "Rewrite this for [new reader] in [format and length]. Preserve every fact, number and commitment. Add nothing new. List anything you removed or whose meaning changed.",
  },
  {
    name: "Analyze",
    what: "Answer with reasoning. Compare the bids, explain the variance.",
    load: "The most precise task verb; evidence separated from inference. Most exposed to the jagged frontier.",
    template: "Analyze [question] using [data/sources]. Show your reasoning step by step. Separate what the data shows from what you are inferring. State what would change your conclusion.",
  },
  {
    name: "Critique",
    what: "The model on your work. Review this as the audience it must survive; run a pre-mortem.",
    load: "Its failure is flattery, patched by a quota, severity order and quotes.",
    template: "You are [the reviewer I fear: the CFO / the client / opposing counsel]. Review the attached draft. List the [5] most serious problems, ordered by severity, quoting the passage each concerns, and say what would fix it. Do not compliment the draft.",
  },
];

export const multipliers = [
  { name: "Match this", body: "Examples are specifications. Attach the best previous instance and say “match this.” Draft and Transform demand it.", append: "Match the tone, structure and length of this example: [paste]." },
  { name: "Ask me first", body: "Converts the model's silent assumptions into visible decisions. The cheapest insurance in prompting.", append: "Before starting, ask me up to three questions that would most improve the result." },
];

// ── Fixing a bad answer (Chapter 9) ──
export const ladder = [
  { n: 1, name: "Element failure", tell: "Generic, wrong voice, sprawling, invented specifics, or the wrong deliverable.", fix: "One steering turn supplies the missing part of the five-part brief." },
  { n: 2, name: "Grounding failure", tell: "It cites a superseded draft, misses a file you know exists, or answers from general knowledge.", fix: "No rewording fixes this. Check the account, Work vs Web, and that the file is in OneDrive or SharePoint." },
  { n: 3, name: "Window failure", tell: "Early instructions ignored, details conflated, quality sagging over a long chat.", fix: "Never another correction. Write a compiled brief and run it in a fresh chat." },
  { n: 4, name: "Frontier failure", tell: "Three well-built prompts failing three different ways.", fix: "Stop prompting. Route the calculation to Excel, the citation to a real source, the judgment to yourself." },
];

export const steering = [
  { move: "Tighten", when: "Invented specifics, scope creep.", say: "Use only the attached file. Mark anything else as inference." },
  { move: "Anchor", when: "Register and format misses. The single most reliable move.", say: "Match the tone and structure of this: [paste]." },
  { move: "Re-aim", when: "Right content, wrong voice.", say: "Rewrite this for [audience], who has not seen the internal history." },
  { move: "Split", when: "Tangled outputs, compound tasks.", say: "First just list the findings. We will draft after I confirm them." },
  { move: "Quote-check", when: "Suspected fabrication.", say: "For each claim, give the exact supporting quote and its source." },
  { move: "Rewind", when: "Big misses.", say: "Edit your original prompt with what the failure taught you, and rerun it." },
  { move: "Fresh-start", when: "Window failures, or any spiral two turns deep.", say: "Compile everything I've asked for in this chat into one complete prompt I can run in a new chat." },
];

// ── Verification ladder (Chapters 2 and 34) ──
export const rungs = [
  { n: 1, name: "Stays with you", examples: "Brainstorm, draft, personal note", checks: ["Read it through once"] },
  { n: 2, name: "Informs the team", examples: "Internal summary, status draft", checks: ["Read it through once", "Check every name", "Check every number", "Check every date"] },
  {
    n: 3,
    name: "Leaves the building",
    examples: "Client deliverable, published content, financial figure",
    checks: ["Check every name, number and date", "Trace every claim to its source", "Trace every number to its origin", "Separate verified, sourced and inferred claims", "Get a second, hostile read"],
  },
  {
    n: 4,
    name: "Carries legal or regulatory weight",
    examples: "Contracts, filings, HR decisions, regulated advice",
    checks: ["Everything on rung 3", "Check every citation against the real source", "A qualified expert signs off", "Never use Copilot to score, rank or filter people"],
  },
];

export const safeUse = [
  { name: "Surface", body: "Work content in work-account surfaces with enterprise data protection, never in consumer surfaces." },
  { name: "Scope", body: "Sensitive work in bounded rooms: client material walled, reference files by name rather than sweeping folders." },
  { name: "Label", body: "Content labeled per its sensitivity, because the label is the protection the system enforces." },
  { name: "Records", body: "Everything typed into a work surface is a governed, discoverable record. Write accordingly." },
  { name: "Report", body: "Exposure found, oversharing surfaced: reported, not used." },
];

// ── The three anchors (Chapter 3) ──
export const anchors = [
  {
    name: "Morning brief",
    when: "10 minutes, before the inbox",
    why: "You enter with a map instead of wandering in.",
    prompts: [
      "From my email and Teams since [yesterday 5pm], what arrived that needs me today? Rank by urgency, one line each.",
      "What changed on my calendar today, and for each meeting give me one line: the purpose and what I need to bring.",
      "Is anything due today or tomorrow that I committed to in mail or meetings? Quote where I committed.",
    ],
  },
  {
    name: "Recap loop",
    when: "2 minutes, after every meeting",
    why: "The single most reproducible gain in the product.",
    prompts: [
      "Summarize this meeting: purpose, the main points, and what was decided. Quote the line where each decision was made.",
      "List every action item with owner and deadline. Mark 'not agreed' where either is missing.",
      "Draft a follow-up email to the attendees with the decisions and the action table. Under 150 words.",
    ],
  },
  {
    name: "Shutdown",
    when: "10 minutes, at day's end",
    why: "Half about tomorrow's efficiency, half about not chewing on it tonight.",
    prompts: [
      "From today's mail, chats and meetings, list every open loop that is mine: what it is, who is waiting, and the next step.",
      "What is the single most important thing for me to do first tomorrow, and why?",
    ],
  },
];

// ── Inbox triage: the five decisions (Chapter 16) ──
export const triage = [
  { name: "Decide", body: "This needs a judgment only you can make." },
  { name: "Reply", body: "This needs words from you today." },
  { name: "Delegate", body: "This needs someone else, forwarded with one line." },
  { name: "File", body: "This is information, routed to its place." },
  { name: "Drop", body: "This needed nothing." },
];

// ── The book's named prompts (Chapter 35), with ready-to-use versions ──
export type BookPrompt = { name: string; for: string; upgrade: string; template: string };

export const bookPrompts: { category: string; blurb: string; prompts: BookPrompt[] }[] = [
  {
    category: "Foundational",
    blurb: "The anatomy and frameworks every specific prompt instantiates.",
    prompts: [
      { name: "The Universal Brief", for: "The five-part skeleton under every prompt above the trivial.", upgrade: "Parameterize it per recurring task and stop writing from scratch.", template: "Role: [who is speaking, to whom]. Context: [situation, audience, stakes, sources]. Task: [one verb, one deliverable]. Format: [shape of done]. Constraints: [what to exclude, what not to invent]." },
      { name: "The Six Chassis", for: "Preset structures for the six recurring shapes of knowledge work.", upgrade: "Chain the chassis into workflows; swap the target noun and the chassis re-aims.", template: "This is a [Brief / Extract / Draft / Transform / Analyze / Critique]. [Use that shape's template from the Method page.]" },
      { name: "The Two Multipliers", for: "Example-driven prompting and ask-me-first: upgrades for any chassis.", upgrade: "Build both into the templates where they earn their place.", template: "Match the tone and structure of this example: [paste]. Before starting, ask me up to three questions that would most improve the result." },
    ],
  },
  {
    category: "Writing & Drafting",
    blurb: "Structure, section drafting, compression and audience translation.",
    prompts: [
      { name: "The Outline Argument", for: "Negotiate the document's structure before the prose, reader-shaped and decision-first.", upgrade: "Keep argued outlines from strong documents as structural anchors.", template: "Before drafting, propose an outline for [document] for [reader], who must decide [decision]. Lead with the answer. For each section, give one line on the argument it makes and the evidence it needs." },
      { name: "The Grounded Section Draft", for: "Each section drafted from its own sources, unsupported claims flagged.", upgrade: "Standardize the VERIFY convention across the team's templates.", template: "Draft the [section] using only [sources]. Mark any sentence not directly supported by them with [VERIFY]." },
      { name: "The Concision Pass", for: "Shorter without silent loss.", upgrade: "Chain it with the Audience Translator for the executive stack.", template: "Cut this to [n] words. Keep every decision, number and commitment. Then give me a removal ledger: what you cut and why." },
      { name: "The Audience Translator", for: "The same truth for a new reader, facts preserved, meaning changes flagged.", upgrade: "Chain across the full audience set from one master document.", template: "Rewrite this for [audience]. Preserve every fact. Add nothing. Flag any place where simplifying changed the meaning." },
      { name: "The Status Report Engine", for: "The recurring report from last week's template, filler banned.", upgrade: "Add self-flagging of any unsupported claim.", template: "Using last week's report as the template: [paste]. Update it with these developments: [notes/sources]. No filler. Mark anything not supported by the sources with [VERIFY]." },
    ],
  },
  {
    category: "Analysis & Data",
    blurb: "Profiling, formulas, insight auditing, commentary and charts.",
    prompts: [
      { name: "The Data Interview", for: "Profile the dataset before any question, anomalies and truncation surfaced.", upgrade: "File the interview as the dataset's birth certificate.", template: "Before any analysis, describe this table: rows and columns, what each column contains, date range, blanks, duplicates, outliers, and anything that looks truncated or wrong." },
      { name: "The Explained Formula", for: "The formula with a plain-language walkthrough, assumptions, edge cases and test rows.", upgrade: "Paste the explanation into a cell note as documentation.", template: "Write a formula to [calculate what]. Explain it in plain language, list its assumptions and edge cases, and give three test rows with the expected result." },
      { name: "The Insight Audit", for: "A finding converted to an auditable artifact plus the ways it could be wrong.", upgrade: "Make it the named gate between the workbook and any deliverable.", template: "For this finding: [finding]. Show the exact rows and calculation behind it, and list three ways it could be wrong (data, method, interpretation)." },
      { name: "The Commentary Engine", for: "Narrative from verified findings only, causes evidenced or marked.", upgrade: "Schedule it for the morning of the review.", template: "Write commentary on these verified findings: [findings]. Only state a cause where the data evidences it; otherwise write 'requires investigation'." },
      { name: "The Chart Chooser", for: "The visualization chosen from the claim, with the honesty questions answered.", upgrade: "Keep a house gallery of chart patterns with their honesty rules.", template: "The claim I want to show is: [claim]. Recommend the chart type, what goes on each axis, and any way this chart could mislead (axis start, scale, missing context)." },
    ],
  },
  {
    category: "Meetings & Communication",
    blurb: "Briefs, recaps, decision hunts and inbox triage.",
    prompts: [
      { name: "The Pre-Meeting Brief", for: "Who is coming, what is open, what they last committed to.", upgrade: "Attach the thread and the last recap so the brief grounds in real history.", template: "Prepare me for [meeting]. Who is attending and their stake, what is still open from [last meeting/thread], and what each person last committed to. Quote sources." },
      { name: "The Recap Warm-Pass", for: "The machine's recap corrected before it becomes the record.", upgrade: "Mark decisions aloud in the meeting so the recap needs no correction.", template: "Here is the meeting recap: [paste]. Check it against the transcript. List any action item attributed to the wrong person, any decision missing, and any statement not in the transcript." },
      { name: "The Decision Hunt", for: "What was decided about X, who made the call, and what conditions were attached.", upgrade: "Scope by place, people and time; read the two messages after the decision.", template: "In [channel/thread] between [dates], what was decided about [topic], who made the call, and what conditions were attached? Quote and link the messages." },
      { name: "The Thread Debrief", for: "An exploded thread compressed to what was discussed, proposed and decided.", upgrade: "Ask for the disagreement and the positions, not just the outcome.", template: "Debrief this thread: what was discussed, what was proposed by whom, where people disagreed, and where it landed." },
      { name: "The Inbox Triage", for: "The morning's arrivals sorted by the five decisions, replies staged as drafts.", upgrade: "Encode your standing instructions so the sort holds your priorities.", template: "Sort today's unread mail into Decide, Reply, Delegate, File, Drop. One line each. Treat anything from [names] as priority. Draft replies for the Reply pile but do not send." },
    ],
  },
  {
    category: "Knowledge & Retrieval",
    blurb: "Scoped questions, archive interrogation and prior-art hunts.",
    prompts: [
      { name: "The Scoped Retrieval Question", for: "Scope by place, people and time, name the artifact, demand provenance.", upgrade: "Keep 'quote the source and give its date, location and owner' standing in the template.", template: "In [place] from [people] during [time], find [artifact]. Quote the source and give its date, location and owner." },
      { name: "The Archive Interrogation", for: "What did I think about this, when, and why.", upgrade: "Ask the archive before forming the position, not after.", template: "From my notes, mail and documents, what have I said or decided about [topic] before, when, and why? Quote me." },
      { name: "The Currency Check", for: "The current version, and how you know it is current.", upgrade: "Trust scoped retrieval from governed libraries; check estate-wide answers for currency.", template: "What is the current version of [document/policy]? How do you know it is current? List any older versions that might be confused with it." },
      { name: "The Prior-Art Hunt", for: "Have we solved this before, and what did we try and abandon.", upgrade: "Hunt the abandonment before the precedent: why it died is the risk map.", template: "Have we tried to solve [problem] before? What was tried, what was abandoned, and why? Quote the sources." },
      { name: "The Joiner and Leaver Protocol", for: "Interrogate a project's corpus instead of apprenticing; harvest a leaver's knowledge.", upgrade: "Run the leaver protocol on yourself and bank one answer only you hold.", template: "I'm new to [project]. From its documents and threads, explain the goal, the key decisions so far and who made them, the open risks, and who to ask about what." },
    ],
  },
  {
    category: "Review & Verification",
    blurb: "The kill question, claim separation, source trace and fairness.",
    prompts: [
      { name: "The Kill Question", for: "What would have to be true for this to be wrong.", upgrade: "Make it the standing final gate on every rung-three output.", template: "What would have to be true for this [conclusion/recommendation] to be wrong? List the assumptions it rests on and how to test each." },
      { name: "The Claim Separator", for: "Sort output into verified, sourced and inferred.", upgrade: "Run it before the source trace so the trace targets the claims that need it.", template: "Sort every claim in this text into three lists: verified (with source), sourced but not yet checked, and inferred (no source)." },
      { name: "The Source Trace", for: "Every claim traced to its source, every number to its origin.", upgrade: "Verify for truth separately from quality; the fluent fabrication passes the quality read.", template: "For each claim and number in this text, give the exact source passage it came from. Write NOT FOUND where there is none." },
      { name: "The Hostile Read", for: "The adversarial second read that catches what proximity hid.", upgrade: "When no colleague is available, run it as a chassis.", template: "Read this as [the most skeptical reader]. What would they challenge, misunderstand or reject? Quote the passages, most serious first." },
      { name: "The Fairness Scan", for: "Bias patterns scanned, proxy language flagged, skew checked.", upgrade: "Where the use is evaluative of people: refuse, do not merely review.", template: "Scan this text for biased or exclusionary language, stereotypes, and proxy wording for protected characteristics. Quote each instance and suggest neutral wording." },
    ],
  },
  {
    category: "Building & Governance",
    blurb: "Agent specs, gap responses, gates and the usage policy.",
    prompts: [
      { name: "The Agent Spec", for: "Instructions, knowledge, tools and refusals, plus owner and review tempo.", upgrade: "Write the refusals before the capabilities.", template: "Write an agent spec for [purpose]: its instructions, the knowledge it may use, the actions it may take, what it must refuse, its owner, and how often it is reviewed." },
      { name: "The Gap Response", for: "The exact sentence for 'I don't have documentation covering that'.", upgrade: "It is the safety floor and the hardest to retrofit; draft it first.", template: "Write the exact reply this agent gives when its sources don't cover a question: honest, helpful, and pointing to [where to get help]." },
      { name: "The Regression Suite Seed", for: "Accuracy, boundary, gap, adversarial and tone tests.", upgrade: "Grow it from every miss; rerun it at every change.", template: "Write 15 test questions for [agent]: 5 it should answer accurately, 3 at its boundary, 3 outside its sources, 2 adversarial, 2 testing tone. Give the expected behavior for each." },
      { name: "The Confirmation Gate", for: "The exact action shown before it runs.", upgrade: "The gate displays the exact payload or it is not a gate.", template: "Before taking any action, show me exactly what you will do, with every field filled in, and wait for me to confirm." },
      { name: "The AI Usage Policy", for: "Approved tools, data rules, prohibited uses, human-in-the-loop, and help.", upgrade: "Draft it to be read aloud to the people who must follow it.", template: "Draft a one-page AI usage policy for [team]: approved tools, what data may and may not be used, prohibited uses, when a human must review, and where to get help. Plain language." },
    ],
  },
];

// ── The 90-Day Plan (Chapter 38) ──
export const ninetyDay = [
  { phase: "Foundations", days: "Days 1–30", weeks: [
    { w: 1, title: "The mental model and the baseline", body: "Read Chapters 1 and 2. Run the time audit, establishing the baseline the whole plan measures against.", link: "/members/worksheets#time-audit" },
    { w: 2, title: "The prompt anatomy", body: "Read Chapter 7. Practice the five-part brief on real tasks.", link: "/members/method#five-parts" },
    { w: 3, title: "The morning anchor", body: "Read Chapter 3. Install the morning brief, anchored to the day's start.", link: "/members/method#anchors" },
    { w: 4, title: "The recap and shutdown anchors", body: "Complete Chapter 3's anchors. The three anchors now run; the daily rhythm is established.", link: "/members/method#anchors" },
  ] },
  { phase: "Applications and Habits", days: "Days 31–60", weeks: [
    { w: 5, title: "The frameworks", body: "Read Chapter 8. Build your coverage map and your starter kit of the six chassis.", link: "/members/method#shapes" },
    { w: 6, title: "The debugging discipline", body: "Read Chapter 9. Practice the diagnostic ladder and the steering moves. Expect the plateau this week.", link: "/members/method#fix" },
    { w: 7, title: "The document pipeline", body: "Read Chapters 10 and 11. Run the document line on a real deliverable.", link: "/members/workflows/notes-to-brief" },
    { w: 8, title: "The data pipeline", body: "Read Chapters 12 and 13. Run the data line on a real dataset.", link: "/members/workflows/data-to-decision" },
    { w: 9, title: "The inbox system", body: "Read Chapter 16. Install the inbox operating system.", link: "/members/method#triage" },
    { w: 10, title: "The knowledge loop", body: "Read Chapters 19 and 20. Install the capture habit and the weekly distill.", link: "/members/book/19" },
  ] },
  { phase: "Systems and Mastery", days: "Days 61–90", weeks: [
    { w: 11, title: "Safe use and the five decisions", body: "Read Chapter 32. Install the everyday decisions: surface, scope, label, records, report.", link: "/members/method#safe-use" },
    { w: 12, title: "The verification discipline", body: "Read Chapter 34. Install the formal verification practice at the rungs.", link: "/members/method#verify" },
    { w: 13, title: "The operating-system assembly", body: "Read Chapter 37. Assemble the four layers into one coherent system.", link: "/members/book/37" },
    { w: 14, title: "The compounding and the measurement", body: "Days 85–90. Install the compounding design and measure against your week-one baseline.", link: "/members/worksheets#time-audit" },
  ] },
];

export const derailment = [
  { name: "The plateau", fix: "Measure. The baseline beaten shows the progress the feeling denies. Expect it around week six." },
  { name: "The lapse", fix: "Forgive it. A single lapse is not the failure; the resumption is the practice." },
  { name: "The overwhelm", fix: "Return to one change per week. Nothing else is new this week." },
];

// ── Appendix A: Troubleshooting ──
export const firstThree = [
  "Am I signed into my licensed work account?",
  "Am I in Work mode, not Web?",
  "Is the file I want saved in OneDrive or SharePoint?",
];

export const troubleshooting: { area: string; items: { snag: string; fix: string; admin?: boolean }[] }[] = [
  { area: "Setup, licensing and access", items: [
    { snag: "No Copilot anywhere, even after the company bought it.", fix: "A license must be assigned to your account, not just purchased. Ask your admin to assign one, then sign in with that work account and update your apps.", admin: true },
    { snag: "A colleague has features I do not have.", fix: "Almost always a licensing tier or tenant-settings difference. Compare license levels and ask your admin what is enabled for your group.", admin: true },
    { snag: "The menus look different from the book.", fix: "Copilot ships in waves and its interface changes often. Follow the method, not the exact button location." },
  ] },
  { area: "Turning Copilot on", items: [
    { snag: "The Copilot button is missing in Word, Excel or PowerPoint.", fix: "With a license assigned, open File → Options → Copilot and tick Enable Copilot, then restart. If the option isn't there, update the app or wait for the license to propagate." },
    { snag: "Copilot vanished from Office after a privacy change.", fix: "Copilot needs optional connected experiences. File → Options → Trust Center → Trust Center Settings → Privacy Options: re-enable them and restart. Your admin can lock this.", admin: false },
    { snag: "There is no Copilot in the Teams chat or message box.", fix: "Copilot in chats and channels is a separate switch from meeting Copilot. Confirm it's enabled for you, then fully quit and reopen Teams.", admin: true },
    { snag: "Copilot never appears in my Teams meetings.", fix: "It needs a live transcript: More (…) → Record and transcribe → Start transcription. If greyed out, your Teams admin controls it under Meeting policies.", admin: true },
    { snag: "Copilot is missing in Outlook.", fix: "Use the new Outlook or Outlook on the web. Flip the “Try the new Outlook” toggle at the top right." },
    { snag: "The Windows Copilot key or taskbar icon does nothing useful.", fix: "That opens consumer Copilot. Sign into the Microsoft 365 Copilot app (or Teams and Office) with your work account." },
    { snag: "Loop components or the Loop app are unavailable.", fix: "Loop is enabled by your admin. Until then, pasted components land as static text.", admin: true },
    { snag: "I have features in one app but not another.", fix: "Copilot is switched on per app and per policy. Ask your admin which apps and features are on for your group.", admin: true },
  ] },
  { area: "When Copilot can't see your files", items: [
    { snag: "Copilot cannot find a file I know exists.", fix: "It's probably not in OneDrive or SharePoint, was saved moments ago and isn't indexed yet, or you lack permission. Move working files to the cloud and wait a few minutes." },
    { snag: "Answers are vague or generic at work.", fix: "You may be in a consumer surface or in Web mode. Sign into your licensed work account and switch to Work." },
    { snag: "It answered from the internet when I wanted my data.", fix: "Switch the source toggle from Web to Work." },
  ] },
  { area: "Work vs Web and the chat surface", items: [
    { snag: "I cannot switch between Work and Web.", fix: "The toggle appears only on a licensed work account. Sign in with the right account or ask your admin.", admin: true },
    { snag: "Researcher, Analyst or the agent picker is missing.", fix: "These are enabled per tenant and license and roll out gradually. Check with IT.", admin: true },
    { snag: "Memory seems empty, wrong or stale.", fix: "Memory is curated, not automatic. Ask what it remembers, add what's missing, prune what's out of date." },
  ] },
  { area: "Teams meetings and recaps", items: [
    { snag: "There is no recap after my meeting.", fix: "Copilot needs transcription or recording on during the meeting. Start transcription from the toolbar." },
    { snag: "Copilot is greyed out in the meeting.", fix: "Meeting AI or transcription is disabled by tenant policy. Ask IT to allow it.", admin: true },
    { snag: "The recap misattributed an action item.", fix: "Correct it in the live notes, and mark decisions aloud (“the decision is…”) so the recap is right at the source." },
  ] },
  { area: "Excel, Word and PowerPoint", items: [
    { snag: "Copilot in Excel is disabled or unhelpful.", fix: "Format the data as a Table (Ctrl+T), turn AutoSave on, and save the .xlsx to OneDrive or SharePoint." },
    { snag: "Copilot won't generate from my document or deck.", fix: "Save to OneDrive or SharePoint with AutoSave on and reference sources by name. For very large files, point it at specific sections." },
    { snag: "The numbers or totals look wrong.", fix: "They can be. Verify every figure against the source; treat a generated total as a draft, not a fact." },
  ] },
  { area: "Loop, OneNote, Pages and Notebooks", items: [
    { snag: "OneNote has no Copilot.", fix: "It's on the Windows and web apps with a license. Update and sign in with your work account." },
    { snag: "Pages or Notebooks are missing.", fix: "Both roll out gradually. If you don't see them, they aren't enabled for your tenant yet.", admin: true },
    { snag: "A Loop component won't sync where I pasted it.", fix: "The destination must support Loop and have it enabled; elsewhere it pastes as static text." },
  ] },
  { area: "Agents and Copilot Studio", items: [
    { snag: "I cannot create an agent in Copilot Studio.", fix: "Building needs maker access and the right environment. Ask IT.", admin: true },
    { snag: "My agent gives outdated or wrong answers.", fix: "It's probably grounded on a stale library. Ground it on the live, governed source and clear out superseded content." },
    { snag: "The agent cannot complete an action.", fix: "Check its identity and permissions and whether the connected system is down. Design an honest failure message." },
    { snag: "My agent will not publish.", fix: "Publishing runs through admin review. Involve governance at design time.", admin: true },
  ] },
  { area: "Security, permissions and records", items: [
    { snag: "Copilot surfaced a file I don't think I should see.", fix: "You almost certainly had permission already; Copilot only reveals what oversharing left open. Report it as a permissions issue." },
    { snag: "Sensitive content won't appear in answers.", fix: "A sensitivity label or DLP policy excludes it on purpose. That's protection working." },
    { snag: "Is what I type into Copilot a record?", fix: "Yes. Anything entered into a work surface is a governed, discoverable record. Write accordingly." },
  ] },
];

// ── Appendix B: Glossary ──
export const glossary: [string, string][] = [
  ["Agent", "A packaged Copilot with its own instructions, knowledge and tools that persists, is shareable, and lives where its users are. Three classes by rising risk: answering, task and autonomous."],
  ["Analyst", "A built-in Copilot agent that reasons through data problems step by step, showing its work."],
  ["AutoSave", "The Office setting that keeps a file saved to OneDrive or SharePoint in real time. Copilot in Word, Excel and PowerPoint needs it on."],
  ["Copilot Chat", "The general chat surface that reaches across your mail, meetings, chats and files at once. Your command center."],
  ["Copilot Notebooks", "A workspace that scopes Copilot to a curated set of project sources, so every answer grounds in that corpus only."],
  ["Copilot Pages", "A persistent, editable, shareable page you promote a chat response into, so good work isn't lost in the scrollback."],
  ["Copilot Studio", "The low-code environment for building and governing custom agents."],
  ["DLP (Data Loss Prevention)", "Policies that can exclude labeled or sensitive content from Copilot and control where data may flow."],
  ["Enterprise Data Protection", "Microsoft's commitment that Microsoft 365 Copilot processes your prompts and data inside your tenant's compliance boundary and doesn't use them to train the foundation models."],
  ["Fabrication (hallucination)", "Plausible-sounding output that is simply wrong. Most likely on specifics: names, numbers, dates and citations."],
  ["Frontier firm", "Microsoft's term for organizations reorganizing around human-agent teams."],
  ["Grounding", "Retrieving real, current, permission-checked information and instructing the model to answer from it. Answer quality is grounding quality."],
  ["Jagged frontier", "The uneven boundary of what the model does reliably. Just outside it, confident answers quietly become wrong."],
  ["Loop", "The app of shared workspaces and pages where a team's working material lives between chat and formal documents."],
  ["Loop component", "A portable, live object (table, task list, notes) that stays in sync everywhere it's pasted."],
  ["MCP (Model Context Protocol)", "A standard that lets an agent inherit an external toolset by connecting to a server; those tools then run inside the agent's trust boundary."],
  ["Memory", "The Copilot layer that retains your preferences and standing context across sessions. Curated by you, not automatic."],
  ["Microsoft 365 Copilot", "The licensed, work-grounded Copilot across the Microsoft 365 apps."],
  ["Microsoft Graph", "The index of your organization's content and relationships that Work-mode Copilot retrieves from."],
  ["Oversharing", "Permissions accumulated over years that let people reach far more than anyone realizes. Copilot reveals it by finding content by meaning: a permissions problem, not an AI one."],
  ["Prompt", "The briefing you give Copilot, built from five parts: role, context, task, format and constraints."],
  ["Recap (intelligent recap)", "The post-meeting artifact: summary, decisions and action items, navigable rather than merely readable."],
  ["Researcher", "A built-in Copilot agent that produces deep, citation-heavy reports across your content and the web."],
  ["Restricted Content Discovery", "A control that removes a site's content from Copilot and organization-wide search while leaving direct access intact."],
  ["Retrieval", "The step that fetches relevant content for grounding, matching meaning rather than keywords."],
  ["Sensitivity label", "A classification that travels with a document and governs how Copilot and others may handle it."],
  ["SharePoint agent", "An agent scoped to a site's content, answering conversationally with the site's governance as its guardrails."],
  ["Stock and stream", "Stream is the flow of messages valuable today; stock is the durable, maintained artifacts. Retrieve from the stream, bank what matters to stock."],
  ["Tenant", "Your organization's isolated Microsoft 365 environment, where your data and Copilot's compliance boundary live."],
  ["Verification ladder", "Matching how hard you check to the stakes: a glance for a draft, spot-checks for team work, full source-tracing for anything that leaves the building."],
  ["Work vs Web", "The grounding toggle. Work answers from your organization's content; Web answers from the public internet."],
];
