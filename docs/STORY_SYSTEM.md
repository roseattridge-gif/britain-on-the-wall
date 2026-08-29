# How We Got Here — story system

## Product rule

The story layer aligns government control, policy/money/capacity events, system measures and outcomes. It explains chronology without silently converting proximity into causation. The invariant is: **chronology is not causation; attribution requires evidence**.

## Models

`GovernmentPeriod` stores stable IDs, neutral labels, party, prime minister, exact start/end dates and an evidence source. `StoryEvent` stores topic, date/range, track, title, summary, optional metric/value/direction, government context, mandatory relationship and confidence, source IDs and limitations. `StoryTopic` adds the handover comparison and four-part rule-constrained summary.

## Relationship classes

- `documented-policy`: an official source records enactment or implementation. UI: `POLICY CHANGE`.
- `authoritative-contributor`: an authoritative analytical source expressly identifies a contributor. UI: `EVIDENCE SUPPORTS CONTRIBUTION`.
- `followed-by`: movement occurred later but causal evidence is insufficient. UI: `FOLLOWED BY`.
- `context-only`: aligned context with no causal assertion.
- `uncertain`: evidence is mixed or insufficient.

No component derives a causal relationship from date overlap or party control. Summaries for `followed-by` events must not use causal verbs.

## Handover and lag

The handover marker compares the latest suitable measure before/at the boundary with a later measure. Labels are limited to `rising`, `falling`, `stable`, `accelerated`, `slowed`, `reversed` or `continued`. These describe trajectory, not performance attribution. Rolling annual measures must disclose their overlap with earlier periods. Policy effects may lag; an event may not be linked more strongly than its stored relationship permits.

## Evidence requirements

Every government period and story event must resolve to at least one official or authoritative source. Each evidence record exposes publication, date, definition, classification method, confidence and limitations through the existing in-place drawer. Primary sources are preferred: ONS, Home Office, Parliament, legislation, NAO, OBR and other authoritative public bodies.

## Visual grammar

The chronology is a compact editorial exhibit, not a Gantt chart. Four aligned tracks share one time axis. Party is restrained context; the government handover uses a neutral boundary marker. Policy events are deliberately sparse. Mini-trends show directional timing, with annotations carrying more meaning than axes. A short evidence summary states observed movement, policy context, supported contributors and what cannot be concluded.

## Future topics

The component consumes a `StoryTopic`, so Health, Welfare, Housing, Education, Justice, Debt, Defence and Economy can reuse it. Only Immigration is populated pending product review.
