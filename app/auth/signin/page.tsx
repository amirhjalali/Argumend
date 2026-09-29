import { signIn } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Button, TextAction } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Argumend to keep your saved maps across devices.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://argumend.org/auth/signin",
  },
};

/**
 * Sign-in, shown only when NEXT_PUBLIC_ENABLE_AUTH is on. The copy is written
 * for the product as it is: an account keeps saved maps across devices, and
 * nothing else needs one. No "Welcome back" (most visitors here are new), and
 * no rust button competing with the sign-in itself.
 */
export default async function SignInPage() {
  // Account-backed sessions are opt-in. In the default offline experience,
  // send direct sign-in links to the fully on-device saved-topics page instead
  // of presenting an OAuth action that cannot complete.
  if (process.env.NEXT_PUBLIC_ENABLE_AUTH !== "true") {
    redirect("/saved");
  }

  const session = await auth();
  if (session) redirect("/");

  return (
    <main
      id="main-content"
      className="flex min-h-[100svh] items-center justify-center bg-canvas px-4"
    >
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-serif text-2xl font-medium tracking-[0.08em] text-primary dark:text-stone-200 transition-colors hover:text-deep dark:hover:text-accent-text"
          >
            ARGUMEND
          </Link>
          <p className="label-caps mt-1">Disagree better.</p>
        </div>

        <div className="surface-card rounded-lg p-6 sm:p-8">
          <h1 className="font-serif text-2xl text-primary dark:text-stone-200 text-center">
            Sign in
          </h1>
          <p className="mt-2 mb-6 text-center font-serif text-[1.0625rem] leading-snug text-secondary dark:text-stone-400">
            Sign in to keep your saved maps across devices.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="secondary" size="lg" className="w-full gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
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
            </Button>
          </form>

          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted dark:text-stone-400">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span>We only ask Google for your name and email address.</span>
          </p>
        </div>

        <div className="text-center text-sm text-secondary dark:text-stone-400">
          <p>You do not need an account to read maps, or to save them on this device.</p>
          <TextAction href="/topics">Continue without signing in</TextAction>
        </div>

        <p className="text-center text-xs text-secondary dark:text-stone-400">
          By signing in, you agree to our{" "}
          <TextAction href="/terms" className="text-xs">
            terms
          </TextAction>{" "}
          and{" "}
          <TextAction href="/privacy" className="text-xs">
            privacy policy
          </TextAction>
          .
        </p>
      </div>
    </main>
  );
}
