# Rationale & bCisive (Austhink Software / Tim van Gelder) — Competitive Intel

Research date: 2026-04-16. The academic forebears of modern argument mapping. Two commercial products, one academic founder, a 20-year cautionary tale about turning pedagogy into a business.

## 1. Snapshot

**What they are.** Rationale is desktop + web argument-mapping software originally aimed at students in critical-thinking courses. bCisive is the same core technology rebranded for business decision-making ("decision mapping": options, pros/cons, supporting arguments). Both are built around the Toulmin/Beardsley tree structure — claim nodes with color-coded pro/con/rebuttal children.

**Founders & timeline.** Tim van Gelder — PhD University of Pittsburgh 1989, Principal Fellow in Philosophy at University of Melbourne — co-founded Austhink Consulting (with Paul Monk, 2000) and Austhink Software (2004). His collaborator Andy Bulka built the precursor Reason!Able (2000). Austhink Software released Rationale in 2006 and bCisive in 2008, raising ~$4.1M in venture capital (Starfish Ventures, Series B) across 2005 and 2008 ([Wikipedia — Tim van Gelder](https://en.wikipedia.org/wiki/Tim_van_Gelder); [timvangelder.com/about](https://timvangelder.com/about/); [Crunchbase — Austhink Software](https://www.crunchbase.com/organization/austhink-software)).

**Current status.** Austhink Software Pty Ltd failed as a going concern in 2010 — "for a variety of reasons not able to make the necessary investments" ([ReasoningLab — Austhink in progress, 2012](https://www.reasoninglab.com/2012/03/27/austhink-progress/)). A Dutch outfit, **Critical Thinking Skills BV** / Kritisch Denken BV (Amsterdam), bought the IP in 2011 and continues to sell both products under the ReasoningLab brand ([reasoninglab.com](https://www.reasoninglab.com/); [rationaleonline.com/about](https://www.rationaleonline.com/about)). Van Gelder exited the CEO role in 2009 and is now an Enterprise Research Fellow at University of Melbourne, running The SWARM Project (IARPA-funded collaborative reasoning platform) and a small consultancy, van Gelder & Monk ([timvangelder.com/about](https://timvangelder.com/about/); [Hunt Lab — SWARM](https://huntlab.science.unimelb.edu.au/home/swarm/)).

**Adoption signals.** Testimonial pages claim use at Princeton, Harvard, Melbourne, NC State, University of Amsterdam ([reasoninglab.com](https://www.reasoninglab.com/)). These are genuine but narrow — typically a single instructor (e.g. Simon Cullen's Princeton freshman seminar "Philosophical Analysis Using Argument Maps" with Adam Elga and Eva van der Brugge) rather than department-wide rollouts ([Princeton Alumni Weekly — Mapping an Argument](https://paw.princeton.edu/article/mapping-argument); [Daily Nous 2015](https://dailynous.com/2015/01/12/mapping-philosophical-arguments/)). Cullen ultimately built his own tool (**philmaps / MindMup-style** — [maps.simoncullen.org](https://maps.simoncullen.org)) rather than stay on Rationale, which tells you something. Most recent ReasoningLab blog post: February 2026 ([rationaleonline.com](https://rationaleonline.com/)). Zombie-active is a fair label — being maintained but not growing.

## 2. Product vs. Argumend

### Rationale vs. Argumend

| Dimension | Rationale | Argumend |
|---|---|---|
| Primary user | Students learning to map arguments | Readers trying to understand a topic |
| Input | User draws the map node by node | AI extracts map from text/topic |
| Canvas | Tree (claim → pro/con) | Graph (positions, evidence, cruxes, fallacies) |
| Evidence model | Evidence nodes attach as leaves | First-class evidence with confidence scoring |
| Cruxes/fallacies | Not built-in as typed nodes | Typed nodes, visually distinct |
| Pre-built content | None — blank canvas | 109 pre-analyzed topics |
| Price | Subscription (~€10 for 15-day trial, then ongoing; education discount 50%) ([reasoninglab.com/rationale2.0](https://www.reasoninglab.com/rationale2.0/)) | Free |
| Pedagogical research backing | ~0.7–0.85 SD gains on CCTST (Álvarez meta-analysis; Twardy 2004) ([Wikipedia — Argument map](https://en.wikipedia.org/wiki/Argument_map); [ThinkerAnalytix 2015 PDF](https://thinkeranalytix.org/wp-content/uploads/2018/09/TvG-Using-argument-mapping-to-improve-critical-thinking-skills-2015.pdf)) | None |

**Where Rationale is stronger:** 25 years of empirical research showing it demonstrably teaches reasoning skill. "Essay mode" that converts maps to prose. Institutional trust built by van Gelder's academic network. It is a legitimate pedagogical instrument, not a content-consumption tool.

**Where Argumend is stronger:** Zero manual labor — user gets a useful artifact without first learning a notation. Richer ontology (cruxes, fallacies, confidence). 109 pre-seeded topics vs. a blank canvas. Free.

### bCisive vs. Argumend

| Dimension | bCisive | Argumend |
|---|---|---|
| Primary user | Managers, consultants, lawyers | General reader |
| Map type | Decision trees (options/criteria/pros/cons) | Argument graphs |
| Collaboration | Online version has shared maps | Not collaborative (yet) |
| AI | None (manual mapping) | AI extraction + judging |
| Price | Subscription, similar tier to Rationale; "contact for license" enterprise pricing ([reasoninglab.com](https://www.reasoninglab.com/)) | Free |

**Where bCisive is stronger:** Explicit decision semantics (options vs. arguments vs. evidence) tuned for business meetings. The 2008 Michael Sampson review was enthusiastic about its structural discipline vs. ordinary mind-maps ([michaelsampson.net 2008](https://michaelsampson.net/2008/07/21/thoughts-on-aus/)).

**Where Argumend is stronger / not comparable:** Different job — Argumend is for understanding contested questions, not for a management team choosing between vendors. bCisive never found product-market fit here; Argumend shouldn't chase this use case unless pivoting.

## 3. Acquisition story

**Rationale — the academic sales playbook.** Austhink sold Rationale the way most edtech sells: professor by professor. Van Gelder's own 2001–2004 Melbourne data (showing ~0.8 SD critical-thinking gains, published and evangelized at ASCILITE and in peer-reviewed venues) was the lead magnet ([van Gelder 2001 ASCILITE PDF](https://www.ascilite.org/conferences/melbourne01/pdf/papers/vangeldert.pdf); [Twardy, "Argument Maps Improve Critical Thinking"](https://philpapers.org/rec/TWAAMI)). Replication studies — Harrell at Carnegie Mellon, Butchart, Cullen at Princeton — legitimized the method and created peer referrals in philosophy departments ([Harrell — Using Argument Diagrams, PhilPapers](https://philpapers.org/rec/HARUAD)). Site licenses to IB schools, philosophy departments, and critical-thinking course coordinators followed. Textbook bundling: *Critical Thinking: Reasoning and Communicating with Rationale* (ter Berg, van Gelder, Patterson, Teppema) paired the software to a published curriculum ([Amazon listing](https://www.amazon.com/Critical-Thinking-Reasoning-Communicating-Rationale/dp/1492103241)). Van Gelder won the 2001 Eureka Prize for Critical Thinking and an ARC grant, which mattered for academic credibility ([timvangelder.com/about](https://timvangelder.com/about/)).

The playbook was: (1) publish empirical gains → (2) give workshops at conferences (AILACT, ISSA, OSSA) → (3) individual faculty adopt → (4) sell departmental/institutional site licenses. It worked for revenue but plateaued.

**bCisive — the enterprise sales attempt that struggled.** bCisive was the 2008 bet that "if argument mapping works for students, it'll work for $100K decisions." Austhink marketed directly to management consultants and corporate strategy teams. The struggle was structural: consultants already owned PowerPoint and Excel; asking them to learn a bespoke notation to run a decision meeting is a heavy lift with weak ROI signal. The 2010 funding shortfall that pushed Austhink Software to the Dutch buyers is almost certainly (likely) downstream of bCisive failing to hit enterprise revenue targets rather than Rationale underperforming ([ReasoningLab 2012](https://www.reasoninglab.com/2012/03/27/austhink-progress/)). bCisive today exists but with vanishingly little marketing presence — no Product Hunt, no HN threads since 2008, no recent reviews.

## 4. Plateau or death cause

Argument mapping has beautiful research backing and has not crossed over in 25 years. Structural reasons:

1. **Cognitive load is the tool.** Maps help *because* they force you to slow down and decompose. That's also why nobody wants to use them for normal information consumption. The Wikipedia entry itself flags that maps "can increase cognitive load beyond what is optimal" ([Wikipedia — Argument map](https://en.wikipedia.org/wiki/Argument_map)).
2. **The market is "people who want to think better" — which is tiny.** Everyone claims to want it; almost nobody will pay or invest hours learning a notation. The actual buyers are critical-thinking course coordinators, who represent maybe low thousands of decision-makers globally.
3. **Requires skilled instruction.** Research explicitly notes maps "require extensive coaching and feedback from an experienced argument mapper" ([Wikipedia — Argument map](https://en.wikipedia.org/wiki/Argument_map)). That makes it a service business, not a software business.
4. **Network effects are weak.** Unlike a wiki or a debate platform, one person's map doesn't benefit from another's. Kialo (1M+ users) found network effects by making maps collaborative-first ([Kialo Wikipedia](https://en.wikipedia.org/wiki/Kialo)); Rationale never did.
5. **Philosophy-department gravity.** The tool's home community is informal-logic academics — small, non-viral, and talks to itself at AILACT, ISSA, OSSA conferences ([AILACT](https://ailact.wordpress.com/)). Their students don't keep using it post-course.
6. **AI ate the moat.** Rationale's pitch was "learn to structure arguments." In 2026, Claude/ChatGPT will structure arguments for you on request. The differentiating skill has commoditized.

bCisive's failure is simpler: corporate buyers buy tools that produce artifacts their org already consumes (decks, memos, dashboards). A decision map is a weird novel artifact nobody else on the team reads.

## 5. Where users live now

- **Critical-thinking educators:** [AILACT](https://ailact.wordpress.com/) (newsletter 3x/year, small), Informal Logic journal, OSSA Windsor conferences, ISSA Amsterdam conferences ([Stanford Encyclopedia — Informal Logic](https://plato.stanford.edu/archives/sum2022/entries/logic-informal/)).
- **Philosophy teaching community:** Daily Nous blog comment threads, PhilPapers, APA teaching workshops. Simon Cullen's philmaps community is a small active node ([dailynous.com](https://dailynous.com/2017/06/01/visualizing-logical-structure-arguments-new-platform-guest-post-simon-cullen/)).
- **Debate coaches:** NSDA forums, high-school debate listservs — largely overlapping with Kialo Edu's user base, not Rationale's.
- **Intelligence/forecasting analysts:** The SWARM / IARPA CREATE ecosystem — van Gelder's current home ([Hunt Lab](https://huntlab.science.unimelb.edu.au/home/swarm/)). Small but well-funded.
- **Rationalist-adjacent readers:** LessWrong, ACX comments, EA Forum — have discussed Kialo and argument mapping sporadically ([LessWrong on Kialo](https://www.lesswrong.com/posts/g3odvaj8opqCF9egv/kialo-an-online-discussion-platform-that-attempts-to-support)).
- **K-12/IB schools:** International Baccalaureate Theory of Knowledge teachers — a real Rationale stronghold per the product testimonials, but not a commercial growth market.

These are mostly small, academically-attached, low-viral communities. They are discoverable but hard to monetize.

## 6. Kill-shots for Argumend

**LOW priority — "Target universities / philosophy departments / critical-thinking curriculum."** This is the Rationale trap. It's a high-touch, low-revenue, service-heavy segment where adoption is professor-by-professor and churns when the professor retires. Rationale has 20 years of head start, academic credibility, and published empirical studies; Argumend has none of that and no published learning outcomes. Do not chase this unless you want to become a small consulting business. Skip.

**MEDIUM priority — "Publish one replicable study showing Argumend reading produces measurable comprehension gains vs. reading prose alone."** This is what gave Rationale its academic durability. Even a small n=40 pre/post study on understanding-a-contested-topic (not critical-thinking-in-general) would give Argumend: (a) a credibility anchor for press, (b) a citable artifact for school/library adoption, (c) something concrete to show in "about" and investor conversations. Cost: ~$5K and 2–3 months. This is the one academic move that's actually worth making because it's differentiating *content* (evidence, not just practice). Rank MEDIUM because it's slow ROI but high-credibility-per-dollar.

**HIGH priority — "Build the feature Rationale never built: auto-generated maps from any URL/article the user pastes."** Rationale died the moment GPT could structure arguments on demand. Argumend's existing AI extraction is precisely the thing that makes Rationale obsolete, but it's hidden behind a pre-baked topic catalog. Ship a "paste an article, get an argument map" flow — this is a journalistic and policy-wonk use case, not an academic one, and it's where Kialo + Rationale combined have a gap. The 109 pre-analyzed topics are a content moat only if users can also bring their own text. This is the distinct-from-Rationale move. Rank HIGH.

## Sources

- [Wikipedia — Tim van Gelder](https://en.wikipedia.org/wiki/Tim_van_Gelder)
- [Wikipedia — Argument map](https://en.wikipedia.org/wiki/Argument_map)
- [Wikipedia — Kialo](https://en.wikipedia.org/wiki/Kialo)
- [timvangelder.com — About](https://timvangelder.com/about/)
- [timvangelder.com — Research](https://timvangelder.com/research/)
- [timvangelder.com — Austhink category](https://timvangelder.com/category/austhink/)
- [timvangelder.com — Rationale category](https://timvangelder.com/category/rationale/)
- [timvangelder.com — What is argument mapping](https://timvangelder.com/2009/02/17/what-is-argument-mapping/)
- [van Gelder 2001, ASCILITE, "How to improve critical thinking using educational technology"](https://www.ascilite.org/conferences/melbourne01/pdf/papers/vangeldert.pdf)
- [van Gelder 2015, "Using Argument Mapping to Improve Critical Thinking Skills"](https://thinkeranalytix.org/wp-content/uploads/2018/09/TvG-Using-argument-mapping-to-improve-critical-thinking-skills-2015.pdf)
- [Twardy, "Argument Maps Improve Critical Thinking" (PhilPapers)](https://philpapers.org/rec/TWAAMI)
- [Harrell, "Using Argument Diagrams to Improve Critical Thinking Skills" (PhilPapers)](https://philpapers.org/rec/HARUAD)
- [ReasoningLab — homepage](https://www.reasoninglab.com/)
- [ReasoningLab — Rationale product page](https://www.reasoninglab.com/rationale/)
- [ReasoningLab — Rationale 2.0 / pricing tutorial](https://www.reasoninglab.com/rationale2.0/)
- [ReasoningLab — bCisive user guides](https://www.reasoninglab.com/bcisive/bcisive-user-guides-tips/)
- [ReasoningLab — Austhink in progress, 2012](https://www.reasoninglab.com/2012/03/27/austhink-progress/)
- [ReasoningLab — Davies, "Computer-Assisted Argument Mapping: A Rationale Approach"](https://www.reasoninglab.com/wp-content/uploads/2015/10/Davies_Computer_assisted_Argumentmapping_Rationale_approach.pdf)
- [ReasoningLab — Rider & Thomason, "Cognitive and Pedagogical Benefits of AM"](https://www.reasoninglab.com/wp-content/uploads/2013/10/riderthomason_cognitive_pedagical_benefits_of_am_2008.pdf)
- [rationaleonline.com — homepage](https://rationaleonline.com/)
- [rationaleonline.com — about](https://www.rationaleonline.com/about)
- [Austhink Software blog (discontinued)](https://austhinksoftware.blogspot.com/)
- [bCisive Online blog (discontinued)](https://bcisiveonline.blogspot.com/2013/11/dear-user-of-bcisive-online-this.html)
- [Michael Sampson, "Thoughts on Austhink bCisive for Structured Decision Making," 2008](https://michaelsampson.net/2008/07/21/thoughts-on-aus/)
- [mind-mapping.org, "Austhink's argument mapping goes online," 2014](https://www.informationtamers.com/mind-mapping/blog/2014/01/austhinks-argument-mapping-goes-online/)
- [Crunchbase — Austhink Software](https://www.crunchbase.com/organization/austhink-software)
- [PitchBook — Austhink Software](https://pitchbook.com/profiles/company/55399-24)
- [Datocapital — Kritisch Denken BV](https://www.datocapital.nl/companies/Kritisch-Denken-Bv.html)
- [Princeton Alumni Weekly — Mapping an Argument](https://paw.princeton.edu/article/mapping-argument)
- [Daily Nous — Mapping Philosophical Arguments, 2015](https://dailynous.com/2015/01/12/mapping-philosophical-arguments/)
- [Daily Nous — Simon Cullen, Visualizing Logical Structure, 2017](https://dailynous.com/2017/06/01/visualizing-logical-structure-arguments-new-platform-guest-post-simon-cullen/)
- [maps.simoncullen.org — philmaps](https://maps.simoncullen.org)
- [Pursuit / U Melbourne — SWARM, making big sense of big data](https://pursuit.unimelb.edu.au/articles/making-big-sense-of-big-data-the-quest-to-improve-human-reasoning)
- [Hunt Lab — SWARM platform](https://huntlab.science.unimelb.edu.au/home/swarm/)
- [AILACT — Association for Informal Logic and Critical Thinking](https://ailact.wordpress.com/)
- [Stanford Encyclopedia of Philosophy — Informal Logic](https://plato.stanford.edu/archives/sum2022/entries/logic-informal/)
- [ThinkerAnalytix — thinkARGUMENTS pricing](https://thinkarguments.org/pricing/)
- [LessWrong — Kialo discussion](https://www.lesswrong.com/posts/g3odvaj8opqCF9egv/kialo-an-online-discussion-platform-that-attempts-to-support)
- [Amazon — Critical Thinking: Reasoning and Communicating with Rationale](https://www.amazon.com/Critical-Thinking-Reasoning-Communicating-Rationale/dp/1492103241)
- [Cullen CV — simoncullen.org](https://www.simoncullen.org/cv)
- [Ostwald, "Argument Mapping" handout 2007](https://jostwald.com/ArgumentMapping/OstwaldHandout.pdf)
- [Using Computer-Aided Argument Mapping to Teach Reasoning — eCampus Ontario Pressbooks](https://ecampusontario.pressbooks.pub/criticalthinking1234/chapter/introduction/)
