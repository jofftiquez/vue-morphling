# CONTRIBUTING

All sorts of contributions are welcome. Please help me add more helpful filters for VueJs.

## Features

For *Enhancement* or *New feature*.

Make sure to follow the coding pattern:

- A filter is a plain function plus a definition, `{ filter: 'morph-x', method: '$morphX', fn }`, in `src/filters/<name>/<name>.js`. A directive is `{ directive: 'morph-x', apply(el, binding) }` in `src/directives/<name>/index.js`. Don't call Vue APIs directly; `src/utils/register.js` handles both Vue 2 and Vue 3.
- Register a new filter or directive in its barrel (`src/filters/index.js` / `src/directives/index.js`) and in `src/index.js` (the `filters`/`directives` arrays plus a standalone `morph*`/`vMorph*` export), and add it to `types/vue-morphling.d.ts`.
- Add tests with the shared harness in `test/vue.js` (`describeFilter`), so they run on both Vue 2 and Vue 3.
- Run `yarn lint`, `yarn test` and `yarn test:types` before opening a PR.

The contributor is also responsible for documenting the change in `DOC.md`.
