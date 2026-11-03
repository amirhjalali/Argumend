export const schoolPhoneBansData = {
  id: "school-phone-bans",
  title: "Should Schools Ban Smartphones?",
  question:
    "Do school phone bans improve students' learning and mental health?",
  // Words readers use for this question that the map's own text does not.
  aliases: [
    "What happens in a school lockdown if every phone is locked away?",
    "Should phones be banned in class?",
    "Do Yondr pouches work?",
  ],
  meta_claim:
    "Banning smartphones in schools for the whole school day measurably improves students' learning and mental health, enough to justify the costs of enforcing it.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: Ballotpedia counted 33 states with K-12 phone
  // bans in law (26 March 2026). Newest evidence: Allcott, Baron, Dee,
  // Duckworth, Gentzkow & Jacob, NBER w35132 (April 2026, revised September
  // 2026), on 40,542 schools and Yondr pouch adoption; Figlio & Özek, NBER
  // w34388 (October 2025), on a Florida district; Abrahamsson, Journal of
  // Human Resources (March 2026), on Norway; Goodyear et al., Lancet
  // Regional Health - Europe (February 2025), on English schools.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "By March 2026, 33 US states had laws barring students from using phones in class or for the whole school day. The largest study yet, of schools that lock phones in pouches, found in-class phone use fell from 61% of students to 13%, but average test scores did not move. Suspensions rose in the first year, then fell back. The fight is over whether bans help learning and mental health enough to justify how they are enforced.",
    confidence: 82,
    source:
      "Ballotpedia News, 'Kansas becomes thirty-third state to enact a K-12 cellphone ban' (26 March 2026); Allcott, Baron, Dee, Duckworth, Gentzkow & Jacob, 'The Effects of School Phone Bans: National Evidence from Lockable Pouches,' NBER Working Paper 35132 (revised September 2026)",
    sourceUrl: "https://www.nber.org/papers/w35132",
  },
  // ── Stage 2: the summary above the crux sheet ──
  simple_case: [
    "The answer bears on students in the 33 states that now have bans in law, as bell-to-bell rules spread, and on schools in England, Norway and elsewhere that adopted bans earlier.",
    "Three questions carry it: whether bans raise achievement, whether a ban that covers only the school day can move students' mental health, and whether bans can be enforced without new discipline gaps or harm to students who need their phones. Whether phones and social media caused the wider teen mental health decline is argued on its own map.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Academic Performance & Attention
    // =========================================================================
    {
      id: "academic-performance",
      title: "Do Bans Raise Achievement?",
      short_summary:
        "Early studies in England found test scores rose after bans, most for the weakest students. A Florida district saw gains in a ban's second year as unexcused absences fell. But the largest study, of thousands of US schools that lock phones in pouches, found average test-score effects close to zero over three years.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The best and largest evidence finds little academic payoff. Hunt Allcott, Thomas Dee, Matthew Gentzkow and colleagues tracked US schools adopting Yondr pouches against schools that did not, using test scores, teacher surveys and GPS data from 40,542 schools. Phone use in class fell sharply, yet 'average effects on test scores are consistently close to zero': over three years they could rule out gains larger than about 0.007 standard deviations. High schools saw a small rise in math; middle schools saw small declines. In Norway, Sara Abrahamsson found bans had 'no average effect on education or mental health.' The older English study that made bans popular compared schools that chose their own policies, and schools that ban phones may differ in other ways from those that do not. A policy now covering most of the country's students should show more than this.",
      proponent_rebuttal:
        "Where gains appear, they go to the students who need them most. Louis-Philippe Beland and Richard Murphy found exam results in English schools rose about 0.07 standard deviations after bans, 'driven by the lowest-achieving students.' In a large Florida district, David Figlio and Umut Özek found test scores improved significantly in the second year of a ban, and that bans 'significantly reduce student unexcused absences,' which may explain much of the gain. Norway's bans raised girls' grades and their entry to academic high school tracks, most for girls from disadvantaged backgrounds. Even the national pouch study found high-school math rising about 0.024 standard deviations, about a fifth of the gain from a better teacher, at almost no cost. Bans also change the room: teachers in pouch schools reported the share of students using phones for personal reasons in class falling from 61% to 13%. Three years is a short time for a culture change to reach test scores.",
      crux: {
        id: "phone-ban-causal-impact",
        title: "The Achievement Test",
        question:
          "Are test-score gains after phone bans caused by the bans, or by differences between schools that adopt them?",
        description:
          "Schools that choose to ban phones may also be changing other things, and early studies compared schools that chose with schools that did not. Statewide bans, where every school changes at once, and staggered national adoption with comparison schools, come closer to the ban's own effect.",
        methodology:
          "Staggered difference-in-differences across schools adopting pouches or bans at different times, checked for pre-existing trends; comparisons across state lines when statewide bell-to-bell laws take effect; randomized assignment of ban start dates within districts where possible; outcomes on state tests, attendance and grades for at least three years.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "State test scores, attendance and grades for at least three years after statewide bell-to-bell bans took effect, compared with similar schools across state lines that had no ban, and broken out for the lowest-achieving students and for middle versus high schools.",
        },
        cost_to_verify: "$500K-$3M (analysis of state test and attendance records)",
        falsification: {
          supporter_flip:
            "If three or more years of statewide bans showed no rise in test scores or attendance against comparable schools without bans, including among the lowest-achieving students, the academic case would fall back on classroom calm alone.",
          skeptic_flip:
            "If statewide bans produced clear gains in scores and attendance that grew over time and concentrated among low-achieving students, the reading that bans do little for learning would be hard to hold.",
          common_ground:
            "Both sides agree bans sharply cut phone use in class, and that any average effect on test scores found so far is small.",
          live_disagreement:
            "Whether the small, uneven gains reflect a weak policy, a short time horizon, or the wrong measure, and whether calmer classrooms are worth having even if scores barely move.",
        },
      },
      evidence: [
        {
          id: "national-pouch-study",
          title: "NBER 2026: In 40,542 US Schools, Pouch Bans Cut In-Class Phone Use but Average Test Effects Were 'Close to Zero'",
          description:
            "Using a staggered difference-in-differences design with GPS pings, a large teacher survey, state test scores and Yondr's sales records, the authors found pouch adoption 'substantially reduces phone use': teachers reported the share of students using phones for personal reasons in class falling from 61% to 13%, and GPS pings on campus fell about 30% by the third year. 'For academic achievement, average effects on test scores are consistently close to zero'; the study rules out gains larger than about 0.007 standard deviations over three years. High schools saw modest positive effects, about 0.024 standard deviations in math, and middle schools small negative effects. There was little evidence of effects on attendance and 'no clear evidence of improvements in self-reported classroom attention.' Nearly 5,000 schools used pouches by 2026.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 7,
            directness: 9,
          },
          source:
            "Allcott, Baron, Dee, Duckworth, Gentzkow & Jacob, 'The Effects of School Phone Bans: National Evidence from Lockable Pouches,' NBER Working Paper 35132 (April 2026, revised September 2026)",
          sourceUrl: "https://www.nber.org/papers/w35132",
          reasoning:
            "The largest and most recent study, preregistered, by leading economists. It studies one strict kind of ban, has at most three years of follow-up, and relied on Yondr's data with the company's cooperation; it is a working paper not yet peer reviewed.",
        },
        {
          id: "lse-phone-ban-study",
          title: "Beland & Murphy 2016: Exam Results in English Schools Rose About 0.07 Standard Deviations After Bans, Driven by the Lowest Achievers",
          description:
            "Surveying schools in four English cities about their phone policies and linking the answers to national exam records, the authors found that 'student performance in high stakes exams significantly increases post ban, by about 0.07 standard deviations on average,' and that 'these increases in performance are driven by the lowest-achieving students.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Beland & Murphy, 'Ill Communication: Technology, distraction & student performance,' Labour Economics 41: 61-76 (2016)",
          sourceUrl: "https://ideas.repec.org/a/eee/labeco/v41y2016icp61-76.html",
          reasoning:
            "The study that launched the policy, in a peer-reviewed journal. Schools chose their own policies, so other changes could explain part of the gain, and its phones were less capable than today's.",
        },
        {
          id: "florida-district-study",
          title: "Figlio & Özek 2025: Florida District's Ban Raised Test Scores in Its Second Year and Cut Unexcused Absences",
          description:
            "Using student records from a large Florida district and building-level phone-use data, the authors found that test scores improved significantly in the second year of the district's classroom phone ban, after no significant change in the first, and that 'cellphone bans in schools significantly reduce student unexcused absences,' which may account for much of the gain. Effects were larger in middle and high schools, where smartphone ownership is more common.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Figlio & Özek, 'The Impact of Cellphone Bans in Schools on Student Outcomes: Evidence from Florida,' NBER Working Paper 34388 (October 2025)",
          sourceUrl: "https://www.nber.org/papers/w34388",
          reasoning:
            "A careful causal study of a whole district, by respected education economists. It is one district, a working paper, and its gains show up only in the second year.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: What a School-Day Ban Can Do for Mental Health
    // =========================================================================
    {
      id: "mental-health",
      title: "Can a School-Day Ban Help Students' Mental Health?",
      short_summary:
        "A ban covers six or seven hours, not evenings or weekends. In England, students at schools with strict policies were no better off than students at schools without them. In Norway, girls under bans needed less mental health care and bullying fell. In the US pouch study, well-being dipped in the first year and rose after.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "A ban limited to school hours barely touches the problem. In 30 English secondary schools, Victoria Goodyear's team found students at schools with restrictive policies used phones about 40 minutes less during school but no less overall on weekdays or weekends, and their mental well-being was no different: 'no evidence of a difference between groups.' The authors concluded the findings 'do not provide evidence to support the use of school policies that prohibit phone use during the school day in their current form.' The US pouch study found well-being fell in the first year of a ban, and no clear improvement in perceived online bullying. Use moves to the walk home and the evening. A school ban can become a way for adults to look busy while the drivers of student distress go unaddressed.",
      proponent_rebuttal:
        "Six or seven phone-free hours change what happens at lunch, between classes and in the corridors, and the evidence that follows students long enough finds gains. Norway's bans reduced girls' use of psychological health care and lowered bullying for both boys and girls. In the national pouch study, well-being dipped about 0.2 standard deviations in the year of adoption, as students adjusted, then rose about 0.16 standard deviations by the second year, larger than the gain from a month off Facebook. The English study was a one-time snapshot comparing schools that chose different policies, not a before-and-after test. A ban is not meant to fix everything; it gives students part of each day free of the feed, and lets the ones who struggle most have it without having to choose it themselves.",
      crux: {
        id: "phone-ban-mental-health-impact",
        title: "The School-Day Mental Health Test",
        question:
          "Can a ban that covers only the school day measurably improve students' mental health?",
        description:
          "A school-hours ban could help through less harassment, more face-to-face time and a break from the feed, or leave mental health unchanged while evening and weekend use goes on. Following the same students from before a ban to two or more years after, against students whose schools did not change, separates the ban's effect from the first-year disruption.",
        methodology:
          "Cluster-randomized or staggered-adoption studies following the same students for at least two years, scoring depression (PHQ-A), anxiety (GAD-7), loneliness and bullying, alongside phone-logged total use to see whether school-hour reductions are made up in the evening.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Follow the same students from before a ban to at least two years after, against students whose schools kept phones, scoring depression (PHQ-A), anxiety (GAD-7), loneliness and bullying, with phone-logged evening use to see whether the school-hours reduction is made up later in the day.",
        },
        cost_to_verify: "$5-12M (multi-school longitudinal or randomized study)",
        falsification: {
          supporter_flip:
            "If students followed for two or more years after a ban showed no lower depression, anxiety or bullying than comparable students without one, and made up their school-hour use in the evening, the mental health case for bans would fall away.",
          skeptic_flip:
            "If those students showed lower anxiety, loneliness and bullying by the second year, with no rise in evening use, the view that a school-day ban cannot move mental health would be hard to hold.",
          common_ground:
            "Both sides agree a school ban leaves evening and weekend use untouched, and that the first year of a strict ban can be disruptive.",
          live_disagreement:
            "Whether the later gains in some studies are real effects of the ban or artifacts of short panels and self-selection, and whether six or seven phone-free hours can matter when use continues at home.",
        },
      },
      evidence: [
        {
          id: "smart-schools-england",
          title: "Lancet Regional Health 2025: Students at 20 Strict-Policy English Schools Were No Better Off Than at 10 Permissive Ones",
          description:
            "The SMART Schools study surveyed 1,227 students aged 12 to 15 at 30 English secondary schools, 20 that did not permit recreational phone use and 10 that did. Students at restrictive schools used phones about 0.67 hours less and social media about 0.54 hours less during school time, with no evidence of a difference on weekdays or weekends overall. Mental well-being showed 'no evidence of a difference between groups.' The authors concluded the findings 'do not provide evidence to support the use of school policies that prohibit phone use during the school day in their current form.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Goodyear et al., 'School phone policies and their association with mental wellbeing, phone use, and social media use (SMART Schools): a cross-sectional observational study,' The Lancet Regional Health - Europe (4 February 2025)",
          sourceUrl:
            "https://research.birmingham.ac.uk/en/publications/school-phone-policies-and-their-association-with-mental-wellbeing/",
          reasoning:
            "A peer-reviewed study with validated measures. It is a single snapshot comparing schools that chose different policies, not a before-and-after test, and permissive schools were the minority of its sample.",
        },
        {
          id: "norway-gender-differential",
          title: "Abrahamsson 2026: Norway's Bans Cut Girls' Psychological Care and Bullying, With No Average Effect",
          description:
            "Combining Norwegian health and school records with a survey of middle schools' phone policies, Sara Abrahamsson found bans had 'no average effect on education or mental health but masks important gender differences.' Bans reduced girls' use of psychological health care, lowered bullying for both boys and girls, and improved girls' grades and placement in academic tracks, with the gains for girls concentrated among those from disadvantaged backgrounds.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 7,
          },
          source:
            "Sara Abrahamsson, 'Smartphone Bans, Student Outcomes and Mental Health,' Journal of Human Resources (published online 11 March 2026)",
          sourceUrl: "https://jhr.uwpress.org/node/16076",
          reasoning:
            "Uses health records rather than self-report, in a peer-reviewed economics journal. Both sides cite it: supporters for the girls' gains, skeptics for the null average. Norwegian schools differ from US ones.",
        },
        {
          id: "pouch-wellbeing-dynamics",
          title: "NBER 2026: Well-Being Fell About 0.2 SD in a Pouch Ban's First Year, Then Rose About 0.16 SD by the Second",
          description:
            "In the national study of Yondr pouch adoption, student-reported subjective well-being 'declines in the year of adoption and then rebounds, becoming positive by the second post-adoption year': a drop of roughly 0.2 standard deviations followed by an increase of 0.16. The authors compare this with the 0.09 standard deviation gain from four weeks off Facebook, and say they 'interpret this pattern cautiously' because the short panel limits their ability to separate effects over time from differences between cohorts. They found no clear evidence of improvement in perceived online bullying.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 5,
            directness: 7,
          },
          source:
            "Allcott, Baron, Dee, Duckworth, Gentzkow & Jacob, NBER Working Paper 35132 (April 2026, revised September 2026)",
          sourceUrl: "https://www.nber.org/papers/w35132",
          reasoning:
            "The largest dataset on bans and well-being. The authors themselves call the pattern suggestive, the well-being data come from school surveys with uneven coverage, and the first-year drop cuts the other way.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Implementation & Equity Concerns
    // =========================================================================
    {
      id: "implementation-equity",
      title: "Can Bans Be Enforced Fairly?",
      short_summary:
        "Strict bans bring a first-year rise in suspensions: about 15% in the national pouch study, and in Florida a jump that fell hardest on Black students. In both studies the rise faded after the first year. Students who need phones for medical devices, translation or safety need exceptions that work.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A ban creates a new rule to break, and the punishment falls unevenly. In the Florida district Figlio and Özek studied, enforcement 'initially increased suspensions, especially among Black students,' and the national pouch study found disciplinary incidents rose in the year of adoption, about a 15% increase in suspension rates. A suspension costs a student days of learning, the opposite of what the ban promises. Some students depend on phones for continuous glucose monitors, for translating for their parents, or for getting home safely, and every exception process adds paperwork and stigma. Pouches are an added cost for underfunded schools. And parents fear being cut off from their children in an emergency.",
      proponent_rebuttal:
        "The discipline spike is a first-year cost, not a permanent one: in Florida the disciplinary effect 'began to dissipate after the first year,' and in the national study disciplinary effects 'fade' in later years. The students most harmed by phone distraction are the low-achieving ones who gain most when it is gone, as Beland and Murphy and the Norwegian study found. Schools already handle insulin, inhalers and EpiPens; phone-linked medical devices can be exempted the same way, and emergencies can run through the office, as they did for decades. A uniform rule enforced by pouches, which every student uses, leaves less room for teachers' discretion than a rule enforced by confiscation, and discretion is where bias enters. By March 2026, 33 states had written bans into law.",
      crux: {
        id: "equitable-enforcement-test",
        title: "The Fair Enforcement Test",
        question:
          "Can phone bans be enforced without new racial disparities, while accommodating students who need phones?",
        description:
          "Track discipline by race, disability and English-learner status from before a ban through its first three years, and compare designs, pouches and lockers against teacher confiscation, to see whether the first-year spike leaves a lasting gap and which designs avoid it.",
        methodology:
          "Analyse disciplinary records in districts with at least three years of bans, by race, disability and English-learner status, against pre-ban baselines and against districts without bans; compare pouch, locker and confiscation designs; survey students with medical, translation or safety needs about whether exceptions worked.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Disciplinary records by race, disability and English-learner status from before a ban through its third year, in districts using pouches, lockers or teacher confiscation, compared with districts without bans, plus surveys of students who need phones for medical or safety reasons.",
        },
        cost_to_verify: "$500K-1.5M (multi-district disciplinary data analysis with student surveys)",
        falsification: {
          supporter_flip:
            "If discipline records showed the racial gap in phone-related suspensions persisting past the first year, or students with medical and safety needs routinely denied working exceptions, the equity cost would weigh heavily against the academic gains.",
          skeptic_flip:
            "If records showed the first-year rise in suspensions fading for every group, with no lasting gap and working exceptions for students who need phones, the equity objection would lose its footing.",
          common_ground:
            "Both sides agree strict bans raise suspensions in their first year, that the rise has fallen harder on Black students in at least one district, and that some students need their phones for medical or safety reasons.",
          live_disagreement:
            "Whether a temporary rise in suspensions, falling unevenly, is a fair price for the ban's benefits, and whether design choices such as pouches can prevent it.",
        },
      },
      evidence: [
        {
          id: "school-discipline-disparities",
          title: "Figlio & Özek 2025: Florida Ban Raised Suspensions, Especially for Black Students, Before Fading After Year One",
          description:
            "In the Florida district the authors studied, enforcing the cellphone ban initially increased student suspensions, especially among Black students, but the effect faded after the first year, while unexcused absences fell and test scores rose in the second year.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Figlio & Özek, 'The Impact of Cellphone Bans in Schools on Student Outcomes: Evidence from Florida,' NBER Working Paper 34388 (October 2025)",
          sourceUrl: "https://www.nber.org/papers/w34388",
          reasoning:
            "The first direct measure of the equity cost critics predicted. It is one district, and the same study finds the cost temporary and the academic gains real, so both sides cite it.",
        },
        {
          id: "pouch-discipline-spike",
          title: "NBER 2026: Pouch Adoption Raised Suspension Rates About 15% in the First Year, Then the Effect Faded",
          description:
            "In the national study of Yondr pouch adoption, disciplinary incidents rose in the year of adoption by about 0.03 student-level standard deviations, 'roughly a 15 percent increase in suspension rates (in-school or out-of-school),' and 'this effect fades in subsequent years.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source:
            "Allcott, Baron, Dee, Duckworth, Gentzkow & Jacob, NBER Working Paper 35132 (April 2026, revised September 2026)",
          sourceUrl: "https://www.nber.org/papers/w35132",
          reasoning:
            "A national measure of the enforcement cost, from the largest study. It reports the overall rise; the abstract does not break the rise down by race, which is the comparison the equity question needs.",
        },
        {
          id: "state-ban-laws",
          title: "Ballotpedia March 2026: 33 States Have K-12 Phone Bans in Law; 41 Have Some Phone Law",
          description:
            "When Kansas's governor signed a bell-to-bell ban on 20 March 2026, Kansas became the 33rd state with a law barring students from using phones in class or for the whole school day. Forty-one states had passed some law addressing phones in schools; eight only encouraged limits or required districts to adopt a technology policy. Indiana expanded its limit to a bell-to-bell ban, while North Carolina's covers instructional time.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 2,
          },
          source:
            "Ballotpedia News, 'Kansas becomes thirty-third state to enact a K-12 cellphone ban' (26 March 2026)",
          sourceUrl:
            "https://news.ballotpedia.org/2026/03/26/kansas-becomes-thirty-third-state-to-enact-a-k-12-cellphone-ban/",
          reasoning:
            "Shows how widely parents, teachers and legislators have backed bans. Adoption is not evidence that bans work or are enforced fairly, so directness is very low.",
        },
      ],
    },
  ],
  references: [
    {
      title: "The Effects of School Phone Bans: National Evidence from Lockable Pouches - NBER Working Paper 35132 (2026)",
      url: "https://www.nber.org/papers/w35132",
    },
    {
      title: "The Impact of Cellphone Bans in Schools on Student Outcomes: Evidence from Florida - NBER Working Paper 34388 (2025)",
      url: "https://www.nber.org/papers/w34388",
    },
    {
      title: "School phone policies and their association with mental wellbeing, phone use, and social media use (SMART Schools) - The Lancet Regional Health - Europe (2025)",
      url: "https://research.birmingham.ac.uk/en/publications/school-phone-policies-and-their-association-with-mental-wellbeing/",
    },
    {
      title: "Smartphone Bans, Student Outcomes and Mental Health - Abrahamsson, Journal of Human Resources (2026)",
      url: "https://jhr.uwpress.org/node/16076",
    },
    {
      title: "Ill Communication: Technology, distraction & student performance - Beland & Murphy, Labour Economics (2016)",
      url: "https://ideas.repec.org/a/eee/labeco/v41y2016icp61-76.html",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Are phone bans treating symptoms while ignoring the disease?",
      content:
        "A school ban covers six or seven hours of a student's day. Students return to the same devices and platforms after school, and the English SMART Schools study found students at strict schools used phones no less overall. Should policy focus on the school day, or on the platforms themselves through age limits, design rules and parental controls?",
    },
    {
      id: "q2",
      title: "Should high schools and middle schools get the same rule?",
      content:
        "The national pouch study found modest math gains in high schools and small declines in middle schools, and Florida's gains were larger in middle and high schools where more students own smartphones. Older teens are learning to manage their own use; younger ones may need firmer limits. Should the rule differ by grade?",
    },
    {
      id: "q3",
      title: "Will phone bans become obsolete as technology evolves?",
      content:
        "Smartwatches, wireless earbuds and other wearables let students reach the same apps without a phone in hand. A ban that does not cover these devices may not hold for long, while AI tutoring tools on phones may become useful enough to justify classroom use. Is a phone ban a durable policy or a temporary measure?",
    },
  ],
};
