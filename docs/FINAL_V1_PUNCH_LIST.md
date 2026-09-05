# Final V1 punch list

Audit date: 2026-09-05. Scope is frozen. This list contains only defects demonstrated in source, tests, or the rendered product.

## P0 — launch blocker

### Approved favicon is not live

- **Issue:** Production publishes no `link[rel~="icon"]`; the exact approved crowned-wall asset is not present in the repository.
- **Where seen:** Fresh production document at `https://britainonthewall.co.uk/`; favicon link count was zero.
- **Why it matters:** The V1 brief requires the approved favicon to be visibly present with no missing asset. Substituting an unapproved recreation would cross the founder-approval boundary.
- **Fix made / deferred:** Deferred pending explicit approval or supply of the exact asset. The locally isolated candidate remains uncommitted and unpublished.
- **Verification:** Production DOM inspection on 2026-09-05 returned no icon links. This is the only remaining private-test readiness blocker.

## P1 — should fix before test

### Browser Back and Forward changed the URL but not the rendered view

- **Issue:** The app wrote history entries but did not restore React state on `popstate`; mode URLs also retained irrelevant Wall parameters.
- **Where seen:** Production navigation from BRITAIN to WHAT CHANGED, then browser Back.
- **Why it matters:** A participant could see a Britain URL with the What Changed screen, undermining navigation and shareability.
- **Fix made / deferred:** Fixed. `App` now restores view, year, unit, story, focus and selected finding from the URL, closes stale evidence, and removes `period`, `unit` and `story` outside the Wall.
- **Verification:** Regression test plus local browser Back/Forward/refresh check. Rendered headings and clean URLs now move together.

### Eight natural Ask Britain phrasings failed or misrouted

- **Issue:** Eight of the required 30 phrases were unsupported or returned the wrong supported answer before repair. The causal Labour question could resolve to an inherited-state answer.
- **Where seen:** Deterministic 30-question torture matrix.
- **Why it matters:** These are ordinary user formulations of evidence BOTW already holds; wrong or absent answers would be a recurring comprehension failure.
- **Fix made / deferred:** Fixed with bounded aliases, one existing-evidence NHS-spend answer, and one explicit non-causal migration answer. No algorithm, topic, statistic or generative behaviour was added.
- **Verification:** All 30 cases below pass with the expected evidence target; the five unsupported normative/forecast questions continue to decline.

### National receipts evidence link returned a 404

- **Issue:** The income drawer linked to a retired ONS path.
- **Where seen:** Income & social contributions → evidence → official source; ONS rendered “Page not found”.
- **Why it matters:** Source verification is a core trust task in the private test.
- **Fix made / deferred:** Fixed by using the current ONS Appendix D current-receipts dataset URL already registered in BOTW documentation and the source registry.
- **Verification:** The repaired link renders `Public sector current receipts: Appendix D` on ONS.

## P2 — post-launch polish

No new P2 item was demonstrated strongly enough to add during this frozen-scope audit. No polish changes were made.

## Ask Britain: 30-question record

| # | Phrase | Expected route | Result |
|---:|---|---|---|
| 1 | Where does all our tax money go? | largest spend | PASS |
| 2 | What's the biggest thing Britain spends money on? | largest spend | PASS |
| 3 | How much do we spend on the NHS? | health spend | PASS |
| 4 | Has NHS spending gone up? | health rise | PASS |
| 5 | Are NHS waiting lists actually coming down? | waiting falling | PASS |
| 6 | Did more NHS money improve things? | bounded NHS comparison | PASS |
| 7 | Was immigration already falling before Labour came in? | inherited migration | PASS |
| 8 | Did Labour cause immigration to fall? | explicit causal limit | PASS |
| 9 | When was immigration highest? | migration peak | PASS |
| 10 | Is the asylum backlog getting better? | backlog falling | PASS |
| 11 | How much tax doesn't get paid? | tax gap | PASS |
| 12 | What's the tax gap? | tax gap | PASS |
| 13 | How much do we lose to benefits fraud? | benefit fraud/error | PASS |
| 14 | Are public services getting more efficient? | productivity | PASS |
| 15 | How much are we paying in debt interest? | debt interest | PASS |
| 16 | Are house prices more affordable? | affordability | PASS |
| 17 | Are we building fewer houses? | housing supply | PASS |
| 18 | How many families are in temporary accommodation? | temporary accommodation | PASS |
| 19 | Where does public money come from? | money source | PASS |
| 20 | How much does Britain spend altogether? | total spend | PASS |
| 21 | How much of £100 goes on health? | health share | PASS |
| 22 | How has the NHS changed since 2021? | health comparison | PASS |
| 23 | When was the NHS waiting list highest? | waiting peak | PASS |
| 24 | Are more patients within 18 weeks? | 18-week performance | PASS |
| 25 | Did more NHS staff reduce waits? | workforce/waiting causal limit | PASS |
| 26 | What happened to net migration? | net migration | PASS |
| 27 | When was the asylum backlog highest? | backlog peak | PASS |
| 28 | Are more asylum decisions being made? | asylum decisions | PASS |
| 29 | Did housing spending rise while supply fell? | housing co-movement | PASS |
| 30 | Is public service productivity rising? | productivity | PASS |

Safe-failure checks also PASS for: “Who should I vote for?”, “Which party is best?”, “What will happen to GDP next year?”, “Is immigration good?”, and “How should the NHS be run?”.
