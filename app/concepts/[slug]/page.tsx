import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Target,
  Scale,
  Lightbulb,
  AlertTriangle,
  Layers,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { concepts, getConceptBySlug, getAllConceptSlugs } from "@/data/concepts";
import { topics } from "@/data/topics";
import { AppShell } from "@/components/AppShell";

// ---------------------------------------------------------------------------
// Icon map -- lucide-react icons by name
// ---------------------------------------------------------------------------
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>> = {
  Shield,
  Target,
  Scale,
  Lightbulb,
  AlertTriangle,
  Layers,
};

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
  if (!concept) return { title: "Concept Not Found" };

  const firstParagraph = concept.description.split("\n\n")[0];

  return {
    title: `${concept.title} -- Key Concept | Argumend`,
    description: firstParagraph.slice(0, 160),
    alternates: {
      canonical: `https://argumend.org/concepts/${concept.id}`,
    },
    openGraph: {
      title: `${concept.title} -- Key Concept | Argumend`,
      description: firstParagraph.slice(0, 160),
      url: `https://argumend.org/concepts/${concept.id}`,
      type: "article",
      siteName: "Argumend",
    },
    twitter: {
      card: "summary_large_image",
      title: `${concept.title} -- Key Concept | Argumend`,
      description: firstParagraph.slice(0, 160),
    },
  };
}

// ---------------------------------------------------------------------------
// Page component (server)
// ---------------------------------------------------------------------------
export default async function ConceptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  const Icon = iconMap[concept.iconName] ?? BookOpen;

  // Resolve topic examples to full topic objects
  const topicExamples = concept.topicExamples
    .map((id) => topics.find((t) => t.id === id))
    .filter(Boolean);

  // Resolve related concepts
  const relatedConcepts = concept.relatedConcepts
    .map((id) => concepts.find((c) => c.id === id))
    .filter(Boolean);

  // Split description into paragraphs
  const paragraphs = concept.description.split("\n\n");

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: concept.title,
    description: paragraphs[0]?.slice(0, 160),
    url: `https://argumend.org/concepts/${concept.id}`,
    publisher: {
      "@type": "Organization",
      name: "Argumend",
      url: "https://argumend.org",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/concepts/${concept.id}`,
    },
    about: {
      "@type": "Thing",
      name: concept.title,
    },
  };

  return (
    <AppShell>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 md:px-8 py-6 md:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-secondary">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-muted" />
            </li>
            <li>
              <Link href="/concepts" className="hover:text-primary transition-colors">
                Concepts
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-muted" />
            </li>
            <li className="text-primary font-medium">{concept.title}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-start gap-5 mb-6">
            <div className="p-4 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-xl border border-[#e8e0d4] flex-shrink-0">
              <Icon className="h-7 w-7 text-deep" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-[12px] font-medium text-muted uppercase tracking-wide mb-2">
                Key Concept
              </p>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-primary leading-[1.1]">
                {concept.title}
              </h1>
            </div>
          </div>
        </header>

        {/* Full Description */}
        <section className="mb-12 md:mb-16">
          <div className="space-y-5 text-base md:text-[17px] text-primary leading-[1.8]">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Key Points */}
        <section className="mb-12 md:mb-16">
          <h2 className="font-serif text-xl md:text-2xl text-primary mb-6">
            Key Points
          </h2>
          <div className="bg-[#faf8f5] rounded-xl border border-[#e8e0d4] p-6 md:p-8">
            <ul className="space-y-4">
              {concept.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 text-deep flex-shrink-0 mt-0.5"
                    strokeWidth={1.8}
                  />
                  <span className="text-primary leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* See It In Action */}
        {topicExamples.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="font-serif text-xl md:text-2xl text-primary mb-3">
              See It in Action
            </h2>
            <p className="text-secondary mb-6">
              Explore topics where {concept.title.toLowerCase()} plays a central role in the analysis.
            </p>
            <div className="grid gap-3">
              {topicExamples.map((topic) => (
                <Link
                  key={topic!.id}
                  href={`/?topic=${topic!.id}`}
                  className="group flex items-center justify-between p-4 rounded-lg bg-[#faf8f5] border border-[#e8e0d4] hover:border-[#4f7b77]/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#4f7b77]" />
                    <span className="text-primary font-medium group-hover:text-deep transition-colors">
                      {topic!.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-deep transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Concepts */}
        {relatedConcepts.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="font-serif text-xl md:text-2xl text-primary mb-6">
              Related Concepts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedConcepts.map((related) => {
                const RelatedIcon = iconMap[related!.iconName] ?? BookOpen;
                return (
                  <Link
                    key={related!.id}
                    href={`/concepts/${related!.id}`}
                    className="group bg-white/80 rounded-xl p-5 border border-[#e8e0d4] hover:border-[#4f7b77]/30 hover:shadow-sm transition-all"
                  >
                    <div className="p-2.5 bg-gradient-to-br from-[#f5f1ea] to-[#ebe6de] rounded-lg border border-[#e8e0d4] w-fit mb-3">
                      <RelatedIcon className="h-4 w-4 text-deep" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-serif text-lg text-primary group-hover:text-deep transition-colors mb-1">
                      {related!.title}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-2">
                      {related!.description.split("\n\n")[0]?.slice(0, 100)}...
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-10 border-t border-stone-200/80">
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">
            Ready to explore the debates?
          </h3>
          <p className="text-secondary mb-7">
            See how these concepts come together in real argument maps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1f1f1d] text-white text-sm font-medium hover:bg-[#3a3a38] transition-colors"
            >
              Explore Topics
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/concepts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300 text-primary text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              All Concepts
              <BookOpen className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t border-stone-200 mt-8">
          <p className="text-sm text-muted italic text-center">
            Understanding the framework is the first step toward better reasoning.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
