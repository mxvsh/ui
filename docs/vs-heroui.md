# mxv-ui vs HeroUI

HeroUI (the library formerly known as NextUI) is the closest neighbor to
mxv-ui in spirit — both are single-package, npm-installed, opinionated React
component libraries. The differences are smaller and more technical than the
shadcn comparison.

## Distribution model

Effectively identical:

```sh
# HeroUI
bun add @heroui/react
import { Button } from "@heroui/react"

# mxv-ui
bun add @mxv/ui
import { Button } from "@mxv/ui"
```

Both ship as ESM, both rely on tree-shaking. HeroUI additionally publishes
per-component packages (`@heroui/button`, `@heroui/dialog`, ...) for projects
that want the absolute minimum bundle. mxv-ui doesn't — single package only.

## Stack differences

| | mxv-ui | HeroUI |
|---|---|---|
| Accessibility primitives | **radix-ui** | **react-aria** (Adobe) |
| Styling approach | Tailwind v4 + CSS variables in `className` | `tailwind-variants` + theme plugin |
| Tailwind version | v4 only | v3 today, v4 migration in progress |
| Token format | oklch | HSL via theme plugin |
| Theming | Override CSS variables in your `globals.css` | Configure via HeroUI provider + tailwind plugin |
| Bundle baseline | ~20 KB (7 components, gzipped less) | Larger — broader API surface |
| Dark mode | `.dark` class toggle | `.dark` class toggle (same) |

The two **non-obvious** differences worth understanding:

### radix-ui vs react-aria

These are different schools of thought about accessibility primitives.

- **radix-ui**: unstyled, headless, dom-first. You compose `Trigger`,
  `Content`, `Portal` yourself. Lower-level. Smaller learning curve if you
  know HTML/ARIA.
- **react-aria**: hooks-based, state-machine-driven, framework-agnostic. More
  abstraction. Stronger guarantees around screen-reader behavior across
  browsers, especially in complex widgets (combobox, table, date picker).

For dialogs, dropdowns, popovers, tooltips — both are excellent. For
calendars, comboboxes, data tables — react-aria is generally considered
better-tested. mxv-ui sticks with radix-ui because drivebase did, and because
the radix-ui umbrella package is genuinely pleasant to work with under
React 19.

### `className` + CSS vars vs `tailwind-variants`

HeroUI components accept a `classNames` prop with slot-keyed strings:

```tsx
<Button classNames={{ base: "bg-purple-500", icon: "text-white" }}>
```

mxv-ui components accept a single `className` and expose theming via CSS
variables you override globally:

```css
:root { --accent: oklch(0.6 0.22 295); } /* purple-ish */
```

HeroUI's approach is more granular per-instance. mxv-ui's is simpler and
encourages a global design language over per-component overrides. Neither is
strictly better.

## Component coverage

HeroUI: ~30+ components, mature, documented, tested.
mxv-ui: 7 components, undocumented beyond Storybook.

This is the biggest practical difference. If you need a `Calendar`, `Table`,
`Autocomplete`, `Slider`, `Switch`, `Tabs`, `Accordion`, `Pagination` — HeroUI
has them today, mxv-ui doesn't and won't until they're needed in a real
project.

## Maturity and trust

HeroUI has a team, a docs site, semver discipline, an issue tracker, RSC
support, framework integrations (Next, Remix, Astro), and tens of thousands of
production deployments.

mxv-ui has me. Pre-1.0. No release cadence. Breaking changes are likely.

## Which to pick

- **Production app, team of developers, need broad component coverage** →
  HeroUI. No contest.
- **react-aria-quality accessibility for complex widgets** → HeroUI.
- **Hobby project, prefer radix-ui, want Tailwind v4 today** → mxv-ui is
  fine.
- **You're me** → mxv-ui, because I built it.

If HeroUI ever fully ships its Tailwind v4 migration and you don't mind the
react-aria style of composition, the case for mxv-ui mostly evaporates for
third parties. The honest niche this library serves is "drivebase's design
system, but reusable."
