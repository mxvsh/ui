# Agent Guide

## Project Overview

This project is a small React UI library with a documentation website. The library provides reusable, themeable components built on design tokens, Tailwind CSS utilities, and a few focused dependencies such as Radix primitives and Lucide icons. The website documents the components with live examples, usage snippets, and component navigation.

Keep changes aligned with the existing system: compact APIs, composable primitives, token-driven styling, and examples that show realistic usage rather than decorative filler.

## Tooling

Use Bun for package management and scripts.

- Prefer `bun run` for scripts.
- Prefer `bunx` for one-off package executables.
- Do not introduce npm, pnpm, or yarn lockfiles.
- Keep generated or build output out of commits unless the project already tracks it for that workflow.

## Component Guidelines

Components should be small, typed React primitives that compose cleanly with standard HTML attributes. Follow the established patterns in nearby components before adding a new abstraction.

Use design tokens and existing utility conventions for color, borders, radii, shadows, spacing, and focus states. Avoid raw one-off colors unless the token system cannot express the need.

Prefer slots and subcomponents when a component has common structural regions. Keep component APIs conservative: add variants only when they represent meaningful design differences, not every possible visual tweak.

Accessibility matters. Use semantic HTML first, preserve native attributes, keep labels connected to controls, and make keyboard/focus behavior visible and predictable.

## Styling

The UI library is token-first. Component styles should reference CSS variables and shared utilities where possible so themes and docs render consistently.

When using custom utilities from the design system, make sure the consuming app imports the relevant CSS layer rather than working around missing styles inside individual components.

Keep examples responsive and stable. Avoid layouts where text wraps awkwardly, controls resize unpredictably, or content shifts because dimensions are implicit.

## Documentation And Stories

New or changed components should include both documentation examples and Storybook stories when the component has a visual surface or meaningful states.

Documentation examples should be realistic and polished. Show the default use first, then focused examples for variants, actions, media, or composition patterns. Keep snippets in sync with rendered previews.

Storybook stories should cover the main states and variants without duplicating every docs example verbatim. Use stories to make regressions easy to spot.

## Verification

Before handing off UI changes, run the narrowest relevant checks first, then broader checks when the change affects shared behavior.

Typical checks include package typechecking, docs typechecking, package builds, and Storybook builds for visual components. If a check fails because of an existing unrelated project issue, report it clearly and verify the changed area with the next best command.

## Commit Guidelines

Use short conventional commit messages when committing project changes.

Prefer one-line messages in the form `type: summary`, such as `feat: add card component`, `fix: correct card elevation`, or `docs: update agent guide`.

Choose the type based on the user-facing intent: `feat` for new capabilities, `fix` for bug fixes, `docs` for documentation-only changes, `refactor` for internal restructuring, `chore` for maintenance, and `test` for test-only changes.

Keep each commit focused. Stage only files related to the requested change, and avoid mixing unrelated formatting, generated output, or user work into the same commit.

## Git Hygiene

Do not revert unrelated work. The working tree may contain user changes or generated files from another task.

Stage only files related to the requested change. Use short commit messages when asked to commit.
