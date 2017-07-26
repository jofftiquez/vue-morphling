# Mophling

A collection of VueJs filters.

## Filters

[morph-capitalize](#morph-capitalize)

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
-----------------------------

### morph-capitalize

```html
<p>{{ 'rampage!' | morph-capitalize}}</p>
<!-- Rampage! -->
```

```javascript
const msg = this.$morphCapitalize('rampage!');
console.log(msg); // Rampage!
```
