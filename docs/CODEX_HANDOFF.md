# CODEX HANDOFF

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
