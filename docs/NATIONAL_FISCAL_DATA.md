# National fiscal data

## Selected period

2025–26 UK fiscal-year outturn, nominal current prices. This is the latest completed period for which HM Treasury published an accredited functional spending outturn and ONS published matching annual public-sector receipts. PESA 2026 was published 16 July 2026; the receipts workbook was last checked 24 August 2026.

## National funding pool definition

The denominator is HM Treasury Total Managed Expenditure (TME), £1,360.122bn. The money-in side is ONS accrued public-sector current receipts, £1,230.299bn, plus £129.823bn borrowing derived as the balancing requirement. Borrowing is not revenue. The derived balance is used so the visual's funding and spending sides reconcile exactly despite different official revision cycles.

## Money in

| Wall category | £bn | Share / £100 | Official lines |
|---|---:|---:|---|
| Income & social contributions | 610.652 | £44.9 | Income Tax; combined social contributions; Council Tax |
| Businesses | 133.516 | £9.8 | Corporation Tax; business rates |
| Consumption | 255.285 | £18.8 | VAT; fuel, alcohol and tobacco duties |
| Property & capital | 21.362 | £1.6 | Stamp Duty Land Tax; stamp taxes on shares |
| Other receipts | 209.484 | £15.4 | Remaining tax and non-tax current receipts |
| Borrowing | 129.823 | £9.5 | Derived balancing requirement |
| **Pool** | **1,360.122** | **£100** | |

These are receipt-stream/collection-point groupings, not claims about ultimate economic tax incidence. The ONS combined social-contributions line is not split between employees and employers. Capital Gains Tax remains in the published Income Tax line to prevent double counting.

## Money out

| Wall category | £bn | Share / £100 | Official mapping |
|---|---:|---:|---|
| Health & social care | 313.677 | £23.1 | Health + personal social services |
| Pensions | 154.858 | £11.4 | Pensions within old-age social protection |
| Working-age welfare & income support | 196.277 | £14.4 | Social protection less pensions and personal social services |
| Education & skills | 125.721 | £9.2 | Education |
| Defence & security | 65.418 | £4.8 | COFOG Defence |
| Crime & justice | 55.720 | £4.1 | Public order and safety |
| Housing & communities | 22.470 | £1.7 | Housing and community amenities |
| Transport & infrastructure | 48.923 | £3.6 | Transport sub-function |
| Central administration | 35.199 | £2.6 | General public services less public debt transactions |
| Debt interest & transactions | 130.305 | £9.6 | Public debt transactions |
| Other / residual | 211.554 | £15.6 | Remaining functions, EU transactions and accounting adjustments |
| **TME** | **1,360.122** | **£100** | |

## Reconciliation

Money in: £1,230.299bn receipts + £129.823bn borrowing = £1,360.122bn. Money out: mapped destinations + explicit £211.554bn residual = £1,360.122bn. Code tests use sub-penny numerical tolerance before display rounding; independently rounded labels are not expected to add visually to exactly £100.

## Mapping methodology

Raw published lines are held in `src/data/real/raw.ts`; canonical flows and mappings in `normalized.ts`; the renderer consumes only `adapter.ts`. Local-government expenditure is not a separate destination because PESA already allocates central and local spending to functions. Health and social care combines Health with personal social services, which is removed from welfare. The debt label says “interest & transactions” because PESA's published aggregate includes Bank of England and other public-debt transactions.

## Known limitations and unresolved categories

- ONS receipts are accrued, not cash collected in the period.
- Official series are revised on different schedules; the £129.823bn visual balance is derived and differs from the latest standalone ONS PSNB estimate.
- “Other / residual” is large because it transparently retains PESA accounting adjustments and unmapped functions.
- Local services are unresolved as a distinct non-overlapping destination and therefore not rendered.
- Deep Health composition, outcomes, attention markers and leaks remain illustrative and are labelled as such.

## Revision policy

The registry records publication version, status and last-check date. On update, retain the previous code commit, replace raw values only from a new authoritative release, rerun reconciliation/evidence tests, update this document and capture new QA screenshots. No heavy data-version infrastructure is introduced yet.

## Primary sources

- [ONS Public sector current receipts: Appendix D](https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/datasets/appendixdpublicsectorcurrentreceipts/current)
- [HM Treasury Public Expenditure Statistical Analyses 2026](https://www.gov.uk/government/statistics/public-expenditure-statistical-analyses-2026), Chapter 5 Table 5.2
