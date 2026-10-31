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
  "toolkit-upgrade": {
    eyebrow: "One-time offer for book buyers",
    headline: "You have the book. Want the system that puts it to work?",
    lead: "The Toolkit gives you the 250+ prompt recipes, 100 workflows, templates and 30-day path, ready to use. Add it now for less than its regular price.",
    cta: "Yes, add the Toolkit",
    decline: "No thanks, just the book",
  },
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
