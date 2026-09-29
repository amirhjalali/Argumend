# Round 2 — question headlines and crux questions, maps A–I (first half)

Branch `r2/map-questions-a` (off `ux/round2-2026-09-29` at 17a28db). Scope: the first 78 files of
`ls data/topics/*.ts | grep -v test`, from `adhd-overdiagnosis.ts` through
`intermittent-fasting-efficacy.ts`. No file outside that range was authored.

## What changed

- **78 headline questions** (`topic.question`) and **215 crux questions** (`crux.question`, one
  per pillar, all pillars of every map). Nothing else in the topic files changed: 549 inserted
  lines, 0 changed or deleted. Long values follow the files' existing convention (value on the
  next line, indented two more spaces). `as const` untouched.
- **Metadata** — `app/topics/[id]/page.tsx` `generateMetadata`, legacy branch only:
  `const pageTitle = topic.question ?? topic.title` now feeds `title`, `openGraph.title`
  (`… | ARGUMEND` suffix kept) and `twitter.title`. Keywords and image alt keep the short label.
  Checked in the running dev server: `<title>` went from `Climate Change | ARGUMEND` to
  `Is climate change primarily caused by human activity? | ARGUMEND`.
- **`data/topicSummaries.json`** regenerated with `npx tsx scripts/regen-summaries.ts`. The diff
  adds 78 `question` lines and nothing else. I regenerated it again after merging the
  integration branch (see below), and that produced no diff.
- **Tests**
  - New `lib/topicPage/questions.test.ts` (7 tests). It covers every topic in `data/topics`, so
    the other half is checked once merged, and topics without the fields pass. It checks:
    headline ≤ 90 chars and crux ≤ 120 (authoring targets are 70/110), min 10 chars, ends with
    "?", starts with a capital, no line break or stray whitespace, and none of the words
    verdict/winner/settled/"who is right"/"settle the debate". It also checks that crux questions
    cover a whole map or none of it, that no crux question repeats within a map, that
    `topicSummaries.json` matches each topic's `question` (so a stale regen fails), that the page
    uses the authored question with `live_disagreement` beneath it as "Where the fight is.", and
    that the page falls back to label → live_disagreement → crux title when nothing is authored.
    I confirmed the checks bite by planting a bad question (it failed on "?" and "winner"), then
    reverted it.
  - Two existing assertions used `epstein-files`, which is in my range, as the "map without
    falsification data" fixture and expected `crux.title` as the heading. I changed them to
    `crux.question ?? crux.title`. The files are `lib/topicPage/legacy.test.ts` and
    `components/topic/TopicPage.test.tsx`.
  - Three more test files hard-coded text from maps in my range. I updated each to expect the
    question:
    - `app/saved/SavedClient.test.tsx`: the saved list shows climate-change's question, because
      lists prefer it.
    - `lib/paste/maps.test.ts`: the paste match quotes immigration-wage-impact's crux question.
    - `app/embed/[topicId]/page.test.tsx`: the epstein-files embed heads its crux with the
      question.
  - I merged `ux/round2-2026-09-29` (tip 0d181ae, with map-questions-b) into this branch. It
    merged without conflicts. The other half had already made the `nuclear-energy-safety` cases
    question-first, and the `epstein-files` cases here were already question-first. Regenerating
    `topicSummaries.json` after the merge produced no diff: 155 of 156 summaries now carry a
    question.

## Gap neither half covered

`standardized-testing-debate` has no questions. Both halves used the file list
`ls data/topics/*.ts | grep -v test`, and that filter drops `standardized-testing-debate.ts`
because "test" appears in its name. It is the only legacy map without a headline or crux
questions (155 of 156 have them). It falls in the second half alphabetically, so I left it
alone. `questions.test.ts` passes either way, because a map with no questions is allowed.

## How the questions were written

- **Headline.** One question with the same scope as `meta_claim`, so that "yes" roughly means
  agreeing with it. Where the meta_claim is hedged, the question is hedged the same way. Examples:
  `ai-superintelligence-timeline` "Could … arrive before 2035?" ("a real possibility");
  `alternatives-to-democracy` asks whether alternatives "deserve serious consideration". Where
  the old title was a question with the wrong polarity or scope, I did not reuse it. Examples:
  "Should billionaires exist?" (yes = disagree) and "Alcohol's Safe Level". Seven titles were
  already good questions and are reused in sentence case: ADHD, AI regulation, AI replacing
  doctors, AI therapy chatbots, China–Taiwan, housing bubble, water wars.
- **Crux.** Each question is distilled from that pillar's `falsification.live_disagreement`.
  Where a pillar has none (52 pillars on 17 maps), it comes from the crux title/description and
  the two sides. I kept the hinge, both alternatives, and any number the map already states
  (for example "$100–300 a tonne", "0.7 and 1.5 mg/L", "7–10% a year"). I dropped the
  "resolvable only by …" methodology tail, which already shows under "What would settle it". No
  new facts or numbers. Where a live_disagreement refers back ("those eval behaviors", "those
  reductions"), I read the pillar's `common_ground` to name the referent from the map's own text.
- **Measured.** Old crux headings: median 240 chars (max 358) where a live_disagreement existed;
  37-char test titles on the 17 maps without falsification data. New crux questions: median 90,
  max 110. Headlines: median 66 chars, max 82. Eight run over the 70-char ideal (71–82), kept
  because the shorter versions lost scope. The longest is `artificial-reproduction-ethics`
  (82), because the meta_claim covers both artificial wombs and lab-made eggs and sperm.

## Review pass (separate from authoring)

I re-read every question against its meta_claim or live_disagreement and changed these:

| Map / crux | Problem | Before → after |
|---|---|---|
| `alcohol-no-safe-level` / cancer | (a) lean: asserted the threshold exists | "…or is there a small threshold studies can't detect?" → "…or could a small threshold hide below what studies can detect?" |
| `de-extinction-species` / proxy | (a) lean: "really back" tilts skeptic | "…and is the 'dire wolf' really back?" → "Is a species defined by genomic ancestry or by ecological function, and so is the 'dire wolf' back?" |
| `epstein-files` (headline) | (b) scope narrowed to "accountability" | "…reveal a systemic failure of accountability?" → "Does the Epstein case reveal a systemic institutional failure?" |
| `estate-inheritance-tax` / efficiency | (e) vague "net effect positive" | → "Once avoidance, saving and lock-in effects are counted, is the estate tax a net fiscal and economic gain?" |
| `ai-risk` / orthogonality | grammar (did not parse) | → "Does scheming-like behavior in AI tests reflect a deep drive to seek power, or artifacts of contrived setups?" |
| `lab-leak-theory` / geographic, intelligence | grammar | → "Is the outbreak's start in the same city as the Wuhan Institute of Virology a real signal, or coincidence?"; "Does classified intelligence hold anything decisive, or only the ambiguous evidence already public?" |
| `ai-2027` / R&D loop | grammar | "on its recent pace" → "at its recent pace" |
| `congressional-term-limits` / incumbency | forbidden word ("winners" of elections) | → "…and new kinds of legislators, or reshuffle similar ones?" |
| `four-day-work-week` / wellbeing | avoid "settle" | "once habits settle" → "once habits stabilize" |
| 25 headlines | (d) over 70 chars | tightened, for example "Should Big Tech be broken up or heavily regulated?" and "Does homeschooling itself produce better academic results?" |

A judgement call to flag: `climate-change` / isotopic fingerprint. The map's own
live_disagreement says the source attribution is "essentially none … not seriously contested".
The question still names what the crux tests: "Does the falling carbon-isotope ratio in the air
confirm that the added CO₂ comes from fossil fuels?"

## Screenshots (before → after, dev server on :3021)

In `/private/tmp/claude-501/-Users-amirjalali-argumend/2043480f-f401-456b-87a7-9f7cc9a30f41/scratchpad/round2/map-questions-a/shots/`,
named `{before|after}-{map}-{390|1440}-{top|cruxes}.png` (32 images), plus
`{before,after}-metrics.json`. The "before" set was taken with the base branch's data restored
in the working tree, and the "after" set with this branch.

| Map @ width | h1 | Crux heading lines (each crux) | Crux heading px total |
|---|---|---|---|
| climate-change @390 | "Climate Change" → question (42→125px) | 5,5,5 → 3,3,3 | 345 → 231 |
| gun-control-effectiveness @390 | label → question (84→167px) | 7,7 → 3,3 | 322 → 154 |
| alcohol-no-safe-level @390 | label → question (42→125px) | 9,8,8 → 3,3,4 | 574 → 257 |
| alcohol-no-safe-level @1440 | 48→96px | 4,4,4 → 2,2,2 | 309 → 171 |
| epstein-files @390 | label → question | 2,1,2 → 4,3,3 | 128 → 257 |

The crux sheet gets much shorter wherever the heading used to be a live_disagreement
paragraph. On the no-falsification maps (Epstein) it gets taller, because a 20–35-char test
title ("The Redaction Audit") becomes a real question. The h1 grows from 1 line to 3–4 lines at
390px for a ~70-char question. That is the cost of a question headline. If it is too much,
PageHeader's size needs a design pass; the questions should not be shortened further.

## Verification

- `bunx tsc --noEmit`: clean. `bun run lint`: clean (0 warnings).
- `bunx vitest run` (full suite, after merging the integration branch): 246 files, 2946 tests,
  all pass.
- A re-import check (`topics` from `data/topics.ts`) confirmed all 78 headlines and all 215 crux
  questions landed on the intended topic and pillar (0 mismatches).
- The dev server was stopped and `.next` removed.

## Left alone, and why

- The other 78 maps: the other agent's half.
- Keywords and OG image alt still use the short label. The task scoped the change to the title
  and OG title, and the label is a better keyword.
- The "The claim: …" subtitle under the h1 now often restates the question as a statement, for
  example "Is climate change primarily caused by human activity?" over "The claim: Climate change
  is primarily caused by human activity." That comes from the template in 17a28db, not from this
  task. A design owner may want to drop the subtitle when the question is authored.

## Full table (78 maps)

| Map | Old title → question | Example crux: old heading (first 80 chars) → new question |
|---|---|---|
| `adhd-overdiagnosis` | Is ADHD Overdiagnosed? → Is ADHD overdiagnosed? | Whether the gap between the ~11% diagnosed rate and the ~5% impairment-anchored… → Does the gap between diagnosed and community ADHD rates reflect false positives or previously missed cases? |
| `affirmative-action-meritocracy` | Affirmative Action & Meritocracy → Are race-conscious admissions and hiring needed for equal opportunity? | The Merit Measurement Validity Test → Do test scores and credentials measure individual ability, or accumulated advantage? |
| `ai-2027` | AI 2027: The Recursive-Automation Timeline → Will automating AI research bring superintelligence by the late 2020s? | The METR Task-Horizon Trajectory → Will the length of tasks AI can complete on its own keep doubling at its recent pace, or plateau? |
| `ai-content-labeling` | Mandatory AI Content Labeling → Should the law require labels or watermarks on AI-generated content? | Whether robustness is improving fast enough that watermarks survive real-world t… → Can watermarks survive real-world edits and deliberate removal at usable rates? |
| `ai-deepfakes-truth-collapse` | AI Deepfakes & the Collapse of Shared Truth → Have AI deepfakes made it impossible to trust any digital media? | Whether the defense measurably deflects accountability for powerful actors at sc… → Does calling real evidence a deepfake actually let powerful people escape accountability? |
| `ai-energy-water-footprint` | AI's Energy & Water Footprint → Is AI's energy and water use serious enough to warrant intervention? | What is actually on the margin for incremental data-center demand region by regi… → Is new data-center demand met by clean power, or by new gas and delayed coal retirements? |
| `ai-in-education` | AI in Education: Revolution or Risk? → Will AI in education close achievement gaps and outweigh its risks? | Whether AI tutoring disproportionately helps disadvantaged students (closing gap… → Does AI tutoring help disadvantaged students most, or the already advantaged? |
| `ai-job-displacement` | Will AI Replace Most White-Collar Jobs? → Will AI eliminate or transform most white-collar work within a decade? | Whether AI's failures on novel tasks are a fundamental ceiling or a shrinking ga… → Are AI's failures on novel tasks a lasting ceiling, or a gap the next models will close? |
| `ai-regulation` | Should AI Be Regulated Like Drugs or Nuclear Energy? → Should AI be regulated like drugs or nuclear energy? | Whether capabilities keep scaling toward catastrophe-relevant thresholds on the… → Will AI capabilities keep scaling toward catastrophe-relevant thresholds, or plateau? |
| `ai-replacing-doctors` | Will AI Replace Doctors Within a Decade? → Will AI replace doctors within a decade? | Whether benchmark-level accuracy generalizes to messy, incomplete real-world cli… → Does AI's benchmark accuracy hold up on messy real-world clinical data across populations? |
| `ai-risk` | Existential Risk from AGI → Does AGI pose a real risk of human extinction within the next century? | Whether those eval behaviors reflect a deep tendency of capable goal-directed sy… → Does scheming-like behavior in AI tests reflect a deep drive to seek power, or artifacts of contrived setups? |
| `ai-superintelligence-timeline` | Will Artificial Superintelligence Arrive Before 2035? → Could artificial superintelligence arrive before 2035? | Whether the capability-per-compute curve hits a ceiling before reaching general… → Will capability gains from more compute hit a ceiling before general reasoning? |
| `ai-therapy-chatbots` | Can AI Chatbots Replace Therapists? → Can AI chatbots replace therapists? | Whether those reductions hold up against an active human comparator and persist… → Do chatbots' short-term symptom gains hold up against human therapists and last beyond a few months? |
| `ai-white-collar-displacement` | AI White-Collar Job Displacement → Will AI eliminate more white-collar jobs than it creates in a decade? | The Professional Task Parity Test → Can AI match professionals on complete real-world deliverables, not just standardized tests? |
| `alcohol-no-safe-level` | Alcohol's Safe Level → Is any amount of drinking harmful to health? | Whether the cancer dose-response truly passes through the origin with positive s… → Does cancer risk rise from the first drink, or could a small threshold hide below what studies can detect? |
| `alternatives-to-democracy` | Are There Better Systems Than Democracy? → Do alternatives to liberal democracy deserve serious consideration? | The Reform Capacity Test → Can democracies reform themselves fast enough to meet long-horizon challenges? |
| `animal-consciousness-rights` | Animal Consciousness & Moral Rights → Does animal consciousness demand far stronger rights for animals? | Whether a consciousness detector can be built that distinguishes conscious from… → Can consciousness be detected without a human template, and in which species would it show up? |
| `artificial-reproduction-ethics` | Artificial Wombs & Synthetic Embryos → Will artificial wombs and lab-made eggs and sperm remake reproduction in 15 years? | The Human Biobag Translation Trial → Can artificial wombs sustain fetuses below 22–23 weeks with outcomes as good as neonatal intensive care? |
| `assisted-dying-euthanasia` | The Right to Assisted Dying → Do terminally ill, competent adults have a right to assisted dying? | Does Autonomy Extend to the Timing of Death? → Does a competent adult's autonomy extend to choosing the timing of an inevitable death? |
| `autonomous-weapons-ban` | Banning Killer Robots → Should lethal autonomous weapons be banned by international treaty? | Whether at least one realistic atrocity scenario leaves no chargeable human unde… → Could an autonomous weapon commit a war crime for which no human can be held responsible? |
| `big-tech-antitrust` | Breaking Up Big Tech → Should Big Tech be broken up or heavily regulated? | Whether consumers are net harmed in free markets once privacy loss, suppressed i… → Are users of free platforms net harmed once privacy, innovation and attention costs are weighed? |
| `billionaire-wealth` | Should Billionaires Exist? → Should taxes or structural reform prevent billionaire-scale wealth? | Wealth Concentration vs. Social Mobility → Does extreme wealth concentration cause declining social mobility, or do both share other causes? |
| `cancel-culture` | Cancel Culture → Does cancel culture do more harm than good to public discourse? | Quantifying the Chilling Effect on Public Discourse → Does fear of online backlash measurably narrow what people are willing to say in public? |
| `carbon-capture-viability` | Is Carbon Capture a Viable Climate Solution? → Is carbon capture a necessary and viable tool for reaching net zero? | Whether the residual hard-to-abate floor plus legacy overshoot is large enough t… → Are hard-to-cut emissions and overshoot large enough to require carbon removal at gigatonne scale? |
| `carbon-tax-effectiveness` | Carbon Tax Effectiveness → Is a carbon tax an effective, efficient way to cut emissions? | How large the genuinely tax-caused share of observed reductions is once confound… → How much of the observed emission cuts did carbon taxes actually cause? |
| `central-bank-digital-currency` | Central Bank Digital Currencies → Would central bank digital currencies enable unprecedented surveillance? | Whether any proposed CBDC design actually makes surveillance cryptographically i… → Can any CBDC design make surveillance technically impossible, not just restricted by rules? |
| `children-smartphone-age` | Smartphone Age Restrictions for Children → Should children under 14 be barred from owning smartphones? | The Causal Mechanism Study → Do specific smartphone features cause harm to teens, or does the correlation reflect other factors? |
| `china-taiwan-invasion` | Will China Invade Taiwan Before 2030? → Will China invade Taiwan before 2030? | PLA Amphibious Sealift Capacity Assessment → Does China have the sealift to carry and supply forces across a contested Taiwan Strait? |
| `climate-change` | Climate Change → Is climate change primarily caused by human activity? | Essentially none on source attribution — the isotopic fingerprint is not serious… → Does the falling carbon-isotope ratio in the air confirm that the added CO₂ comes from fossil fuels? |
| `college-value-proposition` | The Value of a College Degree → Is a four-year degree still worth it for most students who finish? | What share of institution-major combinations actually clear a positive risk-adju… → What share of school-and-major combinations pay off once you account for who enrolls? |
| `congestion-pricing` | Congestion Pricing → Does congestion pricing cut traffic and fund transit effectively? | Whether the durable variable is the car-count reduction or the time-savings bene… → Over the years, what lasts: the drop in cars entering the zone, or faster journey times? |
| `congressional-term-limits` | Congressional Term Limits → Would congressional term limits improve American governance? | Whether forced open seats actually produce more competitive races and meaningful… → Do forced open seats bring more competitive races and new kinds of legislators, or reshuffle similar ones? |
| `consciousness-ai-systems` | Consciousness in AI Systems → Could AI systems be conscious in ways that create moral obligations? | Whether consciousness is substrate-dependent (needs biology) or substrate-indepe… → Does consciousness require biology, or only the right information processing? |
| `consciousness-hard-problem` | The Hard Problem of Consciousness → Does explaining consciousness require more than brain processes? | Whether, after a complete functional account, the question 'but why is there som… → After a complete functional account, is 'why does it feel like something?' a real question left over? |
| `lab-leak-theory` | COVID-19 Lab Leak Origin → Did COVID-19 come from a Wuhan lab leak rather than natural spillover? | Whether the outbreak's coincidence with the WIV is just sampling bias (Wuhan is… → Is the outbreak's start in the same city as the Wuhan Institute of Virology a real signal, or coincidence? |
| `cryptocurrency-regulation` | Cryptocurrency Regulation → Should crypto be regulated like traditional financial instruments? | Whether consumer-protection rules can be drawn to deter fraud while keeping comp… → Can crypto rules deter fraud without driving compliant builders offshore? |
| `cryptocurrency-value` | Cryptocurrency as Store of Value → Are Bitcoin and major coins a store of value like gold or real estate? | Whether Bitcoin's lead is a durable, defensible network moat or a temporary firs… → Is Bitcoin's lead a durable network moat, or a first-mover edge a better protocol could erode? |
| `dark-matter-vs-mond` | Dark Matter vs. MOND → Does dark matter, not modified gravity, explain how galaxies move? | Whether the relation has exactly zero intrinsic scatter with no residual correla… → Is the link between visible matter and galactic motion exact, or does it vary slightly from galaxy to galaxy? |
| `daylight-saving-time-abolition` | Should We Abolish Daylight Saving Time? → Should the US make standard time permanent, rather than daylight time? | Whether bright morning light's circadian and safety benefits exceed the lifestyl… → Do the benefits of bright morning light outweigh the value of an extra hour of evening light? |
| `de-extinction-species` | Should We Bring Back Extinct Species? → Should de-extinction be pursued as a conservation tool? | Whether 'species' should be defined by genomic ancestry or by ecological/phenoty… → Is a species defined by genomic ancestry or by ecological function, and so is the 'dire wolf' back? |
| `death-penalty-deterrence` | The Death Penalty → Is the death penalty a justified punishment? | Whether the absence of demonstrated deterrence means the burden is unmet, or whe… → Without proof that it deters, can possible deterrence plus retribution still justify the death penalty? |
| `declining-birth-rates` | The Global Fertility Collapse → Is falling fertility an existential crisis that demands policy action? | Whether there is a fertility threshold below which per-capita income decline bec… → Is there a fertility level below which falling income per person becomes self-reinforcing? |
| `degrowth-economics` | Is Degrowth the Only Way to Save the Planet? → Must rich nations shrink their economies to stay within planetary limits? | Whether the maximum achievable economy-wide decoupling rate can be pushed to 7-1… → Can rich economies grow while cutting emissions 7–10% a year, without offshoring them? |
| `doge-federal-cuts` | DOGE & Federal Spending Cuts → Did DOGE's cuts eliminate waste and make government more effective? | The Savings Reconciliation Audit → How much of DOGE's claimed savings survives a line-by-line reconciliation? |
| `drug-decriminalization` | Drug Decriminalization → Does decriminalizing drug use, with treatment, improve public health? | How much of Portugal's improvement came from decriminalization itself versus the… → How much of Portugal's improvement came from decriminalization versus treatment investment? |
| `eacc-vs-tech-regulation` | E/acc vs. Tech Regulation → Does rapid, unregulated technological progress do more good than harm? | The Capability-Adaptation Rate Comparison → Does technological capability outpace society's ability to adapt, or does adaptation keep up? |
| `effective-altruism` | Effective Altruism → Is effective altruism a sound framework for doing good? | Whether trial-measured effect sizes persist at national scale and over years, an… → Do effects measured in small trials hold at national scale and over years? |
| `electoral-college-reform` | Electoral College Reform → Should a national popular vote replace the Electoral College? | Whether the compact can realistically reach 270 given that the states it still n… → Can the National Popular Vote compact realistically reach 270 electoral votes? |
| `encryption-backdoors` | Encryption Backdoors → Should governments be able to compel encryption backdoors? | Whether a deployable design exists whose added systemic risk is acceptably bound… → Can a lawful-access design exist whose added security risk is acceptably small? |
| `epstein-files` | The Epstein Files → Does the Epstein case reveal a systemic institutional failure? | The Co-Conspirator Immunity Clause → Was immunity for Epstein's unnamed co-conspirators standard practice, or an extraordinary concession? |
| `estate-inheritance-tax` | The Estate Tax → Is the estate tax fair and economically sound? | The precise fraction of taxable-estate wealth that is unrealized appreciation ve… → How much of the wealth in taxable estates was never taxed during the owner's life? |
| `ev-environmental-impact` | Electric Vehicles vs. ICE Cars → Are EVs significantly greener than gas cars over their full lifecycle? | How fast break-even arrives for a given driver — which depends on annual mileage… → How fast does an EV make up its battery's emissions, and how much do mining harms weigh? |
| `facial-recognition-policing` | Facial Recognition in Policing → Does police use of facial recognition do more harm than good? | Whether the systems actually deployed in the field, at their real operating thre… → Are the systems police actually use, at their real settings, equally accurate across race and sex? |
| `factory-farming-ban` | Should We Ban Factory Farming? → Should factory farming be banned or drastically reformed? | How much moral weight farmed-animal suffering carries relative to the economic c… → How much moral weight does farmed-animal suffering carry against the cost of changing the system? |
| `fluoride-water-supplies` | Fluoride in Water Supplies → Is fluoridating community water safe and effective? | Whether ingested fluoride still provides meaningful incremental benefit beyond t… → Does swallowed fluoride add meaningful benefit beyond fluoride toothpaste? |
| `foreign-aid-effectiveness` | Does Foreign Aid Work? → Does foreign aid significantly improve lives in recipient countries? | What fraction of the actual aid portfolio is the proven, cost-effective kind ver… → How much of actual aid spending goes to proven, cost-effective programs? |
| `four-day-work-week` | The Four-Day Work Week → Should a four-day week with no pay cut be adopted broadly? | Whether maintained productivity is a genuine effect of the schedule or an artifa… → Is maintained productivity a real effect of the schedule, or of self-selected, motivated firms? |
| `free-will` | Free Will → Do humans have free will, the ability to have done otherwise? | Whether the pre-conscious signal is a determined commitment to act or merely sto… → Is the brain signal before a conscious choice a fixed commitment, or preparation consciousness can still veto? |
| `gain-of-function-research-ban` | Should Gain-of-Function Research Be Banned? → Should research that enhances pandemic pathogens be banned worldwide? | The actual cumulative probability of a pandemic-capable pathogen escaping over t… → How likely is a pandemic-capable pathogen to escape over time, given modern containment and more labs? |
| `gender-affirming-care-minors` | Gender-Affirming Care for Minors → Should transgender teens have access to gender-affirming medical care? | The Evidence Quality Meta-Assessment → Is the evidence strong enough to justify treating minors, compared with other accepted pediatric care? |
| `gene-editing-embryos` | Gene Editing Human Embryos → Should editing embryos to prevent serious genetic disease be allowed? | Whether editing precision can reach a level (off-target rate below the natural p… → Can gene editing become precise enough to be safe for changes passed to future generations? |
| `generative-ai-art-copyright` | AI Training & Copyright → Should training AI on copyrighted work without permission be unlawful? | Whether the objectionable act is acquisition (curable by purchase/license) or st… → Is the wrong in how training data was acquired, or in training on it at all? |
| `geoengineering-climate` | Geoengineering & Carbon Capture → Is geoengineering now a necessary complement to cutting emissions? | Whether natural sinks plus feasible emission cuts can stay within the carbon bud… → Can natural sinks plus feasible cuts stay within the carbon budget without technological removal? |
| `gig-economy-regulation` | Gig Economy Regulation → Should gig platforms have to classify their workers as employees? | How much functional control platform algorithms actually exert relative to tradi… → How much control do platform algorithms really exert, compared with employers and true contractors? |
| `global-housing-bubble` | Is There a Global Housing Bubble About to Burst? → Is there a global housing bubble about to burst? | Whether there is a hard affordability ceiling beyond which the buyer pool must c… → Do record price-to-income ratios force prices down, or can tight supply keep them high? |
| `global-water-crisis` | Is the World Heading for Water Wars? → Is the world heading for water wars? | Whether adaptation (efficiency, pricing, substitution, recharge management) can… → Can adaptation keep pace with aquifer depletion before farming in key regions collapses? |
| `glp1-weight-loss-drugs` | GLP-1 Weight Loss Drugs → Are GLP-1 drugs like Ozempic a safe, lasting answer to obesity? | Whether 10+ years of continuous use proves net-beneficial or surfaces cumulative… → Does ten or more years of continuous use stay net-beneficial, or reveal cumulative risks? |
| `gmo-crops-safety` | GMO Crops: Safe and Beneficial? → Are genetically modified crops safe to eat and good for agriculture? | Whether the absence of detected harm reflects genuine safety or the difficulty o… → Does finding no harm reflect real safety, or how hard subtle long-term effects are to detect? |
| `government-platform-bans` | Government Bans on Social Media Platforms → Can national security justify banning foreign-owned apps like TikTok? | The Adversary Access Audit → Can an adversary government compel data access or algorithm changes despite company safeguards? |
| `gun-control-effectiveness` | Gun Control Effectiveness → Do stricter gun laws significantly reduce gun violence and mass shootings? | How much of the US's exceptional firearm-death rate is caused by gun availabilit… → How much of the US firearm death rate comes from gun availability and laws versus other factors? |
| `homeschooling-effectiveness` | Homeschooling vs. Public School → Does homeschooling itself produce better academic results? | Whether any homeschool achievement advantage survives once family income, parent… → Does the homeschool test-score edge survive controls for family income, education and who takes tests? |
| `housing-affordability-crisis` | The Housing Affordability Crisis → Does fixing housing affordability require government intervention? | Whether the filtering/moving-chain mechanism lowers rents at the median and belo… → Does upzoning lower rents for median and lower-income renters within 5–10 years? |
| `hydrogen-economy-viability` | Is the Hydrogen Economy Viable? → Is green hydrogen viable enough to scale across the economy? | Whether competing decarbonization routes can undercut hydrogen in these sectors,… → In hard-to-electrify sectors, can other decarbonization routes undercut hydrogen? |
| `immigration-border-crisis` | The US Immigration & Border Crisis → Is enforcement plus asylum limits the best way to manage US immigration? | The Enforcement-Deterrence Correlation Test → Did border crossings fall because of enforcement, or because of other factors? |
| `immigration-national-identity` | Mass Immigration & National Identity → Does high immigration change national identity without voters' consent? | The Distributional Impact Accounting → Are immigration's economic gains broadly shared, or do the costs fall on low-income natives? |
| `immigration-wage-impact` | Immigration and Wages → Does large-scale immigration significantly cut low-skilled native wages? | The true wage elasticity for the most directly-competing workers — which the sam… → Does immigration barely move the wages of directly competing workers, or cut them meaningfully? |
| `inflation-monetary-policy` | Inflation & Monetary Policy → Was post-pandemic inflation driven mainly by spending and money growth? | How much of the 2021-2022 price level rise the monetary/fiscal overhang actually… → How much of the 2021–22 price rise did monetary and fiscal expansion cause, versus merely allow? |
| `intermittent-fasting-efficacy` | Does Intermittent Fasting Work? → Does intermittent fasting work better than plain calorie cutting? | Whether fasting wins on hard endpoints once calories are matched, or only appear… → Does fasting win when calories are matched, or only by making it easier to eat less? |
