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

## Architecture

- `src/data/demo.ts` is the replaceable demo-data adapter. UI components never embed numeric values.
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
