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
// files were saved as 1672x941 progressive JPEG at quality 82. The guide and
// blog heroes added the same day use the same prompt and processing, with a
// scene drawn from each guide's or post's own content.
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
    kind: "guide",
    id: "understanding-bias",
    hero: {
      src: "/images/generated/guides/understanding-bias/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Antique spectacles with one teal and one rust lens, the same sprig of leaves tinted differently through each, beside a balance scale with a small weight on one pan and a magnifying glass.",
      prompt: topicHeroPrompt(
        "A pair of antique reading spectacles on a writing desk, one lens tinted teal and one tinted rust, the same small sprig of leaves behind them seen through each lens in a different colour, a brass balance scale beside it with a small counterweight added to one pan, a magnifying glass. No people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "running-your-first-analysis",
    hero: {
      src: "/images/generated/guides/running-your-first-analysis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A blank sheet laid on an unfolded parchment map, its corner touching a crimson mark where a teal path begins, with a compass and a pencil beside it.",
      prompt: topicHeroPrompt(
        "A single loose sheet of blank paper being laid onto a large unfolded parchment map of an argument landscape, its edge lining up with one marked path among many, a small crimson crux mark where the sheet meets the path, a teal compass and a pencil resting nearby. No readable writing, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "evaluating-source-credibility",
    hero: {
      src: "/images/generated/guides/evaluating-source-credibility/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Three springs pouring into three separate inkwells above a jeweller's loupe on old papers, two matching teal wax seals and a knotted rust thread winding away.",
      prompt: topicHeroPrompt(
        "An archivist's table with a jeweller's loupe resting on one old document, three separate springs feeding three separate inkwells, two matching teal wax seal impressions side by side, and a short straight thread from the document to a small crimson mark beside a long knotted thread that winds away. No writing, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "crux-test",
    hero: {
      src: "/images/generated/guides/crux-test/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A stone arch bridge over a calm river with a crimson keystone at its crown, a teal path and a rust path meeting on the arch, and loose stones on the bank.",
      prompt: topicHeroPrompt(
        "A stone arch bridge drawn in fine ink across a calm river, the single keystone at its crown picked out in crimson, a teal path and a rust path approaching from opposite banks and meeting on the arch, a few loose decorative stones lying on the bank that bear no load. No people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "bayesian-thinking",
    hero: {
      src: "/images/generated/guides/bayesian-thinking/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A brass balance tipping as teal pebbles are added to one pan, ghosted earlier positions of its beam above it and a bell curve shading from rust to teal behind.",
      prompt: topicHeroPrompt(
        "A brass balance scale on parchment with small teal pebbles being added one at a time to one pan, the beam tipping gradually, faint ghosted earlier positions of the beam showing a slow step-by-step shift, and a soft bell-shaped watercolour curve behind it sliding from rust toward teal. No numbers, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "argument-audit",
    hero: {
      src: "/images/generated/guides/argument-audit/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A pinned blank slip linked by rust threads to three separate source sketches, with an hourglass, a magnifying glass and a sliding rust-to-teal gauge on a desk.",
      prompt: topicHeroPrompt(
        "An inspector's desk with a single pinned paper slip, a small hourglass, a magnifying glass, and a fine thread traced from the slip back through three branching paths to three separate source documents, beside a small sliding gauge running from rust to teal. No writing, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "steelmanning-practice",
    hero: {
      src: "/images/generated/guides/steelmanning-practice/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal steel beam resting on an anvil beside a glowing forge, a hammer and tongs at rest, and a flimsy bundle of straw set aside on the floor.",
      prompt: topicHeroPrompt(
        "A blacksmith's anvil in a quiet forge with a teal-tempered steel beam laid across it, stronger than a flimsy bundle of straw set aside on the floor, soft rust embers glowing in the hearth, tongs and a hammer at rest, a small crimson crux mark. No people, no hands, no sparks of fire spraying.",
      ),
    },
  },
  {
    kind: "guide",
    id: "cognitive-bias-field-guide",
    hero: {
      src: "/images/generated/guides/cognitive-bias-field-guide/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A naturalist's plate of twelve pinned moths and beetles in teal, rust and brown, with a magnifying glass and a green field notebook beside it.",
      prompt: topicHeroPrompt(
        "A naturalist's field-guide plate of twelve distinct pinned moths and beetles arranged in a neat grid, each in muted teal, rust, brown and stone grey, a magnifying glass and a closed field notebook beside the plate. No labels, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "weighing-conflicting-evidence",
    hero: {
      src: "/images/generated/guides/weighing-conflicting-evidence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A tall brass balance with a small stack of teal-bound books under a magnifying glass on one pan and a tall pile of loose rust pamphlets on the other, nearly level.",
      prompt: topicHeroPrompt(
        "A tall brass balance with a small dense block of teal-bound volumes on one pan and a tall loose pile of thin rust pamphlets on the other, the beam resting near level, a magnifying glass lying on the dense block, two study paths converging below. No writing, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "reading-confidence-like-a-forecaster",
    hero: {
      src: "/images/generated/guides/reading-confidence-like-a-forecaster/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A barometer with a blank dial, a weather vane and five glass jars of teal water filled to rising heights, rain clouds on the left and sunlight on the right.",
      prompt: topicHeroPrompt(
        "A weather forecaster's instrument table with a barometer, a wind vane and a row of small glass jars filled with teal water to different heights like calibration marks, a soft rain cloud and a patch of sunlight drawn across the sky behind them. No numerals on any dial, no people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "correlation-and-causation",
    hero: {
      src: "/images/generated/guides/correlation-and-causation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two potted plants growing side by side on a windowsill, each linked by a dotted line to the sun above, with a crossed-out dotted line running directly between them.",
      prompt: topicHeroPrompt(
        "Two potted plants growing tall side by side on a windowsill, their stems rising in parallel, a single sun above them sending a thread of light to each plant, a faint dotted line drawn directly between the two plants with a small crimson crux mark on it. No people.",
      ),
    },
  },
  {
    kind: "guide",
    id: "spotting-manufactured-doubt",
    hero: {
      src: "/images/generated/guides/spotting-manufactured-doubt/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Leather bellows puffing grey fog across a hillside where teal ribbons converge on one point, from which strings lead out to four small paper megaphones.",
      prompt: topicHeroPrompt(
        "A pair of old bellows puffing a soft grey fog across a clear landscape where several teal evidence paths converge on one point, the fog thinning to reveal the paths still meeting, and a cluster of small paper megaphones whose strings all trace back to one single root. No people, no smoke from cigarettes, no logos.",
      ),
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
    kind: "blog",
    id: "we-gave-a-model-that-cant-talk-1000-arguments",
    hero: {
      src: "/images/generated/blog/we-gave-a-model-that-cant-talk-1000-arguments/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A brass dial instrument with a needle between a teal arc and a rust arc, feeding a long ribbon of blank paper drawn from an unfolded argument map marked with a crimson cross.",
      prompt: topicHeroPrompt(
        "A silent antique brass measuring instrument with a needle dial and no numerals, fed by a long ribbon of small blank paper slips drawn from a large unfolded argument map spread across the table, the needle resting between a teal arc and a rust arc, a small crimson crux mark on the map. No mouths, no speech bubbles, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "how-to-change-someones-mind",
    hero: {
      src: "/images/generated/blog/how-to-change-someones-mind/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two armchairs, one teal and one rust, facing each other on a porch over two teacups, a thread from each chair meeting in a loose knot above the table beside an open door.",
      prompt: topicHeroPrompt(
        "Two empty armchairs on a front porch angled toward each other, two teacups on a small table between them, a teal thread from one chair and a rust thread from the other winding together into a loose knot above the table, the front door standing open. No people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "ai-in-debate-promise-and-pitfalls",
    hero: {
      src: "/images/generated/blog/ai-in-debate-promise-and-pitfalls/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glass-domed brass gear mechanism topped by a teal network of nodes, its threads sorting blank cards into three columns while a magnifying glass rests on hollow paper shells.",
      prompt: topicHeroPrompt(
        "A glass-domed brass mechanism of fine gears topped by a small teal constellation of network nodes on a study desk, threads from it sorting a pile of blank argument cards into neat columns, while at the desk's edge a few hollow paper shells, convincing from the front and empty behind, sit under a magnifying glass. No people, no robots with faces.",
      ),
    },
  },
  {
    kind: "blog",
    id: "climate-change-finding-common-ground",
    hero: {
      src: "/images/generated/blog/climate-change-finding-common-ground/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A long stone bridge across a river from a green teal bank toward a rust bank, its final span missing and marked with a crimson cross, a wind turbine and a thermometer on the hills.",
      prompt: topicHeroPrompt(
        "A wide river valley drawn in watercolour with a teal bank and a rust bank, a broad stone bridge spanning most of the river as shared ground, one final unfinished span marked by a small crimson crux mark, a thermometer and a wind turbine on the far hills. No people, no flags.",
      ),
    },
  },
  {
    kind: "blog",
    id: "spot-misinformation-60-seconds",
    hero: {
      src: "/images/generated/blog/spot-misinformation-60-seconds/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A pocket watch and a magnifying glass beside a loose leaflet on a desk, a thread running from the leaflet up to three side-by-side panes of faint teal landscape sources.",
      prompt: topicHeroPrompt(
        "A pocket watch with a sweeping hand and no numerals lying beside a single loose leaflet on a desk, three side panes opened sideways like windows showing faint teal source documents, a fine thread traced from the leaflet back to one original record, a magnifying glass. No readable text, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "art-of-changing-your-mind",
    hero: {
      src: "/images/generated/blog/art-of-changing-your-mind/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A weathervane on a tiled rooftop swinging from a rust sky toward a teal one, ghosted earlier positions of its arrow behind it and blank cards blowing past on the wind.",
      prompt: topicHeroPrompt(
        "A weathervane on an old rooftop turning gently as the wind shifts, its arrow swinging from a rust quarter of the sky toward a teal one, a few blank paper cards carried on the breeze past it, calm open sky. No letters on the vane, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "false-balance-both-sides",
    hero: {
      src: "/images/generated/blog/false-balance-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale hung level from a string above it, a heavy teal stone on one pan and a single feather on the other, over a blank folded broadsheet.",
      prompt: topicHeroPrompt(
        "A balance scale held artificially level by a thin string pulled from above, a heavy teal stone block on one pan and a single feather on the other, a blank folded broadsheet lying beneath the scale. No readable text, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "argument-mapping-for-students",
    hero: {
      src: "/images/generated/blog/argument-mapping-for-students/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An open exercise book with an argument tree drawn across both pages in teal and rust, an apple and pencils on the desk and the same tree in pale lines on the chalkboard behind.",
      prompt: topicHeroPrompt(
        "A wooden school desk with an open exercise book showing a hand-drawn argument tree branching across the page in teal and rust ink, coloured pencils and an apple beside it, and a chalkboard behind carrying the same tree in faint pale lines. No writing, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "finding-the-crux-of-debates",
    hero: {
      src: "/images/generated/blog/finding-the-crux-of-debates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A watercolour town plan seen from above with a tram on a new teal rail line, a teal path and a rust path winding through the blocks to meet at a crimson cross.",
      prompt: topicHeroPrompt(
        "A city street plan seen from above with a new light-rail line sketched in teal ink and a small tram outline on it, two argument paths, teal and rust, branching out across the blocks and finally meeting at one junction marked by a small crimson crux mark. No people, no street names.",
      ),
    },
  },
  {
    kind: "blog",
    id: "microplastics-in-your-blood",
    hero: {
      src: "/images/generated/blog/microplastics-in-your-blood/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A sample vial in a lab rack, a plastic water bottle and a petri dish all flecked with tiny teal and rust plastic fragments, a magnifier enlarging them beside a microscope.",
      prompt: topicHeroPrompt(
        "A laboratory rack holding a capped glass sample vial filled with clear pale liquid beside a plastic water bottle and a petri dish, all speckled with tiny teal and rust plastic fragments drawn as fine confetti, a microscope and a magnifying glass on the bench, a small crimson crux mark. No blood, no organs, no gore, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "how-to-argue-like-a-philosopher",
    hero: {
      src: "/images/generated/blog/how-to-argue-like-a-philosopher/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two marble benches facing each other in a stone colonnade, a scroll on one and an olive branch on the other, a teal path and a rust path crossing the floor between them.",
      prompt: topicHeroPrompt(
        "A quiet stone colonnade with two empty marble benches facing each other, an open scroll resting on one and an olive branch on the other, a teal path and a rust path across the floor tiles meeting between the benches. No people, no statues of real people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "steel-man-tiktok-ban",
    hero: {
      src: "/images/generated/blog/steel-man-tiktok-ban/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A riveted steel beam across a teal sea between two coastlines, a padlock on one end, an open book on the other and a phone with a glowing teal screen standing at its centre.",
      prompt: topicHeroPrompt(
        "A forged steel beam laid across a parchment chart between two coastlines, a smartphone outline with a blank teal-glowing screen resting at its centre, a padlock on one end of the beam and an open book on the other, data threads crossing the ocean, a small crimson crux mark. No logos, no flags.",
      ),
    },
  },
  {
    kind: "blog",
    id: "ozempic-evidence-review",
    hero: {
      src: "/images/generated/blog/ozempic-evidence-review/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An injection pen on a clinic tray beside a weighing scale, a teal curve dipping to a crimson cross and rising again in rust toward a blank wall calendar.",
      prompt: topicHeroPrompt(
        "A sleek injection pen on a clinic tray beside a doctor's weighing scale, a long teal curve that dips down and then climbs gently back up in rust, a grid of blank calendar squares behind it, a small crimson crux mark. No brands, no bodies, no needles in skin, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "arguing-about-ai-jobs",
    hero: {
      src: "/images/generated/blog/arguing-about-ai-jobs/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal robotic arm and a fountain pen drawing on the same open ledger toward a crimson cross, an open toolbox beside them and offices and a factory through the window.",
      prompt: topicHeroPrompt(
        "An office desk where a slender teal robotic arm and a fountain pen rest on the same open ledger, an open toolbox of new tools beside it, a calm skyline of offices and a factory through the window, teal and rust paths meeting at a small crimson crux mark. No people, no hands.",
      ),
    },
  },
  {
    kind: "blog",
    id: "kids-first-phone-science",
    hero: {
      src: "/images/generated/blog/kids-first-phone-science/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A phone resting on the high shelf above a doorframe marked with height notches, a kite, a bicycle and a small gift box by the door, teal and rust ribbons meeting at a crimson cross.",
      prompt: topicHeroPrompt(
        "A doorframe with a pencil height chart of notches but no numbers, a smartphone resting on a high shelf above it, a bicycle and a kite leaning by the door, a small gift box tied with string on the floor, teal and rust paths meeting at a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "longevity-science-debate",
    hero: {
      src: "/images/generated/blog/longevity-science-debate/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A white laboratory mouse beside an hourglass and test tubes, a magnifier over a cell, and a long narrow plank bridge reaching toward a distant open doorway.",
      prompt: topicHeroPrompt(
        "A small white laboratory mouse figurine beside a large antique hourglass on a lab bench, a cell drawn as a delicate rosette under a lens, a long narrow plank bridge stretching from the mouse toward a distant tall doorway, teal and rust. No real animals in distress, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "housing-crisis-argument-map",
    hero: {
      src: "/images/generated/blog/housing-crisis-argument-map/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A porch house raised on a plank between a dashed zoning fence and a stack of ledger books, teal and rust threads running from both to a house key on a surveyor's plan.",
      prompt: topicHeroPrompt(
        "A single house drawn in architectural elevation whose roof is held up by three different supports: a dashed zoning fence, a stack of investor deed ledgers and a horizontal price-ceiling beam, a house key resting on the surveyor's plan in front, teal and rust threads linking the three. No people, no signs.",
      ),
    },
  },
  {
    kind: "blog",
    id: "deepfakes-elections-evidence",
    hero: {
      src: "/images/generated/blog/deepfakes-elections-evidence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A mirror on an easel reflecting a river landscape, beside a wooden ballot box, a sealed envelope with a teal wax seal, a magnifying glass and a crimson cross.",
      prompt: topicHeroPrompt(
        "A tall mirror on an easel reflecting a landscape slightly different from the one before it, a wooden ballot box beside it, a photograph turned over to show a teal wax provenance seal on its back, a magnifying glass, a small crimson crux mark. No faces, no people, no flags.",
      ),
    },
  },
  {
    kind: "blog",
    id: "geoengineering-debate-mapped",
    hero: {
      src: "/images/generated/blog/geoengineering-debate-mapped/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal globe on a brass stand under a faint teal sky, facing a carbon-capture tower over a bed of grey rock, a thermometer and a rust thread running down to a crimson cross.",
      prompt: topicHeroPrompt(
        "A globe on a brass stand beneath a parchment sky veiled by a thin teal shimmer, beside it a tall carbon-capture tower drawn in fine ink and a bed of crushed grey rock, a thermometer, a rust thread of risk running down to the base, a small crimson crux mark. No disaster, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "masculinity-debate-mapped",
    hero: {
      src: "/images/generated/blog/masculinity-debate-mapped/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A toolbox and work boots where two paths part, a teal path climbing to a lit schoolhouse and workshop, a rust path toward a lone house glowing with a screen's light.",
      prompt: topicHeroPrompt(
        "A pair of work boots and a toolbox at a crossroads, a teal path leading to a lit schoolhouse and workshop, a rust path leading toward a lone room glowing with a faint screen light, a small crimson crux mark at the junction. No people, no faces.",
      ),
    },
  },
  {
    kind: "blog",
    id: "declining-birth-rates-panic",
    hero: {
      src: "/images/generated/blog/declining-birth-rates-panic/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A barometer on a wall above an empty wooden cradle, beside an inverted pyramid of stone steps wide at the top and narrow at the base, crossed by a falling teal line.",
      prompt: topicHeroPrompt(
        "An antique barometer on a wall above a single empty wooden cradle, an inverted population pyramid of stacked stone blocks wide at the top and narrow at the base, a teal curve bending downward, a small crimson crux mark. No babies, no people, no numbers.",
      ),
    },
  },
  {
    kind: "blog",
    id: "social-media-mental-health-research",
    hero: {
      src: "/images/generated/blog/social-media-mental-health-research/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A phone tucked inside a half-closed wooden box on a desk beside stacked teal and rust journals and a houseplant, a teal and rust wave of mood drawn on the wall.",
      prompt: topicHeroPrompt(
        "A study desk with stacked research papers bound in teal and rust, a phone with a blank screen placed inside a small wooden box whose lid is half closed, a gentle wave chart of mood drawn on the wall behind, a houseplant, a small crimson crux mark. No people, no logos.",
      ),
    },
  },
  {
    kind: "blog",
    id: "ai-regulation-safety-experts-disagree",
    hero: {
      src: "/images/generated/blog/ai-regulation-safety-experts-disagree/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal network of nodes branching into three paths: to a closed iron garden gate, along an open country road, and through a narrow gate carved with scales and measuring marks.",
      prompt: topicHeroPrompt(
        "A teal constellation of network nodes at the centre with three paths leading away from it: one to a closed garden gate, one along an open road, one through a narrow gate fitted with measuring instruments and a dosage scale, a small crimson crux mark where the paths divide. No signs, no robots, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "housing-crisis-zoning-rent-control-data",
    hero: {
      src: "/images/generated/blog/housing-crisis-zoning-rent-control-data/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A city street of apartment facades either side of an empty lot behind a fence and a crane, a teal beam across the rooftops and teal and rust curves crossing in the sky.",
      prompt: topicHeroPrompt(
        "Architectural elevation of a city block with an empty lot fenced by dashed zoning lines, a construction crane, apartment facades under a horizontal price-ceiling beam, and two crossing curves, teal and rust, drawn faintly in the sky above, a small crimson crux mark. No people, no signs.",
      ),
    },
  },
  {
    kind: "blog",
    id: "gun-control-evidence-research",
    hero: {
      src: "/images/generated/blog/gun-control-evidence-research/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Five tied study folders in teal and rust joined by threads at a crimson cross, with a globe, a balance scale and a locked storage box with its key on the desk.",
      prompt: topicHeroPrompt(
        "An evidence reviewer's desk with five stacks of study folders in teal and rust, a closed safe-storage lockbox with its key, a small globe for international comparisons and a balance scale, threads from the folders meeting at a small crimson crux mark. No firearms, no ammunition, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "wealth-inequality-crux",
    hero: {
      src: "/images/generated/blog/wealth-inequality-crux/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A sliced pie on a table and a second pie baking in a brick oven, a tall stack of grey coins casting a long shadow and a rust thread passing three crimson crosses.",
      prompt: topicHeroPrompt(
        "A baker's table with a round pie being cut into uneven slices beside an oven where a second pie rises larger, a tall stack of stone-grey coins casting a long shadow across the table, and a thread running past three small crimson crux marks. No people, no currency symbols.",
      ),
    },
  },
  {
    kind: "blog",
    id: "nuclear-energy-safety-evidence",
    hero: {
      src: "/images/generated/blog/nuclear-energy-safety-evidence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Five blank cards fanned on a desk below a reactor dome and cooling tower, a teal waste cask on a shelf and a balance weighing one small pellet against a heap of coal.",
      prompt: topicHeroPrompt(
        "An analyst's desk with five ledger cards fanned out, behind them a compact small modular reactor drawn as a squat cylinder beside a traditional cooling tower, a sealed teal waste cask on a shelf, and a balance weighing one tiny fuel pellet against a large heap of coal, a small crimson crux mark. No hazard symbols, no disaster.",
      ),
    },
  },
  {
    kind: "blog",
    id: "microplastics-body-health-evidence",
    hero: {
      src: "/images/generated/blog/microplastics-body-health-evidence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A microscope slide of teal and rust plastic fragments, a magnifier and a balance scale, with a dotted line toward a pencil outline of a human figure broken by a crimson cross.",
      prompt: topicHeroPrompt(
        "A laboratory bench with a microscope slide showing tiny teal and rust plastic fragments, a balance scale and a magnifier beside it, a dotted line from the slide toward a faint pencil outline of a human figure with a gap in the line marked by a small crimson crux mark. No face, no gore, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "iran-war-evidence-analysis",
    hero: {
      src: "/images/generated/blog/iran-war-evidence-analysis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale on an antique chart of a narrow strait weighing a sealed green case against an olive branch, dotted lines meeting at a crimson mark in the water beside a compass rose.",
      prompt: topicHeroPrompt(
        "A calm antique nautical chart of a narrow strait with a compass rose, a brass scale on the chart balancing a sealed inspector's case against an olive branch, two tentative dotted lines of diplomacy approaching a small crimson crux marker in the water. No flags, no weapons, no aircraft, no explosions.",
      ),
    },
  },
  {
    kind: "blog",
    id: "inflation-who-is-to-blame",
    hero: {
      src: "/images/generated/blog/inflation-who-is-to-blame/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A basket of bread and eggs before a rising rust gauge, threads leading from it to a teal printing press, a rust container ship and a brown cash register.",
      prompt: topicHeroPrompt(
        "A market basket of bread and eggs on a counter, three threads leading from it to a small printing press in teal, a cargo ship stacked with containers in rust and a shop till in brown, a tall gauge rising in muted rust behind, a small crimson crux mark. No currency symbols, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "seed-oils-health-truth",
    hero: {
      src: "/images/generated/blog/seed-oils-health-truth/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Glass cruets of plant oil beside soybean pods and leafy sprigs, a steaming cast-iron pan, and an open notebook whose tangled threads unravel toward a crimson cross.",
      prompt: topicHeroPrompt(
        "Glass cruets of plant oil beside soybean pods and rapeseed sprigs drawn in teal ink, a frying pan with faint wisps of steam, an open notebook covered in a tangled web of threads that untangles toward one small crimson crux mark. No labels, no yellow flowers, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "tiktok-brain-rot-science",
    hero: {
      src: "/images/generated/blog/tiktok-brain-rot-science/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal brain under a glass dome with a column of small blank cards falling past it, beside an open book under a reading lamp.",
      prompt: topicHeroPrompt(
        "An anatomical brain sketched in teal ink beneath a glass dome, a narrow vertical stream of tiny blank screen cards falling past it like a waterfall, a calm open book and a reading lamp beside it, a small crimson crux mark. No logos, no faces, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "china-taiwan-invasion-analysis",
    hero: {
      src: "/images/generated/blog/china-taiwan-invasion-analysis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An antique chart of a strait between a mainland coast and an island with a small silver microchip on it, dotted rings of shipping lanes around the island and an hourglass.",
      prompt: topicHeroPrompt(
        "A calm antique nautical chart of a wide strait between a stylised mainland coast and an island, a tiny silver microchip tile resting on the island, a ring of fine dotted teal shipping lanes encircling it, an hourglass on the chart, a small crimson crux marker in the water. No flags, no weapons, no warships.",
      ),
    },
  },
  {
    kind: "blog",
    id: "obesity-choice-or-disease",
    hero: {
      src: "/images/generated/blog/obesity-choice-or-disease/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A double helix twined with a flowering vine beside a table holding a plate of vegetables, a plain paper bag and an injection pen, teal and rust threads meeting at a crimson mark.",
      prompt: topicHeroPrompt(
        "A double helix drawn as a garden trellis with a vine climbing it, beside a kitchen table holding a plate of vegetables and a plain paper takeaway bag, a small injection pen resting between them, teal and rust threads meeting at a small crimson crux mark. No bodies, no logos, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "loneliness-epidemic-evidence",
    hero: {
      src: "/images/generated/blog/loneliness-epidemic-evidence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An empty park bench under a lamppost with an old telephone and a teacup, behind it a terrace of windows each lit around a single chair, joined by a faint teal thread.",
      prompt: topicHeroPrompt(
        "A park bench with two empty seats under a lamppost at dusk, an old telephone and a teacup at one end, a row of apartment windows behind each lit around a single chair, faint teal threads beginning to link a few windows, a small crimson crux mark. No people, no faces.",
      ),
    },
  },
  {
    kind: "blog",
    id: "us-debt-crisis-real",
    hero: {
      src: "/images/generated/blog/us-debt-crisis-real/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A leaning tower of teal and rust books on a rocky shore with a clock and a globe at its base, teal waves at the rocks and a rust crack running to a crimson cross.",
      prompt: topicHeroPrompt(
        "A tall leaning tower of stacked ledger books on a calm shore, a clock without numerals set into its base, teal waves of interest lapping at the rocks, a small globe with faint trade lanes beside it, a thin rust fault line with a small crimson crux mark. No flags, no dollar signs.",
      ),
    },
  },
  {
    kind: "blog",
    id: "return-to-office-evidence",
    hero: {
      src: "/images/generated/blog/return-to-office-evidence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A home desk with a laptop and houseplant facing a glass office tower across a railway platform with a briefcase on its bench, a calendar of teal and rust squares above.",
      prompt: topicHeroPrompt(
        "An empty commuter platform bench with a briefcase, between a home desk with a laptop and a houseplant on one side and a tall glass office tower on the other, a grid of blank calendar squares half teal and half rust, a small crimson crux mark. No people, no text on screens.",
      ),
    },
  },
  {
    kind: "blog",
    id: "ad-hominem-fallacy-explained",
    hero: {
      src: "/images/generated/blog/ad-hominem-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two wooden lecterns on a stage, a rust spotlight falling on an empty coat and hat on a stand beside one, while a teal thread leads to the open book on the lectern.",
      prompt: topicHeroPrompt(
        "Two wooden lecterns on a quiet stage, a rust spotlight falling on an empty coat and hat hung on a stand beside one lectern while the open book on that lectern sits in shadow, a teal thread leading back to the book. No people, no faces.",
      ),
    },
  },
  {
    kind: "blog",
    id: "straw-man-fallacy-explained",
    hero: {
      src: "/images/generated/blog/straw-man-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A bundle of straw tied to a leaning pole in a meadow, a teal thread running past it to a broad, untouched oak tree behind.",
      prompt: topicHeroPrompt(
        "A faceless bundle of straw tied to a pole in a field standing in front of a sturdy oak tree, the straw bundle knocked slightly askew, a teal thread running past it to the untouched oak behind. No people, no scarecrow face.",
      ),
    },
  },
  {
    kind: "blog",
    id: "false-dilemma-fallacy-explained",
    hero: {
      src: "/images/generated/blog/false-dilemma-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A fork in a country road with a teal path and a rust path under two blank signposts, while many faint paths fan out across the meadow between them.",
      prompt: topicHeroPrompt(
        "A fork in a country road with two bold paths drawn in teal and rust and two blank signposts, while many faint pencil paths fan out across the open meadow between them, a small crimson crux mark at the fork. No writing on the signs, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "slippery-slope-fallacy-explained",
    hero: {
      src: "/images/generated/blog/slippery-slope-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A row of dominoes standing down a stepped hillside with one gap circled in crimson, a teal surveyor's level on a tripod sighting along the slope.",
      prompt: topicHeroPrompt(
        "A gentle hillside of stone steps with a row of wooden dominoes standing down the slope, one clear gap in the row circled in crimson, a teal surveyor's level on a tripod checking the incline. No people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "appeal-to-authority-fallacy-explained",
    hero: {
      src: "/images/generated/blog/appeal-to-authority-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An academic gown and mortarboard on a stand casting a shadow toward a laboratory bench, where an open notebook lies under a magnifying glass beside test tubes.",
      prompt: topicHeroPrompt(
        "An academic gown and mortarboard hung on a stand casting a long shadow across a laboratory bench, where an open notebook and test tubes sit under a magnifying glass, a teal thread leading from the evidence on the bench and a rust thread from the gown. No people, no faces.",
      ),
    },
  },
  {
    kind: "blog",
    id: "universal-basic-income-both-sides",
    hero: {
      src: "/images/generated/blog/universal-basic-income-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A row of identical blank envelopes on a kitchen table beside an abacus, a factory and a farmhouse through the window, a teal ribbon and a rust ribbon meeting at a crimson cross.",
      prompt: topicHeroPrompt(
        "A row of identical small unmarked envelopes laid out on a kitchen table beside a wooden abacus, a factory and a farmhouse seen through the window, a teal stream of payments and a rust stream of work hours meeting at a small crimson crux mark. No people, no money symbols.",
      ),
    },
  },
  {
    kind: "blog",
    id: "death-penalty-both-sides",
    hero: {
      src: "/images/generated/blog/death-penalty-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A courtroom bench with a gavel, an hourglass and a balance scale weighing a tied stack of case files against an open book, threads drifting toward a crimson cross.",
      prompt: topicHeroPrompt(
        "An empty courtroom bench with a gavel resting beside a balance scale, one pan holding a neat stack of case files and the other an open book of moral philosophy, an hourglass, the evidence threads stopping short of a small crimson crux mark. No execution imagery, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "drug-decriminalization-both-sides",
    hero: {
      src: "/images/generated/blog/drug-decriminalization-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two coastlines across a teal sea, a lit clinic doorway below a lighthouse on one and a columned courthouse on the other, a dotted route between them marked with a crimson cross.",
      prompt: topicHeroPrompt(
        "An antique chart of two distant coastlines, one with a small clinic doorway lit in soft teal beside a lighthouse and the other with a stone courthouse column, a dotted sea route between them, a small crimson crux mark on the route. No drugs, no needles, no people, no flags.",
      ),
    },
  },
  {
    kind: "blog",
    id: "ai-policy-wars-five-debates-mapped",
    hero: {
      src: "/images/generated/blog/ai-policy-wars-five-debates-mapped/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Five small vignettes, a painter's palette, a street camera, a cable junction box, a driverless car and a glowing fusion ring, each threaded down to one crimson mark.",
      prompt: topicHeroPrompt(
        "Five small vignettes across a parchment chart joined by fine threads: a painter's palette and brush, a camera lens on a lamppost, a cable junction box, a small driverless car, and a glowing teal fusion ring, each thread meeting its own small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "contested-health-claims-mapped",
    hero: {
      src: "/images/generated/blog/contested-health-claims-mapped/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An ear of maize, a plain pill bottle and a vaccine vial in a tray, their teal threads twisting together at a crimson cross before one rust thread runs on to a balance scale.",
      prompt: topicHeroPrompt(
        "Three small still lifes on a parchment table: a stalk of maize, a plain unlabelled pill bottle and a capped vaccine vial in a tray, teal threads from them converging while one rust thread splits off toward a small balance scale of values, a small crimson crux mark. No needles in skin, no labels, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "economic-policy-fights-mapped",
    hero: {
      src: "/images/generated/blog/economic-policy-fights-mapped/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Four vignettes joined by threads at a crimson mark: a factory with a balance scale, a toll arch over a city road, a pocket watch on a ledger, and a toolbox beside an opened phone.",
      prompt: topicHeroPrompt(
        "Four small vignettes on a parchment chart joined by threads: a factory smokestack beside a brass price scale, a toll arch over a city road, a pocket watch resting on a pension ledger, and an open toolbox beside a disassembled phone circuit board, teal and rust paths meeting at a small crimson crux mark. No people, no numbers.",
      ),
    },
  },
  {
    kind: "blog",
    id: "rights-and-hard-tradeoffs-mapped",
    hero: {
      src: "/images/generated/blog/rights-and-hard-tradeoffs-mapped/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale on a library desk weighing an open book against a lamp and a glass of water, a row of cards running to the desk's edge and ending at a crimson cross.",
      prompt: topicHeroPrompt(
        "A law library desk with a balance scale, an open leather-bound book of blank pages on one pan and a bedside lamp with a glass of water on the other, a stack of evidence cards running along the desk and stopping at its edge, a small crimson crux mark. No firearms, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "motte-and-bailey-fallacy-explained",
    hero: {
      src: "/images/generated/blog/motte-and-bailey-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A motte-and-bailey earthwork: a stone keep on a steep grassy mound above a palisaded bailey of cottages and fields, a dotted path winding between the two.",
      prompt: topicHeroPrompt(
        "A medieval motte-and-bailey earthwork drawn in fine ink, a small stone keep on a steep grassy mound above a wide open bailey of cottages and fields enclosed by a wooden palisade, a dotted path running back and forth between the bailey and the keep. No soldiers, no weapons, no flags.",
      ),
    },
  },
  {
    kind: "blog",
    id: "gish-gallop-fallacy-explained",
    hero: {
      src: "/images/generated/blog/gish-gallop-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An avalanche of small paper slips pouring down a hillside toward a lantern-lit desk, where one slip lies under a magnifying glass.",
      prompt: topicHeroPrompt(
        "An avalanche of hundreds of small loose paper slips tumbling down a hillside toward one lantern-lit writing desk, where a single slip lies under a magnifying glass being examined, teal and rust tones. No horses, no people, no writing.",
      ),
    },
  },
  {
    kind: "blog",
    id: "no-true-scotsman-fallacy-explained",
    hero: {
      src: "/images/generated/blog/no-true-scotsman-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A drawing compass tracing a boundary circle around several pebbles so that one sits just outside, fainter earlier circles beneath, and a folded teal and rust tartan scarf.",
      prompt: topicHeroPrompt(
        "A drawing compass redrawing a boundary circle on parchment so that one small stone now sits just outside it, earlier circles ghosted faintly beneath, a folded tartan scarf in teal and rust lying beside the drawing. No people, no flags.",
      ),
    },
  },
  {
    kind: "blog",
    id: "appeal-to-nature-fallacy-explained",
    hero: {
      src: "/images/generated/blog/appeal-to-nature-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A level balance scale with a foxglove stem and a mushroom on one pan and a plain glass bottle with a single pill on the other.",
      prompt: topicHeroPrompt(
        "A still life with a wild foxglove stem and a woodland mushroom on one side and a plain glass medicine bottle with a single pill on the other, a balance scale between them resting level, teal and rust. No labels, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "appeal-to-ignorance-fallacy-explained",
    hero: {
      src: "/images/generated/blog/appeal-to-ignorance-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A brass telescope at an arched window aimed at a dark empty patch in a starry sky, an empty specimen jar and a blank open notebook on the sill.",
      prompt: topicHeroPrompt(
        "An observatory window opening onto a night sky with one dark empty patch, a brass telescope aimed at it, an empty specimen jar and a blank open notebook on the sill, a small crimson crux mark. No people, no writing.",
      ),
    },
  },
  {
    kind: "blog",
    id: "tu-quoque-fallacy-explained",
    hero: {
      src: "/images/generated/blog/tu-quoque-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A soot-darkened cast-iron pot and kettle side by side on an old stove, a teal thread leading past them to an open notebook on the shelf above.",
      prompt: topicHeroPrompt(
        "A cast-iron pot and a kettle side by side on an old stove, both darkened with soot, a fine teal thread leading past them to an open notebook resting on the shelf above. No people, no writing.",
      ),
    },
  },
  {
    kind: "blog",
    id: "sunk-cost-fallacy-explained",
    hero: {
      src: "/images/generated/blog/sunk-cost-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A half-built stone bridge stopping midway over a river, a spilled sack of coins and tools at its base, and a teal path turning off along the bank to a crimson cross.",
      prompt: topicHeroPrompt(
        "A half-built stone bridge reaching out over a river and stopping midway, a pile of spent coins and tools at its base, and a teal path turning away along the bank toward a simple ford downstream, a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "post-hoc-fallacy-explained",
    hero: {
      src: "/images/generated/blog/post-hoc-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A rooster crowing on a farm fence at dawn, a dotted line drawn from it to the rising sun with a crimson cross halfway along.",
      prompt: topicHeroPrompt(
        "A rooster on a farm fence at dawn with the sun rising behind the hills, a faint dotted teal line drawn from the rooster to the sun with a small crimson crux mark on it. No people, no letters.",
      ),
    },
  },
  {
    kind: "blog",
    id: "hasty-generalization-fallacy-explained",
    hero: {
      src: "/images/generated/blog/hasty-generalization-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A single swallow flying over a field of grain, binoculars and a blank notebook on a fence post, and a faint flock of hundreds of birds along the horizon.",
      prompt: topicHeroPrompt(
        "A single swallow in flight over a wide field of grain, a pair of binoculars and an open blank tally notebook on a fence post, a faint flock of hundreds of swallows sketched in pencil along the far horizon. No people, no writing.",
      ),
    },
  },
  {
    kind: "blog",
    id: "circular-reasoning-fallacy-explained",
    hero: {
      src: "/images/generated/blog/circular-reasoning-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A closed loop of paper ribbon, teal inside and rust outside, marked with a crimson cross, beside a short loose length of chain.",
      prompt: topicHeroPrompt(
        "A long ribbon of paper curling into a closed loop with no beginning or end, resting on a desk beside a short chain whose links lead nowhere, teal on the inside of the loop and rust on the outside, a small crimson crux mark. No people, no writing.",
      ),
    },
  },
  {
    kind: "blog",
    id: "strong-argument-vs-persuasive",
    hero: {
      src: "/images/generated/blog/strong-argument-vs-persuasive/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An ornate rust-red footbridge on thin stilts beside a plain teal stone bridge on deep piers, a surveyor's level on the bank in front of both.",
      prompt: topicHeroPrompt(
        "Two bridges side by side over a river: one ornate and brightly painted in rust standing on thin stilts, the other plain teal stone set on deep foundations, a surveyor's level on the bank checking both. No people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "minimum-wage-both-sides",
    hero: {
      src: "/images/generated/blog/minimum-wage-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A spring balance at a shop counter weighing a stack of coins against blank staff rotas, stone steps rising behind it and teal and rust paths meeting at a crimson cross.",
      prompt: topicHeroPrompt(
        "A small shop counter with a spring balance weighing a short stack of coins against a stack of blank staff rotas, worn stone steps of rising wage floors behind it, teal and rust paths meeting at a small crimson crux mark. No people, no currency symbols.",
      ),
    },
  },
  {
    kind: "blog",
    id: "red-herring-fallacy-explained",
    hero: {
      src: "/images/generated/blog/red-herring-fallacy-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A smoked fish lying beside a woodland trail, a line of paw prints veering toward it while the path runs on to a crimson cross in the clearing.",
      prompt: topicHeroPrompt(
        "A smoked kipper in muted rust lying across a woodland trail, a faint line of teal paw prints veering off toward it while the main path continues straight ahead to a clearing with a small crimson crux mark. No people, no dogs.",
      ),
    },
  },
  {
    kind: "blog",
    id: "universal-healthcare-both-sides",
    hero: {
      src: "/images/generated/blog/universal-healthcare-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal umbrella over a row of houses and a clinic, a stethoscope on a pile of blank bills, and teal, pale and rust paths running from the houses.",
      prompt: topicHeroPrompt(
        "A wide teal umbrella over a row of small houses and a clinic, a stethoscope on a ledger of blank bills, and three paths rather than two leading from the houses, teal for coverage, rust for cost and a fainter third between them, a small crimson crux mark. No people, no red crosses.",
      ),
    },
  },
  {
    kind: "blog",
    id: "student-debt-forgiveness-both-sides",
    hero: {
      src: "/images/generated/blog/student-debt-forgiveness-both-sides/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale weighing a mortarboard and diploma against a long unrolled ledger, at the foot of a steep staircase up to a domed university.",
      prompt: topicHeroPrompt(
        "A university on a hill reached by a tall staircase whose steps rise steeply, a mortarboard and a rolled diploma on a balance scale at its foot weighed against a chain of ledger paper, teal and rust paths meeting at a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "blog",
    id: "how-to-spot-a-bad-statistic",
    hero: {
      src: "/images/generated/blog/how-to-spot-a-bad-statistic/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A curiosity shelf of misleading tools: a warped ruler, a lens bulging a bar chart, a lopsided scale, a net holding only the biggest fish, and a graph under a glass dome.",
      prompt: topicHeroPrompt(
        "A cabinet of curiosities displaying misleading measuring tools: a bent ruler, a lopsided scale, a warped lens distorting a small bar chart, a fishing net that holds only the largest fish, and a truncated graph axis, in teal and rust ink. No numbers, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "bayesian-thinking-for-normal-people",
    hero: {
      src: "/images/generated/blog/bayesian-thinking-for-normal-people/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glass jar of pale beans with a few teal ones among them, a magnifying glass over one teal bean, and a small test vial, against a curve shading from rust to teal.",
      prompt: topicHeroPrompt(
        "A large glass jar of many pale beans with only a few teal ones among them, a magnifying glass over a single teal bean on the table, and a small laboratory test vial beside it, a soft curve sliding from rust to teal behind. No numbers, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "survivorship-bias-explained",
    hero: {
      src: "/images/generated/blog/survivorship-bias-explained/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Three sailing ships returning to harbour in a lighthouse's teal beam, while faint outlines of many other ships rest on the sea floor beneath them.",
      prompt: topicHeroPrompt(
        "A calm harbour at dusk with three sailing ships safely returning past a lighthouse, while below the water's surface faint pencil outlines of many other ships rest quietly on the sea floor, a teal beam of light falling only on the returning ships. No people, no wreckage debris.",
      ),
    },
  },
  {
    kind: "blog",
    id: "what-the-ai-safety-evidence-of-2026-shows",
    hero: {
      src: "/images/generated/blog/what-the-ai-safety-evidence-of-2026-shows/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal network of nodes inside a cracked glass dome, one thread escaping through the crack and fanning into teal and rust paths, beside a metronome and an observation window.",
      prompt: topicHeroPrompt(
        "A glowing teal lattice of network nodes at the centre of a parchment chart with branching future paths fanning outward, one fine thread slipping out through a gap in the glass test enclosure around it, a one-way observation window and a brass metronome beside it, a small crimson crux aperture. No robots, no faces, no people.",
      ),
    },
  },
  {
    kind: "blog",
    id: "obamacare-subsidy-cliff-who-left-the-marketplace",
    hero: {
      src: "/images/generated/blog/obamacare-subsidy-cliff-who-left-the-marketplace/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A kitchen table at a cliff edge holding a ledger, a sieve, a folded umbrella and blank envelopes, a teal cloth running over the edge into a rust slope where envelopes drift down.",
      prompt: topicHeroPrompt(
        "A kitchen table at the edge of a stone cliff with a household ledger and a stack of blank insurance envelopes, a teal path of premium support running to the edge and dropping into a rust slope, a few envelopes drifting down, a sieve resting on the ledger and a half-closed umbrella, a small crimson crux mark. No people, no logos, no numbers.",
      ),
    },
  },
  {
    kind: "blog",
    id: "should-members-of-congress-trade-stocks",
    hero: {
      src: "/images/generated/blog/should-members-of-congress-trade-stocks/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A domed legislature with a ribbon of blank ticker tape running to a trading desk, a sealed glass box and an open ledger under a magnifying glass, teal and rust paths meeting at a crimson mark.",
      prompt: topicHeroPrompt(
        "A domed legislature drawn in architectural elevation with a ribbon of blank ticker tape running from its steps to a small brokerage desk, a sealed glass blind-trust box and an open disclosure ledger under a magnifying glass, teal and rust paths meeting at a small crimson crux mark. No people, no flags, no numbers, no logos.",
      ),
    },
  },
  {
    kind: "blog",
    id: "gerrymandering-redistricting-war-election-day",
    hero: {
      src: "/images/generated/blog/gerrymandering-redistricting-war-election-day/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A wooden ballot box beside an invented patchwork map whose dotted district lines are redrawn, with compasses, a pen and teal and rust ink pots at dawn.",
      prompt: topicHeroPrompt(
        "A wooden ballot box on a surveyor's table at dawn beside an invented patchwork territory whose dotted boundaries have been erased and redrawn, faint earlier lines ghosted beneath, compasses and a ruling pen, teal and rust ink pots, a small crimson crux mark. No real states or countries, no recognisable map outlines, no party symbols, no flags.",
      ),
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
    id: "congress-stock-trading-ban",
    hero: {
      src: "/images/generated/topics/congress-stock-trading-ban/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A domed legislature behind a small trading desk spilling blank ticker tape, opposite a glass blind-trust box holding a sealed envelope and an open disclosure ledger.",
      prompt: topicHeroPrompt(
        "A domed legislature drawn in architectural elevation beside a small brokerage desk with a ticker-tape ribbon of blank paper curling off it, a glass blind trust box with a sealed envelope inside and an open ledger of disclosures, teal and rust paths meeting at a small crimson crux mark. No people, no flags, no numbers, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "partisan-gerrymandering",
    hero: {
      src: "/images/generated/topics/partisan-gerrymandering/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An invented patchwork of dotted-line districts on a survey table, where compasses and a ruling pen draw one boundary into a long winding shape beside a faint even grid, with ink pots and a ballot box.",
      prompt: topicHeroPrompt(
        "An abstract invented patchwork territory on a surveyor's table, its blank regions bounded by dotted lines, a pair of compasses and a ruling pen redrawing one boundary into a long winding shape, a fair even grid drawn faintly beside it, teal and rust ink pots and a wooden ballot box, a small crimson crux mark. No real states or countries, no recognisable map outlines, no party symbols, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "aca-enhanced-subsidies",
    hero: {
      src: "/images/generated/topics/aca-enhanced-subsidies/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A kitchen table with a budget ledger, insurance envelopes, a clinic card and a small teal umbrella, before a landscape where a teal path ends abruptly at a cliff above a rust slope.",
      prompt: topicHeroPrompt(
        "A kitchen table with a household budget ledger, a stack of blank insurance envelopes and a clinic appointment card, a stone cliff edge drawn across the page where a teal premium-support path suddenly drops into a rust slope, a small umbrella resting on the ledger, a small crimson crux mark. No people, no logos, no numbers.",
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
    id: "psychedelics-mental-health",
    hero: {
      src: "/images/generated/topics/psychedelics-mental-health/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A reclining chair in a quiet clinic room beside a dish of dried mushrooms and a capsule, with teal ripples spreading from the dish toward a window landscape and a rust path of caution.",
      prompt: topicHeroPrompt(
        "A quiet clinic room with a reclining chair, a folded blanket and a small dish holding a few dried mushroom caps beside a single capsule, soft concentric teal ripples spreading from the dish into a calm landscape window, a rust path of caution, a small crimson crux mark. No people, no swirling trippy colours.",
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
    id: "ultra-processed-food",
    hero: {
      src: "/images/generated/topics/ultra-processed-food/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A long shelf of identical unlabelled boxes and packets facing a farm table of bread, eggs, milk and vegetables, with a measuring tape coiled between them.",
      prompt: topicHeroPrompt(
        "A long supermarket shelf of identical unlabelled boxes, packets and plain wrappers beside a farm-table spread of whole bread, eggs, vegetables and a jug of milk, a measuring tape coiled between them, teal and rust paths meeting at a small crimson crux mark. No brands, no labels, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "longevity-science",
    hero: {
      src: "/images/generated/topics/longevity-science/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An hourglass whose lower bulb holds a young evergreen, beside a rack of test tubes and a cell drawing, with a teal life-line running past a rust horizon.",
      prompt: topicHeroPrompt(
        "An antique hourglass whose lower bulb sprouts a small evergreen tree, a laboratory rack of test tubes and a cell drawn as a delicate rosette beside it, a long teal life-line extending past a rust horizon line, a small crimson crux mark. No people, no elderly faces.",
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
    id: "microplastics-health-crisis",
    hero: {
      src: "/images/generated/topics/microplastics-health-crisis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An ocean wave, a glass of water and a drop of blood under a microscope, all flecked with tiny plastic fragments, with a magnifying glass over the drop.",
      prompt: topicHeroPrompt(
        "A cross-section of an ocean wave, a glass of water and a drop of blood under a microscope lens, all speckled with tiny teal and rust plastic fragments drawn as fine confetti, a magnifying glass over the drop, a small crimson crux mark. No dead animals, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "glp1-weight-loss-drugs",
    hero: {
      src: "/images/generated/topics/glp1-weight-loss-drugs/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An injection pen on a clinic tray beside a small plate of food, with a teal appetite curve falling and a rust cost-and-side-effects curve rising, and a doctor's scale behind.",
      prompt: topicHeroPrompt(
        "A sleek injection pen lying on a clinic tray beside a small dinner plate with a modest portion, a gentle teal curve of appetite easing downward and a rust thread of side effects and cost, a doctor's scale in the background, a small crimson crux mark. No brands, no people, no needles in skin.",
      ),
    },
  },
  {
    kind: "topic",
    id: "fluoride-water-supplies",
    hero: {
      src: "/images/generated/topics/fluoride-water-supplies/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A water tower and treatment plant piping water to a tap that fills a glass, beside a molar, a dropper and a dose-threshold bar, above a town's rooftops.",
      prompt: topicHeroPrompt(
        "A municipal water tower and treatment plant above a town of rooftops, a teal pipe carrying water to a kitchen tap where a glass fills, a molar tooth drawn in fine ink beside a dropper and a dose-threshold bar, a small crimson crux mark. No people, no labels.",
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
    id: "obesity-personal-responsibility",
    hero: {
      src: "/images/generated/topics/obesity-personal-responsibility/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A pair of running shoes at a fork between a teal path to a home kitchen of vegetables and a rust path to a street of fast-food awnings.",
      prompt: topicHeroPrompt(
        "A crossroads where one path leads to a home kitchen with a cutting board and vegetables and the other through a street of fast-food awnings without signs, a pair of running shoes at the junction, teal and rust paths meeting at a small crimson crux mark. No bodies, no people, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "loneliness-epidemic",
    hero: {
      src: "/images/generated/topics/loneliness-epidemic/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An apartment building at dusk where each lit window shows a single empty chair, with faint teal threads beginning to link the windows to a park bench.",
      prompt: topicHeroPrompt(
        "A long row of apartment windows at dusk, each lit room holding a single empty chair, with faint teal threads beginning to connect a few windows across the street, a park bench below with one empty seat, a small crimson crux mark. No people, no faces.",
      ),
    },
  },
  {
    kind: "topic",
    id: "remote-work-permanence",
    hero: {
      src: "/images/generated/topics/remote-work-permanence/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A home desk with a laptop and coffee mug by a garden window, with a teal path across a valley to a distant glass office tower and a rust commute path.",
      prompt: topicHeroPrompt(
        "A cosy home desk with a laptop showing a blank teal screen, a coffee mug and a window onto a garden, facing a distant empty glass office tower across a valley, teal and rust commute paths meeting at a small crimson crux mark. No people, no text on screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "college-value-proposition",
    hero: {
      src: "/images/generated/topics/college-value-proposition/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A mortarboard on a stack of books before a university gate and clock tower, with a scale weighing a sack of loan coins against a teal earnings staircase.",
      prompt: topicHeroPrompt(
        "A university gate and clock tower on a hill with a mortarboard resting on a stack of books in the foreground, a balance scale weighing a small sack of loan coins against a rising teal earnings staircase, a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "homeschooling-effectiveness",
    hero: {
      src: "/images/generated/topics/homeschooling-effectiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A kitchen table set as a classroom with a globe, books, a slate and pencils, with a brick schoolhouse visible through the window.",
      prompt: topicHeroPrompt(
        "A kitchen table set as a classroom with a globe, open books, a chalk slate and a pot of pencils, beside the window a distant brick schoolhouse with an empty pole, teal and rust paths of learning meeting at a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "billionaire-wealth",
    hero: {
      src: "/images/generated/topics/billionaire-wealth/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A mountain of stacked coins and sealed deeds above a valley of small houses and workshops, with a rust river of capital and a teal river of innovation meeting below.",
      prompt: topicHeroPrompt(
        "A single towering mountain of stacked stone-grey coins and deeds casting a long shadow over a valley of small houses and workshops, a rust river of capital running down its side and a teal river of innovation, meeting at a small crimson crux mark. No people, no dollar signs.",
      ),
    },
  },
  {
    kind: "topic",
    id: "foreign-aid-effectiveness",
    hero: {
      src: "/images/generated/topics/foreign-aid-effectiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A ribbon-tied aid crate on a dock with threads running to a village well, a small clinic and a schoolhouse, some threads fraying in rust.",
      prompt: topicHeroPrompt(
        "A cargo crate on a dock with a teal ribbon, unloaded beside a village well, a small clinic and a schoolhouse in a dry landscape, threads from the crate branching to each, some fraying in rust, a small crimson crux mark. No flags, no people, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "cryptocurrency-value",
    hero: {
      src: "/images/generated/topics/cryptocurrency-value/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale weighing a teal lattice coin against a stone ingot and a house key, in front of a jagged rust price line rising and falling.",
      prompt: topicHeroPrompt(
        "An antique jeweller's balance weighing a single engraved digital coin drawn as a lattice of teal nodes against a small stone ingot and a house key, a jagged rust price line climbing and falling behind them, a small crimson crux mark. No symbols, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "cryptocurrency-regulation",
    hero: {
      src: "/images/generated/topics/cryptocurrency-regulation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A chain of translucent teal blocks running into an open bank vault where a ledger and a rubber stamp wait, with a rust risk path below.",
      prompt: topicHeroPrompt(
        "A teal chain of linked translucent blocks running across a parchment table into an old bank vault doorway where a clerk's ledger, a rubber stamp and a measuring rule wait, a rust path of risk, a small crimson crux mark. No symbols, no logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "gig-economy-regulation",
    hero: {
      src: "/images/generated/topics/gig-economy-regulation/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A delivery bicycle with an insulated food box and a phone map on the handlebar, beside a parked car under a streetlamp, with a contract and a clock above.",
      prompt: topicHeroPrompt(
        "A delivery bicycle with an insulated food box and a parked car leaning by a curb under a streetlamp, a phone on the handlebar showing a blank teal map, a contract page and a time clock floating above, teal and rust paths meeting at a small crimson crux mark. No logos, no people.",
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
    id: "four-day-work-week",
    hero: {
      src: "/images/generated/topics/four-day-work-week/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A row of seven blank calendar pages where the fifth opens onto a garden path with a hammock and bicycle, beside an office desk, under a level teal line.",
      prompt: topicHeroPrompt(
        "A weekly desk calendar of seven blank pages, the fifth turned into a sunlit garden path leading away from an office desk toward a hammock and bicycle, a teal productivity line holding level, a small crimson crux mark. No numbers, no letters, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "student-debt-forgiveness",
    hero: {
      src: "/images/generated/topics/student-debt-forgiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A mortarboard on a ball and chain made of ledger paper, with scissors about to cut a link, before a university on a hill and a row of houses.",
      prompt: topicHeroPrompt(
        "A graduation mortarboard resting on a heavy iron ball and chain made of ledger paper, a pair of scissors poised over one link, a university on a hill behind and a row of small houses beyond, teal and rust paths meeting at a small crimson crux mark. No people, no text.",
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
    id: "global-housing-bubble",
    hero: {
      src: "/images/generated/topics/global-housing-bubble/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A soap bubble holding a reflected townscape floats above rooftops and tower blocks, with a rust interest-rate line rising beneath it.",
      prompt: topicHeroPrompt(
        "A translucent soap bubble floating above a skyline of houses and apartment towers drawn in teal ink, the bubble reflecting tiny rooftops, a pin hovering near it and a rust interest-rate line curving upward below, a small crimson crux mark. No people, no text.",
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
    id: "return-to-office-productivity",
    hero: {
      src: "/images/generated/topics/return-to-office-productivity/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An empty open-plan office behind a revolving door, with teal collaboration and rust commute ribbons meeting before a road winding back to suburban houses.",
      prompt: topicHeroPrompt(
        "An open-plan office floor with rows of empty desks and a whiteboard without writing, a revolving door on one side and a winding commuter road back to suburban houses on the other, teal collaboration threads and rust commute threads meeting at a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "lab-diamonds-ethics",
    hero: {
      src: "/images/generated/topics/lab-diamonds-ethics/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two identical diamonds on teal velvet with a jeweller's loupe, one linked to an open-pit mine in rust earth and the other to a laboratory press.",
      prompt: topicHeroPrompt(
        "Two identical faceted diamonds side by side on a jeweller's velvet cloth, one above a cutaway of an open-pit mine in rust earth, the other above a teal laboratory pressure chamber, a loupe between them, a small crimson crux mark. No people, no brands.",
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
    id: "degrowth-economics",
    hero: {
      src: "/images/generated/topics/degrowth-economics/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal growth vine curving from a smoky factory town toward a dotted boundary ring that encloses a garden with a windmill and bicycles.",
      prompt: topicHeroPrompt(
        "A rising teal economic curve drawn like a tall plant reaching toward a dotted planetary boundary ring, beside it a smaller balanced garden with a windmill and bicycles inside the ring, a rust smoke thread, a small crimson crux mark. No people, no numbers.",
      ),
    },
  },
  {
    kind: "topic",
    id: "free-will",
    hero: {
      src: "/images/generated/topics/free-will/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A single pawn on a chessboard at the fork of many dotted paths, beneath interlocking clockwork gears, with teal choice and rust cause ribbons meeting above.",
      prompt: topicHeroPrompt(
        "A chessboard on a parchment table where a single pawn stands at a fork of many faint dotted paths, behind it a clockwork of interlocking gears drawn in fine ink, a teal path of choice and a rust path of cause meeting at a small crimson crux mark. No people, no hands.",
      ),
    },
  },
  {
    kind: "topic",
    id: "simulation-hypothesis",
    hero: {
      src: "/images/generated/topics/simulation-hypothesis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glass globe holding a tiny world of hills, a river and a village, on a desk in a room drawn as a faint wireframe, with a teal thread looping out of the globe.",
      prompt: topicHeroPrompt(
        "A small glass terrarium world with tiny hills, a river and a village, standing on a desk inside a larger room that is itself drawn as a faint wireframe lattice receding outward, a teal thread looping from the inner world to the outer, a small crimson crux mark. No people, no screens.",
      ),
    },
  },
  {
    kind: "topic",
    id: "minneapolis-shooting",
    hero: {
      src: "/images/generated/topics/minneapolis-shooting/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A quiet snowy city corner at dawn under bare trees and a streetlamp, with a closed notebook of witness accounts and two photographs of the same corner from different angles.",
      prompt: topicHeroPrompt(
        "A quiet winter city street at dawn under bare trees and one streetlamp, an empty sidewalk lightly dusted with snow, a closed notebook of witness statements and two camera-frame outlines showing different angles of the same corner, a small crimson crux mark. Calm and solemn. No people, no weapons, no vehicles with markings.",
      ),
    },
  },
  {
    kind: "topic",
    id: "consciousness-ai-systems",
    hero: {
      src: "/images/generated/topics/consciousness-ai-systems/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A laptop with a dark screen giving off a faint teal lattice like steam, beside a lit candle in a glass jar and a magnifying glass, circled by rust threads.",
      prompt: topicHeroPrompt(
        "A dark-screened terminal on a desk with a faint teal lattice rising from it like steam, beside a glass jar containing a single lit candle, a magnifying glass between them, rust question threads circling both, a small crimson crux mark. No robots, no faces, no brains.",
      ),
    },
  },
  {
    kind: "topic",
    id: "meaning-without-religion",
    hero: {
      src: "/images/generated/topics/meaning-without-religion/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A stone bench with an open book and a lantern on a hilltop at dusk, facing a valley under a starry teal sky, with a chapel on one side and a library on the other.",
      prompt: topicHeroPrompt(
        "A hilltop at dusk with an empty stone bench facing a wide valley and a starry teal sky, a small open notebook and a lantern on the bench, a distant chapel spire on one side and a library on the other, threads meeting at a small crimson crux mark. No people, no religious symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "meritocracy-myth",
    hero: {
      src: "/images/generated/topics/meritocracy-myth/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A worn stone staircase with missing steps, small ladders and a ramp, climbing to a lit doorway, with teal and rust paths starting from different heights.",
      prompt: topicHeroPrompt(
        "A long staircase of stone steps leading up to a lit doorway, some steps worn smooth and others missing, a few small ladders and a ramp leaning against it, teal and rust paths climbing from different starting heights, a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "consciousness-hard-problem",
    hero: {
      src: "/images/generated/topics/consciousness-hard-problem/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A branching neuron in fine ink with a soft teal glow at its centre, ringed by callipers, dividers and a microscope that do not reach it.",
      prompt: topicHeroPrompt(
        "An anatomical ink drawing of neural branching seen from the side, with a single soft teal glow at its centre that the surrounding measuring instruments, callipers and a microscope cannot quite reach, a rust thread circling it, a small crimson crux mark. No faces, no full human head.",
      ),
    },
  },
  {
    kind: "topic",
    id: "artificial-reproduction-ethics",
    hero: {
      src: "/images/generated/topics/artificial-reproduction-ethics/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glowing teal biobag vessel in a laboratory cradle beside a petri dish and a slide showing a skin cell becoming an egg cell, under a family-tree diagram.",
      prompt: topicHeroPrompt(
        "A transparent biobag vessel glowing softly teal in a laboratory cradle, beside a petri dish and a skin-cell sketch transforming into an egg cell on a slide, a family-tree thread branching above, a rust thread of caution, a small crimson crux mark. No foetus, no babies, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "gain-of-function-research-ban",
    hero: {
      src: "/images/generated/topics/gain-of-function-research-ban/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A cutaway high-containment lab with glove boxes and racks of vials, a padlock at its door, and teal and rust paths leading to a vaccine vial and a sealed hatch.",
      prompt: topicHeroPrompt(
        "A high-containment laboratory drawn as a calm cutaway with airlocks, glove-box cabinets and sealed racks of vials, a padlock and a teal research path running out one door toward a vaccine vial, a rust risk path toward a sealed hatch, a small crimson crux mark. No viruses, no hazard symbols, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "children-smartphone-age",
    hero: {
      src: "/images/generated/topics/children-smartphone-age/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A backpack and kite on a garden fence beside a simple flip phone, while a smartphone sits on a high shelf above a notched height chart.",
      prompt: topicHeroPrompt(
        "A child-sized backpack hung on a garden fence beside a kite and a simple flip phone, a sleek smartphone resting on a high shelf just out of reach, a height chart with notches but no numbers, teal and rust paths meeting at a small crimson crux mark. No people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "alternatives-to-democracy",
    hero: {
      src: "/images/generated/topics/alternatives-to-democracy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Miniature models of a domed assembly, a council table, a lottery urn of tokens and a technocratic tower arranged on a round table and linked by threads.",
      prompt: topicHeroPrompt(
        "A semicircle of several small model parliaments and councils drawn as architectural miniatures on a table: a domed assembly, a round council table, a lottery urn of tokens and a technocratic tower, teal and rust threads linking them, a small crimson crux mark. No flags, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "geoengineering-climate",
    hero: {
      src: "/images/generated/topics/geoengineering-climate/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A high-flying aircraft trailing a fine teal veil of particles that softens the sunlight over the curve of the Earth, beside a thermometer and a rust risk line.",
      prompt: topicHeroPrompt(
        "A high-altitude aircraft silhouette trailing a fine teal veil of reflective particles across the upper sky, softening sunlight over a parchment earth below, a thermometer and a rust thread of risk running down to the ground, a small crimson crux mark. No disaster, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "central-bank-digital-currency",
    hero: {
      src: "/images/generated/topics/central-bank-digital-currency/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal lattice coin hovering over a shop counter with an open wallet, linked by threads to a columned central bank, with an eye-shaped magnifier on one thread.",
      prompt: topicHeroPrompt(
        "A teal digital coin drawn as a lattice disc hovering above a shop counter, threads from it running to a grand columned central bank in the distance, a small eye-shaped magnifier peering along one thread, a leather wallet lying open, a small crimson crux mark. No symbols, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "masculinity-crisis",
    hero: {
      src: "/images/generated/topics/masculinity-crisis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A workshop with tools on a pegboard, a dusty trophy, school books and boots by the door, with a teal path out to a lit town and a rust path into a dim room.",
      prompt: topicHeroPrompt(
        "An empty workshop bench with old tools hung on a pegboard, a pair of boots by the door, a dusty trophy and a stack of school books, a winding teal path out the doorway toward a distant lit town, a rust path toward a dim room, a small crimson crux mark. No people, no faces.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-deepfakes-truth-collapse",
    hero: {
      src: "/images/generated/topics/ai-deepfakes-truth-collapse/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A tall mirror reflecting a landscape slightly different from the real view beside it, with a magnifying glass revealing a lattice in the reflection and blank photographs scattered.",
      prompt: topicHeroPrompt(
        "A tall mirror in a parchment hall reflecting a landscape slightly different from the one in front of it, a magnifying glass revealing a faint teal lattice in the reflection, scattered photograph frames with blank interiors, a small crimson crux mark. No faces, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "declining-birth-rates",
    hero: {
      src: "/images/generated/topics/declining-birth-rates/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A long row of cribs fading from full colour to faint outlines toward the horizon, under a teal curve bending downward and a thinning family-tree branch.",
      prompt: topicHeroPrompt(
        "A long row of nursery cribs fading from full colour in the foreground to faint pencil outlines in the distance, a family-tree thread narrowing toward the horizon, a teal population curve bending downward, a small crimson crux mark. No babies, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "nuclear-proliferation-new-arms-race",
    hero: {
      src: "/images/generated/topics/nuclear-proliferation-new-arms-race/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Three sealed vault doors on a strategist's map table, linked by dotted lines of tension, with torn treaty scrolls and a plain clock nearby.",
      prompt: topicHeroPrompt(
        "A calm strategist's map table with three sealed vault doors on it and a pile of torn treaty scrolls without legible writing, a plain clock without numerals, teal and rust dotted lines of tension stretched between the vaults, a small crimson crux mark. No missiles, no explosions, no flags.",
      ),
    },
  },
  {
    kind: "topic",
    id: "transgender-athletes-sports",
    hero: {
      src: "/images/generated/topics/transgender-athletes-sports/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An empty running track at dawn with starting blocks and a finish line, and a balance scale on the infield weighing a stopwatch against a laurel wreath.",
      prompt: topicHeroPrompt(
        "An empty running track at dawn with starting blocks and a finish line, a balance scale resting on the infield weighing a stopwatch against a laurel wreath, a teal path of inclusion and a rust path of fair categories meeting at a small crimson crux mark. Calm and abstract. No people, no bodies, no flags or symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "animal-consciousness-rights",
    hero: {
      src: "/images/generated/topics/animal-consciousness-rights/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An octopus in a tide pool, a crow on a branch and a cow in a meadow, each linked by a faint teal thread to a glowing node, with a rust thread to a farm fence.",
      prompt: topicHeroPrompt(
        "A forest clearing where an octopus in a tide pool, a crow on a branch and a cow in a meadow are drawn with gentle attention, faint teal threads linking each to a glowing node of experience, a rust thread to a farm fence, a small crimson crux mark. No suffering, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "immigration-national-identity",
    hero: {
      src: "/images/generated/topics/immigration-national-identity/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A town square with an old fountain and clock tower, teal and rust shop awnings side by side, and a long table set with many different dishes and empty chairs.",
      prompt: topicHeroPrompt(
        "A town square with an old stone fountain and clock tower, new shopfront awnings in teal and older ones in rust standing side by side, a long dinner table set with many different dishes and empty chairs, threads meeting at a small crimson crux mark. No people, no flags, no religious symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "affirmative-action-meritocracy",
    hero: {
      src: "/images/generated/topics/affirmative-action-meritocracy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "An admissions table with a balance scale, a sieve and a stack of blank application folders, before an uneven stone staircase climbing to a lit gate.",
      prompt: topicHeroPrompt(
        "A university admissions table with a balance scale, a sieve and a stack of blank application folders, a winding staircase of uneven steps leading up to a lit gate behind it, teal and rust paths meeting at a small crimson crux mark. No people, no faces, no symbols.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ukraine-peace-terms",
    hero: {
      src: "/images/generated/topics/ukraine-peace-terms/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A map of wide plains and rivers crossed by a long dotted line, with an olive branch and a balance scale on it, above a table with two empty chairs and an unsigned document.",
      prompt: topicHeroPrompt(
        "A calm antique map of wide plains and rivers with a long dotted line drawn across it, a negotiating table with two empty chairs and a folded unsigned document, an olive branch and a set of scales resting on the map, a small crimson crux mark. No flags, no weapons, no place names.",
      ),
    },
  },
  {
    kind: "topic",
    id: "trump-tariffs",
    hero: {
      src: "/images/generated/topics/trump-tariffs/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A port with stacked shipping containers under an iron toll gate, and a balance scale on the quay weighing a small factory against a shopping basket, with trade routes curving out to sea.",
      prompt: topicHeroPrompt(
        "A busy port with stacked shipping containers and a large iron toll gate across the quay, a balance scale on the dock weighing a small factory against a shopping basket, teal and rust trade routes curving out to sea, a small crimson crux mark. No people, no flags, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "rfk-health-policy",
    hero: {
      src: "/images/generated/topics/rfk-health-policy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A neoclassical health agency building partly under scaffolding, with a shelf of vaccine vials on one side and a cereal bowl and a dye dropper on the other.",
      prompt: topicHeroPrompt(
        "A grand neoclassical health agency building being partly rebuilt with scaffolding, in the foreground a pharmacy shelf with vaccine vials, a cereal bowl and a food-dye droplet, teal and rust paths meeting at a small crimson crux mark. No people, no portraits, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "doge-federal-cuts",
    hero: {
      src: "/images/generated/topics/doge-federal-cuts/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Large shears cutting a rust ribbon of red tape in a long federal office hallway of filing cabinets and boxed-up desks, beside a ledger with crossing teal and rust lines.",
      prompt: topicHeroPrompt(
        "A long federal office hallway of filing cabinets and desks, a large pair of shears cutting through a red-tape ribbon, some desks emptied and boxed, a ledger with a teal savings line and a rust services line meeting at a small crimson crux mark. No people, no logos, no portraits.",
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
    id: "carbon-tax-effectiveness",
    hero: {
      src: "/images/generated/topics/carbon-tax-effectiveness/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A factory chimney with a price tag hanging from its plume, a balance scale weighing a fuel can against a small wind turbine, and an envelope of rebate coins.",
      prompt: topicHeroPrompt(
        "A factory chimney with a small iron price tag hanging from its plume, the smoke thinning into teal air, a balance scale weighing a fuel can against a small wind turbine, a household envelope of rebate coins beside it, a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "congestion-pricing",
    hero: {
      src: "/images/generated/topics/congestion-pricing/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A city avenue under a toll arch, with dense rust traffic queued on one side, a light flow beyond, and a teal subway train running beneath.",
      prompt: topicHeroPrompt(
        "A city avenue seen from above with a toll gantry arch across it, traffic thinning from a dense rust queue of cars before the arch to a light flow beyond, a teal subway line running beneath the street, a small crimson crux mark. No people, no text, no signs.",
      ),
    },
  },
  {
    kind: "topic",
    id: "right-to-repair",
    hero: {
      src: "/images/generated/topics/right-to-repair/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A workbench with opened phones, a laptop and an engine part laid out beside screwdrivers and a soldering iron, between a padlocked parts drawer and an open toolbox.",
      prompt: topicHeroPrompt(
        "An open workbench with a disassembled phone, a tractor engine part and a laptop laid out beside a set of screwdrivers and a soldering iron, a padlocked parts drawer and an open toolbox, teal and rust paths meeting at a small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "assisted-dying-euthanasia",
    hero: {
      src: "/images/generated/topics/assisted-dying-euthanasia/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A quiet sunlit window with flowers, an hourglass on the sill and a blanket on an empty chair, with teal autonomy and rust protection paths meeting nearby.",
      prompt: topicHeroPrompt(
        "A quiet sunlit bedroom window with a vase of flowers and a folded blanket on an empty chair, an hourglass with the last sand falling softly on the sill, a teal path of autonomy and a rust path of protection meeting at a small crimson crux mark. Gentle and calm. No people, no medical equipment.",
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
    id: "self-driving-car-safety",
    hero: {
      src: "/images/generated/topics/self-driving-car-safety/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A driverless car with an empty driver's seat casting teal sensor cones across a crosswalk, beside a stack of blank tally cards, with a small car on a rust road behind.",
      prompt: topicHeroPrompt(
        "A driverless car with an empty steering wheel on a city street, faint teal sensor cones sweeping the crosswalk ahead, a ledger of crash tallies drawn as stacked blank cards beside the road, a rust path of human driving, a small crimson crux mark. No people, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "net-neutrality",
    hero: {
      src: "/images/generated/topics/net-neutrality/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal river running through canal locks where boats of equal size travel, with one narrowed gate at a toll booth and a rust channel for a private fast lane.",
      prompt: topicHeroPrompt(
        "A broad teal data river flowing through a set of canal locks, some lock gates wide open and one narrowed with a toll booth, small boats of equal size travelling on the water, a rust channel of a faster private lane, a small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "generative-ai-art-copyright",
    hero: {
      src: "/images/generated/topics/generative-ai-art-copyright/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Teal threads drawn from a painting on an easel and a stack of manuscripts into a loom that weaves a new canvas, with a balance scale and a wax-sealed page on the desk.",
      prompt: topicHeroPrompt(
        "A painter's easel and a writer's desk with stacked manuscripts feeding a thin stream of teal threads into a glowing lattice loom that weaves a new canvas, a blank wax seal and a balance scale on the desk, a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "facial-recognition-policing",
    hero: {
      src: "/images/generated/topics/facial-recognition-policing/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A camera on a lamppost overlooking a plaza scattered with blank oval tokens, joined by a faint teal measurement grid and a rust thread of error.",
      prompt: topicHeroPrompt(
        "A city plaza seen from a high angle with a camera on a lamppost and a faint teal grid of measurement lines overlaid on blank oval face-shaped tokens scattered like coins on the paving, a rust thread of error, a small crimson crux mark. No real faces, no people, no badges.",
      ),
    },
  },
  {
    kind: "topic",
    id: "gmo-crops-safety",
    hero: {
      src: "/images/generated/topics/gmo-crops-safety/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A maize plant cut open to show a teal DNA strand being edited, beside rice, a harvest basket and a plate of food, with a rust path into a wetland.",
      prompt: topicHeroPrompt(
        "A field of ripening maize and rice drawn in botanical detail, one plant cross-sectioned to show a teal DNA strand being edited, a harvest basket and a plate of food at the field edge, a rust path of ecological concern, a small crimson crux mark. No labels, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "nuclear-fusion-timeline",
    hero: {
      src: "/images/generated/topics/nuclear-fusion-timeline/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A cutaway tokamak with a bright teal plasma ring inside, a timeline rail running from it to a distant power grid, and a calendar wheel above.",
      prompt: topicHeroPrompt(
        "A doughnut-shaped tokamak drawn as an engineer's cutaway with a bright teal plasma ring inside, a long timeline rail running from it across the page toward a distant power grid, a calendar wheel without numerals, a small crimson crux mark. No people, no text.",
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
  {
    kind: "topic",
    id: "ssri-antidepressant-efficacy",
    hero: {
      src: "/images/generated/topics/ssri-antidepressant-efficacy/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "Two unlabelled pill jars on a nightstand, one of teal tablets and one of white placebo pills, under a magnifying glass over two close mood curves.",
      prompt: topicHeroPrompt(
        "Two identical pill bottles without labels side by side on a nightstand, one holding small teal tablets and the other plain sugar pills, a pair of overlapping mood curves rising above them, a magnifying glass over the gap, a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "social-security-retirement-age",
    hero: {
      src: "/images/generated/topics/social-security-retirement-age/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A road of years winding past a factory, an office and a farm to a bench under a tree, with a gate across the road being moved further uphill.",
      prompt: topicHeroPrompt(
        "A long winding road of years climbing past a factory, an office and a farm toward a garden bench under a tree, a toll-like gate across the road being moved one step further uphill, a teal savings stream and a rust payroll stream meeting at a small crimson crux mark. No people, no numbers.",
      ),
    },
  },
  {
    kind: "topic",
    id: "estate-inheritance-tax",
    hero: {
      src: "/images/generated/topics/estate-inheritance-tax/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A manor house and an old oak behind a desk with a ribboned will and house keys, and a balance scale weighing a few coins against a public library.",
      prompt: topicHeroPrompt(
        "A family manor house and an old oak tree with a long family-tree thread, a ribbon-tied will and a set of house keys on a writing desk, a balance scale weighing a small share of coins against a public library, a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "occupational-licensing-reform",
    hero: {
      src: "/images/generated/topics/occupational-licensing-reform/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A row of small trade workshops, each behind a padlocked gate with a stack of blank certificates, with teal and rust paths crossing in front.",
      prompt: topicHeroPrompt(
        "A row of small trade workshops, a hairdresser's chair, a florist's bench and an electrician's toolbox, each behind its own gate with a heavy padlock and a stack of blank certificates, a teal path of safety and a rust path of entry, a small crimson crux mark. No people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "encryption-backdoors",
    hero: {
      src: "/images/generated/topics/encryption-backdoors/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal steel safe of sealed envelopes beside a master key on a hook, with a magnifying glass and a rust thread leading to a keyhole on its side.",
      prompt: topicHeroPrompt(
        "A strong teal-steel safe holding sealed envelopes, a large master key hanging on a hook beside it, a magnifying glass and a thin rust thread slipping toward a keyhole on the back of the safe, a small crimson crux mark. No people, no text, no logos.",
      ),
    },
  },
  {
    kind: "topic",
    id: "section-230-reform",
    hero: {
      src: "/images/generated/topics/section-230-reform/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A shield-shaped public notice board of blank pinned cards, some torn down into a basket, with threads leading to a courthouse portico.",
      prompt: topicHeroPrompt(
        "A large public notice board in a town square covered in blank pinned cards, some cards torn down and gathered in a basket, a shield-shaped wooden frame around the board, teal and rust threads leading to a courthouse column, a small crimson crux mark. No text, no logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "autonomous-weapons-ban",
    hero: {
      src: "/images/generated/topics/autonomous-weapons-ban/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A treaty table with a blank document, a pen and an empty chair, with a teal thread from the pen to the off switch of a powered-down wireframe machine of gears and a lens.",
      prompt: topicHeroPrompt(
        "A calm treaty table with an unsigned blank document, a pen and an empty chair, beside it a powered-down machine drawn as a faint wireframe of gears, a sensor lens and a switch set to off, not humanoid, a teal thread of human control running from the pen to the switch and a rust thread of autonomy, a small crimson crux mark. No weapons, no explosions, no robots, no humanoid figures.",
      ),
    },
  },
  {
    kind: "topic",
    id: "ai-energy-water-footprint",
    hero: {
      src: "/images/generated/topics/ai-energy-water-footprint/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A cutaway server hall drawing water from a lake through a teal pipe and power from a distant plant, beside a cooling tower, under a scale weighing a droplet against a lightning bolt.",
      prompt: topicHeroPrompt(
        "A server hall drawn in cutaway beside a cooling tower releasing vapour, a teal water pipe drawn from a lake and a rust power cable from a distant plant, a single water droplet and a lightning glyph balanced on a scale, a small crimson crux mark. No logos, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "adhd-overdiagnosis",
    hero: {
      src: "/images/generated/topics/adhd-overdiagnosis/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A desk with a metronome, an open book and pencils, a sieve sorting teal and rust beads, a magnifying glass and a clipboard checklist of blank boxes.",
      prompt: topicHeroPrompt(
        "A school desk with a scattered set of pencils, an open notebook and a ticking metronome, a clinician's clipboard checklist with blank boxes, a magnifying glass and a sieve sorting teal and rust beads, a small crimson crux mark. No people, no children, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "vaping-harm-reduction",
    hero: {
      src: "/images/generated/topics/vaping-harm-reduction/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A vape device and a crumpled cigarette pack on a cafe table, a thin teal wisp of vapour beside a heavy rust smoke plume, with lungs drawn as two trees above.",
      prompt: topicHeroPrompt(
        "A sleek vaping device and a crumpled cigarette pack without branding lying on a café table, a teal wisp of vapour rising and thinning beside a heavier rust smoke curl, a pair of lungs drawn as two delicate tree outlines in the background, a small crimson crux mark. No people, no brands.",
      ),
    },
  },
  {
    kind: "topic",
    id: "sex-work-decriminalization",
    hero: {
      src: "/images/generated/topics/sex-work-decriminalization/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A quiet wet street at night with a lit doorway, a teal-lit clinic window opposite, a courthouse at the end and a balance scale on the pavement.",
      prompt: topicHeroPrompt(
        "A quiet city street at night with a single lit doorway and a health clinic window glowing teal across the road, a courthouse column at the street's end, a balance scale on the pavement, a small crimson crux mark. Calm and abstract. No people, no bodies.",
      ),
    },
  },
  {
    kind: "topic",
    id: "congressional-term-limits",
    hero: {
      src: "/images/generated/topics/congressional-term-limits/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A domed legislature with a large hourglass in its doorway and empty chairs along the portico, some tilting toward the door.",
      prompt: topicHeroPrompt(
        "A domed legislature drawn in architectural elevation with a large hourglass standing on its steps, a row of empty chairs on the portico, some gently tipping toward the door, teal and rust paths meeting at a small crimson crux mark. No flags, no people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "effective-altruism",
    hero: {
      src: "/images/generated/topics/effective-altruism/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A balance scale weighing a bed net against books and a seedling, beside coins, an open ledger and a telescope pointed toward the horizon.",
      prompt: topicHeroPrompt(
        "A charity ledger and a pair of balance scales on a desk, small piles of coins being sorted into bed nets, books and seedlings, a long telescope pointing to the future, teal and rust paths meeting at a small crimson crux mark. No people, no logos, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "alcohol-no-safe-level",
    hero: {
      src: "/images/generated/topics/alcohol-no-safe-level/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A glass of red wine and a pint of beer on a bar beside a jigger and a stethoscope, under teal and rust curves meeting at a crux mark.",
      prompt: topicHeroPrompt(
        "A single wine glass and a beer tumbler on a bar counter, a dose-response curve drawn behind them in teal and rust, a measuring jigger and a stethoscope resting beside the glasses, a small crimson crux mark. No brands, no people.",
      ),
    },
  },
  {
    kind: "topic",
    id: "modern-monetary-theory",
    hero: {
      src: "/images/generated/topics/modern-monetary-theory/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A printing press feeding blank sheets into a teal river that flows toward a stone bridge and a school, with a rust inflation thermometer on the bank.",
      prompt: topicHeroPrompt(
        "A printing press drawn in fine ink producing blank sheets that flow as a teal river into a public works scene of a bridge and a school, a rust thermometer of inflation standing on the bank, a small crimson crux mark. No currency symbols, no people, no text.",
      ),
    },
  },
  {
    kind: "topic",
    id: "dark-matter-vs-mond",
    hero: {
      src: "/images/generated/topics/dark-matter-vs-mond/hero.jpg",
      ...IMAGE_DIMENSIONS,
      alt: "A teal spiral galaxy with a faint halo and two rotation curves, one flattening in teal and one falling in rust, above an orrery and a telescope.",
      prompt: topicHeroPrompt(
        "A spiral galaxy drawn in teal ink with a faint ghostly halo around it, two astronomer's rotation curves overlaid, one flattening in teal and one bending in rust, an iron orrery and a telescope in the foreground, a small crimson crux mark. No people, no text.",
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
