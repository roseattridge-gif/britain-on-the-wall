# CODEX HANDOFF

# BOTW V1 — PRIVATE TEST READY

Feature scope frozen: YES

National Wall production-ready: YES
What Changed production-ready: YES
Value/leakage production-ready: YES
Ask Britain production-ready: YES
Immigration journey production-ready: YES
Health journey production-ready: YES
Evidence experience production-ready: YES
Mobile production-ready: YES
Favicon installed: NO — the exact approved crowned-wall assets were not available; no substitute was invented.

Tests: PASS — 13 files / 201 tests
Typecheck: PASS
Build: PASS
Diff check: PASS
GitHub Pages: PASS — run 33881973795 deployed `13cd576ca55a86aeb8ac7285500b98f7a8b142df`; HTTPS and production smoke test passed

Placeholder headline numbers remaining in public mode: NONE FOUND
Demo-only public content remaining: NONE ON PUBLIC ROUTES; `/legacy-wall` remains a separate development reference
Broken controls: NONE FOUND IN LOCAL THREE-VIEWPORT QA OR PRODUCTION SMOKE TEST
Known launch blockers: APPROVED FAVICON ASSET FILES NOT SUPPLIED; PRIVATE-TEST THRESHOLD NOT YET MEASURED

Ready for 10–15-person private test: YES
Ready for public launch if private test clears 4/5 threshold: NO — install and verify the exact approved favicon first.

## V1 launch candidate — 2026-09-04

The bounded V1 is implemented: readable What Changed comparisons; official productivity, benefit fraud/error, tax-gap and debt-interest context; five Claim → Evidence checks; deterministic Ask Britain with an explicit unsupported state; two seven-step shareable journeys; a public trust/method section; and launch audit, data register, private-test plan and scorecard. The technical gate passes: 196 tests, type checking, production build, diff check, seven browser receipts and a 390px no-overflow check. Public-launch approval remains deliberately withheld until the documented 10–15-person private test is run and every scorecard dimension is at least 4/5. No generative chat, forecasts, accounts, payments, Justice or Education expansion was added.

## Main Wall readability pass — 2026-09-04

1. **Cash percentage change:** yes, it is visible on every row with a prior comparable period.
2. **Share movement:** yes, percentage-point change is visible and separately labelled `pp share`.
3. **First year:** every fiscal row says “First comparable period”; no zero or invented prior value is shown.
4. **Pound sign:** a shared `MoneyDisplay` separates a lighter 0.78em symbol, the primary number and a smaller `bn`/`tn` unit.
5. **Ribbons:** unchanged proportional widths now rest at 0.14 opacity; when one is active, unrelated paths fall to 0.055.
6. **Flow focus:** pointer hover and keyboard focus set the same React flow state; the matching path rises to 0.82 opacity.
7. **Tokens:** individual squares were replaced by one continuous proportional strip with a quiet five-percent texture.
8. **Top three:** the three largest current values in each column are recalculated for the selected year and receive a slightly larger value and strip. Technical reconciliation is excluded.
9. **Technical row:** yes, it remains grey, `NOT A SERVICE`, never `major`, and visually reduced.
10. **Fiscal data:** NO fiscal data, taxonomy, evidence ID, historical period or derivation changed.
11. **Public data mode:** YES, public mode remains `real` by default.
12. **1440×900 QA:** the public total and top categories read first; low-opacity ribbons no longer dominate; £100 and £bn values remain aligned; all visible rows carry cash and share movement without collisions. Focused Health raises only its path. At 390×844 the page measured exactly 390px wide, the pool was reduced to reveal the Wall sooner, and row-level inspection confirmed clean label/value/change stacking. Receipts are under `docs/qa/main-wall-clean-*.png`.

## BOTW design-system / polish pass — 2026-09-04

1. **Design tokens:** Introduced shared background/surface, primary/secondary/muted text, border, accent, success, warning, danger, technical and borrowing colours; 4/8/12/16/24/32/48/64 spacing; three radii; and one restrained shadow in `national.css`.
2. **Typography minimum:** Public text has an enforced 11px metadata floor. Newsreader is reserved for the masthead, chapter headings, major numbers and editorial signals; Libre Franklin handles data and interface text.
3. **Simplified public labels:** “Substantive initial decisions” is now “Asylum decisions made”; “asylum backlog” is “People awaiting an asylum decision”; “completed RTT pathways” is “NHS treatments completed”; “waiting list” is “NHS waiting list”; “net additional dwellings” is “Homes added”; and TME is written as total spending. Stable IDs and official evidence definitions are unchanged.
4. **National Wall:** The header now asks the product question directly, removes source/destination counts, and retains only the total, £100 frame, unit switch and help. Rows show label, value, percentage and physical share by default; detailed comparisons remain available in the accessible/hover description and source drawer. The medallion remains dominant.
5. **Hero cards:** Every topic uses category → large value → plain label → comparable-period change/status → actual period. Cards share one surface, border, radius, type scale and source affordance.
6. **Charts:** Primary and supporting trends now share one line/point/year-band grammar, readable 14px SVG labels, accessible names and a dedicated current-value footer. The primary chart remains materially larger.
7. **Government context:** A neutral grey band and restrained 5 July 2024 boundary replace party-brand styling. Policy events use one subordinate marker/card style and open evidence.
8. **Evidence drawer:** Reordered into metric/value, period/geography, confidence, source, definition, what it tells us, what it cannot tell us, collapsed technical detail and official link. It is a side sheet on desktop and full-width on mobile.
9. **Dead/duplicate UI:** Removed the accumulated compact-story, old timeline, old summary and topic-specific density rules from `national.css`. `/legacy-wall` remains separate and unchanged.
10. **390px:** Yes. Browser QA measured `innerWidth = scrollWidth = bodyScrollWidth = 390`; controls remain readable, rows stack, and the evidence drawer becomes a full-width sheet.
11. **Remaining weakness:** The complete national taxonomy is intentionally taller than one 900px viewport once labels respect the 11px floor; lower categories require scrolling. This is preferable to shrinking the data. The next visual opportunity is chart-axis/value annotation refinement, not another layout system.
12. **Intelligence readiness:** Yes. The front end now has shared topic/year/card/chart/signal/evidence primitives suitable for a separately designed intelligence consumer. No new intelligence UI or feature was added in this pass.

Design contract: `docs/DESIGN_SYSTEM.md`. QA: `docs/qa/design-system-national-1440x900.png`, `design-system-health-1440x900.png`, `design-system-immigration-1440x900.png`, `design-system-housing-1440x900.png`, and `design-system-mobile-390x844.png`.

## Intelligence primitives — 2026-09-04

1. **Generic metric contract:** `IntelligenceMetricSeries` carries stable metric/topic IDs, definition, money/capacity/output/outcome/context dimension, unit, polarity, geography and measurement basis. Each point keeps its Wall period ID, actual measurement label/date, numeric-or-unavailable value, status, comparability and evidence IDs.
2. **Inflection types:** Local peak, local trough, reversal up, reversal down, acceleration and deceleration, all requiring three consecutive eligible observations and material movement.
3. **Materiality rule:** A 0–100 ranking combines 60% capped proportional delta and 40% capped delta relative to the full observed series range, then applies a 1.0 HIGH or 0.75 MEDIUM confidence weight. The deterministic eligibility threshold is 3. This is ranking, not statistical significance.
4. **Registered contradictions:** Health: spend → waiting list/18-week performance, workforce → waiting list/18-week performance, completed pathways → waiting list. Immigration: substantive initial decisions → asylum backlog. Housing: spend → net additions, net additions → affordability/temporary accommodation. No unregistered pair is evaluated.
5. **Polarity:** Higher-is-better and lower-is-better translate numeric direction into improved/deteriorated. Neutral-context metrics remain up/down/flat only; they never become performance claims.
6. **Comparability:** HIGH-only inputs yield HIGH confidence; any eligible MEDIUM input yields MEDIUM confidence; any LOW or unavailable input blocks the candidate headline signal.
7. **Period mismatch preservation:** `periodId` aligns existing story columns while every signal separately exposes the real left/right measurement labels and the relationship's alignment note. Fiscal years, calendar years, monthly totals and snapshots are never relabelled as one another.
8. **Real Health signals:** The engine finds historical spend-up/performance-down and capacity-up/performance-down co-movements. It also detects the March 2024 waiting-list peak/reversal down and 18-week-performance trough/reversal up. These are numerical observations, not attribution.
9. **Immigration inflections:** The asylum backlog produces its 2022 local peak/reversal down. Decision output's rise/easing/rebound is evaluated from the real calendar-year series. Net migration remains neutral and its unavailable first value prevents an unsupported local-peak calculation.
10. **Housing signals:** The registered fiscal spend → supply pair produces spend-up/output-down observations where both movements are material. The 2025–26 supply point remains unavailable, so it cannot produce a current supply signal. Affordability and temporary-accommodation series remain eligible for their own deterministic shape signals.
11. **Evidence resolution:** Yes. Every signal inherits the union of evidence IDs from all points used; candidates without evidence are not emitted by the registered data adapters.
12. **Does government/policy context influence detection?** NO. It is absent from inflection, contradiction and materiality inputs.
13. **Is generative AI involved?** NO. There are no model calls, embeddings, vector search or generated explanations.
14. **Ready for public “What Changed?” UI?** The deterministic foundation and catalogue API are ready for Product Management review and UI design. This increment intentionally does not claim the public experience is ready: wording, signal selection and explanation presentation still require a separate consumer increment.

Detailed contract and formula: `docs/INTELLIGENCE_ENGINE.md`. Public story workspace: unchanged from `d671cd0`.

## How We Got Here — Housing — 2026-09-02

1. **Accepted/rejected metrics:** Accepted UK Housing and communities expenditure as context; England net additional dwellings as supply output; the ONS England median house-price-to-residence-based-earnings ratio as purchase affordability; and England households in temporary accommodation as the social outcome. New-build completions, planning permissions, raw house prices, mortgage rates, homelessness-duty flows and demand/population comparisons were rejected from the headline story. Affordable-housing delivery remains later evidence, not a hero series.
2. **Definitions/geographies:** Fiscal spending is the frozen UK public-sector PESA function. Net additions are the net annual change in England dwelling stock. Affordability is median England sale price divided by median residence-based full-time earnings. Temporary accommodation is the England quarter-end household stock under statutory homelessness functions.
3. **Public money:** Nominal Housing and communities expenditure rose £15.273bn → £17.404bn → £20.908bn → £21.700bn → £22.470bn. Its TME share was 1.47% → 1.50% → 1.70% → 1.68% → 1.65%. This is context, not improvement.
4. **Supply:** England net additions were 234,460 → 234,290 → 221,410 → 208,600 through 2024–25: broadly flat, then two falls. The comprehensive 2025–26 result is not yet published and is visibly unavailable.
5. **Affordability:** The latest ONS workbook gives 9.06 → 8.56 → 8.45 → 7.84 → 7.64. Purchase affordability improved after the 2021 peak, but the ratio remained high. Lower is better.
6. **Housing need:** England households in temporary accommodation rose 95,060 → 104,510 → 117,450 → 131,140 → 135,580 at successive 31 March snapshots. Lower is better; households are not people.
7. **Labour inheritance:** At 5 July 2024, supply was already falling, purchase affordability was improving from its 2021 peak, and temporary accommodation was already rising.
8. **After handover:** The 2024–25 supply total fell further, March 2025 temporary accommodation rose, calendar-2025 affordability improved and March 2026 temporary accommodation rose again. The annual 2025–26 net-additions result is pending. These are subsequent observations, not attribution.
9. **Policy events:** Affordable Homes Programme delivery period; Social Housing (Regulation) Act 2023; July/December 2024 planning and housing-target reform; March 2025 affordable-housing bridge funding; and the 2025 launch of the 2026–36 Social and Affordable Homes Programme. Every event records owner, status, relationship and expected lag.
10. **Lag warnings:** Planning, grant allocation, starts and completions are distinct. Planning and supply programmes carry a long expected lag; current outcomes cannot assess programmes whose delivery lies later.
11. **Chronology only:** Spending, policy dates, supply, affordability and temporary-accommodation movement are not treated as a causal chain. House prices/mortgage rates are not government scores. No migration-to-prices or migration-to-homelessness claim exists.
12. **Signals:** `SPEND UP · SUPPLY DOWN` and `SUPPLY DOWN · HOUSING NEED UP` appear where mechanically true, always followed by the non-causation caveat.
13. **Three-story proof:** Yes. Immigration explains demand/system flows, Health separates UK spend from England capacity/activity/outcomes, and Housing separates money, physical supply, market affordability and social need.
14. **Scale readiness:** The architecture supports three substantively different stories without redesign. Reusable additions are limited to missing observations and policy lag/ownership/context metadata. Stop before a fourth topic for Product Management review.

Research record: `docs/stories/HOUSING_SYSTEM_DATA.md`. Story contract: `docs/stories/HOUSING.md`.

## Immigration system-performance history — 2026-08-31

1. **Metrics added:** asylum backlog and substantive initial-decision output, alongside existing long-term net migration.
2. **Definitions:** backlog is people (main applicants plus dependants) awaiting an initial decision at each December snapshot. Output is people receiving a grant of protection, grant of other leave or refusal during each calendar year; withdrawals and administrative outcomes are excluded.
3. **Official sources:** Home Office Asy_D03 and Asy_D02 in Immigration System Statistics. Exact methodology and links are in `docs/stories/IMMIGRATION_SYSTEM_DATA.md`.
4. **Periods:** December snapshots and calendar years 2021–2025, mapped to the five explorer columns without relabelling them as fiscal data.
5. **Comparability:** both headline operational series are HIGH within the documented definitions. The backlog caseworking-system boundary and long-wait dependant-record caveat remain visible in evidence.
6. **Backlog trend:** 100,564 → 160,919 → 128,786 → 124,802 → 64,426 people. It rose through 2022, peaked in June 2023, and was already falling before the July 2024 handover; it then continued to fall.
7. **Output trend:** 17,866 → 22,790 → 91,556 → 86,641 → 135,740 substantive initial decisions. Output rose sharply in 2023, eased in 2024 and rose again in 2025.
8. **At handover:** net migration and backlog were already falling; calendar-2023 decision output had already risen substantially before easing in 2024.
9. **After handover:** backlog continued to fall and calendar-2025 substantive output increased. This is chronology, not government attribution.
10. **Contribution evidence:** existing ONS/MAC sources support contributors to net-migration movement. No policy is claimed to have caused the backlog or output path.
11. **Chronology only:** policy dates, government control, backlog and output movements are adjacent unless an authoritative source expressly supports contribution.
12. **Unresolved:** processing time, hotel dependence and returns remain out of the headline UI because a clean five-period performance series or safe polarity was not established.
13. **Replication readiness:** the typed metric model, evidence requirements, comparability labels and polarity-safe presentation are reusable, but Product Management should review this Immigration pilot before another domain is built.

## National illustration removal — COMPLETE

1. **Is `.scene` removed from `NationalWall.tsx`?** YES.
2. **Are `sourceScene` and `destinationScene` deleted?** YES.
3. **Is `/illustrations/fiscal-sources-v1.png` referenced by the public national UI?** NO.
4. **Is `/illustrations/fiscal-destinations-v1.png` referenced by the public national UI?** NO.
5. **Did the forbidden-string grep return zero matches?** YES. Both the mandatory component/CSS command and the second `src public` asset search returned no matches (`rg` exit 1).
6. **Did browser QA show zero decorative row images?** YES. All 20 fiscal rows contain only a small functional outline icon; the explicitly permitted central Britain medallion remains.
7. **Screenshot path:** `docs/design/qa-no-images-1440x900.png`.
8. **Test result:** 6 Vitest files / 113 tests passed; TypeScript passed; Vite production build passed; `git diff --check` passed.
9. **Commit SHA:** `d74ec32` (`Prove national row images are removed`).

## Hard correction: zero row images + true year exploration — 2026-08-29

1. **All images removed?** Yes. The public source/destination rows contain no image, picture, illustration panel, scene crop or decorative landscape. The central Britain medallion is not a row image and remains the approved anchor.
2. **Is `.scene` gone from `NationalWall.tsx`?** Yes. It is also gone from `national.css`; a raw-source regression test enforces both facts.
3. **Scene sheets unused?** Yes. `fiscal-sources-v1.png` and `fiscal-destinations-v1.png` were deleted previously and neither filename exists in the national component or CSS.
4. **Coordinate maps deleted?** Yes. `sourceScene`, `destinationScene`, `--scene-x` and `--scene-y` do not exist in the national implementation.
5. **Fiscal row contents:** Restrained outline icon, category label, aligned proportional £1 blocks, selected-unit monetary value, percentage, quiet previous/base comparison and evidence affordance. Icons have no coloured box or gradient.
6. **Direct year selection:** Five prominent fiscal-year stops update the full Wall in place. Previous/next, keyboard left/right and the five chronology column headers select the same state. Playback remains optional and secondary.
7. **Mixed government:** The 2024–25 column says `Conservative → Labour` and `Handover: 5 July 2024`; policy ownership and the YE December 2024 system/outcome period are separate.
8. **Inherited trajectory:** The selected-year evidence summary explicitly shows `INHERITED TREND` and `AFTER HANDOVER`. For 2024–25 it says the trend was already falling at handover, then continued falling, without causal attribution.
9. **Polarity:** Metrics declare higher-is-better, lower-is-better or neutral-context. Net migration is neutral; columns say `RISING`, `PEAKED` or `DOWN` plus `CONTEXT ONLY`, never improved/declined.
10. **Live Immigration data:** Official long-term net-migration contexts/points, actual measurement periods, exact government periods and sparse material policy events with evidence routing. The latest 204k point is provisional.
11. **Illustrative boundary:** No generic Better health/Good education/Safe & secure/Strong economy/Support in hard times panel remains. No unsupported Immigration backlog, processing, accommodation or removals series was invented. The legacy canvas remains isolated at `/legacy-wall`.
12. **Next build:** Product Management can review the five-column story grammar, then commission one authoritative operational Immigration series or resume a separately approved deeper domain. Do not add metrics without comparable official periods and polarity rules.

Detailed record: `docs/handoffs/2026-08-29-hard-correction-year-exploration.md`. Verification: 6 Vitest files / 113 tests passed; TypeScript passed; Vite production build passed; `git diff --check` passed; explicit source scan found rejected terms only inside the negative regression test. Four required 1440×900 states were inspected. Implementation SHA: `68ca862`.

## Clean national UI rebuild — 2026-08-29

1. **Reference fidelity:** Macro-composition closely matches the only supplied repository reference: calm masthead, compact metadata rail, left sources, central £100 medallion, right destinations, lower history/evidence band and footer. The written clean brief controls where it conflicts with the reference's painted scenes.
2. **Pictures removed:** All source/destination placeholder SVGs, their manifest and visual scene regions were removed from the public route. No sprite sheets, decorative panels, cartoon figures or programmatic scenes remain.
3. **Icons:** Stable fiscal IDs map to restrained Lucide outline icons with consistent stroke weight. They are functional category cues only; the medallion remains the single premium visual anchor.
4. **£1 blocks:** Whole blocks use the unrounded selected-year share; a partially filled final block preserves fractions. They recolour and recount with the year while stable rows preserve spatial memory.
5. **Year clicks:** Five direct stops, previous/next and focused-timeline arrow keys update the same page. Playback is secondary. Period and unit are now shareable URL state.
6. **Government context:** The lower Immigration exhibit shows exact government bands and a neutral handover marker. 2024–25 explicitly reads Conservative → Labour with 5 July 2024 separated from policy ownership and outcome timing.
7. **Outcomes:** The evidence summary now has an explicit outcome field. Metric polarity governs the language; neutral net migration is `CONTEXT ONLY`, never improved/declined.
8. **Story panel:** `HOW WE GOT HERE` aligns government, sparse material policy events, actual-period system points, outcome interpretation, inherited direction and after-handover chronology, with evidence available in place.
9. **Remaining differences:** No separate approved-clean bitmap was supplied, so the repository's approved illustrated reference supplies geometry while the clean written brief supplies the no-picture override. Real taxonomy/counts and the Immigration evidence exhibit intentionally differ from its mock content.
10. **Readiness:** The public national UI is clear enough to resume deeper-domain work after Product Management review. Bespoke source/destination illustration commissioning is no longer a dependency.

Detailed handoff: `docs/handoffs/2026-08-29-clean-national-ui.md`. Verification: 6 Vitest files / 111 tests passed; TypeScript passed; Vite production build passed; `git diff --check` passed. QA includes Every £100, £ billions, all five years, 2024–25 story/handover and 390×844 mobile. Implementation SHA: `39a86ef`.

## Direct year exploration + editorial asset reset — 2026-08-29

1. **Illustration code removed:** The rejected generated source/destination scene sheets, sprite coordinates and CSS background cropping have been removed. The central approved medallion/reference assets remain.
2. **New asset infrastructure:** `src/assets/editorial/manifest.ts` maps all stable source/destination IDs to fixed-box assets with `id`, `src`, `alt`, `category` and focal point. Four restrained abstract SVG placeholders can be replaced without layout changes.
3. **Year selection:** Five prominent fiscal-year stops update the whole Wall in place. Previous/next buttons and timeline-focus ArrowLeft/ArrowRight use the same state; playback remains visually secondary.
4. **Government periods:** Exact Cabinet Office-backed prime-minister periods remain on the common timeline. Selected-year context names the government(s), while policy events retain their own government ownership.
5. **Mixed period:** 2024–25 is `Conservative → Labour`, with the 5 July 2024 handover explicitly marked. Measurements keep their actual periods rather than inheriting a fiscal-year or party label.
6. **Spend change:** Each category shows selected nominal £bn and share, then nominal and percentage-point changes against both the previous accepted year and 2021–22. The first period uses a zero previous-period delta.
7. **Outcome polarity:** `higher-is-better`, `lower-is-better` and `neutral-context` are explicit data rules. Only directional-performance metrics can say `IMPROVED`/`DECLINED`; neutral net migration says only `UP`, `PEAKED`, `DOWN` or stable.
8. **Inherited trajectory:** The last suitable pre-handover measure sets the inherited direction. For July 2024, net migration was already below its revised peak; subsequent movement is separately labelled `AFTER` and never treated as causal performance.
9. **Immigration metrics:** Official long-term net migration is the supported metric: 944k YE March 2023, 649k YE June 2024, 345k YE December 2024 and provisional 204k YE June 2025, plus a clearly non-numeric rising context for the first period. Sparse material policy events retain evidence and relationship labels.
10. **Unresolved:** Bespoke commissioned editorial illustrations are not supplied; restrained swappable placeholders are used. No unsupported operational Immigration series was added. The fixed national view remains desktop-first.
11. **Screenshots:** `docs/qa/2026-08-29-year-2021-22-1440x900.png`, `docs/qa/2026-08-29-year-2022-23-1440x900.png`, `docs/qa/2026-08-29-year-2023-24-1440x900.png`, `docs/qa/2026-08-29-year-2024-25-1440x900.png`, and `docs/qa/2026-08-29-year-2025-26-1440x900.png`.
12. **Implementation SHA:** `b15320b` (`Rebuild direct year exploration`).

Specification: `docs/STORY_SYSTEM.md`. Detailed handoff: `docs/handoffs/2026-08-29-year-exploration-editorial-assets.md`.

Verification: 6 Vitest files / 110 tests passed; TypeScript passed; Vite production build passed; `git diff --check` passed; all five years were rendered and inspected at 1440×900. The 2024–25 capture explicitly shows the mixed government, handover date, actual outcome period, inherited direction and after-handover direction.

## How We Got Here — Immigration pilot — 2026-08-29

1. **Coverage:** April 2021 to June 2025, using finer event dates alongside the unchanged annual fiscal Wall.
2. **Government periods:** Boris Johnson, Liz Truss and Rishi Sunak (Conservative), then Keir Starmer (Labour) from 5 July 2024. Party is restrained context, never a score.
3. **Policy events:** Graduate route; care-route expansion; student-dependant restriction; care-worker-dependant restriction; Skilled Worker salary threshold; May 2025 white paper.
4. **Inherited trajectory:** the closest suitable pre-handover annual estimate was 649,000 (YE June 2024), below the revised peak: falling at handover.
5. **After handover:** provisional net migration fell further to 204,000 (YE June 2025). This describes chronology, not government performance attribution.
6. **Measures:** long-term net migration is primary. No questionable spend/capacity series or speculative social-impact measures were added.
7. **Supported contributors:** ONS/MAC identify work and study routes, dependants and emigration as contributors to the rise/fall. The route and policy dates themselves are documented policy.
8. **Chronology only:** the 649,000 handover point and subsequent movement are not treated as proof that one administration caused the direction.
9. **Conclusion:** the sharp increase began under the previous administration, peaked in 2023 and was already falling before the 2024 handover; the fall continued afterwards.
10. **Uncertainty:** recent ONS estimates are provisional/revised; rolling annual measures overlap governments; policy effects cannot be isolated from chronology alone.
11. **Political clarity:** yes—the handover boundary and inherited direction are explicit without dominant party colour or causal shortcuts.
12. **Ready for Health:** the schema, relationship controls, evidence routing, lag model and tests are reusable; visual grammar should be reviewed before a second topic is populated.

Implementation: `src/data/real/story.ts`, `src/components/HowWeGotHere.tsx`. Specifications: `docs/STORY_SYSTEM.md`, `docs/stories/IMMIGRATION.md`.

---

Date: 2026-09-01
Increment: How We Got Here — Health

- Added Health as the second shared story configuration; selector changes topic without changing fiscal year.
- Reused the frozen UK Health & social care cash/share series without altering the national Wall geometry or fiscal taxonomy.
- Added four official England March operational series: HCHS workforce FTE, completed RTT pathways, incomplete RTT pathways and percentage within 18 weeks.
- Preserved `Conservative → Labour` and the 5 July 2024 handover; policy events remain documented chronology rather than attribution.
- Added deterministic co-movement labels with an explicit non-causation caveat.
- Full data contract and limits: `docs/stories/HEALTH.md` and `docs/stories/HEALTH_SYSTEM_DATA.md`.

Verification: 6 Vitest files / 105 tests passed; TypeScript passed; production build passed; `git diff --check` passed. Final 1440×900 screenshot and immutable SHA are recorded in the dated handoff.

---

## Approved £100 national Wall rebuild — 2026-08-25

1. **Reference fidelity:** The canonical PNG at `docs/design/reference/approved-national-wall-reference.png` was opened at original resolution before code changed. The approved contract is preserved at `docs/design/REFERENCE_CONTRACT.md`; the 22-region audit is `docs/design/CURRENT_VS_REFERENCE.md`.
2. **Removed from public mode:** The dark 3200×1800 canvas, circular/blob masses, minimap, zoom chrome, floating controls, outcome horizon and network-like national composition no longer render on the main route. They remain intact at `/legacy-wall`.
3. **£1 units:** Each row calculates its unrounded share of the current total, renders one labelled £1 block per whole pound and clips a final block to the remaining fraction. Public values use whole pounds where honest and one decimal where needed.
4. **Flows:** Calm source and allocation curves converge on the medallion. Stroke widths are linearly proportional to national share with small visibility floors; borrowing and technical reconciliation use dashed treatments.
5. **Ordering:** Source and destination positions use the stable approved taxonomy order so the exhibit does not jump between periods. Values and flow widths still update from the selected-period adapters.
6. **Illustrations:** Two generated editorial scene sheets use the approved reference as their strict style source. Stable taxonomy coordinates crop six source scenes and fourteen destination scenes; borrowing is separated into a handwritten explanatory field.
7. **Borrowing:** It remains `TME − comparable current receipts`, is labelled as gap-filling rather than revenue, and uses violet tokens plus a dashed flow.
8. **Technical reconciliation:** `ACCOUNTING & STATISTICAL ADJUSTMENTS` remains in the exact £100 reconciliation but is grey/hatched/dashed and explicitly `NOT A SERVICE`.
9. **Three visual passes:** `docs/design/pass-1-1440x900.png`, `pass-2-1440x900.png`, and `pass-3-1440x900.png` record the correction sequence. Final QA also covers £ billions at 1440×900 and Every £100 at 1920×1080.
10. **Remaining differences:** The live exhibit uses the verified adapter taxonomy and values, including Debt and the technical reconciliation line. Illustration crops are generated companions rather than pixel-for-pixel copies of the reference artwork. The ribbons remain proportional SVG bands with dashed borrowing/technical treatments rather than traced bitmap shapes.

Implementation: `src/components/NationalWall.tsx`, `src/national.css`, route selection in `src/App.tsx`. Real data, evidence, reconciliation and historical adapters are unchanged.

Verification: 5 Vitest files / 98 tests passed; TypeScript passed; production build passed; `git diff --check` passed; three required browser screenshots were captured. Self-score: composition 9/10; typography 8/10; density 9/10; money blocks 9/10; medallion 9/10; illustrations 8/10; lower panel 9/10; overall five-second comprehension 9/10.

---

## Real public historical timeline — 2026-08-25

1. **Is it live?** It is implemented in the public real-data build and defaults to 2025–26; repository deployment follows the requested push.
2. **Periods:** 2021–22, 2022–23, 2023–24, 2024–25 and 2025–26 only.
3. **Visible earliest/latest change:** Yes. Territories, ribbons, Treasury total, values and rankings transform in place while positions and camera persist.
4. **Top allocation shifts:** Debt +£2.60, Economy −£1.79, Health −£1.57, technical +£1.37 and Central administration −£0.92 per £100.
5. **Funding side:** Income/social contributions +£2.43, Other receipts +£1.10, Businesses +£0.79, Property/capital −£0.33, Consumption −£1.98 and Borrowing −£2.00 per £100.
6. **Borrowing:** Still `TME − current receipts`, violet/dashed and debt rather than revenue; amount, share, ribbon and evidence update.
7. **Medium comparability:** A neutral selected-node indicator and evidence limitation explain Education, Debt, technical, and Economy in exceptional 2022–23.
8. **Technical reconciliation:** Grey/hatched/dashed, `RECONCILIATION · NOT A SERVICE`; annotations say `TECHNICAL RECONCILIATION CHANGE`.
9. **Real/illustrative boundary:** Demo attention/history is suppressed. National fiscal data and Health's PESA composition are real. The deeper England operational lens is real but does not reconcile to the UK allocation. The national outcome horizon and leaks remain static and explicitly illustrative.
10. **National clarity:** Primary cores have a tested >100-world-pixel boundary gap at 2025–26 national fit. Percentages remain visible in both units; all use the full TME-aligned pool. Far hints are capped at two and leak fixtures default off.
11. **Overview discipline:** Tier 1 now renders only the essential national poster. Ten lower-priority nodes, two outcomes, small ribbons, full leak labels, rank badges and secondary controls are deferred to zoom, selection or `Details`.
10. **Health context:** Five £100/£bn values plus direction explanation; share falls £1.57 while nominal cash rises £57.313bn.
11. **Remaining weakness:** Mobile secondary chrome scrolls horizontally; outcomes remain illustrative rather than official history.
12. **Next build:** A focused mobile/chrome usability pass, then evidence-led outcome history only if an authoritative, non-causal method is approved.

Primary specification: `docs/HISTORICAL_TIMELINE.md`.

---

## Historical taxonomy freeze — 2026-08-25

1. **Periods tested:** 2021–22, 2022–23, 2023–24, 2024–25 and 2025–26—the five outturn columns in PESA 2026 Table 5.2.
2. **Does every year reconcile?** Yes. Every period sums to published TME and unrounded output shares sum to £100. A disclosed +£0.001bn display-rounding adjustment is required in 2021–22 and 2023–24.
3. **HIGH comparability:** Health, Pensions, Welfare, Defence, Justice, Housing, Transport, Central administration, Environment and Culture in all periods; Economy except 2022–23.
4. **MEDIUM/LOW:** Education, Debt and technical reconciliation are MEDIUM throughout; Economy is MEDIUM in exceptional 2022–23. No output is LOW or not comparable.
5. **Taxonomy breaks:** None identified in this five-year window.
6. **Health consistency:** Yes. Health plus Personal social services is reconstructable in all years, with Personal social services removed from Welfare.
7. **Pensions/Welfare separation:** Yes. `Social protection − Pensions − Personal social services` works unchanged throughout.
8. **Technical volatility:** £86.998bn, £81.635bn, £115.873bn, £122.148bn and £132.308bn. It is positive throughout, economically heterogeneous and unsafe as a policy-performance trend.
9. **Money-in reconstruction:** Yes. Five fiscal years are built from monthly accrued ONS Appendix D values; borrowing is TME less current receipts and explicitly distinct from receipts.
10. **Safe to freeze?** Yes, for these periods with the recorded comparability and interpretation constraints.
11. **Largest allocation shifts:** Debt rises +£2.60 per £100; Economy falls −£1.79; Health falls −£1.57; technical rises +£1.37; Central administration falls −£0.92. These are nominal composition observations, not causal or real-terms claims.
12. **Ready for a real public timeline?** The data foundation is ready. Product Management can commission the interaction next, provided it preserves warnings, nominal/current-price labels and borrowing/receipt distinctions. No public UI changed in this increment.

Implementation: `src/data/real/historicalRaw.ts`, `historical.ts`, and `historical.test.ts`. Full method and tables: `docs/HISTORICAL_TAXONOMY.md`.

---

Date: 2026-08-25
Increment: Decompose the large expenditure residual
Implementation commit: `8f08666`

## Product Management answers

1. **What made up £211.554bn?** £45.036bn Economic affairs excluding Transport; £19.157bn Environment protection; £15.053bn Recreation, culture and religion; −£0.166bn EU transactions; £132.474bn accounting adjustments.
2. **New categories:** Economy, business & industry; Environment; Culture & recreation; Accounting & statistical adjustments.
3. **New true residual:** £0bn. Every former-residual component now has an explicit published-line mapping. The technical category remains visible rather than being disguised as policy spend.
4. **Per £100:** Economy £3.3; Environment £1.4; Culture £1.1; Accounting/statistical adjustments £9.7; unexplained residual £0.
5. **Direct vs derived:** Environment and Culture are direct PESA functions. Economy is Economic affairs less Transport. Technical is accounting adjustments net of EU transactions.
6. **Debt:** Debt interest & transactions remains £130.305bn under the authoritative PESA parent. Its central/local/public-corporation, Bank of England and public-pension components are documented; no fabricated “pure interest” number is shown.
7. **Reconciliation:** Yes. All destinations sum exactly to £1,360.122bn and their unrounded £100 shares sum to £100.
8. **Historical suitability:** Economy, Environment and Culture are HIGH; Accounting/statistical adjustments is MEDIUM. All use lines available across PESA Table 5.2 years, but technical composition and annual sub-function anomalies require notes.
9. **Awkward areas:** The accounting adjustment is economically large but not a citizen service. The small negative EU-transactions line must be netted into the technical category. The debt parent is broader than coupon interest.
10. **Recommended next increment:** freeze this taxonomy against the four earlier PESA outturn columns, explicitly testing mapping continuity before building the public historical interaction.

## Implementation

- Added an auditable residual bridge from each raw PESA line to its proposed mapping.
- Added unique official-line mapping tokens and duplicate-assignment tests.
- Removed the national `Other / residual` node.
- Added four authored secondary positions without changing the Wall grammar.
- Technical reconciliation has neutral grey, hatching and a dashed border; it is explicitly “not a service” and is not part of the leak layer.
- Source registry, evidence drawer and real/demo adapter boundary remain unchanged.

## Verification

- Vitest: 3 files, 29 tests passed before final build run.
- TypeScript: passed before final build run.
- Production build: passed.
- `git diff --check`: passed.
- Browser QA: the local server started successfully, but the in-app browser again blocked localhost inspection under its URL-security policy. No rendered screenshot is claimed; authored spacing is covered by DOM/adapter tests but remains pending visual confirmation.
# 2026-09-03 — Large story / outcome workspace

1. **Desktop height:** the former 205px strip is replaced by a scrolling second chapter. Its first working view is at least 980px and the complete evidence workspace expands with content rather than clipping it.
2. **Typography floor:** hero values 38px, hero labels 16px, year dates 25px, government labels 12px, and supporting detail/evidence controls 11–12px on desktop. Mobile retains the same 11px supporting floor and 36px hero values.
3. **Hero metrics:** Immigration shows net migration, asylum backlog and substantive initial decisions. Health shows health spend, NHS workforce, completed RTT pathways and waiting list. Housing shows housing spend, net additional dwellings, price-to-earnings affordability and temporary accommodation.
4. **Primary chart:** Immigration uses net migration; Health uses waiting list; Housing uses temporary accommodation. Health's within-18-weeks series remains a full supporting chart.
5. **Selected year:** one shared year state updates the Wall, every hero value, change comparison, highlighted year card, selected-year chart bands and the What Changed panel.
6. **Government control:** large year cards state the government; the shared band uses neutral grey distinctions and a visible 5 July 2024 handover marker.
7. **Policy events:** only existing curated events appear, aligned to one five-period grid; event buttons open the existing evidence drawer.
8. **Contradictions:** deterministic adapter signals are large editorial cards with the permanent warning, “Observed co-movement. Not evidence that one caused the other.”
9. **Readability:** desktop acceptance styles exceed the requested minimums at 100% zoom; screenshot QA checks the requested Health states plus Immigration and Housing at 1440×900.
10. **Removed UI:** the tiny dot year selector, playback controls, five-column miniature statistics table and compact summary sidebar were removed. There is one story presentation and no duplicate compact strip.

No data or topics were added. The existing Immigration, Health and Housing adapters and evidence records remain authoritative.
# What Changed in Britain — 2026-09-04

1. **Raw signals:** 45 are currently generated by the registered intelligence catalogue.
2. **Public findings:** 17 remain after public eligibility and deterministic grouping; the default briefing shows the top six.
3. **Top five:** Asylum backlog peaked, then began falling; Housing spending rose while home supply fell; NHS treatments completed increased while the NHS waiting list also grew; NHS workforce increased while 18-week NHS performance worsened; NHS workforce increased while the NHS waiting list worsened.
4. **Grouped signals:** seven same-topic, same-metric, same-period pairs: asylum-backlog peak/reversal-down; NHS-activity trough/reversal-up and peak/reversal-down; 18-week-performance trough/reversal-up; asylum-decisions trough/reversal-up and peak/reversal-down; NHS-waiting-list peak/reversal-down.
5. **Public wording:** controlled TypeScript templates translate engine types and registered metric labels; values are read from the registered series.
6. **AI wording:** NO. There are no model calls, embeddings, semantic search or generated prose.
7. **Wall focus:** a finding passes topic, period and metric IDs into lifted app state; the matching story/year opens, relevant cards and charts highlight, and keyboard focus moves to the story workspace.
8. **Shareability:** yes. `view=changed&finding=…` restores a finding; `story=…&period=…&metric=…` restores a focused Wall.
9. **Evidence:** yes. Every current public finding has one or more evidence IDs resolved through the existing Evidence Drawer.
10. **Government:** NO. Government does not enter signal calculation, public eligibility or ranking.
11. **Visual QA:** verified at 1440×900 and 390×844. The restrained navigation, editorial hierarchy, two-column desktop cards, readable selected detail, persistent Wall highlight and horizontally scrolling mobile topic control all held; the mobile page itself showed no visible horizontal clipping. Receipts are in `docs/qa/what-changed-*.png`.
12. **Ask Britain readiness:** yes as a deterministic substrate. Findings now expose stable topic, metric, period, evidence and focus primitives; question routing and generative interpretation remain deliberately out of scope.

# Metric semantic clarity pass — 2026-09-04

1. **Fixed ambiguities:** story hero values, selected-year changes, trend summaries, chart ARIA labels, intelligence comparisons and story evidence headings now carry shared public semantics.
2. **NHS waiting list:** `pathways`.
3. **Asylum backlog:** `people`.
4. **Temporary accommodation:** `households`.
5. **18-week performance:** `% of RTT pathways within 18 weeks`.
6. **Affordability:** `7.64× earnings`, defined as median house price divided by median earnings.
7. **Net migration:** values are labelled `net migration`, defined as long-term immigration minus long-term emigration; provisional wording remains in the period.
8. **Underlying numeric values changed:** NO.
9. **Official definitions changed:** NO.
10. **Rule documented and tested:** YES. “No naked numbers” is in the design system and explicit semantic audit tests cover key nouns and comparisons.
11. **What Changed:** YES. Both sides of each comparison carry their unit meaning and multi-metric findings name each metric.
12. **Remaining ambiguity:** policy-event evidence has no numeric metric by design. Fiscal Wall rows retain their existing explicit money/share grammar. The shared RTT evidence record covers both waiting-list volume and 18-week performance, so its default public evidence heading follows the waiting-list entry while the full definition retains both measures.
