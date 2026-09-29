import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { Button, PageContainer, PageHeader, TextAction } from "@/components/ui";
import { ANALYZE_HREF } from "@/lib/nav";

/**
 * /analysis/[id]: links to the retired analyzer's saved results.
 *
 * The old analyzer saved every paste's extraction and scored the two sides
 * against each other ("7/10 strong" against "3/10 weak", plus a judge panel).
 * Argumend no longer names a stronger side, so those pages are not rendered,
 * not even from rows that still exist. This page answers an old shared link
 * without reading the database: it says what happened and where the paste
 * tool is now.
 */

export const metadata: Metadata = {
  title: "This older analysis format is retired",
  robots: { index: false, follow: true },
};

export default function RetiredAnalysisPage() {
  return (
    <AppShell layout="reading">
      <PageContainer width="reading">
        <PageHeader
          eyebrow="Saved analysis"
          title="This older analysis format is retired"
          lede="It scored the two sides of an argument against each other. Argumend no longer does that: it shows what an argument turns on and the strongest evidence on each side, and it never says who is right."
        >
          <p className="max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-secondary">
            If you still have the text, paste it again to see which map it is on.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href={ANALYZE_HREF} size="lg">
              Paste an argument
            </Button>
            <TextAction href="/topics">Browse the maps</TextAction>
          </div>
        </PageHeader>
      </PageContainer>
    </AppShell>
  );
}
