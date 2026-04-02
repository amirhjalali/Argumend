# Subagent Workstreams

This deep dive uses role-based subagents with file handoffs to avoid context-window loss.

## Roles
- `repo-analyst.md`: codebase architecture, constraints, insertion points.
- `philosophy-analyst.md`: Habermas + major philosophers -> normative design principles.
- `product-strategist.md`: concept generation, prioritization, sequencing.
- `community-systems.md`: governance, incentives, moderation, contribution loops.

## Handoff Rule
Each loop consumes only:
1. Charter (`00_charter.md`)
2. Previous loop handoff
3. Targeted source subset

Each loop writes:
- full note (`loop-XX.md`)
- compressed handoff (`loop-XX-handoff.md`)
