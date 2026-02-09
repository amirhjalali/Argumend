import Link from "next/link";
import { listAnalyses } from "@/lib/db/queries";
import { AppShell } from "@/components/AppShell";
import {
  Brain,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recent Analyses",
  description:
    "Browse recent argument analyses on ARGUMEND. See AI-extracted positions, cruxes, and quality scores for debates, articles, and transcripts.",
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
      <div className="bg-[#faf8f5] min-h-full">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4f7b77]/10 border border-[#4f7b77]/20 rounded-full text-xs font-medium text-[#4f7b77] tracking-wide">
              <Brain className="h-3 w-3" />
              Analysis Archive
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1f1f1d]">
              Recent Analyses
            </h1>
            <p className="text-[#6d645c] text-sm max-w-lg mx-auto">
              Browse past argument analyses. Click any analysis to view
              the full breakdown and share it.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-semibold font-serif shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Run New Analysis
            </Link>
          </div>

          {/* Analyses List */}
          {analyses.length === 0 ? (
            <div className="bg-white border border-stone-200/60 rounded-xl p-8 text-center">
              <p className="text-[#6d645c] text-sm">
                No analyses yet. Run your first analysis to see results here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {analyses.map((analysis) => {
                const date = new Date(analysis.createdAt).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                );
                return (
                  <Link
                    key={analysis.id}
                    href={`/analysis/${analysis.id}`}
                    className="group block bg-white border border-stone-200/60 rounded-xl p-4 md:p-5 hover:border-stone-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-[#1f1f1d] group-hover:text-[#4f7b77] transition-colors truncate">
                          {analysis.topic}
                        </h3>
                        <p className="mt-1 text-sm text-[#6d645c] line-clamp-2">
                          {analysis.summary}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-stone-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {date}
                          </span>
                          <span>
                            {Math.round(analysis.confidence * 100)}% confidence
                          </span>
                          <span className="px-2 py-0.5 bg-stone-100 rounded-full text-stone-500">
                            {analysis.contentType}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-[#4f7b77] flex-shrink-0 mt-1 transition-colors" />
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
