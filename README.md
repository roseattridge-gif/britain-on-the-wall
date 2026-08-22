# Britain on the Wall

An interactive visual prototype that makes Britain's public-value system legible as one connected flow: who pays in, where funding goes, what machinery delivers, who receives value, what outcomes result, and where value is lost.

> **Important:** all values are illustrative demo data. They are not official statistics and must not be quoted as fact.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173/`.

Checks: `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Launch integrations

- Set the GitHub Actions variable `VITE_GA_MEASUREMENT_ID` to the GA4 measurement ID. Analytics is consent-gated.
- Set `VITE_KIT_FORM_ACTION` to the public Kit form subscription endpoint.
- Add a `public/CNAME` only after the custom domain is verified in GitHub Pages and before changing DNS.
- `.github/workflows/pages.yml` tests, builds and deploys the `dist` artifact.

## Architecture

- `src/data/demo.ts` is the replaceable demo-data adapter. UI components never embed numeric values.
- `src/types.ts` defines stable entities and evidence relationships.
- `src/components/BritainWall.tsx` preserves one visual grammar at national and Health resolution.
- CSS owns the spatial composition, flow scaling, semantic states and mobile reflow.

## Required reading for future Codex sessions

Before changing the product, read:

1. `README.md`
2. `docs/CODEX_HANDOFF.md`
3. `docs/PRODUCT_DECISIONS.md`
4. relevant files in `docs/handoffs/`

Before stopping after any meaningful development task, update the handoff.
