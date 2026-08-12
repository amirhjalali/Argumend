import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { JsonLd } from "@/components/JsonLd";
import TopicPageClient from "./TopicPageClient";
import { buildGenericOgUrl, buildTopicOgUrl } from "@/lib/og";
import {
  argumentTopicIds,
  loadArgumentTopic,
} from "@/lib/argument/draftTopics";
import { DebateView } from "@/components/argument/DebateView";
import {
  CONTENT_FIRST_PUBLISHED,
  CONTENT_LAST_UPDATED,
} from "@/lib/site";

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [
    ...topicSummaries.map((topic) => ({ id: topic.id })),
    ...argumentTopicIds.map((id) => ({ id })),
  ];
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ view?: string | string[] }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const argumentTopic = loadArgumentTopic(id);
  if (argumentTopic) {
    // Prefer the topic's own illustration for link previews — a real image
    // travels far better than a generated text card.
    const ogImage = argumentTopic.meta.hero
      ? `https://argumend.org${argumentTopic.meta.hero.src}`
      : buildGenericOgUrl({
          title: argumentTopic.meta.title,
          subtitle: argumentTopic.meta.tagline,
        });
    const pageTitle = `${argumentTopic.meta.title} — Debate Map`;
    const url = `https://argumend.org/topics/${argumentTopic.meta.id}`;
    return {
      title: pageTitle,
      description: argumentTopic.meta.tagline,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        title: `${pageTitle} | ARGUMEND`,
        description: argumentTopic.meta.tagline,
        url,
        siteName: "ARGUMEND",
        images: [{ url: ogImage, width: 1200, height: 630, alt: argumentTopic.meta.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: argumentTopic.meta.tagline,
        images: [ogImage],
      },
    };
  }

  const topic = topicSummaries.find((t) => t.id === id);

  if (!topic) {
    return { title: "Topic Not Found" };
  }

  const description = `${topic.meta_claim} — ${topic.verdict.label}. Explore ${topic.pillarCount} argument pillars with steel-manned positions, weighted evidence, and crux questions.`;
  const categoryLabel = CATEGORY_LABELS[topic.category];
  const media = getGeneratedMedia("topic", topic.id);
  const socialImage = media?.hero
    ? absoluteMediaUrl(media.hero.src)
    : buildTopicOgUrl(topic.id);

  return {
    title: `${topic.title} — Argument Analysis`,
    description,
    keywords: [
      topic.title,
      categoryLabel,
      "argument mapping",
      "evidence analysis",
      "steel man",
      "crux question",
      topic.status,
    ],
    alternates: {
      canonical: `https://argumend.org/topics/${topic.id}`,
    },
    openGraph: {
      type: "article",
      title: `${topic.title} — Argument Analysis | ARGUMEND`,
      description,
      url: `https://argumend.org/topics/${topic.id}`,
      siteName: "ARGUMEND",
      images: [
        {
          url: socialImage,
          width: media?.hero.width ?? 1200,
          height: media?.hero.height ?? 630,
          alt: media?.hero.alt ?? topic.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} — Argument Analysis`,
      description,
      images: [socialImage],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component — thin server wrapper, rendering done client-side
// ---------------------------------------------------------------------------

export default async function TopicPage({ params, searchParams }: PageProps) {
  const { id } = await params;

  // New-model (ArgumentGraph) topics render the progressive-disclosure
  // DebateView — no canvas bundle, no hydration for the core experience.
  const argumentTopic = loadArgumentTopic(id);
  if (argumentTopic) {
    // Re-establish the legacy path's AEO invariant: Article structured data
    // with the graph's evidence source URLs exposed as schema.org citations.
    const seenUrls = new Set<string>();
    const citations = argumentTopic.graph.nodes
      .filter(
        (n) => n.type === "evidence" && n.status !== "superseded" && n.source.url
      )
      .map((n) => (n.type === "evidence" ? n.source.url : undefined))
      .filter((url): url is string => {
        if (!url || seenUrls.has(url)) return false;
        seenUrls.add(url);
        return true;
      });

    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: argumentTopic.meta.title,
            description: argumentTopic.meta.tagline,
            url: `https://argumend.org/topics/${argumentTopic.meta.id}`,
            datePublished: CONTENT_FIRST_PUBLISHED,
            dateModified: CONTENT_LAST_UPDATED,
            author: { "@type": "Organization", name: "ARGUMEND" },
            citation: citations,
          }}
        />
        <DebateView
          meta={argumentTopic.meta}
          graph={argumentTopic.graph}
          cruxes={argumentTopic.cruxes}
        />
      </>
    );
  }

  const topic = await loadTopicById(id);

  if (!topic) {
    notFound();
  }

  const view = (await searchParams)?.view;
  const requestedView = Array.isArray(view) ? view[0] : view;
  if (requestedView === "graph" || requestedView === "logic-map") {
    redirect(`/?topic=${encodeURIComponent(topic.id)}&view=logic-map`);
  }

  const categoryLabel = CATEGORY_LABELS[topic.category];
  const media = getGeneratedMedia("topic", topic.id);
  const socialImage = media?.hero
    ? absoluteMediaUrl(media.hero.src)
    : buildTopicOgUrl(topic.id);

  // Honest dates: published constant, modified from topic.last_updated if present.
  const datePublished = CONTENT_FIRST_PUBLISHED;
  const dateModified = topic.last_updated ?? CONTENT_LAST_UPDATED;

  // Extractable primary-source citations for AI answer engines (AEO).
  // Surfaces the verified evidence URLs as schema.org `citation` so crawlers and
  // LLMs can reach the underlying sources, not just the confidence score.
  const URL_RE = /^https?:\/\/\S+\.\S+/;
  const seenCitationUrls = new Set<string>();
  const citations = topic.pillars
    .flatMap((p) => p.evidence ?? [])
    .filter(
      (e) =>
        typeof e.sourceUrl === "string" &&
        URL_RE.test(e.sourceUrl) &&
        !seenCitationUrls.has(e.sourceUrl) &&
        seenCitationUrls.add(e.sourceUrl),
    )
    .map((e) => ({
      "@type": "CreativeWork" as const,
      name: e.source ?? e.title ?? "Source",
      url: e.sourceUrl as string,
    }));

  return (
    <>
      {/* No ClaimReview: Argumend's confidence-spectrum verdicts aren't binary
          fact-checks and the brand isn't a registered fact-checker (Google
          restricts ClaimReview rich results). Article + FAQPage cover the page;
          /is pages use QAPage. Consistent with the cycle-4 schema decision. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: topic.title,
          description: topic.meta_claim,
          url: `https://argumend.org/topics/${topic.id}`,
          image: socialImage,
          articleSection: categoryLabel,
          inLanguage: "en-US",
          datePublished,
          dateModified,
          author: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          publisher: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          ...(citations.length ? { citation: citations } : {}),
        }}
      />
      {topic.questions?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: topic.questions.map((q) => ({
              "@type": "Question",
              name: q.title,
              acceptedAnswer: { "@type": "Answer", text: q.content },
            })),
          } as unknown as Record<string, unknown>}
        />
      ) : null}
      <TopicPageClient topic={topic} />
    </>
  );
}
