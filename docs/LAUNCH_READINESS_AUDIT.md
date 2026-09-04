# BOTW V1 launch-readiness audit — 2026-09-04

Initial audit was made at `b2f22ac`; this status was updated after implementation. `PASS` means verified in code and automated checks. `EXTERNAL GATE` means implementation is ready but the required participant evidence does not yet exist.

| Launch gate | Status | Current evidence | Required launch action |
| --- | --- | --- | --- |
| A. Main Wall obvious | PASS | Money in/out headings, current amount/share, cash percentage and share-point movement, explicit units | Retain current hierarchy and evidence links |
| Main Wall visual cleanup | PASS | Quiet default flows, proportional strips, top-category emphasis, subordinate reconciliation | Recheck in final visual QA |
| Money typography | PASS | Shared `MoneyDisplay` in header, pool, rows and story money cards | Recheck all new money cards |
| B. What Changed readability | PASS | Findings split before/after values, periods, delta, interpretation and evidence | Confirm in private test |
| C. National value/leakage | PASS | Four-card layer covers productivity, benefit fraud/error, tax gap and debt interest/transactions | Keep releases current |
| Contentious-metric evidence standard | PASS | Public cards and drawer expose definition, value/unit, period, geography, status, source and causal limits | Confirm participant comprehension |
| Equal evidence standard | PASS | Productivity, benefits, tax gap and debt interest use the same public boundary grammar | Preserve in future release updates |
| Claim → Evidence | PASS | Five curated claims resolve to evidence and Wall targets | Confirm wording in private test |
| D. Ask Britain v0.1 | PASS | Deterministic supported router, fallback suggestions, evidence and Wall focus | No generative answers |
| E. Immigration journey | PASS | Seven-step shareable journey preserves handover and attribution limits | Confirm comprehension |
| F. Health journey | PASS | Seven-step journey separates UK spend, England operations and aggregate productivity | Confirm comprehension |
| G. Evidence drawer final pass | PASS | Launch headlines resolve with value/unit, period, geography, source, status and limits | Preserve evidence ID coverage |
| H. Site copy | PASS | Claim and journey copy names units, distinguishes measurement scopes and avoids causal/partisan claims | Validate with participants |
| I. Top navigation | PASS | Exactly `BRITAIN`, `WHAT CHANGED`, `ASK BRITAIN` | Keep topic navigation internal |
| J. Mobile | PASS | 390×844 Ask/evidence check has zero overflow and no browser warnings/errors | Confirm on participant devices |
| K. Performance | PASS | Static typed data, no runtime fetching, no heavy new libraries or decorative imagery | Keep new launch data bundled and dependency-free |
| L. How BOTW works | PASS | Ten concise public trust/method principles in Ask Britain | Retain evidence detail in drawer |
| Launch data register | PASS | `LAUNCH_DATA_REGISTER.md` inventories headline values and boundaries | Update with releases |
| Private test package | PASS | `PRIVATE_TEST_PLAN.md` defines 10–15-user protocol | Execution remains external |
| Launch scorecard | EXTERNAL GATE | Pre-test technical scores recorded; comprehension/mobile trust unscored | Complete after private test; no dimension below 4 |
| Final QA receipts | PASS | Seven named receipts recorded in `docs/qa`; browser interaction and widths logged | Repeat after material UI changes |
| Test coverage | PASS | 196 tests cover Wall, stories, intelligence, launch routing, journeys and URL state | Preserve green suite |
| Real-data public default | PASS | `dataMode` uses the accepted real-data adapter; public story values resolve to official evidence | Preserve; no placeholder headline values |
| Launch boundary | PASS | No accounts, payments, generative chat, forecasts or broad domain expansion | Document as post-launch scope |
| Approved favicon | BLOCKED ASSET | Exact crowned-wall files were not present locally or in supplied attachments | Supply approved `favicon.ico`, `favicon-128.png` and `apple-touch-icon.png`; do not recreate |

## Audit conclusion

The bounded V1 feature set is implemented. Remaining gates are final browser/production receipts and the genuinely external 10–15-person private test. Justice, Education, accounts, payments, forecasts and generative chat remain post-launch scope.
