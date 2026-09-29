import { RouteNotFound } from "@/components/RouteNotFound";

export default function ConceptNotFound() {
  return (
    <RouteNotFound
      eyebrow="Concept unavailable"
      title="We could not find this concept"
      description="This concept may have moved or may not be in the collection yet. Browse the core ideas to continue learning."
      primaryHref="/learn#ideas"
      primaryLabel="Browse core ideas"
    />
  );
}
