# Clean national UI rebuild

Date: 2026-08-29

The public national route has been simplified around the approved editorial composition. Decorative source/destination artwork and its swappable placeholder manifest were removed. Each category now uses a small consistent functional outline icon, while £1 blocks, typography, values and proportional ribbons carry the explanatory load.

Direct year selection remains primary. Period and unit now persist in the query string, and the lower Immigration exhibit separates government, policy timing, actual outcome period, neutral polarity, inherited direction and after-handover chronology.

QA artefacts:

- `docs/qa/2026-08-29-clean-national-every100-1440x900.png`
- `docs/qa/2026-08-29-clean-national-billions-1440x900.png`
- `docs/qa/2026-08-29-clean-year-2021-22-1440x900.png` through `clean-year-2025-26-1440x900.png`
- `docs/qa/2026-08-29-clean-national-mobile-390x844.png`

The single remaining premium picture is the approved Britain medallion. No new domain depth or unsupported outcome series was added.

Verification: 6 Vitest files / 111 tests, TypeScript, Vite production build and `git diff --check` all passed. Implementation SHA: `39a86ef`.
