import type { Metadata } from "next";
import { AiLivingMap } from "@/components/ai/AiLivingMap";
import { AppShell } from "@/components/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { aiPageAsOf, loadAiMaps } from "./loadAiMaps";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * /ai — the living AI-discourse map (spec §2): today's top cruxes across the
 * AI maps, what has moved since a date, how much moved, and the changelog.
 *
 * In the sitemap, but deliberately not in the nav or the sidebar. Rendering matches the topic pages (no
 * `dynamic`/`revalidate` override); the `?map=` and `?since=` links make it
 * request-rendered, and the maps and ledgers are cached per process by
 * `loadArgumentTopic`, so each render is pure computation over static data.
 */

const TITLE = "The AI argument, on one page";
const DESCRIPTION =
  "What the fight over AI and work turns on now, what would settle each question, and the dated record of the evidence that has moved it. Across Argumend's AI maps; it never scores the sides.";
const URL = `${SITE_URL}/ai`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    url: URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

type PageProps = {
  searchParams?: Promise<{ map?: string | string[]; since?: string | string[] }>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AiPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const maps = loadAiMaps();
  const asOf = aiPageAsOf(maps);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: URL,
          datePublished: asOf,
          dateModified: asOf,
          author: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      {/* The site shell, as on every other content page. AiLivingMap stays a
          server component passed through as children: no client JS of its own. */}
      <AppShell>
        <AiLivingMap maps={maps} mapParam={first(params.map)} sinceParam={first(params.since)} />
      </AppShell>
    </>
  );
}
