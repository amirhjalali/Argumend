# Argumend Competitive & Distribution Market Map

**Date:** 2026-04-16
**Method:** 10 parallel deep-research agents, ~30 min each, ~650k tokens total
**Targets:** 5 direct competitors (Kialo, Arguman, DebateGraph, Rationale/bCisive, Argunet) + 5 audience-adjacencies (LessWrong, Metaculus, Manifold, AllSides/Ground News, ACX/rationalsphere)
**Why this research:** 14-day no-code observation freeze (day 7 of 14). Argumend has many features shipped and essentially zero users. This research is for a *why-nobody-uses-it* diagnosis, not a feature backlog.

---

## 1. The category graveyard is large. Read it before building more.

Four out of five direct competitors are dead or zombie:

| Target | Status | Years | Cause of death |
|---|---|---|---|
| **DebateGraph** | Zombie (homepage stub; blog stopped Oct 2014) | 2008-2014 | Institutional deals (White House, Al Jazeera, UK FCO) were editorial time-boxes; maps froze when projects ended. Readers >> editors funnel with no automated authoring. |
| **Arguman (English)** | Dead | 2015-2019 | Open-source + crowd-authored collapses without editorial moderation funding. Show HN and LW reviewers flagged quality on day one. No business model → no moderation → rot. |
| **Arguman (Turkish)** | Zombie-live | 2015-present | Same cause; Turkish version limps on; code last committed April 2021. |
| **Rationale / bCisive (Austhink)** | Zombie (sold 2011) | 2007-2010 | bCisive's enterprise bet caused funding crisis. Corporates wouldn't adopt novel notation when PowerPoint/Excel existed. Rationale survives professor-by-professor under ReasoningLab branding. |
| **Argunet** | Effectively retired | 2011-~2018 | Academic-funded tool; successor Argdown (plain-text markup, Christian Voigt, ~1k GitHub stars) more alive. DebateLab@KIT has pivoted to LLM reasoning eval (Logikon, DeepA2, Argunauts). |
| **Kialo** | Alive — but only the Edu fork | 2017-present | Public kialo.com is niche/active but plateaued. Edu (1M users, 155+ countries) survives because **teachers are paid moderators**. |

**One adjacent casualty to sit with:** Arbital — Yudkowsky's own knowledge-mapping platform (2014-2017) died for the exact reasons Argumend is heading the same way: built too long before finding users, rationalist community consumes rationality content but does not reliably author knowledge graphs. The postmortem reads like a pre-mortem for Argumend.

**The category-wide structural lesson:** A 2022 ACM C&T paper explicitly groups DebateGraph-class tools into the failure bucket. The flaw is the **readers >> editors >> sustainers** funnel — structured authoring is a participation tax, and pre-LLM no one had an automated authoring layer. That's the vacuum Argumend lives in.

## 2. What's structurally different for Argumend (the real edge)

Every report independently flagged the same opening: **LLM-driven authoring collapses the reader/editor distinction**. This is the one thing that has changed since 2008-2018 when the prior wave failed. Specifically:

- **Paste any URL → argument map** (Rationale report kill-shot, HIGH): the AI-extraction capability is what makes Rationale obsolete, but it is currently buried behind Argumend's 109-topic catalog. Landing-page promise doesn't match product demo. Nobody knows this is the thing.
- **Embeddable map widget** (Manifold report kill-shot, HIGH): Manifold's single biggest growth lever was Sinclair Chen's EA Forum / Substack embeds. An argument map is *more* embed-native than a prediction market because it's visual. No one in the category has shipped this well.
- **Viral "chart" artifact** (AllSides report kill-shot, HIGH): AllSides' Media Bias Chart is the whole reason AllSides still exists despite flat growth. Argumend has 109 topics' worth of data that could become a Crux Map, Fallacy Frequency chart, or Position × Evidence scatter.

These three are the *product surface* changes that differentiate Argumend from the graveyard. All three are content/positioning-level, not deep engineering.

## 3. The convergent distribution playbook

Seven independent reports converged on the same audience (rationalist/epistemics) and the same anti-playbook (**don't lead with the tool**). Specific evidence:

- **LessWrong already debated argument mapping and rejected tool-first approaches.** The LW post "Why is Argument Mapping Not More Common in EA/Rationality?" is a market-research gift — the exact audience asking for exactly this product. Top objection: Kialo-style UIs are less pleasant than prose. Lead with the *output*, not the interface.
- **Manifold's viral launch was synchronized, not single-shot.** Feb 9-14 2022 — EA Forum + LW + Show HN in five days, anchored by a pre-launch Scott Alexander grant. Founders were already LW/EA Forum regulars. Argumend's path is the same: 12+ months of hand-to-hand community work, not one viral post.
- **"Tool is byproduct, analysis is wedge"** (LessWrong + ACX reports, independently). The pattern is: publish an MMTYWTK-grade analysis on a live controversial topic, use Argumend artifacts as footnotes / figures, aim for a Scott Alexander Links-roundup mention. One Links inclusion ≈ 20k click-throughs.
- **The AI 2027 launch** (Kokotajlo + Scott + Dwarkesh, April 2025) is the blueprint for rationalsphere virality: long document + microsite + podcast + cross-Substack pickup. Argumend could replicate the *pattern* on a different topic.
- **Ground News proved paid distribution converts.** $2-5M/yr on YouTube creator sponsorships; #1 brand sponsor on YouTube 2025. Substack is less saturated. $10-25k/mo test budget for 3 months is the live experiment — but only *after* the viral-chart hook exists.

## 4. The concrete calendar (what's actually imminent)

Three time-boxed distribution opportunities are close enough to matter RIGHT NOW:

| Event | Date | Distance | Action |
|---|---|---|---|
| **ACX Book Review Contest** | Deadline May 20, 2026 | ~5 weeks | Submit a review that uses Argumend artifacts as structural backbone. Winners get sidebar links, free subs, guest-post rights. |
| **LessOnline 2026** | June 5-7, 2026, Berkeley, $675 | ~8 weeks | ~700 attendees including Scott Alexander, Yudkowsky, Zvi, Hanson, patio11. Single highest-leverage in-person opportunity. |
| **Manifest 2026** | Lighthaven, June 2026 (co-located) | ~8 weeks | Buy a room or slot inside the existing Lighthaven block, not host a separate event. Fraction of the cost of standalone. |

Slower but still in scope:
- **ACX Grants** next round — likely late 2026 / early 2027. 2025 funded 42 of 654 applicants at $5-150k. Epistemics tooling is explicitly in-scope.
- **Kialo Edu copyable playbook** (LTI 1.3 → Canvas/Blackboard/Moodle, ISTE/BETT conferences, EdTech Impact badges) — 3-6 months if Argumend wants to bet on the IB Theory of Knowledge / philosophy-classroom wedge.

## 5. Ranked kill-shots, cross-cutting

**HIGH confidence, fast to act (do these first):**

1. **Reframe the homepage around "paste any URL → argument map."** The AI-authoring capability is Argumend's structural edge over the entire graveyard; hiding it behind a topic catalog squanders the differentiator. (From: Rationale, DebateGraph, Argunet reports.)
2. **Ship an embeddable map widget.** Optimize for Substack / blog / LW post embeds. Every map embedded in an ACX or Zvi post becomes a permanent acquisition funnel. (From: Manifold report.)
3. **Publish one MMTYWTK-grade analysis using Argumend artifacts.** Specific candidate: **Double Crux visualized — Hanson–Yudkowsky Foom debate**. Pre-existing community appetite, canonical disagreement, Argumend is the only tool that can render it cleanly. Aim for LW front page + ACX Links mention. (From: LessWrong, ACX, Metaculus reports.)
4. **Ship a "Crux Map / Fallacy Frequency" visualization** drawn from the 109-topic corpus. One image, shareable, backlink-compounding. AllSides Media Bias Chart is the precedent. (From: AllSides report.)
5. **Attend LessOnline 2026.** 8 weeks away. Not to pitch — to talk to 50 rationalists about what they'd actually use. This is the observation-freeze-compatible highest-leverage action. (From: LessWrong, Manifold, ACX reports.)

**MEDIUM confidence:**

6. **Map the top 20 Metaculus questions** weekly → publish to LW + EA Forum. (Metaculus report.)
7. **Seed Zvi Mowshowitz with one Argumend-produced analysis.** 33k subs, weekly AI roundup, higher link density than Scott. One citation from him is front-page-adjacent reach. (LessWrong + ACX reports.)
8. **Apply for ACX Grants** when the round opens. Epistemics tooling fit is explicit; $5-150k buys 6-12 months of runway. (ACX report.)
9. **Expose an Argdown-compatible plaintext export.** Argdown has ~1k GitHub stars, live community; compatibility intercepts the argument-mining research audience. (Argunet report.)
10. **Run one small empirical study** (Rationale-style) showing Argumend reading improves topic comprehension. Academic credibility anchor at low cost. (Rationale report.)

**MEDIUM-LOW / conditional:**

11. **Substack + mid-tier podcast ads** ($10-25k/mo, 3-month test). Ground News's proven playbook. **Only after** the viral chart and MMTYWTK piece exist as hooks. (AllSides report.)
12. **IB Theory of Knowledge teachers** as a narrow education wedge. Kialo Edu is locked to nonprofit structure; can't ship AI grading. Argumend can. (Kialo report.)

## 6. What to NOT do — the traps this research ruled out

- **Institutional deals (White House / media partnerships).** DebateGraph trap. Editorial time-boxes that freeze. Rank LOW.
- **General university / philosophy-department sales.** Rationale trap. High-touch, low-revenue, hard to commercialize for a solo founder.
- **Open-source free model without editorial funding.** Arguman trap. Category has empirically failed here.
- **Launching by showing the tool.** Arbital trap. Rationalists consume content, don't author tools. "Why is argument mapping not more common in EA/rationality" is their literal question — answer it with output, not a demo.
- **Play-money economy / gimmick gamification.** Manifold's sweepcash pivot killed its community in 6 months.
- **School library / district sales motion.** Multi-year institutional; wrong moment for a solo founder on observation freeze.

## 7. The honest reframe

Every one of these reports points at the same conclusion, which is worth stating directly: **Argumend's problem is not a feature problem. It is a distribution-and-positioning problem.** The product is ahead of where the last wave died, but the landing page, the launch motion, and the target audience were never sharpened into a distribution-first shape.

Every HIGH kill-shot above is **doable during the no-code observation freeze**: they are content, positioning, homepage copy, and one event purchase. The one exception is the embed widget, which is the first candidate for the *end* of the freeze.

## 8. First concrete moves (if you adopt this synthesis)

End-of-freeze candidate list — pick ≤3:

1. Rewrite homepage above-the-fold around "paste URL → argument map." (~1 day when freeze ends)
2. Draft the Hanson-Yudkowsky Foom double-crux-visualized post; publish to LW. (~1 week)
3. Register for LessOnline 2026 + Manifest 2026 Lighthaven slot. (~1 hour, $1k-2k)
4. Design the viral Crux Map / Fallacy Frequency image from the 109-topic corpus. (~2-3 days)
5. Ship embed widget. (~3-5 days)

The observation-freeze-compatible subset (#2, #3, #4 partial) is probably the right week-2 work.

---

## Appendix: Source reports

- [01-kialo.md](01-kialo.md) — the incumbent, Edu-locked survival
- [02-arguman.md](02-arguman.md) — open-source failure mode
- [03-debategraph.md](03-debategraph.md) — institutional-deal trap
- [04-rationale-bcisive.md](04-rationale-bcisive.md) — academic + enterprise double failure
- [05-argunet.md](05-argunet.md) — academic succession (Argdown, Logikon)
- [06-lesswrong.md](06-lesswrong.md) — core audience + Arbital precedent
- [07-metaculus.md](07-metaculus.md) — adjacent epistemics audience
- [08-manifold.md](08-manifold.md) — 0-to-1000 playbook in this audience
- [09-allsides-groundnews.md](09-allsides-groundnews.md) — paid distribution + viral chart
- [10-acx-rationalsphere.md](10-acx-rationalsphere.md) — distribution channel anatomy
