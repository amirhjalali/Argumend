import type { Topic } from "@/lib/schemas/topic";

export const dogeFederalCutsData = {
  id: "doge-federal-cuts",
  title: "DOGE & Federal Spending Cuts",
  meta_claim:
    "The Department of Government Efficiency's mass workforce cuts, contract terminations, and spending freezes have eliminated waste, fraud, and abuse and made the federal government leaner and more effective.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    // =========================================================================
    // PILLAR 1: Claimed vs. Verified Savings
    // =========================================================================
    {
      id: "claimed-vs-verified-savings",
      title: "Claimed vs. Verified Savings",
      short_summary:
        "DOGE's 'Wall of Receipts' claimed $175 billion in savings by mid-2025, but independent reconciliation by NPR and the Washington Post verified only a fraction, after the ledger was caught listing the same contracts multiple times and inflating figures by orders of magnitude.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "DOGE's savings claims are largely fictional. Its public ledger has been repeatedly caught in basic arithmetic errors: an ICE contract listed at $8 billion was actually $8 million, an SSA contract listed at $232 million was actually $560,000, and a single USAID contract was counted three times for $650 million. When NPR and the Washington Post independently reconciled the receipts in February 2025, only roughly $2 billion was verifiable against DOGE's headline claims of $65-175 billion. Meanwhile, the IRS revenue-agent cuts alone are projected to forgo $861 billion in tax revenue over a decade — meaning DOGE may be losing far more money than it saves.",
      proponent_rebuttal:
        "Early ledger errors are real but reflect the speed of a startup-style operation, not the absence of waste. GAO's own estimates put annual federal improper payments at $233-521 billion, an enormous pool of genuine inefficiency that prior administrations never seriously attacked. DOGE forced a culture of scrutiny on contracts that had renewed automatically for decades, and even conservative verified figures represent billions returned to taxpayers. The ledger is being corrected as discrepancies surface — transparency about errors is a feature, not proof the savings are imaginary.",
      crux: {
        id: "savings-reconciliation-audit",
        title: "The Savings Reconciliation Audit",
        description:
          "The central empirical question is whether DOGE's claimed savings survive line-by-line reconciliation against actual contract values, obligations, and outlays. If the verified total is a small fraction of the claimed total — and if revenue losses from IRS and other cuts exceed verified savings — then the 'efficiency' claim fails on its own accounting terms.",
        methodology:
          "Take DOGE's published 'Wall of Receipts' and match each line item against the authoritative contract record in USASpending.gov and FPDS, distinguishing ceiling value from obligated funds from money actually saved. Net the verified savings against documented revenue losses (e.g., the Yale Budget Lab IRS projection) and the cost of rehiring essential staff. A net-savings figure can be produced from entirely public federal procurement data.",
        verification_status: "verified" as const,
        cost_to_verify:
          "$0 (USASpending.gov, FPDS, and GAO improper-payment data are publicly available)",
      },
      evidence: [
        {
          id: "wall-of-receipts-errors",
          title: "DOGE 'Wall of Receipts' Repeatedly Inflated by Orders of Magnitude",
          description:
            "DOGE's public savings ledger had to be repeatedly edited after fact-checkers found systematic errors: an ICE contract listed at $8 billion was actually $8 million (a 1,000x overstatement), an SSA contract listed at $232 million was actually about $560,000, and a single USAID contract was listed three times totaling $650 million. The errors consistently ran in the direction of overstating savings.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "PBS NewsHour; USASpending.gov; Washington Post",
          sourceUrl: "https://www.pbs.org/newshour/show/a-look-at-the-misleading-and-incorrect-claims-on-doges-wall-of-receipts",
          reasoning:
            "These are not interpretive disputes but verifiable arithmetic errors against the public procurement record, all running in the direction of inflating savings. This directly undermines the headline claim that DOGE delivered the savings it advertised.",
        },
        {
          id: "npr-wapo-verified-savings",
          title: "Independent Reconciliation Found ~$2B Verifiable Against $65-175B Claimed",
          description:
            "When NPR and the Washington Post independently reconciled DOGE's receipts in February 2025, only roughly $2 billion was verifiable against DOGE's claimed savings, which ranged from $65 billion to a later headline of $175 billion. Much of the claimed savings reflected contract ceiling values (maximum possible spend) rather than money actually obligated or recovered.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "NPR; Washington Post; Wikipedia (Department of Government Efficiency)",
          sourceUrl: "https://www.npr.org/2025/02/11/nx-s1-5290288/doge-savings-billions-contracts-musk-trump",
          reasoning:
            "Independent newsroom reconciliation against the federal procurement record is the closest available proxy for an audit. The gap between ~$2B verified and $65-175B claimed is the core of the savings dispute.",
        },
        {
          id: "gao-improper-payments",
          title: "GAO Estimates $233-521B in Annual Federal Improper Payments",
          description:
            "The Government Accountability Office's 2024 work estimated annual federal improper payments in the range of $233-521 billion, a genuinely large pool of inefficiency. GAO is explicit, however, that 'improper payments' include unintentional administrative and documentation errors — not only fraud — so the figure cannot be read as a measure of recoverable fraud or of savings DOGE actually captured.",
          side: "for" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 8,
            directness: 6,
          },
          source: "U.S. Government Accountability Office (GAO-24-105833)",
          sourceUrl: "https://www.gao.gov/products/gao-24-105833",
          reasoning:
            "GAO is an authoritative nonpartisan source and the improper-payments figure establishes that real inefficiency exists, supporting the proponent case. But its directness is limited: improper payments are not the same as fraud or as savings DOGE realized.",
        },
        {
          id: "irs-foregone-revenue",
          title: "IRS Cuts Projected to Forgo $861B in Revenue Over a Decade",
          description:
            "By March 2025 the IRS had lost about 31% of its revenue agents (roughly 3,623 auditors). The Yale Budget Lab projected that the weakened enforcement capacity would forgo approximately $861 billion in federal revenue over 2026-2035. If accurate, the revenue lost from cutting tax collectors dwarfs DOGE's verified savings, inverting the efficiency claim.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Yale Budget Lab; TIGTA; CBS News",
          sourceUrl: "https://budgetlab.yale.edu/research/weakened-irs-has-substantial-consequences",
          reasoning:
            "The Yale Budget Lab projection is a model-based estimate, but it is grounded in well-established return-on-investment ratios for IRS enforcement. It directly challenges the savings claim by showing the cuts may lose more money than they save.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 2: Essential-Services Disruption & the Rehiring Pattern
    // =========================================================================
    {
      id: "service-disruption",
      title: "Essential-Services Disruption",
      short_summary:
        "Rapid firings cut staff at the SSA, VA, IRS, FAA, NWS, and CDC before downstream effects were visible. Agencies then scrambled to rehire roughly 25,000 'essential' workers — including bird-flu, nuclear-weapons, and weather-forecasting staff — suggesting cuts ran ahead of any map of what was load-bearing.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "DOGE cut faster than anyone could know what was essential, and the public paid for it. Social Security phone wait times peaked at 2.5 hours with 6 million cases backlogged; VA mental-health waits rose to a 35-day national mean (61 days in Maine) after the VA shed 40,000 employees; the FAA cut 130+ roles supporting air traffic controllers amid rising safety incidents. The 'fire fast, rehire what's load-bearing' approach assumes a legibility the government doesn't have — proven by the roughly 25,000 workers rehired after agencies discovered they were essential, including bird-flu responders at USDA, nuclear-stockpile staff at NNSA, and storm forecasters at NOAA brought back only after deadly Texas floods.",
      proponent_rebuttal:
        "The reversals are evidence the system self-corrects, not that it is broken. Out of more than 350,000 departures, rehiring roughly 25,000 is a 7% correction rate — far better than the status quo of never testing whether a position is necessary at all. Many disruptions are transitional growing pains of any large restructuring, and several headline cuts (NPS, NIH indirect-cost caps) were checked by Congress and the courts before causing lasting harm. The alternative — leaving an admittedly bloated workforce untouched because some unknown fraction is essential — is exactly the inertia DOGE was created to break.",
      crux: {
        id: "transitional-vs-permanent-degradation",
        title: "Transitional Disruption vs. Permanent Capacity Loss",
        description:
          "Both sides agree service metrics worsened after the cuts. The crux is whether the degradation is transitional (a temporary cost of restructuring that normalizes) or structural (a permanent loss of capacity that a future administration will struggle to rebuild). The rehiring pattern is the key test: it can be read as healthy self-correction or as proof the cutter could not identify what was load-bearing.",
        methodology:
          "Track agency service-delivery metrics — SSA phone wait times and backlog counts, VA mental-health wait times, IRS processing times, FAA safety-incident rates — month over month from the pre-cut baseline through 24+ months post-cut. Compare the trajectory against the count and timing of essential-worker rehires. Persistent or worsening metrics indicate structural loss; recovery to baseline indicates transitional disruption.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$100K-500K (Longitudinal reconciliation of agency performance data; most underlying metrics are public via Performance.gov and agency reports, but multi-year tracking and causal attribution require dedicated analysis)",
      },
      evidence: [
        {
          id: "essential-rehires",
          title: "~25,000 Fired Workers Rehired After Found Essential",
          description:
            "Roughly 25,000 employees fired in early 2025 were rehired after agencies discovered they were essential. Documented reversals include USDA bird-flu response staff, National Nuclear Security Administration personnel handling the nuclear weapons stockpile, and NOAA/National Weather Service forecasters — with NOAA authorized to rehire up to 450 only after deadly July 2025 Texas floods put weather-service cuts on front pages.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Brookings Institution; NPR; CNN",
          sourceUrl: "https://www.brookings.edu/articles/the-fallout-from-doges-approach-to-government-reform/",
          reasoning:
            "The rehiring of nuclear-stockpile and bird-flu staff demonstrates that cuts ran ahead of any reliable assessment of what was essential. This is the strongest single illustration that 'fire fast, rehire what's load-bearing' assumes legibility the organization lacked.",
        },
        {
          id: "ssa-service-collapse",
          title: "SSA Phone Waits Hit 2.5 Hours With Millions of Cases Backlogged",
          description:
            "After roughly 7,500 employees were pushed out of the Social Security Administration, phone wait times peaked at about 2.5 hours, with an estimated 6 million cases backlogged in processing centers and around 12 million transactions backed up in field offices — directly degrading service to retirees and disability beneficiaries.",
          side: "against" as const,
          weight: {
            sourceReliability: 5,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Moneywise (personal-finance aggregator) relaying Social Security Administration service reporting",
          sourceUrl: "https://moneywise.com/managing-money/retirement-planning/the-system-is-a-shambles-doges-ssa-staff-cuts-spark-long-waits-and-have-beneficiaries-fuming-experts-urge-older-americans-to-prepare-for-delays",
          reasoning:
            "SSA serves nearly every American household, making its service metrics a direct and high-salience measure of disruption. The backlog figures are concrete and tied to a specific staffing reduction, though attributing the full effect to DOGE alone requires controlling for pre-existing trends.",
        },
        {
          id: "va-workforce-cuts",
          title: "VA Shed 40,000+ Employees; Mental-Health Waits Rose to 35-Day Mean",
          description:
            "The Department of Veterans Affairs lost more than 40,000 employees in FY2025, with 88% of the reductions falling on the Veterans Health Administration, including roughly 3,000 nurses and 1,000 physicians. A January 2026 Senate Veterans' Affairs Committee minority report documented mental-health wait times rising to a 35-day national mean and 61 days in Maine.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Senate Veterans' Affairs Committee (minority report, Jan 2026); Government Executive",
          sourceUrl: "https://www.govexec.com/workforce/2026/01/va-has-shed-40000-employees-democratic-report-finds-drastic-impacts-veterans/410864/",
          reasoning:
            "The clinical-staff losses and wait-time data are concrete and directly relevant to service quality. The headline report is from the committee minority, which lowers independence, but the underlying VA workforce and wait-time figures are corroborated by trade-press reporting.",
        },
        {
          id: "congress-court-checks",
          title: "Congress and Courts Blocked the Deepest Cuts (NPS, NIH)",
          description:
            "Several of DOGE's most aggressive proposals were checked before causing lasting damage: Congress rejected the administration's FY2026 request for a 37% cut to the National Park Service, and a federal court struck down DOGE's proposed cap on NIH 'indirect cost' reimbursements, with the NIH research cuts later reported officially dead. Proponents argue this shows the system contained the excesses while preserving genuine reform.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "Washington Post; congressional appropriations records; GearJunkie (NPS-cut figure)",
          sourceUrl: "https://www.washingtonpost.com/opinions/2026/04/13/nih-research-cuts-doge-economy/",
          reasoning:
            "That Congress and the courts blocked the deepest cuts supports the proponent claim that institutional checks contained the harm. But it also concedes the original cuts were severe enough to require blocking, and the directness to the efficiency claim is moderate.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 3: Legality, Due Process & the Power of the Purse
    // =========================================================================
    {
      id: "legality-due-process",
      title: "Legality & Due Process",
      short_summary:
        "Courts found OPM's mass-termination orders unlawful and the First Circuit affirmed a block on the funds freeze, invoking the Impoundment Control Act of 1974 and Train v. City of New York. The deepest dispute — whether the unitary executive can impound appropriated funds and fire at will — turns on Trump v. Slaughter and the fate of Humphrey's Executor.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "DOGE's methods collided with the Constitution's separation of powers. In September 2025, Judge Alsup granted summary judgment finding OPM's mass-termination orders unlawful and ordering personnel files corrected. The Impoundment Control Act of 1974 and the unanimous Supreme Court ruling in Train v. City of New York (1975) hold that the executive cannot unilaterally refuse to spend funds Congress appropriated — and in March 2026 the First Circuit affirmed a block on the administration's funds freeze. Reviving Schedule F as 'Schedule Policy/Career' to reclassify up to 50,000 positions as at-will, and firing independent-agency officials in defiance of Humphrey's Executor, treats Article I's power of the purse as optional.",
      proponent_rebuttal:
        "The President has broad constitutional authority over the executive branch, and the courts are split, not settled. In July 2025 the Supreme Court, on its emergency docket, granted the administration broad authority to reshape and shrink the federal workforce, partially reversing lower-court relief. The unitary-executive theory holds that Article II vests all executive power in the President, including the power to remove subordinates and manage spending priorities — and Trump v. Slaughter, argued in December 2025, is widely expected to overrule or sharply narrow the 1935 Humphrey's Executor limit on removing agency heads. Where DOGE overstepped, courts corrected it; that is the system working, not a constitutional crisis.",
      crux: {
        id: "impoundment-removal-authority",
        title: "The Impoundment & Removal Authority Test",
        description:
          "The decisive legal question is whether the unitary-executive theory reaches Article I's appropriations power — i.e., whether a President may decline to spend appropriated funds and fire officials Congress insulated from removal. Unlike the empirical cruxes, this is partly a normative legal commitment, but it has concrete arbiters: the binding force of Train v. City of New York and the Impoundment Control Act on the spending side, and the Supreme Court's pending Trump v. Slaughter ruling on the removal side.",
        methodology:
          "Track the controlling precedents to resolution: (1) on spending, whether appellate courts continue to enforce Train and the Impoundment Control Act against the funds freeze; (2) on removal, how the Supreme Court rules in Trump v. Slaughter (expected by June 2026) and whether it preserves, narrows, or overrules Humphrey's Executor. The outcome of these cases, not opinion, settles the boundary of executive authority.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$0 to observe (court records are public), but resolution depends on pending Supreme Court rulings, not analysis — the core question is a contested legal commitment awaiting adjudication",
      },
      evidence: [
        {
          id: "alsup-opm-ruling",
          title: "Federal Court Found OPM's Mass-Termination Orders Unlawful (Sept 2025)",
          description:
            "On September 12, 2025, Judge William Alsup of the Northern District of California granted summary judgment to the American Federation of Government Employees, finding that OPM unlawfully directed agencies to carry out mass firings and ordering agencies to correct affected personnel files. The ruling held that OPM lacked authority to order other agencies to terminate their employees.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 9,
            replicability: 9,
            directness: 9,
          },
          source: "Federal News Network; U.S. District Court (N.D. Cal.)",
          sourceUrl: "https://federalnewsnetwork.com/workforce/2025/09/court-finds-opm-unlawfully-directed-mass-firings-tells-agencies-to-update-personnel-files/",
          reasoning:
            "A federal court summary-judgment ruling is an authoritative legal determination, not an opinion. It directly establishes that a central mechanism of DOGE's workforce reductions was carried out unlawfully.",
        },
        {
          id: "funds-freeze-blocked",
          title: "First Circuit Affirmed Block on Funds Freeze Under Impoundment Control Act",
          description:
            "In March 2026 the First Circuit affirmed a district court order blocking the administration's across-the-board freeze of appropriated funds. The litigation rests on the Impoundment Control Act of 1974 and the unanimous Supreme Court decision in Train v. City of New York (1975), which held that the executive cannot refuse to spend funds Congress has appropriated.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Constitutional Accountability Center; U.S. Court of Appeals (1st Cir.)",
          sourceUrl: "https://www.theusconstitution.org/litigation/new-york-v-trump-2/",
          reasoning:
            "The First Circuit's affirmance is binding appellate precedent on the funds freeze, and it rests on long-standing, unanimous Supreme Court authority. This directly challenges the legality of impounding appropriated funds.",
        },
        {
          id: "scotus-workforce-stay",
          title: "Supreme Court Granted Broad Authority to 'Reshape and Shrink' the Workforce (July 2025)",
          description:
            "In July 2025, the Supreme Court, ruling on its emergency (shadow) docket, granted the administration broad authority to reshape and shrink the federal workforce, partially reversing lower-court relief that had paused the reductions. Proponents cite this as evidence that the President's management authority over the executive branch is constitutionally robust.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "PBS NewsHour; Supreme Court of the United States",
          sourceUrl: "https://www.pbs.org/newshour/show/federal-workers-union-says-it-will-continue-to-fight-firings-after-supreme-court-ruling",
          reasoning:
            "A Supreme Court stay is high-authority and directly supports the executive-power claim. Its weight is tempered by being an emergency-docket ruling rather than a merits decision, leaving the ultimate question unsettled.",
        },
        {
          id: "trump-v-slaughter",
          title: "Trump v. Slaughter Could Overturn Humphrey's Executor (argued Dec 2025)",
          description:
            "On December 8, 2025, the Supreme Court heard oral argument in Trump v. Slaughter, the case over the President's power to remove a Federal Trade Commission member without cause. Observers widely expect the Court to overrule or sharply narrow Humphrey's Executor (1935) by June 2026, which would expand presidential removal power over independent agencies central to the unitary-executive theory underpinning DOGE.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Axios; NPR; Supreme Court oral-argument records",
          sourceUrl: "https://www.axios.com/2025/12/08/what-is-humphreys-executor-scotus-trump-ftc-firing",
          reasoning:
            "The pending case is directly relevant to the legal foundation of DOGE's removal actions and is cited by proponents as evidence the law is shifting toward expansive executive authority. It is forward-looking and unresolved, so it bolsters the proponent case only if the Court rules as expected.",
        },
      ],
    },

    // =========================================================================
    // PILLAR 4: Reform vs. Demolition — Long-Run State Capacity
    // =========================================================================
    {
      id: "reform-vs-capacity",
      title: "Reform vs. Long-Run State Capacity",
      short_summary:
        "Even critics agree the federal hiring-and-firing process is broken and that 99.8% positive performance reviews are not credible. The dispute is whether DOGE actually reformed the process or merely cut the workforce while leaving the broken procedures in place — and whether the government will need more capacity, not less, for the AI, biosecurity, and climate challenges ahead.",
      icon_name: "Users" as const,
      skeptic_premise:
        "DOGE cut people, not process — destroying capacity the 2030s will require. As Jen Pahlka argues, DOGE 'is not dismantling unnecessary process and procedure; it's simply ignoring them. It is cutting the workforce and leaving all the unproductive work in place.' Don Moynihan and Donald Kettl warn of an unprecedented disinvestment in federal capacity that a future president will find extremely difficult to reverse. The bellwethers are stark: the CDC eliminated its Epidemic Intelligence Service first-year cohort and NOAA lost storm modelers — exactly the surveillance and forecasting capacity needed for pandemics, climate adaptation, and AI-era governance.",
      proponent_rebuttal:
        "The diagnosis that the civil service is structurally broken is shared even by reform-minded critics, and that justifies aggressive action. The federal government fires employees at roughly one-quarter the rate of the private sector for procedural reasons, and 99.8% of federal employees receive positive performance reviews — a figure no serious observer believes reflects reality. Past 'reinventing government' efforts failed precisely because they respected every procedure. DOGE's bet is that breaking the inertia is worth the disruption, and that emerging tools — including AI-driven enforcement at the IRS — can substitute for some of the lost headcount rather than requiring it to be rebuilt one-for-one.",
      crux: {
        id: "process-reform-vs-headcount-cut",
        title: "Process Reform vs. Headcount Cut",
        description:
          "Both reformers and DOGE agree the underlying personnel process is dysfunctional. The crux is whether DOGE changed the dysfunctional process or merely removed the people while leaving the process intact. If the broken procedures remain and only headcount fell, the result is reduced capacity to perform the same unproductive work — the opposite of efficiency. If procedures were genuinely streamlined, the smaller workforce can do more.",
        methodology:
          "Audit the actual procedural changes versus headcount changes: catalog which civil-service rules, approval chains, and procurement procedures were eliminated or simplified (regulatory text, OPM rules), and measure output-per-employee and cycle times before and after. Compare against the workforce-reduction figures. If procedures are unchanged while headcount fell, the 'reform' claim fails; if cycle times improved alongside cuts, it holds.",
        verification_status: "theoretical" as const,
        cost_to_verify:
          "$500K-1M (Cross-agency productivity and process audit requiring output metrics, procedural inventories, and controls for confounding factors)",
      },
      evidence: [
        {
          id: "performance-review-anomaly",
          title: "99.8% of Federal Employees Receive Positive Performance Reviews",
          description:
            "Reporting compiled by Statecraft found that about 99.8% of federal employees receive positive performance reviews, and that the federal government fires employees at roughly one-quarter the rate of the private sector — driven by procedural barriers rather than universal excellence. These figures are cited across the reform spectrum as evidence the civil-service accountability process is genuinely broken.",
          side: "for" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 7,
          },
          source: "Statecraft (Santi Ruiz); OPM performance data",
          sourceUrl: "https://www.statecraft.pub/p/998-of-federal-employees-get-good",
          reasoning:
            "The performance-review and firing-rate statistics are drawn from federal data and are accepted even by capacity-defenders as evidence of a real problem, supporting the proponent case that aggressive reform was warranted. Independence is moderate because the framing comes from a reform-advocacy outlet.",
        },
        {
          id: "pahlka-ignoring-process",
          title: "Pahlka: DOGE Cut the Workforce but Left the 'Unproductive Work in Place'",
          description:
            "Jen Pahlka, author of Recoding America and a veteran of government-process reform, argues that 'DOGE as it exists today is not dismantling unnecessary and unhelpful process and procedure. It's simply ignoring them. It is cutting the workforce and leaving all the unproductive work in place.' Because Pahlka has spent her career attacking proceduralism, the critique cannot be dismissed as reflexive defense of the status quo.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Jen Pahlka, Eating Policy (eatingpolicy.com)",
          sourceUrl: "https://www.eatingpolicy.com/p/state-capacity-roundup-march-13",
          reasoning:
            "Pahlka is a load-bearing cross-camp voice: a process-reform advocate, not a defender of bureaucracy, which makes her claim that DOGE cut people without fixing process especially credible. Replicability is lower because it is expert judgment rather than a quantified metric.",
        },
        {
          id: "kettl-disinvestment",
          title: "Scholars Warn of Unprecedented, Hard-to-Reverse Disinvestment in State Capacity",
          description:
            "Public-administration scholar Donald Kettl stated, 'We've never, ever seen anything that has amounted to a disinvestment in federal capacity like this,' and warned that a future administration would find restoration extremely difficult. Don Moynihan's research similarly frames the cuts as a durable erosion of the government's ability to govern, not a temporary belt-tightening.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Donald Kettl / Don Moynihan via Government Executive",
          sourceUrl: "https://www.govexec.com/workforce/2026/02/tail-wagging-dog-snapshots-public-service-year-second-trump-administration/411224/",
          reasoning:
            "These are expert assessments from leading public-administration scholars, lending authority to the structural-loss reading. They are forward-looking judgments rather than measured outcomes, which limits replicability and independence.",
        },
        {
          id: "cdc-eis-noaa-bellwethers",
          title: "CDC Disease-Detective and NOAA Forecasting Capacity Among Cuts",
          description:
            "The CDC lost about 1,300 staff (~10% of its workforce) and eliminated the first-year cohort of its Epidemic Intelligence Service — the 'disease detectives' central to outbreak response — while NOAA/NWS lost storm modelers and forecasters. Critics cite these as the bellwethers for capacity the 2030s will need most: pandemic surveillance, climate adaptation, and forecasting. Proponents counter that AI and modernization can substitute for some lost headcount.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 7,
          },
          source: "Medical Economics; Center for American Progress",
          sourceUrl: "https://www.medicaleconomics.com/view/elon-musk-s-doge-and-its-impact-on-federal-health-agencies-explained",
          reasoning:
            "The specific loss of disease-surveillance and weather-forecasting capacity is concrete and directly relevant to the forward-looking capacity crux. Whether these losses prove decisive depends on future events (a pandemic, extreme-weather season), which tempers replicability.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Department of Government Efficiency - Wikipedia",
      url: "https://en.wikipedia.org/wiki/Department_of_Government_Efficiency",
    },
    {
      title: "A look at the misleading and incorrect claims on DOGE's wall of receipts - PBS NewsHour",
      url: "https://www.pbs.org/newshour/show/a-look-at-the-misleading-and-incorrect-claims-on-doges-wall-of-receipts",
    },
    {
      title:
        "Fraud Risk Management: 2018-2022 Data Show Federal Government Loses an Estimated $233B-$521B Annually to Fraud - U.S. GAO (GAO-24-105833)",
      url: "https://www.gao.gov/products/gao-24-105833",
    },
    {
      title: "A Weakened IRS Has Substantial Consequences - Yale Budget Lab",
      url: "https://budgetlab.yale.edu/research/weakened-irs-has-substantial-consequences",
    },
    {
      title: "The fallout from DOGE's approach to government reform - Brookings Institution",
      url: "https://www.brookings.edu/articles/the-fallout-from-doges-approach-to-government-reform/",
    },
    {
      title: "Court finds OPM unlawfully directed mass firings - Federal News Network",
      url: "https://federalnewsnetwork.com/workforce/2025/09/court-finds-opm-unlawfully-directed-mass-firings-tells-agencies-to-update-personnel-files/",
    },
    {
      title: "What is Humphrey's Executor? - Axios",
      url: "https://www.axios.com/2025/12/08/what-is-humphreys-executor-scotus-trump-ftc-firing",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did DOGE actually save money, or just claim it?",
      content:
        "DOGE's ledger claimed up to $175 billion in savings, but independent reconciliation verified only about $2 billion, after the receipts were caught inflating figures by up to 1,000x. Meanwhile, cutting 31% of IRS revenue agents is projected to forgo $861 billion in revenue. When verified savings are netted against revenue losses and the cost of rehiring essential staff, did DOGE leave the government better off financially — or worse?",
    },
    {
      id: "q2",
      title: "Was the disruption transitional, or a permanent loss of capacity?",
      content:
        "Service metrics worsened sharply after the cuts — 2.5-hour SSA waits, 35-day VA mental-health waits, and ~25,000 essential workers rehired, including nuclear-stockpile and bird-flu staff. Proponents call this transitional growing pain that the system self-corrects. Critics call it a durable disinvestment a future president cannot easily reverse. Which reading does the multi-year data support?",
    },
    {
      id: "q3",
      title: "Can the executive impound funds and fire at will?",
      content:
        "Train v. City of New York and the Impoundment Control Act say the President cannot refuse to spend appropriated funds, and a court found OPM's mass firings unlawful. The unitary-executive theory — and a likely ruling in Trump v. Slaughter — say presidential power over the executive branch is far broader. Is DOGE a lawful exercise of executive authority or a rebellion against Article I's power of the purse?",
    },
    {
      id: "q4",
      title: "Did DOGE reform the broken process, or just cut the people?",
      content:
        "Almost everyone agrees the civil service is dysfunctional: 99.8% positive performance reviews and firing rates a quarter of the private sector's. But reform advocate Jen Pahlka argues DOGE 'cut the workforce and left all the unproductive work in place.' Did DOGE fix the broken procedures, or just remove the staff who carried them out — leaving a smaller government doing the same unproductive work?",
    },
  ],
};
