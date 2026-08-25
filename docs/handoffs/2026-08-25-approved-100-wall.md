# Approved £100 Wall — dated handoff

Date: 2026-08-25  
Scope: public national visual rebuild only

The main route now presents Britain's real 2025–26 fiscal snapshot as source bands, a central £100 medallion and ordered destination rows. It retains Every £100 / £ billions, five real historical stops, deterministic five-year changes, evidence access, borrowing methodology and technical reconciliation. The legacy spatial canvas is preserved at `/legacy-wall`.

## Epistemic boundary

- Fiscal source, destination and history values come from the existing frozen adapters.
- Outcomes remain illustrative and are visibly labelled as such.
- The canonical approved PNG and reproduction contract were read before this correction pass. The rejected screen and 22-region comparison are preserved under `docs/design/`.
- The placeholder-only pass was rejected. Two production scene sheets were then generated with the built-in image-generation workflow using the approved screenshot as the strict style reference: `public/illustrations/fiscal-sources-v1.png` and `public/illustrations/fiscal-destinations-v1.png`. CSS crops the six source and fourteen destination scenes by stable taxonomy ID.

## Verification

- Vitest: 5 files, 98 tests passed.
- TypeScript project build: passed.
- Vite production build: passed; 1,824 modules transformed.
- `git diff --check`: passed.
- Visual passes: `docs/design/pass-1-1440x900.png`, `pass-2-1440x900.png`, and `pass-3-1440x900.png`.
- Screenshots: `2026-08-25-approved-wall-every100-1440x900.png`, `2026-08-25-approved-wall-billions-1440x900.png`, and `2026-08-25-approved-wall-every100-1920x1080.png`.
- Self-score: composition 9; typography 8; density 9; money blocks 9; medallion 9; illustrations 8; lower panel 9; five-second comprehension 9.
- Known variance: real adapter values/taxonomy replace the reference examples; generated scene companions are not literal copies; proportional SVG bands are not bitmap traces.
- Implementation commit: recorded after the final commit.
