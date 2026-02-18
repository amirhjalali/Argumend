import Link from "next/link";
import { listAnalyses } from "@/lib/db/queries";
import { AppShell } from "@/components/AppShell";
import {
  Brain,
  ChevronRight,
  Clock,
  FileSearch,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent Analyses | Argumend",
  description:
    "Browse recent argument analyses on Argumend. See AI-extracted positions, cruxes, and quality scores for debates, articles, and transcripts.",
  alternates: {
    canonical: "https://argumend.org/analyses",
  },
};

export default async function AnalysesPage() {
  let analyses: Awaited<ReturnType<typeof listAnalyses>> = [];

  try {
    analyses = await listAnalyses(50);
  } catch {
    // DB may not be available during build
  }

  return (
    <AppShell>
      <div className="min-h-full">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-14 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep/10 border border-deep/20 rounded-full text-xs font-medium text-deep tracking-wide">
              <Brain className="h-3 w-3" />
              Analysis Archive
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              Recent Analyses
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
              Past analyses live here. Click any one to see the full
              breakdown, or share it with someone who disagrees with you.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-xl text-sm font-semibold font-serif shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <Brain className="h-4 w-4" />
              Analyze something
            </Link>
          </div>

          {/* Analyses List */}
          {analyses.length === 0 ? (
            <div className="bg-white/80 border border-stone-200/60 rounded-xl p-10 md:p-14 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-stone-100 mb-5">
                <FileSearch className="h-7 w-7 text-muted" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-primary mb-2">
                Nothing here yet
              </h3>
              <p className="text-secondary text-sm max-w-xs mx-auto mb-6 leading-relaxed">
                This is where your analyses will live. Paste a debate, article, or
                transcript and we&apos;ll do the rest.
              </p>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-xl text-sm font-semibold font-serif shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Brain className="h-3.5 w-3.5" />
                Analyze your first text
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {analyses.map((analysis, index) => {
                const date = new Date(analysis.createdAt).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                );
                const confidencePct = Math.round(analysis.confidence * 100);
                return (
                  <Link
                    key={analysis.id}
                    href={`/analysis/${analysis.id}`}
                    className="group block bg-white/80 border border-stone-200/60 rounded-xl p-5 md:p-6 shadow-card hover:border-deep/30 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base md:text-lg font-medium text-primary group-hover:text-deep transition-colors truncate">
                          {analysis.topic}
                        </h3>
                        {analysis.summary && (
                          <p className="mt-1.5 text-sm text-secondary line-clamp-2 leading-relaxed">
                            {analysis.summary}
                          </p>
                        )}

                        {/* Confidence bar */}
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex-1 max-w-[120px] h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-deep rounded-full transition-all duration-500"
                              style={{ width: `${confidencePct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-deep font-medium">
                            {confidencePct}%
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {date}
                          </span>
                          <span className="px-2 py-0.5 bg-stone-100 rounded-full text-stone-500 text-[11px]">
                            {analysis.contentType}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-deep group-hover:translate-x-0.5 flex-shrink-0 mt-1 transition-all duration-200" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
