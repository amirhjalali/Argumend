# Sharing Mechanics — UI / Copy / OG / Pre-Filled Specs for Argumend

**Date:** 2026-04-28
**Analyst:** Research agent 05/10, activation-retention swarm
**Brief:** Argumend has 109 pre-analyzed topics, no users, and no paid acquisition channel. Sharing is the only non-paid loop that compounds. This document audits the existing share UI, benchmarks realistic share-rates for cerebral content, and specifies concrete UI / copy / OG / pre-filled-tweet upgrades the founder can ship in a week.

## 1. The Sharing-Loop Math

The viral coefficient is `K = i × c`, where `i` is the average number of invites/shares each user sends and `c` is the conversion rate of those invites into new active users ([Arfadia](https://www.arfadia.com/glossary/EN/k-factor), [Visible.vc](https://visible.vc/blog/k-factor-what-is-your-saas-companys-viral-coefficient/)). True virality requires `K > 1.0`, which is "challenging for most companies" and almost never achieved by a niche-cerebral product.

The realistic targets, calibrated to Argumend's category:

| K-factor | What it means | Where it puts you |
|---|---|---|
| `K < 0.05` | Effectively zero share loop | Most niche tools at launch |
| `K = 0.05–0.15` | Share loop is "alive" — measurable but not self-sustaining | Realistic target band for niche-cerebral content |
| `K = 0.15–0.25` | "30% lower CAC than ad-paid peers"; the floor of a working loop | Strong B2B SaaS — Shoeboxed sat at ~0.2 ([Cobloom](https://www.cobloom.com/blog/how-to-work-out-your-saas-viral-coefficient-and-why-you-should), [SaaStr](https://www.saastr.com/the-low-viral-coefficient-of-saas-and-why-it-thats-just-fine/)) |
| `K > 0.25` | Elite for non-network-effect content | Astral Codex Ten, Wait But Why, NYT interactives |
| `K > 1.0` | True viral | Dropbox referral program, Hotmail's signature footer |

Andrew Chen's correction matters: tracked K-factor often misses the dominant share-channel — copy-paste of a URL into a DM, Slack, or screenshot ([andrewchen.com](https://andrewchen.com/viral-coefficient-what-it-does-and-does-not-measure/)). Reforge calls the broader metric the **Word-of-Mouth Coefficient**, and notes each weekly active user generally drives ~0.15 organic users when measured properly ([Reforge](https://www.reforge.com/blog/word-of-mouth-coefficient)).

**Translating to share-rate per visitor.** If a typical visitor reads one topic and the visit-to-share rate is `s`, and each share has a click-through-rate `ctr` of ~5–10% (Twitter link CTR baseline), and clickers convert to "visitors who also share" at rate `r`, then `K ≈ s × ctr × r`. To hit K=0.15 with 7% CTR and 30% activation-of-clickers, **`s` needs to be ~7% per visitor**. Hitting K=0.25 needs `s` ~12%. Hitting K=0.05 needs `s` ~2.4%. These are the engineering targets.

**Implication:** Argumend should aim for a share-per-visitor rate **≥7%** as the threshold of "the loop is working." Any number below that is invisible against noise. The default share rate on a content site without explicit prompts is ~0.5–1.5%; the work below is closing a 5–10× gap.

## 2. What Gets Shared on X for Cerebral Content

Reviewing high-engagement threads in the rationalist / TPOT / data-Twitter orbit over the last 90 days, the patterns that reliably cross 100K impressions for cerebral-non-political content cluster into five archetypes ([OpenTweet](https://opentweet.io/blog/how-to-go-viral-on-twitter), [Tweet Archivist](https://www.tweetarchivist.com/viral-tweet-templates-guide), [Hipclip](https://www.hipclip.ai/workflows/how-to-create-x-twitter-threads-that-actually-go-viral-in-2025)):

1. **Name-a-thing tweets** — "There's a name for this: [X]." Convert a vague feeling into a citable concept. Argumend's vocabulary (*crux*, *steel-man*, *fallacy node*, *meta-claim*) is raw material. A tweet like *"The 'crux' of the AI doom debate isn't whether AI gets smarter — it's whether intelligence generalizes"* gives the reader a frame they didn't have, then a place to send them.

2. **Visualizations of complex topics** — flowcharts, decision trees, comparison tables outperform pure-text 4–6× on retweets. Tweets with images get ~150% more retweets than text-only ([TweetHunter](https://tweethunter.io/tweetpik)). A screenshot of an Argumend graph *is* the asset; the link is secondary.

3. **Hot-take-with-receipts** — a spicy claim followed by a screenshot of data / quote / paper. The receipt neutralizes the "just an opinion" reflex. Argumend's evidence nodes with confidence scores are pre-built receipts.

4. **Surprising data / counterintuitive number** — "X% of [Y]," "the ratio is N:1." Information-gap theory ([Tweet Archivist](https://www.tweetarchivist.com/how-to-go-viral-on-twitter-2025)): the tweet hints at a fact the reader feels they should already know. Argumend's confidence score (`67% — Contested`) and "Decisive factor: [dimension]" in `ShareVerdictCard` are built for this.

5. **Curiosity-gap headlines** — "Everyone says [X]. The data says the opposite." The crux-share template already in `ShareButtons.tsx` (`"What's the ONE question that would resolve the [topic] debate?"`) is the single best-shaped prefab in the codebase.

What does *not* share for cerebral content: generic headlines, platform-promotional copy, anything press-release-shaped.

## 3. Argumend's Current Share UI — Audit

There *is* a share UI. The bones are reasonable. Problems are positioning, prominence, and the missing screenshot path.

**Where it lives** ([app/topics/[id]/TopicDetailView.tsx](../../../app/topics/[id]/TopicDetailView.tsx)):

- **Top of page (line 1162):** `<ShareButtons />` inside a row also containing `CopyLinkButton`, `EmbedButton`, `SaveTopicButton`, `SubscribeButton`, `Print`. Six controls in one row — share visually disappears in the density.
- **Bottom of page (line 1890):** Second `<ShareButtons />` in a "Found this analysis useful?" CTA card. Placement is correct (post-engagement) but is below the fold; most readers don't scroll there.
- **Component** ([components/ShareButtons.tsx](../../../components/ShareButtons.tsx)): icon-row of Copy, X, LinkedIn, native Web Share + a rust-gradient "Share the Crux" button when a crux exists (lines 226–253). `buildTweetText` (lines 66–76) produces a genuinely good template: meta-claim + verdict + confidence + crux + "See the full argument map →".
- **Verdict-card share** ([components/ShareVerdictCard.tsx](../../../components/ShareVerdictCard.tsx)): a separate dialog rendering 1200×675 (Twitter) / 1080×1080 (Instagram) downloadable PNG via `/api/verdict-card/{topicId}`. **Excellent and underused** — only triggered from `JudgingResults.tsx`, gated behind `NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API`. Most visitors never see it.
- **Save button is dead** ([components/SaveTopicButton.tsx](../../../components/SaveTopicButton.tsx) lines 9–21): 50% opacity, `disabled` because auth is off. The single most damaging UX leak — a visible-but-broken bookmark trains users that interaction does nothing.

**Missing entirely:** per-node share, floating share-tray (no share affordance for ~80% of a long-page read), share-on-quote, "screenshot this crux" button, `mailto:` email-to-friend, and any share prompt at peak-intent moments (save, scroll-to-bottom, debate-finish).

**Net:** copy is above-average. Verdict-card generator is a real asset. Surface area is too small and prompts aren't tied to engagement moments.

## 4. Share Button Placement and Design

The 2025–2026 best-practice consensus ([NiftyButtons](https://www.niftybuttons.com/blog/social-media-friendly-website-2025), [AddToAny](https://www.addtoany.com/buttons/customize/floating_share_buttons), [BlogPros](https://blogpros.com/best-location-share-buttons/)) is *multiple placements that serve different purposes* — under a ceiling, since "there is a point at which the volume of sharing prompts on a page can become actively counterproductive."

**Recommended combination:**

1. **Inline, above-the-fold (keep + promote).** Surface "Share the Crux" *more prominently* than the X/LinkedIn/Copy icons. Right now it's wedged at the end of a six-button row; it should be first or second. Demote Print and Embed into a `…` overflow.

2. **Floating share-tray on scroll, desktop only.** Vertical 4-icon tray (Copy URL, X, Email, Screenshot) anchored to the right edge, appearing after ~600px scroll. Hidden on mobile and print. AddToAny pattern, validated.

3. **Per-node share menu (hover/long-press).** Each `RichNode`/`EvidenceNode`/`MetaNode` gets a `…` menu opening "Share this {position|evidence|crux}". Kialo and Substack don't have this. Granular sharing converts arguments into atomic shareable units. Effort: ~2 days (per-node deep-link URLs `/topics/{id}#node-{nodeId}` + fallback OG).

4. **Quote-to-share on selection.** Highlight text inside an evidence claim or position label → floating "Share this quote" button (Medium pattern, §8). Effort: ~1 day with `selectionchange`.

5. **Modal share-prompt at engagement moments** — scroll-to-bottom, save, finish debate, finish judging. Rate-limit to one per session. Pre-fill X with crux template + screenshot card as secondary.

**Avoid:** sticky-bottom mobile bars (cover content), 6+ social-button stacks (Argumend's audience isn't on Pinterest/Tumblr), prompts within the first 30 seconds.

## 5. Pre-Filled Tweet Copy

The existing `buildTweetText` is good and `buildCruxTweetText` is excellent. Expand to five templates for five share moments, all preserving >80 chars of user headroom per X best-practice ([Target Internet](https://targetinternet.com/resources/how-to-create-pre-written-tweet-buttons-and-links), [Hypefury](https://hypefury.com/tools/twitter-intent-generator/)).

**Template A — Crux frame (existing, keep).** For generic topic-page shares.
```
What's the ONE question that would resolve the {topic_title} debate?

→ {crux_question}

Map the full argument: {url}
```
Name-a-thing pattern; specific question is the curiosity gap; verb-led "map" beats "check out."

**Template B — Surprising verdict.** For topics where the verdict cuts against popular consensus.
```
I assumed {topic_title} was {opposite_of_verdict}.

The evidence is {verdict_label} — {confidence}% confidence.

The decisive factor: {driving_dimension}.

{url}
```
"I assumed → I was wrong" is the highest-converting opening for cerebral X. The decisive-factor line is a receipt without forcing the click.

**Template C — Steelman invite.** For users sharing because they disagree.
```
I disagree with this analysis of {topic_title}, but it's the strongest version of the case I've seen.

Steelman, then crux: {crux_question}

{url}
```
Disagreement is the highest-engagement share emotion on X. "Steelman" is in-group vocabulary; the sharer is rewarded for being intellectually honest while still disagreeing.

**Template D — Evidence-citation share.** For per-node sharing of an evidence claim.
```
Receipts on {topic_title}:

{evidence_claim_text} ({evidence_source})

Full argument map: {url}#node-{node_id}
```
Evidence-as-receipt is its own viral pattern (§2). Node-deep-link supports this.

**Template E — Position-share (steelman of one side).** For per-node position-node sharing.
```
The strongest case {for|against} {topic_title}:

"{position_label}"

But here's the crux that decides it: {crux_question}

{url}
```
Combines position-steelman (fair-minded) with the crux (curiosity gap) without forcing the sharer to take a side.

**Mental test of Template B** on "Does the minimum wage cause unemployment?" (`Contested`, `54%`, decisive factor `Empirical evidence quality`): would I click? Yes. Retweet without clicking? Plausibly. The current crux-template passes the same test.

**Bad copy to remove anywhere it appears:** `Check out this argument: {url}` (no value prop), `New on Argumend: {topic_title}` (platform-promotional), `{topic_title} — Argument Analysis | Argumend` (the page title; fine in a browser tab, dead as a tweet).

## 6. The "Screenshot This" Pattern

Many sharers — especially the ones who travel the furthest — prefer a *screenshot* over a link, because screenshots travel cross-platform (X → Slack → iMessage → Instagram → TikTok) and survive link-blocks. Twitter itself acknowledged this when it added a 2022 in-app prompt nudging screenshotters back to "Share Tweet" — they were leaking engagement to images of tweets ([TechCrunch](https://techcrunch.com/2022/10/07/twitter-nudges-you-to-share-the-tweet-instead-of-taking-a-screenshot/), [BGR](https://bgr.com/tech/twitter-share-tweet-pop-up/)). The takeaway: an Argumend screenshot is more portable than a link, and the platform should *generate* the screenshot rather than letting the user crop the page badly.

**Spec — "Share this Crux" card.**

- **Format:** 1080×1350 portrait (X-friendly vertical, Instagram Story-friendly), per `ShareVerdictCard.tsx`'s existing `instagram` format pattern.
- **Background:** Natural-Philosophy Notebook parchment (`#f4f1eb`, subtle foxing), exactly matching the per-topic OG signature in [02-codex-image-pipeline/04-topic-og-image-pipeline.md](../2026-04-28-codex-image-pipeline/04-topic-og-image-pipeline.md). Crucially: do **not** generate this with Image 2 at runtime — composite at build-time over the same parchment plate.
- **Top:** Small tracked uppercase label `THE CRUX` in deep teal `#3a6965`.
- **Hero:** EB Garamond italic, 56px, max 3 lines — the crux-question text. This is the single load-bearing element.
- **Sub-line:** EB Garamond 400, 28px, stone gray — "{topic_title}".
- **Mid-block (optional):** small inline 3-node mini-graph showing position-evidence-crux glyphs, exactly the motif from the OG pipeline. Reinforces visual signature across share assets.
- **Footer:** ARGUMEND wordmark in tracked Plus Jakarta Sans 600 (top-right or bottom-right) + URL `argumend.org/topics/{id}` in stone gray. Wordmark is overlaid, never Image-2-rendered (per visual-signature §7 — "the wordmark will misspell itself").
- **Generation route:** extend `app/api/verdict-card/[topicId]/route.tsx` to accept a `?card=crux` parameter, returning the crux card instead of the verdict card. Use `@vercel/og` for runtime composition (crux text changes per topic, but layout is fixed). For the parchment background, reuse the pre-generated `/og/topics/{id}.png` background plate from the OG pipeline — same image, different overlay.
- **UI affordance:** in `ShareButtons.tsx`, a `<button onClick={openScreenshotModal}>` next to "Share the Crux" that opens a modal with: card preview, "Download PNG" button (calls the route), "Copy to clipboard" (if Clipboard API supports image MIME, which it does on Chrome/Safari since 2023), and "Tweet with image" (downloads + opens X intent — X cannot accept image upload via intent URL, so the user pastes manually; this is unavoidable).

**Engineering effort:** ~1 week. The biggest item is the layout/typography — the existing `VerdictCardPreview` in `ShareVerdictCard.tsx` lines 113–225 is a near-exact template to fork.

## 7. OG Image Quality — Cross-Reference

When a user shares a URL (rather than a screenshot), X auto-renders the Open Graph image. The OG **is** the share asset for link-shares; everything in §6 is for image-shares. Both paths must be high-quality.

The existing OG pipeline is documented in [docs/research/2026-04-28-codex-image-pipeline/04-topic-og-image-pipeline.md](../2026-04-28-codex-image-pipeline/04-topic-og-image-pipeline.md). Headlines:

- Current state: runtime `@vercel/og` edge route at `/api/og/[id]/route.tsx`, 272 lines, **text-only**, near-identical layout per topic, no parchment, no graph imagery.
- Recommended: build-time pre-generated PNGs to `public/og/topics/{id}.png`. 109 topics × $0.21/topic × 1.3 buffer = ~$30 one-time spend. Each card carries the locked Natural-Philosophy Notebook signature (parchment background, crux statement overlay, 3-node mini-graph, rotating classical artifact deterministically picked from `topic.id` hash).
- The `app/topics/[id]/page.tsx` `generateMetadata()` at lines 50–70 already wires OG and Twitter card metadata. No change needed there — only the asset behind `/api/og/{id}` changes.

**For the share-mechanics work in this document, the OG implication is:** every pre-filled tweet that includes a URL renders that URL's OG card on X. If the OG card is the existing generic text-only template, the tweet looks weak. **Ship the OG pipeline first.** It is the single largest leverage point on link-share quality, applies to every URL-share regardless of channel, and is the largest determinant of which X impressions convert to clicks.

## 8. Quotebacks / Inline-Share

The Substack/Medium pattern: highlight a sentence → popover offers "Share this quote." Substack Notes calls it "Restack quote" ([Substack note](https://substack.com/@substack/note/c-14393355)); Quotebacks ([quotebacks.net](https://quotebacks.net/)) is a standalone extension that wraps highlights in styled embeds.

**Argumend-specific:** the most quotable text isn't prose — it's structured: `meta_claim` (1–2 sentences), `crux.title` per pillar (3–5 per topic), `EvidenceNode` labels (10–20 per topic), `RichNode` position labels (6–12 per topic). Build it as **node-level** sharing — simpler than a prose highlighter, plugs into the `…` menu from §4.3.

For free-form prose (`meta_claim`, intro, "When experts disagree" sections), a `selectionchange` listener shows a floating "Share quote" when 10+ chars are selected. Encoded into the X intent with attribution:
```
"{quoted_text}"

— from Argumend's analysis of {topic_title}: {url}
```

**Effort:** node-level ~1.5 days, prose-level ~1 day. Ship node-level first; prose-level is icing.

## 9. Email-to-Friend Pattern

For the older / non-X audience and office-IT users who don't post publicly, `mailto:` is 5–15% of share volume on content sites. Best-practices ([Friendbuy](https://www.friendbuy.com/blog/referral-email-best-practices), [MailerLite](https://www.mailerlite.com/blog/how-to-promote-your-referral-program-via-email-marketing), [CloudSponge](https://www.cloudsponge.com/blog/referral-email-open-rate/)): subject under 30 chars (mobile truncation), include the topic title, body short and not salesy.

**Template:**
```
Subject: The crux of {short_title}

I think you'd find this interesting — Argumend mapped out the actual crux of the {topic_title} debate.

The crux: {crux_question}
Their verdict: {status_label}, {confidence}% confidence.

Full argument map: {url}

— sent via Argumend (argumend.org)
```

Add an "Email" button between Copy and X in `ShareButtons`. Effort: ~30 min — pure `mailto:` href concat, no API, no auth.

## 10. The Share-on-Save Funnel (Highest-Conversion Moment)

The single best-converting share moment is *immediately after the user takes a positive action*. Saving a topic, finishing a debate session, completing a judging run — these are all moments where the user has signaled to themselves "this matters." The cognitive frame for sharing is already set; the system just needs to ask.

**Current state:** the Save button is rendered as **disabled / 50% opacity** at [components/SaveTopicButton.tsx:9–21](../../../components/SaveTopicButton.tsx) because auth is off. This is a double-loss: the button promises a feature it doesn't deliver, *and* the missing save action means there's no engagement-moment to attach a share prompt to.

**Recommended change:**

1. **Make Save work without auth.** Use `localStorage` for anonymous saves, exactly the pattern most reading apps use pre-account. When the user later signs in (when auth ships), migrate the local saves to `saved_topics`. This unblocks the engagement signal *and* gets users a useful feature.
2. **On every Save, fire a one-time-per-session share prompt:** a small modal that appears 600ms after the save animation, copy: *"Saved. Want to share with someone who'd disagree?"* with three buttons: "Share to X" (pre-filled crux template), "Email to a friend" (`mailto:`), "Not now" (dismisses for the session). 
3. **Track the share-on-save conversion** as a distinct event (`share_after_save` in `lib/analytics.ts`). Hypothesis: this funnel converts at 2–4× the rate of the static top-of-page share button, because intent is freshest.
4. **Mirror the same prompt at other engagement moments** — finishing a debate, completing a judging round — but rate-limit to one prompt per session so the user is never asked twice.

**Why "share with someone who'd disagree"** is the right copy:
- It reframes sharing from "promote a website" to "win an argument with my brother-in-law," which is the actual emotional driver for cerebral content.
- It selects for *crux*-flavored sharing rather than agreement-bubble sharing, which lengthens the loop (a disagreer is more likely to click and engage than an agreer).
- It matches Argumend's brand promise ("map arguments, don't win them") more honestly than "share this analysis."

This is the highest expected-value share-mechanic in the document: minimal engineering (~1 day total — `localStorage` save + modal + analytics), highest conversion uplift, and it costs nothing to implement against the no-code observation freeze constraint, since the modal is just UI.

---

## Final summary — top 3 share-mechanic upgrades, ranked by share-rate uplift × engineering effort

**1. Ship the OG image pipeline (cycle 3 file 04) before any other share-mechanic work.** Every URL-share renders the OG card on X. The current text-only OG card is the bottleneck on every link-share path. Spend: ~$30 one-time, ~1 week eng. Uplift: 1.5–3× on link-share CTR (estimated). This is the single biggest lever and unblocks everything else.

**2. Fix Save (localStorage) and add the share-on-save modal.** Highest-intent moment, lowest engineering cost, no auth dependency. ~1 day total. Uplift: 2–4× on share-rate per engaged visitor (estimated). Closes the most damaging UX leak (the dead Save button) at the same time.

**3. Add "Screenshot this Crux" + the floating share-tray + email-to-friend.** Bundle: ~1 week eng. Uplift: 1.5–2× on screenshot-channel and 1.1–1.3× on overall share volume. Per-node share and quote-to-share are *nice-to-haves* below this bar — defer them to a second sprint after the loop is measurably alive.

Sources cited inline throughout. Key references: [Reforge Word-of-Mouth Coefficient](https://www.reforge.com/blog/word-of-mouth-coefficient), [Andrew Chen — viral coefficient](https://andrewchen.com/viral-coefficient-what-it-does-and-does-not-measure/), [SaaStr — low viral coefficient is fine](https://www.saastr.com/the-low-viral-coefficient-of-saas-and-why-it-thats-just-fine/), [X intent tweet docs](https://developer.x.com/en/docs/x-for-websites/tweet-button/overview), [TechCrunch — Twitter screenshot nudge](https://techcrunch.com/2022/10/07/twitter-nudges-you-to-share-the-tweet-instead-of-taking-a-screenshot/), [TweetHunter — image retweet uplift](https://tweethunter.io/tweetpik), [Friendbuy — referral email best practices](https://www.friendbuy.com/blog/referral-email-best-practices).
