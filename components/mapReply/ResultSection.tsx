import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

/**
 * One block of the reply: the shared `Section` primitive at h3 (the reply
 * sits under the page's h2), so the reply and the diagnosis report open
 * every section the same way. The two paste lanes are one kind of document.
 */
export function ResultSection({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section title={title} aside={aside} level={3}>
      <div className="space-y-5">{children}</div>
    </Section>
  );
}
