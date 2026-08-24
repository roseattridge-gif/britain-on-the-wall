# Interactive Wall redesign handoff — 2026-08-24

## Outcome

The persistent spatial Wall is the primary product surface. Detail is revealed through semantic camera zoom, not page/view replacement.

The completed reviewed implementation is commit `ac92cf0`. It opens directly into a 3200×1800 explorable national money system: funding streams converge on a dominant Treasury, split through proportional ribbons into unequal spending territories, connect to large outcome heat fields, and visibly lose value through attached leak branches.

## Interaction verification

- Pointer drag pans the world.
- Wheel/trackpad and controls continuously zoom around the same scene.
- Fit Britain restores national framing.
- Health flies into its fixed world-space district and reveals five delivery components.
- Hospitals flies deeper and reveals six operational components.
- Escape or Backspace steps out one semantic level.
- Selection preserves connected context and dims unrelated territory in place.

## Visual acceptance

- Dashboard resemblance: **NO**
- Health spatially inside Britain: **YES**
- Pan: **YES**
- Continuous zoom: **YES**
- Zoom-dependent detail: **YES**
- Proportional major flows: **YES**
- Spatially attached leaks: **YES**
- National status heat obvious: **YES**
- Primary labels readable: **YES**
- Wall dominant: **YES**

The current illustrative year visibly uses amber and red outcome states. Green is part of the same implemented status system and appears in years with improving outcomes; no status was invented to force a three-colour screenshot.

## QA evidence

- `docs/qa/2026-08-24-wall-1440x900.jpg`
- `docs/qa/2026-08-24-wall-1920x1080.jpg`
- `docs/qa/2026-08-24-wall-390x844.jpg`
- `docs/qa/2026-08-24-wall-health-focus-1440x900.jpg`

Vitest passed 8/8 tests. TypeScript and the production Vite build passed. All displayed figures remain explicitly demo/illustrative.

## Next product task

Remain on visual/product experience: run first-impression comprehension testing, then refine density, ribbon joins, camera choreography and timeline transformation. Do not move to official-data ingestion yet.
