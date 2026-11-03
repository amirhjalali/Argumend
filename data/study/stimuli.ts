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
 *   ±15% of the visible word count of the topic page (ARM_A_VISIBLE_WORDS,
 *   measured on 3 Nov 2026 with Playwright inside /study).
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
 * Visible words of arm (a) as the study renders it (the topic page without
 * its "Keep exploring" links), every fold closed, 3 Nov 2026: the innerText
 * of `[data-study-stimulus=map] article`, split on whitespace. It includes
 * the page's labels and its repeated crux questions, so it overstates what
 * there is to read a little. Re-measure if a map's page changes before the
 * study runs.
 */
export const ARM_A_VISIBLE_WORDS: Record<StudyTopic, number> = {
  "gun-control-effectiveness": 570,
  "immigration-border-crisis": 592,
  "transgender-athletes-sports": 664,
};

export const LENGTH_TOLERANCE = 0.15;

const h = (text: string): StudyBlock => ({ kind: "heading", text });
const p = (text: string): StudyBlock => ({ kind: "paragraph", text });

// ---------------------------------------------------------------------------
// Gun laws
// ---------------------------------------------------------------------------

const gunChatbot: ChatbotStimulus = {
  arm: "chatbot",
  topic: "gun-control-effectiveness",
  prompt:
    "Give me both sides of the gun control debate. Do stricter gun laws actually reduce gun violence and mass shootings?",
  blocks: [
    p(
      "This is one of the most polarized questions in American politics, and the research is less settled than either side often suggests. Here's a balanced overview.",
    ),
    h("The case that stricter gun laws reduce violence"),
    {
      kind: "list",
      items: [
        {
          lead: "International comparisons.",
          text: "The US firearm death rate (homicides, suicides and accidents combined) was about 12.8 per 100,000 in 2024, according to the CDC, or roughly 44,000 deaths. That is an order of magnitude higher than in wealthy democracies such as the UK and Japan, which pair strict laws with some of the lowest firearm death rates in the world.",
        },
        {
          lead: "Australia.",
          text: "After Australia's 1996 National Firearms Agreement, which banned semiautomatic rifles and bought back about 650,000 guns, the country went from 13 fatal mass shootings in 1979–1996 to none from 1997 through May 2016. Total firearm deaths fell from an average of 3.6 to 1.2 per 100,000.",
        },
        {
          lead: "Weapon type.",
          text: "Everytown, a gun-control advocacy group, found that US mass shootings involving assault weapons from 2015 to 2022 averaged 11.5 people killed, against 5.1 for shootings with other guns.",
        },
        {
          lead: "Targeted laws.",
          text: "Studies of red flag laws estimated firearm-suicide reductions of about 7.5% in Indiana and 13.7% in Connecticut. Supporters also argue that the objection that criminals ignore laws applies to every law.",
        },
      ],
    },
    h("The case against"),
    {
      kind: "list",
      items: [
        {
          lead: "The US is different.",
          text: "There are an estimated 393 million civilian guns in the US, about 120 for every 100 residents. New restrictions on sales barely reach that existing stockpile.",
        },
        {
          lead: "Most mass shooters buy legally.",
          text: "In Mother Jones' database of mass shootings since 1982, about 74% of the guns used were obtained legally, so background checks alone would not have stopped most of these attackers.",
        },
        {
          lead: "Defensive use.",
          text: "Guns are also used to defend against crime. Estimates vary enormously: the National Crime Victimization Survey suggests roughly 60,000–120,000 defensive uses a year, while some surveys put the number in the millions.",
        },
        {
          lead: "Substitution.",
          text: "Determined attackers may turn to other weapons, such as vehicles or bombs.",
        },
        {
          lead: "Comparisons can mislead.",
          text: "Switzerland has high gun ownership and comparatively low violence, and US violence is concentrated in specific areas.",
        },
      ],
    },
    h("Key points of contention"),
    {
      kind: "numbered",
      items: [
        {
          lead: "Causation.",
          text: "Even the Australian study's authors say they can't prove the law caused the decline, since deaths not involving guns also fell. How much of the US rate comes from guns and gun laws rather than other factors, like drug markets, concentrated violence and mental health, is the core empirical dispute.",
        },
        {
          lead: "Which laws.",
          text: "RAND's review of the research found that for most gun laws the rigorous evidence is limited or inconclusive. Its strongest findings are that safe-storage laws reduce youth firearm deaths and that stand-your-ground laws are linked to more homicides.",
        },
        {
          lead: "Values.",
          text: "The debate also involves constitutional protections for gun ownership, self-defense, and how to weigh individual rights against public safety.",
        },
      ],
    },
    h("Bottom line"),
    p(
      "Both sides can point to real evidence. The answer may depend on the specific law, and on how you weigh rights, risks and uncertain evidence. If you'd like, I can go deeper on a particular policy, such as background checks or assault weapons bans.",
    ),
  ],
  sourceIds: [
    "international-rates",
    "australia-buyback",
    "assault-weapon-casualties",
    "red-flag-laws",
    "existing-guns",
    "background-check-pass",
    "defensive-gun-use",
    "substitute-methods",
    "natural-experiment",
    "assault-weapon-lethality",
  ],
};

const gunArticle: ArticleStimulus = {
  arm: "article",
  topic: "gun-control-effectiveness",
  headline: "Do stricter gun laws reduce gun violence? What the research shows",
  dek: "The US has far more guns and gun deaths than other rich democracies. Researchers still disagree about how much gun laws can change that.",
  blocks: [
    p(
      "About 44,000 people died from gunshot wounds in the United States in 2024, a rate of 12.8 per 100,000 people, according to the Centers for Disease Control and Prevention. The figure includes homicides, suicides and accidents. It is an order of magnitude higher than in other wealthy democracies such as Britain and Japan.",
    ),
    p(
      "Whether stricter laws would bring that number down is one of the most contested questions in American politics. The research offers fewer firm answers than the debate suggests.",
    ),
    h("What the evidence says"),
    p(
      "The RAND Corporation, which reviewed thousands of studies on gun policy, found that for most gun laws the rigorous evidence on cause and effect is limited or inconclusive. Its strongest findings were that safe-storage laws reduce firearm deaths among young people and that stand-your-ground laws are linked to more homicides.",
    ),
    p(
      "RAND rated the evidence on extreme-risk protection orders, known as red flag laws, as limited. Studies of early laws estimated drops in firearm suicides of about 7.5% in Indiana and 13.7% in Connecticut, with some offsetting rise in suicides by other means.",
    ),
    h("The Australian example"),
    p(
      "Supporters of stricter laws often point to Australia. After a 1996 national agreement that banned semiautomatic rifles and bought back about 650,000 firearms, the country recorded no fatal mass shootings from 1997 through May 2016, compared with 13 in the previous 18 years. Total firearm deaths fell from an average of 3.6 to 1.2 per 100,000 people.",
    ),
    p(
      "The authors of a 2016 study of those figures cautioned that they could not determine whether the law caused the change, because deaths not involving firearms also declined.",
    ),
    h("Why the US may differ"),
    p(
      "Opponents of stricter laws say comparisons with other countries overlook what makes the United States unusual. Americans hold an estimated 393 million civilian firearms, about 120 for every 100 residents, according to the Small Arms Survey. New restrictions on sales do not directly reach those guns.",
    ),
    p(
      "They also note that in a Mother Jones database of mass shootings since 1982, about 74% of the guns used were obtained legally, which suggests that expanding background checks alone would not have stopped most of those attackers.",
    ),
    p(
      "Guns are also used in self-defense, though estimates of how often vary widely. The National Crime Victimization Survey suggests roughly 60,000 to 120,000 defensive uses a year. Other surveys have produced estimates in the millions, which RAND has questioned.",
    ),
    h("Assault weapons"),
    p(
      "Gun-control advocates argue that the type of weapon matters. Everytown, an advocacy group, found that mass shootings involving assault weapons from 2015 to 2022 killed an average of 11.5 people, compared with 5.1 in shootings with other guns. RAND rates the evidence on whether assault weapon bans reduce deaths as inconclusive, and opponents argue that attackers could switch to other weapons.",
    ),
    p(
      "For now, both supporters and opponents of stricter laws can point to research that backs their case.",
    ),
  ],
  sourceIds: [
    "international-rates",
    "red-flag-laws",
    "australia-buyback",
    "existing-guns",
    "background-check-pass",
    "defensive-gun-use",
    "assault-weapon-casualties",
    "substitute-methods",
  ],
};

// ---------------------------------------------------------------------------
// Immigration and the border
// ---------------------------------------------------------------------------

const immigrationChatbot: ChatbotStimulus = {
  arm: "chatbot",
  topic: "immigration-border-crisis",
  prompt:
    "Give me both sides of the immigration debate. Is the current approach of border enforcement plus asylum limits the best way to manage US immigration?",
  blocks: [
    p("This is a complex and contentious question. Here's an overview of the main arguments on each side."),
    h("Arguments for enforcement and asylum limits"),
    {
      kind: "list",
      items: [
        {
          lead: "The 2023 surge.",
          text: "Encounters at the southwest border hit a record 2.47 million in fiscal 2023, according to US Customs and Border Protection. Supporters argue that a system seen as permissive creates a pull factor, and that barriers combined with sensors, drones and surveillance towers channel crossings to areas that can be watched.",
        },
        {
          lead: "The policies coincided with a sharp drop.",
          text: "After the Biden administration's asylum restrictions in 2023 and 2024, and the Trump administration's return to Remain in Mexico and expanded expedited removal in 2025, crossings fell dramatically. In February 2025, Border Patrol apprehended 8,347 people between ports of entry at the southwest border, down 94% from February 2024.",
        },
        {
          lead: "Asylum claims.",
          text: "In fiscal 2023, immigration judges granted asylum in about 14% of cases decided on the merits. Supporters say this shows many claims don't meet the legal standard, and that smugglers, who charge $5,000 to $15,000 a person, coach migrants to claim asylum.",
        },
        {
          lead: "Wages.",
          text: "Economist George Borjas estimated that immigration between 1980 and 2000 cut wages for native-born workers without a high school diploma by 7.4%.",
        },
      ],
    },
    h("Arguments against"),
    {
      kind: "list",
      items: [
        {
          lead: "Decades of enforcement.",
          text: "The American Immigration Council puts federal enforcement spending at roughly $333 billion from 1986 through the early 2020s, and Border Patrol grew from about 3,700 agents in 1992 to about 19,500 in 2023. Crossings still surged repeatedly, which critics say shows enforcement alone doesn't produce lasting deterrence.",
        },
        {
          lead: "Human cost.",
          text: "CBP recorded about 890 migrant deaths in southwest border sectors in fiscal 2022, the deadliest year on record. Research suggests enforcement pushes people onto more remote, dangerous routes. At least 200 people have died in ICE custody since 2004, and DHS's own Inspector General has documented overcrowding and inadequate medical care in detention.",
        },
        {
          lead: "Economic contributions.",
          text: "The Congressional Budget Office projected in 2024 that the recent immigration surge would add $7 trillion to US GDP over a decade. Unauthorized immigrants paid an estimated $96.7 billion in taxes in 2022.",
        },
        {
          lead: "Asylum obligations.",
          text: "Critics argue the restrictions conflict with US obligations under the 1951 Refugee Convention, and note that asylum grant rates range from under 5% to over 90% depending on the judge.",
        },
      ],
    },
    h("Key points of contention"),
    {
      kind: "numbered",
      items: [
        {
          lead: "What caused the drop?",
          text: "Mexico increased its own enforcement over the same period, and conditions changed in the countries migrants come from, so it's hard to isolate the effect of US policy. Supporters counter that past surges would have been worse without enforcement.",
        },
        {
          lead: "Who bears the costs?",
          text: "Even if immigration benefits the economy overall, people disagree about the effects on low-wage workers and border communities. Borjas's findings have been challenged by other economists, including David Card.",
        },
        {
          lead: "The backlog.",
          text: "The immigration court backlog peaked near 3.7 million cases in fiscal 2024. Both sides see that as a problem, but they disagree on whether the fix is more judges or fewer claims.",
        },
      ],
    },
    h("Bottom line"),
    p(
      "Recent restrictions coincided with far fewer crossings, but there are real questions about cause, cost and humanitarian impact. Where you land often depends on how you weigh border control against economic and humanitarian considerations. Let me know if you'd like more detail on any specific policy.",
    ),
  ],
  sourceIds: [
    "record-encounters-fy2023",
    "encounters-drop-post-restrictions",
    "asylum-grant-rate-14-percent",
    "borjas-wage-depression",
    "enforcement-spending-333-billion",
    "migrant-death-toll-record",
    "ice-custody-deaths",
    "cbo-7-trillion-gdp",
    "unauthorized-immigrant-taxes",
    "court-backlog-3-7-million",
    "enforcement-deterrence-causation",
    "wage-impact-analysis",
    "asylum-grant-rate-analysis",
  ],
};

const immigrationArticle: ArticleStimulus = {
  arm: "article",
  topic: "immigration-border-crisis",
  headline: "Border crossings fell sharply after asylum limits. Why the debate isn't over",
  dek: "Encounters at the southwest border hit a record in 2023, then dropped. What drove the decline, and at what cost, remain in dispute.",
  blocks: [
    p(
      "Encounters at the US-Mexico border reached a record 2.47 million in fiscal 2023, according to US Customs and Border Protection. That included about 2.05 million people stopped between official ports of entry and 420,000 at them. In peak months, CBP was processing more than 10,000 encounters a day.",
    ),
    p(
      "Then the numbers fell steeply. Asylum restrictions came in under President Biden in June 2023 and June 2024. In early 2025 the Trump administration reinstated the Remain in Mexico policy, expanded expedited removal and shut down the CBP One app. In February 2025, Border Patrol apprehended 8,347 people between ports of entry at the southwest border, down 94% from 140,641 a year earlier.",
    ),
    h("What drove the decline"),
    p(
      "Supporters of the current approach say the drop shows that enforcement and asylum limits deter crossings. Critics point out that Mexico stepped up its own enforcement over the same period, under pressure from Washington, and that economic conditions shifted in key countries of origin. It is difficult to separate those effects.",
    ),
    p(
      "Skeptics of enforcement also cite history. The American Immigration Council estimates that federal immigration enforcement cost roughly $333 billion from 1986 through the early 2020s, and Border Patrol grew from about 3,700 agents in 1992 to about 19,500 by 2023. Crossings still surged in the late 1990s, the mid-2000s, 2019 and 2021-2023.",
    ),
    h("The human toll"),
    p(
      "CBP recorded about 890 migrant deaths in southwest border sectors in fiscal 2022, the deadliest year on record by that count. Researchers at the University of Arizona have documented how enforcement in urban areas has pushed crossings into remote, more dangerous terrain since 1994. Supporters of enforcement argue that fewer crossings will ultimately mean fewer deaths.",
    ),
    h("A backlogged system"),
    p(
      "The immigration court backlog reached about 3.7 million pending cases at the end of fiscal 2024, up from about 1.1 million in 2019, before easing to about 3.4 million during fiscal 2025, according to TRAC, a research center at Syracuse University. Roughly 600 to 700 immigration judges handle the caseload, and TRAC put the average wait at about 636 days as of March 2025.",
    ),
    p(
      "In fiscal 2023, judges granted asylum in about 14% of cases decided on the merits. Supporters of restrictions say that shows many claims lack merit, and that smugglers, who charge $5,000 to $15,000 a person, coach migrants to claim asylum as a way in. Others note that grant rates range from under 5% to over 90% depending on the judge, and that applicants with lawyers are five times as likely to win.",
    ),
    h("The economic picture"),
    p(
      "The Congressional Budget Office projected in 2024 that the recent immigration surge would add $7 trillion to US economic output and $1 trillion to federal revenue over the next decade. The Institute on Taxation and Economic Policy estimated that unauthorized immigrants paid $96.7 billion in taxes in 2022.",
    ),
    p(
      "Some economists see costs falling on particular groups. Harvard economist George Borjas found that immigration from 1980 to 2000 cut wages for native-born workers without a high school diploma by 7.4%, a finding other economists dispute.",
    ),
  ],
  sourceIds: [
    "record-encounters-fy2023",
    "encounters-drop-post-restrictions",
    "enforcement-spending-333-billion",
    "migrant-death-toll-record",
    "court-backlog-3-7-million",
    "asylum-grant-rate-14-percent",
    "cbo-7-trillion-gdp",
    "unauthorized-immigrant-taxes",
    "borjas-wage-depression",
  ],
};

// ---------------------------------------------------------------------------
// Transgender athletes in women's sports
// ---------------------------------------------------------------------------

const transChatbot: ChatbotStimulus = {
  arm: "chatbot",
  topic: "transgender-athletes-sports",
  prompt:
    "Give me both sides: should transgender women on hormone therapy be allowed to compete in women's sports?",
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
          lead: "Natural variation.",
          text: "Sport has always rewarded physical outliers. Some cisgender women are taller and larger than some transgender women, elite female basketball players are taller than most men, and Michael Phelps's wingspan exceeds his height by three inches; nobody proposes banning those advantages.",
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
          lead: "Permanent skeletal differences.",
          text: "Height, shoulder width, hand and foot size and bone structure set during male puberty are not reversed by hormone therapy. In elite sport, the gap between gold and fourth place is often under 1%.",
        },
        {
          lead: "The purpose of the women's category.",
          text: "Critics argue that sex-segregated sport exists to ensure fair competition for female athletes, and that letting athletes with male-puberty advantages compete undermines it. Women fought for decades for Title IX and equal opportunities in sport, and transgender women can still compete in men's or open categories.",
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
      "Major sports bodies have moved toward restriction: World Athletics in 2023, the NCAA in February 2025 (transgender women may still practice with women's teams, but not compete), and the IOC in March 2026, with a policy that applies from the 2028 Games.",
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
    "skeletal-structure-permanence",
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
      "In March 2026, the International Olympic Committee adopted a policy limiting the female category at its events to athletes who pass a one-time SRY gene screen, a test for a gene on the Y chromosome. The rule applies from the 2028 Los Angeles Games, with a narrow exception for certain differences of sex development that do not confer a testosterone-driven advantage. Grassroots sport is exempt.",
    ),
    p(
      "The decision reversed the IOC's 2021 framework, which had left eligibility to individual sports federations and said no athlete should be excluded solely because of their transgender identity. From 2004, the IOC had allowed transgender women to compete in women's events under conditions that changed over time.",
    ),
    p(
      "Other governing bodies moved first. In March 2023, World Athletics barred transgender women who had gone through male puberty from international women's competition, regardless of hormone therapy. Its president, Sebastian Coe, said the decision put fairness and the integrity of the female category first. In February 2025, the day after a federal executive order on Title IX, the NCAA limited competition in women's college sports to athletes assigned female at birth, a change expected to face legal challenges. Transgender women may still practice with women's teams.",
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
      "Skeletal traits set during puberty, including height, shoulder width and hand and foot size, are not reversed by hormone therapy.",
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
    "skeletal-structure-permanence",
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
