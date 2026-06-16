import type { Topic } from "@/lib/schemas/topic";

export const section230ReformData = {
  id: "section-230-reform",
  title: "Reforming Section 230",
  meta_claim:
    "Section 230 should be significantly reformed or repealed.",
  status: "contested" as const,
  category: "technology" as const,
  last_updated: "2026-06-16",
  tags: ["section-230", "content-moderation", "free-speech", "platform-liability", "internet-policy"],
  pillars: [
    {
      id: "accountability-gap",
      title: "The Accountability Gap",
      short_summary:
        "Section 230(c)(1) bars treating platforms as the 'publisher or speaker' of user content, and courts have read it broadly enough that victims of algorithmically amplified harms often cannot sue.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Section 230's near-absolute immunity now shields trillion-dollar companies that profit from engagement-optimized recommendation systems, not the fledgling 1996 message boards Congress had in mind. When a platform's own algorithm pushes a lethal 'challenge' to a 10-year-old, or amplifies hate and self-harm content to teenagers, the people harmed frequently have no defendant to sue, because courts have extended 230 to cover the platform's own ranking and recommendation choices. The 2023 US Surgeon General advisory found algorithmic design pushes harmful content to minors and concluded there is not yet enough evidence that social media is safe for children. Reform would restore the ordinary tort principle that those who design and profit from a dangerous product can be held accountable for it.",
      proponent_rebuttal:
        "Section 230's exceptions already preserve liability for the worst conduct — federal crimes, sex-trafficking claims (18 U.S.C. 1591/1595/2421A after FOSTA), intellectual property, and ECPA all override the shield. Courts are also already narrowing immunity where a platform's own conduct is at issue: in Anderson v. TikTok (3d Cir. 2024) the court held 230 does not bar claims that TikTok's algorithm itself recommended the deadly 'Blackout Challenge,' treating the recommendation as the platform's own expressive activity. The doctrine is evolving case-by-case without a blunt statutory repeal that would also sweep away protection for moderating ordinary speech. The harm from amplification is real, but causation between any single platform's ranking and a given injury is contested and hard to prove.",
      crux: {
        id: "amplification-causation",
        title: "Does Algorithmic Amplification Cause Compensable Harm?",
        description:
          "The load-bearing disagreement is whether a platform's own recommendation system is conduct distinct from hosting third-party speech, such that it can cause legally cognizable harm that Section 230 should not shield.",
        methodology:
          "Track post-Anderson v. TikTok appellate decisions on whether algorithmic recommendation counts as first-party 'expressive activity' outside 230; pair with empirical studies measuring whether engagement-ranked feeds (vs. chronological) increase exposure to harmful content for minors. A randomized feed-ordering experiment plus a circuit-split survey would isolate the causation question.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (multi-platform randomized feed study + legal docket review)",
      },
      evidence: [
        {
          id: "anderson-tiktok",
          title: "Anderson v. TikTok: Algorithm Is Not Shielded Third-Party Speech",
          description:
            "The Third Circuit held (Aug 27, 2024, No. 22-3061) that Section 230 does not bar claims that TikTok's algorithm recommended the 'Blackout Challenge' to 10-year-old Nylah Anderson, who died attempting it — because the recommendation is TikTok's own 'expressive activity,' not merely third-party content.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 6,
            directness: 8,
          },
          source:
            "Anderson v. TikTok, Inc., No. 22-3061 (3d Cir. Aug. 27, 2024), Judge Shwartz",
          sourceUrl: "https://en.wikipedia.org/wiki/Anderson_v._TikTok",
          reasoning:
            "A federal appellate opinion is highly reliable and directly supports reform's premise that broad 230 immunity has overreached. Weighted down on replicability/directness because it relied on a contested reading of Moody v. NetChoice, is binding only in the Third Circuit, and is itself an example of courts narrowing 230 without statutory change — so it cuts partly against the need for repeal.",
        },
        {
          id: "surgeon-general-advisory",
          title: "Surgeon General: Algorithms Push Harmful Content to Youth",
          description:
            "The 2023 US Surgeon General advisory (Dr. Vivek Murthy, May 23, 2023) found that harmful content reaches children through algorithmic design, that adolescents exceeding ~3 hours/day on social media face double the risk of poor mental-health outcomes, and that there is 'not yet enough evidence' that social media is safe for children.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "U.S. Surgeon General, 'Social Media and Youth Mental Health' Advisory (2023)",
          sourceUrl:
            "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf",
          reasoning:
            "An official federal public-health advisory synthesizing the literature is reliable, but it documents correlational harm and platform design choices — it does not establish that removing 230 immunity is the right remedy, and the underlying mental-health causation literature is genuinely contested, so directness to the legal claim is moderate.",
        },
        {
          id: "durbin-graham-sunset",
          title: "Bipartisan Senate Bill to Sunset Section 230 (Dec 2025)",
          description:
            "Per a Dec 18, 2025 Senate Judiciary press release, Sens. Durbin (D) and Graham (R) introduced a bill to repeal Section 230 two years after enactment, framed as opening courtrooms to victims of child exploitation, harassment, CSAM, and fentanyl sales. (Post-cutoff; reported as a legislative proposal, not enacted law.)",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 5,
            directness: 7,
          },
          source:
            "Office of Sen. Dick Durbin, press release, Dec. 18, 2025 (bipartisan 'sunset' bill)",
          sourceUrl:
            "https://www.durbin.senate.gov/newsroom/press-releases/durbin-graham-introduce-bill-to-sunset-section-230-immunity-for-tech-companies-protect-americans-online",
          reasoning:
            "A genuine bipartisan reform proposal directly on the meta-claim, but it is a partisan press release advocating a position (low independence), reflects intent rather than evidence of effect, and is post-cutoff — so it is attributed and dated and given low overall weight.",
        },
      ],
    },
    {
      id: "collateral-damage",
      title: "Collateral Damage to Speech",
      short_summary:
        "Without 230, platforms face the 'moderator's dilemma': either over-remove lawful speech to avoid liability, or stop moderating entirely. A real-world carve-out (FOSTA) offers a natural experiment.",
      icon_name: "Shield" as const,
      skeptic_premise:
        "Repeal would force platforms to choose between two bad options. To limit liability for user posts they cannot fully vet, large platforms would aggressively over-remove lawful-but-controversial speech (the heckler's-veto problem), while some sites might stop moderating to avoid the Stratton Oakmont trap that prompted 230 in the first place. The 2018 FOSTA carve-out is the cleanest natural experiment available: GAO found the new criminal provision was used only once in three years and produced no restitution, while platforms preemptively shut down screening tools that sex workers and even investigators relied on — the opposite of the intended effect.",
      proponent_rebuttal:
        "The 'moderator's dilemma' framing assumes courts would snap back to the 1995 Stratton Oakmont rule, but reform proposals are narrower than full repeal — most would condition immunity on duties of care or strip it only for algorithmically amplified or paid content, leaving the host-and-moderate baseline intact. FOSTA was a poorly drafted criminal statute, not evidence that all reform fails; a well-designed reform could target the specific harms (amplification, known illegal content) without the over-removal that a blunt repeal would cause. The First Amendment independently protects most lawful speech regardless of 230.",
      crux: {
        id: "over-removal-vs-deterrence",
        title: "Would Reform Suppress Lawful Speech More Than It Deters Harm?",
        description:
          "The decisive question is the net effect: does narrowing platform immunity chill more lawful speech (over-removal, abandoned moderation) than the harm it deters — and can a reform be drafted to avoid FOSTA's documented backfire?",
        methodology:
          "Use FOSTA (2018) as a difference-in-differences natural experiment: compare prosecutions, takedowns, and documented safety outcomes for affected populations before/after the carve-out, against control categories of speech that kept full 230 immunity. Combine GAO enforcement data with platform takedown-rate audits.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (analysis of existing GAO data and takedown audits)",
      },
      evidence: [
        {
          id: "fosta-gao",
          title: "FOSTA Carve-Out: One Prosecution in 3 Years, Backfired Effects",
          description:
            "GAO-21-385 (June 21, 2021) found the FOSTA criminal provision (section 3) was used only once from 2018-2021, with no restitution sought; meanwhile platforms preemptively removed screening tools, which advocates and the GAO noted made trafficking harder to investigate — evidence that carving back 230 produced over-removal without deterrence.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 7,
            directness: 8,
          },
          source:
            "U.S. Government Accountability Office, 'Sex Trafficking: Online Platforms and Federal Prosecutions,' GAO-21-385 (2021)",
          sourceUrl: "https://www.gao.gov/products/gao-21-385",
          reasoning:
            "A nonpartisan government audit of the only real-world 230 carve-out is highly reliable and independent, and directly tests whether narrowing immunity works. Slightly down on replicability because the harm-displacement evidence is partly observational/advocacy-sourced, but the single-prosecution finding is hard data.",
        },
        {
          id: "moderators-dilemma-history",
          title: "Section 230 Was Written to Solve the 'Moderator's Dilemma'",
          description:
            "Stratton Oakmont v. Prodigy (1995) held that a platform that moderated some posts became liable as 'publisher' for all of them. Section 230 (enacted Feb 8, 1996; House vote 420-4) was Cox-Wyden's fix so platforms could moderate without assuming liability for everything — repeal would revive the dilemma.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 7,
          },
          source:
            "Electronic Frontier Foundation, 'Section 230 Legislative History'; Stratton Oakmont, Inc. v. Prodigy Services Co. (N.Y. Sup. Ct. 1995)",
          sourceUrl: "https://www.eff.org/issues/cda230/legislative-history",
          reasoning:
            "Accurate, well-documented legal history that establishes the structural risk of repeal. EFF is an advocacy organization (mild independence discount), but the Stratton Oakmont holding and the 420-4 vote are verifiable facts; directness is high for the repeal scenario but lower for narrowly tailored reforms.",
        },
        {
          id: "statute-existing-exceptions",
          title: "230 Already Exempts the Worst Conduct",
          description:
            "47 U.S.C. 230(e) already preserves liability under federal criminal law, intellectual property law, ECPA, and sex-trafficking statutes (1591/1595/2421A). Reformers' strongest harms (CSAM, trafficking, federal crimes) are already outside the shield, weakening the case that broad repeal is necessary.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 6,
          },
          source: "47 U.S.C. § 230(e) (statutory exceptions to immunity)",
          sourceUrl: "https://www.law.cornell.edu/uscode/text/47/230",
          reasoning:
            "The statute itself is maximally reliable, independent, and replicable. Directness is moderate because existing exceptions don't cover every alleged harm (e.g., negligent algorithmic design), which is precisely the gap reformers target — so it rebuts the necessity of repeal but not all reform.",
        },
      ],
    },
    {
      id: "innovation-competition",
      title: "Innovation and Competition Costs",
      short_summary:
        "Industry-funded analyses estimate Section 230 underpins large investment and job effects; critics counter that the burden of repeal would fall hardest on small platforms, entrenching incumbents.",
      icon_name: "Users" as const,
      skeptic_premise:
        "Even granting economic value, the cost of the status quo is externalized onto harmed users while the benefits accrue to platforms — and economic-value estimates come largely from industry-funded studies with obvious incentives. A liability regime that internalizes the cost of harmful design could redirect investment toward safer products rather than maximally engaging ones.",
      proponent_rebuttal:
        "Removing 230 would not primarily punish Big Tech — incumbents can absorb litigation costs and armies of lawyers, while startups and small forums cannot. An industry analysis (NERA/Internet Association) projected hundreds of billions in GDP and millions of jobs tied to intermediary-liability protections, and warned a large majority of investors would hesitate to fund intermediaries without them. The likely result of blunt repeal is entrenchment of the very giants reformers want to check, plus a litigation tax on every comment section and review site.",
      crux: {
        id: "who-bears-repeal-cost",
        title: "Who Actually Bears the Cost of Repeal — Incumbents or Startups?",
        description:
          "The competition crux is whether stripping immunity disproportionately burdens small platforms (entrenching incumbents) or meaningfully constrains dominant platforms' harmful practices.",
        methodology:
          "Model litigation-cost exposure per active user across platform size tiers; compare survival/investment rates of startups under 230 vs. comparable sectors under stricter liability (e.g., the EU eCommerce Directive), controlling for confounders. Audit whether reform's burden scales with firm size.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (cross-jurisdiction econometric study)",
      },
      evidence: [
        {
          id: "nera-economic-value",
          title: "Industry Study: Weakening 230 Risks Jobs and GDP",
          description:
            "A NERA Economic Consulting analysis for the Internet Association estimated that weakening intermediary-liability protections could cost ~$440B in GDP and ~4.25M jobs per decade, and reported US internet firms are far likelier than EU peers to raise large venture rounds — used to argue repeal would chill investment and hit small platforms hardest.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source:
            "NERA Economic Consulting / Internet Association (2019), summarized by CCIA Disruptive Competition Project",
          sourceUrl:
            "https://project-disco.org/innovation/090619-an-economic-case-for-section-230/",
          reasoning:
            "Directly relevant to the economic stakes of repeal, but it is an industry-commissioned projection with strong conflict-of-interest incentives and contested modeling assumptions; the primary Internet Association host has since dissolved, so it is cited via a CCIA summary and given low reliability/independence weight accordingly.",
        },
      ],
    },
  ],
};
