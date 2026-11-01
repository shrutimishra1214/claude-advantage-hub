// Site-wide settings. Edit these before going live.
export const site = {
  name: "Kaelis Voss",
  tagline: "Practical AI Systems for Serious Work.",
  brandTitle: "Kaelis Voss | Practical AI Systems for Serious Work",
  brandDescription: "Practical AI guides, workflows, and productivity systems for professionals using Microsoft Copilot, Claude, and modern AI tools.",
  productName: "The Microsoft Copilot Advantage",
  descriptor: "The Complete Microsoft 365 AI Productivity System",
  bookTitle: "The Microsoft Copilot Advantage",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with a real inbox before launch.
  contactEmail: "hello@kaelisvoss.com",
  // TODO: confirm the refund window you want to offer.
  guaranteeDays: 14,
  // Everyone pays in USD through Paddle. Set to true to charge visitors in India
  // in INR through Razorpay instead (needs the RAZORPAY_* keys).
  inrForIndia: false,
  // The Copilot product page.
  seoTitle: "The Microsoft Copilot Advantage™ | Microsoft 365 AI Productivity System",
  description:
    "A Microsoft 365 AI productivity system for professionals: Copilot prompts, repeatable Copilot workflows, templates and a 30-day path across Word, Excel, PowerPoint, Outlook and Teams.",
};
