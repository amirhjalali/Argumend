import type { Topic } from "@/lib/schemas/topic";

export const homeschoolingEffectivenessData = {
  id: "homeschooling-effectiveness",
  title: "Homeschooling vs. Public School",
  meta_claim:
    "Homeschooled students achieve better academic and social outcomes than public school students on average.",
  status: "contested" as const,
  category: "economics" as const,
  pillars: [
    {
      id: "academic-achievement",
      title: "Academic Achievement",
      short_summary:
        "Homeschooled students score 15-30 percentile points higher on standardized tests. But the families who homeschool are not a random sample.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "Self-selection bias inflates homeschool test scores — homeschool families are disproportionately affluent, educated, and motivated. There is no standardized accountability, and some homeschooled children receive inadequate education. Voluntary testing means only high-performers are measured.",
      proponent_rebuttal:
        "NHERI data shows homeschoolers score 15-30 percentile points above public school averages on standardized tests. Even controlling for demographics, homeschoolers outperform. The personalized pace, curriculum flexibility, and one-on-one instruction are inherent structural advantages over 30-student classrooms.",
      crux: {
        id: "selection-bias-controlled",
        title: "Selection-Bias-Controlled Achievement Comparison",
        description:
          "Do homeschoolers outperform public school students after rigorously controlling for family income, parental education, and voluntary testing bias?",
        methodology:
          "Large-scale randomized or propensity-score-matched comparison using mandatory (not voluntary) testing, controlling for SES, parental education, and regional factors.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$3M (National longitudinal study with mandatory participation)",
      },
      evidence: [
        {
          id: "hs-nheri-test-data",
          title: "NHERI Standardized Test Data",
          description:
            "The National Home Education Research Institute reports homeschoolers score 15-30 percentile points higher than public school averages on standardized achievement tests across all subjects.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 5,
            directness: 7,
          },
          source: "National Home Education Research Institute",
          reasoning:
            "NHERI is a homeschool advocacy organization — low independence. Sample is self-selected (voluntary testing). Data is real but systematically biased upward.",
        },
        {
          id: "hs-kunzman-gaither",
          title: "Kunzman & Gaither Self-Selection Critique",
          description:
            "Comprehensive literature review found that virtually all homeschool achievement studies suffer from self-selection bias, voluntary participation, and lack of demographic controls, making strong claims unsupported.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Kunzman & Gaither, Other Education 2013",
          reasoning:
            "Peer-reviewed meta-analysis by academic researchers without advocacy ties. Directly addresses the methodological weaknesses of pro-homeschool claims.",
        },
        {
          id: "hs-ray-2010",
          title: "Ray 2010 Demographic-Controlled Study",
          description:
            "Brian Ray's 2010 study of 11,739 homeschoolers found high achievement persisted even among lower-income families and families where parents lacked college degrees.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          source: "Ray, Academic Leadership Journal 2010",
          reasoning:
            "Large sample but authored by NHERI founder with known advocacy position. Self-selected participants. Demographic controls present but voluntary testing bias remains.",
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
          source: "Coalition for Responsible Home Education",
          reasoning:
            "Advocacy-adjacent but draws on documented cases. Shows that averages obscure a wide distribution of outcomes. Anecdotal cases but systematic pattern.",
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
        "Homeschoolers miss critical socialization, conflict resolution with diverse peers, and exposure to different backgrounds and viewpoints. Some experience educational neglect or ideological isolation. The home environment cannot replicate the social complexity of a school.",
      proponent_rebuttal:
        "Homeschoolers participate in co-ops, sports leagues, community activities, and religious organizations. Studies show equivalent or better social skills and self-esteem. Public school 'socialization' includes bullying, peer pressure, and artificial age segregation — not an obvious advantage.",
      crux: {
        id: "socialization-measurement",
        title: "Standardized Socialization Assessment",
        description:
          "Do homeschooled children develop equivalent social competence, measured by validated instruments, compared to matched public school peers?",
        methodology:
          "Administer validated social skills instruments (SSRS, SDQ) to demographically matched homeschool and public school samples, with longitudinal follow-up into adulthood.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$1M (Matched longitudinal cohort study)",
      },
      evidence: [
        {
          id: "hs-medlin-meta",
          title: "Medlin Socialization Meta-Analysis",
          description:
            "Richard Medlin's meta-analysis of socialization research found homeschooled children have higher self-esteem, fewer behavioral problems, and equivalent peer interaction skills.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source: "Medlin, Peabody Journal of Education 2013",
          reasoning:
            "Published in peer-reviewed journal but Medlin has published extensively favoring homeschool outcomes. Underlying studies have small samples and self-selection issues.",
        },
        {
          id: "hs-college-performance",
          title: "College Admission and Performance Data",
          description:
            "Homeschooled students who attend college have slightly higher GPAs and graduation rates than peers from public schools, and are increasingly sought by selective universities.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 6,
          },
          source: "Cogan, Journal of College Admission 2010",
          reasoning:
            "Institutional data is reliable but only captures homeschoolers who attend college — survivor bias. The most disadvantaged homeschoolers may never apply.",
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
          source: "CRHE, Homeschool Alumni surveys, investigative journalism",
          reasoning:
            "Compelling individual cases but anecdotal — not representative of the overall population. Low replicability because case studies are not systematic.",
        },
        {
          id: "hs-civic-participation",
          title: "Civic Participation Comparisons",
          description:
            "Studies show homeschool graduates vote at higher rates, volunteer more, and participate more in community organizations than public school graduates.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 6,
          },
          source: "Cardus Education Survey, NHERI",
          reasoning:
            "Suggestive data but plagued by same self-selection issues. Families that homeschool are often already highly civically engaged — the effect may be familial, not educational.",
        },
      ],
    },
  ],
};
