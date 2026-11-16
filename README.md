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


## Implemented visual inventory

The current branch contains more than the initial shared primitives. The implemented, documented and source-mapped families include:

- **Foundations:** scoped design tokens; Probability, Metallurgy, Home, Competition and Codeforces adapters; panels, cards, navigation cards, buttons, options, fields, chips, badges, tabs, segmented controls, stage selectors, sidebar links, metric cards and progress indicators.
- **Metallurgy:** chapter rows; course-browser toolbar, search, filters and empty state; archive sidebar navigation and progress; course heading and summary metrics.
- **Shared study utilities:** vertical and horizontal utility navigation; panel shell, controls/actions, toolbar, metrics, visual/legend slots, progress, weekly grid, history/question/item rows, empty state and goal form variants.
- **Probability:** practice-session question markers, timer, action bar, analysis dock, goal milestones and weekly status; native checkbox visual; test completion summary, result rows and test-history table; in-progress player composition.
- **Audit boundaries:** Probability chart SVGs, hierarchical test-scope selection, mistake classification, answer grading, timers, navigation, persistence, dashboard calculations and all application state remain owned by the live application.

## Verification status and remaining fidelity work

The contract suite checks token/adapter coverage, component selectors, parity of all five dark/light fixture pairs, unique IDs, source mappings, accessibility-related CSS constraints, documentation provenance and the Home/Competition light-canvas contrast contract. GitHub Actions is the authoritative recorded test result for each branch commit.

The preview is a static visual fixture across five section adapters in dark and light themes. It is not the live application and does not establish pixel parity. The remaining visual-validation milestone is a side-by-side browser comparison against the live application using matching content, state, theme and viewport. Production integration remains a separate review and is not part of this repository's current scope.


The dark/light fixtures now expose identical component-class inventories for all five sections; the contract also checks unique element IDs and explicit light-theme adapters. CI captures full-page Chromium renders plus viewport-level screenshots for each of the five sections at 1440px desktop and 390px mobile widths, then uploads them as a 14-day workflow artifact. These renders verify that the static fixture loads and lays out at both target widths; they are not a live-site screenshot comparison or a pixel-diff test.

The Home and Competition light fixtures explicitly use a light preview canvas; this is a fixture-only backdrop for readable inspection and does not change the production theme adapters.
