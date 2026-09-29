/**
 * Recorded Jev answers for the rent-control thread, captured from the live API
 * with `bun scripts/jev-probe/map-reply-smoke.ts --record`. Keyed by the label
 * the pipeline passes to `systemOne`, so a fixture survives a prompt edit as
 * long as the question ids do not change.
 *
 * These are the only real model judgements pinned in the test suite. If a
 * question's wording changes, re-record and read the diff.
 */
import recorded from "./rentControl.jev.json";
import type { JevFixtures } from "@/lib/jev/types";

export const RENT_CONTROL_JEV_FIXTURES = recorded as JevFixtures;
export { RENT_CONTROL_THREAD } from "./rentControlThread";
