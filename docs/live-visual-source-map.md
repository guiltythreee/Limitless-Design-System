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


## Follow-up component source revisions

The source-level follow-up mappings below were checked against `guiltythreee/Limitless` `main` at commit `fc350626309fd910e94f251427fb5bca487524d5`. These exact blobs make the later component-level findings reproducible.

| Source file | Blob SHA on `main` | Mapping scope |
|---|---|---|
| `metallurgy-source/app/courses/CourseChapterBrowser.tsx` | `f2eecd028cf9e0a27aff4333f7f1480bbe42b0be` | Metallurgy chapter browser structure and markup |
| `metallurgy-source/app/courses/course-chapter-browser.css` | `8a59427ff308cc109802a424142e48af3407a540` | Metallurgy course browser toolbar, rows and responsive rules |
| `metallurgy-source/app/mt202/page.tsx` | `0045370d744a378091102e539798efbd5d9d0ef2` | MT202 archive sidebar and progress composition |
| `metallurgy-source/app/courses/BookmarksPanel.tsx` | `3d14f6e6a2cadfe800b3e2a36b1214cfad7adcc9` | Bookmarks panel structure and empty state |
| `metallurgy-source/app/courses/ActivityHistoryPanel.tsx` | `3b15b0fa664c5925de39f3fefaec071cdd6658d4` | Activity history and mistakes views |
| `metallurgy-source/app/courses/DailyGoalsPanel.tsx` | `77ad1225bb2dd67dd714f79af95f03c4a7a7d9bf` | Daily goals panel and target form |
| `shared/studies/StudyUtilityNav.ts` | `0d6708a09b2f24b42e9c9cc634398de118578f72` | Shared study utility navigation factory |
| `shared/studies/study-utility-nav.css` | `a4ff88cb24b3881ebc026a423b5839255789d915` | Shared utility panel and navigation styling |
| `probability-source/app/components/Test.tsx` | `fa5f5e38616dd88eca7697ea8f5f11163a81fa94` | Probability hierarchical test-scope picker |
| `probability-source/app/components/Charts.tsx` | `21776cce47b9402fd663e05e09110310387f2cce` | Probability dashboard SVG charts |
| `probability-source/app/components/Practice.tsx` | `1e71e4cc2e50040662ba8f0efe8d6ab301f26168` | Probability learning-player composition and practice controls |
| `probability-source/app/components/Dashboard.tsx` | `daf03bae124c5af90c51d34359048f78ae83428f` | Probability dashboard goal and week visuals |
| `shared/learning-player/PlayerShell.ts` | `b78076956089d99c352784dd05612e19cc6a8ed9` | Shared learning-player shell structure |
| `shared/learning-player/player.css` | `f9d7ca51ca48022db7c0a3e70a9f6304f4889e57` | Shared learning-player feedback, review and solution styles |


## Top-level live page composition sources

These page files were captured and compared in the read-only production baseline pass. Their exact blobs are pinned to `guiltythreee/Limitless` `main` for reproducible composition mapping.

| Source file | Blob SHA on `main` | Mapping scope |
|---|---|---|
| `index.html` | `1d4f9ff1a3921b9775c00db1b45c3ddbc24c98a3` | Home dashboard hero, shortcuts, learning cards and page hierarchy |
| `probability-source/app/page.tsx` | `82070366ff123b9fc0f1c7ffa14bdca2ba6d868d` | Probability archive hero, record panel, study progress and navigation |
| `metallurgy-source/app/page.tsx` | `7bab0fdef6a8ecbb9b01d7c166e4d25f64d8aac1` | Metallurgy semester navigation, programme summary and course cards |
| `metallurgy-source/app/semester-landing.css` | `60640c22ba1b62715a24eed66350d5c565ccd8ee` | Metallurgy semester sidebar, hero, summary and course-card visual rules |
| `competition/index.html` | `a09dbd51fc92d3d07df1c635e199a7603c162586` | Competition campaign hero, overview metrics and weekly checklist composition |
| `codeforces-red/index.html` | `87d43672ffe0f38e1252dc89650a966bd77695bd` | Codeforces account identity, rating dashboard, milestones and launch tiles |
