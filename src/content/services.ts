export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  whatItIs: string;
  description: string;
  whoItsFor: string[];
  heroImage?: string;
  faqs: ServiceFAQ[];
  benefits: string[];
}

export const services: Service[] = [
  {
    slug: "wealth-management",
    title: "Wealth Management",
    icon: "chart",
    shortDescription:
      "Live well today. Plan confidently for tomorrow.",
    whatItIs:
      "A coordinated approach to your entire financial life — investments, taxes, estate, and ongoing planning in one relationship.",
    description:
      "Our wealth management strategy starts with getting to know you, your family, and your unique financial journey. We help you make the most of your current assets while planning confidently for your future — without sacrificing one for the other.",
    whoItsFor: [
      "Mid-career professionals with growing assets",
      "Families balancing lifestyle and long-term goals",
      "Pre-retirees preparing for the next chapter",
    ],
    benefits: [
      "Personalized investment strategy aligned with your goals",
      "Continuous portfolio monitoring and rebalancing",
      "Tax-efficient wealth accumulation strategies",
      "Estate and legacy planning coordination",
      "Ongoing financial plan updates as life changes",
    ],
    faqs: [
      {
        question: "What is wealth management?",
        answer:
          "Wealth management is a comprehensive approach to managing your financial life. It combines investment management, financial planning, tax strategy, and ongoing advisory support into one coordinated relationship. At Market Street, wealth management means a personalized plan that evolves with you — not a one-size-fits-all portfolio.",
      },
      {
        question: "Who needs a financial advisor?",
        answer:
          "Anyone navigating complex financial decisions can benefit from a financial advisor. This includes professionals balancing career growth with retirement savings, pre-retirees optimizing Social Security and healthcare, business owners managing both personal and company finances, and families planning for major life transitions.",
      },
      {
        question: "What is fee-only financial planning?",
        answer:
          "Fee-only financial planning means your advisor is compensated exclusively by you — never through commissions, referral fees, or product sales. This eliminates conflicts of interest and ensures every recommendation is made solely in your best interest.",
      },
      {
        question: "What is a fiduciary?",
        answer:
          "A fiduciary is a financial advisor legally obligated to act in your best interest at all times. Market Street advisors are fiduciaries, meaning we always put your financial well-being ahead of our own.",
      },
      {
        question: "How much money should I have before hiring an advisor?",
        answer:
          "There is no universal minimum. Many clients begin working with us during mid-career when financial decisions become more complex. Our Foundations program serves younger professionals, while comprehensive wealth management typically begins when investable assets reach $500,000 or more.",
      },
    ],
  },
  {
    slug: "retirement-planning",
    title: "Retirement Planning",
    icon: "calendar",
    shortDescription:
      "Turn retirement goals into a clear, actionable plan.",
    whatItIs:
      "Strategic planning for Social Security, healthcare, income, and the lifestyle you want in retirement.",
    description:
      "Retirement planning at Market Street goes beyond saving — we help you optimize Social Security, navigate Medicare and healthcare costs, create sustainable income strategies, and plan for the lifestyle you envision.",
    whoItsFor: [
      "Pre-retirees within 10 years of retirement",
      "Recent retirees managing distributions",
      "Couples aligning on retirement timing",
    ],
    benefits: [
      "Social Security optimization strategies",
      "Medicare and healthcare cost planning",
      "Retirement income distribution planning",
      "Tax-efficient withdrawal strategies",
      "Longevity and inflation planning",
    ],
    faqs: [
      {
        question: "How does retirement planning work?",
        answer:
          "Retirement planning starts with defining your ideal retirement lifestyle and timeline. We analyze your current savings, projected income sources, Social Security benefits, and healthcare needs. Then we build a step-by-step plan to bridge any gaps and optimize your strategy for tax efficiency and sustainability.",
      },
      {
        question: "When should I start retirement planning?",
        answer:
          "The earlier, the better — but it's never too late. Starting in your 30s or 40s gives compound growth more time to work. Pre-retirees in their 50s and 60s benefit from focused optimization of Social Security, healthcare, and portfolio transitions.",
      },
      {
        question: "What happens during the first meeting?",
        answer:
          "Your first meeting is complimentary and low-pressure. We'll discuss your goals, current financial situation, and what you're looking for in an advisor. There's no obligation — just an honest conversation about whether Market Street is the right fit for you.",
      },
    ],
  },
  {
    slug: "business-retirement-plans",
    title: "Business Retirement Plans",
    icon: "building",
    shortDescription:
      "Retirement plans that attract and retain great people.",
    whatItIs:
      "Custom 401(k) and qualified plan design for business owners who want strong benefits without the complexity.",
    description:
      "As a business owner, you're the expert in your business. At Market Street, we have expertise in business retirement plans. We work together to craft well-designed, customized plans that are part of a compelling benefits package for your team.",
    whoItsFor: [
      "Small business owners",
      "Growing companies adding benefits",
      "Owners optimizing their own retirement",
    ],
    benefits: [
      "401(k) plan design and administration guidance",
      "Employee benefit package optimization",
      "Owner-specific retirement strategies",
      "Compliance and fiduciary support",
      "Integration with personal financial planning",
    ],
    faqs: [
      {
        question: "What types of business retirement plans do you offer?",
        answer:
          "We help business owners evaluate and implement 401(k) plans, SEP IRAs, SIMPLE IRAs, and other qualified retirement plans. The right plan depends on your business size, employee demographics, and owner compensation goals.",
      },
      {
        question: "Can you help with an existing retirement plan?",
        answer:
          "Yes. We review existing plans for cost efficiency, investment options, and fiduciary compliance. Many business owners discover opportunities to improve their plan while reducing administrative burden.",
      },
    ],
  },
  {
    slug: "foundations",
    title: "Foundations",
    icon: "seedling",
    shortDescription:
      "Start strong. Build habits that compound.",
    whatItIs:
      "Approachable financial planning for young professionals building their first real wealth strategy.",
    description:
      "Are you an ambitious young professional with a big vision for your future? Market Street's Foundations program helps you forge the path to a strong financial future. Financial planning can be intimidating — that's why we keep it simple with a plan you can understand and trust.",
    whoItsFor: [
      "Young professionals in their 20s and 30s",
      "Dual-income households getting started",
      "First-time investors seeking guidance",
    ],
    benefits: [
      "Cash flow management and budgeting",
      "Retirement savings strategy",
      "First investment guidance",
      "Student loan and debt optimization",
      "Foundation for long-term wealth building",
    ],
    faqs: [
      {
        question: "Who is the Foundations program for?",
        answer:
          "Foundations is designed for ambitious young professionals — typically in their 20s and 30s — who want to build strong financial habits early. Whether you're navigating your first job, managing student loans, or starting to invest, Foundations provides approachable, actionable guidance.",
      },
      {
        question: "How is Foundations different from full wealth management?",
        answer:
          "Foundations focuses on the fundamentals: cash flow, saving, and getting started with investing. It's a streamlined service at an accessible price point, designed to grow with you as your financial life becomes more complex.",
      },
    ],
  },
  {
    slug: "investment-management",
    title: "Investment Management",
    icon: "trending",
    shortDescription:
      "Evidence-based portfolios. No commissions. Ever.",
    whatItIs:
      "Disciplined, fee-only portfolio management integrated with your complete financial plan.",
    description:
      "Our investment management approach is integrated with your comprehensive financial plan. With continuous fund monitoring and a fee-only structure, you can feel confident your advisors are working exclusively for you and your best interests.",
    whoItsFor: [
      "Investors seeking a coordinated strategy",
      "Clients with assets across multiple accounts",
      "Anyone tired of commission-driven advice",
    ],
    benefits: [
      "Evidence-based portfolio construction",
      "Continuous monitoring and rebalancing",
      "Tax-loss harvesting and optimization",
      "Transparent, fee-only compensation",
      "Coordination with your overall financial plan",
    ],
    faqs: [
      {
        question: "What is your investment philosophy?",
        answer:
          "We believe in disciplined, long-term investing grounded in evidence-based research. Our portfolios are designed for diversification, tax efficiency, and alignment with each client's unique goals and risk tolerance — not market timing or speculative strategies.",
      },
      {
        question: "Do you receive commissions on investments?",
        answer:
          "No. Market Street is a fee-only firm. We never receive commissions, referral fees, or compensation from any financial institution. Our only compensation comes directly from our clients.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
