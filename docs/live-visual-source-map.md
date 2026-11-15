# Live visual source map

The live Limitless application is the visual source of truth. The design-system repository must mirror its existing values and preserve its existing section-specific rendering. Do not infer a new palette or replace section-specific controls with a generic appearance.

This map was checked against the current `main` branch of `guiltythreee/Limitless`.

## Theme adapter sources

| Adapter | Authoritative source | Values that must remain authoritative |
|---|---|---|
| Probability | `probability-source/app/globals.css` | `--ink`, `--panel-bg`, `--chip`, `--body`, `--paper`, `--dim`, `--gold`, `--goldhi`, `--panel-line`, `--ok`, `--ongold`, `--page-bg`; both `:root` and `:root[data-theme="light"]` |
| Metallurgy | `metallurgy-source/app/globals.css` | Same semantic variable names, but Metallurgy's own blue palette, page gradient, panel gradient, border, and light-theme values |
| Home | `home-dashboard.css` plus `hub-theme.css` | `--home-panel`, `--home-panel-strong`, `--home-border`, `--home-ink`, `--home-muted`, `--home-blue`; artwork and background layers remain owned by the existing theme engine |
| Competition | `competition/competition.css` and `competition/competition-dashboard.css` | Effective dashboard values from the later-loaded dashboard stylesheet: `--comp-panel`, `--comp-border`, `--comp-muted`, `--comp-ink`, `--comp-accent`; retain the existing `html[data-theme="light"]` overrides |
| Codeforces | `codeforces-red/codeforces-red.css` | Existing literal dark/light palette, panel fills, borders, typography, and component-specific rules |

## Fidelity rules

1. Theme adapters alias the actual application variables. Do not substitute guessed hex values when an application variable exists.
2. Probability and Metallurgy share variable names, not palette values. Never flatten their palettes into one.
3. Home's canvas is transparent because the existing shared artwork/theme engine paints the page background. The adapter must not replace that artwork.
4. Competition's effective values come from its dashboard stylesheet, which is loaded after the older tracker stylesheet. Do not accidentally map the superseded gold palette.
5. Codeforces has component-specific literal colors and light-mode overrides. Keep these explicit until they are safely represented by source-backed tokens.
6. Generic primitives are not pixel-equivalent replacements for every existing control. A component may be integrated only after its section-specific implementation is mapped to the actual live component rules. Do not replace existing controls merely because a generic `.ds-*` class exists.
7. No application should import this repository during this isolated phase. Integration is a separate reviewed change.

## Current verification boundary

Source-level token aliases can be checked against the live CSS declarations. That proves the aliases point to the correct variables; it does not prove pixel-level equivalence of every component. The latter requires comparing the actual component rules or rendering the same markup with the same styles. Do not describe the generic component fixture as an exact screenshot of the live website.
