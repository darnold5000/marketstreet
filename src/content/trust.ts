export const trustBadges = [
  {
    id: "fee-only",
    label: "Fee-Only",
    description: "Compensated exclusively by clients — never commissions",
    icon: "/images/badges/fee-only.png",
  },
  {
    id: "fiduciary",
    label: "Fiduciary",
    description: "Legally obligated to act in your best interest",
    icon: "/images/badges/shield.png",
  },
  {
    id: "cfp",
    label: "CFP® Professionals",
    description: "Certified Financial Planners on every advisory team",
    icon: "/images/badges/cfp.png",
  },
  {
    id: "experience",
    label: "25+ Years",
    description: "Serving Indiana families since 2001",
    icon: "/images/badges/trust.png",
  },
];

export const professionalAssociations = [
  { name: "Certified Financial Planner Board", abbr: "CFP Board" },
  { name: "National Association of Personal Financial Advisors", abbr: "NAPFA" },
  { name: "Financial Planning Association", abbr: "FPA" },
  { name: "American Institute of CPAs", abbr: "AICPA" },
];

export const firstMeetingSteps = [
  {
    step: 1,
    title: "A Warm Introduction",
    duration: "10 minutes",
    description:
      "We'll get to know each other in a relaxed, no-pressure conversation. Share what's on your mind — there are no wrong questions.",
  },
  {
    step: 2,
    title: "Understanding Your Goals",
    duration: "15 minutes",
    description:
      "We'll discuss your financial priorities, life stage, and what you're hoping to achieve — whether that's retirement confidence, tax optimization, or building wealth.",
  },
  {
    step: 3,
    title: "Your Financial Snapshot",
    duration: "10 minutes",
    description:
      "At a high level, we'll review your current financial picture — income, savings, investments, and any immediate concerns.",
  },
  {
    step: 4,
    title: "How We Can Help",
    duration: "10 minutes",
    description:
      "We'll explain our fee-only, fiduciary approach and how Market Street's services align with your needs. No sales pitch — just honest guidance.",
  },
  {
    step: 5,
    title: "Next Steps",
    duration: "5 minutes",
    description:
      "If we're a good fit, we'll outline next steps. If not, we'll point you in the right direction. Either way, you'll leave with clarity.",
  },
];

export const fiduciaryExplanation = {
  title: "What Is a Fiduciary Financial Advisor?",
  summary:
    "A fiduciary is legally required to put your interests first — always. At Market Street, every recommendation we make is guided by what's best for you, not what's best for us.",
  sections: [
    {
      heading: "The Fiduciary Standard",
      content:
        "When you work with a fiduciary financial advisor, you have a legal guarantee that your advisor will act in your best interest at all times. This is the highest standard of care in the financial services industry. Fiduciaries must disclose conflicts of interest, provide full transparency about fees, and recommend strategies that serve your goals — not theirs.",
    },
    {
      heading: "Why It Matters",
      content:
        "Not all financial professionals are fiduciaries. Some operate under a 'suitability' standard, which only requires recommendations to be suitable — not necessarily optimal — for your situation. This distinction can cost you thousands over a lifetime through unnecessary fees, suboptimal products, and conflicts of interest.",
    },
    {
      heading: "Market Street's Commitment",
      content:
        "As a registered investment adviser, Market Street Wealth Management is held to the fiduciary standard. Combined with our fee-only compensation model, you can trust that every piece of advice we provide is designed solely to help you achieve your financial goals.",
    },
  ],
  faqs: [
    {
      question: "Are all financial advisors fiduciaries?",
      answer:
        "No. Only registered investment advisers (RIAs) and certain other professionals are held to the fiduciary standard. Broker-dealers and insurance agents typically operate under a lower suitability standard.",
    },
    {
      question: "How do I verify my advisor is a fiduciary?",
      answer:
        "Ask directly, check their Form ADV on the SEC's IAPD website at adviserinfo.sec.gov, and confirm they are fee-only with no commission-based compensation.",
    },
  ],
};

export const feeOnlyExplanation = {
  title: "What Is Fee-Only Financial Planning?",
  summary:
    "Fee-only means your advisor is paid exclusively by you — never through commissions, referral fees, or product sales. This eliminates conflicts of interest and ensures transparent, objective advice.",
  sections: [
    {
      heading: "How Fee-Only Works",
      content:
        "With fee-only financial planning, you pay your advisor directly — typically as a percentage of assets under management or a flat planning fee. Your advisor receives no compensation from mutual fund companies, insurance providers, or any other third party. This means every recommendation is made because it's right for you, not because it generates a commission.",
    },
    {
      heading: "Fee-Only vs. Fee-Based",
      content:
        "Don't confuse 'fee-only' with 'fee-based.' Fee-based advisors charge client fees but may also accept commissions on product sales. Fee-only advisors never accept commissions. This is a critical distinction that directly impacts the quality and objectivity of the advice you receive.",
    },
    {
      heading: "Market Street's Transparent Fees",
      content:
        "Our fee structure is clear and simple, based on your portfolio value as a Market Street client. Since we're paid exclusively by you, you can know with confidence that we're on your team. Our advisors don't receive payment from any financial institutions or third parties, so we'll never sell you a service or product you don't need.",
    },
  ],
  faqs: [
    {
      question: "What does fee-only mean in practice?",
      answer:
        "It means your advisor's only source of income is the fee you pay them. They have no incentive to recommend expensive products, unnecessary transactions, or strategies that benefit third parties.",
    },
    {
      question: "Is fee-only more expensive?",
      answer:
        "Often, fee-only is less expensive overall because you avoid hidden commissions embedded in products. Total cost of ownership — including fees, taxes, and product costs — is typically lower with fee-only advice.",
    },
  ],
};
