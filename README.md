# ARGUMEND v2

Argumend is a service which utilizes AI to provide context about varying perspectives on issues.

The main goal with Argumend is to reduce the noise and contention within online spaces and to allow further exploration of different points of views, with an emphasis on improving common understanding. Argue + Mend. The goal is not to reach agreement, but understanding of the disagreement.

## Version 2

Version 2 represents a shift from human-curated feedback to AI-powered analysis and perspective generation. This allows for more scalable and dynamic exploration of arguments and viewpoints.

## Status

Currently in early development.

## Runtime Modes

The analysis/debate stack now supports an offline-first programmatic mode so core flows can run without paid LLM API calls.

- Default behavior: offline/programmatic generation and judging.
- Enable live extraction calls: set `ENABLE_LIVE_ANALYZE_API=true` (or `NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API=true`).
- Enable live judging calls: set `ENABLE_LIVE_JUDGING_API=true` (or `NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API=true`).
- Enable live debate generation (API + UI): set `ENABLE_LIVE_DEBATE_API=true` and/or `NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API=true`.
