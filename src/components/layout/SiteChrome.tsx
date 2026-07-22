"use client";

import { usePathname } from "next/navigation";

import { Footer, Header } from "@/components/layout/HeaderFooter";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/auth/");

  if (hide) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
