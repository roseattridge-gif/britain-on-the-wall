# Britain on the Wall design system

## Design principle

**Data is the artwork.** The interface uses scale, position, proportion, typography and restrained semantic colour to make the evidence visible. Decorative illustration panels, ornamental effects and dashboard density are excluded. The Britain medallion remains the single central object because it explains the public-money pool.

The standard is **obvious before clever**: show the core relationship first, then let interaction reveal history, definitions, caveats and source detail.

## Product hierarchy

1. **Understand Britain** — the national fiscal poster answers where public money comes from and where it goes.
2. **See what changed** — the large story workspace aligns money, capacity, output and outcomes through time.
3. **Interrogate the evidence** — the evidence sheet exposes source, definition, confidence and limitations.

All three chapters use the same 1600px maximum canvas, balanced page gutters and shared tokens.

## Typography

Two roles are used:

- **Newsreader**: masthead, chapter titles, major values and editorial signal statements.
- **Libre Franklin**: controls, labels, evidence, chart annotations and supporting copy.

| Role | Size |
| --- | --- |
| Brand title | 40–56px |
| Section title | 28–42px |
| Major metric | 34–52px |
| Category or body label | 13–19px |
| Supporting detail | 12–15px |
| Metadata floor | 11px |

There is no public text below 11px. When space is constrained, content stacks, scrolls within a purposeful selector, or is removed rather than shrunk.

## Colour

The public CSS exposes semantic variables rather than component-specific palettes:

- `--background`, `--surface`, `--surface-muted`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--border`, `--border-strong`, `--accent`
- `--success`, `--warning`, `--danger`
- `--technical`, `--borrowing`

Fiscal categories retain enough tonal distinction to trace flows, with reduced opacity and saturation around the central £100 anchor. Status always includes words or direction arrows; colour is never its only carrier. Government bands use neutral greys and a restrained handover marker rather than party branding.

## Spacing and shape

The spacing scale is `4, 8, 12, 16, 24, 32, 48, 64`. Shared shapes are `--radius-sm`, `--radius-md` and `--radius-lg`; `--shadow-subtle` is reserved for major elevated surfaces. Controls use consistent 40–44px minimum targets.

## Components

### National fiscal row

Default state shows a functional outline icon, plain label, proportional £1 tokens, value, percentage and a `+` source affordance. Prior/base comparisons stay in the accessible label and hover title until interaction. Borrowing uses a restrained violet dashed treatment and explicit “not revenue” wording. Technical reconciliation is grey and says “not a service”.

### Hero metric

Every topic uses the same category → major value → public label → prior-period change/status → real period grammar. Precise official definitions remain in evidence. Unavailable is a written state, never zero.

### Topic selector

Immigration, Health and Housing are keyboard-visible tabs. Topic switching preserves the global selected fiscal period and display unit.

### Year selector

Five large cards show fiscal period and neutral government context. The selected card has a strong border and pale surface; the mixed-government card retains its handover date. Left/right keys step through the same global selection.

### Charts

The primary trend receives the largest plotting area. Supporting charts reuse the same line, selected-year band, selected point, period axis and current-value footer. Charts have descriptive accessible names; there are no ornamental gradients or legends.

### Government band

Government is a neutral context strip with a single 5 July 2024 boundary marker. It cannot imply performance or affect the story metrics.

### Policy event

Events use a small marker, short label and date. Each is a minimum-height button opening its evidence; event cards remain subordinate to metric trends.

### Signal callout

Signals use a large editorial statement plus the permanently visible wording: “Observed co-movement. Not evidence that one caused the other.” Neutral states use the same grammar without performance claims.

### Evidence drawer

The third chapter is a desktop side sheet and a full-width mobile sheet. Its order is metric, value/status and period/geography, confidence, source, plain definition, what it tells us, what it cannot tell us, collapsed technical details and official link.

## Interaction states

- **Hover:** a small row movement or surface change reinforces clickability.
- **Selected:** dark filled segmented control or accented year border plus `aria-pressed`/`aria-selected`.
- **Focused:** a high-contrast 3px outline with offset.
- **Unavailable:** explicit “Not yet available”; no interpolated point or implied zero.
- **Reduced motion:** transitions and animations are disabled under `prefers-reduced-motion`.

## Responsive behavior

- **Desktop:** three-column fiscal poster, four-up hero metrics and primary/supporting trend grid.
- **Tablet:** fiscal columns stack, year cards remain horizontally comparable, hero metrics become two-up and trends become one column.
- **Mobile (390px):** fiscal rows use two readable lines, hero metrics stack, charts are full width, topic/year/event selectors scroll inside their own bounds, and the evidence drawer becomes a full-width sheet. The page itself must not overflow horizontally.

## Do not

- Add decorative images or illustration panels.
- Use typography below 11px.
- Build a rainbow dashboard or a new card grammar per topic.
- Show all methodology and comparison detail by default.
- use unexplained technical language as the public label.
- Let party colour dominate or imply a score.
- Add a new product feature during a visual-system pass.
