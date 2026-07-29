/**
 * Lens taxonomy for /perspectives — names the four distortions the scroll story
 * walks through, gives every scene its own icon, and pins each scene's accent to
 * an on-brand token instead of the ad-hoc hexes the page used to inline.
 *
 * Palette discipline (see CLAUDE.md "Design System"): the four lens accents are
 * the four brand colors — crux crimson, rust, skeptic brown, deep teal. Never
 * amber/tangerine/indigo/violet/sky.
 */
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Rewind,
  History,
  Users,
  MessageCircle,
  Target,
  Lightbulb,
} from "lucide-react";

export type PerspectiveLensId = "framing" | "sequence" | "motive" | "vantage";

/** Scene ids in narrative order — the story is linear, so order is the story. */
export const perspectiveSceneIds = [
  "moment",
  "30-seconds",
  "2-minutes",
  "third-witness",
  "rumors",
  "motivated",
  "synthesis",
] as const;

export type PerspectiveSceneId = (typeof perspectiveSceneIds)[number];

export interface PerspectiveLensMeta {
  readonly id: PerspectiveLensId;
  /** Roman numeral for the chapter overline, mirroring the fallacy field guide. */
  readonly numeral: string;
  readonly label: string;
  readonly description: string;
  /**
   * Brand hex. The scenes drive inline gradients, borders and shadows with
   * alpha suffixes, so this stays a raw hex rather than a Tailwind class.
   */
  readonly accent: string;
}

export const perspectiveLenses: Record<PerspectiveLensId, PerspectiveLensMeta> = {
  framing: {
    id: "framing",
    numeral: "I",
    label: "Framing",
    description:
      "The first read — the story you assemble from the slice of reality you happened to catch.",
    accent: "#a23b3b", // crux crimson
  },
  sequence: {
    id: "sequence",
    numeral: "II",
    label: "Sequence",
    description:
      "When you arrived — the same act reads as attack or defense depending on where the clock starts.",
    accent: "#C4613C", // rust
  },
  motive: {
    id: "motive",
    numeral: "III",
    label: "Motive",
    description:
      "Who is telling it, and what they need from the telling — selection without lying.",
    accent: "#8B5A3C", // skeptic brown
  },
  vantage: {
    id: "vantage",
    numeral: "IV",
    label: "Vantage",
    description:
      "Where you stood — one angle is partial, and the fuller picture only appears when angles are combined.",
    accent: "#3a6965", // deep teal
  },
};

/** Chapter order for the lens taxonomy — I through IV. */
export const perspectiveLensOrder: readonly PerspectiveLensId[] = [
  "framing",
  "sequence",
  "motive",
  "vantage",
];

const lensBySceneId: Record<PerspectiveSceneId, PerspectiveLensId> = {
  moment: "framing",

  "30-seconds": "sequence",
  "2-minutes": "sequence",

  rumors: "motive",
  motivated: "motive",

  "third-witness": "vantage",
  synthesis: "vantage",
};

const iconBySceneId: Record<PerspectiveSceneId, LucideIcon> = {
  moment: Eye,

  "30-seconds": Rewind,
  "2-minutes": History,

  rumors: MessageCircle,
  motivated: Target,

  "third-witness": Users,
  synthesis: Lightbulb,
};

/** Lens metadata for a scene, falling back to the opening "framing" lens. */
export function getPerspectiveLens(sceneId: string): PerspectiveLensMeta {
  return perspectiveLenses[
    lensBySceneId[sceneId as PerspectiveSceneId] ?? "framing"
  ];
}

/** Distinct icon for a scene, falling back to a generic eye. */
export function getPerspectiveIcon(sceneId: string): LucideIcon {
  return iconBySceneId[sceneId as PerspectiveSceneId] ?? Eye;
}

/**
 * Scenes grouped by lens in `perspectiveLensOrder`. Lenses with no scenes are
 * omitted (defensive — shouldn't happen with the full story).
 */
export function groupScenesByLens<T extends { id: string }>(
  list: readonly T[]
): { lens: PerspectiveLensMeta; items: T[] }[] {
  return perspectiveLensOrder
    .map((id) => ({
      lens: perspectiveLenses[id],
      items: list.filter(
        (s) => (lensBySceneId[s.id as PerspectiveSceneId] ?? "framing") === id
      ),
    }))
    .filter((group) => group.items.length > 0);
}
