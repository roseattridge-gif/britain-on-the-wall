# Data dictionary

National historical values are £bn, nominal current prices, UK public sector, fiscal years 2021–22 to 2025–26. Each period uses its own published TME denominator. Pounds per £100 equal `value / TME × 100`; display uses whole pounds at £10 or above and one decimal below £10. See `HISTORICAL_TAXONOMY.md` for the frozen transformations and matrix.

| ID | Direction | Definition / inclusion rule | Status |
|---|---|---|---|
| income | In | Income Tax + combined social contributions + Council Tax; not allocated between employees and employers | Mapped official |
| business | In | Corporation Tax + business rates; collection-point grouping | Mapped official |
| consumer | In | VAT + fuel + alcohol + tobacco duties | Mapped official |
| capital | In | SDLT + stamp taxes on shares; excludes CGT already inside Income Tax | Mapped official |
| other-income | In | Total current receipts less named streams | Derived residual |
| borrowing | In | TME less current receipts; debt funding, never ordinary revenue | Derived official |
| health | Out | Health + personal social services | Mapped official |
| pensions | Out | Pensions sub-line of old-age social protection | Mapped official |
| welfare | Out | Social protection less pensions and personal social services | Derived official |
| education | Out | Total Education | Official function |
| defence | Out | COFOG Defence, not NATO measure | Official function |
| justice | Out | Public order and safety | Official function |
| housing | Out | Housing and community amenities; housing benefits remain in welfare | Official function |
| transport | Out | Transport sub-function | Official sub-function |
| admin | Out | General public services less public debt transactions | Derived official |
| interest | Out | Public debt transactions, broader than coupon interest | Official function |
| economy | Out | £45.036bn; total Economic affairs less the separately mapped £48.923bn Transport sub-function. Includes enterprise/economic development, agriculture, energy, industry, communications and economic-affairs R&D. Stable parent function; annual sub-mix may vary. | Derived official |
| environment | Out | £19.157bn; total Environment protection. Direct COFOG function and historically reproducible. | Official function |
| culture | Out | £15.053bn; total Recreation, culture and religion, including broadcasting/publishing. Direct COFOG function and historically reproducible. | Official function |
| technical | Out | £132.308bn; £132.474bn PESA accounting adjustments net of −£0.166bn EU transactions. Reconciles expenditure on services to TME; not a service, policy priority, waste or leak. | Derived technical |
| local | Out | Not rendered: already allocated across functions | Unresolved / excluded |

Evidence fields include metric, definition, value, unit, period, geography, accounting basis, source organisation and dataset, URL, publication date, last checked, methodology, revision status, confidence and limitations.

No unexplained expenditure residual remains. Each output owns explicit mapping tokens, tested for uniqueness. The technical category is reconstructed from each year's published accounting-adjustment and EU-transaction lines. A separately recorded source-rounding adjustment of at most £0.001bn makes the displayed component rows agree exactly with displayed TME; it is not an unexplained residual or service allocation.

Historical comparability: `economy`, `environment`, and `culture` are **HIGH**; `technical` is **MEDIUM** because the published reconciliation lines are reproducible but their composition can change. No new category is rated LOW for the proposed PESA history.

## Real Health domain

All fiscal composition measures are UK public-sector, financial-year, nominal current-price £bn, official/high confidence, and sourced from PESA 2026 Table 5.2. `medical-services`, `personal-social-services`, `central-other-health`, and `medical-research` use direct published lines; higher/lower polarity is neutral because spend is not itself an outcome. Comparability is high on the frozen PESA 2026 basis, subject to published rounding.

| Measure | Kind | Definition / unit | Geography and period | Polarity | Status / confidence | Comparability and source |
|---|---|---|---|---|---|---|
| GP appointments booked | Output | Estimated booked appointments, million | England; rolling 12 months to March | Neutral | Official / high | 2024–25 pair high; DHSC ARA Performance Report |
| A&E attendances | Output | Annualised average monthly attendances, million | England; financial year | Neutral | Derived from official / medium | Rounded monthly average × 12; DHSC ARA |
| CDC tests | Output | Tests delivered, million | England; 2024–25 | Neutral | Official / high | Single-year only; DHSC ARA |
| Elective waiting list | Outcome | Incomplete RTT pathways, million | England; March snapshot | Lower is better | Official / high | Patient pathways, not people; DHSC ARA |
| Waiting no longer than 18 weeks | Outcome | Percent of incomplete RTT pathways | England; March snapshot | Higher is better | Official / high | Comparable 2024–2025; DHSC ARA |
| Diagnostic waits over six weeks | Outcome | Percent of DM01 waiting list | England; March snapshot | Lower is better | Official / high | DM01 covers 15 tests; DHSC ARA |
| A&E attendances over 12 hours | Outcome | Percent of attendances | England; financial year | Lower is better | Official / high | Annual measure; DHSC ARA |
| Positive GP practice experience | Context | Percent of survey respondents | England; survey year | Higher is better | Official / high | 2024–2025 comparable; pre-2024 methodology differs; DHSC ARA |
