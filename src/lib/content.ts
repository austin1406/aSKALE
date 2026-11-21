/** Shared marketing copy used across the home page and its dedicated sub-pages. */

export const steps = [
  {
    mark: "Ask",
    when: "Day 0",
    title: "Free audit call",
    body: "30 minutes on how customers find you and what eats your week. You leave with a list of quick wins.",
  },
  {
    mark: "Plan",
    when: "Day 1",
    title: "One-page proposal",
    body: "What I'll build, what changes for you, a fixed price and a date. No hourly billing.",
  },
  {
    mark: "Build",
    when: "Week 1–2",
    title: "Build and review",
    body: "A live preview link you can click through, with two rounds of changes before anything goes live.",
  },
  {
    mark: "Scale",
    when: "Ongoing",
    title: "Launch and look after it",
    body: "Your domain connected, a short walkthrough video, then monthly updates, monitoring and small changes.",
  },
] as const;

export const faqs = [
  {
    q: "Why are your prices so low?",
    a: "I'm a computer science student building a portfolio of real local work. The lower price is a trade: if you're happy, I ask for a testimonial and a Google review.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "Hosting, security and software updates, uptime monitoring, small text and photo changes, and keeping any automations running.",
  },
  {
    q: "Who owns the website?",
    a: "You do. The domain, content and data are in your name. The monthly service can be cancelled with 30 days' notice.",
  },
  {
    q: "How long does it take?",
    a: "Most websites go live in one to two weeks once I have your content and photos. Each automation adds a few days.",
  },
  {
    q: "Do I need to be good with tech?",
    a: "No. I set everything up, record a short walkthrough, and you can text me for small changes.",
  },
  {
    q: "I already have a website. Can you just add automations?",
    a: "Often, yes. On the audit call we'll look at what you have and whether it's worth keeping.",
  },
] as const;
