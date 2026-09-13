# Canvas

Standalone presentation engine: a Next.js route loads JSON from `public/presentations/`, and React Flow renders a step-filtered graph. Nothing in the JSON is product-specific.

## Run

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:3000/present/site-selection](http://localhost:3000/present/site-selection).

## Add a deck

1. Create `public/presentations/your-slug.json`.
2. Visit `/present/your-slug`.

`PresentationConfig` lives in `src/lib/presentation/types.ts`.

## Controls

Previous / Next / Reset in the canvas chrome. Arrow keys and Home also work.

Nodes appear when `data.step` is less than or equal to the current step. Edges appear when their `step` is reached and both endpoints are already visible. The source arrays are never mutated.
