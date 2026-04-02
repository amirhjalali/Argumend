export const schoolPhoneBansData = {
  id: "school-phone-bans",
  title: "Should Schools Ban Smartphones?",
  meta_claim:
    "Banning smartphones in schools significantly improves student academic performance, mental health, and social development.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Academic Performance & Attention
    // =========================================================================
    {
      id: "academic-performance",
      title: "Academic Performance & Attention",
      short_summary:
        "Studies in multiple countries show that phone bans improve test scores, particularly for low-performing students. However, effect sizes vary widely, and some research suggests the distraction comes from the social dynamics around phones, not the devices themselves.",
      icon_name: "FileText" as const,
      skeptic_premise:
        "The academic evidence for phone bans is weaker and more nuanced than advocates claim. The most-cited study — Beland and Murphy's analysis of English schools — found test score improvements equivalent to one additional week of schooling per year, but only for below-average students; high-performing students showed no benefit. A 2023 UNESCO report acknowledged potential benefits but warned that bans may be 'a blunt instrument' that fails to address the underlying issue of digital literacy. Norwegian research found that phone bans improved grades for girls but had no significant effect for boys. Students in ban-enforcing schools often report increased anxiety about not being able to check notifications, suggesting the problem is psychological dependency that a ban does not treat. The real solution is teaching self-regulation and digital citizenship, not prohibition.",
      proponent_rebuttal:
        "The evidence base for phone bans is growing and increasingly robust. A landmark London School of Economics study found that banning phones improved test scores by 6.4% of a standard deviation overall — equivalent to adding five extra school days per year — with effects twice as large for low-achieving students and students with special educational needs. France banned phones in all schools for students under 15 in 2018, and follow-up assessments showed improved classroom engagement. Australia's state of Victoria implemented a ban in 2020 and reported reduced cyberbullying incidents by 46%. In the US, a 2024 National Center for Education Statistics survey found that 77% of teachers reported student phone use as a significant distraction. The distraction is not theoretical — brain imaging studies show that mere proximity to a phone reduces available cognitive capacity, even when the phone is turned off.",
      crux: {
        id: "phone-ban-causal-impact",
        title: "The Randomized Phone Ban Trial",
        description:
          "The definitive test is whether phone bans cause academic improvement or merely correlate with it due to confounding factors (e.g., schools that implement bans may also be implementing other reforms). A large-scale randomized controlled trial — randomly assigning schools to ban or no-ban conditions — would isolate the causal effect. The existing evidence relies on natural experiments and quasi-experimental designs with potential selection bias.",
        methodology:
          "Randomly assign 200 schools (100 treatment, 100 control) across diverse socioeconomic contexts to implement a strict phone ban (phones locked in pouches at arrival) versus a permissive phone policy for a full academic year. Measure standardized test scores, classroom engagement (via trained observer coding), disciplinary incidents, and attendance. Include pre-treatment covariates to ensure balance. Stratify randomization by school socioeconomic status to analyze heterogeneous effects.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$3-8M (Multi-school randomized trial with assessment infrastructure, requiring school district cooperation)",
      },
      evidence: [
        {
          id: "lse-phone-ban-study",
          title: "London School of Economics: Phone Bans Improve Test Scores by 6.4% of a Standard Deviation (2015)",
          description:
            "Beland and Murphy at the London School of Economics analyzed phone ban policies across 91 schools in four English cities from 2001 to 2013, covering 130,000 students. They found that phone bans increased test scores by 6.4% of a standard deviation overall, equivalent to adding five extra days of schooling per year. The effect was driven entirely by improvements among below-average students (12.6% of a standard deviation) and students with special educational needs (14.3%). High-performing students showed no significant benefit.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "Beland & Murphy, Labour Economics (2016)",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0927537116000227",
          reasoning:
            "Published in a peer-reviewed economics journal with a large sample size and difference-in-differences methodology. The finding that low-performing students benefit most is policy-relevant and has been cited by governments worldwide. However, the study period (2001-2013) predates the smartphone era — early phones were far less capable than modern smartphones with social media, which could mean current effects are larger, or that the ban dynamics are different.",
        },
        {
          id: "cognitive-capacity-proximity",
          title: "Mere Proximity to a Smartphone Reduces Cognitive Capacity (Ward et al., 2017)",
          description:
            "A University of Texas study by Adrian Ward and colleagues demonstrated that the mere presence of a smartphone — even when turned off and placed face-down — reduced available cognitive capacity. In two experiments with 800 participants, those with phones in another room significantly outperformed those with phones on their desk or in their pocket on tests of working memory and fluid intelligence. The researchers termed this 'brain drain' — the cognitive cost of resisting the urge to check the phone consumes mental resources that would otherwise be available for the task at hand.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 8,
          },
          source: "Ward et al., Journal of the Association for Consumer Research (2017)",
          sourceUrl: "https://www.journals.uchicago.edu/doi/10.1086/691462",
          reasoning:
            "Published in a peer-reviewed journal with a clean experimental design. The finding that even a powered-off phone reduces cognition is striking and directly supports bans (not just 'phones on silent' policies). Partial replications have produced mixed results, with some studies finding smaller effects, suggesting the original estimates may be at the upper bound.",
        },
        {
          id: "norway-gender-differential",
          title: "Norwegian Study: Phone Bans Improve Girls' Grades but Not Boys' (2023)",
          description:
            "A 2023 study of Norwegian middle schools by Abrahamsson found that phone bans improved GPA for girls by approximately 0.04 standard deviations but had no statistically significant effect on boys' grades. Girls also showed improvements in psychological well-being, while boys did not. The study analyzed data from 2010 to 2020 across hundreds of schools using a staggered adoption design. The gender differential was robust across specifications and school types, suggesting that the mechanisms of phone distraction may differ by gender — potentially related to social media use patterns.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source: "Abrahamsson, 'The Effect of Mobile Phone Bans on Academic Achievement' (2023)",
          sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4528768",
          reasoning:
            "Uses a rigorous quasi-experimental design with a large dataset. The gender differential finding is nuanced and important for policy design — a universal ban may not benefit all students equally. The effect size for girls, while statistically significant, is modest. The null result for boys suggests that for half the student population, phone bans may not improve academic outcomes.",
        },
        {
          id: "unesco-caution",
          title: "UNESCO Warns Phone Bans Are a 'Blunt Instrument' Without Digital Literacy Education (2023)",
          description:
            "The 2023 UNESCO Global Education Monitoring Report, covering data from 200 countries, found that while one in four countries had enacted some form of school phone ban, the evidence for their effectiveness was mixed. The report stated that 'banning technology from schools has the same logic as banning cars from roads' and warned that prohibition without digital literacy education fails to prepare students for a technology-saturated world. UNESCO recommended that bans should be paired with curriculum on responsible technology use and that older students should learn to self-regulate rather than be subjected to blanket prohibition.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 7,
          },
          source: "UNESCO Global Education Monitoring Report 2023",
          sourceUrl: "https://www.unesco.org/gem-report/en/technology",
          reasoning:
            "UNESCO is an authoritative international body with a comprehensive global perspective. The report does not oppose phone bans outright but frames them as insufficient without complementary education. The analogy to banning cars is provocative but imperfect — students are not driving cars in classrooms. The evidence review is broad but may underweight the strongest quasi-experimental studies.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Mental Health & Social Development
    // =========================================================================
    {
      id: "mental-health",
      title: "Mental Health & Social Development",
      short_summary:
        "Teen mental health has deteriorated dramatically since 2012, coinciding with smartphone adoption. Advocates argue phone bans during school hours provide critical respite from social media pressure. Critics contend the correlation overstates the causal role of phones versus deeper socioeconomic factors.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "The 'smartphones caused the teen mental health crisis' narrative promoted by Jonathan Haidt and others relies primarily on correlational evidence. A comprehensive meta-analysis by Andrew Przybylski at the Oxford Internet Institute found that the association between screen time and well-being was 'tiny' — smaller than the effect of regularly wearing glasses or eating potatoes. Teen depression rates began rising before smartphone saturation. The crisis is international, affecting countries with different phone cultures. School phone bans address 6-7 hours of a 16-hour waking day and do nothing about evening and weekend use, which is when most social media-related harm occurs. Banning phones in schools is a feel-good policy that lets adults avoid addressing the real drivers of teen distress: academic pressure, economic insecurity, climate anxiety, and social isolation that predates smartphones.",
      proponent_rebuttal:
        "The correlation between smartphone adoption and teen mental health decline is too strong, too consistent, and too global to dismiss. Between 2012 and 2022, teen depression rates in the US doubled, self-harm hospitalizations for girls aged 10-14 tripled, and teen suicide rates increased 60%. This inflection point coincides precisely with when smartphone ownership among teens crossed 50% and social media use became ubiquitous. Jonathan Haidt's meta-analysis of 40+ studies in 'The Anxious Generation' found consistent harmful effects of social media on teen girls' mental health, with effect sizes comparable to lead exposure. School phone bans do not solve the problem but provide 6-7 hours of daily respite — a 'phone-free sanctuary' — during the developmental period when face-to-face social interaction is most critical. Australia's state of Victoria reported a 46% reduction in cyberbullying incidents after implementing a school phone ban.",
      crux: {
        id: "phone-ban-mental-health-impact",
        title: "The School Phone Ban Mental Health Assessment",
        description:
          "If school phone bans measurably improve student mental health outcomes — validated depression and anxiety scores, self-harm rates, peer relationship quality — the case for bans is strengthened beyond academic arguments alone. If mental health outcomes do not change, the ban is justified only on academic grounds, and the mental health crisis requires different interventions.",
        methodology:
          "Conduct a pre-registered cluster-randomized trial across 150 schools, measuring validated mental health instruments (PHQ-A for depression, GAD-7 for anxiety, UCLA Loneliness Scale) at baseline, mid-year, and end-of-year. Include a cyberbullying module and peer relationship assessment. Compare phone-ban schools against control schools and against schools implementing digital literacy programs without bans. Follow cohorts for 2 years to assess persistence of effects.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$5-12M (Multi-school cluster-randomized trial with validated mental health assessment and 2-year follow-up)",
      },
      evidence: [
        {
          id: "teen-depression-doubling",
          title: "US Teen Depression Rates Doubled Between 2012 and 2022",
          description:
            "CDC Youth Risk Behavior Survey data shows that the percentage of US high school students reporting persistent feelings of sadness or hopelessness increased from 26% in 2011 to 42% in 2021. Among girls, the rate rose from 36% to 57%. Emergency department visits for self-harm among girls aged 10-14 tripled between 2009 and 2021. Teen suicide rates increased approximately 60% from 2007 to 2021. The inflection point in virtually every trend occurs between 2011 and 2013, coinciding with when smartphone ownership among US teens crossed 50% (2012) and Instagram reached mass teen adoption.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "CDC Youth Risk Behavior Survey; CDC WISQARS; National Institute of Mental Health",
          sourceUrl: "https://www.cdc.gov/healthyyouth/data/yrbs/index.htm",
          reasoning:
            "CDC data is the gold standard for US adolescent health surveillance, collected biennially from nationally representative samples. The trend is unambiguous and alarming. However, correlation with smartphone adoption does not establish causation — the same period saw increases in academic pressure, income inequality, climate anxiety, the opioid crisis, and social isolation. The directness score reflects that school phone bans address only one hypothesized causal factor.",
        },
        {
          id: "przybylski-small-effect",
          title: "Oxford Study: Screen Time Association with Well-Being Is Smaller Than Eating Potatoes (2019)",
          description:
            "Andrew Przybylski and Amy Orben at the Oxford Internet Institute analyzed data from 355,358 adolescents and found that the negative association between screen time and well-being was 'tiny' — explaining only 0.4% of the variation in well-being. They placed this in context by showing that the negative association between wearing glasses and well-being (0.2%) and between eating potatoes and well-being (0.3%) were nearly as large. They concluded that 'the effects of technology use are not distinguishable from other everyday activities' and criticized prior studies for cherry-picking analytical approaches.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Orben & Przybylski, Nature Human Behaviour (2019)",
          sourceUrl: "https://www.nature.com/articles/s41562-018-0506-1",
          reasoning:
            "Published in a top journal with a massive dataset and transparent specification curve analysis. The tiny effect size is an important counter to moral panic. However, the study measured total screen time (including educational use, passive video watching) rather than specifically social media use — which Haidt and Twenge argue is where the harm concentrates. Aggregating all screen time may dilute the signal from the most harmful categories.",
        },
        {
          id: "victoria-cyberbullying-reduction",
          title: "Victoria, Australia Reports 46% Reduction in Cyberbullying After School Phone Ban (2020-2022)",
          description:
            "The state of Victoria, Australia, implemented a blanket smartphone ban in all public schools in 2020, requiring students to store phones in lockers or hand them in at the start of the day. By 2022, the Victorian Department of Education reported a 46% reduction in cyberbullying incidents during school hours, a 30% decrease in confiscation-related disciplinary events, and positive teacher survey responses (78% of teachers reported improved classroom focus). Student surveys showed 65% initially opposed the ban but 58% supported it after one year of implementation.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Victorian Department of Education; The Age (Melbourne); ABC News Australia",
          sourceUrl: "https://www.vic.gov.au/mobile-phones-schools",
          reasoning:
            "Government-reported data from a large-scale state-wide implementation with thousands of schools. The 46% cyberbullying reduction during school hours is significant. However, the data is self-reported by the implementing government (lowering independence), and the ban coincided with COVID-19 disruptions in 2020-2021, complicating causal attribution. The shift in student opinion from opposition to support is notable.",
        },
        {
          id: "haidt-anxious-generation",
          title: "Jonathan Haidt's 'The Anxious Generation': Social Media Is the Primary Driver of Teen Mental Health Crisis",
          description:
            "Social psychologist Jonathan Haidt's 2024 book 'The Anxious Generation' synthesizes evidence from over 40 studies arguing that the shift from a 'play-based' to a 'phone-based' childhood is the primary cause of the teen mental health crisis. Haidt identifies four harms: social deprivation (replacing in-person interaction), sleep deprivation, attention fragmentation, and addiction. He advocates four reforms: no smartphones before 14, no social media before 16, phone-free schools, and more unsupervised play. The book became a #1 New York Times bestseller and influenced legislation in multiple US states and Australia.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Jonathan Haidt, 'The Anxious Generation' (2024); after-debate.com collaborative review",
          sourceUrl: "https://www.anxiousgeneration.com/research",
          reasoning:
            "Haidt is a respected social psychologist and the book is extensively cited. However, academic critics including Przybylski and Orben have challenged his evidence synthesis, arguing he selectively cites studies supporting his thesis while downplaying conflicting evidence. The book is advocacy literature, not a peer-reviewed meta-analysis. Its cultural impact on policy has outpaced the scientific consensus.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Implementation & Equity Concerns
    // =========================================================================
    {
      id: "implementation-equity",
      title: "Implementation & Equity Concerns",
      short_summary:
        "Practical implementation of phone bans raises equity issues: some students rely on phones for safety, translation, medical monitoring, and communication with working parents. Enforcement creates new disciplinary burdens that may disproportionately affect students of color.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Phone bans create equity problems that their advocates ignore. Students with diabetes use continuous glucose monitors connected to smartphones. Undocumented students' parents rely on phones to communicate emergency immigration information. Students in unsafe neighborhoods need phones for safety during travel to and from school. ESL students use translation apps to participate in class. LGBTQ+ students use phones as a lifeline to support communities outside their potentially hostile school environment. Enforcement creates a new category of disciplinary infraction that — based on decades of evidence about school discipline disparities — will disproportionately target Black and Latino students. A blanket ban treats all phone use as equivalent, ignoring that the device is essential infrastructure for vulnerable students.",
      proponent_rebuttal:
        "Every equity concern raised against phone bans has a practical accommodation. Medical devices like CGMs can be exempted (most can operate independently of a smartphone). Emergency communication can be routed through the school office, as it was for decades before smartphones. Translation tools can be provided on school-issued devices. Phone pouch systems (like Yondr) enforce bans uniformly, eliminating discriminatory enforcement. Schools already manage policies about dress codes, food, and other items — phones are not uniquely unmanageable. The equity argument actually cuts the other way: the students most harmed by phone distraction are low-income students and students of color, who show the largest test score gains from bans according to the LSE study. Opposing phone bans in the name of equity paradoxically protects the status quo that most harms disadvantaged students.",
      crux: {
        id: "equitable-enforcement-test",
        title: "The Equitable Enforcement Assessment",
        description:
          "If phone bans can be implemented without creating racially disproportionate disciplinary outcomes and without disadvantaging students who depend on phones for medical, safety, or accessibility needs, the equity objection is addressed. If enforcement data shows racial disparities comparable to other school discipline areas (3x overrepresentation of Black students), the ban creates a new inequity that must be weighed against academic benefits.",
        methodology:
          "Analyze disciplinary records from 100 schools that have implemented phone bans for at least one year, comparing infraction rates and consequences by race, ethnicity, disability status, and English learner status. Use pre-ban disciplinary baselines to determine whether phone-related infractions create new disparities or reflect existing patterns. Interview students with accommodation needs (medical devices, safety concerns, translation) about their experiences under the ban. Compare Yondr-pouch schools (automated enforcement) against teacher-enforced ban schools for equity outcomes.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1.5M (Multi-district disciplinary data analysis with student interviews and equity assessment)",
      },
      evidence: [
        {
          id: "school-discipline-disparities",
          title: "Black Students Are 3x More Likely to Be Suspended: Risk of Discriminatory Phone Ban Enforcement",
          description:
            "Data from the US Department of Education's Office for Civil Rights shows that Black students are 3.2x more likely to be suspended than white students, a disparity that persists even after controlling for behavior and socioeconomic status. Research by the American Psychological Association found that these disparities are driven by implicit bias in teacher discipline decisions, not differences in student behavior. Critics of phone bans argue that adding a new disciplinary category — phone confiscation — will replicate this pattern, with teachers more likely to notice and punish phone use by students of color.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "US Department of Education Office for Civil Rights; American Psychological Association; GAO",
          sourceUrl: "https://ocrdata.ed.gov/",
          reasoning:
            "OCR discipline data is the authoritative source on school discipline disparities and the 3.2x figure is well-established. The concern that phone bans would replicate this pattern is reasonable but speculative — it has not been directly measured. Yondr-pouch systems that remove teacher discretion from enforcement may mitigate this concern. The directness score reflects that this evidence is about discipline generally, not phone bans specifically.",
        },
        {
          id: "yondr-pouch-implementation",
          title: "Yondr Phone Pouches Used in 2,000+ Schools: Uniform Enforcement Model",
          description:
            "Yondr, a company that manufactures lockable phone pouches, has been adopted by over 2,000 schools worldwide as of 2024. Students place their phones in magnetically sealed pouches at school entry, which are unlocked at departure. Schools using Yondr report higher compliance rates than teacher-enforced policies and fewer disciplinary conflicts. San Lorenzo High School in California reported a 95% reduction in phone-related incidents and teachers described 'dramatically improved' classroom engagement. However, Yondr pouches cost $25-30 per student annually, creating a budget issue for underfunded schools.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 8,
            directness: 8,
          },
          source: "Yondr; Education Week; San Lorenzo USD reports",
          sourceUrl: "https://www.overyondr.com/schools",
          reasoning:
            "Yondr's widespread adoption demonstrates practical feasibility of phone bans. The automated enforcement mechanism addresses equity concerns about teacher discretion. However, the primary data source is the company itself, significantly reducing independence. Independent evaluations of Yondr's effects are limited. The $25-30 per student cost, while modest, adds up for large districts and must compete with other budget priorities.",
        },
        {
          id: "medical-device-accommodations",
          title: "Students with Diabetes and Other Conditions Require Smartphone Access for Health Monitoring",
          description:
            "Approximately 283,000 Americans under 20 have diagnosed diabetes, many using continuous glucose monitors (CGMs) like Dexterity G7 that transmit data to smartphones. The American Diabetes Association has warned that phone bans without explicit medical accommodations could endanger students who rely on smartphone alerts for dangerous blood sugar levels. Similarly, students with epilepsy may use phone-connected seizure detection devices. Schools implementing bans must create medical accommodation processes — which adds administrative burden and potentially stigmatizes students who must request exceptions.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "American Diabetes Association; CDC National Diabetes Statistics Report; Education Week",
          sourceUrl: "https://diabetes.org/about-diabetes/statistics/about-diabetes",
          reasoning:
            "The medical accommodation concern is legitimate and well-documented by authoritative health organizations. However, schools already manage medical accommodations for conditions requiring EpiPens, inhalers, and insulin — adding phone accommodations is administratively feasible. Many CGMs can also send alerts to dedicated receiver devices that are not smartphones. The concern is real but addressable with proper policy design.",
        },
        {
          id: "lse-low-income-benefit",
          title: "Phone Bans Produce Largest Academic Gains for Low-Income and Low-Performing Students (Beland & Murphy)",
          description:
            "The same LSE study that found overall test score improvements from phone bans also found that the benefits were concentrated among the most disadvantaged students. Low-performing students showed gains of 14.3% of a standard deviation — more than twice the overall average. Students eligible for free school meals (a proxy for low-income status) showed significantly larger improvements than affluent peers. The researchers concluded that phone bans could 'be a low-cost policy to reduce educational inequalities' because the students most distracted by phones are those who can least afford the academic cost.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 9,
            replicability: 7,
            directness: 9,
          },
          source: "Beland & Murphy, Labour Economics (2016)",
          sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0927537116000227",
          reasoning:
            "This finding directly addresses the equity argument by showing that bans disproportionately help the students that equity advocates aim to protect. Peer-reviewed and using a large sample. The counterargument is that academic gains for disadvantaged students must be weighed against the other equity concerns (discriminatory enforcement, medical needs, safety) — the academic benefit does not automatically outweigh other harms.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Communication: Technology in Education — UNESCO GEM Report 2023",
      url: "https://www.unesco.org/gem-report/en/technology",
    },
    {
      title: "The Effect of Mobile Phone Bans on Student Achievement — Beland & Murphy, Labour Economics (2016)",
      url: "https://www.sciencedirect.com/science/article/pii/S0927537116000227",
    },
    {
      title: "Brain Drain: The Mere Presence of One's Own Smartphone Reduces Available Cognitive Capacity — Ward et al. (2017)",
      url: "https://www.journals.uchicago.edu/doi/10.1086/691462",
    },
    {
      title: "The Anxious Generation — Jonathan Haidt (2024)",
      url: "https://www.anxiousgeneration.com/research",
    },
    {
      title: "The Association Between Adolescent Well-Being and Digital Technology Use — Orben & Przybylski, Nature Human Behaviour (2019)",
      url: "https://www.nature.com/articles/s41562-018-0506-1",
    },
    {
      title: "Youth Risk Behavior Surveillance System — CDC",
      url: "https://www.cdc.gov/healthyyouth/data/yrbs/index.htm",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Are phone bans treating symptoms while ignoring the disease?",
      content:
        "If smartphones and social media are genuinely harming students, banning them during school hours addresses only 35-40% of waking hours. Students return to the same devices and platforms after school. A phone ban may improve the classroom environment without addressing the underlying mental health crisis. Should policy focus on the school day, or on regulating the platforms and devices themselves through age verification, algorithmic restrictions, and parental controls?",
    },
    {
      id: "q2",
      title: "At what age should phone bans end?",
      content:
        "Most phone ban proposals target elementary and middle school students, with less consensus about high schoolers. Older teens are developing autonomy and self-regulation skills that blanket prohibition may undermine. But brain development research shows that the prefrontal cortex — responsible for impulse control — is not fully developed until age 25. Where should the line be drawn, and should it be based on age, grade level, or demonstrated digital maturity?",
    },
    {
      id: "q3",
      title: "Will phone bans become obsolete as technology evolves?",
      content:
        "Smartwatches, AR glasses, wireless earbuds with AI assistants, and other wearable devices are rapidly proliferating. A phone ban that does not address these devices may become ineffective within years. Meanwhile, AI tutoring tools delivered through phones may become educationally valuable enough to justify classroom phone use. Is a phone ban a durable policy or a temporary measure that will be overtaken by technological change?",
    },
  ],
};
