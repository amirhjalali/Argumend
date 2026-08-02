import { RouteNotFound } from "@/components/RouteNotFound";

export default function TopicsNotFound() {
  return (
    <RouteNotFound
      eyebrow="Topic unavailable"
      title="We could not find this argument map"
      description="The topic link may be incomplete, or this debate may not have been mapped yet. Browse the topic catalog to keep exploring."
      primaryHref="/topics"
      primaryLabel="Browse Topics"
    />
  );
}
