# Limitless Design System

An isolated workspace for developing a shared visual language for Limitless.

## Scope

This repository is for visual foundations only: design tokens, section-specific theme adapters, reusable visual components, documentation, and contract tests.

It must not become a second implementation of application behavior. Changes to learning logic, question content, scheduling, persistence, user data, routing, or application features belong in the main Limitless repository and require their own review.

## Current status

- The initial shared token contract is in `shared/design-system/tokens.css`.
- Five opt-in adapters are defined: Probability, Metallurgy, Home, Competition, and Codeforces.
- The stylesheet is deliberately not imported by any application. Existing application styles remain authoritative.
- The contract test is in `scripts/test-design-system-contract.mjs`.

## Development

Requires Node.js 18 or newer.

Run the contract check:

```sh
npm test
```

## Integration policy

Development happens here first. Nothing in this repository changes the live Limitless application. Integration into `guiltythreee/Limitless` must be a separate, explicitly reviewed step after visual and regression validation.

Preserve each section's established visual identity. Shared foundations should unify spacing, typography, geometry, motion, and component behavior without flattening section-specific palettes or artwork.

## Component foundation

The first opt-in primitives and their accessibility/variant contracts are documented in `docs/component-contracts.md` and implemented in `src/components.css`. They remain isolated from the live applications.

## Visual fixture

Open `preview/index.html` on the development branch to inspect the shared primitives across the five section adapters in dark and light samples. The fixture is static and isolated; it does not load production application code.

## Live-site visual fidelity

The current Limitless CSS is authoritative. See `docs/live-visual-source-map.md` for the exact source files and theme variables used by each adapter. See `docs/live-component-audit.md` for the first source-level comparison of live controls against the proposed primitives, including the known non-equivalences and migration blockers. See `docs/component-mapping-spec.md` for the proposed reusable pattern inventory and its semantic/adoption boundaries. The preview is a component-contract fixture, not a pixel-perfect screenshot claim. Existing app styles and artwork must remain unchanged until a separate, source-backed integration review.
