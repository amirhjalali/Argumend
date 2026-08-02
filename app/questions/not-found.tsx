import { RouteNotFound } from "@/components/RouteNotFound";

export default function QuestionNotFound() {
  return (
    <RouteNotFound
      eyebrow="Question unavailable"
      title="We could not find this question"
      description="The question link may be incomplete or no longer available. Browse all questions to explore another evidence-based answer."
      primaryHref="/questions"
      primaryLabel="Browse Questions"
    />
  );
}
