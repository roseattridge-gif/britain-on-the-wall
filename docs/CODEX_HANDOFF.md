# CODEX HANDOFF

Date: 2026-08-24
Increment: Real national money-in / money-out backbone
Implementation commit: pending final verification

## Product Management answers

1. **Period:** 2025–26 fiscal-year outturn, nominal current prices.
2. **Why:** It is the latest complete period with HM Treasury functional spending outturn and ONS annual public-sector receipts.
3. **Pool:** £1,360.122bn Total Managed Expenditure = £1,230.299bn accrued current receipts + £129.823bn derived borrowing requirement.
4. **Sources:** ONS Public sector current receipts Appendix D; HM Treasury PESA 2026 Chapter 5 Table 5.2.
5. **Largest funding category:** Income & social contributions, £610.652bn / £44.9 per £100. The combined social-contributions line is not allocated between employees and employers.
6. **Top destinations:** Health & social care £313.677bn / £23.1; working-age welfare & income support £196.277bn / £14.4; Pensions £154.858bn / £11.4.
7. **Reconciliation:** Yes. Both money-in and money-out sum to £1,360.122bn in automated tests.
8. **Derived vs published:** Published raw lines feed all categories. Presentation groupings, Health/social-care combination, welfare remainder, administration, residual and borrowing are derived from them.
9. **Still illustrative:** Deep Health composition and operations, outcomes, attention markers, leaks and losses. They remain visibly labelled.
10. **Visual changes:** No coordinate redesign. Real values use the accepted square-root scale. The separate Local Government node was removed because it would double count functionally allocated spending; timeline controls became a single outturn label.
11. **Limitations:** accrued rather than cash receipts; cross-publication revisions; broad PESA debt-transactions aggregate; large transparent residual; distinct local-services mapping unresolved.
12. **Recommended next increment:** decompose and evidence the large Other/residual category without changing the national grammar, then consider a frozen comparable time series.

## Implementation

- `src/data/real/sourceRegistry.ts`: authoritative provenance.
- `src/data/real/raw.ts`: published source lines.
- `src/data/real/normalized.ts`: canonical fiscal flows and mappings.
- `src/data/real/adapter.ts`: renderer boundary and evidence records.
- Default `real` mode; `VITE_DATA_MODE=demo` preserves fixtures for development and regression.
- `docs/NATIONAL_FISCAL_DATA.md` and `docs/DATA_DICTIONARY.md` contain the PM-readable record.

## Verification

- Reconciliation and evidence tests: passed.
- Full Vitest suite: 3 files, 25 tests passed.
- TypeScript: passed.
- Production build: passed.
- Browser QA: local server started, but the in-app browser blocked localhost inspection under its URL-security policy; no replacement real-data screenshots were captured in this run.
- `git diff --check`: passed.
