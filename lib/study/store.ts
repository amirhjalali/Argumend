/**
 * Database access for the study. The database stack is imported lazily, so a
 * route that cannot reach (or load) Postgres fails inside its own guard rather
 * than at module load (the /api/topic-views lesson). Callers check
 * `isDatabaseConfigured()` first; every function here assumes a database.
 */
import type { StudyArm, StudyParty, StudyTopic } from "./constants";
import { cellKey, type CellCounts } from "./assignment";
import type { StudyResponse } from "./schema";

export interface StoredAssignment {
  topic: StudyTopic;
  arm: StudyArm;
  party: StudyParty;
}

async function db() {
  const [{ getDb }, schema, orm] = await Promise.all([
    import("@/lib/db"),
    import("@/lib/db/schema"),
    import("drizzle-orm"),
  ]);
  return { db: getDb(), schema, orm };
}

export async function findAssignment(pidHash: string): Promise<StoredAssignment | null> {
  const { db: database, schema, orm } = await db();
  const rows = await database
    .select({
      topic: schema.studyAssignments.topic,
      arm: schema.studyAssignments.arm,
      party: schema.studyAssignments.party,
    })
    .from(schema.studyAssignments)
    .where(orm.eq(schema.studyAssignments.pidHash, pidHash))
    .limit(1);
  return rows[0] ?? null;
}

/** Assignments so far in one stratum (Prolific study × party), by cell. */
export async function countAssignments(prolificStudyId: string, party: StudyParty): Promise<CellCounts> {
  const { db: database, schema, orm } = await db();
  const table = schema.studyAssignments;
  const rows = await database
    .select({ topic: table.topic, arm: table.arm, n: orm.count() })
    .from(table)
    .where(orm.and(orm.eq(table.prolificStudyId, prolificStudyId), orm.eq(table.party, party)))
    .groupBy(table.topic, table.arm);
  const counts: CellCounts = {};
  for (const row of rows) counts[cellKey(row)] = Number(row.n);
  return counts;
}

/**
 * Insert an assignment; if this participant already has one (a double
 * submit), keep and return the first.
 */
export async function insertAssignment(row: {
  pidHash: string;
  prolificStudyId: string;
  party: StudyParty;
  topic: StudyTopic;
  arm: StudyArm;
  assignedOn: string;
}): Promise<StoredAssignment> {
  const { db: database, schema } = await db();
  const inserted = await database
    .insert(schema.studyAssignments)
    .values(row)
    .onConflictDoNothing({ target: schema.studyAssignments.pidHash })
    .returning({
      topic: schema.studyAssignments.topic,
      arm: schema.studyAssignments.arm,
      party: schema.studyAssignments.party,
    });
  if (inserted[0]) return inserted[0];
  const existing = await findAssignment(row.pidHash);
  if (!existing) throw new Error("assignment conflict without a stored row");
  return existing;
}

/** Insert a completed response. False when this participant already has one. */
export async function insertResponse(
  response: Omit<StudyResponse, "prolificPid">,
  pidHash: string,
  completedOn: string,
): Promise<boolean> {
  const { db: database, schema } = await db();
  const inserted = await database
    .insert(schema.studyResponses)
    .values({
      version: response.version,
      pidHash,
      prolificStudyId: response.prolificStudyId,
      party: response.party,
      partyStrength: response.partyStrength,
      topic: response.topic,
      arm: response.arm,
      perceivedPre: response.pre.perceived,
      perceivedPost: response.post.perceived,
      attitudePre: response.pre.attitude,
      attitudePost: response.post.attitude,
      ownAgreePre: response.pre.ownAgree,
      ownAgreePost: response.post.ownAgree,
      otherEstimatePre: response.pre.otherEstimate,
      otherEstimatePost: response.post.otherEstimate,
      charityPre: response.pre.charity,
      charityPost: response.post.charity,
      cruxChoice: response.cruxChoice,
      attention: response.attention,
      fairness: response.fairness,
      learned: response.learned,
      priorExposure: response.priorExposure,
      stimulusSeconds: response.stimulusSeconds,
      totalSeconds: response.totalSeconds,
      stimulusOpened: response.stimulusOpened,
      device: response.device,
      completedOn,
    })
    .onConflictDoNothing({ target: schema.studyResponses.pidHash })
    .returning({ id: schema.studyResponses.id });
  return inserted.length > 0;
}
