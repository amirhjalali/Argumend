/**
 * The comparison texts for the study's arms (b) and (c)
 * (docs/plans/2026-11-03-study-plan.md, "Stimuli").
 *
 * Rules these texts were written to, and that data/study/stimuli.test.ts holds:
 *
 * - Built only from facts already in the map (data/topics/<id>.ts). Every
 *   number, date and finding appears in the map; `sourceIds` lists the map's
 *   evidence card and crux ids each text draws on, for review.
 * - No direct quotations: the map's quotes were not re-checked against their
 *   sources for this study, so the texts paraphrase.
 * - No winner. Neither text tells the reader which side is right.
 * - Length matched to what arm (a) shows before anything is expanded: within
 *   ±15% of the visible word count of the topic page (ARM_A_VISIBLE_WORDS;
 *   how each was measured is noted there).
 * - chatbot: written the way a capable general chatbot answers "give me both
 *   sides of X": a framing line, bolded pro and con bullets, "key points of
 *   contention", a hedged bottom line and an offer to go deeper.
 * - article: a neutral news explainer: news peg first, then background,
 *   attributed claims from each side, no verdict.
 *
 * Arm labels are internal. Participants are never told which kind of text
 * they were given until the debrief.
 */
import type { StudyTopic } from "@/lib/study/constants";

export type StudyListItem = string | { lead: string; text: string };

export type StudyBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: StudyListItem[] }
  | { kind: "numbered"; items: StudyListItem[] };

export interface ChatbotStimulus {
  arm: "chatbot";
  topic: StudyTopic;
  /** The user's message shown above the answer. */
  prompt: string;
  blocks: StudyBlock[];
  sourceIds: string[];
}

export interface ArticleStimulus {
  arm: "article";
  topic: StudyTopic;
  headline: string;
  dek: string;
  blocks: StudyBlock[];
  sourceIds: string[];
}

/**
 * Visible words of arm (a), every fold closed: the page as /study renders it
 * (the topic page without its "Keep exploring" links).
 *
 * - gun-control-effectiveness, immigration-border-crisis: re-measured 3 Nov
 *   2026 after both maps were rewritten and the r15/design template landed,
 *   without a browser (no dev server under the light-compute rules): the
 *   text of a server render of ReadModeView with closed <details> reduced to
 *   their summaries. That undercounted the Playwright figure by about 8% on
 *   the old trans page, so treat these as estimates.
 * - transgender-athletes-sports: still the Playwright count (innerText of
 *   `[data-study-stimulus=map] article`) from before its round-15 rewrite;
 *   the texts were brought up to the rewritten map on 3 Nov 2026, but the
 *   count has not been re-measured.
 *
 * All three must be re-measured in a browser on the final map versions at
 * the freeze (docs/plans/2026-11-03-study-plan.md, "Stimuli").
 */
export const ARM_A_VISIBLE_WORDS: Record<StudyTopic, number> = {
  "gun-control-effectiveness": 758,
  "immigration-border-crisis": 690,
  "transgender-athletes-sports": 664,
};

export const LENGTH_TOLERANCE = 0.15;

const h = (text: string): StudyBlock => ({ kind: "heading", text });
const p = (text: string): StudyBlock => ({ kind: "paragraph", text });

// ---------------------------------------------------------------------------
// Gun laws (rebuilt 3 Nov 2026 against the rewritten map, commit 5c073e6)
// ---------------------------------------------------------------------------

const gunChatbot: ChatbotStimulus = {
  arm: "chatbot",
  topic: "gun-control-effectiveness",
  prompt: "Give me both sides of the gun control debate. Do stricter gun laws actually save lives?",
  blocks: [
    p(
      "This is one of the most polarized questions in American politics, and the research is more mixed than either side usually admits. Here's a balanced overview.",
    ),
    h("The case that stricter gun laws save lives"),
    {
      kind: "list",
      items: [
        {
          lead: "The US is an outlier.",
          text: "The CDC counted 44,447 gun deaths in 2024. Pew, using global estimates for 2023, puts the US gun death rate at 13.2 per 100,000, far above other rich democracies, with about 10,000 more gun deaths than Brazil, the country with the next-highest total.",
        },
        {
          lead: "Suicide and access.",
          text: "Most US gun deaths are suicides: 27,593 of 44,447 in 2024, a record. Many attempts come during a short crisis, and 90% of people who survive an attempt do not go on to die by suicide. A study following 26.3 million Californians found that men who acquired handguns were eight times as likely as other men to die by gun suicide, with no higher rate of suicide by other methods.",
        },
        {
          lead: "Some laws have strong evidence.",
          text: "RAND's 2024 review gives its highest rating to child-access (safe-storage) laws for reducing youth gun suicides, and finds moderate evidence that dealer background checks reduce gun homicides. Connecticut's 1995 permit-to-purchase law was associated with a 40% fall in gun homicides over ten years.",
        },
        {
          lead: "Australia.",
          text: "After its 1996 buyback of about 660,000 guns, Australia went from 13 fatal mass shootings in 18 years to none for two decades.",
        },
        {
          lead: "Weapon type.",
          text: "In high-fatality mass shootings from 1990 to 2017, attacks with large-capacity magazines had a 62% higher average death toll. Everytown, a gun-control group, found mass shootings from 2016 to 2025 with assault weapons or large magazines averaged 24.4 people shot, against 5.6 when neither was used.",
        },
        {
          lead: "Carry laws.",
          text: "RAND also gives its highest rating to findings that stand-your-ground laws increase gun homicides and shall-issue carry laws increase total homicides, and one study estimated violent crime 13% to 15% higher ten years after a state adopted right-to-carry.",
        },
      ],
    },
    h("The case against"),
    {
      kind: "list",
      items: [
        {
          lead: "Violence is concentrated.",
          text: "In 2024 Mississippi's gun death rate was 28.0 per 100,000 and Hawaii's 3.7. The US gun homicide rate (6.2 in 2023) was below more than two dozen countries and territories, many of them with strict laws.",
        },
        {
          lead: "The stockpile.",
          text: "There are about 400 million guns in private hands and no national registry, so new sales laws reach existing guns slowly. And about 74% of mass shooters' guns were obtained legally, so most would pass a background check.",
        },
        {
          lead: "Defensive use.",
          text: "A 2021 survey of 16,708 gun owners estimated about 1.67 million defensive uses a year, most without a shot fired. Government crime surveys find far fewer, about 108,000 to 116,000.",
        },
        {
          lead: "Substitution.",
          text: "Criminologist Gary Kleck's 2019 review concluded that gun prevalence affects gun suicides but not total suicides.",
        },
        {
          lead: "Contested studies.",
          text: "Critics note that the Connecticut study's comparison group was 72% Rhode Island, and that similar drops happened in most other states.",
        },
        {
          lead: "Weak evidence for headline laws.",
          text: "RAND rates the evidence on assault-weapon bans, licensing and most other measures as inconclusive, and a Justice Department-funded evaluation of the 1994 ban concluded that its effects, if renewed, were likely to be small.",
        },
        {
          lead: "Murder is falling anyway.",
          text: "Big-city homicide fell 21% in 2025 and another 18% in the first half of 2026, with no new federal gun restriction.",
        },
      ],
    },
    h("Key points of contention"),
    {
      kind: "numbered",
      items: [
        {
          lead: "Causation.",
          text: "Even the Australian study's authors say they can't prove the law caused the decline, since deaths by other means fell too. How much of the US rate comes from gun availability and laws, rather than concentrated violence, despair and drug markets, is the core dispute.",
        },
        {
          lead: "Suicide.",
          text: "Whether limiting access to guns lowers total suicides, or only changes the method.",
        },
        {
          lead: "Rights and costs.",
          text: "About 24.6 million Americans have owned AR-15-style rifles. Opponents see bans and red-flag laws as burdens on law-abiding owners; supporters see narrow laws aimed at the largest group of deaths.",
        },
      ],
    },
    h("Bottom line"),
    p(
      "Both sides can point to real evidence, and the answer likely depends on the specific law: safe-storage, carry and background-check rules have more research behind them than assault-weapon bans. If you'd like, I can go deeper on any one policy.",
    ),
  ],
  sourceIds: [
    "international-rates",
    "handgun-owner-suicide-cohort",
    "rand-cap-supportive",
    "rand-shall-issue-syg",
    "connecticut-ptp",
    "australia-buyback",
    "lcm-ban-study",
    "existing-guns",
    "defensive-gun-use",
    "kleck-total-suicide",
    "koper-awb-1994",
    "homicide-decline-2025-26",
    "ar15-ownership-common",
    "natural-experiment",
    "suicide-substitution",
  ],
};

const gunArticle: ArticleStimulus = {
  arm: "article",
  topic: "gun-control-effectiveness",
  headline: "Do stricter gun laws save lives? What the research shows",
  dek: "Most US gun deaths are suicides, and murder is falling fast. Researchers still disagree about which laws, if any, make a difference.",
  blocks: [
    p(
      "About 44,400 Americans died by gunfire in 2024, according to the Centers for Disease Control and Prevention. Most of them, 62%, were suicides. Gun suicides reached a record 27,593 that year, even as gun homicides fell 27% from their 2021 peak.",
    ),
    p(
      "Whether stricter laws would bring those numbers down is one of the most contested questions in American politics, and states are passing and repealing laws on permits to buy, safe storage, red flags and permitless carry.",
    ),
    h("How the US compares"),
    p(
      "Using global estimates for 2023, the Pew Research Center reports a US gun death rate of 13.2 per 100,000 people, far above other rich democracies. The US had about 10,000 more gun deaths than Brazil, the country with the next-highest total.",
    ),
    p(
      "Within the country the range is wide. In 2024 the rate was 3.7 per 100,000 in Hawaii, which requires a permit to buy any gun, and 28.0 in Mississippi, which requires no permit to carry one. Opponents of stricter laws note that the US gun homicide rate, 6.2 per 100,000 in 2023, was below that of more than two dozen countries and territories, many with strict gun laws.",
    ),
    p(
      "Americans hold about 400 million guns and there is no national registry, so a new law on sales reaches the existing stockpile slowly.",
    ),
    p(
      "Supporters of stricter laws often cite Australia, which banned semi-automatic rifles and bought back about 660,000 guns after 1996 and then went two decades without a fatal mass shooting. The study's authors cautioned that they could not show the law caused the change, because deaths by other means also fell.",
    ),
    h("The suicide question"),
    p(
      "Much of the research now focuses on suicide. A study that followed 26.3 million Californians from 2004 to 2016 found that men who acquired handguns were eight times as likely as other men to die by gun suicide, and women 35 times as likely, with no higher rate of suicide by other methods. Supporters of access laws note that many attempts come during a short crisis, and that 90% of people who survive an attempt do not go on to die by suicide.",
    ),
    p(
      "The RAND Corporation's 2024 review of gun research gives its highest rating to child-access prevention laws, which require safe storage, for reducing youth gun suicides. It rates the evidence on red-flag laws, which let families ask a judge to pause a person's access to guns, as limited.",
    ),
    p(
      "Criminologist Gary Kleck has argued that the soundest research shows gun prevalence affects gun suicides but not total suicides.",
    ),
    h("State laws and homicide"),
    p(
      "RAND gives the same highest rating to findings that stand-your-ground laws are associated with more gun homicides, and finds moderate evidence that dealer background checks reduce them. A study of Connecticut's 1995 permit-to-purchase law associated it with a 40% fall in gun homicides over ten years. Critics noted that the study's comparison group was 72% Rhode Island and that similar drops occurred in most other states. A separate study of right-to-carry laws estimated violent crime 13% to 15% higher ten years after adoption.",
    ),
    p(
      "Homicide has since fallen sharply without any new federal restriction. The Council on Criminal Justice found big-city homicide rates 21% lower in 2025 than in 2024, and 18% lower again in the first half of 2026.",
    ),
    h("Mass shootings"),
    p(
      "Mass shootings are a small share of gun deaths but drive much of the debate. One study found that high-fatality mass shootings from 1990 to 2017 involving large-capacity magazines had a 62% higher average death toll. A Justice Department-funded evaluation of the 1994 assault weapons ban concluded that its effects, if renewed, were likely to be small. Everytown, a gun-control advocacy group, found that in mass shootings from 2016 to 2025, attacks involving assault weapons or large magazines averaged 24.4 people shot, against 5.6 when neither was used. Opponents of bans note that about 24.6 million Americans have owned AR-15-style rifles, among the most common guns in the country, and that in a Mother Jones database of mass shootings since 1982 about 74% of the guns were obtained legally.",
    ),
    p(
      "Guns are also used in self-defense. A 2021 survey of gun owners estimated about 1.67 million defensive uses a year; government crime surveys produce far lower estimates.",
    ),
  ],
  sourceIds: [
    "international-rates",
    "existing-guns",
    "handgun-owner-suicide-cohort",
    "rand-cap-supportive",
    "red-flag-laws",
    "kleck-total-suicide",
    "rand-shall-issue-syg",
    "connecticut-ptp",
    "ct-synthetic-critique",
    "homicide-decline-2025-26",
    "lcm-ban-study",
    "koper-awb-1994",
    "background-check-pass",
    "defensive-gun-use",
  ],
};

// ---------------------------------------------------------------------------
// Immigration and the border (rebuilt 3 Nov 2026 against the rewritten map, commit 5aa76e4)
// ---------------------------------------------------------------------------

const immigrationChatbot: ChatbotStimulus = {
  arm: "chatbot",
  topic: "immigration-border-crisis",
  prompt:
    "Give me both sides of the immigration debate. Are a closed border and mass deportations the right way to handle illegal immigration?",
  blocks: [
    p("This is one of the most contentious questions in US politics right now. Here's an overview of the strongest arguments on each side."),
    h("Arguments for the current approach"),
    {
      kind: "list",
      items: [
        {
          lead: "The border has largely closed.",
          text: "Border Patrol apprehensions at the southwest border fell from 2.05 million in fiscal 2023 to 98,708 in fiscal 2026, the lowest on record; fiscal 2025 had already been the lowest year since 1970. In fiscal 2026 Border Patrol released no one it apprehended into the country.",
        },
        {
          lead: "Enforcement deters.",
          text: "Supporters say the collapse came when everyone caught was detained or returned: after releases ended in January 2025, monthly apprehensions fell below 10,000 and stayed there. The government also reports an estimated 80% fall in migrant deaths, and fewer crossings starve smuggling cartels of their fees.",
        },
        {
          lead: "The law applies to everyone.",
          text: "About 980,000 deportations were carried out in the first 18 months of President Trump's second term, including about 190,000 of people convicted of crimes. Most deportations, 69%, were of people caught at the border. Interior removals have risen from 8,000 a month to 19,000 as the system scales, and supporters argue that a law no one enforces invites the next surge.",
        },
        {
          lead: "Asylum was a back door.",
          text: "Even before 2025, judges granted asylum in only about 14% of cases decided in fiscal 2023, and the court backlog had reached 3.7 million cases.",
        },
        {
          lead: "Congress funded it.",
          text: "The July 2025 reconciliation act added $170.7 billion for enforcement, including money to hire 10,000 more ICE officers.",
        },
      ],
    },
    h("Arguments against"),
    {
      kind: "list",
      items: [
        {
          lead: "Much of the drop came earlier.",
          text: "Monthly apprehensions fell from 249,740 in December 2023 to 47,324 in December 2024, after a Biden-era asylum rule and stepped-up enforcement by Mexico.",
        },
        {
          lead: "Who is being removed.",
          text: "Only 20% of the 980,000 deportations were of people convicted of a crime. Of those deported after two or more years in the US, 71% had never been convicted, and of those deported after ten or more years, 61%. In July 2026, 70.6% of people in ICE detention had no criminal conviction.",
        },
        {
          lead: "Asylum is being shut.",
          text: "The asylum grant rate fell to 5.5% in June 2026 after 279 immigration judges were fired or resigned, and three-quarters of the long-serving judges who stayed raised their denial rates. Applicants now pay a $100 fee, plus $100 for each year a case is pending.",
        },
        {
          lead: "Human costs.",
          text: "A record 29 people died in ICE custody in the first half of fiscal 2026, and agents detained at least 170 US citizens in the early months of the drive. Closing asylum at the border also pushes people toward remote desert crossings, where deaths peaked at about 890 in fiscal 2022.",
        },
        {
          lead: "Enforcement hasn't lasted before.",
          text: "An estimated $532.5 billion has gone to the enforcement agencies since 2003, and crossings still surged in 2019 and again from 2021 to 2023. The 2025 act adds $45 billion for detention centers, a 308% annual increase in ICE's detention budget, mostly for people with no criminal record.",
        },
      ],
    },
    h("Key points of contention"),
    {
      kind: "numbered",
      items: [
        {
          lead: "What closed the border?",
          text: "US policy, Mexico's enforcement and conditions in origin countries all changed, so it's hard to separate their effects, or to know whether the fall will last.",
        },
        {
          lead: "Who should be deported?",
          text: "Whether removing long-settled people with no criminal record is fair enforcement of the law, or a cost the country shouldn't impose.",
        },
        {
          lead: "Asylum.",
          text: "Whether the low grant rate shows weak claims, or a system remade to say no.",
        },
      ],
    },
    h("Bottom line"),
    p(
      "The numbers on crossings and deportations are not really in dispute; the argument is over what caused them and what they cost. Where people land often depends on how they weigh border control against humanitarian and economic concerns. Let me know if you'd like more detail on any part.",
    ),
  ],
  sourceIds: [
    "encounters-drop-post-restrictions",
    "record-encounters-fy2023",
    "decline-began-under-biden",
    "mpi-980k-deportations",
    "mpi-long-resident-no-conviction",
    "asylum-grant-rate-14-percent",
    "asylum-grant-rate-2026",
    "dhs-funding-reconciliation",
    "trac-detention-no-conviction",
    "ice-custody-deaths",
    "citizens-detained-propublica",
    "enforcement-spending-333-billion",
    "enforcement-deterrence-causation",
    "deportation-targets",
    "asylum-grant-rate-analysis",
  ],
};

const immigrationArticle: ArticleStimulus = {
  arm: "article",
  topic: "immigration-border-crisis",
  headline: "The border is nearly closed and deportations are up. Is it working?",
  dek: "Apprehensions at the southwest border hit a record low in fiscal 2026. What caused the drop, and who is being deported, remain in dispute.",
  blocks: [
    p(
      "Border Patrol made 98,708 arrests at the southwest border in the year to September 2026, the fewest on record, according to preliminary Department of Homeland Security figures. In fiscal 2023 it had made 2.05 million, and fiscal 2025, at around 238,000, had already been the lowest year since 1970. Nationwide encounters in fiscal 2026 were 379,243. Fiscal 2026 was the first year in which Border Patrol released none of the migrants it apprehended at the border.",
    ),
    p(
      "Inside the country, the government carried out about 980,000 deportations between January 2025 and July 2026, according to an estimate by the Migration Policy Institute, which said the figure was consistent with the department's public statements.",
    ),
    h("What closed the border"),
    p(
      "Supporters of the administration's approach credit enforcement. After the new administration ended releases and CBP One appointments in January 2025, monthly apprehensions fell below 10,000 from February and stayed there. DHS also reports about 250 miles of new barrier since January 2025 and an estimated 80% fall in migrant deaths.",
    ),
    p(
      "Critics point out that much of the decline came earlier. Monthly apprehensions fell from 249,740 in December 2023 to 47,324 in December 2024, after a June 2024 Biden administration rule limiting asylum between ports of entry and stepped-up enforcement by Mexico. Customs and Border Protection itself credited that fall to the June 2024 rule.",
    ),
    p(
      "Skeptics of enforcement also cite history: the American Immigration Council estimates that about $532.5 billion has been spent on the enforcement agencies since the Department of Homeland Security was created in 2003, and crossings still surged in 2019 and again from 2021 to 2023. Supporters reply that a law no one enforces invites the next surge, and that fewer crossings starve smuggling cartels of their fees.",
    ),
    h("Who is being deported"),
    p(
      "About 190,000 of the deportations, or 20%, were of people convicted of a crime, according to the institute. Most, 69%, were of people first stopped at the border. Of those deported after living in the US for two years or more, 71%, about 280,000 people, had no criminal conviction. Interior deportations rose from 8,000 a month in the first three months to 19,000 a month in May to July 2026.",
    ),
    p(
      "Detention has reached record levels. ICE held 65,765 people in July 2026, according to TRAC, a research center at Syracuse University, and 70.6% of them had no criminal conviction. NPR reported that 29 people died in ICE custody in the first half of fiscal 2026, a record.",
    ),
    p(
      "The July 2025 reconciliation act added $170.7 billion for immigration and border enforcement, including $45 billion for new detention centers and money to hire 10,000 more ICE officers.",
    ),
    h("Asylum"),
    p(
      "Immigration judges granted asylum in about 14% of cases decided on the merits in fiscal 2023. The rate had been over 50% early in the Biden administration and 32% at its end. By June 2026 it had fallen to 5.5%, the lowest TRAC has recorded. In fiscal 2025 and 2026, 279 immigration judges were fired or resigned, and three-quarters of the long-serving judges who stayed raised their denial rates. Asylum seekers must now pay a $100 fee to apply, plus $100 for each year their case is pending.",
    ),
    p(
      "Supporters say asylum had become a route for economic migration and that faster decisions serve genuine refugees better; the court backlog fell from 3.7 million cases at the end of fiscal 2024 to about 3.4 million during fiscal 2025. Critics say the falling grant rate reflects a remade bench rather than weaker claims, noting that grant rates have always varied widely by judge.",
    ),
    p(
      "There have also been mistakes. ProPublica found that agents detained at least 170 US citizens in the early months of the enforcement drive.",
    ),
  ],
  sourceIds: [
    "encounters-drop-post-restrictions",
    "record-encounters-fy2023",
    "mpi-980k-deportations",
    "decline-began-under-biden",
    "mpi-long-resident-no-conviction",
    "trac-detention-no-conviction",
    "ice-custody-deaths",
    "dhs-funding-reconciliation",
    "asylum-grant-rate-14-percent",
    "asylum-grant-rate-2026",
    "backlog-falling-2025",
    "citizens-detained-propublica",
  ],
};

// ---------------------------------------------------------------------------
// Transgender athletes in women's sports
// ---------------------------------------------------------------------------

const transChatbot: ChatbotStimulus = {
  arm: "chatbot",
  topic: "transgender-athletes-sports",
  prompt:
    "Give me both sides: should transgender women and girls be allowed to compete in female sports?",
  blocks: [
    p(
      "This is a sensitive issue where views often reflect different priorities, fairness in competition and inclusion, as well as different readings of the science. Here's a balanced overview.",
    ),
    h("Arguments for allowing transgender women to compete"),
    {
      kind: "list",
      items: [
        {
          lead: "Hormone therapy reduces some advantages.",
          text: "A 2021 systematic review in the British Journal of Sports Medicine found that testosterone suppression brings hemoglobin, which affects endurance, to typical female levels within about four months, and reduces muscle mass and strength over the first year. In the Air Force fitness data, push-up and sit-up results converged with female norms within two years.",
        },
        {
          lead: "Limited elite impact.",
          text: "During roughly two decades when the IOC allowed transgender women to compete in women's events (2004–2025), no transgender woman won an Olympic medal.",
        },
        {
          lead: "Mental health and belonging.",
          text: "A 2024 meta-analysis of 12 studies with 21,565 participants found that discrimination and exclusion in sport were associated with higher depression, distress and suicide risk. Supporters add that most transgender athletes are recreational, not elite.",
        },
        {
          lead: "Mixed lab results.",
          text: "The one lab study of trained transgender women athletes, funded by the IOC in 2024, found them stronger in handgrip than other women but lower in jump height and aerobic capacity relative to body mass. Its authors noted the small sample.",
        },
      ],
    },
    h("Arguments against"),
    {
      kind: "list",
      items: [
        {
          lead: "Retained advantages.",
          text: "A 2020 study of US Air Force fitness tests found transgender women still ran about 12% faster than cisgender women after two years of hormone therapy, down from about 21% before transition. The gap persisted even though testosterone had been suppressed to female-typical levels for the whole period.",
        },
        {
          lead: "Advantages that stay.",
          text: "A 2021 review put the male edge at 10% to 50% depending on the sport and found a year of testosterone suppression cuts muscle and strength by only about 5%. Height and skeletal frame do not change, and elite medals are decided by margins under 1%.",
        },
        {
          lead: "The purpose of the women's category.",
          text: "Critics argue that sex-segregated sport exists to give female athletes fair competition, and that letting athletes with male-puberty advantages compete undermines it. Transgender women can still compete in men's or open events.",
        },
        {
          lead: "Lost opportunities.",
          text: "A 2024 report by a UN Special Rapporteur cited a count of more than 890 medals lost by female athletes, though the figure came from submissions by groups that campaign against inclusion and hasn't been independently audited.",
        },
      ],
    },
    h("Key points of contention"),
    {
      kind: "numbered",
      items: [
        {
          lead: "How big is the remaining advantage?",
          text: "Strength was still above female levels after three years in the 2021 review, but the speed data come from military fitness tests, not elite athletes. The answer may differ by sport.",
        },
        {
          lead: "Before puberty.",
          text: "There is no sex gap in testosterone or athletic performance before puberty, so the case for excluding a girl who began puberty blockers before male puberty is weaker. Almost no research has measured girls who transitioned that early.",
        },
        {
          lead: "Weighing harms.",
          text: "How to balance the harm of exclusion against the competitive harm to other women is partly a question of values.",
        },
        {
          lead: "Open categories.",
          text: "Some propose an open category alongside a female category. Supporters call it fair classification; critics call it exclusion under another name. When World Aquatics piloted an open category in 2023, it received no entries.",
        },
      ],
    },
    h("Where policy stands"),
    p(
      "Major sports bodies have moved toward restriction: World Athletics in 2023 (by a one-time gene test since September 2025), the NCAA in February 2025 (transgender women may still practice with women's teams, but not compete), and the IOC in March 2026, with a policy that applies from the 2028 Games. In June 2026 the US Supreme Court ruled 6–3 that states may keep girls' and women's school teams for biological females.",
    ),
    h("Bottom line"),
    p(
      "Both sides raise legitimate concerns, and the evidence suggests the answer may vary by sport and by level of competition. I'm happy to go deeper into the science or the policy history if that would help.",
    ),
  ],
  sourceIds: [
    "muscle-mass-convergence",
    "no-olympic-domination",
    "mental-health-impact-exclusion",
    "bjsm-speed-advantage",
    "hilton-lundberg-review-2021",
    "hamilton-ioc-lab-study-2024",
    "handelsman-prepuberty-no-difference",
    "pre-puberty-transition",
    "scotus-bpj-2026",
    "un-rapporteur-medals-count",
    "world-aquatics-open-no-entries",
    "world-athletics-framework",
    "ncaa-2025-policy",
    "ioc-2021-framework",
    "sport-specific-advantage-data",
    "harm-balancing-test",
    "open-category-feasibility",
  ],
};

const transArticle: ArticleStimulus = {
  arm: "article",
  topic: "transgender-athletes-sports",
  headline: "Who can compete in women's sports? Where the rules and the science stand",
  dek: "Sports bodies have tightened eligibility for transgender women. What hormone therapy changes in the body is still debated.",
  blocks: [
    p(
      "In March 2026, the International Olympic Committee adopted a policy limiting the female category at its events to athletes who pass a one-time SRY gene screen, a test for a gene on the Y chromosome. The rule applies from the 2028 Los Angeles Games and is not retroactive. Grassroots and recreational sport is exempt.",
    ),
    p(
      "The decision reversed the IOC's 2021 framework, which had left eligibility to individual sports federations and said no athlete should be excluded solely because of their transgender identity. From 2004, the IOC had allowed transgender women to compete in women's events under conditions that changed over time.",
    ),
    p(
      "Other governing bodies moved first. In March 2023, World Athletics barred transgender women who had gone through male puberty from international women's competition, regardless of hormone therapy. Since September 2025 its female category has required a one-time test for the SRY gene. Its president, Sebastian Coe, said that at elite level an athlete must be biologically female to compete in the female category. In February 2025, the day after a federal executive order on Title IX, the NCAA limited competition in women's college sports to athletes assigned female at birth. Transgender women may still practice with women's teams.",
    ),
    p(
      "In June 2026 the US Supreme Court ruled 6–3, in West Virginia v. B.P.J., that states may keep girls' and women's school teams for biological females without comparing athletes one by one. Twenty-seven states have such laws.",
    ),
    h("What the research shows"),
    p("Much of the debate turns on what hormone therapy does to the advantages of male puberty."),
    p(
      "A 2021 systematic review in the British Journal of Sports Medicine found that testosterone suppression brings hemoglobin, which carries oxygen and affects endurance, to levels typical of women within about four months. Muscle mass and strength fall over the first year but remained above those of women after 36 months.",
    ),
    p(
      "A 2020 study of US Air Force fitness test data found that transgender women ran about 12% faster than other women after two years of hormone therapy, down from about 21% before, even though their testosterone had been suppressed to typical female levels for the whole period. Differences in push-ups and sit-ups disappeared within two years. Advocates for inclusion note that military fitness tests are not elite competition.",
    ),
    p(
      "A 2021 review in Sports Medicine put the male performance edge at 10% to 50% depending on the sport and found that a year of testosterone suppression cut muscle and strength by only about 5%. Height and skeletal frame do not change. A small 2024 lab study funded by the IOC found transgender women athletes stronger in handgrip than other women but lower in jump height and aerobic capacity relative to body mass.",
    ),
    p(
      "Before puberty there is no sex difference in testosterone or athletic performance, a 2018 review found, and almost no research has measured transgender girls who began puberty blockers before male puberty.",
    ),
    h("Fairness and inclusion"),
    p(
      "Supporters of restrictions argue that the women's category exists to give female athletes fair competition. A 2024 report to the UN General Assembly by the Special Rapporteur on violence against women and girls cited a count of more than 890 medals lost by female athletes. The figure came from submissions by groups that campaign against inclusion and has not been independently checked.",
    ),
    p(
      "Advocates for inclusion point to a 2024 analysis of 12 studies covering 21,565 participants, which linked discrimination and exclusion in sport to higher rates of depression and suicide risk. The studies show an association, not proof that any particular rule causes harm. Advocates also note that no transgender woman won an Olympic medal in the two decades of inclusive eligibility, that most transgender athletes are recreational rather than elite, and that telling transgender women to compete in men's events amounts to saying they are not women.",
    ),
    h("A third category?"),
    p(
      "Some have proposed an open category that anyone can enter, alongside a category restricted to female athletes. Supporters compare it to weight classes; critics say it would amount to a men's category under another name. When World Aquatics offered open-category races at a World Cup meet in Berlin in October 2023, no one entered. The federation said it would look at open-category races at Masters events in the future.",
    ),
  ],
  sourceIds: [
    "ioc-2021-framework",
    "world-athletics-framework",
    "ncaa-2025-policy",
    "muscle-mass-convergence",
    "bjsm-speed-advantage",
    "hilton-lundberg-review-2021",
    "hamilton-ioc-lab-study-2024",
    "handelsman-prepuberty-no-difference",
    "scotus-bpj-2026",
    "un-rapporteur-medals-count",
    "mental-health-impact-exclusion",
    "no-olympic-domination",
    "world-aquatics-open-no-entries",
  ],
};

export const CHATBOT_STIMULI: Record<StudyTopic, ChatbotStimulus> = {
  "gun-control-effectiveness": gunChatbot,
  "immigration-border-crisis": immigrationChatbot,
  "transgender-athletes-sports": transChatbot,
};

export const ARTICLE_STIMULI: Record<StudyTopic, ArticleStimulus> = {
  "gun-control-effectiveness": gunArticle,
  "immigration-border-crisis": immigrationArticle,
  "transgender-athletes-sports": transArticle,
};

function itemText(item: StudyListItem): string {
  return typeof item === "string" ? item : `${item.lead} ${item.text}`;
}

/** Every word a participant sees in the text, including the chatbot prompt or the headline and dek. */
export function stimulusText(stimulus: ChatbotStimulus | ArticleStimulus): string {
  const head = stimulus.arm === "chatbot" ? [stimulus.prompt] : [stimulus.headline, stimulus.dek];
  const body = stimulus.blocks.flatMap((block) =>
    block.kind === "heading" || block.kind === "paragraph" ? [block.text] : block.items.map(itemText),
  );
  return [...head, ...body].join("\n");
}

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
