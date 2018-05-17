
# VueMorphling

> IMPORTANT NOTE: morphling has been renamed to vue-mophling. The old morphling is now [framework agnostic](https://github.com/jofftiquez/morphling.js).

A collection of standard and custom VueJs filters and directives. 

It's MORPHLING time! **plays power ranger theme song.* *pun intented* 😂

## Contents

- [Installation](#installation)
- [Usage](#usage) 
- [Filters](#filters)
- [Directives](#directives)
- [Updates](#updates) (Breaking update - March 17, 2018 PHT - See pre-release)
- [Debug](#debug)
- [Contributing](https://github.com/jofftiquez/morphling/blob/master/CONTRIBUTING.md)
- [License](https://github.com/jofftiquez/morphling/blob/master/LICENSE)
- [Filter or directive request](https://github.com/jofftiquez/morphling/issues/14)

## Filters

- [morph-capitalize](#morph-capitalize)
- [morph-chop](#morph-chop)
- [morph-currency](#morph-currency)
- [morph-date](#morph-date) **UPDATED**
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

- [morph-url](#morph-url) (exprimental | read limitations)
- [morph-highlight](#morph-highlight) **NEW**

## Installation

**NPM**

`npm install vue-morphling --save`

**Yarn**

`yarn add vue-morphling`

**CDN**

`https://unpkg.com/vue-morphling/dist/vue-morphling.js`

## Usage

```
import Vue from 'vue';
import { VueMorphling } from 'vue-morphling';

// Use all filters and directives.
Vue.use(VueMorphling);
```

**or**

```
import Vue from 'vue';
import { morphDate, vMorphHighlight, morphLowerCase } from 'vue-morphling';

// Import only what you need.
Vue.use(morphDate);
Vue.use(vMorphHighlight);
Vue.use(morphLowerCase);
```

**or**

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.4/vue.js"></script>
<script src="https://unpkg.com/vue-morphling/dist/vue-morphling.js"></script>

<script>
  Vue.use(VueMorphling.VueMorphling); // Use all
  // Or
  Vue.use(VueMorphling.morphDate); // Use morh-date filter only;
  Vue.use(VueMorphling.vMorphHighlight); // Use v-morh-highlight directive only;
  // Vue stuff here
</script>
```

All filters are available in the Vue instance as well, so they can be use as `vm.$morphCapitalize` or `this.$morphCapitalize` if you are using single file component.

All directive name should be prepended with `v-`, `v-morph-url` like so.

# Morphling Filters

### morph-capitalize

> > `import { morphCapitalize } from 'vue-morphling';`

```html
<p>{{ 'numb' | morph-capitalize }}</p>
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

This filter chops off a `n` length of character in a give string using the `length` option.

*Syntax* 

`morph-chop(length, location)`


```html
<p>{{ 'Papercut' | morph-chop(2) }}</p>
<!-- Paperc -->

<p>{{ 'Papercut' | morph-chop(3, 'end') }}</p>
<!-- Paper -->

<p>{{ 'Papercut' | morph-chop(2, 'start') }}</p>
<!-- percut -->

<p>{{ 'Papercut' | morph-chop(3, 'start') }}</p>
<!-- ercut -->
```

```javascript
const msg1 = this.$morphChop('Papercut', 2);
const msg2 = this.$morphChop('Papercut', 3, 'end');
const msg3 = this.$morphChop('Papercut', 2, 'start');
const msg4 = this.$morphChop('Papercut', 2, 'start');

console.log(msg1); // Paperc
console.log(msg2); // Paper
console.log(msg3); // percut
console.log(msg4); // ercut
```

**API**

**option** | **value** | **default** | **required** | **description**
--- | --- | --- | --- | ---
`length` | any number | N/A | YES | Indicates the length of the string to be chopped off. 
`location` | `'start'`, `'end'` | `'end'` | NO | If NOT specified, `morph-chop` will chop off the string from the end.

[Back to top](#filters)

------

### morph-currency

> `import { morphCurrency } from 'vue-morphling';`

Prepend a currency symbol to a value.

*Syntax*

`morph-currency(code)`

```html
<p>{{ 100 | morph-currency('PHP')}}</p>
<!-- ₱100  -->
```

```javascript
const msg = this.$morphCurrency(100, 'PHP');
console.log(msg); // ₱100
```

**API**

**option** | **description**
--- | ---
`code` | Currency code of a country e.g. 'PHP', 'USD', 'AUD', 'GBP'. Default is `$` if not provided.

See [currencies.js](https://github.com/jofftiquez/morphling/blob/master/lib/currencies.js) from lib folder.

[Back to top](#filters)

------

### morph-date

> `import { morphDate } from 'vue-morphling';`

Format any valid date using moment's `format()` function. 

*Syntax*

`morph-date(format)`

*Note* - `morph-date` is now using using [`date-fns`](https://date-fns.org/).

```html
<p>{{ new Date() | morph-date('MMM DD, YYYY') }}</p>
<!-- Jul 26, 2017 -->

<p>{{ new Date() | morph-date('YYYY') }}</p>
<!-- 2017 -->

<p>{{ new Date() | morph-date('[Today is a] dddd') }}</p>
<!-- Wednesday -->
```

```javascript
const date = new Date('1976-03-20');

const formatted = this.$morphDate(date, 'MMM DD, YYYY');
const year = this.$morphDate(date, 'YYYY');
const time = this.$morphDate(new Date(), 'hh:mm A');

console.log(formatted); // Mar 20, 1976
console.log(year); // 1976
console.log(time); // 11:00 PM
```

**API**

All formats are available of course in the [moment documentation](https://momentjs.com/docs/#/parsing/string-format/), but here are some common examples.

[Back to top](#filters)

------

### morph-file-size

> `import { morphFileSize } from 'vue-morphling';`

Converts any number (as bytes) to it's equivalent, `Kb`, `Mb`, `Gb`, `Tb`, `Pb`, `Eb`, `Zb` and `Yb`.

```html
<code>{{ 1024 | morph-file-size }}</code>
<!-- 1.0 Kb -->

<p>{{ 10000000000 | morph-file-size }}</p>
<!-- 9.3 Gb -->
```

```javascript
const date = new Date('1976-03-20');

const a = this.$morphFileSize(1024);
const b = this.$morphFileSize(10000000000);

console.log(a); // 1.0 Kb
console.log(b); // 9.3 Gb
```

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
<pre>{{ obj | morph-json('\t') }}</pre>
<!--
{
    "favoriteBand": "Linkin Park"
}
-->
```

```javascript
const msg = this.$morphJson({"favoriteBand":"Linkin Park", 4})
console.log(msg);
// {
//    "favoriteBand": "Linkin Park"
// }
```

**API**

**option** | **value** | **default** | **required** | **description**
--- | --- | --- | --- | ---
`indent` | any number or "\t" | N/A | Not really | The value indicates the number of indent using spaces. If "\t" is used, the json will be indented using tab.

[Back to top](#filters)

------

### morph-lowercase

> `import { morphLowerCase } from 'vue-morphling';`

```html
<p>{{ "LOST IN THE ECHO" | morph-lowercase}}</p>
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

Gets the bytes size (number) of any javascript object and converts it to it's equivalent `Kb`, `Mb`, `Gb`, `Tb`, `Pb`, `Eb`, `Zb` and `Yb`.

```html
<code>{{ obj1 | morph-object-size }}</code>
<!-- 18.0 b -->

<p>{{ `Forget the wrong the i've done.` | morph-object-size }}</p>
<!-- 33.0 b -->
```

```javascript
const obj1 = {name:'Chester'};
const obj2 = `Forget the wrong the i've done.`;

const a = this.$morphObjectSize(obj1);
const b = this.$morphObjectSize(obj2);

console.log(a); // 18.0 b
console.log(b); // 33.0 b
```

------

### morph-placeholder

> `import { morphPlaceholder } from 'vue-morphling';`

Replaces the value with a give placeholder.

*Syntax*

`morph-truncate(placeholder)` 

`this.$morphTruncate(value, placeholder)`

```html
<p>{{ "Battle Symphony" | morph-truncate('New Divide') }}</p>
<!-- New Divide  -->
```

```javascript
const msg = this.$morphTruncate('Battle Symphony', 'New Divide');
console.log(msg); // New Divide
```

[Back to top](#filters)

------

### morph-replace

> `import { morphReplace } from 'vue-morphling';`

Replaces characer/s on a string with a given 'replacer' string. Accepts `RegEx` for better matching.

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
<p>{{ 'Shadow of the day' | morph-reverse}}</p>
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

If only a single argument is given, it is used to surround the sandwiched
content by matching open brackets for closed brackets, and so on.

*Syntax*

`morph-sandwich(start, end)`

```html
<p>{{ 'the' | morph-sandwich('In ', ' end!') }}</p>
<!-- In the end!  -->

<p>{{{ 'Numb' | morph-sandwich('<<< ') }}}</p>
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
<!-- Leave out a...  -->
```

```javascript
const msg = this.$morphTruncate('Leave out all the rest', 11);
console.log(msg); // Leave out a...
```

[Back to top](#filters)

------

### morph-uppercase

> `import { morphUpperCase } from 'vue-morphling';`

```html
<p>{{ "somewhere i belong" | morph-uppercase}}</p>
<!-- SOMEWHERE I BELONG  -->
```

```javascript
const msg = this.$morphUppercase('somewhere i belong');
console.log(msg); // SOMEWHERE I BELONG
```

[Back to top](#filters)

------

# Morphling Directives

## morph-url

> `import { vMorphUrl } from 'vue-morphling';`

*morph-url* is currently on experimental stage. The current version has some limitations: 

1. When a link/url appears twice in the string it will mess up the tags.

`morph-url` directive converts every link in a given element to an `<a>` tag.

*Usage*

`v-morph-url`, prepend `v-` to any directive name.

*Before morphling*
```html
<p>
  My favorite websites are https://9gag.com and https://greenfox.me
</p>
```

*After morphling*
```html
<p v-morph-url>
  My favorite websites are <a href="https://9gag.com" target="_blank">https://9gag.com</a> and <a href="https://greenfox.me" target="_blank">https://greenfox.me</a>
</p>
```

## morph-highlight

> `import { vMorphHighlight } from 'vue-morphling';`

This directive will highlight the any matching string with a color of your choice! Yep, just like a highlighter pen.

*Usage*

`v-morph-highlight`, prepend `v-` to any directive name.

Pass the params as string, like, `'cats::#7fad33'` use `::` as separator for the string to be highlighted and color. *Syntax* `'string::color'` where string is any string and color is any color, hex color, rgb and rgba.

*Before morphling*
```html
<p>
  Cats are the best dogs! I love cats!
</p>
```

*After morphling*
```html
<p v-morph-highlight="'cats::#7fad33'">
  Cats are the best dogs! I love cats!
</p>
```
![Screen Shot](https://i.imgur.com/LaIlRVJ.png)


## Updates

*0.8.0-alpha.1 - May 17, 2018 PHT* 
- Updated the way filters are imported for tree shaking purposes. See [usage](#usage).

*0.7.4 - May 15, 2018 PHT*
- Added [morph-highlight](#morph-highlight)

*0.7.x - March 7, 2018 PHT*
- I'm sorry for the trouble. But I had to depricate `morphling` and rename it to `vue-morphling` because I am working on a different version of this library. The new `mophling.js` is pure javascript version of this plugin which you can use in both nodejs or vanilla. [See updates here](https://github.com/jofftiquez/morphling.js)

*0.6.0 - Feb 21, 2018 PHT*

- Replaced moment with date-fns. I replaced moment with date-fns because [these reasons](https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189). There are no breaking changes in terms of using `morph-date`.

*0.5.0 - Oct 26, 2017 PHT*

- Added [morph-file-size](#morph-file-size).
- Added [morph-object-size](#morph-object-size).
- Used `webpack` AGAIN to build the dist.
- Removed `babel`.
- Added `var` build version for CDN.

*Sept 26, 2017 PHT*

- Replaced `webpack` with plain `babel`
- Changed indetion from 4 spaces to 2 spaces.
- Fixed export error.
- Fixed moment import bug.

*July 29, 2017 PHT*

- Added [v-morph-url](#v-morph-url) directive.
- `morphs` folder remaned to `filters`.

*July 28, 2017 PHT*

- Updated [morph-sandwich](#morph-sandwich) filter.
- Added [morph-replace](#morph-replace) filter.
- Added [morph-truncate](#morph-truncate) filter.
- Added [morph-placeholder](#morph-placeholder) filter.
- Added [morph-curreny](#morph-curreny) filter.
- Added [morph-sandwich](#morph-sandwich) filter.

## Debug

**ERROR in build.js from UglifyJs**

There is a known error when building a **vue cli x webpack** project that is using `morphling`.

> ERROR in build.js from UglifyJs

> Unexpected token: punc (() [../morphling/index.js:5,4][build.js:15630,10]

**Fix:**

1. Add `es2015` and `stage-2` presets to the `.babelrc`
2. Include `morphling` to the `babel-loader` in `build/webpack.base.conf.js`

*build/webpack.base.conf.js*
```javascript
...
module: {
  rules: [
    ...
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test'), resolve('node_modules/morphling')]
    }
    ...
  ]
}
...
```

Helpful links : 
- [Stackoverflow](https://stackoverflow.com/a/43893311/2889614)
- [GitHub](https://github.com/joeeames/WebpackFundamentalsCourse/issues/3)

*"When my time comes,
Forget the wrong that I've done,
Help me leave behind some,
Reasons to be missed,
Don't resent me,
And when you're feeling empty,
Keep me in your memory,
Leave out all the rest..."*

*In Memory of Chester Bennington (1976-2017)*

I used Linkin Park songs as example strings to pay tribute to the death of Chester Bennington. One of my inspirations in music. Depression is very real, we may not fully understand it but it is very, very real. Talk to your love ones, and cherish every moment with them. Happy coding.

Made with ❤️ by Jofferson Ramirez Tiquez







