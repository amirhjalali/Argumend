# Repository Guidelines

## Project Shape

Argumend is a Next.js app for AI-powered argument mapping. The product defaults to offline/programmatic behavior, with live model-backed analysis, debate, and judging behind explicit environment flags.

## Commands

```bash
bun install
bun dev
bun run lint
bun test
bun run build
```

## Change Rules

- Keep offline mode working without API keys or a database.
- Use typed schemas for model, API, and graph data boundaries.
- Do not import database clients eagerly in code paths that should work offline.
- Update `README.md` when setup, runtime flags, or core product behavior changes.
- Leave untracked research and scratch files alone unless the task explicitly targets them.
