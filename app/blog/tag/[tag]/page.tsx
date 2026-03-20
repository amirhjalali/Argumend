import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import {
  articles,
  getUniqueTags,
  tagToSlug,
} from "@/data/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getUniqueTags().map((t) => ({
    tag: tagToSlug(t),
  }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
type PageProps = { params: Promise<{ tag: string }> };

function findTagBySlug(slug: string): string | undefined {
  return getUniqueTags().find((t) => tagToSlug(t) === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = findTagBySlug(tagSlug);
  if (!tag) return { title: "Tag Not Found" };

  const title = `Articles tagged "${tag}"`;
  const description = `Browse all articles tagged "${tag}" on the Argumend Blog. Evidence-based analysis and structured reasoning.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ARGUMEND Blog`,
      description,
      type: "website",
      url: `https://argumend.org/blog/tag/${tagSlug}`,
      siteName: "ARGUMEND",
    },
    alternates: {
      canonical: `https://argumend.org/blog/tag/${tagSlug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = findTagBySlug(tagSlug);

  if (!tag) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-secondary">Tag not found.</p>
        </div>
      </AppShell>
    );
  }

  const filtered = articles
    .filter((a) => a.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged "${tag}"`,
    description: `All articles tagged "${tag}" on the Argumend Blog.`,
    url: `https://argumend.org/blog/tag/${tagSlug}`,
    isPartOf: {
      "@type": "Blog",
      name: "ARGUMEND Blog",
      url: "https://argumend.org/blog",
    },
  };

  return (
    <AppShell>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen">
        {/* Hero */}
        <div className="bg-[#faf8f5]/60 dark:bg-[#1a1916]/60 border-b border-[#e8e0d4] dark:border-[#3d3a36]">
          <div className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: `Tag: "${tag}"` },
              ]}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-4">
              Tag
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              &ldquo;{tag}&rdquo;
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}{" "}
              tagged with &ldquo;{tag}&rdquo;.
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article, index) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block animate-card-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <article className="relative h-full bg-[#faf8f5] dark:bg-[#252420] rounded-xl p-6 md:p-8 border border-stone-200/60 dark:border-[#3d3a36] shadow-card hover:border-[#c8c0b4] dark:hover:border-[#4a4640] hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-medium text-deep">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Clock className="h-3 w-3" />
                      {article.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl md:text-2xl tracking-tight text-primary group-hover:text-deep transition-colors mb-3 leading-tight">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-secondary leading-relaxed mb-5 max-w-2xl">
                    {article.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {article.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] ${
                          t === tag
                            ? "bg-deep/10 text-deep font-medium"
                            : "bg-stone-100 dark:bg-[#302e2a] text-stone-500"
                        }`}
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm font-medium text-deep group-hover:text-deep-dark transition-colors">
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Back to Blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-deep hover:text-deep-dark transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to all articles
            </Link>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
