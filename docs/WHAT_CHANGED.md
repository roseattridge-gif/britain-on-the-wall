# What Changed in Britain

## Purpose

What Changed is the first public consumer of the BOTW intelligence engine. It answers one question: what materially changed in the systems BOTW currently tracks, and why is it worth attention?

## Signal → finding

`getPublicFindings()` requests the complete ranked catalogue through `getTopIntelligenceSignals({limit: 999})`. The adapter never detects a trend itself. It translates eligible registered signals into a stable `PublicFinding`, resolves display values from the same registered series, and supplies evidence IDs plus a Wall focus target. Acceleration and deceleration remain available to technical consumers but are withheld from this first public briefing because their shape-only wording does not pass the five-second editorial test.

## Language rules

All wording is selected by deterministic TypeScript templates. Peaks, troughs and reversals describe the shape of a series. Contradictions describe two observed movements with “while”, “also” or “co-movement”. Neutral-context measures such as spend, workforce and activity are never described as improving or declining. Internal names such as `reversal-down`, polarity and materiality are not primary UI copy.

## Deduplication

Two raw signals combine only when topic, metric and central period match and their types are a compatible `peak + reversal-down` or `trough + reversal-up` pair. The finding retains both raw signal IDs and the union of their evidence IDs. Unrelated signals remain separate. The current catalogue groups seven pairs.

## Ranking

Public findings inherit the engine’s materiality, confidence, recency and deterministic ID ordering. A grouped finding uses the highest materiality in its pair. The default view renders the first six after public eligibility and deduplication; topic controls filter this already-built catalogue and do not recalculate it.

## Focus contract

Every finding carries `{topicId, periodId, metricIds}`. “Show me on the Wall” lifts this contract into app state, selects the story and year, highlights the corresponding hero metrics and charts, scrolls and focuses the story workspace, and records `story`, `period` and `metric` in the URL. What Changed selection itself is shareable through `view=changed&finding=<stable-id>`.

## Causality

No finding implies causation. Contradictions always state that observed co-movement is not evidence that one movement caused the other. Inflections state that a change in series shape does not explain why it happened. Government chronology remains contextual in the Wall and never affects detection or ranking.

## Future

Ask Britain can route questions to these same stable finding, metric, topic, evidence and focus primitives. No generative system is part of this increment.
