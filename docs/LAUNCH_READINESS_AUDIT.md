# BOTW V1 launch-readiness audit — 2026-09-04

Audited at repository state `b2f22ac`. `PASS` means the current public implementation already meets the launch gate; `NEEDS WORK` means a bounded launch increment exists; `FAIL` means the required public capability is absent.

| Launch gate | Status | Current evidence | Required launch action |
| --- | --- | --- | --- |
| A. Main Wall obvious | PASS | Money in/out headings, current amount/share, cash percentage and share-point movement, explicit units | Retain current hierarchy and evidence links |
| Main Wall visual cleanup | PASS | Quiet default flows, proportional strips, top-category emphasis, subordinate reconciliation | Recheck in final visual QA |
| Money typography | PASS | Shared `MoneyDisplay` in header, pool, rows and story money cards | Recheck all new money cards |
| B. What Changed readability | NEEDS WORK | Evidence-backed findings exist, but comparisons remain dense inline strings | Split before/after, periods, delta, interpretation and evidence into spaced blocks |
| C. National value/leakage | FAIL | Debt-interest fiscal row exists; productivity, benefit fraud/error and tax gap launch layer do not | Research current official ONS/DWP/HMRC releases and add four-card layer |
| Contentious-metric evidence standard | NEEDS WORK | Existing drawer has source, definition, status and limitations | Add relevant values/status for new metrics and clearer “does not measure/cannot prove” structure |
| Equal evidence standard | NEEDS WORK | Health, migration and housing use consistent evidence grammar | Apply identical grammar to productivity, benefits, tax gap and debt interest |
| Claim → Evidence | FAIL | No curated claim component | Add at most five deterministic, evidence-resolved claims |
| D. Ask Britain v0.1 | FAIL | No question interface or supported-intent router | Add deterministic supported routing, fallback suggestions, evidence and Wall focus |
| E. Immigration journey | FAIL | Underlying chronology and handover evidence exist | Add stepped, shareable guided journey using existing data |
| F. Health journey | FAIL | Underlying spend/workforce/activity/outcome story exists | Add stepped, shareable guided journey and include productivity context only after official ingestion |
| G. Evidence drawer final pass | NEEDS WORK | Public label/unit, source, definition, status and limits exist | Ensure every launch headline resolves with relevant value, period and geography |
| H. Site copy | NEEDS WORK | Non-causal and scope language is strong | Audit new and existing public copy for jargon, abbreviations and partisan implication |
| I. Top navigation | NEEDS WORK | `BRITAIN` and `WHAT CHANGED` only | Add only `ASK BRITAIN`; keep topic navigation internal |
| J. Mobile | NEEDS WORK | Current Wall, stories and What Changed pass 390px checks | Verify leakage, Ask Britain, journeys and drawer at 390×844 |
| K. Performance | PASS | Static typed data, no runtime fetching, no heavy new libraries or decorative imagery | Keep new launch data bundled and dependency-free |
| L. How BOTW works | FAIL | Method is distributed across help, evidence and documentation | Add a concise public trust/method section |
| Launch data register | FAIL | Source registries and story documents exist separately | Create one launch headline inventory |
| Private test package | FAIL | No launch-specific private test plan | Create 10–15-user plan and questions |
| Launch scorecard | FAIL | No scored launch threshold | Create 1–5 scorecard; require no critical score below 4 after private test |
| Final QA receipts | FAIL | Strong increment-level QA exists | Capture all seven named launch screenshots after implementation |
| Test coverage | NEEDS WORK | 179 tests cover Wall, stories, intelligence and semantic labels | Add launch feature, evidence, neutrality, mobile-structure and URL-state tests |
| Real-data public default | PASS | `dataMode` uses the accepted real-data adapter; public story values resolve to official evidence | Preserve; no placeholder headline values |
| Launch boundary | PASS | No accounts, payments, generative chat, forecasts or broad domain expansion | Document as post-launch scope |

## Audit conclusion

The existing fiscal Wall and three evidence-led story workspaces are a credible foundation, but the repository is not yet V1 launch-complete. The bounded launch programme is: restructure What Changed; add four official national value/leakage measures; add deterministic claims and Ask Britain; add two stepped journeys; finish evidence/trust documentation; then complete private-test and visual/deployment gates. Justice and Education remain post-launch candidates.
