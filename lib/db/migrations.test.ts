import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getTableColumns, getTableName } from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import {
  accounts,
  analyses,
  debateRounds,
  debates,
  judgeVerdicts,
  judgments,
  newsletters,
  savedTopics,
  sessions,
  topicSubscriptions,
  topicViews,
  users,
  verificationTokens,
} from "./schema";

const root = process.cwd();
const initialSql = readFileSync(join(root, "drizzle/0000_init.sql"), "utf8");
const forwardSql = readFileSync(
  join(root, "drizzle/0001_privacy_auth_schema.sql"),
  "utf8"
);
const snapshot = JSON.parse(
  readFileSync(join(root, "drizzle/meta/0001_snapshot.json"), "utf8")
) as {
  tables: Record<
    string,
    {
      columns: Record<string, { notNull: boolean }>;
      indexes: Record<string, { isUnique: boolean }>;
      foreignKeys: Record<string, unknown>;
      uniqueConstraints: Record<string, unknown>;
    }
  >;
};

const declaredTables = [
  accounts,
  analyses,
  debateRounds,
  debates,
  judgeVerdicts,
  judgments,
  newsletters,
  savedTopics,
  sessions,
  topicSubscriptions,
  topicViews,
  users,
  verificationTokens,
];

describe("database schema and migration privacy ratchet", () => {
  it("does not declare raw analysis input or content hashes", () => {
    const columns = getTableColumns(analyses);
    expect(columns).not.toHaveProperty("inputContent");
    expect(columns).not.toHaveProperty("contentHash");

    const migratedColumns = snapshot.tables["public.analyses"].columns;
    expect(migratedColumns).not.toHaveProperty("input_content");
    expect(migratedColumns).not.toHaveProperty("content_hash");
  });

  it("intentionally drops historical raw columns rather than renaming them", () => {
    expect(forwardSql).toContain(
      'ALTER TABLE "analyses" DROP COLUMN "content_hash";'
    );
    expect(forwardSql).toContain(
      'ALTER TABLE "analyses" DROP COLUMN "input_content";'
    );
    expect(forwardSql).not.toMatch(
      /RENAME\s+(?:COLUMN\s+)?"?(?:content_hash|input_content)"?/i
    );
  });

  it("tracks every declared table in both SQL history and the latest snapshot", () => {
    const completeSqlHistory = `${initialSql}\n${forwardSql}`;
    const declaredNames = declaredTables.map(getTableName).sort();
    const snapshotNames = Object.keys(snapshot.tables)
      .map((name) => name.replace(/^public\./, ""))
      .sort();

    expect(snapshotNames).toEqual(declaredNames);
    for (const tableName of declaredNames) {
      expect(completeSqlHistory).toContain(`CREATE TABLE "${tableName}"`);
    }
  });

  it("keeps snapshot columns, indexes, and foreign keys aligned with the TypeScript schema", () => {
    for (const table of declaredTables) {
      const config = getTableConfig(table);
      const migrated = snapshot.tables[`public.${config.name}`];

      expect(Object.keys(migrated.columns).sort()).toEqual(
        config.columns.map((column) => column.name).sort(),
      );
      expect(Object.keys(migrated.indexes).sort()).toEqual(
        config.indexes.map((tableIndex) => tableIndex.config.name).sort(),
      );
      expect(Object.keys(migrated.foreignKeys).sort()).toEqual(
        config.foreignKeys.map((foreignKey) => foreignKey.getName()).sort(),
      );
      for (const column of config.columns) {
        expect(migrated.columns[column.name].notNull).toBe(column.notNull);
      }
    }
  });

  it("includes ownership columns and foreign keys in the migrated schema", () => {
    const ownershipColumns = [
      ["public.analyses", "user_id", false],
      ["public.debates", "user_id", false],
      ["public.saved_topics", "user_id", true],
      ["public.topic_subscriptions", "user_id", true],
      ["public.topic_views", "user_id", false],
      ["public.account", "userId", true],
      ["public.session", "userId", true],
    ] as const;

    for (const [tableName, columnName, notNull] of ownershipColumns) {
      expect(snapshot.tables[tableName].columns[columnName]).toEqual(
        expect.objectContaining({ notNull })
      );
    }

    for (const tableName of [
      "public.analyses",
      "public.debates",
      "public.saved_topics",
      "public.topic_subscriptions",
      "public.topic_views",
      "public.account",
      "public.session",
    ]) {
      expect(Object.keys(snapshot.tables[tableName].foreignKeys).length).toBeGreaterThan(0);
    }
  });

  it("keeps optional topic-view owners referentially valid and anonymizes views on user deletion", () => {
    const config = getTableConfig(topicViews);
    const reference = config.foreignKeys[0]?.reference();

    expect(config.foreignKeys).toHaveLength(1);
    expect(reference).toMatchObject({
      columns: [expect.objectContaining({ name: "user_id" })],
      foreignColumns: [expect.objectContaining({ name: "id" })],
    });
    expect(config.foreignKeys[0]).toMatchObject({ onDelete: "set null" });
    expect(forwardSql).toContain(
      'CONSTRAINT "topic_views_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null',
    );
    expect(snapshot.tables["public.topic_views"].foreignKeys).toHaveProperty(
      "topic_views_user_id_user_id_fk",
    );
  });

  it("does not duplicate the newsletter email unique index", () => {
    const email = getTableColumns(newsletters).email;
    expect(email.isUnique).toBe(true);
    expect(getTableConfig(newsletters).indexes).toHaveLength(0);
    expect(snapshot.tables["public.newsletters"].indexes).toEqual({});
    expect(snapshot.tables["public.newsletters"].uniqueConstraints).toHaveProperty(
      "newsletters_email_unique",
    );
    expect(forwardSql).not.toContain('CREATE INDEX "newsletters_email_idx"');
  });
});
