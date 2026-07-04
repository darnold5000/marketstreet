export interface TeamMember {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  role: "advisor" | "operations" | "support";
  specialties: string[];
  bio: string;
  marketStreetSince: string;
  industrySince: string;
  education?: string;
  certifications?: string;
  featured?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "kevin-ervin",
    name: "Kevin Ervin",
    credentials: "CPA",
    title: "Founder",
    role: "advisor",
    specialties: [
      "Tax Planning",
      "Business Owners",
      "Small Business Retirement Plans",
      "Business Owners Exiting their Business",
    ],
    bio: "Kevin founded Market Street Wealth Management in 2001 with a vision to provide transparent, client-first financial planning. With decades of experience in tax planning and business owner advisory, he helps clients reach their most important life goals.",
    marketStreetSince: "2001",
    industrySince: "1983",
    education: "B.S. Accounting, Ball State University; MBA Finance, Indiana University",
    certifications: "CFP®, CPA",
    featured: true,
  },
  {
    slug: "patrick-roberts",
    name: "Patrick Roberts",
    credentials: "CPA",
    title: "Managing Partner",
    role: "advisor",
    specialties: [
      "Operations and technology",
      "Billing and reporting",
      "Implementing investment plans",
    ],
    bio: "Patrick oversees trading, operations, finances, and technology at Market Street. He brings a unique perspective from his background in technology and back-office operations, ensuring clients receive seamless service.",
    marketStreetSince: "2015",
    industrySince: "2008",
    education: "Franklin College, Accounting",
    certifications: "CPA",
    featured: true,
  },
  {
    slug: "jessica-bokhart",
    name: "Jessica Bokhart",
    credentials: "CFP®",
    title: "Partner, Senior Financial Planner",
    role: "advisor",
    specialties: [
      "Individuals and couples nearing retirement",
      "Widows",
      "Educators",
      "Crawfordsville individuals nearing retirement",
    ],
    bio: "Jessica has been with Market Street since 2006, helping clients navigate retirement transitions with clarity and compassion. She specializes in working with educators and individuals approaching retirement.",
    marketStreetSince: "2006",
    industrySince: "2006",
    education: "Purdue University, BS in Financial Counseling and Planning",
    certifications: "CFP®",
    featured: true,
  },
  {
    slug: "kyle-thompson",
    name: "Kyle Thompson",
    credentials: "CFP®, CPA",
    title: "Partner, Senior Financial Planner, Chief Investment Officer",
    role: "advisor",
    specialties: [
      "Mid-career clients",
      "Retirees",
      "Business owners",
      "Deloitte employees",
    ],
    bio: "Kyle simplifies complex financial situations and helps clients turn long-term dreams into reality. As Chief Investment Officer, he leads Market Street's investment strategy and portfolio management.",
    marketStreetSince: "2015",
    industrySince: "2005",
    education: "Indiana University, B.S. in Accounting and Finance",
    certifications: "CPA, CFP®",
    featured: true,
  },
  {
    slug: "katie-fischer",
    name: "Katie Fischer",
    credentials: "CFP®",
    title: "Partner, Senior Financial Planner, Chief Compliance Officer",
    role: "advisor",
    specialties: [
      "Female household CFOs",
      "Eli Lilly employees or retirees",
      "Single women",
    ],
    bio: "Katie educates clients about their financial situation and helps them navigate life transitions like career changes and retirement. She serves as Chief Compliance Officer, ensuring the highest standards of client care.",
    marketStreetSince: "2013",
    industrySince: "2010",
    education: "Purdue University, B.S. in Financial Counseling and Planning",
    certifications: "CFP®",
    featured: true,
  },
  {
    slug: "aaron-williams",
    name: "Aaron Williams",
    credentials: "CFP®",
    title: "Partner, Senior Financial Planner, Chief People Officer",
    role: "advisor",
    specialties: [
      "Tax analysis",
      "Social Security Optimization",
      "Healthcare subsidy analysis",
      "Cash Flow analysis",
      "Medicare planning",
    ],
    bio: "Aaron specializes in the nuanced details of retirement planning — Social Security optimization, Medicare, and healthcare subsidies. He loves the moment when a complex strategy clicks for a client.",
    marketStreetSince: "2015",
    industrySince: "2012",
    education:
      "Franklin College, BA in Finance and Management, Minors in Accounting and Computer Information Systems",
    certifications: "CFP®",
    featured: true,
  },
  {
    slug: "austin-angel",
    name: "Austin Angel",
    credentials: "CFP®, CDAA™",
    title: "Senior Financial Planner",
    role: "advisor",
    specialties: [
      "Young families with dual incomes",
      "Young physicians",
      "Amazon employees",
    ],
    bio: "Austin empowers clients to take action and see the emotional impact of smart financial decisions — from building dream homes to gaining the confidence to cut back on work hours.",
    marketStreetSince: "2017",
    industrySince: "2017",
    education: "Indiana State University",
    certifications: "CFP®, CDAA™",
    featured: true,
  },
  {
    slug: "adriane-kulczar",
    name: "Adriane Kulczar",
    credentials: "FPQP™",
    title: "Senior Paraplanner",
    role: "support",
    specialties: ["Client service", "Financial planning", "Process and workflow"],
    bio: "Adriane supports advisors and clients with detailed financial planning and exceptional client service.",
    marketStreetSince: "2020",
    industrySince: "2007",
    education: "Indiana University Purdue University Fort Wayne",
  },
  {
    slug: "tori-deleon",
    name: "Tori Deleon",
    credentials: "",
    title: "Paraplanner",
    role: "support",
    specialties: ["Team support", "Improving processes and workflows"],
    bio: "Tori supports the Market Street team with process improvements and workflow optimization.",
    marketStreetSince: "2022",
    industrySince: "2016",
  },
  {
    slug: "brittany-miller",
    name: "Brittany Miller",
    credentials: "",
    title: "Paraplanner",
    role: "support",
    specialties: [
      "Team support",
      "Client Service",
      "Building sound financial plans",
    ],
    bio: "Brittany assists in building sound financial plans and providing detailed client service.",
    marketStreetSince: "2023",
    industrySince: "2016",
    education: "Ivy Tech Community College, Associate of Science in Nursing",
  },
  {
    slug: "latrisha-maxwell",
    name: "Latrisha Maxwell",
    credentials: "",
    title: "Paraplanner",
    role: "support",
    specialties: [
      "Assisting in the building of sound financial plans",
      "Team support",
      "Detailed client service",
    ],
    bio: "Latrisha helps build sound financial plans while providing detailed client service and team support.",
    marketStreetSince: "2024",
    industrySince: "2024",
    education: "Millikin University, B.A. in Communication",
  },
  {
    slug: "doug-oneill",
    name: "Doug O'Neill",
    credentials: "FPQP™",
    title: "Senior Operations, Investment Analyst",
    role: "operations",
    specialties: [
      "Trading",
      "Reporting",
      "Data Reconciliation and Automation",
    ],
    bio: "Doug manages trading, reporting, and data reconciliation, ensuring accurate and efficient investment operations.",
    marketStreetSince: "2021",
    industrySince: "2008",
    education: "Purdue University, BS in Mathematics, minor in Management",
    certifications: "FPQP™",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

export function getFeaturedAdvisors(): TeamMember[] {
  return teamMembers.filter((m) => m.featured);
}
