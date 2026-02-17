import { signIn } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | Argumend",
  description:
    "Sign in to Argumend to save your analyses, track debates, and join the community of critical thinkers.",
  alternates: {
    canonical: "https://argumend.org/auth/signin",
  },
};

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm space-y-10">
        {/* Logo / Wordmark */}
        <div className="text-center">
          <Link href="/" className="inline-block group">
            <h1 className="font-serif text-3xl font-medium tracking-[0.08em] text-primary group-hover:text-deep transition-colors">
              ARGUMEND
            </h1>
          </Link>
          <p className="mt-3 text-secondary text-sm leading-relaxed max-w-[280px] mx-auto">
            Map arguments. Find cruxes. Think better together.
          </p>
        </div>

        {/* Sign-in card */}
        <div className="bg-white/80 rounded-xl border border-stone-200/60 p-6 sm:p-8 shadow-card">
          <h2 className="font-serif text-xl text-primary text-center mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-secondary text-center mb-6">
            Sign in to save your analyses and debates
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200/60 bg-white px-4 py-3.5 text-sm font-medium text-primary shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5 duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Security note */}
          <div className="mt-5 flex items-start gap-2 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
            <span>
              We only request your name and email. Your data stays private.
            </span>
          </div>
        </div>

        {/* Guest CTA */}
        <div className="text-center space-y-3">
          <p className="text-sm text-secondary">
            No account needed to explore.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-semibold font-serif shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Continue as Guest
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-muted pt-2">
          By signing in, you agree to our{" "}
          <Link href="/about" className="text-deep underline underline-offset-2 hover:text-deep-dark transition-colors">
            terms of use
          </Link>
        </p>
      </div>
    </div>
  );
}
