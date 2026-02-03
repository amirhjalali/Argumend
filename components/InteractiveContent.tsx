"use client";

import React from "react";
import { ConceptData } from "@/types/graph";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import {
  splitByBracketedKeywords,
  extractBracketedKeyword,
  isBracketedKeyword,
} from "@/lib/utils";

interface InteractiveContentProps {
  content: string;
  concepts?: Record<string, ConceptData>;
  nodeId: string;
}

export function InteractiveContent({ content, concepts, nodeId }: InteractiveContentProps) {
  const spawnConceptNode = useLogicGraph((state) => state.spawnConceptNode);

  if (!concepts || Object.keys(concepts).length === 0) {
    return (
      <p className="text-sm font-sans leading-relaxed text-secondary">
        {content}
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
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
