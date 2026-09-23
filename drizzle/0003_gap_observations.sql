-- Hand-trimmed from `drizzle-kit generate`: the 0003 snapshot is the first
-- snapshot to include the hand-written 0002 disagreement tables, so the
-- generator re-emitted them. Only the gap_observations objects are new here.
CREATE TYPE "public"."gap_confidence_bucket" AS ENUM('none', 'tentative', 'low', 'medium', 'high');
--> statement-breakpoint
CREATE TYPE "public"."gap_lane" AS ENUM('map-reply', 'analyze-v2');
--> statement-breakpoint
CREATE TABLE "gap_observations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lane" "gap_lane" NOT NULL,
	"topic_id" varchar(80),
	"proposition_count" integer NOT NULL,
	"talking_past_count" integer NOT NULL,
	"definitional_count" integer NOT NULL,
	"undisputed_count" integer NOT NULL,
	"contested_count" integer NOT NULL,
	"unmatched_count" integer NOT NULL,
	"speaker_count" integer NOT NULL,
	"crux_touched_count" integer NOT NULL,
	"crux_claim_ids" varchar(80)[] DEFAULT '{}'::varchar[] NOT NULL,
	"confidence_bucket" "gap_confidence_bucket" NOT NULL,
	"model_id" varchar(64) NOT NULL,
	"prompt_version" varchar(64) NOT NULL,
	"observed_on" date NOT NULL,
	CONSTRAINT "gap_observations_topic_id_slug" CHECK ("gap_observations"."topic_id" IS NULL OR "gap_observations"."topic_id" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "gap_observations_crux_claim_ids_slugs" CHECK (cardinality("gap_observations"."crux_claim_ids") <= 32 AND array_to_string("gap_observations"."crux_claim_ids", ' ') ~ '^([a-z0-9]+(-[a-z0-9]+)*( [a-z0-9]+(-[a-z0-9]+)*)*)?$'),
	CONSTRAINT "gap_observations_model_id_shape" CHECK ("gap_observations"."model_id" ~ '^[A-Za-z0-9][A-Za-z0-9._:@/-]*$'),
	CONSTRAINT "gap_observations_prompt_version_shape" CHECK ("gap_observations"."prompt_version" ~ '^[A-Za-z0-9][A-Za-z0-9._:@/-]*$'),
	CONSTRAINT "gap_observations_labels_partition" CHECK ("gap_observations"."talking_past_count" + "gap_observations"."definitional_count" + "gap_observations"."undisputed_count" + "gap_observations"."contested_count" = "gap_observations"."proposition_count")
);
--> statement-breakpoint
CREATE INDEX "gap_observations_observed_on_idx" ON "gap_observations" USING btree ("observed_on");
