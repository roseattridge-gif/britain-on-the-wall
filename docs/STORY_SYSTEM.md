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

## Direct year exploration

The five accepted fiscal periods are primary, directly selectable states. Selecting a year updates the same Wall, its total, all source and destination values, proportional blocks, flows and the Immigration context strip without changing route. Stable taxonomy positions preserve spatial memory; values change in place. Previous/next and left/right keys step through the identical states. Playback is an optional secondary shortcut only.

Each fiscal row exposes the selected nominal cash amount and share, cash/share movement from the previous comparable year, and cash/share movement from the 2021–22 base. For 2021–22 the previous comparison is intentionally zero because it is the first accepted period.

Government at the time, policy ownership and measurement timing remain separate fields. The 2024–25 state is explicitly `Conservative → Labour`, marks the 5 July 2024 handover, and labels the pre-handover falling direction as inherited rather than assigning the later measurement to either administration.

Metric interpretation uses explicit polarity: `higher-is-better`, `lower-is-better`, or `neutral-context`. Only the first two may produce `IMPROVED` or `DECLINED`; Immigration's net-migration series is neutral and therefore displays only direction. Actual outcome periods remain calendar/month/quarter labels and are never relabelled as fiscal years.

## Editorial assets

Illustrations are resolved by stable taxonomy ID through `src/assets/editorial/manifest.ts`. Each manifest entry carries `id`, `src`, `alt`, `category`, and optional focal point. The present SVG files are restrained abstract placeholders with fixed boxes; they are not React/CSS drawings and can be replaced asset-for-asset without changing Wall geometry. The rejected generated source and destination scene sheets have been removed.

## Future topics

The component consumes a `StoryTopic`, so Health, Welfare, Housing, Education, Justice, Debt, Defence and Economy can reuse it. Only Immigration is populated pending product review.
