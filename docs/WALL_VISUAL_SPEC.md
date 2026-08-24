# Britain on the Wall — visual scene specification

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

## 9. Leak treatment

Leaks are world-space branch paths attached to a parent flow. Each has a burgundy curved stream, downward droplet terminus, name and amount. They never appear as a detached button row.

## 10. Minimap and chrome

- Chrome is limited to brand/breadcrumb, compact year/unit/layers, minimap, semantic-level readout, zoom/Fit controls and selection inspector.
- Minimap shows funding, Treasury, spending and outcome masses plus the current camera rectangle.
- Canvas occupies 100% of the viewport; no page scroll or marketing section.

## 11. Accessibility

All nodes are native buttons with descriptive accessible names. Status is expressed with colour, arrow and text. Focus rings are prominent. Core labels meet readable national-fit sizes. Reduced motion is honoured.
