# Mophling

A collection of standard and custom VueJs filters and directives. 

It's MORPHLING time! **plays power ranger theme song.* 😂

## Contents

- [Installation](#installation)
- [Usage](#usage) 
- [Filters](#filters)
- [Directives](#directives)
- [Updates](#updates) (New updates as of July 29, 2017 PHT)
- [Debug](#debug)
- [Contributing](https://github.com/jofftiquez/morphling/blob/master/CONTRIBUTING.md)
- [License](https://github.com/jofftiquez/morphling/blob/master/LICENSE)

## Filters

- [morph-capitalize](#morph-capitalize)
- [morph-chop](#morph-chop)
- [morph-currency](#morph-currency)
- [morph-date](#morph-date)
- [morph-json](#morph-json)
- [morph-lowercase](#morph-lowercase)
- [morph-placeholder](#morph-placeholder)
- [morph-replace](#morph-replace)
- [morph-reverse](#morph-reverse)
- [morph-sandwich](#morph-sandwich)
- [morph-truncate](#morph-truncate)
- [morph-uppercase](#morph-uppercase)

## Directives

- [morph-url](#morph-url) (exprimental | read limitations)

## Installation

**NPM**

`npm install morphling --save`

**Yarn**

`yarn add morphling`

## Usage

```
import Vue from 'vue';
import Morphling from 'morphling';

Vue.use(Morphling);
```

All filters are available in the Vue instance as well, so they can be use as `vm.$morphCapitalize` or `this.$morphCapitalize` if you are using single file component.

All directive name should be prepended with `v-`, `v-morph-url` like so.

# Morphling Filters

### morph-capitalize

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

Format any valid date using moment's `format()` function. 

*Syntax*

`morph-date(format)`

```html
<p>{{ new Date() | morph-date('MMM DD, YYYY') }}</p>
<!-- Jul 26, 2017 -->

<p>{{ new Date() | morph-date('YYYY') }}</p>
<!-- 2017 -->
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

### morph-json

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

### morph-placeholder

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

## Updates

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

`< >` with ❤️ by Jofferson Ramirez Tiquez







