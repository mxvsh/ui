# mxv-ui vs shadcn/ui

These two libraries solve adjacent problems with very different philosophies.
Picking the wrong one for your situation is annoying to undo later.

## The fundamental difference: distribution

| | mxv-ui | shadcn/ui |
|---|---|---|
| Distribution | Single npm package | CLI copies source files into your repo |
| Source ownership | You don't own it | You own every component file |
| Updates | `bun update @mxv/ui` | Manual — diff + re-run CLI |
| Customization | Tokens + className + variants | Edit the file directly |
| Tree-shaking | Yes (ESM + sideEffects map) | N/A — only included files exist |
| Lock-in | Medium (depends on `@mxv/ui` API) | Zero (it's just your code) |

shadcn's whole pitch is "the components are yours." If you want to delete a
Dialog variant, rewrite Button to use a different motion library, or fork a
Select to be a Combobox — that's a normal Tuesday in shadcn. In mxv-ui you'd
have to fork the package or open a PR.

mxv-ui's pitch is the opposite: I shouldn't have 50 components scattered
across every repo I own, each with slightly-divergent fixes that never
make it back upstream. One package, one source of truth, one `bun update`.

## Stack differences

| | mxv-ui | shadcn/ui |
|---|---|---|
| React | 19 required | 18+ |
| Tailwind | v4 only | v3 (v4 in progress) |
| Token system | oklch CSS variables | HSL CSS variables |
| Variants | Plain TypeScript record (`tone`, `size`) | `class-variance-authority` (cva) |
| Primitives | `radix-ui` umbrella package | Individual `@radix-ui/react-*` packages |
| Icons | `lucide-react` (peer) | `lucide-react` |

Two practical consequences:

1. **oklch vs HSL.** mxv-ui uses oklch for perceptually-uniform color stops.
   When you build hover/active states by tweaking lightness, you get visually
   consistent results across hues — HSL can't do that.
2. **No cva.** mxv-ui variants are just `Record<Tone, string>` maps. Less
   indirection, slightly less ergonomic for compound variants. If your design
   system has heavy compound-variant logic (size × disabled × loading),
   shadcn's cva pattern scales better.

## Component coverage

shadcn ships 40+ components. mxv-ui ships 7 (button, input, dialog,
dropdown-menu, popover, select, tooltip). That's not a forever-state, but it's
the honest current state.

## Which to pick

- **Need lots of components, want to own the source, comfortable with manual
  update flow** → shadcn/ui.
- **Want one package you can `bun update`, don't care about owning the source,
  fine with a tiny surface area** → mxv-ui.
- **Building a design system for a team** → shadcn/ui scales better here too
  because the team naturally diverges from upstream and that's fine.
- **Building your own apps for yourself** → mxv-ui is less work to maintain.

There's no shame in starting with shadcn and copying the parts you like into
your own `@yourorg/ui` package later. That's basically how mxv-ui happened.
