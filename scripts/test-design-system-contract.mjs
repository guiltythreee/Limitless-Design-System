import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = read("../shared/design-system/tokens.css");
const components = read("../src/components.css");
const contracts = read("../docs/component-contracts.md");
const audit = read("../docs/live-component-audit.md");
const preview = read("../preview/index.html");
const previewStyles = read("../preview/preview.css");
const mapping = read("../docs/component-mapping-spec.md");
const sourceMap = read("../docs/live-visual-source-map.md");

const requiredTokens = [
  "--ds-space-1", "--ds-space-12",
  "--ds-radius-sm", "--ds-radius-xl",
  "--ds-control-height-md",
  "--ds-font-sans", "--ds-font-serif", "--ds-font-mono",
  "--ds-motion-fast", "--ds-ease-standard",
  "--ds-color-canvas", "--ds-color-surface", "--ds-color-text",
  "--ds-color-heading", "--ds-color-muted", "--ds-color-accent",
  "--ds-color-border", "--ds-color-focus", "--ds-color-on-accent",
];

for (const token of requiredTokens) {
  assert.ok(tokens.includes(token), `Missing design token: ${token}`);
}

for (const section of ["probability", "metallurgy", "home", "competition", "codeforces"]) {
  assert.ok(tokens.includes(`[data-limitless-design="${section}"]`), `Missing ${section} adapter`);
}

const componentSelectors = [
  ".ds-chapter-row", ".ds-chapter-row__number", ".ds-chapter-row__content", ".ds-chapter-row__metrics", ".ds-button", ".ds-button--primary", ".ds-button--secondary", ".ds-button--quiet", ".ds-button--compact", ".ds-button--prominent", ".ds-button--full", ".ds-button--pill", ".ds-option", ".ds-option__letter",
  ".ds-checkbox", ".ds-test-result-summary", ".ds-test-result-summary__score", ".ds-test-result-list", ".ds-test-result-row", ".ds-test-result-row__status--correct", ".ds-test-result-row__status--incorrect", ".ds-test-result-row__status--partial", ".ds-test-history", ".ds-sidebar", ".ds-sidebar-link", ".ds-metric-card", ".ds-metric-card__value", ".ds-progress", ".ds-progress--thin", ".ds-segmented", ".ds-segmented-option", ".ds-stage-selector", ".ds-stage-option", ".ds-chip", ".ds-chip--selected", ".ds-badge--easy", ".ds-badge--medium", ".ds-badge--hard",
  ".ds-panel", ".ds-card", ".ds-navigation-card", ".ds-surface", ".ds-field", ".ds-tabs", ".ds-tab", ".ds-badge", ".ds-nav", ".ds-nav-link",
];
for (const selector of componentSelectors) {
  assert.ok(components.includes(selector), `Missing component selector: ${selector}`);
}

const documentedPrimitives = [
  ".ds-button", ".ds-panel", ".ds-card", ".ds-navigation-card", ".ds-surface", ".ds-field", ".ds-tabs", ".ds-tab",
  ".ds-badge", ".ds-test-result-summary", ".ds-test-result-row", ".ds-test-history", ".ds-nav", ".ds-nav-link",
];
for (const primitive of documentedPrimitives) {
  assert.ok(contracts.includes(primitive), `Missing documentation for primitive: ${primitive}`);
}

assert.match(tokens, /NOT imported by any application yet/);
assert.match(tokens, /--ds-color-canvas: var\(--page-bg\)/, "Study adapters must preserve the live page background");
assert.equal((tokens.match(/--ds-color-surface: var\(--panel-bg\)/g) || []).length, 2, "Probability and Metallurgy must use their live panel gradients");
assert.equal((tokens.match(/--ds-color-surface-raised: var\(--chip\)/g) || []).length, 2, "Study raised surfaces must use their live chip tokens");
assert.match(tokens, /--ds-color-on-accent: var\(--ongold\)/, "Study accent foreground must follow the live ongold token");
assert.match(tokens, /--ds-color-surface: var\(--home-panel\)/, "Home must use its live panel token");
assert.match(tokens, /--ds-color-surface: var\(--comp-panel\)/, "Competition must use its effective dashboard panel token");
assert.match(tokens, /--ds-color-surface: rgba\(8, 20, 36, 0\.88\)/, "Codeforces dark surface must match its live CSS");

assert.match(audit, /source-level audit complete/i);
assert.match(audit, /no application integration authorized/i);
for (const heading of ["### 1. Probability", "### 2. Metallurgy", "### 3. Home dashboard", "### 4. Competition", "### 5. Codeforces"]) {
  assert.ok(audit.includes(heading), `Missing live component audit section: ${heading}`);
}
assert.match(audit, /not visually equivalent/i);
assert.match(audit, /No live application imports this package/);
for (const pattern of ["Navigation card", "Metric card", "Selectable option", "Segmented control", "Sidebar item", "Stage selector"]) {
  assert.ok(mapping.includes(`### ${pattern}`) || mapping.includes(`| ${pattern} |`), `Missing component mapping pattern: ${pattern}`);
}
assert.match(mapping, /Explicit non-goals/);
assert.match(mapping, /No new application imports of this package/);
assert.match(components, /opt-in/i);
assert.match(components, /\.ds-panel/);
assert.match(components, /\.ds-card/);
assert.match(components, /\.ds-navigation-card/);
assert.match(components, /\.ds-sidebar-link/);
assert.match(components, /\.ds-sidebar--horizontal/);
assert.match(components, /\.ds-button--compact/);
assert.match(components, /\.ds-button--prominent/);
assert.match(components, /\.ds-button--pill/);
assert.match(components, /\.ds-option__letter/);
assert.match(tokens, /--ds-option-min-height: 62px/);
assert.match(tokens, /--ds-option-hover-transform: translateY\(-1px\)/);
assert.match(components, /\.ds-test-result-summary__score/);
assert.match(components, /\.ds-test-result-row__status--correct/);
assert.match(components, /\.ds-test-result-row__status--incorrect/);
assert.match(components, /\.ds-test-result-row__status--partial/);
assert.match(components, /\.ds-test-history th/);
assert.match(tokens, /--ds-test-result-score-color: var\(--gold\)/);
assert.match(components, /\.ds-checkbox:focus-visible/);
assert.match(components, /\.ds-checkbox:disabled/);
assert.match(tokens, /--ds-checkbox-accent: var\(--gold\)/);
assert.match(components, /\.ds-field--compact/);
assert.match(components, /\.ds-field--monospace/);
assert.match(components, /\.ds-segmented-option\[aria-pressed/);
assert.match(components, /\.ds-stage-option\.is-active/);
assert.match(components, /\.ds-metric-card__label/);
assert.match(components, /\.ds-metric-card__value/);
assert.match(components, /\.ds-progress > span/);
assert.match(tokens, /--ds-metric-value-font/);
assert.match(tokens, /--ds-progress-fill/);
assert.match(tokens, /--ds-segmented-selected-background/);
assert.match(tokens, /--ds-stage-active-background/);
assert.match(components, /\.ds-chip--selected/);
assert.match(components, /\.ds-chip--accent/);
assert.match(components, /\.ds-badge--accent/);
assert.match(components, /\.ds-chip--success/);
assert.match(components, /\.ds-badge--easy/);
assert.match(components, /\.ds-badge--medium/);
assert.match(components, /\.ds-badge--hard/);
assert.match(tokens, /--ds-color-difficulty-easy/);
assert.match(tokens, /--ds-color-chip-success/);
assert.match(tokens, /--ds-button-height-compact/);
assert.match(tokens, /--ds-field-height/);
assert.match(preview, /ds-sidebar sample-sidebar/);
assert.match(contracts, /Sidebar navigation/);
assert.match(contracts, /Chapter rows/);
assert.match(contracts, /Selectable options/);
assert.match(components, /--ds-panel-backdrop-filter/);
assert.match(components, /--ds-navigation-card-hover-transform/);
assert.match(preview, /ds-checkbox/);
assert.match(preview, /ds-test-result-summary/);
assert.match(preview, /ds-test-result-row__status--incorrect/);
assert.match(preview, /ds-panel sample-card/);
assert.match(preview, /ds-chapter-row sample-chapter-row/);
assert.match(preview, /ds-option sample-option/);
assert.match(preview, /ds-button--pill/);
assert.match(preview, /ds-card sample-family-card/);
assert.match(preview, /ds-navigation-card sample-family-link/);
assert.match(preview, /ds-chip sample-chip/);
assert.match(preview, /ds-segmented sample-segmented/);
assert.match(preview, /ds-stage-selector sample-stage-selector/);
assert.match(preview, /ds-metric-card sample-metric-card/);
assert.match(preview, /ds-progress sample-progress/);
assert.match(mapping, /Chapter row/);
assert.match(mapping, /Content panel/);
assert.match(mapping, /Navigation card/);

for (const [name, source] of [["tokens", tokens], ["components", components]]) {
  assert.doesNotMatch(source, /@import\s/i, `${name} must not import stylesheets`);
  assert.doesNotMatch(source, /(^|[\n}])\s*:root\b/m, `${name} must not change global root styles`);
  assert.doesNotMatch(source, /(^|[\n}])\s*\*\s*\{/m, `${name} must not add global universal selectors`);

  let depth = 0;
  for (const char of source) {
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    assert.ok(depth >= 0, `${name}: unexpected closing CSS brace`);
  }
  assert.equal(depth, 0, `${name}: unclosed CSS block`);
}

assert.match(contracts, /Keyboard focus must remain visible/);
assert.match(contracts, /must not own application state/);

console.log("Design-system contract: PASS");
console.log("5 section adapters; component families and variants covered; scoped CSS; accessibility contracts and live component audit documented.");


const courseBrowserSelectors = [".ds-course-toolbar", ".ds-course-search", ".ds-course-filters", ".ds-course-list-head", ".ds-course-empty"];
for (const selector of courseBrowserSelectors) {
  assert.ok(components.includes(selector), `Missing Metallurgy course-browser selector: ${selector}`);
}
assert.match(tokens, /--ds-course-toolbar-radius:\s*14px/);
assert.match(tokens, /--ds-course-search-background:\s*var\(--inset\)/);
assert.match(contracts, /Weak.*60%|weak.*60%/);
assert.match(audit, /course-browser toolbar/i);


const courseNavSelectors = [".ds-course-nav-item", ".ds-course-nav-number", ".ds-course-nav-title", ".ds-course-nav-meta", ".ds-course-nav-progress", ".ds-course-nav-percent"];
for (const selector of courseNavSelectors) {
  assert.ok(components.includes(selector), `Missing Metallurgy sidebar selector: ${selector}`);
}
assert.match(tokens, /--ds-course-nav-progress-fill:\s*linear-gradient/);
assert.match(contracts, /Metallurgy archive sidebar navigation/);
assert.match(audit, /archive sidebar and progress/i);


const courseNavPreview = ["ds-course-toolbar", "ds-course-search", "ds-course-filters", "ds-course-list-head", "ds-course-nav-item", "ds-course-nav-progress"];
for (const selector of courseNavPreview) {
  assert.ok(preview.includes(selector), `Missing Metallurgy preview fixture: ${selector}`);
}
assert.match(tokens, /\[data-limitless-design="metallurgy"\]\s*\{[^}]*--ds-chapter-grid-columns/s, "Metallurgy chapter tokens must be scoped inside its adapter");
assert.match(tokens, /\[data-limitless-design="metallurgy"\]\s*\{[^}]*--ds-course-nav-progress-fill/s, "Metallurgy sidebar progress tokens must be scoped inside its adapter");
assert.match(contracts, /Metallurgy course-browser toolbar/);
assert.match(contracts, /Metallurgy archive sidebar navigation/);


const courseHeadingSelectors = [".ds-course-heading", ".ds-course-heading__eyebrow", ".ds-course-heading__title", ".ds-course-heading__description", ".ds-course-summary", ".ds-course-summary__item", ".ds-course-summary__value", ".ds-course-summary__label"];
for (const selector of courseHeadingSelectors) assert.ok(components.includes(selector), `Missing Metallurgy course heading selector: ${selector}`);
const utilitySelectors = [".ds-study-utility-nav", ".ds-study-utility-nav__item", ".ds-study-utility-nav__copy", ".ds-study-utility-nav__label", ".ds-study-utility-nav__description", ".ds-study-utility-nav__count", ".ds-study-utility-nav--horizontal"];
for (const selector of utilitySelectors) assert.ok(components.includes(selector), `Missing shared study utility selector: ${selector}`);
assert.match(contracts, /Metallurgy course heading and summary/);
assert.match(contracts, /Shared study utility navigation/);
assert.match(mapping, /Course heading, summary and study utility navigation/);
assert.match(audit, /Metallurgy course heading and summary/);
assert.match(audit, /shared study utility navigation/);
assert.match(tokens, /--ds-course-heading-radius:\s*16px/);
assert.match(tokens, /--ds-utility-border:\s*var\(--panel-line\)/);


const studyPanelSelectors = [
  ".ds-study-utility-panel", ".ds-study-utility-panel__header", ".ds-study-utility-panel__heading",
  ".ds-study-utility-panel__title", ".ds-study-utility-panel__description", ".ds-study-utility-panel__count",
  ".ds-study-utility-panel__content", ".ds-study-utility-control", ".ds-study-utility-action",
  ".ds-study-utility-toolbar", ".ds-study-utility-metrics", ".ds-study-utility-metric",
  ".ds-study-utility-metric__label", ".ds-study-utility-metric__value", ".ds-study-utility-metric__detail",
  ".ds-study-utility-visual", ".ds-study-utility-legend", ".ds-study-utility-progress",
  ".ds-study-utility-progress__fill", ".ds-study-utility-week-grid", ".ds-study-utility-week-cell",
  ".ds-study-utility-row", ".ds-study-utility-row__copy", ".ds-study-utility-row__actions",
  ".ds-study-utility-empty", ".ds-study-utility-form",
];
for (const selector of studyPanelSelectors) {
  assert.ok(components.includes(selector), `Missing shared study utility panel selector: ${selector}`);
}
assert.match(components, /\.ds-study-utility-panel :is\(button,input,select,textarea\):focus-visible/);
assert.match(components, /\.ds-study-utility-metrics\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(components, /prefers-reduced-motion:reduce/);
assert.match(components, /forced-colors:active/);

const studyPanelPreview = ["ds-study-utility-panel", "ds-study-utility-panel__header", "ds-study-utility-metrics", "ds-study-utility-progress", "ds-study-utility-week-grid", "ds-study-utility-row--item"];
for (const selector of studyPanelPreview) {
  assert.ok(preview.includes(selector), `Missing shared study utility panel preview fixture: ${selector}`);
}
assert.match(mapping, /Study utility panel family/);
assert.match(contracts, /Shared study utility panels/);
assert.match(audit, /shared study utility panel family/);

assert.match(tokens, /--ds-study-panel-background:\s*var\(--panel-bg/);
assert.match(tokens, /--ds-utility-inset:\s*var\(--inset\)/);
assert.match(tokens, /--ds-study-progress-fill:\s*var\(--gold\)/);
assert.match(tokens, /\[data-limitless-design="metallurgy"\]\s*\{[^}]*--ds-study-panel-background/s);
assert.match(tokens, /\[data-limitless-design="probability"\]\s*\{[^}]*--ds-study-panel-background/s);

const studyPanelSourceVariants = [".ds-study-utility-row--question", ".ds-study-utility-progress--overview"];
for (const selector of studyPanelSourceVariants) assert.ok(components.includes(selector), `Missing source-specific study utility variant: ${selector}`);
assert.match(contracts, /Bookmarks/);
assert.match(contracts, /Activity history/);
assert.match(contracts, /Mistakes/);
assert.match(contracts, /Daily goals/);
assert.match(mapping, /Panel variant source mapping/);
assert.match(audit, /utility panel variants/);

const practiceControlSelectors = [
  ".ds-practice-question-nav", ".ds-practice-question-marker", ".ds-practice-question-marker__status",
  ".ds-practice-timer", ".ds-practice-actionbar", ".ds-practice-actionbar__primary",
  ".ds-practice-actionbar__secondary", ".ds-practice-analysis-dock", ".ds-practice-analysis-dock__action",
  ".ds-practice-goal-milestones", ".ds-practice-goal-milestones__fill", ".ds-practice-goal-milestones__node",
  ".ds-practice-week-status", ".ds-practice-week-status__label",
];
for (const selector of practiceControlSelectors) assert.ok(components.includes(selector), `Missing Probability practice control: ${selector}`);
assert.match(components, /\.ds-practice-question-marker\[aria-current="step"\]/);
assert.match(components, /\.ds-practice-question-marker\.is-correct/);
assert.match(components, /\.ds-practice-question-marker\.is-incorrect/);
assert.match(components, /\.ds-practice-question-marker\.is-partial/);
assert.match(components, /prefers-reduced-motion:reduce/);
assert.match(tokens, /--ds-practice-correct-background:/);
assert.match(tokens, /--ds-practice-week-met-background:/);
assert.match(contracts, /Probability practice-session controls/);
assert.match(mapping, /Probability practice-session controls/);
assert.match(audit, /Probability practice-session controls/);

const practicePreviewSelectors = ["ds-practice-question-nav", "ds-practice-question-marker is-correct", "ds-practice-question-marker is-incorrect", "ds-practice-question-marker is-partial", "ds-practice-timer", "ds-practice-actionbar", "ds-practice-analysis-dock", "ds-practice-goal-milestones", "ds-practice-week-status"];
for (const selector of practicePreviewSelectors) assert.ok(preview.includes(selector), `Missing Probability practice preview fixture: ${selector}`);


// Probability SVG charts remain application-owned; shared utility primitives are layout only.
assert.match(contracts, /Probability chart and question-review boundaries/);
assert.match(mapping, /Probability chart and review mapping/);
assert.match(audit, /Probability charts and answer review/);
assert.match(contracts, /DiffBars.*DayBars/s);
assert.match(contracts, /Mistake classification controls are application-specific/);


// Probability's hierarchical test-scope picker remains application-owned.
assert.match(contracts, /Probability test setup selection boundary/);
assert.match(mapping, /Probability test setup selection boundary/);
assert.match(audit, /Probability test setup selection/);
assert.match(contracts, /native indeterminate parent state/);
assert.match(mapping, /native-checkbox picker/);
assert.match(audit, /parent checkbox exposes an indeterminate state/);
assert.match(contracts, /does not define a reusable tree\/selection primitive/);


// Probability in-progress player fixture: structure and theme parity only, no session behaviour.
const inProgressPlayerSelectors = [
  "sample-player-screen", "sample-player-screen__topline", "sample-player-screen__nav",
  "sample-player-screen__meta", "sample-player-screen__question", "sample-player-screen__options",
  "sample-player-screen__actions", "sample-player-screen__footnote",
];
for (const selector of inProgressPlayerSelectors) {
  assert.ok(preview.includes(selector), `Missing Probability in-progress player preview: ${selector}`);
  assert.ok(previewStyles.includes(selector), `Missing Probability in-progress player styling: ${selector}`);
}
assert.equal((preview.match(/aria-label="Probability test in-progress screen preview"/g) ?? []).length, 2,
  "Probability in-progress player must be represented in both dark and light themes");
assert.match(preview, /sample-player-screen__option is-selected/);
assert.match(contracts, /Probability in-progress player presentation/);
assert.match(mapping, /Probability in-progress player presentation/);


// Documentation and HTML must contain real line breaks, not escaped backslash-n text.
for (const path of ["../docs/component-contracts.md", "../docs/component-mapping-spec.md", "../docs/live-visual-source-map.md", "../docs/live-component-audit.md", "../preview/index.html"]) {
  const content = read(path);
  assert.ok(!content.includes("\\n"), `Literal escaped newline found in ${path}`);
}

// Follow-up source provenance must stay attached to the live visual audit.
const followUpSources = [
  ["metallurgy-source/app/courses/CourseChapterBrowser.tsx", "f2eecd028cf9e0a27aff4333f7f1480bbe42b0be"],
  ["metallurgy-source/app/courses/course-chapter-browser.css", "8a59427ff308cc109802a424142e48af3407a540"],
  ["metallurgy-source/app/mt202/page.tsx", "0045370d744a378091102e539798efbd5d9d0ef2"],
  ["metallurgy-source/app/courses/BookmarksPanel.tsx", "3d14f6e6a2cadfe800b3e2a36b1214cfad7adcc9"],
  ["metallurgy-source/app/courses/ActivityHistoryPanel.tsx", "3b15b0fa664c5925de39f3fefaec071cdd6658d4"],
  ["metallurgy-source/app/courses/DailyGoalsPanel.tsx", "77ad1225bb2dd67dd714f79af95f03c4a7a7d9bf"],
  ["shared/studies/StudyUtilityNav.ts", "0d6708a09b2f24b42e9c9cc634398de118578f72"],
  ["shared/studies/study-utility-nav.css", "a4ff88cb24b3881ebc026a423b5839255789d915"],
  ["probability-source/app/components/Test.tsx", "fa5f5e38616dd88eca7697ea8f5f11163a81fa94"],
  ["probability-source/app/components/Charts.tsx", "21776cce47b9402fd663e05e09110310387f2cce"],
  ["probability-source/app/components/Practice.tsx", "1e71e4cc2e50040662ba8f0efe8d6ab301f26168"],
  ["probability-source/app/components/Dashboard.tsx", "daf03bae124c5af90c51d34359048f78ae83428f"],
  ["shared/learning-player/PlayerShell.ts", "b78076956089d99c352784dd05612e19cc6a8ed9"],
  ["shared/learning-player/player.css", "f9d7ca51ca48022db7c0a3e70a9f6304f4889e57"],
];
for (const [path, sha] of followUpSources) {
  assert.ok(sourceMap.includes(path), `Missing source-map path: ${path}`);
  assert.ok(sourceMap.includes(sha), `Missing source-map revision: ${path}`);
}


// Previously implemented Probability utility and test-history variants now have visible fixtures.
const additionalProbabilityPreview = [
  "ds-study-utility-nav--horizontal", "ds-study-utility-control", "ds-study-utility-toolbar",
  "ds-study-utility-metrics--goals", "ds-study-utility-visual", "ds-study-utility-legend",
  "ds-study-utility-progress--overview", "ds-study-utility-row--history",
  "ds-study-utility-row--question", "ds-study-utility-empty", "ds-study-utility-form",
  "ds-test-history", "sample-utility-plot", "sample-history-scroll",
];
for (const selector of additionalProbabilityPreview) {
  assert.ok(preview.includes(selector), `Missing Probability utility/history preview: ${selector}`);
}
assert.equal((preview.match(/class="ds-test-history"/g) ?? []).length, 2,
  "Test history table must be previewed in both Probability themes");


// Probability actionbar follows the final live cascade, including the mobile override.
assert.ok(components.includes(".ds-practice-actionbar__primary{flex:1;min-width:0;border-radius:9px"));
assert.ok(components.includes(".ds-practice-actionbar__secondary{border:1px solid var(--ds-utility-border,var(--ds-color-border));border-radius:9px"));
assert.ok(components.includes("@media(max-width:760px){:where([data-limitless-design]) .ds-practice-actionbar{bottom:8px;gap:.45rem;padding:.55rem}"));
assert.ok(components.includes(".ds-practice-actionbar__secondary{min-height:44px;padding-inline:.8rem}"));


// Each section's dark/light fixtures must expose the same component inventory.
const previewSections = ["probability", "metallurgy", "home", "competition", "codeforces"];
const previewClasses = (markup) => [...new Set([...markup.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)))].sort();
for (const section of previewSections) {
  const darkStart = preview.indexOf(`<article class="theme-preview ${section} dark"`);
  const lightStart = preview.indexOf(`<article class="theme-preview ${section} light"`);
  const nextSection = previewSections[previewSections.indexOf(section) + 1];
  const nextStart = nextSection
    ? preview.indexOf(`<article class="theme-preview ${nextSection} dark"`, lightStart)
    : preview.length;
  assert.ok(darkStart >= 0 && lightStart > darkStart && nextStart > lightStart, `Missing dark/light preview pair: ${section}`);
  const darkEnd = preview.lastIndexOf("</article>", lightStart);
  const lightEnd = preview.lastIndexOf("</article>", nextStart);
  const darkClasses = previewClasses(preview.slice(darkStart, darkEnd + "</article>".length)).filter((name) => name !== "dark");
  const lightClasses = previewClasses(preview.slice(lightStart, lightEnd + "</article>".length)).filter((name) => name !== "light");
  assert.deepEqual(lightClasses, darkClasses, `${section} dark and light previews must show the same component inventory`);
}
assert.ok(preview.includes('data-preview-theme="light"'), "Light previews must use light theme adapters");
assert.ok(preview.includes('<p class="preview-label">Light theme</p>'), "Light previews must identify their theme");
const previewIds = [...preview.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(previewIds).size, previewIds.length, "Preview element IDs must be unique across theme fixtures");


// Light Home and Competition fixtures must not place dark text on the dark page canvas.
assert.ok(previewStyles.includes(".theme-preview.home.light,\n.theme-preview.competition.light {\n  --ds-color-canvas: #f0f5fa;"));


// The isolated Codeforces light fixture mirrors its live html[data-theme="light"] stage tokens.
assert.ok(previewStyles.includes(".theme-preview.codeforces.light {\n  --ds-stage-option-color: #294967;\n  --ds-stage-active-background: #e1effc;\n  --ds-stage-active-border: #9bbfdf;\n  --ds-stage-muted: #607991;"));


// Each theme article has a stable anchor for isolated mobile screenshot capture.
for (const section of previewSections) {
  for (const theme of ["dark", "light"]) {
    assert.ok(preview.includes(`id="${section}-${theme}-preview"`), `Missing screenshot anchor for ${section} ${theme}`);
  }
}


// Live page compositions are represented by reusable, source-mapped primitives.
const pageCompositionSelectors = [
  "ds-page-hero", "ds-page-hero__title", "ds-shortcut-card", "ds-launch-card",
  "ds-overview-card", "ds-course-card", "ds-semester-layout", "ds-semester-option",
  "ds-account-panel", "ds-checklist-panel", "ds-checklist__item", "ds-milestone-card",
];
for (const selector of pageCompositionSelectors) {
  assert.ok(components.includes(selector), `Missing page-composition primitive: ${selector}`);
  assert.ok(preview.includes(selector), `Missing live page-composition fixture: ${selector}`);
}
const pageCompositionFixtures = [
  ["Home", ["ds-shortcut-grid", "ds-page-hero", "ds-launch-grid"]],
  ["Probability", ["sample-record-panel", "ds-page-hero", "ds-overview-grid--four"]],
  ["Metallurgy", ["ds-semester-layout", "ds-course-card-grid", "ds-semester-sidebar"]],
  ["Competition", ["ds-checklist-panel", "ds-checklist__item", "ds-overview-card"]],
  ["Codeforces", ["ds-account-panel", "ds-milestone-grid", "ds-launch-grid"]],
];
for (const [section, selectors] of pageCompositionFixtures) {
  for (const selector of selectors) {
    assert.ok(preview.includes(selector), `Missing ${section} live composition: ${selector}`);
  }
}
