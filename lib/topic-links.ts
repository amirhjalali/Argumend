import type { Topic } from "@/lib/schemas/topic";

// ============================================================================
// Internal Cross-Linking Utility
// ============================================================================

interface TopicLinkTarget {
  id: string;
  title: string;
}

/**
 * Scans a text string for mentions of other Argumend topic titles and returns
 * an array of React-friendly segments: plain text strings and link descriptors.
 *
 * Only replaces the FIRST occurrence of each topic title to avoid clutter.
 * Excludes the current topic (identified by `excludeTopicId`) from linking.
 *
 * The function is case-insensitive for matching but preserves the original text.
 */
export interface TextSegment {
  type: "text" | "link";
  content: string;
  href?: string;
  topicTitle?: string;
}

export function getTopicMentions(
  text: string,
  allTopics: TopicLinkTarget[],
  excludeTopicId?: string
): TextSegment[] {
  // Filter out current topic and sort by title length (longest first)
  // to avoid partial matches (e.g., "AI" matching before "AI Risk")
  const candidates = allTopics
    .filter((t) => t.id !== excludeTopicId)
    .sort((a, b) => b.title.length - a.title.length);

  // Find all matches with their positions
  interface Match {
    start: number;
    end: number;
    topicId: string;
    topicTitle: string;
    matchedText: string;
  }

  const matches: Match[] = [];
  const usedRanges: [number, number][] = [];

  for (const topic of candidates) {
    // Escape special regex chars in topic title
    const escaped = topic.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match whole-word boundaries, case-insensitive
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    const match = regex.exec(text);

    if (match) {
      const start = match.index;
      const end = start + match[0].length;

      // Check no overlap with existing matches
      const overlaps = usedRanges.some(
        ([rStart, rEnd]) => start < rEnd && end > rStart
      );

      if (!overlaps) {
        matches.push({
          start,
          end,
          topicId: topic.id,
          topicTitle: topic.title,
          matchedText: match[0],
        });
        usedRanges.push([start, end]);
      }
    }
  }

  if (matches.length === 0) {
    return [{ type: "text", content: text }];
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Build segments
  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const m of matches) {
    if (m.start > cursor) {
      segments.push({ type: "text", content: text.slice(cursor, m.start) });
    }
    segments.push({
      type: "link",
      content: m.matchedText,
      href: `/topics/${m.topicId}`,
      topicTitle: m.topicTitle,
    });
    cursor = m.end;
  }

  if (cursor < text.length) {
    segments.push({ type: "text", content: text.slice(cursor) });
  }

  return segments;
}

/**
 * Extract minimal topic link targets from full topic objects.
 */
export function buildTopicLinkTargets(
  topics: Topic[]
): TopicLinkTarget[] {
  return topics.map((t) => ({ id: t.id, title: t.title }));
}
