CREATE TYPE "public"."study_arm" AS ENUM('map', 'chatbot', 'article');--> statement-breakpoint
CREATE TYPE "public"."study_device" AS ENUM('mobile', 'desktop');--> statement-breakpoint
CREATE TYPE "public"."study_party" AS ENUM('democrat', 'republican');--> statement-breakpoint
CREATE TYPE "public"."study_party_strength" AS ENUM('strong', 'weak', 'lean');--> statement-breakpoint
CREATE TYPE "public"."study_prior_exposure" AS ENUM('yes', 'no', 'unsure');--> statement-breakpoint
CREATE TYPE "public"."study_topic" AS ENUM('gun-control-effectiveness', 'immigration-border-crisis', 'transgender-athletes-sports');--> statement-breakpoint
CREATE TABLE "study_assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pid_hash" varchar(64) NOT NULL,
	"prolific_study_id" varchar(24) NOT NULL,
	"party" "study_party" NOT NULL,
	"topic" "study_topic" NOT NULL,
	"arm" "study_arm" NOT NULL,
	"assigned_on" date NOT NULL,
	CONSTRAINT "study_assignments_pid_hash_hex" CHECK ("study_assignments"."pid_hash" ~ '^[a-f0-9]{64}$'),
	CONSTRAINT "study_assignments_study_id_hex" CHECK ("study_assignments"."prolific_study_id" ~ '^[a-f0-9]{24}$')
);
--> statement-breakpoint
CREATE TABLE "study_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" varchar(16) NOT NULL,
	"pid_hash" varchar(64) NOT NULL,
	"prolific_study_id" varchar(24) NOT NULL,
	"party" "study_party" NOT NULL,
	"party_strength" "study_party_strength" NOT NULL,
	"topic" "study_topic" NOT NULL,
	"arm" "study_arm" NOT NULL,
	"perceived_pre" smallint NOT NULL,
	"perceived_post" smallint NOT NULL,
	"attitude_pre" smallint NOT NULL,
	"attitude_post" smallint NOT NULL,
	"own_agree_pre" smallint[] NOT NULL,
	"own_agree_post" smallint[] NOT NULL,
	"other_estimate_pre" smallint[] NOT NULL,
	"other_estimate_post" smallint[] NOT NULL,
	"charity_pre" smallint[] NOT NULL,
	"charity_post" smallint[] NOT NULL,
	"crux_choice" varchar(40) NOT NULL,
	"attention" smallint NOT NULL,
	"fairness" smallint NOT NULL,
	"learned" smallint NOT NULL,
	"prior_exposure" "study_prior_exposure" NOT NULL,
	"stimulus_seconds" integer NOT NULL,
	"total_seconds" integer NOT NULL,
	"stimulus_opened" smallint NOT NULL,
	"device" "study_device" NOT NULL,
	"completed_on" date NOT NULL,
	CONSTRAINT "study_responses_version_shape" CHECK ("study_responses"."version" ~ '^study-v[0-9]+$'),
	CONSTRAINT "study_responses_pid_hash_hex" CHECK ("study_responses"."pid_hash" ~ '^[a-f0-9]{64}$'),
	CONSTRAINT "study_responses_study_id_hex" CHECK ("study_responses"."prolific_study_id" ~ '^[a-f0-9]{24}$'),
	CONSTRAINT "study_responses_crux_choice_slug" CHECK ("study_responses"."crux_choice" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "study_responses_array_lengths" CHECK (cardinality("study_responses"."own_agree_pre") = 5 AND cardinality("study_responses"."own_agree_post") = 5 AND cardinality("study_responses"."other_estimate_pre") = 5 AND cardinality("study_responses"."other_estimate_post") = 5 AND cardinality("study_responses"."charity_pre") = 3 AND cardinality("study_responses"."charity_post") = 3),
	CONSTRAINT "study_responses_scalar_ranges" CHECK ("study_responses"."perceived_pre" BETWEEN 0 AND 10 AND "study_responses"."perceived_post" BETWEEN 0 AND 10 AND "study_responses"."attitude_pre" BETWEEN 1 AND 6 AND "study_responses"."attitude_post" BETWEEN 1 AND 6 AND "study_responses"."attention" BETWEEN 1 AND 4 AND "study_responses"."fairness" BETWEEN 0 AND 10 AND "study_responses"."learned" BETWEEN 0 AND 10)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "study_assignments_pid_hash_idx" ON "study_assignments" USING btree ("pid_hash");--> statement-breakpoint
CREATE INDEX "study_assignments_stratum_idx" ON "study_assignments" USING btree ("prolific_study_id","party");--> statement-breakpoint
CREATE UNIQUE INDEX "study_responses_pid_hash_idx" ON "study_responses" USING btree ("pid_hash");