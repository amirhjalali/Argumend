import type { TopicInput } from "@/lib/schemas/topic";

export const fluorideWaterSuppliesData = {
  id: "fluoride-water-supplies",
  title: "Fluoride in Tap Water",
  question: "Should towns keep adding fluoride to tap water?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "Is fluoridating community water safe and effective?",
    "Does fluoride in water lower children's IQ?",
    "Why did Utah and Florida ban fluoride?",
  ],
  meta_claim:
    "Adding fluoride to community water at the US target of 0.7 mg/L is safe and still worth doing.",
  status: "contested" as const,
  category: "science" as const,
  // As of 3 November 2026: Utah (May 2025) and Florida (July 2025) remain the
  // only statewide bans; CDC still recommends 0.7 mg/L; EPA opened a new
  // fluoride toxicity assessment in January 2026; the Ninth Circuit vacated
  // the 2024 TSCA ruling on 21 May 2026 and sent it back for a new decision.
  last_updated: "2026-11-03",
  tags: ["fluoride", "public-health", "dental-health", "drinking-water", "children"],
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "In 2025 Utah and Florida became the first US states to stop adding fluoride to tap water. About 63% of Americans still drink fluoridated water, at a target of 0.7 mg/L. Two reviews fuel the fight: a 2024 Cochrane review found the cavity benefit smaller and less certain since fluoride toothpaste spread, and a 2024 federal toxicology review linked fluoride above 1.5 mg/L, about twice the US target, to lower IQ in children. The question is whether the benefit that remains is worth the doubt about the dose.",
    confidence: 92,
    source:
      "Good Morning America / ABC News (28 March 2025) on Utah HB 81; Central Florida Public Media (7 May 2025) on Florida SB 700; CDC 2022 water fluoridation statistics; Cochrane review CD010856.pub3 (2024); National Toxicology Program monograph (21 August 2024)",
    sourceUrl:
      "https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/fluoride",
  },
  simple_case: [
    "The answer decides whether your town's water board keeps fluoridating, what dentists tell parents in towns that stop, and what EPA does with the fluoride standard it began reassessing in January 2026.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Does it still prevent cavities? (what we know)
    // =========================================================================
    {
      id: "dental-health-benefits",
      title: "Does It Still Prevent Cavities?",
      short_summary:
        "Fluoridation began in 1945, before fluoride toothpaste existed. Cavity rates have since fallen in towns with and without it, and even the CDC says fluoride works mainly on the tooth surface. Cochrane's 2024 review found the modern benefit to be about a quarter of a baby tooth per child, with low certainty. But towns that stopped, like Calgary and Juneau, saw more decay in children afterwards.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "The trials that made fluoridation policy were run in the 1940s and 1950s, before fluoride toothpaste. Since then cavities have fallen in communities with and without fluoridated water, and in 1999 the CDC itself wrote that fluoride's 'actions primarily are topical for both adults and children': it works on the tooth surface, which toothpaste reaches directly. The 2024 Cochrane review, the most rigorous synthesis available, found that most of the evidence predates 1975 and is at high risk of bias. In studies from the toothpaste era, starting fluoridation cut decay by about 0.24 of a baby tooth per child, a low-certainty estimate whose confidence interval includes no benefit at all. Cochrane found no eligible studies of adults and not enough evidence to say whether fluoridation narrows the gap between rich and poor children. Most of Western Europe does not fluoridate its water and has not seen a cavity epidemic. A benefit this small and this uncertain is a thin reason to dose a whole population.",
      proponent_rebuttal:
        "A small average across all children hides who gains. Fluoridation helps most where brushing is irregular and dentists are hard to reach, and the clearest modern test is what happens when a city stops. Calgary stopped in 2011. Seven years later, 65% of its second-graders had tooth decay against 55% in Edmonton, which kept fluoridating, a gap the researchers found was not explained by diet or income; by 2018-19 Calgary children needed decay treatment under general anaesthetic at 32 per 10,000 against Edmonton's 17. In Juneau, Alaska, which stopped in 2007, decay treatments for Medicaid children under six rose from 1.5 per child in 2003 to 2.5 in 2012. Calgary voters restored fluoride in 2021 by 62%. The 1999 CDC report that called fluoride topical also explained why water still works: fluoridated water keeps a little fluoride in saliva all day, and spreads it through food and drinks made with it. The CDC still puts the benefit at about 25% less tooth decay in children and adults.",
      crux: {
        id: "systemic-vs-topical-benefit",
        title: "The Toothpaste-Era Test",
        question:
          "In children who already use fluoride toothpaste, does fluoridated water still mean fewer cavities?",
        description:
          "Fluoride toothpaste reaches almost every child in rich countries. If fluoridated water adds little on top of it, the dental case for fluoridation shrinks to the children who do not brush. If towns that stop see decay climb even among brushing children, the case holds for everyone.",
        methodology:
          "Use the natural experiments that 2025 created. Utah and Florida stopped statewide; compare dentist-examined decay in their children over five to ten years with matched counties in neighbouring states that kept fluoridating, as the Calgary-Edmonton studies did. Record toothpaste use, sugar intake, dental insurance and income, and report results separately for low-income children.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare cavity rates, from dental exams rather than self-report, in children who all use fluoride toothpaste but differ in whether their tap water is fluoridated, including before-and-after comparisons where fluoridation stopped, as in Calgary in 2011 and Utah in 2025.",
        },
        cost_to_verify:
          "$5-15M (school dental screenings in Utah, Florida and comparison counties over five to ten years)",
        falsification: {
          supporter_flip:
            "If children in Utah and Florida who brush with fluoride toothpaste showed no rise in decay over five years against matched fluoridated counties, the dental case for adding fluoride to water would rest on children who do not brush.",
          skeptic_flip:
            "If decay rose after Utah and Florida stopped, as it did in Calgary and Juneau, and the rise held among children who brush daily, 'toothpaste made water fluoride obsolete' would be hard to hold.",
          common_ground:
            "Both sides agree cavities fell in places with and without fluoridated water once fluoride toothpaste spread, and that fluoride works at least partly on the tooth surface.",
          live_disagreement:
            "How much fluoridated water adds on top of toothpaste today, and for which children.",
        },
      },
      evidence: [
        {
          id: "cochrane-review-2024",
          title:
            "Cochrane 2024: in the toothpaste era, fluoridation saved about a quarter of a baby tooth per child (low certainty)",
          description:
            "The Cochrane Collaboration's 2024 update of its fluoridation review included 157 studies, none randomised. In studies after 1975, when fluoride toothpaste was widespread, starting water fluoridation 'may lead to a slightly greater change in dmft' (decayed, missing or filled baby teeth) of 0.24, 'approximately one-quarter of a tooth in favour of CWF', with a 95% confidence interval of -0.03 to 0.52 that 'includes the possibility of benefit and no benefit.' The review found no eligible studies reporting caries in adults, and too little evidence to judge whether stopping fluoridation changes decay or whether fluoridation narrows the gap between rich and poor children.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 10,
            replicability: 6,
            directness: 9,
          },
          source: "Iheozor-Ejiofor et al., Cochrane Database of Systematic Reviews (2024), CD010856.pub3",
          sourceUrl: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010856.pub3/full",
          reasoning:
            "The most careful synthesis there is, by reviewers with no stake in the outcome. It shows the modern benefit is smaller and less certain than the 25% figure suggests. It does not show the benefit is zero: the estimate still leans toward fewer cavities, and Cochrane rated the evidence low-certainty, which cuts against confident claims either way. Replicability is 6 for that reason.",
        },
        {
          id: "calgary-juneau-cessation",
          title:
            "Calgary and Juneau stopped fluoridating; children's decay rose more than in comparison cities",
          description:
            "Calgary stopped fluoridating in 2011. About seven years later, researchers led by Lindsay McLaren surveyed 2,649 second-graders: 65% of Calgary children had tooth decay against 55% in still-fluoridated Edmonton, a statistically significant gap. A 2024 study found decay treatment under general anaesthetic ran at 32 per 10,000 Calgary children in 2018-19 against 17 per 10,000 in Edmonton. In Juneau, Alaska, which stopped in 2007, decay treatments for Medicaid children under six rose from 1.5 per child in 2003 to 2.5 in 2012, and inflation-adjusted treatment costs rose by an average of $303 per child. Calgary voters chose to restore fluoride in 2021, by 62%, and it went back into the water in 2025.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 8,
            replicability: 6,
            directness: 8,
          },
          source:
            "Science News, 'Two cities stopped adding fluoride to water. Science reveals what happened' (28 April 2025), on McLaren et al., Yazdanbakhsh et al. (2024) and Meyer et al.; Central Florida Public Media (30 July 2025) on Calgary's return",
          sourceUrl: "https://www.sciencenews.org/?p=3154054",
          reasoning:
            "Stopping is the closest thing to an experiment the toothpaste era offers, and both cities point the same way. Directness is high because these are modern children who had toothpaste. But they are two cities, not trials: Edmonton is not a perfect twin for Calgary, Juneau's figures come from Medicaid claims rather than exams, and Cochrane counted only one cessation study as meeting its bar. Replicability is 6.",
        },
        {
          id: "decline-without-fluoridation",
          title:
            "CDC 1999: cavities fell in towns without fluoridated water too, and fluoride works 'primarily' on the tooth surface",
          description:
            "The CDC's 1999 report naming fluoridation one of the century's public health achievements said that 'the prevalence of dental caries has declined in both communities with and communities without fluoridated water.' It credited the decline in unfluoridated towns largely to fluoride spreading through bottled and processed food and drink made where water is fluoridated, and to 'widespread use of fluoride toothpaste.' It also reported that fluoride 'prevents dental caries predominately after eruption of the tooth into the mouth' and that 'its actions primarily are topical for both adults and children.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source:
            "CDC, 'Achievements in Public Health, 1900-1999: Fluoridation of Drinking Water to Prevent Dental Caries', MMWR 48(41) (1999)",
          sourceUrl: "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm4841a1.htm",
          reasoning:
            "Coming from fluoridation's main US champion, the admission that the effect is mostly topical, and that cavities fell without it, carries weight for the skeptic's case. Directness is 6 because the same report argues water still delivers topical fluoride through saliva and food, so it explains the decline without conceding that water fluoride is useless.",
        },
        {
          id: "cdc-25-percent-reduction",
          title: "CDC (2024): fluoridation cuts tooth decay by about 25% in children and adults",
          description:
            "The CDC's scientific statement on fluoridation, dated 15 May 2024, says community water fluoridation reduces tooth decay by 'about 25% in children and adults' and calls it '1 of 10 great public health achievements of the 20th century.' In 2022, 62.8% of the US population, 209 million people, received fluoridated water, according to CDC statistics.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 7,
          },
          source:
            "CDC, Scientific Statement on Community Water Fluoridation (15 May 2024); CDC, 2022 Water Fluoridation Statistics",
          sourceUrl:
            "https://www.cdc.gov/fluoridation/about/statement-on-the-evidence-supporting-the-safety-and-effectiveness-of-community-water-fluoridation.html",
          reasoning:
            "The official US estimate, and the number most local debates start from. Independence is 6 because the CDC has promoted fluoridation for decades. The 25% figure leans on older studies, which is exactly what the 2024 Cochrane review questions, so replicability is 6.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Is 0.7 mg/L safe for children's brains? (the risk)
    // =========================================================================
    {
      id: "safety-health-risks",
      title: "Is 0.7 mg/L Safe for Children's Brains?",
      short_summary:
        "Fluoride at high levels, as in parts of China and India, is linked to lower IQ; the 2024 US toxicology review said so with moderate confidence above 1.5 mg/L. Whether anything happens at the US target of 0.7 mg/L is the open question. A Canadian birth cohort found lower IQ in boys at ordinary exposures; the same federal team's 2025 meta-analysis found no link with water below 1.5 mg/L, but a small one with fluoride measured in urine.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The margin between the US target and the level the government's own scientists link to lower IQ is only about twofold, and water is not the only source: toothpaste, tea, food and formula made with tap water all add to the dose, and infants get the most per kilogram. The National Toxicology Program concluded with moderate confidence in August 2024 that fluoride above 1.5 mg/L is associated with lower IQ in children, and said it had insufficient data to clear 0.7 mg/L. Its authors' January 2025 meta-analysis in JAMA Pediatrics found IQ fell about 1.6 points for each 1 mg/L of fluoride in children's urine, and that the link with urine fluoride held, though smaller, in studies below 1.5 mg/L. A Canadian cohort of 512 mothers, living at ordinary North American exposures, found that each 1 mg/L more fluoride in a pregnant woman's urine went with 4.5 fewer IQ points in her son. When a cheap alternative exists for the benefit, a credible signal of harm to developing brains is reason enough to stop swallowing it.",
      proponent_rebuttal:
        "The US monograph found a link above 1.5 mg/L, more than twice the US target, mostly from studies in places with naturally high fluoride. Its own authors' 2025 meta-analysis found no association between water fluoride and IQ in studies below 1.5 mg/L: the estimate was 0.05, essentially zero. The Canadian finding appeared in boys but not girls, a split with no clear biological reason, and single-cohort urine measures vary from day to day. The NTP said plainly that its review was not designed to judge 0.7 mg/L. And no court has found harm on the scientific merits: the 2024 district court ruling that fluoride at US levels posed an 'unreasonable risk' was vacated by the Ninth Circuit in May 2026, which ordered a new decision on the original trial record. Withdrawing a proven dental benefit over an unconfirmed signal trades certain cavities for an uncertain gain.",
      crux: {
        id: "neurodevelopmental-risk-at-recommended-levels",
        title: "The Low-Dose IQ Test",
        question:
          "Do children of mothers who drink water at 0.7 mg/L score lower on IQ tests?",
        description:
          "Everyone accepts that fluoride lowers IQ at some dose. The question is whether the US target sits safely below that dose once every source of fluoride and the most exposed groups (pregnant women, formula-fed infants) are counted.",
        methodology:
          "Prospective birth cohorts in communities at 0.7 mg/L and in unfluoridated communities, measuring each mother's and child's urinary fluoride repeatedly, recording toothpaste, tea and formula use, adjusting for iodine, lead and parental education, and testing children's IQ by examiners who do not know their exposure. Run in several countries and share the data for pooled reanalysis. EPA's toxicity assessment, opened in January 2026, will review the same question.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Prospective birth cohorts in communities at 0.7 mg/L that measure each mother's and child's urinary fluoride, adjust for other fluoride sources and for iodine and lead, and test children's IQ blind, run in more than one country with the data shared openly for pooled reanalysis.",
        },
        cost_to_verify:
          "$20-50M (multi-site birth cohorts followed for six to eight years)",
        falsification: {
          supporter_flip:
            "If new birth cohorts at 0.7 mg/L found that children of mothers with higher urinary fluoride scored lower on blind IQ tests, in girls as well as boys and in more than one country, 'safe at the recommended level' would no longer hold.",
          skeptic_flip:
            "If pooled birth cohorts at 0.7 mg/L found no IQ difference after adjusting for lead, iodine and income, the strongest safety objection to fluoridation would lose its footing.",
          common_ground:
            "Both sides agree fluoride above 1.5 mg/L, as in parts of China and India, is linked to lower IQ, and that the US target is 0.7 mg/L.",
          live_disagreement:
            "Whether the roughly twofold margin between 0.7 and 1.5 mg/L is enough once toothpaste, food, tea and formula are counted and pregnant women and infants are considered.",
        },
      },
      evidence: [
        {
          id: "ntp-report-2024",
          title:
            "NTP 2024: moderate confidence that fluoride above 1.5 mg/L is linked to lower child IQ; too little data on 0.7 mg/L",
          description:
            "The National Toxicology Program's monograph, published 21 August 2024 after years of delay and review, 'concluded, with moderate confidence, that higher levels of fluoride exposure, such as drinking water containing more than 1.5 milligrams of fluoride per liter, are associated with lower IQ in children.' It also found 'insufficient data to determine if the low fluoride level of 0.7 mg/L' recommended for US community water affects children's IQ. The review assessed total fluoride exposure from all sources, not fluoridated water alone.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 6,
          },
          source: "National Toxicology Program, NIEHS, 'Fluoride Exposure: Neurodevelopment and Cognition' monograph (21 August 2024)",
          sourceUrl: "https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/fluoride",
          reasoning:
            "A federal systematic review that took the safety question seriously, which is why it moved the policy debate. It establishes harm at about twice the US target and leaves the target itself unresolved, so directness is 6. It narrows the margin of safety; it does not show harm at 0.7 mg/L.",
        },
        {
          id: "taylor-2025-urine-dose-response",
          title:
            "JAMA Pediatrics 2025: IQ fell 1.63 points per 1 mg/L of fluoride in children's urine across 74 studies",
          description:
            "Taylor and colleagues, the NTP team, published their meta-analysis in JAMA Pediatrics on 6 January 2025. Across 74 studies (64 cross-sectional, 10 cohort), each 1 mg/L increase in urinary fluoride was associated with a 1.63-point lower IQ (95% CI -2.33 to -0.93); in low risk-of-bias studies the drop was 1.14 points. Below 4 mg/L the inverse association held for both water and urine fluoride. Below 1.5 mg/L, the urinary association was still inverse but small (β -0.08, 95% CI -0.15 to -0.003). The authors said data for water below 1.5 mg/L were limited and uncertain.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source:
            "Taylor et al., 'Fluoride Exposure and Children's IQ Scores: A Systematic Review and Meta-Analysis', JAMA Pediatrics 179(3) (published online 6 January 2025)",
          sourceUrl: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2828425",
          reasoning:
            "A dose-response across many studies is harder to wave away than any single study. Most of the studies come from high-fluoride regions, and 64 of the 74 are cross-sectional, which cannot show which came first. The small inverse urine association at low exposure is the closest the paper gets to the US case, so directness is 6.",
        },
        {
          id: "taylor-2025-null-below-1-5",
          title:
            "Same 2025 meta-analysis: no link between water fluoride and IQ in studies below 1.5 mg/L",
          description:
            "In the same JAMA Pediatrics meta-analysis, restricting to studies where drinking water was below 1.5 mg/L, the association between water fluoride and IQ was null: β 0.05 (95% CI -0.36 to 0.45; P = .82). Water fluoride below 1.5 mg/L covers every US fluoridated system, which aims for 0.7 mg/L.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Taylor et al., JAMA Pediatrics 179(3) (published online 6 January 2025)",
          sourceUrl: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2828425",
          reasoning:
            "The exposure measure that maps onto policy, water concentration, shows nothing in the range that matters, from authors who found harm at higher doses. A null result in a small subset of studies can mean too little statistical power rather than no effect, and the urine measure in the same range did not come out null, so replicability is 6.",
        },
        {
          id: "green-jama-pediatrics-2019",
          title:
            "Canadian cohort 2019: each 1 mg/L more fluoride in pregnant women's urine went with 4.5 fewer IQ points in boys",
          description:
            "Green, Lanphear, Till and colleagues followed 601 mother-child pairs in six Canadian cities (JAMA Pediatrics, August 2019). Among 512 pairs with urine data, each 1 mg/L increase in maternal urinary fluoride was associated with a 4.49-point lower full-scale IQ in boys at ages 3 to 4 (95% CI -8.38 to -0.60); in girls the estimate was +2.40 and not significant. A 1 mg increase in mothers' daily fluoride intake was associated with 3.66 fewer IQ points in boys and girls combined. The authors wrote that 'these findings were observed at fluoride levels typically found in white North American women.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 5,
            directness: 8,
          },
          source:
            "Green et al., 'Association Between Maternal Fluoride Exposure During Pregnancy and IQ Scores in Offspring in Canada', JAMA Pediatrics 173(10):940-948 (2019)",
          sourceUrl: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2748634",
          reasoning:
            "The study that brought the question home: a prospective cohort at North American exposures, so directness is high. Replicability is 5 because it is one cohort, the effect appeared in boys but not girls with no settled explanation, and single urine samples are a noisy measure of a pregnancy's exposure.",
        },
        {
          id: "federal-court-ruling-2024",
          title:
            "A 2024 court found fluoride at US levels an 'unreasonable risk'; the Ninth Circuit vacated it in May 2026",
          description:
            "In September 2024, Judge Edward Chen ruled in Food & Water Watch v. EPA that fluoridation at 0.7 mg/L presents an unreasonable risk of reduced IQ under the Toxic Substances Control Act and ordered EPA to act. On 21 May 2026 the Ninth Circuit vacated that ruling in an unpublished memorandum (No. 25-384), holding that the district court abused its discretion by 'commandeering' the case, holding it in abeyance for new science and running a second trial. It sent the case back with instructions to 'rule based solely on the first trial record' and to address standing. The panel did not decide whether 0.7 mg/L presents an unreasonable risk. Separately, on 22 January 2026 EPA released a preliminary plan for a new fluoride toxicity assessment, focused on dental fluorosis and children's brain development, to inform any revision of the drinking-water standard.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 4,
            directness: 5,
          },
          source:
            "Beveridge & Diamond, 'Ninth Circuit Vacates Order Requiring EPA to Regulate Fluoridation of Drinking Water under TSCA' (2026), on Food & Water Watch v. EPA, No. 25-384 (9th Cir. 21 May 2026); Federal Register 91(18) (28 January 2026) on EPA's assessment plan",
          sourceUrl:
            "https://www.bdlaw.com/publications/ninth-circuit-vacates-order-requiring-epa-to-regulate-fluoridation-of-drinking-water-under-tsca/",
          reasoning:
            "A federal judge weighing the full record under a legal standard found the risk real, which is why skeptics cite it. Vacated on procedure, it now settles nothing in either direction: the merits go back to the district court. Weights are low because courts apply legal, not scientific, tests, and the ruling no longer stands.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who decides, and what replaces it? (values and trade-offs)
    // =========================================================================
    {
      id: "public-health-ethics-consent",
      title: "Who Decides, and What Replaces It?",
      short_summary:
        "Fluoridated water reaches every child in town without anyone doing anything, which is both its selling point and its offence. Supporters compare it to iodised salt and say it saves about $20 for every $1 spent; a 2025 model projected 25 million more decayed teeth in five years if the US stopped. Opponents call it medication without consent and point to Europe, which uses toothpaste, salt and school programmes instead.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "Water fluoridation gives a drug-like substance to everyone, at a dose nobody controls: people who drink more water get more, and an infant fed formula made with tap water gets the most per kilogram. Nobody can opt out without buying filters or bottled water, which the poorest can least afford. Most of Western Europe chose other routes, such as fluoride toothpaste, fluoridated salt and school brushing programmes, that deliver fluoride to teeth without putting it in every glass. Florida's governor called fluoridation 'forced medication' when he backed the 2025 ban. The Nuffield Council on Bioethics' 'intervention ladder' holds that the more an intervention removes individual choice, the stronger its justification must be, and a benefit Cochrane now rates as small and low-certainty does not clear that bar. In October 2025 the FDA concluded that swallowed fluoride supplements should not be used by children under three or by older children at low risk of decay.",
      proponent_rebuttal:
        "Public health has always worked through measures nobody opts into: chlorinated water, iodised salt, folic acid in flour, vitamin D in milk. Fluoridation fits the same test of broad benefit, low risk and fair reach. It needs no dentist, no prescription and no daily habit, which is why it helps the children who have the least of all three. It is also decided democratically: Calgary voters brought it back by 62% in 2021, which is consent at the level where the decision is made. Florida's ban took that choice away from every town in the state. The CDC estimates fluoridation saves about $20 for every $1 spent in communities of 1,000 or more, and a 2025 Mass General Brigham model projected that ending it nationwide would add 25.4 million decayed teeth in children within five years and $9.8 billion in dental costs, falling hardest on uninsured and publicly insured children. Europe's alternatives depend on school programmes and health systems that many US towns do not have.",
      crux: {
        id: "consent-alternatives-adequacy",
        title: "The Replacement Test",
        question:
          "Where towns stop fluoridating, do school fluoride programmes keep poor kids' cavities from rising?",
        description:
          "The equity argument for fluoridation is that it reaches children nothing else reaches. If school varnish, sealant and brushing programmes can match it for low-income children, the consent objection carries the day for many people. If they cannot, the choice is a real trade between individual consent and poor children's teeth, and each side should say how much weight it gives each.",
        methodology:
          "In Utah and Florida, track cavity rates among low-income children from school dental screenings in districts that add fluoride varnish, sealant or supervised brushing programmes against districts that add nothing, and against matched fluoridated counties elsewhere. Count programme reach (share of children treated each year) and cost per child alongside cost per child of fluoridation.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Follow cavity rates among low-income children, from school dental screenings, in places that end fluoridation and replace it with school toothbrushing, varnish or salt programs, against similar places that keep it; how much consent should weigh against any gap that remains is a value each side should state up front.",
        },
        cost_to_verify:
          "$2-5M (school dental screening across Utah, Florida and comparison counties)",
        falsification: {
          supporter_flip:
            "If districts in Utah and Florida that added school varnish and brushing programmes kept low-income children's decay as low as in fluoridated counties, at similar cost, the equity case for fluoridating everyone's water would weaken sharply.",
          skeptic_flip:
            "If decay among low-income children rose in Utah and Florida even where school programmes were added, while it held steady in fluoridated counties, the claim that alternatives can replace water fluoride would fail.",
          common_ground:
            "Both sides agree public health uses some population-wide measures without individual consent, such as chlorination and iodised salt, and that most of Western Europe delivers fluoride by means other than tap water.",
          live_disagreement:
            "Whether school and clinic programmes can reach the children fluoridated water reaches, and how much individual consent should count if they cannot.",
        },
      },
      evidence: [
        {
          id: "cost-effectiveness-32-to-1",
          title:
            "CDC: fluoridation saves about $20 for every $1 spent in communities of 1,000 or more",
          description:
            "The CDC's May 2024 scientific statement reports 'an average savings of $20 per dollar invested' in communities of 1,000 or more people. A Colorado analysis found one year of fluoridated water saved 'an average savings of $60 per person' once lifetime restoration costs were counted, and Medicaid data from three states showed annual dental treatment costs per child $28 to $67 lower in fluoridated communities.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "CDC, Scientific Statement on Community Water Fluoridation (15 May 2024)",
          sourceUrl:
            "https://www.cdc.gov/fluoridation/about/statement-on-the-evidence-supporting-the-safety-and-effectiveness-of-community-water-fluoridation.html",
          reasoning:
            "Cheap prevention matters most to families who pay for fillings out of pocket. But the savings rest on effect sizes from older studies, the same estimates Cochrane questioned, so a smaller real benefit means smaller savings. And cost-effectiveness answers the budget question, not the consent question. Directness is 6.",
        },
        {
          id: "jama-health-forum-2025-projection",
          title:
            "JAMA Health Forum 2025: ending US fluoridation projected to add 25.4 million decayed teeth in five years",
          description:
            "Choi and Simon of Mass General Brigham simulated ending community water fluoridation using NHANES data on 8,484 children (JAMA Health Forum, 30 May 2025). The model projected a 7.5 percentage-point rise in children's tooth decay, 25.4 million more decayed teeth within five years, and $9.8 billion in added dental costs over five years, rising to $19.4 billion after ten. It also projected about 200,000 fewer cases of dental fluorosis. The authors said the harm would fall hardest on publicly insured and uninsured children. The model did not include cognitive effects.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Choi & Simon, 'Projected Impact of Removing Fluoride from Public Water Systems in the United States', JAMA Health Forum (30 May 2025); Mass General Brigham news release via EurekAlert",
          sourceUrl: "https://www.eurekalert.org/news-releases/1085850",
          reasoning:
            "It puts the trade in numbers a town council can use. But it is a model: its output depends on the size of benefit it assumes, and if the Cochrane estimate is closer to the truth the projected harm shrinks. Replicability is 5 until Utah and Florida produce real data to check it against.",
        },
        {
          id: "mass-medication-ethics-literature",
          title:
            "Nuffield Council on Bioethics: the more a measure removes choice, the stronger its justification must be",
          description:
            "The Nuffield Council on Bioethics' 2007 report 'Public health: ethical issues' used water fluoridation as one of four case studies. It set out an 'intervention ladder' for judging public health policies: 'Interventions that are higher up the ladder are more intrusive' and need stronger justification, and policies should be proportionate to their intended effect and backed by evidence, or by a programme to gather it where evidence is weak.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 4,
            directness: 5,
          },
          source: "Nuffield Council on Bioethics, 'Public health: ethical issues' (2007)",
          sourceUrl: "https://www.nuffieldbioethics.org/publications/public-health",
          reasoning:
            "The ladder gives the consent objection a principled shape: as the measured benefit shrinks, the justification for removing choice gets harder to meet. It does not settle the question either way; supporters argue fluoridation sits low on the ladder because it is cheap, low-risk and locally decided. Replicability is 4 because this is a values framework, not a measurement.",
        },
        {
          id: "fda-ingestible-fluoride-2025",
          title:
            "FDA (Oct 2025): swallowed fluoride supplements should not be given to children under 3 or at low decay risk",
          description:
            "On 31 October 2025 the FDA published a scientific evaluation warning against ingestible prescription fluoride drops and tablets for children under three, or older children at low or moderate risk of tooth decay, and moved against four companies selling unapproved products. It left supplements available for high-risk children over three, and the action does not cover toothpaste or community water. The American Dental Association's president responded that tablets and drops are safe and effective for high-risk children whose water lacks fluoride, and that a doctor's judgment should guide their use.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source:
            "California Dental Association, 'FDA acts to limit fluoride supplements for children' (10 November 2025)",
          sourceUrl:
            "https://www.cda.org/newsroom/access-to-care/fda-acts-to-limit-fluoride-supplements-for-children/",
          reasoning:
            "It shows federal regulators now treat swallowed fluoride for young children as something to limit, which supports the skeptic's case that ingestion, not contact, is the problem. Weights are low: it concerns concentrated supplements, not 0.7 mg/L water; it came from an administration that has campaigned against fluoridation, so independence is 5; and dental groups dispute it. It also cuts the other way, since supplements were the fallback for towns that stop fluoridating.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Fluoride Exposure: Neurodevelopment and Cognition — National Toxicology Program monograph (21 August 2024)",
      url: "https://ntp.niehs.nih.gov/research/assessments/noncancer/completed/fluoride",
    },
    {
      title: "Water Fluoridation for the Prevention of Dental Caries — Cochrane systematic review (2024 update)",
      url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010856.pub3/full",
    },
    {
      title: "Fluoride Exposure and Children's IQ Scores: A Systematic Review and Meta-Analysis — Taylor et al., JAMA Pediatrics (January 2025)",
      url: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2828425",
    },
    {
      title: "Ninth Circuit Vacates Order Requiring EPA to Regulate Fluoridation of Drinking Water under TSCA — Beveridge & Diamond (2026)",
      url: "https://www.bdlaw.com/publications/ninth-circuit-vacates-order-requiring-epa-to-regulate-fluoridation-of-drinking-water-under-tsca/",
    },
    {
      title: "EPA, Review of Science on Fluoride in Drinking Water: Preliminary Assessment Plan — Federal Register (28 January 2026)",
      url: "https://www.govinfo.gov/content/pkg/FR-2026-01-28/html/2026-01657.htm",
    },
    {
      title: "Two cities stopped adding fluoride to water. Science reveals what happened — Science News (28 April 2025)",
      url: "https://www.sciencenews.org/?p=3154054",
    },
    {
      title: "Community Water Fluoridation Recommendations — CDC",
      url: "https://www.cdc.gov/fluoridation/about/community-water-fluoridation-recommendations.html",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does water fluoridation still provide meaningful benefit in the toothpaste era?",
      content:
        "Fluoridation began in 1945, before fluoride toothpaste existed. Cavities have since fallen in towns with and without fluoridated water, and the 2024 Cochrane review found the modern benefit small and uncertain. Yet Calgary and Juneau saw children's decay rise more than in comparison cities after they stopped. Utah and Florida, which stopped in 2025, will show whether that pattern repeats.",
    },
    {
      id: "q2",
      title: "Is the safety margin between recommended levels and documented harm adequate?",
      content:
        "The National Toxicology Program linked fluoride above 1.5 mg/L to lower child IQ and found too little data to judge the US target of 0.7 mg/L. Its authors' 2025 meta-analysis found no link with water fluoride below 1.5 mg/L but a small one with urine fluoride, and a Canadian cohort found lower IQ in boys at ordinary exposures. Is a roughly twofold margin enough, once toothpaste, food and formula are counted?",
    },
    {
      id: "q3",
      title: "Can targeted alternatives achieve the same equity benefits without mass medication?",
      content:
        "The strongest argument for fluoridation is that it reaches children who lack dentists and regular brushing. School varnish, sealant and brushing programmes could reach some of them without putting fluoride in everyone's water, as much of Europe does. Whether US towns can run them well enough, and how much individual consent should weigh if they cannot, is the live question.",
    },
  ],
} satisfies TopicInput;
