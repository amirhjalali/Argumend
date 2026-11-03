import type { NextRequest } from "next/server";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import { chooseCell } from "@/lib/study/assignment";
import { hashProlificId, studyScreenoutUrl } from "@/lib/study/config";
import { dayStamp, openStudyRequest, studyJson, studyStorage } from "@/lib/study/http";
import { StudyAssignRequestSchema } from "@/lib/study/schema";

/**
 * POST /api/study/assign — the server picks the participant's topic and arm
 * (docs/plans/2026-11-03-study-plan.md, "Randomization").
 *
 * Behind ENABLE_STUDY_RESPONSES (404 when off). The client sends only the
 * Prolific ids and the party answer; it cannot ask for a cell. A returning
 * participant gets the cell they were first given. "neither" party is
 * screened out and nothing is stored. Without DATABASE_URL this is a dry run:
 * a random cell, nothing stored, a warning logged.
 */
export async function POST(req: NextRequest) {
  const gate = await openStudyRequest(req, "assign");
  if (!gate.ok) return gate.response;

  const parsed = StudyAssignRequestSchema.safeParse(gate.body);
  if (!parsed.success) {
    return studyJson({ error: "Invalid request", code: "INVALID" }, 400);
  }
  const request = parsed.data;

  if (request.party === "neither") {
    return studyJson({ screenedOut: true, screenoutUrl: studyScreenoutUrl() });
  }
  const party = request.party;

  const storage = await studyStorage();
  if (storage.mode === "misconfigured") {
    console.warn("[argumend:study] DATABASE_URL is set but STUDY_PID_SECRET is missing or short; refusing to assign");
    return studyJson({ error: "Study is not configured", code: "NOT_CONFIGURED" }, 503);
  }
  if (storage.mode === "none") {
    console.warn("[argumend:study] DATABASE_URL is not set: assignment is a dry run and is not stored");
    const cell = chooseCell({});
    return studyJson({ ...cell, stored: false });
  }

  try {
    const store = await import("@/lib/study/store");
    const pidHash = hashProlificId(request.prolificPid, storage.secret);
    const existing = await store.findAssignment(pidHash);
    if (existing) {
      return studyJson({ topic: existing.topic, arm: existing.arm, stored: true, returning: true });
    }
    const counts = await store.countAssignments(request.prolificStudyId, party);
    const cell = chooseCell(counts);
    const stored = await store.insertAssignment({
      pidHash,
      prolificStudyId: request.prolificStudyId,
      party,
      topic: cell.topic,
      arm: cell.arm,
      assignedOn: dayStamp(),
    });
    return studyJson({ topic: stored.topic, arm: stored.arm, stored: true });
  } catch (error) {
    console.warn(`[argumend:study] assignment failed: ${sanitizeServerLog(error)}`);
    return studyJson({ error: "Could not assign", code: "UNAVAILABLE" }, 503);
  }
}
