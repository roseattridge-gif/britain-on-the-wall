# CODEX — STOP DESIGNING. REPRODUCE THE APPROVED REFERENCE.

The current implementation is rejected.

It still does not look sufficiently like the approved Britain on the Wall reference and Product Management considers the current UI poor.

This is NOT another design sprint.

This is a **visual reproduction task**.

Before touching code, open:

`docs/design/reference/approved-national-wall-reference.png`

Then read:

`docs/design/REFERENCE_CONTRACT.md`

The reference image is the source of truth.

---

# NON-NEGOTIABLE RULE

Do not design your own version.

Do not “interpret” the reference.

Do not create something merely inspired by it.

Do not optimise for reuse of the current UI.

Do not preserve legacy visual components because they already exist.

Your task is:

> **MAKE THE WEB PAGE LOOK LIKE THE REFERENCE IMAGE.**

If the implementation screenshot does not immediately resemble the reference when placed beside it, the task is not complete.

---

# 1. START WITH A VISUAL DIFF

Before coding, inspect:

### REFERENCE

`docs/design/reference/approved-national-wall-reference.png`

### CURRENT IMPLEMENTATION

capture the current app at 1440×900.

Create:

`docs/design/CURRENT_VS_REFERENCE.md`

For each region write:

* what the reference does;
* what the current UI does;
* what must change.

Cover:

1. page background;
2. header;
3. subtitle/meta;
4. unit toggle;
5. top summary;
6. left source column;
7. source illustrations;
8. £1 blocks;
9. left flow ribbons;
10. central £100 section;
11. central medallion;
12. right flow ribbons;
13. destination values;
14. destination labels;
15. destination illustrations;
16. lower historical section;
17. five-year changes;
18. outcomes;
19. footer;
20. whitespace;
21. typography;
22. overall density.

Do not start implementation until this comparison exists.

---

# 2. THROW AWAY THE CURRENT NATIONAL LAYOUT

Do not attempt another incremental CSS tidy-up.

The public national layout should be rebuilt around the reference structure.

Keep the real data logic.

Replace the visual composition.

The page must follow this geometry:

```text
HEADER / CONTEXT

WHERE £100 COMES FROM        PUBLIC MONEY        WHERE £100 GOES

SOURCE ROWS       >>>>>>        £100        >>>>>>      DESTINATION ROWS

---------------------------------------------------------------

OVER TIME          FIVE-YEAR CHANGE          WHAT BRITAIN GETS

---------------------------------------------------------------

EVIDENCE / SOURCES FOOTER
```

No blobs.

No circular territory map.

No freeform canvas at national view.

No bubble-chart remnants.

---

# 3. USE A FIXED EDITORIAL GRID FIRST

Do NOT use a physics layout.

Do NOT use an auto-layout graph.

Do NOT position items dynamically based on collision calculations.

Use a deliberate editorial CSS grid / SVG composition matching the reference.

At 1440×900, reproduce the reference proportions intentionally.

Responsive behaviour can come afterwards.

Start from fidelity, not abstraction.

---

# 4. MATCH THE PAGE BACKGROUND

The reference is a:

* warm off-white / paper-like canvas;
* dark navy typography;
* subtle borders;
* very restrained shadows;
* calm editorial spacing.

The page must NOT feel like:

* dark mode;
* enterprise SaaS;
* Power BI;
* a developer demo;
* a generic Sankey website.

---

# 5. HEADER MUST MATCH THE REFERENCE HIERARCHY

Top-left:

**BRITAIN ON THE WALL**

Large, editorial, commanding.

Directly beneath:

> The real picture of how Britain raises and spends its money.

Then smaller context:

* selected fiscal year;
* latest complete outturn;
* sources / methodology.

The header should breathe.

Do not fill it with controls.

---

# 6. UNIT TOGGLE

Position the:

**EVERY £100 | £ BILLIONS**

toggle prominently but elegantly near the top centre.

It must visually resemble the reference:

* compact;
* premium;
* simple;
* not generic button styling.

---

# 7. LEFT SIDE — SOURCE ROWS

Recreate the reference structure closely.

Each source row should be a horizontal composition:

```text
[ILLUSTRATION]  LABEL
                VALUE   %
                [£1 £1 £1 £1 ...]
                                  >>> FLOW
```

Rows must align cleanly vertically.

Use generous spacing.

Do not cram data into cards.

Do not surround every row with heavy borders.

---

# 8. USE REAL VALUES BUT REFERENCE VISUAL DENSITY

Real values come from the existing adapter.

The visual reference determines layout.

Do not copy incorrect example values from the image.

But the real values should occupy equivalent visual positions.

---

# 9. £1 BLOCKS ARE ESSENTIAL

The block field is not optional decoration.

It is central to the £100 mental model.

In `EVERY £100` mode:

* one full block ≈ £1 of the national £100;
* fractional final blocks may be partial;
* blocks should have small `£1` marks where legible;
* use a clean tightly aligned rectangular field.

Do not make them large dashboard tiles.

Do not make them circles.

Do not hide them.

---

# 10. SOURCE ILLUSTRATIONS

Every major source needs a recognisable editorial scene occupying approximately the same visual role as the reference.

Examples:

* workers / households;
* business building;
* shoppers / consumption;
* house / property;
* broader Britain / other receipts.

Do not use:

* generic Material icons;
* circular icon badges;
* emoji;
* random stock photography.

If final illustrations are unavailable, create consistent illustrated SVG scenes.

But preserve the reference image dimensions and placement.

---

# 11. LEFT FLOW RIBBONS

The source blocks should transition into smooth, elegant coloured flows.

Requirements:

* no crossings;
* no jagged connectors;
* no excessive transparency;
* proportional visual weight;
* convergence into the centre.

They should look like the reference's broad rivers.

Use SVG paths if necessary.

---

# 12. CENTRAL £100 SECTION

This is the visual hero.

The reference has:

**PUBLIC MONEY**

**£100**

**of every £100**

with total monetary equivalent beneath.

Then a large circular Britain medallion.

Reproduce that hierarchy.

The central object must feel iconic.

Do not replace it with:

* a plain circle;
* a boring KPI card;
* Treasury text in a box.

---

# 13. BUILD A PROPER MEDALLION

Create an SVG/CSS asset inspired directly by the reference:

* circular metallic medallion;
* subtle dimensional treatment;
* Britain silhouette or similarly appropriate central motif;
* tasteful gold / dark metal treatment.

It does NOT need to be photo-realistic.

It DOES need to feel deliberate and premium.

The current central visual must be discarded if it does not achieve this.

---

# 14. RIGHT SIDE — DESTINATION ROWS

Recreate the approved right-hand structure.

Each row:

```text
FLOW >>> [£1 blocks]   £23.10   Health & social care   [illustration]
                      23.1%
```

Large destinations at top.

Smaller destinations below.

Clean alignment.

Consistent row rhythm.

No floating bubbles.

---

# 15. DESTINATION ILLUSTRATIONS

Use recognisable scenes:

* hospital / healthcare;
* people receiving support;
* older people / pensions;
* schools;
* defence;
* trains;
* courts/policing;
* housing/community;
* economy/business;
* nature/environment;
* culture;
* administration;
* accounting/technical.

The illustrations should add recognition, not clutter.

---

# 16. DESTINATION VALUES

In `EVERY £100` mode:

large:
`£23.10`

smaller:
`23.1%`

Do not show three equivalent values.

`£bn` belongs as a tertiary value or in the expanded detail.

---

# 17. ACCOUNTING ADJUSTMENTS

Keep visually technical.

Use:

* neutral grey;
* calculator/ledger-like illustration;
* label `NOT A SERVICE`.

Do not make it look like another public-service department.

---

# 18. BOTTOM SECTION MUST BE PART OF THE COMPOSITION

The reference has a clean horizontal lower strip.

Build three major regions:

### OVER TIME

Five-year timeline and play control.

### 5-YEAR CHANGE

Compact editorial list of largest shifts.

### WHAT BRITAIN GETS

Simple outcome themes.

Do not make them separate floating dashboard cards.

They should belong to one editorial footer panel.

---

# 19. OUTCOMES MUST STAY LIGHT

Do not turn outcomes into another data dashboard.

Use a handful of clear themes with simple pictograms.

The fiscal flow remains the hero.

---

# 20. FOOTER

Create the dark navy evidence footer from the reference.

Example:

**TRANSPARENT. EVIDENCE-BASED. INDEPENDENT.**

Then:

> All data is from official sources. We show what the evidence says — not what we think.

And subtle links:

* Sources
* Methodology
* Data dictionary

---

# 21. TYPOGRAPHY

The page needs editorial typography.

Use the closest suitable installed/web-safe stack available.

Aim for:

### Title

serif or strongly editorial display face.

### Interface / values

clean humanist sans-serif.

Do not use generic developer-default typography throughout.

Do not use monospaced text for ordinary content.

---

# 22. CONTROL VISUAL DENSITY

The reference is dense in information but NOT visually messy.

Important difference.

Use:

* strict alignment;
* repeated row structures;
* generous gutters;
* restrained font sizes;
* whitespace;
* consistent icon/illustration boxes.

Do not solve density by hiding half the data.

Solve it through composition.

---

# 23. NO LEGACY VISUAL LANGUAGE

Search the public national components for remnants of:

* `blob`
* `territory`
* bubble circles;
* orbit hints;
* floating ranking badges;
* canvas territory envelopes.

They must not remain visible in the public national UI.

Legacy code can survive behind:

`/legacy-wall`

if useful.

---

# 24. VISUAL FIDELITY LOOP

This is mandatory.

After first implementation:

1. Run at exactly `1440×900`.
2. Screenshot.
3. Open:

   * reference image;
   * new screenshot.
4. Compare them side by side.
5. Identify the 10 largest visual differences.
6. Fix them.
7. Repeat.

Perform at least **three visual comparison passes**.

Do not stop after one implementation attempt.

---

# 25. FIDELITY SCORE

In the final handoff, self-score 0–10 for:

* composition;
* spacing;
* source side;
* central £100;
* destination side;
* illustration style;
* typography;
* colour;
* bottom section;
* overall resemblance.

If any major category is below 8/10:

continue refining before stopping.

---

# 26. VISUAL ACCEPTANCE IS MORE IMPORTANT THAN CODE ELEGANCE

For this increment:

visual fidelity > architectural cleverness.

Do not spend the sprint abstracting components while the page still looks wrong.

A little duplication is acceptable if it materially improves the visual result.

Refactor later.

---

# 27. KEEP EXISTING DATA FUNCTIONALITY

Retain:

* real 2025–26 data;
* unit toggle;
* percentages;
* historical dataset;
* timeline;
* evidence;
* source registry.

But do not let existing component architecture dictate appearance.

---

# 28. DO NOT ADD ANYTHING ELSE

No:

* Health drill-down;
* new metrics;
* new source work;
* new outcomes;
* mobile redesign;
* new product functionality.

Until this national screen is excellent, everything else stops.

---

# HANDOFF

Update `docs/CODEX_HANDOFF.md`.

The handoff must include:

1. confirmation that the actual PNG reference was opened and inspected;
2. path to the current implementation screenshot;
3. the three visual-comparison passes completed;
4. the 10 largest differences found and fixed;
5. remaining differences;
6. self-score against the fidelity criteria;
7. commit SHA.

---

# DEFINITION OF DONE

Open:

`docs/design/reference/approved-national-wall-reference.png`

beside the implementation screenshot.

The reaction must be:

> **“Yes. That is clearly the web version of this exact design.”**

If the reaction is:

> “Well, it has roughly the same concept…”

then it is not done.

**STOP DESIGNING. TRACE THE APPROVED DIRECTION.**
