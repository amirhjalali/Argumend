# Perspectives Page Design

## Overview

**Page:** `/perspectives`
**Purpose:** Visceral demonstration of Argumend's core philosophy: "You are not your ideas"
**Format:** Scroll-driven narrative story

## Core Concept

A public argument between two people. The scroll begins at the climactic moment—one person shoving another. It looks clear-cut: aggressor and victim. As the user scrolls, time rewinds and layers add, revealing how the same moment looks completely different depending on perspective, timing, information, and motivation.

## Narrative Structure

### 1. The Moment
- Full viewport, dramatic illustration
- Shows: Person A shoving Person B
- Text: "The aggressor. The victim. It's obvious."
- Emotional tone: Certainty, judgment

### 2. 30 Seconds Earlier
- Rewind indicator
- Reveals: Person B had grabbed Person A's bag first
- Previous interpretation visually "crosses out"
- Text: "But wait—what happened just before?"
- Emotional tone: First doubt

### 3. 2 Minutes Earlier
- Rewind further
- Reveals: Person B was retrieving their own stolen item
- Context shifts completely
- Text: "Context changes everything."
- Emotional tone: Confusion, humility

### 4. A Third Witness
- Split composition: scene + witness silhouette
- New interpretation that contradicts both previous views
- They arrived mid-scene, saw something else entirely
- Text: "Same moment. Different eyes. Different truth."

### 5. The Rumors Layer
- Visual fragmentation (torn paper effect, branching quotes)
- Shows how story mutates through retelling
- Quotes: "I heard...", "Apparently...", "My friend said..."
- Each version more distorted
- Text: "By the time it reaches you, what's left of the original?"

### 6. The Motivated Actors
- Small vignettes for each actor
- The journalist wanting a "violence" headline
- The friend of Person A who "knows" they'd never start trouble
- The shop owner who wants both gone
- Text: "Everyone tells the story that serves their needs."

### 7. The Synthesis
- Clean, minimal design
- All previous complexity fades
- Centered statement: "You are not your ideas."
- Subtext: "Ideas are lenses, not identities. Pick them up. Set them down. Trade them for better ones."
- CTA: Return to explore topics

## Visual Design

**Style:** Illustrated, muted parchment palette matching Argumend aesthetic
**Transitions:** Smooth fade/reveal on scroll, not jarring jumps
**Typography:** EB Garamond (headings/quotes), Source Sans (body)

**Visual motifs:**
- Clock/rewind indicator for timeline sections
- Strikethrough on previous "certain" interpretations
- Branching diagram for rumors
- Silhouettes for witnesses/actors

## Technical Implementation

- Use Intersection Observer or scroll-based animation library
- Each section is a full-viewport "scene"
- CSS animations for transitions between sections
- Placeholder illustrations until AI images generated
- Responsive: Works on mobile (vertical scroll natural)

## Navigation

- Add "Perspectives" to primary nav in Sidebar
- Position after "Concepts" (philosophical companion piece)
