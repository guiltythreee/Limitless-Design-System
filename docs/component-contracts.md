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
| Chapter row | `.ds-chapter-row` and child slots | Responsive chapter navigation with number, title, progress, metrics and arrow | Use a native button for selection; keep progress values and labels application-owned. At narrow widths metrics move below the title. |
| Selectable option | `.ds-option`, `.ds-option__letter` | hover, focus-visible, disabled; section-adaptable geometry | Use a native `button` for an answer or choice; expose selected/correctness state with the consuming application's established semantics. |
| Panel | `.ds-panel` | default, `--flush` | Use for a grouped content region; padding, radius, shadow and blur are section-adaptable tokens. |
| Content card | `.ds-card` | default, `--flat` | Use for self-contained information; it is not interactive by default. |
| Navigation card | `.ds-navigation-card` | hover, focus-visible | Use an anchor for navigation; preserve the complete clickable hit area and current-destination semantics. |
| Legacy surface | `.ds-surface` | default, `--raised` | Retained for compatibility with the original primitive contract; new work should choose panel, content card or navigation card explicitly. |
| Field | `.ds-field` | default, `--compact`, `--monospace`, focus-visible, invalid | Pair with a persistent visible label; communicate errors in text, not color alone. |
| Checkbox | `.ds-checkbox` | native checked/indeterminate appearance, focus-visible, disabled | Retain the native checkbox element; this contract styles its dimensions, accent and focus only. |
| Tabs | `.ds-tabs`, `.ds-tab` | selected, focus-visible, horizontal overflow | Use tablist/tab/tabpanel roles only when implementing the full tab interaction pattern; otherwise use ordinary navigation links. |
| Segmented control | `.ds-segmented`, `.ds-segmented-option` | pressed/current, focus-visible | Use buttons with `aria-pressed` for mutually exclusive toggles or links with current-page semantics for navigation; do not assign tab roles by appearance alone. |
| Stage selector | `.ds-stage-selector`, `.ds-stage-option` | active/current step, focus-visible | Use native buttons for stage selection; expose the selected stage semantically and keep stage metadata in child elements. |
| Metric card | `.ds-metric-card` and label/value/detail elements | tabular value, responsive wrapping | Keep metric data and formatting in the application; use labels and visible units/context. |
| Test result summary | `.ds-test-result-summary` and eyebrow/score/meta slots | centered score, tabular numeric value, responsive type scale | The application supplies score, totals and timing; the summary is presentation only. |
| Test result row | `.ds-test-result-list`, `.ds-test-result-row` and index/status/question/time slots | compact divided rows; correct/incorrect/partial status colour variants | Keep question content and result status in the application; text and symbols must communicate status without colour alone. |
| Test history table | `.ds-test-history` | compact uppercase headings, divided rows, numeric alignment, narrow-screen horizontal overflow owned by wrapper | Use a native table with scoped header cells; preserve the app's responsive overflow wrapper. |
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

## Selectable options

- `.ds-option` is a large choice surface, not a compact action button. It supports a leading letter/marker slot and section-specific dimensions, border, fill and hover treatment.
- Probability maps the option to its live 62px minimum target, 14px radius, inset fill and gold-tinted border. Keep its selection/correctness behavior in application markup and state.
- The `.ds-option__letter` slot carries the answer marker; its dimensions and shape are tokenized because the live Probability style changes from a circular marker to a rounded square in the later practice layer.
- Use `.ds-button--pill` only for actions whose live control is pill-shaped; button sizing and shape remain independent.

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


## Chapter rows

- `.ds-chapter-row` is a structured navigation/selection row, not a generic card. It maps the Metallurgy `CourseChapterBrowser` layout: leading chapter number, flexible title/progress region, trailing metrics and arrow.
- The wide layout uses a four-column grid; at 850px and below it collapses to three columns and moves metrics beneath the title.
- Progress width is supplied by the consuming application through `--ds-chapter-progress-value`; expose progress text or semantics in markup when it communicates meaningful completion.
- The live chapter browser uses a transparent row with a bottom divider and chip-colour hover fill. Do not add card radius, panel shadow or a lift transform.


## Metallurgy course-browser toolbar

- .ds-course-toolbar maps the live .cb-toolbar flex row, panel border/fill, 14px radius and 850px stacked layout.
- .ds-course-search maps .cb-search; its input remains a native search/text input with application-owned query state and a persistent accessible label.
- .ds-course-filters and its native select controls map .cb-filters; preserve the live 175px maximum width, 10px radius, inset fill and 850px/520px responsive behavior.
- .ds-course-list-head and .ds-course-empty map the live result-count header and empty state.
- Filtering and sorting logic are not part of these visual classes. Preserve the source behavior: title/ID search; optional unit filter; all/not-started/in-progress/completed/weak status; chapter-order/name/least-progress/question-count sort. Weak means accuracy below 60% after at least one attempt.
- Do not replace native selects with custom popovers or segmented controls. The source uses native select elements.


## Metallurgy archive sidebar navigation

- .ds-course-nav-item maps the live .ch-item button: 34px number column, 0.55rem gap, 0.5rem 0.55rem padding and 10px radius.
- .ds-course-nav-item.is-active and aria-current states map the live chip fill and blue-line border; the exam modifier preserves its amber number marker.
- .ds-course-nav-number maps the 32px bordered number tile.
- .ds-course-nav-meta, .ds-course-nav-progress and .ds-course-nav-percent map the 4px progress track and trailing percentage. The application supplies the percentage and accessible progress text.
- Use native buttons because the live sidebar changes the current in-page study view. The component owns no navigation state, persistence or progress calculation.


## Metallurgy course heading and summary

- `.ds-course-heading` maps the live `.cb-heading` panel: 1.25rem 1.4rem padding, 16px radius, border, panel fill and subtle shadow.
- The heading contains an eyebrow, title and optional description; the summary is a separate flex group of compact metric tiles.
- At 850px and below the heading stacks vertically. At 520px and below summary items flex evenly and reduce their minimum width.
- Metric values are application-owned and must retain tabular numerals. Do not move course totals or calculation logic into the visual primitive.

## Shared study utility navigation

- `.ds-study-utility-nav` maps the shared `createStudyUtilityNav` output and `.study-utility-nav` CSS.
- Items are native buttons. The application supplies item labels, descriptions, counts, active state and selection callback.
- Preserve `aria-current="page"` for the active item, optional accent tone, count badge, visible keyboard focus, and reduced-motion behavior.
- `.ds-study-utility-nav--horizontal` maps Probability's compact horizontal utility variant; the default layout remains a vertical course-sidebar list.
- The primitive must not own bookmarks, history, mistakes, goals, progress, routing or persistence.


## Shared study utility panels

- `.ds-study-utility-panel` maps the live `.study-utility-panel` frame; header, heading, title, description, count and content remain separate slots.
- `.ds-study-utility-control` and `.ds-study-utility-action` map the shared compact control/action geometry. The consuming panel and application supply control semantics, labels, values and behavior.
- Toolbar, metric, visual, legend, progress, week-grid, row, empty-state and form classes are layout/presentation primitives only. They do not own data, chart calculations, persistence, filtering or action callbacks.
- The live utility CSS uses section variables such as `--panel-line`, `--panel-bg`, `--body`, `--paper`, `--dim`, `--chip`, `--inset` and `--gold`. The design-system adapter must alias the relevant live values; generic defaults are structural fallbacks, not a parity claim.
- Preserve the two-column metric layout at 520px and below, the seven-column weekly grid, wrapping row actions, visible focus, forced-colour focus and reduced-motion progress behavior.


### Source-backed panel variants and exceptions

- **Bookmarks:** the header has no count badge; the description carries the saved-question count. Rows use the item layout with optional open and remove actions. Missing topic IDs remain visible with an explanatory unavailable-item message. Preserve the empty-state instruction.
- **Activity history:** the toolbar contains native period and attempt-mode selects. Summary metrics and the seven-day correct/incorrect chart precede the history list. History rows include timestamp, mode, elapsed time, legacy-source metadata, selected answer and correctness; do not compress these into a generic metadata line.
- **Mistakes:** this is the same ActivityHistoryPanel in a distinct view, not a separate panel shell. It adds mistake-category controls, topic-mastery and recurring-mistake summaries, and a prioritized revision queue. Category selection, local persistence, reviewed state and revision ranking remain application-owned.
- **Daily goals:** the goals metric variant has two wider tiles; the weekly grid includes per-day count/goal and met/today/future states. The numeric target is constrained to 1–200 and submitted through the course callback. The fill width and success colour are computed by the application.
- Preserve .ds-study-utility-row--question as a separate source-backed divider row variant and .ds-study-utility-progress--overview as a distinct taller progress track. Do not infer that all row types or progress tracks are interchangeable.


## Probability practice-session controls

- `.ds-practice-question-nav` is a wrapping navigation rail for question markers. Each marker remains a native button; the application supplies question number, status and `aria-current="step"`.
- `.ds-practice-question-marker` supports the source's correct, incorrect and partial states. Status styling is visual only; grading and current-question navigation remain in the learning-player/application.
- `.ds-practice-timer` is a tabular-numeral timer pill. Stopwatch lifecycle, pause/resume and elapsed-time persistence remain application-owned.
- `.ds-practice-actionbar` is the sticky action container; primary/secondary buttons use the final live 9px radius (the earlier 999px declaration is overridden later in the live cascade). At widths up to 760px, the bar moves to 8px from the bottom, uses a 0.45rem gap and 0.55rem padding, and both controls have a 44px minimum height. Submit, next, previous and retry behavior remain outside the package.
- `.ds-practice-analysis-dock` maps the sticky floating analysis affordance. Its action and destination remain consumer-owned.
- `.ds-practice-goal-milestones` and `.ds-practice-week-status` map the Probability dashboard goal milestones and daily streak cells. Goal fraction, reached thresholds, weekly status and counts remain data supplied by the dashboard.
- Preserve reduced-motion handling for the milestone fill and forced-colour focus for the current question marker.


## Probability chart and question-review boundaries

- Probability's `DiffBars` and `DayBars` are application-rendered inline SVG charts. Their plot dimensions, scale normalization, gridlines, bar geometry, day labels, goal line, and hover tooltip are owned by `probability-source/app/components/Charts.tsx`; the shared utility visual/legend primitives provide surrounding layout only.
- Do not claim these charts are reusable design-system chart components. A future chart contract requires a separate source-backed API and interaction audit; this checkpoint records the boundary without extracting chart logic.
- Probability question review reuses the shared learning-player structure: `learning-player-feedback`, `learning-player-review`, and `learning-player-solution`. Shared `shared/learning-player/player.css` owns the review layout, feedback spacing, solution inset, and responsive option/review structure. Probability owns correctness wording, status palette, explanation content, mistake-category choices, attempt history, and persistence.
- Mistake classification controls are application-specific actions inside the review state, not generic design-system buttons with classification behavior. Category definitions, selected state and storage remain application/shared-study logic.


## Probability test setup selection boundary

- The Probability test setup is a hierarchical parent/child checkbox interaction with native indeterminate parent state and independently collapsible chapter groups.
- Chapter/topic selection, bulk actions, disclosure state, selected-topic summary, question-pool construction and test configuration remain application-owned.
- This checkpoint does not define a reusable tree/selection primitive. Existing button, chip and field contracts cover only their own visual/native-control roles; they do not imply ownership of hierarchical selection or mixed state.
- If a future design-system contract is proposed, audit keyboard interaction, checkbox indeterminate semantics, disclosure semantics, responsive scroll behavior and mixed parent/child state before defining its visual API.

## Probability in-progress player presentation

- The in-progress preview composes the existing question-status rail, timer, question metadata, bookmark affordance, question prompt, selectable-option surface and action-bar slots into one learning-player screen.
- The composition is a visual fixture, not a new stateful component or a replacement for Practice.tsx / LearningPlayerShell.
- The consumer supplies question text, difficulty, topic, timer value, current index, answer selection, bookmark state and enabled/disabled states. Navigation, grading, timer lifecycle, answer persistence and keyboard handling remain application/shared learning-player responsibilities.
- The static preview is shown in both Probability themes. Its compact mobile layout is only a visual contract; responsive player behaviour remains owned by the live application.


## Cross-theme preview parity

- Every section's dark and light preview fixtures must contain the same component-class inventory.
- Light fixtures must opt into the explicit light-theme adapter and identify themselves as light in the visible preview label.
- Element IDs must remain unique across all ten fixtures; cloned light fixtures suffix their IDs and update label/heading references.
- CI renders the full preview in Chromium at 1440px and 390px viewport widths. This is a rendered-layout smoke check, not pixel-equivalence evidence against production.
