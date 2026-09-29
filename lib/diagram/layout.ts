/**
 * Where each box of a diagram goes. Pure, deterministic, no DOM.
 *
 * Every node kind has a fixed size (its text is clamped to fit), so the whole
 * layout is known before anything renders: the canvas uses these numbers as
 * the React Flow node sizes, and lib/diagram/layout.test.ts checks every map
 * against them for overlaps. Nothing is measured and nothing is nudged after
 * the fact, which is how the old canvas ended up with columns on top of each
 * other.
 *
 * One column per crux, left to right in the page's order:
 *
 *                      [      the question      ]
 *        [   crux 1   ]      [   crux 2   ]      [   crux 3   ]
 *   [Supporters][Skeptics] [Supporters][Skeptics] …
 *     ├ evidence  ├ evidence
 *     └ evidence  └ evidence
 */
import type { DiagramModel, DiagramNode } from "./model";

export interface Size {
  width: number;
  height: number;
}

export interface Box extends Size {
  x: number;
  y: number;
}

/** Sizes at zoom 1. The node components draw exactly these boxes. */
export const NODE_SIZE = {
  question: { width: 560, height: 124 },
  crux: { width: 496, height: 136 },
  side: { width: 240, height: 140 },
  evidence: { width: 220, height: 80 },
} as const satisfies Record<DiagramNode["kind"], Size>;

export const GAP = {
  /** Question → crux row. */
  questionToCrux: 64,
  /** Crux → its two sides. */
  cruxToSide: 40,
  /** Supporters ↔ Skeptics, inside one column. */
  betweenSides: 16,
  /** Between crux columns. */
  betweenColumns: 56,
  /** Side → its first evidence card. */
  sideToEvidence: 16,
  /** Between stacked evidence cards. */
  betweenEvidence: 10,
  /** Evidence cards sit indented under their side, off a spine on the left. */
  evidenceIndent: 20,
} as const;

/** The minimum clear space between any two boxes; the layout test holds it. */
export const MIN_CLEARANCE = 8;

/**
 * How the canvas frames the tree: on load and from the "Fit to view" control,
 * the whole tree, never cropped. `maxZoom` stops a two-crux map from blowing
 * up past reading size; `minZoom` is the canvas's own floor.
 */
export const FIT_VIEW = { padding: 0.05, minZoom: 0.25, maxZoom: 1.1 } as const;

const COLUMN_WIDTH = NODE_SIZE.side.width * 2 + GAP.betweenSides;

export interface DiagramLayout {
  boxes: Map<string, Box>;
  bounds: Box;
}

export function layoutDiagram(model: DiagramModel): DiagramLayout {
  const boxes = new Map<string, Box>();
  const question = model.nodes.find((node) => node.kind === "question");
  const cruxes = model.nodes.filter((node) => node.kind === "crux");

  const columnsWidth =
    cruxes.length > 0
      ? cruxes.length * COLUMN_WIDTH + (cruxes.length - 1) * GAP.betweenColumns
      : 0;
  const width = Math.max(columnsWidth, NODE_SIZE.question.width);
  const columnsLeft = (width - columnsWidth) / 2;

  if (question) {
    boxes.set(question.id, {
      x: (width - NODE_SIZE.question.width) / 2,
      y: 0,
      ...NODE_SIZE.question,
    });
  }

  const cruxY = NODE_SIZE.question.height + GAP.questionToCrux;
  const sideY = cruxY + NODE_SIZE.crux.height + GAP.cruxToSide;
  const evidenceY = sideY + NODE_SIZE.side.height + GAP.sideToEvidence;
  let bottom = question ? NODE_SIZE.question.height : 0;

  cruxes.forEach((crux, column) => {
    const left = columnsLeft + column * (COLUMN_WIDTH + GAP.betweenColumns);
    boxes.set(crux.id, {
      x: left + (COLUMN_WIDTH - NODE_SIZE.crux.width) / 2,
      y: cruxY,
      ...NODE_SIZE.crux,
    });
    bottom = Math.max(bottom, cruxY + NODE_SIZE.crux.height);

    const sides = model.nodes.filter((node) => node.kind === "side" && node.parentId === crux.id);
    for (const side of sides) {
      if (side.kind !== "side") continue;
      const sideX =
        side.side === "supporters" ? left : left + NODE_SIZE.side.width + GAP.betweenSides;
      boxes.set(side.id, { x: sideX, y: sideY, ...NODE_SIZE.side });
      bottom = Math.max(bottom, sideY + NODE_SIZE.side.height);

      const evidence = model.nodes.filter(
        (node) => node.kind === "evidence" && node.parentId === side.id,
      );
      evidence.forEach((card, row) => {
        const y = evidenceY + row * (NODE_SIZE.evidence.height + GAP.betweenEvidence);
        boxes.set(card.id, { x: sideX + GAP.evidenceIndent, y, ...NODE_SIZE.evidence });
        bottom = Math.max(bottom, y + NODE_SIZE.evidence.height);
      });
    }
  });

  return { boxes, bounds: { x: 0, y: 0, width, height: bottom } };
}

/** Whether two boxes come closer than `clearance` on both axes. */
export function boxesCollide(a: Box, b: Box, clearance = MIN_CLEARANCE): boolean {
  return (
    a.x < b.x + b.width + clearance &&
    b.x < a.x + a.width + clearance &&
    a.y < b.y + b.height + clearance &&
    b.y < a.y + a.height + clearance
  );
}

/** Every pair of boxes that collide, as "a × b". Empty for a sound layout. */
export function findCollisions(layout: DiagramLayout, clearance = MIN_CLEARANCE): string[] {
  const entries = [...layout.boxes.entries()];
  const hits: string[] = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (boxesCollide(entries[i][1], entries[j][1], clearance)) {
        hits.push(`${entries[i][0]} × ${entries[j][0]}`);
      }
    }
  }
  return hits;
}

/**
 * The zoom React Flow's fitView lands on for these bounds in a viewport: the
 * whole tree in view. A numeric `padding` leaves `viewport / (1 + padding)`
 * for the tree (@xyflow/system `parsePadding`).
 */
export function fitZoom(
  bounds: Size,
  viewport: Size,
  { padding, minZoom, maxZoom }: { padding: number; minZoom: number; maxZoom: number },
): number {
  const zoom = Math.min(
    viewport.width / (1 + padding) / bounds.width,
    viewport.height / (1 + padding) / bounds.height,
  );
  return Math.min(maxZoom, Math.max(minZoom, zoom));
}
