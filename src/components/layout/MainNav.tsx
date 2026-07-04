"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import {
  ClientLoginMobileSection,
} from "@/components/layout/ClientLogin";
import {
  navigation,
  isNavItemActive,
  isNavPathActive,
  type NavItem,
} from "@/components/layout/navigation";

const navLinkBase =
  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const navLinkDefault = `${navLinkBase} text-foreground/80 hover:bg-cream hover:text-navy`;
const navLinkActive = `${navLinkBase} bg-cream text-navy`;

function DesktopNavItem({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const active = isNavItemActive(pathname, item);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={active ? navLinkActive : navLinkDefault}
        aria-current={active ? "page" : undefined}
        onMouseEnter={onClose}
        onFocus={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onFocusCapture={onOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 ${active || isOpen ? navLinkActive : navLinkDefault}`}
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {item.label}
        <Icon name="chevron-down" size={14} className="opacity-60" aria-hidden="true" />
      </Link>
      <div
        className={`absolute top-full left-0 z-50 min-w-[220px] pt-1 transition-opacity duration-150 ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div
          className="rounded-xl border border-border bg-white py-2 shadow-lg"
          role="menu"
        >
          {item.children.map((child) => {
            const childActive = isNavPathActive(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                className={`block px-4 py-2.5 text-sm transition-colors hover:bg-cream hover:text-navy focus-visible:bg-cream focus-visible:text-navy focus-visible:outline-none ${
                  childActive ? "bg-cream/60 font-medium text-navy" : "text-foreground/80"
                }`}
                aria-current={childActive ? "page" : undefined}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DesktopNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav
      className="hidden items-center gap-1 lg:flex"
      aria-label="Main navigation"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {navigation.main.map((item) => (
        <DesktopNavItem
          key={item.label}
          item={item}
          pathname={pathname}
          isOpen={openDropdown === item.label}
          onOpen={() => setOpenDropdown(item.label)}
          onClose={() => setOpenDropdown(null)}
        />
      ))}
    </nav>
  );
}

function MobileNavSection({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isNavItemActive(pathname, item);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`block px-6 py-3 text-sm font-medium hover:bg-cream ${
          active ? "bg-cream text-navy" : "text-navy"
        }`}
        aria-current={active ? "page" : undefined}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <details className="border-b border-border/60" open={active || undefined}>
      <summary
        className={`flex cursor-pointer list-none items-center justify-between px-6 py-3 text-sm font-medium hover:bg-cream [&::-webkit-details-marker]:hidden ${
          active ? "bg-cream/60 text-navy" : "text-navy"
        }`}
      >
        {item.label}
        <Icon name="chevron-down" size={16} className="text-muted" aria-hidden="true" />
      </summary>
      <div className="space-y-0.5 pb-2">
        {item.children.map((child) => {
          const childActive = isNavPathActive(pathname, child.href);
          return (
            <Link
              key={child.href}
              href={child.href}
              className={`block py-2 pr-6 pl-10 text-sm hover:bg-cream hover:text-navy ${
                childActive ? "bg-cream/60 font-medium text-navy" : "text-muted"
              }`}
              aria-current={childActive ? "page" : undefined}
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <details className="relative lg:hidden">
      <summary className="cursor-pointer list-none rounded-lg p-2 hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
        <svg
          className="h-6 w-6 text-navy"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="sr-only">Open menu</span>
      </summary>
      <div className="absolute top-full right-0 mt-2 max-h-[80vh] w-72 overflow-y-auto rounded-xl border border-border bg-white py-2 shadow-xl">
        {navigation.main.map((item) => (
          <MobileNavSection key={item.label} item={item} pathname={pathname} />
        ))}
        <ClientLoginMobileSection />
        <div className="mt-2 space-y-2 border-t border-border px-6 pt-4 pb-2">
          <Link
            href="/schedule"
            className="block rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>
    </details>
  );
}
