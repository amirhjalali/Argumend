import { Topic, TopicCategory, TopicSchema, computeConfidenceScore } from "@/lib/schemas/topic";

// ============================================================================
// Topic Data Imports
// ============================================================================

// Existing extracted topics
import { usIranConflictData } from "./topics/us-iran-conflict";
import { epsteinFilesData } from "./topics/epstein-files";
import { covidOriginsData } from "./topics/covid-origins";
import { aiJobDisplacementData } from "./topics/ai-job-displacement";
import { aiInEducationData } from "./topics/ai-in-education";
import { aiRegulationData } from "./topics/ai-regulation";
import { housingAffordabilityCrisisData } from "./topics/housing-affordability-crisis";
import { socialMediaElectionsData } from "./topics/social-media-elections";
import { ultraProcessedFoodData } from "./topics/ultra-processed-food";
import { fourDayWorkWeekData } from "./topics/four-day-work-week";
import { tiktokBanData } from "./topics/tiktok-ban";
import { immigrationBorderCrisisData } from "./topics/immigration-border-crisis";
import { longevityScienceData } from "./topics/longevity-science";
import { nuclearWeaponsAbolitionData } from "./topics/nuclear-weapons-abolition";
import { genderAffirmingCareMinorsData } from "./topics/gender-affirming-care-minors";
import { consciousnessHardProblemData } from "./topics/consciousness-hard-problem";
import { schoolPhoneBansData } from "./topics/school-phone-bans";
import { studentDebtForgivenessData } from "./topics/student-debt-forgiveness";
import { microplasticsHealthCrisisData } from "./topics/microplastics-health-crisis";
import { glp1WeightLossDrugsData } from "./topics/glp1-weight-loss-drugs";
import { aiWhiteCollarDisplacementData } from "./topics/ai-white-collar-displacement";
import { artificialReproductionEthicsData } from "./topics/artificial-reproduction-ethics";
import { governmentPlatformBansData } from "./topics/government-platform-bans";
import { gainOfFunctionResearchBanData } from "./topics/gain-of-function-research-ban";
import { childrenSmartphoneAgeData } from "./topics/children-smartphone-age";
import { alternativesToDemocracyData } from "./topics/alternatives-to-democracy";
import { geoengineeringClimateData } from "./topics/geoengineering-climate";
import { centralBankDigitalCurrencyData } from "./topics/central-bank-digital-currency";
import { masculinityCrisisData } from "./topics/masculinity-crisis";
import { aiDeepfakesTruthCollapseData } from "./topics/ai-deepfakes-truth-collapse";
import { decliningBirthRatesData } from "./topics/declining-birth-rates";
import { longevityAntiAgingData } from "./topics/longevity-anti-aging";
import { nuclearProliferationNewArmsRaceData } from "./topics/nuclear-proliferation-new-arms-race";
import { transgenderAthletesSportsData } from "./topics/transgender-athletes-sports";
import { animalConsciousnessRightsData } from "./topics/animal-consciousness-rights";
import { immigrationNationalIdentityData } from "./topics/immigration-national-identity";
import { psychedelicTherapyHypeData } from "./topics/psychedelic-therapy-hype";
import { eaccVsTechRegulationData } from "./topics/eacc-vs-tech-regulation";
import { affirmativeActionMeritocracyData } from "./topics/affirmative-action-meritocracy";
import { fluorideWaterSuppliesData } from "./topics/fluoride-water-supplies";
import { cryptocurrencyRegulationData } from "./topics/cryptocurrency-regulation";

// Newly extracted topics
import { moonLandingData } from "./topics/moon-landing";
import { simulationHypothesisData } from "./topics/simulation-hypothesis";
import { aiRiskData } from "./topics/ai-risk";
import { climateChangeData } from "./topics/climate-change";
import { freeWillData } from "./topics/free-will";
import { minneapolisShootingData } from "./topics/minneapolis-shooting";
import { universalBasicIncomeData } from "./topics/universal-basic-income";
import { socialMediaMentalHealthData } from "./topics/social-media-mental-health";
import { cryptocurrencyValueData } from "./topics/cryptocurrency-value";
import { gunControlEffectivenessData } from "./topics/gun-control-effectiveness";
import { nuclearEnergySafetyData } from "./topics/nuclear-energy-safety";
import { wealthTaxData } from "./topics/wealth-tax";
import { aiContentLabelingData } from "./topics/ai-content-labeling";
import { remoteWorkPermanenceData } from "./topics/remote-work-permanence";
import { socialMediaAgeLimitsData } from "./topics/social-media-age-limits";
import { collegeValuePropositionData } from "./topics/college-value-proposition";
import { mandatoryVotingData } from "./topics/mandatory-voting";
import { deathPenaltyDeterrenceData } from "./topics/death-penalty-deterrence";
import { billionaireWealthData } from "./topics/billionaire-wealth";
import { homeschoolingEffectivenessData } from "./topics/homeschooling-effectiveness";
import { policeReformData } from "./topics/police-reform";
import { drugDecriminalizationData } from "./topics/drug-decriminalization";
import { immigrationWageImpactData } from "./topics/immigration-wage-impact";
import { evEnvironmentalImpactData } from "./topics/ev-environmental-impact";
import { organicFoodHealthData } from "./topics/organic-food-health";
import { foreignAidEffectivenessData } from "./topics/foreign-aid-effectiveness";
import { spaceExplorationValueData } from "./topics/space-exploration-value";
import { factoryFarmingBanData } from "./topics/factory-farming-ban";
import { mediaBiasDemocracyData } from "./topics/media-bias-democracy";
import { universalHealthcareData } from "./topics/universal-healthcare";
import { openBordersData } from "./topics/open-borders";
import { cancelCultureData } from "./topics/cancel-culture";
import { bigTechAntitrustData } from "./topics/big-tech-antitrust";
import { minimumWageEffectsData } from "./topics/minimum-wage-effects";
import { geneEditingEmbryosData } from "./topics/gene-editing-embryos";
import { reparationsSlaveryData } from "./topics/reparations-slavery";
import { spaceColonizationFeasibilityData } from "./topics/space-colonization-feasibility";
import { veganismEnvironmentalData } from "./topics/veganism-environmental-impact";
import { standardizedTestingDebateData } from "./topics/standardized-testing-debate";
import { labGrownMeatData } from "./topics/lab-grown-meat-adoption";
import { aiConsciousnessData } from "./topics/consciousness-ai-systems";
import { electoralCollegeReformData } from "./topics/electoral-college-reform";
import { psychedelicsMentalHealthData } from "./topics/psychedelics-mental-health";
import { gigEconomyRegulationData } from "./topics/gig-economy-regulation";
import { surveillancePublicSafetyData } from "./topics/surveillance-public-safety";
import { meaningWithoutReligionData } from "./topics/meaning-without-religion";

// labLeakTheoryData is now imported from ./topics/covid-origins.ts (covidOriginsData)
const labLeakTheoryData = covidOriginsData;

// ============================================================================
// Build Topics with Computed Confidence Scores
// ============================================================================

function buildTopic(data: Omit<Topic, "confidence_score"> & { confidence_score?: number }): Topic {
  // Compute confidence from evidence if not explicitly set to a high/settled value
  const computedScore = computeConfidenceScore(data.pillars);

  // For "settled" topics, use the higher of computed vs original (trust the data)
  // For contested topics, prefer computed score
  const finalScore = data.status === "settled"
    ? Math.max(computedScore, data.confidence_score ?? 0)
    : computedScore;

  return TopicSchema.parse({
    ...data,
    confidence_score: finalScore,
  });
}

// ============================================================================
// Export Topics
// ============================================================================

export const moonLanding = buildTopic(moonLandingData);
export const simulationHypothesis = buildTopic(simulationHypothesisData);
export const aiRisk = buildTopic(aiRiskData);
export const climateChange = buildTopic(climateChangeData);
export const freeWill = buildTopic(freeWillData);
export const minneapolisShooting = buildTopic(minneapolisShootingData);
export const labLeakTheory = buildTopic(labLeakTheoryData);
export const universalBasicIncome = buildTopic(universalBasicIncomeData);
export const socialMediaMentalHealth = buildTopic(socialMediaMentalHealthData);
export const cryptocurrencyValue = buildTopic(cryptocurrencyValueData);
export const gunControlEffectiveness = buildTopic(gunControlEffectivenessData);
export const nuclearEnergySafety = buildTopic(nuclearEnergySafetyData);
export const wealthTax = buildTopic(wealthTaxData);
export const aiContentLabeling = buildTopic(aiContentLabelingData);
export const remoteWorkPermanence = buildTopic(remoteWorkPermanenceData);
// standardizedTestingValue removed (duplicate of standardizedTestingDebate)
export const socialMediaAgeLimits = buildTopic(socialMediaAgeLimitsData);
export const collegeValueProposition = buildTopic(collegeValuePropositionData);
export const mandatoryVoting = buildTopic(mandatoryVotingData);
export const deathPenaltyDeterrence = buildTopic(deathPenaltyDeterrenceData);
export const billionaireWealth = buildTopic(billionaireWealthData);
export const homeschoolingEffectiveness = buildTopic(homeschoolingEffectivenessData);
export const policeReform = buildTopic(policeReformData);
export const drugDecriminalization = buildTopic(drugDecriminalizationData);
export const immigrationWageImpact = buildTopic(immigrationWageImpactData);
export const evEnvironmentalImpact = buildTopic(evEnvironmentalImpactData);
export const organicFoodHealth = buildTopic(organicFoodHealthData);
export const foreignAidEffectiveness = buildTopic(foreignAidEffectivenessData);
export const spaceExplorationValue = buildTopic(spaceExplorationValueData);
export const factoryFarmingBan = buildTopic(factoryFarmingBanData);
export const mediaBiasDemocracy = buildTopic(mediaBiasDemocracyData);
export const universalHealthcare = buildTopic(universalHealthcareData);
export const openBorders = buildTopic(openBordersData);
export const cancelCulture = buildTopic(cancelCultureData);
export const bigTechAntitrust = buildTopic(bigTechAntitrustData);
export const minimumWageEffects = buildTopic(minimumWageEffectsData);
export const geneEditingEmbryos = buildTopic(geneEditingEmbryosData);
export const reparationsSlavery = buildTopic(reparationsSlaveryData);
export const spaceColonizationFeasibility = buildTopic(spaceColonizationFeasibilityData);
export const veganismEnvironmental = buildTopic(veganismEnvironmentalData);
// freeWillDeterminism removed (duplicate of freeWill)
// ubiEconomics removed (duplicate of universalBasicIncome)
export const standardizedTestingDebate = buildTopic(standardizedTestingDebateData);
export const labGrownMeat = buildTopic(labGrownMeatData);
export const aiConsciousness = buildTopic(aiConsciousnessData);
export const electoralCollegeReform = buildTopic(electoralCollegeReformData);
export const psychedelicsMentalHealth = buildTopic(psychedelicsMentalHealthData);
export const gigEconomyRegulation = buildTopic(gigEconomyRegulationData);
export const surveillancePublicSafety = buildTopic(surveillancePublicSafetyData);
export const meaningWithoutReligion = buildTopic(meaningWithoutReligionData);
export const usIranConflict = buildTopic(usIranConflictData);
export const epsteinFiles = buildTopic(epsteinFilesData);

// New topics (March 2026)
export const aiJobDisplacement = buildTopic(aiJobDisplacementData);
export const aiInEducation = buildTopic(aiInEducationData);
export const aiRegulation = buildTopic(aiRegulationData);
export const housingAffordabilityCrisis = buildTopic(housingAffordabilityCrisisData);
export const socialMediaElections = buildTopic(socialMediaElectionsData);
export const ultraProcessedFood = buildTopic(ultraProcessedFoodData);
export const fourDayWorkWeek = buildTopic(fourDayWorkWeekData);
export const tiktokBan = buildTopic(tiktokBanData);
export const immigrationBorderCrisis = buildTopic(immigrationBorderCrisisData);
export const longevityScience = buildTopic(longevityScienceData);
export const nuclearWeaponsAbolition = buildTopic(nuclearWeaponsAbolitionData);
export const genderAffirmingCareMinors = buildTopic(genderAffirmingCareMinorsData);
export const consciousnessHardProblem = buildTopic(consciousnessHardProblemData);
export const schoolPhoneBans = buildTopic(schoolPhoneBansData);
export const studentDebtForgiveness = buildTopic(studentDebtForgivenessData);
export const microplasticsHealthCrisis = buildTopic(microplasticsHealthCrisisData);
export const glp1WeightLossDrugs = buildTopic(glp1WeightLossDrugsData);
export const aiWhiteCollarDisplacement = buildTopic(aiWhiteCollarDisplacementData);
export const artificialReproductionEthics = buildTopic(artificialReproductionEthicsData);
export const governmentPlatformBans = buildTopic(governmentPlatformBansData);
export const gainOfFunctionResearchBan = buildTopic(gainOfFunctionResearchBanData);
export const childrenSmartphoneAge = buildTopic(childrenSmartphoneAgeData);
export const alternativesToDemocracy = buildTopic(alternativesToDemocracyData);
export const geoengineeringClimate = buildTopic(geoengineeringClimateData);
export const centralBankDigitalCurrency = buildTopic(centralBankDigitalCurrencyData);
export const masculinityCrisis = buildTopic(masculinityCrisisData);
export const aiDeepfakesTruthCollapse = buildTopic(aiDeepfakesTruthCollapseData);
export const decliningBirthRates = buildTopic(decliningBirthRatesData);
export const longevityAntiAging = buildTopic(longevityAntiAgingData);
export const nuclearProliferationNewArmsRace = buildTopic(nuclearProliferationNewArmsRaceData);
export const transgenderAthletesSports = buildTopic(transgenderAthletesSportsData);
export const animalConsciousnessRights = buildTopic(animalConsciousnessRightsData);
export const immigrationNationalIdentity = buildTopic(immigrationNationalIdentityData);
export const psychedelicTherapyHype = buildTopic(psychedelicTherapyHypeData);
export const eaccVsTechRegulation = buildTopic(eaccVsTechRegulationData);
export const affirmativeActionMeritocracy = buildTopic(affirmativeActionMeritocracyData);
export const fluorideWaterSupplies = buildTopic(fluorideWaterSuppliesData);
export const cryptocurrencyRegulation = buildTopic(cryptocurrencyRegulationData);

export const topics: Topic[] = [
  // --- Policy & Governance ---
  nuclearEnergySafety,
  universalHealthcare,
  gunControlEffectiveness,
  minimumWageEffects,
  drugDecriminalization,
  deathPenaltyDeterrence,
  policeReform,
  mandatoryVoting,
  reparationsSlavery,
  immigrationWageImpact,
  openBorders,
  universalBasicIncome,
  wealthTax,
  standardizedTestingDebate,
  electoralCollegeReform,
  surveillancePublicSafety,
  usIranConflict,
  epsteinFiles,
  tiktokBan,
  immigrationBorderCrisis,
  socialMediaElections,
  nuclearWeaponsAbolition,
  schoolPhoneBans,

  // --- Technology & Society ---
  socialMediaAgeLimits,
  socialMediaMentalHealth,
  aiRisk,
  aiContentLabeling,
  bigTechAntitrust,
  cancelCulture,
  mediaBiasDemocracy,
  spaceColonizationFeasibility,
  labGrownMeat,
  aiJobDisplacement,
  aiInEducation,
  aiRegulation,
  aiWhiteCollarDisplacement,
  eaccVsTechRegulation,

  // --- Science & Environment ---
  climateChange,
  evEnvironmentalImpact,
  factoryFarmingBan,
  organicFoodHealth,
  geneEditingEmbryos,
  spaceExplorationValue,
  veganismEnvironmental,
  psychedelicsMentalHealth,
  labLeakTheory,
  ultraProcessedFood,
  longevityScience,
  genderAffirmingCareMinors,
  microplasticsHealthCrisis,
  glp1WeightLossDrugs,
  fluorideWaterSupplies,

  // --- Economics & Education ---
  remoteWorkPermanence,
  collegeValueProposition,
  homeschoolingEffectiveness,
  billionaireWealth,
  foreignAidEffectiveness,
  cryptocurrencyValue,
  cryptocurrencyRegulation,
  gigEconomyRegulation,
  housingAffordabilityCrisis,
  fourDayWorkWeek,
  studentDebtForgiveness,

  // --- Philosophy & Speculation ---
  freeWill,
  simulationHypothesis,
  moonLanding,
  minneapolisShooting,
  aiConsciousness,
  meaningWithoutReligion,
  consciousnessHardProblem,

  // --- New Topics (March 2026) ---
  artificialReproductionEthics,
  governmentPlatformBans,
  gainOfFunctionResearchBan,
  childrenSmartphoneAge,
  alternativesToDemocracy,
  geoengineeringClimate,
  centralBankDigitalCurrency,
  masculinityCrisis,
  aiDeepfakesTruthCollapse,
  decliningBirthRates,

  // --- New Topics Batch 2 (March 2026) ---
  longevityAntiAging,
  nuclearProliferationNewArmsRace,
  transgenderAthletesSports,
  animalConsciousnessRights,
  immigrationNationalIdentity,
  psychedelicTherapyHype,
  affirmativeActionMeritocracy,
];

// ============================================================================
// Featured Topic of the Week
// ============================================================================

/** Rotate this ID weekly to feature a different debate on the homepage. */
export const featuredTopicId = "social-media-mental-health";

/** Short editorial hook explaining why this topic is featured right now. */
export const featuredReason =
  "The Surgeon General just called for warning labels on social media. Where does the evidence actually land?";

// ============================================================================
// Category Helpers
// ============================================================================

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  policy: "Policy",
  technology: "Technology",
  science: "Science",
  economics: "Economics",
  philosophy: "Philosophy",
};

export const CATEGORY_ORDER: TopicCategory[] = [
  "policy",
  "technology",
  "science",
  "economics",
  "philosophy",
];

/** Get topics grouped by category. */
export function getTopicsByCategory(): Record<TopicCategory, Topic[]> {
  const grouped: Record<TopicCategory, Topic[]> = {
    policy: [],
    technology: [],
    science: [],
    economics: [],
    philosophy: [],
  };
  for (const topic of topics) {
    grouped[topic.category].push(topic);
  }
  return grouped;
}

// ============================================================================
// Cross-Category Related Topics (Thematic Clusters)
// ============================================================================

/**
 * Maps topic IDs to thematically related topics across different categories.
 * These clusters connect topics that share underlying themes even when they
 * belong to different categories (e.g., criminal justice, energy/environment).
 */
export const CROSS_CATEGORY_CLUSTERS: Record<string, string[]> = {
  // Criminal justice cluster
  "gun-control-effectiveness": ["death-penalty-deterrence", "police-reform", "drug-decriminalization", "surveillance-public-safety"],
  "death-penalty-deterrence": ["gun-control-effectiveness", "police-reform", "drug-decriminalization", "reparations-slavery"],
  "police-reform": ["gun-control-effectiveness", "death-penalty-deterrence", "surveillance-public-safety", "reparations-slavery"],

  // Energy & environment cluster
  "nuclear-energy-safety": ["climate-change", "ev-environmental-impact", "veganism-environmental-impact", "space-exploration-value"],
  "climate-change": ["nuclear-energy-safety", "ev-environmental-impact", "veganism-environmental-impact", "factory-farming-ban"],
  "ev-environmental-impact": ["nuclear-energy-safety", "climate-change", "veganism-environmental-impact", "lab-grown-meat-adoption"],

  // Economic inequality cluster
  "universal-basic-income": ["wealth-tax", "billionaire-wealth", "gig-economy-regulation", "minimum-wage-effects"],
  "wealth-tax": ["universal-basic-income", "billionaire-wealth", "minimum-wage-effects", "open-borders"],
  "billionaire-wealth": ["wealth-tax", "universal-basic-income", "minimum-wage-effects", "gig-economy-regulation"],

  // AI governance cluster
  "ai-risk": ["ai-content-labeling", "consciousness-ai-systems", "social-media-mental-health", "big-tech-antitrust"],
  "ai-content-labeling": ["ai-risk", "consciousness-ai-systems", "media-bias-democracy", "cancel-culture"],
  "consciousness-ai-systems": ["ai-risk", "ai-content-labeling", "free-will", "simulation-hypothesis"],

  // Tech & society cluster
  "social-media-mental-health": ["social-media-age-limits", "cancel-culture", "big-tech-antitrust", "ai-risk"],
  "social-media-age-limits": ["social-media-mental-health", "cancel-culture", "surveillance-public-safety", "big-tech-antitrust"],
  "big-tech-antitrust": ["social-media-mental-health", "social-media-age-limits", "ai-content-labeling", "media-bias-democracy"],

  // Philosophy cluster
  "simulation-hypothesis": ["free-will", "consciousness-ai-systems", "ai-risk", "meaning-without-religion"],
  "meaning-without-religion": ["free-will", "simulation-hypothesis", "consciousness-ai-systems", "moon-landing"],
  "free-will": ["meaning-without-religion", "simulation-hypothesis", "consciousness-ai-systems", "moon-landing"],

  // Education cluster
  "standardized-testing-debate": ["college-value-proposition", "homeschooling-effectiveness", "mandatory-voting", "foreign-aid-effectiveness"],
  "college-value-proposition": ["standardized-testing-debate", "homeschooling-effectiveness", "remote-work-permanence", "universal-basic-income"],
  "homeschooling-effectiveness": ["college-value-proposition", "standardized-testing-debate", "social-media-age-limits", "meaning-without-religion"],

  // Health & food cluster
  "organic-food-health": ["veganism-environmental-impact", "factory-farming-ban", "lab-grown-meat-adoption", "gene-editing-embryos"],
  "factory-farming-ban": ["organic-food-health", "veganism-environmental-impact", "lab-grown-meat-adoption", "climate-change"],
  "veganism-environmental-impact": ["factory-farming-ban", "organic-food-health", "climate-change", "lab-grown-meat-adoption"],
  "lab-grown-meat-adoption": ["factory-farming-ban", "organic-food-health", "veganism-environmental-impact", "gene-editing-embryos"],
  "psychedelics-mental-health": ["drug-decriminalization", "social-media-mental-health", "meaning-without-religion", "gene-editing-embryos"],
  "gene-editing-embryos": ["organic-food-health", "psychedelics-mental-health", "lab-grown-meat-adoption", "ai-risk"],

  // Governance & democracy cluster
  "mandatory-voting": ["electoral-college-reform", "media-bias-democracy", "cancel-culture", "open-borders"],
  "electoral-college-reform": ["mandatory-voting", "media-bias-democracy", "reparations-slavery", "surveillance-public-safety"],
  "media-bias-democracy": ["cancel-culture", "ai-content-labeling", "mandatory-voting", "big-tech-antitrust"],
  "cancel-culture": ["media-bias-democracy", "social-media-mental-health", "social-media-age-limits", "big-tech-antitrust"],
  "surveillance-public-safety": ["police-reform", "social-media-age-limits", "gun-control-effectiveness", "big-tech-antitrust"],

  // Immigration & global policy cluster
  "open-borders": ["immigration-wage-impact", "universal-basic-income", "reparations-slavery", "foreign-aid-effectiveness"],
  "immigration-wage-impact": ["open-borders", "minimum-wage-effects", "universal-basic-income", "foreign-aid-effectiveness"],
  "reparations-slavery": ["police-reform", "death-penalty-deterrence", "wealth-tax", "electoral-college-reform"],
  "foreign-aid-effectiveness": ["open-borders", "immigration-wage-impact", "universal-healthcare", "space-exploration-value"],

  // Work & economy cluster
  "remote-work-permanence": ["gig-economy-regulation", "college-value-proposition", "universal-basic-income", "minimum-wage-effects"],
  "gig-economy-regulation": ["remote-work-permanence", "minimum-wage-effects", "billionaire-wealth", "universal-basic-income"],
  "minimum-wage-effects": ["universal-basic-income", "gig-economy-regulation", "immigration-wage-impact", "remote-work-permanence"],
  "cryptocurrency-value": ["big-tech-antitrust", "wealth-tax", "gig-economy-regulation", "surveillance-public-safety"],

  // Healthcare cluster
  "universal-healthcare": ["universal-basic-income", "drug-decriminalization", "psychedelics-mental-health", "foreign-aid-effectiveness"],
  "drug-decriminalization": ["psychedelics-mental-health", "police-reform", "universal-healthcare", "gun-control-effectiveness"],

  // Space & science cluster
  "space-exploration-value": ["space-colonization-feasibility", "nuclear-energy-safety", "simulation-hypothesis", "climate-change"],
  "space-colonization-feasibility": ["space-exploration-value", "ai-risk", "nuclear-energy-safety", "simulation-hypothesis"],
  "moon-landing": ["space-exploration-value", "simulation-hypothesis", "lab-leak-theory", "media-bias-democracy"],
  "lab-leak-theory": ["surveillance-public-safety", "media-bias-democracy", "us-iran-conflict", "epstein-files"],
  "minneapolis-shooting": ["police-reform", "media-bias-democracy", "gun-control-effectiveness", "cancel-culture"],

  // Geopolitics & accountability cluster
  "us-iran-conflict": ["surveillance-public-safety", "media-bias-democracy", "lab-leak-theory", "epstein-files"],
  "epstein-files": ["police-reform", "surveillance-public-safety", "media-bias-democracy", "us-iran-conflict"],

  // Reproduction & demographics cluster
  "artificial-reproduction-ethics": ["gene-editing-embryos", "declining-birth-rates", "longevity-science", "consciousness-hard-problem"],
  "declining-birth-rates": ["housing-affordability-crisis", "universal-basic-income", "artificial-reproduction-ethics", "masculinity-crisis"],

  // Tech & society cluster (new topics)
  "government-platform-bans": ["big-tech-antitrust", "surveillance-public-safety", "social-media-age-limits", "ai-deepfakes-truth-collapse"],
  "children-smartphone-age": ["social-media-age-limits", "social-media-mental-health", "school-phone-bans", "masculinity-crisis"],
  "ai-deepfakes-truth-collapse": ["ai-content-labeling", "media-bias-democracy", "surveillance-public-safety", "ai-risk"],

  // Policy cluster (new topics)
  "gain-of-function-research-ban": ["lab-leak-theory", "surveillance-public-safety", "covid-origins", "ai-risk"],

  // Economics cluster (new topics)
  "cryptocurrency-regulation": ["cryptocurrency-value", "central-bank-digital-currency", "big-tech-antitrust", "ai-regulation"],
  "central-bank-digital-currency": ["cryptocurrency-value", "cryptocurrency-regulation", "surveillance-public-safety", "wealth-tax"],

  // Philosophy cluster (new topics)
  "alternatives-to-democracy": ["mandatory-voting", "electoral-college-reform", "media-bias-democracy", "free-will"],
  "masculinity-crisis": ["social-media-mental-health", "meaning-without-religion", "children-smartphone-age", "declining-birth-rates"],

  // Climate/environment cluster (new topics)
  "geoengineering-climate": ["climate-change", "nuclear-energy-safety", "space-colonization-feasibility", "ev-environmental-impact"],

  // New topics batch 2 clusters
  "longevity-anti-aging": ["gene-editing-embryos", "glp1-weight-loss-drugs", "ai-risk", "declining-birth-rates"],
  "nuclear-proliferation-new-arms-race": ["us-iran-conflict", "surveillance-public-safety", "alternatives-to-democracy", "foreign-aid-effectiveness"],
  "transgender-athletes-sports": ["cancel-culture", "gender-affirming-care-minors", "masculinity-crisis", "social-media-mental-health"],
  "animal-consciousness-rights": ["consciousness-ai-systems", "factory-farming-ban", "veganism-environmental-impact", "meaning-without-religion"],
  "immigration-national-identity": ["immigration-wage-impact", "open-borders", "declining-birth-rates", "housing-affordability-crisis"],
  "psychedelic-therapy-hype": ["psychedelics-mental-health", "drug-decriminalization", "glp1-weight-loss-drugs", "social-media-mental-health"],
};

/**
 * Returns cross-category related topics for a given topic ID.
 * These are thematically related topics from DIFFERENT categories.
 * Returns up to `limit` topics, excluding the current topic and any
 * topics already shown as same-category related.
 */
export function getCrossCategoryRelated(
  topicId: string,
  currentCategory: TopicCategory,
  limit = 4
): Topic[] {
  const clusterIds = CROSS_CATEGORY_CLUSTERS[topicId] ?? [];
  return clusterIds
    .map((id) => topics.find((t) => t.id === id))
    .filter((t): t is Topic => t != null && t.category !== currentCategory)
    .slice(0, limit);
}
