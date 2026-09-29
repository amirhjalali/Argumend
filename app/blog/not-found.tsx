import { RouteNotFound } from "@/components/RouteNotFound";

export default function BlogNotFound() {
  return (
    <RouteNotFound
      eyebrow="Essay unavailable"
      title="We could not find this essay"
      description="The essay, category or tag may have moved. Browse the essays to find it or another one."
      primaryHref="/blog"
      primaryLabel="Browse the essays"
    />
  );
}
