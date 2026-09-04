# V1 launch-candidate QA — 2026-09-04

## Automated

- Vitest: 13 files, 196 tests passed.
- TypeScript project check: passed.
- Vite production build: passed.
- `git diff --check`: passed.

## Browser

- National Wall, What Changed, value/leakage, Ask Britain, Immigration journey and Health journey rendered without horizontal document overflow at the desktop QA viewport.
- Ask Britain answered the supported benefit fraud/error question, opened the matching evidence record and preserved the question in the URL.
- Unsupported routing, evidence resolution, journey progress and Wall-focus URLs are covered by automated interaction tests.
- At 390×844, Ask Britain measured `innerWidth = document scrollWidth = body scrollWidth = 390`; the evidence interaction emitted no browser warnings or errors.
- Final receipt filenames: `launch-national.png`, `launch-what-changed.png`, `launch-value-leakage.png`, `launch-ask.png`, `launch-immigration-journey.png`, `launch-health-journey.png`, `launch-mobile-390x844.png`.

This evidence establishes technical launch-candidate readiness. It does not substitute for the private comprehension/trust test.
