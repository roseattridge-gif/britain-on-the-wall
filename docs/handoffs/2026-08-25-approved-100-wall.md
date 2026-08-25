# Approved £100 Wall — dated handoff

Date: 2026-08-25  
Scope: public national visual rebuild only

The main route now presents Britain's real 2025–26 fiscal snapshot as source bands, a central £100 medallion and ordered destination rows. It retains Every £100 / £ billions, five real historical stops, deterministic five-year changes, evidence access, borrowing methodology and technical reconciliation. The legacy spatial canvas is preserved at `/legacy-wall`.

## Epistemic boundary

- Fiscal source, destination and history values come from the existing frozen adapters.
- Outcomes remain illustrative and are visibly labelled as such.
- The approved reference image arrived after the first implementation commit and was used for a direct visual-fidelity refinement pass.
- Code-native SVG scene placeholders are used until final editorial illustration assets are available.

## Verification

- Vitest: 5 files, 98 tests passed.
- TypeScript project build: passed.
- Vite production build: passed; 1,824 modules transformed.
- `git diff --check`: passed.
- Browser console: no errors in the required desktop QA states.
- Screenshots: `2026-08-25-approved-wall-every100-1440x900.png`, `2026-08-25-approved-wall-billions-1440x900.png`, and `2026-08-25-approved-wall-every100-1920x1080.png`.
- Implementation commit: `362f538` (`Rebuild national Wall around every £100`).
