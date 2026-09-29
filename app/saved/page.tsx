import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { SavedClient } from "./SavedClient";

export const metadata: Metadata = {
  // Plain string — the root layout's title template ("%s | ARGUMEND") adds the
  // suffix; including it here too doubled it.
  title: "Saved maps",
  description:
    "Maps you have bookmarked on this device, to pick up where you left off.",
  // Utility page: keep it out of the index, but let crawlers follow its links.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://argumend.org/saved",
  },
};

export default function SavedPage() {
  return (
    <AppShell>
      <SavedClient />
    </AppShell>
  );
}
