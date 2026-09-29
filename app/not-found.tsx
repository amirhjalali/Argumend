import type { Metadata } from "next";
import { RouteNotFound } from "@/components/RouteNotFound";
import { ANALYZE_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you're looking for doesn't exist. Browse the maps or paste an argument on Argumend.",
};

export default function NotFound() {
  return (
    <RouteNotFound
      eyebrow="404"
      title="Insufficient evidence for this page"
      description={
        <>
          The argument you&rsquo;re looking for hasn&rsquo;t been mapped yet. Or maybe it moved
          to stronger ground; arguments do that sometimes.
        </>
      }
      primaryHref="/topics"
      primaryLabel="Browse maps"
      secondaryHref={ANALYZE_HREF}
      secondaryLabel="Paste an argument"
    >
      <p className="font-sans text-sm text-muted">
        Looking for something specific? Search is in the header, or press{" "}
        <kbd className="rounded border border-stone-300/70 bg-card px-1.5 font-mono text-xs dark:border-divider">
          ⌘K
        </kbd>
        .
      </p>
    </RouteNotFound>
  );
}
