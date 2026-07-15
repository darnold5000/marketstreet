export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  {
    category: "General",
    question: "What is fee-only financial planning?",
    answer:
      "Fee-only financial planning means your advisor is paid exclusively by you — not through commissions, referral fees, or product sales. At NorthBridge, this ensures every recommendation is made solely in your best interest, with no hidden agendas.",
  },
  {
    category: "General",
    question: "What is a fiduciary financial advisor?",
    answer:
      "A fiduciary financial advisor is legally required to act in your best interest at all times. NorthBridge advisors are fiduciaries, which means we always prioritize your financial well-being over our own.",
  },
  {
    category: "General",
    question: "How much money do I need to work with NorthBridge?",
    answer:
      "We serve clients at various stages. Our Foundations program is designed for young professionals getting started. Comprehensive wealth management typically begins when investable assets reach $500,000 or more. We recommend scheduling a complimentary consultation to discuss your specific situation.",
  },
  {
    category: "Getting Started",
    question: "What happens during the first meeting?",
    answer:
      "Your first meeting is complimentary and no-obligation. We'll discuss your financial goals, current situation, and what you're looking for in an advisor. It's a low-stress conversation designed to help you determine if NorthBridge is the right fit.",
  },
  {
    category: "Getting Started",
    question: "How do I schedule a consultation?",
    answer:
      "You can schedule a complimentary consultation through our website, call either of our offices, or fill out our contact form. We'll match you with an advisor whose expertise aligns with your needs.",
  },
  {
    category: "Services",
    question: "What services does NorthBridge offer?",
    answer:
      "We offer comprehensive wealth management, retirement planning, business retirement plans, investment management, and our Foundations program for young professionals. All services are delivered through a fee-only, fiduciary advisory relationship.",
  },
  {
    category: "Services",
    question: "Do you work with clients outside of Indiana?",
    answer:
      "Yes. While we have offices in Carmel and Greenwood, Indiana, we serve clients nationwide through virtual meetings and secure digital tools.",
  },
  {
    category: "Fees",
    question: "How are your fees structured?",
    answer:
      "Our fee structure is transparent and based on your portfolio value as a NorthBridge client. Since we're paid exclusively by you, you can know with confidence that we're on your team. Our advisors don't receive payment from any financial institutions or third parties.",
  },
  {
    category: "Fees",
    question: "Do you sell financial products or earn commissions?",
    answer:
      "No. NorthBridge is a fee-only firm. We never sell financial products for commission or receive referral fees from third parties. This eliminates conflicts of interest in our advice.",
  },
  {
    category: "About Us",
    question: "How long has NorthBridge been in business?",
    answer:
      "NorthBridge Wealth was founded in 2004 by Jordan Hale. For over 20 years, we've been serving families and professionals across Indiana and nationwide.",
  },
  {
    category: "About Us",
    question: "What certifications do your advisors hold?",
    answer:
      "Our team includes Certified Financial Planners (CFP®), Certified Public Accountants (CPA), and other qualified financial professionals. Many advisors hold multiple credentials, bringing diverse expertise to client relationships.",
  },
];

export function getFAQsByCategory(): Record<string, FAQItem[]> {
  return faqItems.reduce<Record<string, FAQItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}
