# Britain on the Wall — visual scene specification

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
- **Deep Health:** Hospitals retains the existing operational system. Far Health hints are generated from the same `healthComponents` objects, not a duplicate taxonomy.
- Child pictograms inherit the parent colour and sit inside an organic, translucent field with restrained borders and radial colour integration.
- The quantitative core remains circular; territory envelopes use asymmetric radii and overlapping sub-masses to reduce perfect-circle repetition.
- Major core diameters use `70 + sqrt(value / maxFunding) × 320px` for funding and `60 + sqrt(value / maxDomain) × 330px` for spending. Lower minima strengthen the long tail while maintaining usable targets.
- Layered ribbons pass underneath the field and meet the enlarged receiving basin/halo, so flows read as entering territories rather than terminating at pins.
- Far hints use three stable authored offsets. Medium labels sit immediately below their pictogram; selected composition uses the established four collision-reviewed offsets.
- Year changes resize cores and ribbons but do not reposition children, preserving spatial memory.

## National composition rules

- **Hero frame:** the 1440×900 national fit is the authored primary composition. Workers sits fully inside the upper-left funding basin; Treasury anchors the centre; Health, Pensions and Welfare form a separated primary spending arc; smaller domains form a quieter secondary lower/right arc.
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
