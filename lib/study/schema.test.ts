import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getTableColumns } from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { studyAssignments, studyResponses } from "@/lib/db/schema";
import { PID, STUDY_ID, validResponse } from "@/test/fixtures/study";
import { StudyAssignRequestSchema, StudyResponseSchema } from "./schema";

describe("StudyResponseSchema", () => {
  it("accepts a complete response", () => {
    expect(StudyResponseSchema.safeParse(validResponse()).success).toBe(true);
  });

  it("refuses an unknown key, so free text cannot ride along", () => {
    const withComment = { ...validResponse(), comment: "I thought the page was biased" };
    expect(StudyResponseSchema.safeParse(withComment).success).toBe(false);
    const nested = validResponse();
    const withNested = { ...nested, pre: { ...nested.pre, note: "x" } };
    expect(StudyResponseSchema.safeParse(withNested).success).toBe(false);
  });

  it("refuses a string where a number belongs", () => {
    const response = validResponse();
    const bad = { ...response, pre: { ...response.pre, otherEstimate: ["forty", 30, 20, 80, 25] } };
    expect(StudyResponseSchema.safeParse(bad).success).toBe(false);
  });

  it("holds every scale to its range and every block to its length", () => {
    const response = validResponse();
    const cases: unknown[] = [
      { ...response, pre: { ...response.pre, perceived: 11 } },
      { ...response, pre: { ...response.pre, attitude: 0 } },
      { ...response, pre: { ...response.pre, ownAgree: [3, 4, 4, 2] } },
      { ...response, pre: { ...response.pre, ownAgree: [3, 4, 4, 2, 5] } },
      { ...response, post: { ...response.post, otherEstimate: [55, 50, 35, 80, 101] } },
      { ...response, post: { ...response.post, otherEstimate: [55.5, 50, 35, 80, 45] } },
      { ...response, post: { ...response.post, charity: [5, 5] } },
      { ...response, attention: 0 },
      { ...response, fairness: -1 },
      { ...response, stimulusSeconds: 9000 },
    ];
    for (const value of cases) expect(StudyResponseSchema.safeParse(value).success).toBe(false);
  });

  it("only accepts a crux option that belongs to the participant's topic", () => {
    expect(StudyResponseSchema.safeParse(validResponse({ cruxChoice: "what-drove-drop" })).success).toBe(false);
    expect(
      StudyResponseSchema.safeParse(validResponse({ topic: "immigration-border-crisis", cruxChoice: "what-drove-drop" }))
        .success,
    ).toBe(true);
    expect(StudyResponseSchema.safeParse(validResponse({ cruxChoice: "Something I typed" })).success).toBe(false);
  });

  it("refuses ids that are not Prolific ids, and reading time longer than the session", () => {
    expect(StudyResponseSchema.safeParse(validResponse({ prolificPid: "alice@example.com" })).success).toBe(false);
    expect(StudyResponseSchema.safeParse(validResponse({ prolificPid: PID.toUpperCase() })).success).toBe(false);
    expect(StudyResponseSchema.safeParse(validResponse({ stimulusSeconds: 800, totalSeconds: 700 })).success).toBe(false);
  });

  it("refuses an arm or topic outside the study", () => {
    expect(StudyResponseSchema.safeParse({ ...validResponse(), arm: "video" }).success).toBe(false);
    expect(StudyResponseSchema.safeParse({ ...validResponse(), topic: "climate-change" }).success).toBe(false);
  });
});

describe("StudyAssignRequestSchema", () => {
  it("takes ids and a party, and nothing that would let the client pick a cell", () => {
    const base = { version: "study-v1", prolificPid: PID, prolificStudyId: STUDY_ID, party: "republican" };
    expect(StudyAssignRequestSchema.safeParse(base).success).toBe(true);
    expect(StudyAssignRequestSchema.safeParse({ ...base, party: "neither" }).success).toBe(true);
    expect(StudyAssignRequestSchema.safeParse({ ...base, arm: "map" }).success).toBe(false);
    expect(StudyAssignRequestSchema.safeParse({ ...base, party: "green" }).success).toBe(false);
  });
});

describe("study tables: no text, pseudonymous, days not timestamps", () => {
  const tables = [studyAssignments, studyResponses];

  it("have no text, json or timestamp column", () => {
    for (const table of tables) {
      for (const column of Object.values(getTableColumns(table))) {
        expect(column.getSQLType(), column.name).not.toMatch(/^text|json|bytea|timestamp/);
      }
    }
  });

  it("allow varchar only on short id columns, each pinned by a CHECK", () => {
    const allowed: Record<string, number> = { pid_hash: 64, prolific_study_id: 24, crux_choice: 40, version: 16 };
    for (const table of tables) {
      for (const column of Object.values(getTableColumns(table))) {
        const type = column.getSQLType();
        if (!/varchar/.test(type)) continue;
        expect(Object.keys(allowed), column.name).toContain(column.name);
        expect(type).toBe(`varchar(${allowed[column.name]})`);
      }
    }
    const checks = tables.flatMap((table) => getTableConfig(table).checks.map((check) => check.name));
    expect(checks).toEqual(
      expect.arrayContaining([
        "study_assignments_pid_hash_hex",
        "study_assignments_study_id_hex",
        "study_responses_pid_hash_hex",
        "study_responses_study_id_hex",
        "study_responses_crux_choice_slug",
        "study_responses_version_shape",
        "study_responses_array_lengths",
        "study_responses_scalar_ranges",
      ]),
    );
  });

  it("keep one row per participant", () => {
    for (const table of tables) {
      const unique = getTableConfig(table).indexes.filter((index) => index.config.unique);
      expect(unique.map((index) => index.config.columns.map((c) => ("name" in c ? c.name : "")))).toContainEqual([
        "pid_hash",
      ]);
    }
  });

  it("ship in a migration that creates only the study objects, with no text column", () => {
    const sql = readFileSync(join(process.cwd(), "drizzle/0004_study.sql"), "utf8");
    expect(sql).toContain('CREATE TABLE "study_assignments"');
    expect(sql).toContain('CREATE TABLE "study_responses"');
    expect(sql).not.toMatch(/\btext\b|\bjsonb?\b|timestamp/);
    expect(sql.match(/CREATE TABLE "([a-z_]+)"/g)).toEqual([
      'CREATE TABLE "study_assignments"',
      'CREATE TABLE "study_responses"',
    ]);
    expect(sql).toContain("study_responses_array_lengths");
    const journal = readFileSync(join(process.cwd(), "drizzle/meta/_journal.json"), "utf8");
    expect(journal).toContain('"tag": "0004_study"');
  });
});
