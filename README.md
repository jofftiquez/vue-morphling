# VueMorphling

[![CI](https://github.com/jofftiquez/vue-morphling/actions/workflows/ci.yml/badge.svg)](https://github.com/jofftiquez/vue-morphling/actions/workflows/ci.yml) ![npm bundle size](https://img.shields.io/bundlephobia/min/vue-morphling) <span class="badge-buymeacoffee"><a href="https://www.buymeacoffee.com/jofftiquez" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-green.svg" alt="Buy Me A Coffee donate button" /></a></span>

A collection of standard and custom filters and directives for **Vue 2 and Vue 3** (and Nuxt).

It's MORPHLING time! **plays power ranger theme song.* *pun intended* 😂

```bash
npm install vue-morphling
```

```javascript
// Vue 3
import { createApp } from 'vue';
import { VueMorphling } from 'vue-morphling';

createApp(App).use(VueMorphling).mount('#app');
// <p>{{ $morphCapitalize('numb') }}</p>  ->  Numb
```

```javascript
// Vue 2
import Vue from 'vue';
import { VueMorphling } from 'vue-morphling';

Vue.use(VueMorphling);
// <p>{{ 'numb' | morph-capitalize }}</p>  ->  Numb
```

[Documentation](https://jofftiquez.gitbook.io/vue-morphling/) · [DOC.md](DOC.md) · [Migrating from 1.x](DOC.md#migrating-from-1x-to-2x)

Made with ❤️ by Jofferson Ramirez Tiquez
