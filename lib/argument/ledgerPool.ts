/**
 * The living AI map's pool: pure projections over several maps' crux ledgers.
 *
 * Contract: docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md §2.
 * `/ai` shows the AI argument across maps on one page. Three rules keep that
 * honest, and every function here holds them:
 *
 *  1. Scores are never compared across maps. The engine's score is only
 *     meaningful inside one graph, so the pool interleaves by each map's own
 *     rank (every map's first crux, then every map's second, …) and never sorts
 *     by score. Deduplication is also per map: the same claim id in two maps is
 *     two different claims.
 *  2. Only public entries count. An unreviewed judgment entry is invisible here
 *     exactly as it is to the engine (`isPublicEntry`).
 *  3. Dates mean what they say. `date` is the source's own date; `noticedAt`
 *     is when the map recorded it. Node `createdAt` is the map's drawing date
 *     on every node and is never used for "arrived since".
 *
 * No fs, no React: the page, its tests, and a later feed can share it.
 */
import type { CruxLedgerEntry, CruxLedgerStatus } from "@/types/cruxLedger";
import { compareLedgerEntries, isPublicEntry, publicLedgerEntries } from "./ledger";

/** Topic ids of the AI maps, in the order the page names them. */
export const AI_MAP_TOPIC_IDS: readonly string[] = ["ai-mass-unemployment", "capitalism-after-ai"];

/** Top-cruxes block bounds (spec §2.1: 5–8 cards). */
export const POOL_MAX_CRUXES = 8;

/** Default "arrived since" window, in days before the as-of date. */
export const DEFAULT_SINCE_DAYS = 90;

/** What the pool needs from one map. */
export interface PoolMap {
  topicId: string;
  /** The engine's emitted cruxes, in the engine's order (rank 1 first). */
  cruxes: ReadonlyArray<{ claimId: string }>;
  /** Every validated entry, review queue included; the pool filters. */
  ledger: readonly CruxLedgerEntry[];
}

export interface ClaimRef {
  topicId: string;
  claimId: string;
}

export interface PooledCrux extends ClaimRef {
  /** 1-based rank inside its own map. Never comparable across maps. */
  mapRank: number;
  /** How many distinct cruxes that map emitted. */
  mapCruxCount: number;
}

// ---------------------------------------------------------------------------
// Top cruxes
// ---------------------------------------------------------------------------

/**
 * Interleave the maps' cruxes by per-map rank: every map's #1 (in the order
 * the maps are given), then every #2, and so on, up to `limit`. Duplicate
 * claim ids are dropped within a map only.
 */
export function poolTopCruxes(
  maps: readonly PoolMap[],
  limit: number = POOL_MAX_CRUXES,
): PooledCrux[] {
  const perMap = maps.map((map) => {
    const seen = new Set<string>();
    const ids = map.cruxes
      .map((crux) => crux.claimId)
      .filter((claimId) => (seen.has(claimId) ? false : (seen.add(claimId), true)));
    return { topicId: map.topicId, ids };
  });

  const pooled: PooledCrux[] = [];
  const deepest = Math.max(0, ...perMap.map((map) => map.ids.length));
  for (let rank = 0; rank < deepest && pooled.length < limit; rank += 1) {
    for (const map of perMap) {
      if (pooled.length >= limit) break;
      const claimId = map.ids[rank];
      if (claimId === undefined) continue;
      pooled.push({
        topicId: map.topicId,
        claimId,
        mapRank: rank + 1,
        mapCruxCount: map.ids.length,
      });
    }
  }
  return pooled;
}

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

const ISO_DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** A real calendar day, YYYY-MM-DD. */
export function isIsoDay(value: string): boolean {
  if (!ISO_DAY_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/** `day` moved by `days` (negative = earlier), in UTC calendar days. */
export function shiftDay(day: string, days: number): string {
  const parsed = new Date(`${day}T00:00:00Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

/** The day the map recorded an entry: `noticedAt`, else the day it was written. */
export function noticedDay(entry: CruxLedgerEntry): string {
  return entry.noticedAt ?? entry.createdAt.slice(0, 10);
}

/**
 * The page's "as of" day: the latest day any public entry was recorded.
 * Null when no map has a public entry.
 */
export function ledgerAsOf(maps: readonly PoolMap[]): string | null {
  let latest: string | null = null;
  for (const map of maps) {
    for (const entry of map.ledger) {
      if (!isPublicEntry(entry)) continue;
      const day = noticedDay(entry);
      if (latest === null || day > latest) latest = day;
    }
  }
  return latest;
}

/**
 * The `?since=` value to use: the reader's day when it is a real calendar day
 * no later than `asOf`, otherwise `DEFAULT_SINCE_DAYS` before `asOf`. A day
 * before `floor` (the earliest dated entry) shows the same thing as the floor,
 * so it becomes the floor: `?since=0001-01-01` reads "since" the first
 * source, not "since January 1, 1".
 */
export function resolveSince(raw: string | undefined, asOf: string, floor?: string): string {
  if (raw !== undefined && isIsoDay(raw) && raw <= asOf) {
    return floor !== undefined && raw < floor ? floor : raw;
  }
  return shiftDay(asOf, -DEFAULT_SINCE_DAYS);
}

// ---------------------------------------------------------------------------
// What's arrived since
// ---------------------------------------------------------------------------

export interface ArrivedGroup extends ClaimRef {
  /** In-force public entries dated in the window, newest source date first. */
  entries: CruxLedgerEntry[];
}

/**
 * Public, in-force entries whose source `date` falls in [since, until]
 * (both inclusive), grouped by the claim they bear on. Groups are ordered by
 * their newest entry, newest first; ties by topic order, then claim id.
 * Superseded entries are left out: their correction speaks for them.
 */
export function arrivedSince(
  maps: readonly PoolMap[],
  since: string,
  until: string,
): ArrivedGroup[] {
  const groups: ArrivedGroup[] = [];
  maps.forEach((map) => {
    const byClaim = new Map<string, CruxLedgerEntry[]>();
    for (const entry of publicLedgerEntries(map.ledger)) {
      if (entry.date < since || entry.date > until) continue;
      const list = byClaim.get(entry.claimId) ?? [];
      list.push(entry);
      byClaim.set(entry.claimId, list);
    }
    for (const [claimId, entries] of byClaim) {
      groups.push({
        topicId: map.topicId,
        claimId,
        entries: [...entries].sort((a, b) => compareLedgerEntries(b, a)),
      });
    }
  });

  const topicOrder = new Map(maps.map((map, index) => [map.topicId, index]));
  return groups.sort(
    (a, b) =>
      b.entries[0].date.localeCompare(a.entries[0].date) ||
      (topicOrder.get(a.topicId) ?? 0) - (topicOrder.get(b.topicId) ?? 0) ||
      a.claimId.localeCompare(b.claimId),
  );
}

// ---------------------------------------------------------------------------
// Latest movement per claim
// ---------------------------------------------------------------------------

/** The claim's latest in-force public entry, or undefined when it has none. */
export function latestMovement(
  map: PoolMap,
  claimId: string,
): CruxLedgerEntry | undefined {
  return publicLedgerEntries(map.ledger)
    .filter((entry) => entry.claimId === claimId)
    .at(-1);
}

// ---------------------------------------------------------------------------
// Movement summary
// ---------------------------------------------------------------------------

export interface StillCrux extends ClaimRef {
  /** Source date of its latest in-force entry, or null when it has none. */
  lastDate: string | null;
}

export interface MovementSummary {
  /** Claims counted: every emitted crux plus every claim with a public entry. */
  tracked: number;
  /**
   * Claims with an in-window entry, counted by the status of their newest
   * in-window entry. Counts of claims, never of entries, and never a score.
   */
  moved: Record<CruxLedgerStatus, number>;
  /** Claims with no in-window entry, in map order then crux order. */
  still: StillCrux[];
}

export function movementSummary(
  maps: readonly PoolMap[],
  since: string,
  until: string,
): MovementSummary {
  const moved: Record<CruxLedgerStatus, number> = {
    open: 0,
    narrowed: 0,
    resolved: 0,
    unresolvable: 0,
  };
  const still: StillCrux[] = [];
  let tracked = 0;

  const arrived = new Map(
    arrivedSince(maps, since, until).map((group) => [
      `${group.topicId}\u0000${group.claimId}`,
      group.entries[0],
    ]),
  );

  for (const map of maps) {
    const inForce = publicLedgerEntries(map.ledger);
    const claimIds: string[] = [];
    const seen = new Set<string>();
    const add = (claimId: string) => {
      if (seen.has(claimId)) return;
      seen.add(claimId);
      claimIds.push(claimId);
    };
    map.cruxes.forEach((crux) => add(crux.claimId));
    inForce.forEach((entry) => add(entry.claimId));

    for (const claimId of claimIds) {
      tracked += 1;
      const newest = arrived.get(`${map.topicId}\u0000${claimId}`);
      if (newest) {
        moved[newest.status] += 1;
        continue;
      }
      const last = inForce.filter((entry) => entry.claimId === claimId).at(-1);
      still.push({ topicId: map.topicId, claimId, lastDate: last?.date ?? null });
    }
  }

  return { tracked, moved, still };
}

// ---------------------------------------------------------------------------
// Changelog
// ---------------------------------------------------------------------------

export interface ChangelogItem {
  topicId: string;
  entry: CruxLedgerEntry;
  /** The public entry that corrects this one, when it has been superseded. */
  correctedBy?: CruxLedgerEntry;
}

/**
 * Every public entry across the maps, superseded ones included (the page
 * strikes them and names the correction). Newest recorded first: by the day
 * the map noticed it, then write time, then the source's date, then topic
 * order and id, so the order is total and stable.
 *
 * A correction counts only when it is itself public: an unreviewed model
 * proposal cannot strike a published entry.
 */
export function ledgerChangelog(maps: readonly PoolMap[]): ChangelogItem[] {
  const topicOrder = new Map(maps.map((map, index) => [map.topicId, index]));
  const items: ChangelogItem[] = [];

  for (const map of maps) {
    const publicEntries = map.ledger.filter(isPublicEntry);
    const byId = new Map(publicEntries.map((entry) => [entry.id, entry]));
    for (const entry of publicEntries) {
      const correctedBy =
        entry.supersededBy !== undefined ? byId.get(entry.supersededBy) : undefined;
      items.push(correctedBy ? { topicId: map.topicId, entry, correctedBy } : { topicId: map.topicId, entry });
    }
  }

  return items.sort(
    (a, b) =>
      noticedDay(b.entry).localeCompare(noticedDay(a.entry)) ||
      b.entry.createdAt.localeCompare(a.entry.createdAt) ||
      b.entry.date.localeCompare(a.entry.date) ||
      (topicOrder.get(a.topicId) ?? 0) - (topicOrder.get(b.topicId) ?? 0) ||
      a.entry.id.localeCompare(b.entry.id),
  );
}
