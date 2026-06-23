import type { Topic } from "@/lib/schemas/topic";

export const homeschoolingEffectivenessData = {
  id: "homeschooling-effectiveness",
  title: "Homeschooling vs. Public School",
  meta_claim:
    "Homeschooled students post higher average test scores than public school students, but it is contested whether homeschooling causes the gap or simply reflects the advantaged families who choose it.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "Homeschooled students do score about 15-25 percentile points higher on standardized tests — but the most-cited figure comes from voluntary testing of families who are overwhelmingly white, college-educated, and religiously homogeneous, and the very institute that reports the gap (NHERI) concedes its studies cannot show homeschooling caused it rather than family advantage. The surprising truth most people miss is that the headline number is real but uncontrolled — it measures who homeschools as much as it measures homeschooling.",
    confidence: 80,
    source:
      "NHERI / Brian Ray, Research Facts on Homeschooling (15-25 percentile gap, NHERI's own causal caveat); Kunzman & Gaither, Other Education (2013), comprehensive survey on self-selection",
    sourceUrl: "https://nheri.org/research-facts-on-homeschooling/",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The achievement gap is real and durable: across roughly three decades of studies, home-educated students have typically scored 15-25 percentile points above the public school average (about the 50th percentile), and the mechanism is plausible — personalized pace and near one-on-one instruction are structural advantages a 30-student classroom cannot match.",
    "But the families who homeschool are not a random sample — the largest cited studies are overwhelmingly white, college-educated, and religiously homogeneous, testing is voluntary so the weakest students may never be measured, and NHERI itself says its data cannot prove homeschooling caused the gap rather than the advantaged families who choose it.",
    "So the honest debate isn't whether homeschoolers score higher (they do, on the available tests) but whether the format adds value once you control for family income, parental education, and voluntary-testing bias — a question no large randomized or mandatory-testing study has yet answered.",
  ],
  pillars: [
    {
      id: "academic-achievement",
      title: "Academic Achievement",
      short_summary:
        "Homeschooled students score roughly 15-25 percentile points higher on standardized tests. But the families who homeschool are not a random sample, and even the institute reporting that gap says the studies cannot show homeschooling caused it.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Self-selection bias inflates homeschool test scores — homeschool families are disproportionately affluent, educated, and motivated, and the largest cited samples are overwhelmingly white, college-educated, and religiously homogeneous. Even NHERI concedes its studies cannot show homeschooling causes the gap rather than family demographics. Testing is voluntary, so the lowest-performing children may never be measured, and because most states require little oversight, some homeschooled children receive inadequate education that no system catches.",
      proponent_rebuttal:
        "NHERI data show homeschoolers scoring about 15-25 percentile points above public school averages, and the gap has been consistent across roughly three decades of studies. The mechanism is plausible: personalized pace, curriculum flexibility, and effectively one-on-one instruction are structural advantages a 30-student classroom cannot match. Some studies report homeschoolers outscoring expectations even within lower-income or minority subgroups, suggesting the format adds value on top of family background, not just selection.",
      crux: {
        id: "selection-bias-controlled",
        title: "Selection-Bias-Controlled Achievement Comparison",
        description:
          "Do homeschoolers outperform public school students after rigorously controlling for family income, parental education, and voluntary testing bias?",
        methodology:
          "Large-scale randomized or propensity-score-matched comparison using mandatory (not voluntary) testing, controlling for SES, parental education, and regional factors.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$3M (National longitudinal study with mandatory participation)",
        falsification: {
          supporter_flip:
            "If a large study using mandatory (not voluntary) testing and propensity-score matching on income, parental education, and region erased the homeschool advantage — leaving homeschoolers at or below matched public school peers — the 'homeschooling itself raises achievement' claim would collapse into a pure selection effect.",
          skeptic_flip:
            "A skeptic who attributes the gap entirely to demographics should weigh that some studies report homeschoolers outscoring expectations even within lower-income or minority subgroups, and that near one-on-one instruction at a personalized pace is a structural advantage no 30-student classroom can match — so a residual format effect after controls is plausible.",
          common_ground:
            "Both sides agree homeschoolers post higher average scores on the tests actually administered, that those samples are self-selected and demographically advantaged, and that no existing study uses mandatory testing with full SES controls.",
          live_disagreement:
            "Whether any homeschool achievement advantage survives once family income, parental education, and voluntary-testing bias are controlled — which only a large randomized or propensity-score-matched study with mandatory participation could resolve.",
        },
      },
      evidence: [
        {
          id: "hs-nheri-test-data",
          title: "NHERI Standardized Test Data",
          description:
            "The National Home Education Research Institute reports the home-educated typically score 15-25 percentile points above public school students on standardized achievement tests (figure drawn from Brian Ray's studies; older NHERI summaries cited a 15-30 range). NHERI's own page cautions that research designs to date do not establish that homeschooling causes these gains rather than family demographics.",
          side: "for" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 4,
            directness: 6,
          },
          source: "National Home Education Research Institute, Research Facts on Homeschooling (Ray)",
          sourceUrl: "https://nheri.org/research-facts-on-homeschooling/",
          reasoning:
            "NHERI is a homeschool advocacy organization — low independence. Underlying samples are self-selected (voluntary testing). NHERI itself states the research does not prove homeschooling causes the gains; the figure reflects demographically advantaged families, biasing it upward.",
        },
        {
          id: "hs-kunzman-gaither",
          title: "Kunzman & Gaither Self-Selection Critique",
          description:
            "Comprehensive survey of the homeschooling research literature found that achievement studies rely heavily on self-selected, voluntary/convenience samples without adequate demographic controls, so confident claims that homeschooling itself causes higher achievement are not methodologically supported.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Kunzman & Gaither, Other Education 2013, 2(1), 4-59",
          sourceUrl: "https://www.icher.org/files/Kunzman_and_Gaither_An%20Updated_Comprehensive_Survey.pdf",
          reasoning:
            "Comprehensive academic survey of the research literature by scholars without advocacy ties (the linked PDF is the authors' updated edition of the 2013 survey). Directly catalogs the methodological weaknesses — self-selection, voluntary/convenience samples, missing controls — that limit strong achievement claims.",
        },
        {
          id: "hs-ray-2010",
          title: "Ray 2010 Demographic Study",
          description:
            "Brian Ray's 2010 nationwide study of 11,739 homeschoolers reported average scores around the 84th-89th percentile. The sample was overwhelmingly white (~92%), conservative Protestant (~77%), and highly educated (~64% of parents held a bachelor's degree). Parental education was the demographic variable most associated with achievement, so the study does not show that high achievement persists independent of family advantage.",
          side: "for" as const,
          weight: {
            sourceReliability: 3,
            independence: 2,
            replicability: 3,
            directness: 5,
          },
          source: "Ray, Academic Leadership Live: The Online Journal, 8(1), 2010",
          sourceUrl: "https://nheri.org/academic-achievement-and-demographic-traits-of-homeschool-students-a-nationwide-study-2010/",
          reasoning:
            "Large but self-selected/convenience sample, authored by the NHERI founder with an advocacy position. Published in a now-defunct online journal. The original 'for' framing (that gains held even among low-income, non-college families) is not supported by the study — its sample was heavily affluent and college-educated, and reviewers attribute results to family demographics rather than to homeschooling.",
        },
        {
          id: "hs-crhe-data",
          title: "Coalition for Responsible Home Education Data",
          description:
            "CRHE documents cases of educational neglect among homeschoolers, showing that without accountability mechanisms, some children receive little to no academic instruction.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 5,
            directness: 6,
          },
          source: "Coalition for Responsible Home Education, Educational Neglect",
          sourceUrl: "https://crhe.org/advocacy/policy/educational-neglect/",
          reasoning:
            "CRHE is a reform-advocacy nonprofit founded by homeschool alumni — directional bias, so treated cautiously. It documents that most states require little oversight, so educational neglect can go undetected. Illustrates that averages obscure a wide distribution of outcomes, though its case records are not a representative sample.",
        },
      ],
    },
    {
      id: "socialization-development",
      title: "Socialization & Development",
      short_summary:
        "The socialization objection is the first thing everyone raises. The research on it is surprisingly thin in both directions.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Homeschoolers can miss everyday conflict resolution with diverse peers and sustained exposure to different backgrounds and viewpoints. The favorable socialization studies rest on small, self-selected samples, so they cannot rule out that engaged families — not the schooling format — produce the good outcomes. Cardus data point the other way on civic life: homeschool graduates are less likely to register to vote and less likely to vote in local elections. And with minimal oversight in most states, a minority of children face real educational neglect or ideological isolation that no one detects.",
      proponent_rebuttal:
        "Homeschoolers participate in co-ops, sports leagues, community activities, and religious organizations, so the 'isolated child' stereotype rarely matches reality. The available reviews find their social skills, self-esteem, and adult relationships at least comparable to conventionally schooled peers, and Cardus data show homeschool graduates volunteer and give to charity at higher rates. Public school 'socialization' also includes bullying, peer pressure, and artificial age segregation — not an unqualified advantage.",
      crux: {
        id: "socialization-measurement",
        title: "Standardized Socialization Assessment",
        description:
          "Do homeschooled children develop equivalent social competence, measured by validated instruments, compared to matched public school peers?",
        methodology:
          "Administer validated social skills instruments (SSRS, SDQ) to demographically matched homeschool and public school samples, with longitudinal follow-up into adulthood.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Matched longitudinal cohort study)",
        falsification: {
          supporter_flip:
            "If validated social-skills instruments (SSRS, SDQ) administered to demographically matched samples showed homeschoolers with measurably worse social competence or worse adult relationships — or if the favorable findings vanished once family engagement was controlled — the 'socialization is fine' rebuttal would not hold.",
          skeptic_flip:
            "A skeptic worried about isolation should weigh that available reviews find homeschoolers' social skills and adult relationships at least comparable, that most participate in co-ops, sports, and community groups, and that Cardus data show higher volunteering and charitable giving — so the 'isolated child' stereotype is not supported by the better evidence.",
          common_ground:
            "Both sides agree the existing socialization studies rest on small, self-selected samples; that outcomes vary widely across families; and that Cardus shows a genuinely mixed civic picture (higher giving and volunteering, but lower voter registration and local voting).",
          live_disagreement:
            "Whether homeschooling itself produces equivalent social competence, or whether engaged families would produce the same outcomes in any setting — which only validated instruments applied to matched samples with longitudinal adult follow-up could disentangle.",
        },
      },
      evidence: [
        {
          id: "hs-medlin-meta",
          title: "Medlin Socialization Review",
          description:
            "Richard Medlin's narrative review of socialization research reported that homeschooled children tend to have social skills at least as good as conventionally schooled peers, higher-quality friendships, and good relationships with parents and adults.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source: "Medlin, Peabody Journal of Education, 88(3), 284-297, 2013",
          sourceUrl: "https://eric.ed.gov/?id=EJ1053780",
          reasoning:
            "Published in a peer-reviewed journal, but it is a narrative literature review (not a meta-analysis), and Medlin has long published favorably on homeschool outcomes. The underlying studies have small, self-selected samples, so findings are suggestive rather than definitive.",
        },
        {
          id: "hs-college-performance",
          title: "College Admission and Performance Data",
          description:
            "Cogan's 2010 study at one medium-size Midwestern doctoral university found entering homeschooled students had higher high-school GPAs (3.74 vs 3.54), first- and fourth-year college GPAs, and a higher raw graduation rate (66.7% vs 57.5%); however, the graduation/retention difference was not statistically significant once demographic and pre-college factors were controlled.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 6,
            replicability: 4,
            directness: 5,
          },
          source: "Cogan, Journal of College Admission, Summer 2010",
          sourceUrl: "https://eric.ed.gov/?id=EJ893891",
          reasoning:
            "Institutional records are reliable, but this is a single-institution sample and only captures homeschoolers who enroll in college — survivor bias. The most disadvantaged homeschoolers may never apply, and the graduation gap disappears after controlling for student characteristics.",
        },
        {
          id: "hs-isolation-cases",
          title: "Homeschool Isolation Case Studies",
          description:
            "Documented cases of severe social isolation, educational neglect, and abuse in homeschool settings where children had no external oversight or peer contact for years.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 4,
            directness: 7,
          },
          source: "CRHE, Homeschooling's Invisible Children database; alumni surveys and investigative journalism",
          sourceUrl: "https://crhe.org/advocacy/policy/educational-neglect/",
          reasoning:
            "CRHE's case database compiles documented incidents, but these are self-collected by a reform-advocacy group and are not a representative sample. Compelling individual cases, yet low replicability because case compilations are not systematic prevalence estimates.",
        },
        {
          id: "hs-civic-participation",
          title: "Civic Participation Comparisons",
          description:
            "Cardus Education Survey data give a mixed picture: homeschool graduates report higher charitable giving and are more likely to volunteer than public school graduates, but they are LESS likely to be registered to vote and significantly less likely to vote in local elections. The common claim that homeschoolers 'vote at higher rates' is not supported by Cardus.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 5,
            replicability: 4,
            directness: 4,
          },
          source: "Cardus Education Survey (2011/2014), Homeschooling and Young Adult Outcomes",
          sourceUrl: "https://www.cardus.ca/research/education/reports/homeschooling-and-young-adult-outcomes-evidence-from-the-2011-and-2014-cardus-education-survey/",
          reasoning:
            "Cardus uses a nationally representative sample, but findings are mixed rather than uniformly pro-homeschool: higher giving/volunteering but lower voter registration and local voting. Results are also confounded by self-selection — homeschool families are often already highly engaged, so effects may be familial, not educational.",
        },
      ],
    },
  ],
};
