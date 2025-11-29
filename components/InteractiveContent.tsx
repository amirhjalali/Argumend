"use client";

import React from "react";
import { ConceptData } from "@/types/graph";
import { useLogicGraph } from "@/hooks/useLogicGraph";

interface InteractiveContentProps {
  content: string;
  concepts?: Record<string, ConceptData>;
  nodeId: string;
}

export function InteractiveContent({ content, concepts, nodeId }: InteractiveContentProps) {
  const spawnConceptNode = useLogicGraph((state) => state.spawnConceptNode);

  if (!concepts || Object.keys(concepts).length === 0) {
    return (
      <p className="text-base text-primary/80 font-serif leading-relaxed mb-4">
        {content}
      </p>
    );
  }

  // Regex to find text in curly braces: {Keyword}
  const parts = content.split(/(\{.*?\})/g);

  return (
    <p className="text-base text-primary/80 font-serif leading-relaxed mb-4">
      {parts.map((part, index) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          const keyword = part.slice(1, -1);
          const concept = concepts[keyword];

          if (concept) {
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  spawnConceptNode(nodeId, concept);
                }}
                className="inline-flex items-center px-1.5 py-0.5 mx-1 rounded bg-gray-100 text-accent-link border border-gray-200 text-sm font-mono cursor-pointer hover:bg-accent-main/10 transition-colors align-baseline"
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

