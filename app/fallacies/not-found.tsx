import { RouteNotFound } from "@/components/RouteNotFound";

export default function FallacyNotFound() {
  return (
    <RouteNotFound
      eyebrow="Fallacy unavailable"
      title="We could not find this fallacy"
      description="The entry may have moved or the link may be incomplete. Browse the fallacy catalog to find the reasoning pattern you need."
      primaryHref="/fallacies"
      primaryLabel="Browse Fallacies"
    />
  );
}
