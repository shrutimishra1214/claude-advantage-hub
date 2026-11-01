import glossaryData from "./glossary.json";
import masterPrompts from "./master-prompts.json";

// The Claude Advantage: content for its member area, drawn from the book
// "The Claude Advantage" (Kaelis Voss). Chapter numbers point back to the book.

export type AdvChapter = {
  n: number;
  part: string;
  title: string;
  keyIdea: string;
  topics: string[];
  actions: string[];
};

export const advParts = ["Understand", "Produce", "Systematise", "Master", "Sustain"] as const;

export const advChapters: AdvChapter[] = [
  { n: 1, part: "Understand", title: "Why Claude Thinks Differently Than Any Tool You've Used", keyIdea: "Treat Claude like a brilliant new hire on their first day: output quality is a function of briefing quality, not prompt cleverness.", topics: ["The Brilliant New Hire", "The context window: your shared workspace", "How Claude holds your intent across a conversation", "The three most common mental-model mistakes"], actions: ["Take one task you'd normally one-shot and develop it over three or four turns instead.", "When an output is generic, write down what was missing from your brief before blaming Claude.", "Name which of the three mistakes (vending machine, blaming Claude, one-shot) you make most."] },
  { n: 2, part: "Understand", title: "The Prompting Hierarchy: From Amateur to Architect", keyIdea: "Prompting is a five-level skill. Every strong prompt carries Role, Context, Task, Format and Constraints, then improves through iteration.", topics: ["The five levels of Claude fluency", "The anatomy of a high-performance prompt: Role, Context, Task, Format, Constraints", "The PUSH method: iterative refinement", "Annotated rewrites from Requestor to System Designer"], actions: ["Place yourself honestly on the five-level hierarchy.", "Rebuild your three most common requests with all five components.", "Use the PUSH method on one draft this week instead of starting over."] },
  { n: 3, part: "Understand", title: "Context Is Everything: How to Brief Claude Like a Senior Colleague", keyIdea: "Context is the highest-leverage investment you can make: write it once in three core documents and a Project, and every session starts informed.", topics: ["The Professional Brief", "The Company Brain", "The Communication Style Guide", "Claude Projects and the Project Instruction template", "The 10-Minute Company Brief"], actions: ["Fill in your Professional Brief template.", "Build your Communication Style Guide from three pieces of your best writing.", "Set up your first Project with the Project Instruction template."] },
  { n: 4, part: "Produce", title: "The Communication Multiplier", keyIdea: "Communication is where Claude multiplies your output most: process email in batches, match tone to the stakeholder, and build documents in stages.", topics: ["The email processing workflow", "The Stakeholder Tone Matrix", "The Difficult Email Playbook: five types", "The EXECUTIVE framework for reports", "Proposals that win: discovery brief to pre-send stress test", "Presentations: narrative first, slides second"], actions: ["Run the email processing workflow for one full day.", "Draft your hardest pending email with the Difficult Email Playbook.", "Build your next proposal with the four-step proposal system."] },
  { n: 5, part: "Produce", title: "Thinking Faster: Claude as Your Research and Analysis Engine", keyIdea: "Use Claude for rapid synthesis and adversarial thinking, and calibrate trust: verify in proportion to the stakes.", topics: ["Rapid research synthesis and web search", "The competitive intelligence brief", "The Devil's Advocate Protocol and the pre-mortem", "From data to decision: the 'So What' discipline", "The Trust Calibration Matrix and verification protocol"], actions: ["Run one real research question through the research brief and source synthesis prompts.", "Put your next big recommendation through the Devil's Advocate Protocol.", "Apply the Trust Calibration Matrix to one piece of high-stakes research."] },
  { n: 6, part: "Produce", title: "The Strategic Thinking Partner", keyIdea: "Claude is a strategic sparring partner: generate options, explore three futures, surface assumptions and steel-man the other side, while the judgment stays yours.", topics: ["Business planning sessions with Claude", "Option generation: the most underused strategic move", "The Three Futures framework", "The Assumption Surfacing Protocol and the Steel Man exercise", "What Claude cannot do in strategic work"], actions: ["Run a five-message strategic planning session on a live decision.", "Build the three futures for one plan you're committed to.", "Steel-man the position you disagree with most this month."] },
  { n: 7, part: "Systematise", title: "Designing Workflows That Run Themselves", keyIdea: "Turn important-but-repetitive work into prompt chains: audit your work, decide what Claude should own, then chain one step into the next.", topics: ["The workflow audit and the Automation Decision Matrix", "Prompt chains: the engine of automation", "The meeting notes, weekly status and client onboarding chains", "Ten ready-to-deploy workflow blueprints", "No-code integration and the maintenance habit"], actions: ["Run the workflow audit on your last two weeks.", "Build one prompt chain from the walkthroughs and use it on real work.", "Pick two blueprints that fit your role and adapt them."] },
  { n: 8, part: "Systematise", title: "Your Personal Claude Operating System", keyIdea: "A personal Claude OS is a set of Projects, a prompt library and a monthly audit: every session picks up where the last one left off.", topics: ["Projects architecture for the power user", "Six core Projects", "Your personal prompt library", "The monthly Claude OS audit", "The compounding effect at 6 and 12 months"], actions: ["Set up the Projects your work needs, starting with one.", "Move your best prompts into a structured library.", "Book a monthly 30-minute Claude OS audit."] },
  { n: 9, part: "Systematise", title: "Deploying Claude Across Your Team", keyIdea: "Team adoption is a people problem: demonstrate before you advocate, build shared infrastructure, and set a lean AI policy before you need one.", topics: ["Why team AI adoption fails, and your team's sceptics", "The quick-win strategy", "The team prompt library structure", "Measuring and communicating AI ROI", "The lean team AI policy"], actions: ["Choose two demonstration cases from your own work.", "Start a shared team prompt library with five prompts.", "Draft a one-page team AI policy."] },
  { n: 10, part: "Master", title: "Claude for Sales and Business Development", keyIdea: "The SIGNAL selling system: precise ICPs, trigger events, signal-led outreach and deal war rooms.", topics: ["Precision ICP and the anti-ICP", "The trigger event library", "The five-touch SIGNAL sequence", "Deal war rooms, objection libraries and stakeholder maps", "The discovery-to-proposal chain"], actions: ["Build your precision ICP and anti-ICP.", "Write a five-touch sequence for one live prospect.", "Set up a war room Project for your biggest open deal."] },
  { n: 11, part: "Master", title: "Claude for Operations and Management", keyIdea: "The CLEAR operations model: turn brain dumps into SOPs, hire with structure, and write reviews and development plans that work.", topics: ["The brain dump to SOP pipeline", "Documentation triage", "Job descriptions, structured interviews and CV rubrics", "Performance reviews and difficult conversations", "Development plans that develop"], actions: ["Turn one undocumented process into an SOP with the four-step pipeline.", "Triage your documentation backlog.", "Prepare your next difficult conversation with the prep prompt."] },
  { n: 12, part: "Master", title: "Claude for Marketing and Content", keyIdea: "The VOICE content engine: encode your voice once, repurpose every idea into eight formats, and catch AI slop before it ships.", topics: ["Extracting and defining your brand voice", "Encoding voice into a Project", "The eight format templates", "The AI slop detection checklist", "Messaging hierarchy, taglines and strategic narrative"], actions: ["Extract your voice from five of your best pieces.", "Repurpose one long piece into three formats.", "Run your next piece through the slop checklist."] },
  { n: 13, part: "Master", title: "Claude for Finance and Accounting", keyIdea: "The PROFIT intelligence loop: variance stories, narratives for non-financial audiences, forecasts you've challenged, and compliance work reviewed twice.", topics: ["Variance analysis stories and P&L narratives", "Monthly reporting that writes itself", "Challenging your own forecast and 'what breaks first'", "Regulatory digests, risk flags and audit preparation", "Business cases, CFO objections and ROI narratives"], actions: ["Write this month's variance story with the prompt.", "Run the forecast challenge on your current forecast.", "Simulate CFO objections before your next business case."] },
  { n: 14, part: "Master", title: "Claude for HR and People Operations", keyIdea: "The PEOPLE advantage system: employer value, fit-filtering job descriptions, calibrated interviews, onboarding paths and exit insights.", topics: ["Employer value proposition and fit-filtering job descriptions", "Candidate communications", "Competency maps, question banks and scoring rubrics", "Learning paths, manager guides and 30/60/90 milestones", "Exit interviews and departure patterns"], actions: ["Rewrite one job description to filter for fit.", "Build a question bank and rubric for your next hire.", "Analyse your last year of departures for patterns."] },
  { n: 15, part: "Master", title: "Claude for Consulting and Professional Services", keyIdea: "The EXPERT delivery model: deeper pre-call intelligence, hypothesis-driven discovery, methodology-encoded deliverables and productised frameworks.", topics: ["Pre-call research and discovery question banks", "Post-discovery synthesis and the insight gap finder", "Research-to-report chains and methodology-encoded templates", "Methodology extraction and framework naming", "Thought leadership, idea validation and pitch decks"], actions: ["Prepare your next client call with the pre-call brief.", "Extract one method you use into a named framework.", "Turn one engagement's research into a report with the chain."] },
  { n: 16, part: "Sustain", title: "The Ethics and Risks Every Professional Must Know", keyIdea: "Hallucination, outdated information and bias are manageable with a verification protocol, data classification, honest disclosure and a lean policy.", topics: ["The Hallucination Risk Matrix", "The three-step verification protocol", "Data classification for Claude use", "The disclosure decision framework", "The AI error response protocol and client concerns"], actions: ["Classify the data you use with Claude into the framework's categories.", "Adopt the three-step verification protocol for client-facing work.", "Decide your disclosure approach and write the conversation starter."] },
  { n: 17, part: "Sustain", title: "Your 90-Day Claude Mastery Roadmap", keyIdea: "Foundation, then workflow integration, then team deployment: twelve weeks of specific actions with a milestone each month.", topics: ["Month 1: Foundation", "Month 2: Workflow integration", "Month 3: Team deployment", "Milestones and the 90-day impact assessment"], actions: ["Start Week 1 of the roadmap today.", "Start your prompt log.", "Put the three monthly milestones in your calendar."] },
];

export type RoadmapWeek = { w: number; month: 1 | 2 | 3; title: string; actions: string[] };

export const roadmapMonths = [
  { m: 1, title: "Foundation: building the core habits", milestone: "A personal prompt library of at least 20 tested prompts, and measurable time saved in at least three categories of your work." },
  { m: 2, title: "Workflow integration: making Claude systematic", milestone: "Claude integrated into at least five recurring workflows, used automatically rather than as an afterthought." },
  { m: 3, title: "Team deployment: creating organisational advantage", milestone: "Every team member uses Claude for at least three recurring tasks, and a shared prompt library is actively maintained." },
] as const;

export const roadmap: RoadmapWeek[] = [
  { w: 1, month: 1, title: "First contact and orientation", actions: ["Set up your account and spend 20 minutes exploring the interface.", "Try Claude on three low-stakes tasks from this week's work and compare the results to your own.", "Write the same request three ways (vague, moderate, very specific) and note what specificity buys you."] },
  { w: 2, month: 1, title: "Finding your high-value use cases", actions: ["Identify your top three use cases from Week 1.", "Run each through Role, Context, Task, Format and Constraints.", "Add five tested prompts to your prompt log."] },
  { w: 3, month: 1, title: "Developing prompt fluency", actions: ["Develop one substantial task across three or four turns.", "Ask Claude to critique its own output: what's missing, what's weak, what it assumed.", "Use Claude in a domain outside your usual focus to build intuition."] },
  { w: 4, month: 1, title: "Building your personal prompt library", actions: ["Organise your prompt log into a library with a note on when to use each prompt.", "Reach at least 20 tested prompts.", "Choose one daily anchor task and write your Month 1 self-assessment."] },
  { w: 5, month: 2, title: "Mapping your workflow for Claude integration", actions: ["List every task that recurs at least weekly.", "Score each on time taken and how much of it is mechanical.", "Pick your top five integration priorities."] },
  { w: 6, month: 2, title: "Integrating Claude into your communication cycle", actions: ["Run a daily batched email routine with Claude drafting replies.", "Use a standard meeting preparation prompt for every meeting.", "Turn notes into decisions, actions and owners straight after each meeting."] },
  { w: 7, month: 2, title: "Integrating Claude into research and analysis", actions: ["Build your standard research brief prompt and use it on two real tasks.", "Build a source synthesis workflow.", "Apply the Hallucination Risk Matrix to every research output."] },
  { w: 8, month: 2, title: "Building systematic prompt workflows", actions: ["Map your most complex recurring deliverable into stages.", "Build a prompt for each stage and test the chain on a real example.", "Refine the weakest stage and document the workflow."] },
  { w: 9, month: 3, title: "Building your team introduction strategy", actions: ["Choose two or three demonstration cases from Months 1 and 2.", "Prepare an evidence-based team introduction.", "Prepare honest answers on privacy, disclosure, quality and jobs."] },
  { w: 10, month: 3, title: "The team introduction and first shared resources", actions: ["Run the session: results first, then let people try it on real tasks.", "Share a starter library of three to five prompts.", "Set up a shared space for contributions."] },
  { w: 11, month: 3, title: "Building team habits and shared standards", actions: ["Check in one-to-one with each team member.", "Have your strongest early adopter demo a real example.", "Run a 30-minute prompt clinic and agree quality standards."] },
  { w: 12, month: 3, title: "Measuring impact and setting the long-term foundation", actions: ["Run a 90-day impact assessment and total the team's time saved.", "Hold a retrospective and update policy and library.", "Set a quarterly Claude review."] },
];

// Chapter 3's reusable context documents.
export const contextTemplates = [
  {
    id: "professional-brief",
    title: "Professional Brief",
    use: "Paste at the start of any session that needs to know who you are, and load it into every Project.",
    body: `ROLE AND RESPONSIBILITIES
I am [job title] at [company name], a [brief company description].
My primary responsibilities are: [3–5 specific responsibilities].
I am accountable for: [key outcomes or metrics you own].

MY STAKEHOLDERS
I report to: [title].
I work most closely with: [key colleagues and their functions].
My most important external relationships are: [clients, partners, key contacts].

MY PROFESSIONAL CONTEXT
The most important thing happening in my work right now: [current priority].
The decisions I am most often making: [recurring decision types].
The constraints I regularly operate under: [time, resource, political, other].

WHAT GOOD LOOKS LIKE FOR ME
In my role, a high-quality output: [define your standard].
I am judged on: [how your performance is evaluated].
The thing I most need Claude to help me with: [your primary use case].`,
  },
  {
    id: "company-brain",
    title: "Company Brain",
    use: "What a senior colleague knows about your organisation. A briefing, not a data dump: leave out anything confidential.",
    body: `WHAT WE ARE
Company name: [name]
What we do in one sentence: [clear, jargon-free description].
Our size and structure: [headcount, offices, key teams].
How long we have been operating: [age and stage].

WHO WE SERVE
Our primary clients/customers are: [industry, size, type].
Our most important client relationships currently: [names or types].
The problems we solve for them: [specific problems].

OUR POSITION
What makes us different from competitors: [honest differentiator].
Our main competitors are: [names if relevant].
Our competitive strengths: [what we are genuinely best at].
Our honest weaknesses: [what we are not].

OUR CULTURE AND VALUES
The things we genuinely believe in: [real values].
How we make decisions: [centralised, collaborative, data-driven, etc.].
What we are proud of: [genuine achievements].

NON-NEGOTIABLES
Things we never say or do publicly: [specific constraints].
Topics that require special care: [sensitive areas].
Things Claude should always flag rather than assume: [judgment calls].`,
  },
  {
    id: "style-guide",
    title: "Communication Style Guide",
    use: "So drafts sound like you. Fastest start: paste three pieces of your best writing and ask Claude what patterns define your style.",
    body: `MY VOICE (consistent across contexts)
My sentence structure: [short/long/varied].
How I handle complexity: [simplify, layer, or explain as I go].
My relationship with jargon: [use it, avoid it, explain it].
My opening style: [context, conclusion, question, or story].
My closing style: [summary, call to action, open question, or sign-off].
Words and phrases I use often: [5–10 expressions].
Words and phrases I never use: [list].
My attitude toward formality: [default, and when I shift].

MY TONE (shifts by context)
Writing to clients: [tone].
Writing to my team: [tone].
Writing to senior stakeholders: [tone].
Writing in difficult or sensitive situations: [tone].
Writing externally: [tone].

MY STANDARDS
What I always check before sending: [checklist].
Common mistakes I want Claude to help me avoid: [patterns].
Format preferences: [bullets vs prose, length, headers].
Things that make me edit heavily: [what pulls me out of writing].`,
  },
  {
    id: "project-instructions",
    title: "Project Instructions",
    use: "The instructions for a Claude Project, so every conversation in it starts fully briefed.",
    body: `WHAT THIS PROJECT IS FOR
[One clear sentence describing the purpose of this Project.]

WHO I AM
[Paste your Professional Brief, or a condensed version.]

CONTEXT FOR THIS PROJECT
[Client details, ongoing work, relationship history, current priorities, background.]

STANDARDS FOR THIS PROJECT
Tone: [tone for this context].
Format: [preferred output formats].
Length: [typical length].
Audience: [who reads outputs from this Project].

CONSTRAINTS
Never: [things Claude should not do here].
Always flag: [situations where Claude should ask before assuming].
Special considerations: [anything unusual about this Project].`,
  },
];

export const projectTypes = [
  { title: "Client Account", body: "One per major client: background, relationship history, key contacts and their preferences, project status, recurring tasks, sensitivities." },
  { title: "Strategic Thinking", body: "A private space for your most important strategic work: your accountabilities, live strategic questions, and the standard for leadership-ready output." },
  { title: "Content and Communications", body: "All external content: your full Style Guide, brand voice, audiences, platforms and examples of content you rate highly." },
  { title: "Operations", body: "Recurring operational work: the tasks it handles, formats and standards for each, team context and standing reference material." },
  { title: "Research and Analysis", body: "Synthesis and intelligence work: industry context, the analyses you run most, preferred formats, and how to flag uncertainty." },
  { title: "Personal Productivity", body: "Planning, prioritising and reflecting: your goals, routines and the reviews you run each week and month." },
];

// Chapter 7's prompt chains: three walkthroughs and ten blueprints.
export type Chain = { id: string; title: string; input: string; steps: { name: string; prompt?: string }[]; output: string; fromBook: boolean };

export const chains: Chain[] = [
  {
    id: "meeting-notes",
    title: "The Meeting Notes Chain",
    input: "Raw meeting notes, however messy: bullets, stream of consciousness or a voice-memo transcript.",
    steps: [
      { name: "Extract", prompt: "From these meeting notes, extract: (a) every decision made, (b) every action item with the owner if named, and (c) every open question that needs resolution. Present each as a clean bulleted list. Do not add anything not in the notes." },
      { name: "Structure", prompt: "Now format the extracted items into a standard meeting summary with three sections: Decisions Made, Action Items (with owner and any deadline mentioned), and Open Questions. Add a one-sentence meeting objective at the top based on the content." },
      { name: "Polish", prompt: "Review the meeting summary for clarity and completeness. Ensure action items are specific and actionable; if any are vague, make them more precise based on the context of the discussion. Flag any action item where the owner is unclear." },
    ],
    output: "A clean, professional meeting summary ready to distribute, in under three minutes.",
    fromBook: true,
  },
  {
    id: "weekly-status",
    title: "The Weekly Status Report Chain",
    input: "A five-minute brain dump of the week: what happened, what's blocked, what's coming.",
    steps: [
      { name: "Categorise", prompt: "Organise these items into five categories: Completed This Week, In Progress, Blocked (with the specific blocker), Upcoming Next Week, and Risks or Issues. Do not add anything not mentioned. If an item is unclear, note it as needing clarification." },
      { name: "Format", prompt: "Now write a weekly status report using these categorised items. Use the format my team expects: [describe your standard format]. Open with a one-sentence summary of the week's headline achievement or challenge. Keep the total length under 300 words." },
      { name: "Tone check", prompt: "Review the tone of this status report. It should be [describe your preferred tone]. Adjust anything that sounds too negative, too vague, or too casual for a report going to [your audience]." },
    ],
    output: "A polished weekly status report, consistent in format and tone, ready to send.",
    fromBook: true,
  },
  {
    id: "client-onboarding",
    title: "The Client Onboarding Chain",
    input: "The new client's name, company, the service engaged, key contacts and notes from the sales process.",
    steps: [
      { name: "Welcome email", prompt: "Draft a welcome email to [client name] at [company] confirming the engagement for [service]. Reference [specific detail from their situation]. The tone should be warm and professional. Confirm the next step: a kickoff call to be scheduled in the next [X] days." },
      { name: "Onboarding brief", prompt: "Based on the engagement details provided, create an internal onboarding brief covering: client background, project objectives, key contacts and their roles, known sensitivities or preferences from the sales process, and the first three things we need to do. Format as a team brief, not a client document." },
      { name: "Kickoff prep", prompt: "Prepare a kickoff meeting agenda for this engagement. Include: introductions, review of project objectives, working preferences and communication cadence, key milestones and timeline, and questions we need to answer. Keep it to 45 minutes." },
    ],
    output: "A complete onboarding package: welcome email, team brief and kickoff agenda.",
    fromBook: true,
  },
  ...[
    ["competitive-monitoring", "Competitive monitoring brief", "A list of competitors and topics to monitor.", ["Search for recent developments", "Extract significant changes", "Assess implications"], "A weekly intelligence brief."],
    ["client-call-prep", "Client call prep brief", "Client name, call agenda and recent communications.", ["Summarise relationship context", "Extract open items", "Generate discussion points"], "A call prep one-pager with background, agenda and objectives."],
    ["application-screening", "Job application screening", "The job description and applicant CVs.", ["Extract key requirements", "Score each CV against them", "Flag top candidates"], "A structured candidate comparison."],
    ["content-repurposing", "Content repurposing pipeline", "One long-form piece of content.", ["Extract core themes and insights", "Rewrite as a LinkedIn post", "Rewrite as an email newsletter", "Extract five social captions"], "A one-paragraph executive summary plus every format."],
    ["board-report", "Monthly board report", "Raw performance data, team updates and the month's key events.", ["Organise by category", "Apply the EXECUTIVE framework", "Write the narrative around the numbers"], "A board-ready report."],
    ["proposal-draft", "Proposal first draft", "A completed Discovery Brief (Chapter 4).", ["Generate the structure", "Write each section in sequence", "Run the pre-send stress test"], "A first draft with gaps flagged for human review."],
    ["interview-debrief", "Interview debrief", "Interviewer notes from each panel member.", ["Extract assessments by competency", "Identify agreements and disagreements", "Produce a calibration summary"], "A calibration summary with hire / no-hire signals flagged."],
    ["project-kickoff", "Project kickoff documentation", "The project brief and team details.", ["Extract objectives and success metrics", "Map timeline and milestones", "Identify risks and dependencies"], "A project charter."],
    ["complaint-response", "Customer complaint response", "Complaint details and the customer's history.", ["Classify the complaint", "Assess severity and risk", "Draft an acknowledgement", "Draft a resolution response"], "A response, with escalation flagged if needed."],
    ["quarter-review", "End-of-quarter review", "Performance data, team feedback and your notes on the quarter.", ["Assess performance against objectives", "Identify what worked and what didn't", "Extract lessons"], "A review document with forward-looking commitments."],
  ].map(([id, title, input, steps, output]) => ({
    id: id as string,
    title: title as string,
    input: input as string,
    steps: (steps as string[]).map((name) => ({ name })),
    output: output as string,
    fromBook: true,
  })),
];

// The System's own workflows for the newer ways of working with Claude.
export const systemWorkflows: Chain[] = [
  {
    id: "research-to-brief",
    title: "Research → Analyze → Synthesize",
    input: "A question that matters to a decision, and any sources you already have.",
    steps: [
      { name: "Frame", prompt: "Act as a senior research analyst. Before researching, list the five questions this research must answer to support [decision], and what evidence would change the answer." },
      { name: "Research", prompt: "Research these questions using current, reputable sources. For each finding, give the source and its date. Separate established facts from opinion and forecast." },
      { name: "Synthesize", prompt: "Synthesise the findings: where sources agree, where they disagree and why, and the three implications for [decision]. Flag any claim resting on a single source." },
      { name: "Deliver", prompt: "Write a one-page executive brief: the answer first, then the evidence, the uncertainties, and the decision it supports." },
    ],
    output: "A sourced one-page research brief.",
    fromBook: false,
  },
  {
    id: "project-setup",
    title: "Turn a recurring conversation into a Project",
    input: "A kind of work you keep re-explaining to Claude.",
    steps: [
      { name: "Instructions", prompt: "Here is how I work on [type of work]: [notes]. Turn this into Project instructions using: what this Project is for, who I am, context, standards (tone, format, length, audience) and constraints." },
      { name: "Knowledge", prompt: "What reference documents would make answers in this Project better? List them in priority order and say what each one contributes." },
      { name: "Test", prompt: "Here's a real task: [task]. Before answering, tell me which parts of the Project instructions you're relying on and what's missing." },
    ],
    output: "A Project that starts every conversation fully briefed.",
    fromBook: false,
  },
  {
    id: "code-safe-start",
    title: "Claude Code: a safe first build",
    input: "A small, well-defined script or tool you need, and a dedicated project folder.",
    steps: [
      { name: "Spec", prompt: "I want a script that [does what]. Before writing code, write a one-page spec: inputs, outputs, edge cases, and how we'll test it. Ask me anything you need." },
      { name: "Plan", prompt: "Plan the implementation in small steps. Work on copies of any data, and stop after each step so I can check it." },
      { name: "Build and test", prompt: "Implement step 1, run it on the sample data, and show me the result and anything that surprised you." },
      { name: "Document", prompt: "Write a short README: what it does, how to run it, and what it must never be run on." },
    ],
    output: "A working, tested script with a README.",
    fromBook: false,
  },
  {
    id: "cowork-delegation",
    title: "Cowork: delegate a half-day job",
    input: "A multi-step job across files or apps, and a folder Claude may use.",
    steps: [
      { name: "Brief", prompt: "Outcome: [result, for which decision]. Inputs: [files, folders, sites]. Access: [read-only unless stated]. What to produce: [deliverables]. Stop and ask: [when to pause]. Rules: [never estimate; cite sources]. Review page first: what you did, assumptions, flags, the figures to double-check. Done means: [definition]." },
      { name: "Review", prompt: "Show me the review page first. Then list the three items most worth spot-checking and why." },
      { name: "Improve", prompt: "Which decision in this job did you make without guidance from me? Suggest one rule to add to the brief next time." },
    ],
    output: "A finished deliverable you can review in five minutes.",
    fromBook: false,
  },
  {
    id: "design-iterate",
    title: "Design: from idea to visual concept",
    input: "A product, page or campaign idea, plus your brand basics.",
    steps: [
      { name: "Brief", prompt: "Design brief: [what it is], for [audience], whose one job is [goal]. Brand: [colours, type, tone]. Constraints: [size, format, must include]. Propose three distinct directions in one line each before designing." },
      { name: "Create", prompt: "Create direction [n] as a real, editable piece, not a description of one." },
      { name: "Refine", prompt: "Critique it as [the audience]. What's unclear in the first three seconds? Then revise the top two problems." },
    ],
    output: "A polished visual concept, iterated against the brief.",
    fromBook: false,
  },
];

// Prompts for the newer ways of working, alongside the book's library.
export const systemPrompts = [
  {
    category: "Projects and Context",
    prompts: [
      { title: "Build My Professional Brief", prompt: "Interview me to build my Professional Brief. Ask one question at a time about my role, stakeholders, current priorities, and what good looks like in my work. When you have enough, write the brief using the four sections: Role and Responsibilities, My Stakeholders, My Professional Context, What Good Looks Like for Me." },
      { title: "Extract My Writing Style", prompt: "Here are three pieces of my writing that I'm proud of: [paste]. What patterns define my communication style? Describe my sentence structure, openings, closings, vocabulary, formality and the choices I consistently make. Then draft my Communication Style Guide from your analysis." },
    ],
  },
  {
    category: "Claude Code",
    prompts: [
      { title: "Explain This Codebase", prompt: "Explain this codebase to me as a capable non-specialist. What does it do, what are its main parts, how does data flow through it, and which files would I change to [goal]? Don't change anything yet." },
      { title: "Plan Before Building", prompt: "I want to [change]. Before writing any code, give me a step-by-step plan, the files you'll touch, the risks, and how we'll test each step. Wait for my approval." },
    ],
  },
  {
    category: "Cowork and Delegation",
    prompts: [
      { title: "Delegation Brief", prompt: "Turn this job into a full delegation brief: [describe the job]. Include Outcome (for which decision), Inputs, Access (read-only by default), What to produce, Stop and ask, Rules, Review page, and Done means. Ask me only what you can't reasonably infer." },
      { title: "Review Page", prompt: "Before showing me the result, write a one-page review: what you did in five lines, the assumptions you made, anything flagged or not found, and the three items most worth double-checking, with why." },
    ],
  },
  {
    category: "Design",
    prompts: [
      { title: "Three Directions First", prompt: "Before designing [thing], propose three genuinely different directions, each in one line with its main risk. I'll choose one before you build anything." },
      { title: "First-Three-Seconds Critique", prompt: "Look at this as [audience] seeing it for three seconds. What do they notice first, what do they understand, and what do they miss? Then list the two changes that would most improve it." },
    ],
  },
];

export type SimplePrompt = { id: string; category: string; title: string; prompt: string; fromBook: boolean };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** The Claude Prompt Library: the book's Master Prompt Library first, then the System's additions. */
export const claudePrompts: SimplePrompt[] = [
  ...(masterPrompts as { category: string; prompts: { title: string; prompt: string }[] }[]).flatMap((c) =>
    c.prompts.map((p) => ({ id: slug(p.title), category: c.category, title: p.title, prompt: p.prompt, fromBook: true })),
  ),
  ...systemPrompts.flatMap((c) => c.prompts.map((p) => ({ id: slug(p.title), category: c.category, title: p.title, prompt: p.prompt, fromBook: false }))),
];

export const claudePromptCategories = Array.from(new Set(claudePrompts.map((p) => p.category)));
export const claudePromptById = (id: string) => claudePrompts.find((p) => p.id === id);

export const claudeGlossary = glossaryData as [string, string][];
