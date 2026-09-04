# Britain on the Wall

An evidence-led public product that makes Britain's public-value system legible: where public money comes from and goes, what changed, what outcomes followed, and where value is lost or constrained.

> **Data boundary:** the public Wall uses official or transparently derived official data. UK fiscal measures remain distinct from England operational measures. Estimates, provisional values, unavailable releases and causal limits are visible. `/legacy-wall` is a separate development reference and contains illustrative fixtures.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173/`.

Checks: `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Architecture

- `src/data/real/` contains the national fiscal adapter and the Immigration, Health and Housing evidence-led story modules; `src/data/demo.ts` remains the optional demo fixture.
- `src/components/NationalWall.tsx` is the public editorial Wall: money in/out, value and leakage, then the Immigration, Health and Housing workspace.
- `src/intelligence/` powers deterministic What Changed findings; `src/launch/` contains the bounded Claim → Evidence, Ask Britain and guided-journey contracts.
- Public navigation is deliberately limited to `BRITAIN`, `WHAT CHANGED` and `ASK BRITAIN`.
- `/legacy-wall` preserves the older spatial canvas for development/reference; it is not the public face of the product.
- `src/types.ts` defines stable entities and evidence relationships.
- `src/canvas/layout.ts` defines the stable logical world, graph nodes and focus targets.
- `src/canvas/useCamera.ts` owns pan, pointer-relative zoom and camera state.
- `src/components/SystemCanvas.tsx` renders every semantic level inside one persistent world.
- CSS owns the physical visual language, semantic states and viewport overlays.

Launch controls and outstanding external gate are documented in `docs/LAUNCH_READINESS_AUDIT.md`, `docs/LAUNCH_DATA_REGISTER.md`, `docs/PRIVATE_TEST_PLAN.md` and `docs/LAUNCH_SCORECARD.md`.

## Required reading for future Codex sessions

Before changing the product, read:

1. `README.md`
2. `docs/CODEX_HANDOFF.md`
3. `docs/PRODUCT_DECISIONS.md`
4. relevant files in `docs/handoffs/`

Before stopping after any meaningful development task, update the handoff.
