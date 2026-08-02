import { RouteNotFound } from "@/components/RouteNotFound";

export default function BlogNotFound() {
  return (
    <RouteNotFound
      eyebrow="Article unavailable"
      title="We could not find this blog page"
      description="The article, category, or tag may have moved. Return to the blog to browse the latest essays and analysis."
      primaryHref="/blog"
      primaryLabel="Browse the Blog"
    />
  );
}
