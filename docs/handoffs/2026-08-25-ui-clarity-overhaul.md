# Dated handoff — UI clarity overhaul

1. **Removed from default:** Property/capital, Other receipts, Housing, Administration, Economy, Environment, Culture, Skills & opportunity and Effective state; their ribbons; two outcome nodes; outcome attribution; rank badges; full leak labels; playback, period ticks, change and layer controls.
2. **Deferred:** the complete taxonomy, secondary percentages, wider composition, detailed outcome relationships, leak values, history controls and evidence appear on zoom, selection, `Details` or in the inspector.
3. **Primary values:** Every-£100 uses `£x / £100` plus percentage. Billions uses `£x.xbn` plus percentage. No node shows both unit systems simultaneously.
4. **Composition:** Tier 1 permits only Income/social contributions, Consumption and Health, at two pictograms each. Other hints wait for Tier 2 or selection.
5. **Outcomes:** three high-level outcome territories and three representative return threads remain. Attribution text and two lower-priority outcomes are deferred.
6. **Leaks:** off by default; Tier 1 shows only marker shapes when explicitly enabled. Full labels require zoom.
7. **Chrome:** period, units and Details remain at top; zoom/fit remains below. Playback, ticks, five-year comparison and layers sit behind Details. The duplicate period strip is hidden.
8. **Comprehension:** at 1440×900 the largest source, Treasury pool, four leading destinations, Health's 23.1% share, borrowing and the route to more detail are readable within 5–10 seconds.
9. **Weakness:** selected Health remains intentionally information-rich, and mobile framing is only a functional reference. Tier 2 can look dense while transitioning into exploration; that density no longer contaminates the launch poster.
10. **Gate:** desktop national overview is clear enough to resume Health depth in a later increment, provided future work continues to respect these four information tiers.

Formal QA screenshots:

- `docs/qa/2026-08-25-clarity-overview-every100-1440x900.png`
- `docs/qa/2026-08-25-clarity-overview-billions-1440x900.png`
- `docs/qa/2026-08-25-clarity-focus-health-1440x900.png`
- `docs/qa/2026-08-25-clarity-focus-workers-1440x900.png`
- `docs/qa/2026-08-25-clarity-medium-1440x900.png`
- `docs/qa/2026-08-25-clarity-mobile-390x844.png`

No data, domain depth, routes or analytical claims were added.
