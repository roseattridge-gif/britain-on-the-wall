# CODEX HANDOFF

## 1. Task completed

Completed the visual reset of Britain on the Wall. The product now opens directly onto one dark, spatial, high-density Wall rather than a webpage, dashboard or diagram embedded in a page.

## 2. Product outcome

The 3200×1800 logical world is the interface. Funding sources converge on a dominant Treasury, broad money ribbons fan into unequal public-service districts, contextual returns radiate heat, and leakage leaves attached burgundy branches. Users pan the real scene and zoom deeper without replacing it.

## 3. What changed

- Re-authored the national composition around one large Treasury and an asymmetric fan of domains.
- Replaced thin connector lines with layered, animated, square-root-scaled money ribbons.
- Added outcome heat fields, attached leak branches, large world-space labels and compact fixed chrome.
- Rebuilt Health and Hospitals as progressively revealed spatial territories inside the same world.
- Added responsive reframing, a minimap, semantic breadcrumbs and contextual evidence inspection.
- Wrote the governing visual specification before implementation.

## 4. Files changed

- `docs/WALL_VISUAL_SPEC.md`: authoritative visual and interaction specification.
- `src/canvas/layout.ts`: 3200×1800 geography, authored districts and focus targets.
- `src/components/SystemCanvas.tsx`: persistent scene, ribbons, heat, leaks, semantic zoom and minimap.
- `src/styles.css`: dark physical-canvas language, hierarchy, animation and responsive rules.
- `src/App.test.tsx`: interaction coverage aligned to the persistent Wall.
- `docs/PRODUCT_DECISIONS.md`: visual-backbone decision.

## 5. Architecture / design decisions

World geometry, camera state, data and rendering remain separate. Accessible HTML nodes and labels sit over an SVG money-flow field. Camera transforms move the entire world; zoom thresholds reveal more of the same scene. No generic graph or dashboard library controls the result.

## 6. Data/model changes

No source-data or evidence model was expanded. Existing typed illustrative fixtures and evidence IDs remain intact. Ribbon widths use square-root scaling so differences are meaningful without allowing the largest value to erase the scene.

## 7. UX behaviour

- National view: sources → Treasury → services → contextual outcomes, with leaks attached.
- Health view: Hospitals, primary care, community care, medicines and administration emerge around Health.
- Hospitals view: workforce, estates, procurement, diagnostics, emergency and elective care emerge around Hospitals.
- Deep view: metric context appears without replacing the scene.
- Drag pans; wheel/trackpad and +/- zoom; Fit Britain reframes; breadcrumbs fly back spatially.
- £1 and £bn alter the value language; time and additive layers update the same wall.

## 8. Tests and verification

- TypeScript passed.
- Vitest: 2 files, 7 tests passed.
- Production Vite build passed.
- Browser QA completed at 1440×900, 1920×1080 and 390×844.
- Verified real pointer drag changes the world transform and Fit Britain restores framing.
- Verified Health and Hospitals camera flights, semantic disclosure, compact controls and mobile reframing.

Failure-condition audit:

- Five-column/page composition eliminated: confirmed.
- Repeated cards and arrow-chain grammar eliminated: confirmed.
- Organisation-chart/tree appearance eliminated: confirmed.
- Sankey, React Flow, Power BI, dashboard and process-diagram defaults eliminated: confirmed.
- Canvas is larger than the screen: confirmed at 3200×1800.
- Pan is genuine world translation: confirmed in-browser.
- Zoom preserves the same scene: confirmed.
- Health remains inside Britain and Hospitals remains inside Health: confirmed.
- Primary labels and values are readable at their intended semantic level: confirmed at all required viewports.
- Money flow is visibly encoded by broad proportional ribbons: confirmed.
- Outcome heat is spatially obvious: confirmed.

## 9. Known limitations

All figures and outcome signals remain illustrative. Positions are editorially authored. Only Health/Hospitals has deep semantic content. The minimap is indicative rather than interactive, and the smallest mobile view deliberately crops the national world's outer districts so the central money system remains legible and pannable.

## 10. Product questions / decisions needed

No decision blocks this increment. Before official publication, determine the authoritative data adapter and evidence standards for every displayed figure.

## 11. Recommended next task

Run first-impression comprehension testing with five to eight people. Measure whether they can identify the funding source, Treasury, largest service domains, outcome heat and leaks within five seconds; refine only from observed failures.

## 12. How to run/view it

From the repository root run `pnpm dev` and open the printed localhost URL. If that port is occupied, Vite selects the next one. The only route is `/` and the Wall fills the viewport immediately.

## 13. Git state

Branch: `main`. No commit exists. The implementation and documentation remain uncommitted.
