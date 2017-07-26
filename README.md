# Mophling

A collection of VueJs filters.

## Filters

- [morph-capitalize](#morph-capitalize)
- [morph-chop](#morph-chop)
- [morph-date](#morph-date)
- [morph-json](#morph-json)
- [morph-lowercase](#morph-lowercase)
- [morph-reverse](#morph-reverse)
- [morph-uppercase](#morph-uppercase)
- [License](#License)

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

------

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

### License 

**MIT**

Copyright (c) 2017 Jofferson R Tiquez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

`< >` with ❤️ by Jofferson Ramirez Tiquez







