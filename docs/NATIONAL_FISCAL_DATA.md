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
| Economy, business & industry | 45.036 | £3.3 | Economic affairs excluding Transport |
| Environment | 19.157 | £1.4 | Environment protection |
| Culture & recreation | 15.053 | £1.1 | Recreation, culture and religion |
| Accounting & statistical adjustments | 132.308 | £9.7 | PESA accounting adjustments net of EU transactions |
| **TME** | **1,360.122** | **£100** | |

## Residual decomposition

The previous £211.554bn “Other / residual” was not unexplained. It combined three public functions with technical reconciliation. The public functions are now first-class, reproducible Wall destinations. The remaining £132.308bn is explicitly a non-service accounting/statistical category. The genuinely unexplained residual is therefore £0bn, not because values were forced into policy categories, but because every component maps exactly to a published PESA line.

## Residual decomposition bridge

| Bridge | £bn |
|---|---:|
| Previous Other / residual | 211.554 |
| less Economy, business & industry | −45.036 |
| less Environment | −19.157 |
| less Culture & recreation | −15.053 |
| **Remaining accounting/statistical category** | **132.308** |

The £132.308bn comprises £132.474bn PESA accounting adjustments and −£0.166bn EU transactions. The negative EU line is netted here because it is a transaction rather than a service destination and cannot form a meaningful positive proportional territory.

## Reconciliation

Money in: £1,230.299bn receipts + £129.823bn borrowing = £1,360.122bn. Money out: service/policy destinations + £132.308bn accounting/statistical reconciliation = £1,360.122bn. The unexplained residual is £0bn. Code tests use sub-penny numerical tolerance before display rounding; independently rounded labels are not expected to add visually to exactly £100.

## Historical compatibility assessment

| New category | Rating | Reason |
|---|---|---|
| Economy, business & industry | **HIGH** | Reconstructable as total Economic affairs less Transport in each PESA Table 5.2 year; the internal policy mix can vary. |
| Environment | **HIGH** | Direct, stable COFOG Environment protection function. |
| Culture & recreation | **HIGH** | Direct, stable Recreation, culture and religion function. |
| Accounting & statistical adjustments | **MEDIUM** | Published every year and reproducible, but the contents and sign of technical/EU items can change and require year-specific notes. |

## Mapping methodology

Raw published lines are held in `src/data/real/raw.ts`; the auditable old-residual bridge is in `residualBridge.ts`; canonical flows and mappings are in `normalized.ts`; the renderer consumes only `adapter.ts`. Local-government expenditure is not a separate destination because PESA already allocates central and local spending to functions. Health and social care combines Health with personal social services, which is removed from welfare.

Debt interest & transactions remains combined at £130.305bn. PESA Table 5.2 provides components—central government debt interest £96.946bn, local government £1.132bn, public corporations £0.502bn, Bank of England £12.344bn and public-sector pensions £19.381bn—but the published parent is “public debt transactions”. Splitting some components into a purported pure service destination would be less stable and could misdescribe the accounting basis, so the Wall retains the authoritative parent and explains its composition in evidence.

## Known limitations and unresolved categories

- ONS receipts are accrued, not cash collected in the period.
- Official series are revised on different schedules; the £129.823bn visual balance is derived and differs from the latest standalone ONS PSNB estimate.
- Accounting/statistical adjustments are large and are not comparable to a service priority; the Wall renders them with a muted hatched treatment.
- Economy excluding Transport is reproducible across the five PESA years, but its sub-functional mix can be affected by one-year policy interventions.
- Local services are unresolved as a distinct non-overlapping destination and therefore not rendered.
- Deep Health composition, outcomes, attention markers and leaks remain illustrative and are labelled as such.

## Revision policy

The registry records publication version, status and last-check date. On update, retain the previous code commit, replace raw values only from a new authoritative release, rerun reconciliation/evidence tests, update this document and capture new QA screenshots. No heavy data-version infrastructure is introduced yet.

## Primary sources

- [ONS Public sector current receipts: Appendix D](https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/datasets/appendixdpublicsectorcurrentreceipts/current)
- [HM Treasury Public Expenditure Statistical Analyses 2026](https://www.gov.uk/government/statistics/public-expenditure-statistical-analyses-2026), Chapter 5 Table 5.2
