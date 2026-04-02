CREATE TABLE "analyses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_hash" text,
	"content_type" text DEFAULT 'freeform' NOT NULL,
	"topic" text NOT NULL,
	"summary" text NOT NULL,
	"positions" jsonb NOT NULL,
	"cruxes" jsonb NOT NULL,
	"fallacies" jsonb NOT NULL,
	"confidence" real NOT NULL,
	"input_content" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "debate_rounds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"debate_id" uuid NOT NULL,
	"round_number" integer NOT NULL,
	"for_content" text NOT NULL,
	"against_content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "debates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_id" text,
	"topic_title" text NOT NULL,
	"for_model" text NOT NULL,
	"against_model" text NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"winner" text,
	"total_rounds" integer DEFAULT 3 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "judge_verdicts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"judgment_id" uuid NOT NULL,
	"judge_id" text NOT NULL,
	"judge_name" text NOT NULL,
	"model" text NOT NULL,
	"for_score" jsonb NOT NULL,
	"against_score" jsonb NOT NULL,
	"winner" text NOT NULL,
	"overall_reasoning" text NOT NULL,
	"latency_ms" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "judgments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"debate_id" uuid,
	"analysis_id" uuid,
	"winner" text,
	"has_consensus" boolean NOT NULL,
	"flagged_for_review" boolean NOT NULL,
	"aggregated_scores" jsonb NOT NULL,
	"disagreements" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "debate_rounds" ADD CONSTRAINT "debate_rounds_debate_id_debates_id_fk" FOREIGN KEY ("debate_id") REFERENCES "public"."debates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "judge_verdicts" ADD CONSTRAINT "judge_verdicts_judgment_id_judgments_id_fk" FOREIGN KEY ("judgment_id") REFERENCES "public"."judgments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "judgments" ADD CONSTRAINT "judgments_debate_id_debates_id_fk" FOREIGN KEY ("debate_id") REFERENCES "public"."debates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "judgments" ADD CONSTRAINT "judgments_analysis_id_analyses_id_fk" FOREIGN KEY ("analysis_id") REFERENCES "public"."analyses"("id") ON DELETE set null ON UPDATE no action;