import { RouteNotFound } from "@/components/RouteNotFound";
import { ANALYZE_HREF } from "@/lib/nav";

export default function DisagreementNotFound() {
  return (
    <RouteNotFound
      eyebrow="Report unavailable"
      title="Report not found"
      description="This diagnosis is missing or was deleted."
      primaryHref={ANALYZE_HREF}
      primaryLabel="Paste an argument"
    />
  );
}
