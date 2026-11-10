/**
 * Geometry for home's thread figure (components/home/ThreadStage.tsx).
 *
 * The figure is one set of strands, one per claim in the flagship map, drawn
 * in five arrangements. Scrolling moves between them:
 *
 *   0 tangle   the hero: every claim at once, as it arrives in a thread
 *   1 knot     the same tangle pulled tight
 *   2 ground   the claims nobody disputes lie flat; the rest stay knotted
 *   3 cruxes   the contested claims gather through the questions they turn on
 *   4 map      one tree: the accepted claims as a shared trunk, forking at
 *              the question into the cruxes and their contested claims
 *
 * Pure and deterministic (a seeded generator, no Math.random), so the figure
 * is the same on every visit and the shapes can be tested without a canvas.
 * Everything is computed in a unit box (0..1 on both axes); the stage maps
 * each arrangement into its own pixel box.
 */

export const STATE_COUNT = 5;
/** Points per strand. Enough for the knot's curls to stay smooth. */
export const POINTS = 72;

export type StrandGroup = "agreed" | "contested";

export interface Strand {
  index: number;
  group: StrandGroup;
  /** 0-based position inside its group. */
  slot: number;
  /** Which crux the strand gathers through; -1 for an agreed strand. */
  knot: number;
  /** 0-based position inside its knot's bundle, and that bundle's size. */
  knotSlot: number;
  knotSize: number;
  /** Where the strand enters and leaves the tangle, 0..1 down the box. */
  lane: number;
  /** 0..1: how late the strand starts each transition. */
  delay: number;
  width: number;
  /** Curl frequencies and phases for the tangle. */
  f: [number, number, number, number];
  phase: [number, number, number, number];
}

export interface StrandCounts {
  agreed: number;
  contested: number;
  cruxes: number;
}

/** mulberry32: small, fast, and identical on every engine. */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildStrands(counts: StrandCounts, seed = 20261110): Strand[] {
  const random = seeded(seed);
  const agreed = Math.max(0, Math.floor(counts.agreed));
  const contested = Math.max(0, Math.floor(counts.contested));
  const cruxes = Math.max(1, Math.floor(counts.cruxes));
  const total = agreed + contested;

  // Bundle sizes: the contested strands shared out across the cruxes.
  const knotSizes = Array.from({ length: cruxes }, (_, k) =>
    Math.floor(contested / cruxes) + (k < contested % cruxes ? 1 : 0),
  );

  // Interleave the groups so the tangle mixes them.
  const order: StrandGroup[] = [];
  let a = 0;
  let c = 0;
  while (a < agreed || c < contested) {
    if (c < contested) {
      order.push("contested");
      c += 1;
    }
    if (a < agreed) {
      order.push("agreed");
      a += 1;
    }
  }

  const lanes = Array.from({ length: total }, (_, i) => (total > 1 ? i / (total - 1) : 0.5));
  // Shuffle the lanes so neighbours in the tangle are not neighbours later.
  for (let i = lanes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [lanes[i], lanes[j]] = [lanes[j], lanes[i]];
  }

  let agreedSlot = 0;
  let contestedSlot = 0;
  return order.map((group, index) => {
    let knot = -1;
    let knotSlot = 0;
    let knotSize = 1;
    let slot: number;
    if (group === "contested") {
      slot = contestedSlot;
      contestedSlot += 1;
      knot = slot % cruxes;
      knotSlot = Math.floor(slot / cruxes);
      knotSize = knotSizes[knot] ?? 1;
    } else {
      slot = agreedSlot;
      agreedSlot += 1;
    }
    return {
      index,
      group,
      slot,
      knot,
      knotSlot,
      knotSize,
      lane: lanes[index] ?? 0.5,
      delay: random(),
      width: 0.9 + random() * 0.9,
      f: [0.8 + random() * 1.5, 1.6 + random() * 2.1, 0.7 + random() * 1.6, 1.5 + random() * 2.2],
      phase: [random() * 6.283, random() * 6.283, random() * 6.283, random() * 6.283],
    };
  });
}

/** Where crux `k` sits in the unit box in the cruxes arrangement. */
export function knotCenter(k: number, cruxes: number): [number, number] {
  const n = Math.max(1, cruxes);
  const step = n > 1 ? k / (n - 1) : 0.5;
  // A shallow diagonal, so the bundles read as five separate gatherings
  // rather than one column.
  return [0.36 + step * 0.28, 0.07 + step * 0.5];
}

/** Where the map's trunk ends and its branches begin: the question. */
export const TREE_ROOT: [number, number] = [0.3, 0.5];

/** Where crux `k` sits in the map arrangement: one column, evenly spaced. */
export function treeNode(k: number, cruxes: number): [number, number] {
  const n = Math.max(1, cruxes);
  return [0.6, n > 1 ? 0.1 + (k / (n - 1)) * 0.8 : 0.5];
}

const TAU = Math.PI * 2;

function tangle(
  strand: Strand,
  t: number,
  amplitude: number,
  pull: number,
  centerY: number,
  laneTop: number,
  laneBottom: number,
): [number, number] {
  // 0 at both ends, 1 through the middle: the strand runs straight in from
  // the left, curls through the knot, and runs straight out to the right.
  const envelope = Math.pow(Math.sin(Math.PI * t), 1.15);
  const laneY = laneTop + strand.lane * (laneBottom - laneTop);
  const [f1, f2, f3, f4] = strand.f;
  const [p1, p2, p3, p4] = strand.phase;
  const du = Math.sin(TAU * f1 * t + p1) * 0.55 + Math.sin(TAU * f2 * t + p2) * 0.3;
  const dv = Math.cos(TAU * f3 * t + p3) * 0.55 + Math.sin(TAU * f4 * t + p4) * 0.32;
  const u = t + (0.5 - t) * envelope * pull + envelope * amplitude * du;
  const v = laneY + (centerY - laneY) * envelope * pull + envelope * amplitude * dv * 1.25;
  return [u, v];
}

/**
 * One point of one strand in one arrangement, in the unit box.
 * `t` runs 0..1 along the strand.
 */
export function strandPoint(
  strand: Strand,
  state: number,
  t: number,
  counts: StrandCounts,
): [number, number] {
  const cruxes = Math.max(1, counts.cruxes);
  switch (state) {
    case 0:
      return tangle(strand, t, 0.27, 0.62, 0.5, 0.12, 0.88);
    case 1:
      return tangle(strand, t, 0.2, 0.9, 0.5, 0.2, 0.8);
    case 2:
    case 3: {
      if (strand.group === "agreed") {
        const rows = Math.max(1, counts.agreed - 1);
        return [t, 0.74 + (strand.slot / rows) * 0.22];
      }
      if (state === 2) return tangle(strand, t, 0.17, 0.9, 0.33, 0.1, 0.56);
      const [ku, kv] = knotCenter(strand.knot, cruxes);
      const spread = strand.knotSize > 1 ? strand.knotSlot / (strand.knotSize - 1) - 0.5 : 0;
      // An hourglass: wide at both edges, a single point at the knot.
      const reach = t < ku ? (ku - t) / ku : (t - ku) / (1 - ku);
      return [t, kv + spread * 0.11 * Math.pow(reach, 0.85)];
    }
    default: {
      const [rootU, rootV] = TREE_ROOT;
      if (strand.group === "agreed") {
        // The trunk: a band of parallel strands that narrows into the root.
        const rows = Math.max(1, counts.agreed - 1);
        const offset = strand.slot / rows - 0.5;
        return [t * rootU, rootV + offset * (0.2 - 0.14 * smoothstep(0.35, 1, t))];
      }
      const [nodeU, nodeV] = treeNode(strand.knot, cruxes);
      const band = cruxes > 1 ? 0.8 / (cruxes - 1) : 0.8;
      const spread = strand.knotSize > 1 ? strand.knotSlot / (strand.knotSize - 1) - 0.5 : 0;
      const leafV = nodeV + spread * band * 0.72;
      // Root to crux, then crux to leaf, each an S-curve that leaves and
      // arrives level, the way a tree diagram draws its links.
      if (t < 0.5) {
        const s = t * 2;
        return [rootU + (nodeU - rootU) * s, rootV + (nodeV - rootV) * smoothstep(0, 1, s)];
      }
      const s = (t - 0.5) * 2;
      return [nodeU + (1 - nodeU) * s, nodeV + (leafV - nodeV) * smoothstep(0, 1, s)];
    }
  }
}

/**
 * How much a strand shivers in each arrangement, in CSS pixels at its middle.
 * The tangle is restless; a strand that has been sorted holds still.
 */
export function wobble(state: number, group: StrandGroup): number {
  if (state <= 0) return 5;
  if (state === 1) return 7.5;
  if (state === 2) return group === "agreed" ? 0.35 : 6;
  if (state === 3) return group === "agreed" ? 0.2 : 0.9;
  return 0;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
