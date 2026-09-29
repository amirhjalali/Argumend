# Round 2: question headlines and crux questions, legacy maps (second half)

Branch `r2/map-questions-b` (off `ux/round2-2026-09-29` at 17a28db), merged at 527bfc8. The agent's
report file was blocked by a subagent hook; the driver saved it from the agent's hand-back, with the
table regenerated from the merged data.

## What changed

- 77 maps (`iran-war-justification` … `wealth-tax`), 215 cruxes: each map has `question` (page h1 and
  list title) and every pillar has `crux.question` (crux heading). `title` is unchanged and still feeds
  breadcrumbs and related links. `data/topics.ts` defines no inline topics.
- `data/topicSummaries.json` regenerated (`npx tsx scripts/regen-summaries.ts`).
- Tests: nuclear-energy-safety assertions in `lib/topicPage/legacy.test.ts` and
  `app/embed/[topicId]/page.test.tsx` now expect the question h1 and the authored crux heading, with
  `live_disagreement` beneath as "Where the fight is."

## Measurements (this half)

| | Before | After |
|---|---|---|
| h1 is a question | 24 of 77, Title Case | 77 of 77, sentence case |
| h1 length | — | median 67, max 78 chars |
| crux heading source | 127 long `live_disagreement` sentences, 88 test titles | 215 authored questions |
| crux heading length | median 188, max 352 chars | median 96, max 110 chars |

Format check over the data: every question ends with a single "?"; topic ≤ 80, crux ≤ 120 chars; no
"verdict", "winner", "settle(d/s)", "who is right".

## How they were written

Topic question: one yes/no question with the same scope as `meta_claim` ("yes" ≈ agreeing with the
claim). Reworded where the title was an either/or or pointed the other way: `nuclear-weapons-abolition`
(claim argues against abolition → "Does nuclear deterrence keep the world safer than abolition
would?"), `rent-control-effectiveness`, `obesity-personal-responsibility`, `nuclear-renaissance-smr`.

Crux question: from `live_disagreement` where present (127), otherwise from the crux description and
the pillar's two sides (88). No new facts; jargon spelled out where cheap ("EITC" → "earned income tax
credit", "firmed renewables" → "renewables with backup power").

Separate review pass changed 32: 3 leaning (e.g. dropped "actually" in `jones-act`, `trump-tariffs`),
5 scope/fidelity, 17 length, 2 grammar, 1 vague, 1 banned word ("settle" → "stabilize").

## Judgment calls worth a second look

- `simulation-hypothesis`: "Are we living in a computer simulation?" follows the contested part of
  Bostrom's three-part claim, not the whole disjunction.
- `rfk-health-policy` (vaccines): the crux states the hinge neutrally without answering it, though the
  map's own description treats the whole-schedule question as settled by consensus.
- `masculinity-crisis`, `police-reform`, `self-driving-car-safety`, `trump-tariffs`: two-part claims
  squeezed into one question (a clause shortened, not dropped).

## Left

- The embed shows only the crux heading, so on maps with a question the `live_disagreement` sentence no
  longer appears there; `embedMeta()` still titles embeds from `topic.title`.

## Every map in this half

| Map | Title → question | First crux: old heading (first 80 chars) → question |
|---|---|---|
| `iran-war-justification` | Is Military Action Against Iran Justified? → **Is military action against Iran justified?** | The Breakout Timeline Verification → **Is Iran near a deliverable nuclear weapon, or is the gap from enriched uranium to a bomb understated?** |
| `jones-act` | Repealing the Jones Act → **Should the Jones Act be repealed or substantially reformed?** | The Counterfactual Cost Test → **Would domestic shipping get much cheaper if the Jones Act were repealed?** |
| `lab-diamonds-ethics` | Are Lab-Grown Diamonds More Ethical Than Mined Diamonds? → **Are lab-grown diamonds more ethical than mined diamonds?** | What share of mined diamonds can actually be traced to a specific, verified-ethi… → **What share of mined diamonds can be traced to a verified-ethical mine today?** |
| `lab-grown-meat-adoption` | Lab-Grown Meat Adoption → **Will lab-grown meat be cost-competitive and widely adopted in 15 years?** | Whether the remaining cost gap to conventional meat is a normal engineering scal… → **Is lab-grown meat's cost gap a scale-up problem that shrinks with volume, or a hard floor?** |
| `lithium-mining-ev-impact` | Lithium Mining & EV Environmental Impact → **Are EVs clearly greener than gas cars once mining is counted?** | The exact breakeven mileage in each market under current and projected grids — w… → **How many miles must an EV drive to repay its manufacturing carbon, on each market's grid?** |
| `loneliness-epidemic` | Is Loneliness a Public Health Crisis? → **Is loneliness a public health crisis?** | How much of the excess mortality is loneliness causally driving versus lonelines… → **Does loneliness itself cause early death, or is it a marker of existing disadvantage?** |
| `longevity-anti-aging` | Anti-Aging & Radical Life Extension → **Could human lifespans pass 120 within our lifetimes?** | The Cross-Species Translation Test → **Do treatments that extend healthy lifespan in short-lived animals deliver similar gains in primates?** |
| `longevity-science` | The Science of Life Extension → **Will longevity research significantly extend healthy lifespan in 20 years?** | Whether senolytics deliver measurable human healthspan gains in large RCTs, or w… → **Do senolytic drugs improve human healthspan in large trials, or does the mouse-to-human gap defeat them?** |
| `mandatory-voting` | Mandatory Voting → **Should more democracies make voting compulsory?** | Whether those additional, lower-engagement voters actually make policy more repr… → **Do the extra voters compulsion brings make policy more representative, or just add noise?** |
| `masculinity-crisis` | The Modern Masculinity Crisis → **Are young men in a crisis that neither left nor right adequately addresses?** | The Gender vs. Class Attribution Study → **Are men's worse outcomes driven by gender itself, or by class and economic factors that hit more men?** |
| `meaning-without-religion` | Meaning of Life Without Religion → **Can a life be fully meaningful without religion?** | Longitudinal Study of Secular vs. Religious Wellbeing → **Do committed secular people fare as well as committed believers on meaning, resilience and community?** |
| `media-bias-democracy` | Media Bias and Democracy → **Is mainstream media bias a significant threat to democracy?** | Quantitative Media Bias Measurement → **Can media bias be measured reliably, and which direction does it run?** |
| `meritocracy-myth` | Is Meritocracy a Myth? → **Is meritocracy a myth?** | The Intergenerational Elasticity Test → **How strongly does parents' income predict their children's adult income?** |
| `microplastics-health-crisis` | The Microplastics Health Crisis → **Are microplastics in our bodies a health crisis on the scale of lead?** | Whether arterial microplastics actively drive inflammation and cardiovascular ev… → **Do microplastics in arteries drive heart disease, or are they bystanders in already-diseased tissue?** |
| `minimum-wage-effects` | Raising the Minimum Wage → **Would a $15 federal minimum wage help workers without costing many jobs?** | The employment elasticity at high minimum-wage levels relative to local median w… → **Does a minimum wage that is high relative to local wages, like $15 in a low-cost region, cost jobs?** |
| `minneapolis-shooting` | Minneapolis ICE Shooting → **Did federal agents use excessive force in the fatal Minneapolis shooting?** | The Body Camera Analysis → **Does the full sequence of events back the federal self-defense account, or the bystander video and witnesses?** |
| `modern-monetary-theory` | Modern Monetary Theory → **Is Modern Monetary Theory a sound basis for spending and deficit policy?** | Whether 'cannot be forced to default' is action-guiding for spending policy or a… → **Does 'a currency issuer can't be forced to default' guide spending policy, or hide the inflation limit?** |
| `moloch` | Meditations on Moloch → **Does competition erode human values unless strong coordination stops it?** | The One-Shot vs. Repeated-Game Test → **Is a given rivalry a one-off game where defecting pays, or a repeated one where cooperation can last?** |
| `moon-landing` | The Moon Landing → **Did the Moon landings happen?** | Whether the laser returns require human-placed retroreflectors or could arise fr… → **Do laser echoes from the Moon need astronaut-placed reflectors, or could natural features explain them?** |
| `net-neutrality` | Net Neutrality → **Are net-neutrality rules needed to keep the internet open and competitive?** | Whether traffic-discrimination is a structural incentive that recurs whenever ru… → **Without rules, do providers keep discriminating against traffic, or do competition and antitrust deter it?** |
| `nuclear-energy-safety` | Nuclear Energy for Climate → **Should nuclear power be expanded to help decarbonize electricity?** | How much weight to place on low-probability, high-consequence tail risk plus a m… → **Do nuclear's rare-disaster and waste risks outweigh the fossil-fuel deaths it would displace?** |
| `nuclear-fusion-timeline` | Fusion Power Within Two Decades → **Will fusion power be a meaningful part of the energy mix within 20 years?** | Whether an integrated machine can convert plasma gain into positive wall-plug el… → **Can a complete fusion plant put out more electricity than it consumes?** |
| `nuclear-proliferation-new-arms-race` | The New Nuclear Arms Race → **Has a new arms race made nuclear war likelier than at any time since 1962?** | The Verification Regime Impact Assessment → **Can satellites and signals intelligence replace lost treaty inspections, or does losing them fuel buildups?** |
| `nuclear-renaissance-smr` | Can Small Modular Reactors Save Nuclear Energy? → **Can small modular reactors deliver clean power at scale within a decade?** | Whether factory fabrication can drive SMR costs down a learning curve to beat fi… → **Can factory production bring small reactors' costs below renewables with backup power?** |
| `nuclear-weapons-abolition` | Should Nuclear Weapons Be Abolished? → **Does nuclear deterrence keep the world safer than abolition would?** | The Nuclear Peace Counterfactual Test → **Did nuclear weapons cause the Long Peace, or would the superpowers have avoided war anyway?** |
| `obesity-personal-responsibility` | Is Obesity a Personal Choice or a Systemic Failure? → **Is obesity mainly a matter of personal choice?** | The Ultra-Processed Food Causation Test → **Does the ultra-processed food environment drive obesity, or does personal choice still dominate?** |
| `occupational-licensing-reform` | Occupational Licensing Reform → **Does occupational licensing do more economic harm than good?** | Whether stricter licensing causally raises service quality enough to justify its… → **Does stricter licensing raise service quality enough to justify higher prices, occupation by occupation?** |
| `open-borders` | The Case for Open Borders → **Should immigration restrictions be greatly relaxed or eliminated?** | Global GDP Gains from Labor Mobility → **How large would the real gains from freer migration be once fiscal, wage and transition costs are counted?** |
| `open-weight-ai-models` | Releasing Open-Weight Frontier AI Models → **Does publishing the weights of frontier AI models do more good than harm?** | Whether a current-generation safety-stripped open model provides statistically s… → **Do safety-stripped open models give bad actors real help on dangerous tasks beyond what search provides?** |
| `organic-food-health` | Is Organic Food Healthier? → **Is organic food healthier than conventional food?** | Whether the lower cancer incidence among heavy organic consumers reflects the fo… → **Is organic buyers' lower cancer rate due to the food, or to their healthier, wealthier lifestyles?** |
| `pandemic-preparedness` | Pandemic Preparedness Investment → **Should governments invest heavily in pandemic preparedness?** | How frequent truly catastrophic pandemics are under modern conditions — which se… → **How often do truly catastrophic pandemics strike under modern conditions?** |
| `pfas-forever-chemicals` | PFAS "Forever Chemicals" → **Are PFAS causing enough harm to justify costly bans and water cleanup?** | Whether the kidney-cancer and other specific-cancer links survive designs that s… → **Do PFAS links to kidney and other cancers hold up in studies that separate cause from effect?** |
| `police-reform` | Policing Reform in America → **Should US policing be restructured, with funds shifted to social services?** | Accountability–Use of Force Causal Link → **Do accountability measures like body cameras reduce police use of force without raising officer risk?** |
| `privacy-vs-convenience` | Have We Already Lost the Battle for Digital Privacy? → **Have we already lost the battle for digital privacy?** | Whether best-practice individual privacy behavior meaningfully shrinks corporate… → **Can careful privacy habits shrink corporate profiling, or does data aggregation rebuild the profile anyway?** |
| `psychedelic-therapy-hype` | Psychedelic Therapy: Revolution or Overhype? → **Is psychedelic therapy a genuine revolution in mental health care?** | The Blinding-Controlled Replication Test → **Do psychedelic therapy's large effects hold up in trials with better blinding?** |
| `psychedelics-mental-health` | Psychedelics for Mental Health → **Should psychedelics be approved to treat depression, PTSD and addiction?** | How much of the striking improvement is the drug's pharmacology versus the expec… → **How much of the improvement is the drug itself, versus expectations and the therapy bundled with it?** |
| `remote-work-permanence` | The Future of Remote Work → **Will remote and hybrid work permanently replace the five-day office week?** | Remote vs. In-Office Innovation Output → **Do remote teams produce as much innovation as comparable in-office teams?** |
| `rent-control-effectiveness` | Does Rent Control Help or Hurt Renters? → **Does rent control make housing less affordable in the long run?** | Whether modern rent stabilization, which exempts new construction and resets ren… → **Does modern rent stabilization, which exempts new buildings, avoid the supply harm of 1970s-style controls?** |
| `reparations-slavery` | Reparations for Slavery → **Should the US provide reparations to descendants of enslaved Black Americans?** | Measuring the Causal Chain from Slavery to Present Disparities → **How much of today's racial wealth gap traces to slavery, Jim Crow and discriminatory policy?** |
| `return-to-office-productivity` | Does Return-to-Office Actually Improve Productivity? → **Do return-to-office mandates improve productivity and innovation?** | Whether fully remote work (not just hybrid) degrades total organizational output… → **Does fully remote work lower total output once coordination and knowledge transfer are counted?** |
| `rfk-health-policy` | RFK Jr's Health Policy Agenda (MAHA) → **Will RFK Jr.'s 'Make America Healthy Again' agenda improve US health?** | The Whole-Schedule Comparative Trial Test → **Does the childhood vaccine schedule as a whole carry harms that studies of single vaccines miss?** |
| `right-to-repair` | Right to Repair → **Do right-to-repair laws help consumers without harming innovation or safety?** | Whether the average consumer's total cost of ownership falls or rises after firm… → **Once firms adjust prices and parts, do right-to-repair laws lower or raise consumers' total ownership costs?** |
| `school-phone-bans` | Should Schools Ban Smartphones? → **Do school phone bans improve students' learning and mental health?** | Whether the quasi-experimental gains reflect the ban itself or confounds (ban-ad… → **Are test-score gains after phone bans caused by the bans, or by differences between schools that adopt them?** |
| `scott-cost-disease` | The Cost Disease → **Have US health, school and infrastructure costs soared without matching gains?** | The Wage-Decomposition Test → **How much of the cost rise is just rising wages in work that can't be automated?** |
| `second-amendment-individual-right` | The Second Amendment: Individual Right? → **Does the Second Amendment protect an individual right to bear arms?** | Does the Militia Clause Limit the Right? → **Does the amendment's militia clause limit the right, or only explain its purpose?** |
| `section-230-reform` | Reforming Section 230 → **Should Section 230 be significantly reformed or repealed?** | Whether a platform's ranking choice is legally distinct conduct that causes a sp… → **Is a platform's ranking choice legally distinct conduct that causes a specific, provable injury?** |
| `seed-oils-health` | Are Seed Oils Harmful to Human Health? → **Are seed oils a major driver of inflammation, obesity and metabolic disease?** | Whether sustained high-LA intake measurably shifts downstream inflammatory signa… → **Does sustained high omega-6 intake from seed oils measurably shift inflammatory signaling in humans?** |
| `self-driving-car-safety` | Self-Driving Car Safety → **Are self-driving cars already safer than humans and ready for broad use?** | Whether the measured advantage survives a fully apples-to-apples, independently … → **Does self-driving cars' safety edge survive a truly like-for-like, independently audited comparison?** |
| `sex-work-decriminalization` | Decriminalizing Sex Work → **Does fully decriminalizing sex work make sex workers safer and healthier?** | Decriminalization vs. Legalization, and the Counterfactual → **Do decriminalization and legalization differ on safety, and are changes due to the law or other factors?** |
| `simulation-hypothesis` | The Simulation Hypothesis → **Are we living in a computer simulation?** | Whether full behavioral equivalence can be achieved from the connectome alone — … → **Can simulating a brain's wiring reproduce its behavior, and would that say anything about experience?** |
| `social-media-age-limits` | Social Media Age Limits → **Should children under 16 be legally barred from social media?** | Whether removing social media actually improves teen mental health (causation) o… → **Does removing social media actually improve teens' mental health, or is the link driven by other factors?** |
| `social-media-elections` | Social Media's Impact on Elections → **Has social media fundamentally undermined democratic elections?** | The Algorithm Attribution Test → **Do engagement algorithms drive election misinformation, or would human biases spread it on any platform?** |
| `social-media-mental-health` | Social Media and Teen Mental Health → **Is social media a primary cause of the teen mental health crisis?** | Whether the harm is a small average effect that's been over-dramatized, or a lar… → **Is social media's harm a small average effect, or a large one concentrated in heavy-using girls?** |
| `social-security-retirement-age` | Raising the Retirement Age → **Is raising the retirement age a fair, necessary fix for Social Security?** | The precise share of the 75-year actuarial deficit that an FRA increase closes v… → **How much of Social Security's funding gap would raising the retirement age close, versus revenue options?** |
| `space-colonization-feasibility` | Space Colonization Feasibility → **Can we build self-sustaining colonies on Mars or the Moon within 50 years?** | Whether Starship-class transport (orbital refueling + Mars cargo landing) will a… → **Will Starship-class transport, with orbital refueling and Mars landings, be demonstrated this decade?** |
| `space-exploration-value` | Is Space Exploration Worth It? → **Is government-funded space exploration worth its cost?** | Whether government space spending's genuine but hard-to-measure returns (spin-of… → **Do the returns on government space spending beat what the same money would do on Earth?** |
| `sports-betting-legalization` | Legalizing Sports Betting → **Should states legalize and regulate mobile sports betting?** | What fraction of legal handle is displaced versus induced — which determines whe… → **Does legal betting mostly replace illegal betting, or create new betting that would not have happened?** |
| `ssri-antidepressant-efficacy` | Do Antidepressants Beat Placebo? → **Do antidepressants help depression meaningfully more than placebo?** | Whether the correct unit of judgment is the group average or a genuinely drug-sp… → **Should the benefit be judged by the average patient, or by a subgroup who truly respond to the drug?** |
| `student-debt-forgiveness` | Student Debt Forgiveness → **Is broad student debt forgiveness justified and economically beneficial?** | The Fiscal Multiplier Comparison Test → **Does forgiving student debt boost the economy more per dollar than other uses of the money?** |
| `sugar-tax-effectiveness` | Do Sugar Taxes Actually Reduce Obesity? → **Do sugar taxes meaningfully reduce sugar consumption and obesity?** | How much of the purchase reduction is genuine net sugar reduction versus substit… → **Do sugar taxes cut total sugar intake, or do people switch products and shop across the border?** |
| `surveillance-public-safety` | Surveillance and Public Safety → **Does expanding government surveillance meaningfully reduce crime?** | How much of the measured crime reduction is genuine prevention versus displaceme… → **Does surveillance prevent crime, or push it to nearby areas?** |
| `tiktok-ban` | Should TikTok Be Banned? → **Is TikTok enough of a security threat to justify a ban or forced sale?** | The Data Access Audit → **Can ByteDance staff in China still access Americans' TikTok data despite Project Texas safeguards?** |
| `tiktok-brain-rot` | Is Short-Form Video Causing Cognitive Decline? → **Is habitual short-form video degrading attention and deep thinking?** | The Sustained Attention Task Performance Test → **Do heavy short-form video users show weaker sustained attention than matched non-users?** |
| `tipping-culture` | Should Tipping Be Abolished? → **Should the US replace tipping with service-included wages?** | Whether removing tips raises or lowers total take-home pay for the typical serve… → **Would ending tips raise or lower the typical server's total take-home pay?** |
| `transgender-athletes-sports` | Transgender Athletes in Competitive Sports → **Should transgender women on hormone therapy compete in women's sports?** | The Sport-Specific Advantage Quantification → **After two-plus years on hormones, do retained advantages exceed normal variation among women in that sport?** |
| `trump-tariffs` | Trump's Tariffs & Protectionist Trade Policy → **Have Trump's tariffs revived US manufacturing and helped American workers?** | The Tariff Incidence Split Test → **How much of the tariff cost do US consumers and importers pay, versus foreign exporters?** |
| `ukraine-peace-terms` | How the Russia-Ukraine War Should End → **Would a deal freezing current lines end the war on acceptable terms?** | The Battlefield Reversibility Test → **Can Ukraine realistically retake its 1991 borders, or is the front line effectively frozen?** |
| `ultra-processed-food` | Are Ultra-Processed Foods Driving the Obesity Epidemic? → **Are ultra-processed foods the main driver of obesity and chronic disease?** | Whether the overconsumption comes from 'processing' as such or from energy densi… → **Do people overeat because food is processed, or because of its energy density, taste and eating speed?** |
| `universal-basic-income` | Universal Basic Income → **Should developed nations adopt a universal basic income?** | Whether any realistic funding design covers UBI without pushing debt or tax rate… → **Can any realistic funding plan pay for UBI without growth-damaging debt or tax rates?** |
| `universal-healthcare` | Universal Healthcare in the US → **Should the US replace employer-based insurance with universal healthcare?** | Whether the projected administrative and drug-price savings would actually mater… → **Would single-payer's projected administrative and drug savings survive a real US transition?** |
| `us-iran-conflict` | The US-Iran Conflict → **Has US pressure on Iran made the Middle East safer and served US interests?** | The JCPOA Compliance-Causation Test → **Did Iran's nuclear escalation result from the US leaving the nuclear deal, or would it have happened anyway?** |
| `us-national-debt-crisis` | Is the US National Debt a Ticking Time Bomb? → **Will the US national debt cause a fiscal crisis within a generation?** | Whether the US can keep its effective borrowing rate below its growth rate over … → **Can the US keep its borrowing rate below its growth rate over decades?** |
| `vaccine-mandates` | Government Vaccine Mandates → **Are government vaccine mandates a justified public-health measure?** | How much of the post-mandate uptake is truly caused by the mandate versus uptake… → **How much of the uptake after a mandate is caused by the mandate, rather than the maturing rollout?** |
| `vaping-harm-reduction` | Vaping as Harm Reduction → **Is vaping an effective and acceptable way to reduce smoking's harm?** | Whether the controlled-trial quit-rate advantage survives translation to the rea… → **Does vaping's quit-rate advantage in trials hold up in the real-world market of flavored disposables?** |
| `veganism-environmental-impact` | Veganism for Environmental Impact → **Would widespread vegan diets significantly reduce environmental damage?** | How much of the per-person ~75% reduction would actually materialize at a global… → **How much of veganism's per-person footprint cut would hold at global scale, after land and rebound effects?** |
| `vertical-farming-viability` | Is Vertical Farming the Future of Food? → **Will vertical farms become a major, profitable source of the world's food?** | Whether the low electricity-to-biomass conversion efficiency is a soft engineeri… → **Is vertical farming's high electricity use an engineering problem cheap power can fix, or a physical limit?** |
| `wealth-tax` | Wealth Tax on Billionaires → **Would an annual wealth tax on billionaires be effective and reduce inequality?** | Whether the European failures reflect fixable design choices (loopholes, weak en… → **Did Europe's wealth taxes fail due to fixable design flaws, or problems inherent in taxing wealth yearly?** |
