# Dated handoff — every £100 framing

Date: 2026-08-24
Implementation commit: `3722485`

The primary proportional mode is now `EVERY £100`; the alternate mode is `£ BILLIONS`. Public pence-per-£1 labels have been removed. Treasury reads `£100 / ONE NATIONAL POOL`, and the explanatory sentence says: “For every £100 Britain raises or borrows, this is where it goes.”

The transformation is display-only. Underlying proportions, allocation data, blob areas and ribbon widths are unchanged. Whole pounds are used for major values, with one decimal place retained for smaller values where rounding to a whole pound would be misleading.

Affected national labels, composition amounts, timeline notes, Health story, inspector, guide, tests and specification were updated together. Seventeen tests, TypeScript and the production build pass. Screenshot refresh remains pending because local-page inspection was rejected by the in-app browser during this run; the older pence-labelled images remain explicitly historical and were not misrepresented as current.
