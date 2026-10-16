# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`vue-morphling` is a **Vue 2** plugin library of filters and directives (Vue 2 filters do not exist in Vue 3). It is published to npm; the built `dist/` is committed.

## Commands

Yarn is the package manager (`yarn.lock`).

- `yarn test` — run all Jest tests
- `yarn test src/filters/currency` — run a single filter's tests (any path/pattern works: `yarn test -t 'should add currency'`)
- `yarn lint` — `semistandard --fix` (auto-fixes; semicolons required, space before function parens). `src/directives/email` and `dist` are lint-ignored.
- `yarn build` — Rollup build. `prebuild` first deletes `dist/`, then runs lint and tests, so a failing test or lint error blocks the build.

Release: CircleCI runs tests and `npm publish` only on `v*` tags.

## Architecture

Each filter lives in `src/filters/<name>/` with three files:
- `<name>.js` — exports a function `(Vue) => { ... }` that does two things: registers a global filter `Vue.filter('morph-<name>', ...)` and attaches the same logic as `Vue.prototype.$morph<Name>` so it can be called from component code. The filter wrapper usually returns early on falsy input; the prototype method does not.
- `index.js` — `export * from './<name>'`
- `<name>.test.js` — tests use `createLocalVue()` from `@vue/test-utils`, `localVue.use(fn)`, then assert on `localVue.prototype.$morph<Name>(...)`.

Directives in `src/directives/<name>/index.js` follow the same `(Vue) => Vue.directive('morph-<name>', { bind })` shape and have no tests. They rewrite `el.innerHTML` from the element's `innerText`.

`src/index.js` is the public API. It wraps every filter/directive registration function in a Vue plugin object (`morph<Name>` for filters, `vMorph<Name>` for directives) and exports `VueMorphling`, which installs everything.

**Adding a filter or directive requires touching three places:** its own folder, the barrel (`src/filters/index.js` or `src/directives/index.js`), and `src/index.js` (both a standalone plugin export *and* a call inside `VueMorphling.install`). Note that `replace` is currently exported as `morphReplace` but is missing from `VueMorphling.install`.

`src/lib/currencies.js` is the static currency code/symbol table used by `morph-currency`.

## Build output quirks

`rollup.config.js` emits `dist/index.js` (ESM, the package `main`) and `dist/vue-stripe-checkout.js` (UMD with global `VueStripeCheckout`). These names are leftovers copied from another project. The docs reference `dist/vue-morphling.js` and a `VueMorphling` global, which the current build does not produce.

## Docs

User-facing docs are in `DOC.md`, mirrored to GitBook (https://jofftiquez.gitbook.io/vue-morphling/). `README.md` is only a short stub. CONTRIBUTING asks contributors to document new filters/directives; add them to `DOC.md`.
