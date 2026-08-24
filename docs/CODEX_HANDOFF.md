# CODEX HANDOFF

Date: 2026-08-24
Increment: Make the Wall explain itself
Reviewed implementation commit: `511ad8d`

## 1. What a first-time user can now understand

The opening scene teaches the product grammar without leaving or blocking the Wall. A new user can identify who funds Britain, distinguish receipts raised now from borrowing, see the illustrative £1.27tn pool, read where every £1 goes, compare related spending direction with outcome direction, identify losses versus committed fiscal drag, see authored attention priorities and understand how to explore deeper.

The optional five-step first-look guide highlights those regions in sequence and can be skipped at any time.

## 2. National reading order

The world reads:

1. upper-left receipts raised now;
2. spatially separate violet borrowing;
3. convergence through the dominant Treasury;
4. the proportional “where every £1 goes” spending fan;
5. delivery and people revealed through semantic zoom;
6. the shared outcome horizon;
7. losses, leaks and committed drags branching downward where they occur.

Small world-space chapter markers support this eye path. They are not navigation cards.

## 3. Spend and outcome pairing without causal claims

Each outcome pairs its direction with the change in related spending since the preceding demo year. Attribution remains visible as `MEASURED RETURN`, `INDICATIVE RETURN` or `CONTEXT ONLY`. The outcome horizon states `SPEND TREND ≠ PROOF OF CAUSE`, and inspectors repeat that the pairing does not establish causation.

## 4. How time transforms the Wall

The years are presented as a compact timeline scrubber with explicit year stops. A year change updates ribbon widths, amounts, outcome heat, attention pins and leak/drag magnitude in the same scene. Nodes pulse and flows brighten briefly. Three spatial change notes identify Health’s changing share of every £1, debt-interest drag and the healthy-lives status transition.

The 2005 → 2025 QA visibly produced:

- Health gained 3p of every £1;
- debt-interest drag rose 3p;
- healthy lives moved from improving to deteriorating;
- attention priorities changed from improvement-led signals to pressure, spending growth and delivery friction.

Reduced-motion preference removes animated effects.

## 5. Attention signals

Three to four explicit `DEMO ATTENTION` pins are authored per demo year in `src/data/story.ts`. Their types are pressure, watch, improving and drag. These are editorial prototype fixtures—not an algorithm or objective ranking—and disappear once the camera enters Health.

## 6. Leaks versus drags

- `LEAK`: loss within a delivery mechanism, such as backlog costs.
- `LOSS`: avoidable delivery/control costs, such as fraud/error or overruns.
- `DRAG`: a committed fiscal outflow, specifically debt interest.

Fraud/error is attached to administration, backlog cost to Health delivery, project overruns to infrastructure, and debt-interest drag to the debt-interest territory. Debt interest is not described as abuse or waste.

## 7. Health story

Selecting Health dims unrelated Britain and reveals one concise world-space trace:

`allocation → delivery → people → outcome`

The trace shows 19p of every £1 → care systems → patients and communities → deteriorating healthy-lives context, with a visible non-causality qualifier. National chapter labels and attention pins recede. Hospitals then reveals its operational territory while remaining inside Health and Britain.

## 8. 30-second comprehension review at 1440×900

1. Who funds Britain? **Clear:** workers/households, businesses, consumption, property/capital and other receipts.
2. How much enters? **Clear:** £1.27tn illustrative public-money pool.
3. What is borrowing? **Clear:** separate dashed violet money pulled forward/debt created.
4. Where does most money go? **Clear:** Health, pensions and welfare dominate.
5. What does 19p mean? **Clear:** 19p of every illustrative £1 raised or borrowed.
6. What do green/amber/red mean? **Clear:** improving, mixed and deteriorating, with arrows and words.
7. What does Britain get back? **Clear:** the shared outcome horizon.
8. Where is value lost? **Clear:** attached downward leak/loss/drag branches.
9. What deserves attention? **Clear:** year-specific `DEMO ATTENTION` pins.
10. How is detail explored? **Clear:** guide, Health callout, pan/zoom and semantic zoom.

## 9. Verification and QA evidence

- Vitest: 2 files, 12 tests passed.
- TypeScript passed.
- Production Vite build passed.
- `git diff --check` passed.
- Browser-tested guide, 2005 → 2025 change, Health story, Hospitals depth and mobile layout.

Saved evidence:

- `docs/qa/2026-08-24-story-first-look-1440x900.jpg`
- `docs/qa/2026-08-24-story-time-change-1440x900.jpg`
- `docs/qa/2026-08-24-story-health-1440x900.jpg`
- `docs/qa/2026-08-24-story-hospitals-1440x900.jpg`
- `docs/qa/2026-08-24-story-mobile-390x844.jpg`

## 10. What still feels visually unclear

The national lower spending arc remains intentionally dense at 1440px, and temporary year-change notes overlap nearby context for several seconds. Outcome pairing is comparative illustrative context rather than a full long-term trend explanation. Mobile remains a pannable crop rather than a complete national overview. These are refinement limits, not blockers.

## 11. Next product/visual increment

Run observed first-time comprehension sessions and refine where people hesitate. Likely next work is timeline playback/pacing, annotation collision avoidance and clearer long-term versus one-interval trends. Do not begin official-data ingestion yet.

## 12. Architecture and data boundary

The accepted 3200×1800 world, camera, semantic thresholds, Health/Hospitals hierarchy, evidence drawer and additive layers remain intact. No replacement view or additional deep domain was added. Everything remains `DEMO / ILLUSTRATIVE DATA`.

## 13. Git state

Branch: `main`. Implementation commit: `511ad8d`. This handoff is committed separately so it can cite that immutable SHA. Verify both commits on `origin/main` before review.
