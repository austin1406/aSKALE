/**
 * Every piece of brand and business info lives here.
 * Pages read from this file; never hardcode the name, prices or contact details elsewhere.
 * When the brand name and domain are decided, change them here and the whole site updates.
 */
export const site = {
  name: "Askale",
  shortName: "Askale",
  url: "https://example.com", // TODO: real domain once bought on Porkbun
  tagline: "Websites and simple automations for local businesses",
  motto: "Ask. Then scale.",
  description:
    "Fast, mobile-friendly websites and time-saving automations for local businesses in Richardson and Irving, TX. Fixed prices, no long contracts.",
  owner: "Austin",
  email: "hello@example.com", // TODO: real inbox (Porkbun email forwarding)
  bookingUrl: "/contact", // TODO: Cal.com link for 30-minute audit calls
  areaServed: ["Richardson, TX", "Irving, TX", "Dallas–Fort Worth"],
  pricing: [
    {
      id: "website",
      name: "Website",
      setup: 500,
      monthly: 50,
      blurb: "A fast, modern site that turns visitors into calls and bookings.",
      features: [
        "Up to 5 pages, built for phones first",
        "Contact or quote form that emails you",
        "Google-friendly setup: speed, local SEO, business schema",
        "Hosting, security updates and uptime monitoring",
        "Small text and photo changes each month",
      ],
    },
    {
      id: "website-automations",
      name: "Website + automations",
      setup: 750,
      monthly: 100,
      blurb: "Everything in Website, plus automations that save you hours each week.",
      featured: true,
      features: [
        "Everything in Website",
        "Online booking with automatic reminders",
        "Missed-call text-back and instant lead follow-up",
        "Review requests after each job",
        "AI chat that answers your common questions",
        "A short monthly report: leads, bookings, reviews",
      ],
    },
  ],
} as const;

export type Site = typeof site;
