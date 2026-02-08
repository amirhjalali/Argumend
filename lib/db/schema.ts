import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  real,
  boolean,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// ============================================================================
// Auth.js tables — users, accounts, sessions, verification tokens
// ============================================================================

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ]
);

// ============================================================================
// Analyses — stored results from content extraction
// ============================================================================

export const analyses = pgTable("analyses", {
  id: uuid("id").defaultRandom().primaryKey(),
  /** Owner (optional — null for anonymous) */
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  /** Hash of input content for dedup/caching */
  contentHash: text("content_hash"),
  contentType: text("content_type").notNull().default("freeform"),
  /** Extracted topic/claim */
  topic: text("topic").notNull(),
  summary: text("summary").notNull(),
  /** Full extracted positions as JSON */
  positions: jsonb("positions").notNull(),
  /** Identified cruxes as JSON */
  cruxes: jsonb("cruxes").notNull(),
  /** Potential fallacies as JSON */
  fallacies: jsonb("fallacies").notNull(),
  /** Extraction confidence 0-1 */
  confidence: real("confidence").notNull(),
  /** Original input content (truncated for storage) */
  inputContent: text("input_content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Debates — stored debate sessions
// ============================================================================

export const debates = pgTable("debates", {
  id: uuid("id").defaultRandom().primaryKey(),
  /** Owner (optional — null for anonymous) */
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  topicId: text("topic_id"),
  topicTitle: text("topic_title").notNull(),
  forModel: text("for_model").notNull(),
  againstModel: text("against_model").notNull(),
  status: text("status").notNull().default("in_progress"),
  winner: text("winner"),
  totalRounds: integer("total_rounds").notNull().default(3),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// Debate Rounds — individual rounds within a debate
// ============================================================================

export const debateRounds = pgTable("debate_rounds", {
  id: uuid("id").defaultRandom().primaryKey(),
  debateId: uuid("debate_id")
    .notNull()
    .references(() => debates.id, { onDelete: "cascade" }),
  roundNumber: integer("round_number").notNull(),
  forContent: text("for_content").notNull(),
  againstContent: text("against_content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Judgments — aggregated judge council results
// ============================================================================

export const judgments = pgTable("judgments", {
  id: uuid("id").defaultRandom().primaryKey(),
  /** Link to debate (if judging a debate) */
  debateId: uuid("debate_id").references(() => debates.id, {
    onDelete: "set null",
  }),
  /** Link to analysis (if judging analyzed content) */
  analysisId: uuid("analysis_id").references(() => analyses.id, {
    onDelete: "set null",
  }),
  winner: text("winner"),
  hasConsensus: boolean("has_consensus").notNull(),
  flaggedForReview: boolean("flagged_for_review").notNull(),
  /** Aggregated scores { for: { average, byDimension }, against: { ... } } */
  aggregatedScores: jsonb("aggregated_scores").notNull(),
  /** Disagreement details */
  disagreements: jsonb("disagreements").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Judge Verdicts — individual judge responses within a judgment
// ============================================================================

export const judgeVerdicts = pgTable("judge_verdicts", {
  id: uuid("id").defaultRandom().primaryKey(),
  judgmentId: uuid("judgment_id")
    .notNull()
    .references(() => judgments.id, { onDelete: "cascade" }),
  judgeId: text("judge_id").notNull(),
  judgeName: text("judge_name").notNull(),
  model: text("model").notNull(),
  /** Full score object for "for" side */
  forScore: jsonb("for_score").notNull(),
  /** Full score object for "against" side */
  againstScore: jsonb("against_score").notNull(),
  winner: text("winner").notNull(),
  overallReasoning: text("overall_reasoning").notNull(),
  latencyMs: integer("latency_ms"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// Relations
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  analyses: many(analyses),
  debates: many(debates),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const debatesRelations = relations(debates, ({ one, many }) => ({
  user: one(users, { fields: [debates.userId], references: [users.id] }),
  rounds: many(debateRounds),
  judgments: many(judgments),
}));

export const debateRoundsRelations = relations(debateRounds, ({ one }) => ({
  debate: one(debates, {
    fields: [debateRounds.debateId],
    references: [debates.id],
  }),
}));

export const analysesRelations = relations(analyses, ({ one, many }) => ({
  user: one(users, { fields: [analyses.userId], references: [users.id] }),
  judgments: many(judgments),
}));

export const judgmentsRelations = relations(judgments, ({ one, many }) => ({
  debate: one(debates, {
    fields: [judgments.debateId],
    references: [debates.id],
  }),
  analysis: one(analyses, {
    fields: [judgments.analysisId],
    references: [analyses.id],
  }),
  verdicts: many(judgeVerdicts),
}));

export const judgeVerdictsRelations = relations(judgeVerdicts, ({ one }) => ({
  judgment: one(judgments, {
    fields: [judgeVerdicts.judgmentId],
    references: [judgments.id],
  }),
}));
