# CODEX HANDOFF

Date: 2026-08-24
Increment: National Wall visual composition and polish
Reviewed implementation commit: `68492bd`

## Product review — ten explicit answers

### 1. What changed in the national composition?

The authored funding arc was shifted inward so Workers is fully framed and visually dominant. Health, Pensions and Welfare now form a separated primary spending arc; the remaining domains form a lower-contrast secondary arc. The result reads left/top → Treasury → lower/right → outcomes → attached losses.

### 2. What collisions were fixed?

Workers no longer clips the viewport or collides with Business. Business, Consumption and Property have clearer spacing. Health/Pensions/Welfare labels moved inside their cores. Rank rules disappear above national zoom, far territory hints render above cores, attention pins collapse to small marks nationally, and medium Workers/Health rank-to-child collisions were removed.

### 3. How were Health/Pensions/Welfare repositioned?

They are horizontally staggered at x 820/1320/1800 with breathing room and internal values. Education starts the transition to the secondary/right arc. Smaller domains form a quieter lower sweep rather than competing with the primary three.

### 4. How is Treasury clearer?

Treasury remains the brightest circular pivot with incoming cyan and violet streams and outgoing ivory allocation ribbons. Cleaner surrounding whitespace, reduced attention noise and one uninterrupted explanatory sentence make pooling and splitting unambiguous.

### 5. How were outcome relationships simplified?

National fit now shows one representative contextual return thread per outcome. The complete contextual set returns above national zoom. The outcome horizon keeps five evenly spaced heat fields and explicit non-causality language.

### 6. How were far-view territory hints refined?

Hints now sit above their cores, inherit a quieter parent colour and use a pale editorial treatment. Territory borders were reduced from hard rings to faint asymmetric fields. National hints remain pictorial; medium labels remain collision-reviewed.

### 7. Did the biggest source/top three destinations become more obvious?

Yes. In the 1440×900 squint test Workers is the unmistakable source mass. Health, Pensions and Welfare read as the primary expenditure bulk without relying on badges or scanning labels.

### 8. What still feels visually imperfect?

The national frame remains information-dense by design. Some minor labels approach outcome or lower-edge territory at 1440px, and the Treasury annotation crosses a busy ribbon area. These are readable and materially improved, but could receive microscopic typography refinement after Product Management review.

### 9. Are current screenshots available?

Yes. Current post-£100 screenshots are saved for national Every £100, national £bn, 1920×1080, Workers medium, Health medium and Health deep states.

### 10. Is Product Management ready to consider real-data work next?

The visual grammar is now coherent enough for a Product Management acceptance decision. Real-data work should begin only if this national screenshot and its medium/deep companions are accepted; no official-data work was started here.

## Self-critique of the national screenshot

1. Biggest source obvious: **Yes**.
2. Biggest three destinations obvious: **Yes**.
3. Treasury clearly pools and splits: **Yes**.
4. Workers composition understandable before click: **Yes—tax, people/NI and home cues**.
5. Health composition understandable before click: **Yes—hospital, primary-care and community cues**.
6. Major flows easy to trace: **Yes**.
7. Spending fan clean: **Yes, with primary and secondary arcs**.
8. Outcome horizon part of the same story: **Yes**.
9. Leaks attached and understandable: **Yes, but deliberately subordinate**.
10. Premium/editorial rather than dashboard-like: **Yes**.

## Verification

- Vitest: 2 files, 18 tests passed.
- TypeScript: `tsc --noEmit` passed.
- Production Vite build passed.
- `git diff --check` passed.
- Browser QA completed at 1440×900 and 1920×1080.

Saved evidence:

- `docs/qa/2026-08-24-national-1440x900-every100.png`
- `docs/qa/2026-08-24-national-1440x900-bn.png`
- `docs/qa/2026-08-24-national-1920x1080.png`
- `docs/qa/2026-08-24-workers-medium.png`
- `docs/qa/2026-08-24-health-medium.png`
- `docs/qa/2026-08-24-health-deep.png`

## Git state

Branch: `main`. Implementation commit: `68492bd`. This handoff is committed separately so it cites the immutable reviewed implementation.
