import { AppShell } from "@/components/AppShell";
import { PasteClient } from "@/components/paste/PasteClient";
import { resolvePasteLanes } from "@/lib/paste/lanes";

/**
 * /analyze: the one paste flow.
 *
 * A server component so the lanes are decided per request from private
 * environment variables (lib/paste/lanes.ts) rather than baked into the client
 * bundle by a public flag at build time. With every flag off, which is
 * production today, only the offline map lane runs.
 */
export const dynamic = "force-dynamic";

export default function AnalyzePage() {
  const lanes = resolvePasteLanes();
  return (
    <AppShell layout="reading">
      <PasteClient lanes={lanes} />
    </AppShell>
  );
}
