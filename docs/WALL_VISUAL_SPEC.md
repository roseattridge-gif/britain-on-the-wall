# Britain on the Wall — visual scene specification

## Approved £100 Wall visual grammar — 2026-08-25

The public national route is an editorial page, not the legacy spatial canvas. Its five-second reading order is `where Britain's £100 comes from → public money £100 → where Britain's £100 goes`, followed by real history and explicitly illustrative outcomes. The previous canvas remains available only at `/legacy-wall`.

- **Source bands:** six real receipt/funding groups retain the approved stable visual order across periods. Each row combines a coherent editorial illustration, plain-English label, active-unit value, percentage, secondary context and proportional unit blocks.
- **Unit blocks:** one gold physical token represents £1 of every £100; a final clipped token represents the unrounded fraction. Tokens are generated from the adapter share and are not spreadsheet cells. Borrowing tokens are violet; technical tokens are grey.
- **Central object:** a warm metallic, double-ring Britain medallion says `PUBLIC MONEY`, `£100`, `of every £100` and the selected-period total. It is the sole visual convergence point.
- **Flow grammar:** source and destination strokes are derived from the same adapter values. Width is `max(4px, share × 52px)` for sources and `max(3px, share × 48px)` for destinations in the 1400×660 authored viewBox. Borrowing and technical flows are dashed and distinct.
- **Destination rows:** every non-zero frozen destination is sorted descending for the selected period. The three largest have extra height; the long tail remains compact. Accounting/statistical adjustments is hatched and says `NOT A SERVICE`.
- **Illustration system:** two generated editorial scene sheets follow the approved reference's warm British data-journalism treatment. Stable taxonomy-to-sprite coordinates crop six source scenes and fourteen destination scenes; borrowing retains a distinct purple code-native fallback. The artwork can be replaced without changing layout or data bindings.
- **Numeric hierarchy:** Every £100 uses whole pounds where practical and one decimal only where needed (`£23`, `£14.4`), followed by the percentage and then £bn context. Billions mode promotes `£313.7bn`, retains `23.1%`, and demotes the per-£100 value.
- **Borrowing:** calculated as TME less comparable current receipts, labelled `Fills the gap · not revenue`, and rendered with violet tokens plus a dashed flow.
- **Bottom strip:** the five accepted outturns retain adapter-driven interaction and deterministic largest-change calculations. Outcomes remain a separate, quiet strip labelled `ILLUSTRATIVE CONTEXT · NOT HISTORICAL EVIDENCE`.
- **Responsive rule:** 1440×900 and 1920×1080 use the authored three-column composition. Below 1000px the flows disappear and the same source, pool and destination material stacks without data loss.

## Historical timeline grammar — 2026-08-25

- Real mode uses five discrete fiscal stops from 2021–22 through 2025–26.
- Time changes mass, value, rank and emphasis, never category position or camera state.
- Geometry may tween for 750–800ms; labels resolve only to accepted snapshots and reduced motion removes the tween.
- Every £100 is primary. £bn is labelled current prices / not inflation adjusted.
- At most four computed spatial notes appear at national zoom. Technical notes say `TECHNICAL RECONCILIATION CHANGE`.
- Controls are keyboard operable; mobile keeps the slider visible and scrolls secondary chrome horizontally.
- Real fiscal history never animates illustrative outcomes, leaks or deep Health delivery.

Date: 2026-08-23  
Status: implementation specification for the national Wall visual reset

## 1. Visual premise

The product is a large editorial systems map, not a diagram inside a page. The camera sees a portion of a persistent physical world. At national fit the money backbone, Treasury hub, largest spending districts and outcome heat fields must remain readable without interaction.

## 2. Logical canvas and regions

Logical world: **3200 × 1800**.

- Funding basin: x 180–1420, y 120–520. Five ordinary funding actors form an upstream arc.
- Borrowing shelf: x 2050–2550, y 80–300. It enters Treasury from above in purple/dashed treatment.
- Treasury basin: centred x 1500, y 650. It is the largest single object.
- Spending territory: x 650–2520, y 900–1550. Twelve unequal districts fan outward from Treasury in two arcs.
- Outcome horizon: x 2500–3100, y 420–1300. Large status fields sit beyond spending.
- Leak ravines: attached to Health, debt-interest and central allocations; branch downward at their source.
- Health interior: centred around x 1050, y 1030. Child nodes are always in world space but hidden below Zoom 1.
- Hospital interior: centred around x 660, y 900. Operation nodes are always in world space but hidden below Zoom 2.

## 3. Default camera

- Desktop national fit: scale derived from viewport with 52px outer padding; capped near 0.50.
- Mobile national fit: overview scale near 0.22–0.26, centred on Treasury/spending backbone; users pan for edges.
- The world must remain larger than the camera at normal exploration scale.
- Focus targets: Britain centre (1600, 880), Health (1030, 1050), Hospitals (650, 850).

## 4. Semantic zoom thresholds

- Zoom 0 — Britain: scale < 0.72. Funding, Treasury, 12 domains, outcomes and leaks.
- Zoom 1 — Domain: 0.72–1.24. Health delivery children fade/scale into their fixed positions.
- Zoom 2 — Operation: 1.24–1.85. Hospital operational nodes and allocation links emerge.
- Zoom 3 — Evidence: ≥ 1.85. Metric annotations, unit economics and evidence affordances appear.

## 5. National hierarchy

- Treasury hub: logical diameter 390px. Total value 62px; title 28px.
- Funding nodes: 190–230px diameter. Values 40px; labels 25–29px.
- Major domains: Health/Pensions 250–280px; Welfare/Education 220–240px; remaining domains 160–205px. Values 38–46px.
- Outcome fields: 210–260px with 22–32px halo. Status label and arrow remain visible at national fit.
- Supporting metadata never competes with primary values.

## 6. Colour system

- World: deep warm charcoal `#101819` with subtle topographic grid.
- Funding: cool cyan family `#70c8d5` / `#bcebf0`.
- Treasury: warm luminous ivory `#f5f0df` with cyan convergence glow.
- Domains: harmonious blue/teal/ochre/clay palette; no rainbow confetti.
- Improving: sage green `#6fba8d`, arrow up.
- Mixed: warm amber `#d4a65a`, horizontal arrow.
- Deteriorating: coral `#d96b5f`, arrow down.
- Leakage: burgundy `#7d2935` / coral edge.
- Borrowing: violet `#9a83c9` with dashed outer stroke.
- Uncertain evidence: hatched/muted treatment.

## 7. Money-flow scale

World-space ribbon width uses a square-root scale to preserve distinction without allowing one stream to consume the scene.

- Funding: `12 + sqrt(value / maxFunding) × 96px`.
- Domains: `10 + sqrt(value / maxDomain) × 86px`.
- Health component allocation: `10 + share × 70px`.
- Ribbon widths animate when year changes. At fit scale the largest national streams remain approximately 35–50 screen pixels wide.
- Main flows use layered strokes: dark bed, coloured body and a subtle moving directional highlight.

## 8. Interaction states

- Hover: node rises 4–6%, label/value brighten, related ribbon glows.
- Selected: connected path remains at full opacity; unrelated world dims to 22–30%, never disappears.
- Background click: clears selection without moving the camera.
- Health click: camera flies to Health; children appear because scale crosses Zoom 1.
- Hospitals click: camera flies further; operations appear because scale crosses Zoom 2.
- Double click / evidence action: contextual inspector opens over the still-visible wall.
- Reduced motion removes camera/ribbon animation.

## Mass and composition grammar

Magnitude is encoded redundantly so the national Wall works at a glance and remains interpretable for users who cannot rely on colour alone.

- Funding blob diameter: `90 + sqrt(value / maxFunding) × 300px`.
- Spending blob diameter: `80 + sqrt(value / maxDomain) × 290px`.
- The minimum diameter preserves a readable target; square-root scaling prevents the largest item consuming the scene.
- Blob area, connected ribbon width and the displayed pounds-per-£100/`£bn` value all update from the selected demo year.
- The three largest funding categories are annotated `#1–#3 SOURCE CATEGORY`; the three largest spending domains are annotated `#1–#3 DESTINATION`. Rank is derived anew for each selected year.
- Treasury remains the single convergence point. A static dashed `£100 / ONE NATIONAL POOL` ring reinforces that each downstream pound-per-£100 value partitions the same illustrative whole. The public unit toggle reads `EVERY £100 | £ BILLIONS`; pence-per-£1 is not exposed.

At shallow semantic zoom, selecting a major source or destination reveals an orbital composition territory in the same world. Satellite area is square-root-scaled by share and each satellite repeats its derived amount and percentage. Funding uses the careful label `RECEIPTS ASSOCIATED WITH`; it does not claim tax incidence. Spending uses `THIS ALLOCATION CONTAINS`. These are explicitly illustrative prototype fixtures. Health retains the existing deeper recursive allocation → delivery → people → outcome example rather than receiving a competing shallow overlay.

## Territory & illustration grammar

Seven priority aggregates—Workers & Households, Businesses, Consumption, Health, Pensions, Welfare and Education—are quantitative cores inside asymmetric territory envelopes. The core preserves exact mass; the surrounding field adds meaning without becoming another measure.

- **Far / national (`scale < 0.72`):** the envelope shows at most the three largest or most explanatory child pictograms. Names and child values remain hidden.
- **Medium (`0.72–1.24`):** the same stable pictograms gain concise labels. Selecting a non-Health territory resolves them into the existing proportional composition masses.
- **Close / selected:** child share and pounds-per-£100 or £bn amount appear. Health instead resolves into its existing Hospitals, primary care, community care, medicines and administration nodes.
- **Deep Health:** the territory resolves into the four real PESA sub-functions. Medical services is the doorway to a separately labelled England operational lens containing real output, access and experience measures. It is not presented as a UK hospital reconciliation. Far Health hints are generated from the same `healthComponents` objects, not a duplicate taxonomy.
- Child pictograms inherit the parent colour and sit inside an organic, translucent field with restrained borders and radial colour integration.
- The quantitative core remains circular; territory envelopes use asymmetric radii and overlapping sub-masses to reduce perfect-circle repetition.
- Major core diameters use `70 + sqrt(value / maxFunding) × 320px` for funding and `60 + sqrt(value / maxDomain) × 330px` for spending. Lower minima strengthen the long tail while maintaining usable targets.
- Layered ribbons pass underneath the field and meet the enlarged receiving basin/halo, so flows read as entering territories rather than terminating at pins.
- Far hints use three stable authored offsets. Medium labels sit immediately below their pictogram; selected composition uses the established four collision-reviewed offsets.
- Year changes resize cores and ribbons but do not reposition children, preserving spatial memory.

## National composition rules

- **Hero frame:** the 1440×900 national fit is the authored primary composition. Workers sits fully inside the upper-left funding basin; Treasury anchors the centre; Health, Pensions and Welfare form a separated primary spending arc; smaller domains form a quieter secondary lower/right arc.

## National collision and value-label grammar

- National core diameter uses a square-root transform so circle area, rather than diameter, represents relative value. Funding is capped at 340 world pixels (`80 + √relative value × 260`); spending is capped at 320 (`75 + √relative value × 245`). Technical reconciliation is capped separately at 205 at national fit.
- The authored national coordinates enforce a tested gap of more than 100 world pixels between every primary core boundary. Primary spending has four dedicated positions; secondary spending occupies a separate lower/right arc; the outcome column begins beyond a visible service-to-outcome gap.
- Percentages use the full TME-aligned national pool. Funding labels therefore say `% of total funding`, not `% of taxes`; destination labels say `% of total spend`.
- In `EVERY £100`, the primary line is `£x / £100` and the persistent secondary line is `x%`. In `£ BILLIONS`, the primary line is `£x.xbn` and the same percentage remains visible. Treasury uses `£1.36tn` with `100% · £100 total`.
- Primary spending labels sit inside their cores. Secondary labels use a compact external treatment (`£ amount` plus percentage) and retain the inspector for full context. Technical reconciliation remains striped, capped and labelled `RECONCILIATION · NOT A SERVICE`.
- Far-view territory envelopes add only 80 pixels horizontally and 60 vertically, render at reduced opacity without an extra shadow, and may aesthetically approach but must not merge primary ownership. Medium zoom restores the fuller envelope.
- National fit shows at most two composition pictograms per priority territory. A third is deferred until medium zoom.
- Leaks and drags remain available as an optional layer but default off so illustrative fixtures do not compete with the real national hierarchy.

## Clarity and progressive disclosure rules

- **Tier 1 — national overview (`scale < .72`, no selection):** three largest funding sources, borrowing, Treasury, four primary destinations, five quiet secondary/technical destinations and three outcomes. Property/capital, other receipts, Housing, Administration, Economy, Environment, Culture, Skills and Effective state remain in the world but do not render. Hidden nodes and their ribbons return automatically at Tier 2.
- **Tier 2 — focused overview (`scale .72–1.24`):** the whole national taxonomy returns with fuller labels and up to three composition hints. This is exploratory context, not the launch poster.
- **Tier 3 — territory detail (`scale 1.24–1.85` or selection):** related flows and children come forward; selection is the primary route into composition.
- **Tier 4 — evidence and metrics (`scale ≥1.85`):** operational measures, provenance and caveats may appear. These never leak into Tier 1.
- Tier 1 major nodes carry exactly two numeric lines: the active unit and percentage. Secondary nodes carry one numeric line; their percentage is deferred. Tertiary nodes are absent. The alternative unit lives in the inspector or unit toggle, not beside the active unit.
- Tier 1 composition hints are restricted to Income/social contributions, Consumption and Health, with at most two pictograms each. Other composition is selection/zoom only.
- Tier 1 outcomes are Shared prosperity, Healthy lives and Safe communities. Each shows a simple direction; attribution copy and the two additional outcome nodes are deferred. Only three representative return threads render.
- Leaks default off. If explicitly enabled at Tier 1, only quiet markers appear; full leak names and values require zoom.
- Permanent chrome is period, unit toggle, `Details`, and zoom/fit. Playback, year ticks, five-year change, leaks and contribution controls sit behind `Details`. The duplicate period-status strip is removed.
- Focus mode dims unrelated nodes and flows to 7% opacity, reveals only the selected territory's composition, and opens its editorial inspector. This is the supported path from poster simplicity to analytical depth.
- National fit has no rank badges, comparability chips or methodology stickers. Editorial region headings remain quiet orientation, not dashboard chrome.
- **Visual hierarchy:** Workers is the unmistakable dominant source. Health, Pensions and Welfare carry their names and values inside their cores at national fit. Secondary-domain saturation, label size and metadata contrast are reduced.
- **Ribbon ordering:** the largest source and allocation ribbons take the cleanest direct paths. National outcome context uses one representative return thread per outcome; the fuller relationship set returns above national zoom.
- **Labels:** Tier 1 is Treasury and the largest masses; Tier 2 is major source/destination names and values; Tier 3 is secondary categories; Tier 4 is hints and metadata. Rank annotations are editorial rules, not badges, and disappear above national zoom.
- **Territory spacing:** major envelopes may overlap softly but their quantitative cores and labels may not collide. Far pictograms sit over the core, use inherited colour, and remain subordinate to mass.
- **Outcome balance:** the shared horizon retains five vertically spaced outcome fields and one clean national thread into each, balancing the left/centre money story without implying causality.
- **Leak priority:** leak/drag branches stay attached but use smaller droplets, quieter labels and reduced opacity at national fit.
- **Chrome hierarchy:** controls, minimap and level readout are deliberately quieter than the Wall. The first-look guide may overlay the scene only until skipped; saved hero QA uses the unobstructed frame.

## 9. Leak treatment

Leaks are world-space branch paths attached to a parent flow. Each has a burgundy curved stream, downward droplet terminus, name and amount. They never appear as a detached button row.

## 10. Minimap and chrome

- Chrome is limited to brand/breadcrumb, compact year/unit/layers, minimap, semantic-level readout, zoom/Fit controls and selection inspector.
- Minimap shows funding, Treasury, spending and outcome masses plus the current camera rectangle.
- Canvas occupies 100% of the viewport; no page scroll or marketing section.

## 11. Accessibility

All nodes are native buttons with descriptive accessible names. Status is expressed with colour, arrow and text. Focus rings are prominent. Core labels meet readable national-fit sizes. Reduced motion is honoured.

## 12. Narrative grammar

### Visual reading order

The national scene reads spatially rather than as numbered UI steps: funding receipts at upper left; separately treated borrowing above; convergence through the dominant Treasury; “where every £100 goes” across the spending fan; delivery and people at closer semantic zoom; the shared outcome horizon at right; and losses/committed drags branching downward where they occur. Small world-space chapter numbers support this eye path without becoming navigation cards.

### Attention annotations

Each demo year has three to four explicitly authored `DEMO ATTENTION` pins. They identify pressure, improvement, spending change or committed drag for storytelling only. They are not algorithmic rankings and disappear at domain zoom so they do not compete with local detail.

### Spend/outcome pairing

Each national outcome shows the change in related spending since the previous demo year beside the outcome direction. Pairings are labelled `MEASURED RETURN`, `INDICATIVE RETURN` or `CONTEXT ONLY`, and the outcome horizon states `SPEND TREND ≠ PROOF OF CAUSE`. Pairing makes comparison visible but never asserts that spending caused the outcome.

### Temporal transitions

The compact timeline combines a scrubber with explicit year stops. Changing year updates ribbon widths, node values, outcome heat, leak/drag scale and attention pins in the same world. Nodes pulse and flows brighten briefly; reduced-motion preference removes these effects.

### Change annotations

After a year change, three temporary world-space notes identify changes in Health’s pounds per £100, debt-interest drag and the healthy-lives direction. They remain attached to affected territories rather than forming a dashboard or footer.

### Guided first look

A five-part optional, non-modal guide highlights funding, borrowing, Treasury, allocation and outcomes/leaks in sequence. The Wall remains visible and interactive throughout. Users can advance or skip at any time; selecting a node dismisses it.

### Leak versus drag

`LEAK` describes value lost within a delivery mechanism, `LOSS` labels avoidable delivery or control costs, and `DRAG` describes a committed fiscal outflow such as debt interest. All branch from their relevant world-space source. Debt interest must never share moral language with fraud or abuse.

### Selected-system story

At Health zoom, one editorial trace explicitly reads `allocation → delivery → people → outcome`, while national annotations recede. The inspector explains the selected allocation and outcome direction in plain English and repeats that the pairing does not establish causation.
## Technical fiscal items

Accounting/statistical reconciliation is part of the national TME mass but is not a service destination. It uses the same proportional geometry so the £100 still reconciles, with a neutral grey, desaturated, dashed and hatched treatment. It must never inherit leak/loss red or performance language.

## Clean national £100 UI grammar

- **No illustration rule:** the public national route contains no decorative source/destination scenes, picture panels, sprite sheets, cartoon figures or programmatic artwork. The Britain medallion is the single premium anchor.
- **Icon system:** each fiscal taxonomy ID maps to one functional Lucide outline icon. Icons use a consistent 1.5px stroke, inherit the category colour, have no semantic status meaning and never compete with labels or money blocks.
- **Source rows:** functional icon → label and block field → active-unit value and percentage → evidence affordance. Borrowing remains dashed/violet and explicitly gap-filling rather than revenue.
- **Destination rows:** block field → active-unit value and percentage → fixed label column → restrained icon → evidence affordance. Technical reconciliation is grey and explicitly `NOT A SERVICE`.
- **£1 blocks:** one aligned rectangular block per whole pound of the unrounded share, plus a partially filled final block where needed. Blocks always represent the selected period's share of the full reconciled £100.
- **Ribbons:** broad proportional source and destination bands converge on the medallion. Stable row positions prevent crossings and preserve spatial memory; dashed ribbons distinguish borrowing and technical reconciliation.
- **Numeric hierarchy:** `EVERY £100` defaults to `£x` then percentage. `£ BILLIONS` promotes the nominal amount while retaining the same percentage. Previous-period and 2021–22 cash/share comparisons remain quiet tertiary text and accessible copy.
- **Year selection:** five direct fiscal-year stops are primary. Previous/next and ArrowLeft/ArrowRight step through the identical state; playback is optional. The route is stable and both period and unit are reflected in the query string.
- **Story panel:** the selected year updates government, sparse evidenced policy moments, an actual-period system trend, neutral outcome interpretation, inherited direction and after-handover chronology. Government context never becomes causal attribution.
- **Outcome panel:** polarity controls language. Higher/lower-is-better metrics may say improved or declined; neutral measures such as net migration show direction and `CONTEXT ONLY`.
- **Responsive rule:** mobile stacks the editorial header, medallion, sources, destinations and lower story while retaining the same data order and no-illustration grammar.
- **Regression contract:** public `NationalWall` and its CSS must contain no `.scene`, scene coordinate maps/variables, or source/destination scene-sheet references. Tests inspect both rendered output and raw source to prevent quiet reintroduction.
- **Five-column history:** `HOW WE GOT HERE` shows all five accepted fiscal years simultaneously. Each column contains government, evidenced material policy, actual-period system measure and polarity-safe outcome direction; the selected column is visually dominant.
