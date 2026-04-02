import Link from "next/link";
import type { TextSegment } from "@/lib/topic-links";

/**
 * Renders text with embedded internal topic links.
 * Takes an array of TextSegments (from getTopicMentions) and renders
 * plain text + Next.js Links.
 */
export function LinkedText({
  segments,
  className,
}: {
  segments: TextSegment[];
  className?: string;
}) {
  if (segments.length === 1 && segments[0].type === "text") {
    return <span className={className}>{segments[0].content}</span>;
  }

  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.type === "link" ? (
          <Link
            key={i}
            href={seg.href!}
            className="text-deep underline decoration-deep/30 transition-colors hover:text-deep-dark hover:decoration-deep"
            title={`Explore the full analysis: ${seg.topicTitle}`}
          >
            {seg.content}
          </Link>
        ) : (
          <span key={i}>{seg.content}</span>
        )
      )}
    </span>
  );
}
