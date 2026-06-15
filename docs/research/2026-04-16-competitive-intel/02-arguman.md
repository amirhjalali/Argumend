# Arguman.org — Competitive Intel

Prepared 2026-04-16. Cited sources listed at bottom. Claims not backed by a URL are flagged "likely" or "unclear."

## 1. Snapshot

**What it is.** Arguman.org is an open-source, Django/Python platform for collaborative argument mapping. Unlike Kialo's binary pro/con structure, it uses three premise connectors — "because" (çünkü), "but" (ama), and "however" (ancak) — plus user-flaggable fallacies, rendered as hierarchical tree maps ([Wikipedia — Argüman](https://en.wikipedia.org/wiki/Arg%C3%BCman); [GitHub README](https://github.com/arguman/arguman.org/blob/master/README.md)).

**Founders / timeline.** Started October 2014 in Istanbul by **Fatih Erikli** (web developer at Hipo agency, active in the Python Istanbul community), with early co-maintainer **Tuna Vargı** who presented the project at FOSDEM 2016. The Turkish README credits 15 contributors including Hüseyin Mert, Burak Arıkan, and Kadir Akkara ([Webrazzi 2014-10-31](https://webrazzi.com/2014/10/31/arguman-org-platform/); [FOSDEM 2016](https://archive.fosdem.org/2016/schedule/event/arguman/); [README-TR](https://github.com/arguman/arguman.org/blob/master/README-TR.md); [Crunchbase — Fatih Erikli](https://www.crunchbase.com/person/fatih-erikli)). Turkish HN-equivalent reception was warm: 600 members in the first week, 60% return rate ([Webrazzi 2014-10-31](https://webrazzi.com/2014/10/31/arguman-org-platform/)). English launch at en.arguman.org on ~October 14, 2015, front-paged Hacker News with 170 points, 61 comments ([Show HN](https://news.ycombinator.com/item?id=10405288); [Webrazzi 2015-10-14](https://webrazzi.com/2015/10/14/arguman-org-ingilizce-dil-versiyonuyla-kuresel-pazara-acildi/)).

**Current status: zombie, not dead.** The English site en.arguman.org is down (confirmed — connection refused on fetch). Wikipedia asserts the whole platform is "down as of 2023" but this is **wrong** — the Turkish site arguman.org is still live and active as of 2026-04-16, with debates posted within the last 6 hours of the fetch and an active issue (#404) opened January 2026 ([live site check](https://arguman.org); [GitHub Issues](https://github.com/arguman/arguman.org/issues)). Code is functionally abandoned though: last commit April 27, 2021, five years ago ([GitHub commits](https://github.com/arguman/arguman.org/commits/master)).

**Usage signals (rough).** 1.4k GitHub stars, 152 forks, ~500 commits, 24+ dev contributors (FOSDEM claim) ([GitHub repo](https://github.com/arguman/arguman.org); [FOSDEM 2016](https://archive.fosdem.org/2016/schedule/event/arguman/)). ProductHunt launch got only 10 upvotes and 162 comments on the main listing; a secondary listing got 1 upvote ([ProductHunt](https://www.producthunt.com/posts/arguman)). No Similarweb data surfaced. Turkish-side activity today is a trickle of power users, not a thriving community.

## 2. Product vs. Argumend

| Capability | Arguman | Argumend |
|---|---|---|
| Graph visualization | Hierarchical tree, dense, dated UI | React Flow canvas, modern, animated |
| Argument relation types | 3 (because/but/however) + fallacy flags | Positions, evidence, cruxes, fallacies |
| Content model | User-generated, crowd-authored | AI-extracted from 109 pre-analyzed topics |
| Authoring | Anyone can post/branch | Solo founder curates; live extraction behind feature flag |
| Languages | Turkish (live), English/French/Chinese (mostly dead subdomains per [search result]) | English only |
| Licensing | GPL v3 / AGPL open source | Proprietary SaaS |
| Tech stack | Python/Django, Postgres | Next.js 16, React 19, Drizzle, Postgres |
| AI features | None | Multi-model judge council, debate generation, crux extraction |
| Evidence with sources | Free-text URL support | Structured evidence nodes with confidence |
| Fallacy taxonomy | User-flagging of fallacies | AI-detected fallacies on arguments |
| Educational positioning | Implicit, grassroots | Explicit guides, blog, "stoic" framing |
| Mobile | Subdomain existed (m.arguman.org), status unclear | Responsive web only |

**Where Arguman is stronger:** Multi-user crowd authorship (it's a social platform, not a read-only analysis tool). Turkish-language moat. Free and hackable. Ten years of real user-created content surviving on the site.

**Where Argumend is stronger:** Every other axis: design aesthetic, AI-powered extraction (Arguman requires humans to type every node), modern graph interactions, explicit crux/evidence/fallacy ontology, judge council, structured schemas, mobile-era performance. Argumend looks like 2026; Arguman looks like 2015.

## 3. Acquisition Story

Arguman's acquisition playbook was almost entirely **earned media + open-source social proof**, not paid channels:

1. **Turkish tech press (Webrazzi) covered launch** one week after shipping, October 2014 ([Webrazzi 2014-10-31](https://webrazzi.com/2014/10/31/arguman-org-platform/)). This is the Turkish equivalent of a TechCrunch cover — a huge leg up domestically.
2. **Show HN, October 2015 (170 points)** drove the international wave ([HN](https://news.ycombinator.com/item?id=10405288)). That thread seeded English contributors for the next 18 months.
3. **FOSDEM 2016 talk** (Brussels) gave it open-source credibility ([FOSDEM 2016](https://archive.fosdem.org/2016/schedule/event/arguman/)).
4. **LessWrong post** October 2015 — but it got only 3 comments and was critiqued for crowdsourced quality problems ([LW post](https://www.lesswrong.com/posts/GnBixKDnnMNkNYavM/link-arguman-org-an-argument-analysis-platform)). Notable because LW/rationalist audience is *exactly* the target market for argument mapping and it didn't stick.
5. **Python Istanbul community** seeded the initial contributor base ([Webrazzi 2014-10-31](https://webrazzi.com/2014/10/31/arguman-org-platform/)).
6. **GitHub translation contributions** — Spanish draft via GitHub mentioned in Webrazzi; English, French, Chinese subdomains existed at peak.
7. **Second HN post April 2019** got only 3 points and 1 comment — by then the magic was gone ([HN 2019](https://news.ycombinator.com/item?id=19702177)).

Non-Turkish users came almost entirely from HN and LessWrong. No evidence of paid marketing, partnerships, or SEO strategy.

## 4. Plateau or Death Cause

**Repo activity: dead.** Last commit April 27, 2021 — a license update, not a feature. No real development since ~early 2020. Fourteen open issues, some dating to 2014, sit unanswered. 2026-filed issues receive no maintainer response ([commits](https://github.com/arguman/arguman.org/commits/master); [issues](https://github.com/arguman/arguman.org/issues)).

**Site: zombie.** The Turkish main site still accepts posts and still shows recent user activity, but there is no new code, no moderation visible to me, and no product direction. The founder Fatih Erikli now blogs about Prolog interpreters and propositional logic on Medium — his last blog post was May 2021, and arguman is absent from his current public output ([Medium](https://fatiherikli.medium.com/)). Reasonable inference: he moved on, the site runs on autopilot.

**Structural issues open-source argument mapping reveals:**

1. **Quality collapse without moderation.** DanArmak's 2015 LessWrong critique called it out day one: "you'll mostly update in the direction of seeing a complicated mess" ([LW](https://www.lesswrong.com/posts/GnBixKDnnMNkNYavM/link-arguman-org-an-argument-analysis-platform)). Crowd-authored trees get noisy fast. zbyte64 on HN 2015 said the same: "inject enough irrelevant counterarguments and you get the same quasi-controversy" ([HN](https://news.ycombinator.com/item?id=10405288)).
2. **UI/UX never matured.** The 2019 HN commenter: "does not actually help my understanding ... has not found the right design yet" ([HN 2019](https://news.ycombinator.com/item?id=19702177)). Dense tree layouts don't scale visually past a few dozen nodes.
3. **No monetization, no full-time team.** Open-source social apps need either (a) a commercial sponsor or (b) a funded non-profit. Arguman had neither.
4. **Kialo ate the international market.** Kialo launched 2017-ish, closed-source, VC-funded, educator-focused, now ~1M users and 400k+ discussions across 49 languages ([Wikipedia — Kialo](https://en.wikipedia.org/wiki/Kialo); [AlternativeTo](https://alternativeto.net/software/arguman/)). Arguman's "three connectors vs. two" differentiation wasn't enough against Kialo's EDU distribution.
5. **Non-falsifiable / subjective topics.** Structured argument maps work for *some* debates; they're useless for subjective or non-falsifiable ones. jsprogrammer in 2015 and leni536 in 2015 both flagged this ([HN](https://news.ycombinator.com/item?id=10405288)).

**The core lesson:** Open-source + "anyone can contribute" is death for argument mapping. The quality floor collapses without aggressive editorial curation, and Arguman had neither the business model nor the headcount to impose one.

## 5. Where Users Live Now

Former and would-be Arguman users have fragmented across:

- **Kialo** — dominant in education and EDU-adjacent debate, 1M+ users ([Wikipedia — Kialo](https://en.wikipedia.org/wiki/Kialo)). This is where the English-speaking Arguman crowd went.
- **r/arguman subreddit** — the README references it but it's essentially inactive (Reddit blocks my fetch; per search context, low engagement) ([GitHub README](https://github.com/arguman/arguman.org/blob/master/README.md)).
- **LessWrong / EA Forum** — the rationalist crowd that sympathizes with argument mapping still discusses why it hasn't caught on ([EA Forum post](https://forum.effectivealtruism.org/posts/HmYfoKW6FuyFHmwcJ/why-is-argument-mapping-not-more-common-in-ea-rationality)). This audience is Argumend's clearest organic fit and it's NOT on Kialo.
- **Plurality / civic-tech communities** — Arguman is catalogued in the Plurality Mapping Project ([Obsidian Publish](https://publish.obsidian.md/plurality-map/%F0%9F%94%A8+Tools/Arguman)). Audrey Tang-adjacent civic tech still thinks about this problem.
- **Academic argument-mining researchers** — some papers used Arguman excerpts as a corpus (noted in Wikipedia) but no single dominant paper dataset emerged; the cited corpora in 2024-era argument mining (M-Arg, OpenDebateEvidence) do not draw on Arguman.
- **Argdown / Argunet / DebateGraph users** — small tech-literate niche, mostly lapsed ([AlternativeTo](https://alternativeto.net/software/arguman/)).
- **Turkish arguman.org itself** — still has a small live user base. A direct outreach play.

## 6. Kill-Shots for Argumend

**HIGH — 1. Treat Arguman as a dead-whale distribution opportunity, not a competitor.** The Turkish arguman.org still has live users; the English version is dead; the global open-source argument-mapping category has no active leader below Kialo. Fork the Arguman topic archive (public, GPL), translate 50–100 of the highest-quality debates to English via Claude, import them as Argumend topics with backlinks, and publish "What we learned reading 10 years of arguman.org." This is a content moat, an SEO magnet, and it positions Argumend as the intellectual heir. **Confidence: HIGH — the content is public, the competitive window is open.**

**MEDIUM — 2. Kill the "anyone can contribute" fantasy; double down on AI-curated quality.** Arguman's cautionary tale is that crowdsourced argument trees devolve into quasi-controversy within months (per both 2015 HN critiques and 2019 follow-up). Argumend's existing architecture — AI-extracted topics, editorial curation, 109 pre-analyzed datasets — IS the correct response, but the homepage/onboarding doesn't frame it that way. Rewrite the positioning: "We read the debates so you don't have to drown in them." Specifically, add a comparison page (Argumend vs. Kialo vs. Arguman) that makes the curation thesis explicit. **Confidence: MEDIUM — clear product insight, but the bet is that positioning fixes a non-positioning problem.**

**LOW — 3. Court the LessWrong / EA Forum / rationalist audience directly.** Arguman's 2015 LessWrong post got 3 comments and died. The 2023 EA Forum post asking "Why is Argument Mapping Not More Common in EA/Rationality" shows the demand is still unmet ([EA Forum](https://forum.effectivealtruism.org/posts/HmYfoKW6FuyFHmwcJ/why-is-argument-mapping-not-more-common-in-ea-rationality)). Answer that post. Publish an Argumend crux analysis of a LessWrong canonical debate (AI doom probability, shrimp welfare, etc.) and share it there. That community values the product premise more than any other on the internet and has been waiting a decade for someone to do it right. **Confidence: LOW — this audience is notoriously hostile to marketing, and a wrong move burns the relationship permanently. Do it via genuine content, not launch announcements.**

## Sources

- [Wikipedia — Argüman](https://en.wikipedia.org/wiki/Arg%C3%BCman)
- [GitHub — arguman/arguman.org](https://github.com/arguman/arguman.org)
- [GitHub — README.md](https://github.com/arguman/arguman.org/blob/master/README.md)
- [GitHub — README-TR.md](https://github.com/arguman/arguman.org/blob/master/README-TR.md)
- [GitHub — commits](https://github.com/arguman/arguman.org/commits/master)
- [GitHub — issues](https://github.com/arguman/arguman.org/issues)
- [Show HN: Arguman (Oct 2015, 170 pts)](https://news.ycombinator.com/item?id=10405288)
- [HN 2019 — Arguman post](https://news.ycombinator.com/item?id=19702177)
- [HN 2025 — "Arguman, now defunct"](https://news.ycombinator.com/item?id=44743811)
- [FOSDEM 2016 talk by Tuna Vargı](https://archive.fosdem.org/2016/schedule/event/arguman/)
- [Webrazzi — Turkish launch, Oct 2014](https://webrazzi.com/2014/10/31/arguman-org-platform/)
- [Webrazzi — English launch, Oct 2015](https://webrazzi.com/2015/10/14/arguman-org-ingilizce-dil-versiyonuyla-kuresel-pazara-acildi/)
- [LessWrong post on Arguman (2015)](https://www.lesswrong.com/posts/GnBixKDnnMNkNYavM/link-arguman-org-an-argument-analysis-platform)
- [ProductHunt — Argument Analysis Platform](https://www.producthunt.com/posts/arguman)
- [AlternativeTo — Arguman](https://alternativeto.net/software/arguman/)
- [Olivia Appleton-Crocker portfolio — Arguman contribution](https://oliviaappleton.com/work/minor/arguman.org.html)
- [Plurality Mapping Project — Arguman](https://publish.obsidian.md/plurality-map/%F0%9F%94%A8+Tools/Arguman)
- [Crunchbase — Fatih Erikli](https://www.crunchbase.com/person/fatih-erikli)
- [Fatih Erikli on Medium](https://fatiherikli.medium.com/)
- [Fatih Erikli on Twitter/X](https://x.com/fthrkl)
- [Wikipedia — Kialo](https://en.wikipedia.org/wiki/Kialo)
- [EA Forum — Why is Argument Mapping Not More Common?](https://forum.effectivealtruism.org/posts/HmYfoKW6FuyFHmwcJ/why-is-argument-mapping-not-more-common-in-ea-rationality)
- Live fetch of arguman.org, 2026-04-16 (showed active Turkish debates within last 6 hours)
