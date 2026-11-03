/**
 * The measures for each study topic (pre-registration:
 * docs/plans/2026-11-03-study-plan.md, "Measures").
 *
 * Statements are survey items written for the study, not claims about the
 * world: their "actual" agreement share is computed from the study's own
 * sample, never asserted here. Crux options are scored against the map: the
 * one `crux: true` option paraphrases the map's first crux question, and each
 * distractor paraphrases a fact the map records both sides as accepting
 * (`mapRef` names the crux whose common ground it comes from). Options are
 * paraphrased so that no arm shows the exact wording of the right answer.
 */
import { GAP_STATEMENT_COUNT, type StudyTopic } from "@/lib/study/constants";

export interface GapStatement {
  id: string;
  text: string;
}

export interface CruxOption {
  id: string;
  text: string;
  /** True for the one option that paraphrases the map's crux. */
  crux: boolean;
  /** The map crux this option comes from (its question, or its common ground). */
  mapRef: string;
}

export interface StudyInstrument {
  topic: StudyTopic;
  /** Shown above the attitude and perceived-disagreement items: the map's question. */
  question: string;
  /** Short label for running text ("the question about …"). */
  label: string;
  statements: GapStatement[];
  cruxOptions: CruxOption[];
}

export const STUDY_INSTRUMENTS: Record<StudyTopic, StudyInstrument> = {
  "gun-control-effectiveness": {
    topic: "gun-control-effectiveness",
    question: "Do stricter gun laws save lives?",
    label: "gun laws",
    statements: [
      { id: "owners-responsible", text: "Most gun owners in America are responsible and law-abiding." },
      { id: "safe-storage", text: "Laws requiring guns to be stored safely away from children are reasonable." },
      { id: "family-crisis-order", text: "Families should be able to ask a judge to pause a relative's access to guns during a mental-health crisis." },
      { id: "self-defense-right", text: "People have a right to own a gun to protect themselves and their families." },
      { id: "laws-without-confiscation", text: "Some gun laws could reduce gun deaths without taking guns away from law-abiding owners." },
    ],
    cruxOptions: [
      {
        id: "laws-vs-other-factors",
        text: "How much of America's high gun-death rate is caused by its gun laws and the number of guns, rather than by other things such as drug markets and where violence is concentrated?",
        crux: true,
        mapRef: "natural-experiment",
      },
      {
        id: "rate-vs-peers",
        text: "Does the US have a much higher gun-death rate than other wealthy democracies?",
        crux: false,
        mapRef: "natural-experiment",
      },
      {
        id: "shooters-bought-legally",
        text: "Did most people who carried out mass shootings get their guns legally?",
        crux: false,
        mapRef: "assault-weapon-lethality",
      },
      {
        id: "existing-stockpile",
        text: "Are there already hundreds of millions of privately owned guns in the US?",
        crux: false,
        mapRef: "natural-experiment",
      },
    ],
  },
  "immigration-border-crisis": {
    topic: "immigration-border-crisis",
    question: "Are a closed border and mass deportations the right way to handle illegal immigration?",
    label: "immigration and the border",
    statements: [
      { id: "controlled-immigration-good", text: "Immigration, when it is properly controlled, is good for the country." },
      { id: "control-border", text: "The US needs to control who comes across its southern border." },
      { id: "deport-serious-criminals", text: "People in the US illegally who have committed serious crimes should be deported." },
      { id: "long-residents-stay", text: "Immigrants who have lived here for many years without committing crimes should be allowed to stay." },
      { id: "persecuted-may-seek", text: "People who face real persecution at home should be able to seek asylum in the US." },
    ],
    cruxOptions: [
      {
        id: "what-drove-drop",
        text: "Did border crossings fall mainly because of US enforcement and asylum limits, or mainly because of other things, such as Mexico's own enforcement and conditions in migrants' home countries?",
        crux: true,
        mapRef: "enforcement-deterrence-causation",
      },
      {
        id: "record-then-fell",
        text: "Did apprehensions at the southern border fall from a record high in 2023 to the lowest on record in 2026?",
        crux: false,
        mapRef: "enforcement-deterrence-causation",
      },
      {
        id: "court-backlog",
        text: "Did the immigration court backlog reach millions of cases, with waits of years?",
        crux: false,
        mapRef: "asylum-grant-rate-analysis",
      },
      {
        id: "near-million-deportations",
        text: "Has the government carried out close to a million deportations since January 2025?",
        crux: false,
        mapRef: "deportation-targets",
      },
    ],
  },
  "transgender-athletes-sports": {
    topic: "transgender-athletes-sports",
    question: "Should transgender women on hormone therapy compete in women's sports?",
    label: "transgender athletes in women's sports",
    statements: [
      { id: "dignity", text: "Transgender people deserve to be treated with dignity and respect." },
      { id: "fair-competition", text: "Fair competition for female athletes matters." },
      { id: "sport-for-everyone", text: "The health and social benefits of sport should be open to everyone." },
      { id: "levels-differ", text: "The rules for Olympic sport do not need to be the same as the rules for school or recreational sport." },
      { id: "advantage-persists", text: "Male puberty gives athletic advantages that hormone therapy does not fully remove." },
    ],
    cruxOptions: [
      {
        id: "advantage-vs-variation",
        text: "After several years of hormone therapy, are transgender women's remaining physical advantages larger than the normal differences among women in the same sport?",
        crux: true,
        mapRef: "sport-specific-advantage-data",
      },
      {
        id: "some-advantages-reduced",
        text: "Does hormone therapy reduce some advantages of male puberty, such as hemoglobin levels, while others, such as height, remain?",
        crux: false,
        mapRef: "sport-specific-advantage-data",
      },
      {
        id: "bodies-restricted",
        text: "Have major sports bodies such as World Athletics, the NCAA and the IOC restricted the women's category?",
        crux: false,
        mapRef: "open-category-feasibility",
      },
      {
        id: "sport-belonging",
        text: "Does sport matter for health and belonging as well as for competition?",
        crux: false,
        mapRef: "harm-balancing-test",
      },
    ],
  },
};

export function cruxOptionIds(topic: StudyTopic): string[] {
  return STUDY_INSTRUMENTS[topic].cruxOptions.map((option) => option.id);
}

export function isCruxChoiceCorrect(topic: StudyTopic, choice: string): boolean {
  return STUDY_INSTRUMENTS[topic].cruxOptions.some((option) => option.id === choice && option.crux);
}

// Fail at import, not mid-study, if an instrument drifts from the schema's shape.
for (const instrument of Object.values(STUDY_INSTRUMENTS)) {
  if (instrument.statements.length !== GAP_STATEMENT_COUNT) {
    throw new Error(`study instrument ${instrument.topic} needs ${GAP_STATEMENT_COUNT} statements`);
  }
}
