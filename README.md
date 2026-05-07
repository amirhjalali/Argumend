# Argumend

AI-powered argument mapping for contentious topics.

Argumend turns public questions into structured maps of positions, evidence, cruxes, confidence, and disagreement. The goal is not to make everyone agree. The goal is to make the disagreement legible enough that people can reason about it.

**Live site:** https://www.argumend.org

## What It Does

- Maps controversial topics into interactive argument graphs
- Shows positions, evidence, cruxes, fallacies, and confidence signals
- Runs offline by default with static/programmatic topic data
- Optionally enables live AI extraction, debate generation, and judging
- Uses saved topic data so core flows can be developed without paid API calls

## Tech Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Bun for local development
- Tailwind CSS + Framer Motion
- React Flow for graph visualization
- Drizzle ORM + PostgreSQL
- NextAuth v5 beta
- Anthropic, OpenAI, and Google Generative AI SDKs
- Vitest + Testing Library

## Quick Start

```bash
bun install
bun dev
```

Open http://localhost:3000.

No API keys or database are required for the default offline mode.

## Runtime Modes

Argumend defaults to offline/programmatic generation and judging so the product can be developed and demoed without live model calls.

Enable live model-backed flows with environment flags:

```bash
ENABLE_LIVE_ANALYZE_API=true
NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API=true

ENABLE_LIVE_JUDGING_API=true
NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API=true

ENABLE_LIVE_DEBATE_API=true
NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API=true
```

## Commands

```bash
bun dev              # local dev server
bun run build        # production build
bun run lint         # ESLint
bun test             # Vitest
bun run test:coverage
bun run db:generate  # generate Drizzle migrations
bun run db:push      # push schema to Postgres
bun run db:studio    # open Drizzle Studio
```

## Project Structure

```text
app/                    Next.js routes, pages, API endpoints
components/             Product UI, graph views, topic cards, shell
components/nodes/       React Flow node components
data/                   Static topics, guides, blog content, mock debates
hooks/                  Client state and graph orchestration
lib/analyze/            Argument extraction and offline analysis
lib/debate/             Debate generation and persistence
lib/judge/              Multi-model judging
lib/db/                 Drizzle schema and database helpers
types/                  Shared TypeScript types
```

## Development Notes

- Use offline mode unless a task specifically needs live model behavior.
- Keep topic data deterministic so graph behavior is easy to test.
- Prefer typed schemas at boundaries; do not let raw model output flow directly into UI state.
- Run `bun test` and `bun run lint` before opening a PR.

## License

[ISC](LICENSE)
