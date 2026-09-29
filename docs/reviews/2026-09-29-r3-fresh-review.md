# Fresh whole-site review after round 2 (2026-09-29, ~21:40 UTC)

Independent reviewer, cold, on a production build of `ux/round2-2026-09-29` (flags off). Six
journeys at 390 and 1440 (home → map → crux → reflect; paste; library → search → diagram; Learn;
About → methodology → FAQ; a /questions page). Screenshots were in the session scratchpad.

## Verdict

The main path now matches the vision: home → the AI-jobs map → a crux → its dated ledger reads as one
product that never names a winner, in one shell with one voice (about 80–85% of the vision). Off it,
the site is still two products. Biggest remaining problem: the 156 older maps and every surface that
lists maps still show the old Title-Case labels while the page heading shows the new question —
breadcrumbs, ⌘K search, the paste result, the diagram, /questions, Learn's "Where it shows up",
related links. A visitor meets 2–4 names for one map. On older maps the side labels and "What would
settle it" also fall short of the flagship standard.

## Ten-second test

- 1440: pass. Heading, intro, one rust button and the side stat say what Argumend does and that it
  never names a winner. Weak spot: the "What we measured" stat names no debate.
- 390: pass, barely. The stat sits between intro and button (button at y≈490); the crux sample only
  appears on screen 2. Fix: move the stat below the buttons on phones.

## Top 12 issues

1. **High — one map, many names.** rent-control: breadcrumb / paste / search say "Does Rent Control
   Help or Hurt Renters?", heading asks "Does rent control make housing less affordable in the long
   run?"; nuclear has three names. Fix: one `displayTitle(topic)` = the question, used everywhere a
   map is named; a test that fails on Title-Case map names in rendered output.
2. **High — paste gives nothing on a personal argument.** A sibling dispute about assisted living
   returns "No map" with word-overlap "closest" maps (remote work, AI jobs). Fix: a useful offline
   no-match state (is this about a fact, a value, or a word?), hide weak overlap matches; say plainly
   that a full reading needs the diagnosis lane (founder call to enable).
3. **High — "Supporters" / "Skeptics" point the wrong way for the reader.** On rent control the
   "Supporters" are rent control's critics (they support the claim that it hurts). Paste cards say
   "Supports it / Cuts against it" relative to a claim shown only in italics. Fix: label sides by the
   answer to the question ("Says yes" / "Says no") or per-side stance labels like the flagship camps.
4. **High — "What would settle it" often restates the dispute, and the test status is wrong**
   (nuclear-weapons crux 1: a 1945–91 counterfactual marked "A test no one has run yet"; vaccine
   mandates 2–3). Fix: use the flagship's "Nothing does, and here is why" where no evidence could
   settle it; audit the ~430 settle lines with a format test.
5. **Medium-High — search misses the obvious.** "is nuclear power safe" returns nuclear weapons,
   SMRs, alcohol, degrowth, fusion — not the nuclear-power map or a /questions page. Titles truncate
   behind a category pill and a redundant "Map" pill at 390; four chip colours. Fix: index the
   question and "Also asked as" phrasings, boost title matches, drop the "Map" pill, wrap titles, one
   chip colour.
6. **Medium — "Which question would change your mind?" leads nowhere;** options are cut off on
   phones. Fix: after a tap show that crux's settle line and the other side's best card with "Open
   this crux"; wrap instead of truncating.
7. **Medium — the library still reads like a scoreboard** ("Evidence still divided / largely
   converges", "3 pillars, 9 evidence cards" on every card); the Moon landing filed under Philosophy;
   title says "150+" while the page says 159. Fix: card = question + first crux + "turns on N
   questions"; drop "pillars" from the interface.
8. **Medium — content-farm signals:** /questions pages near-copy the map and aren't linked from it;
   related links are random (nuclear → healthcare, gun control); 15 long guides. Fix: related = same
   category or crux; /questions leads with its crux and links it.
9. **Medium — Learn contradicts the site's vocabulary:** /concepts/cruxes calls a crux "a piece of
   evidence" then "a question", lists statuses the maps don't show; "Balance and weight", "Pillars"
   and the glossary still teach retired scoring vocabulary. Fix: define a crux as "the question a
   fight turns on, and what would settle it"; use flagship examples; move balance/weight to methodology.
10. **Medium — flagship AI-jobs content bugs:** cruxes 2 and 3 share one settle test; crux 5's
    settle line starts "The same reemployment earings…" with no antecedent; "Record starts Feb 2025"
    beside "Added Sep 22, 2026" reads as backdating.
11. **Medium — paste result on phones buries its button** ~4.5 screens down under two long cards;
    "Closely related" appears twice; the "did this change…" question differs between paste (Yes/No)
    and maps (Yes/A little/No). Fix: button under the crux box, clamp card text, one question.
12. **Low-Medium — About is a 5,000-px wall of text;** no picture of a crux card; the first
    "finding" is a thread "written to mirror" a real one; step 04 promises diagrams on "most maps"
    though flagships have none and phones get a list titled "Diagram".

## Genuinely good (keep)

- Home is one argument: one rust button, a real crux as proof, "It never names a winner" said
  outright; light and dark both work.
- The flagship crux fold (settle condition + dated "How this has moved" ledger with sources) is the
  north star made concrete.
- The shell holds: 4-item nav, sticky header, clean phone menu, no sideways scroll, rust only for the
  main button, a dark theme that holds up.
- The paste tool is honest: "No map, rather than the wrong map", a clear privacy line, a link that
  opens the exact crux.
- The diagram at 1440 is a readable tree that fits on load.
