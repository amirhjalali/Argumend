export const dogeFederalCutsData = {
  id: "doge-federal-cuts",
  title: "DOGE's Cuts: Waste Removed, or Government Weakened?",
  question:
    "Did DOGE cut real waste, or leave Americans with a weaker government?",
  aliases: [
    "Did DOGE's cuts eliminate waste and make government more effective?",
    "Did DOGE actually cut government waste and make Washington leaner?",
    "How much did DOGE really save?",
    "DOGE & Federal Spending Cuts",
  ],
  meta_claim:
    "The Department of Government Efficiency's mass workforce cuts, contract terminations, and spending freezes have eliminated waste, fraud, and abuse and made the federal government leaner and more effective.",
  status: "contested" as const,
  category: "policy" as const,
  // ── The opening: the fact under the title, then what rides on it ──
  keystone_fact: {
    statement:
      "The temporary DOGE organization ended on 4 July 2026, its website claiming $215 billion in savings. In August the Government Accountability Office checked the $110 billion listed for cancelled contracts, grants and leases and found some of the estimates incorrect or unsupported; one $1.7 billion 'saving' was a contract that was never cancelled. The fight is over whether the cuts left a leaner government or a weaker one.",
    confidence: 90,
    source:
      "Nextgov/FCW, 'As DOGE formally sunsets, its public record is still evolving' (2 July 2026); U.S. GAO, 'DOGE Wall of Receipts: More Transparency Needed on How Savings Are Derived from Contract, Grant, and Lease Terminations' (GAO-26-108615, 6 August 2026)",
    sourceUrl: "https://www.gao.gov/products/gao-26-108615",
  },
  simple_case: [
    "The answer bears on how future presidents cut the government, on waits at Social Security and the VA, and on what a president may do without Congress.",
  ],
  pillars: [
    // =========================================================================
    // PILLAR 1: Claimed vs. Verified Savings
    // =========================================================================
    {
      id: "claimed-vs-verified-savings",
      title: "Claimed vs. Verified Savings",
      short_summary:
        "DOGE's 'Wall of Receipts' claimed $215 billion when the organization ended in July 2026. Reporters who checked it found the same contracts counted twice and an $8 million contract listed as $8 billion, and in August 2026 the GAO found some of its $110 billion in contract, grant and lease savings incorrect or unsupported. Supporters answer that federal fraud alone costs $233-521 billion a year, and that an imperfect public ledger beats none. Whether savings outrun the revenue lost by cutting IRS auditors is the open question.",
      icon_name: "Scale" as const,
      skeptic_premise:
        "DOGE's savings claims are largely fictional. Its public ledger has been repeatedly caught in basic arithmetic errors: an ICE contract listed at $8 billion was actually $8 million, an SSA contract listed at $232 million was actually about $560,000, and a single USAID contract was triple-counted for up to $655 million. When NPR reviewed the receipts in February 2025, only about $2 billion was verifiable against the roughly $55 billion DOGE claimed at the time; by late April NPR could account for just $63 billion of about $160 billion claimed, and the headline grew to $175 billion by late May 2025 and $215 billion by the time DOGE sunset in July 2026. An August 2026 GAO review of the $110 billion DOGE claimed from contracts, grants and leases found some estimates incorrect or unsupported, could not verify the method behind 96 percent of the grant savings, found a $1.7 billion Defense Health Agency contract counted as savings although no action was taken to terminate it, and found 108 of 264 'terminated' leases had been in the process of ending before DOGE existed. Meanwhile, the Yale Budget Lab projects that DOGE-era IRS staffing cuts and the funding clawback together forgo roughly $861 billion in tax revenue over 2026-2035 — meaning DOGE may be losing far more money than it saves.",
      proponent_rebuttal:
        "Early ledger errors are real but reflect the speed of a startup-style operation, not the absence of waste. GAO's own 2024 estimate puts direct annual federal losses to fraud at $233-521 billion (FY2018-2022 data), an enormous pool of genuine inefficiency that prior administrations never seriously attacked. DOGE forced a culture of scrutiny on contracts that had renewed automatically for decades, and even conservative verified figures represent billions returned to taxpayers. The ledger was corrected as discrepancies surfaced, and even GAO's critical 2026 review said a public ledger like the Wall of Receipts \"can have significant value\" — transparency about errors is a feature, not proof the savings are imaginary.",
      crux: {
        id: "savings-reconciliation-audit",
        title: "The Savings Reconciliation Audit",
        question:
          "How much of DOGE's claimed savings survives a line-by-line reconciliation?",
        description:
          "The central empirical question is whether DOGE's claimed savings survive line-by-line reconciliation against actual contract values, obligations, and outlays. If the verified total is a small fraction of the claimed total — and if revenue losses from IRS and other cuts exceed verified savings — then the 'efficiency' claim fails on its own accounting terms.",
        methodology:
          "Take DOGE's published 'Wall of Receipts' and match each line item against the authoritative contract record in USASpending.gov and FPDS, distinguishing ceiling value from obligated funds from money actually saved. Net the verified savings against documented revenue losses (e.g., the Yale Budget Lab IRS projection) and the cost of rehiring essential staff. A net-savings figure can be produced from entirely public federal procurement data.",
        verification_status: "verified" as const,
        settle: {
          condition:
            "Each item on the 'Wall of Receipts' matched to USASpending.gov and FPDS, separating ceiling value, obligated funds and money actually saved, then netted against IRS revenue losses and the cost of rehiring essential staff.",
        },
        cost_to_verify:
          "$0 (USASpending.gov, FPDS, and GAO fraud-loss and improper-payment data are publicly available)",
        falsification: {
          supporter_flip:
            "If matching every line of the 'Wall of Receipts' against USASpending.gov and FPDS left verified savings a small fraction of the claimed total, and revenue lost through IRS cuts exceeded that figure, the claim that DOGE made government leaner would fail on its own accounting terms.",
          skeptic_flip:
            "If a line-by-line reconciliation netted real savings above revenue losses, drawing on the large pool GAO describes at $233-521 billion a year in federal fraud losses, calling the savings fictional would be hard to hold.",
          common_ground:
            "Both sides agree DOGE's ledger contained real errors — an ICE contract listed at $8 billion was actually $8 million — and that only part of the claimed total has been independently verified.",
          live_disagreement:
            "How much of the $215 billion DOGE last claimed survives reconciliation against contract records, and whether that net figure stays positive once revenue lost through weakened IRS enforcement is subtracted.",
        },
      },
      evidence: [
        {
          id: "wall-of-receipts-errors",
          title: "DOGE's ledger listed an $8 million ICE contract as $8 billion and triple-counted a USAID deal (2025)",
          description:
            "DOGE's public savings ledger had to be repeatedly edited after fact-checkers found systematic errors: an ICE contract listed at $8 billion was actually $8 million (a 1,000x overstatement), an SSA contract listed at $232 million yielded only about $560,000 in real savings, and a single USAID contract was triple-counted for up to $655 million (later revised to roughly $18 million). The errors consistently ran in the direction of overstating savings.",
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
          title: "NPR could verify about $2 billion of the $55 billion DOGE claimed in February 2025",
          description:
            "When NPR reviewed DOGE's receipts in February 2025, only about $2 billion was verifiable against the roughly $55 billion DOGE claimed at that point; by late April NPR could account for just $63 billion of about $160 billion claimed, and the headline grew to $175 billion by late May 2025. Much of the claimed savings reflected contract ceiling values (maximum possible spend) rather than money actually obligated or recovered, and over half of touted contracts had not actually been terminated.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 9,
          },
          source: "NPR (analysis of FPDS/USASpending procurement data); CNN (savings scorecard)",
          sourceUrl: "https://www.npr.org/2025/02/19/nx-s1-5302705/doge-overstates-savings-federal-contracts",
          reasoning:
            "Independent newsroom reconciliation against the federal procurement record is the closest available proxy for an audit. The persistent gap between documented savings and the headline claim — CNN found less than half of the $175B backed by even basic documentation — is the core of the savings dispute.",
        },
        {
          id: "gao-wall-of-receipts-2026",
          title: "GAO 2026: some of DOGE's $110 billion in contract, grant and lease savings incorrect or unsupported; a $1.7 billion 'saving' was never cancelled",
          description:
            "Reviewing the $110 billion the Wall of Receipts reported as of 7 July 2026 for cancelled contracts, grants and leases, the Government Accountability Office found that 'some savings estimates are incorrect or lack supporting evidence.' DOGE did not use its stated method for most contract savings it reported as terminated, and 'did not provide sufficient information to verify the method used to calculate 96 percent of DOGE-reported savings' on grants. It reported $1.7 billion saved on a Defense Health Agency IT contract although 'no action was taken to terminate the contract, or to reduce scope, value, or funding'; GAO concluded no savings were achieved. Of 264 leases listed for termination, 108, worth about $15.3 million of the $53.5 million in lease savings, were already being terminated before DOGE was set up. GAO recommended that known data problems be 'prominently displayed' on the site; the U.S. DOGE Service did not comment.",
          side: "against" as const,
          weight: {
            sourceReliability: 10,
            independence: 9,
            replicability: 8,
            directness: 8,
          },
          source: "U.S. GAO, 'DOGE Wall of Receipts: More Transparency Needed on How Savings Are Derived from Contract, Grant, and Lease Terminations' (GAO-26-108615, 6 August 2026)",
          sourceUrl: "https://www.gao.gov/products/gao-26-108615",
          reasoning:
            "Congress's nonpartisan auditor checked the ledger against agency records, the closest thing to the reconciliation this crux asks for. GAO found some figures wrong or unsupported, not all of them, and it did not compute a corrected total, so it shows the headline is overstated without saying by how much; directness is 8.",
        },
        {
          id: "gao-improper-payments",
          title: "GAO estimates the federal government loses $233-521 billion a year to fraud (2024)",
          description:
            "The Government Accountability Office's April 2024 report (GAO-24-105833) estimated direct annual federal losses to fraud at $233-521 billion based on FY2018-2022 data — about 3-7% of average federal obligations and a genuinely large pool of waste. GAO is explicit, however, that this is a modeled estimate spanning different risk environments, and that confirmed fraud is only part of broader 'improper payments'; the figure cannot be read as money DOGE actually identified or recovered.",
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
            "GAO is an authoritative nonpartisan source and the fraud-loss estimate establishes that real waste exists, supporting the proponent case. But its directness is limited: a modeled estimate of fraud exposure is not the same as savings DOGE actually identified or recovered.",
        },
        {
          id: "irs-foregone-revenue",
          title: "Yale Budget Lab: a weakened IRS forgoes about $861 billion in revenue over 2026-2035",
          description:
            "By March 2025 the IRS had lost 31% of its revenue agents — about 3,600 auditors — through firings and the deferred resignation offer, per a May 2025 TIGTA report. In April 2026 the Yale Budget Lab estimated that the weakened enforcement capacity would forgo about $861 billion in federal revenue over 2026-2035: about $598 billion from the 2025 staffing reductions plus about $263 billion from the $20 billion IRS funding clawback. If accurate, the revenue lost dwarfs DOGE's verified savings, inverting the efficiency claim.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 7,
            replicability: 7,
            directness: 8,
          },
          source: "Yale Budget Lab, \"A Weakened IRS Has Substantial Consequences\" (Apr 2026); TIGTA via CBS News (May 2025)",
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
        "The cuts took staff from Social Security, the VA, the IRS, the FAA, the Weather Service and the CDC. Phone waits and backlogs grew, and agencies rehired some of the nuclear-stockpile, bird-flu and weather staff they had fired. Critics say the cuts ran ahead of any map of what mattered; supporters say the system corrected itself, and that Social Security's phone waits recovered within the year.",
      icon_name: "AlertTriangle" as const,
      skeptic_premise:
        "DOGE cut faster than anyone could know what was essential, and the public paid for it. Social Security lost about 7,500 staff in a year, callers waited up to two or three hours in spring 2025, and by December 2025 more than 12 million field-office transactions and 6 million processing-center transactions were pending; Senate Democrats report new-patient VA mental-health waits averaging 35 days (54 in Maryland) after the VA lost more than 40,000 employees; the FAA cut 130+ roles supporting air traffic controllers amid rising safety incidents. The 'fire fast, rehire what's load-bearing' approach assumes a legibility the government doesn't have — proven by the reversals once agencies discovered what was essential: most of the 300-plus nuclear-stockpile staff fired at NNSA were being rehired within five days, USDA's bird-flu responders were quickly brought back, and the National Weather Service, after losing more than 550 staff, was cleared to hire 450 in August 2025 as the deadly Texas floods put its vacancies under scrutiny.",
      proponent_rebuttal:
        "The reversals are evidence the system self-corrects, not that it is broken. Of the roughly 317,000 employees who left in 2025, OPM counts only about 24,000 involuntary separations, and the best-known mistakes, such as the NNSA firings, were reversed within days — far better than the status quo of never testing whether a position is necessary at all. Many disruptions are transitional growing pains of any large restructuring, and several headline cuts (NPS, NIH indirect-cost caps) were checked by Congress and the courts before causing lasting harm. The alternative — leaving an admittedly bloated workforce untouched because some unknown fraction is essential — is exactly the inertia DOGE was created to break.",
      crux: {
        id: "transitional-vs-permanent-degradation",
        title: "Transitional Disruption vs. Permanent Capacity Loss",
        question:
          "Is the drop in federal service quality a temporary cost of restructuring, or a lasting loss?",
        description:
          "Both sides agree service metrics worsened after the cuts. The crux is whether the degradation is transitional (a temporary cost of restructuring that normalizes) or structural (a permanent loss of capacity that a future administration will struggle to rebuild). The rehiring pattern is the key test: it can be read as healthy self-correction or as proof the cutter could not identify what was load-bearing.",
        methodology:
          "Track agency service-delivery metrics — SSA phone wait times and backlog counts, VA mental-health wait times, IRS processing times, FAA safety-incident rates — month over month from the pre-cut baseline through 24+ months post-cut. Compare the trajectory against the count and timing of essential-worker rehires. Persistent or worsening metrics indicate structural loss; recovery to baseline indicates transitional disruption.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "SSA phone waits, VA mental-health waits, IRS processing times and FAA safety-incident rates tracked monthly from the pre-cut baseline through 24 or more months after, set against the count and timing of rehires.",
        },
        cost_to_verify:
          "$100K-500K (Longitudinal reconciliation of agency performance data; most underlying metrics are public via Performance.gov and agency reports, but multi-year tracking and causal attribution require dedicated analysis)",
        falsification: {
          supporter_flip:
            "If SSA phone waits, VA mental-health waits, IRS processing times and FAA safety-incident rates stayed worse than their pre-cut baselines 24 or more months after the cuts, the disruption would read as a lasting loss of capacity rather than the growing pains of a restructuring.",
          skeptic_flip:
            "If service metrics returned to their pre-cut baselines, and the reversals stayed a small correction against roughly 317,000 departures in 2025 (most of them voluntary by OPM's count) with courts and Congress checking the deepest cuts, the disruption would look temporary.",
          common_ground:
            "Both sides agree service metrics worsened after the cuts, and that some fired workers, from nuclear-weapons to weather staff, had to be brought back once agencies found them essential.",
          live_disagreement:
            "Whether the rehiring shows a system correcting itself or cuts made before anyone knew what was load-bearing — and so whether the damage is a transitional cost or a permanent loss of capacity.",
        },
      },
      evidence: [
        {
          id: "essential-rehires",
          title: "Agencies had to rehire fired nuclear-stockpile, bird-flu and weather staff (2025)",
          description:
            "Several early-2025 firings were reversed once agencies found the work essential. More than 300 National Nuclear Security Administration employees, who oversee the safety and security of the nuclear arsenal, were dismissed on Feb. 13, 2025; by Feb. 18 the vast majority were being rehired. USDA facilities responding to bird flu were told a quarter of their staff were being laid off, and those workers were quickly rehired. By June 2025 the administration was scrambling to rehire many employees dismissed under DOGE's staff-slashing after wiping out entire offices, in some cases imperiling weather forecasting and drug approvals. In August 2025 the National Weather Service, whose staffing had fallen by more than 550, received permission to hire 450 meteorologists, hydrologists and radar technicians, after its vacancies drew scrutiny in the wake of the deadly July 2025 Texas floods.",
          side: "against" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 8,
            directness: 8,
          },
          source: "Brookings Institution (Elaine Kamarck, Feb 2025); Washington Post (Jun 2025); CNN (Aug 2025)",
          sourceUrl: "https://www.brookings.edu/articles/the-fallout-from-doges-approach-to-government-reform/",
          reasoning:
            "The rehiring of nuclear-stockpile and bird-flu staff demonstrates that cuts ran ahead of any reliable assessment of what was essential. This is the strongest single illustration that 'fire fast, rehire what's load-bearing' assumes legibility the organization lacked.",
        },
        {
          id: "ssa-service-collapse",
          title: "SSA Lost ~7,500 Staff as Phone Waits and Backlogs Grew",
          description:
            "The Social Security Administration's staff fell by roughly 7,500 (13%) from January 2025 to January 2026, its largest one-year drop on record. In spring 2025 callers reported waiting up to two or three hours on the 800 number, and SSA's inspector general found average total phone waits ranged from 45 minutes to two hours in 2025. In December 2025 the Washington Post found more than 12 million transactions unprocessed in field offices and 6 million more pending in processing centers. SSA counters that its 'average speed of answer' fell from 27.9 minutes in FY2024 to 15.9 in FY2025 after it moved staff to the phones, though that metric counts a caller who immediately requests a callback as waiting zero minutes.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 7,
            directness: 8,
          },
          source: "Center on Budget and Policy Priorities (Romig & O'Connor, Mar 2026), citing OPM data, SSA's inspector general and the Washington Post; Nextgov/FCW (Dec 2025)",
          sourceUrl: "https://www.cbpp.org/sites/default/files/3-23-26socsec.pdf",
          reasoning:
            "SSA serves nearly every American household, making its service metrics a direct and high-salience measure of disruption. The backlog figures are concrete and tied to a specific staffing reduction, though attributing the full effect to DOGE alone requires controlling for pre-existing trends.",
        },
        {
          id: "va-workforce-cuts",
          title: "VA Lost 40,000+ Employees; Democrats Report 35-Day Mental-Health Waits",
          description:
            "A January 2026 report by the Democrats on the Senate Veterans' Affairs Committee found the Department of Veterans Affairs lost more than 40,000 employees in FY2025, 88% of them from the Veterans Health Administration, including 3,000 registered nurses and 1,000 physicians; the net loss was closer to Secretary Doug Collins' goal of shedding 30,000. The report put the average wait for a new-patient mental-health appointment at 35 days, above 40 days in more than a dozen states and 54 days in Maryland. The VA disputes the findings: it says it met its 30,000 reduction goal but did not lose 40,000, and that new-patient mental-health waits through FY2025 averaged 19 days.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 5,
            replicability: 7,
            directness: 8,
          },
          source: "Senate Veterans' Affairs Committee minority report (Jan 2026), via Government Executive and Military Times; VA response via Federal News Network",
          sourceUrl: "https://www.govexec.com/workforce/2026/01/va-has-shed-40000-employees-democratic-report-finds-drastic-impacts-veterans/410864/",
          reasoning:
            "The clinical-staff losses and wait-time data are concrete and directly relevant to service quality. The headline report is from the committee minority, the trade press relays it rather than checking it independently, and the VA disputes both the headcount and the wait figures, so independence is low. Much of the reduction came through attrition and incentives rather than firings, which complicates attributing it to DOGE specifically.",
        },
        {
          id: "congress-court-checks",
          title: "Congress and courts blocked the deepest cuts at the Park Service and NIH (2026)",
          description:
            "Several of the administration's most aggressive cuts were checked before causing lasting damage. Congress rejected its FY2026 request to cut the National Park Service by more than $1 billion, including a $900 million cut (more than 31%) to park operations; the Interior spending bill passed on Jan. 19, 2026 and signed into law flat-funds park operations. On Jan. 5, 2026 the First Circuit upheld the block on NIH's 15% cap on 'indirect cost' research payments, finding it violated a statute and regulations, and the administration let its April 6 deadline to seek Supreme Court review pass, ending the fight over the cap. Proponents argue this shows the system contained the excesses while preserving genuine reform.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 7,
            directness: 6,
          },
          source: "National Parks Conservation Association (FY26 NPS budget explainer); Deseret News via KSL (Jan 2026); The Hill (Jan 2026); STAT via Boston Globe (Apr 2026)",
          sourceUrl: "https://www.bostonglobe.com/2026/04/09/business/trump-court-nih-research-overhead-costs/",
          reasoning:
            "Read against the claim that DOGE cut waste, this counts against it: Congress and the courts rejected the deepest cuts as unlawful or unwanted rather than as savings worth keeping. Proponents read the same record the other way, as proof that institutional checks contained any harm, which is why directness to the efficiency claim is only moderate.",
        },
        {
          id: "ssa-oig-phone-recovery",
          title: "SSA Says Its Inspector General Confirmed Phone Service Improved in FY2025",
          description:
            "On 22 December 2025 the Social Security Administration said an audit by its inspector general found that 'SSA's publicly reported national 800-number telephone metrics were accurate' and that 'overall telephone service performance improved in FY 2025', 'reducing the average wait time from 30 minutes in January 2025 to 7 minutes in September 2025' while serving 65 percent more callers than the year before. SSA also reported the backlog of pending initial disability claims down 33% from its all-time high of 1.26 million in June 2024. The same audit, Nextgov/FCW reported, found that the metric counts callers who immediately request a callback as waiting zero minutes; those callers waited an average of one hour and 51 minutes to be called back.",
          side: "for" as const,
          weight: {
            sourceReliability: 6,
            independence: 5,
            replicability: 6,
            directness: 7,
          },
          source:
            "Social Security Administration press release, 'Inspector General Report Confirms Significant Customer Service Improvements at Social Security' (22 Dec 2025), on SSA OIG audit 032517; Nextgov/FCW (Natalie Alms, 22 Dec 2025)",
          sourceUrl: "https://content.govdelivery.com/accounts/USSSA/bulletins/4010bfd",
          reasoning:
            "This is the transitional reading's best case: on the agency that lost about 7,500 staff, the phone metric worsened early in 2025 and recovered within the year, and the inspector general rather than the agency vouched for the numbers. It is weighted down because the summary is SSA's own, the headline wait leaves out the long callback waits, the disability backlog is measured from a peak that predates DOGE, and phone service is one channel; the field-office and processing backlogs on the other card are not covered.",
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
        "A federal court found OPM's mass firings of probationary staff unlawful, and in March 2026 an appeals court largely upheld a block on the administration's freeze of funds to states. In June 2026 the Supreme Court, in Trump v. Slaughter, overruled Humphrey's Executor and widened the President's power to remove agency officials. Whether a president may also refuse to spend money Congress appropriated, which the Impoundment Control Act of 1974 and Train v. City of New York forbid, is still being fought in court.",
      icon_name: "Gavel" as const,
      skeptic_premise:
        "DOGE's methods collided with the Constitution's separation of powers. In September 2025, Judge Alsup granted summary judgment finding OPM's mass-termination orders unlawful and ordering personnel files corrected. The Impoundment Control Act of 1974 and the unanimous Supreme Court ruling in Train v. City of New York (1975) hold that the executive cannot unilaterally refuse to spend funds Congress appropriated — and in March 2026 the First Circuit largely affirmed a block on the administration's funds freeze. Reviving Schedule F as 'Schedule Policy/Career' to reclassify up to 50,000 positions as at-will treats Article I's power of the purse as optional, and the removal ruling in Trump v. Slaughter does not touch the appropriations question, which is where the impoundment cases are still being lost.",
      proponent_rebuttal:
        "The President has broad constitutional authority over the executive branch, and the courts are split, not settled. In July 2025 the Supreme Court, on its emergency docket, granted the administration broad authority to reshape and shrink the federal workforce, partially reversing lower-court relief. The unitary-executive theory holds that Article II vests all executive power in the President, including the power to remove subordinates and manage spending priorities — and on 29 June 2026 the Supreme Court adopted the removal half of that argument in Trump v. Slaughter, overruling Humphrey's Executor. Where DOGE overstepped, courts corrected it; that is the system working, not a constitutional crisis.",
      crux: {
        id: "impoundment-removal-authority",
        title: "The Impoundment & Removal Authority Test",
        question:
          "Can a president refuse to spend appropriated funds and fire officials Congress protected?",
        description:
          "The decisive legal question is whether the unitary-executive theory reaches Article I's appropriations power — i.e., whether a President may decline to spend appropriated funds and fire officials Congress insulated from removal. Unlike the empirical cruxes, this is partly a normative legal commitment, but it has concrete arbiters: the binding force of Train v. City of New York and the Impoundment Control Act on the spending side, and, on the removal side, Trump v. Slaughter, decided in June 2026.",
        methodology:
          "Track the controlling precedents to resolution: (1) on spending, whether appellate courts continue to enforce Train and the Impoundment Control Act against the funds freeze; (2) on removal, the Supreme Court's June 2026 decision in Trump v. Slaughter, which overruled Humphrey's Executor, and how far lower courts read it to reach officials and functions beyond the FTC. The outcome of these cases, not opinion, settles the boundary of executive authority.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "Appellate rulings on the funds freeze under Train v. City of New York and the Impoundment Control Act; the removal half was settled in June 2026 when Trump v. Slaughter overruled Humphrey's Executor.",
        },
        cost_to_verify:
          "$0 to observe (court records are public), but resolution depends on pending Supreme Court rulings, not analysis — the core question is a contested legal commitment awaiting adjudication",
        falsification: {
          supporter_flip:
            "If appellate courts keep enforcing Train v. City of New York and the Impoundment Control Act against the funds freeze, and courts read Trump v. Slaughter narrowly as an FTC-specific removal holding, the legal footing for DOGE's spending methods would largely give way.",
          skeptic_flip:
            "If the Supreme Court's July 2025 emergency-docket grant of broad authority to reshape the federal workforce were confirmed in full briefing, and the reasoning of Trump v. Slaughter were extended from removal to the spending side, the removals and spending methods would rest on firmer legal ground and the crisis framing would weaken.",
          common_ground:
            "Both sides agree the courts are the arbiter and have ruled both ways: lower courts found OPM's mass firings unlawful and blocked the funds freeze, while the Supreme Court granted broad authority to shrink the workforce.",
          live_disagreement:
            "Whether the President's Article II power reaches Congress's power of the purse — which turns on Train and the Impoundment Control Act, now that Trump v. Slaughter has resolved the removal side.",
        },
      },
      evidence: [
        {
          id: "alsup-opm-ruling",
          title: "Federal Court Found OPM's Mass-Termination Orders Unlawful (Sept 2025)",
          description:
            "On September 12, 2025, Judge William Alsup of the Northern District of California granted summary judgment to the unions and nonprofits led by the American Federation of Government Employees, finding that OPM \"exceeded its own powers\" and unlawfully directed agencies to fire probationary employees en masse: \"OPM decided who to fire.\" He declined to order reinstatement, citing the Supreme Court's emergency-docket rulings, but directed most agencies to update personnel files by Nov. 14 to state that the employees were not fired for performance or conduct.",
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
          title: "First Circuit Largely Affirmed Block on Funds Freeze (March 2026)",
          description:
            "On March 16, 2026, in New York v. Trump, the First Circuit largely affirmed a Rhode Island district court's preliminary injunction against the administration's categorical freeze of federal funding to states. It held the states were likely to succeed on their Administrative Procedure Act claims that the freeze was arbitrary and capricious, and that rescinding the OMB memo had not ended it, but vacated a limited part of the order requiring payment of certain grant and contract funds, which may belong in the Court of Federal Claims. The wider dispute turns on the Impoundment Control Act of 1974 and Train v. City of New York (1975), in which the Supreme Court unanimously rejected President Nixon's withholding of appropriated environmental funds.",
          side: "against" as const,
          weight: {
            sourceReliability: 9,
            independence: 8,
            replicability: 8,
            directness: 7,
          },
          source: "Civil Rights Litigation Clearinghouse (case summary); Bloomberg Government (Mar 16, 2026); New York Attorney General; Constitutional Accountability Center",
          sourceUrl: "https://clearinghouse.net/case/45976/",
          reasoning:
            "An appellate ruling against the freeze is strong evidence that the administration's categorical refusal to release funds was unlawful. Its reach is narrower than the impoundment question: it came at the preliminary-injunction stage and rested on the APA rather than the Impoundment Control Act, so the constitutional spending question remains open.",
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
          title: "Trump v. Slaughter overruled Humphrey's Executor (June 2026)",
          description:
            "On 29 June 2026 the Supreme Court decided Trump v. Slaughter, 6-3, in an opinion by Chief Justice Roberts, holding that the statutory for-cause protection against removal of Federal Trade Commission members violates the separation of powers and overruling Humphrey's Executor (1935). Justice Sotomayor dissented, joined by Justices Kagan and Jackson. The removal of Commissioner Slaughter stands, and the ruling expands presidential removal power over independent agencies, the theory underpinning DOGE.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 8,
            replicability: 7,
            directness: 7,
          },
          source: "Trump v. Slaughter, No. 25-332 (U.S. June 29, 2026)",
          sourceUrl: "https://www.scotusblog.com/cases/case-files/trump-v-slaughter-2/",
          reasoning:
            "A merits decision of the Supreme Court is as authoritative as this evidence gets, and it removes the precedent the other side had relied on for independent-agency removals. Its reach is narrower than the DOGE question: it concerns who may be removed, not whether appropriated funds may go unspent, and the impoundment litigation is unaffected by it.",
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
        "DOGE cut people, not process — destroying capacity the 2030s will require. As Jen Pahlka put it, DOGE 'cut the workforce without cutting the work.' Public-administration scholar Donald Kettl warns of an unprecedented disinvestment in federal capacity that a future president will find extremely difficult to reverse. The bellwethers are stark: the CDC's Epidemic Intelligence Service disease detectives were swept into layoffs twice in 2025 before being spared, and the National Weather Service lost more than 550 staff before being cleared to hire 450 — exactly the surveillance and forecasting capacity needed for pandemics, climate adaptation, and AI-era governance.",
      proponent_rebuttal:
        "The diagnosis that the civil service is structurally broken is shared even by reform-minded critics, and that justifies aggressive action. The federal government fires employees at roughly one-quarter the rate of the private sector for procedural reasons, and 99.8% of federal employees receive positive performance reviews — a figure no serious observer believes reflects reality. Past 'reinventing government' efforts failed precisely because they respected every procedure. DOGE's bet is that breaking the inertia is worth the disruption, and that emerging tools — including AI-driven enforcement at the IRS — can substitute for some of the lost headcount rather than requiring it to be rebuilt one-for-one.",
      crux: {
        id: "process-reform-vs-headcount-cut",
        title: "Process Reform vs. Headcount Cut",
        question:
          "Did DOGE change the dysfunctional personnel process, or only reduce headcount?",
        description:
          "Both reformers and DOGE agree the underlying personnel process is dysfunctional. The crux is whether DOGE changed the dysfunctional process or merely removed the people while leaving the process intact. If the broken procedures remain and only headcount fell, the result is reduced capacity to perform the same unproductive work — the opposite of efficiency. If procedures were genuinely streamlined, the smaller workforce can do more.",
        methodology:
          "Audit the actual procedural changes versus headcount changes: catalog which civil-service rules, approval chains, and procurement procedures were eliminated or simplified (regulatory text, OPM rules), and measure output-per-employee and cycle times before and after. Compare against the workforce-reduction figures. If procedures are unchanged while headcount fell, the 'reform' claim fails; if cycle times improved alongside cuts, it holds.",
        verification_status: "theoretical" as const,
        settle: {
          condition:
            "An audit of which civil-service rules, approval chains and procurement procedures were removed or simplified, with output per employee and cycle times measured before and after the cuts and set against headcount figures.",
        },
        cost_to_verify:
          "$500K-1M (Cross-agency productivity and process audit requiring output metrics, procedural inventories, and controls for confounding factors)",
        falsification: {
          supporter_flip:
            "If an audit found civil-service rules, approval chains and procurement procedures largely unchanged while headcount fell, the smaller workforce would be doing the same unproductive work with less capacity, and the reform claim would fail.",
          skeptic_flip:
            "If cycle times and output per employee improved after the cuts, where earlier 'reinventing government' efforts that respected every procedure did not, the changes would look like reform rather than a headcount cut.",
          common_ground:
            "Both sides agree the federal personnel process is broken: about 99.8% of employees get positive reviews, and the government fires at roughly one-quarter the private-sector rate for procedural reasons.",
          live_disagreement:
            "Whether DOGE streamlined the procedures that make government slow or removed people while leaving those procedures in place — and whether the capacity it cut, from disease detectives to storm forecasters, will be needed for the challenges ahead.",
        },
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
          title: "Pahlka: DOGE Cut the Workforce Without Cutting the Work",
          description:
            "Jen Pahlka, author of Recoding America and a veteran of government-process reform, wrote in June 2025 that DOGE 'cut the workforce without cutting the work' and that 'cutting jobs without cutting the work isn't efficiency, it's just chaos.' She noted that staff were cut while low-value processes such as Paperwork Reduction Act compliance were left intact, 'so those left can't choose the most important work,' and that sustainable change 'comes from changing rules and procedures, not just ignoring them.' Because Pahlka has spent her career attacking proceduralism, the critique cannot be dismissed as reflexive defense of the status quo.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 5,
            directness: 8,
          },
          source: "Jennifer Pahlka, \"What DOGE didn't do,\" Eating Policy, June 4, 2025",
          sourceUrl: "https://www.eatingpolicy.com/p/what-doge-didnt-do",
          reasoning:
            "Pahlka is a load-bearing cross-camp voice: a process-reform advocate, not a defender of bureaucracy, which makes her claim that DOGE cut people without fixing process especially credible. Replicability is lower because it is expert judgment rather than a quantified metric.",
        },
        {
          id: "kettl-disinvestment",
          title: "Kettl: 'We've never, ever seen' a disinvestment in federal capacity like this; workforce down 9% (2025-26)",
          description:
            "Donald Kettl, former dean of the University of Maryland School of Public Policy, told CNN in March 2025, \"We've never, ever seen anything that has amounted to a disinvestment in federal capacity like this,\" and said a future president committed to restoring that capacity would find it extremely difficult: \"A lot of what the federal government does is by definition large and complex.\" By February 2026 he counted a 9% cut to the federal civilian workforce (209,775 employees), while noting the workforce is now about the size it was in 1994 and 1973.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 6,
            replicability: 5,
            directness: 7,
          },
          source: "Donald Kettl via CNN (Ronald Brownstein, Mar 20, 2025); Kettl in Government Executive (Feb 5, 2026)",
          sourceUrl: "https://www.cnn.com/2025/03/20/politics/trump-musk-federal-government-reagan",
          reasoning:
            "This is an expert assessment from a leading public-administration scholar, lending authority to the structural-loss reading. It is a forward-looking judgment rather than a measured outcome, which limits replicability and independence.",
        },
        {
          id: "cdc-eis-noaa-bellwethers",
          title: "CDC disease detectives got layoff notices in October 2025 and were reinstated a day later; the Weather Service lost over 550 staff",
          description:
            "In February 2025 the CDC moved to cut about 1,300 probationary staff, roughly 10% of its workforce; all first-year Epidemic Intelligence Service officers, the 'disease detectives' central to outbreak response, were reported among them, though the CDC said days later that EIS officers were not among those terminated. In October 2025 more than 1,300 CDC staff received layoff notices during the shutdown; about 700, including EIS officers, were reinstated within a day after HHS blamed a 'glitch in the system.' The National Weather Service lost more than 550 staff, falling below 4,000 employees, before being cleared in August 2025 to hire 450. Critics cite these as the bellwethers for capacity the 2030s will need most: pandemic surveillance, climate adaptation, and forecasting. Proponents counter that the reversals show the core was protected, and that AI and modernization can substitute for some lost headcount.",
          side: "against" as const,
          weight: {
            sourceReliability: 7,
            independence: 7,
            replicability: 6,
            directness: 6,
          },
          source: "Medical Economics (Feb 2025); Healio (Oct 2025); CNN (Aug 2025)",
          sourceUrl: "https://www.healio.com/news/infectious-disease/20251015/cdc-staffers-fired-due-to-glitch-are-reinstated",
          reasoning:
            "The repeated threat to disease-surveillance and weather-forecasting staff is concrete and directly relevant to the forward-looking capacity crux, though the EIS cuts were reversed and the Weather Service had to be cleared to hire back, which cuts both ways. Whether these losses prove decisive depends on future events (a pandemic, extreme-weather season), which tempers replicability.",
        },
        {
          id: "opm-appraisal-rule-2026",
          title: "OPM Rewrote the Federal Performance-Appraisal Rules, Not Just Headcount (2026)",
          description:
            "A final rule from the Office of Personnel Management, published on 7 July 2026, changes the appraisal process for General Schedule and prevailing-rate employees rather than their number. In OPM's words it 'eliminates unnecessary summary level patterns; removes the prohibition of a forced, or standardized, distribution of performance rating levels; eliminates mandatory review of Level 1 ratings; removes the option to grieve a rating of record; requires a supervisory critical element for all supervisors covered under this subpart'. Agencies must comply with the rating-distribution provisions from 1 January 2027. OPM says earlier non-regulatory efforts to curb rating inflation had not worked.",
          side: "for" as const,
          weight: {
            sourceReliability: 8,
            independence: 4,
            replicability: 5,
            directness: 5,
          },
          source:
            "Office of Personnel Management, 'Performance Appraisal for General Schedule, Prevailing Rate, and Certain Other Employees', final rule, RIN 3206-AP06, Federal Register document 2026-13715 (7 July 2026)",
          sourceUrl: "https://public-inspection.federalregister.gov/2026-13715.pdf",
          reasoning:
            "Evidence that the administration changed a procedure this crux names, the appraisal system behind inflated ratings, and not only headcount. The rule's text is authoritative on what changed, but its account of why is OPM's own, so independence is 4. It is an OPM rule rather than DOGE's work, it takes full effect only in 2027, and nothing yet measures the cycle times or output per employee that would settle the crux, so directness is 5.",
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
    {
      title: "Trump v. Slaughter (No. 25-332), decided June 29, 2026 - SCOTUSblog case file",
      url: "https://www.scotusblog.com/cases/case-files/trump-v-slaughter-2/",
    },
    {
      title: "DOGE's \"wall of receipts\" riddled with inaccuracies and unsubstantiated claims, congressional watchdog says - CBS News (Aug 6, 2026)",
      url: "https://www.cbsnews.com/news/doge-wall-of-receipts-elon-musk-government-accountability-office/",
    },
    {
      title: "As DOGE formally sunsets, its public record is still evolving - Nextgov/FCW (Jul 2, 2026)",
      url: "https://www.nextgov.com/policy/2026/07/doge-formally-sunsets-its-public-record-still-evolving/414571/",
    },
    {
      title: "Trump Administration Personnel Policies Harming Social Security Customer Service, Risk Lasting Damage - CBPP (Mar 23, 2026)",
      url: "https://www.cbpp.org/sites/default/files/3-23-26socsec.pdf",
    },
    {
      title: "Trump's moves to hollow out government could be difficult to undo - CNN (Mar 20, 2025)",
      url: "https://www.cnn.com/2025/03/20/politics/trump-musk-federal-government-reagan",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "Did DOGE actually save money, or just claim it?",
      content:
        "DOGE's ledger grew to a claimed $215 billion in savings by the time it sunset in July 2026, but independent review documented only a fraction (about $2 billion verifiable in February 2025; less than half of the headline backed by basic documentation), after the receipts were caught inflating figures by up to 1,000x, and a 2026 GAO review found some of the $110 billion claimed from contracts, grants and leases incorrect or unsupported. Meanwhile, the Yale Budget Lab projects DOGE-era IRS staffing cuts plus the funding clawback together forgo roughly $861 billion in revenue over a decade. When verified savings are netted against revenue losses and the cost of rehiring essential staff, did DOGE leave the government better off financially — or worse?",
    },
    {
      id: "q2",
      title: "Was the disruption transitional, or a permanent loss of capacity?",
      content:
        "Service metrics worsened sharply after the cuts — SSA phone waits of up to two or three hours, a reported 35-day average wait for new VA mental-health patients, and fired nuclear-stockpile, bird-flu and weather staff brought back once agencies found them essential. Proponents call this transitional growing pain that the system self-corrects. Critics call it a durable disinvestment a future president cannot easily reverse. Which reading does the multi-year data support?",
    },
    {
      id: "q3",
      title: "Can the executive impound funds and fire at will?",
      content:
        "Train v. City of New York and the Impoundment Control Act say the President cannot refuse to spend appropriated funds, and a court found OPM's mass firings unlawful. The unitary-executive theory — and the Supreme Court's June 2026 ruling in Trump v. Slaughter, which overruled Humphrey's Executor — say presidential power over the executive branch is far broader. Is DOGE a lawful exercise of executive authority or a rebellion against Article I's power of the purse?",
    },
    {
      id: "q4",
      title: "Did DOGE reform the broken process, or just cut the people?",
      content:
        "Almost everyone agrees the civil service is dysfunctional: 99.8% positive performance reviews and firing rates a quarter of the private sector's. But reform advocate Jen Pahlka argues DOGE 'cut the workforce without cutting the work.' Did DOGE fix the broken procedures, or just remove the staff who carried them out — leaving a smaller government doing the same unproductive work?",
    },
  ],
};
