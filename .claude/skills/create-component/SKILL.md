---
name: create-component
description: Scaffold a new UI component in the @mxv/ui library. Creates the component, barrel index, Storybook stories, and docs MDX page, then wires it into the package exports. Use when asked to add, create, or build a new component.
argument-hint: <component-name> [radix-primitive?]
allowed-tools: Bash Write Edit Read
---

# Create Component: `$ARGUMENTS`

Parse `$ARGUMENTS` as: `<ComponentName> [RadixPrimitive]`

- `ComponentName` — PascalCase name of the new component (e.g. `Badge`, `Tabs`, `Avatar`)
- `RadixPrimitive` — optional, the Radix primitive to wrap (e.g. `Tabs`, `Avatar`). If not given, decide based on the component type.

---

## Project conventions to follow exactly

### Folder layout

```
packages/ui/src/components/<kebab-name>/
  <kebab-name>.tsx          ← component implementation
  <kebab-name>.stories.tsx  ← Storybook stories
  index.ts                  ← barrel: export * from "./<kebab-name>"
```

Docs page:
```
apps/www/content/docs/components/<kebab-name>.mdx
```

### Styling rules

- Use only CSS variable tokens — never raw hex or hardcoded colors
- Available tokens: `--bg`, `--bg-subtle`, `--bg-muted`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--border-strong`, `--ring`, `--accent`, `--accent-fg`, `--accent-soft`, `--accent-soft-fg`, `--danger`, `--danger-fg`, `--success`, `--success-fg`, `--popover`, `--popover-fg`, `--popover-border`
- Available radii: `--radius-sm` (6px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-xl` (16px)
- Available shadows: `shadow-elevation-sm`, `shadow-elevation-md`, `shadow-elevation-lg` (Tailwind utilities)
- Focus ring pattern: `focus-visible:outline-none focus-visible:border-[var(--ring)] focus-visible:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)]`
- Disabled pattern: `disabled:pointer-events-none disabled:opacity-50`
- Import `cn` from `@/lib/cn`
- Package is published as `@mxv/ui`

### Radix usage

- Import from `radix-ui` (the bundled package), not from individual `@radix-ui/*` packages
- Example: `import { Tabs as RadixTabs } from "radix-ui"`
- Use `ComponentPropsWithoutRef<typeof Radix*.Something>` for prop types

### Component authoring rules

- Use `forwardRef` for leaf HTML elements; use plain functions for Radix wrappers
- Extend native HTML attributes or the relevant Radix component props
- Keep APIs minimal — only add variants that represent meaningful design differences
- Use semantic HTML first; add `aria-*` attributes where native semantics fall short
- No `cursor-pointer` on interactive components — use the browser default

### Storybook stories

- `title: "Components/<ComponentName>"`
- Always include: `Default`, `Disabled` (if applicable), `WithLabel` or a composition story
- Add variant stories only for meaningful visual differences

### Docs MDX

- Frontmatter: `title` and `description`
- First block: `<Preview>` showing the default use, then a fenced `tsx` code block
- Subsequent sections for variants, composition, disabled, etc.
- End with a `## Props` table

---

## Steps to execute

1. **Check** `packages/ui/src/components/` to see existing components for reference
2. **Create** `packages/ui/src/components/<kebab-name>/<kebab-name>.tsx`
3. **Create** `packages/ui/src/components/<kebab-name>/<kebab-name>.stories.tsx`
4. **Create** `packages/ui/src/components/<kebab-name>/index.ts` (barrel)
5. **Edit** `packages/ui/src/index.ts` — append `export * from "@/components/<kebab-name>"`
6. **Create** `apps/www/content/docs/components/<kebab-name>.mdx`
7. **Run** `bun run --cwd packages/ui typecheck 2>&1 | grep -v "vite.config"` and fix any errors

Do all steps. Do not ask for confirmation between steps.
