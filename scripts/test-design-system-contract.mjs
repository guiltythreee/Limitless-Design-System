import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = read("../shared/design-system/tokens.css");
const components = read("../src/components.css");
const contracts = read("../docs/component-contracts.md");

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

for (const component of [
  ".ds-button", ".ds-button--primary", ".ds-button--secondary", ".ds-button--quiet",
  ".ds-surface", ".ds-field", ".ds-tabs", ".ds-tab", ".ds-badge", ".ds-nav", ".ds-nav-link",
]) {
  assert.ok(components.includes(component), `Missing component contract: ${component}`);
  assert.ok(contracts.includes(component), `Missing documentation for component: ${component}`);
}

assert.match(tokens, /NOT imported by any application yet/);
assert.match(components, /opt-in/);
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
console.log("5 section adapters; 6 component primitives; scoped CSS; accessibility contracts documented.");
