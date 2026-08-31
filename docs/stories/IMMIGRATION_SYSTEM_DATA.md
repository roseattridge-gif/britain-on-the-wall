# Immigration system-performance data

Checked: 31 August 2026. Headline series use the Home Office Immigration System Statistics datasets published 27 August 2026. The selected fiscal year is only an interface state: every operational value retains its actual calendar period.

## Live metrics

| Metric | Definition | Unit | Geography | Frequency | Live dates | Source | Comparability | Polarity |
|---|---|---|---|---|---|---|---|---|
| Asylum backlog | People (main applicants plus dependants) awaiting an initial asylum decision at the date shown | People | UK | Quarterly stock | 31 Dec 2021–31 Dec 2025 | Home Office Asy_D03 | High, with disclosed system caveat | Lower is better |
| Substantive initial decisions | People (main applicants plus dependants) receiving a grant of protection, grant of other leave or refusal in the calendar year; withdrawals and administrative outcomes excluded | People | UK | Quarterly flow, summed to calendar year | 2021–2025 | Home Office Asy_D02 | High | Higher is better as processing-output context, not decision quality |

### Historical points

| Explorer year | Backlog snapshot | People awaiting | Output period | Substantive initial decisions |
|---|---:|---:|---|---:|
| 2021–22 | 31 Dec 2021 | 100,564 | Calendar 2021 | 17,866 |
| 2022–23 | 31 Dec 2022 | 160,919 | Calendar 2022 | 22,790 |
| 2023–24 | 31 Dec 2023 | 128,786 | Calendar 2023 | 91,556 |
| 2024–25 | 31 Dec 2024 | 124,802 | Calendar 2024 | 86,641 |
| 2025–26 | 31 Dec 2025 | 64,426 | Calendar 2025 | 135,740 |

Values were derived by summing the latest official detailed datasets without changing definitions. For backlog, both applicant types are summed only where `Application stage = Pending initial decision`. For output, both applicant types are summed for `Grant of Protection`, `Grant of Other Leave`, and `Refused`; withdrawals and administrative decisions are excluded.

## Method changes and limits

- Asy_D03 is a point-in-time stock, not the number passing through the system during a year.
- Up to December 2022, pending records include claims lodged since 1 April 2006. From March 2023, a new caseworking system includes claims lodged since 5 March 2007. This boundary change is immaterial to almost all contemporary claims but is disclosed.
- Home Office warns that some dependants in the 12-month-plus band may remain open incorrectly. The same published definition is nevertheless used throughout.
- Asy_D02 records the date of decision, which may be long after the claim date. More decisions do not by themselves prove faster processing or better decision quality.
- Calendar-year output and December backlog are adjacent contextual measures, not a causal decomposition. Backlog also changes with incoming claims, withdrawals, administrative outcomes and data revisions.

## Handover interpretation

The June 2023 backlog peak (134,046 cases; 175,457 people in the published series) preceded the 5 July 2024 handover. By 30 June 2024 the stock was lower, so the backlog was already falling at handover. Calendar-2023 substantive output had risen markedly before handover. After handover, the published backlog continued to fall and calendar-2025 substantive output rose. These are descriptive sequences, not attribution to either government.

## Investigated but not live

- **Processing time:** not used. Available duration bands and timeliness indicators do not provide one stable, like-for-like average or median across all five periods.
- **Hotels/accommodation:** not used as a headline. A comparable official support series exists, but Home Office revised accommodation categories during the transition to new reporting systems and hotel dependence is not identical to caseworking performance.
- **Returns/removals:** not used. Enforced and voluntary return categories have distinct meanings, and a higher count is not inherently an operational-quality outcome without a declared objective.

## Sources

- Home Office, [Immigration system statistics data tables](https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables), Asy_D02 and Asy_D03.
- Home Office, [How many cases are in the UK asylum system?](https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-june-2025/how-many-cases-are-in-the-uk-asylum-system).
- Home Office, [How many people are granted asylum in the UK?](https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-june-2025/how-many-people-are-granted-asylum-in-the-uk).

