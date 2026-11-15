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
| Content panel | `.ds-panel` | Probability `.panel`; Metallurgy `.panel`; Home `.dashboard-panel`; Competition shared panel family; Codeforces `.cr-hero`, `.cr-ladder-section` | Implemented as a structural foundation; retain section-specific depth, blur, radius and padding |
| Content card | `.ds-card` | Probability `.card`; Metallurgy course-card content; Home `.learning-card`; Competition `.subject-card`; Codeforces `.cr-focus-card` | Implemented as a structural foundation; do not collapse navigational cards, metric cards and content panels into one card contract |
| Navigation card | `.ds-navigation-card` | Home `.shortcut-card`; Metallurgy course links; Competition `.subject-card-link` | Implemented as an anchor-only foundation; preserve icon/title/description/action layout and section-specific hover treatment |
| Probability test completion summary | `.ds-test-result-summary` | Centered completion eyebrow, large serif/gold score, muted correct/answered/time line; 18px source card radius and 1.3rem padding | Keep score and metadata application-supplied |
| Probability test result row | `.ds-test-result-row` | 24px index, 20px centered status mark, flexible two-line question, muted elapsed time; 1px gold-tinted dividers | Keep status symbol/colour and question/time values application-supplied |
| Probability test history | `.ds-test-history` | Compact uppercase muted header, horizontal scroll wrapper, 460px minimum table width, divided body rows | Native table structure and responsive wrapper remain app-owned |
| Metric card | `.ds-metric-card` | Competition `.overview-card`; Codeforces `.cr-stats article`, `.cr-focus-card`, `.cr-week-card` | Implemented with label/value/detail slots and section typography tokens; metric data remains application-owned |
| Action button | `.ds-button` | Probability `.btn-main`, `.btn-side`; Metallurgy `.btn`; Competition `.action-button`; Codeforces `.cr-refresh-button` | Implemented with independent compact/prominent sizing; use variants only where fill, focus and disabled states align; refresh action remains high-visibility |
| Chapter row | `.ds-chapter-row` | Metallurgy `CourseChapterBrowser` `.cb-chapter` | Implemented with source-mapped desktop/mobile grid, divider, hover fill, number, progress, metrics and arrow slots |\n| Selectable option | `.ds-option` | Probability `.optcard`; Metallurgy `.topic-card` | Implemented as a dedicated choice surface; Probability geometry is source-mapped, while Metallurgy topic-card parity remains section-specific and unverified |
| Checkbox control | `.ds-checkbox` | Probability test setup native 16px checkbox with gold accent | Visual treatment only; keep native checkbox appearance and its application-provided checked/mixed/disabled state |
| Form field | `.ds-field` | Probability `.field`; Metallurgy `.field input`; Competition form fields; Codeforces `.cf-quick-toolbar input/select` | Implemented with compact and monospace variants; labels and error descriptions stay in markup |
| Metadata chip | `.ds-chip` | Probability `.chip`; Metallurgy `.chip`, `.chip-gold`, `.chip-trap`; Codeforces `.cf-chip` | Implemented with selected/accent/success/warning/danger semantics; section palette and density remain tokenized |
| Status/difficulty badge | `.ds-badge` | Probability `.dbadge` and difficulty variants; Metallurgy MT203 difficulty chips; Competition status markers | Implemented with neutral/status/difficulty variants; do not conflate status, difficulty, selected state and ordinary metadata |
| Section navigation | `.ds-section-nav` | Probability `.subnav`; Home `.home-topbar nav` | Horizontal navigation links/buttons; overflow and active indicator differ |
| Semantic tablist | `.ds-tabs` | Probability `[data-study-mode-tabs]` | Use tablist/tab/tabpanel only when the complete interaction pattern exists |
| Segmented control | `.ds-segmented`, `.ds-segmented-option` | Probability `.probability-section-tabs` | Implemented as a separate family with selected fill, section token mapping and pressed/current states; not a tablist |
| Sidebar item | `.ds-sidebar-link` | Home `.side-link`; Competition `.competition-side-link` | Implemented as an anchor foundation with active/current states and section tokens; container positioning and responsive orientation remain application-owned |
| Stage selector | `.ds-stage-selector`, `.ds-stage-option` | Codeforces `.cr-stage-tab` | Implemented as a grid-based full-width selection with structured metadata and Codeforces theme mapping; not a tab strip |
| Progress indicator | `.ds-progress` | Competition `.progress-track`; Codeforces `.cr-progress`, `.cr-mini-track` | Implemented as track/fill styling with section geometry tokens; data semantics and accessible value text remain application-owned |

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


## Metallurgy course-browser controls — source follow-up

| Live selector | Proposed visual contract | Source-backed behavior boundary |
|---|---|---|
| .cb-toolbar | .ds-course-toolbar | Flex toolbar; stacks vertically at 850px |
| .cb-search | .ds-course-search | Search input; label and query state stay in application markup |
| .cb-filters | .ds-course-filters | Native selects; unit filter is conditional on available units |
| .cb-list-head | .ds-course-list-head | Shows filtered row count against total; secondary descriptor hides at 520px |
| .cb-empty | .ds-course-empty | Empty-results message only |

The live CourseChapterBrowser.tsx owns filtering and sorting. Search matches topic title or ID (case-insensitive); status options are all, not started, in progress, completed and weak; weak means at least one attempt and accuracy below 60%. Sort options are chapter order, name, least progress and question count. The visual primitives must not duplicate or implement this logic.


## Metallurgy archive sidebar navigation — source follow-up

| Live selector | Proposed contract | Source mapping |
|---|---|---|
| .ch-item | .ds-course-nav-item | Native button; 34px number column; 10px radius; transparent/hover/active states |
| .ch-num | .ds-course-nav-number | 32px bordered tile; exam variant uses amber |
| .ch-title | .ds-course-nav-title | 0.85rem title, 1.3 line height |
| .ch-meta | .ds-course-nav-meta | Inline progress and percentage |
| .ch-bar / .ch-pct | .ds-course-nav-progress / .ds-course-nav-percent | 4px track and application-supplied percentage |

This sidebar is a different component from the chapter-browser row. Preserve the existing button semantics and aria-current page/location states; do not turn these controls into anchors or generic sidebar links.


## Course heading, summary and study utility navigation

| Live selector/component | Proposed contract | Source mapping |
|---|---|---|
| `.cb-heading` | `.ds-course-heading` | Metallurgy course title panel; stacks at 850px |
| `.cb-eyebrow`, heading title and description | `.ds-course-heading__eyebrow/title/description` | Source typography and semantic hierarchy |
| `.cb-summary` | `.ds-course-summary` | Flex group of four source-owned course totals |
| `.cb-summary span/strong/small` | `.ds-course-summary__item/value/label` | Inset metric tiles with tabular values |
| `createStudyUtilityNav` / `.study-utility-nav` | `.ds-study-utility-nav` | Shared native-button utility navigation |
| `.probability-utility-nav` | `.ds-study-utility-nav--horizontal` | Probability compact horizontal variant |

The utility navigation is already shared production infrastructure. The design-system mapping documents its visual contract only; it does not replace the production component or its callback/state boundary.


## Study utility panel family

| Proposed pattern | Live source | Reuse boundary |
|---|---|---|
| Utility panel frame/header | `.study-utility-panel`, `__header`, `__heading`, `__title`, `__description`, `__count`, `__content` | Structure and geometry only; theme values remain supplied by the section adapter |
| Compact utility controls/actions | `.study-utility-control`, `.study-utility-action` | Native input/button semantics and all application behavior remain with the consumer |
| Toolbar and metric group | `.study-utility-toolbar`, `.study-utility-metrics`, `.study-utility-metric` | Layout only; metric values and calculations remain application-owned |
| Visual, legend and progress | `.study-utility-visual`, `.study-utility-legend`, `.study-utility-progress` | Chart data, colour meaning and progress values remain application-owned |
| Weekly grid | `.study-utility-week-grid`, `.study-utility-week-cell` | Seven-column layout only; day-state rendering and data remain with the course |
| Rows, empty state and form | `.study-utility-row`, `.study-utility-empty`, `.study-utility-form` | Content, empty-state decisions, validation and callbacks remain application-owned |

The live source stylesheet is `shared/studies/study-utility-nav.css`. These are presentation contracts; they do not replace the production stylesheet or the course-owned Bookmarks, Activity History, Mistakes or Daily Goals panels.


### Panel variant source mapping

| Panel | Source structure / exceptions | State boundary |
|---|---|---|
| Bookmarks | Header count is in the description, no count badge; item rows may expose Open and Remove; unavailable saved IDs remain visible; instructional empty state | Bookmark collection, topic resolution and callbacks stay in course |
| Activity History | Period + mode native-select toolbar; four summary metrics; seven-day stacked correct/incorrect chart; detailed attempt rows; filtered empty state | Filtering, aggregation, chart heights and attempt data stay in course |
| Mistakes | Activity History's alternate view; category count tiles, mastery and recurring-error summaries, ranked revision queue, per-attempt category and reviewed actions | Classification storage, analysis, ranking and review timestamps stay in course/shared study logic |
| Daily Goals | Two wider goal metrics; weekly seven-day goal grid; numeric 1–200 target form; goal-dependent progress colour | Goal limits, daily totals, streaks, week states and form callback stay in course |

The family shares its shell and primitives, not identical panel composition. Retain the question-row divider and overview-progress variants where the live source uses them.


## Probability practice-session controls

| Live source pattern | Design-system contract | Reuse boundary |
|---|---|---|
| `.qnum`, `.qnum-correct`, `.qnum-incorrect`, `.qnum-partial`, `.qnum-cur` | `.ds-practice-question-marker` state modifiers | Button semantics, status and current index remain application-owned |
| `.timerpill` | `.ds-practice-timer` | Timer value and lifecycle remain application-owned |
| `.actionbar`, `.btn-main`, `.btn-side` | `.ds-practice-actionbar` primary/secondary slots | Sticky layout only; actions and state remain with player |
| `.floating-analysis` | `.ds-practice-analysis-dock` | Dock geometry only; analysis navigation remains with consumer |
| `.mile`, `.mile-fill`, `.mile-node`, `.mile-node-on` | `.ds-practice-goal-milestones` | Goal calculation and milestone state remain with dashboard |
| `.weekcol`, `.weekcol-met`, `.weekcol-today` | `.ds-practice-week-status` | Daily counts and state remain with dashboard |

These controls complement, rather than replace, the existing shared learning-player shell and selectable-option primitives.


### Probability chart and review mapping

| Live source | Existing contract / boundary | Ownership |
|---|---|---|
| `Charts.tsx: DiffBars` | Existing utility panel shell and visual content slot; SVG plot is not extracted as a generic chart component | SVG geometry, scaling, difficulty data, hover tooltip and labels remain Probability-owned |
| `Charts.tsx: DayBars` | Existing utility visual and legend layout only | Daily series, correct/incorrect stacking, goal reference line, axes and date labels remain Probability-owned |
| `Practice.tsx: learning-player-feedback` | Shared learning-player feedback primitive | Result text, correctness state and Probability colour treatment remain consumer-owned |
| `Practice.tsx: learning-player-review / learning-player-solution` | Shared learning-player review and solution layout | Explanation rendering/content and review visibility remain consumer-owned |
| Mistake classification section | No generic behavior contract added | Category definitions, selection, persistence and revision analysis remain application/shared-study-owned |

The charts are deliberately documented as application-owned SVGs. Do not infer a reusable chart API from the fact that they sit inside shared utility panels.


### Probability test setup selection boundary

The Probability test setup uses a hierarchical native-checkbox picker: a chapter checkbox selects its topic children and can represent partial selection with the native indeterminate state; chapter disclosure buttons independently collapse/expand topic lists. Bulk selection, selected-topic summary, question-pool filtering and test configuration remain in `Test.tsx`. This is documented as an application-owned interaction, not a new generic tree component. Do not infer that `.ds-chip`, `.ds-field` or `.ds-button` supplies the parent/child selection model or indeterminate behavior.