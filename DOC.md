
# VueMorphling

[![CI](https://github.com/jofftiquez/vue-morphling/actions/workflows/ci.yml/badge.svg)](https://github.com/jofftiquez/vue-morphling/actions/workflows/ci.yml) ![npm bundle size](https://img.shields.io/bundlephobia/min/vue-morphling) <span class="badge-buymeacoffee"><a href="https://www.buymeacoffee.com/jofftiquez" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-green.svg" alt="Buy Me A Coffee donate button" /></a></span>

A collection of standard and custom filters and directives for **Vue 2 and Vue 3**.

It's MORPHLING time! **plays power ranger theme song.* *pun intented* 😂

## Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Vue 3](#vue-3)
  - [Vue 2](#vue-2)
  - [Nuxt](#nuxt)
  - [CDN](#cdn)
  - [Plain functions (`morphFilters`)](#plain-functions-morphfilters)
  - [TypeScript](#typescript)
- [Filters](#filters)
- [Directives](#directives)
- [Migrating from 1.x to 2.x](#migrating-from-1x-to-2x)
- [Updates](#updates)
- [Contributing](https://github.com/jofftiquez/vue-morphling/blob/main/CONTRIBUTING.md)
- [License](https://github.com/jofftiquez/vue-morphling/blob/main/LICENSE)
- [Filter or directive request](https://github.com/jofftiquez/vue-morphling/issues/14)

## Filters

- [morph-age](#morph-age)
- [morph-arr-reverse](#morph-arr-reverse)
- [morph-arr-sort](#morph-arr-sort)
- [morph-capitalize](#morph-capitalize)
- [morph-chop](#morph-chop)
- [morph-currency](#morph-currency)
- [morph-date](#morph-date) **REMOVED**
- [morph-date-format](#morph-date-format)
- [morph-file-size](#morph-file-size)
- [morph-json](#morph-json)
- [morph-lowercase](#morph-lowercase)
- [morph-object-size](#morph-object-size)
- [morph-placeholder](#morph-placeholder)
- [morph-replace](#morph-replace)
- [morph-reverse](#morph-reverse)
- [morph-sandwich](#morph-sandwich)
- [morph-truncate](#morph-truncate)
- [morph-uppercase](#morph-uppercase)

## Directives

- [morph-url](#morph-url)
- [morph-email](#morph-email)
- [morph-highlight](#morph-highlight)

## Installation

**NPM**

`npm install vue-morphling`

**Yarn**

`yarn add vue-morphling`

**CDN**

`https://unpkg.com/vue-morphling/dist/vue-morphling.js` (exposes `window.VueMorphling`)

## Usage

Every filter is available in two forms:

| | Vue 2 | Vue 3 |
|---|---|---|
| Filter (pipe) syntax | `{{ 'numb' \| morph-capitalize }}` | not available (Vue 3 removed filters) |
| Global method in templates | `{{ $morphCapitalize('numb') }}` | `{{ $morphCapitalize('numb') }}` |
| Global method in code | `this.$morphCapitalize('numb')` | `this.$morphCapitalize('numb')` (Options API) |
| Plain function | `morphFilters.capitalize('numb')` | `morphFilters.capitalize('numb')` (`<script setup>`, composables, anywhere) |

Directives are used the same way in both versions: `v-morph-url`, `v-morph-email` and `v-morph-highlight`.

The method name is the filter name in camelCase with a `$morph` prefix (`morph-file-size` → `$morphFileSize`). The examples below show the Vue 2 pipe syntax and the global method. In Vue 3, use the global method.

### Vue 3

```javascript
import { createApp } from 'vue';
import { VueMorphling } from 'vue-morphling';
import App from './App.vue';

createApp(App)
  .use(VueMorphling) // all filters and directives
  .mount('#app');
```

```html
<template>
  <p>{{ $morphCapitalize('numb') }}</p>              <!-- Numb -->
  <p>{{ $morphFileSize(1536) }}</p>                  <!-- 1.5 KB -->
  <p v-morph-highlight="'numb::yellow'">Numb, so numb</p>
</template>
```

Or install only what you need:

```javascript
import { morphCapitalize, morphDateFormat, vMorphHighlight } from 'vue-morphling';

app.use(morphCapitalize).use(morphDateFormat).use(vMorphHighlight);
```

### Vue 2

Vue 2.6 and 2.7 are supported. Nothing changed for Vue 2 users.

```javascript
import Vue from 'vue';
import { VueMorphling } from 'vue-morphling';

// Use all filters and directives.
Vue.use(VueMorphling);
```

**or**

```javascript
import Vue from 'vue';
import { morphDateFormat, vMorphHighlight, morphLowerCase } from 'vue-morphling';

// Import only what you need.
Vue.use(morphDateFormat);
Vue.use(vMorphHighlight);
Vue.use(morphLowerCase);
```

```html
<p>{{ 'numb' | morph-capitalize }}</p>   <!-- Numb -->
<p>{{ $morphCapitalize('numb') }}</p>    <!-- Numb -->
```

### Nuxt

Register the plugin in a Nuxt plugin file. It works with SSR: filter output is rendered on the server.

```javascript
// plugins/morphling.ts (Nuxt 3 / 4, under app/plugins/ in Nuxt 4)
import { VueMorphling } from 'vue-morphling';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMorphling);
});
```

The directives rewrite the element's DOM, so they run on the client after hydration. With JavaScript disabled, their elements show the original text.

On the first `nuxt dev` run, Vite may print *"discovered new dependencies at runtime: vue-morphling"*. That message is harmless; to silence it, add `vite: { optimizeDeps: { include: ['vue-morphling'] } }` to `nuxt.config.ts`.

### CDN

```html
<!-- Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/vue-morphling/dist/vue-morphling.js"></script>

<script>
  Vue.createApp({ /* ... */ })
    .use(VueMorphling.VueMorphling) // Use all
    .mount('#app');
</script>
```

```html
<!-- Vue 2 -->
<script src="https://unpkg.com/vue@2.7.16/dist/vue.min.js"></script>
<script src="https://unpkg.com/vue-morphling/dist/vue-morphling.js"></script>

<script>
  Vue.use(VueMorphling.VueMorphling); // Use all
  // Or
  Vue.use(VueMorphling.morphDateFormat); // Use the morph-date-format filter only
  Vue.use(VueMorphling.vMorphHighlight); // Use the v-morph-highlight directive only
  // Vue stuff here
</script>
```

### Plain functions (`morphFilters`)

Every filter is also exported as a plain function. Use this where global properties aren't available: Vue 3 `<script setup>`, composables, stores, or code outside Vue.

```html
<script setup>
import { computed, ref } from 'vue';
import { morphFilters } from 'vue-morphling';

const title = ref('one more light');
const shout = computed(() => morphFilters.uppercase(title.value)); // ONE MORE LIGHT
</script>
```

The keys match the method names without the `$morph` prefix: `age`, `arrReverse`, `arrSort`, `capitalize`, `chop`, `currency`, `dateFormat`, `fileSize`, `json`, `lowercase`, `objectSize`, `placeholder`, `replace`, `reverse`, `sandwich`, `truncate`, `uppercase`.

### TypeScript

Type declarations ship with the package. They type the plugins and `morphFilters`, and they add `$morph*` to `ComponentCustomProperties` (templates and `this`, in Vue 3 and Vue 2.7) and the `v-morph-*` directives to `GlobalDirectives`. You don't need to configure anything.

All directive names need the `v-` prefix in templates, like `v-morph-url`.

# Morphling Filters

### morph-age

> `import { morphAge } from 'vue-morphling';`

Age in whole years, counting whether this year's birthday has already passed.

```html
<p>{{ new Date(1976, 2, 20) | morph-age }}</p>
<p>{{ $morphAge(new Date(1976, 2, 20)) }}</p>
<!-- 50 (on Oct 16, 2026) -->
```

```javascript
const birthday = new Date(1976, 2, 20);
const age = this.$morphAge(birthday);
console.log(age); // 50 (on Oct 16, 2026)
```

[Back to top](#filters)

------

### morph-arr-reverse

> `import { morphArrReverse } from 'vue-morphling';`

Returns a reversed **copy** of an array. The original array is left untouched.

```html
<p>{{ $morphArrReverse([1, 2, 3]).join(', ') }}</p>
<!-- 3, 2, 1 -->
```

```javascript
const list = [1, 2, 3];
console.log(this.$morphArrReverse(list)); // [3, 2, 1]
console.log(list); // [1, 2, 3]
```

[Back to top](#filters)

------

### morph-arr-sort

> `import { morphArrSort } from 'vue-morphling';`

Returns a sorted **copy** of an array of objects, by a numeric `key`, in `'asc'` or `'desc'` order.

*Syntax*

`morph-arr-sort(key, direction)`

```html
<li v-for="item in $morphArrSort(items, 'price', 'asc')">{{ item.name }}</li>
```

```javascript
const sorted = this.$morphArrSort([{ a: 4 }, { a: 6 }, { a: 2 }], 'a', 'asc');
console.log(sorted); // [{ a: 2 }, { a: 4 }, { a: 6 }]
```

[Back to top](#filters)

------

### morph-capitalize

> `import { morphCapitalize } from 'vue-morphling';`

```html
<p>{{ 'numb' | morph-capitalize }}</p>
<p>{{ $morphCapitalize('numb') }}</p>
<!-- Numb -->
```

```javascript
const msg = this.$morphCapitalize('numb');
console.log(msg); // Numb
```

[Back to top](#filters)

------

### morph-chop

> `import { morphChop } from 'vue-morphling';`

This filter chops off `length` characters from a given string.

*Syntax*

`morph-chop(length, location)`


```html
<p>{{ 'Papercut' | morph-chop(2) }}</p>
<!-- Paperc -->

<p>{{ 'Papercut' | morph-chop(3, 'end') }}</p>
<!-- Paper -->

<p>{{ 'Papercut' | morph-chop(2, 'start') }}</p>
<!-- percut -->

<p>{{ $morphChop('Papercut', 3, 'start') }}</p>
<!-- ercut -->
```

```javascript
const msg1 = this.$morphChop('Papercut', 2);
const msg2 = this.$morphChop('Papercut', 3, 'end');
const msg3 = this.$morphChop('Papercut', 2, 'start');
const msg4 = this.$morphChop('Papercut', 3, 'start');

console.log(msg1); // Paperc
console.log(msg2); // Paper
console.log(msg3); // percut
console.log(msg4); // ercut
```

**API**

**option** | **value** | **default** | **required** | **description**
--- | --- | --- | --- | ---
`length` | any number | N/A | YES | The number of characters to chop off.
`location` | `'start'`, `'end'` | `'end'` | NO | If NOT specified, `morph-chop` will chop off the string from the end.

[Back to top](#filters)

------

### morph-currency

> `import { morphCurrency } from 'vue-morphling';`

Prepend a currency symbol to a value.

*Syntax*

`morph-currency(code)`

```html
<p>{{ 100 | morph-currency('PHP') }}</p>
<p>{{ $morphCurrency(100, 'PHP') }}</p>
<!-- ₱100  -->
```

```javascript
const msg = this.$morphCurrency(100, 'PHP');
console.log(msg); // ₱100
```

**API**

**option** | **description**
--- | ---
`code` | Currency code of a country e.g. 'PHP', 'USD', 'AUD', 'GBP'. Defaults to `'USD'`; an unknown code falls back to `$`.

See [currencies.js](https://github.com/jofftiquez/vue-morphling/blob/main/src/lib/currencies.js) for every supported code.

[Back to top](#filters)

------

### morph-date

> `morph-date` has been removed. See [morph-date-format](#morph-date-format) for the updated date formatting method. I removed it to make room for future `morph-date-[foo]` methods, e.g. `morph-date-diff-minutes`.

### morph-date-format

> `import { morphDateFormat } from 'vue-morphling';`

Format a date using date-fns' `format()` function. Accepts a `Date`, a timestamp, or (since v2) an ISO date string.

*Syntax*

`morph-date-format(format)`

*Note:* `morph-date-format` uses [`date-fns@4`](https://date-fns.org/).

```html
<p>{{ new Date() | morph-date-format('MMM dd, yyyy') }}</p>
<!-- Jul 26, 2017 -->

<p>{{ $morphDateFormat(new Date(), 'yyyy') }}</p>
<!-- 2017 -->

<p>{{ $morphDateFormat('2017-07-26T10:30:00', "'Today is a' EEEE") }}</p>
<!-- Today is a Wednesday -->
```

```javascript
const date = new Date(1976, 2, 20);

const formatted = this.$morphDateFormat(date, 'MMM dd, yyyy');
const year = this.$morphDateFormat(date, 'yyyy');
const time = this.$morphDateFormat(new Date(), 'hh:mm a');

console.log(formatted); // Mar 20, 1976
console.log(year); // 1976
console.log(time); // 11:00 PM
```

**API**

Every format token is listed in the [date-fns format documentation](https://date-fns.org/docs/format).

[Back to top](#filters)

------

### morph-file-size

> `import { morphFileSize } from 'vue-morphling';`

Converts a number of bytes to a human-readable size: `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB` and `YB`. 1 KB = 1024 bytes.

**Options**

Options are passed to [filesize](https://github.com/avoidwork/filesize.js#optional-settings). Common ones are `{ round: 0 }` for the number of decimal places, `{ base: 10 }` for SI units (1 kB = 1000 B), and `{ standard: 'iec' }` for KiB/MiB.

```html
<code>{{ 1024 | morph-file-size({ round: 0 }) }}</code>
<!-- 1 KB -->

<p>{{ $morphFileSize(10000000000) }}</p>
<!-- 9.31 GB -->
```

```javascript
const a = this.$morphFileSize(1536);
const b = this.$morphFileSize(1000000, { base: 10 });

console.log(a); // 1.5 KB
console.log(b); // 1 MB
```

[Back to top](#filters)

------

### morph-json

> `import { morphJson } from 'vue-morphling';`

Pretty print JSON objects inside the `<pre>` tag.

*Syntax*

`morph-json(indent)`

```html
<!-- const obj = {"favoriteBand":"Linkin Park"} -->
<pre>{{ obj | morph-json(2) }}</pre>
<!--
{
  "favoriteBand": "Linkin Park"
}
-->
<pre>{{ $morphJson(obj, '\t') }}</pre>
<!--
{
	"favoriteBand": "Linkin Park"
}
-->
```

```javascript
const msg = this.$morphJson({ favoriteBand: 'Linkin Park' }, 4);
console.log(msg);
// {
//     "favoriteBand": "Linkin Park"
// }
```

**API**

**option** | **value** | **default** | **required** | **description**
--- | --- | --- | --- | ---
`indent` | any number or "\t" | N/A | NO | The number of spaces to indent with. Pass "\t" to indent with tabs.

[Back to top](#filters)

------

### morph-lowercase

> `import { morphLowerCase } from 'vue-morphling';`

```html
<p>{{ "LOST IN THE ECHO" | morph-lowercase }}</p>
<p>{{ $morphLowercase('LOST IN THE ECHO') }}</p>
<!-- lost in the echo  -->
```

```javascript
const msg = this.$morphLowercase('LOST IN THE ECHO');
console.log(msg); // lost in the echo
```

[Back to top](#filters)

------

### morph-object-size

> `import { morphObjectSize } from 'vue-morphling';`

Gets the size of any JavaScript value as UTF-8 encoded JSON, as a human-readable size: `B`, `KB`, `MB`, and so on.

**Options**

Same as [morph-file-size](#morph-file-size).

```html
<code>{{ { name: 'Chester' } | morph-object-size }}</code>
<!-- 18 B -->

<p>{{ $morphObjectSize(`Forget the wrong that I've done.`) }}</p>
<!-- 34 B -->
```

```javascript
const a = this.$morphObjectSize({ name: 'Chester' });
const b = this.$morphObjectSize(`Forget the wrong that I've done.`);

console.log(a); // 18 B
console.log(b); // 34 B
```

[Back to top](#filters)

------

### morph-placeholder

> `import { morphPlaceholder } from 'vue-morphling';`

Replaces the value with a given placeholder.

*Syntax*

`morph-placeholder(placeholder)`

`this.$morphPlaceholder(value, placeholder)`

```html
<p>{{ "Battle Symphony" | morph-placeholder('New Divide') }}</p>
<!-- New Divide  -->
```

```javascript
const msg = this.$morphPlaceholder('Battle Symphony', 'New Divide');
console.log(msg); // New Divide
```

[Back to top](#filters)

------

### morph-replace

> `import { morphReplace } from 'vue-morphling';`

Replaces part of a string with a given 'replacer' string. Accepts a `RegExp` for more flexible matching.

*Syntax*

`morph-replace(replacee|regex, replacer)`

`this.$morphReplace(value, replacee|regex, replacer)`

```html
<!-- Plain String -->
<p>{{ `I've given uuuuuup!!` | morph-replace('given', 'new word') }}</p>
<!-- I've new word uuuuuup!!  -->

<!-- With Regex -->
<p>{{ `I've given uuuuuup!!` | morph-replace(/i've/i, 'I have') | morph-replace(/uuuuuup!!/i, 'up.') }}</p>
<!-- I have given up.  -->
```

```javascript
// replaced the word 'end' with 'start'.
const msg = this.$morphReplace('In the end', /end/i, 'start.');
console.log(msg); // In the start.
```

[Back to top](#filters)

------

### morph-reverse

> `import { morphReverse } from 'vue-morphling';`

```html
<p>{{ 'Shadow of the day' | morph-reverse }}</p>
<p>{{ $morphReverse('Shadow of the day') }}</p>
<!-- yad eht fo wodahS  -->
```

```javascript
const msg = this.$morphReverse('Shadow of the day');
console.log(msg); // yad eht fo wodahS
```

[Back to top](#filters)

------

### morph-sandwich

> `import { morphSandwich } from 'vue-morphling';`

Prepend and append data around a given value.

If only one argument is given, it is used on both sides, mirrored: opening brackets become closing brackets, and so on.

*Syntax*

`morph-sandwich(start, end)`

```html
<p>{{ 'the' | morph-sandwich('In ', ' end!') }}</p>
<!-- In the end!  -->

<p>{{ $morphSandwich('Numb', '<<< ') }}</p>
<!-- <<< Numb >>> -->
```

```javascript
const msg1 = this.$morphSandwich('the', 'In ', ' end!');
console.log(msg1); // In the end!

const msg2 = this.$morphSandwich('Numb', '<<< ');
console.log(msg2); // <<< Numb >>>
```

[Back to top](#filters)

------

### morph-truncate

> `import { morphTruncate } from 'vue-morphling';`

```html
<p>{{ 'Leave out all the rest' | morph-truncate(11) }}</p>
<p>{{ $morphTruncate('Leave out all the rest', 11) }}</p>
<!-- Leave out a…  -->
```

```javascript
const msg = this.$morphTruncate('Leave out all the rest', 11);
console.log(msg); // Leave out a…
```

[Back to top](#filters)

------

### morph-uppercase

> `import { morphUpperCase } from 'vue-morphling';`

```html
<p>{{ "somewhere i belong" | morph-uppercase }}</p>
<p>{{ $morphUppercase('somewhere i belong') }}</p>
<!-- SOMEWHERE I BELONG  -->
```

```javascript
const msg = this.$morphUppercase('somewhere i belong');
console.log(msg); // SOMEWHERE I BELONG
```

[Back to top](#filters)

------

# Morphling Directives

Directives run once, when the element is mounted (`bind` in Vue 2, `mounted` in Vue 3), and rewrite the element's text. The text is always HTML-escaped first, so they are safe to use on user content like `<p v-morph-url>{{ comment }}</p>`. They don't re-run when the text changes afterwards.

## morph-url

> `import { vMorphUrl } from 'vue-morphling';`

`morph-url` converts every `http://`, `https://` and `ftp://` link in an element's text to an `<a>` tag that opens in a new tab. An optional value is applied as the links' inline style.

*Usage*

`v-morph-url`, prepend `v-` to any directive name.

*Before morphling*
```html
<p v-morph-url="'color: hotpink'">
  My favorite websites are https://9gag.com and https://greenfox.me
</p>
```

*After morphling*
```html
<p>
  My favorite websites are <a target="_blank" rel="noopener noreferrer" href="https://9gag.com" style="color: hotpink">https://9gag.com</a> and <a target="_blank" rel="noopener noreferrer" href="https://greenfox.me" style="color: hotpink">https://greenfox.me</a>
</p>
```

## morph-email

> `import { vMorphEmail } from 'vue-morphling';`

`morph-email` converts every email address in an element's text to a `mailto:` link.

*Before morphling*
```html
<p v-morph-email>Mail jo@example.com or support@example.com</p>
```

*After morphling*
```html
<p>Mail <a target="_blank" rel="noopener noreferrer" href="mailto:jo@example.com">jo@example.com</a> or <a target="_blank" rel="noopener noreferrer" href="mailto:support@example.com">support@example.com</a></p>
```

## morph-highlight

> `import { vMorphHighlight } from 'vue-morphling';`

This directive highlights every match of a string, case-insensitively, with a color of your choice. Yep, just like a highlighter pen.

*Usage*

`v-morph-highlight`, prepend `v-` to any directive name.

Pass the params as a string like `'cats::#7fad33'`, using `::` to separate the string to highlight from the color. *Syntax:* `'string::color'`, where string is any string (matched literally) and color is any CSS color: a name, hex, rgb or rgba.

*Before morphling*
```html
<p v-morph-highlight="'cats::#7fad33'">
  Cats are the best dogs! I love cats!
</p>
```

*After morphling*
```html
<p>
  <mark style="background-color: #7fad33">Cats</mark> are the best dogs! I love <mark style="background-color: #7fad33">cats</mark>!
</p>
```
![Screen Shot](https://i.imgur.com/LaIlRVJ.png)

## Migrating from 1.x to 2.x

Vue 2 apps keep working without code changes. Points to check:

- **Vue 3 is supported.** Use `app.use(VueMorphling)` and call filters as `{{ $morphX(...) }}`, since Vue 3 has no pipe filters. See [Usage](#usage).
- **Build files were renamed.** The package now ships `dist/vue-morphling.mjs` (ESM), `dist/vue-morphling.cjs` (CommonJS, now `main`) and `dist/vue-morphling.js` (UMD, global `VueMorphling`). `dist/index.js` and `dist/vue-stripe-checkout.js` are gone. Imports from `'vue-morphling'` are unaffected; only deep imports of the old file names need updating.
- **`morph-file-size` / `morph-object-size`** use filesize 11 and keep the 1.x output (1 KB = 1024 B) by default. The one visible difference: bit units with `{ bits: true }` print as `Kbit` where 1.x printed `Kb`.
- **`morph-date-format`** uses date-fns 4. It also accepts ISO date strings now, which used to throw.
- **Bug fixes that change output:**
  - `morph-age` now accounts for birthdays that haven't happened yet this year.
  - `morph-arr-reverse` and `morph-arr-sort` no longer mutate the array you pass in.
  - `morph-uppercase` accepts non-strings.
  - `v-morph-highlight` keeps the original casing of matches.
  - `v-morph-url` and `v-morph-email` handle any number of matches.
- **Security:** the directives now HTML-escape the element's text. In 1.x, text such as `<img onerror=…>` interpolated from user input was turned into live HTML.
- **Removed transitive dependencies:** 12 unused runtime dependencies (lodash, handlebars, js-yaml, etc.) are no longer installed along with vue-morphling.
- **TypeScript declarations** are now included.

## Updates

*2.0.0*
- Vue 3 support, alongside Vue 2.6 / 2.7.
- `morphFilters` export with the plain filter functions.
- TypeScript declarations.
- ESM, CJS and UMD builds with an `exports` map; the documented CDN file now exists.
- date-fns 4, filesize 11; Rollup 4, Jest 30, Babel 8, semistandard 17.
- Fixed XSS in the directives, `morph-replace` missing from `VueMorphling`, and the other bugs listed in [Migrating](#migrating-from-1x-to-2x).

*1.0.0 and up - Dec. 20, 2019 PHT*
- `morph-date` replaced with `morph-date-format`.
- Test scripts are now inside their respective filter folders.
- Update build strategy
  - From webpack to rollup
  - Update all babel related dependencies
  - Update date-fns to v1.30.1
