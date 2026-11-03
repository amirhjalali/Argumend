export type GeneratedMediaKind = "blog" | "guide" | "topic";

export interface GeneratedImageAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly prompt: string;
}

export interface GeneratedMedia {
  readonly kind: GeneratedMediaKind;
  readonly id: string;
  readonly hero: GeneratedImageAsset;
}

const IMAGE_DIMENSIONS = {
  width: 1672,
  height: 941,
} as const;

const basePrompt =
  "Warm parchment-toned editorial watercolor illustration for Argumend, abstract argument-map composition, deep teal and muted rust accents, fine ink linework, subtle paper grain, no readable text, no logos, no public figures, no sensational imagery.";

// Topic-map heroes (round 15, GPT Image via Codex): the house prompt plus one
// specific scene per map, held to the palette and kept calm. Saturated
// orange/amber hues were pulled toward brick rust after generation, and the
// files were saved as 1672x941 progressive JPEG at quality 82.
const topicHeroStyle =
  "A few faint hairline ink dots and threads connect the motifs, subtle, never boxes or flowchart shapes. Restrained, desaturated palette of parchment cream, deep teal, muted brick rust, warm brown and stone grey; no amber, no orange, no gold, no bright red. Grown-up editorial mood, not a storybook. One clear focal motif, calm open parchment space, no human faces, no words, letters or numbers anywhere.";

function topicHeroPrompt(scene: string): string {
  return `Format: wide 16:9 horizontal banner. ${basePrompt} Scene: ${scene} ${topicHeroStyle}`;
}

export const generatedMedia = [
  {
    kind: "guide",
    id: "how-to-read-an-argument-map",
    hero: {
      src: "/images/generated/guides/how-to-read-an-argument-map/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Abstract argument map with evidence paths and a central claim node.",
      prompt: `${basePrompt} Central claim node, three evidence paths, crux marker, and balanced supporting and opposing nodes.`,
    },
  },
  {
    kind: "guide",
    id: "evidence-hierarchy",
    hero: {
      src: "/images/generated/guides/evidence-hierarchy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Evidence hierarchy pyramid with source cards and balance motifs.",
      prompt: `${basePrompt} Evidence pyramid made from source cards, balance scale, source markers, and reliability tiers.`,
    },
  },
  {
    kind: "guide",
    id: "triangulation",
    hero: {
      src: "/images/generated/guides/triangulation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Three independent evidence paths converging on one verified point.",
      prompt: `${basePrompt} Three independent source paths converging on a verified point, triangulation and compass motifs.`,
    },
  },
  {
    kind: "blog",
    id: "did-covid-come-from-a-lab",
    hero: {
      src: "/images/generated/blog/did-covid-come-from-a-lab/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two unresolved evidence trails around a locked archive.",
      prompt: `${basePrompt} Two evidence trails, market symbol and lab-notebook symbol, locked missing-data archive, no literal virus, no real people or places.`,
    },
  },
  {
    kind: "blog",
    id: "could-ai-be-conscious",
    hero: {
      src: "/images/generated/blog/could-ai-be-conscious/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Abstract cognition signals branching around an uncertain awareness node.",
      prompt: `${basePrompt} Layered cognition signals, central uncertain awareness node, neuroscience, behavior, and philosophy evidence paths, calibrated confidence markers.`,
    },
  },
  {
    kind: "blog",
    id: "is-fluoride-in-water-safe",
    hero: {
      src: "/images/generated/blog/is-fluoride-in-water-safe/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Water safety margin diagram with dental and dose threshold symbols.",
      prompt: `${basePrompt} Measured safety-margin diagram with water droplet motifs, dental enamel symbol, dose threshold bands, evidence cards, and benefit-risk balance.`,
    },
  },
  {
    kind: "blog",
    id: "are-gmos-safe",
    hero: {
      src: "/images/generated/blog/are-gmos-safe/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Food safety evidence map with crop, genome, and policy branches.",
      prompt: `${basePrompt} Crop leaves, genome fragments, food safety evidence cards, verified eating-safety node, and separate branches for environmental and policy questions.`,
    },
  },
  {
    kind: "blog",
    id: "are-vaccine-mandates-justified",
    hero: {
      src: "/images/generated/blog/are-vaccine-mandates-justified/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Policy decision map balancing disease, trust, liberty, and protection nodes.",
      prompt: `${basePrompt} Branching policy decision map with disease severity, transmission protection, public trust, liberty cost, abstract shield, and community network motifs.`,
    },
  },
  {
    kind: "blog",
    id: "fact-or-value",
    hero: {
      src: "/images/generated/blog/fact-or-value/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Fact and value threads separating and recombining around a clarified crux.",
      prompt: `${basePrompt} Two intertwined threads separating into fact-evidence cards and value-compass symbols, then recombining around a clarified crux.`,
    },
  },
  {
    kind: "blog",
    id: "what-would-change-your-mind",
    hero: {
      src: "/images/generated/blog/what-would-change-your-mind/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Belief path passing through a crux gate toward updated evidence.",
      prompt: `${basePrompt} Belief marker connected to evidence paths shifting through a crux gate, falsifiability and updating motifs.`,
    },
  },
  {
    kind: "blog",
    id: "why-steel-manning-makes-you-smarter",
    hero: {
      src: "/images/generated/blog/why-steel-manning-makes-you-smarter/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A fragile argument structure rebuilt into a stronger supported frame.",
      prompt: `${basePrompt} Fragile straw outline transforming into a reinforced argument structure, opposing evidence cards strengthened before evaluation, bridge and scaffold motifs.`,
    },
  },
  {
    kind: "blog",
    id: "5-logical-fallacies-in-online-debates",
    hero: {
      src: "/images/generated/blog/5-logical-fallacies-in-online-debates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Five distorted reasoning paths around a central argument map.",
      prompt: `${basePrompt} Five distorted reasoning paths marked by false fork, personal attack target, slippery slope curve, circular loop, and weak analogy bridge.`,
    },
  },
  {
    kind: "blog",
    id: "how-confidence-scores-change-thinking",
    hero: {
      src: "/images/generated/blog/how-confidence-scores-change-thinking/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Confidence gauge and evidence paths updating a belief marker.",
      prompt: `${basePrompt} Calibrated probability markers, confidence gauge, evidence cards shifting a belief marker from uncertainty toward a quantified range, Bayesian update arcs.`,
    },
  },
  {
    kind: "blog",
    id: "nuclear-energy-what-both-sides-get-right",
    hero: {
      src: "/images/generated/blog/nuclear-energy-what-both-sides-get-right/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Balanced nuclear energy argument map with benefit and risk paths.",
      prompt: `${basePrompt} Balanced energy debate map with reactor-core symbol, grid lines, climate benefit path, waste and safety risk path, and central crux node.`,
    },
  },
  {
    kind: "blog",
    id: "argue-against-your-own-beliefs",
    hero: {
      src: "/images/generated/blog/argue-against-your-own-beliefs/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Belief marker turned toward its own counter-evidence in a mirrored map.",
      prompt: `${basePrompt} Belief marker turning toward its own counter-evidence, mirror-like evidence map, disconfirming source cards, and intellectual humility compass.`,
    },
  },
  {
    kind: "blog",
    id: "what-is-a-crux-and-why-it-matters",
    hero: {
      src: "/images/generated/blog/what-is-a-crux-and-why-it-matters/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Central crux node holding up two opposing argument structures.",
      prompt: `${basePrompt} Central load-bearing crux node holding up two opposing argument structures, branching evidence paths, hinge and keystone motifs.`,
    },
  },
  {
    kind: "blog",
    id: "dunning-kruger-in-political-debates",
    hero: {
      src: "/images/generated/blog/dunning-kruger-in-political-debates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Confidence curve with a false peak and a calibrated plateau.",
      prompt: `${basePrompt} Confidence mountain with a high false peak and a lower calibrated plateau, evidence markers correcting overconfidence, abstract disagreement paths.`,
    },
  },
  {
    kind: "blog",
    id: "how-to-tell-if-a-source-is-trustworthy",
    hero: {
      src: "/images/generated/blog/how-to-tell-if-a-source-is-trustworthy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Secondary source cards traced back through a magnifier to an original primary record.",
      prompt: `${basePrompt} Stack of overlapping document cards traced by a thin ink line back to an original primary record, provenance markers, magnifier aperture, three corroborating paths converging.`,
    },
  },
  {
    kind: "blog",
    id: "assisted-dying-both-sides",
    hero: {
      src: "/images/generated/blog/assisted-dying-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A nearly level balance beam weighing a teal autonomy cluster against a brown protection cluster.",
      prompt: `${basePrompt} Nearly level balance beam, teal autonomy node cluster on one arm and warm brown protection-of-the-vulnerable cluster on the other, crimson marker at the fulcrum, protective arc, no human figures.`,
    },
  },
  {
    kind: "blog",
    id: "cherry-picking-fallacy-explained",
    hero: {
      src: "/images/generated/blog/cherry-picking-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A few evidence marks lifted from a ghosted field into a tidy row implying a false trend.",
      prompt: `${basePrompt} Wide field of faint ghosted evidence marks with a handful lifted out into a tidy rust row implying a false trend line, crimson outline around the omitted majority.`,
    },
  },
  {
    kind: "blog",
    id: "how-to-read-a-scientific-study",
    hero: {
      src: "/images/generated/blog/how-to-read-a-scientific-study/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An open journal page annotated with leader lines to sample size, interval, and caveat blocks.",
      prompt: `${basePrompt} Open journal page rendered as blocks and rules, teal leader lines to a sample-size cluster and a confidence-interval bracket, rust arrow curving away from causation, crimson footnote marker.`,
    },
  },
  {
    kind: "blog",
    id: "immigration-economy-both-sides",
    hero: {
      src: "/images/generated/blog/immigration-economy-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two opposing economic node lattices meeting at a small crimson crux aperture.",
      prompt: `${basePrompt} Teal lattice of labour and growth nodes expanding from the left against a rust cluster of wage and absorption-capacity nodes pressing from the right, crimson crux aperture at the midpoint, no flags or borders.`,
    },
  },
  {
    kind: "topic",
    id: "ai-risk",
    hero: {
      src: "/images/generated/topics/ai-risk/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Branching future paths from a central AI capability node.",
      prompt: `${basePrompt} Branching future paths from a central capability node, safety constraints and uncertain crimson crux aperture, no robots.`,
    },
  },
  {
    kind: "topic",
    id: "climate-change",
    hero: {
      src: "/images/generated/topics/climate-change/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Climate evidence streams converging into a temperature trend.",
      prompt: `${basePrompt} Evidence paths converging on a temperature-trend signal, atmosphere and ice-core motifs, no disaster scene.`,
    },
  },
  {
    kind: "topic",
    id: "moon-landing",
    hero: {
      src: "/images/generated/topics/moon-landing/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Lunar evidence trails converging on a verified node.",
      prompt: `${basePrompt} Retroreflector beam, lunar trace, telemetry archive, orbital photograph card converging to a verified node, no flag dominance.`,
    },
  },
  {
    kind: "topic",
    id: "sports-betting-legalization",
    hero: {
      src: "/images/generated/topics/sports-betting-legalization/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A stadium seen from above, with a pair of dice and a smartphone on the field and a rust spiral of wagers swirling around them.",
      prompt: topicHeroPrompt(
        "A stadium bowl drawn as an architectural plan seen from above, a pair of dice and a smartphone outline with a blank teal-glowing screen resting on the turf, a rust spiral of mounting wagers swirling toward a small crimson crux mark. No logos, no team names, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "pfas-forever-chemicals",
    hero: {
      src: "/images/generated/topics/pfas-forever-chemicals/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glass of tap water on a windowsill between a non-stick pan and a rain jacket, with beaded molecular chains sinking through soil into groundwater.",
      prompt: topicHeroPrompt(
        "A glass of tap water on a kitchen windowsill beside a non-stick pan and a folded rain jacket, tiny beaded molecular chains drifting down through a cross-section of soil and groundwater strata in teal and rust. No warning signs, no skulls, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "intermittent-fasting-efficacy",
    hero: {
      src: "/images/generated/topics/intermittent-fasting-efficacy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A dinner plate drawn as a clock, its rim half teal for the fasting window and half rust for the eating window, flanked by a fork and a knife.",
      prompt: topicHeroPrompt(
        "A dinner plate drawn as a clock face without numerals, half its rim washed deep teal as the fasting window and half muted rust as the eating window, cutlery resting at its edge, gentle metabolic curves rising and falling around it. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "daylight-saving-time-abolition",
    hero: {
      src: "/images/generated/topics/daylight-saving-time-abolition/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two clock faces with shifted hands between a rising sun and a crescent moon over a village, with teal morning and rust evening paths meeting below.",
      prompt: topicHeroPrompt(
        "Two antique clock faces without numerals side by side, one minute hand visibly shifted, a sun arc and a moon arc over a sleeping village of rooftops, a teal path of morning light and a rust path of evening light meeting at a small crimson crux mark.",
      ),
    },
  },
  {
    kind: "topic",
    id: "tipping-culture",
    hero: {
      src: "/images/generated/topics/tipping-culture/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A cafe table with an empty coffee cup, a receipt tray with coins and a card reader, with rust service-wage and teal menu-price paths meeting above.",
      prompt: topicHeroPrompt(
        "A cafe table after a meal: an empty coffee cup, a small tray with a blank folded receipt and a few coins, a card reader with a blank teal-glowing screen, a rust path of service wages and a teal path of menu prices meeting at a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-therapy-chatbots",
    hero: {
      src: "/images/generated/topics/ai-therapy-chatbots/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A counselling room with two armchairs: one with a throw and cushion, the other holding a glowing teal lantern of conversation nodes, and tissues on a side table.",
      prompt: topicHeroPrompt(
        "A quiet counselling room with two armchairs facing each other, one empty and the other holding a softly glowing teal lantern made of conversation nodes, a box of tissues and a closed notebook on a side table, a rust thread of human presence. No faces, no robots, no screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "carbon-capture-viability",
    hero: {
      src: "/images/generated/topics/carbon-capture-viability/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A factory chimney whose plume is piped deep into rock strata as stored dark beads, with a row of direct-air-capture fans on the hillside.",
      prompt: topicHeroPrompt(
        "An industrial chimney whose soft plume is drawn down through a long teal pipe into deep rock strata, a geological cross-section showing stored carbon as dark beads, a row of direct-air-capture fans on a hillside. No flames, no disaster.",
      ),
    },
  },
  {
    kind: "topic",
    id: "hydrogen-economy-viability",
    hero: {
      src: "/images/generated/topics/hydrogen-economy-viability/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal hydrogen molecule above an electrolysis tank, with pipes branching to a steel mill, a cargo ship and a truck, and one branch fading out unfinished.",
      prompt: topicHeroPrompt(
        "A translucent teal hydrogen molecule pair hovering over an electrolysis tank, clean pipelines branching toward a steel mill, a cargo ship and a truck, some branches fading out unfinished, faint pale wisps escaping at two joints, a small crimson crux mark at the main junction. No drips, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "vertical-farming-viability",
    hero: {
      src: "/images/generated/topics/vertical-farming-viability/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An indoor tower of stacked lettuce trays under teal grow-lights beside an open field of crops under the sky, joined by a power cable that meets at a crux mark.",
      prompt: topicHeroPrompt(
        "A tall indoor tower of stacked lettuce trays under soft teal grow-lights stands beside a wide open field of crops under the natural sky, a power cable running between them to a small crimson crux mark. No people, no labels, no purple light.",
      ),
    },
  },
  {
    kind: "topic",
    id: "de-extinction-species",
    hero: {
      src: "/images/generated/topics/de-extinction-species/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A specimen drawer with a mammoth skeleton and a thylacine sketch, and a teal DNA helix unspooling into a tundra where a mammoth walks.",
      prompt: topicHeroPrompt(
        "A natural-history specimen drawer holding a woolly mammoth skeleton sketch and a thylacine silhouette, a DNA double helix of fine teal beads unspooling into a living tundra landscape, a rust path of ecological risk. No labels, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "scott-cost-disease",
    hero: {
      src: "/images/generated/topics/scott-cost-disease/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Steep rust staircases climbing to a school, a hospital and a house, beside a gentle teal slope carrying a radio, a bicycle and a teapot, with a protractor measuring the gap.",
      prompt: topicHeroPrompt(
        "Three steep rust staircases climbing upward toward a schoolhouse, a hospital and a house, beside a gentle teal downward slope carrying a radio, a bicycle and a teapot, an architect's protractor measuring the widening gap between them. No numbers, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "moloch",
    hero: {
      src: "/images/generated/topics/moloch/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Many small rowing boats straining around a dark whirlpool on a rough sea, while a lighthouse on the shore casts a calm beam across them.",
      prompt: topicHeroPrompt(
        "Many small rowing boats on a parchment sea, each straining in a different direction around a slow dark whirlpool, while a single teal lighthouse of coordination stands at the edge casting a calm beam across them. Symbolic and quiet. No monsters, no idols, no flames, no people visible.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-2027",
    hero: {
      src: "/images/generated/topics/ai-2027/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A spiral staircase of teal nodes built step by step by mechanical drafting arms, beside a turning calendar wheel, forking into a rust branch near the top.",
      prompt: topicHeroPrompt(
        "A spiral staircase of teal circuit nodes climbing upward, each turn drafted by small mechanical drawing arms that build the next step, a calendar wheel without numerals turning beside it, a rust fork in the stairs near the top with a small crimson crux mark. No robots with faces.",
      ),
    },
  },
  {
    kind: "topic",
    id: "jones-act",
    hero: {
      src: "/images/generated/topics/jones-act/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A harbour where one domestic cargo ship is moored between two home ports, with larger freighters waiting offshore beyond a dotted line.",
      prompt: topicHeroPrompt(
        "A coastal harbour chart: one domestic cargo ship moored between two home ports along a coastline, larger freighters waiting offshore beyond a dotted teal line, cargo cranes and stacked shipping containers in muted rust. No flags, no ship names.",
      ),
    },
  },
  {
    kind: "topic",
    id: "medicaid-work-requirements",
    hero: {
      src: "/images/generated/topics/medicaid-work-requirements/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A clinic door beside a stack of paperwork and a punch clock, with teal coverage and rust work-hours paths winding through a maze of filing cabinets.",
      prompt: topicHeroPrompt(
        "A clinic door beside a tall stack of blank paperwork forms and an old time-card punch clock, a teal path of coverage and a rust path of work hours winding through a maze of filing cabinets to a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "data-centers-electricity-bills",
    hero: {
      src: "/images/generated/topics/data-centers-electricity-bills/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A data center with rows of cooling fans linked by transmission towers to a row of cottages with electric meters, teal and rust current threads crossing between.",
      prompt: topicHeroPrompt(
        "A long low data-center building with rows of cooling fans on a rural plain, high-voltage transmission towers running from it to a row of small houses each with a household electric meter, teal current threads and rust cost threads meeting at a small crimson crux mark. No logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "proof-of-citizenship-voting",
    hero: {
      src: "/images/generated/topics/proof-of-citizenship-voting/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A polling table with a ballot box, a blank registration form and a document folder with an unmarked passport, with teal access and rust verification paths meeting.",
      prompt: topicHeroPrompt(
        "A polling-place table with a wooden ballot box, a blank registration form and an open document folder holding a blank certificate sheet and an unmarked passport-like booklet, a teal path of access and a rust path of verification meeting at a small crimson crux mark. No flags, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "nuclear-energy-safety",
    hero: {
      src: "/images/generated/topics/nuclear-energy-safety/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A riverside nuclear station with two cooling towers and power lines to a distant city, above a cross-section showing a sealed waste cask in a rock vault.",
      prompt: topicHeroPrompt(
        "A calm nuclear power station with twin cooling towers releasing white vapour beside a river, a power line running to a distant city, a sealed teal waste cask in a rock-vault cross-section below, a thin rust thread of risk, a small crimson crux mark. No hazard symbols, no disaster.",
      ),
    },
  },
  {
    kind: "topic",
    id: "universal-healthcare",
    hero: {
      src: "/images/generated/topics/universal-healthcare/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A large teal umbrella sheltering houses and a hospital, with a stethoscope on a pile of bills and rust cost and teal coverage paths meeting below.",
      prompt: topicHeroPrompt(
        "A large protective umbrella drawn in teal ink over a row of small houses and a hospital, a stethoscope coiled on a ledger of blank bills, a rust path of cost and a teal path of coverage meeting at a small crimson crux mark. No people, no red crosses.",
      ),
    },
  },
  {
    kind: "topic",
    id: "gun-control-effectiveness",
    hero: {
      src: "/images/generated/topics/gun-control-effectiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A town grid mapped from above, with a locked safe-storage box and its key at the centre and teal (studies) and rust (rights) paths meeting at a crux mark.",
      prompt: topicHeroPrompt(
        "A cartographer's survey of a small town grid seen from above, a closed safe-storage lockbox with its key at the centre, fanned ledger cards rising as tally columns, two evidence paths, teal for policy studies and rust for rights and self-defence, meeting at a small crimson crux mark. No firearms, no ammunition, no blood, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "minimum-wage-effects",
    hero: {
      src: "/images/generated/topics/minimum-wage-effects/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale on a shop counter weighing a stack of coins against an open ledger, with wage floors rising behind it as stone steps.",
      prompt: topicHeroPrompt(
        "A small shop counter seen from the side: a balance scale weighing a short stack of coins against the shop's open ledger, wage floors rising as worn stone steps behind it, teal and rust paths meeting at a small crimson crux mark. No people, no currency symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "drug-decriminalization",
    hero: {
      src: "/images/generated/topics/drug-decriminalization/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A park path between a teal-lit clinic doorway and a courthouse portico, with a balance scale weighing a green sprig against a gavel.",
      prompt: topicHeroPrompt(
        "A city park path under a lamp, on one side a clinic doorway lit in soft teal and on the other a courthouse column in stone grey, a balance scale between treatment and penalty, a rust path winding between them to a small crimson crux mark. No drugs, no needles, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "death-penalty-deterrence",
    hero: {
      src: "/images/generated/topics/death-penalty-deterrence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An empty courtroom bench with a gavel, a balance scale, an hourglass and bound case files, before a long dim stone corridor.",
      prompt: topicHeroPrompt(
        "An empty courtroom bench and a gavel resting beside a balance scale, a long dim stone corridor fading into grey perspective, an hourglass and a stack of case files, teal and rust paths meeting at a small crimson crux mark. No execution imagery, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "police-reform",
    hero: {
      src: "/images/generated/topics/police-reform/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A city intersection at dusk seen from above, with a streetlamp's teal pool of light, a dotted patrol route, blank report cards and a circle of empty chairs.",
      prompt: topicHeroPrompt(
        "A quiet city intersection at dusk seen from above, one streetlamp casting a teal pool of light, a patrol route traced as a dotted rust line, a stack of blank incident-report cards and a circle of empty chairs for a community meeting. No officers, no weapons, no sirens, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "mandatory-voting",
    hero: {
      src: "/images/generated/topics/mandatory-voting/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A procession of blank ballot cards flowing into a wooden ballot box, between an open gate on one side and a closing gate on the other.",
      prompt: topicHeroPrompt(
        "A long procession of identical blank ballot cards flowing into a wooden ballot box, an open gate on one side and a gently closing gate on the other, teal and rust paths meeting at a small crimson crux mark. No flags, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "reparations-slavery",
    hero: {
      src: "/images/generated/topics/reparations-slavery/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An open ledger with blank pages on a desk beside a broken iron link and a young oak sapling, under a long thread of time with teal and rust paths meeting.",
      prompt: topicHeroPrompt(
        "A quiet desk with an old ledger book open to blank pages, a single broken iron link resting beside a young oak sapling, a long horizontal thread of time running from past to future, teal and rust paths meeting at a small crimson crux mark. Solemn and calm. No people, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "immigration-wage-impact",
    hero: {
      src: "/images/generated/topics/immigration-wage-impact/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A wooden loom weaving teal and rust threads into one cloth, with a pay envelope tucked in the frame and a crimson knot where the threads cross.",
      prompt: topicHeroPrompt(
        "A large wooden loom weaving a labour-market cloth: teal threads and rust threads interlaced in the warp, a blank pay envelope tucked in the frame, a hand-drawn supply-and-demand cross stitched into the fabric, a small crimson crux knot where the threads meet. No people, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "open-borders",
    hero: {
      src: "/images/generated/topics/open-borders/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A world map crossed by many teal migration arcs, above a rust balance weighing a rising economic chart against a small farm and village.",
      prompt: topicHeroPrompt(
        "A world chart where the border lines are fading dotted threads, many small teal migration arcs crossing oceans and continents, a rust balance scale weighing economic growth against local capacity, a small crimson crux mark. No people, no flags, no walls.",
      ),
    },
  },
  {
    kind: "topic",
    id: "universal-basic-income",
    hero: {
      src: "/images/generated/topics/universal-basic-income/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A row of houses each with an envelope on its doorstep, with a factory and a farm behind and teal payment and rust work-hours streams meeting overhead.",
      prompt: topicHeroPrompt(
        "A row of identical small unmarked envelopes arriving at the doorsteps of different houses, a factory and a farmhouse in the background, a teal stream of payments and a rust stream of work hours meeting at a small crimson crux mark. No people, no money symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "wealth-tax",
    hero: {
      src: "/images/generated/topics/wealth-tax/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale weighing vault safes and deeds, wrapped in a teal measuring tape, against a library, a school and a bridge, with a rust ribbon of capital drifting away.",
      prompt: topicHeroPrompt(
        "A tall stack of stone-grey vault boxes and estate deeds on one pan of a large balance scale, a small public library, school and bridge on the other, a teal assessor's measuring tape wrapped around the vault and a rust path of capital flight drifting off the page. No people, no dollar signs.",
      ),
    },
  },
  {
    kind: "topic",
    id: "standardized-testing-debate",
    hero: {
      src: "/images/generated/topics/standardized-testing-debate/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A school desk with a blank answer sheet, pencils, a ruler and a sieve sorting teal and rust pebbles, with dotted paths winding up to a university gate.",
      prompt: topicHeroPrompt(
        "A wooden school desk with a blank bubble-answer sheet and two pencils, a measuring ruler and a sieve sorting small teal and rust pebbles, a winding path of different students' routes drawn as faint dotted lines toward a university gate with a small crimson crux mark. No people, no letters.",
      ),
    },
  },
  {
    kind: "topic",
    id: "electoral-college-reform",
    hero: {
      src: "/images/generated/topics/electoral-college-reform/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A patchwork map of regions, each with a small ballot box, whose threads gather into teal and rust bundles weighed on a scale against loose individual threads.",
      prompt: topicHeroPrompt(
        "A parchment chart of a patchwork map divided into irregular blank regions, each with a small wooden ballot box, threads from the boxes gathering into a few large teal and rust bundles, a hand-drawn scale weighing the bundles against a single long line of individual threads, crimson crux mark. No flags, no state names.",
      ),
    },
  },
  {
    kind: "topic",
    id: "surveillance-public-safety",
    hero: {
      src: "/images/generated/topics/surveillance-public-safety/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A quiet street at night seen from above, with cameras on lampposts casting teal cones of view and a rust thread of privacy winding past an open, lit doorway.",
      prompt: topicHeroPrompt(
        "A quiet city street at night seen from above, small camera outlines on lampposts casting soft teal cones of view across the pavement, an open front door with warm light, a rust thread of privacy winding between the cones to a small crimson crux mark. No people, no faces, no screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "us-iran-conflict",
    hero: {
      src: "/images/generated/topics/us-iran-conflict/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An antique nautical chart of a narrow strait, with tankers on dotted shipping lanes and two dotted lines of diplomacy meeting at a crimson crux marker.",
      prompt: topicHeroPrompt(
        "A calm antique nautical chart of a narrow strait between two stylised coastlines, shipping lanes as fine dotted teal routes, a compass rose, tiny outlined tanker silhouettes, and two tentative dotted lines of diplomacy approaching a small crimson crux marker in the water. No flags, no weapons, no explosions, no place names.",
      ),
    },
  },
  {
    kind: "topic",
    id: "epstein-files",
    hero: {
      src: "/images/generated/topics/epstein-files/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Archive shelves of file boxes beside a desk lamp, a ribbon-tied bundle and an open folder whose pages show only teal redaction bars, with a thread to a crux mark.",
      prompt: topicHeroPrompt(
        "A tall archive of closed file boxes and folders on wooden shelves, a few folders open with pages shown only as blank sheets and teal redaction bars, a ribbon-tied bundle under a reading lamp, a rust thread linking boxes to a small crimson crux mark. No people, no photographs, no names, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "tiktok-ban",
    hero: {
      src: "/images/generated/topics/tiktok-ban/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A tall phone with a glowing teal screen stands like a doorway over a strait, with rust speech bubbles on one shore and a padlock on the other, their threads meeting mid-water.",
      prompt: topicHeroPrompt(
        "A smartphone outline with a blank teal-glowing screen standing like a doorway between two coastlines on a parchment chart, data threads streaming across the ocean, a padlock half closed on one thread, rust path of speech and teal path of security meeting at a small crimson crux mark. No logos, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "immigration-border-crisis",
    hero: {
      src: "/images/generated/topics/immigration-border-crisis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A surveyor's map of a desert borderland with a dashed boundary, a river and gatehouse ports of entry, with dotted paths leading to a stack of case files under a lamp.",
      prompt: topicHeroPrompt(
        "A wide desert borderland seen from above as a surveyor's map: a long dashed boundary line, a river curving through it, small gatehouse outlines for ports of entry, faint dotted footpaths converging on a tall stack of case-file folders under a teal lamp. No people, no barbed wire, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "social-media-elections",
    hero: {
      src: "/images/generated/topics/social-media-elections/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A ballot box amid swirling feed threads and drifting blank message cards, some amplified into bold rust ribbons, with a magnifying glass over one tangle.",
      prompt: topicHeroPrompt(
        "A wooden ballot box at the centre of a swirling web of thin feed threads, small blank message cards drifting through the air, some threads amplified as bold rust curves and others teal and quiet, a magnifying glass over one tangle, a small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "nuclear-weapons-abolition",
    hero: {
      src: "/images/generated/topics/nuclear-weapons-abolition/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An opened, empty silo hatch under a lamp, with an unlocked padlock and key, an olive branch, and a scale weighing a sealed vault against open sky.",
      prompt: topicHeroPrompt(
        "A calm disarmament table under a lamp: an empty missile silo drawn in cross-section as a hollow stone well, a key resting in an opened lock, an olive branch beside a balance scale weighing a sealed vault against an open dove-grey sky, small crimson crux mark. No explosions, no mushroom clouds.",
      ),
    },
  },
  {
    kind: "topic",
    id: "school-phone-bans",
    hero: {
      src: "/images/generated/topics/school-phone-bans/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A classroom cubby of cloth pouches holding phones beside a schoolyard with a ball and chalk hopscotch, with teal attention and rust family-contact paths meeting above.",
      prompt: topicHeroPrompt(
        "A wooden classroom cubby shelf of small unnumbered pouches holding smartphones with dark blank screens, beside it an open schoolyard with a ball and chalk hopscotch lines, a teal path of attention and a rust path of contact with parents meeting at a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "pandemic-preparedness",
    hero: {
      src: "/images/generated/topics/pandemic-preparedness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A warehouse shelf of supply crates, vials and folded masks under a weather vane and an early-warning trace, with teal investment and rust cost ribbons diverging.",
      prompt: topicHeroPrompt(
        "A warehouse shelf of sealed supply crates, vials and folded masks drawn in calm ink, an early-warning weather vane and a seismograph-like trace across the top, a teal investment path and a rust path of cost meeting at a small crimson crux mark. No viruses, no people, no hazard symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "china-taiwan-invasion",
    hero: {
      src: "/images/generated/topics/china-taiwan-invasion/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An antique chart of a wide strait between a mainland coast and an island, with an hourglass and a compass rose and two dotted lines meeting at a crux mark mid-strait.",
      prompt: topicHeroPrompt(
        "A calm antique nautical chart of a wide strait between a large stylised mainland coast and an island, faint shipping lanes as dotted teal routes, a compass rose, an hourglass on the chart, and two cautious dotted lines approaching a small crimson crux marker in the water. No flags, no weapons, no place names.",
      ),
    },
  },
  {
    kind: "topic",
    id: "global-water-crisis",
    hero: {
      src: "/images/generated/topics/global-water-crisis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A river delta flowing from a dam to farms and a city, with cracked dry riverbed in the foreground and a single water droplet weighed on a balance scale.",
      prompt: topicHeroPrompt(
        "A great river delta drawn as a cartographer's chart, a large dam and reservoir upstream, teal channels branching to farms and cities downstream, cracked dry riverbed sections in muted rust, a single water droplet balanced on a scale at a small crimson crux mark. No people, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "sugar-tax-effectiveness",
    hero: {
      src: "/images/generated/topics/sugar-tax-effectiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Unlabelled soda bottles and sugar cubes on a shelf beside a scale weighing a price weight against a bowl of fruit, with teal and rust trend lines meeting below.",
      prompt: topicHeroPrompt(
        "A grocery shelf of unlabelled glass soda bottles and sugar cubes, a small iron price weight hanging from a scale tipping toward a bowl of water and fruit, a teal path of reduced consumption and a rust path of weight trends meeting at a small crimson crux mark. No brands, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "social-media-age-limits",
    hero: {
      src: "/images/generated/topics/social-media-age-limits/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A garden gate with a notched height post and a child's bicycle, opening onto a hillside town crowded with teal speech bubbles.",
      prompt: topicHeroPrompt(
        "A garden gate at the entrance to a bustling town of glowing teal message bubbles without text, a height-measuring post beside the gate with notches but no numbers, a child's small bicycle resting by the fence, a rust thread of verification, a small crimson crux mark. No people, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "social-media-mental-health",
    hero: {
      src: "/images/generated/topics/social-media-mental-health/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A bedside desk at night with a glowing phone, a lamp, a journal and a houseplant, under a teal and rust wave line of mood rising and falling.",
      prompt: topicHeroPrompt(
        "A teenager's bedroom desk at night seen as a still life: a phone with a blank teal-glowing screen, a lamp, a journal and a houseplant, a gentle wave chart of mood rising and falling across the wall in teal and rust, a small crimson crux mark. No people, no faces, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-content-labeling",
    hero: {
      src: "/images/generated/topics/ai-content-labeling/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two near-identical landscape paintings on an easel, one with a blank teal tag, and a magnifying glass revealing a lattice watermark in the other.",
      prompt: topicHeroPrompt(
        "Two identical framed landscape paintings side by side on an easel, one bearing a small blank teal tag on a string, a magnifying glass revealing a faint lattice watermark in one canvas, a rust path of authenticity, a small crimson crux mark. No text on the tags, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "big-tech-antitrust",
    hero: {
      src: "/images/generated/topics/big-tech-antitrust/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Three giant stone towers drawing teal threads from a small marketplace of shopfronts, with a large pair of iron shears resting on a ledger in front.",
      prompt: topicHeroPrompt(
        "A few enormous stone towers dominating a small marketplace of tiny shopfronts, teal threads of data and commerce flowing into the towers, a large pair of iron shears resting on a ledger beside them, a rust path of consumer price, a small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "cancel-culture",
    hero: {
      src: "/images/generated/topics/cancel-culture/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An empty speaker's podium in a town square, with blank cards fluttering overhead and a closing door on one side and an open door on the other.",
      prompt: topicHeroPrompt(
        "An empty speaker's podium in a town square, a crowd suggested only by many small blank speech cards fluttering through the air, a few turned teal and a few rust, a gently closing door and an open one on either side, a small crimson crux mark. No people, no faces, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "media-bias-democracy",
    hero: {
      src: "/images/generated/topics/media-bias-democracy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Folded newspapers fanned from teal to rust under a pair of spectacles with one teal and one rust lens, with threads leading to a ballot box.",
      prompt: topicHeroPrompt(
        "A newsstand of folded blank newspapers fanned like a spectrum from teal to rust, a pair of reading spectacles with one teal and one rust lens resting on top, a ballot box beyond, threads converging on a small crimson crux mark. No headlines, no logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "space-colonization-feasibility",
    hero: {
      src: "/images/generated/topics/space-colonization-feasibility/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A cutaway dome habitat with greenhouse rows on a dusty rust plain, a rocket far off, and a dotted path back to a small Earth.",
      prompt: topicHeroPrompt(
        "A pressurised dome habitat drawn as an engineer's cutaway on a dusty rust-coloured plain, greenhouse rows inside under teal light, a supply rocket silhouette far off, a long dotted orbital path from a small Earth, a small crimson crux mark. No people, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "lab-grown-meat-adoption",
    hero: {
      src: "/images/generated/topics/lab-grown-meat-adoption/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glass bioreactor on one side and a pasture with grazing cattle on the other, with a plate holding a cut of meat between them.",
      prompt: topicHeroPrompt(
        "A laboratory bioreactor drawn in fine ink beside a farmhouse pasture with grazing cattle in the distance, a dinner plate between them holding a plain cut of meat, teal path of cultivation and rust path of farming meeting at a small crimson crux mark. No people, no labels.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-in-education",
    hero: {
      src: "/images/generated/topics/ai-in-education/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An open notebook on a school desk beside a slate and pencil, with a teal lantern of conversation nodes above it; rust handwriting and teal answers meet at the spine.",
      prompt: topicHeroPrompt(
        "A school desk seen from above: an open notebook, a pencil and a slate, a small lantern-like device giving off a faint teal lattice of conversation nodes, a rust path of handwritten practice beside a teal path of assisted answers, meeting at a small crimson crux mark. No people, no screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-regulation",
    hero: {
      src: "/images/generated/topics/ai-regulation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal network lattice inside a partial scaffold of oversight tools: a dosage scale, a reactor dome and a wax seal, with rust paths slipping out toward a half-open gate.",
      prompt: topicHeroPrompt(
        "An abstract lattice of teal network nodes, like a circuit drawn as a constellation, held inside a partial scaffold of oversight instruments: an apothecary dosage scale, the outline of a reactor containment dome and a blank wax approval seal; rust paths of innovation slip outward through the gaps toward a small crimson crux mark at a half-open gate. No brain, no robots, no screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "eacc-vs-tech-regulation",
    hero: {
      src: "/images/generated/topics/eacc-vs-tech-regulation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal locomotive patterned with network nodes racing toward a sunrise, approaching a signal box and lowered crossing gate where the rails fork.",
      prompt: topicHeroPrompt(
        "A fast teal locomotive of circuit nodes racing along rails toward a bright horizon, a signal box and lowered level-crossing gate in muted rust beside the tracks, a small crimson crux mark at the junction where the rails split. No people, no robots, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-superintelligence-timeline",
    hero: {
      src: "/images/generated/topics/ai-superintelligence-timeline/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An hourglass on an astronomical arc with teal compute nodes climbing toward a bright horizon, where the forecast fans out into teal and rust bands.",
      prompt: topicHeroPrompt(
        "A long horizontal timeline drawn as an antique astronomical instrument: a rising curve of teal compute nodes climbing toward a faint bright horizon, forecast fans spreading as overlapping translucent teal and rust bands, an hourglass at one end, a small crimson crux mark where the bands diverge. No robots, no brains.",
      ),
    },
  },
  {
    kind: "topic",
    id: "nuclear-renaissance-smr",
    hero: {
      src: "/images/generated/topics/nuclear-renaissance-smr/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A factory hall where a small modular reactor unit is lowered onto a truck, beside a row of finished units, with a cooling tower and a town in the distance.",
      prompt: topicHeroPrompt(
        "A row of small modular reactor units drawn as compact cylinders in a factory assembly hall, one being lowered onto a truck bed, a single traditional large cooling tower faint in the background, teal power lines to a town, a small crimson crux mark. No hazard symbols, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "tiktok-brain-rot",
    hero: {
      src: "/images/generated/topics/tiktok-brain-rot/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A ribbon of video frames streaming up out of a phone beside an open book with a pressed flower under a reading lamp, with a teal thread fraying into rust.",
      prompt: topicHeroPrompt(
        "An endless vertical ribbon of small blank video frames scrolling upward like a waterfall from a phone outline, beside it an open book with a pressed flower and a reading lamp, a spiral of attention drawn as a thin teal thread fraying into rust, a small crimson crux mark. No people, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-replacing-doctors",
    hero: {
      src: "/images/generated/topics/ai-replacing-doctors/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An empty exam room with a chest X-ray overlaid by teal diagnostic nodes, a stethoscope, a doctor's stool and a patient's chair.",
      prompt: topicHeroPrompt(
        "A clinic examination room with a stethoscope and a chest X-ray on a light box, a faint teal lattice of diagnostic nodes overlaying the film, an empty doctor's stool and a patient's chair facing it, a rust path of human judgment, a small crimson crux mark. No people, no faces, no robots.",
      ),
    },
  },
  {
    kind: "topic",
    id: "privacy-vs-convenience",
    hero: {
      src: "/images/generated/topics/privacy-vs-convenience/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Envelopes of personal data streaming out of a front door's mail slot toward distant antenna towers, with a key fob, a phone and an open padlock on the hall table.",
      prompt: topicHeroPrompt(
        "A front door with its mail slot open and many small envelopes of personal data streaming out on teal threads toward distant towers, a convenient key fob and a smartphone on a hall table, a rust padlock lying open beside them, a small crimson crux mark. No people, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ev-environmental-impact",
    hero: {
      src: "/images/generated/topics/ev-environmental-impact/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Cutaways of an electric car linked to a mine and a power plant and a petrol car linked to an oil pump and exhaust, side by side on a road.",
      prompt: topicHeroPrompt(
        "An electric car and a petrol car drawn side by side in cutaway on a parchment road, the electric one showing a battery pack linked by a teal thread to a mine and a power plant, the petrol one linked by a rust thread to an oil derrick and exhaust, a small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "factory-farming-ban",
    hero: {
      src: "/images/generated/topics/factory-farming-ban/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A long industrial barn of caged hens and pigs opposite a pasture with free-range animals and a red barn, with a grocery basket under a balance scale between them.",
      prompt: topicHeroPrompt(
        "A long industrial poultry and pig barn drawn in muted stone grey beside an open green pasture with a small free-range flock and a red barn in muted rust, a weighing scale with a grocery basket between them, a small crimson crux mark. No suffering imagery, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "organic-food-health",
    hero: {
      src: "/images/generated/topics/organic-food-health/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two identical baskets of apples, carrots and greens on a farm table, one with a teal ribbon, with a magnifying glass, a beaker and roots in the soil below.",
      prompt: topicHeroPrompt(
        "Two identical baskets of apples, carrots and greens on a farm table, one with a small blank teal ribbon, a magnifying glass and a beaker beside them, a soil cross-section below showing roots, a rust path and a teal path meeting at a small crimson crux mark. No labels, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "gene-editing-embryos",
    hero: {
      src: "/images/generated/topics/gene-editing-embryos/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal DNA helix with scissors cutting one rung, beside a microscope slide and a petri dish holding a single cell, with a family-tree thread branching away.",
      prompt: topicHeroPrompt(
        "A delicate DNA double helix drawn in teal ink with a tiny pair of molecular scissors at one rung, beside a microscope slide and a glass petri dish holding a single cell, a long family-tree thread branching into the future, a small crimson crux mark. No babies, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "space-exploration-value",
    hero: {
      src: "/images/generated/topics/space-exploration-value/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An observatory on a hill beside a balance scale weighing a starry sky with a probe against a village with a school and a hospital.",
      prompt: topicHeroPrompt(
        "A telescope on an observatory hilltop pointing to a teal night sky with a small planet and a probe's dotted path, at the foot of the hill a village with a school and hospital, a balance scale weighing the sky against the village, a small crimson crux mark. No flags, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "veganism-environmental-impact",
    hero: {
      src: "/images/generated/topics/veganism-environmental-impact/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A plate of lentils, grains and vegetables beside a plate of steak, cheese and milk, in front of crop fields and a cattle pasture divided by a river.",
      prompt: topicHeroPrompt(
        "A farm table with a plate of lentils, grains and vegetables beside a plate of beef and dairy, behind them a landscape split between grazing pasture and crop fields with a river, teal and rust threads of land and emissions meeting at a small crimson crux mark. No people, no labels.",
      ),
    },
  },
  {
    kind: "topic",
    id: "lab-leak-theory",
    hero: {
      src: "/images/generated/topics/lab-leak-theory/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two evidence trails across a city plan, one from a market stall and one from a lab flask and microscope, both leading to a locked archive drawer.",
      prompt: topicHeroPrompt(
        "Two faint evidence trails winding across a parchment city plan, one from a covered market stall awning and one from a laboratory flask and microscope, both leading to a locked archive drawer of missing records with a small crimson crux mark. No virus particles, no masks, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "gender-affirming-care-minors",
    hero: {
      src: "/images/generated/topics/gender-affirming-care-minors/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A young sapling in a clay pot on a clinic windowsill beside an hourglass and blank study cards, with teal evidence and rust caution paths meeting at a crux mark.",
      prompt: topicHeroPrompt(
        "A young sapling in a clay pot on a quiet clinic windowsill, a stack of blank study cards and a slow hourglass beside it, two soft paths, teal for evidence review and rust for caution, meeting at a small crimson crux mark. Calm and gentle. No people, no bodies, no flags or symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "seed-oils-health",
    hero: {
      src: "/images/generated/topics/seed-oils-health/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Glass cruets of plant oil on a shelf above a balance holding a cast-iron skillet and a bowl of olives, with soybean pods and fatty-acid chains drawn as beads.",
      prompt: topicHeroPrompt(
        "Glass cruets of plant oil on a kitchen shelf beside soybean pods and rapeseed sprigs drawn in teal ink, molecular fatty-acid chains drawn as linked beads, a balance between a cast-iron skillet and a bowl of olives. No labels, no people, no yellow flowers.",
      ),
    },
  },
  {
    kind: "topic",
    id: "housing-affordability-crisis",
    hero: {
      src: "/images/generated/topics/housing-affordability-crisis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Teal apartment towers and a row of brick terraced houses on either side of an empty lot marked with dashed zoning lines, with a house key on a site plan and cranes beyond.",
      prompt: topicHeroPrompt(
        "Architectural elevation drawing of a city block: slender teal apartment towers beside rows of small brick-rust-roofed houses, zoning lines drawn as dashed ink fences across an empty lot between them, a single house key resting on a surveyor's plan in the foreground, faint construction cranes on the horizon. No people, no signs, no ropes.",
      ),
    },
  },
  {
    kind: "topic",
    id: "inflation-monetary-policy",
    hero: {
      src: "/images/generated/topics/inflation-monetary-policy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An iron valve wheel controlling a teal stream that pours into a basket of bread, eggs and a fuel can, beside a tall pressure gauge.",
      prompt: topicHeroPrompt(
        "An antique iron control valve regulating a teal stream of water that flows into a market basket of bread, eggs and a fuel can, a tall gauge rising in muted rust beside it, a small crimson crux mark at the valve wheel. No people, no currency symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "us-national-debt-crisis",
    hero: {
      src: "/images/generated/topics/us-national-debt-crisis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A lighthouse built from stacked ledger books and coins on a rocky coast, with a clock face at its base and teal waves lapping at the rocks.",
      prompt: topicHeroPrompt(
        "A tall, slightly leaning tower of stacked ledger books and coins standing like a lighthouse on a calm coastline, a clock face without numerals at its base, teal waves of interest lapping at the rocks, a thin rust fault line with a small crimson crux mark. No flags, no dollar signs.",
      ),
    },
  },
  {
    kind: "topic",
    id: "rent-control-effectiveness",
    hero: {
      src: "/images/generated/topics/rent-control-effectiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Apartment facades under a horizontal price-ceiling beam, with a rust rising curve and a teal path of tenant stability meeting at a crux mark.",
      prompt: topicHeroPrompt(
        "A row of apartment building facades in architectural elevation, some windows softly lit, a horizontal ink beam drawn as a price ceiling pressing down on a rising rust curve, a teal path of tenant stability and a rust path of new construction meeting at a small crimson crux mark. No people, no signs.",
      ),
    },
  },
  {
    kind: "topic",
    id: "open-weight-ai-models",
    hero: {
      src: "/images/generated/topics/open-weight-ai-models/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An open library cabinet spilling teal lattice tablets along branching paths to many small workshops, opposite a padlocked rust vault.",
      prompt: topicHeroPrompt(
        "An open wooden library cabinet with its doors swung wide, abstract lattice-patterned teal slates spilling out along many branching paths to small workshops, and on the other side a closed rust-toned vault with a padlock, a small crimson crux mark between them. No robots, no screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "second-amendment-individual-right",
    hero: {
      src: "/images/generated/topics/second-amendment-individual-right/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A founding-era charter under a magnifying glass, with a teal militia-reading ribbon and a rust individual-right ribbon crossing at a crux mark.",
      prompt: topicHeroPrompt(
        "A founding-era parchment charter on a writing desk beside a quill and inkwell, a magnifying glass over one clause shown only as blank ruled lines, two ribbon paths, teal for the militia reading and rust for the individual-right reading, crossing at a small crimson crux mark. No firearms, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "vaccine-mandates",
    hero: {
      src: "/images/generated/topics/vaccine-mandates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A translucent teal shield arching over a town square, with a sealed vial on a clipboard and a rust thread of individual choice running out through an open gate.",
      prompt: topicHeroPrompt(
        "A small town square drawn as a protective web: a translucent teal shield arc over the rooftops, a single sealed vial resting on a clipboard, a rust thread of individual choice running through an open garden gate, the two balanced at a small crimson crux mark. No needles, no people.",
      ),
    },
  },
] as const satisfies readonly GeneratedMedia[];

const mediaByKey = new Map(
  generatedMedia.map((item) => [`${item.kind}:${item.id}`, item]),
);

export function getGeneratedMedia(
  kind: GeneratedMediaKind,
  id: string,
): GeneratedMedia | undefined {
  return mediaByKey.get(`${kind}:${id}`);
}

export function absoluteMediaUrl(src: string): string {
  return src.startsWith("http") ? src : `https://argumend.org${src}`;
}
