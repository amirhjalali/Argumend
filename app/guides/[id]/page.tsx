import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { guides, getGuideById } from "@/data/guides";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { renderInlineMarkdown } from "@/lib/markdown";
import { getGuideIcon, getGuideTrack } from "@/lib/guideMeta";
import {
  TableOfContents,
  slugifyHeading,
  type TocHeading,
} from "@/components/TableOfContents";
import { notFound } from "next/navigation";
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
  if (!guide) return { title: "Guide Not Found" };
  const media = getGeneratedMedia("guide", guide.id);
  const ogImageUrl = media?.hero
    ? absoluteMediaUrl(media.hero.src)
    : getGuideFallbackOgUrl(guide.title);

  return {
    title: `${guide.title} — Guide | Argumend`,
    description: guide.description.slice(0, 160),
    alternates: {
      canonical: `https://argumend.org/guides/${guide.id}`,
    },
    openGraph: {
      title: `${guide.title} — Guide | Argumend`,
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
      title: `${guide.title} — Guide | Argumend`,
      description: guide.description.slice(0, 160),
      images: [ogImageUrl],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component (server)
// ---------------------------------------------------------------------------
export default async function GuidePage({ params }: PageProps) {
  const { id } = await params;
  const guide = getGuideById(id);

  if (!guide) {
    notFound();
  }

  // Kept as a member-expression access (`hero.Icon`), not a hoisted
  // `const Icon`, so react-hooks/static-components doesn't read a per-guide
  // icon lookup as a component defined during render.
  const hero = { Icon: getGuideIcon(guide.id) };
  const track = getGuideTrack(guide.id);
  const media = getGeneratedMedia("guide", guide.id);
  // Catalog number matches the numbering on /guides, which follows the
  // canonical data order rather than the track grouping.
  const catalogNumber = guides.findIndex((g) => g.id === guide.id) + 1;

  // Stamp stable, deduped anchor ids onto every section (H2) and subsection
  // (H3) so the table of contents links and the rendered headings stay in sync.
  const usedIds = new Set<string>();
  const assignId = (title: string): string => {
    let id = slugifyHeading(title) || "section";
    if (usedIds.has(id)) {
      let n = 2;
      while (usedIds.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    usedIds.add(id);
    return id;
  };
  const sections = guide.sections.map((section) => ({
    ...section,
    anchorId: assignId(section.title),
    subsections: section.subsections?.map((sub) => ({
      ...sub,
      anchorId: assignId(sub.title),
    })),
  }));
  const tocHeadings: TocHeading[] = sections.flatMap((section) => [
    { id: section.anchorId, text: section.title, level: 2 as const },
    ...(section.subsections?.map((sub) => ({
      id: sub.anchorId,
      text: sub.title,
      level: 3 as const,
    })) ?? []),
  ]);

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
      logo: {
        "@type": "ImageObject",
        url: "https://argumend.org/icon.png",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: "https://argumend.org/icon.png",
      },
    },
    datePublished: CONTENT_FIRST_PUBLISHED,
    dateModified: CONTENT_LAST_UPDATED,
    articleSection: "Foundational Guides",
    inLanguage: "en-US",
    about: {
      "@type": "Thing",
      name: guide.title,
      description: guide.subtitle,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: {
      "@type": "ImageObject",
      url: media?.hero
        ? absoluteMediaUrl(media.hero.src)
        : getGuideFallbackOgUrl(guide.title),
      width: media?.hero.width ?? 1200,
      height: media?.hero.height ?? 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/guides/${guide.id}`,
    },
  };

  return (
    <AppShell>
      {/* JSON-LD */}
      <JsonLd data={jsonLd} />

      <div className="min-h-full">
        <article className="relative mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
          {/* Breadcrumb with BreadcrumbList JSON-LD */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: guide.title },
            ]}
          />

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-stone-200/60 dark:border-[var(--border-default)]">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200/60 dark:border-[var(--border-default)] ${track.iconBg}`}
              >
                <hero.Icon className={`h-6 w-6 ${track.iconText}`} strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted dark:text-stone-400">
                <Link
                  href={`/guides#${track.id}`}
                  className={`inline-flex min-h-11 items-center gap-1.5 px-2.5 py-1 border rounded-full text-xs font-medium ${track.chip}`}
                >
                  {track.numeral}. {track.label}
                </Link>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {guide.readTime}
                </span>
              </div>
              <span className="ml-auto text-[11px] font-mono tabular-nums text-muted/70 dark:text-stone-500/70">
                No. {String(catalogNumber).padStart(2, "0")}
              </span>
            </div>

            <h1 className="mb-6 font-serif text-3xl leading-[1.08] tracking-tight text-primary dark:text-stone-200 sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-secondary dark:text-stone-400">
              {guide.subtitle}
            </p>

            {media?.hero && (
              <div className="relative mt-8 aspect-[1672/941] overflow-hidden rounded-xl border border-stone-200/70 bg-stone-100 shadow-sm dark:border-[var(--border-default)] dark:bg-[var(--bg-overlay)]">
                <Image
                  src={media.hero.src}
                  alt={media.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </header>

          {/* In-article wayfinding (sticky rail on wide desktop, disclosure otherwise) */}
          <TableOfContents headings={tocHeadings} />

          {/* Main Content */}
          <div className="prose-custom">
            {sections.map((section, sectionIdx) => (
              <section key={sectionIdx} className="mb-16 md:mb-24">
                <h2
                  id={section.anchorId}
                  className="mb-4 scroll-mt-24 font-serif text-2xl text-primary dark:text-stone-200 sm:text-3xl"
                >
                  {section.title}
                </h2>

                {/* Main section content (inline markdown: bold/italic/links) */}
                <div
                  className="mb-6 whitespace-pre-line text-[15px] leading-[1.8] text-primary dark:text-stone-200 md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: renderInlineMarkdown(section.content),
                  }}
                />

                {/* Subsections */}
                {section.subsections && (
                  <div className="space-y-6 ml-0 md:ml-4">
                    {section.subsections.map((subsection, subIdx) => (
                      <div
                        key={subIdx}
                        className="pl-5 border-l-2 border-deep/20"
                      >
                        <h3
                          id={subsection.anchorId}
                          className="mb-2 scroll-mt-24 font-serif text-lg text-primary dark:text-stone-200"
                        >
                          {subsection.title}
                        </h3>
                        <div
                          className="whitespace-pre-line text-[15px] leading-[1.75] text-primary dark:text-stone-200"
                          dangerouslySetInnerHTML={{
                            __html: renderInlineMarkdown(subsection.content),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways */}
          <section
            className={`my-12 bg-gradient-to-br from-[#faf8f5] to-canvas dark:from-[#252420] dark:to-[#302e2a] rounded-xl p-6 md:p-8 border-l-4 border-y border-r border-stone-200/60 dark:border-[var(--border-default)] ${track.borderAccent}`}
          >
            <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl text-primary dark:text-stone-200 sm:text-3xl">
              <CheckCircle2 className={`h-5 w-5 ${track.iconText}`} />
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 ${track.dotBg}`}
                  />
                  <span className="text-[15px] leading-relaxed text-primary dark:text-stone-200">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Further Reading */}
          <section className="my-12">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl text-primary dark:text-stone-200 sm:text-3xl">
              <BookOpen className="h-5 w-5 text-secondary dark:text-stone-400" />
              Further Reading
            </h2>
            <div className="space-y-2">
              {guide.furtherReading.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 rounded-xl border border-stone-200/60 bg-white/80 p-4 transition-all duration-200 hover:border-deep/30 hover:shadow-sm dark:border-[var(--border-default)] dark:bg-[#252420]/80 dark:hover:border-teal-400/50 sm:items-center"
                >
                  <div className="min-w-0 text-sm sm:text-base">
                    <span className="font-medium text-primary dark:text-stone-200">{item.title}</span>
                    <span className="text-muted dark:text-stone-400 mx-2">by</span>
                    <span className="text-secondary dark:text-stone-400">{item.author}</span>
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${item.title} in a new tab`}
                      title={`Open ${item.title} in a new tab`}
                      className="flex min-h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-lg text-deep transition-colors hover:bg-deep/10 hover:text-deep-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep dark:text-teal-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-200 dark:focus-visible:ring-teal-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Navigation — same track first, then the rest of the curriculum */}
          <nav className="mt-14 pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
            {(() => {
              const others = guides.filter((g) => g.id !== guide.id);
              const sameTrack = others.filter(
                (g) => getGuideTrack(g.id).id === track.id
              );
              const otherTracks = others.filter(
                (g) => getGuideTrack(g.id).id !== track.id
              );

              const renderCard = (otherGuide: (typeof guides)[number], idx: number) => {
                const OtherIcon = getGuideIcon(otherGuide.id);
                const otherTrack = getGuideTrack(otherGuide.id);
                return (
                  <Link
                    key={otherGuide.id}
                    href={`/guides/${otherGuide.id}`}
                    className={`group flex items-center gap-3 p-4 rounded-xl bg-white/80 dark:bg-[#252420]/80 border border-stone-200/60 dark:border-[var(--border-default)] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in ${otherTrack.hoverBorder}`}
                    style={{ animationDelay: `${(idx % 6) * 60}ms` }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-200/40 dark:border-[var(--border-default)] ${otherTrack.iconBg}`}
                    >
                      <OtherIcon
                        className={`h-5 w-5 ${otherTrack.iconText}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-teal-300">
                        {otherGuide.title}
                      </p>
                      <p className="text-xs text-muted dark:text-stone-400 truncate">
                        {otherGuide.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-stone-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-deep dark:text-stone-500 dark:group-hover:text-teal-300" />
                  </Link>
                );
              };

              return (
                <>
                  {sameTrack.length > 0 && (
                    <>
                      <p className="text-sm text-muted dark:text-stone-400 mb-5 font-medium">
                        More in {track.numeral}. {track.label}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3 mb-10">
                        {sameTrack.map(renderCard)}
                      </div>
                    </>
                  )}

                  {otherTracks.length > 0 && (
                    <>
                      <p className="text-sm text-muted dark:text-stone-400 mb-5 font-medium">
                        Other tracks
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {otherTracks.map(renderCard)}
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </nav>
        </article>
      </div>
    </AppShell>
  );
}
