CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp,
	"source" text DEFAULT 'website',
	CONSTRAINT "newsletters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "saved_topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"topic_id" text NOT NULL,
	"saved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topic_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"topic_id" text NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topic_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_id" text NOT NULL,
	"viewed_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "analyses" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "analyses" ADD COLUMN "detected_biases" jsonb;--> statement-breakpoint
ALTER TABLE "analyses" ADD COLUMN "for_strength" real;--> statement-breakpoint
ALTER TABLE "analyses" ADD COLUMN "against_strength" real;--> statement-breakpoint
ALTER TABLE "debates" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_topics" ADD CONSTRAINT "saved_topics_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_subscriptions" ADD CONSTRAINT "topic_subscriptions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_views" ADD CONSTRAINT "topic_views_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "saved_topics_userId_idx" ON "saved_topics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "saved_topics_topicId_idx" ON "saved_topics" USING btree ("topic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "saved_topics_userId_topicId_idx" ON "saved_topics" USING btree ("user_id","topic_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "topic_subs_userId_idx" ON "topic_subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "topic_subs_topicId_idx" ON "topic_subscriptions" USING btree ("topic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "topic_subs_userId_topicId_idx" ON "topic_subscriptions" USING btree ("user_id","topic_id");--> statement-breakpoint
CREATE INDEX "topic_views_topicId_idx" ON "topic_views" USING btree ("topic_id");--> statement-breakpoint
CREATE INDEX "topic_views_viewedAt_idx" ON "topic_views" USING btree ("viewed_at");--> statement-breakpoint
CREATE INDEX "topic_views_topicId_viewedAt_idx" ON "topic_views" USING btree ("topic_id","viewed_at");--> statement-breakpoint
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "debates" ADD CONSTRAINT "debates_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analyses_userId_idx" ON "analyses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "analyses_createdAt_idx" ON "analyses" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "debateRounds_debateId_roundNumber_idx" ON "debate_rounds" USING btree ("debate_id","round_number");--> statement-breakpoint
CREATE INDEX "debates_userId_idx" ON "debates" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "debates_topicId_idx" ON "debates" USING btree ("topic_id");--> statement-breakpoint
CREATE INDEX "debates_status_idx" ON "debates" USING btree ("status");--> statement-breakpoint
CREATE INDEX "debates_createdAt_idx" ON "debates" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "debates_status_createdAt_idx" ON "debates" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "judgeVerdicts_judgmentId_idx" ON "judge_verdicts" USING btree ("judgment_id");--> statement-breakpoint
CREATE INDEX "judgments_debateId_idx" ON "judgments" USING btree ("debate_id");--> statement-breakpoint
CREATE INDEX "judgments_analysisId_idx" ON "judgments" USING btree ("analysis_id");--> statement-breakpoint
ALTER TABLE "analyses" DROP COLUMN "content_hash";--> statement-breakpoint
ALTER TABLE "analyses" DROP COLUMN "input_content";
