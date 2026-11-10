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
 * (ReadModeView with no related maps).
 *
 * All three are estimates taken on 10 Nov 2026 without a browser, on the map
 * files recorded in MAPS_CHECKED: the text of the <article> element in a
 * server render of ReadModeView, with every closed <details> reduced to its
 * <summary>. <article> is the element the original Playwright count read
 * (innerText of `[data-study-stimulus=map] article`), so the page's labels,
 * breadcrumb and repeated crux questions are counted and the desktop
 * "On this page" rail is not.
 *
 * The figures they replace were 758 and 690 (guns and immigration, estimated
 * 3 Nov) and 664 (trans athletes, a browser count from before that map was
 * rewritten and gained a fourth crux). A server render has undercounted the
 * browser before, by about 8% on the old trans page, so the texts are kept
 * near or a little above these targets rather than at the bottom of the band.
 *
 * Still to do at the freeze: count all three in a browser at 390px and
 * 1440px inside /study (docs/plans/2026-11-03-study-plan.md, "Stimuli").
 */
export const ARM_A_VISIBLE_WORDS: Record<StudyTopic, number> = {
  "gun-control-effectiveness": 818,
  "immigration-border-crisis": 752,
  "transgender-athletes-sports": 805,
};

/**
 * The map files the texts and measures below were last read against, line by
 * line (10 Nov 2026; `shasum -a 256 data/topics/<id>.ts`). Any edit to a map
 * changes arm (a) and can leave arms (b) and (c) citing a fact the map no
 * longer holds, so data/study/stimuli.test.ts fails when a file stops
 * matching. To clear it: re-read both texts and the crux options against the
 * edited map, fix them, then record the new hash here. After the freeze the
 * right fix is usually to undo the map edit instead.
 */
export const MAPS_CHECKED: { date: string; sha256: Record<StudyTopic, string> } = {
  date: "2026-11-10",
  sha256: {
    "gun-control-effectiveness": "465d97b42ffad7d43ab1a083ca05ebc339faea32bc77a25594d429af768bb0d7",
    "immigration-border-crisis": "418894eefed9691202caec0434f4b498e615fd30606e3ee85865dd3b482cc551",
    "transgender-athletes-sports": "ffddc72facf7777a44d6b84ffb83ea0ace9d89734d7313a42d6b69c05a6f5e4b",
  },
};

export const LENGTH_TOLERANCE = 0.15;

const h = (text: string): StudyBlock => ({ kind: "heading", text });
const p = (text: string): StudyBlock => ({ kind: "paragraph", text });

// ---------------------------------------------------------------------------
// Gun laws (rebuilt 3 Nov 2026 against the rewritten map; re-read against it 10 Nov 2026)
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
          text: "The CDC counted 44,447 gun deaths in 2024. Pew, using global estimates for 2023, puts the US gun death rate at 13.2 per 100,000, far above other rich democracies, with about 10,000 more gun deaths than Brazil, the country with the next-highest total. The US also holds more guns than people.",
        },
        {
          lead: "Suicide and access.",
          text: "Most US gun deaths are suicides: 27,593 of 44,447 in 2024, a record. Many attempts come during a short crisis, and most people who survive an attempt do not go on to die by suicide later. A study following 26.3 million Californians found that men who acquired handguns were eight times as likely as other men to die by gun suicide, with no higher rate of suicide by other methods.",
        },
        {
          lead: "Some laws have strong evidence.",
          text: "RAND's 2024 review gives its highest rating to child-access (safe-storage) laws for reducing self-inflicted gun injuries and deaths among young people, and to higher minimum purchase ages for reducing youth gun suicides. It finds moderate evidence that waiting periods reduce gun suicides and that dealer background checks reduce gun homicides. Connecticut's 1995 permit-to-purchase law was associated with a 40% fall in gun homicides over ten years, with no matching fall in other homicides.",
        },
        {
          lead: "Australia.",
          text: "After its 1996 buyback of about 660,000 guns, Australia went from 13 fatal mass shootings in 18 years to none for two decades, and its firearm death rate fell from 3.6 to 1.2 per 100,000.",
        },
        {
          lead: "Weapon type.",
          text: "In high-fatality mass shootings from 1990 to 2017, attacks with large-capacity magazines had a 62% higher average death toll, and states without a magazine ban had more than double the rate of such shootings. Everytown, a gun-control group, found mass shootings from 2016 to 2025 with assault weapons or large magazines averaged 24.4 people shot, against 5.6 when neither was used.",
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
          text: "There are about 400 million guns in private hands and no national registry, so new sales laws reach existing guns slowly. And in 74% of the mass shootings in one database covering 1982 to 2019, the guns were obtained legally, so most shooters would pass a background check.",
        },
        {
          lead: "Defensive use.",
          text: "A 2021 survey of 16,708 gun owners estimated about 1.67 million defensive uses a year, most without a shot fired. Government crime surveys find far fewer, about 108,000 to 116,000.",
        },
        {
          lead: "Substitution.",
          text: "Criminologist Gary Kleck's 2019 review concluded that gun prevalence affects gun suicides but not total suicides. South Korea, where civilians rarely own guns, recorded 26.2 suicides per 100,000 people, far above the OECD average of 10.8.",
        },
        {
          lead: "Contested studies.",
          text: "Critics note that the Connecticut study's comparison group was 72% Rhode Island, and that similar drops happened in most other states.",
        },
        {
          lead: "Weak evidence for headline laws.",
          text: "RAND rates the evidence on assault-weapon bans as inconclusive, and finds only limited evidence that licensing laws reduce homicide or that red-flag laws reduce suicide. A Justice Department-funded evaluation of the 1994 ban concluded that its effects, if renewed, were likely to be small. Of the 11,717 gun murders the FBI tallied for 2024, rifles of every kind were involved in 3% and handguns in 53%.",
        },
        {
          lead: "Murder is falling anyway.",
          text: "Big-city homicide fell 21% in 2025 and another 18% in the first half of 2026, putting the national rate on course for its lowest level since 1900, with no new federal gun restriction.",
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
        {
          lead: "Defensive use.",
          text: "Estimates of how often guns are used to stop crimes differ by more than tenfold, and the highest come from surveys in which owners report their own incidents.",
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
    "red-flag-laws",
    "rand-shall-issue-syg",
    "donohue-rtc",
    "connecticut-ptp",
    "ct-synthetic-critique",
    "australia-buyback",
    "lcm-ban-study",
    "assault-weapon-casualties",
    "existing-guns",
    "background-check-pass",
    "defensive-gun-use",
    "kleck-total-suicide",
    "koper-awb-1994",
    "homicide-decline-2025-26",
    "ar15-ownership-common",
    "natural-experiment",
    "suicide-substitution",
    "assault-weapon-lethality",
  ],
};

const gunArticle: ArticleStimulus = {
  arm: "article",
  topic: "gun-control-effectiveness",
  headline: "Do stricter gun laws save lives? What the research shows",
  dek: "Most US gun deaths are suicides, and murder is falling fast. Researchers still disagree about which laws, if any, make a difference.",
  blocks: [
    p(
      "About 44,400 Americans died by gunfire in 2024, according to the Centers for Disease Control and Prevention. Most of them, 62%, were suicides. Gun suicides reached a record 27,593 that year, against 15,364 gun homicides, which were down 27% from their 2021 peak.",
    ),
    p(
      "Whether stricter laws would bring those numbers down is one of the most contested questions in American politics, and states are passing and repealing laws on permits to buy, safe storage, red flags and permitless carry.",
    ),
    h("How the US compares"),
    p(
      "Using global estimates for 2023, the Pew Research Center reports a US gun death rate of 13.2 per 100,000 people, far above other rich democracies. The US had about 10,000 more gun deaths than Brazil, the country with the next-highest total, and its gun suicide rate was second only to Greenland's.",
    ),
    p(
      "Within the country the range is wide. In 2024 the rate was 3.7 per 100,000 in Hawaii, which requires a permit to buy any gun, and 28.0 in Mississippi, which requires no permit to carry one. Opponents of stricter laws note that the US gun homicide rate, 6.2 per 100,000 in 2023, was below that of more than two dozen countries and territories, many with strict gun laws.",
    ),
    p(
      "Americans hold about 400 million guns, more guns than people, and there is no national registry, so a new law on sales reaches the existing stockpile slowly.",
    ),
    p(
      "Supporters of stricter laws often cite Australia, which banned semi-automatic rifles and bought back about 660,000 guns after 1996 and then went two decades without a fatal mass shooting; its firearm death rate fell from 3.6 to 1.2 per 100,000. The study's authors cautioned that they could not show the law caused the change, because deaths by other means also fell.",
    ),
    h("The suicide question"),
    p(
      "Much of the research now focuses on suicide. A study that followed 26.3 million Californians from 2004 to 2016 found that men who acquired handguns were eight times as likely as other men to die by gun suicide, and women 35 times as likely, with no higher rate of suicide by other methods. Supporters of access laws note that many attempts come during a short crisis, and that most people who survive an attempt do not go on to die by suicide later.",
    ),
    p(
      "The RAND Corporation's 2024 review of gun research gives its highest rating to child-access prevention laws, which require safe storage, for reducing self-inflicted gun injuries and deaths among young people, and finds moderate evidence that waiting periods reduce gun suicides. It rates the evidence on red-flag laws, which let families ask a judge to pause a person's access to guns, as limited.",
    ),
    p(
      "Criminologist Gary Kleck has argued that the soundest research shows gun prevalence affects gun suicides but not total suicides. Opponents of access laws also point to South Korea, where civilians rarely own guns and the suicide rate, 26.2 per 100,000, is far above the OECD average of 10.8.",
    ),
    h("State laws and homicide"),
    p(
      "RAND gives the same highest rating to findings that stand-your-ground laws are associated with more gun homicides, and finds moderate evidence that dealer background checks reduce them. It rates the evidence on most other laws as limited or inconclusive. A study of Connecticut's 1995 permit-to-purchase law associated it with a 40% fall in gun homicides over ten years, with no matching fall in other homicides. Critics noted that the study's comparison group was 72% Rhode Island and that similar drops occurred in most other states. A separate study of right-to-carry laws estimated violent crime 13% to 15% higher ten years after adoption.",
    ),
    p(
      "Homicide has since fallen sharply without any new federal restriction. The Council on Criminal Justice found big-city homicide rates 21% lower in 2025 than in 2024, and 18% lower again in the first half of 2026, putting the national rate on course for its lowest level since 1900. The group said there was no single or easy explanation.",
    ),
    h("Mass shootings"),
    p(
      "Mass shootings are a small share of gun deaths but drive much of the debate. One study found that high-fatality mass shootings from 1990 to 2017 involving large-capacity magazines had a 62% higher average death toll, and that states without a magazine ban had more than double the rate of such shootings. A Justice Department-funded evaluation of the 1994 assault weapons ban concluded that its effects, if renewed, were likely to be small. Everytown, a gun-control advocacy group, found that in mass shootings from 2016 to 2025, attacks involving assault weapons or large magazines averaged 24.4 people shot, against 5.6 when neither was used.",
    ),
    p(
      "Opponents of bans note that about 24.6 million Americans have owned AR-15-style rifles, among the most common guns in the country, and that rifles of every kind were involved in 3% of the 11,717 gun murders the FBI tallied for 2024, against 53% for handguns. In 74% of the mass shootings in a Mother Jones database covering 1982 to 2019, the guns were obtained legally.",
    ),
    p(
      "Guns are also used in self-defense. A 2021 survey of gun owners estimated about 1.67 million defensive uses a year; government crime surveys produce far lower estimates, about 108,000 to 116,000.",
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
    "donohue-rtc",
    "connecticut-ptp",
    "ct-synthetic-critique",
    "homicide-decline-2025-26",
    "australia-buyback",
    "lcm-ban-study",
    "assault-weapon-casualties",
    "koper-awb-1994",
    "ar15-ownership-common",
    "background-check-pass",
    "defensive-gun-use",
  ],
};

// ---------------------------------------------------------------------------
// Immigration and the border (rebuilt 3 Nov 2026 against the rewritten map; re-read 10 Nov 2026)
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
          text: "Supporters say the collapse came when everyone caught was detained or returned: after releases ended in January 2025, monthly apprehensions fell below 10,000 and stayed there. The government also reports about 250 miles of new barrier and an estimated 80% fall in migrant deaths, and fewer crossings starve smuggling cartels of their fees.",
        },
        {
          lead: "The law applies to everyone.",
          text: "About 980,000 deportations were carried out in the first 18 months of President Trump's second term, including about 190,000 of people convicted of crimes. Most deportations, 69%, were of people caught at the border. Interior removals have risen from 8,000 a month to 19,000 as the system scales, and about 170,000 of the deportations were voluntary departures, which let people leave without detention. Supporters argue that a law no one enforces invites the next surge.",
        },
        {
          lead: "Asylum was a back door.",
          text: "Even before 2025, asylum was granted in only about 14% of all asylum decisions in fiscal 2023, a count that includes cases abandoned, withdrawn or never decided. The court backlog reached 3.7 million cases at the end of fiscal 2024 and has since fallen to about 3.04 million, the first decline since at least 2012.",
        },
        {
          lead: "Congress funded it.",
          text: "The July 2025 reconciliation act added $170.7 billion for enforcement, including $46.6 billion for border wall construction and money to hire 10,000 more ICE officers.",
        },
      ],
    },
    h("Arguments against"),
    {
      kind: "list",
      items: [
        {
          lead: "Much of the drop came earlier.",
          text: "Monthly apprehensions fell from 249,740 in December 2023 to 47,324 in December 2024, a fall Customs and Border Protection itself credited to a June 2024 Biden-era rule limiting asylum between ports of entry.",
        },
        {
          lead: "Who is being removed.",
          text: "Only 20% of the 980,000 deportations were of people convicted of a crime, and 31% of formal removals, against an average of 44% from fiscal 2009 to 2021. Of those deported after two or more years in the US, 71% had never been convicted, and of those deported after ten or more years, 61%. In July 2026, 70.6% of the 65,765 people in ICE detention had no criminal conviction.",
        },
        {
          lead: "Asylum is being shut.",
          text: "The asylum grant rate fell to 5.5% in June 2026 after 279 immigration judges, about 38% of the bench, were fired or resigned, and three-quarters of the long-serving judges who stayed raised their denial rates. Applicants now pay a $100 fee, plus $100 for each year a case is pending.",
        },
        {
          lead: "Human costs.",
          text: "A record 29 people died in ICE custody in the first half of fiscal 2026, and agents held more than 170 US citizens in the first nine months of the drive, nearly 20 of them children. Closing asylum at the border also pushes people toward remote desert crossings, where Border Patrol counted 895 deaths in fiscal 2022.",
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
    "migrant-death-toll-record",
    "backlog-falling-2025",
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
      "Inside the country, the government carried out about 980,000 deportations between January 2025 and July 2026, according to an estimate by the Migration Policy Institute, which said the figure was consistent with the department's public statements. Deportations are up from the Biden and first Trump administrations but remain well below the levels of the early 2000s.",
    ),
    h("What closed the border"),
    p(
      "Supporters of the administration's approach credit enforcement. After the new administration ended releases and CBP One appointments in January 2025, monthly apprehensions fell below 10,000 from February and stayed there. DHS also reports about 250 miles of new barrier since January 2025 and an estimated 80% fall in migrant deaths.",
    ),
    p(
      "Critics point out that much of the decline came earlier. Monthly apprehensions fell from 249,740 in December 2023 to 47,324 in December 2024, after a June 2024 Biden administration rule limiting asylum between ports of entry. Customs and Border Protection itself credited the fall to that rule. Critics add that migration responds to Mexico's own enforcement and to conditions in Venezuela, Central America and Mexico that US policy does not control.",
    ),
    p(
      "Skeptics of enforcement also cite history: the American Immigration Council estimates that about $532.5 billion has been spent on the enforcement agencies since the Department of Homeland Security was created in 2003, and crossings still surged in 2019 and again from 2021 to 2023. They also argue that closing the border to asylum pushes people to cross in remote desert, where Border Patrol counted 895 deaths in fiscal 2022. Supporters reply that a law no one enforces invites the next surge, and that fewer crossings starve smuggling cartels of their fees.",
    ),
    h("Who is being deported"),
    p(
      "About 190,000 of the deportations, or 20%, were of people convicted of a crime, according to the institute. Among formal removals the share was 31%, against an average of 44% from fiscal 2009 to 2021. Most deportations, 69%, were of people first stopped at the border, and about 170,000 were voluntary departures. Of those deported after living in the US for two years or more, 71%, about 280,000 people, had no criminal conviction. Interior deportations rose from 8,000 a month in the first three months to 19,000 a month in May to July 2026.",
    ),
    p(
      "Detention has reached record levels. ICE held 65,765 people in July 2026, according to TRAC, a research center at Syracuse University, and 70.6% of them had no criminal conviction. NPR reported that 29 people died in ICE custody in the first half of fiscal 2026, a record. The Department of Homeland Security said deaths were a tiny share of the detained population.",
    ),
    p(
      "The July 2025 reconciliation act added $170.7 billion for immigration and border enforcement, including $45 billion for new detention centers, $46.6 billion for border wall construction and money to hire 10,000 more ICE officers.",
    ),
    h("Asylum"),
    p(
      "Asylum was granted in about 14% of all asylum decisions in fiscal 2023, a count that includes cases abandoned, withdrawn or never adjudicated. The grant rate in immigration court, as TRAC measures it, had been over 50% early in the Biden administration and 32% at its end. By June 2026 it had fallen to 5.5%, an all-time low. In fiscal 2025 and 2026, 279 immigration judges, about 38% of the bench, were fired or resigned, and three-quarters of the long-serving judges who stayed raised their denial rates, by an average of 33 percentage points. Asylum seekers must now pay a $100 fee to apply, plus $100 for each year their case is pending.",
    ),
    p(
      "Supporters say asylum had become a route for economic migration and that faster decisions serve genuine refugees better; the court backlog fell from 3.7 million cases at the end of fiscal 2024 to about 3.04 million by September 2026, the first decline since at least 2012. Critics say the falling grant rate reflects a remade bench rather than weaker claims, noting that grant rates have always varied widely by judge and that people with lawyers win far more often.",
    ),
    p(
      "There have also been mistakes. ProPublica found that agents held more than 170 US citizens in the first nine months of the enforcement drive, nearly 20 of them children.",
    ),
  ],
  sourceIds: [
    "encounters-drop-post-restrictions",
    "record-encounters-fy2023",
    "mpi-980k-deportations",
    "decline-began-under-biden",
    "enforcement-spending-333-billion",
    "migrant-death-toll-record",
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
// Transgender athletes in women's sports (brought up to the rewritten map 3 Nov 2026; re-read 10 Nov 2026)
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
          lead: "Girls who never went through male puberty.",
          text: "A 2018 review co-written by World Athletics' medical director found no sex gap in testosterone or athletic performance before puberty. The plaintiff in the 2026 Supreme Court case took puberty blockers and never went through male puberty, and in five years was the only transgender girl publicly identified in West Virginia seeking to play girls' sports.",
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
          text: "A 2020 study of US Air Force fitness tests found transgender women still ran about 12% faster than cisgender women after two years of hormone therapy, down from about 21% before transition.",
        },
        {
          lead: "Advantages that stay.",
          text: "A 2021 review put the male edge at 10% to 50% depending on the sport and found a year of testosterone suppression cuts muscle and strength by only about 5%. Height and skeletal frame do not change, and elite medals are decided by margins under 1%.",
        },
        {
          lead: "The purpose of the women's category.",
          text: "Critics argue that sex-segregated sport exists to give female athletes fair competition, and that letting athletes with male-puberty advantages compete undermines it. In contact sports, they add, the risk is injury, not just a lost race. Transgender women can still compete in men's or open events.",
        },
        {
          lead: "Lost opportunities.",
          text: "A 2024 report by a UN Special Rapporteur cited a count of more than 890 medals lost by female athletes in 29 sports, though the figure came from submissions by groups that campaign against inclusion and hasn't been independently audited.",
        },
        {
          lead: "One clear line.",
          text: "Supporters of a single rule by sex say that testing each child's hormones and comparing her with every girl in her event is unworkable, and that most girls compete at school, for team places, records and college recruitment, so that level needs protection more than the Olympics does.",
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
          text: "From puberty on, male testosterone levels give an advantage of at least 8% to 12%, one review found. Whether a girl who took puberty blockers from its onset keeps any edge is unknown: almost no research has measured girls who transitioned that early.",
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
      "Major sports bodies have moved toward restriction: World Athletics in 2023 (by a one-time gene test since September 2025), the NCAA in February 2025 (transgender women may still practice with women's teams, but not compete), and the IOC in March 2026, with a policy that applies from the 2028 Games and exempts grassroots and recreational sport. In June 2026 the US Supreme Court ruled 6–3 that states may keep girls' and women's school teams for biological females; 27 states have such laws.",
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
      "In March 2026, the International Olympic Committee adopted a policy limiting the female category at its events to athletes who pass a one-time SRY gene screening. The rule applies from the 2028 Los Angeles Games and is not retroactive. Grassroots and recreational sport is exempt.",
    ),
    p(
      "The decision reversed the IOC's 2021 framework, which had left eligibility to individual sports federations and said no athlete should be excluded solely because of their transgender identity. From 2004, the IOC had allowed transgender women to compete in women's events under conditions that changed over time.",
    ),
    p(
      "Other governing bodies moved first. In March 2023, World Athletics barred transgender women who had gone through male puberty from international women's competition, regardless of hormone therapy. Since September 2025 its female category has required a one-time test for the SRY gene. Its president, Sebastian Coe, said that at elite level an athlete must be biologically female to compete in the female category. In February 2025, the day after a federal executive order on Title IX, the NCAA limited competition in women's college sports to athletes assigned female at birth. Transgender women may still practice with women's teams.",
    ),
    p(
      "In June 2026 the US Supreme Court ruled 6–3, in West Virginia v. B.P.J., that states may keep girls' and women's school teams for biological females without comparing athletes one by one. Twenty-seven states have such laws. The majority said that whether athletes on puberty blockers or hormones keep an advantage is still debated by scientists, and that legislatures and schools are better placed to draw the lines. Three justices dissented in part, saying unresolved factual questions should have gone back to the trial court.",
    ),
    h("What the research shows"),
    p("Much of the debate turns on what hormone therapy does to the advantages of male puberty."),
    p(
      "A 2021 systematic review in the British Journal of Sports Medicine found that testosterone suppression brings hemoglobin, which carries oxygen and affects endurance, to levels typical of women within about four months. Muscle mass and strength fall over the first year but remained above those of women after 36 months.",
    ),
    p(
      "A 2020 study of US Air Force fitness test data found that transgender women ran about 12% faster than other women after two years of hormone therapy, down from about 21% before. Differences in push-ups and sit-ups disappeared within two years. Advocates for inclusion note that military fitness tests are not elite competition.",
    ),
    p(
      "A 2021 review in Sports Medicine put the male performance edge at 10% to 50% depending on the sport and found that a year of testosterone suppression cut muscle and strength by only about 5%. Height and skeletal frame do not change, and supporters of restrictions note that elite medals are decided by margins under 1%. A small 2024 lab study funded by the IOC found transgender women athletes stronger in handgrip than other women but lower in jump height and aerobic capacity relative to body mass.",
    ),
    p(
      "Before puberty there is no sex difference in testosterone or athletic performance, a 2018 review co-written by World Athletics' medical director found; from puberty on, it put the male advantage at 8% to 12% at least. Almost no research has measured transgender girls who began puberty blockers before male puberty, as the plaintiff in the Supreme Court case did.",
    ),
    h("Fairness and inclusion"),
    p(
      "Supporters of restrictions argue that the women's category exists to give female athletes fair competition. A 2024 report to the UN General Assembly by the Special Rapporteur on violence against women and girls cited a count of more than 890 medals lost by female athletes in 29 sports. The figure came from submissions by groups that campaign against inclusion and has not been independently checked. In contact sports, supporters add, the risk is injury as well as a lost race.",
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
