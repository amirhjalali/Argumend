import type { Topic } from "@/lib/schemas/topic";

export const modernMonetaryTheoryData = {
  id: "modern-monetary-theory",
  title: "Modern Monetary Theory",
  meta_claim:
    "Modern Monetary Theory provides a sound basis for government spending and deficit policy.",
  status: "contested" as const,
  category: "economics" as const,
  last_updated: "2026-06-16",
  tags: ["mmt", "fiscal-policy", "deficits", "inflation", "macroeconomics"],
  pillars: [
    {
      id: "monetary-sovereignty",
      title: "Monetary Sovereignty",
      short_summary:
        "A government that issues its own floating fiat currency can always make payments in that currency and cannot be forced into involuntary default — the question is whether that descriptive fact justifies MMT's spending prescriptions.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "MMT smuggles a radical policy conclusion out of a banal accounting truth. Yes, a currency-issuer can always print to pay nominal debts — but 'no involuntary default' is not the same as 'no constraint.' The real limit is what the economy can produce; printing past that erodes purchasing power, which is just default by inflation. Markets can also force a currency-issuer's hand long before it 'runs out of money': bond vintages, exchange rates, and interest costs can spiral, as the UK's September 2022 gilt crisis showed. Treating the absence of nominal default as a green light for open-ended deficits confuses solvency with sustainability.",
      proponent_rebuttal:
        "The descriptive claim is genuinely load-bearing and routinely denied by deficit hawks who warn of national 'bankruptcy.' Japan has run gross general-government debt near 230-240% of GDP for years — far above levels that supposedly trigger crisis — while borrowing in yen, keeping interest costs low, and never defaulting. The post-2008 era of large central-bank balance-sheet expansion did not produce the runaway inflation monetarists predicted. MMT's contribution is to reframe the binding constraint correctly: not an arbitrary debt-to-GDP ratio or a 'bond vigilante' bogeyman, but real resources and inflation. That reframing changes which policies are even on the table.",
      crux: {
        id: "default-vs-inflation-constraint",
        title: "Solvency vs. the Real Resource Constraint",
        description:
          "The load-bearing disagreement is whether 'a currency-issuer cannot be forced to default' is a useful operating principle for spending policy, or a trivially-true statement that ignores the binding inflation/real-resource constraint.",
        methodology:
          "Compare currency-issuing sovereigns across a wide range of debt-to-GDP ratios (Japan, US, UK) and identify whether involuntary nominal default ever occurred, then test whether high-debt currency-issuers experienced inflation/currency crises independent of nominal solvency. Distinguish episodes of spare capacity from episodes at/above full employment.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (public IMF / national-accounts data)",
      },
      evidence: [
        {
          id: "japan-high-debt-no-default",
          title: "Japan: ~230-240% Debt-to-GDP, No Default",
          description:
            "Japan, which borrows in its own currency, has carried government debt around 230-240% of GDP (IMF general-government measure; the linked World Bank series reports central government debt) — the highest in the developed world — for years without involuntary default, with low interest costs and persistently low (often sub-target) inflation until recently.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "World Bank / IMF, 'Central government debt, total (% of GDP) — Japan' (World Development Indicators)",
          sourceUrl:
            "https://data.worldbank.org/indicator/GC.DOD.TOTL.GD.ZS?locations=JP",
          reasoning:
            "High-quality official data and a genuine counterexample to 'high debt forces default.' Directness is limited: Japan's case is consistent with MMT's descriptive claim but does not by itself validate MMT's spending prescriptions, since Japan also has unique structural features (high domestic ownership, large net foreign assets, weak demand).",
        },
        {
          id: "qe-no-runaway-inflation",
          title: "Post-2008 QE Did Not Trigger Predicted Inflation",
          description:
            "The Federal Reserve's balance sheet expanded from ~$0.9T (6% of GDP) in 2007 to ~$4.5T (25% of GDP) by 2015 via quantitative easing, yet the high inflation predicted by monetarists did not materialize during 2009-2019 — undercutting the simple 'money creation = inflation' objection to deficit finance.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 5,
          },
          source:
            "Congressional Budget Office, 'How the Federal Reserve's Quantitative Easing Affects the Federal Budget' (2022)",
          sourceUrl: "https://www.cbo.gov/publication/58457",
          reasoning:
            "Official, non-partisan documentation of the balance-sheet expansion. Supports MMT's point that money creation is not mechanically inflationary when there is spare capacity. Directness is moderate: QE (asset swaps with banks) is not the same as MMT-style deficit-financed spending into the real economy, so the analogy is partial.",
        },
      ],
    },
    {
      id: "inflation-constraint",
      title: "Inflation Control",
      short_summary:
        "MMT concedes inflation — not solvency — is the real constraint, and proposes managing it with fiscal tools (taxes plus a job guarantee). The dispute is whether those tools can control inflation as reliably as MMT claims.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "MMT's inflation-control toolkit is its weakest link. Raising taxes to cool an overheating economy requires fast, well-targeted legislative action — but fiscal policy is slow, politically captured, and biased toward spending more and taxing less. History is brutal here: in Chile, Peru, Argentina, and Venezuela, central-bank-financed fiscal expansions premised on 'unused capacity' ended in runaway inflation, with Peru's inflation peaking near 8,000%. Even in the US, the large 2020-2021 deficits coincided with ~26% year-over-year M2 growth and the worst inflation in 40 years, exactly when MMT-flavored 'deficits don't matter' rhetoric was ascendant.",
      proponent_rebuttal:
        "MMT never claimed deficits never matter — it claimed inflation is the limit, which the 2021-2022 episode confirms rather than refutes. The Latin American cases involved fixed/managed exchange rates, foreign-currency debt, and supply collapse — precisely the conditions MMT says remove monetary sovereignty, so they are not tests of MMT. Crucially, MMT proposes a structural anti-inflation anchor that critics ignore: a federally-funded Job Guarantee that buys labor at a fixed wage, creating a countercyclical 'buffer stock' that expands in slumps and shrinks in booms. Levy Institute modeling estimates such a program would cost only ~0.8-2% of GDP net while stabilizing prices through the wage floor rather than through unemployment.",
      crux: {
        id: "can-fiscal-tools-tame-inflation",
        title: "Can Fiscal Tools Anchor Inflation as Reliably as the Central Bank?",
        description:
          "The pivotal question: can discretionary taxation plus a job-guarantee buffer stock control inflation as reliably and promptly as independent central-bank interest-rate policy — or does fiscal-led inflation control fail on timing, political economy, and credibility?",
        methodology:
          "Examine historical episodes of money-financed deficit spending (Latin America 1970s-2010s; US 2020-2022) for inflation outcomes; separately test whether buffer-stock employment schemes (e.g. India's MGNREGA, Argentina's Jefes program) demonstrably anchored a price level. Assess legislative response lags vs. central-bank lags.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 for historical analysis; a full Job-Guarantee price-anchor test would require a national pilot (untested at US scale)",
      },
      evidence: [
        {
          id: "covid-deficit-inflation",
          title: "2020-2022: Large Deficits, M2 Surge, 40-Year-High Inflation",
          description:
            "US M2 grew by roughly $6T (from about $15.4T in Feb 2020 to ~$21.7T by April 2022), with year-over-year growth peaking at 26.9% in February 2021; core PCE inflation then rose to 5.2% by January 2022 — the fastest since 1983 — as large deficit-financed transfers met constrained supply.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 7,
          },
          source:
            "Federal Reserve (M2SL, via St. Louis Fed, 'The Rise and Fall of M2,' 26.9% YoY peak Feb 2021) and BEA core PCE (PCEPILFE; 5.2% YoY Jan 2022, reported by CNBC)",
          sourceUrl:
            "https://www.stlouisfed.org/on-the-economy/2023/may/the-rise-and-fall-of-m2",
          reasoning:
            "Documents the strongest real-world cautionary episode. Directness is real but contested: supply-chain shocks and energy prices also drove 2021-2022 inflation, and MMT proponents argue this confirms (not refutes) their claim that inflation, not solvency, is the binding constraint. Weighted as solid-but-not-decisive against the 'sound basis' claim.",
        },
        {
          id: "edwards-latin-america",
          title: "Latin America: Money-Financed Deficits Ended in Hyperinflation",
          description:
            "Sebastián Edwards documents four episodes (Chile 1970-73, Peru 1985-90, Argentina, Venezuela) where governments ran central-bank-financed deficits on the premise of unused capacity; all ended in runaway inflation, large devaluations, and falling real wages, with the price of foreign currency in Peru jumping more than 8,000% in 1989-90.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source:
            "Sebastián Edwards, 'Modern Monetary Theory: Cautionary Tales from Latin America,' Cato Journal / Hoover Institution (2019)",
          sourceUrl:
            "https://www.hoover.org/sites/default/files/research/docs/19106_edwards.pdf",
          reasoning:
            "Peer-style policy paper by a leading scholar of Latin American macro. Directness is reduced because MMT proponents argue these countries lacked true monetary sovereignty (foreign-currency debt, fixed/managed exchange rates), so the episodes may illustrate MMT's own caveats rather than refute its core. Honest medium weights.",
        },
        {
          id: "job-guarantee-anchor",
          title: "Job Guarantee as a Buffer-Stock Price Anchor",
          description:
            "Levy Institute modeling estimates a US federal Job Guarantee employing ~11-16 million people at a fixed living wage would cost only ~0.8-2% of GDP net, while acting as a countercyclical buffer stock intended to anchor wages and prices without using unemployment as the inflation control.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 4,
            replicability: 4,
            directness: 6,
          },
          source:
            "Tcherneva / Wray et al., 'Public Service Employment: A Path to Full Employment,' Levy Economics Institute (2018); Tcherneva, 'The Social Enterprise Model for a Job Guarantee' (2014)",
          sourceUrl: "https://www.levyinstitute.org/pubs/rpr_4_18.pdf",
          reasoning:
            "Directly states MMT's central inflation-control mechanism, but from MMT-aligned authors (low independence) and never tested as a price anchor at national scale (low replicability). The price-stabilizing claim is a modeled projection, not a verified result, so weights are deliberately modest.",
        },
      ],
    },
    {
      id: "expert-consensus",
      title: "Expert Consensus",
      short_summary:
        "Mainstream economists across the ideological spectrum overwhelmingly reject MMT's headline claims, while MMT scholars argue critics attack strawman versions of the theory.",
      icon_name: "Users" as const,
      skeptic_premise:
        "When a proposition is sound, the relevant experts converge on it. On MMT they do the opposite: a University of Chicago panel of top economists — Keynesian, monetarist, and otherwise — registered zero agreement with MMT's core deficit claims, a near-unprecedented unanimity. The deeper objection is institutional: using discretionary taxation to fine-tune the money supply re-politicizes monetary policy and discards decades of hard-won central-bank independence built to solve the time-inconsistency problem. An inflation tax, when it comes, also falls hardest on the poor — the very group MMT claims to help.",
      proponent_rebuttal:
        "The famous survey didn't ask economists about MMT — it asked them to endorse two crude caricatures ('finance as much spending as they want by creating money') that no serious MMT scholar holds, so the 'unanimity' is against a strawman. MMT explicitly makes inflation the constraint; it does not claim spending is costless. On the merits, MMT economists have published point-by-point replies (the Levy Institute's 'Seven Replies to the Critiques') showing that many objections either misstate MMT or restate points MMT already concedes. Consensus against a misdescribed theory is weak evidence about the theory itself.",
      crux: {
        id: "strawman-vs-substance",
        title: "Is the Expert Rejection Aimed at MMT or a Caricature?",
        description:
          "The decisive question is whether the near-unanimous expert rejection targets MMT's actual claims (inflation-constrained, job-guarantee-anchored fiscal policy) or a caricature ('print unlimited money, deficits never matter') that MMT scholars say they never asserted.",
        methodology:
          "Place the exact survey wording side-by-side with MMT primary texts (Kelton, Wray, Mitchell, Tcherneva) and the published MMT rebuttals; identify which specific claims are shared, which are caricatures, and which represent genuine substantive disagreement on inflation control and central-bank independence.",
        verification_status: "verified" as const,
        cost_to_verify: "$0 (textual comparison of survey wording vs. MMT primary sources)",
      },
      evidence: [
        {
          id: "igm-survey-rejection",
          title: "Top-Economist Panel Unanimously Rejected MMT Claims",
          description:
            "On the Chicago Booth / Clark Center US Economic Experts Panel, not a single economist agreed with two statements framed as MMT: that currency-issuers needn't worry about deficits, or can finance unlimited real spending by creating money. ~72-76% strongly disagreed; the rest disagreed.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source:
            "Chicago Booth IGM / Clark Center US Economic Experts Panel, 'Modern Monetary Theory' survey (March 2019)",
          sourceUrl: "https://kentclarkcenter.org/surveys/modern-monetary-theory/",
          reasoning:
            "An ideologically diverse, high-credibility expert panel with a rare unanimous result. Directness is deliberately capped at 6 because the survey wording is a strong, arguably caricatured version of MMT — a point MMT proponents dispute and that the crux turns on.",
        },
        {
          id: "taxation-inflation-control-critique",
          title: "Using Taxation to Control Inflation Is Slow and Politically Fraught",
          description:
            "Cato Journal critique argues MMT's plan to manage inflation via discretionary taxation ignores decades of work separating monetary from fiscal policy, that legislatures cannot adjust taxes fast enough to tame inflation, and that the resulting inflation tax falls disproportionately on the poor.",
          side: "against" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 5,
            directness: 7,
          },
          source:
            "Warren Coats, 'Modern Monetary Theory: A Critique,' Cato Journal (Fall 2019)",
          sourceUrl:
            "https://www.cato.org/cato-journal/fall-2019/modern-monetary-theory-critique",
          reasoning:
            "Directly targets MMT's actual inflation-control mechanism (a genuine substantive objection, not a strawman). Independence is lower because Cato is an advocacy think tank; the timing/political-economy argument is theoretical rather than empirically settled, so weights are moderate.",
        },
        {
          id: "mmt-replies-defense",
          title: "MMT Scholars' Point-by-Point Reply to Critics",
          description:
            "A Levy Institute working paper ('Seven Replies to the Critiques of Modern Money Theory') argues that standard objections either misdescribe MMT, attack claims MMT does not make, or restate constraints (inflation, real resources) that MMT already builds in — so the expert consensus is partly aimed at a caricature.",
          side: "for" as const,
          weight: {
            sourceReliability: 5,
            independence: 3,
            replicability: 4,
            directness: 6,
          },
          source:
            "Eric Tymoigne, 'Seven Replies to the Critiques of Modern Money Theory,' Levy Economics Institute Working Paper No. 996 (2021)",
          sourceUrl:
            "https://www.levyinstitute.org/wp-content/uploads/2024/02/wp_996.pdf",
          reasoning:
            "Directly relevant to the strawman crux, but authored by an MMT-aligned scholar (very low independence) and a working paper rather than peer-reviewed consensus (low replicability). Included for balance and honestly down-weighted as an interested-party defense.",
        },
      ],
    },
  ],
};
