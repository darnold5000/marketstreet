export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navigation = {
  main: [
    {
      label: "Who We Are",
      href: "/about",
      children: [
        { label: "About", href: "/about" },
        { label: "Meet the Team", href: "/team" },
        { label: "Our Fees", href: "/fees" },
      ],
    },
    {
      label: "Services",
      href: "/services/wealth-management",
      children: [
        { label: "Wealth Management", href: "/services/wealth-management" },
        { label: "Retirement Planning", href: "/services/retirement-planning" },
        {
          label: "Business Retirement Plans",
          href: "/services/business-retirement-plans",
        },
        { label: "Foundations", href: "/services/foundations" },
        {
          label: "Investment Management",
          href: "/services/investment-management",
        },
      ],
    },
    {
      label: "Resources",
      href: "/resources/blog",
      children: [
        { label: "Blog", href: "/resources/blog" },
        { label: "FAQ", href: "/resources/faq" },
        { label: "Educational Guides", href: "/resources/guides" },
        { label: "Financial Answers", href: "/answers" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
};

export function isNavPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.children?.some((child) => isNavPathActive(pathname, child.href))) {
    return true;
  }
  return isNavPathActive(pathname, item.href);
}
