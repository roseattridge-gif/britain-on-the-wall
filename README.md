# Britain on the Wall

An interactive visual prototype that makes Britain's public-value system legible as one connected flow: who pays in, where funding goes, what machinery delivers, who receives value, what outcomes result, and where value is lost.

> **Data boundary:** the default national fiscal Wall and Health allocation are official/derived official data. The deeper Health operational lens is official England data and is not a UK reconciliation. Remaining outcome-horizon and leak fixtures are explicitly labelled illustrative.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173/`.

Checks: `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Architecture

- `src/data/real/` contains the default national and Health evidence adapters; `src/data/demo.ts` remains the optional demo fixture.
- `src/components/NationalWall.tsx` is the public clean editorial route: fixed source/medallion/destination geometry, functional icons, proportional £1 blocks, direct year selection and Immigration context.
- `/legacy-wall` preserves the older spatial canvas for development/reference; it is not the public face of the product.
- `src/types.ts` defines stable entities and evidence relationships.
- `src/canvas/layout.ts` defines the stable logical world, graph nodes and focus targets.
- `src/canvas/useCamera.ts` owns pan, pointer-relative zoom and camera state.
- `src/components/SystemCanvas.tsx` renders every semantic level inside one persistent world.
- CSS owns the physical visual language, semantic states and viewport overlays.

## Required reading for future Codex sessions

Before changing the product, read:

1. `README.md`
2. `docs/CODEX_HANDOFF.md`
3. `docs/PRODUCT_DECISIONS.md`
4. relevant files in `docs/handoffs/`

Before stopping after any meaningful development task, update the handoff.
