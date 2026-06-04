# mxv/ui — monorepo guide

Opinionated React component library on **Tailwind v4 + Radix primitives**, plus a docs site.
Runtime: **Bun**. Orchestration: **Turborepo**. Lint/format: **Biome** (not ESLint/Prettier).

## Workspaces

| Path | Package | What |
| --- | --- | --- |
| `packages/ui` | `@mxv/ui` | The component library (published npm package). |
| `packages/tsconfig` | `@mxv/tsconfig` | Shared `base` / `react-library` / `nextjs` tsconfigs. |
| `apps/docs` | `@mxv/docs` | Docs site: **TanStack Start (Vite)** + **headless Fumadocs** (`fumadocs-core` + `fumadocs-mdx`). No `fumadocs-ui` — chrome is built with `@mxv/ui`. |

## Commands (run from repo root)

- `bun run build` — Turbo build all (`@mxv/ui` via `tsc` + `tsc-alias`; docs via Vite).
- `bun run dev` — run dev tasks (docs at `http://localhost:3000`).
- `bun run lint` — Biome check across packages. `bun run check` / `bun run format` to autofix.
- `bun run typecheck` — `tsc --noEmit` per package.
- Add deps with **`bun add`** (never hand-write versions in `package.json`).

## Conventions

- **Imports:** use the `@/*` alias (mapped to `./src/*`), never relative `../../`.
- **Styling:** Tailwind v4, CSS-first. Tokens are CSS variables in `packages/ui/src/styles.css`,
  mapped to Tailwind via `@theme inline`. Use token classes (`bg-primary`,
  `text-muted-foreground`, `shadow-soft`) — no hard-coded colors.
- **Variants:** `class-variance-authority` (CVA); merge classes with `cn` (`@/lib/cn`).
- **Design language:** pill radius (`rounded-full`) by default, hairline borders, soft shadows,
  neutral grays + a single blue accent.
- **RSC:** interactive components start with `"use client"`; presentational ones stay
  server-safe. The build preserves per-file directives.
- **Dark mode:** tokens switch on `[data-theme="dark"]` on `<html>`.

## @mxv/ui build

`tsc -p tsconfig.build.json && tsc-alias && cp styles.css` — emits one ES module per source file
(mirrors `src/`, no bundler/chunks), `tsc-alias` rewrites `@/` to relative paths, directives are
preserved, and `sideEffects: ["**/*.css"]` keeps it tree-shakable. (We deliberately use `tsc`
instead of a bundler here — see `git log` / the plan for rationale.)

## Adding a component

1. `packages/ui/src/components/<name>/<name>.tsx` — Radix primitive + CVA + `cn`; add `"use client"`
   if interactive; forward refs; export prop types.
2. Re-export from `packages/ui/src/index.ts`.
3. Add a docs page `apps/docs/content/docs/components/<name>.mdx` and list it in
   `apps/docs/content/docs/components/meta.json`. `@mxv/ui` components + `<ComponentPreview>` are
   available directly in MDX.

## Docs notes

- Tailwind in docs imports `@mxv/ui/styles.css` and uses `@source` to scan the library source
  (Tailwind v4 doesn't scan `node_modules`).
- Do **not** add a `tslib` resolve alias in `apps/docs/vite.config.ts` — it breaks the Nitro
  prerender (server function can't resolve `tslib/modules/index.js`). `tslib` is a direct dep.

## Not yet wired

Release automation (Changesets publish), unit/visual tests, and CI — intentionally deferred.
