import type { StepId } from "./funnel";

// Sales-page copy lives here so it can be edited without touching layout code.

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

type OfferCopy = { eyebrow: string; headline: string; lead: string; cta: string; decline: string };

export const offerCopy: Record<StepId, OfferCopy> = {
  "complete-upgrade": {
    eyebrow: "Upgrade to Complete",
    headline: "You have the Book. Now put it into practice.",
    lead: "Complete adds the full implementation system to the Book: 250+ prompt recipes, 100 repeatable Copilot workflows, the template vault, the Prompt Builder and the 30-Day Copilot Transformation. You pay only the difference.",
    cta: "Yes, upgrade to Complete",
    decline: "No thanks, just the Book",
  },
  "pro-upgrade": {
    eyebrow: "Upgrade to Pro",
    headline: "Build your personal Microsoft 365 AI work system.",
    lead: "Pro adds the advanced workflow architecture: email, meeting, research, document, Excel and presentation systems, role-specific systems and the advanced workflow builder. You pay only the difference.",
    cta: "Yes, upgrade to Pro",
    decline: "No thanks, Complete is enough",
  },
  "claude-complete-upgrade": {
    eyebrow: "Upgrade to Complete",
    headline: "You have the Book. Now put Claude to work.",
    lead: "Complete adds the full implementation system to the Book: 250+ advanced prompt recipes, 100+ workflows, the Research, Writing and Analysis systems, the Prompt Builder and the 30-Day Transformation. You pay only the difference.",
    cta: "Yes, upgrade to Complete",
    decline: "No thanks, just the Book",
  },
  "claude-pro-upgrade": {
    eyebrow: "Upgrade to Pro",
    headline: "Build your personal AI operating system.",
    lead: "Pro adds advanced research and project systems, the Claude Code workflow library, agentic workflow architecture and professional role systems, with The Claude Operator. You pay only the difference.",
    cta: "Yes, upgrade to Pro",
    decline: "No thanks, Complete is enough",
  },
};
