import { Metadata } from "next";
import { notFound } from "next/navigation";
import { concepts, getConceptBySlug, getAllConceptSlugs } from "@/data/concepts";
import { JsonLd } from "@/components/JsonLd";
import {
  ArticleLayout,
  KeyTakeaways,
  RelatedReading,
  type RelatedItem,
} from "@/components/learn/ArticleLayout";
import { mapLinkFor, pickNextMap } from "@/lib/learn/nextStep";
import { readTime } from "@/lib/learn/readTime";
import { leadSentences } from "@/lib/learn/summary";
import { firstSentence } from "@/lib/topicPage/legacy";
import { buildGenericOgUrl } from "@/lib/og";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/site";

// ---------------------------------------------------------------------------
// Static params for all concept slugs
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllConceptSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata with OG
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) {
    return {
      title: "Concept Not Found",
      robots: { index: false, follow: true },
    };
  }

  const firstParagraph = concept.description.split("\n\n")[0];
  const ogImage = buildGenericOgUrl({ title: concept.title, subtitle: "Key Concept" });

  return {
    title: `${concept.title} — Key Concept`,
    description: firstParagraph.slice(0, 160),
    alternates: {
      canonical: `https://argumend.org/concepts/${concept.id}`,
    },
    openGraph: {
      title: `${concept.title} — Key Concept`,
      description: firstParagraph.slice(0, 160),
      url: `https://argumend.org/concepts/${concept.id}`,
      type: "article",
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: concept.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${concept.title} — Key Concept`,
      description: firstParagraph.slice(0, 160),
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------------------------
// Page: the Learn article template. Body: the idea, its key points, then the
// maps where it shows up.
// ---------------------------------------------------------------------------
export default async function ConceptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  // The first sentence is the lede, so the body starts after it.
  const paragraphs = concept.description.split("\n\n");
  const lede = firstSentence(paragraphs[0]);
  const body = [paragraphs[0].slice(lede.length).trim(), ...paragraphs.slice(1)].filter(Boolean);

  const maps: RelatedItem[] = concept.topicExamples.flatMap((id) => {
    const link = mapLinkFor(id);
    return link ? [{ kind: "Map", href: link.href, title: link.title }] : [];
  });

  const related: RelatedItem[] = concept.relatedConcepts.flatMap((id) => {
    const other = concepts.find((c) => c.id === id);
    return other
      ? [{ kind: "Idea", href: `/concepts/${other.id}`, title: other.title, description: leadSentences(other.description) }]
      : [];
  });

  // JSON-LD structured data — DefinedTerm is the correct type for a concept/term page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: concept.title,
    description: paragraphs[0]?.slice(0, 160),
    url: `https://argumend.org/concepts/${concept.id}`,
    termCode: concept.id,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Argumend core ideas",
      url: "https://argumend.org/learn#ideas",
    },
    publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://argumend.org/concepts/${concept.id}` },
  };

  return (
    <ArticleLayout
      kind="idea"
      title={concept.title}
      lede={lede}
      meta={readTime(concept.description, ...concept.keyPoints)}
      nextMap={pickNextMap({ topicIds: concept.topicExamples, keywords: concept.title })}
      related={related}
      chrome={<JsonLd data={jsonLd} />}
    >
      <div className="prose-custom">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
      <KeyTakeaways items={concept.keyPoints} />
      {maps.length > 0 ? (
        <RelatedReading id="on-a-map" title="Where it shows up" items={maps} />
      ) : null}
    </ArticleLayout>
  );
}
