import type { NextRequest } from "next/server";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import { hashProlificId, studyCompletionUrl } from "@/lib/study/config";
import { dayStamp, openStudyRequest, studyJson, studyStorage } from "@/lib/study/http";
import { StudyResponseSchema } from "@/lib/study/schema";

/**
 * POST /api/study/response — store one completed participant
 * (docs/plans/2026-11-03-study-plan.md, "Data handling").
 *
 * Behind ENABLE_STUDY_RESPONSES (404 when off). The body is parsed by a
 * strict schema with no free-text field. The Prolific id is replaced by a
 * keyed hash before anything is written, and the stored topic and arm must
 * match the server's own assignment, so a participant cannot report a cell
 * they were not given. A second submission from the same participant is
 * accepted and ignored. The Prolific completion URL comes back only from here.
 *
 * Without DATABASE_URL this is a dry run: nothing is stored, a warning is
 * logged, and the flow still completes (for local review).
 */
export async function POST(req: NextRequest) {
  const gate = await openStudyRequest(req, "response");
  if (!gate.ok) return gate.response;

  const parsed = StudyResponseSchema.safeParse(gate.body);
  if (!parsed.success) {
    return studyJson({ error: "Invalid request", code: "INVALID" }, 400);
  }
  const { prolificPid, ...response } = parsed.data;
  const completionUrl = studyCompletionUrl();

  const storage = await studyStorage();
  if (storage.mode === "misconfigured") {
    console.warn("[argumend:study] DATABASE_URL is set but STUDY_PID_SECRET is missing or short; refusing to store");
    return studyJson({ error: "Study is not configured", code: "NOT_CONFIGURED" }, 503);
  }
  if (storage.mode === "none") {
    console.warn("[argumend:study] DATABASE_URL is not set: response is a dry run and is not stored");
    return studyJson({ stored: false, completionUrl });
  }

  try {
    const store = await import("@/lib/study/store");
    const pidHash = hashProlificId(prolificPid, storage.secret);
    const assignment = await store.findAssignment(pidHash);
    if (!assignment) {
      return studyJson({ error: "No assignment for this participant", code: "NOT_ASSIGNED" }, 409);
    }
    if (
      assignment.topic !== response.topic ||
      assignment.arm !== response.arm ||
      assignment.party !== response.party
    ) {
      return studyJson({ error: "Response does not match the assignment", code: "MISMATCH" }, 409);
    }
    const stored = await store.insertResponse(response, pidHash, dayStamp());
    return studyJson({ stored, duplicate: !stored, completionUrl });
  } catch (error) {
    console.warn(`[argumend:study] response insert failed: ${sanitizeServerLog(error)}`);
    return studyJson({ error: "Could not store the response", code: "UNAVAILABLE" }, 503);
  }
}
