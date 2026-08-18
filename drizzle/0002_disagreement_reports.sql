CREATE TABLE "disagreement_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"user_id" text,
	"schema_version" integer DEFAULT 1 NOT NULL,
	"visibility" text DEFAULT 'unlisted' NOT NULL,
	"source_kind" text,
	"source_url" text,
	"source_platform" text,
	"title" text NOT NULL,
	"diagnosis_headline" text NOT NULL,
	"diagnosis_pattern" text NOT NULL,
	"primary_crux" text,
	"report" jsonb NOT NULL,
	"graph" jsonb NOT NULL,
	"report_digest" text NOT NULL,
	"provider" text NOT NULL,
	"model" text NOT NULL,
	"prompt_version" text NOT NULL,
	"manage_token_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "disagreement_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"section" text NOT NULL,
	"target_id" text,
	"vote" text,
	"correction" text,
	"anonymous_session_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "disagreement_reports" ADD CONSTRAINT "disagreement_reports_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "disagreement_feedback" ADD CONSTRAINT "disagreement_feedback_report_id_disagreement_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."disagreement_reports"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "disagreement_reports_slug_idx" ON "disagreement_reports" USING btree ("slug");
--> statement-breakpoint
CREATE INDEX "disagreement_reports_createdAt_idx" ON "disagreement_reports" USING btree ("created_at");
--> statement-breakpoint
CREATE INDEX "disagreement_reports_visibility_createdAt_idx" ON "disagreement_reports" USING btree ("visibility","created_at");
--> statement-breakpoint
CREATE INDEX "disagreement_reports_pattern_idx" ON "disagreement_reports" USING btree ("diagnosis_pattern");
--> statement-breakpoint
CREATE INDEX "disagreement_reports_userId_idx" ON "disagreement_reports" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "disagreement_reports_digest_idx" ON "disagreement_reports" USING btree ("report_digest");
--> statement-breakpoint
CREATE UNIQUE INDEX "disagreement_feedback_unique_idx" ON "disagreement_feedback" USING btree ("report_id","section","target_id","anonymous_session_hash");
--> statement-breakpoint
CREATE INDEX "disagreement_feedback_reportId_idx" ON "disagreement_feedback" USING btree ("report_id");
--> statement-breakpoint
CREATE INDEX "disagreement_feedback_createdAt_idx" ON "disagreement_feedback" USING btree ("created_at");
