# Jev (TypeSafe AI) probe

One-day probe of TypeSafe's Jev decision model against Argumend material with ground truth.
Findings: `docs/reviews/2026-09-16-jev-typesafe-probe.md`. Needs `TYPESAFE_API_KEY` in `.env.local`.
Sends source text to a third-party API; not wired into any product lane.

    export TYPESAFE_API_KEY=...            # or source it from .env.local
    bun scripts/jev-probe/dump-transcripts.ts   # renders the 3 flagship maps into this dir (gitignored outputs)
    bun scripts/jev-probe/round1.ts             # diagnosis pattern on the 5 eval-kit items, 5 repeats
    bun scripts/jev-probe/round2.ts             # crux contestedness + selection on the flagship transcripts
    bun scripts/jev-probe/round3.ts             # "who is right" judge probe on 4 cases
    bun scripts/jev-probe/expA-evidence.ts 240  # evidence side + 4-dimension weights vs the human scores (seeded sample)
    bun scripts/jev-probe/expB-routing.ts 150   # route skeptic/proponent sentences to the right map section
    bun scripts/jev-probe/expD-verdict.ts       # settledness vs computed verdict, thin state
    bun scripts/jev-probe/expD2-verdict-rich.ts # same with the whole map summary as state
    bun scripts/jev-probe/expC-thread.ts        # the blog post's rent-control thread and composed reply
    bun scripts/jev-probe/expE-clip.ts <topic> <diarized.json> [label]   # a real debate clip (see CLIPS.md)
    bun scripts/jev-probe/expF-side-audit.ts 0.9   # flag evidence cards whose side label Jev disputes
    bun scripts/jev-probe/crux-contestedness.ts    # contested + present Nouls over every crux candidate on
                                                   # the 3 flagship maps, re-ranked through identifyCruxes
                                                   #   --runs N (default 3)  --refresh (ignore the cache)
    bun scripts/jev-probe/map-reply-smoke.ts       # the productised pipeline, live (--record to refresh fixtures)

round1 and round3 read the human-evaluation kit under docs/research/2026-09-15-v2-human-evaluation-kit/,
which lives on the sprint-2026-09-14 branch; the expA-F scripts need only the topic library.

`map-reply-smoke.ts` is the only script here that exercises shipped code: it runs `lib/mapReply`
against the live API. See `docs/MAP_REPLY.md`.

`jev()` takes an options object (`{ maxAttempts, model }`) and defaults to the moving `jev-latest` alias.
Anything thresholded should pin an exact version — `crux-contestedness.ts` sends `jev-1.13.0` and records
the model the API answers with in its cache, so a silent server-side change shows up as a diff.

Run an exp twice and diff its `*.results.json` to measure repeatability. Result files are gitignored.
Blog post built from these numbers: data/blog.ts slug `we-gave-a-model-that-cant-talk-1000-arguments`.
