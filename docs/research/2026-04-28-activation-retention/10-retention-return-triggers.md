# Retention & Return-Visit Triggers for Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 10/10, parallel activation-retention swarm
**Subject:** What gets a cerebral-audience visitor to come back to argumend.org without ad spend, dark patterns, or aggressive notifications

## 1. The retention/return spectrum

Every retention trigger lives somewhere on a single axis: **push vs pull**.

- **Push** = the product reaches into the user's life. Email, browser push, mobile push, SMS, in-app modal "we miss you" sequences, calendar invites. The user opted in once; the product decides cadence thereafter.
- **Pull** = the user's existing habits bring them back. RSS in their reader, a Google search that lands on you, a friend's link in Slack, a Substack post that embeds your widget, a search-bar bookmark, the topic they remember and re-Google. The product decides nothing; the user's environment does.

Cerebral-audience products (ACX, LessWrong, Marginal Revolution, Asterisk, Gwern, Stratechery) **run on pull and actively reject push past a very low threshold**. ACX has ~120K subs and the email *is* the product — but Scott emails 3-5x/week with ~3,000-word essays, not "we noticed you haven't logged in." LessWrong has an opt-in curated digest (every 3-4 days) and a documented RSS feed with karma-threshold filters ([Secrets of the LessWrong RSS Feed](https://www.lesswrong.com/posts/dzF8vSdDtmWjCBBDr/secrets-of-the-lesswrong-rss-feed)). Manifold is the outlier — heavy notifications, daily quests, friend-trade pings — and it works *because Manifold is a market, not an essay collection*. Retention machinery for "place where money moves" is not transferable to "place where arguments live."

Substack's broader retention benchmark (~65% at 30 days, ~50% at 6 months, ~35% at 1 year per [Substack metrics guide](https://support.substack.com/hc/en-us/articles/5320347155860-A-guide-to-Substack-metrics)) is driven by *cadence*, not push novelty. People stay because Scott posts Tuesday and they read Tuesday. The notification is the email itself; there is no second notification reminding them to read it.

Argumend's wedge — per cycle 1 synthesis — is rationalist-adjacent / AI-safety-curious readers ([00-SYNTHESIS.md §6](../2026-04-28-distribution/00-SYNTHESIS.md)). That audience's retention diet is: **pull-heavy, low-frequency push, never tolerated dark-pattern**.

## 2. Comparable products' retention triggers

| Product | Primary return trigger | Secondary triggers | Friction | Retention impact (est.) |
|---|---|---|---|---|
| **Astral Codex Ten** | Weekly post arrives in inbox/RSS (predictable Tue/Thu/Sat cadence) | Open Threads (Sunday) — social return; podcast | Very low (it's just an email) | Massive — ~120K subs, ~10K paid, ~$300K-$500K/yr revenue from cadence alone |
| **LessWrong** | Front-page algo (karma-weighted), opt-in curated digest every 3-4 days, RSS w/ filters | Comment-reply notifications, Inbox, weekly review threads | Low (everything opt-in) | High — front page is the daily habit |
| **Manifold** | Market-resolved emails/notifications, friend-trade pings, daily quest UI, league system | Push notifications, in-app comment feed, leaderboard | Medium-high (notification-heavy) | High *for that audience* — but Manifold sat at ~100 DAU for 9 months despite this machinery (cycle 1 file 02) |
| **Metaculus** | Prediction-resolved emails, weekly newsletter, tournament emails | "Question you commented on updated" emails | Low-medium | Medium — high lurker count, lower active forecaster count |
| **Asterisk Magazine** | Quarterly print/web issue + email blast at issue release | RSS, occasional Substack notes | Very low (4x/year is the entire push) | Steady — ~6K Substack subs, but each issue is read deeply because it's rare |
| **Substack (the platform)** | Per-publication email push | Recommendations, Notes feed, app feed | Variable per writer | The platform itself made email-as-cadence the cerebral default |
| **Marginal Revolution** | RSS, daily reader habit, Twitter cross-amplification | "Assorted Links" daily roundups (a recurring slot) | None (no email signup primary) | Massive — ~1M monthly visits, almost entirely pull |
| **Stratechery** | Weekly Articles email + Daily Update email (paid) | Podcast | Low (email is the product) | Multi-million-dollar paid newsletter on cadence + analysis |
| **Gwern.net** | Updates page, RSS, organic re-discovery via search | Hacker News bumps when a piece resurfaces | None | Pure pull — Gwern publishes once and the same essay still gets traffic 5 years later |

**Pattern:** every cerebral winner has *exactly one* push channel — email or RSS — and treats it as a cadence contract, not a re-engagement lever. The push is the product surface, not a retention hack. Manifold is the exception that proves the rule: notifications because markets resolve, not because it's clawing you back.

## 3. Argumend's pull-side opportunities (low friction, compounding)

Pull triggers are the thing this audience tolerates and Argumend can ship cheaply. Ranked by leverage:

### 3a. RSS feed — partly shipped, needs hardening
[`app/feed.xml/route.ts`](../../../app/feed.xml/route.ts) exposes a working blog RSS. [`app/layout.tsx:99-101`](../../../app/layout.tsx) declares `<link rel="alternate" type="application/rss+xml">` so Feedly/NetNewsWire/Reeder auto-detect it. **Status: 70% done.** Gaps:

1. Feed contains only blog `articles`, not topic analyses, not debates, not judgments. The 109 evergreen topics never enter anyone's reader.
2. Add `/rss.xml` alias (standard alternate location).
3. Add per-item `<author>` and full-content `content:encoded` blocks for power users.
4. No discoverable feed for topic updates — see 3b.

**Effort: 2 hours.** Audience fit very high — the LessWrong RSS-feed-secrets post is itself high-karma content, indicating how seriously this audience takes feed quality.

### 3b. Per-topic RSS — not shipped
Dedicated feed at `/topics/[id]/feed.xml`. Subscribing to one topic means notification only when *that* topic's analysis updates. **Effort: 1 day.** Most subscribers pick 2-5 topics; each subscription compounds permanently at $0/month retention cost.

### 3c. Sitemap + Search Console — partly shipped
[`app/sitemap.ts`](../../../app/sitemap.ts) already enumerates 109 topics, blog articles, guides, comparisons, question variations, "is" pages, glossary, concepts. What's missing (or unverifiable from the repo): GSC/Bing submission, index-coverage monitoring, `rss.xml` registration as a feed source. Sibling agent 06 covers SEO in depth. **Effort: 2 hours. Compounding window: years.**

### 3d. OG-image quality — shipped, covered elsewhere
[`app/api/og/[id]/route.ts`](../../../app/api/og/) generates per-topic OG images. Every social share is a return-trigger for the recipient. Cycle 3 file 04 already covers OG craft. Confirm the pipeline emits clean images for all 109 topics; don't redo.

### 3e. oEmbed widgets — not shipped, structural lane
The single biggest pull-side opportunity per cycle 1 file 02. Manifold's wedge was pasting `manifold.markets/...` into LessWrong rendering a live market. The argument-map embed slot in LessWrong, EA Forum, Substack, Marginal Revolution, Lawfare, Asterisk is **currently empty**. Argumend ships an `oembed.json` discovery endpoint, iframe sub-graph (1 crux + 3 evidence nodes), and submits the LessWrong PR ourselves. [`app/embed/[topicId]/`](../../../app/embed/) already exists and is robots-noindexed per the sitemap comment — the iframe shell is partly built. **Effort: 1-2 weeks. Retention impact: years of compounding embeds in highest-fit publications.**

## 4. Argumend's push-side opportunities (higher friction, careful)

Push is the dangerous side. Cerebral audiences unsubscribe instantly from "we miss you," daily digests, and any auto-cadence that wasn't explicitly promised. The discipline rule: **fewer pushes, more honestly framed.**

### 4a. Weekly email digest — the most important push
Sibling agent 04 covers this. [`components/NewsletterSignup.tsx`](../../../components/NewsletterSignup.tsx), [`app/api/newsletter/route.ts`](../../../app/api/newsletter/route.ts), and `newsletters` table all exist. **Missing: the actual sending pipeline.** Weekly digest of "what we mapped this week + 1 ACX-style commentary." Threshold: ~50 signups + ~3 weeks of consistent content. Below that, it's a phantom feature.

### 4b. "New topic added" emails — opt-in, low-frequency
Second checkbox at signup. 2-4 per month max. High-fit — audience explicitly wants new-topic content. Threshold: implement *only after* 4a ships reliably.

### 4c. "Topic you saved was updated" — depends on save feature
[`SaveTopicButton.tsx`](../../../components/SaveTopicButton.tsx), [`app/api/saved-topics/route.ts`](../../../app/api/saved-topics/route.ts), [`app/api/topic-subscriptions/route.ts`](../../../app/api/topic-subscriptions/route.ts) all exist. **Infrastructure is built; email pipeline is not.** Threshold: (a) topics actually getting updates worth notifying about, (b) cadence rule "max one email per topic per week regardless of edits." Tie to per-topic RSS (3b) — same trigger, two formats.

### 4d. Browser push notifications — skip
Wrong for this audience. Browser push reads as news-site/adtech/e-commerce. Skip indefinitely.

### 4e. Native app + push — skip
Argumend is "in orbit, not climbing" with zero real users. Native app is cargo-cult at this stage. Skip until DAU > 1,000.

**Decision rule:** every push must answer "what was the user explicitly promised at opt-in, and does this email keep that promise?" Drift (cross-promotion, "we miss you") permanently destroys cerebral-audience trust.

## 5. Calendar-driven return triggers

The highest-leverage retention mechanic Argumend isn't using. ACX's pattern: **Scott posts on a controversial topic the day after news breaks; you read because his take is different.** SCOTUS rules, election decides, AI policy drops — Scott posts within 48 hours, 100K people read. The calendar *is* the trigger.

Argumend's version: ship a topic analysis within 48 hours of a calendar event, push to the list. Targets next 12 months:

- **SCOTUS rulings** (June 2026 cluster): map argument structure within 48 hours.
- **U.S. midterms** (Nov 2026; state-level decisions live now): map the live debate next day.
- **Major AI-policy events** (EU AI Act deadlines, U.S. executive orders, frontier-lab launches): 48 hours.
- **High-profile expert disagreements** (ACX↔Zvi↔Hanson, Dwarkesh interviews): same-day. The cycle-2-topic-selection routine firing today is the mechanism for picking these.

Retention loop: calendar event → ship map → push list → opens land because tied to news they're already arguing about → subset returns next cycle. Each cycle compounds. **The "we ship within 48 hours of news" promise is itself what readers subscribe to.** ACX is "Scott posts a sane take within a week"; Argumend is "the structured map exists within 2 days."

## 6. Content compounding via cross-linking

Every topic page should link to 3-5 related topics; every blog post should reference relevant topics; every guide should embed a topic example. The internal-link graph is simultaneously a retention mechanic, an SEO mechanic, and a discovery mechanic.

[`lib/topic-links.ts`](../../../lib/topic-links.ts) is the foundation — a utility that scans free text for mentions of other topic titles and returns React link segments. LessWrong-style auto-link, already applied. What's missing:

- **Visible "related topics" rail on every topic page** (3-5 cards, not a dropdown). Sibling agent 06 covers discovery; retention angle is that a visitor reading one topic + clicking one related topic has 3x the return-later odds of a single-topic visitor (Wikipedia's whole retention model).
- **Blog → topic backlinks.** Every article links ≥1 topic; every topic auto-lists referencing articles. The scanner does half automatically.
- **Guide embeds.** Every guide includes a small live map. Sibling agent 06 covers SEO; retention angle is that the guide reader interacting with the embed is now a user, not a reader.
- **Comparison pages.** [`app/topics/compare/`](../../../app/topics/compare/) and `COMPARISON_PAIRS` already exist — pure retention artifacts.

Math: 109 topics × 4 cross-links = 436 internal edges. Each edge is a retention path *and* a PageRank signal. Compounds for years.

## 7. The "evergreen content" play

Rationalist-cerebral content has long tails. Gwern's 2010 essays still get traffic in 2026; Scott's 2014 "Meditations on Moloch" re-shares every six months; Wei Dai's 2009 LW posts still anchor decision-theory discussions. **A great post indexed by Google still gets traffic 2 years later.**

Argumend's 109 pre-analyzed topics are evergreen in exactly this sense. AI risk, COVID origins, housing affordability, gender-affirming care, consciousness's hard problem — these debates don't resolve. A well-structured map written today still helps in 2028. Retention play: **don't kill or refresh-and-overwrite evergreen topics; layer additions onto them.** RSS/email push (§4) emits diffs ("AI extinction map gained 3 new evidence nodes this week"), giving existing subscribers a return reason without invalidating original work.

This is the inverse of Manifold's treadmill. Argumend should look like Wikipedia in retention dynamics: **same articles, perpetually deepening, traffic compounding over years.** Per Substack metrics, established legacy journalists see 91% retention at 90 days because their long-form work resurfaces. Argumend's analog: a 2026 SCOTUS map should still be in front of mind in 2027 when SCOTUS does it again.

## 8. Anti-pattern: notification spam

The discipline of *less* notification is the most important rule. The cerebral audience's unsubscribe trigger is set absurdly low. Things that will get Argumend permanently rejected:

- **"We miss you" / "haven't seen you in a while" emails.** ACX/LW/MR readers parse this as low-status growth-hacker behavior. Permanent unsubscribe.
- **Daily digests.** ACX is 3-5x/week; LW digest is 3-4 days. *Daily* digest of a small site = inbox spam.
- **Re-engagement push without substance.** "Come check out the new feature" with no editorial framing reads as notification advertising.
- **Multiple unrelated email types in the same send.** Mixing "new topic" + "platform update" + "weekly digest" = unsubscribe cliff.
- **Browser push prompts on first visit.** Read by this audience as adtech-tier UX.
- **In-app modal "subscribe to our newsletter" that fires on scroll.** Already a contested pattern; cerebral audience hates it more. The footer signup is enough; let the visitor opt in.
- **"Reply to this email if you want X" — then never reply when they do.** Worse than no email.

The discipline rule, in one sentence: **every email Argumend sends should be a piece of writing the founder would be proud of having sent.** If it isn't, don't send it.

## 9. Retention metrics to track

A small, honest dashboard. (The temptation will be to track 50 metrics; track 8.)

| Metric | Definition | Threshold to celebrate | Source |
|---|---|---|---|
| **D1 retention** | % of unique visitors who return within 24h | >5% (cerebral audience baseline is ~3-7%) | GA4 cohort report |
| **D7 retention** | % returning within 7 days | >12% | GA4 |
| **D30 retention** | % returning within 30 days | >18% | GA4 |
| **Resurrection rate** | % returning after 30+ days inactive | Track but don't optimize early | GA4 |
| **Email open rate** | Opens / sent for weekly digest | >40% (50% is excellent for cerebral) | Mail provider |
| **Email click rate** | Clicks / sent | >8% | Mail provider |
| **RSS subscriber count** | Approximated via feed-fetch logs (User-Agent: Feedly, NetNewsWire, etc.) | Track absolute number; double in 90 days | Server logs |
| **Per-topic depth** | Avg pages/session for visitors who land on a topic | >2.0 (the cross-link payoff) | GA4 |
| **Returning visitor share** | New vs returning split | Trend up — direction matters more than level | GA4 |

[`lib/analytics.ts`](../../../lib/analytics.ts) already wraps event tracking; the `trackEvent({ action: "newsletter_signup", source: ... })` pattern is the right shape. Extend with `topic_subscribe`, `rss_link_click`, and `inbound_share_click` so one dashboard spans acquisition→activation→retention. **Don't track yet:** churn cohorts by tier, MRR, LTV — Argumend isn't paid.

## 10. 30/60/90 day retention plan

Sequenced for one solo founder, assuming the ACX-cluster wedge from cycle 1 synthesis. Each item is 1-3 days of work and gates the next.

### Day 1
- **Extend RSS to include topic updates and add `/rss.xml` alias** — 2 hours. Cheapest, highest-leverage pull-side win. Audit existing [`app/feed.xml/route.ts`](../../../app/feed.xml/route.ts) and add topic items.

### Week 1
- **Email-capture footer everywhere** (sibling agent 04 covers this) — already half-built via [`components/NewsletterSignup.tsx`](../../../components/NewsletterSignup.tsx). Make sure it's in `Footer.tsx` and on every topic page.
- **Submit sitemap to Google Search Console + Bing Webmaster Tools** — 2 hours. Already-built sitemap, just submit.

### Week 2
- **Ship related-topics rail on every topic page** (sibling agent 06 covers it) — 1 day. Use existing [`lib/topic-links.ts`](../../../lib/topic-links.ts) infrastructure; wire it into the topic page template.
- **Calendar-driven retention pilot:** the cycle-2-topic-selection routine that fires today picks 5 calendar-driven topics for the next 60 days. Commit to shipping each within 48 hours of its trigger event.

### Month 1
- **Weekly digest live** (depends on agent 04). One issue per week, Tuesday or Wednesday morning, 3-4 paragraphs of editorial + diff list of mapped topics. Cap volume forever — never daily, never twice-weekly.
- **Per-topic RSS at `/topics/[id]/feed.xml`** — 1 day. Below the surface, this is the same machinery as the main RSS feed, scoped per topic.

### Month 2
- **Topic-subscription email pipeline** wired into the existing [`app/api/topic-subscriptions/route.ts`](../../../app/api/topic-subscriptions/route.ts). Send "topic you subscribed to was updated" emails — capped at one per topic per week.
- **Internal cross-linking audit:** every topic has ≥3 outbound related-topic links; every blog post has ≥1 topic link; every guide embeds a live map.

### Month 3
- **Ship oEmbed widget + LessWrong PR** (cycle 1 file 02). Two engineering weeks. This is the structural-lane bet — by month 3 there's enough corpus to be embed-worthy and enough metrics to know the embed lands.
- **First retention review:** D1/D7/D30 cohort numbers, RSS subscriber count, email open rate. Decide what to double down on or kill based on data, not vibes.

What is *not* in the 90 days: native app, browser push, daily emails, "we miss you" sequences, paid retargeting, push-notification permission prompts, multi-email-type batches, in-app re-engagement modals. All of these are the wrong shape for the cerebral-audience wedge and would damage the trust the pull-side work is building.

## Sources

- [A guide to Substack metrics — Substack support](https://support.substack.com/hc/en-us/articles/5320347155860-A-guide-to-Substack-metrics)
- [What's a realistic conversion rate for paid newsletters? — Simon Owens](https://simonowens.substack.com/p/whats-a-realistic-conversion-rate)
- [Substack User and Revenue Statistics 2025 — key-g.com](https://key-g.com/blog/substack-user-and-revenue-statistics-2025-trends-growth-and-global-insights/)
- [Secrets of the LessWrong RSS Feed](https://www.lesswrong.com/posts/dzF8vSdDtmWjCBBDr/secrets-of-the-lesswrong-rss-feed)
- [LessWrong email subscriptions](https://www.lesswrong.com/posts/SuNa5usgxRrvAtbyH/lesswrong-email-subscriptions)
- [Is there a LessWrong newsletter I can subscribe to?](https://www.lesswrong.com/posts/QCawQpTqnoa2jXiiQ/is-there-a-lesswrong-newsletter-i-can-subscribe-to)
- [RSS Feeds are fixed and should be properly functional — LessWrong](https://www.lesswrong.com/posts/Zo462cTMBYsc45foA/rss-feeds-are-fixed-and-should-be-properly-functional-this)
- [Astral Codex Ten — homepage](https://www.astralcodexten.com/)
- [Astral Codex Ten — Subscribe Drive 2024](https://www.astralcodexten.com/p/subscrive-drive-2024-free-unlocked)
- [Manifold Markets — Wikipedia](https://en.wikipedia.org/wiki/Manifold_(prediction_market))
- [Metaculus — homepage](https://www.metaculus.com/)
- [Asterisk Magazine — about](https://asteriskmag.com/about)
- [Marginal Revolution — homepage](https://marginalrevolution.com/)
- [Stratechery — homepage](https://stratechery.com/)
- [Gwern — about](https://gwern.net/about)
- Cycle 1 distribution synthesis: [`docs/research/2026-04-28-distribution/00-SYNTHESIS.md`](../2026-04-28-distribution/00-SYNTHESIS.md)
- Cycle 1 ACX funnel: [`docs/research/2026-04-28-distribution/04-acx-substack-funnel.md`](../2026-04-28-distribution/04-acx-substack-funnel.md)
- Cycle 1 Manifold playbook (oEmbed wedge): [`docs/research/2026-04-28-distribution/02-manifold-playbook.md`](../2026-04-28-distribution/02-manifold-playbook.md)
- Argumend RSS implementation: [`app/feed.xml/route.ts`](../../../app/feed.xml/route.ts)
- Argumend sitemap: [`app/sitemap.ts`](../../../app/sitemap.ts)
- Argumend layout w/ RSS link tag: [`app/layout.tsx`](../../../app/layout.tsx) lines 99-101
- Argumend internal cross-linking utility: [`lib/topic-links.ts`](../../../lib/topic-links.ts)
- Argumend newsletter signup component: [`components/NewsletterSignup.tsx`](../../../components/NewsletterSignup.tsx)
- Argumend newsletter API: [`app/api/newsletter/route.ts`](../../../app/api/newsletter/route.ts)
- Argumend topic-subscriptions API: [`app/api/topic-subscriptions/route.ts`](../../../app/api/topic-subscriptions/route.ts)
- Argumend saved-topics API: [`app/api/saved-topics/route.ts`](../../../app/api/saved-topics/route.ts)
- Argumend embed scaffolding: [`app/embed/[topicId]/`](../../../app/embed/)
