export const transgenderAthletesSportsData = {
  id: "transgender-athletes-sports",
  title: "Transgender Athletes in Women's Sports",
  question:
    "Should transgender women and girls be allowed to compete in female sports?",
  meta_claim:
    "Transgender women and girls should be allowed to compete in female sports categories, because hormone therapy, or transition before puberty, removes enough of the physical advantage that male puberty brings.",
  status: "contested" as const,
  category: "policy" as const,
  // As of 3 November 2026: the US Supreme Court upheld state laws limiting
  // girls' and women's school sports to biological females (West Virginia v.
  // B.P.J. and Little v. Hecox, 30 June 2026, 6-3); 27 states have such laws.
  // World Athletics has required a one-time SRY gene test since 1 September
  // 2025, and the IOC will from the 2028 Los Angeles Games.
  last_updated: "2026-11-03",
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "On 30 June 2026 the US Supreme Court ruled, 6–3, that states may keep girls' and women's school teams for biological females; 27 states have such laws. World Athletics has required a one-time SRY gene test for its female category since September 2025, and the IOC will from the 2028 Games. The fight now is over what transition does to athletic advantage, and whether one line should cover an Olympic final, a college meet and an 11-year-old on a middle-school team.",
    confidence: 95,
    source:
      "Supreme Court of the United States, West Virginia v. B. P. J., No. 24-43, with Little v. Hecox, No. 24-38 (30 June 2026), syllabus; World Athletics press release (30 July 2025); IOC policy on the female category (26 March 2026)",
    sourceUrl: "https://www.supremecourt.gov/opinions/25pdf/24-43_2b35.pdf",
  },
  simple_case: [
    "The answer decides who may enter girls' and women's events from school leagues to the Olympics, and whether a transgender girl who never went through male puberty can play on the girls' team.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: What transition does and does not undo
    // =========================================================================
    {
      id: "retained-physiological-advantages",
      title: "What Hormone Therapy Does and Doesn't Undo",
      short_summary:
        "Male puberty builds a performance gap of roughly 10% to 50% depending on the sport. Testosterone suppression brings hemoglobin to female levels within months, but muscle and strength fall slowly and partly, and height and frame do not change. Small lab studies of transgender women athletes point both ways. How much edge remains, and in which sports, is the empirical core of the fight.",
      icon_name: "Microscope" as const,
      skeptic_premise:
        "Male puberty builds an edge that hormones do not take back. Hilton and Lundberg's 2021 review in Sports Medicine puts the male-female gap at 10% to 50% depending on the sport, and finds that a year of testosterone suppression cuts lean mass, muscle area and strength by only about 5%. Height and skeletal frame do not change at all. Harper's 2021 systematic review found strength still above female levels after three years. In US Air Force fitness tests, transgender women ran 1.5 miles about 12% faster than other women after two years on hormones. Elite medals are decided by margins under 1%. A residual edge of several percent is not natural variation; it is the gap the female category was created to remove.",
      proponent_rebuttal:
        "The evidence is thinner and more mixed than that. The 12% running figure comes from Air Force fitness tests, not trained athletes, and the same data showed push-up and sit-up scores falling into the female range within two years. Hemoglobin, which drives endurance, reaches female levels within about four months. The only IOC-funded lab study of transgender women athletes, Hamilton et al. in 2024, found them stronger in handgrip than other women but lower in jump height relative to body mass and in relative aerobic capacity. A taller frame moved by less muscle is not a simple advantage, and in some events it is a handicap. Sport already accepts large natural gaps among women. The fair test is sport by sport: does the edge that remains exceed the spread among the women in that event?",
      crux: {
        id: "sport-specific-advantage-data",
        title: "The Sport-Specific Advantage Test",
        question:
          "After two-plus years on hormones, do retained advantages exceed normal variation among women in that sport?",
        description:
          "If transgender women who have spent two or more years on testosterone suppression keep a performance edge larger than the spread among women at the same level of a sport, inclusion on hormone criteria cannot deliver fair competition in that sport. If the remaining edge falls within that spread, or reverses in some events, the fairness objection weakens there.",
        methodology:
          "Follow trained transgender women athletes in several sports (sprinting, distance running, swimming, cycling, weightlifting, team sports) from before suppression through at least three years. Measure event results and lab markers against cisgender women matched for age, training and level, and compare any gap with the spread between the 5th and 95th percentile of women at that level.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Prospective studies that follow transgender women athletes through at least three years of hormone therapy in several sports, comparing their results with matched cisgender women and with the spread among elite women in each sport.",
        },
        cost_to_verify:
          "$5-15M (multi-year, multi-sport prospective cohort with enough athletes per sport)",
        falsification: {
          supporter_flip:
            "If prospective studies of trained transgender women found, after three years of suppression, a performance gap over matched women larger than the spread among women at the same level, as Hilton and Lundberg's review predicts, hormone-based eligibility would fail the fairness test in those sports.",
          skeptic_flip:
            "If sport-by-sport studies of trained athletes kept finding what Hamilton's 2024 lab study did, lower jump height and aerobic capacity relative to body mass than other women, the case for a blanket rule would give way to rules set event by event.",
          common_ground:
            "Both sides agree hemoglobin reaches female levels within months of suppression, that strength and muscle fall more slowly and only partly, that height and frame do not change, and that no large study of trained transgender athletes exists.",
          live_disagreement:
            "Whether the edge that remains after hormone therapy is competitively decisive in a given sport or falls within the spread of the women's field, an answer that may differ between strength, endurance and skill sports.",
        },
      },
      evidence: [
        {
          id: "hilton-lundberg-review-2021",
          title: "Hilton & Lundberg 2021: male edge of 10–50%; a year of suppression cuts muscle and strength about 5%",
          description:
            "A review in Sports Medicine by Emma Hilton and Tommy Lundberg found that the male-female performance gap 'becomes significant at puberty and often amounts to 10–50% depending on sport.' Pooling longitudinal studies of transgender women on testosterone suppression, it found that the 'loss of lean body mass, muscle area and strength typically amounts to approximately 5% after 12 months of treatment', so the muscular advantage is 'only minimally reduced'. The main text notes that 'height and skeletal parameters remain unaltered in transgender women.' The authors conclude: 'These data significantly undermine the delivery of fairness and safety presumed by the criteria set out in transgender inclusion policies.'",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Hilton & Lundberg, 'Transgender Women in the Female Category of Sport: Perspectives on Testosterone Suppression and Performance Advantage', Sports Medicine 51(2):199-214 (2021)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7846503/",
          reasoning:
            "A peer-reviewed review that gathers the treatment studies in one place, so it is the clearest statement of the retained-advantage case. Most of the studies it pools tracked non-athletes, so it infers athletic effects from muscle and strength measures rather than measuring results in sport. The physiology it cites is not itself in dispute; its conclusion about policy is.",
        },
        {
          id: "hamilton-ioc-lab-study-2024",
          title: "IOC-funded lab study 2024: trans women athletes had stronger grip, but lower relative jump and aerobic capacity, than other women",
          description:
            "Hamilton and colleagues at the University of Brighton, funded by an IOC research grant, tested 23 transgender women, 21 cisgender women, 12 transgender men and 19 cisgender men, all athletes, in one lab visit (British Journal of Sports Medicine, April 2024). The transgender women had similar testosterone to the cisgender women and 'higher absolute handgrip strength (TW 40.7±6.8 kg, CW 34.2±3.7 kg, p=0.01)', but a lower lung-function ratio, 'lower relative jump height (TW 0.7±0.2 cm/kg; CW 1.0±0.2 cm/kg)' and lower aerobic capacity relative to body mass. The authors note the small sample and call for longitudinal studies.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 4,
            directness: 6,
          },
          source:
            "Hamilton et al., 'Strength, power and aerobic capacity of transgender athletes: a cross-sectional study', British Journal of Sports Medicine 58(11):586-597 (2024), doi:10.1136/bjsports-2023-108029",
          sourceUrl: "https://doi.org/10.1136/bjsports-2023-108029",
          reasoning:
            "The only lab study that tested trained transgender women against trained women, which is why it matters. It is small and cross-sectional: 23 volunteers at one visit, with no before-and-after measures, so it cannot say what transition changed. Measures scaled to body mass favour lighter athletes, and the absolute grip gap points the other way. The IOC, which funded it, adopted a ban two years later, so it did not settle the question even for its sponsor.",
        },
        {
          id: "bjsm-speed-advantage",
          title: "Air Force data 2020: trans women ran 12% faster than other women after two years on hormones",
          description:
            "Roberts, Smalley and Ahrendt, in the British Journal of Sports Medicine, used US Air Force fitness test records. Before hormones, transgender women ran the 1.5-mile test about 21% faster than cisgender women; after one year about 9% faster, and after two years about 12% faster. Push-up and sit-up differences disappeared within two years.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Roberts, Smalley & Ahrendt, 'Effect of gender affirming hormones on athletic performance in transwomen and transmen', British Journal of Sports Medicine (2020)",
          sourceUrl: "https://doi.org/10.1136/bjsports-2020-102329",
          reasoning:
            "Real before-and-after records, not a model, from a population with regular mandated testing. It shows a running edge that shrinks but persists at two years. Air Force members are not trained athletes and a fitness test is not a race, which limits directness, and the strength measures converged, so the picture is mixed rather than one-way.",
        },
        {
          id: "muscle-mass-convergence",
          title: "Harper review 2021: hemoglobin reaches female levels in four months; strength stays higher at three years",
          description:
            "A 2021 systematic review by Harper and colleagues in the British Journal of Sports Medicine found that testosterone suppression brings hemoglobin and hematocrit, which carry oxygen and drive endurance, to female levels within about four months. Lean mass, muscle area and strength fell over the first year but remained above those of cisgender women at 36 months; the review says strength 'may be well preserved' over the first three years.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Harper et al., 'How does hormone transition in transgender women change body composition, muscle strength and haemoglobin?', British Journal of Sports Medicine (2021)",
          sourceUrl: "https://doi.org/10.1136/bjsports-2020-103106",
          reasoning:
            "A systematic review, the highest common level of evidence here, by an author who is herself a transgender distance runner and researcher. It supports inclusion for endurance events, where hemoglobin matters most, and cuts against it for strength events. The studies it pools are of non-athletes, so it tells you about bodies, not race results.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Where to draw the line: before puberty, college, the Olympics
    // =========================================================================
    {
      id: "puberty-and-level-of-play",
      title: "Where to Draw the Line: Before Puberty, in College, at the Olympics",
      short_summary:
        "The rules now differ by level. The IOC's ban exempts grassroots sport, while the 27 state laws reach school sport from middle school up. The plaintiff in the Supreme Court case, B.P.J., started puberty blockers before male puberty. Whether a girl who never went through male puberty has any edge, and whether a rule written for Olympic finals should govern a school cross-country team, is a separate fight from the elite one.",
      icon_name: "Users" as const,
      skeptic_premise:
        "One clear line by sex is the only rule that can be applied fairly. Testing each child's hormones and comparing her with every girl in her event is, in the Supreme Court majority's words, 'an almost impossible task for a judge to perform on an equitable basis.' School sport is where most girls compete for places on teams, podium spots, records and college recruitment, so it needs protection more than the Olympics does. The science on transition before puberty is thin, and the majority called the claim of no retained advantage 'the subject of ongoing medical and scientific debate.' Legislatures in 27 states weighed that uncertainty and drew the line at biological sex. Title IX was written to give girls their own teams, and the Court held that its word 'sex' means biological sex.",
      proponent_rebuttal:
        "The reasons for the female category do not reach a child who never went through male puberty. Handelsman's 2018 review in Endocrine Reviews, written with World Athletics' medical director, found that 'prior to puberty, there is no sex difference in circulating testosterone concentrations or athletic performance.' B.P.J. took puberty blockers, then estrogen, and never went through male puberty, yet is barred from girls' cross-country. Justice Sotomayor's opinion notes that in five years B.P.J. was the only transgender girl publicly identified in West Virginia seeking to play girls' sports, so the law answers a problem the state could barely find. Even the IOC exempts grassroots and recreational sport. A rule built for the Olympics is being applied to girls whose bodies the elite case does not describe.",
      crux: {
        id: "pre-puberty-transition",
        title: "The Transition-Before-Puberty Test",
        question:
          "Does a transgender girl who never went through male puberty have an athletic edge over other girls?",
        description:
          "The elite case against inclusion rests on what testosterone builds during male puberty. Transgender girls who start puberty blockers at its onset never go through it. If they still outperform girls of the same age and training, a single rule by sex is justified at every level; if they do not, the main argument for excluding them falls away, and what remains is the line-drawing question.",
        methodology:
          "Follow transgender girls who began puberty blockers at Tanner stage 2 through age 18, measuring sprint times, jump height, grip strength, aerobic capacity and body size each year against girls matched for age, maturity and training. Report results by event, with the spread among the matched girls.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Yearly sprint, jump, strength and aerobic tests of transgender girls who started puberty blockers at its onset, compared through age 18 with girls matched for age, maturity and training.",
        },
        cost_to_verify:
          "$2-6M (multi-site cohort through adolescence; the number of eligible girls is small)",
        falsification: {
          supporter_flip:
            "If transgender girls who began puberty blockers at its onset still outran or outjumped girls matched for age and training by more than the girls' own spread, the case for including them in girls' sport would lose its main support.",
          skeptic_flip:
            "If transgender girls who never went through male puberty tested within the range of matched girls on speed, strength and aerobic capacity, as Handelsman's review of prepubertal children implies, a rule that bars them would rest on line-drawing alone.",
          common_ground:
            "Both sides agree the male performance gap opens at puberty, that B.P.J. began puberty blockers before male puberty, and that almost no research has measured transgender girls who transitioned that early.",
          live_disagreement:
            "Whether a girl who never went through male puberty keeps any edge, and whether one rule by sex for all ages is fairer than rules that differ for children, recreational play and elite competition, which is partly a question about who should decide.",
        },
      },
      evidence: [
        {
          id: "handelsman-prepuberty-no-difference",
          title: "Handelsman review 2018: no sex gap in testosterone or performance before puberty; at least 8–12% after",
          description:
            "David Handelsman, Angelica Hirschberg and Stéphane Bermon, then head of health and science at the IAAF (now World Athletics), reviewed the hormonal basis of the sex gap in Endocrine Reviews. Their abstract states: 'Prior to puberty, there is no sex difference in circulating testosterone concentrations or athletic performance.' From puberty on, male testosterone levels produce 'at least an 8% to 12% ergogenic advantage in men.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Handelsman, Hirschberg & Bermon, 'Circulating Testosterone as the Hormonal Basis of Sex Differences in Athletic Performance', Endocrine Reviews 39(5) (2018)",
          sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6391653/",
          reasoning:
            "A peer-reviewed review co-written by the athletics governing body's own health and science chief, which makes it hard to dismiss as advocacy. It speaks to boys and girls as groups; none of the work it reviews measured transgender girls on puberty blockers, which is why directness is 6.",
        },
        {
          id: "scotus-bpj-2026",
          title: "Supreme Court 2026, 6–3: states may limit girls' teams to biological females without case-by-case exceptions",
          description:
            "In West Virginia v. B.P.J. and Little v. Hecox (30 June 2026), Justice Kavanaugh's majority held that Title IX's word 'sex' means biological sex and that the West Virginia and Idaho laws pass intermediate scrutiny. States 'are not required to conduct an individual-by-individual comparison' of athletes. Whether transgender athletes on blockers or hormones keep an advantage 'is the subject of ongoing medical and scientific debate,' and legislatures and schools 'are better equipped' to draw the lines. Justice Sotomayor, joined by Justices Kagan and Jackson, agreed the Title IX claim failed but dissented on equal protection, saying unresolved factual questions should have gone back to the trial court.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 7,
            replicability: 10,
            directness: 5,
          },
          source:
            "Supreme Court of the United States, West Virginia v. B. P. J., No. 24-43, and Little v. Hecox, No. 24-38 (30 June 2026)",
          sourceUrl: "https://www.supremecourt.gov/opinions/25pdf/24-43_2b35.pdf",
          reasoning:
            "Settles the US legal question: states may draw the line at biological sex, and 27 have. It does not settle the empirical one; the majority said its conclusion would stand even if the no-advantage claim were true, and left the science to legislatures. That is why directness to the map's question, whether inclusion is right, is 5.",
        },
        {
          id: "ncaa-2025-policy",
          title: "NCAA 2025: women's college competition limited to athletes assigned female at birth",
          description:
            "On 6 February 2025, the day after a presidential executive order directed that Title IX be read to bar transgender women from female sports, the NCAA replaced its sport-by-sport eligibility rules with a policy limiting competition in women's sports to student-athletes assigned female at birth. Transgender women may still practice with women's teams and receive team benefits, but may not compete.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 5,
            replicability: 9,
            directness: 5,
          },
          source: "NCAA, 'NCAA announces transgender student-athlete participation policy change' (6 February 2025)",
          sourceUrl:
            "https://www.ncaa.org/news/2025/2/6/media-center-ncaa-announces-transgender-student-athlete-participation-policy-change.aspx",
          reasoning:
            "An authoritative rule for the largest US college sports body. It was adopted under direct federal pressure rather than after a new review of the evidence, so it shows where policy went, not what the science found; independence and directness are 5.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Fairness to female athletes vs. the harm of exclusion
    // =========================================================================
    {
      id: "inclusion-dignity",
      title: "Fairness to Female Athletes vs. the Harm of Exclusion",
      short_summary:
        "Both sides claim to be protecting someone from harm. One side counts lost places, medals and safety for female athletes; the other counts the depression and isolation that follow being shut out of sport. Neither harm has been measured well, and weighing one against the other is a judgment no count supplies.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Women fought for decades for their own category, and Title IX built it. Every place on a podium or a team that goes to an athlete with a male-puberty edge is a place a woman loses, along with the records, scholarships and selection that follow. A 2024 report to the UN General Assembly by its Special Rapporteur on violence against women counted more than 890 medals lost by female athletes in 29 sports. In contact sports the risk is injury, not just a lost race. Exclusion from the female category is not exclusion from sport: transgender women can compete in men's or open events. Inclusion matters, but the women's category exists for one purpose, and a policy that serves a few athletes by defeating that purpose for millions of girls has the balance backwards.",
      proponent_rebuttal:
        "Telling transgender women to compete with men is not neutral; it tells them they are not women, and in practice it ends their sport. A 2024 meta-analysis in BMC Psychology, pooling 12 studies and 21,565 participants, linked discrimination and exclusion in sport to higher depression, distress and suicide risk, and found that athletes who felt welcomed fared markedly better. Most transgender athletes are recreational, not elite. The predicted takeover did not happen: across roughly two decades of IOC eligibility, from 2004 to 2025, no transgender woman won an Olympic medal. The 890-medal figure came from campaign groups and lists no audited cases. A rule that bars every transgender woman from local leagues to answer a handful of elite cases imposes a certain harm to prevent a rare one.",
      crux: {
        id: "harm-balancing-test",
        title: "The Comparative Harm Assessment",
        question:
          "Is the harm of excluding transgender athletes greater than the competitive harm of including them?",
        description:
          "If excluding transgender athletes from the category matching their gender causes more harm (to mental health, participation and belonging) than inclusion causes to other women (lost places, records, scholarships, safety), inclusion is justified on balance. If the competitive and safety harms are large and measurable, exclusion or a separate category may be warranted despite the cost.",
        methodology:
          "(1) Survey transgender athletes kept out of the category matching their gender on mental health, participation and quality of life, against those included; (2) audit results in places with inclusive rules for podium displacement, records and scholarships, case by case and by level; (3) record injuries in contact sports by category; (4) set the measured harms side by side, acknowledging that weighing them takes a value judgment.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Surveys of mental health and sport participation among trans people kept out of women's events, set beside results under open rules: podium places, records and scholarships lost by other women. Weighing one loss against the other takes a judgment no count supplies.",
        },
        cost_to_verify:
          "$1-3M (multi-national survey and competition audit over 3-5 years)",
        falsification: {
          supporter_flip:
            "If an independent, case-by-case audit of results under inclusive rules found women losing places, records and scholarships in substantial numbers, or a measurable rise in injuries in contact sports, the competitive harm could outweigh the harm of exclusion.",
          skeptic_flip:
            "If audited results under inclusive rules found few displaced women, and new studies confirmed that exclusion from sport raises depression and suicide risk among transgender athletes, the harm of exclusion would weigh more heavily than the harm it prevents.",
          common_ground:
            "Both sides agree sport matters for health and belonging as well as winning, that the women's category exists to give female athletes fair competition, and that no audited count of displaced women exists.",
          live_disagreement:
            "Whether the harm of exclusion outweighs the competitive harm to other women, and whether elite-level concerns justify rules that also reach recreational and school players.",
        },
      },
      evidence: [
        {
          id: "mental-health-impact-exclusion",
          title: "BMC Psychology meta-analysis 2024: discrimination in sport linked to higher depression and suicide risk",
          description:
            "A 2024 systematic review and meta-analysis in BMC Psychology (Chan et al.) pooled 12 studies with 21,565 participants. Roughly a third reported discrimination in sport or healthcare, and discrimination and exclusion were associated with higher depression, psychological distress and suicide risk. Transgender athletes who felt welcomed by their teams had markedly better mental health.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 5,
          },
          source: "Chan et al., BMC Psychology (2024), systematic review and meta-analysis",
          sourceUrl: "https://doi.org/10.1186/s40359-023-01493-9",
          reasoning:
            "A large pooled sample for the association between exclusion and poor mental health. The studies are observational and measure discrimination broadly, not eligibility rules, so they show correlation and say little about the effect of any one rule; directness is 5.",
        },
        {
          id: "no-olympic-domination",
          title: "No transgender woman won an Olympic medal in two decades of IOC eligibility (2004–2025)",
          description:
            "From the 2004 Stockholm Consensus (which first required surgery) through the 2015 shift to a testosterone limit, the IOC let transgender women compete in women's events for about two decades. In that time no transgender woman won an Olympic medal; the best-known case, weightlifter Laurel Hubbard, failed all three lifts at the Tokyo Games. The IOC ended that eligibility in March 2026.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 5,
          },
          source: "International Olympic Committee results; Associated Press",
          sourceUrl:
            "https://apnews.com/article/ioc-olympic-transgender-female-eligibility-520cd9cee152a312767a667acf77dbc8",
          reasoning:
            "The record is checkable and it cuts against predictions of elite takeover. It is weak as positive evidence: very few openly transgender athletes reached Olympic level, so an empty medal list is also what chance would produce, and it says nothing about school or club sport.",
        },
        {
          id: "un-rapporteur-medals-count",
          title: "UN Special Rapporteur 2024: over 890 medals lost by female athletes, on figures from campaign groups",
          description:
            "A report to the UN General Assembly by the Special Rapporteur on violence against women and girls, Reem Alsalem (A/79/325, 27 August 2024), states: 'According to information received, by 30 March 2024, over 600 female athletes in more than 400 competitions have lost more than 890 medals in 29 different sports.' A footnote attributes the count to submissions from the Women's Liberation Front, the International Consortium on Female Sport and Lavender Patch. The report concludes that 'males must not compete in the female categories of sport.'",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 7,
          },
          source:
            "UN General Assembly, 'Violence against women and girls in sports', report of the Special Rapporteur, A/79/325 (27 August 2024), para. 11",
          sourceUrl: "https://documents.un.org/api/symbol/access?s=A/79/325&l=en&t=pdf",
          reasoning:
            "The only attempt in an official document to count the competitive harm this crux weighs. It is weak as a measurement: the figure comes from groups that campaign against inclusion, the report does not list the competitions or their level, and no one has audited it. It informs the comparison without settling it.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: The open category
    // =========================================================================
    {
      id: "open-category-model",
      title: "An Open Category: Compromise or Exclusion?",
      short_summary:
        "The big governing bodies have closed the female category: World Athletics by gene test since 2025, the NCAA in 2025, the IOC from 2028. Some propose an open category anyone can enter beside a protected female one. The one elite pilot, at a 2023 World Aquatics meet, drew no entries.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "The open category model is not exclusion; it is the one design that protects female athletes and still gives transgender athletes a place to compete at every level. A protected female category keeps the competition women were promised. An open category lets anyone enter regardless of sex, identity or hormone levels. That is classification, like weight classes in boxing or the classes of parasport, not a verdict on anyone's identity. World Athletics and World Aquatics both drew this line and kept the door open. The alternatives each fail someone: inclusion in the female category fails women, and a flat ban with nowhere else to go fails transgender athletes. Where events have the numbers, the open category serves both aims.",
      proponent_rebuttal:
        "An open category is exclusion with a new label. It still denies transgender women recognition as women in sport. Because it is open to men, it would in practice be the men's category under another name, where transgender women who have suppressed testosterone have little chance of success. The test case bears this out: when World Aquatics staged open-category races at its October 2023 Berlin World Cup, nobody entered. School and community events struggle to fill the categories they have; adding a third for a tiny group means it will rarely exist. Inclusion means a place in the women's game, not a separate event that nobody runs.",
      crux: {
        id: "open-category-feasibility",
        title: "The Open Category Pilot Test",
        question:
          "Would splitting sports into an open and a restricted female category work and be accepted?",
        description:
          "If open and protected female categories, run side by side, draw transgender, non-binary and intersex athletes in real numbers while keeping the female category's standards and both groups' acceptance, the model is a workable compromise. If transgender athletes stay away, or events cannot staff the extra category, other approaches are needed.",
        methodology:
          "Run open and protected female categories in three to five sports across several countries for two seasons, at elite, club and school level. Measure entries in each category (including transgender, non-binary and intersex athletes), standards in the female category, athlete satisfaction and the cost of staging, against sports that keep male and female categories only.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Run open and restricted categories in three to five sports for two seasons and measure who enters each (including transgender, non-binary and intersex athletes), standards in the restricted category, athlete satisfaction and cost, against sports that keep male and female categories.",
        },
        cost_to_verify:
          "$2-5M (multi-sport, multi-nation pilot over 2-3 years)",
        falsification: {
          supporter_flip:
            "If pilots at club and school level drew transgender athletes into open categories in meaningful numbers, with high satisfaction among them and female-category standards intact, the claim that inclusion requires a place in the women's category would weaken.",
          skeptic_flip:
            "If open categories at every level kept drawing no transgender entrants, as World Aquatics' Berlin races did, or ended up filled by men, the open category would look like a ban with a door painted on it.",
          common_ground:
            "Both sides agree the major governing bodies have closed the female category to athletes who went through male puberty: World Athletics in 2023 and by gene test since 2025, the NCAA in 2025, and the IOC from 2028.",
          live_disagreement:
            "Whether an open category is fair classification, like weight classes or parasport classes, that gives transgender athletes a real pathway, or a relabelled exclusion that would function as the men's category.",
        },
      },
      evidence: [
        {
          id: "world-athletics-framework",
          title: "World Athletics: female category closed to male puberty in 2023, one-time SRY gene test since September 2025",
          description:
            "In March 2023 World Athletics barred transgender women who had been through male puberty from female World Rankings competitions, whatever their hormone levels, and set up a working group to study other options, including an open category. From 1 September 2025, athletes in its female category must take 'a once-in-a-lifetime test for the SRY gene', by cheek swab or blood test. President Sebastian Coe: 'We are saying, at elite level, for you to compete in the female category, you have to be biologically female.' National federations set rules for domestic events.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 6,
          },
          source:
            "World Athletics Council decision (March 2023); World Athletics press release on the SRY gene test (30 July 2025)",
          sourceUrl: "https://worldathletics.org/news/press-releases/sry-gene-test-athletes-female-category",
          reasoning:
            "The governing body of the sport where the performance gap is easiest to measure. Its rule shows a sport choosing a protected female category at elite level; it adds no new data on advantage, and its open-category study has not produced an event.",
        },
        {
          id: "ioc-2021-framework",
          title: "IOC reversal: from the 2021 inclusion framework to SRY screening for women's events from LA 2028",
          description:
            "The IOC's 2021 framework devolved eligibility to each sport and said 'no athlete should be excluded from competition on the sole basis of their transgender identity.' On 26 March 2026 its Executive Board, under President Kirsty Coventry, limited every female category at the Olympic Games and other IOC events to 'biological females', determined 'in the first instance by SRY gene screening', a one-time test. The policy applies from the 2028 Los Angeles Games, is not retroactive and 'does not apply to any grassroots or recreational sports programmes.' Coventry: 'At the Olympic Games, even the smallest margins can be the difference between victory and defeat.'",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 6,
            replicability: 9,
            directness: 6,
          },
          source:
            "International Olympic Committee, policy on the protection of the female category (26 March 2026), as published by the Olympic Council of Asia; IOC Framework on Fairness, Inclusion and Non-Discrimination (2021)",
          sourceUrl: "https://oca.asia/news/7029-ioc-announces-new-policy-on-protection-of-female-athletes.html",
          reasoning:
            "The top of world sport moved from sport-by-sport inclusion to a single genetic line in five years. The grassroots exemption shows the IOC treating elite and community sport differently, which matters for the line-drawing pillar. The announcement cites no new study, and genetic screening is itself contested on scientific and privacy grounds, so independence and directness are 6.",
        },
        {
          id: "world-aquatics-open-no-entries",
          title: "World Aquatics' open-category races at the 2023 Berlin World Cup drew no entries",
          description:
            "After restricting elite women's events in 2022, World Aquatics added open-category 50m and 100m races in every stroke to its Swimming World Cup meet in Berlin, 6-8 October 2023. When registration closed it said that 'no entries have been received for the Open Category events', adding: 'Even if there is no current demand at the elite level, the working group is planning to look at the possibility of including Open Category races at Masters events in the future.'",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 4,
            directness: 7,
          },
          source: "Reuters via ESPN, 'World Aquatics: No entries in \"open category\" at Berlin event' (3 October 2023)",
          sourceUrl:
            "https://www.espn.com/olympics/story/_/id/38554503/world-aquatics-no-entries-open-category-berlin-event",
          reasoning:
            "The only open category a major federation has run, and it failed the first test of this crux: that transgender athletes enter. It is one elite meet, where very few transgender swimmers compete anyway, so an empty field may reflect numbers as much as rejection; replicability is 4.",
        },
      ],
    },
  ],
  aliases: [
    "Should transgender women on hormone therapy compete in women's sports?",
    "Transgender Athletes in Competitive Sports",
    "Should trans women play women's sports?",
    "Is it fair for transgender girls to play on girls' teams?",
  ],
  references: [
    {
      title: "West Virginia v. B. P. J. and Little v. Hecox, Nos. 24-43 and 24-38 — Supreme Court of the United States (30 June 2026)",
      url: "https://www.supremecourt.gov/opinions/25pdf/24-43_2b35.pdf",
    },
    {
      title: "IOC announces new policy on protection of female athletes — Olympic Council of Asia (26 March 2026)",
      url: "https://oca.asia/news/7029-ioc-announces-new-policy-on-protection-of-female-athletes.html",
    },
    {
      title: "World Athletics introduces SRY gene test for athletes wishing to compete in the female category (30 July 2025)",
      url: "https://worldathletics.org/news/press-releases/sry-gene-test-athletes-female-category",
    },
    {
      title: "World Athletics Council decision on female eligibility (March 2023)",
      url: "https://worldathletics.org/news/press-releases/council-meeting-march-2023-russia-belarus-female-eligibility",
    },
    {
      title: "NCAA transgender student-athlete participation policy change (6 February 2025)",
      url: "https://www.ncaa.org/news/2025/2/6/media-center-ncaa-announces-transgender-student-athlete-participation-policy-change.aspx",
    },
    {
      title: "Strength, power and aerobic capacity of transgender athletes: a cross-sectional study — Hamilton et al., BJSM (2024)",
      url: "https://doi.org/10.1136/bjsports-2023-108029",
    },
    {
      title: "Transgender Women in the Female Category of Sport — Hilton & Lundberg, Sports Medicine (2021)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7846503/",
    },
    {
      title: "Circulating Testosterone as the Hormonal Basis of Sex Differences in Athletic Performance — Handelsman, Hirschberg & Bermon, Endocrine Reviews (2018)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6391653/",
    },
    {
      title: "Effect of gender affirming hormones on athletic performance in transwomen and transmen — Roberts et al., BJSM (2020)",
      url: "https://doi.org/10.1136/bjsports-2020-102329",
    },
    {
      title: "How does hormone transition in transgender women change body composition, muscle strength and haemoglobin? — Harper et al., BJSM (2021)",
      url: "https://doi.org/10.1136/bjsports-2020-103106",
    },
    {
      title: "IOC Framework on Fairness, Inclusion and Non-Discrimination (2021, since superseded)",
      url: "https://olympics.com/ioc/news/ioc-updates-framework-on-fairness-inclusion-and-non-discrimination",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Does hormone therapy undo the advantages of male puberty?",
      content:
        "Partly. Hemoglobin reaches female levels within about four months of testosterone suppression. Muscle and strength fall about 5% in the first year and stay above female levels at three years. Height and frame do not change. The one lab study of trained transgender women, in 2024, found stronger grip but lower jump height and aerobic capacity relative to body mass than other women. How much edge remains differs by sport.",
    },
    {
      id: "q2",
      title: "What did the Supreme Court decide about transgender athletes in 2026?",
      content:
        "On 30 June 2026, in West Virginia v. B.P.J. and Little v. Hecox, the Court ruled 6–3 that Title IX and the Equal Protection Clause let states limit girls' and women's school teams to biological females, without case-by-case exceptions for athletes on puberty blockers or hormones. It left the science to legislatures, calling the question of retained advantage 'the subject of ongoing medical and scientific debate.' 27 states have such laws. The ruling permits these bans; it does not require them.",
    },
    {
      id: "q3",
      title: "Should the same rule apply before puberty and at the Olympics?",
      content:
        "The rules already differ. The IOC's 2026 ban exempts grassroots and recreational sport, while the state laws upheld by the Supreme Court reach school sport from middle school up. Before puberty there is little or no sex gap in performance, and B.P.J., the plaintiff in the Supreme Court case, began puberty blockers before male puberty. One side says a single clear line is the only fair and workable rule; the other says the elite case does not describe girls who never went through male puberty.",
    },
    {
      id: "q4",
      title: "Would an open category solve it?",
      content:
        "An open category anyone can enter, beside a protected female one, is the most discussed compromise. Supporters call it classification, like weight classes. Critics call it the men's category under another name. The one elite trial, open races at a 2023 World Aquatics meet in Berlin, drew no entries.",
    },
  ],
};
