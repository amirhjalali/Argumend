import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DisagreementAnalyzeClient } from "@/components/disagreement/DisagreementAnalyzeClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  // The root layout's template appends "| ARGUMEND"; no suffix here.
  title: "Find what the argument turns on",
  robots: { index: false, follow: false },
};

export default function AnalyzeV2Page() {
  if (process.env.ENABLE_DISAGREEMENT_V2 !== "true") {
    notFound();
  }

  return (
    <AppShell>
      <DisagreementAnalyzeClient />
    </AppShell>
  );
}
