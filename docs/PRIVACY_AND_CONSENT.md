# Privacy, terms, and consent: what we claim and what backs it

`/privacy` and `/terms` make statements about how Argumend handles text and data.
Every one of them was read off the code on **2026-09-21**, not off a template. This
document records which code path backs which claim, so that changing the code
without changing the page is a visible mistake rather than a silent one.

**Both pages are drafts pending the founder's legal review.** They say so at the
top, in a `LegalDraftNotice` callout, and every unresolved question is a visible
`[Pending founder decision]` block on the page rather than an invented answer.

## The rule

> If you change a code path in the left column, open the page in the right column
> in the same pull request.

Two mechanisms make part of this automatic:

- **Provider names are generated, not typed.** `lib/aiProviders.ts` is the single
  list. The consent line, the `/analyze` badge, and the privacy page's processor
  table all read from it. Adding a provider to a lane's roster updates all three.
  `lib/aiProviders.test.ts` pins the rendered sentence.
- **The consent sentence is one string.** `buildConsentLine()` returns the sentence
  split around the phrase that links to `/privacy`, plus the whole sentence as
  `text`. `components/AiConsentLine.test.tsx` asserts the rendered DOM text equals
  `text`, so the copy cannot drift from what the tests claim it says.

## The consent line

Rendered by `components/AiConsentLine.tsx`, immediately above the submit button on
`/analyze-v2`, with `aria-describedby` from the button so it is announced with it.
Exact text today:

> By analyzing, you agree that this text is sent to our AI provider (TypeSafe AI or
> Anthropic, processed in the United States) and is not stored. Don't paste private
> information about other people.

"our AI provider" links to `/privacy`. The provider names come from
`DIAGNOSIS_PROVIDER_IDS`. The map-reply UI (separate branch) should render the same
component rather than writing its own sentence; pass a different `providerIds`
roster only if that lane genuinely reaches different providers.

**Note for the founder:** the line names TypeSafe AI although no code path sends
anything there yet — the hosted lane in `lib/disagreement/model/index.ts` is
Anthropic. The sentence is a disjunction ("TypeSafe AI *or* Anthropic"), so it is
not false today, and it means the Jev lane can be switched on without a copy change
racing the deploy. If the founder would rather not name a provider before it is
wired, remove `"typesafe"` from `DIAGNOSIS_PROVIDER_IDS` and the line, the badge,
and the privacy table all narrow together.

## Claim → backing code path

### Text a visitor pastes

| Claim on /privacy | Backed by |
| --- | --- |
| `/analyze` is offline by default and sends nothing to a model | `ENABLE_LIVE_ANALYZE_API` gate in `app/api/analyze/route.ts`; `extractArgumentsOffline` in `lib/analyze/offline.ts` |
| The badge under the box states which mode is running | `app/analyze/page.tsx`, `liveAnalyzeEnabled` branch calling `analyzeSourceBadge()` |
| Live `/analyze` extraction goes to Anthropic | `DEFAULT_EXTRACTION_AGENT` (`model: "claude"`) in `lib/analyze/extractor.ts`, routed by `lib/agents/executor.ts` |
| Judging receives extracted arguments, not raw source | `toDebateMessages(extracted)` then `council.judgeDebate(messages, …)` in `app/api/analyze/route.ts` |
| Judge council is Anthropic, OpenAI, Google, and xAI on request | `defaultModels = ["claude", "gpt-4", "gemini"]`; `judgeModels` enum also accepts `"grok"`, same file |
| Argumend stores no raw source text | `lib/db/schema.ts` — the `analyses` table has no input-content column; `saveAnalysis` in `lib/db/queries.ts` inserts only extracted fields |
| Extracted results are stored when a database is connected | `isDatabaseConfigured()` guard around `saveAnalysis` in `app/api/analyze/route.ts` |
| Those results are listed publicly and are not linked to a submitter | `listAnalyses(50)` in `app/analyses/page.tsx`; the column allow-list in `lib/db/queries.ts` and `toPublicAnalysis` in `lib/analyze/publicAnalysis.ts` both drop `userId` |
| `/analyze-v2` forwards text to the configured provider and keeps nothing | `app/api/disagreements/analyze/route.ts` — the request body is passed to `analyzeDisagreement` and never persisted |
| The diagnosis report contains verbatim quotes from the source | `lib/disagreement/grounding.ts` matches each quote against the source; `projectDisagreementReport` records `sourceCharacterCount` |
| Publishing is an explicit, separate step | `ShareReport.tsx` confirm-then-publish flow → `app/api/disagreements/publish/route.ts`, gated by `isDisagreementPublishingEnabled()` |
| A published report is stored and served at an unlisted URL | `disagreementReports` table (`visibility` defaults to `"unlisted"`); served by `app/d/[slug]` |
| The publisher can delete it from their own browser | `manageTokenHash` column; `DeleteReportControl.tsx` reads the raw token from `localStorage`; `DELETE app/api/disagreements/[slug]/route.ts` verifies it with `tokensMatch` |
| Feedback stores a rating, correction, section, and a hashed session id | `app/api/disagreements/[slug]/feedback/route.ts` calls `hashOpaque(sessionId)`; `disagreementFeedback` table |
| Identifiers are **not** stripped from pasted text | Nothing in `lib/disagreement/source.ts` (`normalizeSourceText` only strips control characters) or anywhere else redacts names. Verified by search: the only redaction in the codebase is `lib/sanitizeServerLog.ts`, which is for logs, not model input. |

### Accounts, newsletter, and product data

| Claim on /privacy | Backed by |
| --- | --- |
| Accounts are off by default and only Google sign-in exists | `NEXT_PUBLIC_ENABLE_AUTH=false` in `.env.example`; `providers: [Google]` in `lib/auth.ts` |
| We store name, email, verification flag, and image | `users` table in `lib/db/schema.ts` |
| We store the Google account id and OAuth tokens | `accounts` table (`providerAccountId`, `access_token`, `refresh_token`, `id_token`) |
| Sessions carry an expiry | `sessions` table; JWT fallback in `lib/auth.ts` when no database is configured |
| Saved topics and subscriptions store a topic id and a timestamp | `savedTopics`, `topicSubscriptions` tables |
| Topic views are anonymous, and carry a user id only if signed in | `topicViews` table with nullable `userId`; `app/api/topic-views/route.ts` |
| A deleted account detaches its view rows | `onDelete: "set null"` on `topicViews.userId` |
| The newsletter stores address, source, and timestamps | `newsletters` table; `app/api/newsletter/route.ts` |

### Analytics, cookies, logs

| Claim on /privacy | Backed by |
| --- | --- |
| Google Analytics loads only when a measurement ID is configured | `GA_MEASUREMENT_ID` guard in `app/layout.tsx` |
| Page views fire on client navigation | `components/GAPageView.tsx` |
| Events never carry pasted text | The `AnalyticsEvent` union in `lib/analytics.ts`; length and latency go through `characterBucket`/`latencyBucket` in `lib/disagreement/labels.ts` |
| Theme, sidebar state, prefill, and the manage key stay in the browser | `next-themes` in `components/ThemeProvider.tsx`; `sessionStorage` in `HeroAnalyze.tsx` and `DisagreementAnalyzeClient.tsx`; `localStorage` in `DeleteReportControl.tsx` |
| Rate limiting counts per IP, in process memory | `lib/rate-limit.ts` — a module-level `Map`, explicitly documented as per-process |
| The diagnosis lane hashes the IP before using it as a key | `clientKey()` → `hashClientKey()` in `lib/disagreement/publication.ts` |
| Request logs record metadata, not text | `logDisagreementEvent` in `lib/disagreement/http.ts` |
| Errors are sanitised before logging | `lib/sanitizeServerLog.ts`, used across the API routes |

## Claims the founder must verify — not checkable from code

These appear on the pages and are **not** backed by anything in this repository.
Several are flagged in-page as `[Pending founder decision]`; all of them are listed
here so nothing hides.

1. **`privacy@argumend.org` is a placeholder.** It is not a working mailbox. It is
   defined once, as `LEGAL_CONTACT_EMAIL` in `lib/site.ts`, so changing it changes
   both pages.
2. **Provider privacy-policy URLs** in `lib/aiProviders.ts` were written from
   general knowledge of each vendor's published policy, except TypeSafe's, which
   comes from `docs/reviews/2026-09-21-typesafe-policy-notes.md`. None was fetched
   during this work. Confirm all five resolve before the pages are promoted.
3. **"All of them process it in the United States."** True for TypeSafe per its
   published policy (see the review above). For Anthropic, OpenAI, Google, and xAI
   this reflects the default hosted endpoints, not a contract Argumend holds.
4. **Provider retention.** The page says providers differ and not all publish a
   period. That is accurate as of the TypeSafe review; it has not been re-checked
   against the other four vendors' current policies.
5. **Hosting provider.** The page refers to "our hosting provider" without naming
   it, and says nothing about what its access logs retain. `nixpacks.toml` and the
   `Dockerfile` imply a Coolify deployment; that is an inference about deployment,
   not a statement of fact about the operator.
6. **No cookie banner exists.** Google Analytics loads without consent when
   configured. The page states this plainly. Whether that is acceptable depends on
   where visitors are, which is a founder decision.
7. **No retention schedule and no deletion job exist** for any stored record. The
   page says so rather than promising a period.
8. **No self-serve unsubscribe endpoint exists.** `newsletters.unsubscribedAt` is a
   column with nothing that writes it; `app/api/newsletter/route.ts` exposes only
   `POST`.
9. **No account-deletion route exists.** The page directs the request to the
   placeholder mailbox.
10. **Liability cap, governing law, forum, and the content licence** are empty
    placeholders in `/terms`. So is the operating entity's legal name and address,
    which most jurisdictions require on a public terms page.
11. **The indemnity clause in `/terms`** is drafted broadly and may be
    unenforceable against consumer users in several jurisdictions.
12. **GDPR / CCPA rights language** (access, portability, erasure, objection,
    appeal, "do not sell") is not present. The draft offers a contact route, not a
    rights framework.
13. **The age threshold** in the Children section is stated loosely; the applicable
    threshold depends on jurisdiction and on where the site claims its audience is.
14. **TypeSafe AI is named before it is wired.** See the note under
    "The consent line" above.

## What the pages deliberately do not claim

- They do not claim Argumend verifies facts, ranks arguments by truth, or names a
  winner. `/terms` says the opposite in as many words, matching the source-only
  contract in `docs/plans/2026-08-18-argumend-v2-disagreement-diagnosis-spec.md`.
- They do not promise deletion timelines, uptime, or that a provider will not
  retain the text.
- They do not claim anonymisation, pseudonymisation, or identifier stripping,
  because none of that exists in the code.

## Tests that hold this together

| Test | What it stops |
| --- | --- |
| `lib/aiProviders.test.ts` | A provider losing its name, region, or policy link; the consent sentence changing silently |
| `components/AiConsentLine.test.tsx` | The disclosure disappearing from `/analyze-v2`, losing its `/privacy` link, moving below the button, or the `/analyze` badge going back to "the configured AI provider" |
| `app/legalPages.test.tsx` | Either page losing its draft banner, its provider table, the "we do not strip names" warning, the no-winner framing, or a `[Pending founder decision]` flag |
| `components/Footer.test.tsx` | The legal links vanishing from the footer or drifting into the pruned discovery columns |
| `app/sitemap.test.ts`, `app/canonicalUrls.test.ts` | The legal pages falling out of the sitemap or their canonicals drifting |
