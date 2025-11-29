import { BlueprintNode } from "@/types/graph";
import { moonLanding } from "./topics";

const radiation = moonLanding.pillars.find(
  (pillar) => pillar.id === "radiation-environment",
)!;

const retroreflector = moonLanding.pillars.find(
  (pillar) => pillar.id === "physical-trace",
)!;

const radiationCruxId = `crux-${radiation.crux.id}`;
const retroCruxId = `crux-${retroreflector.crux.id}`;

export const logicBlueprint: Record<string, BlueprintNode> = {
  root: {
    id: "root",
    variant: "meta",
    title: moonLanding.title,
    subtitle: "Meta Claim",
    content: moonLanding.meta_claim,
    score: moonLanding.confidence_score,
    children: [
      { id: "root-skeptic", slot: "left" },
      { id: "root-proponent", slot: "right" },
      { id: radiation.id, slot: "center" },
    ],
  },
  "root-skeptic": {
    id: "root-skeptic",
    variant: "skeptic",
    title: "Skeptic Thesis",
    subtitle: "Meta Doubt",
    content:
      "Conspiracy narratives claim Apollo was staged on a soundstage to win the Space Race and mask rocket failures. They argue inconsistencies in photos and physics betray the deception.",
    children: [
      { id: "skeptic-shadows", slot: "left" },
      { id: "skeptic-flag", slot: "right" },
      { id: "skeptic-motive", slot: "center" },
    ],
  },
  "root-proponent": {
    id: "root-proponent",
    variant: "proponent",
    title: "Scientific Consensus",
    subtitle: "Global Evidence",
    content:
      "Telemetry, lunar samples, and independent tracking by Jodrell Bank, Madrid, and Parkes observatories all corroborate the landings. Thousands of technicians would have had to remain silent.",
    children: [
      { id: "proponent-tracking", slot: "left" },
      { id: "proponent-samples", slot: "right" },
      { id: "proponent-scale", slot: "center" },
    ],
  },
  "skeptic-shadows": {
    id: "skeptic-shadows",
    variant: "skeptic",
    title: "Shadow Anomalies",
    subtitle: "Lighting Physics",
    content: "Skeptics point to non-parallel shadows in photos, suggesting multiple studio light sources rather than the single Sun.",
    children: [],
  },
  "skeptic-flag": {
    id: "skeptic-flag",
    variant: "skeptic",
    title: "Waving Flag",
    subtitle: "Vacuum Physics",
    content: "The US flag appears to ripple in videos. In a vacuum, there is no air to cause movement, implying an atmosphere (studio).",
    children: [],
  },
  "skeptic-motive": {
    id: "skeptic-motive",
    variant: "skeptic",
    title: "Geopolitical Motive",
    subtitle: "Cold War Context",
    content: "The US was losing the space race to the USSR. Faking the landing was a desperate measure to claim ideological victory.",
    children: [],
  },
  "proponent-tracking": {
    id: "proponent-tracking",
    variant: "proponent",
    title: "Independent Tracking",
    subtitle: "Third Party Verification",
    content: "Soviet radar and amateur radio operators tracked the Apollo transmissions to the Moon. If it were fake, the USSR would have exposed it immediately.",
    children: [],
  },
  "proponent-samples": {
    id: "proponent-samples",
    variant: "proponent",
    title: "Lunar Geology",
    subtitle: "Material Evidence",
    content: "Apollo brought back 842 lbs of rock. These rocks contain micro-crater impacts from micrometeoroids that can only form in a vacuum over millions of years.",
    children: [],
  },
  "proponent-scale": {
    id: "proponent-scale",
    variant: "proponent",
    title: "Operational Scale",
    subtitle: "Logistical Impossibility",
    content: "Over 400,000 people worked on Apollo. Keeping a secret of that magnitude without a single whistleblower for 50 years is statistically impossible.",
    children: [],
  },
  [radiation.id]: {
    id: radiation.id,
    variant: "pillar",
    title: radiation.title,
    subtitle: "Pillar Node",
    content: radiation.short_summary,
    children: [
      { id: `${radiation.id}-skeptic`, slot: "left" },
      { id: `${radiation.id}-proponent`, slot: "right" },
      { id: radiationCruxId, slot: "center" },
    ],
  },
  [`${radiation.id}-skeptic`]: {
    id: `${radiation.id}-skeptic`,
    variant: "skeptic",
    title: "Van Allen Belt Alarm",
    subtitle: radiation.title,
    content: "James Van Allen himself warned of the deadly radiation belts. Skeptics argue NASA had no shielding technology capable of protecting astronauts from lethal doses during transit.",
    children: [],
  },
  [`${radiation.id}-proponent`]: {
    id: `${radiation.id}-proponent`,
    variant: "proponent",
    title: "Trajectory as Shielding",
    subtitle: radiation.title,
    content: "The mission trajectory was specifically designed to bypass the inner (most intense) belt and pass quickly through the thinner outer belt, limiting total exposure to safe levels.",
    children: [],
  },
  [radiationCruxId]: {
    id: radiationCruxId,
    variant: "crux",
    title: radiation.crux.title,
    subtitle: radiation.title,
    content: radiation.crux.description,
    detail: {
      description: radiation.crux.description,
      methodology: radiation.crux.methodology,
      equation: radiation.crux.equation,
      status: radiation.crux.verification_status,
      cost: radiation.crux.cost_to_verify,
    },
    children: [
      { id: `${radiationCruxId}-challenge`, slot: "left" },
      { id: `${radiationCruxId}-records`, slot: "right" },
      { id: retroreflector.id, slot: "center" },
    ],
  },
  [`${radiationCruxId}-challenge`]: {
    id: `${radiationCruxId}-challenge`,
    variant: "skeptic",
    title: "Telemetry Could Be Forged",
    subtitle: radiation.crux.title,
    content:
      "Skeptics claim telemetry tapes were fabricated or scrubbed, so dose readouts cannot be trusted.",
    children: [],
  },
  [`${radiationCruxId}-records`]: {
    id: `${radiationCruxId}-records`,
    variant: "proponent",
    title: "Raw Dose Records",
    subtitle: radiation.crux.title,
    content:
      "Explorer, Luna, and Apollo 11 dosimeter logs are archived at NSSDC and MIT, letting independent labs re-run the integrations.",
    children: [],
  },
  [retroreflector.id]: {
    id: retroreflector.id,
    variant: "pillar",
    title: retroreflector.title,
    subtitle: "Pillar Node",
    content: retroreflector.short_summary,
    children: [
      { id: `${retroreflector.id}-skeptic`, slot: "left" },
      { id: `${retroreflector.id}-proponent`, slot: "right" },
      { id: retroCruxId, slot: "center" },
    ],
  },
  [`${retroreflector.id}-skeptic`]: {
    id: `${retroreflector.id}-skeptic`,
    variant: "skeptic",
    title: "No Hardware Seen",
    subtitle: retroreflector.title,
    content:
      "If humans went to the Moon, skeptics ask why modern telescopes cannot image landers or flags from Earth.",
    children: [],
  },
  [`${retroreflector.id}-proponent`]: {
    id: `${retroreflector.id}-proponent`,
    variant: "proponent",
    title: "Physics of Resolution",
    subtitle: retroreflector.title,
    content:
      "Diffraction limits prevent optical imaging, but the ability to ping corner-cube retroreflectors is unique to an engineered array.",
    children: [],
  },
  [retroCruxId]: {
    id: retroCruxId,
    variant: "crux",
    title: retroreflector.crux.title,
    subtitle: retroreflector.title,
    content: retroreflector.crux.description,
    detail: {
      description: retroreflector.crux.description,
      methodology: retroreflector.crux.methodology,
      equation: retroreflector.crux.equation,
      status: retroreflector.crux.verification_status,
      cost: retroreflector.crux.cost_to_verify,
    },
    children: [
      { id: `${retroCruxId}-challenge`, slot: "left" },
      { id: `${retroCruxId}-records`, slot: "right" },
      { id: `evidence-${retroreflector.id}`, slot: "center" },
    ],
  },
  [`${retroCruxId}-challenge`]: {
    id: `${retroCruxId}-challenge`,
    variant: "skeptic",
    title: "Maybe Soviet Hardware",
    subtitle: retroreflector.crux.title,
    content:
      "Some argue that unmanned Soviet rovers also carried reflectors, so pings do not prove a crewed mission.",
    children: [],
  },
  [`${retroCruxId}-records`]: {
    id: `${retroCruxId}-records`,
    variant: "proponent",
    title: "Corner-Cube Fingerprint",
    subtitle: retroreflector.crux.title,
    content:
      "Apollo arrays return sharply peaked signals with known orientation and polarization, unlike Lunokhod plates that have decayed.",
    children: [],
  },
  [`evidence-${retroreflector.id}`]: {
    id: `evidence-${retroreflector.id}`,
    variant: "evidence",
    title: "Apache Point Logs",
    subtitle: "Evidence Stream",
    content:
      "The APOLLO project publishes photon return counts per pulse. Anyone with a 3.5 m telescope and ruby laser can replicate the experiment.",
    children: [],
  },
};


