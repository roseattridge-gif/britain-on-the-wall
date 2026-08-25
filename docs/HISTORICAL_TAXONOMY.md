# Historical fiscal taxonomy backtest

Date frozen: 2026-08-25  
Coverage: 2021–22 to 2025–26 outturn, nominal current prices, UK public sector

## Decision

The 14-destination national expenditure taxonomy is reproducible across all five outturn columns in PESA 2026 Table 5.2. No category is created, removed or redefined between years, no unexplained residual remains, and each year reconciles exactly to published Total Managed Expenditure (TME). This is a data-layer freeze only: it does not authorise a public timeline or change the Wall.

## Frozen transformations

| Destination | Published basis |
|---|---|
| Health & social care | Health + Personal social services |
| Pensions | Pensions sub-line of Social protection |
| Working-age welfare & income support | Social protection − Pensions − Personal social services |
| Education & skills | Education |
| Defence & security | Defence |
| Crime & justice | Public order and safety |
| Housing & communities | Housing and community amenities |
| Transport & infrastructure | Transport |
| Central administration | General public services − Public debt transactions |
| Debt interest & transactions | Public debt transactions |
| Economy, business & industry | Economic affairs − Transport |
| Environment | Environment protection |
| Culture & recreation | Recreation, culture and religion |
| Accounting & statistical adjustments | Accounting adjustments + EU transactions + disclosed source-rounding adjustment |

The technical destination is a reconciliation category, not a service, policy outcome, inefficiency or leak. The £100 share is always `category / that year's TME × 100` using unrounded values.

## Comparability matrix

H = high, M = medium. No series is low or not comparable within this window.

| Destination | 2021–22 | 2022–23 | 2023–24 | 2024–25 | 2025–26 | Reason for caution |
|---|---:|---:|---:|---:|---:|---|
| Health & social care | H | H | H | H | H | Stable parent and sub-line |
| Pensions | H | H | H | H | H | Stable published sub-line |
| Working-age welfare | H | H | H | H | H | Stable derivation; exceptional support changes composition, not definition |
| Education & skills | M | M | M | M | M | Academies recorded within secondary education; parent remains stable |
| Defence & security | H | H | H | H | H | Stable COFOG function |
| Crime & justice | H | H | H | H | H | Stable COFOG function |
| Housing & communities | H | H | H | H | H | Stable COFOG function |
| Transport & infrastructure | H | H | H | H | H | Stable sub-function |
| Central administration | H | H | H | H | H | Stable subtraction from one parent |
| Debt interest & transactions | M | M | M | M | M | Parent includes Bank of England and pension transactions |
| Economy, business & industry | H | M | H | H | H | 2022–23 energy interventions make the mix exceptional |
| Environment | H | H | H | H | H | Stable COFOG function |
| Culture & recreation | H | H | H | H | H | Stable COFOG function |
| Accounting & statistical adjustments | M | M | M | M | M | Reproducible but economically heterogeneous |

## Reconciliation audit (£bn)

| Period | Published TME | Reconstructed | Source rounding adjustment | Difference |
|---|---:|---:|---:|---:|
| 2021–22 | 1,040.888 | 1,040.888 | +0.001 | 0.000 |
| 2022–23 | 1,160.692 | 1,160.692 | 0.000 | 0.000 |
| 2023–24 | 1,230.807 | 1,230.807 | +0.001 | 0.000 |
| 2024–25 | 1,290.012 | 1,290.012 | 0.000 | 0.000 |
| 2025–26 | 1,360.122 | 1,360.122 | 0.000 | 0.000 |

PESA displays component rows to £0.001bn. In 2021–22 and 2023–24 those displayed rows sum £0.001bn below displayed TME. The model records that immaterial published-table rounding explicitly in the technical destination; it does not silently alter a service category.

## Composition per £100

| Destination | 2021–22 | 2022–23 | 2023–24 | 2024–25 | 2025–26 | Change |
|---|---:|---:|---:|---:|---:|---:|
| Health & social care | £24.63 | £22.13 | £22.11 | £22.98 | £23.06 | −£1.57 |
| Pensions | £11.13 | £10.67 | £11.42 | £11.35 | £11.39 | +£0.26 |
| Working-age welfare | £13.87 | £13.29 | £14.18 | £14.40 | £14.43 | +£0.56 |
| Education & skills | £9.62 | £9.25 | £9.28 | £9.53 | £9.24 | −£0.38 |
| Defence & security | £4.68 | £4.79 | £4.61 | £4.94 | £4.81 | +£0.13 |
| Crime & justice | £3.82 | £3.81 | £3.96 | £4.01 | £4.10 | +£0.28 |
| Housing & communities | £1.47 | £1.50 | £1.70 | £1.68 | £1.65 | +£0.18 |
| Transport & infrastructure | £4.29 | £3.89 | £3.92 | £3.67 | £3.60 | −£0.69 |
| Central administration | £3.51 | £3.09 | £2.97 | £2.62 | £2.59 | −£0.92 |
| Debt interest & transactions | £6.98 | £11.23 | £10.34 | £9.81 | £9.58 | +£2.60 |
| Economy, business & industry | £5.10 | £6.84 | £3.75 | £3.15 | £3.31 | −£1.79 |
| Environment | £1.32 | £1.24 | £1.30 | £1.34 | £1.41 | +£0.08 |
| Culture & recreation | £1.23 | £1.25 | £1.05 | £1.06 | £1.11 | −£0.12 |
| Accounting & statistical adjustments | £8.36 | £7.03 | £9.41 | £9.47 | £9.73 | +£1.37 |

These are compositional movements in nominal spending, not claims about service quality, efficiency or real resources. Debt rises most over the window. Economy's 2022–23 peak is exceptional; its endpoint change must not be narrated as a simple policy withdrawal. Health grows in cash terms while its share of a growing TME pool falls.

## Money-in history

A matching input history is feasible and implemented. Each fiscal year sums monthly accrued values in the same ONS Public sector current receipts Appendix D release (August 2026). Named streams use the frozen taxonomy; `Other receipts` is total current receipts less named streams; `Borrowing` is `TME − current receipts`.

Borrowing is a balancing funding requirement for the Wall, not an imported standalone PSNB series. Income Tax, combined social contributions and Council Tax remain grouped; the source does not support the public employee/employer split used in the earlier illustration. Income and borrowing are medium-comparability series; other named receipt groups are high.

## Debt and technical volatility

Debt interest & transactions is £72.703bn, £130.374bn, £127.255bn, £126.492bn and £130.305bn respectively. Its PESA parent includes central, local and public-corporation debt interest, Bank of England transactions, and a public-service pension transaction. Those components can move differently, so the broader label must remain.

The technical category is £86.998bn, £81.635bn, £115.873bn, £122.148bn and £132.308bn after source-rounding reconciliation. EU transactions are negative in every year except 2023–24; accounting adjustments are positive throughout. This category must not be used as a performance trend.

| Period | Accounting adjustments | EU transactions | Rounding | Net technical | Sign |
|---|---:|---:|---:|---:|---|
| 2021–22 | £88.943bn | −£1.946bn | +£0.001bn | £86.998bn | Positive |
| 2022–23 | £83.690bn | −£2.055bn | £0bn | £81.635bn | Positive |
| 2023–24 | £115.830bn | +£0.042bn | +£0.001bn | £115.873bn | Positive |
| 2024–25 | £123.560bn | −£1.412bn | £0bn | £122.148bn | Positive |
| 2025–26 | £132.474bn | −£0.166bn | £0bn | £132.308bn | Positive |

## Taxonomy decisions

- Freeze all 14 output mappings and six public input groups for these five periods.
- Keep `Debt interest & transactions` and `Accounting & statistical adjustments` broad and visibly qualified.
- Preserve observed interventions rather than smoothing or reassigning them.
- Carry comparability and explanatory metadata into any future timeline.
- Keep the public timeline disconnected until a separate interaction increment is approved.

## Categories not safe for simple comparison

No category is formally `not-comparable`, but three require constrained language: the technical category is not policy performance; debt is not pure coupon interest; and 2022–23 Economy contains exceptional energy intervention effects. Absolute £bn changes are not real-terms changes. Education remains medium because of its academy sub-classification even though the parent mapping is stable.

## Real-terms assessment

Do not implement real-terms controls in this increment. A later analytical layer can use HM Treasury's financial-year GDP deflator series (ONS code L8GG), which has outturn through 2025–26. HMT public-spending guidance uses the GDP deflator for real-terms comparisons and notes that expenditure-on-services functions are more stable historically than departmental structures. Any future implementation must freeze the deflator vintage and base year, preserve nominal values, label revisions, and keep composition-per-£100 distinct from real-terms cash comparisons.

## Sources and limits

- HM Treasury, *Public Expenditure Statistical Analyses 2026*, Chapter 5 Table 5.2, latest comparable-basis outturn columns.
- ONS, *Public sector current receipts: Appendix D*, August 2026, monthly accrued series aggregated April–March.
- All figures are nominal current prices and may be revised in later releases.
- Deep Health delivery and outcome data remain illustrative and outside this freeze.
