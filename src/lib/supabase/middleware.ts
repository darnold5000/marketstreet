import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { MS_TABLES, type StaffRole } from "@/lib/supabase/tables";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/content");
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/forgot-password");

  // Legacy password-gated content assistant stays available without Supabase.
  if (!url || !anonKey) {
    if (isAdminRoute && process.env.NODE_ENV === "production") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("error", "supabase_not_configured");
      return NextResponse.redirect(redirectUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, {
            ...options,
            path: "/",
            sameSite: "lax",
          }),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: StaffRole | null = null;
  let active = false;

  if (user) {
    const { data: profile } = await supabase
      .from(MS_TABLES.profiles)
      .select("role, active")
      .eq("id", user.id)
      .maybeSingle();

    role = (profile?.role as StaffRole | undefined) ?? null;
    active = profile?.active === true;
  }

  const isStaff =
    Boolean(user) &&
    active &&
    (role === "administrator" || role === "editor");

  if (isAdminRoute) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.search = "";
      redirectUrl.searchParams.set(
        "next",
        `${pathname}${request.nextUrl.search}`,
      );
      return NextResponse.redirect(redirectUrl);
    }
    if (!isStaff) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.search = "";
      redirectUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isAuthRoute && isStaff) {
    const next = request.nextUrl.searchParams.get("next");
    const safeNext =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin";
    const redirectUrl = request.nextUrl.clone();
    const dest = new URL(safeNext, request.nextUrl.origin);
    redirectUrl.pathname = dest.pathname;
    redirectUrl.search = dest.search;
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
