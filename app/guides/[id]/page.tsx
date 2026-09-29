import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ArticleLayout, KeyTakeaways, type RelatedItem } from "@/components/learn/ArticleLayout";
import { slugifyHeading, type TocHeading } from "@/components/TableOfContents";
import { Section } from "@/components/ui/Section";
import { guides, getGuideById } from "@/data/guides";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { renderInlineMarkdown } from "@/lib/markdown";
import { getGuideTrack } from "@/lib/guideMeta";
import { pickNextMap } from "@/lib/learn/nextStep";
import { leadSentences } from "@/lib/learn/summary";
import { getGuideFallbackOgUrl } from "./_config";
import {
  CONTENT_FIRST_PUBLISHED,
  CONTENT_LAST_UPDATED,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/site";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const guide = getGuideById(id);
  if (!guide) return { title: "Guide Not Found", robots: { index: false, follow: true } };
  const media = getGeneratedMedia("guide", guide.id);
  const ogImageUrl = media?.hero
    ? absoluteMediaUrl(media.hero.src)
    : getGuideFallbackOgUrl(guide.title);
  // The root layout's template adds the brand once.
  const title = `${guide.title} — Guide`;

  return {
    title,
    description: guide.description.slice(0, 160),
    alternates: {
      canonical: `https://argumend.org/guides/${guide.id}`,
    },
    openGraph: {
      title,
      description: guide.description.slice(0, 160),
      url: `https://argumend.org/guides/${guide.id}`,
      type: "article",
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: media?.hero.width ?? 1200,
          height: media?.hero.height ?? 630,
          alt: media?.hero.alt ?? `${guide.title} — Critical Thinking Guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.description.slice(0, 160),
      images: [ogImageUrl],
    },
  };
}

/** Three other guides: the same track first, then the curriculum order. */
function relatedGuides(id: string): RelatedItem[] {
  const track = getGuideTrack(id).id;
  const others = guides.filter((g) => g.id !== id);
  return [
    ...others.filter((g) => getGuideTrack(g.id).id === track),
    ...others.filter((g) => getGuideTrack(g.id).id !== track),
  ]
    .slice(0, 3)
    .map((g) => ({ kind: "Guide", href: `/guides/${g.id}`, title: g.title, description: g.subtitle }));
}

// ---------------------------------------------------------------------------
// Page: the Learn article template
// ---------------------------------------------------------------------------
export default async function GuidePage({ params }: PageProps) {
  const { id } = await params;
  const guide = getGuideById(id);
  if (!guide) notFound();

  const media = getGeneratedMedia("guide", guide.id);

  // Stamp stable, deduped anchor ids onto every section (H2) and subsection
  // (H3) so the contents list and the rendered headings stay in sync.
  const usedIds = new Set<string>();
  const assignId = (title: string): string => {
    let anchor = slugifyHeading(title) || "section";
    if (usedIds.has(anchor)) {
      let n = 2;
      while (usedIds.has(`${anchor}-${n}`)) n += 1;
      anchor = `${anchor}-${n}`;
    }
    usedIds.add(anchor);
    return anchor;
  };
  const sections = guide.sections.map((section) => ({
    ...section,
    anchorId: assignId(section.title),
    subsections: section.subsections?.map((sub) => ({ ...sub, anchorId: assignId(sub.title) })),
  }));
  const tocHeadings: TocHeading[] = sections.flatMap((section) => [
    { id: section.anchorId, text: section.title, level: 2 as const },
    ...(section.subsections?.map((sub) => ({ id: sub.anchorId, text: sub.title, level: 3 as const })) ??
      []),
  ]);
  const allText = guide.sections
    .flatMap((section) => [section.content, ...(section.subsections?.map((sub) => sub.content) ?? [])])
    .join("\n");

  // JSON-LD structured data — LearningResource is the correct type for an educational guide.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: guide.title,
    headline: guide.title,
    description: guide.description,
    url: `https://argumend.org/guides/${guide.id}`,
    learningResourceType: "Guide",
    educationalLevel: "Beginner",
    teaches: guide.keyTakeaways,
    // ISO-8601 duration (e.g. "12 min read" → "PT12M") so Rich Results validates.
    timeRequired: `PT${parseInt(guide.readTime, 10) || 10}M`,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: "https://argumend.org/icon.png" },
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: "https://argumend.org/icon.png" },
    },
    datePublished: CONTENT_FIRST_PUBLISHED,
    dateModified: CONTENT_LAST_UPDATED,
    articleSection: "Guides",
    inLanguage: "en-US",
    about: { "@type": "Thing", name: guide.title, description: guide.subtitle },
    isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, name: SITE_NAME, url: SITE_URL },
    image: {
      "@type": "ImageObject",
      url: media?.hero ? absoluteMediaUrl(media.hero.src) : getGuideFallbackOgUrl(guide.title),
      width: media?.hero.width ?? 1200,
      height: media?.hero.height ?? 630,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://argumend.org/guides/${guide.id}` },
  };

  return (
    <ArticleLayout
      kind="guide"
      title={guide.title}
      lede={leadSentences(guide.description)}
      meta={guide.readTime}
      headings={tocHeadings}
      hero={
        media?.hero ? (
          <div className="relative aspect-[1672/941] overflow-hidden rounded-lg border border-divider bg-subtle">
            <Image
              src={media.hero.src}
              alt={media.hero.alt}
              fill
              priority
              sizes="(min-width: 768px) 704px, 100vw"
              className="object-cover"
            />
          </div>
        ) : undefined
      }
      nextMap={pickNextMap({ text: allText, keywords: `${guide.title} ${guide.subtitle}` })}
      related={relatedGuides(guide.id)}
      chrome={<JsonLd data={jsonLd} />}
    >
      <div className="prose-custom">
        {sections.map((section) => (
          <section key={section.anchorId}>
            <h2 id={section.anchorId} className="scroll-mt-24">
              {section.title}
            </h2>
            <div
              className="reading-body whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(section.content) }}
            />
            {section.subsections?.map((subsection) => (
              <div key={subsection.anchorId} className="mt-6 border-l-2 border-divider pl-5">
                <h3 id={subsection.anchorId} className="!mt-0 scroll-mt-24">
                  {subsection.title}
                </h3>
                <div
                  className="reading-body whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(subsection.content) }}
                />
              </div>
            ))}
          </section>
        ))}
      </div>

      <KeyTakeaways items={guide.keyTakeaways} />

      {guide.furtherReading.length > 0 ? (
        <Section id="further-reading" title="Further reading" className="mt-12">
          <ul className="border-b border-divider">
            {guide.furtherReading.map((item, index) => (
              <li
                key={item.title}
                className={`flex items-center justify-between gap-3 py-2 ${index > 0 ? "border-t border-divider" : ""}`}
              >
                <p className="min-w-0 py-1.5 font-serif text-lg leading-snug text-primary">
                  {item.title}
                  <span className="font-sans text-sm text-muted"> by {item.author}</span>
                </p>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.title} in a new tab`}
                    title={`Open ${item.title} in a new tab`}
                    className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-deep transition-colors hover:bg-deep/10 hover:text-deep-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-accent-text"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </ArticleLayout>
  );
}
