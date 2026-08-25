# CODEX HANDOFF

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
