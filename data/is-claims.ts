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
  // ── Breadth batch 5 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "ai-replace-doctors",
    topicId: "ai-replacing-doctors",
    question: "Will AI replace doctors within a decade?",
    claim:
      "AI systems will be capable of diagnosing and treating most medical conditions better than human physicians within 10 years.",
  },
  {
    slug: "digital-privacy-dead",
    topicId: "privacy-vs-convenience",
    question: "Is digital privacy already dead?",
    claim:
      "Meaningful digital privacy is no longer achievable for ordinary citizens — the surveillance infrastructure is too embedded in daily life to resist.",
  },
  {
    slug: "veganism-helps-environment",
    topicId: "veganism-environmental-impact",
    question: "Would going vegan significantly help the environment?",
    claim:
      "Widespread adoption of vegan diets would significantly reduce humanity's environmental footprint — greenhouse-gas emissions, land use, and water pollution.",
  },
  {
    slug: "longevity-extend-lifespan",
    topicId: "longevity-science",
    question: "Will longevity science extend human lifespan soon?",
    claim:
      "Recent longevity research (senolytics, epigenetic reprogramming, caloric-restriction mimetics) will significantly extend healthy human lifespan within the next 20 years.",
  },
  {
    slug: "microplastics-health-crisis",
    topicId: "microplastics-health-crisis",
    question: "Are microplastics a serious health crisis?",
    claim:
      "Microplastic and nanoplastic contamination of human blood, organs, and placentas represents a major emerging public-health crisis, not merely an environmental nuisance.",
  },
  {
    slug: "glp1-drugs-safe-long-term",
    topicId: "glp1-weight-loss-drugs",
    question: "Are GLP-1 drugs like Ozempic a safe long-term obesity solution?",
    claim:
      "GLP-1 receptor agonists like Ozempic and Mounjaro are a safe, effective long-term solution to the obesity epidemic that should be widely accessible.",
  },
  {
    slug: "obesity-personal-choice",
    topicId: "obesity-personal-responsibility",
    question: "Is obesity mainly a matter of personal responsibility?",
    claim:
      "The obesity epidemic is primarily caused by individual lifestyle choices, and framing it as a disease or systemic issue undermines personal responsibility.",
  },
  {
    slug: "loneliness-epidemic-real",
    topicId: "loneliness-epidemic",
    question: "Is there really a loneliness epidemic?",
    claim:
      "Social isolation and loneliness have reached epidemic levels and pose health risks comparable to smoking 15 cigarettes a day.",
  },
  {
    slug: "remote-work-here-to-stay",
    topicId: "remote-work-permanence",
    question: "Is remote work here to stay?",
    claim:
      "Remote and hybrid work models will permanently replace traditional 5-day office work for knowledge workers.",
  },
  {
    slug: "is-college-worth-it",
    topicId: "college-value-proposition",
    question: "Is a college degree still worth it?",
    claim:
      "For most students who complete it, a four-year degree still earns a strong financial return — though the payoff varies enormously by major, institution, and completion.",
  },
  {
    slug: "foreign-aid-works",
    topicId: "foreign-aid-effectiveness",
    question: "Does foreign aid actually work?",
    claim:
      "International development aid significantly improves outcomes in recipient countries and is an effective use of donor resources.",
  },
  {
    slug: "regulate-crypto-like-finance",
    topicId: "cryptocurrency-regulation",
    question: "Should cryptocurrency be regulated like traditional finance?",
    claim: "Cryptocurrencies should be regulated like traditional financial instruments.",
  },
  {
    slug: "gig-workers-employees",
    topicId: "gig-economy-regulation",
    question: "Should gig workers be classified as employees?",
    claim:
      "Gig-economy platforms (Uber, Lyft, DoorDash) should be required to classify their workers as employees rather than independent contractors.",
  },
  // ── Breadth batch 6 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "moon-landing-real",
    topicId: "moon-landing",
    question: "Did NASA really land astronauts on the Moon?",
    claim:
      "The Apollo missions successfully landed 12 humans on the lunar surface between 1969 and 1972.",
  },
  {
    slug: "ai-conscious",
    topicId: "consciousness-ai-systems",
    question: "Can AI be conscious?",
    claim:
      "Current or near-future AI systems could possess some form of consciousness or subjective experience, creating moral obligations toward them.",
  },
  {
    slug: "are-we-in-a-simulation",
    topicId: "simulation-hypothesis",
    question: "Are we living in a simulation?",
    claim:
      "Bostrom's simulation argument implies we are probably living in a computer simulation — though whether that conclusion holds, or is even testable, is contested.",
  },
  {
    slug: "inflation-caused-by-spending",
    topicId: "inflation-monetary-policy",
    question: "Was post-pandemic inflation caused by government spending?",
    claim:
      "Post-pandemic inflation was primarily driven by excessive government spending and monetary expansion, not supply-chain disruptions.",
  },
  {
    slug: "global-housing-bubble",
    topicId: "global-housing-bubble",
    question: "Is there a global housing bubble about to burst?",
    claim:
      "Major housing markets worldwide are in an unsustainable bubble driven by low interest rates, speculation, and foreign investment, and a correction is imminent.",
  },
  {
    slug: "us-debt-crisis",
    topicId: "us-national-debt-crisis",
    question: "Is the US national debt a ticking time bomb?",
    claim:
      "The US national debt, exceeding $37 trillion, poses a serious threat to economic stability.",
  },
  {
    slug: "rto-improves-productivity",
    topicId: "return-to-office-productivity",
    question: "Does return-to-office improve productivity?",
    claim:
      "Mandating return-to-office improves collaboration, innovation, and productivity compared to remote work.",
  },
  {
    slug: "lab-diamonds-ethical",
    topicId: "lab-diamonds-ethics",
    question: "Are lab-grown diamonds more ethical than mined diamonds?",
    claim:
      "Lab-grown diamonds are the ethical choice — they avoid the human-rights abuses and environmental destruction of diamond mining.",
  },
  {
    slug: "degrowth-necessary",
    topicId: "degrowth-economics",
    question: "Do we need degrowth to save the planet?",
    claim:
      "Endless GDP growth is incompatible with ecological survival, and rich nations must deliberately shrink their economies to stay within planetary boundaries.",
  },
  {
    slug: "government-fix-housing",
    topicId: "housing-affordability-crisis",
    question: "Can only government fix the housing affordability crisis?",
    claim:
      "Government intervention through zoning reform, rent control, and public housing is necessary to solve the housing affordability crisis, because the free market alone cannot provide adequate affordable housing.",
  },
  {
    slug: "meaning-without-religion",
    topicId: "meaning-without-religion",
    question: "Can life be meaningful without religion?",
    claim:
      "A meaningful, fulfilling human life is fully achievable without religious belief, and secular frameworks provide adequate foundations for purpose, ethics, and meaning.",
  },
  {
    slug: "meritocracy-myth",
    topicId: "meritocracy-myth",
    question: "Is meritocracy a myth?",
    claim:
      "The belief that success is primarily determined by individual talent and effort is a myth that legitimizes systemic inequality.",
  },
  {
    slug: "hard-problem-consciousness",
    topicId: "consciousness-hard-problem",
    question: "Is consciousness more than physical brain activity?",
    claim:
      "Consciousness — subjective experience — cannot be fully explained by physical brain processes alone and may require new fundamental theories of reality.",
  },
  {
    slug: "kids-smartphone-ban",
    topicId: "children-smartphone-age",
    question: "Should kids under 14 be banned from smartphones?",
    claim:
      "Children under 14 should be prohibited from owning smartphones, because the developmental harms of constant connectivity outweigh the benefits.",
  },
  {
    slug: "artificial-wombs-coming",
    topicId: "artificial-reproduction-ethics",
    question: "Will artificial wombs change human reproduction?",
    claim:
      "Ectogenesis (artificial wombs) and in-vitro gametogenesis will fundamentally alter human reproduction within 15 years.",
  },
  // ── Breadth batch 7 (2026-06-22) ──────────────────────────────────────────
  {
    slug: "ban-gain-of-function",
    topicId: "gain-of-function-research-ban",
    question: "Should gain-of-function research be banned?",
    claim:
      "Gain-of-function research that enhances the transmissibility or pathogenicity of potential pandemic pathogens poses an existential biosecurity risk that outweighs its benefits and should be permanently banned worldwide.",
  },
  {
    slug: "alternatives-to-democracy",
    topicId: "alternatives-to-democracy",
    question: "Are there better systems than liberal democracy?",
    claim:
      "Liberal democracy may be structurally incapable of addressing long-term challenges like climate change, AI governance, and pandemics, so alternative governance models deserve serious consideration.",
  },
  {
    slug: "geoengineering-necessary",
    topicId: "geoengineering-climate",
    question: "Do we need geoengineering to fight climate change?",
    claim:
      "Geoengineering — particularly stratospheric aerosol injection and direct air capture — is now a necessary complement to emissions reduction, not a dangerous distraction.",
  },
  {
    slug: "cbdc-surveillance-threat",
    topicId: "central-bank-digital-currency",
    question: "Are central bank digital currencies a surveillance threat?",
    claim:
      "Central Bank Digital Currencies represent the most significant expansion of government financial surveillance in history, enabling programmable money that can restrict how, when, and where citizens spend.",
  },
  {
    slug: "masculinity-crisis-real",
    topicId: "masculinity-crisis",
    question: "Is there a real crisis facing young men?",
    claim:
      "Young men are experiencing a crisis of identity, purpose, and mental health driven by economic displacement, educational underperformance, and the collapse of traditional masculine roles.",
  },
  {
    slug: "deepfakes-end-of-truth",
    topicId: "ai-deepfakes-truth-collapse",
    question: "Have deepfakes made digital media impossible to trust?",
    claim:
      "AI-generated deepfakes have advanced to the point where no digital media can be trusted as authentic, fundamentally undermining journalism and democratic accountability.",
  },
  {
    slug: "birth-rate-collapse-crisis",
    topicId: "declining-birth-rates",
    question: "Are falling birth rates an existential crisis?",
    claim:
      "The global decline in birth rates below replacement level is an existential demographic crisis that will cause economic and civilizational decline unless proactively addressed.",
  },
  {
    slug: "new-nuclear-arms-race",
    topicId: "nuclear-proliferation-new-arms-race",
    question: "Are we in a new nuclear arms race?",
    claim:
      "The collapse of Cold War-era arms control plus simultaneous modernization by the US, Russia, and China has initiated a new nuclear arms race that makes nuclear conflict more likely than at any point since 1962.",
  },
  {
    slug: "animals-deserve-rights",
    topicId: "animal-consciousness-rights",
    question: "Do animals deserve far stronger legal rights?",
    claim:
      "Scientific evidence increasingly shows many animals possess rich subjective experiences, morally obligating humanity to extend rights protections far beyond current frameworks.",
  },
  {
    slug: "open-weight-ai-safe",
    topicId: "open-weight-ai-models",
    question: "Should frontier AI models be released open-weight?",
    claim:
      "Openly releasing the weights of powerful frontier AI models does more good than harm — democratizing access and accelerating safety research outweighs the uplift it gives malicious actors.",
  },
  {
    slug: "second-amendment-individual-right",
    topicId: "second-amendment-individual-right",
    question: "Does the Second Amendment protect an individual right?",
    claim:
      "The Second Amendment protects an individual right to bear arms, not merely a collective or militia right.",
  },
  // ── Breadth batch 8 (2026-06-22) — completes clean evergreen coverage ──────
  {
    slug: "net-neutrality-necessary",
    topicId: "net-neutrality",
    question: "Is net neutrality necessary?",
    claim:
      "Net-neutrality regulation is necessary to protect an open, competitive internet.",
  },
  {
    slug: "ai-training-copyright-theft",
    topicId: "generative-ai-art-copyright",
    question: "Is training AI on copyrighted work theft?",
    claim:
      "Training generative AI on copyrighted works without permission is unfair and should be unlawful.",
  },
  {
    slug: "restrict-facial-recognition-policing",
    topicId: "facial-recognition-policing",
    question: "Should police facial recognition be restricted?",
    claim:
      "Police use of facial-recognition technology does more harm than good and should be restricted.",
  },
  {
    slug: "fusion-power-soon",
    topicId: "nuclear-fusion-timeline",
    question: "Will fusion power arrive within 20 years?",
    claim:
      "Commercial fusion power will be a meaningful part of the energy mix within the next two decades.",
  },
  {
    slug: "do-antidepressants-work",
    topicId: "ssri-antidepressant-efficacy",
    question: "Do antidepressants (SSRIs) actually work?",
    claim:
      "SSRI antidepressants provide clinically meaningful benefit beyond placebo for depression.",
  },
  {
    slug: "raise-retirement-age",
    topicId: "social-security-retirement-age",
    question: "Should the retirement age be raised?",
    claim:
      "Raising the retirement age is a necessary and fair way to keep Social Security solvent.",
  },
  {
    slug: "estate-tax-fair",
    topicId: "estate-inheritance-tax",
    question: "Is the estate tax fair?",
    claim: "The estate (inheritance) tax is a fair and economically sound policy.",
  },
  {
    slug: "occupational-licensing-harmful",
    topicId: "occupational-licensing-reform",
    question: "Does occupational licensing do more harm than good?",
    claim:
      "Occupational licensing does more economic harm than good and should be rolled back.",
  },
  {
    slug: "encryption-backdoors",
    topicId: "encryption-backdoors",
    question: "Should governments have encryption backdoors?",
    claim:
      "Governments should be able to compel lawful-access (backdoor) capabilities in encrypted communications.",
  },
  {
    slug: "reform-section-230",
    topicId: "section-230-reform",
    question: "Should Section 230 be reformed or repealed?",
    claim: "Section 230 should be significantly reformed or repealed.",
  },
  {
    slug: "ban-killer-robots",
    topicId: "autonomous-weapons-ban",
    question: "Should lethal autonomous weapons be banned?",
    claim: "Lethal autonomous weapons should be banned by international treaty.",
  },
  {
    slug: "ai-energy-footprint-problem",
    topicId: "ai-energy-water-footprint",
    question: "Is AI's energy and water use a serious problem?",
    claim:
      "AI's energy and water footprint is a serious environmental problem that warrants intervention.",
  },
  {
    slug: "adhd-overdiagnosed",
    topicId: "adhd-overdiagnosis",
    question: "Is ADHD overdiagnosed?",
    claim: "ADHD is substantially overdiagnosed.",
  },
  {
    slug: "vaping-harm-reduction",
    topicId: "vaping-harm-reduction",
    question: "Is vaping a good way to quit smoking?",
    claim:
      "E-cigarettes are an effective and acceptable harm-reduction tool for smokers.",
  },
  {
    slug: "congressional-term-limits",
    topicId: "congressional-term-limits",
    question: "Would term limits improve Congress?",
    claim: "Congressional term limits would improve American governance.",
  },
  {
    slug: "effective-altruism-sound",
    topicId: "effective-altruism",
    question: "Is effective altruism a sound way to do good?",
    claim: "Effective altruism is a sound framework for doing good.",
  },
  {
    slug: "no-safe-level-alcohol",
    topicId: "alcohol-no-safe-level",
    question: "Is any amount of alcohol safe to drink?",
    claim: "There is no safe level of alcohol consumption for health.",
  },
  {
    slug: "mmt-sound",
    topicId: "modern-monetary-theory",
    question: "Is Modern Monetary Theory sound?",
    claim:
      "Modern Monetary Theory provides a sound basis for government spending and deficit policy.",
  },
  // ── Net-new coverage batch (2026-06-29) — uncovered evergreen topics ───────
  {
    slug: "organic-food-healthier",
    topicId: "organic-food-health",
    question: "Is organic food healthier than conventional food?",
    claim:
      "Organic food is significantly healthier and more nutritious than conventionally grown food.",
  },
  {
    slug: "gmo-crops-safe",
    topicId: "gmo-crops-safety",
    question: "Are GMO crops safe to eat?",
    claim:
      "Genetically modified crops are safe to eat and beneficial for agriculture.",
  },
  {
    slug: "evs-better-despite-lithium-mining",
    topicId: "lithium-mining-ev-impact",
    question: "Are electric vehicles still better for the environment once lithium mining is counted?",
    claim:
      "Electric vehicles are significantly better for the environment than gas cars even after accounting for lithium mining and battery production.",
  },
  {
    slug: "dark-matter-exists",
    topicId: "dark-matter-vs-mond",
    question: "Does dark matter actually exist?",
    claim:
      "Dark matter, rather than modified gravity (MOND), is the correct explanation for galactic dynamics.",
  },
  {
    slug: "radical-life-extension-possible",
    topicId: "longevity-anti-aging",
    question: "Can human lifespan be radically extended beyond 120 years?",
    claim:
      "Recent advances in longevity science make meaningful human lifespan extension beyond 120 years achievable within our lifetimes.",
  },
  {
    slug: "psychedelic-therapy-real-breakthrough",
    topicId: "psychedelic-therapy-hype",
    question: "Is psychedelic therapy a genuine breakthrough or overhype?",
    claim:
      "Psychedelic therapy represents a genuine paradigm shift in mental-health treatment, not a repeat of the 1960s overpromise-and-backlash cycle.",
  },
  {
    slug: "tariffs-help-economy",
    topicId: "trump-tariffs",
    question: "Do tariffs strengthen the economy?",
    claim:
      "Broad protectionist tariffs revive domestic manufacturing and strengthen the national economy more than they raise costs for consumers.",
  },
  {
    slug: "governments-ban-social-platforms",
    topicId: "government-platform-bans",
    question: "Should governments be able to ban social media platforms?",
    claim:
      "Governments are justified in banning or forcing the divestiture of foreign-owned social media platforms on national-security grounds.",
  },
  // ── Net-new coverage batch (2026-06-29, cont.) — uncovered contested topics ──
  {
    slug: "us-iran-pressure-works",
    topicId: "us-iran-conflict",
    question: "Has US pressure policy toward Iran made the Middle East safer?",
    claim:
      "US policy toward Iran — combining maximum-pressure sanctions, covert operations, and military deterrence — has made the Middle East safer and advanced American strategic interests.",
  },
  {
    slug: "border-enforcement-effective",
    topicId: "immigration-border-crisis",
    question: "Is stricter border enforcement the most effective way to manage US immigration?",
    claim:
      "Combining border enforcement, asylum restrictions, and deportation is the most effective way to manage US immigration and protect national interests.",
  },
  {
    slug: "ai-net-job-loss",
    topicId: "ai-white-collar-displacement",
    question: "Will AI destroy more white-collar jobs than it creates?",
    claim:
      "Large language models and AI agents will permanently eliminate more white-collar professional jobs than they create within the next decade.",
  },
  {
    slug: "gender-affirming-care-minors-helps",
    topicId: "gender-affirming-care-minors",
    question: "Does gender-affirming care improve mental health for transgender minors?",
    claim:
      "Gender-affirming medical care for transgender adolescents, including puberty blockers and hormone therapy, improves mental-health outcomes and should be accessible.",
  },
  {
    slug: "trans-women-womens-sports",
    topicId: "transgender-athletes-sports",
    question: "Should transgender women compete in women's sports?",
    claim:
      "Transgender women who have undergone hormone therapy should be permitted to compete in women's sports categories, because hormonal transition sufficiently reduces the physiological advantages of male puberty.",
  },
  {
    slug: "immigration-threatens-national-identity",
    topicId: "immigration-national-identity",
    question: "Does mass immigration threaten national identity and social cohesion?",
    claim:
      "High levels of immigration transform the cultural identity and social cohesion of receiving nations in ways that democratic majorities have not consented to and that integration policies cannot fully address.",
  },
  {
    slug: "affirmative-action-necessary",
    topicId: "affirmative-action-meritocracy",
    question: "Is affirmative action necessary for equal opportunity?",
    claim:
      "Race-conscious admissions and hiring policies are necessary to achieve genuine equality of opportunity.",
  },
  {
    slug: "ukraine-negotiated-settlement",
    topicId: "ukraine-peace-terms",
    question: "Should the Russia-Ukraine war end in a negotiated settlement along current lines?",
    claim:
      "A negotiated settlement freezing the war along current lines — ratifying territorial reality, barring NATO membership, and lifting sanctions — would end the killing on acceptable terms rather than rewarding aggression.",
  },
  {
    slug: "maha-improves-health",
    topicId: "rfk-health-policy",
    question: "Will RFK Jr's Make America Healthy Again agenda improve US health?",
    claim:
      "RFK Jr's 'Make America Healthy Again' overhaul of US health institutions — restructuring vaccine policy, targeting food additives and fluoridation, and challenging regulatory capture — will improve American health outcomes.",
  },
  {
    slug: "doge-cut-waste",
    topicId: "doge-federal-cuts",
    question: "Did DOGE actually cut government waste and make Washington leaner?",
    claim:
      "The Department of Government Efficiency's workforce cuts, contract terminations, and spending freezes eliminated waste, fraud, and abuse and made the federal government leaner and more effective.",
  },
  {
    slug: "epstein-files-institutional-failure",
    topicId: "epstein-files",
    question: "Do the Epstein files reveal a systemic institutional failure?",
    claim:
      "The Jeffrey Epstein case reveals systemic institutional failure — law enforcement, prosecutors, and political figures enabled or ignored sex trafficking for years — and full accountability has still not been achieved.",
  },
];
