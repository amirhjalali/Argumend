import type { Topic } from "@/lib/schemas/topic";

export const estateInheritanceTaxData = {
  id: "estate-inheritance-tax",
  title: "The Estate Tax",
  meta_claim:
    "The estate (inheritance) tax is a fair and economically sound policy.",
  status: "contested" as const,
  category: "economics" as const,
  // ── Stage 1: the wow fact shown above everything ──
  keystone_fact: {
    statement:
      "The estate tax almost never touches you: of the ~2.8 million Americans who die each year, only about 0.2% (roughly 4,000 estates) owe any estate tax at all, because the exemption shields the first ~$12.92M per person (~$25.84M per couple in 2023). The honest catch is that much of what it taxes is unrealized capital gains that were never taxed during life — so the popular \"double taxation\" complaint is, for large estates, often empirically false.",
    confidence: 92,
    source:
      "Tax Policy Center Briefing Book, 'Who pays the estate tax?' (2023 figures, drawing on IRS SOI); Joint Committee on Taxation on stepped-up basis (~$72.5B forgone in 2026, ~a quarter of all capital-gains revenue)",
    sourceUrl: "https://taxpolicycenter.org/briefing-book/who-pays-estate-tax",
  },
  // ── Stage 2: the honest 3-sentence case ──
  simple_case: [
    "The estate tax is one of the most progressive levers in the US code: only about 0.2% of deaths produce a taxable estate, the top 0.1% of earners pay roughly 29% of it, and a large share of what it reaches is appreciated wealth that stepped-up basis would otherwise let escape income tax forever — so it functions as a backstop on fortunes that were never fully taxed.",
    "The honest counterpoint is that it raises modest revenue (~$24B/yr), imposes real compliance and avoidance costs (Kopczuk's estate-tax data shows reported estates shrink 15–20% after a terminal-illness diagnosis), and the sophisticated rich route assets through dynasty trusts and valuation discounts — so the burden can fall hardest on the moderately wealthy who planned least, not the true dynasties it targets.",
    "So the honest debate isn't \"is it double taxation?\" (for large estates it usually isn't) but \"is a tax that touches almost no one, raises little net revenue, and is heavily gamed by the very wealthy still worth keeping as a check on dynastic wealth — or would reforming stepped-up basis do the same job better?\"",
  ],
  last_updated: "2026-06-16",
  tags: ["estate-tax", "inheritance", "wealth-inequality", "taxation", "fiscal-policy"],
  pillars: [
    {
      id: "fairness-incidence",
      title: "Fairness & Who Pays",
      short_summary:
        "Whether a tax on transferred wealth is fair turns on how concentrated inherited wealth is and how few — and how rich — the estates that actually pay it really are.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "Taxing an estate is double taxation: the wealth was already taxed when it was earned, so taxing it again at death penalizes thrift and the desire to provide for one's children — a near-universal moral impulse. The 'fairness' framing is contested by the people who feel it: a family that built a business or farm over decades did nothing wrong by wanting to pass it on intact. And because the rich hire lawyers to route assets through dynasty trusts and valuation discounts, the tax often falls hardest on the moderately wealthy who planned least, not the true dynasties it claims to target.",
      proponent_rebuttal:
        "The estate tax is among the most progressive parts of the US code: only about 0.2% of decedents leave a taxable estate (roughly 4,000 of ~2.8 million deaths in 2023), and the exemption (~$12.92M per person / ~$25.84M per couple in 2023) shields all but the very largest fortunes. A large share of these fortunes is unrealized capital gains that were *never* taxed during life — so the 'double taxation' objection is often empirically false. Inherited (not self-made) wealth is estimated at roughly 35–45% of total wealth, so taxing very large transfers targets advantage that recipients did nothing to earn, and pushes back on dynastic concentration of opportunity.",
      crux: {
        id: "share-never-taxed",
        title: "How Much Estate Wealth Was Never Taxed During Life",
        description:
          "The core fairness dispute is empirical: is the estate tax 'double taxation' of already-taxed income, or is it a backstop catching unrealized gains that escaped income tax entirely via stepped-up basis at death?",
        methodology:
          "Decompose large gross estates (IRS SOI Form 706 microdata) into (a) basis already subject to income/payroll tax and (b) unrealized appreciation that would otherwise receive stepped-up basis and never be taxed. Compare the unrealized share to estate tax collected.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (analysis of published IRS SOI and JCT data)",
        falsification: {
          supporter_flip:
            "If a decomposition of large gross estates (IRS SOI Form 706 microdata) showed that the great majority of taxable-estate wealth was basis already subject to income or payroll tax — with little unrealized appreciation riding on stepped-up basis — then the 'backstop for untaxed gains' defense would collapse and the 'double taxation' objection would be largely correct.",
          skeptic_flip:
            "A skeptic invoking 'double taxation' should weigh that stepped-up basis forgoes an estimated ~$72.5B in 2026 (about a quarter of all capital-gains revenue) and that a large fraction of the biggest estates is appreciated assets never sold during life — so for the fortunes the tax actually reaches, the income was frequently never taxed at all.",
          common_ground:
            "Both sides agree the estate tax hits only a tiny share of estates (~0.2% of deaths) and that stepped-up basis lets some unrealized gains escape income tax at death; the dispute is how large that never-taxed share is within taxable estates.",
          live_disagreement:
            "The precise fraction of taxable-estate wealth that is unrealized appreciation versus already-taxed basis — resolvable by decomposing Form 706 microdata against the assets' original cost basis, which is not routinely published.",
        },
      },
      evidence: [
        {
          id: "few-estates-pay",
          title: "Only ~0.2% of Estates Owe Any Tax",
          description:
            "Of ~2.8 million expected US deaths in 2023, just over 7,100 estate tax returns were filed and only about 4,000 (~0.2% of deaths) were taxable. Estate tax liability totaled an estimated $24.0 billion for 2023.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 9,
            directness: 8,
          },
          source:
            "Tax Policy Center Briefing Book, 'Who pays the estate tax?' (drawing on IRS SOI and TPC estimates), 2023 figures",
          sourceUrl: "https://taxpolicycenter.org/briefing-book/who-pays-estate-tax",
          reasoning:
            "TPC is a respected nonpartisan source whose figures track IRS Statistics of Income microdata. The 'only the very richest pay' point is directly relevant to fairness and is easily replicated from published data; slight markdown for being a secondary aggregation rather than the raw SOI table.",
        },
        {
          id: "stepped-up-basis-backstop",
          title: "Stepped-Up Basis Lets Vast Gains Escape Income Tax at Death",
          description:
            "The stepped-up basis provision resets an inherited asset's tax basis to its market value at death, erasing accumulated unrealized capital gains. The Joint Committee on Taxation estimates this costs ~$72.5 billion in forgone federal revenue in 2026 — about a quarter of all capital-gains tax revenue. The estate tax is widely described as a backstop for this otherwise-untaxed income.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source:
            "Peter G. Peterson Foundation summarizing Joint Committee on Taxation (JCT) estimates, 2026",
          sourceUrl:
            "https://www.pgpf.org/article/what-is-the-stepped-up-basis-and-how-does-it-affect-the-federal-budget/",
          reasoning:
            "The JCT figure is official; PGPF is a credible nonpartisan summarizer. This directly rebuts the 'double taxation' fairness objection by showing much estate wealth was never taxed. Marked down slightly on directness because it argues a structural backstop role rather than measuring the unrealized share of taxable estates precisely.",
        },
        {
          id: "inherited-wealth-share",
          title: "A Large Share of US Wealth Is Inherited, Not Self-Made",
          description:
            "Reviews of the literature estimate that roughly 35–45% of wealth in the US is inherited rather than self-made, undercutting the meritocratic framing that taxing transfers penalizes earned effort.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 6,
          },
          source:
            "Brookings, 'Wealth, Inheritance and Social Mobility' summarizing Wojciech Kopczuk's review of the literature",
          sourceUrl:
            "https://www.brookings.edu/articles/wealth-inheritance-and-social-mobility/",
          reasoning:
            "Inherited-share estimates vary widely across studies and definitions (gifts vs. bequests, lifetime vs. point-in-time), so replicability is moderate. It supports the fairness case but is a contested range rather than a settled figure, hence mid weights.",
        },
        {
          id: "double-taxation-burden",
          title: "Estate Tax Imposes Compliance Costs and Avoidance Distortions",
          description:
            "Using estate tax return data, Kopczuk (QJE 2007) documents 'deathbed' tax planning: estates of those who die instantaneously are reported as 10–18% larger than estates of those who suffered a lengthy terminal illness, with onset of terminal illness cutting reported estates 15–20% (illness lasting months–years). This reflects costly avoidance activity rather than genuine wealth, implying real deadweight loss.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 6,
          },
          source:
            "Wojciech Kopczuk, 'Bequest and Tax Planning: Evidence from Estate Tax Returns,' Quarterly Journal of Economics 122(4):1801–1854 (2007)",
          sourceUrl: "https://academic.oup.com/qje/article-abstract/122/4/1801/1850524",
          reasoning:
            "Peer-reviewed top-journal empirical work using IRS estate-tax microdata; strong reliability and independence. It demonstrates real avoidance/planning distortion (an efficiency cost relevant to 'economically sound'), though it measures behavioral response rather than directly adjudicating fairness, so directness is moderate.",
        },
      ],
    },
    {
      id: "economic-efficiency",
      title: "Economic Efficiency",
      short_summary:
        "Critics say the tax shrinks the capital stock and raises little net revenue; defenders say the behavioral and revenue costs are modest and the tax corrects a real distortion.",
      icon_name: "Zap" as const,
      skeptic_premise:
        "The estate tax is economically unsound: by taxing accumulated capital at death it discourages saving and investment, shrinking the productive capital stock. A 1998 Joint Economic Committee study argued the tax had reduced the US capital stock by roughly $497 billion (about 3.2%) and that its distortionary effects produce income-tax losses 'roughly the same size as estate tax revenue,' so it raises little *net* revenue while imposing heavy compliance and planning costs. A high statutory rate (40%) on illiquid assets can also force liquidation of operating businesses.",
      proponent_rebuttal:
        "The capital-stock and 'near-zero net revenue' claims come from a partisan congressional study with strong modeling assumptions, not a consensus estimate; mainstream analyses find the tax raises real, meaningful revenue (~$24B/yr) from a tiny number of ultra-wealthy estates. Because much of that wealth is unrealized gains that would otherwise escape tax forever, the efficiency case partly *reverses*: the tax (and reforming stepped-up basis) reduces the 'lock-in' incentive to hold appreciated assets purely to dodge tax. And the feared forced sales of farms and businesses are very rare in the data.",
      crux: {
        id: "net-revenue-vs-deadweight",
        title: "Does Avoidance Cancel Out the Revenue?",
        description:
          "The load-bearing efficiency question: do the behavioral responses (reduced saving, avoidance, income-tax erosion) offset enough of estate tax revenue to make it a net loser, or is the net fiscal and efficiency effect positive once stepped-up-basis lock-in is counted?",
        methodology:
          "Build a revenue model netting gross estate tax receipts against (a) estimated income-tax revenue lost to estate-tax-induced avoidance and (b) revenue gained from reduced lock-in / realized gains. Vary saving-elasticity and avoidance assumptions; report the sign and confidence interval of the net effect.",
        verification_status: "theoretical" as const,
        cost_to_verify: "$500K (microsimulation modeling with contested elasticity assumptions)",
        falsification: {
          supporter_flip:
            "If a transparent microsimulation — netting gross receipts against estate-tax-induced income-tax erosion and lost saving, and crediting reduced lock-in — produced a robustly negative or near-zero net fiscal effect under mainstream elasticities, the 'economically sound, raises real revenue' case would weaken toward the JEC 'raises little net revenue' view.",
          skeptic_flip:
            "A skeptic citing the 1998 JEC's ~$497B capital-stock loss and 'near-zero net revenue' should weigh that those figures come from a partisan congressional study with contested modeling assumptions, that the tax collects ~$24B/yr from ultra-wealthy estates, and that taxing transfers reduces the stepped-up-basis 'lock-in' distortion — an efficiency gain the JEC model omits.",
          common_ground:
            "Both sides agree the estate tax induces real behavioral responses (avoidance, planning, deathbed transfers) that carry deadweight cost, and that its gross revenue is modest relative to the federal budget.",
          live_disagreement:
            "The sign and magnitude of the net fiscal-and-efficiency effect once avoidance, saving response, and lock-in reduction are all counted — which only a microsimulation with disclosed, defensible elasticity assumptions can pin down.",
        },
      },
      evidence: [
        {
          id: "lock-in-correction",
          title: "Estate Tax Mitigates the Capital-Gains 'Lock-In' Distortion",
          description:
            "Stepped-up basis is identified as a major driver of the 'lock-in effect' — holding appreciated assets to death purely to avoid capital-gains tax, distorting portfolio choice and liquidity. Taxing wealth transfers (and reforming basis) reduces this distortion, an efficiency *gain*, not just a cost.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 6,
            directness: 6,
          },
          source:
            "Congressional Research Service, 'Tax Treatment of Capital Gains at Death' (IF11812)",
          sourceUrl: "https://www.congress.gov/crs-product/IF11812",
          reasoning:
            "CRS is nonpartisan and authoritative. The lock-in mechanism is well established in public-finance theory; it directly supports the 'economically sound' claim, though the net efficiency magnitude depends on modeling, so replicability/directness are moderate.",
        },
        {
          id: "jec-capital-stock",
          title: "JEC: Estate Tax Shrank the Capital Stock and Raises Little Net Revenue",
          description:
            "A 1998 Joint Economic Committee study concluded the estate tax had reduced the US capital stock by approximately $497 billion (~3.2%), is a 'leading cause of dissolution for family-run businesses,' and 'raises very little, if any, net revenue' because its distortions cause offsetting income-tax losses.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 3,
            replicability: 4,
            directness: 8,
          },
          source:
            "Joint Economic Committee (Chairman Jim Saxton), 'The Economics of the Estate Tax,' December 1998",
          sourceUrl:
            "https://www.jec.senate.gov/public/_cache/files/a96b5a38-b22d-4c49-b22c-4cec067f25aa/the-economics-of-the-estate-tax.pdf",
          reasoning:
            "This is the strongest articulated efficiency case against the tax and addresses the claim directly, but it is a partisan congressional committee study (majority staff), not peer-reviewed, and its capital-stock and net-revenue figures rest on contested modeling assumptions — hence low reliability and independence despite high directness.",
        },
        {
          id: "forced-sales-rare",
          title: "Forced Liquidation of Farms and Businesses Is Very Rare",
          description:
            "A 2005 Congressional Budget Office analysis found that the large majority of farm and small-business estates large enough to owe tax held enough liquid assets to pay it without selling the operating business; the Tax Policy Center estimated only ~50 small-farm and small-business estates nationwide would owe any estate tax in 2017, paying under 6% of value on average. Special provisions also allow spreading payment over up to 15 years at low interest.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source:
            "Congressional Budget Office, 'Effects of the Federal Estate Tax on Farms and Small Businesses' (2005); Tax Policy Center estimates as summarized by the Center on Budget and Policy Priorities",
          sourceUrl:
            "https://www.cbo.gov/sites/default/files/109th-congress-2005-2006/reports/07-06-estatetax.pdf",
          reasoning:
            "CBO is nonpartisan and authoritative; the liquidity finding is the central empirical rebuttal to the 'forced sale' efficiency objection. The CBPP/TPC small-estate counts are advocacy-summarized but trace to TPC modeling, so independence is high but not maximal.",
        },
        {
          id: "farm-bureau-forced-sale",
          title: "Agricultural Groups: Estate Tax Can Force Sale of Land and Equipment",
          description:
            "Farm and ranch organizations argue that when estate tax due on an illiquid agricultural operation exceeds available cash, surviving partners can be forced to sell land, buildings, or equipment needed to keep the business running — a real risk for asset-rich, cash-poor operations near the exemption threshold.",
          side: "against" as const,
          weight: {
            sourceReliability: 4,
            independence: 2,
            replicability: 3,
            directness: 6,
          },
          source:
            "American Farm Bureau Federation, 'Estate Taxes Are A Threat to Family Farms' (Market Intel)",
          sourceUrl: "https://www.fb.org/market-intel/estate-taxes-are-a-threat-to-family-farms",
          reasoning:
            "A genuinely held and theoretically valid concern about illiquidity, but it comes from an advocacy organization with a direct interest and, per CBO/TPC data, documented forced-sale cases are extremely rare. Low independence and replicability; included to steelman the skeptic position honestly.",
        },
      ],
    },
  ],
};
