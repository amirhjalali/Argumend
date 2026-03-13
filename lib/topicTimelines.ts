// ============================================================================
// Confidence Timeline Data
// ============================================================================
// Tracks how public/expert confidence in a topic has evolved over time,
// with key events as inflection points.

export interface TimelineEvent {
  year: number;
  confidence: number; // 0-100
  event: string; // Brief description
  source?: string;
}

export const TOPIC_TIMELINES: Record<string, TimelineEvent[]> = {
  "nuclear-energy-safety": [
    { year: 1945, confidence: 18, event: "Hiroshima & Nagasaki -- public fear of nuclear technology peaks" },
    { year: 1954, confidence: 62, event: "Eisenhower's 'Atoms for Peace' speech reframes narrative" },
    { year: 1965, confidence: 70, event: "First commercial reactors online; optimism about cheap energy" },
    { year: 1979, confidence: 32, event: "Three Mile Island partial meltdown in Pennsylvania" },
    { year: 1986, confidence: 14, event: "Chernobyl disaster; global anti-nuclear movement surges" },
    { year: 1996, confidence: 28, event: "CTBT signed; new safety standards but public trust slow to recover" },
    { year: 2005, confidence: 42, event: "Nuclear renaissance talk; climate concerns raise interest" },
    { year: 2011, confidence: 24, event: "Fukushima Daiichi disaster; Germany phases out nuclear" },
    { year: 2019, confidence: 48, event: "Climate urgency brings nuclear back into mainstream debate" },
    { year: 2022, confidence: 58, event: "EU includes nuclear in green taxonomy; energy crisis shifts views" },
    { year: 2024, confidence: 68, event: "SMR breakthroughs; tech leaders back nuclear for AI data centers" },
  ],

  "lab-leak-theory": [
    { year: 2020, confidence: 15, event: "Early pandemic; lab-leak idea dismissed as conspiracy" },
    { year: 2021, confidence: 35, event: "WHO investigation inconclusive; media begins revisiting" },
    { year: 2022, confidence: 42, event: "Senate report supports lab-leak hypothesis" },
    { year: 2023, confidence: 55, event: "FBI and DOE assess lab leak as most likely origin" },
    { year: 2024, confidence: 60, event: "Declassified intelligence reports add weight; debate intensifies" },
    { year: 2025, confidence: 65, event: "Bipartisan congressional inquiry; WIV database still offline" },
  ],

  "climate-change": [
    { year: 1896, confidence: 10, event: "Arrhenius first calculates CO2 greenhouse effect" },
    { year: 1958, confidence: 18, event: "Keeling begins CO2 measurements at Mauna Loa" },
    { year: 1988, confidence: 35, event: "Hansen testifies to Congress; IPCC established" },
    { year: 1997, confidence: 48, event: "Kyoto Protocol signed; first global climate agreement" },
    { year: 2006, confidence: 58, event: "'An Inconvenient Truth' brings climate to mainstream" },
    { year: 2013, confidence: 72, event: "IPCC AR5: 95% certainty humans are dominant cause" },
    { year: 2018, confidence: 80, event: "IPCC 1.5C report warns of tipping points" },
    { year: 2021, confidence: 88, event: "IPCC AR6: 'unequivocal' human causation; code red for humanity" },
    { year: 2023, confidence: 92, event: "Hottest year on record; 97%+ scientific consensus" },
  ],

  "ai-risk": [
    { year: 1950, confidence: 10, event: "Turing proposes thinking machines; risk not yet discussed" },
    { year: 1965, confidence: 15, event: "I.J. Good coins 'intelligence explosion' concept" },
    { year: 1993, confidence: 20, event: "Vinge's 'The Coming Technological Singularity'" },
    { year: 2014, confidence: 35, event: "Bostrom's 'Superintelligence' reaches mainstream" },
    { year: 2015, confidence: 40, event: "Open letter signed by thousands of AI researchers" },
    { year: 2017, confidence: 38, event: "Asilomar AI principles; but some push back as premature" },
    { year: 2020, confidence: 42, event: "GPT-3 surprises researchers with emergent capabilities" },
    { year: 2023, confidence: 62, event: "GPT-4 launch; Hinton quits Google to warn about AI risk" },
    { year: 2024, confidence: 68, event: "AI safety summits; major labs sign safety commitments" },
    { year: 2025, confidence: 72, event: "Frontier models approach human-level reasoning; regulation debates intensify" },
  ],

  "cryptocurrency-value": [
    { year: 2009, confidence: 5, event: "Bitcoin whitepaper; only cypherpunks pay attention" },
    { year: 2013, confidence: 18, event: "First major price spike to $1,000; Silk Road seized" },
    { year: 2017, confidence: 45, event: "ICO boom; Bitcoin hits $20K; mainstream frenzy" },
    { year: 2018, confidence: 22, event: "Crypto winter; ICO scams exposed; 80% drawdown" },
    { year: 2020, confidence: 35, event: "DeFi summer; institutional interest begins" },
    { year: 2021, confidence: 55, event: "Bitcoin hits $69K; El Salvador adopts as legal tender" },
    { year: 2022, confidence: 25, event: "FTX collapses; Terra/Luna crash; contagion spreads" },
    { year: 2024, confidence: 58, event: "Bitcoin ETFs approved; institutional adoption accelerates" },
    { year: 2025, confidence: 52, event: "Regulatory clarity emerging; market maturing but volatility persists" },
  ],

  "gene-editing-embryos": [
    { year: 2012, confidence: 20, event: "CRISPR-Cas9 discovery; gene editing becomes accessible" },
    { year: 2015, confidence: 28, event: "Chinese scientists edit human embryos for first time" },
    { year: 2017, confidence: 32, event: "NAS report cautiously opens door to germline editing" },
    { year: 2018, confidence: 18, event: "He Jiankui edits twins; global scientific outrage" },
    { year: 2020, confidence: 25, event: "He sentenced to prison; moratorium calls intensify" },
    { year: 2023, confidence: 38, event: "Base editing advances; sickle cell therapy approved" },
    { year: 2025, confidence: 42, event: "Somatic CRISPR therapies succeed; germline debate continues" },
  ],

  "universal-basic-income": [
    { year: 1795, confidence: 15, event: "Thomas Paine proposes citizen's dividend in 'Agrarian Justice'" },
    { year: 1962, confidence: 22, event: "Milton Friedman proposes negative income tax" },
    { year: 1974, confidence: 30, event: "Manitoba MINCOME experiment shows promising results" },
    { year: 2008, confidence: 18, event: "Global financial crisis; UBI still fringe" },
    { year: 2016, confidence: 35, event: "Finland UBI pilot begins; Silicon Valley advocates emerge" },
    { year: 2017, confidence: 40, event: "Stockton SEED experiment; automation fears grow" },
    { year: 2020, confidence: 52, event: "COVID stimulus checks normalize direct payments" },
    { year: 2021, confidence: 48, event: "Pilot results mixed; expanded Child Tax Credit works" },
    { year: 2023, confidence: 42, event: "AI automation fears renew interest; but inflation concerns" },
    { year: 2025, confidence: 45, event: "Multiple city pilots ongoing; political will still uncertain" },
  ],

  "moon-landing": [
    { year: 1969, confidence: 94, event: "Apollo 11 moon landing; global celebration" },
    { year: 1976, confidence: 82, event: "'We Never Went to the Moon' published; conspiracy begins" },
    { year: 1999, confidence: 78, event: "Fox TV special 'Conspiracy Theory'; 6% of Americans doubt" },
    { year: 2001, confidence: 80, event: "Mythbusters and debunkers counter conspiracy claims" },
    { year: 2009, confidence: 85, event: "LRO photographs Apollo landing sites from orbit" },
    { year: 2019, confidence: 88, event: "50th anniversary; overwhelming evidence reviewed" },
    { year: 2024, confidence: 90, event: "New retroreflector laser measurements; Artemis program advances" },
  ],

  "cancel-culture": [
    { year: 2013, confidence: 20, event: "Early social media callouts; term not yet coined" },
    { year: 2017, confidence: 45, event: "#MeToo movement; accountability vs. mob justice debate" },
    { year: 2019, confidence: 55, event: "Obama warns against 'callout culture'; term goes mainstream" },
    { year: 2020, confidence: 60, event: "Harper's open letter on 'cancel culture'; peak cultural debate" },
    { year: 2021, confidence: 52, event: "Pushback grows; 'cancel culture' itself questioned as concept" },
    { year: 2023, confidence: 42, event: "Fatigue sets in; platforms shift moderation approaches" },
    { year: 2025, confidence: 38, event: "Nuanced view prevails; accountability vs. silencing distinction" },
  ],

  "space-colonization-feasibility": [
    { year: 1961, confidence: 15, event: "Gagarin's spaceflight; colonization seems centuries away" },
    { year: 1969, confidence: 35, event: "Moon landing; Mars by 1990 seems plausible" },
    { year: 1975, confidence: 20, event: "Apollo cancelled; O'Neill proposes space habitats" },
    { year: 2002, confidence: 18, event: "SpaceX founded; private space era begins slowly" },
    { year: 2012, confidence: 25, event: "SpaceX reaches ISS; reusable rockets in development" },
    { year: 2015, confidence: 35, event: "Falcon 9 lands successfully; Mars colonization plan unveiled" },
    { year: 2020, confidence: 42, event: "Crew Dragon flies astronauts; Starship prototypes tested" },
    { year: 2023, confidence: 38, event: "Starship reaches orbit; but Mars colonization timeline unclear" },
    { year: 2025, confidence: 45, event: "Artemis III planned; orbital infrastructure growing" },
  ],

  "veganism-environmental-impact": [
    { year: 1944, confidence: 8, event: "Vegan Society founded; environmental angle rarely discussed" },
    { year: 2006, confidence: 25, event: "UN FAO: livestock responsible for 18% of GHG emissions" },
    { year: 2014, confidence: 35, event: "'Cowspiracy' documentary reaches mass audience" },
    { year: 2018, confidence: 48, event: "Oxford study: going vegan is 'single biggest way to reduce impact'" },
    { year: 2019, confidence: 55, event: "EAT-Lancet planetary health diet published" },
    { year: 2021, confidence: 52, event: "Debate over regenerative agriculture as alternative" },
    { year: 2023, confidence: 58, event: "IPCC emphasizes dietary shift; lab-grown meat advances" },
    { year: 2025, confidence: 55, event: "Nuance grows: 'reduce' vs. 'eliminate' animal products" },
  ],

  "free-will": [
    { year: 1690, confidence: 75, event: "Locke's 'Essay': free will as foundation of moral responsibility" },
    { year: 1814, confidence: 55, event: "Laplace's demon: determinism challenges free will" },
    { year: 1927, confidence: 60, event: "Heisenberg uncertainty principle; quantum indeterminacy" },
    { year: 1983, confidence: 45, event: "Libet experiments: brain activity precedes conscious decisions" },
    { year: 2008, confidence: 38, event: "Soon et al.: decisions detectable 10 seconds before awareness" },
    { year: 2016, confidence: 42, event: "Compatibilism gains ground; reframing the debate" },
    { year: 2023, confidence: 35, event: "Sapolsky's 'Determined': no free will, full stop" },
    { year: 2025, confidence: 40, event: "Neuroscience debate ongoing; compatibilism vs. hard determinism" },
  ],

  "social-media-mental-health": [
    { year: 2004, confidence: 10, event: "Facebook launches; social media's mental health impact unstudied" },
    { year: 2012, confidence: 22, event: "Early correlational studies link social media to anxiety" },
    { year: 2017, confidence: 40, event: "Teen depression spikes; smartphone generation research" },
    { year: 2019, confidence: 48, event: "Internal Facebook research shows harm to teen girls" },
    { year: 2021, confidence: 62, event: "Facebook whistleblower; 'The Social Dilemma' documentary" },
    { year: 2023, confidence: 68, event: "Surgeon General advisory on social media and youth" },
    { year: 2024, confidence: 72, event: "Haidt's 'The Anxious Generation'; school phone bans spread" },
    { year: 2025, confidence: 65, event: "Meta studies complicate picture; correlation vs. causation debate" },
  ],

  "simulation-hypothesis": [
    { year: 2003, confidence: 15, event: "Bostrom publishes simulation argument in Philosophical Quarterly" },
    { year: 2012, confidence: 18, event: "Silas Beane proposes testable signatures of simulation" },
    { year: 2016, confidence: 25, event: "Elon Musk: 'odds we're in base reality is one in billions'" },
    { year: 2019, confidence: 20, event: "Physicists push back; unfalsifiability concerns grow" },
    { year: 2022, confidence: 22, event: "Renewed interest via quantum computing and information theory" },
    { year: 2025, confidence: 20, event: "Remains philosophically interesting but empirically untestable" },
  ],

  "death-penalty-deterrence": [
    { year: 1764, confidence: 60, event: "Beccaria questions deterrent effect in 'On Crimes and Punishments'" },
    { year: 1972, confidence: 35, event: "Furman v. Georgia: Supreme Court halts executions temporarily" },
    { year: 1976, confidence: 45, event: "Gregg v. Georgia: death penalty reinstated" },
    { year: 2003, confidence: 30, event: "Liebman study: 68% of death sentences overturned on appeal" },
    { year: 2012, confidence: 28, event: "NAS report: no reliable evidence death penalty deters crime" },
    { year: 2019, confidence: 25, event: "Most democracies have abolished; US executions decline" },
    { year: 2024, confidence: 22, event: "Innocence exonerations continue; public support declining" },
  ],
};

/**
 * Check if a topic has timeline data.
 */
export function hasTimeline(topicId: string): boolean {
  return topicId in TOPIC_TIMELINES && TOPIC_TIMELINES[topicId].length > 0;
}

/**
 * Get timeline data for a topic.
 */
export function getTimeline(topicId: string): TimelineEvent[] | null {
  return TOPIC_TIMELINES[topicId] ?? null;
}
