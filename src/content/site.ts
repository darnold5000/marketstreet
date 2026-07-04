export const siteConfig = {
  name: "Market Street Wealth Management",
  legalName: "Market Street Wealth Management Advisors, LLC",
  tagline: "Fee-Only Fiduciary Financial Planning",
  description:
    "Market Street Wealth Management delivers clear, actionable financial planning for young and seasoned professionals. Fee-only, fiduciary advisors serving Indiana and clients nationwide.",
  url: "https://mswma.com",
  foundedYear: 2001,
  email: "info@mswma.com",
  scheduleUrl: "/schedule",
  social: {
    linkedin: "https://www.linkedin.com/company/market-street-wealth-management",
    facebook: "https://www.facebook.com/mswma",
  },
  trustIndicators: [
    { label: "Years in Business", value: "25+" },
    { label: "Fee-Only", value: "Always" },
    { label: "Fiduciary", value: "100%" },
    { label: "Office Locations", value: "2" },
    { label: "Client Reach", value: "Nationwide" },
  ],
  whoWeHelp: [
    {
      title: "Young Professionals",
      description:
        "Building your career, managing cash flow, and establishing a foundation for long-term wealth.",
    },
    {
      title: "Mid-Career Professionals",
      description:
        "Balancing today's lifestyle with retirement savings, tax planning, and investment growth.",
    },
    {
      title: "Pre-Retirees",
      description:
        "Optimizing Social Security, healthcare, and portfolio transitions as retirement approaches.",
    },
    {
      title: "Retirees",
      description:
        "Creating sustainable income, managing distributions, and preserving wealth for the next generation.",
    },
    {
      title: "Business Owners",
      description:
        "Designing retirement plans, managing business exits, and aligning personal and business finances.",
    },
    {
      title: "Foundations Clients",
      description:
        "Ambitious professionals starting their financial journey with clear, approachable guidance.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discover",
      description:
        "We start with a complimentary conversation to understand your goals, values, and financial picture.",
    },
    {
      step: "02",
      title: "Plan",
      description:
        "We build a personalized, actionable financial plan tailored to your unique situation and priorities.",
    },
    {
      step: "03",
      title: "Implement",
      description:
        "We help you execute your plan with clear recommendations and ongoing portfolio monitoring.",
    },
    {
      step: "04",
      title: "Partner",
      description:
        "We stay by your side through life changes, market shifts, and every stage of your journey.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
