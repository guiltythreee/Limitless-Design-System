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
| Button | `.ds-button` | `--primary`, `--secondary`, `--quiet`, `--compact`, `--prominent`, `--full`; hover, active, focus-visible, disabled, busy | Use a native `button` for actions and an `a` for navigation. Never fake disabled state without preventing activation. |
| Panel | `.ds-panel` | default, `--flush` | Use for a grouped content region; padding, radius, shadow and blur are section-adaptable tokens. |
| Content card | `.ds-card` | default, `--flat` | Use for self-contained information; it is not interactive by default. |
| Navigation card | `.ds-navigation-card` | hover, focus-visible | Use an anchor for navigation; preserve the complete clickable hit area and current-destination semantics. |
| Legacy surface | `.ds-surface` | default, `--raised` | Retained for compatibility with the original primitive contract; new work should choose panel, content card or navigation card explicitly. |
| Field | `.ds-field` | default, `--compact`, `--monospace`, focus-visible, invalid | Pair with a persistent visible label; communicate errors in text, not color alone. |
| Tabs | `.ds-tabs`, `.ds-tab` | selected, focus-visible, horizontal overflow | Use tablist/tab/tabpanel roles only when implementing the full tab interaction pattern; otherwise use ordinary navigation links. |
| Segmented control | `.ds-segmented`, `.ds-segmented-option` | pressed/current, focus-visible | Use buttons with `aria-pressed` for mutually exclusive toggles or links with current-page semantics for navigation; do not assign tab roles by appearance alone. |
| Stage selector | `.ds-stage-selector`, `.ds-stage-option` | active/current step, focus-visible | Use native buttons for stage selection; expose the selected stage semantically and keep stage metadata in child elements. |
| Metric card | `.ds-metric-card` and label/value/detail elements | tabular value, responsive wrapping | Keep metric data and formatting in the application; use labels and visible units/context. |
| Progress | `.ds-progress` | standard, thin; reduced motion | The application owns progress calculation and value; expose progressbar semantics and an accessible value description in markup. |
| Metadata chip | `.ds-chip` | selected, accent, success, warning, danger | Use for compact metadata or filter tags; selected state must be exposed semantically by the consuming control. |
| Status/difficulty badge | `.ds-badge` | neutral, success, warning, danger, easy, medium, hard | Use for concise status or difficulty metadata; the text label must communicate meaning without colour. |
| Navigation | `.ds-nav`, `.ds-nav-link` | current page, focus-visible | Place inside a labelled navigation landmark; mark the current destination with `aria-current="page"`. |
| Sidebar navigation | `.ds-sidebar`, `.ds-sidebar-link` | active/current page, horizontal layout modifier, focus-visible | Use anchors inside a labelled navigation landmark; preserve current-page semantics and section-specific active indicators. |

## Metrics and progress

- Metric cards provide label, primary value and optional supporting detail slots. The application owns the value, units, formatting and data source.
- Progress is a visual track/fill only. The consuming application must supply the current value and accessible progress semantics (for example `role="progressbar"` with minimum, maximum and current values).
- Never calculate, persist or infer completion inside the visual component.
- Reduced-motion preferences must disable non-essential fill transitions.

## Tabs, segmented controls and stage selectors

- `.ds-tabs` and `.ds-tab` are reserved for a real tablist with the associated keyboard and tabpanel behavior. CSS only styles the visual state; the consuming application implements roving focus and activation.
- `.ds-segmented` is a separate visual family. Its options are buttons or links with the correct pressed/current semantics; it is not automatically a tablist.
- `.ds-stage-selector` is a structured list of stage buttons. Each option can contain an index/icon, a title/description block and trailing status metadata. It is not a tab strip.

## Chips and badges

- Chips represent compact metadata or filter tags. Use `--selected` only when the containing control also exposes its selected state semantically.
- Badges represent status or difficulty labels; they are not controls.
- Difficulty and status variants map through section tokens. Do not infer that the same colour carries identical meaning in every section.
- Keep the visible label present so meaning is not conveyed by colour alone.

## Buttons and fields

- Button geometry is configurable through section tokens; compact, standard and prominent sizes are separate from primary/secondary/quiet visual variants.
- `--full` is a layout modifier. `aria-busy="true"` indicates an in-progress action but does not disable it; use native `disabled` when activation must be prevented.
- Fields support compact geometry and monospace text without changing their native input/select/textarea semantics.
- Labels, descriptions, validation messages and application-owned values remain in the consuming markup.

## Sidebar navigation

- `.ds-sidebar` provides a vertical navigation list by default. The `--horizontal` modifier supports a horizontally scrolling list when the consuming layout chooses that orientation.
- `.ds-sidebar-link` is an anchor for navigation, not a button. Use `aria-current="page"` for the current destination; the legacy `.active` class is supported for gradual migration.
- Icon and label are separate child elements; the first child receives the configured icon width and accent colour.
- Active backgrounds, inset indicators, spacing and typography are section-adaptable tokens. The component does not position or size the sidebar container; fixed/sticky layout remains owned by the application.

## Panel and card family

- A panel groups related content and may carry section-specific backdrop blur and elevation. Its padding can be overridden by the consuming layout.
- A content card presents one self-contained unit of information. It is not clickable unless its content contains a native interactive element.
- A navigation card must be an anchor, not a clickable `div` or button used for routing. Its hover treatment is optional and must not be required to understand the destination.
- Panel, content-card and navigation-card geometry is mapped through section adapter variables. These defaults are structural foundations, not claims of pixel-equivalence.
- Do not use a generic card to replace special live patterns such as Probability option cards, Metallurgy topic selectors, Home shortcut cards, Competition metric cards or Codeforces milestones until each receives a dedicated source-backed variant.

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


## Live-site fidelity boundary

These primitives define a portable API and baseline behavior; they are not claimed to be pixel-equivalent replacements for every existing Limitless control. The live visual source map in `docs/live-visual-source-map.md` identifies the authoritative application styles. Do not migrate or replace an existing control until its exact section-specific styling and responsive rules have been mapped. Existing markup and CSS remain the visual authority.
