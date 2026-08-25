# Current implementation versus approved national Wall reference

Reference: `docs/design/reference/approved-national-wall-reference.png`  
Current capture: `docs/design/current-national-wall-1440x900.png`

| Region | Approved reference | Current implementation | Required correction |
|---|---|---|---|
| 1. Page background | Near-white warm paper with soft edge illumination | Flatter yellow-grey paper | Move to cleaner ivory and reproduce the subtle radial paper light |
| 2. Header | 105px editorial masthead; title dominates left | Similar structure but title is smaller/italic and header feels compressed | Match title scale, upright weight, and vertical rhythm exactly |
| 3. Subtitle/meta | Two clean lines directly below title | Present but undersized | Increase subtitle/meta legibility and match reference baselines |
| 4. Unit toggle | Compact centred segmented control at x≈610 | Present, slightly too small/high | Match 240×42 footprint, radius, border and navy selected state |
| 5. Top summary | Large rounded metadata rail at upper right with pictograms | Small text-only summary | Add reference-scale iconography, dividers, spacing and 41/12-equivalent adapter counts |
| 6. Left source column | Five large illustrated bands plus a separated borrowing row | Six equal compact rows sorted by value | Recreate five reference bands and separated borrowing composition while retaining all real categories |
| 7. Source illustrations | 155×90 painterly scenes integrated into rows | 132×68 sprite crops | Increase crops, restore scene aspect ratio and reference edge treatment |
| 8. £1 blocks | Clearly legible rectangular `£1` bricks in aligned multi-row fields | Tiny unlabelled ticks | Render larger bricks with `£1`, 2–3 aligned rows and fractional last brick |
| 9. Left ribbons | Broad filled rivers beginning at block fields | Thick SVG strokes beginning at row edges | Replace strokes with filled ribbon polygons matching row/block boundaries |
| 10. Central £100 | Text stack above medallion with generous breathing room | Text overlaps ribbon convergence and sits too low | Use the reference coordinates and reserve a clean central text zone |
| 11. Central medallion | Large 205px dark-metal coin with gold UK relief | Brown crown coin | Replace completely with deliberate SVG medallion and Britain silhouette |
| 12. Right ribbons | Filled, non-crossing fan with strong red/orange top flows | Thin stroked fan | Trace filled ribbon bands and match fan spread/weight |
| 13. Destination values | Value and percentage form a clean dedicated column | Values sit at far right before scenes | Reorder to blocks → value/% → label → illustration |
| 14. Destination labels | Dedicated two-line label column after values | Labels share token column | Give labels their own fixed-width column and reference typography |
| 15. Destination illustrations | Wide 170×44 painterly scenes at right edge | Narrow 152×34 crops | Match width, height, fade-to-paper edge and row attachment |
| 16. Lower history | One rounded 198px exhibition panel | Plain two-column strip; part falls below viewport | Rebuild fixed four-region panel fully visible at 1440×900 |
| 17. Five-year changes | Central compact list with arrows and button | Small list pushed below fold | Place in dedicated centre-left region with reference hierarchy |
| 18. Outcomes | Five pictograms centred in dedicated region | Similar themes but too small and sparse | Match icon size, dividers and labels; retain illustrative warning |
| 19. Footer | 39px navy bar at page bottom | Correct concept but not reliably visible at 900px | Fix total composition height so footer is visible at y≈955 scaled reference / viewport bottom |
| 20. Whitespace | Deliberate narrow gutters; dense but calm | Excess empty central space and oversized gap around coin | Expand band fields and lower panel into the available area |
| 21. Typography | Upright editorial serif title; humanist sans for content | Italic display styling used too broadly; mono metadata overused | Restrict serif to masthead/emphasis and remove mono from ordinary content |
| 22. Overall density | Nearly every region carries structured information | Main area is sparse and several destinations fall below fold | Refit the entire 1440×900 grid to show the full national composition at once |

## Ten largest differences to eliminate first

1. Crown coin instead of a Britain relief medallion.
2. Stroked connectors instead of traced filled ribbons.
3. Tiny tick marks instead of labelled £1 bricks.
4. Incorrect destination column order.
5. Source and destination illustration crops are too small.
6. Full destination list is not visible in the authored viewport.
7. Lower panel is not the reference's four-part exhibition composition.
8. Header title hierarchy is too weak and too italic.
9. Top summary lacks reference pictograms and scale.
10. Excess central whitespace makes the page feel unfinished.

## Three-pass resolution

The contract is present and was read. Pass 1 established the corrected editorial skeleton; pass 2 fixed stable ordering, full-height fit, destination column order and the lower exhibition band; pass 3 corrected heading spacing, borrowing copy and final density. The corresponding 1440×900 captures sit beside this file. Remaining intentional variance is limited to real adapter values/taxonomy, generated companion illustrations and live proportional SVG bands.
