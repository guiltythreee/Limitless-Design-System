# Live component mapping specification

Status: proposed component vocabulary; no CSS replacement or application integration authorized.

This specification converts the first live-component audit into a practical component inventory. It separates patterns that look superficially similar but have different semantics, dimensions or interaction states.

## Design rules

1. The live section implementation remains the rendering authority.
2. Reuse a component only when markup semantics, interaction contract and visual geometry genuinely match.
3. Keep section adapters for palette and theme values; do not make one global palette.
4. Keep special controls as explicit variants or standalone patterns instead of forcing them into a generic button, tab or card.
5. Every component must support its actual native HTML semantics and preserve existing application behavior.
6. No production import is allowed during this specification stage.

## Proposed component inventory

| Proposed pattern | Suggested contract | Existing source patterns | Reuse boundary |
|---|---|---|---|
| Content panel | `.ds-panel` | Probability `.panel`; Metallurgy `.panel`; Codeforces `.cr-hero`, `.cr-ladder-section` | Shared border/surface language only; retain section-specific depth, blur, radius and padding |
| Content card | `.ds-card` | Probability `.card`; Metallurgy `.course-card`; Home `.learning-card`; Competition `.subject-card` | Do not collapse navigational cards, metric cards and content panels into one card contract |
| Navigation card | `.ds-navigation-card` | Home `.shortcut-card`; Metallurgy `.course-card`; Competition `.subject-card-link` | Must remain an anchor when it navigates; preserve icon/title/description/action layout |
| Metric card | `.ds-metric-card` | Competition `.overview-card`; Codeforces `.cr-stats article`, `.cr-focus-card`, `.cr-week-card` | Metric typography, number alignment and density differ by section |
| Action button | `.ds-button` | Probability `.btn-main`, `.btn-side`; Metallurgy `.btn`; Competition `.action-button`; Codeforces `.cr-refresh-button` | Use variants only where size, fill, focus and disabled states align; refresh action remains high-visibility |
| Selectable option | `.ds-option` | Probability `.optcard`; Metallurgy `.topic-card` | Distinct from action buttons; preserve selected/expanded state and option hit-area geometry |
| Form field | `.ds-field` | Probability `.field`; Metallurgy `.field input`; Competition form fields; Codeforces `.cf-quick-toolbar input/select` | Needs size, density, typography and theme variants; labels and error descriptions stay in markup |
| Metadata chip | `.ds-chip` | Probability `.chip`; Metallurgy `.chip`, `.chip-gold`, `.chip-trap`; Codeforces `.cf-chip` | Compact inline metadata; section palette and semantic variants remain explicit |
| Status/difficulty badge | `.ds-badge` | Probability `.dbadge` and difficulty variants; Metallurgy MT203 difficulty chips; Competition status markers | Do not conflate status, difficulty, selected state and ordinary metadata |
| Section navigation | `.ds-section-nav` | Probability `.subnav`; Home `.home-topbar nav` | Horizontal navigation links/buttons; overflow and active indicator differ |
| Semantic tablist | `.ds-tabs` | Probability `[data-study-mode-tabs]` | Use tablist/tab/tabpanel only when the complete interaction pattern exists |
| Segmented control | `.ds-segmented` | Probability `.probability-section-tabs` | Supports aria-pressed or current-page states; selected fill differs from underline tabs |
| Sidebar item | `.ds-sidebar-link` | Home `.side-link`; Competition `.competition-side-link` | Vertical navigation with active indicator; do not model as a wrapping horizontal nav row |
| Stage selector | `.ds-stage-option` | Codeforces `.cr-stage-tab` | Grid-based full-width selection with progress/metadata; not a tab strip |
| Progress indicator | `.ds-progress` | Competition `.progress-track`; Codeforces `.cr-progress`, `.cr-mini-track` | Keep data semantics and accessible value text in application markup |

## Contract requirements by pattern

### Content panel and content card

- Support a section-supplied background, border, radius and shadow without overriding the artwork layer.
- Expose padding as a consumer/layout concern or explicit size variant.
- Support optional backdrop blur, but do not apply blur universally.
- Allow nested content to shrink correctly with `min-width: 0`.
- Keep `section`, `article` or generic container semantics chosen by the consuming content.

### Navigation card

- Use an anchor for navigation; do not simulate navigation with a button.
- Preserve focus-visible styling and the complete clickable hit area.
- Support icon, title, supporting description and trailing action affordance.
- Preserve responsive wrapping and text truncation behavior from the live source.

### Metric card

- Separate label, primary value, unit/context and supporting copy.
- Support tabular numerals where the live display uses them.
- Do not assume every metric card is interactive.
- Preserve the section-specific grid density and light/dark contrast.

### Action button and selectable option

- Keep native button semantics for actions and choices.
- Define primary, secondary and quiet only where the live section has matching patterns.
- Define compact/standard/prominent sizing independently of visual variant.
- Disabled means genuinely non-activatable; a waiting state must remain distinguishable from disabled.
- Selectable options expose selected state semantically and retain their larger card-like target.
- Do not make every button pill-shaped or apply the same hover transform.

### Form field

- Pair each field with a persistent visible label.
- Keep placeholder text supplementary, not as the only label.
- Support text, search, select and multiline controls without erasing native control behavior.
- Support compact, standard and large geometry; allow monospace where the live control uses it.
- Expose invalid state through `aria-invalid` and associated textual feedback.
- Preserve visible focus in both themes.

### Metadata chip and status/difficulty badge

- Keep metadata, difficulty, status and selection as separate semantic categories.
- Support compact inline sizing and wrapping/truncation.
- Use explicit semantic variants with text labels; never encode state by colour alone.
- Preserve each section's typography, border and shape.

### Section navigation, tablist and segmented control

- Section navigation uses links or buttons according to the existing behavior; do not add tab roles to ordinary navigation.
- A tablist must implement keyboard navigation and the full tab/tabpanel relationship.
- A segmented control must expose its selected/current state with the semantics used by the existing component.
- Support horizontal overflow on narrow screens without shrinking the controls below their intended hit area.

### Sidebar item and stage selector

- Sidebar links belong in a labelled navigation landmark and preserve current-page semantics.
- Active state may include a gradient, inset marker or background; preserve these as section-specific treatments.
- Stage selectors are full-width selection controls with a structured grid and optional metadata/progress; they are not tabs.
- Preserve keyboard focus and native activation.

### Progress indicator

- The application owns the value and update logic.
- Provide accessible value text or progress semantics in markup.
- Keep track/fill geometry and colour section-specific.
- Never let a visual component own persistence or progress calculation.

## Section adoption map

| Section | Candidate reusable patterns | Keep bespoke |
|---|---|---|
| Probability | Content panel/card, field foundation, action button foundation, metadata foundation | Option cards, three tab/segmented patterns, difficulty badges, Probability-specific card depths and button sizing |
| Metallurgy | Panel foundation, course/navigation card foundation, field foundation, metadata foundation | Course/topic card behavior, chip variants, monospace fields, course-specific layout |
| Home | Navigation-card foundation, metric/card foundation | Sticky topbar, global search, sidebar layout, background artwork, shortcut-card hover/blur treatment |
| Competition | Panel/card foundation, field foundation, compact action foundation, sidebar-link foundation | Dashboard card groups, active sidebar indicator, responsive tracker layout, theme overrides |
| Codeforces | Panel/card foundation, progress foundation, field foundation | Account identity block, refresh action, stage selector, milestone cards, problem/contest explorer controls |

## Implementation order after approval

1. **Panel/card family:** define only the common structural API and prove that section adapters can preserve live depth and layout.
2. **Navigation cards and sidebar items:** keep anchor semantics and compare desktop/mobile behavior.
3. **Fields and action buttons:** add size variants and test focus/disabled/loading states.
4. **Chips and badges:** split semantic categories before adding variants.
5. **Tabs, segmented controls and stage selectors:** implement separate interaction contracts.
6. **Metrics and progress:** preserve application-owned data and accessibility semantics.

For every step, compare the actual production markup and styles against the proposed fixture at the same viewport, theme and interaction state. If a pattern cannot match without a large set of exceptions, keep it section-specific.

## Explicit non-goals

- No replacement of current application classes.
- No new application imports of this package.
- No redesign of any section.
- No changes to application state, persistence, routing, scheduling, analytics or question behavior.
- No assertion of visual parity based only on token aliases or a static fixture.
