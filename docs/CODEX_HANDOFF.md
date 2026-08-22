# CODEX HANDOFF

## 1. Task completed

Built the greenfield Britain on the Wall MVP defined in the 22 August 2026 master build prompt.

## 2. Product outcome

Users can explore Britain as one connected public-value system, change time and units, reveal leaks and contribution/receipt context, zoom into Health without losing orientation, and inspect evidence metadata behind material figures.

## 3. What changed

Created a React/TypeScript/Vite product; responsive editorial shell; data-driven national wall; full Health drill-down; interactive layers; evidence drawer; launch/privacy layer; tests; and repository documentation.

## 4. Files changed

- `src/App.tsx`: product shell, state and editorial sections.
- `src/components/BritainWall.tsx`: national and Health value-stream views.
- `src/components/Toolbar.tsx`: timeline, units, layers and placeholders.
- `src/components/EvidenceDrawer.tsx`: production-shaped evidence inspection.
- `src/data/demo.ts`, `src/types.ts`: typed illustrative data and adapter seam.
- `src/styles.css`: responsive visual system and semantic states.
- `README.md`, `docs/PRODUCT_DECISIONS.md`: operating and product context.

## 5. Architecture / design decisions

The Wall is one continuous spatial system rather than a dashboard. Domain zoom reuses the same causal grammar. Data access is isolated from rendering. Proportional bands use custom visual primitives rather than a default chart package. Overlays accumulate without replacing the base wall.

## 6. Data/model changes

Added stable typed entities for periods, funding streams, spending domains, delivery components, outcomes, leaks and evidence. Every material entity references evidence by stable ID. Five demo periods are included.

## 7. UX behaviour

Timeline and units redraw figures in place; borrowing is differentiated; leaks and contribution/receipt are additive; Health redraws as funding → delivery → output → recipient → result; material figures open an evidence drawer; mobile retains causal order vertically.

## 8. Tests and verification

- TypeScript static check: passed (`tsc -b --pretty false`).
- Vitest: 2 files, 6 tests passed.
- Production build: passed; 223.59 kB JS / 70.97 kB gzip.
- Browser QA at 1440×1000 and 390×844: no document-level horizontal overflow.
- Health zoom and evidence drawer passed; browser console had no warnings/errors.

## 9. Known limitations

All figures, trends, outcomes and evidence metadata are illustrative. Only Health has a complete domain zoom. Balance Sheet and Compare are placeholders. No official-data adapters, causal ROI algorithm, automated ingestion, regional comparison or production signup endpoint is included.

## 10. Product questions / decisions needed

Choose the first official-data slice and publication/normalisation standard before replacing demo values. Decide whether the next proof point should deepen Health evidence or add a contrasting domain.

## 11. Recommended next task

Build the official-data foundation for one complete Health pathway: source registry, reproducible ingestion, nominal/real-terms rules, geography/denominator definitions, revisions and provenance validation; then connect it to the existing adapter.

## 12. How to run/view it

Run `pnpm install`, then `pnpm dev`, and open `http://localhost:5173/`. Select Health in “Where it goes”.

## 13. Git state

Branch: `main`. No commits exist yet. The initial product files are uncommitted.
