"use client";

import React, { memo } from "react";
import { ConceptData } from "@/types/graph";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import {
  splitByBracketedKeywords,
  extractBracketedKeyword,
  isBracketedKeyword,
} from "@/lib/utils";
import { GLOSSARY_TERMS, getGlossaryEntry } from "@/data/glossaryTerms";
import { GlossaryTerm } from "@/components/GlossaryTerm";

/**
 * Match any glossary term as a standalone word. Longest terms first so
 * multi-word terms (e.g. "meta-claim") win over their parts. Word boundaries
 * keep us conservative — we never wrap a term that's part of a larger word.
 */
const GLOSSARY_WORD_PATTERN = new RegExp(
  `\\b(${GLOSSARY_TERMS.map((t) => t.term)
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})\\b`,
  "i"
);

/**
 * Render a plain (non-bracketed) text segment, wrapping the FIRST glossary
 * term occurrence with <GlossaryTerm>. `seen` tracks terms already linked
 * across the whole content so each term is annotated at most once per node.
 */
function renderTextWithGlossary(
  text: string,
  keyPrefix: string,
  seen: Set<string>
): React.ReactNode {
  // Fast path: nothing to do.
  if (!text || !GLOSSARY_WORD_PATTERN.test(text)) return text;

  const out: React.ReactNode[] = [];
  let remaining = text;
  let part = 0;
  // Walk the string, linking the first not-yet-seen glossary term we find.
  // Re-scan after each match so multiple distinct terms can be annotated.
  while (remaining.length > 0) {
    const match = GLOSSARY_WORD_PATTERN.exec(remaining);
    if (!match || match.index === undefined) {
      out.push(remaining);
      break;
    }
    const matched = match[0];
    const entry = getGlossaryEntry(matched);
    const canonical = entry?.term.toLowerCase();
    if (!entry || !canonical || seen.has(canonical)) {
      // Already linked once (or unknown) — emit up to and including the word
      // as plain text and keep scanning the rest.
      const upto = remaining.slice(0, match.index + matched.length);
      out.push(upto);
      remaining = remaining.slice(match.index + matched.length);
      continue;
    }
    seen.add(canonical);
    if (match.index > 0) out.push(remaining.slice(0, match.index));
    out.push(
      <GlossaryTerm key={`${keyPrefix}-g${part++}`} term={matched}>
        {matched}
      </GlossaryTerm>
    );
    remaining = remaining.slice(match.index + matched.length);
  }
  return out;
}

interface InteractiveContentProps {
  content: string;
  concepts?: Record<string, ConceptData>;
  nodeId: string;
}

export const InteractiveContent = memo(function InteractiveContent({ content, concepts, nodeId }: InteractiveContentProps) {
  const spawnConceptNode = useLogicGraph((state) => state.spawnConceptNode);

  // Tracks glossary terms already linked, so each is annotated at most once.
  const seen = new Set<string>();

  if (!concepts || Object.keys(concepts).length === 0) {
    return (
      <p className="text-sm font-sans leading-relaxed text-secondary">
        {renderTextWithGlossary(content, "g", seen)}
      </p>
    );
  }

  const parts = splitByBracketedKeywords(content);

  return (
    <p className="text-sm font-sans leading-relaxed text-secondary">
      {parts.map((part, index) => {
        if (isBracketedKeyword(part)) {
          const keyword = extractBracketedKeyword(part);
          const concept = keyword ? concepts[keyword] : undefined;

          if (concept) {
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  spawnConceptNode(nodeId, concept);
                }}
                className="mx-0.5 inline-flex items-center rounded-md border border-accent-link/30 bg-accent-link/10 px-1 text-sm font-medium text-accent-link transition-colors hover:bg-accent-link/20"
                title={`Expand concept: ${concept.title}`}
              >
                {keyword}
              </button>
            );
          }
          // If keyword is in brackets but not in concept map, just render text
          return <span key={index}>{keyword}</span>;
        }
        // Plain text segment — wrap first occurrence of glossary terms.
        return (
          <span key={index}>{renderTextWithGlossary(part, `p${index}`, seen)}</span>
        );
      })}
    </p>
  );
});
