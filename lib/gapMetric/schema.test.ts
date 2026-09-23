import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getTableColumns } from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { gapObservations } from "@/lib/db/schema";

/** The only string-typed columns allowed, each short and CHECK-pinned to an id shape. */
const ID_COLUMNS: Record<string, number> = {
  topic_id: 80,
  crux_claim_ids: 80,
  model_id: 64,
  prompt_version: 64,
};

describe("gap_observations table: counts and ids only", () => {
  const columns = Object.values(getTableColumns(gapObservations));

  it("has no text or json column", () => {
    for (const column of columns) {
      expect(column.columnType, column.name).not.toMatch(/PgText|PgJson|PgJsonb|PgChar\b/);
      expect(column.getSQLType(), column.name).not.toMatch(/^text|json|bytea/);
    }
  });

  it("allows varchar only on the short id columns", () => {
    for (const column of columns) {
      const sqlType = column.getSQLType();
      if (!/varchar/.test(sqlType)) continue;
      expect(Object.keys(ID_COLUMNS), column.name).toContain(column.name);
      expect(sqlType, column.name).toBe(`varchar(${ID_COLUMNS[column.name]})${column.name === "crux_claim_ids" ? "[]" : ""}`);
    }
  });

  it("pins every id column to its shape with a CHECK constraint", () => {
    const checks = getTableConfig(gapObservations).checks.map((check) => check.name);
    expect(checks).toEqual(
      expect.arrayContaining([
        "gap_observations_topic_id_slug",
        "gap_observations_model_id_shape",
        "gap_observations_prompt_version_shape",
        "gap_observations_labels_partition",
      ]),
    );
  });

  it("stores the day, not a timestamp", () => {
    const types = columns.map((column) => column.getSQLType());
    expect(types.some((type) => /timestamp/.test(type))).toBe(false);
  });

  it("ships a migration with the same constraints and no text column", () => {
    const sql = readFileSync(join(process.cwd(), "drizzle/0003_gap_observations.sql"), "utf8");
    const table = sql.slice(sql.indexOf('CREATE TABLE "gap_observations"'));
    const body = table.slice(0, table.indexOf(");\n") + 2);
    expect(body).not.toMatch(/\btext\b|\bjsonb?\b/);
    expect(body).toContain("gap_observations_topic_id_slug");
    expect(sql).not.toContain('CREATE TABLE "disagreement_');
  });
});
