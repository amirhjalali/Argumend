import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Quote, Eye, ShieldCheck } from "lucide-react";
import { fallacies, getFallacyBySlug, getAllFallacySlugs } from "@/data/fallacies";
import { topicSummaries } from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

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
  if (!fallacy) return { title: "Fallacy Not Found" };

  const title = `${fallacy.name} — Logical Fallacy`;
  const description = fallacy.shortDefinition.slice(0, 160);
  const url = `https://argumend.org/fallacies/${fallacy.slug}`;
  const ogImage = `https://argumend.org/api/og?title=${encodeURIComponent(fallacy.name)}&subtitle=${encodeURIComponent("Logical Fallacy")}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Argumend",
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
// Page component (server)
// ---------------------------------------------------------------------------
export default async function FallacyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fallacy = getFallacyBySlug(slug);
  if (!fallacy) notFound();

  const paragraphs = fallacy.longDescription.split("\n\n");

  // Resolve related fallacies to full objects
  const relatedFallacies = (fallacy.relatedFallacies ?? [])
    .map((s) => fallacies.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  // Resolve related topics from the lightweight topic index
  const relatedTopics = (fallacy.relatedTopicIds ?? [])
    .map((id) => topicSummaries.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

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

  return (
    <AppShell>
      <JsonLd data={jsonLd} />

      <div className="min-h-full">
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-16">
          {/* Breadcrumb with BreadcrumbList JSON-LD */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Fallacies", href: "/fallacies" },
              { label: fallacy.name },
            ]}
          />

          {/* Hero */}
          <header className="mb-12 md:mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
              Logical Fallacy
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              {fallacy.name}
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed">
              {fallacy.shortDefinition}
            </p>
            {fallacy.aliases.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {fallacy.aliases.map((alias) => (
                  <span
                    key={alias}
                    className="text-[11px] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-[#302e2a] px-2.5 py-1 rounded-full"
                  >
                    {alias}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Long description */}
          <section className="mb-12 md:mb-16">
            <div className="space-y-5 text-base md:text-[17px] text-primary leading-[1.8]">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Example */}
          <section className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-4">
              <Quote className="h-5 w-5 text-deep" strokeWidth={1.8} />
              <h2 className="font-serif text-2xl sm:text-3xl text-primary">Example</h2>
            </div>
            <blockquote className="bg-white/80 dark:bg-[#252420]/80 rounded-xl border-l-4 border-[#C4613C] border-y border-r border-stone-200/60 dark:border-[var(--border-default)] p-6 md:p-8">
              <p className="text-primary leading-[1.8] italic">{fallacy.example}</p>
            </blockquote>
          </section>

          {/* Why it misleads */}
          <section className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-deep" strokeWidth={1.8} />
              <h2 className="font-serif text-2xl sm:text-3xl text-primary">
                Why It Misleads
              </h2>
            </div>
            <div className="bg-white/80 dark:bg-[#252420]/80 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] p-6 md:p-8">
              <p className="text-primary leading-[1.8]">{fallacy.whyItMisleads}</p>
            </div>
          </section>

          {/* How to counter */}
          <section className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-deep" strokeWidth={1.8} />
              <h2 className="font-serif text-2xl sm:text-3xl text-primary">
                How to Counter It
              </h2>
            </div>
            <div className="bg-white/80 dark:bg-[#252420]/80 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] p-6 md:p-8">
              <p className="text-primary leading-[1.8]">{fallacy.howToCounter}</p>
            </div>
          </section>

          {/* Related topics */}
          {relatedTopics.length > 0 && (
            <section className="mb-12 md:mb-16">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-deep" strokeWidth={1.8} />
                <h2 className="font-serif text-2xl sm:text-3xl text-primary">
                  See It in Real Debates
                </h2>
              </div>
              <p className="text-secondary mb-6 leading-relaxed">
                This fallacy frequently shows up in arguments about these topics.
                Explore the structured argument maps to see the reasoning laid bare.
              </p>
              <div className="grid gap-3">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/?topic=${topic.id}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/80 dark:bg-[#252420]/80 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-deep" />
                      <span className="text-primary font-medium group-hover:text-deep transition-colors">
                        {topic.title}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-stone-300 dark:text-stone-600 group-hover:text-deep group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related fallacies */}
          {relatedFallacies.length > 0 && (
            <section className="mb-12 md:mb-16">
              <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                Related Fallacies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedFallacies.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/fallacies/${related.slug}`}
                    className="group bg-white/80 dark:bg-[#252420]/80 rounded-xl p-5 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 hover:shadow-sm transition-all duration-200"
                  >
                    <h3 className="font-serif text-lg text-primary group-hover:text-deep transition-colors mb-1">
                      {related.name}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-2">
                      {related.shortDefinition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="text-center py-10 border-t border-stone-200/60 dark:border-[var(--border-default)]">
            <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">
              Strengthen your reasoning
            </h3>
            <p className="text-secondary mb-7 leading-relaxed">
              The best defense against fallacies is steel-manning — engaging the
              strongest version of every argument. See how it works in practice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-semibold font-serif shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Argument Maps
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/fallacies"
                className="inline-flex items-center px-5 py-2.5 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] text-primary text-sm font-medium hover:border-deep/30 hover:bg-stone-50 dark:hover:bg-[#302e2a] transition-all duration-200"
              >
                All Fallacies
              </Link>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-6 border-t border-stone-200/60 dark:border-[var(--border-default)] mt-4">
            <p className="text-sm text-muted italic text-center">
              A fallacious argument can still reach a true conclusion — the issue
              is always the reasoning path.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
