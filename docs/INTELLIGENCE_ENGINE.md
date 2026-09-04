# BOTW intelligence engine

## Purpose

The intelligence engine turns trusted story metric series into deterministic, typed observations for future `What Changed?`, `Ask Britain`, story playback and Britain Brief change detection. It is domain logic, not UI copy. It makes no model calls and government or policy chronology is not an input to detection.

## Generic metric contract

`IntelligenceMetricSeries` retains topic, stable metric ID, definition, dimension, unit, polarity, geography and measurement basis. Every point retains the Wall `periodId` separately from its real `measurementPeriod` and date, plus value, status, comparability and evidence IDs. `unavailable` is distinct from zero.

The initial registry adapts the existing Immigration, Health and Housing story metrics plus the frozen Health and Housing fiscal-spend flows. It does not copy values into UI components.

## Signal types

Inflections are calculated from three consecutive eligible numeric points:

- `peak`: current is above both neighbours.
- `trough`: current is below both neighbours.
- `reversal-down`: positive movement is followed by negative movement.
- `reversal-up`: negative movement is followed by positive movement.
- `acceleration`: movement continues in the same direction and its absolute delta grows materially.
- `deceleration`: movement continues in the same direction and its absolute delta shrinks materially.

A peak/trough and its corresponding reversal are separate structured signals because future consumers may need either concept. The detector does not embed editorial headlines.

Contradictions are eligible only for explicitly registered metric pairs. Supported rules are spend up/outcome performance down, spend down/outcome performance up, capacity up/performance down, capacity down/performance up, output up/backlog up, output up/outcome performance down, supply up/affordability performance down, and spend up/output down.

## Materiality

Materiality is a deterministic 0–100 ranking score, not statistical significance:

```text
absolute delta = abs(to - from)
proportional component = min(100, absolute delta / max(abs(from), abs(to), epsilon) × 100)
scale denominator = max(series maximum - series minimum, 10% of the larger endpoint magnitude)
scale component = min(100, absolute delta / scale denominator × 100)
raw score = 0.6 × proportional component + 0.4 × scale component
score = raw score × 1.0 for HIGH confidence, or × 0.75 for MEDIUM confidence
```

Scores are rounded to two decimals. The 10% magnitude floor stops a tiny two-point range making its own tiny change look large. A movement must score at least `3` to participate. Peaks and reversals use the smaller adjacent-movement score. Acceleration/deceleration also requires the change between consecutive delta magnitudes to clear the threshold. Contradictions use the smaller score of the two metric movements. This combines proportional movement with the metric's observed scale, avoiding a single percentage-only rule. Polarity does not alter numeric magnitude; it alters interpretation.

## Polarity

For `higher-is-better`, an increase is interpreted as improved and a decrease as deteriorated. For `lower-is-better`, an increase is deteriorated and a decrease improved. `neutral-context` is direction-only and can never generate improved/declined/better/worse language. Money, workforce, activity and net migration remain neutral context in the initial registry.

## Comparability

- HIGH + HIGH is eligible with HIGH confidence.
- Any mixture of HIGH and MEDIUM is eligible with MEDIUM confidence.
- MEDIUM + MEDIUM is eligible with MEDIUM confidence and the point/relationship limitations remain available.
- Any LOW point, unavailable point or non-numeric value blocks that candidate signal.

The signal inherits evidence IDs from every point used. There is no evidence-free signal.

## Period alignment

The Wall column ID is an alignment key, not a rewritten measurement period. Signals expose each real measurement label. Relationship registrations document intentional alignment, including UK fiscal Health spend versus England March RTT measures, calendar-year asylum decisions versus a 31 December backlog stock, and England fiscal housing supply versus calendar-year affordability. The engine never silently labels these as the same period.

## Causality

Signals describe observed numerical relationships. They do not establish causation.

Every contradiction carries the default limitation: “Observed co-movement. Not evidence that one caused the other.” Inflections likewise say that series shape cannot explain a change or attribute it to a policy or government. Government periods and policy events do not affect detection, materiality or ranking.

## Initial domain relationships

| Topic | Registered relationship |
| --- | --- |
| Health | spend → waiting list; spend → 18-week performance; workforce → waiting list; workforce → 18-week performance; completed pathways → waiting list |
| Immigration | substantive initial-decision output → asylum backlog |
| Housing | spend → net additions; net additions → affordability; net additions → temporary accommodation |

No all-pairs comparison is performed. Net migration is registered as a neutral-context series for inflection analysis only. Missing 2025–26 Housing supply remains unavailable.

## Catalogue API and ordering

`getIntelligenceSignals({topicId, periodId?})` returns a topic catalogue, optionally filtered to one Wall period. `getTopIntelligenceSignals({topicId?, limit})` returns the highest-ranked signals across one topic or all topics. Ordering is materiality descending, confidence descending, recency descending, then stable signal ID for deterministic ties.

Each signal contains an observed statement, the deterministic reason it was flagged, evidence IDs and a limitation. These fields are suitable for a future explanation panel, but no public intelligence UI is part of this increment.
