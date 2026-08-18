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
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { DebatePersistenceStatus } from "@/lib/debate/status";
import type { AdapterAccountType } from "next-auth/adapters";
import type {
  ExtractedPosition,
  IdentifiedCrux,
  PotentialFallacy,
  DetectedBias,
} from "@/lib/analyze/extractor";
import type { JudgeScore, JudgingResult } from "@/lib/judge/rubric";
import type { DisagreementReportV1 } from "@/types/disagreement";
import type { ArgumentGraph } from "@/types/argument";

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
    index("account_userId_idx").on(account.userId),
  ]
);

export const sessions = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => [
    index("session_userId_idx").on(session.userId),
  ]
);

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

export const analyses = pgTable(
  "analyses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** Owner (optional — null for anonymous) */
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    contentType: text("content_type").notNull().default("freeform"),
    /** Extracted topic/claim */
    topic: text("topic").notNull(),
    summary: text("summary").notNull(),
    /** Full extracted positions as JSON */
    positions: jsonb("positions").$type<ExtractedPosition[]>().notNull(),
    /** Identified cruxes as JSON */
    cruxes: jsonb("cruxes").$type<IdentifiedCrux[]>().notNull(),
    /** Potential fallacies as JSON */
    fallacies: jsonb("fallacies").$type<PotentialFallacy[]>().notNull(),
    /** Detected biases as JSON */
    detectedBiases: jsonb("detected_biases").$type<DetectedBias[]>(),
    /** Extraction confidence 0-1 */
    confidence: real("confidence").notNull(),
    /** Overall FOR position strength 1-10 */
    forStrength: real("for_strength"),
    /** Overall AGAINST position strength 1-10 */
    againstStrength: real("against_strength"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("analyses_userId_idx").on(table.userId),
    index("analyses_createdAt_idx").on(table.createdAt),
  ]
);

// ============================================================================
// Debates — stored debate sessions
// ============================================================================

export const debates = pgTable(
  "debates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** Owner (optional — null for anonymous) */
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    topicId: text("topic_id"),
    topicTitle: text("topic_title").notNull(),
    forModel: text("for_model").notNull(),
    againstModel: text("against_model").notNull(),
    status: text("status")
      .$type<DebatePersistenceStatus>()
      .notNull()
      .default("in_progress"),
    winner: text("winner"),
    totalRounds: integer("total_rounds").notNull().default(3),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("debates_userId_idx").on(table.userId),
    index("debates_topicId_idx").on(table.topicId),
    index("debates_status_idx").on(table.status),
    index("debates_createdAt_idx").on(table.createdAt),
    index("debates_status_createdAt_idx").on(table.status, table.createdAt),
  ]
);

// ============================================================================
// Debate Rounds — individual rounds within a debate
// ============================================================================

export const debateRounds = pgTable(
  "debate_rounds",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    debateId: uuid("debate_id")
      .notNull()
      .references(() => debates.id, { onDelete: "cascade" }),
    roundNumber: integer("round_number").notNull(),
    forContent: text("for_content").notNull(),
    againstContent: text("against_content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("debateRounds_debateId_roundNumber_idx").on(table.debateId, table.roundNumber),
  ]
);

// ============================================================================
// Judgments — aggregated judge council results
// ============================================================================

export const judgments = pgTable(
  "judgments",
  {
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
    aggregatedScores: jsonb("aggregated_scores").$type<JudgingResult["aggregatedScores"]>().notNull(),
    /** Disagreement details */
    disagreements: jsonb("disagreements").$type<JudgingResult["disagreements"]>().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("judgments_debateId_idx").on(table.debateId),
    index("judgments_analysisId_idx").on(table.analysisId),
  ]
);

// ============================================================================
// Judge Verdicts — individual judge responses within a judgment
// ============================================================================

export const judgeVerdicts = pgTable(
  "judge_verdicts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    judgmentId: uuid("judgment_id")
      .notNull()
      .references(() => judgments.id, { onDelete: "cascade" }),
    judgeId: text("judge_id").notNull(),
    judgeName: text("judge_name").notNull(),
    model: text("model").notNull(),
    /** Full score object for "for" side */
    forScore: jsonb("for_score").$type<JudgeScore>().notNull(),
    /** Full score object for "against" side */
    againstScore: jsonb("against_score").$type<JudgeScore>().notNull(),
    winner: text("winner").notNull(),
    overallReasoning: text("overall_reasoning").notNull(),
    latencyMs: integer("latency_ms"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("judgeVerdicts_judgmentId_idx").on(table.judgmentId),
  ]
);

// ============================================================================
// Newsletters — email signups
// ============================================================================

export const newsletters = pgTable("newsletters", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
    unsubscribedAt: timestamp("unsubscribed_at"),
    source: text("source").default("website"),
});

// ============================================================================
// Saved Topics — user bookmarks
// ============================================================================

export const savedTopics = pgTable(
  "saved_topics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topicId: text("topic_id").notNull(),
    savedAt: timestamp("saved_at").defaultNow().notNull(),
  },
  (t) => [
    index("saved_topics_userId_idx").on(t.userId),
    index("saved_topics_topicId_idx").on(t.topicId),
    uniqueIndex("saved_topics_userId_topicId_idx").on(t.userId, t.topicId),
  ]
);

// ============================================================================
// Topic Views — anonymous page-view tracking for trending
// ============================================================================

export const topicViews = pgTable(
  "topic_views",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    topicId: text("topic_id").notNull(),
    viewedAt: timestamp("viewed_at").defaultNow().notNull(),
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
  },
  (t) => [
    index("topic_views_topicId_idx").on(t.topicId),
    index("topic_views_viewedAt_idx").on(t.viewedAt),
    index("topic_views_topicId_viewedAt_idx").on(t.topicId, t.viewedAt),
  ]
);

// ============================================================================
// Topic Subscriptions — per-topic bell subscriptions (auth required)
// ============================================================================

export const topicSubscriptions = pgTable(
  "topic_subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topicId: text("topic_id").notNull(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  },
  (t) => [
    index("topic_subs_userId_idx").on(t.userId),
    index("topic_subs_topicId_idx").on(t.topicId),
    uniqueIndex("topic_subs_userId_topicId_idx").on(t.userId, t.topicId),
  ]
);

// ============================================================================
// Relations
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  analyses: many(analyses),
  debates: many(debates),
  savedTopics: many(savedTopics),
  topicSubscriptions: many(topicSubscriptions),
  topicViews: many(topicViews),
}));

export const topicViewsRelations = relations(topicViews, ({ one }) => ({
  user: one(users, { fields: [topicViews.userId], references: [users.id] }),
}));

export const topicSubscriptionsRelations = relations(topicSubscriptions, ({ one }) => ({
  user: one(users, { fields: [topicSubscriptions.userId], references: [users.id] }),
}));

export const savedTopicsRelations = relations(savedTopics, ({ one }) => ({
  user: one(users, { fields: [savedTopics.userId], references: [users.id] }),
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

export const disagreementReports = pgTable(
  "disagreement_reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    schemaVersion: integer("schema_version").notNull().default(1),
    visibility: text("visibility").notNull().default("unlisted"),
    sourceKind: text("source_kind"),
    sourceUrl: text("source_url"),
    sourcePlatform: text("source_platform"),
    title: text("title").notNull(),
    diagnosisHeadline: text("diagnosis_headline").notNull(),
    diagnosisPattern: text("diagnosis_pattern").notNull(),
    primaryCrux: text("primary_crux"),
    report: jsonb("report").$type<DisagreementReportV1>().notNull(),
    graph: jsonb("graph").$type<ArgumentGraph>().notNull(),
    reportDigest: text("report_digest").notNull(),
    provider: text("provider").notNull(),
    model: text("model").notNull(),
    promptVersion: text("prompt_version").notNull(),
    manageTokenHash: text("manage_token_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    publishedAt: timestamp("published_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    uniqueIndex("disagreement_reports_slug_idx").on(table.slug),
    index("disagreement_reports_createdAt_idx").on(table.createdAt),
    index("disagreement_reports_visibility_createdAt_idx").on(table.visibility, table.createdAt),
    index("disagreement_reports_pattern_idx").on(table.diagnosisPattern),
    index("disagreement_reports_userId_idx").on(table.userId),
    index("disagreement_reports_digest_idx").on(table.reportDigest),
  ],
);

export const disagreementFeedback = pgTable(
  "disagreement_feedback",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reportId: uuid("report_id")
      .notNull()
      .references(() => disagreementReports.id, { onDelete: "cascade" }),
    section: text("section").notNull(),
    targetId: text("target_id"),
    vote: text("vote"),
    correction: text("correction"),
    anonymousSessionHash: text("anonymous_session_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("disagreement_feedback_unique_idx").on(
      table.reportId,
      table.section,
      table.targetId,
      table.anonymousSessionHash,
    ),
    index("disagreement_feedback_reportId_idx").on(table.reportId),
    index("disagreement_feedback_createdAt_idx").on(table.createdAt),
  ],
);

export const disagreementReportsRelations = relations(disagreementReports, ({ one, many }) => ({
  user: one(users, { fields: [disagreementReports.userId], references: [users.id] }),
  feedback: many(disagreementFeedback),
}));

export const disagreementFeedbackRelations = relations(disagreementFeedback, ({ one }) => ({
  report: one(disagreementReports, {
    fields: [disagreementFeedback.reportId],
    references: [disagreementReports.id],
  }),
}));
