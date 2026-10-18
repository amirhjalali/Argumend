/**
 * Pastes shared by the paste flow's tests.
 *
 * ASSISTED_LIVING_PASTE is the fresh review's issue 2
 * (docs/reviews/2026-09-29-r3-fresh-review.md): a family argument no map
 * covers. Before 2026-09-29 it came back "No map" with the loneliness,
 * AI-unemployment and return-to-office maps listed as closest, on the words
 * "alone", "work remotely" and "cost".
 */
export const ASSISTED_LIVING_PASTE =
  "A: Mom can't live alone anymore, she left the stove on twice. Assisted living is the responsible choice. " +
  "B: She's lived in that house 40 years. Moving her will crush her. We can get a home aide and check in daily. " +
  "A: Aides cost more than the facility and you work remotely, you can't be there all day. B: I can, actually.";

/** The live-site nuclear paste (data/evals/paste-matching, "nuclear-live-site"). */
export const NUCLEAR_PASTE =
  "A: Nuclear power is too dangerous, look at Chernobyl and Fukushima. B: Per terawatt-hour nuclear kills fewer " +
  "people than coal or gas, and new plants are safer. A: Even so, the waste lasts thousands of years and new " +
  "reactors are years late and billions over budget.";

/** Previous built-in article, retained as a routing regression, not factual guidance. */
export const LEGACY_NUCLEAR_EXAMPLE = `The debate over nuclear energy has intensified. Proponents argue it's essential for meeting climate goals: nuclear produces minimal carbon emissions and provides reliable baseload power that renewables can't match. France generates 70% of its electricity from nuclear and has among the lowest carbon emissions in Europe.

Critics counter that nuclear is too expensive and too slow to build. The Vogtle plant in Georgia came in at $35 billion, more than double its original estimate. Meanwhile, solar and wind costs have plummeted 90% in a decade. There are also unresolved questions about waste storage: the US still has no permanent repository despite decades of trying.

Supporters respond that newer reactor designs like SMRs could dramatically cut costs and construction times, and that the waste problem is more political than technical: Finland's Onkalo facility proves deep geological storage works. The real question may be whether we can afford to exclude any zero-carbon source while facing a climate emergency.`;
