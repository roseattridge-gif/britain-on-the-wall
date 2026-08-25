# Real public historical timeline

Date: 2026-08-25

## Periods and interaction

The real Wall exposes only the five accepted complete outturn snapshots: 2021–22, 2022–23, 2023–24, 2024–25 and 2025–26. It defaults to 2025–26, labelled `LATEST COMPLETE OUTTURN`. Users can click a labelled stop, use the keyboard-accessible range control, or play the five discrete stops once. Values never interpolate; only geometry transitions between published snapshots.

The selected period is encoded as `?period=2021-22`. Changing period keeps the same route, canvas, camera and selected territory. Mobile retains the discrete range interaction inside a horizontally scrollable control bar.

## Comparison basis

Normal changes compare the new snapshot with the previously selected snapshot. `5-YEAR CHANGE` uses 2021–22 as its base. A deterministic ranking selects the four largest absolute changes in pounds per £100 and calculates nominal £bn and rank change for every flow.

| Largest destination shifts | Change per £100 |
|---|---:|
| Debt interest & transactions | +£2.60 |
| Economy, business & industry | −£1.79 |
| Health & social care | −£1.57 |
| Accounting & statistical adjustments | +£1.37 |
| Central administration | −£0.92 |

The source-side endpoint changes are Income/social contributions +£2.43, Other receipts +£1.10, Businesses +£0.79, Property/capital −£0.33, Consumption −£1.98 and Borrowing −£2.00 per £100. These are composition observations, not causal claims.

## Animation rules

Territory diameter, ribbon width and value transition in place over roughly 750–800ms. Coordinates never move. Playback advances through the five discrete periods once and stops; pause is available. Under `prefers-reduced-motion`, CSS transitions/animations are removed and playback uses short discrete steps.

## Units and interpretation

`EVERY £100` is the hero view and uses each year's TME denominator. The inspector reports share and cash directions separately. Health is the tested example: from 2021–22 to 2025–26 its share falls £1.57 per £100 while its nominal amount rises £57.313bn.

`£ BILLIONS` shows nominal current-price values with `CURRENT PRICES · NOT INFLATION ADJUSTED`. Values display at no more than three decimals. No real-terms toggle exists.

## Comparability and technical treatment

Every flow carries comparability metadata. A selected MEDIUM flow receives a neutral indicator and evidence caveat. Economy in 2022–23 discloses exceptional-year composition; Education, Debt and technical reconciliation remain medium throughout.

Borrowing remains the violet/dashed balancing requirement `TME − current receipts`, labelled as debt rather than revenue. Accounting/statistical adjustments remain grey, hatched/dashed and `RECONCILIATION · NOT A SERVICE`. Change notes call them `TECHNICAL RECONCILIATION CHANGE`.

## Real versus illustrative boundary

Only national money-in, Treasury and money-out change historically. Demo attention/year stories are suppressed in real mode. Outcomes and leaks remain static and explicitly `ILLUSTRATIVE · STATIC`; their displayed values do not change with the real denominator. Health's official allocation changes while its deeper delivery/outcome chain stays illustrative.

## Visual QA

Verified in the in-app browser at 1440×900 and 390×844:

- earliest/latest Every £100 states visibly differ in territory and ribbon mass;
- Borrowing changes from £12 to £9.5 per £100 and retains dashed violet semantics;
- four computed earliest/latest annotations attach to relevant territories;
- Health remains selected across period change and shows all five values;
- Health explains share down / nominal amount up;
- £bn mode displays the warning and clean numeric precision;
- the mobile slider is immediately available and there is no body-level horizontal overflow.

## Known weakness

The mobile control bar scrolls horizontally to preserve timeline, playback, units and layers in one row. A future chrome pass could move secondary controls into an overflow menu. Outcomes remain illustrative rather than historically sourced, by design.
