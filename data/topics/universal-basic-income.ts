import type { Topic } from "@/lib/schemas/topic";

export const universalBasicIncomeData = {
  id: "universal-basic-income",
  title: "Universal Basic Income",
  meta_claim:
    "Universal Basic Income (UBI) would be economically beneficial and should be implemented in developed nations.",
  status: "contested" as const,
  category: "policy" as const,
  pillars: [
    {
      id: "automation-displacement",
      title: "Automation and Job Displacement",
      short_summary:
        "AI and automation are eliminating jobs faster than the economy can create new ones.",
      image_url:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=60",
      icon_name: "Atom" as const,
      skeptic_premise:
        "Technology has always displaced jobs while creating new ones. The Luddite fallacy has been wrong for 200 years. Current unemployment remains low despite decades of automation predictions.",
      proponent_rebuttal:
        "AI is qualitatively different - it can perform cognitive tasks previously thought uniquely human. Self-driving vehicles alone could displace 3.5 million US truck drivers. Even if new jobs emerge, the transition period requires support, and not everyone can retrain for technical roles.",
      crux: {
        id: "employment-projections",
        title: "Net Employment Impact Analysis",
        description:
          "Comprehensive modeling of job destruction vs. job creation from AI/automation through 2040.",
        methodology:
          "Track task automation potential across all occupations. Model adoption curves, new job categories, and net employment effects by skill level.",
        equation:
          "\\Delta E = \\sum_{i} (J_{created,i} - J_{displaced,i}) \\cdot P(\\text{adoption}_i)",
        verification_status: "theoretical" as const,
        cost_to_verify: "$2M (Longitudinal economic study)",
      },
    },
    {
      id: "fiscal-feasibility",
      title: "Fiscal Feasibility",
      short_summary: "Can governments afford to provide meaningful UBI payments?",
      image_url:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60",
      icon_name: "Scale" as const,
      skeptic_premise:
        "A $1,000/month UBI for all US adults would cost $3.1 trillion annually - more than the entire federal discretionary budget. This would require massive tax increases or unsustainable deficits.",
      proponent_rebuttal:
        "UBI could replace existing welfare programs, reducing administrative costs. A negative income tax design phases out benefits gradually. Alaska's Permanent Fund Dividend has operated for 40+ years. Multiple pilot programs show economic stimulus effects that partially offset costs.",
      crux: {
        id: "pilot-program-results",
        title: "Randomized Controlled Trial Results",
        description:
          "Large-scale, long-term RCT measuring employment, health, and economic outcomes.",
        methodology:
          "Multi-year RCT with treatment and control groups. Measure labor force participation, health outcomes, entrepreneurship rates, and local economic multiplier effects.",
        equation:
          "\\text{ROI} = \\frac{\\Delta\\text{GDP} + \\Delta\\text{Health Savings} + \\Delta\\text{Crime Reduction}}{\\text{Program Cost}}",
        verification_status: "theoretical" as const,
        cost_to_verify: "$50M (Large-scale RCT)",
      },
    },
  ],
};
