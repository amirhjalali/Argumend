import Link from "next/link";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topics";
import { getAllQuestionVariations, getQuestionVariations } from "@/lib/questions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  getQuestionCategoryMeta,
  classifyQuestion,
  questionKinds,
  questionKindOrder,
} from "@/lib/questionMeta";
import { QuestionsSearch } from "./QuestionsSearch";

// ---------------------------------------------------------------------------
// ISR: Revalidate every 24 hours
// ---------------------------------------------------------------------------

export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const allVariations = getAllQuestionVariations(topics);
const totalCount = allVariations.length;

export const metadata: Metadata = {
  title: `${totalCount}+ Questions Analyzed with Evidence — ARGUMEND`,
  description: `Browse ${totalCount}+ controversial questions across policy, technology, science, economics, and philosophy. Each question is analyzed with steel-manned arguments, weighted evidence, and crux questions.`,
  keywords: [
    "controversial questions",
    "debate questions",
    "argument analysis",
    "evidence-based answers",
    "critical thinking questions",
    "pros and cons",
  ],
  alternates: {
    canonical: "https://argumend.org/questions",
  },
  openGraph: {
    title: `${totalCount}+ Questions Analyzed with Evidence`,
    description: `Browse controversial questions across 5 categories. Steel-manned arguments, weighted evidence, and crux questions for each.`,
    url: "https://argumend.org/questions",
    siteName: "ARGUMEND",
    images: [
      {
        url: `https://argumend.org/api/og?title=${encodeURIComponent(`${totalCount}+ Questions Analyzed`)}&subtitle=${encodeURIComponent("Evidence-based answers to controversial questions")}`,
        width: 1200,
        height: 630,
        alt: `${totalCount}+ Questions Analyzed with Evidence on Argumend`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${totalCount}+ Questions Analyzed with Evidence`,
    description: `Browse controversial questions with steel-manned arguments and weighted evidence.`,
    images: [`https://argumend.org/api/og?title=${encodeURIComponent(`${totalCount}+ Questions Analyzed`)}&subtitle=${encodeURIComponent("Evidence-based answers to controversial questions")}`],
  },
};

// ---------------------------------------------------------------------------
// Build grouped data for the page
// ---------------------------------------------------------------------------

interface TopicQuestionGroup {
  topicId: string;
  topicTitle: string;
  category: string;
  questions: { slug: string; question: string }[];
}

function getGroupedQuestions(): Record<string, TopicQuestionGroup[]> {
  const grouped: Record<string, TopicQuestionGroup[]> = {};

  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = [];
  }

  for (const topic of topics) {
    const variations = getQuestionVariations(topic);
    if (variations.length === 0) continue;

    const group: TopicQuestionGroup = {
      topicId: topic.id,
      topicTitle: topic.title,
      category: topic.category,
      questions: variations.map((v) => ({
        slug: v.slug,
        question: v.question,
      })),
    };

    if (!grouped[topic.category]) {
      grouped[topic.category] = [];
    }
    grouped[topic.category].push(group);
  }

  return grouped;
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function QuestionsIndexPage() {
  const grouped = getGroupedQuestions();

  // Per-category totals, used by the jump-nav chips and section headers.
  const countByCategory = new Map<string, number>(
    CATEGORY_ORDER.map((cat) => [
      cat,
      (grouped[cat] ?? []).reduce((sum, g) => sum + g.questions.length, 0),
    ])
  );

  // Build flat list for search component
  const allQuestions = allVariations.map((v) => {
    const topic = topics.find((t) => t.id === v.topicId);
    return {
      slug: v.slug,
      question: v.question,
      topicTitle: topic?.title ?? "",
      topicId: v.topicId,
    };
  });

  // JSON-LD: CollectionPage schema
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${totalCount}+ Questions Analyzed with Evidence`,
    description: `Browse ${totalCount}+ controversial questions across policy, technology, science, economics, and philosophy.`,
    url: "https://argumend.org/questions",
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
    numberOfItems: totalCount,
    hasPart: allVariations.slice(0, 50).map((v) => ({
      "@type": "QAPage",
      url: `https://argumend.org/questions/${v.slug}`,
      name: v.question,
    })),
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />

      <div className="min-h-[100svh] bg-canvas">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Questions" },
            ]}
          />

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Questions we analyze
            </h1>
            <p className="mt-4 font-sans text-lg text-secondary">
              {totalCount} questions across {CATEGORY_ORDER.length} categories
              — each one analyzed with steel-manned arguments, weighted
              evidence, and crux questions that could resolve the debate.
            </p>
          </div>

          {/* Search */}
          <QuestionsSearch questions={allQuestions} />

          {/* At-a-glance category index — doubles as a jump-to-section nav */}
          <nav
            aria-label="Question categories"
            className="mt-8 flex flex-wrap gap-2"
          >
            {CATEGORY_ORDER.map((cat) => {
              const count = countByCategory.get(cat) ?? 0;
              if (count === 0) return null;
              const meta = getQuestionCategoryMeta(cat);
              const Icon = meta.icon;
              return (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2.5 pr-3 font-sans text-xs font-medium transition-colors ${meta.chip}`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                  {CATEGORY_LABELS[cat]}
                  <span className="tabular-nums opacity-60">{count}</span>
                </a>
              );
            })}
          </nav>

          {/* Legend: what the marks on each question mean */}
          <div className="mt-6 rounded-xl border border-stone-200 bg-panel p-4 dark:border-[var(--border-default)]">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">
              Every question is marked by what kind of answer it can have
            </p>
            <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {questionKindOrder.map((id) => {
                const kind = questionKinds[id];
                const Icon = kind.icon;
                return (
                  <div key={id} className="flex items-start gap-2.5">
                    <Icon
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <dt className="font-sans text-sm font-semibold text-primary">
                        {kind.label}
                      </dt>
                      <dd className="font-sans text-xs leading-relaxed text-secondary">
                        {kind.description}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Category sections */}
          {CATEGORY_ORDER.map((cat) => {
            const groups = grouped[cat];
            if (!groups || groups.length === 0) return null;

            const catLabel = CATEGORY_LABELS[cat];
            const questionCount = countByCategory.get(cat) ?? 0;
            const meta = getQuestionCategoryMeta(cat);
            const CategoryIcon = meta.icon;

            return (
              <section key={cat} className="mt-12 scroll-mt-20" id={cat}>
                <div
                  className={`mb-6 flex items-center justify-between gap-3 border-b pb-3 ${meta.ruleBorder}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${meta.iconBg}`}
                    >
                      <CategoryIcon
                        className={`h-[18px] w-[18px] ${meta.iconText}`}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-primary">
                      {catLabel}
                    </h2>
                  </div>
                  <span className="font-sans text-sm tabular-nums text-muted">
                    {questionCount} questions
                  </span>
                </div>

                <div className="space-y-8">
                  {groups.map((group) => (
                    <div key={group.topicId}>
                      <h3
                        className={`mb-3 font-sans text-sm font-semibold uppercase tracking-wide ${meta.accentText}`}
                      >
                        <Link
                          href={`/topics/${group.topicId}`}
                          className="transition-opacity hover:opacity-75"
                        >
                          {group.topicTitle}
                        </Link>
                      </h3>
                      <ul className="space-y-1.5">
                        {group.questions.map((q) => {
                          const KindIcon = classifyQuestion(q.question).icon;
                          return (
                            <li key={q.slug} className="flex items-start gap-2.5">
                              <KindIcon
                                className="mt-[0.3em] h-3.5 w-3.5 flex-shrink-0 text-muted/70"
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                              <Link
                                href={`/questions/${q.slug}`}
                                className="font-sans text-primary transition-colors hover:text-deep"
                              >
                                {q.question}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Bottom CTA */}
          <div className="mt-16 rounded-xl border border-rust-200 bg-rust-50 p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Want to explore the full evidence?
            </h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm text-secondary">
              Every question links to a detailed topic page with argument
              maps, weighted evidence scales, and crux questions.
            </p>
            <Link
              href="/topics"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-6 py-3 font-sans text-sm font-semibold text-white shadow-md transition-all hover:from-rust-600 hover:to-rust-700 hover:shadow-lg"
            >
              Browse all topics
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Footer attribution */}
          <footer className="mt-16 border-t border-stone-200 pt-6">
            <p className="font-sans text-xs text-muted">
              Every analysis uses structured argument mapping with
              steel-manned positions and independently weighted evidence.{" "}
              <Link
                href="/methodology"
                className="text-deep underline decoration-deep/30 hover:decoration-deep"
              >
                Read our methodology
              </Link>
              .
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
