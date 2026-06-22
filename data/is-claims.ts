// ============================================================================
// "Is [claim] true?" Landing Page Data
// ============================================================================
//
// Maps URL slugs to topic IDs, question text, and the central claim.
// Each entry generates a programmatic landing page at /is/[slug].

export interface IsClaim {
  /** URL-safe slug, e.g. "climate-change-real" → /is/climate-change-real */
  slug: string;
  /** The topic ID in data/topics (must match an existing topic.id) */
  topicId: string;
  /** The question rendered as the H1, e.g. "Is climate change real?" */
  question: string;
  /** The affirmative claim that the evidence is evaluated against */
  claim: string;
}

export const isClaims: IsClaim[] = [
  {
    slug: "climate-change-real",
    topicId: "climate-change",
    question: "Is climate change real?",
    claim:
      "Climate change is real and primarily caused by human activity",
  },
  {
    slug: "nuclear-energy-safe",
    topicId: "nuclear-energy-safety",
    question: "Is nuclear energy safe?",
    claim:
      "Nuclear energy is safe enough to scale as a climate solution",
  },
  {
    slug: "ai-dangerous",
    topicId: "ai-risk",
    question: "Is AI dangerous?",
    claim:
      "Artificial intelligence poses an existential risk to humanity",
  },
  {
    slug: "fluoride-safe",
    topicId: "fluoride-water-supplies",
    question: "Is fluoride in water safe?",
    claim: "Water fluoridation at recommended levels is safe",
  },
  {
    slug: "free-will-real",
    topicId: "free-will",
    question: "Is free will real?",
    claim: "Humans have genuine free will",
  },
  {
    slug: "gun-control-effective",
    topicId: "gun-control-effectiveness",
    question: "Is gun control effective?",
    claim:
      "Gun control policies effectively reduce gun violence",
  },
  {
    slug: "universal-healthcare-better",
    topicId: "universal-healthcare",
    question: "Is universal healthcare better?",
    claim:
      "Universal healthcare systems produce better outcomes than market-based systems",
  },
  {
    slug: "ubi-feasible",
    topicId: "universal-basic-income",
    question: "Is universal basic income feasible?",
    claim:
      "Universal basic income is economically feasible at scale",
  },
  {
    slug: "cryptocurrency-valuable",
    topicId: "cryptocurrency-value",
    question: "Is cryptocurrency actually valuable?",
    claim:
      "Cryptocurrencies have genuine, sustainable economic value",
  },
  {
    slug: "death-penalty-effective",
    topicId: "death-penalty-deterrence",
    question: "Is the death penalty effective?",
    claim:
      "The death penalty effectively deters serious crime",
  },
  // ── Breadth batch 1 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "rent-control-hurts-affordability",
    topicId: "rent-control-effectiveness",
    question: "Does rent control hurt housing affordability?",
    claim:
      "Rent control reduces housing affordability in the long run by discouraging new construction and shrinking supply.",
  },
  {
    slug: "vaccine-mandates-justified",
    topicId: "vaccine-mandates",
    question: "Are government vaccine mandates justified?",
    claim: "Government vaccine mandates are a justified public-health measure.",
  },
  {
    slug: "minimum-wage-helps-workers",
    topicId: "minimum-wage-effects",
    question: "Does raising the minimum wage help workers without causing job losses?",
    claim:
      "Raising the federal minimum wage to $15/hour or more would significantly benefit low-wage workers without causing substantial job losses.",
  },
  {
    slug: "drug-decriminalization-works",
    topicId: "drug-decriminalization",
    question: "Does drug decriminalization work?",
    claim:
      "Decriminalizing personal drug use, paired with treatment investment, can improve public health outcomes compared to criminalization.",
  },
  {
    slug: "seed-oils-harmful",
    topicId: "seed-oils-health",
    question: "Are seed oils harmful to your health?",
    claim:
      "Industrial seed oils (soybean, canola, sunflower) are a major driver of chronic inflammation, obesity, and metabolic disease.",
  },
  {
    slug: "ai-replace-white-collar-jobs",
    topicId: "ai-job-displacement",
    question: "Will AI replace most white-collar jobs?",
    claim:
      "AI and large language models will eliminate or fundamentally transform the majority of white-collar knowledge work within the next decade.",
  },
  {
    slug: "social-media-causes-teen-depression",
    topicId: "social-media-mental-health",
    question: "Is social media causing the teen mental health crisis?",
    claim:
      "Social media use is a primary cause of the teen mental health crisis that began around 2012.",
  },
  {
    slug: "student-debt-forgiveness-justified",
    topicId: "student-debt-forgiveness",
    question: "Is broad student debt forgiveness justified?",
    claim:
      "Broad student loan forgiveness is justified, economically beneficial, and a fair approach to the student debt crisis.",
  },
  {
    slug: "four-day-work-week-works",
    topicId: "four-day-work-week",
    question: "Does a four-day work week actually work?",
    claim:
      "A four-day work week with no reduction in pay leads to equal or higher productivity and improved worker wellbeing.",
  },
  {
    slug: "evs-better-than-gas-cars",
    topicId: "ev-environmental-impact",
    question: "Are electric vehicles better for the environment than gas cars?",
    claim:
      "Electric vehicles are significantly better for the environment than internal-combustion vehicles over their full lifecycle.",
  },
  {
    slug: "covid-lab-leak",
    topicId: "lab-leak-theory",
    question: "Did COVID-19 come from a lab leak?",
    claim:
      "SARS-CoV-2 originated from a laboratory leak at the Wuhan Institute of Virology rather than natural zoonotic spillover.",
  },
  {
    slug: "psychedelics-treat-depression",
    topicId: "psychedelics-mental-health",
    question: "Do psychedelics work for depression and PTSD?",
    claim:
      "Psilocybin and other psychedelics are effective treatments for depression, PTSD, and addiction.",
  },
  {
    slug: "ultra-processed-foods-cause-obesity",
    topicId: "ultra-processed-food",
    question: "Are ultra-processed foods driving the obesity epidemic?",
    claim:
      "Ultra-processed foods are a primary driver of the global obesity and chronic-disease epidemic.",
  },
  // ── Breadth batch 2 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "tiktok-ban-justified",
    topicId: "tiktok-ban",
    question: "Should TikTok be banned?",
    claim:
      "TikTok poses a genuine national-security threat through Chinese-government data access and algorithmic influence, justifying a ban or forced sale.",
  },
  {
    slug: "policing-needs-reform",
    topicId: "police-reform",
    question: "Does American policing need fundamental reform?",
    claim:
      "American policing requires fundamental structural reform, including reallocating some funding to social services, to improve public-safety outcomes.",
  },
  {
    slug: "wealth-tax-works",
    topicId: "wealth-tax",
    question: "Would a wealth tax on billionaires work?",
    claim:
      "An annual wealth tax on billionaires would be effective, economically sound, and reduce inequality.",
  },
  {
    slug: "billionaires-harmful",
    topicId: "billionaire-wealth",
    question: "Should billionaires exist?",
    claim:
      "The concentration of extreme wealth in billionaires is harmful to society and should be curbed through taxation or structural reform.",
  },
  {
    slug: "self-driving-cars-safer",
    topicId: "self-driving-car-safety",
    question: "Are self-driving cars safer than human drivers?",
    claim:
      "Autonomous vehicles are already safer than human drivers and should be deployed broadly.",
  },
  {
    slug: "gene-editing-embryos-permit",
    topicId: "gene-editing-embryos",
    question: "Should we allow gene editing of human embryos?",
    claim:
      "Germline gene editing of human embryos should be permitted for preventing serious genetic diseases.",
  },
  {
    slug: "space-exploration-worth-it",
    topicId: "space-exploration-value",
    question: "Is space exploration worth the cost?",
    claim:
      "Government-funded space exploration provides sufficient scientific, economic, and strategic returns to justify its cost.",
  },
  {
    slug: "factory-farming-ban-justified",
    topicId: "factory-farming-ban",
    question: "Should factory farming be banned?",
    claim:
      "Industrial animal agriculture should be banned or drastically reformed due to its ethical, environmental, and public-health costs.",
  },
  {
    slug: "homeschooling-better",
    topicId: "homeschooling-effectiveness",
    question: "Do homeschooled students do better academically?",
    claim:
      "Homeschooled students post higher average test scores than public-school students.",
  },
  {
    slug: "congestion-pricing-works",
    topicId: "congestion-pricing",
    question: "Does congestion pricing work?",
    claim:
      "Congestion pricing is an effective policy for cutting urban traffic and funding transit.",
  },
  {
    slug: "right-to-repair-good",
    topicId: "right-to-repair",
    question: "Is right to repair good for consumers?",
    claim:
      "Right-to-repair laws benefit consumers without significantly harming innovation or safety.",
  },
  {
    slug: "right-to-assisted-dying",
    topicId: "assisted-dying-euthanasia",
    question: "Should terminally ill adults have the right to assisted dying?",
    claim:
      "Terminally ill, mentally competent adults have a moral right to medically assisted dying.",
  },
  {
    slug: "decriminalizing-sex-work-helps",
    topicId: "sex-work-decriminalization",
    question: "Does decriminalizing sex work improve safety?",
    claim:
      "Full decriminalization of sex work improves health and safety outcomes.",
  },
  {
    slug: "carbon-tax-works",
    topicId: "carbon-tax-effectiveness",
    question: "Does a carbon tax reduce emissions?",
    claim:
      "A carbon tax is an effective and efficient policy for reducing greenhouse-gas emissions.",
  },
  // ── Breadth batch 3 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "mandatory-voting-good",
    topicId: "mandatory-voting",
    question: "Should voting be mandatory?",
    claim:
      "Compulsory voting produces more representative democracy and should be adopted more widely.",
  },
  {
    slug: "slavery-reparations-justified",
    topicId: "reparations-slavery",
    question: "Should the US pay reparations for slavery?",
    claim:
      "The US federal government should provide reparations to descendants of enslaved Black Americans to address the lasting effects of slavery and Jim Crow.",
  },
  {
    slug: "immigration-depresses-wages",
    topicId: "immigration-wage-impact",
    question: "Does immigration lower wages for native-born workers?",
    claim:
      "Large-scale immigration significantly depresses wages for native-born low-skilled workers.",
  },
  {
    slug: "open-borders-case",
    topicId: "open-borders",
    question: "Would open borders help the economy?",
    claim:
      "Significantly relaxing or eliminating immigration restrictions would produce large economic gains and is morally justified.",
  },
  {
    slug: "standardized-tests-valid",
    topicId: "standardized-testing-debate",
    question: "Are standardized tests like the SAT fair and useful?",
    claim:
      "Standardized tests like the SAT and ACT are valid, fair measures of academic ability that should remain central to college admissions.",
  },
  {
    slug: "abolish-electoral-college",
    topicId: "electoral-college-reform",
    question: "Should the Electoral College be abolished?",
    claim:
      "The Electoral College should be replaced with a national popular vote for electing the President.",
  },
  {
    slug: "surveillance-reduces-crime",
    topicId: "surveillance-public-safety",
    question: "Does government surveillance reduce crime?",
    claim:
      "Expanding government surveillance technology (facial recognition, CCTV, predictive policing) meaningfully reduces crime and improves public safety.",
  },
  {
    slug: "china-invade-taiwan",
    topicId: "china-taiwan-invasion",
    question: "Will China invade Taiwan before 2030?",
    claim:
      "China will attempt military reunification with Taiwan within this decade.",
  },
  {
    slug: "social-media-harms-elections",
    topicId: "social-media-elections",
    question: "Has social media undermined democratic elections?",
    claim:
      "Social media platforms have fundamentally undermined democratic elections through algorithmic amplification of misinformation, foreign interference, and micro-targeted political advertising.",
  },
  {
    slug: "nuclear-deterrence-works",
    topicId: "nuclear-weapons-abolition",
    question: "Does nuclear deterrence keep the world safer?",
    claim:
      "Nuclear deterrence has prevented major wars between great powers, and complete nuclear abolition would make the world less safe.",
  },
  {
    slug: "school-phone-bans-work",
    topicId: "school-phone-bans",
    question: "Do school smartphone bans improve student outcomes?",
    claim:
      "Banning smartphones in schools significantly improves student academic performance, mental health, and social development.",
  },
  {
    slug: "pandemic-preparedness-worth-it",
    topicId: "pandemic-preparedness",
    question: "Should governments invest heavily in pandemic preparedness?",
    claim: "Governments should invest heavily in pandemic-preparedness infrastructure.",
  },
  {
    slug: "global-water-wars",
    topicId: "global-water-crisis",
    question: "Is the world heading for water wars?",
    claim:
      "Freshwater scarcity will become a defining geopolitical conflict of the 21st century, potentially triggering wars and mass migration.",
  },
  {
    slug: "sugar-taxes-work",
    topicId: "sugar-tax-effectiveness",
    question: "Do sugar taxes reduce obesity?",
    claim:
      "Sugar taxes on sweetened beverages are an effective public-health intervention that meaningfully reduces sugar consumption and obesity rates.",
  },
  // ── Breadth batch 4 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "social-media-age-limit-16",
    topicId: "social-media-age-limits",
    question: "Should under-16s be banned from social media?",
    claim:
      "Children under 16 should be legally prohibited from using social media platforms.",
  },
  {
    slug: "ai-content-labeling-required",
    topicId: "ai-content-labeling",
    question: "Should AI-generated content be labeled by law?",
    claim:
      "AI-generated content should be required by law to carry visible labels or watermarks identifying it as AI-created.",
  },
  {
    slug: "break-up-big-tech",
    topicId: "big-tech-antitrust",
    question: "Should Big Tech be broken up?",
    claim:
      "Major technology companies (Google, Apple, Amazon, Meta) should be broken up or heavily regulated to restore competition and protect consumers.",
  },
  {
    slug: "cancel-culture-harmful",
    topicId: "cancel-culture",
    question: "Does cancel culture do more harm than good?",
    claim:
      "Cancel culture — public shaming and professional consequences for controversial speech — does more harm than good to public discourse.",
  },
  {
    slug: "media-bias-threatens-democracy",
    topicId: "media-bias-democracy",
    question: "Is media bias a threat to democracy?",
    claim:
      "Systemic bias in mainstream media is a significant threat to democratic discourse and informed citizenship.",
  },
  {
    slug: "space-colonization-feasible",
    topicId: "space-colonization-feasibility",
    question: "Is colonizing Mars or the Moon feasible within 50 years?",
    claim:
      "Establishing permanent, self-sustaining human colonies on Mars or the Moon is technically and economically feasible within the next 50 years.",
  },
  {
    slug: "lab-grown-meat-mainstream",
    topicId: "lab-grown-meat-adoption",
    question: "Will lab-grown meat go mainstream?",
    claim:
      "Cultivated (lab-grown) meat will become cost-competitive with conventional meat and achieve significant market adoption within the next 15 years.",
  },
  {
    slug: "ai-improves-education",
    topicId: "ai-in-education",
    question: "Will AI improve education and close achievement gaps?",
    claim:
      "AI tutoring systems and large language models in education will democratize high-quality learning and close achievement gaps, outweighing the risks.",
  },
  {
    slug: "regulate-ai-like-nuclear",
    topicId: "ai-regulation",
    question: "Should AI be regulated like drugs or nuclear energy?",
    claim:
      "AI development poses existential-level risks that require immediate government regulation comparable to pharmaceutical or nuclear oversight.",
  },
  {
    slug: "unregulated-tech-net-positive",
    topicId: "eacc-vs-tech-regulation",
    question: "Does rapid, unregulated tech progress do more good than harm?",
    claim:
      "Rapid, unregulated technological advancement creates more benefit than harm.",
  },
  {
    slug: "superintelligence-before-2035",
    topicId: "ai-superintelligence-timeline",
    question: "Will superintelligent AI arrive before 2035?",
    claim:
      "Scaling and efficiency trends make artificial superintelligence before 2035 a real possibility, though mainstream forecasts still place even human-level AI decades out.",
  },
  {
    slug: "small-modular-reactors-viable",
    topicId: "nuclear-renaissance-smr",
    question: "Can small modular reactors scale this decade?",
    claim:
      "Small modular reactors are a viable path to carbon-free baseload power deployable at meaningful scale within the next decade.",
  },
  {
    slug: "short-form-video-brain-rot",
    topicId: "tiktok-brain-rot",
    question: "Is short-form video rotting our attention spans?",
    claim:
      "Habitual consumption of short-form video (TikTok, Reels, Shorts) is measurably degrading attention spans, reading comprehension, and deep-thinking capacity.",
  },
];
