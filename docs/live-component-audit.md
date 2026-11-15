# Live component audit — first pass

Status: source-level audit complete; no application integration authorized.

The live Limitless implementation remains the visual source of truth. This audit compares the existing component contracts with the actual selectors and markup in `guiltythreee/Limitless` on `main`. It is deliberately not a screenshot-equivalence claim.

## Decision summary

| Existing live pattern | Live implementation | Design-system contract | Result |
|---|---|---|---|
| Probability panels and cards | `.panel`, `.card`, `.study-utility-panel`, `.study-utility-visual` | `.ds-surface` | Partial structure only; not visually equivalent |
| Probability action buttons | `.actionbar .btn-main`, `.actionbar .btn-side`, `.optcard` | `.ds-button` | Not equivalent; dimensions, radius, fills and interaction states differ |
| Probability tabs | `.subnav button`, `[data-study-mode-tabs] [role="tab"]`, `.probability-section-tabs button` | `.ds-tabs`, `.ds-tab` | Not equivalent; there are multiple distinct tab systems and selected-state contracts |
| Probability chips and badges | `.chip`, `.dbadge`, `.dbadge-easy/medium/hard` | `.ds-badge` | Not equivalent; live badges carry uppercase typography and semantic difficulty colours |
| Probability fields | `.field`, `main :where(input, select, textarea)` | `.ds-field` | Not equivalent; live inset fill, compact typography, spacing and section-specific focus treatment differ |
| Metallurgy panels and course cards | `.panel`, `.course-card`, `.topic-card` | `.ds-surface` | Not equivalent; card hover behavior and palette-specific styling are part of the live design |
| Metallurgy chips and fields | `.chip`, `.chip-gold`, `.chip-trap`, `.field input` | `.ds-badge`, `.ds-field` | Not equivalent; chips are compact pill metadata; fields use monospace input typography and their own dimensions |
| Home navigation and module links | `.home-topbar`, `.home-sidebar`, `.side-link`, `.shortcut-card` | `.ds-nav`, `.ds-nav-link`, `.ds-surface` | Not equivalent; home uses a fixed/sidebar layout, search bar and large navigational cards |
| Home cards and panels | `.shortcut-card`, `.learning-card`, `.dashboard-panel`, `.all-modules-panel .card` | `.ds-surface` | Not equivalent; blur, transparency, gradients, shadows and light-theme variants are material |
| Competition navigation | `.competition-nav`, `.competition-sidebar`, `.competition-side-link` | `.ds-nav`, `.ds-nav-link` | Not equivalent; vertical sidebar links have active gradient and inset indicator states |
| Competition cards and controls | `.overview-card`, `.subject-card`, `.week-card`, `.settings-card`, `.action-button`, form inputs | `.ds-surface`, `.ds-button`, `.ds-field` | Not equivalent; dashboard cards have their own density, blur, responsive layout and explicit light/dark overrides |
| Codeforces navigation and panels | `.cr-topbar`, `.cr-hero`, `.cr-ladder-section`, `.cr-milestone`, `.cr-account` | `.ds-nav`, `.ds-surface` | Not equivalent; panel hierarchy, gradients, account identity, status and milestone states are bespoke |
| Codeforces actions and inputs | `.cr-refresh-button`, `.cr-stage-tab`, `.cr-week-actions button`, `.cf-quick-toolbar input/select` | `.ds-button`, `.ds-tab`, `.ds-field` | Not equivalent; refresh action, stage selection and form controls have distinct sizes, colours, disabled states and light-theme overrides |

## Section findings

### 1. Probability

Authoritative styles: `probability-source/app/globals.css`.

The existing section is not a single generic card/button system:

- `.panel` uses the Probability panel fill, border, shadow and blur.
- `.card` has its own inset-derived transparent fill, border, radius and responsive padding.
- The later surface layer groups `.panel`, `.card`, `.study-utility-panel` and `.study-utility-visual`, but preserves separate padding and panel blur.
- `.actionbar .btn-main` is the gold primary action; `.btn-side` is a bordered secondary action. Their mobile minimum height is 44px and their final radius is 9px.
- `.optcard` is a large selectable option surface (minimum height 62px), not a normal button.
- `.subnav` is a horizontally scrolling section navigation. Separately, `[data-study-mode-tabs]` uses actual tab roles and `.probability-section-tabs` has a blue gradient selected state with `aria-pressed` or `aria-current`.
- `.chip` and `.dbadge` are separate metadata systems. Difficulty badges have easy/medium/hard semantic colour variants.
- `.field` uses the Probability inset fill and compact text. The section also has shared focus-visible styling and page-specific input radius rules.

The generic primitive currently misses the live shadow/blur, the separate card fill, the 44px actionbar target, the 62px option target, the blue section-tab treatment, and the three badge semantics. Do not replace any of these with the generic primitive.

### 2. Metallurgy

Authoritative styles: `metallurgy-source/app/globals.css`.

The course landing and study archive use their own blue/gold material-science skin:

- `.panel` uses the Metallurgy panel background, border, 14px radius and panel shadow.
- `.course-card` is a navigational course card with its own padding and hover lift/border treatment.
- `.topic-card` is a full-width selectable topic control with left-aligned text and a hover lift.
- `.chip`, `.chip-gold`, `.chip-trap` and the MT203 difficulty chip variants are semantic metadata, not one neutral badge style.
- `.field input` uses a dark inset fill, 8px radius, 0.95rem monospace text and Metallurgy-specific padding.

A generic surface/button/field cannot be substituted without carrying these exact course/topic semantics and the Metallurgy theme values. MT202 and MT203 should continue using the existing shared stylesheet and course components; this audit does not authorize content or course refactors.

### 3. Home dashboard

Authoritative styles: `home-dashboard.css`, with `hub-theme.css` and the shared theme engine.

Home's appearance depends on more than card tokens:

- The shared background artwork remains outside the dashboard card system.
- The topbar is sticky and contains the brand, global search and actions.
- The sidebar is a sticky vertical navigation rail with its own translucent background.
- `.shortcut-card` and `.learning-card` are navigational cards with blur, transparency, hover lift and light-theme text/background adjustments.
- Dashboard panels and module cards have their own hierarchy, dimensions and responsive grid changes.

The design-system `.ds-nav` is a wrapping horizontal row and `.ds-surface` is a plain bordered surface. Neither represents the home layout or its visual depth. Preserve the live markup, artwork, search, sidebar and card rules.

### 4. Competition

Authoritative styles: `competition/competition.css` plus the later-loaded `competition/competition-dashboard.css`.

The later dashboard stylesheet changes effective component appearance, so reading the older file alone produces incorrect mappings.

- `.competition-side-link` is a vertical sidebar item with an active gradient and inset blue indicator.
- Overview, subject, week, settings, resource and other cards share some border/radius language, but receive different sizing and theme-specific overrides.
- `.action-button` is a compact 36px action with a subtle blue fill, not the generic 40px solid-primary button.
- Form controls are scoped to the competition page and have their own dark/light values and 42px minimum heights in the Codeforces explorer controls.
- Several card groups switch to opaque backgrounds and explicit light-theme values.

The existing layout and later overrides must be treated as a single cascade. No blanket conversion to `.ds-surface` or `.ds-button` is safe.

### 5. Codeforces

Authoritative styles: `codeforces-red/codeforces-red.css`, `codeforces-problems.css` and `codeforces-contests.css` (all three are loaded by `codeforces-red/index.html`).

Codeforces is a bespoke dashboard with several independently styled subsystems:

- The topbar is a horizontal navigation bar; the content has a constrained main column.
- Hero, ladder, account and milestone surfaces have individual layout and shadow rules.
- The linked account area includes identity/avatar/connected state and a prominent refresh action.
- `.cr-refresh-button` has a 44px effective minimum height (the later-loaded `codeforces-problems.css` overrides the 42px base), strong blue fill, high-visibility focus ring and a distinct disabled/wait state.
- `.cr-stage-tab` is a full-width grid control with a separate active state; it is not a conventional tab strip.
- Weekly actions have their own sizing and disabled-state styling.
- The light theme contains explicit overrides. Problem explorer fields and chips are defined in the companion problem stylesheet and must be audited alongside this file.

The generic Codeforces adapter is only a small token alias layer. It does not describe all of the literal component-specific colours and states. Retain the bespoke CSS until each individual subsystem has a verified adapter.

## Cross-cutting gaps in the current primitives

1. `.ds-surface` does not reproduce live shadows, blur, gradients, transparency, layout padding or section-specific card variants.
2. `.ds-button` provides three broad variants but cannot represent the selectable option card, compact action, high-visibility refresh control or the Probability section's separate selected states.
3. `.ds-field` has one generic geometry and typography. The live sections have materially different field sizing, monospace treatment, fills and focus rules.
4. `.ds-tabs` models an underline tab strip only. Existing sections include scrolling pill navigation, semantic tablists, aria-pressed segmented controls and full-width stage selectors.
5. `.ds-badge` has one neutral pill appearance. Live badges include difficulty, status, topic metadata and section-specific compact chips.
6. `.ds-nav` and `.ds-nav-link` do not model sticky topbars, vertical sidebars, active gradients, inset markers or navigation cards.
7. Theme adapters are necessary but insufficient: a correct semantic colour alias does not establish component-level equivalence.

## Safe next step

Build a component mapping specification, not replacement CSS:

1. Define separate patterns for panel/card, action button, selectable option, field, metadata chip, difficulty/status badge, section tabs, segmented control, sidebar item, navigation card and dashboard metric.
2. For each pattern, record source selector, markup semantics, desktop/mobile dimensions, dark/light behavior, interaction states and section-specific exceptions.
3. Only consolidate a pattern when the live sections genuinely share its geometry and behavior. Otherwise retain section variants or keep the original implementation.
4. Add side-by-side browser screenshots from the actual live pages and fixture using matching viewport, theme, content and state before claiming visual parity.

No live application imports this package. No production files are changed by this audit.

## Source revisions audited

### Live application styles

| File | Blob SHA on `main` |
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

### Markup and supporting component files

| File | Blob SHA on `main` |
|---|---|
| `probability-source/app/page.tsx` | `82070366ff123b9fc0f1c7ffa14bdca2ba6d868d` |
| `probability-source/app/components/Practice.tsx` | `1e71e4cc2e50040662ba8f0efe8d6ab301f26168` |
| `probability-source/app/components/Dashboard.tsx` | `daf03bae124c5af90c51d34359048f78ae83428f` |
| `metallurgy-source/app/mt202/page.tsx` | `0045370d744a378091102e539798efbd5d9d0ef2` |
| `index.html` | `1d4f9ff1a3921b9775c00db1b45c3ddbc24c98a3` |
| `competition/index.html` | `a09dbd51fc92d3d07df1c635e199a7603c162586` |
| `codeforces-red/index.html` | `87d43672ffe0f38e1252dc89650a966bd77695bd` |


## Follow-up source finding — Metallurgy chapter browser

The current `CourseChapterBrowser.tsx` renders `.cb-chapter` rows, styled in `app/courses/course-chapter-browser.css`. The older `.topic-card` selector in `globals.css` is a separate legacy pattern and is not the current chapter-browser control. The live row is transparent with a bottom divider, chip-colour hover fill, a numbered marker, title/progress stack, right-aligned metrics and trailing arrow. At 850px it collapses and places metrics beneath the title. This source mapping is implemented as `.ds-chapter-row`; no application integration is authorized.
