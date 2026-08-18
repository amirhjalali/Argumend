import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { DisagreementAnalyzeClient } from "@/components/disagreement/DisagreementAnalyzeClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Diagnose a disagreement — ARGUMEND",
  robots: { index: false, follow: false },
};

export default function AnalyzeV2Page() {
  if (process.env.ENABLE_DISAGREEMENT_V2 !== "true") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      <TopBar />
      <main>
        <DisagreementAnalyzeClient />
      </main>
      <Footer />
    </div>
  );
}
