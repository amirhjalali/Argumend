export const section230ReformData = {
  id: "section-230-reform",
  title: "Reforming Section 230",
  question: "Should Section 230 be significantly reformed or repealed?",
  meta_claim:
    "Section 230 should be significantly reformed or repealed.",
  status: "contested" as const,
  category: "technology" as const,
  // As of 3 November 2026: the Third Circuit let recommendation claims
  // against TikTok proceed (Anderson, Aug 2024); the Ninth Circuit applied
  // its precedent to dismiss Rohingya claims against Meta while all three
  // judges criticized that precedent (Doe 1 v. Meta, 28 Apr 2026); S. 3546,
  // the Sunset Section 230 Act, would repeal the law two years after
  // enactment (introduced 17 Dec 2025, ten senators of both parties).
  // ── Stage 1: the fact shown above everything ──
  keystone_fact: {
    statement:
      "Since 1996 Section 230 has protected websites from being sued over what their users post. Courts now split over what a platform's feed chooses to push. In 2024 the Third Circuit let a mother sue TikTok over a 'Blackout Challenge' video its algorithm showed her 10-year-old daughter, who died; in April 2026 the Ninth Circuit threw out Rohingya refugees' claims against Meta, though all three judges criticized the precedent that required it. The fight is over whether platforms should answer for what their feeds promote, and what that would cost lawful speech.",
    confidence: 95,
    source:
      "Anderson v. TikTok, No. 22-3061 (3d Cir. 27 August 2024); Doe 1 v. Meta Platforms, No. 24-1672 (9th Cir. 28 April 2026)",
    sourceUrl: "https://www2.ca3.uscourts.gov/opinarch/223061p.pdf",
  },
  // ── Stage 2: the crux-sheet lede ──
  simple_case: [
    "Every site that lets people post, from the biggest social networks to a local forum, leans on Section 230 to avoid being sued over its users' words.",
    "Ten senators from both parties back a bill to repeal it two years after passage. What replaces it decides whether families can sue over what feeds show their children, and how much lawful speech platforms delete to stay out of court.",
  ],
  last_updated: "2026-11-03",
  tags: ["section-230", "content-moderation", "free-speech", "platform-liability", "internet-policy"],
  pillars: [
    // =========================================================================
    // PILLAR 1: The accountability gap — can people harmed by feeds sue?
    // =========================================================================
    {
      id: "accountability-gap",
      title: "The Accountability Gap: Can People Harmed by Feeds Sue?",
      short_summary:
        "The Third Circuit treats a feed's recommendations as the platform's own speech, open to suit; the Ninth Circuit treats them as publishing, which Section 230 protects. Even where claims get past Section 230, they can fail on the merits, as the Supreme Court's 2023 Taamneh ruling showed.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Existing law already distinguishes third-party content, moderation and specified exceptions. Courts are drawing the line case by case: the Third Circuit let Nylah Anderson's mother sue TikTok over its own recommendations in 2024 without any change to the statute. Removing immunity would not make most of these suits win. In 2023 a unanimous Supreme Court threw out claims that Twitter, Facebook and Google aided ISIS, calling their recommendation algorithms 'merely part of that infrastructure' through which all content passes, without reaching Section 230 at all. The Surgeon General's 2023 advisory linked heavy social-media use to worse teen mental health, but that is an association, not proof that a particular feed caused a particular injury. Repeal would mostly raise the cost of defending suits that lose anyway.",
      proponent_rebuttal:
        "Platforms act like publishers when they rank and promote posts, and like neutral bulletin boards when someone sues. Courts have stretched a 1996 law written for message boards into what Ninth Circuit Judge Ryan Nelson called 'an all-purpose liability shield for internet platforms.' In April 2026 his court threw out claims that Facebook's design spread anti-Rohingya content that incited violence in Myanmar, and all three judges said circuit precedent had gone too far. Whether a grieving family can even reach a jury now depends on which circuit they live in. Ten senators from both parties, Graham, Durbin, Grassley, Hawley and Klobuchar among them, back a bill to repeal the law and force Congress to write a better one.",
      crux: {
        id: "amplification-causation",
        title: "Does Algorithmic Amplification Cause Compensable Harm?",
        question:
          "When a feed pushes a harmful post, is that the platform's own act, or still just publishing someone else's speech?",
        description:
          "Section 230 protects a platform treated as the publisher of another's content. If choosing what to recommend is the platform's own conduct, the law does not cover it and victims can sue; if it is publishing, they cannot. Courts are split, and even a claim that gets past Section 230 still has to prove the feed caused the injury.",
        methodology:
          "Compare published appellate decisions on recommendation and design claims by circuit, procedural stage and disposition, separating immunity rulings from merits rulings. Follow the claims that survive immunity, such as Anderson on remand, to see how many establish causation and damages. Pair that with studies that compare outcomes for users exposed and not exposed to a specific feed feature, with confounders accounted for.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Outcomes of recommendation claims that get past Section 230, such as Anderson on remand, tracking how many establish causation and win damages, beside controlled studies of whether specific feed features cause measurable harm.",
        },
        cost_to_verify: "Not costed here; it needs case coding and outcome studies.",
        falsification: {
          supporter_flip:
            "If recommendation claims that got past Section 230 mostly failed on causation, as the Taamneh claims failed on the merits, removing immunity would add defense costs without giving harmed families a remedy.",
          skeptic_flip:
            "If claims that got past Section 230 regularly proved that a feed's choices caused specific injuries, and controlled studies tied particular features to measurable harm, the case that immunity blocks real redress would be hard to answer.",
          common_ground:
            "A ruling that Section 230 does not bar a claim is not a finding that the platform caused the injury, and the circuits now disagree about whether recommendations are protected publishing.",
          live_disagreement:
            "Whether a platform choosing what to amplify is its own act that victims should be able to sue over, or publishing that immunity rightly protects because the alternative is liability for every ranking decision.",
        },
      },
      evidence: [
        {
          id: "anderson-tiktok",
          title: "Third Circuit, Aug 2024: TikTok's feed recommendations are its own speech, so Section 230 does not bar a suit over a 10-year-old's death",
          description:
            "TikTok's algorithm 'recommended and promoted videos posted by third parties to ten-year-old Nylah Anderson on her uniquely curated For You Page.' One showed the 'Blackout Challenge'; Nylah attempted it 'and unintentionally hanged herself.' The court reasoned that platforms 'are not immunized if they are sued for their own expressive activity', and that after the Supreme Court's 2024 Moody v. NetChoice ruling, a curated feed is the platform's own speech. It reversed in part and remanded. The ruling decides only that the claims can proceed; it is not a finding that TikTok caused the death.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 6,
          },
          source:
            "Anderson v. TikTok, No. 22-3061 (3d Cir. 27 August 2024), majority opinion",
          sourceUrl: "https://www2.ca3.uscourts.gov/opinarch/223061p.pdf",
          reasoning:
            "A federal appeals court opening the door reformers want opened. It shows courts can draw the line without Congress, which the other side cites too, so directness is 6.",
        },
        {
          id: "doe-meta-2026",
          title: "Ninth Circuit, Apr 2026: Rohingya claims against Meta dismissed, while all three judges say precedent stretched Section 230 too far",
          description:
            "Rohingya plaintiffs alleged that anti-Rohingya content spread on Facebook incited violence against them in Myanmar and that Meta designed Facebook to encourage it. The panel affirmed dismissal: each claim sought to hold Meta responsible 'as a publisher of third-party content.' Judge Berzon, joined by Judge Fletcher, wrote that circuit precedent 'stretched the term publisher in section 230 past the point of recognition' and urged en banc review of immunity for recommendations. Judge R. Nelson, who wrote the opinion, added that the court had 'over-read Section 230' and created 'an all-purpose liability shield for internet platforms.'",
          side: "for" as const,
          weight: { sourceReliability: 10, independence: 9, replicability: 7, directness: 6 },
          source: "Doe 1 v. Meta Platforms, No. 24-1672 (9th Cir. 28 April 2026), opinion and concurrences",
          sourceUrl: "https://cdn.ca9.uscourts.gov/datastore/opinions/2026/04/28/24-1672.pdf",
          reasoning:
            "The judges applying the law say it has grown past its text. Their remedy is en banc review of their own precedent, not repeal, and the opinion does not test whether the allegations were true, so directness is 6.",
        },
        {
          id: "durbin-graham-sunset",
          title: "S. 3546, the Sunset Section 230 Act (Dec 2025): repeal two years after enactment, backed by ten senators of both parties",
          description:
            "Introduced on 17 December 2025 by Sen. Lindsey Graham with Sens. Durbin, Grassley, Whitehouse, Hawley, Klobuchar, Blackburn, Blumenthal, Moody and Welch, the bill says: 'Section 230 of the Communications Act of 1934 (47 U.S.C. 230) is repealed', taking effect 'on the date that is 2 years after the date of enactment.' The delay is meant to force Congress to write a replacement. It was referred to the Commerce Committee.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source:
            "U.S. Government Publishing Office, S. 3546, introduced-in-Senate text (17 December 2025)",
          sourceUrl:
            "https://www.govinfo.gov/content/pkg/BILLS-119s3546is/html/BILLS-119s3546is.htm",
          reasoning:
            "Shows reform has unusual cross-party backing. A bill is a proposal, not evidence of what repeal would do, so directness is 4.",
        },
        {
          id: "surgeon-general-advisory",
          title: "Surgeon General 2023: teens on social media 3+ hours a day had about double the risk of poor mental-health outcomes",
          description:
            "The advisory cites a U.S. study of 6,595 adolescents aged 12-15 in which more than three hours a day of social-media use was associated with about double the risk of poor mental-health outcomes, after adjusting for baseline mental health. The advisory discusses benefits as well as harms and lists large gaps in the evidence. It does not address Section 230.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 3,
          },
          source:
            "U.S. Surgeon General, Social Media and Youth Mental Health (2023), pp. 6-7",
          sourceUrl:
            "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf",
          reasoning:
            "Shows why parents want a way to sue. An association across heavy users does not show that any one feed caused any one injury, or that a liability change would reduce harm, so directness is 3.",
        },
        {
          id: "twitter-taamneh",
          title: "Supreme Court, 9-0 (2023): recommendation claims against Twitter, Facebook and Google failed on the merits, without reaching Section 230",
          description:
            "On 18 May 2023 a unanimous Supreme Court held that claims that the platforms aided and abetted ISIS failed to state a claim under the Antiterrorism Act. It called their recommendation algorithms 'merely part of that infrastructure' through which all content is filtered, and said that, as alleged, they 'appear agnostic as to the nature of the content.' The Court decided the case on the anti-terrorism statute and did not address Section 230.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Twitter, Inc. v. Taamneh, No. 21-1496, 598 U.S. ___ (18 May 2023)",
          sourceUrl: "https://www.supremecourt.gov/opinions/22pdf/21-1496_d18f.pdf",
          reasoning:
            "Shows removing immunity would not by itself make recommendation suits win. It concerns one federal statute's aiding-and-abetting standard, not product-design or negligence claims, so directness is 5.",
        },
        {
          id: "statute-existing-exceptions",
          title: "Section 230 already excludes federal criminal law, intellectual property and some trafficking claims",
          description:
            "Section 230(c)(1) stops a site being treated as the publisher or speaker of information another person provided; (c)(2) separately protects good-faith filtering. Subsection (e) leaves federal criminal law, intellectual-property law, communications-privacy law and specified sex-trafficking claims untouched. These exceptions are specific, not a blanket carve-out for every harm.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 3,
          },
          source: "Office of the Law Revision Counsel, 47 U.S.C. 230(c) and (e), text through Public Law 119-120 (7 October 2026)",
          sourceUrl: "https://uscode.house.gov/us/usc/119-120/t47/s230/",
          reasoning:
            "Shows the law is not a total shield: prosecutors and copyright holders are untouched. Whether more exceptions are needed is the open question, so directness is 3.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Collateral damage — would liability make platforms delete
    // lawful speech?
    // =========================================================================
    {
      id: "collateral-damage",
      title: "Collateral Damage: Would Platforms Delete Lawful Speech?",
      short_summary:
        "The one big carve-out, 2018's FOSTA, produced one aggravated federal case in three years and pushed sex-trade sites overseas, GAO found. Germany's NetzDG, which fines platforms over unlawful posts, showed no measurable overblocking. The fight is whether liability buys safety or silence.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Liability teaches platforms to delete first. The one time Congress cut a hole in Section 230, FOSTA in 2018, GAO found one case with aggravated FOSTA charges as of March 2021, and found that FOSTA and the seizure of Backpage pushed many platforms overseas and made it 'harder for law enforcement to gather tips and evidence.' The law's authors chose this design on purpose: the 1995 amendment that became Section 230 passed the House 420-4, and the statute names removing 'disincentives' to filtering as a goal. Strip immunity and platforms either stop moderating or remove anything a lawyer flags.",
      proponent_rebuttal:
        "FOSTA was one badly drafted law, not proof that every reform fails. Germany's NetzDG makes big platforms face fines if they mishandle complaints about unlawful posts, and the evaluation the justice ministry commissioned found overblocking 'cannot be shown empirically' and 'no indications' of it being systematic. Reforms can be written narrowly: a duty of care for design choices, notice-and-takedown for court-adjudicated illegality, or liability only for paid amplification. The question is whether a well-designed rule can deter harm without silencing lawful speech, and Europe shows some can.",
      crux: {
        id: "over-removal-vs-deterrence",
        title: "Would Reform Suppress Lawful Speech More Than It Deters Harm?",
        question:
          "Can a reform deter targeted harms without a net loss of lawful speech?",
        description:
          "Compare what a specific liability change does to the harm it targets, to victims' ability to get redress, and to lawful speech. FOSTA's passage and Backpage's seizure both came in April 2018, so a before-and-after comparison cannot assign every later change to the law.",
        methodology:
          "Predefine affected services, outcomes and comparison groups. Separate aggravated FOSTA charges from other prosecutions, allegations from judgments, and removals from measured safety effects. For NetzDG and the EU's Digital Services Act, audit samples of removed posts for legality rather than relying on platform reports. Report spillovers and missing data.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An audit of samples of posts removed under a liability rule such as NetzDG or the EU's Digital Services Act, checking how many were lawful, beside measured changes in the targeted harm and in victims' redress.",
        },
        cost_to_verify: "Not costed here; it needs access to removed content and outcome data.",
        falsification: {
          supporter_flip:
            "If audits of posts removed under liability rules such as NetzDG found large shares were lawful, with no measurable fall in the targeted harm, the case that reform can be written without silencing speech would weaken.",
          skeptic_flip:
            "If audits found removed posts were overwhelmingly unlawful and the targeted harm fell measurably, the claim that liability always buys silence rather than safety would fail.",
          common_ground:
            "No liability rule removes only unlawful posts, and a count of prosecutions does not measure how much lawful speech a rule cost or how much harm it prevented.",
          live_disagreement:
            "Whether a liability change can be drafted to deter real harm without platforms deleting lawful speech to protect themselves, or whether over-removal is the predictable response to any exposure.",
        },
      },
      evidence: [
        {
          id: "fosta-gao",
          title: "GAO's 2021 Review: One Aggravated FOSTA Case Through March 2021, and Sex-Trade Sites Moved Overseas",
          description:
            "GAO identified one case with aggravated charges under FOSTA section 3 as of March 2021; restitution had not been sought or awarded in that ongoing case. It found that the April 2018 seizure of Backpage and the passage of FOSTA disrupted the online commercial sex market: many platform operators moved overseas and the market fragmented, which made it harder for law enforcement to gather tips and evidence. From 2014 to 2020 the Justice Department brought at least 11 criminal cases against people controlling such platforms. It is an enforcement count, not a measure of whether FOSTA deterred trafficking or how much lawful speech and safety tools platforms removed.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 5,
          },
          source:
            "U.S. GAO, Sex Trafficking: Online Platforms and Federal Prosecutions, GAO-21-385 (June 2021), highlights and pp. 25-28",
          sourceUrl: "https://www.gao.gov/products/gao-21-385",
          reasoning:
            "An audit agency's count of how the only major carve-out was used. It covers enforcement, not how much lawful speech was removed, and FOSTA's effects cannot be separated from Backpage's seizure, so directness is 5.",
        },
        {
          id: "netzdg-evaluation",
          title: "Germany's NetzDG Evaluation (2020): Overblocking 'Cannot Be Shown Empirically'",
          description:
            "Germany's Network Enforcement Act makes social networks liable to fines for systemic failures in handling complaints about unlawful content. The evaluation commissioned by the Federal Ministry of Justice (Eifert et al., 2020) concluded that overblocking 'lässt sich empirisch nicht belegen' (cannot be shown empirically) and found 'keine Anhaltspunkte' (no indications) of systematic overblocking. It also said the available material could not settle whether the fines push platforms to delete more under their own community standards, and that no one had comprehensively evaluated the removed content.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 5,
            directness: 3,
          },
          source:
            "Eifert et al., 'Evaluation des NetzDG', legal opinion commissioned by the German Federal Ministry of Justice (2020), pp. 53-54 and 63",
          sourceUrl: "https://kripoz.de/wp-content/uploads/2020/09/090920_Juristisches_Gutachten_Netz.pdf",
          reasoning:
            "One case where a platform duty was reviewed for lost lawful speech and none was shown. It is a ministry-commissioned review of a different duty in a different legal system, based on surveys and reports rather than an audit of removed posts, so directness is 3.",
        },
        {
          id: "moderators-dilemma-history",
          title: "1995: the amendment that became Section 230 passed the House 420-4, to remove 'disincentives' to filtering",
          description:
            "The House Clerk records adoption of the Cox amendment to H.R. 1555 by 420-4 on 4 August 1995. The enacted statute lists among its policies removing 'disincentives for the development and utilization of blocking and filtering technologies.' Its authors wanted sites to moderate without becoming liable for everything they missed.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 2,
          },
          source:
            "U.S. House Clerk, Roll Call 631 (4 August 1995); 47 U.S.C. 230(b)(4)",
          sourceUrl: "https://clerk.house.gov/Votes/1995631",
          reasoning:
            "Documents what Congress meant the law to do. A vote three decades ago does not measure what changing the law would do now, so directness is 2.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Who could afford the lawsuits?
    // =========================================================================
    {
      id: "innovation-competition",
      title: "Who Could Afford the Lawsuits?",
      short_summary:
        "Defending even a baseless suit costs money a small forum may not have. Industry groups say immunity built the U.S. internet economy; Europe's Digital Services Act puts its heaviest duties only on platforms with 45 million+ EU users. The question is whether reform would hit startups or giants.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Fixed legal costs may be harder for a small forum or startup to absorb than for Meta or Google, which can pay armies of lawyers and moderators. Without Section 230's early dismissal, a hobby forum, a review site or a new social app faces discovery and trial costs on every post a user complains about. Industry groups argue the immunity is why investors fund user-content startups in the U.S. more than in Europe. Repeal would hand the biggest incumbents a moat, because only they could afford to host everyone's speech.",
      proponent_rebuttal:
        "Rules can be scaled to size. Europe's Digital Services Act reserves its heaviest duties, yearly independent audits, systemic-risk assessments, researcher data access and a feed not based on profiling, for platforms with more than 45 million monthly EU users, because of 'their size and the potential impact they can have on society.' A U.S. reform could do the same: keep immunity for small sites and put duties on the largest feeds. The industry's economic case comes from industry-funded projections, not from observing what happened when liability changed. Immunity costs something too: the people harmed carry it.",
      crux: {
        id: "who-bears-repeal-cost",
        title: "Who Bears the Cost of Repeal: Incumbents or Startups?",
        question:
          "Would removing immunity burden small platforms most, or meaningfully constrain dominant ones?",
        description:
          "How a liability rule spreads its costs across firms decides whether it entrenches incumbents or checks them. Defense costs are partly fixed, which hurts small firms, but a rule can exempt them. Funding differences between countries do not isolate the effect of liability law from capital markets and demand.",
        methodology:
          "Measure legal and compliance costs, service exits and investment by firm size before and after specific liability changes, such as FOSTA in 2018 and the DSA's tiers from 2023. Compare with matched firms not covered. Separate projected losses from observed outcomes.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Firm-level data on legal costs, exits and venture investment by size, before and after FOSTA and the DSA's size-tiered duties, compared with similar firms the rules did not cover.",
        },
        cost_to_verify: "Not costed here; it needs firm-level cost and investment data.",
        falsification: {
          supporter_flip:
            "If firm-level data showed liability changes like FOSTA or the DSA drove small services to exit and cut investment in new ones while the largest platforms gained share, the case for broad reform would weaken.",
          skeptic_flip:
            "If size-tiered rules like the DSA left small services' costs, entry and investment unchanged while constraining the largest platforms, the prediction that any reform entrenches incumbents would fail.",
          common_ground:
            "Defending even meritless suits costs money, those costs weigh more on small services, and the EU chose to put its heaviest platform duties only on services with more than 45 million EU users.",
          live_disagreement:
            "Whether removing or narrowing immunity would mainly entrench the giants who can afford lawsuits, or could be written to bind them while sparing small sites.",
        },
      },
      evidence: [
        {
          id: "nera-economic-value",
          title: "Industry group's 2019 case: immunity underpins U.S. internet investment (advocacy, not a measured effect)",
          description:
            "The Disruptive Competition Project, run by a tech-industry association, argued in 2019 that intermediary-liability protections support investment. It cited NERA and Internet Association projections, investor polling, and a separate Copia/NetChoice comparison of U.S. and EU funding. These are projections and comparisons, not an observed estimate of what repeal would cost or who would bear it.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 3,
          },
          source:
            "Disruptive Competition Project, 'An Economic Case for Section 230' (2019), advocacy article",
          sourceUrl:
            "https://project-disco.org/innovation/090619-an-economic-case-for-section-230/",
          reasoning:
            "States the industry's argument in its own words. Its numbers come from industry-funded models and cross-country comparisons that cannot separate liability law from everything else, so all weights are low.",
        },
        {
          id: "dsa-vlop-tier",
          title: "EU Digital Services Act Reserves Its Heaviest Duties for Platforms With 45M+ Users",
          description:
            "Under the EU's Digital Services Act, the European Commission designates platforms and search engines with more than 45 million monthly users in the EU as very large online platforms or search engines. Those services must assess the systemic risks linked to their services, be audited independently at least once a year, give vetted researchers access to data, keep a public ad repository and offer a recommender option not based on profiling. The Commission justifies the tier by 'their size and the potential impact they can have on society.'",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 7,
            replicability: 8,
            directness: 3,
          },
          source:
            "European Commission, 'DSA: Very large online platforms and search engines' (Shaping Europe's digital future)",
          sourceUrl: "https://digital-strategy.ec.europa.eu/en/policies/dsa-vlops",
          reasoning:
            "A working legal design that puts its heaviest costs on the largest services. It is a set of duties in another system, not a change to U.S. immunity, and a description of obligations is not evidence of their effect on entry or safety, so directness is 3.",
        },
      ],
    },
  ],
  references: [
    { title: "Anderson v. TikTok, Third Circuit majority opinion (2024)", url: "https://www2.ca3.uscourts.gov/opinarch/223061p.pdf" },
    { title: "Doe 1 v. Meta Platforms, Ninth Circuit opinion and concurrences (2026)", url: "https://cdn.ca9.uscourts.gov/datastore/opinions/2026/04/28/24-1672.pdf" },
    { title: "S. 3546, Sunset Section 230 Act, introduced-in-Senate text (17 December 2025)", url: "https://www.govinfo.gov/content/pkg/BILLS-119s3546is/html/BILLS-119s3546is.htm" },
    { title: "Twitter, Inc. v. Taamneh, Supreme Court opinion (2023)", url: "https://www.supremecourt.gov/opinions/22pdf/21-1496_d18f.pdf" },
    { title: "GAO-21-385, Sex Trafficking: Online Platforms and Federal Prosecutions (2021)", url: "https://www.gao.gov/products/gao-21-385" },
    { title: "Office of the Law Revision Counsel, 47 U.S.C. 230, October 2026 text", url: "https://uscode.house.gov/us/usc/119-120/t47/s230/" },
    { title: "U.S. Surgeon General, Social Media and Youth Mental Health (2023)", url: "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf" },
    { title: "Eifert et al., Evaluation des NetzDG, commissioned by the German Federal Ministry of Justice (2020)", url: "https://kripoz.de/wp-content/uploads/2020/09/090920_Juristisches_Gutachten_Netz.pdf" },
    { title: "European Commission, DSA: Very large online platforms and search engines", url: "https://digital-strategy.ec.europa.eu/en/policies/dsa-vlops" },
    { title: "U.S. House Clerk, Cox amendment roll call 631 (1995)", url: "https://clerk.house.gov/Votes/1995631" },
    { title: "Disruptive Competition Project, An Economic Case for Section 230 (2019), advocacy source", url: "https://project-disco.org/innovation/090619-an-economic-case-for-section-230/" },
  ],
};
