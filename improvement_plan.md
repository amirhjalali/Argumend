# Improvement Plan for Argumend v2

This plan aims to refine the functionality and shift the aesthetic of Argumend towards a "Stoic / Greek / Roman" discourse theme, moving away from the current "Space" vibe.

## Phase 1: Aesthetic Overhaul (Stoic Theme)

- [ ] **1. Global Theme & Color Palette Update**:
    - Replace "Space" colors (neon blues, purples, black voids) with "Stoic" colors (marble whites, parchment beiges, deep stone greys, philosophical golds, olive greens).
    - Update `tailwind.config.ts` with new color variables (`accent-truth` -> `accent-logos`, `accent-doubt` -> `accent-pathos`, `bg-void` -> `bg-agora`, etc.).
    - Remove "stars" and "dots" backgrounds; replace with subtle texture (paper/stone) or clean minimalist backgrounds.

- [ ] **2. Typography Update**:
    - Switch fonts to evoke a classical feel.
    - Headings: Serif font (e.g., Cinzel, Merriweather, or similar Google Font).
    - Body: Clean Sans-serif or Humanist Serif (e.g., Lato or EB Garamond) for readability.
    - Update `layout.tsx` to load new fonts.

- [ ] **3. Node Styling (Meta, RichNode)**:
    - Redesign `MetaNode` and `RichNode` cards.
    - Remove "glassmorphism" and neon borders.
    - Use "Card" aesthetics: solid backgrounds (parchment/stone), elegant borders (double lines, classical corners), serif typography.
    - Update icons: Replace generic Lucide icons with more classical ones (e.g., columns for pillars, scales for crux, scroll for evidence) if available, or style existing ones to look less "tech".

- [ ] **4. UI Components Update (Controls, Drawer, Modal)**:
    - **Crux Drawer**: Re-style as a "Scroll" or "Tablet" sliding out. Use serif headers.
    - **Deep Dive Modal**: Style as a "Dialog" or "Symposium" view.
    - **Controls**: Minimalist, perhaps mimicking stone carvings or simple geometric shapes.
    - Remove "Confidence Meter" neon ring; replace with a classical gauge or simple text-based representation (e.g., "Certainty").

## Phase 2: Functionality & Logic Improvements

- [ ] **5. Fix "Infinite Filler" Content**:
    - Disable automatic generation of "fallback templates" that create repetitive garbage content.
    - If a node has no children in the blueprint, it should be a leaf node (no "expand" button).
    - Update `useLogicGraph.ts` to handle this logic.

- [ ] **6. Horizontal Expansion (Multiple Pillars)**:
    - Update `logicBlueprint.ts` structure to allow the Root node to have multiple "center" children (Pillars) side-by-side.
    - Update `layout.ts` (or wherever positioning is calculated) to handle sibling nodes in the same slot (e.g., multiple pillars centered). *Note: This might be complex with the current hardcoded "left/right/center" slots; we may need to relax the slot system.*

- [ ] **7. Title & Content Refinement**:
    - Remove redundant prefixes like "Skeptic Vector:" from titles.
    - Ensure content in `logicBlueprint.ts` is concise and fits the new card designs.

- [ ] **8. "Minimap" / Navigation Update**:
    - Ensure the React Flow minimap (if used) or navigation controls match the new theme.
    - Maybe add a "Table of Contents" or "Index" sidebar if appropriate.

- [ ] **9. Animations**:
    - Replace "tech" animations (fast slides, glitches) with "organic" ones (fades, slow unfolds, paper unfurling).
    - Update Framer Motion transitions in `DeepDiveModal` and `CruxDrawer`.

## Phase 3: Final Polish

- [ ] **10. Clean Up & Git**:
    - Remove unused "Space" assets/code.
    - Ensure all types are strict.
    - Verify build passes.
    - Commit and push changes regularly.

