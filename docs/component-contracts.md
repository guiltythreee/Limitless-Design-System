# Component contracts

This document defines the first portable visual primitives. It is a design contract, not permission to replace existing application components. The CSS in `src/components.css` is opt-in and is not imported by any Limitless application.

## Non-negotiable constraints

- Preserve the established identity of each section. Probability keeps its parchment/gold treatment; Metallurgy keeps its materials-science blue treatment; Home keeps its artwork; Competition and Codeforces retain their own dashboard skins.
- Components consume semantic `--ds-*` tokens. They must not hard-code a section palette.
- All selectors must remain scoped below `[data-limitless-design]`. No global element styling, resets, `:root`, universal selectors, or stylesheet imports.
- These primitives own presentation only. They must not own application state, routing, persistence, question logic, scheduling, analytics, or data fetching.
- Prefer native HTML semantics and existing application behavior. A visual migration must preserve keyboard operation, labels, focus order, and accessible names.

## Initial component inventory

| Primitive | Class contract | Variants / states | Required semantics |
|---|---|---|---|
| Button | `.ds-button` | `--primary`, `--secondary`, `--quiet`; hover, active, focus-visible, disabled | Use a native `button` for actions and an `a` for navigation. Never fake disabled state without preventing activation. |
| Surface / card | `.ds-surface` | default, `--raised` | Use a meaningful section, article, or generic container according to content; do not add interactive behavior to a card by default. |
| Field | `.ds-field` | default, focus-visible, invalid | Pair with a persistent visible label; communicate errors in text, not color alone. |
| Tabs | `.ds-tabs`, `.ds-tab` | selected, focus-visible, horizontal overflow | Use tablist/tab/tabpanel roles only when implementing the full tab interaction pattern; otherwise use ordinary navigation links. |
| Badge | `.ds-badge` | neutral by default | Use for concise status or metadata, not as a substitute for headings or explanatory text. |
| Navigation | `.ds-nav`, `.ds-nav-link` | current page, focus-visible | Place inside a labelled navigation landmark; mark the current destination with `aria-current="page"`. |

## Interaction and accessibility rules

- Keyboard focus must remain visible against every section palette.
- Disabled controls must be non-activatable and visibly distinct. Use native `disabled` wherever possible.
- Selected tabs and current navigation destinations must expose their state semantically, not only through color.
- Invalid fields use `aria-invalid="true"` and an associated textual error description.
- Interactive targets must not rely on hover alone. Touch and keyboard users receive equivalent functionality.
- Respect reduced-motion preferences in any future animation layer. Keep current transitions short and non-essential.

## Sizing and composition

- Standard control height is `--ds-control-height-md`; compact navigation may use `--ds-control-height-sm`.
- Spacing, radii, typography, and motion come from the shared token contract.
- Components must be fluid by default: allow text wrapping, constrain overflow locally, and avoid fixed widths unless a consuming layout explicitly requires one.
- The primitives provide baseline structure only. Section-specific layout and artwork remain owned by their existing applications.

## Adoption sequence

1. Validate these primitives in an isolated visual fixture for each section adapter.
2. Compare screenshots against the current live section at desktop and mobile widths.
3. Run the consuming application's existing regression suite.
4. Propose integration as a separate review. Do not import these files into production as part of work in this repository.
