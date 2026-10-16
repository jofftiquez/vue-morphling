# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`vue-morphling` is a plugin library of filters and directives that supports **both Vue 2 (2.6/2.7) and Vue 3** from one codebase. It is published to npm; the built `dist/` is committed.

## Commands

Yarn 1 is the package manager (`yarn.lock`). The dev toolchain needs Node ≥ 22.18 (Babel 8); see `.nvmrc`.

- `yarn test` — run all Jest tests (every suite runs against Vue 2.7 **and** Vue 3)
- `yarn test src/filters/currency` — run one suite (or `yarn test -t 'prefixes the currency'`)
- `yarn test:types` — type-check `types/vue-morphling.d.ts` via `test/types/usage.ts` (uses `@ts-expect-error` cases)
- `yarn lint` — `semistandard --fix` (semicolons, space before function parens, no trailing commas)
- `yarn build` — `prebuild` deletes `dist/`, then runs lint, tests and type tests, then `rollup -c`. A failure blocks the build.

When running Jest from an agent shell, `AI_AGENT`/`CLAUDECODE` env vars make Jest 30 suppress per-test output; unset them (`env -u AI_AGENT -u CLAUDECODE npx jest --verbose`) to see it.

CI: GitHub Actions (`.github/workflows/ci.yml`, Node 22 + 24) runs on PRs; CircleCI (`cimg/node:24.22`) runs `yarn build` and `npm publish` on `v*` tags.

## Architecture

- **Filters** (`src/filters/<name>/<name>.js`) export a plain function plus a definition `{ filter: 'morph-x', method: '$morphX', fn }`. No Vue API calls.
- **Directives** (`src/directives/<name>/index.js`) export `{ directive: 'morph-x', apply(el, binding) }`. They read `el.textContent`, and must build HTML only through `src/lib/html.js` (`escapeHtml` / `replaceMatches`), which escapes all text. Writing unescaped text to `innerHTML` reintroduces an XSS bug fixed in v2.
- **`src/utils/register.js`** is the only Vue-version-aware code. It detects the runtime from what `use()` receives: a Vue 3 app has `config.globalProperties`; Vue 2 gets the constructor. Vue 2 gets `Vue.filter('morph-x')` + `Vue.prototype.$morphX` (the filter wrapper returns `undefined` for falsy input). Vue 3 gets `app.config.globalProperties.$morphX` only (no filters in Vue 3). Directives register `bind` (Vue 2) or `mounted` (Vue 3).
- **`src/index.js`** is the public API. It builds a standalone plugin per definition (`morph*`, `vMorph*`), plus `VueMorphling` (installs everything) and `morphFilters` (the plain functions, keyed by method name without `$morph`).

**Adding a filter or directive touches:** its own folder, the barrel (`src/filters/index.js` or `src/directives/index.js`), `src/index.js` (the `filters`/`directives` array and a standalone export), `types/vue-morphling.d.ts`, and `DOC.md`.

`src/lib/` holds the shared helpers: `currencies.js` (static table), `format-bytes.js` (wraps filesize 11 and keeps the 1.x base-2/JEDEC defaults unless the caller passes `base`/`standard`), `utf8-length.js` (used instead of `TextEncoder`, which jsdom lacks), and `html.js`.

## Tests

`test/vue.js` is the shared harness. `targets` holds the Vue 2 (`vue2` alias → `npm:vue@2.7`) and Vue 3 (`vue`) runtimes. `target.install(plugin)` returns `{ globals, render(template, data) }` with real mounted apps, torn down after each test. `describeFilter(plugin, { filter, method, cases })` checks each case via `morphFilters`, the global method, a template method call and (Vue 2 only) the pipe syntax. Tests import the public plugins from `src/index`.

## Build output

`rollup.config.mjs` emits `dist/vue-morphling.mjs` (ESM) and `.cjs` (CJS) with runtime deps (`date-fns`, `filesize`) external, plus `dist/vue-morphling.js` (UMD, minified, deps bundled, global `VueMorphling`). The build does not run Babel; Babel is only used by Jest. Types live in `types/` (hand-written, not generated).

## Docs

User-facing docs are in `DOC.md`, mirrored to GitBook (https://jofftiquez.gitbook.io/vue-morphling/). `README.md` is a short intro.
