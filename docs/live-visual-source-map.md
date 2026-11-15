# Live visual source map

The live Limitless application is the visual source of truth. The design-system repository must mirror its existing values and preserve its existing section-specific rendering. Do not infer a new palette or replace section-specific controls with a generic appearance.

This map was checked against `guiltythreee/Limitless` main. The exact source blobs inspected are recorded below so the audit can be repeated against a later production revision.

## Theme adapter sources

| Adapter | Authoritative source | Values that must remain authoritative |
|---|---|---|
| Probability | `probability-source/app/globals.css` | `--ink`, `--panel-bg`, `--chip`, `--body`, `--paper`, `--dim`, `--gold`, `--goldhi`, `--panel-line`, `--ok`, `--ongold`, `--page-bg`; both `:root` and `:root[data-theme="light"]` |
| Metallurgy | `metallurgy-source/app/globals.css` | Same semantic variable names, but Metallurgy's own blue palette, page gradient, panel gradient, border, and light-theme values |
| Home | `home-dashboard.css` plus `hub-theme.css` | `--home-panel`, `--home-panel-strong`, `--home-border`, `--home-ink`, `--home-muted`, `--home-blue`; artwork and background layers remain owned by the existing theme engine |
| Competition | `competition/competition.css` and `competition/competition-dashboard.css` | Effective dashboard values from the later-loaded dashboard stylesheet: `--comp-panel`, `--comp-border`, `--comp-muted`, `--comp-ink`, `--comp-accent`; retain the existing `html[data-theme="light"]` overrides |
| Codeforces | `codeforces-red/codeforces-red.css`, `codeforces-red/codeforces-problems.css`, and `codeforces-red/codeforces-contests.css` | Existing literal dark/light palette, panel fills, borders, typography, and component-specific rules across the dashboard and explorer surfaces |

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


## Audited source revisions

| Source file | Blob SHA inspected on `main` |
|---|---|
| `probability-source/app/globals.css` | `0aa9402b923679cb62c5139e86f83152716da12f` |
| `metallurgy-source/app/globals.css` | `a04e345f7e366c3efbdf234f8ed2b1e37d80d5e5` |
| `home-dashboard.css` | `f12a90f404a831677760109303325d11dce81663` |
| `hub-theme.css` | `c2bc5221992545a386a00adc7fb07865683fe290` |
| `competition/competition.css` | `24c4670d02284e212cd5858863b875e9af4e8163` |
| `competition/competition-dashboard.css` | `20f249b68d4e2f912820e63bb51f926a9a191f5d` |
| `codeforces-red/codeforces-red.css` | `38269749f98415773759e6dbfa2f5ca298a02beb` |
| `codeforces-red/codeforces-problems.css` | `4437e7f0b927443b2ec2f59e2c87bec6ea72b912` |
| `codeforces-red/codeforces-contests.css` | `ebfad0f4a1a8aab2682da5ee46af91e2a181ac30` |

If any of these source files changes, re-audit the corresponding adapter before describing it as live-source-aligned.
