"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";

import { Button, Card, Field, Input } from "@/components/admin/ui";
import { createClient } from "@/lib/supabase/client";

function safeNextPath(next: string | null): string {
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return "/admin";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryError = useMemo(() => {
    const code = searchParams.get("error");
    if (code === "unauthorized") {
      return "Your account is not authorized to access the content admin.";
    }
    if (code === "supabase_not_configured") {
      return "Authentication is not configured. Contact your administrator.";
    }
    return null;
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(safeNextPath(searchParams.get("next")));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setLoading(false);
    }
  }

  const displayError = error ?? queryError;

  return (
    <Card className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Content Admin</h1>
        <p className="mt-1 text-sm text-slate-500">NorthBridge Wealth</p>
      </div>

      {displayError ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {displayError}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        <Link
          href="/forgot-password"
          className="font-medium text-slate-700 underline-offset-2 hover:underline"
        >
          Forgot password?
        </Link>
      </p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md">
            <p className="text-sm text-slate-500">Loading…</p>
          </Card>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
