# mxv/ui

Opinionated React component library built on **Tailwind v4 + Radix primitives**, in a Bun +
Turborepo monorepo with a TanStack Start docs site.

- `packages/ui` — [`@mxv/ui`](./packages/ui) the component library
- `apps/docs` — documentation site (TanStack Start + headless Fumadocs)

## Develop

```bash
bun install
bun run dev        # docs at http://localhost:3000
bun run build      # build all packages
bun run lint       # Biome
bun run typecheck
```

## Releasing

Versioning and publishing use [Changesets](https://github.com/changesets/changesets).

1. Add a changeset describing your change:
   ```bash
   bun run changeset
   ```
2. Push to `main`. The **Release** workflow opens a "Version Packages" PR.
3. Merge that PR — the workflow builds `@mxv/ui` and publishes it to npm.

Requires an `NPM_TOKEN` repository secret with publish access to the `@mxv` scope. The default
`GITHUB_TOKEN` handles the release PR.
