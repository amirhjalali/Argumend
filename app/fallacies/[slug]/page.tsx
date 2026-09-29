import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fallacies, getFallacyBySlug, getAllFallacySlugs } from "@/data/fallacies";
import { JsonLd } from "@/components/JsonLd";
import { ArticleLayout, RelatedReading, type RelatedItem } from "@/components/learn/ArticleLayout";
import { mapLinkFor, pickNextMap } from "@/lib/learn/nextStep";
import { readTime } from "@/lib/learn/readTime";
import { buildGenericOgUrl } from "@/lib/og";

// ---------------------------------------------------------------------------
// Static params for all fallacy slugs
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllFallacySlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata with OG
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fallacy = getFallacyBySlug(slug);
  if (!fallacy) {
    return {
      title: "Fallacy Not Found",
      robots: { index: false, follow: true },
    };
  }

  const title = `${fallacy.name} — Logical Fallacy`;
  const description = fallacy.shortDefinition.slice(0, 160);
  const url = `https://argumend.org/fallacies/${fallacy.slug}`;
  const ogImage = buildGenericOgUrl({
    title: fallacy.name,
    subtitle: "Logical Fallacy",
  });

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "ARGUMEND",
      images: [{ url: ogImage, width: 1200, height: 630, alt: fallacy.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------------------------
// Page: the Learn article template, with the fallacy skeleton: definition →
// example → why it misleads → how to respond → maps where it shows up.
// ---------------------------------------------------------------------------
export default async function FallacyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fallacy = getFallacyBySlug(slug);
  if (!fallacy) notFound();

  const paragraphs = fallacy.longDescription.split("\n\n");

  const related: RelatedItem[] = (fallacy.relatedFallacies ?? []).flatMap((s) => {
    const other = fallacies.find((f) => f.slug === s);
    return other
      ? [{ kind: "Fallacy", href: `/fallacies/${other.slug}`, title: other.name, description: other.shortDefinition }]
      : [];
  });

  const maps: RelatedItem[] = (fallacy.relatedTopicIds ?? []).flatMap((id) => {
    const link = mapLinkFor(id);
    return link ? [{ kind: "Map", href: link.href, title: link.title }] : [];
  });

  const url = `https://argumend.org/fallacies/${fallacy.slug}`;

  // JSON-LD: schema.org DefinedTerm
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: fallacy.name,
    description: fallacy.shortDefinition,
    url,
    termCode: fallacy.slug,
    ...(fallacy.aliases.length > 0 ? { alternateName: fallacy.aliases } : {}),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Logical Fallacies",
      url: "https://argumend.org/fallacies",
    },
  };

  const meta = [
    readTime(fallacy.longDescription, fallacy.example, fallacy.whyItMisleads, fallacy.howToCounter),
    fallacy.aliases.length > 0 ? `Also called ${fallacy.aliases.join(", ")}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <ArticleLayout
      kind="fallacy"
      title={fallacy.name}
      lede={fallacy.shortDefinition}
      meta={meta}
      nextMap={pickNextMap({ topicIds: fallacy.relatedTopicIds ?? [], keywords: fallacy.name })}
      related={related}
      chrome={<JsonLd data={jsonLd} />}
    >
      <div className="prose-custom">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}

        <h2 id="example" className="scroll-mt-24">
          Example
        </h2>
        <blockquote>
          <p>{fallacy.example}</p>
        </blockquote>

        <h2 id="why-it-misleads" className="scroll-mt-24">
          Why it misleads
        </h2>
        <p>{fallacy.whyItMisleads}</p>

        <h2 id="how-to-respond" className="scroll-mt-24">
          How to respond
        </h2>
        <p>{fallacy.howToCounter}</p>
      </div>

      {maps.length > 0 ? (
        <RelatedReading id="on-a-map" title="Where it shows up" items={maps} />
      ) : null}
    </ArticleLayout>
  );
}
