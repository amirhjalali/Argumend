# Repository Guidelines

## Project Shape

Argumend is a Next.js app for AI-powered argument mapping. The product defaults to offline/programmatic behavior, with live model-backed analysis, debate, and judging behind explicit environment flags.

## Commands

```bash
bun install
bun dev
bun run lint
bun run test:ci
bun run build
```

## Change Rules

- Keep offline mode working without API keys or a database.
- Use typed schemas for model, API, and graph data boundaries.
- Do not import database clients eagerly in code paths that should work offline.
- Update `README.md` when setup, runtime flags, or core product behavior changes.
- Leave untracked research and scratch files alone unless the task explicitly targets them.

## Copy Style

Applies to every new or edited string a reader sees: UI copy, map data, blog posts, guides, docs, alt text, commit messages. The full version is in `CLAUDE.md` under "Copy Style".

- No em dashes (U+2014). Reword with a comma, colon, period or parentheses. Do not substitute " - ", "--" or an en dash. `lib/copyStyle.test.ts` ratchets this per file against `lib/copyStyle.baseline.json`: counts may only go down, so lower the baseline when you remove some.
- Never use amber or tangerine colors.
- Argumend never names a winner, and copy must not imply one.
- Do not claim "every map" follows a process unless that is true of every map.
- Every figure needs a linked source that states it, cited to the report that originated it.
