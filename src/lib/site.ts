// Site-wide settings. Edit these before going live.
export const site = {
  name: "Kaelis Voss",
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
  seoTitle: "Microsoft Copilot Prompts, Workflows & Templates | The Microsoft Copilot Advantage",
  description:
    "The complete Microsoft 365 Copilot productivity system for professionals: 250+ prompt recipes, 100 repeatable workflows, 30+ templates and a 30-day path across Word, Excel, PowerPoint, Outlook and Teams.",
  disclaimer:
    "Microsoft Copilot, Microsoft 365, Word, Excel, PowerPoint, Outlook, Teams and other Microsoft product names are trademarks of Microsoft Corporation. The Microsoft Copilot Advantage is an independently created educational product and is not affiliated with, sponsored by, or endorsed by Microsoft.",
};
