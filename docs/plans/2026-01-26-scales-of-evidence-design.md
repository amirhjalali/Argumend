# Scales of Evidence View Design

**Date:** 2026-01-26
**Status:** Approved
**Author:** Brainstorming session with user

## Overview

Argumend will support multiple "argument views" - different ways to render the same underlying topic data. This allows users to choose the presentation that resonates with their reasoning style.

### Views

1. **Logic Map** (existing) - Hierarchical pillars, cruxes, steel-manned positions
2. **Scales of Evidence** (new) - Adversarial weighing, prosecution vs defense, visual balance

## Core Concept

Each topic has the same underlying data (claims, evidence, sources), but can be rendered through different argument views. Users can switch between views with a toggle. The underlying confidence score stays consistent.

### Data Mapping

Existing topic data maps naturally:
- **Skeptic** → Defense (arguing against the claim)
- **Proponent** → Prosecution (arguing for the claim)
- **Evidence nodes** → Weighted exhibits
- **Crux** → The "decisive question" the jury must answer

## Scales of Evidence Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    THE QUESTION AT ISSUE                     │
│         "Did humans land on the Moon in 1969?"              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   FOR (Prosecution)              AGAINST (Defense)           │
│   ┌──────────────┐    ⚖️         ┌──────────────┐           │
│   │ Evidence 1   │   ╱ ╲         │ Evidence 1   │           │
│   │ weight: 9/10 │  ╱   ╲        │ weight: 2/10 │           │
│   └──────────────┘ ╱─────╲       └──────────────┘           │
│   ┌──────────────┐   ↓           ┌──────────────┐           │
│   │ Evidence 2   │  TIPS         │ Evidence 2   │           │
│   │ weight: 8/10 │  LEFT         │ weight: 3/10 │           │
│   └──────────────┘               └──────────────┘           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│   VERDICT: Established beyond reasonable doubt (99.9%)       │
│   Total weight FOR: 47  |  Total weight AGAINST: 8          │
└─────────────────────────────────────────────────────────────┘
```

### Key Interactions

- Hover/click on evidence cards to see: source, methodology, weight breakdown
- Scale animates as you scroll through evidence
- "Weight" scored on four criteria

## Evidence Weighting System

Each piece of evidence is scored on **four criteria** (0-10 points each, max 40 total):

| Criterion | What it measures | Example (high) | Example (low) |
|-----------|------------------|----------------|---------------|
| **Source Reliability** | Track record, peer review, expertise | Peer-reviewed journal: 9 | Anonymous blog: 2 |
| **Independence** | Free from conflicts, corroborated | Multiple independent labs: 9 | Single funded study: 3 |
| **Replicability** | Can others verify? Reproduced? | Repeated experiments: 10 | One-time observation: 4 |
| **Directness** | How directly addresses claim? | Physical moon rocks: 10 | "NASA wouldn't lie": 2 |

### Display

- Each evidence card shows a 4-bar breakdown of weight criteria
- Clicking reveals reasoning for each score
- Transparency principle: users see WHY, not just the number

### Aggregate Calculation

- Sum all FOR weights → Prosecution total
- Sum all AGAINST weights → Defense total
- Ratio determines verdict + confidence percentage

## Verdict Language

Maps to existing confidence scores:
- 95%+ → "Established beyond reasonable doubt"
- 75-94% → "Preponderance of evidence supports"
- 50-74% → "Evidence leans toward, but contested"
- <50% → "Insufficient evidence" or "Evidence favors opposition"

## Implementation Plan

### Phase 1: Types & Data
1. Extend `types/logic.ts` with `Evidence` interface including weight scores
2. Add `evidence` arrays to pillars in `data/topics.ts`
3. Create utility functions for weight calculations

### Phase 2: Components
1. Create `ScalesOfEvidence.tsx` main component
2. Create `EvidenceCard.tsx` with weight visualization
3. Create `ScaleAnimation.tsx` for the balance visualization
4. Create `VerdictDisplay.tsx` for the bottom verdict

### Phase 3: Integration
1. Add view toggle to TopBar or as floating control
2. Store view preference in Zustand store
3. Conditionally render Logic Map vs Scales view

### Phase 4: Polish
1. Animate scale tipping based on scroll position
2. Add hover states and expanded evidence details
3. Mobile responsive layout (stacked columns)
