# V1 launch-candidate QA — 2026-09-04

## Automated

- Vitest: 13 files, 201 tests passed.
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

## Final private-test preparation pass

- Rechecked Britain, What Changed, value/leakage, Ask Britain, supported and unsupported answers, both guided journeys and the private-test entry at 1440×900, 1920×1080 and 390×844.
- Every checked route measured `document scrollWidth = innerWidth`; no page-level horizontal overflow was found.
- Clicked Sources and method, unit toggle, year selector, topic selector, What Changed finding/detail/Wall focus, Ask supported/unsupported/suggestion/evidence, and journey next/previous/evidence. All reached the intended state with no console warnings or errors.
- National Ask answers now return to `#value-leakage`; story answers return to their metric focus.
- Receipts: `private-test-1440x900.png`, `what-changed-1920x1080.png`, `health-journey-390x844.png`.
- Favicon network/recognisability QA could not be run: the three exact approved crowned-wall asset files were not present. No replacement was generated.

## Production readback

- GitHub Pages run `33881973795` completed successfully for `13cd576ca55a86aeb8ac7285500b98f7a8b142df`.
- `https://britainonthewall.co.uk/?test=1` returned HTTPS 200 and the deployed fingerprints `index-D9FQO05w.js` and `index-BWztVAj3.css`.
- After a production reload: navigation was exactly Britain / What Changed / Ask Britain; the private banner appeared only with `test=1`; all four value boundaries rendered; the tax-gap Wall action restored `#value-leakage`; the final Health step restored `MIXED`; 1440px had no overflow; the console was clean.
- The three approved favicon paths returned 404 because their exact asset files were not supplied: `/favicon.ico`, `/favicon-128.png`, `/apple-touch-icon.png`.
