import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

/**
 * Legal pages underline their links permanently. The site's `.link-underline`
 * reveals the rule on hover, which is right for editorial prose and wrong
 * here: on a policy page a visitor has to be able to see, at a glance, which
 * words lead to the provider that will receive their text.
 *
 * `py-3` on an inline link grows its tap target to 44px without moving a
 * line: vertical padding on an inline box is hit-tested but takes no space.
 */
export const LEGAL_LINK =
  "py-3 text-deep underline underline-offset-2 hover:text-deep-dark dark:text-accent-text dark:hover:text-stone-200";

/** One section of a legal page: the site's Section, with the policy's body type. */
export function LegalSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <Section id={id} title={heading} className="scroll-mt-24">
      <div className="space-y-4 text-base leading-relaxed text-secondary dark:text-stone-400">
        {children}
      </div>
    </Section>
  );
}

/** An unresolved passage, marked for the founder rather than guessed at. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-stone-300 bg-[#faf8f5] px-4 py-3 text-sm dark:border-[var(--border-default)] dark:bg-[var(--bg-card)] text-secondary dark:text-stone-400">
      <span className="font-semibold text-primary dark:text-stone-200">
        [Pending founder decision]
      </span>{" "}
      {children}
    </p>
  );
}
