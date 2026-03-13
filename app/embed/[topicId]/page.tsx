import { notFound } from "next/navigation";
import { topics } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";
import { getMockVerdict } from "@/data/mockVerdicts";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return topics.map((topic) => ({ topicId: topic.id }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ topicId: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) return { title: "Not Found" };

  return {
    title: `${topic.title} — ARGUMEND Embed`,
    description: topic.meta_claim,
    robots: { index: false, follow: false },
  };
}

// ---------------------------------------------------------------------------
// Confidence Bar
// ---------------------------------------------------------------------------

function ConfidenceBar({ score }: { score: number }) {
  const color =
    score >= 75 ? "bg-deep" : score >= 50 ? "bg-rust-500" : "bg-stone-400";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
          Confidence
        </span>
        <span className="text-sm font-mono font-semibold text-primary tabular-nums">
          {score}%
        </span>
      </div>
      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-[11px] text-stone-400 mt-1">
        {getVerdictLabel(score)}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Argument Card
// ---------------------------------------------------------------------------

function ArgumentCard({
  side,
  arguments: args,
}: {
  side: "for" | "against";
  arguments: { title: string; summary: string }[];
}) {
  const isFor = side === "for";

  return (
    <div
      className={`rounded-lg border p-3 ${
        isFor
          ? "border-rust-200 bg-rust-50/60"
          : "border-stone-200 bg-stone-50/60"
      }`}
    >
      <h3
        className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
          isFor ? "text-rust-600" : "text-stone-500"
        }`}
      >
        {isFor ? "For" : "Against"}
      </h3>
      <ul className="space-y-1.5">
        {args.map((arg, i) => (
          <li key={i} className="text-[13px] leading-[1.5] text-primary">
            <span className="font-medium">{arg.title}:</span>{" "}
            <span className="text-stone-600">{arg.summary}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Verdict Banner
// ---------------------------------------------------------------------------

function VerdictBanner({
  winner,
  forAvg,
  againstAvg,
}: {
  winner: "for" | "against" | "draw" | null;
  forAvg: number;
  againstAvg: number;
}) {
  const margin = Math.abs(forAvg - againstAvg).toFixed(1);
  const label =
    winner === "for"
      ? "For side wins"
      : winner === "against"
        ? "Against side wins"
        : "Draw";

  return (
    <div className="flex items-center justify-between rounded-lg border border-deep/20 bg-deep/5 px-3 py-2">
      <div>
        <span className="text-xs font-medium text-deep uppercase tracking-wide">
          Verdict
        </span>
        <p className="text-sm font-semibold text-primary">{label}</p>
      </div>
      <div className="text-right">
        <span className="text-[11px] text-stone-400">Margin</span>
        <p className="text-sm font-mono font-semibold text-primary tabular-nums">
          {margin}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function EmbedPage({ params }: PageProps) {
  const { topicId } = await params;
  const topic = topics.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  // Extract top for/against arguments from pillars
  const forArgs = topic.pillars.slice(0, 3).map((p) => ({
    title: p.title,
    summary: p.proponent_rebuttal.length > 120
      ? p.proponent_rebuttal.slice(0, 117) + "..."
      : p.proponent_rebuttal,
  }));

  const againstArgs = topic.pillars.slice(0, 3).map((p) => ({
    title: p.title,
    summary: p.skeptic_premise.length > 120
      ? p.skeptic_premise.slice(0, 117) + "..."
      : p.skeptic_premise,
  }));

  // Load verdict if available
  const verdict = getMockVerdict(topicId);

  const topicUrl = `https://argumend.org/topics/${topicId}`;

  return (
    <main className="max-w-[600px] mx-auto px-4 py-5 font-sans">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-serif text-xl sm:text-2xl tracking-tight text-primary leading-tight mb-2">
          {topic.title}
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          {topic.meta_claim}
        </p>
      </div>

      {/* Confidence */}
      <div className="mb-4">
        <ConfidenceBar score={topic.confidence_score} />
      </div>

      {/* Arguments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <ArgumentCard side="for" arguments={forArgs} />
        <ArgumentCard side="against" arguments={againstArgs} />
      </div>

      {/* Verdict (if available) */}
      {verdict && (
        <div className="mb-4">
          <VerdictBanner
            winner={verdict.winner}
            forAvg={verdict.aggregatedScores.for.average}
            againstAvg={verdict.aggregatedScores.against.average}
          />
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between">
        <a
          href={topicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-deep hover:text-deep-dark font-medium transition-colors"
        >
          Explore full analysis &rarr;
        </a>
        <a
          href="https://argumend.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-stone-500 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3Z" />
          </svg>
          Powered by ARGUMEND
        </a>
      </div>
    </main>
  );
}
