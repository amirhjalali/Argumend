/**
 * Centralized variant styling for consistent theming across components.
 *
 * Issue #10, #17: Consolidates variant styling from RichNode.tsx and useLogicGraph.ts
 */

import type { NodeVariant } from "@/types/graph";
import type { LucideIcon } from "lucide-react";
import {
  Scale,
  ScrollText,
  Landmark,
  MessageCircleQuestion,
  Swords,
  Shield,
} from "lucide-react";

export interface VariantStyle {
  label: string;
  accentColor: string;
  borderClass: string;
  bgClass: string;
  Icon: LucideIcon;
  tagline?: string;
}

/**
 * Comprehensive variant styles for node rendering.
 * Used by RichNode and other components needing variant-based styling.
 */
export const VARIANT_STYLES: Record<NodeVariant, VariantStyle> = {
  meta: {
    label: "Meta Claim",
    accentColor: "#2563eb",
    borderClass: "border-l-[#2563eb]",
    bgClass: "bg-[#2563eb]/5",
    Icon: Landmark,
  },
  pillar: {
    label: "Pillar",
    accentColor: "#78716c",
    borderClass: "border-l-stone-400",
    bgClass: "bg-stone-50",
    Icon: Landmark,
    tagline: "Core argument",
  },
  skeptic: {
    label: "Skeptic",
    accentColor: "#8B5A3C",
    borderClass: "border-l-[#8B5A3C]",
    bgClass: "bg-[#8B5A3C]/5",
    Icon: Swords,
    tagline: "The strongest objection",
  },
  proponent: {
    label: "Proponent",
    accentColor: "#C4613C",
    borderClass: "border-l-[#C4613C]",
    bgClass: "bg-[#C4613C]/5",
    Icon: Shield,
    tagline: "The response",
  },
  crux: {
    label: "Crux",
    accentColor: "#a23b3b",
    borderClass: "border-l-[#a23b3b]",
    bgClass: "bg-[#a23b3b]/5",
    Icon: Scale,
    tagline: "What would settle this?",
  },
  evidence: {
    label: "Evidence",
    accentColor: "#4f7b77",
    borderClass: "border-l-[#4f7b77]",
    bgClass: "bg-[#4f7b77]/5",
    Icon: ScrollText,
    tagline: "The data",
  },
  question: {
    label: "Open Question",
    accentColor: "#6b5b95",
    borderClass: "border-l-[#6b5b95]",
    bgClass: "bg-[#6b5b95]/5",
    Icon: MessageCircleQuestion,
    tagline: "Worth investigating",
  },
};

/**
 * Edge colors for graph visualization.
 * Maps variant to hex color for consistent edge styling.
 */
export const VARIANT_EDGE_COLORS: Record<NodeVariant | string, string> = {
  meta: "#2563eb",
  skeptic: "#8B5A3C",
  proponent: "#C4613C",
  crux: "#a23b3b",
  evidence: "#4f7b77",
  question: "#6b5b95",
  pillar: "#78716c",
};

/**
 * MiniMap node colors for quick identification.
 */
export const MINIMAP_COLORS: Record<NodeVariant, string> = {
  meta: "#2563eb",
  skeptic: "#8B5A3C",
  crux: "#a23b3b",
  proponent: "#C4613C",
  evidence: "#4f7b77",
  pillar: "#a8a095",
  question: "#6b5b95",
};

/**
 * Default color for unknown variants.
 */
export const DEFAULT_VARIANT_COLOR = "#a8a095";

/**
 * Get the style for a variant with fallback to pillar.
 */
export function getVariantStyle(variant?: NodeVariant): VariantStyle {
  return VARIANT_STYLES[variant ?? "pillar"] ?? VARIANT_STYLES.pillar;
}

/**
 * Get edge color for a variant with fallback.
 */
export function getEdgeColor(variant?: string): string {
  return VARIANT_EDGE_COLORS[variant ?? "pillar"] ?? DEFAULT_VARIANT_COLOR;
}

/**
 * Get minimap color for a variant with fallback.
 */
export function getMiniMapColor(variant?: NodeVariant): string {
  return MINIMAP_COLORS[variant ?? "pillar"] ?? DEFAULT_VARIANT_COLOR;
}
