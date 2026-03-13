import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import summaries from "@/data/topicSummaries.json";

// ---------------------------------------------------------------------------
// Static metadata — exported from a Server Component for SEO
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "ARGUMEND — Map Arguments, Not Win Them",
  description:
    "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters. Explore 52 topics analyzed with structured reasoning.",
  openGraph: {
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
    url: "https://www.argumend.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARGUMEND — Map Arguments, Not Win Them",
    description:
      "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
  },
  alternates: {
    canonical: "https://www.argumend.org",
  },
};

// ---------------------------------------------------------------------------
// Server-side topic data for SEO-friendly static rendering
// ---------------------------------------------------------------------------

interface TopicSummary {
  id: string;
  title: string;
  meta_claim: string;
  confidence_score: number;
  status: string;
  category: string;
  pillarCount: number;
}

const topicSummaries: TopicSummary[] = summaries as TopicSummary[];

const FEATURED_TOPIC_ID = "social-media-mental-health";
const FEATURED_REASON =
  "The Surgeon General just called for warning labels on social media. Where does the evidence actually land?";

const CATEGORY_ORDER = ["policy", "technology", "science", "economics", "philosophy"];
const DISPLAY_TOPICS_COUNT = 6;

function getDisplayTopics() {
  const featured = topicSummaries.find((t) => t.id === FEATURED_TOPIC_ID) ?? null;
  const nonFeatured = topicSummaries.filter((t) => t.id !== FEATURED_TOPIC_ID);
  const displayed: TopicSummary[] = [];

  // One topic per category for variety
  for (const cat of CATEGORY_ORDER) {
    const found = nonFeatured.find((t) => t.category === cat);
    if (found) displayed.push(found);
  }

  // Fill remaining slots
  if (displayed.length < DISPLAY_TOPICS_COUNT) {
    const usedIds = new Set(displayed.map((t) => t.id));
    for (const t of nonFeatured) {
      if (displayed.length >= DISPLAY_TOPICS_COUNT) break;
      if (!usedIds.has(t.id)) {
        displayed.push(t);
        usedIds.add(t.id);
      }
    }
  }

  return { featured, displayed: displayed.slice(0, DISPLAY_TOPICS_COUNT) };
}

// ---------------------------------------------------------------------------
// Loading fallback — mirrors the hero layout structure for smooth transition
// ---------------------------------------------------------------------------

function HomeLoadingFallback() {
  const { featured, displayed } = getDisplayTopics();
  const remainingCount = topicSummaries.length - displayed.length - (featured ? 1 : 0);

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      {/* Static header bar */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#f4f1eb]/90 backdrop-blur-sm px-4 md:px-6 py-3 text-primary border-b border-stone-200/40">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="h-11 w-11 -ml-2" />
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-medium tracking-[0.08em] text-primary leading-none">
                ARGUMEND
              </span>
              <span className="text-[10px] font-sans text-stone-500 leading-none mt-1">
                Disagree better.
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-[13px] text-stone-500 italic font-serif">
            What would change your mind?
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/analyze"
            className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-rust-600 text-sm font-medium hover:text-rust-800 hover:bg-rust-50/60 rounded-lg transition-colors"
          >
            <span className="hidden sm:inline">Analyze</span>
          </Link>
          <Link
            href="/how-it-works"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-stone-500 text-sm hover:text-stone-800 transition-colors"
          >
            <span>How it works</span>
          </Link>
        </div>
      </header>

      {/* Hero content */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main id="main-content" className="relative flex-1 min-w-0 overflow-y-auto">
          <div className="flex flex-col bg-gradient-to-b from-[#f4f1eb] to-stone-50">
            {/* Hero heading */}
            <div className="flex flex-col items-center px-4 md:px-8 pt-8 pb-4">
              <div className="w-full max-w-2xl space-y-5">
                <div className="text-center space-y-4">
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
                    What if we could disagree
                    <br />
                    <span className="text-deep">
                      without destroying each other?
                    </span>
                  </h1>
                  <p className="font-serif text-lg md:text-xl text-stone-600 max-w-lg mx-auto leading-relaxed">
                    Map every argument. Weigh the evidence. Know where you stand.
                  </p>
                </div>

                {/* Placeholder for the interactive input card */}
                <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-lg shadow-stone-200/30">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="inline-flex bg-stone-100 rounded-xl p-1 gap-0.5">
                      <span className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium bg-deep text-white shadow-sm">
                        Freeform
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium bg-transparent text-stone-500">
                        Article
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium bg-transparent text-stone-500">
                        Transcript
                      </span>
                    </div>
                  </div>
                  <div className="w-full min-h-[140px] md:min-h-[160px] p-4 bg-[#faf8f5] border border-stone-200/60 rounded-xl text-stone-500/70 text-sm leading-relaxed">
                    Paste an article, argument, or any text you&apos;d like analyzed...
                  </div>
                  <div className="flex items-center justify-end mt-4">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif font-semibold text-sm border border-deep/20 text-deep bg-deep/5">
                        Try an Example
                      </span>
                      <span className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-serif font-semibold text-sm bg-stone-100 text-stone-400">
                        Analyze
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics section — fully server-rendered for SEO */}
            <div className="px-4 md:px-8 pb-12">
              <div className="max-w-4xl mx-auto">
                <p className="text-xs font-medium text-stone-400 tracking-wide mb-5">
                  Or explore a mapped debate
                </p>

                {/* Featured topic */}
                {featured && (
                  <Link
                    href={`/topics/${featured.id}`}
                    className="group block w-full text-left mb-5 rounded-xl bg-gradient-to-r from-[#fefcf9] to-white border border-stone-200/60 border-l-[3.5px] border-l-deep shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-medium text-deep/70 tracking-wide">
                          Featured
                        </span>
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-semibold text-primary group-hover:text-deep transition-colors leading-snug">
                        {featured.title}
                      </h3>
                      <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                        {FEATURED_REASON}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
                        <span>{featured.pillarCount} pillars</span>
                        <span className="text-stone-300">&middot;</span>
                        <span
                          className={
                            featured.status === "contested"
                              ? "text-rust-500"
                              : featured.status === "settled"
                              ? "text-emerald-500"
                              : "text-stone-400"
                          }
                        >
                          {featured.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Topic grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
                  {displayed.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/topics/${topic.id}`}
                      className="group text-left p-4 bg-white border border-stone-200/60 rounded-xl hover:border-rust-300/60 hover:shadow-md transition-all card-hover"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-sm font-medium text-primary group-hover:text-rust-700 transition-colors leading-snug">
                          {topic.title}
                        </h3>
                        <span
                          className={`flex-shrink-0 text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                            topic.confidence_score >= 80
                              ? "bg-emerald-50 text-emerald-600"
                              : topic.confidence_score >= 50
                              ? "bg-rust-50 text-rust-600"
                              : "bg-stone-50 text-stone-500"
                          }`}
                        >
                          {topic.confidence_score}%
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-stone-400 line-clamp-2">
                        {topic.meta_claim}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-400">
                        <span
                          className={`px-1.5 py-0.5 rounded-full border ${
                            topic.status === "settled"
                              ? "border-emerald-200 text-emerald-500"
                              : topic.status === "contested"
                              ? "border-rust-200 text-rust-500"
                              : "border-stone-200 text-stone-400"
                          }`}
                        >
                          {topic.status}
                        </span>
                        <span>{topic.pillarCount} pillars</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View all topics */}
                {remainingCount > 0 && (
                  <div className="mt-5 text-center">
                    <Link
                      href="/topics"
                      className="inline-flex items-center gap-1 text-sm font-serif font-medium text-deep hover:text-deep-dark transition-colors"
                    >
                      View all {topicSummaries.length} topics
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lazy-loaded client component — wraps ReactFlowProvider + all interactivity
// ---------------------------------------------------------------------------

import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ARGUMEND",
          url: "https://argumend.org",
          description:
            "Visual argument mapping for controversial topics. See both sides, weigh the evidence, find what actually matters.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://argumend.org/topics?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Suspense fallback={<HomeLoadingFallback />}>
        <HomeClient />
      </Suspense>
    </>
  );
}
