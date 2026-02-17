"use client";

import { useState, useRef } from "react";
import { ExternalLink, FileText, BookOpen, Globe, Calendar } from "lucide-react";
import type { Reference } from "@/types/graph";

interface CitationCardProps {
  reference: Reference;
  index: number;
}

// Extract domain from URL for display
function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch {
    return "source";
  }
}

// Render icon based on source type
function SourceIcon({ url, source, className, strokeWidth }: { url?: string; source?: string; className?: string; strokeWidth?: number }) {
  const urlLower = (url || "").toLowerCase();
  const sourceLower = (source || "").toLowerCase();

  if (urlLower.includes("arxiv") || urlLower.includes("doi.org") || sourceLower.includes("journal")) {
    return <BookOpen className={className} strokeWidth={strokeWidth} />;
  }
  if (urlLower.includes("wikipedia") || urlLower.includes("britannica")) {
    return <Globe className={className} strokeWidth={strokeWidth} />;
  }
  return <FileText className={className} strokeWidth={strokeWidth} />;
}

export function CitationCard({ reference, index }: CitationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Check position to determine if card should show above or below
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setShowAbove(spaceBelow < 200);
    }

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  const domain = reference.url ? getDomain(reference.url) : null;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Citation Link */}
      <a
        ref={triggerRef}
        href={reference.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-start gap-1.5 text-xs font-sans text-secondary transition-colors hover:text-rust-500 group"
      >
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-stone-100 text-[10px] font-bold text-stone-500 group-hover:bg-rust-500/10 group-hover:text-rust-500 transition-colors flex-shrink-0 mt-0.5">
          {index}
        </span>
        <span className="leading-tight">{reference.title}</span>
        {reference.url && (
          <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100 flex-shrink-0 mt-0.5 transition-opacity" />
        )}
      </a>

      {/* Hover Card */}
      {isHovered && (
        <div
          className={`absolute z-50 w-72 p-4 bg-white rounded-xl shadow-xl border border-stone-200 ${
            showAbove ? "bottom-full mb-2" : "top-full mt-2"
          } left-0 animate-in fade-in duration-150`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rust-500/10 flex-shrink-0">
              <SourceIcon url={reference.url} source={reference.source} className="h-4 w-4 text-rust-500" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm font-semibold text-primary leading-tight mb-1">
                {reference.title}
              </h4>
              {reference.source && (
                <p className="text-xs text-stone-500 italic">
                  {reference.source}
                </p>
              )}
            </div>
          </div>

          {/* Source Details */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            {domain && (
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{domain}</span>
              </div>
            )}

            {/* Verification Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-rust-500/10 text-rust-700 rounded-full">
                <FileText className="h-2.5 w-2.5" />
                Cited Source
              </span>
            </div>
          </div>

          {/* Action */}
          {reference.url && (
            <a
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rust-500 to-rust-600 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              View Source
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {/* Arrow indicator */}
          <div
            className={`absolute w-3 h-3 bg-white border-stone-200 transform rotate-45 ${
              showAbove
                ? "bottom-[-6px] left-4 border-r border-b"
                : "top-[-6px] left-4 border-l border-t"
            }`}
          />
        </div>
      )}
    </span>
  );
}
