export interface TeamMember {
  slug: string;
  name: string;
  credentials: string;
  title: string;
  role: "advisor" | "operations" | "support";
  specialties: string[];
  bio: string;
  photo?: string;
  withFirmSince: string;
  industrySince: string;
  education?: string;
  certifications?: string;
  featured?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "jordan-hale",
    name: "Jordan Hale",
    credentials: "CPA",
    title: "Founder",
    role: "advisor",
    specialties: [
      "Tax Planning",
      "Business Owners",
      "Small Business Retirement Plans",
      "Business Owners Exiting their Business",
    ],
    bio: "Jordan founded NorthBridge Wealth in 2004 with a vision to provide transparent, client-first financial planning. With decades of experience in tax planning and business owner advisory, they help clients reach their most important life goals.",
    photo: "/images/team/jordanHale.jpg",
    withFirmSince: "2004",
    industrySince: "1988",
    education: "B.S. Accounting, Indiana University; MBA Finance, Purdue University",
    certifications: "CFP®, CPA",
    featured: true,
  },
  {
    slug: "morgan-ellis",
    name: "Morgan Ellis",
    credentials: "CPA",
    title: "Managing Partner",
    role: "advisor",
    specialties: [
      "Operations and technology",
      "Billing and reporting",
      "Implementing investment plans",
    ],
    bio: "Morgan oversees trading, operations, finances, and technology at NorthBridge. They bring a unique perspective from a background in technology and back-office operations, ensuring clients receive seamless service.",
    photo: "/images/team/morganEllis.jpg",
    withFirmSince: "2014",
    industrySince: "2008",
    education: "Butler University, Accounting",
    certifications: "CPA",
    featured: true,
  },
  {
    slug: "avery-quinn",
    name: "Avery Quinn",
    credentials: "CFP®",
    title: "Partner, Senior Financial Planner",
    role: "advisor",
    specialties: [
      "Individuals and couples nearing retirement",
      "Widows",
      "Educators",
      "Greenwood individuals nearing retirement",
    ],
    bio: "Avery has been with NorthBridge since 2008, helping clients navigate retirement transitions with clarity and compassion. They specialize in working with educators and individuals approaching retirement.",
    photo: "/images/team/averyQuinn.jpg",
    withFirmSince: "2008",
    industrySince: "2008",
    education: "Purdue University, BS in Financial Counseling and Planning",
    certifications: "CFP®",
    featured: true,
  },
  {
    slug: "cameron-blake",
    name: "Cameron Blake",
    credentials: "CFP®, CPA",
    title: "Partner, Senior Financial Planner, Chief Investment Officer",
    role: "advisor",
    specialties: [
      "Mid-career clients",
      "Retirees",
      "Business owners",
      "Corporate professionals",
    ],
    bio: "Cameron simplifies complex financial situations and helps clients turn long-term dreams into reality. As Chief Investment Officer, they lead NorthBridge's investment strategy and portfolio management.",
    photo: "/images/team/cameronBlake.jpg",
    withFirmSince: "2014",
    industrySince: "2006",
    education: "Indiana University, B.S. in Accounting and Finance",
    certifications: "CPA, CFP®",
    featured: true,
  },
  {
    slug: "riley-chen",
    name: "Riley Chen",
    credentials: "CFP®",
    title: "Partner, Senior Financial Planner, Chief Compliance Officer",
    role: "advisor",
    specialties: [
      "Female household CFOs",
      "Corporate employees or retirees",
      "Single women",
    ],
    bio: "Riley educates clients about their financial situation and helps them navigate life transitions like career changes and retirement. They serve as Chief Compliance Officer, ensuring the highest standards of client care.",
    photo: "/images/team/rileyChen.jpg",
    withFirmSince: "2012",
    industrySince: "2009",
    education: "Purdue University, B.S. in Financial Counseling and Planning",
    certifications: "CFP®",
    featured: true,
  },
  {
    slug: "sam-torres",
    name: "Sam Torres",
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
    bio: "Sam specializes in the nuanced details of retirement planning — Social Security optimization, Medicare, and healthcare subsidies. They love the moment when a complex strategy clicks for a client.",
    photo: "/images/team/samTorres.jpg",
    withFirmSince: "2014",
    industrySince: "2011",
    education:
      "Ball State University, BA in Finance and Management, Minors in Accounting and Information Systems",
    certifications: "CFP®",
    featured: true,
  },
  {
    slug: "taylor-brooks",
    name: "Taylor Brooks",
    credentials: "CFP®, CDAA™",
    title: "Senior Financial Planner",
    role: "advisor",
    specialties: [
      "Young families with dual incomes",
      "Young physicians",
      "Tech professionals",
    ],
    bio: "Taylor empowers clients to take action and see the emotional impact of smart financial decisions — from building dream homes to gaining the confidence to cut back on work hours.",
    photo: "/images/team/taylorBrooks.jpg",
    withFirmSince: "2018",
    industrySince: "2018",
    education: "Indiana State University",
    certifications: "CFP®, CDAA™",
    featured: true,
  },
  {
    slug: "casey-nguyen",
    name: "Casey Nguyen",
    credentials: "FPQP™",
    title: "Senior Paraplanner",
    role: "support",
    specialties: ["Client service", "Financial planning", "Process and workflow"],
    bio: "Casey supports advisors and clients with detailed financial planning and exceptional client service.",
    photo: "/images/team/caseyNguyen.jpg",
    withFirmSince: "2019",
    industrySince: "2008",
    education: "Indiana University Purdue University Indianapolis",
  },
  {
    slug: "jamie-patel",
    name: "Jamie Patel",
    credentials: "",
    title: "Paraplanner",
    role: "support",
    specialties: ["Team support", "Improving processes and workflows"],
    bio: "Jamie supports the NorthBridge team with process improvements and workflow optimization.",
    photo: "/images/team/jamiePatel.jpg",
    withFirmSince: "2021",
    industrySince: "2017",
  },
  {
    slug: "alex-rivera",
    name: "Alex Rivera",
    credentials: "",
    title: "Paraplanner",
    role: "support",
    specialties: [
      "Team support",
      "Client Service",
      "Building sound financial plans",
    ],
    bio: "Alex assists in building sound financial plans and providing detailed client service.",
    photo: "/images/team/alexRivera.jpg",
    withFirmSince: "2022",
    industrySince: "2017",
    education: "Ivy Tech Community College, Associate of Science",
  },
  {
    slug: "drew-sullivan",
    name: "Drew Sullivan",
    credentials: "",
    title: "Paraplanner",
    role: "support",
    specialties: [
      "Assisting in the building of sound financial plans",
      "Team support",
      "Detailed client service",
    ],
    bio: "Drew helps build sound financial plans while providing detailed client service and team support.",
    photo: "/images/team/drewSullivan.jpg",
    withFirmSince: "2023",
    industrySince: "2023",
    education: "DePauw University, B.A. in Communication",
  },
  {
    slug: "chris-walker",
    name: "Chris Walker",
    credentials: "FPQP™",
    title: "Senior Operations, Investment Analyst",
    role: "operations",
    specialties: [
      "Trading",
      "Reporting",
      "Data Reconciliation and Automation",
    ],
    bio: "Chris manages trading, reporting, and data reconciliation, ensuring accurate and efficient investment operations.",
    photo: "/images/team/chrisWalker.jpg",
    withFirmSince: "2020",
    industrySince: "2009",
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
