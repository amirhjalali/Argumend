import { RouteNotFound } from "@/components/RouteNotFound";

export default function EducatorResourceNotFound() {
  return (
    <RouteNotFound
      eyebrow="Resource unavailable"
      title="We could not find this educator resource"
      description="The worksheet link may be incomplete or outdated. Return to the educator hub for classroom-ready resources."
      primaryHref="/for-educators"
      primaryLabel="Educator Resources"
    />
  );
}
