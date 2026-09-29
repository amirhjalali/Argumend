import { RouteNotFound } from "@/components/RouteNotFound";

export default function EducatorResourceNotFound() {
  return (
    <RouteNotFound
      eyebrow="Resource unavailable"
      title="We could not find this educator resource"
      description="The worksheet link may be incomplete or outdated. Return to the page for teachers for the lesson plans and worksheets."
      primaryHref="/for-educators"
      primaryLabel="Resources for teachers"
    />
  );
}
