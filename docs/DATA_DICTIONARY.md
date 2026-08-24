# Data dictionary

All national values are £bn, nominal current prices, UK public sector, fiscal year 2025–26. The denominator is TME (£1,360.122bn). Pounds per £100 equal `value / TME × 100`; display uses whole pounds at £10 or above and one decimal below £10.

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
| other | Out | TME less all mapped destinations; includes accounting adjustments | Derived residual |
| local | Out | Not rendered: already allocated across functions | Unresolved / excluded |

Evidence fields include metric, definition, value, unit, period, geography, accounting basis, source organisation and dataset, URL, publication date, last checked, methodology, revision status, confidence and limitations.
