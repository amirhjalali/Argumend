export const affirmativeActionMeritocracyData = {
  id: "affirmative-action-meritocracy",
  title: "Affirmative Action & Meritocracy",
  question:
    "Should colleges and employers weigh race to give people an equal shot?",
  meta_claim:
    "Race-conscious admissions and hiring policies are necessary to achieve genuine equality of opportunity.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: race-conscious admissions have been unlawful since
  // SFFA v. Harvard (June 2023); the first class admitted under the ruling
  // entered in fall 2024. On 21 January 2025 the President revoked Executive
  // Order 11246 (affirmative action by federal contractors); an August 2025
  // memorandum ordered colleges to report more admissions data to show they
  // are not using race through proxies.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The Supreme Court ended race-conscious college admissions in 2023. In the first class admitted after the ruling, Black and Hispanic enrollment at MIT fell 15 points combined, while Yale's Black share did not move. In January 2025 the President revoked the 1965 order that required affirmative action by federal contractors. The fight now is over whether race-neutral admissions can keep doors open, and whether 'merit' measures such as test scores are fair to begin with.",
    confidence: 90,
    source:
      "Supreme Court of the United States, SFFA v. Harvard (2023); Liam Knox, 'An Early Look at Diversity Post–Affirmative Action', Inside Higher Ed (6 September 2024); The White House, 'Ending Illegal Discrimination and Restoring Merit-Based Opportunity' (21 January 2025)",
    sourceUrl:
      "https://www.insidehighered.com/news/admissions/traditional-age/2024/09/06/early-look-racial-diversity-post-affirmative-action",
  },
  simple_case: [
    "The answer bears on who gets into selective colleges and good jobs, on whether legacy and athlete preferences survive, and on how hard the federal government polices diversity programs.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What do test scores and credentials measure?
    // =========================================================================
    {
      id: "systemic-disadvantage-vs-merit",
      title: "What Do Test Scores and Credentials Measure?",
      short_summary:
        "Test scores track family income closely. They also predict college grades well, and a 2025 study at Ivy-Plus colleges found they do so as accurately for disadvantaged students as for others. Meanwhile legacy, athlete and other preferences tilt admissions toward the rich. Whether 'merit' is a fair yardstick, or a record of head starts, is where the dispute begins.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Merit can be measured, and the measures work for everyone. Friedman, Sacerdote, Staiger and Tine found that at Ivy-Plus colleges SAT and ACT scores are about four times more predictive of first-year grades than high school GPA, and that they 'show no calibration bias': disadvantaged students with a given score do not outperform it. Brown, Dartmouth, Harvard, Stanford and Yale cited such research when they brought back testing. Race is a poor proxy for disadvantage, and using it penalizes other applicants: in Harvard's own data, Asian American applicants would have been admitted about 19% more often had they been treated as white. Chief Justice Roberts put the principle plainly: 'Eliminating racial discrimination means eliminating all of it.' The remedy for unequal schools is better schools, not adjusted scores at the gate.",
      proponent_rebuttal:
        "A test can predict grades and still record a head start. The University of California's 2020 task force found family income, parental education and race explain more than 40% of the variance in applicants' SAT and ACT scores, against less than 10% of the variance in high school grades. The median white family held about $171,000 in wealth in 2022 against $17,600 for Black families, and that buys tutoring, test prep and better school districts. Selective colleges never ran on scores alone: children from the top 1% are twice as likely as middle-class children with the same scores to attend an Ivy-Plus college, driven by legacy preferences, recruited athletes and non-academic ratings. At Harvard, over 43% of white admits were athletes, legacies, dean's-list or faculty children. Ending race preferences while keeping these does not create a meritocracy.",
      crux: {
        id: "merit-measurement-validity",
        title: "The Merit Measurement Validity Test",
        question:
          "Do test scores and credentials measure individual ability, or accumulated advantage?",
        description:
          "If test scores predict college and career success as well for disadvantaged students as for advantaged ones, they measure capability that admissions can fairly use, and race-conscious correction loses one of its main justifications. If they understate what disadvantaged students go on to achieve, 'merit-based' selection excludes capable people and some correction is warranted.",
        methodology:
          "Follow 50,000+ students from kindergarten into careers, recording family wealth, school quality and access to test prep. Compare how well test scores, grades and other measures predict college completion, graduate degrees and earnings at 10 and 20 years, separately for advantaged and disadvantaged students and by race.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A study following 50,000+ students from kindergarten to careers, controlling for family wealth, school quality and test prep, comparing how well test scores predict later success for disadvantaged and advantaged students.",
        },
        cost_to_verify:
          "$5-15M (multi-decade cohort study)",
        falsification: {
          supporter_flip:
            "If long-run data matched what the Ivy-Plus study found for first-year grades, test scores predicting degrees and earnings as accurately for disadvantaged students as for advantaged ones, the claim that merit measures mostly record accumulated advantage would weaken.",
          skeptic_flip:
            "If disadvantaged students with a given score went on to out-earn and out-achieve advantaged students with the same score by wide margins, test scores would be shown to understate their ability, and race-blind selection on scores would look less like merit.",
          common_ground:
            "Both sides agree test scores track family income, that they predict first-year college grades, that legacy and athlete preferences favor the rich, and that disadvantage starts long before the college gate.",
          live_disagreement:
            "Whether test scores and credentials measure ability fairly across backgrounds or encode accumulated advantage, and so whether any remedy belongs at admission or earlier, in schools and neighborhoods.",
        },
      },
      evidence: [
        {
          id: "ivy-plus-test-scores-2025",
          title: "Ivy-Plus study 2025: SAT/ACT scores predict first-year grades about four times better than high school GPA, with no bias against the disadvantaged",
          description:
            "John Friedman, Bruce Sacerdote, Douglas Staiger and Michele Tine, in AEA Papers and Proceedings (May 2025), found that 'SAT and ACT scores have substantial predictive power for forecasting first-year college GPA' at Ivy-Plus colleges, while high school grades add little: 'A perfect 4.0 high-school GPA predicts only a 0.1 point higher first-year GPA compared to a 3.2 high-school GPA.' The scores 'show no calibration bias': students from less advantaged backgrounds do not outperform peers with the same scores. Students admitted without scores under test-optional rules earned grades like those of students scoring about 1300. Brown, Caltech, Dartmouth, Harvard, Stanford and Yale cited the research when they reinstated testing.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Friedman, Sacerdote, Staiger & Tine, 'Standardized Test Scores and Academic Performance at Ivy-Plus Colleges', AEA Papers and Proceedings 115:676-81 (2025), via Opportunity Insights",
          sourceUrl: "https://opportunityinsights.org/paper/test-scores/",
          reasoning:
            "Strong evidence that scores measure something real and do not underrate disadvantaged students at the most selective colleges. It measures first-year grades among admitted students at a dozen colleges, not later careers, and it does not address whether disadvantaged students had the same chance to reach a high score; the standardized-testing map covers the testing dispute itself.",
        },
        {
          id: "sat-income-correlation",
          title: "UC task force 2020: family background explains over 40% of SAT/ACT variance but under 10% of high school grades",
          description:
            "The University of California's Standardized Testing Task Force found that family income, parental education and race together account for more than 40% of the variance in applicants' SAT and ACT scores (up from 25% in 1994), against less than 10% of the variance in high school grades. The same task force found the tests still added predictive value beyond GPA and recommended keeping them, a recommendation the Board of Regents overrode in 2020.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 8,
            directness: 6,
          },
          source: "University of California Standardized Testing Task Force (2020)",
          sourceUrl: "https://senate.universityofcalifornia.edu/_files/underreview/sttf-report.pdf",
          reasoning:
            "The system's own faculty, with full applicant data, showing scores are heavily loaded with family background. The same report found the tests still predict, so it shows scores carry advantage, not that they are meaningless.",
        },
        {
          id: "legacy-admissions-advantage",
          title: "Opportunity Insights 2023: top-1% children twice as likely to attend an Ivy-Plus college as middle-class peers with the same scores",
          description:
            "Raj Chetty, David Deming and John Friedman found that 'children from families in the top 1% are twice as likely to attend an Ivy-Plus college' as middle-class children with comparable SAT or ACT scores. Two-thirds of the gap comes from higher admission rates, driven by 'preferences for children of alumni', weight on non-academic ratings that favor private-school applicants, and the recruitment of athletes, 'who tend to come from higher-income families.' Separately, Arcidiacono, Kinsler and Ransom found that at Harvard 'Among white admits, over 43% are ALDC' (athletes, legacies, dean's-list and children of faculty and staff), and that roughly three-quarters of them would have been rejected without that status.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source:
            "Chetty, Deming & Friedman, 'Diversifying Society's Leaders?', Opportunity Insights (2023); Arcidiacono, Kinsler & Ransom, 'Legacy and Athlete Preferences at Harvard', NBER Working Paper 26316 (2019)",
          sourceUrl: "https://opportunityinsights.org/paper/collegeadmissions/",
          reasoning:
            "Two rigorous studies, one by SFFA's own expert, showing large non-academic preferences that favor the advantaged. They undercut the claim that admissions without race preferences would be a meritocracy. They bear on race-conscious policy only indirectly: ending legacy preferences is a separate remedy that both sides can support.",
        },
        {
          id: "harvard-asian-american-penalty",
          title: "Harvard data: Asian American applicants would be admitted about 19% more often if treated as white",
          description:
            "Using admissions data made public in SFFA v. Harvard, Arcidiacono, Kinsler and Ransom estimate that typical Asian American applicants would see their admit rate rise by 19%, about 1 percentage point, if treated as white applicants. They identify Harvard's personal rating as one channel: including it in the model cuts the estimated penalty by less than half.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 4,
            replicability: 6,
            directness: 6,
          },
          source:
            "Arcidiacono, Kinsler & Ransom, 'Asian American Discrimination in Harvard Admissions', European Economic Review 144 (2022)",
          sourceUrl: "https://doi.org/10.1016/j.euroecorev.2022.104079",
          reasoning:
            "Peer-reviewed and built on one of the most scrutinized admissions datasets in the country. Independence is 4: Arcidiacono was SFFA's expert witness and Kinsler a consultant, and Harvard's expert reached a different conclusion, largely over whether the personal rating belongs in the model. It shows a cost to a group the policy did not aim to help, at one college.",
        },
        {
          id: "racial-wealth-gap-data",
          title: "Federal Reserve 2022: median white family wealth $171,000; Black families $17,600",
          description:
            "The Federal Reserve's 2022 Survey of Consumer Finances found median net wealth of $171,000 for white families, $17,600 for Black families and $20,700 for Hispanic families, close to a ten-to-one ratio between white and Black families. Researchers including William Darity trace the gap to slavery, Jim Crow, exclusion from GI Bill and federal housing benefits, and later discrimination.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "Federal Reserve Board, Survey of Consumer Finances (2022)",
          sourceUrl: "https://www.federalreserve.gov/econres/scfindex.htm",
          reasoning:
            "The standard household wealth data, and undisputed. It establishes a large inherited disadvantage; it does not show that race-conscious admission is the right remedy rather than wealth-based preferences or earlier investment.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: After the ban — can race-neutral admissions keep doors open?
    // =========================================================================
    {
      id: "race-conscious-vs-neutral-effectiveness",
      title: "After the Ban: Can Race-Neutral Admissions Keep Doors Open?",
      short_summary:
        "Several states banned racial preferences long before the Supreme Court did, so there are decades of evidence. At the most selective campuses, Black and Hispanic enrollment fell and recovered slowly; California's ban also lowered degree completion and wages for the students it displaced. Across the whole UC system, admissions reached record diversity by 2024. The first national class after the ruling showed sharp falls at some colleges and none at others.",
      icon_name: "Target" as const,
      skeptic_premise:
        "Race-neutral tools can produce diverse classes without sorting applicants by race. California has been race-blind since 1996, and by fall 2024 the University of California had admitted 'the largest and most diverse class in its history', with underrepresented students 45.4% of California first-year admits. Outreach to high schools, holistic review weighing hardship, community-college transfer and income preferences all work. After SFFA, some of the most selective colleges held steady: Yale's Black share stayed at 14% in the first class admitted under the ruling. The Constitution, the Court held, requires treating each 'student … based on his or her experiences as an individual — not on the basis of race.' Colleges that care about diversity have legal tools to pursue it.",
      proponent_rebuttal:
        "The record says race-neutral tools recover only part of what is lost, and slowly. Bleemer's study of California's Proposition 209, in the Quarterly Journal of Economics, found that ending affirmative action pushed minority applicants 'into lower-quality colleges', that 'their degree attainment declined overall and in STEM fields', and that their wages in their twenties and thirties fell. At the University of Michigan, Black students were 7.2% of undergraduates in 2006, when Michigan banned preferences, and 4.63% by 2014, despite years of outreach. A Stanford simulation found income-based preferences alone recover only part of the racial diversity race-conscious admission produced. The first class after SFFA bore this out: at MIT, Black and Hispanic enrollment fell 15 points combined; at Amherst, Black enrollment fell 8 points.",
      crux: {
        id: "race-neutral-diversity-outcomes",
        title: "The Race-Neutral Equivalence Test",
        question:
          "Can race-neutral policies match the diversity that race-conscious policies achieve?",
        description:
          "If race-neutral policies produce comparable representation, graduation and later earnings for underrepresented students at selective colleges within a reasonable time, the case that race-conscious policy is necessary weakens. If they consistently produce lower representation and worse outcomes for the students displaced, race-neutral rules entrench the gap.",
        methodology:
          "Compare enrollment, graduation and post-graduation earnings for underrepresented students at the 50 most selective US universities in three groups: those in states that banned affirmative action before SFFA, those race-conscious until 2023, and all of them since. Track outcomes 1, 3, 5 and 10 years after each ban, controlling for state demographics, outreach spending and changes in who applies.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Enrollment, graduation and later earnings for underrepresented students at the 50 most selective universities, comparing states that banned affirmative action before SFFA, schools race-conscious until 2023, and all schools since.",
        },
        cost_to_verify:
          "$0 (IPEDS enrollment data and state-level analyses are public)",
        falsification: {
          supporter_flip:
            "If selective colleges in the years after SFFA, using income preferences, outreach and essays on hardship, returned to their pre-ruling representation and graduation rates, as Yale's unchanged Black share hints, the claim that race-conscious admission is necessary would weaken.",
          skeptic_flip:
            "If national data in the years after SFFA repeated California's pattern, with displaced students completing fewer degrees and earning less, and no recovery at the most selective colleges, race-neutral admission would look unable to replace what was lost.",
          common_ground:
            "Both sides agree minority enrollment at the most selective campuses fell after state bans like Proposition 209, that the whole UC system later reached record diversity in admissions, and that the first national class after SFFA moved differently at different colleges.",
          live_disagreement:
            "Whether race-neutral strategies can recover the diversity and outcomes lost at the most selective colleges given time, or only partly, leaving gaps that compound in degrees and earnings.",
        },
      },
      evidence: [
        {
          id: "prop-209-aftermath",
          title: "Bleemer, QJE 2022: California's ban pushed minority applicants to weaker colleges and cut their degrees and wages",
          description:
            "Zachary Bleemer used University of California administrative records to trace the effects of Proposition 209, California's 1996 ban on racial preferences. He found that 'ending affirmative action caused underrepresented minority (URM) freshman applicants to cascade into lower-quality colleges', that 'their degree attainment declined overall and in STEM fields', more steeply for less qualified applicants, and that 'URM applicants' average wages in their twenties and thirties subsequently declined', mainly among Hispanic applicants. He notes that the mismatch hypothesis 'implies that this cascade would provide net educational benefits to URM applicants'; it did not.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 9,
          },
          source:
            "Bleemer, 'Affirmative Action, Mismatch, and Economic Mobility after California's Proposition 209', Quarterly Journal of Economics 137(1) (2022)",
          sourceUrl: "https://academic.oup.com/qje/article/137/1/115/6360989",
          reasoning:
            "Top-journal causal evidence from full administrative records on the exact policy question: what happens to students when preferences end. It covers one state's ban in the late 1990s, before the outreach and holistic review that California built later, so it describes the first years after a ban better than the long run.",
        },
        {
          id: "post-sffa-enrollment-drops",
          title: "First class after SFFA (fall 2024): MIT's Black and Hispanic share fell 15 points; Yale's Black share held at 14%",
          description:
            "Inside Higher Ed's early tally of the first class admitted under SFFA found that at MIT, Black and Hispanic enrollment combined 'fell by 15 percentage points', while Asian American students rose 7 points to nearly half of the class. Amherst's Black enrollment fell 8 points and its Hispanic enrollment 4 points; Tufts's Black enrollment fell 3 points. At Yale, the Black share 'remained exactly the same' at 14%, Hispanic enrollment rose a point and Asian American enrollment fell 6 points.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source:
            "Liam Knox, 'An Early Look at Diversity Post–Affirmative Action', Inside Higher Ed (6 September 2024)",
          sourceUrl:
            "https://www.insidehighered.com/news/admissions/traditional-age/2024/09/06/early-look-racial-diversity-post-affirmative-action",
          reasoning:
            "Direct, early data on the national experiment. It is one year, colleges report their figures in different ways, and the spread between MIT and Yale shows outcomes depend on each college's choices, which both sides can read as support.",
        },
        {
          id: "uc-record-admits-2024",
          title: "UC 2024: 28 years into its race-blind rule, the University of California admitted its most diverse class",
          description:
            "The University of California reported on 31 July 2024 that it 'admitted the largest and most diverse class in its history for fall 2024'. Among California first-year admits, 'admission offers to underrepresented students rose to 45.4 percent', Latino students were the largest group at 38.6%, and offers to African American students rose by almost 10% from the year before. It credits 'the university's holistic admissions process, combined with our campuses' deliberate work with high schools'.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 5,
            replicability: 8,
            directness: 5,
          },
          source:
            "University of California Office of the President, 'UC announces record-breaking admissions for fall 2024' (31 July 2024)",
          sourceUrl: "https://www.universityofcalifornia.edu/news/uc-announces-record-breaking-admissions-fall-2024",
          reasoning:
            "The strongest evidence that a large race-blind system can reach record representation over a long horizon. Independence is 5: the university is reporting its own record. Directness is 5: these are systemwide offers, not enrollment at Berkeley or UCLA where the losses were steepest, and they do not separate policy from California's changing demographics.",
        },
        {
          id: "sffa-v-harvard-ruling",
          title: "SFFA v. Harvard (2023): the Supreme Court held race-conscious admissions unlawful, 6–3 and 6–2",
          description:
            "In Students for Fair Admissions v. Harvard, the Supreme Court held that the race-conscious admissions programs at Harvard and the University of North Carolina violated the Equal Protection Clause (6-3 in the UNC case; 6-2 at Harvard, where Justice Jackson recused). Chief Justice Roberts wrote that 'eliminating racial discrimination means eliminating all of it' and that 'the student must be treated based on his or her experiences as an individual — not on the basis of race.' The ruling left applicants free to write about how race affected their lives. Justice Sotomayor's dissent said it 'cements a superficial rule of colorblindness as a constitutional principle in an endemically segregated society.'",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 10,
            directness: 6,
          },
          source: "Supreme Court of the United States, SFFA v. President and Fellows of Harvard College, No. 20-1199 (29 June 2023)",
          sourceUrl: "https://www.supremecourt.gov/opinions/22pdf/20-1199_hgdj.pdf",
          reasoning:
            "Settles the US law for admissions. It does not settle whether race-neutral alternatives work, which is an empirical question, or the moral one, which the majority and dissent answer differently.",
        },
        {
          id: "eo-11246-revoked-2025",
          title: "January 2025: the President revoked the 1965 order requiring affirmative action by federal contractors",
          description:
            "The executive order 'Ending Illegal Discrimination and Restoring Merit-Based Opportunity' (21 January 2025) states: 'Executive Order 11246 of September 24, 1965 (Equal Employment Opportunity), is hereby revoked.' It requires federal contractors and grantees to certify that they do not operate programs promoting DEI in violation of federal anti-discrimination law, and directs agencies to 'combat illegal private-sector DEI preferences, mandates, policies, programs, and activities.' An August 2025 presidential memorandum told the Education Department to expand admissions reporting, citing 'diversity statements' and other racial proxies.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 4,
            replicability: 10,
            directness: 3,
          },
          source:
            "The White House, 'Ending Illegal Discrimination and Restoring Merit-Based Opportunity' (21 January 2025); 'Ensuring Transparency in Higher Education Admissions' (7 August 2025)",
          sourceUrl:
            "https://www.whitehouse.gov/presidential-actions/2025/01/ending-illegal-discrimination-and-restoring-merit-based-opportunity/",
          reasoning:
            "Ends sixty years of affirmative action duties in federal contracting, extending the admissions ruling's logic to hiring. It is a policy choice by one side of the dispute, not evidence about whether such programs work, so independence and directness are low.",
        },
        {
          id: "michigan-post-ban-decline",
          title: "Michigan: Black undergraduates fell from 7.2% in 2006 to 4.6% in 2014 after the state's ban",
          description:
            "Michigan voters banned racial preferences in public university admissions in 2006. Black students made up 7.2% of University of Michigan undergraduates that year and 4.63% by 2014, in a state where about 19% of the college-age population is Black, despite outreach and pipeline programs launched after the ban.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 8,
            directness: 8,
          },
          source: "The Michigan Daily, 'University continues to struggle with minority enrollment' (2014)",
          sourceUrl: "https://www.michigandaily.com/uncategorized/minority-enrollment/",
          reasoning:
            "University enrollment figures reported by the campus paper, at a highly selective public university that invested in alternatives. It is one campus, and the figures stop in 2014, before later recruitment efforts.",
        },
        {
          id: "income-based-aa-underperformance",
          title: "Stanford simulation 2018: income-based preferences alone recover only part of the racial diversity",
          description:
            "Sean Reardon and colleagues at Stanford simulated admissions at selective colleges using national data (Journal of Policy Analysis and Management, 2018). Neither preferences by socioeconomic status nor race-targeted recruiting alone produced the racial diversity of race-based affirmative action; only the two combined, at higher cost, came close. Racial and income disadvantage overlap but are not the same, and low-income white applicants outnumber low-income Black and Hispanic applicants.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Reardon, Baker, Kasman, Klasik & Townsend, Journal of Policy Analysis and Management (2018), Stanford Center for Education Policy Analysis",
          sourceUrl:
            "https://cepa.stanford.edu/content/what-levels-racial-diversity-can-be-achieved-socioeconomic-based-affirmative-action-evidence-simulation-model",
          reasoning:
            "A transparent, peer-reviewed simulation of the main race-neutral alternative. Simulations depend on assumptions about who applies and enrolls; real colleges after SFFA are now testing the same question.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Does it help or harm the people and the society it aims at?
    // =========================================================================
    {
      id: "social-cohesion-vs-remedial-justice",
      title: "Does It Help the People It Aims At, and at What Cost to Trust?",
      short_summary:
        "Critics say preferences place students where they struggle and breed resentment and doubt. The strong version of the 'mismatch' claim has not held up, but a narrower one about STEM persistence has support. Half of Americans disapproved of race-conscious admissions in 2023. India's caste reservations, the largest such program, reached poorer students without making those displaced resentful.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Preferences can hurt the students they mean to help and divide everyone else. In University of California data, Arcidiacono, Aucejo and Hotz found less-prepared minority students who started in STEM were more likely to finish a STEM degree at a less selective campus: placement above preparation costs graduates. Preferences also cast doubt on every member of a group, including those who needed no help. Most of the public is unconvinced: in June 2023 Pew found 50% of Americans disapproved of colleges considering race, against 33% who approved, with majorities of white and Asian adults opposed. A policy that sorts people by race to reduce the weight of race keeps race at the center of public life.",
      proponent_rebuttal:
        "The mismatch claim in its strong form has failed. Reanalyses of the law-school data Richard Sander used found no harm to graduation, bar passage or jobs for Black students with moderate or strong credentials, and Bleemer found California's ban lowered degree completion, the opposite of what mismatch predicts. Legacy admits and athletes get larger preferences and face no comparable stigma. Diverse teams produce more-cited research. And the largest real program shows resentment is not inevitable: in India, Bertrand, Hanna and Mullainathan found engineering-college reservations 'successfully target the financially disadvantaged', produce 'a strong, positive economic return to admission' for lower-caste students, and leave displaced upper-caste applicants with no more negative attitudes toward lower castes.",
      crux: {
        id: "net-social-cohesion-effect",
        title: "The Social Cohesion Net Impact Assessment",
        question:
          "Do race-conscious policies strengthen or strain social cohesion between groups?",
        description:
          "If race-conscious policies reduce prejudice, build cross-group friendships and leave beneficiaries better off without lasting resentment among others, the social case for them holds. If they mainly generate backlash, stigmatize beneficiaries and entrench racial categories, they undercut their own goals.",
        methodology:
          "Combine (1) intergroup attitudes in states with and without bans, from the General Social Survey and ANES; (2) longitudinal surveys of 10,000 students at 50 universities tracking racial attitudes, cross-racial friendships and belonging from first year to 10 years after graduation; and (3) comparisons with India, Brazil and Malaysia, where admission quotas are large and long-standing.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Longitudinal surveys of 10,000 students at 50 universities tracking racial attitudes, cross-racial friendships and belonging for 10 years after graduation, alongside General Social Survey and ANES attitudes in states with and without bans.",
        },
        cost_to_verify:
          "$3-8M (multi-site longitudinal study)",
        falsification: {
          supporter_flip:
            "If long-run surveys found that campuses with race-conscious admission produced more resentment and stigma, and fewer cross-racial friendships, than campuses without it, the social case for such policies would weaken.",
          skeptic_flip:
            "If long-run surveys repeated India's finding that displaced applicants did not grow more hostile, while beneficiaries gained in degrees and earnings, the fear that preferences divide more than they heal would weigh less.",
          common_ground:
            "Both sides agree more Americans disapproved than approved of race-conscious admissions in 2023, that the strong mismatch claim has weak support while a narrower one about STEM persistence has some, and that foreign programs offer mixed lessons.",
          live_disagreement:
            "Whether race-conscious policies build cross-group trust and opportunity, or breed resentment and doubt that undercut them, which long-run attitude data could show.",
        },
      },
      evidence: [
        {
          id: "mismatch-hypothesis-debate",
          title: "The strong 'mismatch' claim has not survived reanalysis; a narrower version remains live",
          description:
            "Richard Sander's 2004 Stanford Law Review article argued that affirmative action in law schools placed Black students above their preparation, reducing the number of Black lawyers. Reanalyses of the same Bar Passage Study data reached different conclusions: Rothstein and Yoon (2008) found no mismatch effect on graduation, bar passage or employment for Black students with moderate or strong credentials, locating what evidence there is among the weakest-credentialed students. A 2016 Journal of Economic Literature review by Arcidiacono and Lovenheim called the literature contentious and framed the question as a trade-off between college quality and student fit.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Sander, Stanford Law Review (2004); Rothstein & Yoon, NBER w14275 (2008); Arcidiacono & Lovenheim, Journal of Economic Literature (2016)",
          sourceUrl: "https://doi.org/10.1257/jel.54.1.3",
          reasoning:
            "Two decades of peer-reviewed argument over one shared dataset. The strong version, that preferences reduce the total number of minority graduates, has not held; a weaker version about the least-prepared students and STEM persistence remains live, which the next card speaks to.",
        },
        {
          id: "stem-persistence-less-selective-campuses",
          title: "AER 2016: less-prepared minority STEM students finished STEM degrees more often at less selective UC campuses",
          description:
            "Arcidiacono, Aucejo and Hotz, in the American Economic Review, used University of California data and found that less-prepared minority students who began in STEM were more likely to graduate in a STEM field had they attended a less selective UC campus. They estimate the number of minority STEM graduates would rise with better matching of students to campuses, because persistence in the major, not admission, is where the loss occurs.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Arcidiacono, Aucejo & Hotz, American Economic Review (2016)",
          sourceUrl: "https://doi.org/10.1257/aer.20130626",
          reasoning:
            "The strongest peer-reviewed evidence for a fit effect in a measurable outcome, from a whole state system's records. It concerns how students are spread across campuses, not whether race-conscious admission widens access overall, and it sits in tension with Bleemer's finding that California's ban lowered STEM degrees.",
        },
        {
          id: "public-opinion-opposition",
          title: "Pew June 2023: 50% of Americans disapproved of colleges considering race, 33% approved",
          description:
            "A June 2023 Pew Research Center survey found 50% of US adults disapproved of selective colleges considering race and ethnicity in admissions, 33% approved and 16% were unsure. About 74% of Republicans disapproved, as did 57% of white adults and 52% of Asian adults; 47% of Black adults approved. Support rises when questions stress diversity, and many respondents back considering applicants' economic background.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 5,
          },
          source: "Pew Research Center (8 June 2023)",
          sourceUrl:
            "https://www.pewresearch.org/politics/2023/06/08/more-americans-disapprove-than-approve-of-colleges-considering-race-ethnicity-in-admissions-decisions/",
          reasoning:
            "Gold-standard polling showing more opposition than support, which bears on cohesion and consent. Opinion is sensitive to wording, and public opinion does not show whether a policy works or is just.",
        },
        {
          id: "diversity-innovation-research",
          title: "Freeman & Huang: papers by ethnically diverse author teams were cited 5–10% more",
          description:
            "Richard Freeman and Wei Huang analyzed about 2.5 million research papers and found that papers by ethnically diverse teams received 5% to 10% more citations than those by homogeneous teams. Gurin and colleagues' longitudinal study of University of Michigan students found exposure to diversity in college linked to more active thinking and engagement years after graduation. Corporate studies such as McKinsey's link board diversity to profits but cannot separate cause from effect.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 6,
            directness: 4,
          },
          source: "Freeman & Huang, NBER Working Paper 19905; Gurin et al., Harvard Educational Review (2002)",
          sourceUrl: "https://www.nber.org/papers/w19905",
          reasoning:
            "Large data on research teams; the college and corporate findings are weaker and correlational. Diversity having benefits does not show that race-conscious admission is the way to get it, so directness is 4.",
        },
        {
          id: "india-reservation-mixed-results",
          title: "India engineering colleges: caste reservations reached poorer students and paid off; displaced applicants did not grow more hostile",
          description:
            "Studying engineering-college admissions in India, Marianne Bertrand, Rema Hanna and Sendhil Mullainathan found the caste-based reservation policy 'successfully targets the financially disadvantaged': the marginal upper-caste applicant displaced usually came from a richer background than the lower-caste student admitted. Lower-caste admits, despite much lower entrance scores, saw 'a strong, positive economic return to admission', though the marginal upper-caste entrant gained nearly twice as much in earnings. They found no evidence that rejected upper-caste applicants developed more negative attitudes toward lower castes or toward affirmative action.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 5,
          },
          source:
            "Bertrand, Hanna & Mullainathan, 'Affirmative Action in Education: Evidence From Engineering College Admissions in India', NBER Working Paper 13926 (2008); Journal of Public Economics (2010)",
          sourceUrl: "https://www.nber.org/papers/w13926",
          reasoning:
            "A rigorous study of the world's largest admissions quota system that speaks to both halves of the crux: benefits for those admitted and no measured resentment among those displaced. It covers one state's engineering colleges, and caste differs from race in the US, so directness is 5. The smaller earnings gain for lower-caste admits is a real cost.",
        },
      ],
    },
  ],
  aliases: [
    "Are race-conscious admissions and hiring needed for equal opportunity?",
    "Was the Supreme Court right to end affirmative action?",
    "Is affirmative action fair?",
    "Should colleges consider race in admissions?",
  ],
  references: [
    {
      title: "Students for Fair Admissions v. Harvard — Supreme Court of the United States (2023)",
      url: "https://www.supremecourt.gov/opinions/22pdf/20-1199_hgdj.pdf",
    },
    {
      title: "An Early Look at Diversity Post–Affirmative Action — Inside Higher Ed (6 September 2024)",
      url: "https://www.insidehighered.com/news/admissions/traditional-age/2024/09/06/early-look-racial-diversity-post-affirmative-action",
    },
    {
      title: "Ending Illegal Discrimination and Restoring Merit-Based Opportunity — The White House (21 January 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/01/ending-illegal-discrimination-and-restoring-merit-based-opportunity/",
    },
    {
      title: "Ensuring Transparency in Higher Education Admissions — The White House (7 August 2025)",
      url: "https://www.whitehouse.gov/presidential-actions/2025/08/ensuring-transparency-in-higher-education-admissions/",
    },
    {
      title: "Standardized Test Scores and Academic Performance at Ivy-Plus Colleges — Friedman, Sacerdote, Staiger & Tine (2025)",
      url: "https://opportunityinsights.org/paper/test-scores/",
    },
    {
      title: "Diversifying Society's Leaders? — Chetty, Deming & Friedman, Opportunity Insights (2023)",
      url: "https://opportunityinsights.org/paper/collegeadmissions/",
    },
    {
      title: "Legacy and Athlete Preferences at Harvard — Arcidiacono, Kinsler & Ransom, NBER w26316 (2019)",
      url: "https://www.nber.org/papers/w26316",
    },
    {
      title: "Affirmative Action, Mismatch, and Economic Mobility after California's Proposition 209 — Bleemer, QJE (2022)",
      url: "https://academic.oup.com/qje/article/137/1/115/6360989",
    },
    {
      title: "Affirmative Action in Education: Evidence From Engineering College Admissions in India — Bertrand, Hanna & Mullainathan, NBER w13926",
      url: "https://www.nber.org/papers/w13926",
    },
    {
      title: "Affirmative Action and the Quality-Fit Trade-off — Arcidiacono & Lovenheim, Journal of Economic Literature (2016)",
      url: "https://doi.org/10.1257/jel.54.1.3",
    },
    {
      title: "More Americans Disapprove Than Approve of Colleges Considering Race, Ethnicity in Admissions Decisions — Pew Research Center (2023)",
      url: "https://www.pewresearch.org/politics/2023/06/08/more-americans-disapprove-than-approve-of-colleges-considering-race-ethnicity-in-admissions-decisions/",
    },
    {
      title: "University of California Standardized Testing Task Force Report (2020)",
      url: "https://senate.universityofcalifornia.edu/_files/underreview/sttf-report.pdf",
    },
    {
      title: "Survey of Consumer Finances — Federal Reserve Board",
      url: "https://www.federalreserve.gov/econres/scfindex.htm",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Do test scores measure merit or privilege?",
      content:
        "Both, which is why the argument persists. Family background explains over 40% of the variation in UC applicants' SAT and ACT scores. Yet a 2025 study at Ivy-Plus colleges found scores predict first-year grades about four times better than high school GPA, and do not underrate disadvantaged students. Meanwhile legacy, athlete and other preferences make top-1% children twice as likely as middle-class children with the same scores to attend.",
    },
    {
      id: "q2",
      title: "What happened to diversity after the Supreme Court ended affirmative action?",
      content:
        "In the first class admitted after the 2023 ruling, results split. At MIT, Black and Hispanic enrollment fell 15 points combined; Amherst's Black enrollment fell 8 points; Yale's Black share held at 14%. California, race-blind since 1996, saw steep early losses at Berkeley and UCLA, and a study found its ban lowered displaced students' degrees and wages; by 2024 the UC system as a whole admitted its most diverse class.",
    },
    {
      id: "q3",
      title: "Does affirmative action create resentment or mismatch?",
      content:
        "The strong mismatch claim, that preferences reduce the number of minority graduates, has not held up in reanalyses, though a narrower effect on STEM persistence has support. Half of Americans disapproved of race-conscious admissions in 2023. India's caste reservations, studied in engineering colleges, reached poorer students and paid off for them, with no rise in hostility among the applicants they displaced.",
    },
  ],
};
