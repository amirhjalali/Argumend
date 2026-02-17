import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, CheckCircle2, ExternalLink, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { guides, getGuideById } from "@/data/guides";
import { notFound } from "next/navigation";

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

  return {
    title: `${guide.title} -- Guide | Argumend`,
    description: guide.description.slice(0, 160),
    alternates: {
      canonical: `https://argumend.org/guides/${guide.id}`,
    },
    openGraph: {
      title: `${guide.title} -- Guide | Argumend`,
      description: guide.description.slice(0, 160),
      url: `https://argumend.org/guides/${guide.id}`,
      type: "article",
      siteName: "Argumend",
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} -- Guide | Argumend`,
      description: guide.description.slice(0, 160),
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

  const Icon = guide.icon;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: `https://argumend.org/guides/${guide.id}`,
    publisher: {
      "@type": "Organization",
      name: "Argumend",
      url: "https://argumend.org",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/guides/${guide.id}`,
    },
  };

  return (
    <AppShell>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-full">
        <article className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
          {/* Back link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-deep transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All Guides
          </Link>

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-stone-200/60">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200/60"
                style={{ backgroundColor: `${guide.color}12` }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{ color: guide.color }}
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-deep/10 border border-deep/20 rounded-full text-xs font-medium text-deep">
                  Foundational Guide
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {guide.readTime}
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              {guide.title}
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              {guide.subtitle}
            </p>
          </header>

          {/* Main Content */}
          <div className="prose-custom">
            {guide.sections.map((section, sectionIdx) => (
              <section key={sectionIdx} className="mb-16 md:mb-24">
                <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                  {section.title}
                </h2>

                {/* Main section content */}
                <div className="text-primary leading-[1.8] whitespace-pre-line text-[15px] md:text-base mb-6">
                  {section.content}
                </div>

                {/* Subsections */}
                {section.subsections && (
                  <div className="space-y-6 ml-0 md:ml-4">
                    {section.subsections.map((subsection, subIdx) => (
                      <div
                        key={subIdx}
                        className="pl-5 border-l-2 border-deep/20"
                      >
                        <h3 className="font-serif text-lg text-primary mb-2">
                          {subsection.title}
                        </h3>
                        <div className="text-primary leading-[1.75] whitespace-pre-line text-[15px]">
                          {subsection.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways */}
          <section className="my-12 bg-gradient-to-br from-[#faf8f5] to-canvas rounded-xl p-6 md:p-8 border border-stone-200/60">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-deep" />
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                    style={{ backgroundColor: guide.color }}
                  />
                  <span className="text-primary leading-relaxed text-[15px]">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Further Reading */}
          <section className="my-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              Further Reading
            </h2>
            <div className="space-y-2">
              {guide.furtherReading.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/80 border border-stone-200/60 hover:border-deep/30 hover:shadow-sm transition-all duration-200"
                >
                  <div>
                    <span className="font-medium text-primary">{item.title}</span>
                    <span className="text-muted mx-2">by</span>
                    <span className="text-secondary">{item.author}</span>
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-deep hover:text-deep-dark transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <nav className="mt-14 pt-8 border-t border-stone-200/60">
            <p className="text-sm text-muted mb-5 font-medium">Continue learning</p>
            <div className="grid md:grid-cols-2 gap-3">
              {guides
                .filter((g) => g.id !== guide.id)
                .map((otherGuide, idx) => {
                  const OtherIcon = otherGuide.icon;
                  return (
                    <Link
                      key={otherGuide.id}
                      href={`/guides/${otherGuide.id}`}
                      className="group flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-stone-200/60 hover:border-deep/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-200/40"
                        style={{ backgroundColor: `${otherGuide.color}12` }}
                      >
                        <OtherIcon
                          className="h-5 w-5"
                          style={{ color: otherGuide.color }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary group-hover:text-deep transition-colors truncate">
                          {otherGuide.title}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {otherGuide.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-deep group-hover:translate-x-0.5 flex-shrink-0 transition-all duration-200" />
                    </Link>
                  );
                })}
            </div>
          </nav>
        </article>
      </div>
    </AppShell>
  );
}
