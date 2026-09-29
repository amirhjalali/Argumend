import { RouteNotFound } from "@/components/RouteNotFound";

export default function TopicsNotFound() {
  return (
    <RouteNotFound
      eyebrow="Map unavailable"
      title="We could not find this map"
      description="The link may be incomplete, or this question may not have been mapped yet. Browse the maps to keep exploring."
      primaryHref="/topics"
      primaryLabel="Browse maps"
    />
  );
}
