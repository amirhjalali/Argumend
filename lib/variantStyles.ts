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
  Crown,
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
    // Canonical meta styling MUST match MetaNode.tsx, which renders the meta
    // node with a Crown icon and text-deep / border-t-deep (deep teal #3a6965).
    label: "Meta Claim",
    accentColor: "#3a6965",
    borderClass: "border-l-[#3a6965]",
    bgClass: "bg-[#3a6965]/5",
    Icon: Crown,
    tagline: "The question being examined",
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
    // Retuned off the old violet (#6b5b95) to an on-brand deep stone so it
    // reads as a neutral, unresolved thread (distinct from pillar's lighter
    // stone + Landmark icon).
    label: "Open Question",
    accentColor: "#57534e",
    borderClass: "border-l-[#57534e]",
    bgClass: "bg-[#57534e]/5",
    Icon: MessageCircleQuestion,
    tagline: "Worth investigating",
  },
};

/**
 * Per-variant accent color, derived from VARIANT_STYLES so there is exactly one
 * place a variant's color is defined. Edge and minimap palettes reuse this.
 */
const ACCENT_BY_VARIANT = Object.fromEntries(
  (Object.keys(VARIANT_STYLES) as NodeVariant[]).map((v) => [v, VARIANT_STYLES[v].accentColor]),
) as Record<NodeVariant, string>;

/**
 * Edge colors for graph visualization.
 * Maps variant to hex color for consistent edge styling.
 */
export const VARIANT_EDGE_COLORS: Record<NodeVariant | string, string> = ACCENT_BY_VARIANT;

/**
 * MiniMap node colors for quick identification.
 */
export const MINIMAP_COLORS: Record<NodeVariant, string> = ACCENT_BY_VARIANT;

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
