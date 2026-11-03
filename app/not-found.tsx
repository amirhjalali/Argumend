import type { Metadata } from "next";
import { RouteNotFound } from "@/components/RouteNotFound";
import { ANALYZE_HREF } from "@/lib/nav";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/og";

const DESCRIPTION =
  "The page you're looking for doesn't exist. Browse the maps or paste an argument on Argumend.";

// Next merges this after every layout above the 404 (the root not-found is the
// last metadata item), so these keys replace the inherited ones. `alternates:
// null` drops the root layout's canonical (https://argumend.org), which would
// tell crawlers the 404 is the home page; the openGraph object is replaced so
// og:url and the Twitter title do not claim the home page or /topics either.
export const metadata: Metadata = {
  title: "Page not found",
  description: DESCRIPTION,
  alternates: null,
  openGraph: {
    type: "website",
    siteName: "ARGUMEND",
    title: "Page not found | ARGUMEND",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page not found | ARGUMEND",
    description: DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
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
        Looking for something specific? Use search in the header
        <span className="hidden sm:inline">
          , or press{" "}
          <kbd className="rounded border border-stone-300/70 bg-card px-1.5 font-mono text-xs dark:border-divider">
            ⌘K
          </kbd>
        </span>
        .
      </p>
    </RouteNotFound>
  );
}
