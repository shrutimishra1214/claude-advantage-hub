// Site-wide settings. Edit these before going live.
export const site = {
  name: "Kaelis Voss",
  bookTitle: "The Microsoft Copilot Advantage",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO: replace with a real inbox before launch.
  contactEmail: "hello@kaelisvoss.com",
  // TODO: confirm the refund window you want to offer.
  guaranteeDays: 14,
  description:
    "A practical guide for beginners and busy professionals to master Microsoft 365 Copilot across Word, Excel, Outlook, PowerPoint, Teams, Pages, OneNote, Loop and Copilot Studio.",
  disclaimer:
    "Kaelis Voss is an independent publisher and is not affiliated with, sponsored by, or endorsed by Microsoft Corporation. Microsoft, Microsoft 365 and Copilot are trademarks of the Microsoft group of companies.",
};
