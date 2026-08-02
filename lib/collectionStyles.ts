import type { CSSProperties } from "react";

export const COLLECTION_STAGGER_LIMIT = 12;

/**
 * Keep a short entrance sequence without making deep collection items wait
 * seconds before becoming visible. `content-visibility` also lets the browser
 * skip layout and paint work for cards that are far below the viewport.
 */
export function getCollectionItemPresentation(
  index: number,
  options: {
    staggerMs?: number;
    intrinsicSize?: string;
  } = {},
): { animate: boolean; style: CSSProperties } {
  const { staggerMs = 50, intrinsicSize = "0 280px" } = options;
  const animate = index < COLLECTION_STAGGER_LIMIT;

  return {
    animate,
    style: {
      contentVisibility: "auto",
      containIntrinsicSize: intrinsicSize,
      ...(animate ? { animationDelay: `${index * staggerMs}ms` } : {}),
    },
  };
}
