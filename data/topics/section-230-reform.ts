export const section230ReformData = {
  id: "section-230-reform",
  title: "Reforming Section 230",
  question: "Should Section 230 be significantly reformed or repealed?",
  meta_claim:
    "Section 230 should be significantly reformed or repealed.",
  status: "contested" as const,
  category: "technology" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "On August 4, 1995, the House approved the Cox amendment to H.R. 1555 by 420-4. That was an amendment vote, not a measure of the effects of changing Section 230 today. The map separates questions about platform liability, lawful speech and competition rather than treating a historical vote or a single lawsuit as a verdict on reform.",
    confidence: 95,
    source:
      "U.S. House Clerk, Roll Call 631, Cox amendment to H.R. 1555 (August 4, 1995)",
    sourceUrl: "https://clerk.house.gov/Votes/1995631",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "An immunity defense, proof of an injury and a judgment that a reform would improve outcomes are different questions. Court decisions depend on the allegations and legal duties before them. Enforcement counts and industry projections also need their dates, scope and assumptions kept visible.",
    "The disagreement concerns which platform conduct should face liability, whether a particular reform would improve safety without excessive restrictions on lawful speech, and how its costs would fall across services of different sizes. Each question requires its own evidence, with legislative proposals distinguished from law and observational reports distinguished from controlled comparisons.",
  ],
  last_updated: "2026-10-18",
  tags: ["section-230", "content-moderation", "free-speech", "platform-liability", "internet-policy"],
  pillars: [
    {
      id: "accountability-gap",
      title: "The Accountability Gap",
      short_summary:
        "Recommendation-related claims have received different treatment in published appellate opinions. The issue is which alleged conduct and duties fall within immunity, and whether changing those rules would improve redress and safety.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Existing law already distinguishes third-party content, moderation and specified exceptions. Case-specific decisions can permit some claims without repeal. Legal protection, the merits of an underlying claim and constitutional speech questions need separate analysis; a court allowing a claim to proceed does not establish injury, causation or damages.",
      proponent_rebuttal:
        "Reform supporters ask why platforms that curate feeds and algorithmically promote posts should have publisher immunity when someone sues: are they neutral bulletin boards, or responsible for their own recommendations? A claim can fail at the immunity stage before its merits are decided, as the Ninth Circuit's April 2026 Doe 1 v. Meta opinion illustrates for its allegations. Supporters must also show which liability changes would improve redress and safety; concern about youth mental health alone does not identify an effective rule.",
      crux: {
        id: "amplification-causation",
        title: "Does Algorithmic Amplification Cause Compensable Harm?",
        question:
          "Is a platform's ranking choice legally distinct conduct that causes a specific, provable injury?",
        description:
          "Separate the legal characterization of a recommendation from evidence that particular conduct caused an injury. A ruling about immunity is not a trial finding of causation, and evidence of harm does not by itself decide what statutory rule should apply.",
        methodology:
          "Compare published opinions by jurisdiction, procedural stage, alleged design feature, duty and disposition. Distinguish majority holdings from separate opinions. Evaluate exposure and injury with suitable comparisons and explicit confounders, rather than assuming a change in feed ranking measures a particular legal injury. Assess specific reform designs and report uncertainty, redress and lawful-speech effects separately.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Compare case records by jurisdiction and procedural stage, separating immunity decisions from adjudicated injuries. Evaluate specified reforms against suitable comparison groups for changes in redress, safety and access to lawful speech.",
        },
        cost_to_verify: "Not costed here; scope depends on legal case coding and the design of empirical evaluations.",
        falsification: {
          supporter_flip:
            "If existing rules consistently allowed well-supported claims to be resolved on their merits, and credible evaluations found that proposed reforms added costs without improving redress or safety, the case for those reforms would weaken.",
          skeptic_flip:
            "If credible evaluations showed that a specified reform improved redress or reduced attributable harm without greater restrictions on lawful speech or disproportionate costs, the case for retaining the existing rule unchanged would weaken.",
          common_ground:
            "An immunity ruling is distinct from proof of an injury, and an observed association is distinct from a causal effect of a liability reform.",
          live_disagreement:
            "Which platform conduct should face liability, and whether particular changes would improve redress and safety at acceptable costs. Evidence informs that judgment without settling every value tradeoff.",
        },
      },
      evidence: [
        {
          id: "anderson-tiktok",
          title: "Anderson v. TikTok: Recommendation Claims Survived an Immunity Dismissal (2024)",
          description:
            "The Third Circuit's August 27, 2024 opinion treated the alleged For You Page recommendation as TikTok's own expressive activity and held Section 230 did not bar those claims. The court reversed in part, vacated in part and remanded. It accepted allegations for the dismissal-stage review; this was not a finding that TikTok caused an injury or owed damages. The opinion expressly reserved search-result algorithms.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 7,
            directness: 5,
          },
          source:
            "Anderson v. TikTok, No. 22-3061 (3d Cir. August 27, 2024), majority opinion, pp. 4 and 10-13",
          sourceUrl: "https://www2.ca3.uscourts.gov/opinarch/223061p.pdf",
          reasoning:
            "The opinion establishes a case-specific legal outcome. It also illustrates a route under existing law, rather than demonstrating that statutory repeal is necessary.",
        },
        {
          id: "doe-meta-2026",
          title: "Doe 1 v. Meta: Claims Dismissed Under Ninth Circuit Precedent (2026)",
          description:
            "On April 28, 2026, a Ninth Circuit panel affirmed dismissal of recommendation-related claims concerning Facebook content in Myanmar. Applying circuit precedent, the panel treated the alleged promotion of third-party posts as publishing conduct protected by Section 230. Separate concurrences urged reconsideration of that precedent; those views were not a holding removing immunity. The opinion addresses the allegations before it, not every possible product-design claim.",
          side: "for" as const,
          weight: { sourceReliability: 10, independence: 9, replicability: 7, directness: 5 },
          source: "Doe 1 v. Meta Platforms, No. 24-1672 (9th Cir. April 28, 2026), majority pp. 12-17 and separate concurrences",
          sourceUrl: "https://cdn.ca9.uscourts.gov/datastore/opinions/2026/04/28/24-1672.pdf",
          reasoning:
            "The dismissal illustrates a barrier to these claims. It does not establish whether the allegations were true or whether a different statute would improve outcomes.",
        },
        {
          id: "surgeon-general-advisory",
          title: "2023 Surgeon General Advisory: Youth Mental-Health Risks and Evidence Limits",
          description:
            "The advisory cites a longitudinal U.S. cohort of 6,595 adolescents aged 12-15 in which more than three hours of daily social-media use was associated with about double the risk of poor mental-health outcomes, after adjustment for baseline mental health. That association is not proof that a recommendation algorithm caused an individual injury. The advisory discusses both benefits and harms and identifies substantial evidence gaps; it does not evaluate a Section 230 repeal.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 6,
            directness: 4,
          },
          source:
            "U.S. Surgeon General, Social Media and Youth Mental Health (2023), pp. 6-7",
          sourceUrl:
            "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf",
          reasoning:
            "The advisory supports concern and further study. Its cited observational association does not identify the effect of a particular liability reform.",
        },
        {
          id: "durbin-graham-sunset",
          title: "S. 3546 as Introduced: A Proposed Repeal After Two Years",
          description:
            "S. 3546, introduced on December 17, 2025, proposes repealing Section 230 with an effective date two years after enactment. The introduced text identifies a concrete legislative design. Introduction, sponsorship and proposed wording are not evidence of enactment or of the proposal's effects on safety, speech or investment.",
          side: "for" as const,
          weight: {
            sourceReliability: 10,
            independence: 8,
            replicability: 9,
            directness: 4,
          },
          source:
            "U.S. Government Publishing Office, S. 3546, introduced-in-Senate text (December 17, 2025), section 2(c)",
          sourceUrl:
            "https://www.govinfo.gov/content/pkg/BILLS-119s3546is/html/BILLS-119s3546is.htm",
          reasoning:
            "The text directly documents a proposal. Its desired policy effects remain claims to evaluate, rather than outcomes established by the bill.",
        },
      ],
    },
    {
      id: "collateral-damage",
      title: "Collateral Damage to Speech",
      short_summary:
        "Liability changes may affect moderation and access to lawful speech. GAO's FOSTA review documents a limited enforcement snapshot, while concurrent market changes prevent treating it as a clean estimate of reform's effects.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Legal exposure may encourage services to remove lawful material or withdraw useful features. Moderation protections have a stated policy purpose, but their importance should be assessed for a particular reform. GAO's report raises questions for evaluation; its enforcement count does not establish the size of speech or safety effects caused by FOSTA.",
      proponent_rebuttal:
        "Full repeal and targeted changes can create different obligations. An unfavorable outcome after a legal change does not establish that every reform would fail. Supporters must specify the duties, safeguards and remedies they propose, then assess access to lawful material and actual safety outcomes rather than assume that more liability necessarily improves them.",
      crux: {
        id: "over-removal-vs-deterrence",
        title: "Would Reform Suppress Lawful Speech More Than It Deters Harm?",
        question:
          "Can a reform deter targeted harms without a net loss of lawful speech?",
        description:
          "Compare the effects of a specified reform on targeted harms, redress and access to lawful speech. Those outcomes may move differently. FOSTA's enactment and Backpage's seizure occurred together, so a simple before-and-after comparison cannot assign every subsequent change to the statute.",
        methodology:
          "Predefine affected services, outcomes and comparison groups. Test pre-change trends and account for simultaneous enforcement actions, platform exits and market displacement. Separate aggravated FOSTA charges from other prosecutions, allegations from judgments, and removals from measured safety effects. Report spillovers and missing data. If a credible comparison cannot be constructed, describe the evidence as observational rather than a completed causal test.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "A credible comparison of specified reforms reporting lawful-speech access, safety and redress, with concurrent enforcement actions, market changes and uncertainty accounted for.",
        },
        cost_to_verify: "Not costed here; existing administrative counts alone do not supply the necessary outcome data or causal comparison.",
        falsification: {
          supporter_flip:
            "If a well-supported comparison found that a particular reform restricted lawful activity or worsened safety without offsetting improvements in redress, support for that design would weaken.",
          skeptic_flip:
            "If a credible comparison found that a particular reform improved safety and redress while preserving lawful participation and useful moderation, the concern that such costs are unavoidable would weaken.",
          common_ground:
            "An enforcement count is not a measure of all prosecutions, deterrence or speech loss. A causal comparison must account for other changes occurring at the same time.",
          live_disagreement:
            "Whether a specified reform can improve safety and redress without unacceptable losses of lawful speech. The balance depends on its design and on credible outcome evidence.",
        },
      },
      evidence: [
        {
          id: "fosta-gao",
          title: "GAO's 2021 Review: One Aggravated FOSTA Case Through March 2021",
          description:
            "GAO identified one case with aggravated charges under FOSTA section 3 as of March 2021; restitution had not been sought or awarded in that ongoing case. Its review excluded a non-aggravated case. The report also describes concurrent disruption from FOSTA and Backpage's seizure. This is a bounded enforcement snapshot, not a count of all trafficking prosecutions or an isolated estimate of the law's speech and safety effects.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 4,
          },
          source:
            "U.S. GAO, GAO-21-385 (June 2021), pp. 25-28 and scope notes on pp. 32-33",
          sourceUrl: "https://www.gao.gov/products/gao-21-385",
          reasoning:
            "Administrative findings are strong evidence within their stated scope. They do not establish a FOSTA-only causal effect or a general verdict on reform.",
        },
        {
          id: "moderators-dilemma-history",
          title: "1995 House Vote: Cox Amendment Approved by 420-4",
          description:
            "The House Clerk records adoption of the Cox amendment to H.R. 1555 by 420-4 on August 4, 1995. The later-enacted statute lists removing disincentives to blocking and filtering among its policies. This documents a legislative choice and its stated purpose, not the effects of a future reform. It does not establish that every reform would restore a particular 1995 state-court rule.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 2,
          },
          source:
            "U.S. House Clerk, Roll Call 631 (August 4, 1995); 47 U.S.C. 230(b)(4)",
          sourceUrl: "https://clerk.house.gov/Votes/1995631",
          reasoning:
            "The recorded vote is directly verifiable. Historical support for a policy does not measure the consequences of changing it today.",
        },
        {
          id: "statute-existing-exceptions",
          title: "Section 230 Separates Moderation Protections and Specific Exceptions",
          description:
            "Section 230(c)(1) addresses treatment as the publisher or speaker of information provided by another content provider; (c)(2) separately addresses certain filtering actions. Subsection (e) preserves federal criminal enforcement, intellectual-property and communications-privacy law, and specified trafficking actions subject to stated conditions. Those provisions are not a blanket exception for every harm or every civil claim involving criminal conduct.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 9,
            directness: 3,
          },
          source: "Office of the Law Revision Counsel, 47 U.S.C. 230(c) and (e), text through Public Law 119-120 (October 7, 2026)",
          sourceUrl: "https://uscode.house.gov/us/usc/119-120/t47/s230/",
          reasoning:
            "The statutory text defines distinct protections and exceptions. Application depends on the claim and relevant precedent, not a general category of worst conduct.",
        },
      ],
    },
    {
      id: "innovation-competition",
      title: "Innovation and Competition Costs",
      short_summary:
        "Litigation and compliance costs may affect small services differently from incumbents. Advocacy articles and projections identify hypotheses, but do not establish the investment or competition effects of a particular reform.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Fixed legal costs may be harder for a small forum or startup to absorb than for a large platform. Broader exposure could discourage entry or investment. These are plausible mechanisms to test; an industry advocacy article or a funding comparison does not establish their magnitude or show that every reform would entrench incumbents.",
      proponent_rebuttal:
        "Costs imposed by a particular liability rule may also encourage safer design or improve redress. Supporters argue that obligations and procedures can account for service size and risk. That argument needs evidence about actual burdens and benefits, rather than treating a large projected industry loss as either decisive or irrelevant.",
      crux: {
        id: "who-bears-repeal-cost",
        title: "Who Bears the Cost of Repeal: Incumbents or Startups?",
        question:
          "Would removing immunity burden small platforms most, or meaningfully constrain dominant ones?",
        description:
          "The issue is how particular liability rules distribute costs, entry opportunities and safety benefits across firms and users. A difference in national venture funding does not isolate the contribution of intermediary-liability law.",
        methodology:
          "Measure legal and compliance costs, service exits, investment and safety outcomes by firm size and business model. Compare particular legal changes using suitable controls and pre-change trends. Account for capital markets, demand, enforcement and other regulatory differences. Distinguish projected losses from observed outcomes, and test assumptions about costs per user and access to legal defenses.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Transparent comparisons of specified liability changes reporting costs, investment, entry and safety by service size, with assumptions and competing explanations assessed.",
        },
        cost_to_verify: "Not costed here; scope depends on access to firm-level cost and investment data.",
        falsification: {
          supporter_flip:
            "If credible evidence showed a proposed reform mostly burdened small services and reduced entry without offsetting improvements in safety or redress, support for that design would weaken.",
          skeptic_flip:
            "If credible evidence showed that a proposed reform improved safety or redress while keeping legal burdens manageable for small services and preserving entry, the prediction of inevitable incumbent entrenchment would weaken.",
          common_ground:
            "Projections, advocacy statements and observed outcomes are different kinds of evidence. The distribution of costs and benefits matters alongside aggregate totals.",
          live_disagreement:
            "How particular liability rules would affect smaller services, competition and harmed users, and which safeguards could change that distribution.",
        },
      },
      evidence: [
        {
          id: "nera-economic-value",
          title: "2019 Industry Advocacy Article Argues Immunity Supports Investment",
          description:
            "The Disruptive Competition Project's 2019 article argues that intermediary-liability protections support investment. It cites NERA/Internet Association projections and investor polling, then a separate Copia/NetChoice comparison of U.S. and EU funding. These are different sources. The article is evidence of an advocacy argument, not an observed causal estimate showing what a particular repeal would cost or which firms would bear it.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 3,
            directness: 3,
          },
          source:
            "Disruptive Competition Project, An Economic Case for Section 230 (2019), advocacy article",
          sourceUrl:
            "https://project-disco.org/innovation/090619-an-economic-case-for-section-230/",
          reasoning:
            "The article documents its publisher’s economic argument. It does not independently validate the underlying models or isolate liability law from other investment differences.",
        },
      ],
    },
  ],
  references: [
    { title: "U.S. House Clerk, Cox amendment roll call 631 (1995)", url: "https://clerk.house.gov/Votes/1995631" },
    { title: "Office of the Law Revision Counsel, 47 U.S.C. 230, October 2026 text", url: "https://uscode.house.gov/us/usc/119-120/t47/s230/" },
    { title: "Anderson v. TikTok, Third Circuit majority opinion (2024)", url: "https://www2.ca3.uscourts.gov/opinarch/223061p.pdf" },
    { title: "Doe 1 v. Meta Platforms, Ninth Circuit opinion and concurrences (2026)", url: "https://cdn.ca9.uscourts.gov/datastore/opinions/2026/04/28/24-1672.pdf" },
    { title: "U.S. Surgeon General, Social Media and Youth Mental Health (2023)", url: "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf" },
    { title: "GAO-21-385, Sex Trafficking: Online Platforms and Federal Prosecutions (2021)", url: "https://www.gao.gov/products/gao-21-385" },
    { title: "S. 3546, introduced-in-Senate text (December 17, 2025)", url: "https://www.govinfo.gov/content/pkg/BILLS-119s3546is/html/BILLS-119s3546is.htm" },
    { title: "Disruptive Competition Project, An Economic Case for Section 230 (2019), advocacy source", url: "https://project-disco.org/innovation/090619-an-economic-case-for-section-230/" },
  ],
};
