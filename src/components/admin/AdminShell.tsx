"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  Newspaper,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/admin/utils";
import type { StaffProfile } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/content/site";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/media", label: "Media", icon: FolderOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/activity", label: "Activity", icon: Activity },
];

export function AdminShell({
  profile,
  children,
}: {
  profile: StaffProfile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const links = [
    ...nav,
    ...(profile.role === "administrator"
      ? [{ href: "/admin/users", label: "Users", icon: PanelLeft }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
            <div>
              <p className="text-sm font-semibold">Content Admin</p>
              <p className="text-xs text-slate-500">{siteConfig.name}</p>
            </div>
            <button
              type="button"
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-1 p-3">
            {links.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition",
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            aria-label="Close overlay"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-500 hover:text-slate-800"
              >
                View website
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{profile.full_name || profile.email}</p>
                <p className="text-xs capitalize text-slate-500">{profile.role}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
