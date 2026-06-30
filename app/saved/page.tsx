import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { SavedClient } from "./SavedClient";

export const metadata: Metadata = {
  // Plain string — the root layout's title template ("%s | ARGUMEND") adds the
  // suffix; including it here too produced "Saved Topics | ARGUMEND | ARGUMEND".
  title: "Saved Topics",
  description:
    "Topics you've bookmarked on this device — pick up any argument map right where you left off.",
  // Utility page: keep it out of the index, but let crawlers follow its links.
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <AppShell>
      <SavedClient />
    </AppShell>
  );
}
