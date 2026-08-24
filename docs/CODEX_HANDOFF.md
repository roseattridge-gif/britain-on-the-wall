# CODEX HANDOFF

Date: 2026-08-24
Increment: Make the mass of money obvious
Reviewed implementation commit: `6c2135c`

## Product review — eight explicit answers

### 1. Is magnitude obvious without reading every number?

Yes. Every funding and spending item now uses three redundant signals derived from the selected demo year: square-root-scaled blob area, square-root-scaled ribbon width and a numeric `p` or `£bn` label. At 1440×900, workers/households visibly dominate funding; Health, Pensions and Welfare form the largest spending territory.

### 2. Is funding composition visible?

Yes. Selecting Workers & households, Businesses or Consumption keeps the persistent world and reveals a shallow orbital composition. Each child repeats area, derived amount and share. Wording is deliberately `RECEIPTS ASSOCIATED WITH`; the prototype does not make tax-incidence claims. All values remain illustrative fixtures.

### 3. Is spending composition visible?

Yes. Pensions, Welfare, Education and Defence disclose their largest illustrative components as an in-place orbital territory. The label is `THIS ALLOCATION CONTAINS`. Health remains the accepted deeper recursive example—allocation → delivery → people → outcome—rather than receiving a competing shallow overlay.

### 4. Are the largest sources and destinations annotated?

Yes. The selected year derives `#1–#3 SOURCE CATEGORY` and `#1–#3 DESTINATION` labels. These are magnitude ranks, distinct from the authored `DEMO ATTENTION` story pins.

### 5. Is Treasury still the convergence point?

Yes. Every funding/borrowing ribbon enters Treasury and every allocation ribbon leaves it. A static dashed `100p / ONE NATIONAL POOL` ring makes the whole-to-parts relationship explicit without adding a panel or list.

### 6. What changes with year and unit?

Year changes recompute node area, ribbon width, numeric values and rank order in the same 3200×1800 world. The 2005 and 2025 QA views show materially different total mass, borrowing and destination proportions. Unit switching preserves geometry while changing all labels between every-£1 and £bn views. Composition amounts use the active year and unit.

### 7. What remains visually ambiguous?

The lower spending fan is intentionally dense at national fit, and temporary change notes can overlap nearby context. In the Pensions composition focus, the selected parent and its two satellites make a dense cluster, but hierarchy remains readable through area, colour, labels and dimming. The prototype composition shares are not official data and should not be treated as a published fiscal taxonomy.

### 8. What should be built next?

Run observed five-second and thirty-second comprehension sessions against these saved views and the interactive Wall. Refine only collisions that impede identified reading tasks. Do not begin official-data ingestion, add timeline playback, implement general collision priority or open another deep domain until that observation is complete.

## Preserved architecture and boundary

The accepted camera, pannable persistent scene, semantic thresholds, Health/Hospitals hierarchy, evidence drawer, leak grammar and outcome horizon remain intact. Composition is additive and in-place. The full experience continues to state `DEMO / ILLUSTRATIVE DATA`.

## Verification

- Vitest: 2 files, 15 tests passed.
- TypeScript: `tsc --noEmit` passed.
- Production Vite build passed.
- `git diff --check` passed.
- Rendered at 1440×900 in local Chrome and reviewed side by side.

Saved evidence:

- `docs/qa/2026-08-24-mass-national-pound-1440x900.png`
- `docs/qa/2026-08-24-mass-national-bn-1440x900.png`
- `docs/qa/2026-08-24-mass-funding-composition-1440x900.png`
- `docs/qa/2026-08-24-mass-spending-composition-1440x900.png`
- `docs/qa/2026-08-24-mass-national-2005-1440x900.png`
- `docs/qa/2026-08-24-mass-national-2025-1440x900.png`

## Git state

Branch: `main`. Implementation commit: `6c2135c`. This handoff is committed separately so it cites the immutable reviewed implementation. Verify both commits on `origin/main` before review.
