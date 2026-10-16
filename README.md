# dogfood-assets

Not part of the library. This orphan branch holds the proof-of-testing for the
[v2 modernization milestone](https://github.com/jofftiquez/vue-morphling/milestone/2):

- `issue-<n>/` holds the screenshots posted on each issue
- `apps/` holds the throwaway apps used for dogfooding (sources only, no `node_modules`)
  - `vue3-vite-app/`: `create-vue --ts --bare`, Vue 3.5 + Vite 8 + vue-tsc (#66)
  - `vue2-vite-app/`: Vue 2.7 + Vite 7 + `@vitejs/plugin-vue2`, plus a `tsc` check against Vue 2.7 types (#67)
  - `nuxt-app/`: `nuxi init --template minimal`, Nuxt 4.6 SSR with `app/plugins/morphling.ts` (#68)
  - `cdn-umd/`: plain HTML with Vue 2 / Vue 3 global builds; `?cdn=1` loads everything from unpkg + jsDelivr (#69)
  - `xss-compare/`: published 1.2.1 vs the v2 build side by side (#63)
  - `shared/`: the CSS and the self-check script (`data-expect` / `data-check` rows → ✅/❌ + banner + `window.__dogfood`)
- `tools/` holds the Playwright scripts that drove headless Chromium (`dogshot.mjs` fails on any console error or `[Vue warn]`)

## Re-running an app

Each app installs the library from a packed tarball, as a user would from npm:

```bash
# in the vue-morphling repo, on the v2 branch
yarn build && npm pack --pack-destination ../dogfood   # -> ../dogfood/vue-morphling-<version>.tgz

cd ../dogfood/vue3-vite-app      # copied from apps/
npm install ../vue-morphling-<version>.tgz
npm run build && npx vite preview
CHROME_BIN=/path/to/chrome node ../tools/dogshot.mjs http://localhost:4173/ out.png --click "#type,#push"
```
