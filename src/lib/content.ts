import type { StepId } from "./funnel";
import { site } from "./site";

// Sales-page copy lives here so it can be edited without touching layout code.

export const apps = [
  { name: "Word", verb: "Write smarter", body: "Draft, rewrite and summarise documents in your own voice, from a blank page to a polished report.", icon: "doc", color: "#2F6BFF" },
  { name: "Excel", verb: "Analyze deeper", body: "Ask questions of your data in plain English, build formulas, and spot trends without being a spreadsheet expert.", icon: "grid", color: "#10B981" },
  { name: "Outlook", verb: "Stay ahead", body: "Triage your inbox, summarise long threads and write clear replies in a fraction of the time.", icon: "mail", color: "#0EA5E9" },
  { name: "PowerPoint", verb: "Present impactfully", body: "Turn a document or an idea into a structured deck, then refine the story slide by slide.", icon: "slides", color: "#F97316" },
  { name: "Teams", verb: "Collaborate better", body: "Catch up on meetings you missed, capture decisions and action items, and follow up automatically.", icon: "chat", color: "#6366F1" },
  { name: "Pages", verb: "Turn ideas into work", body: "Take Copilot answers out of the chat and shape them into shareable, editable pages.", icon: "pages", color: "#8B5CF6" },
  { name: "OneNote", verb: "Capture everything", body: "Organise messy notes, generate to-do lists and turn rough ideas into clear plans.", icon: "notebook", color: "#A855F7" },
  { name: "Loop", verb: "Plan and create together", body: "Co-create plans, trackers and briefs with your team in shared, always-up-to-date workspaces.", icon: "loop", color: "#EC4899" },
  { name: "Copilot Studio", verb: "Build custom agents", body: "Create your own AI assistants for repeat tasks, with no coding background needed.", icon: "bot", color: "#14B8A6" },
] as const;

export const pains = [
  { title: "The blank-box problem", body: "You open Copilot, type something vague, and get something vague back. Two tries later, you decide it's a toy." },
  { title: "Nine apps, nine ways to work", body: "Copilot behaves differently in Word, Excel, Outlook and Teams. Nobody showed you how each one actually works." },
  { title: "Polished answers you can't trust", body: "Wrong answers arrive in the same confident prose as right ones. Without a method, you can't tell which is which." },
];

// Published findings the book itself cites (Part 1). Keep the sources attached.
export const research = [
  { value: "25%", label: "faster", detail: "and 12% more tasks completed", source: "Harvard, Wharton & MIT study of 758 BCG consultants" },
  { value: "40%", label: "higher quality", detail: "on work suited to AI", source: "Same study (2023)" },
  { value: "~3 hrs", label: "saved per person, per week", detail: "in a documented company rollout", source: "Vodafone, company-reported" },
];

export type ToolkitItem = { icon: "book" | "sparkle" | "loop" | "clock" | "bot" | "shield" | "chart" | "download"; title: string; body: string; where: string; tags?: string[] };

// Everything that ships inside the book, grouped as a toolkit.
export const toolkit: ToolkitItem[] = [
  { icon: "book", title: "The Copilot Playbook", body: "39 step-by-step chapters across 17 parts, from your very first prompt to your own custom agents.", where: "Parts 1–14", tags: ["9 apps", "Beginner → Power user"] },
  { icon: "sparkle", title: "The Prompt Library", body: "Every prompt in the book, organised by the work you're doing, each with what it's for and its expert upgrade.", where: "Part 15", tags: ["Brief", "Extract", "Draft", "Transform", "Analyze", "Critique"] },
  { icon: "loop", title: "The Workflow & Loop Library", body: "Complete, repeatable workflows for real business scenarios, with the human decision point marked in each.", where: "Part 16", tags: ["Intake", "Assembly", "Review", "Monitor"] },
  { icon: "clock", title: "The 90-Day Mastery Plan", body: "A week-by-week plan that builds one habit at a time, so it sticks.", where: "Part 17", tags: ["Foundations", "Habits", "Systems"] },
  { icon: "bot", title: "Agent Builder's Guide", body: "When an agent is worth building, how to ship one that survives real users, and how to give it hands safely.", where: "Part 11" },
  { icon: "shield", title: "Safety & Governance Playbook", body: "Use Copilot safely, write a working AI policy, and catch the error before it reaches the client.", where: "Part 14" },
  { icon: "chart", title: "Business Case & IT Kit", body: "Work out whether the licence pays for itself, and get IT to say yes to what you need.", where: "Part 2" },
  { icon: "download", title: "Companion Resources", body: "Templates, prompts and practice files so you can try every technique as you read.", where: "Bonus" },
];

// The fixed structure every chapter follows (see Chapter 1 in "Look inside").
export const anatomy = [
  { label: "At a glance", body: "Read time, level, which apps, and what to read first." },
  { label: "Time saved", body: "The concrete wins the chapter delivers." },
  { label: "Key idea", body: "The one principle to remember, in a sentence." },
  { label: "Why this matters", body: "Real cases and research, not hype." },
  { label: "Step-by-step method", body: "The workflow, prompts and frameworks to do it yourself." },
  { label: "Case in point", body: "How a real organisation applied it." },
  { label: "Common mistakes", body: "The traps that waste time, and how to avoid them." },
  { label: "Do this next", body: "One action for tomorrow, so it turns into a habit." },
];

export const audience = [
  { title: "Beginners", body: "You have Copilot but haven't used it much. Start from the basics, without jargon." },
  { title: "Busy professionals", body: "You want results this week. Jump straight to the app and task you need." },
  { title: "Managers and team leads", body: "Roll out Copilot across your team with shared workflows that everyone can follow." },
  { title: "Freelancers and small business owners", body: "Do the work of a bigger team: proposals, analysis, client emails and more." },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Video file, e.g. "/testimonials/priya.mp4" (in public/testimonials) or a hosted URL. */
  videoSrc: string;
  /** Optional still image shown before playing. Without one, the video's first frame is used. */
  poster?: string;
};

/** Once this many reader videos are added, the site shows them instead of the early reader program. */
export const REQUIRED_TESTIMONIALS = 3;

// Add real reader videos here as they come in. Only use reviews from real
// readers who have agreed to be featured.
export const testimonials: Testimonial[] = [];

export const faqs = [
  {
    q: "What exactly do I get?",
    a: "The complete ebook (PDF): 39 chapters across 17 parts covering all 9 Copilot apps, plus the Prompt Library, the Workflow & Loop Library, the 90-Day Mastery Plan and the companion resources (templates, prompts and practice files).",
  },
  {
    q: "Do I need a Copilot subscription to use this book?",
    a: "To follow along hands-on you'll need access to Copilot in Microsoft 365, through a work or school Microsoft 365 Copilot licence or a personal plan that includes Copilot. Chapter 4 shows you exactly which Copilot you have and what it can do.",
  },
  {
    q: "I've never used AI tools before. Is this too advanced?",
    a: "No. Every chapter is labelled Beginner, Intermediate, Advanced or Power User, so you can start at the beginning and move up at your own pace. The 90-Day Plan tells you what to learn each week.",
  },
  {
    q: "How long does it take to read?",
    a: "Most chapters take 6–8 minutes, about 4½ hours for the whole core. The Prompt and Workflow Libraries are references you open whenever you need them.",
  },
  {
    q: "Copilot changes every month. Will this go out of date?",
    a: "The book teaches durable methods (how to brief, verify, and build workflows) rather than button locations, and its final chapter gives you a practice for staying current as features change.",
  },
  {
    q: "How do I receive it?",
    a: "Instantly. You can download the PDF on the confirmation page right after payment, and we email you a link so you can download it again any time.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Payments are processed securely by Razorpay. In India you can pay with UPI, cards, net banking or wallets. International buyers can pay by card.",
  },
  {
    q: "What if it isn't right for me?",
    a: `You're covered by a ${site.guaranteeDays}-day money-back guarantee. If it doesn't help you, email us within ${site.guaranteeDays} days for a full refund.`,
  },
  {
    q: "Is this an official Microsoft product?",
    a: "No. This is an independent guide written by Kaelis Voss. It is not affiliated with or endorsed by Microsoft.",
  },
];

type OfferCopy = { eyebrow: string; headline: string; lead: string; cta: string; decline: string };

export const offerCopy: Record<StepId, OfferCopy> = {
  masterclass: {
    eyebrow: "One-time offer for new readers",
    headline: "Your book is ready. Want to watch every workflow done live?",
    lead: "The Masterclass turns each chapter into short screen-recorded lessons, so you can watch Copilot work in real time and copy it step by step.",
    cta: "Yes, add the Masterclass",
    decline: "No thanks, I'll learn from the book alone",
  },
  "masterclass-essentials": {
    eyebrow: "Wait: a lighter option",
    headline: "Just want the apps you use every day?",
    lead: "Masterclass Essentials covers the three apps people use most at work: Outlook, Excel and Teams. Same lessons and practice files, at half the price.",
    cta: "Yes, add Masterclass Essentials",
    decline: "No thanks, continue",
  },
  "agent-kit": {
    eyebrow: "Last offer before your download",
    headline: "Build your own AI assistants in Copilot Studio",
    lead: "Ten ready-to-build agents for real business tasks, each with a step-by-step build video. Set them up once and let them handle the repeat work.",
    cta: "Yes, add the Agent Kit",
    decline: "No thanks, take me to my book",
  },
  "agent-blueprints": {
    eyebrow: "Before you go",
    headline: "Get the 10 agent templates, without the videos",
    lead: "Agent Blueprints gives you all ten templates from the Agent Kit as a PDF with written build steps, for a fraction of the price.",
    cta: "Yes, add Agent Blueprints",
    decline: "No thanks, take me to my book",
  },
};
