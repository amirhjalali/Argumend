import { RouteNotFound } from "@/components/RouteNotFound";

export default function GuideNotFound() {
  return (
    <RouteNotFound
      eyebrow="Guide unavailable"
      title="We could not find this guide"
      description="The guide link may be incomplete or outdated. Browse the guide library for another practical starting point."
      primaryHref="/guides"
      primaryLabel="Browse Guides"
    />
  );
}
