# Deep citation audit, batch 15 (2026-11-10)

Maps assigned: `facial-recognition-policing`, `surveillance-public-safety`, `privacy-vs-convenience`.

**Stopped after the first map.** The usage check read `PROCEED` at the start (7d = 68%) and `THROTTLE_7D` (7d = 76%, threshold 75%) after the first map, so the other two maps were not started. No file other than `data/topics/facial-recognition-policing.ts` and this record was touched.

## facial-recognition-policing — finished

8 evidence cards plus the keystone source, all loaded and compared. 7 cards edited, 0 replaced. 1 card checked out with no edit (`npl-met-equitability`: 0.6 threshold, 0.017% or 1 in 6,000 at a 10,000 watchlist, imbalance below 0.6 all confirmed in the report). Two of the 7 edits are citation-only (`aclu-wrongful-arrests` year, `georgetown-forensic` URL). Import check passes.

| Card id | What was wrong | What it says now | Verified against |
| --- | --- | --- | --- |
| keystone `source`, `aclu-wrongful-arrests` `source` | ACLU article dated "(2025)". The page is dated April 14, 2026 (it lists arrests through August 2025 and names Kimberlee Williams as the fourteenth). | "(April 2026)" in both places. Count of 14 and "most ... have been of Black people" confirmed. | https://www.aclu.org/news/privacy-technology/more-than-a-dozen-wrongful-arrests-due-to-police-reliance-on-facial-recognition-technology |
| `nist-8280-bias` | Said one-to-many false positives were "highest" for African American women and stated 10-100x flatly. NIST says "higher rates of false positives for African American females" and that one-to-one differentials "often ranged from a factor of 10 to 100 times, depending on the individual algorithm". | "often 10 to 100 times higher ... depending on the algorithm"; "false positives were higher for African American women". Same wording fix in the pillar's `proponent_rebuttal`. 189 algorithms confirmed. | https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software |
| `nist-accuracy-gains` | Attributed the 0.13% false-negative rate to "the top mugshot-identification algorithm". In the FAS text the threefold fall and the 0.13% figure are for one-to-one verification (at a 0.003% false-positive setting); mugshot identification error fell by a factor of 5, best system 0.05%. | Threefold fall and 0.13% tied to verification, with the fivefold mugshot-identification fall added. Source dated May 2026. The absolute-versus-relative bias passage checked out. | https://fas.org/publication/face-recognition-bias/ |
| `georgetown-forensic` | `sourceUrl` used the old `/publications/` path, which redirects. Text checked out (key findings on the landing page; author Clare Garvie and date December 6, 2022 on the report PDF). | URL now the `/research/` path the redirect lands on. | https://www.law.georgetown.edu/privacy-technology-center/research/a-forensic-without-the-science-face-recognition-in-u-s-criminal-investigations/ |
| `met-arrests-utility` | The cited London Assembly motion does not say "since the start of 2024", "about 24% for violence against women and girls" or "over 100 registered sex offenders". It says more than 2,100 arrests, and more than three million faces in 2025 with 12 false alerts and no false arrests. The Met press page that might carry the other figures returned 404. | Description rewritten to the motion's own figures, with its date (2 July 2026) and vote (14 to 3). Source renamed to the motion. Reasoning no longer cites VAWG and sex-offender cases. | https://www.london.gov.uk/motions/live-facial-recognition |
| `gao-training-gap` | Said the seven agencies cumulatively ran about 60,000 searches; GAO says six agencies had data and ran about 60,000 searches while they had no training requirement. Title said "Without Training or Policy"; the 60,000 figure is about training only. | Title: "GAO: ~60,000 Federal Searches Run Before Any Training Requirement". Description states six agencies with data, two requiring training as of April 2023, four of seven without civil-rights policies or guidance specific to facial recognition. | https://web.archive.org/web/20250103003654/https://www.gao.gov/products/gao-23-105607 (gao.gov itself returns 403 to curl; `sourceUrl` left as the gao.gov product page) |
| `state-sole-basis-laws` | Claimed California prohibits a match as the sole basis for an arrest, search or warrant. That was AB 1814 (2023-24), which was held in committee on 2024-08-15 and never enacted; no California statute was found. Virginia text was right but written in the future tense for a change that took effect July 1, 2026. | California replaced with Maryland Criminal Procedure § 2-502(b)(2): results "may not serve as the sole basis to establish probable cause" and need "additional, independently obtained evidence". Virginia sentence put in the past tense. The three other mentions of California in the file (`simple_case`, governance `skeptic_premise`, `supporter_flip`) changed to Maryland. | https://law.lis.virginia.gov/vacode/title15.2/chapter17/section15.2-1723.2/ and https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gcp&section=2-502&enactments=false |

Also changed outside the cards: the real-world-harm `proponent_rebuttal` said several people "were jailed for days, including a woman who was eight months pregnant". The FAS page says Porcha Woodruff, eight months pregnant, spent 11 hours in detention, and the ACLU page says Kimberlee Williams spent six months in jail. It now reads "several were jailed for days or months, and one woman was arrested while eight months pregnant."

Unresolved:

- `state-sole-basis-laws`: the Virginia page shows two versions of § 15.2-1723.2, one effective until July 1, 2026 (authorized uses, no match in a warrant affidavit) and one effective from July 1, 2026 (no purchase or deployment unless a statute expressly authorizes it). The card now says so, but the map still treats Virginia as a live example of a sole-basis safeguard in `simple_case` and the oversight crux. Whether Virginia agencies may use the technology at all after July 1, 2026 was not checked. A founder or lead call on whether to keep Virginia as the example.
- `aclu-wrongful-arrests` and the sole-basis crux `common_ground` say that in every documented case the match was "the sole or primary basis". The ACLU page says police "relied on" the match and that in at least seven cases they went from the match to a photo lineup. Left unchanged; the wording is a fair but strong paraphrase.
- `met-arrests-utility` reasoning still calls the false-alert figure "consistent with the independent NPL testing". The NPL rate (0.017% at a 10,000-person watchlist) and 12 in three million are not the same measure. Left unchanged.

## surveillance-public-safety — not started

Stopped by the usage check. No cards checked, no edits.

## privacy-vs-convenience — not started

Stopped by the usage check. No cards checked, no edits. The known suspects (generic-homepage and Wikipedia sources) are still open.

## Repeats elsewhere

Searched `data/blog.ts`, `data/guides.ts` and `data/topics/` for the corrected figures (2,100 arrests, registered sex offenders, 0.13%, California sole-basis law, the 2025 date on the ACLU count). No repeats found outside this map.
