# Activation Event Identification — Argumend's Magic-Moment Metric

**Date:** 2026-04-28
**Swarm:** Activation-retention research, file 01/10
**Reader context:** Argumend is in "orbit, not climbing" — many plans shipped, no real users, observation freeze since 2026-04-09. Cycle 1 (distribution) and cycle 2 (visual design) are scoped. This file owns the question *what happens after the visitor lands*.

## 1. The activation-metric concept

Activation lives between acquisition and retention in McClure's AARRR funnel. **Acquisition** asks "did they show up." **Retention** asks "did they come back." **Activation** is the bridge: did they reach the moment where the product's core value clicked, fast enough that coming back makes sense?

Sean Ellis defines the aha moment in *Hacking Growth* (2017) as "the moment that the utility of the product really clicks for users; when they really get the core value — what the product is for, why they need it, and what benefit they derive" ([Bookcademy summary](https://bookcademy.wordpress.com/2019/10/09/hacking-growth-by-sean-ellis-mapping-the-route-to-the-aha-moment/), [Userpilot](https://userpilot.com/blog/hacking-product-growth-sean-ellis/)). The activation *event* is the operational proxy for that subjective aha — a concrete in-product action that empirically correlates with retention.

Lenny Rachitsky tightens this: "Your activation milestone is the earliest point in your onboarding flow that, by showing your product's value, is predictive of long-term retention" ([Lenny — How to determine your activation metric](https://www.lennysnewsletter.com/p/how-to-determine-your-activation)). His empirical claim: increasing activation rate is "often the single best way to increase retention" ([Lenny — What is a good activation rate](https://www.lennysnewsletter.com/p/what-is-a-good-activation-rate)). Reforge adds the habit-formation lens: a good activation event is "associated with the beginnings of a user forming a new habit inside the product" ([Reforge — PLG tactics for retention](https://www.reforge.com/guides/product-led-growth-tactics-for-retention-and-engagement)).

The North Star Metric, by contrast, is a *company-level* aggregate. Reforge warns that revenue is a *lagging* North Star, dangerous for early-stage products ([Reforge — Don't let your North Star metric deceive you](https://www.reforge.com/blog/north-star-metric-growth)). The activation event is a *leading* metric one rung below: the smallest unit of behavior that predicts the user will stick.

For Argumend in April 2026, Lenny's framing applies. We are not optimizing a North Star yet — there is no retention data. We are designing instrumentation for behaviors that, *if* they correlate with retention once data exists, would be cheap to ship now and informative the moment traffic arrives.

## 2. Comparable products' activation events

Eight close-adjacent products and the activation event each one's growth team converged on. Sourced where the operator stated it on the record.

| Product | Activation event | Source |
|---|---|---|
| Facebook | **7 friends in 10 days** — the retention curve flattened above this threshold | Chamath Palihapitiya, growth lead 2007–2011: "we talked about nothing else" ([Startup Archive](https://www.startuparchive.org/p/chamath-palihapitiya-on-the-growth-principles-that-got-facebook-to-billions-of-users), [Mode blog](https://mode.com/blog/facebook-aha-moment-simpler-than-you-think/)) |
| Slack | **2,000 messages exchanged by a team** — 93% of teams above this stayed long-term | Stewart Butterfield, founder ([First Round Review — From 0 to $1B](https://review.firstround.com/from-0-to-1b-slacks-founder-shares-their-epic-launch-strategy/), [GrowthHackers Slack study](https://growthhackers.com/growth-studies/slack/)) |
| Notion | **First page created or customized** | Notion growth team via Product School breakdown ([Product School — User activation](https://productschool.com/blog/analytics/user-activation)) |
| Roam Research | **First bidirectional `[[link]]` created in a daily note** | Conor White-Sullivan and early users describe the aha as "a few days in, after taking notes on meetings and creating several `[[]]` links" ([Nikhil Basu Trivedi — Why I Use Roam Daily](https://nbt.substack.com/p/why-i-use-roam-research-daily)) |
| Manifold Markets | **First market traded (any side, any size)** — DAU was flat at ~100 for 9 months until the trade-first onboarding shipped | Manifold team retrospective on EA Forum ([Manifold Markets — EA Forum tag](https://forum.effectivealtruism.org/topics/manifold-markets), [LessWrong Manifold post](https://www.lesswrong.com/posts/ptEtB4wbLixRuy8MG/manifold-markets-1)) |
| Metaculus | **First prediction submitted** — community attribution; not formally published, but recurring in their blog and forecaster onboarding | Inferred from Metaculus onboarding flow and forecaster guides ([Metaculus FAQ](https://www.metaculus.com/faq/)) |
| Substack | **First 100 free subscribers, then first paid subscriber** — Substack only shows the writer their retention dashboards after 100 paid subs, an explicit operational threshold | Substack support docs ([Substack — Retention tab](https://support.substack.com/hc/en-us/articles/14311608818708-What-does-my-Retention-tab-on-Substack-show)) |
| Pol.is | **First opinion submitted (not just voted)** — vTaiwan attributed scaling 100x to lowering this barrier | vTaiwan retrospective ([Democracy Earth — Pol.is and vTaiwan](https://words.democracy.earth/hacking-ideology-pol-is-and-vtaiwan-570d36442ee5), [compdemocracy case study](https://compdemocracy.org/case-studies/2014-vtaiwan/)) |
| Are.na | **First channel created with 5+ blocks** — inferred from the "guest" → 200-connection paywall structure that gates the canonical use ([Are.na pricing](https://help.are.na/docs/account/billing-and-subscriptions)) |
| LessWrong | **First post that crosses 50 karma** — community lore, surfaces in moderator writeups about the karma economy | LessWrong moderator Q&A threads (community-attributed, not founder-stated) |

The shared structure across all eight: the activation event is **a single user action that demonstrates the product's *non-obvious* core mechanic.** Not "signed up." Not "completed tour." Not "viewed a thing." The user has to *do the load-bearing thing* — link two notes, send the 2,000th message, place a trade, write an opinion. Passive consumption never makes the list.

This is the most important inheritance for Argumend.

## 3. Argumend's candidate activation events

Five candidates, grounded in actual product surfaces verified in the codebase today.

### (a) First crux read

**Definition.** User lands on `app/topics/[id]/page.tsx`, canvas mounts, and within 30 seconds either (i) the crux node enters the viewport for ≥3 seconds, or (ii) user clicks a crux-marked node opening `CruxModal` (`components/CruxModal.tsx`). The "Crux" pill rendered by `FeaturedTopicHero.tsx:104-117` already foregrounds this surface.

**Measurement spec.** Fire `crux_viewed { topic_id, crux_id, source: "viewport"|"click"|"hero", time_to_event_ms }` from `RichNode.tsx` on `IntersectionObserver`, from `CruxModal` on open, and from `FeaturedTopicHero` on render.

**Why it might correlate with retention.** The crux is the differentiated payload. Argumend's positioning ("not pro/con, but the question that resolves the disagreement") collapses if a visitor leaves without internalizing it. A reader who has seen one crux has *seen the product do its job*; one who hasn't has seen another argument-mapping site indistinguishable from Kialo or Argdown.

**Risk.** Viewport heuristic catches incidental scrolls; the click variant is harder to game but rarer.

### (b) First analysis submitted via /analyze

**Definition.** User pastes their own article into `/analyze` (`app/analyze/page.tsx`) and submits. With `ENABLE_LIVE_ANALYZE_API=true` the route at `app/api/analyze/route.ts:23` runs live extraction; with the flag off (current default), submission falls back to a static demo. The cycle-3 audit at `docs/research/2026-04-28-codex-image-pipeline/04-topic-og-image-pipeline.md` flagged the flag as disabled in production today.

**Measurement spec.** Fire `analysis_submitted { content_type, content_length_chars, used_live_api }` from the submit handler and `analysis_complete { topic_count, latency_ms }` on success. Both type signatures already exist in `lib/analytics.ts:13-14`.

**Why it might correlate with retention.** Strongest possible signal — user supplied their own text and saw structure extracted. This is Roam's `[[link]]`-creation moment.

**Risk.** Live flag off; until shipped, this measures demo engagement, not real product. Also high-friction — conversion will be low. Useful as a quality signal at low volume.

### (c) First topic saved/bookmarked

**Definition.** Authenticated user clicks Save, hitting `app/api/saved-topics/route.ts` and writing to `saved_topics` (`lib/db/schema.ts:261-276`). The DB write timestamp is the event.

**Why it might correlate with retention.** Save is a commitment device — implies intent to return.

**Disqualifying risk.** Auth is disabled. `SaveTopicButton.tsx` is currently a shell — `disabled cursor-default opacity-50`, no handler, no `SessionProvider` in production. The button ships but does nothing. Cannot be the primary activation event until auth is re-enabled. Pre-instrument for that day.

### (d) First share event

**Definition.** User clicks one of the share buttons in `components/ShareButtons.tsx` — Copy Link, Twitter, LinkedIn, native Share, or "Share the Crux" CTA (line 226-253). Distinct sub-events for generic vs. crux-share.

**Measurement spec.** `share_click { platform, topic_id }` already typed in `lib/analytics.ts:16`. Audit needed — current handlers don't all call `trackEvent`; the Twitter/LinkedIn anchor `<a>` tags fire nothing.

**Why it might correlate with retention.** Sharing is the strongest proxy for advocacy — social capital committed.

**Risk.** Late-session event, not Lenny's "earliest point predictive of retention." More a power-user signal than activation.

### (e) 3-topic browse in one session

**Definition.** Within one session (30-min idle window), user views 3+ distinct `topics/[id]` pages.

**Measurement spec.** `topic_view_sessioned { topic_id, session_id, topic_index_in_session }` fired on every topic load. The DB write via `app/api/topic-views/route.ts` already exists; per-session sequencing requires a sessionStorage counter and a derived `three_topics_viewed_session` event.

**Why it might correlate with retention.** Closest analog to Slack's 2,000 messages — quantity-of-engagement threshold rather than single-action. Three topics implies the user has internalized *the catalog*, learned the sidebar, likely to return.

**Risk.** Slow to fire. By construction misses single-page-view sessions, which underweights bounce-heavy cold-acquisition cohorts (e.g., ACX classifieds traffic) — the highest-EV traffic source.

## 4. Choose one

**Recommended primary activation event: (a) First crux read.**

| Criterion | (a) Crux read | (b) Analyze submit | (c) Topic save | (d) Share | (e) 3-topic browse |
|---|---|---|---|---|---|
| Measurable today | Yes | No (flag off) | No (auth off) | Partially | Yes |
| Volume on current traffic | High | Very low | Zero | Low | Medium |
| Correlates with retention | High — the differentiator | Highest if available | High but unmeasurable | High but late | Medium-high |
| Easy for PM to move | Yes (auto-scroll, hero) | Hard (ship live API) | N/A | Medium | Medium |
| Game-resistant | Click variant yes, viewport gameable | Yes | Yes | Yes | Yes |

(a) wins because it scores high on every in-scope dimension. (b) would be the right answer if the live-analyze flag were on — flipping that flag is itself one of the highest-leverage shippable wins, and once flipped, the primary activation event should graduate from (a) to (b). (c) is blocked by auth-disabled. (d) is power-user, secondary not primary. (e) is the closest Slack-shaped candidate but lags too much for the pre-traffic phase.

Phase 1: **First crux read within 30s of topic load, measured by viewport-dwell-≥3s or `CruxModal` open.** Phase 2 (when live-analyze ships): **First analysis submitted via /analyze.**

## 5. Measurement instrumentation

Today Argumend ships GA4 only — `app/layout.tsx:107-115` loads `gtag.js` and `lib/analytics.ts` is a thin typed wrapper. The wrapper already declares `topic_view`, `analysis_submit`, `share_click`, `cta_click` — the bones are there.

### Events to add or wire

```ts
// Append to AnalyticsEvent union in lib/analytics.ts
| { action: "crux_viewed"; topicId: string; cruxId: string;
    source: "viewport" | "click" | "hero"; timeToEventMs: number }
| { action: "topic_view_sessioned"; topicId: string;
    sessionTopicIndex: number; timeOnPrevMs?: number }
| { action: "three_topics_viewed_session"; sessionId: string;
    timeToThirdViewMs: number }
```

### Where to fire each

- **`crux_viewed` (viewport):** add an `IntersectionObserver` to `RichNode.tsx` around the `data-variant="crux"` branch. Threshold 0.5, dwell timer 3000ms, fire once per topic-session.
- **`crux_viewed` (click):** in `CruxModal.tsx` `onOpen`, fire with `source: "click"`.
- **`crux_viewed` (hero):** in `FeaturedTopicHero.tsx` near line 105 where `crux` is rendered, fire on first paint.
- **`topic_view_sessioned`:** wrap the existing topic-view side effect (the call to `POST /api/topic-views`) with a sessionStorage counter:
  ```ts
  const idx = parseInt(sessionStorage.getItem("argumend_topic_idx") ?? "0", 10) + 1;
  sessionStorage.setItem("argumend_topic_idx", String(idx));
  trackEvent({ action: "topic_view_sessioned", topicId, sessionTopicIndex: idx });
  if (idx === 3) trackEvent({ action: "three_topics_viewed_session", ... });
  ```
- **`share_click`:** verify each handler in `ShareButtons.tsx:96-160` calls `trackEvent` — currently the Twitter/LinkedIn anchor `<a>` tags don't, only `handleCopy` and `handleNativeShare` should be augmented.

### Tooling stack — three layers

1. **GA4 (already live).** Free, sufficient for funnel reports and a single retention-cohort dashboard. Use as the canonical source of truth for the next 90 days. Argumend doesn't need anything more sophisticated until traffic justifies it.
2. **PostHog free tier (recommended add).** PostHog's free tier allows 1M events/month, includes session replay, funnels, and retention cohort analysis without sampling. Their own writeup on activation-metric discovery ([PostHog — How we found our activation metric](https://posthog.com/product-engineers/activation-metrics)) is the most operationally useful piece in the literature. Add the PostHog snippet to `app/layout.tsx` next to gtag and dual-fire from `lib/analytics.ts`.
3. **Custom Drizzle table for crux events (defer until 1k MAU).** The `topic_views` table already follows this pattern. A `crux_views` table with `(id, topicId, cruxId, sessionId, source, timeToEventMs, viewedAt)` would let us run server-side cohort SQL without depending on GA's 24-hour delay. **Defer.** The 14-day observation freeze means we should not write more code than necessary; ship the GA + PostHog wiring first, add the custom table only if PostHog's retention dashboard proves insufficient.

### The retention-cohort dashboard

The single chart that answers "is the activation event working": cohort = users who fired `crux_viewed` on day 0, segment vs. users who did not, plot D1 / D7 / D30 return rate. PostHog's retention card does this in two clicks; GA4 BigQuery export supports the same query in SQL on a delay. Traffic is currently low enough that the cohort will be noisy for several weeks — ship the instrumentation anyway, so the data exists the day a successful ACX listing or HN launch lands.

## 6. Anti-patterns — activation events that look good but don't correlate

Three to avoid.

**1. "Completed onboarding tour" / "watched the explainer video."** Designrevision and ProductLed flag this as the canonical vanity metric ([SaaS onboarding flow](https://designrevision.com/blog/saas-onboarding-best-practices), [ProductLed](https://productled.com/blog/user-activation-metrics)). Static "click-next-next-next" tours are 100% gamed by impatient users; passive-tour completion is uncorrelated or weakly negatively correlated with retention because the most engaged users skip the tour entirely. Argumend has no formal onboarding tour today, which is a feature — do not add one and then track its completion. The previous `OnboardingOverlay` and `QuickStartBanner` were correctly removed in commit `2d5e396`.

**2. "Time on page."** Amplitude calls time-on-page "the most-cited least-actionable metric" ([Amplitude — Leading vs. lagging](https://amplitude.com/blog/leading-lagging-indicators)). A user spending three minutes might be deeply engaged or might have left the tab open. Capture GA4's `engagement_time_msec` for diagnostic context only.

**3. "Newsletter signup."** Tempting — Argumend already has a `newsletters` table. But Lenny ([What is a good activation rate](https://www.lennysnewsletter.com/p/what-is-a-good-activation-rate)) warns that email-capture metrics test acquisition optimization (landing copy, modal timing) more than product value. A user who hands over an email after 30s of skim has not internalized cruxes, evidence-confidence, or fallacy-tagging. Secondary metric, not primary.

The pattern: each is easy to instrument and easy to move, but the movement is decoupled from product value. Slack's 2,000 messages is hard to game because the behavior IS the value. Argumend's crux-read passes the same test only if measured by click-or-dwell, not mere impression.

## 7. Leading + lagging triangulation

A single activation event in isolation is fragile. The Amplitude framing ([Amplitude — Map your metrics](https://amplitude.com/blog/map-your-metrics)) is to triangulate with one leading and one lagging companion.

- **Primary activation event:** `crux_viewed` within 30 seconds of first topic load.
- **Leading indicator (input):** **topic-views per session.** Cheap, fires on every visit, predicts catalog navigation. If session-depth rises but `crux_viewed` is flat, the canvas is failing to surface the crux — a UX problem.
- **Lagging indicator (output):** **D7 returning-user rate** segmented by `crux_viewed` cohort. Brian Balfour's benchmarks ([Balfour — Retention benchmarks](https://brianbalfour.com/quick-takes/retention-benchmarks)) put healthy D7 for content-curiosity products at 25-35%; below 10% is the failure zone. We don't know Argumend's number because we don't measure it yet.

Triangulation reads:
- All up → loop is closing; double down on the surface that drove `crux_viewed`.
- Activation up, leading flat, lagging flat → users read crux but don't absorb the rest; sidebar / next-topic UX is the bottleneck.
- Activation flat, leading up, lagging flat → crux surface is failing engaged users; the auto-scroll experiment in §8 is high-priority.
- All flat → acquisition is the problem; defer to cycle 1.

## 8. First experiments to run

Once §5 instrumentation ships and three weeks of baseline data exist, the three highest-priority A/B tests:

**E1 — Auto-scroll to the crux node on topic page load.** Hypothesis: the crux is below the fold for many viewports, and users bounce before encountering it. Variant: after canvas layout, programmatically pan/zoom the React Flow viewport to center the highest-weight crux node (already extracted at `FeaturedTopicHero.tsx:61`). Metric: `crux_viewed` rate. Guardrail: bounce rate. Highest EV because the crux is already on the page — the experiment just points the user at it.

**E2 — "View 2 more like this" prompt on exit-intent.** Hypothesis: 3-topic browse is the closest analog to Slack's 2,000 messages, but most visitors leave after one topic because the next-topic affordance is buried in the sidebar. Variant: on exit-intent (mouse upward, or 60s inactivity), surface a card with two recommendations from `getCrossCategoryRelated` (already at `TopicPageClient.tsx:34`). Metric: `three_topics_viewed_session`. Guardrails: skip on mobile; skip if user already navigated to topic 2.

**E3 — Crux-first hero variant for referred deep-link traffic.** Hypothesis: visitors who land on a deep topic URL (ACX, HN, shared links) skip the homepage `FeaturedTopicHero` entirely. Variant: on the topic detail page, replace `TopicIntroPanel` with a top-of-page "the crux" card occupying 1 viewport-height before the canvas. Metric: `crux_viewed` rate segmented by `utm_source` / referrer. Risk: large surface change — ship behind a flag.

Queue for later: live-analyze flag on a 1% slice once API costs are bounded; "share the crux" floating CTA triggered after `crux_viewed` fires.

## Final summary

**Recommended activation event:** *First crux read within 30 seconds of topic page load* — measured by `crux_viewed` event firing from one of three sources (3-second viewport dwell on a `crux`-variant `RichNode`, click into `CruxModal`, or first-paint of the `FeaturedTopicHero` crux card). It is the only candidate that scores high on every in-scope dimension today: shippable in a day, measurable on existing infrastructure, semantically tied to Argumend's actual differentiator, and resistant to gaming when measured by click-or-dwell rather than impression.

**Three next-step actions:**

1. **Ship instrumentation this week.** Append the four new events to `lib/analytics.ts`, wire `IntersectionObserver` in `RichNode.tsx` for crux variants, fire from `CruxModal` and `FeaturedTopicHero`, add session-indexed `topic_view_sessioned`, and audit `ShareButtons.tsx` so every handler calls `trackEvent`.
2. **Add PostHog free tier alongside GA4.** Dual-fire from `lib/analytics.ts`. PostHog's retention card and funnel UI are dramatically faster than GA4 BigQuery for the cohort analysis we need; the snippet is one file change in `app/layout.tsx`.
3. **Run experiment E1 (auto-scroll-to-crux on topic load) as soon as 14 days of baseline `crux_viewed` data exists.** It is the single highest-EV change because the crux is already rendered on every topic page; the experiment is just about pointing the user at it. Pair with the leading indicator (topic-views per session) and lagging indicator (D7 returning-user rate) before claiming any activation lift is real.
