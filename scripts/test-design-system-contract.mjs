import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = read("../shared/design-system/tokens.css");
const components = read("../src/components.css");
const contracts = read("../docs/component-contracts.md");
const audit = read("../docs/live-component-audit.md");
const mapping = read("../docs/component-mapping-spec.md");

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
  ".ds-button", ".ds-button--primary", ".ds-button--secondary", ".ds-button--quiet",
  ".ds-surface", ".ds-field", ".ds-tabs", ".ds-tab", ".ds-badge", ".ds-nav", ".ds-nav-link",
];
for (const selector of componentSelectors) {
  assert.ok(components.includes(selector), `Missing component selector: ${selector}`);
}

const documentedPrimitives = [
  ".ds-button", ".ds-surface", ".ds-field", ".ds-tabs", ".ds-tab",
  ".ds-badge", ".ds-nav", ".ds-nav-link",
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
console.log("5 section adapters; 6 component primitives; scoped CSS; accessibility contracts and live component audit documented.");
