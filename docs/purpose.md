# What is mxv-ui?

A small, opinionated React UI library built on Tailwind v4, radix-ui primitives,
and oklch design tokens. Distributed as a single npm package (`@mxv/ui`).

## Honest origin

mxv-ui started as the design system extracted from
[drivebase](https://github.com/mxvsh/drivebase) — a desktop-style file manager.
The base components (button, input, dialog, dropdown, popover, select, tooltip)
were already battle-tested there. Rather than reinvent them, this repo
generalizes the same components so they can be reused outside drivebase.

So: this isn't trying to displace shadcn or HeroUI. It's a personal library
that happens to be shareable. If it stays useful only to one person, that's
fine.

## What it is

- **A single npm package**: `bun add @mxv/ui`, then
  `import { Button } from "@mxv/ui"`. No CLI, no registry, no per-component
  packages.
- **Tailwind v4 native**: uses `@theme`, `@custom-variant`, and oklch CSS
  variables. No `tailwind.config.js` plugin needed on the consumer side beyond
  importing `@mxv/ui/globals.css`.
- **radix-ui under the hood**: accessibility, focus management, and keyboard
  behavior are inherited from radix's primitives.
- **Theming via CSS variables**: every color, radius, and shadow is a CSS var
  (`--bg`, `--accent`, `--radius-md`, `--shadow-md`). Override them in your
  own globals and the whole library follows.
- **React 19 only**: uses the new `radix-ui` umbrella package and React 19
  ref-as-prop patterns where relevant.

## What it isn't

- Not a sprawling component kit. The starter set is 7 components. New ones
  get added when actually needed, not speculatively.
- Not "headless." Components ship opinionated default styling. You restyle
  via tokens + className, not by replacing internals.
- Not a managed product. No release cadence, no support promises, no roadmap
  beyond "what drivebase needs next."

## When you'd pick it

- You like the drivebase visual style (compact, oklch-based, subtle).
- You want Tailwind v4 + React 19 with no legacy baggage.
- You want a small surface area to read end-to-end in 15 minutes.

## When you'd pick something else

- You want a polished, documented, maintained component library →
  **HeroUI** or **Radix Themes**.
- You want to own and freely edit the component source →
  **shadcn/ui**.
- You need 30+ components today → anything except this.

See [`vs-shadcn.md`](./vs-shadcn.md) and [`vs-heroui.md`](./vs-heroui.md) for
detailed comparisons.
