import {
  age,
  arrReverse,
  arrSort,
  capitalize,
  chop,
  currency,
  dateFormat,
  fileSize,
  json,
  lowerCase,
  objectSize,
  placeholder,
  replace,
  reverse,
  sandwich,
  truncate,
  uppercase
} from './filters';

import {
  email,
  highlight,
  url
} from './directives';

import { registerDirective, registerFilter } from './utils/register';

const filters = [age, arrReverse, arrSort, capitalize, chop, currency, dateFormat, fileSize, json, lowerCase, objectSize, placeholder, replace, reverse, sandwich, truncate, uppercase];
const directives = [email, highlight, url];

const filterPlugin = (definition) => ({
  install (app) {
    registerFilter(app, definition);
  }
});

const directivePlugin = (definition) => ({
  install (app) {
    registerDirective(app, definition);
  }
});

// Directives
export const vMorphHighlight = directivePlugin(highlight);
export const vMorphUrl = directivePlugin(url);
export const vMorphEmail = directivePlugin(email);

// Filters
export const morphAge = filterPlugin(age);
export const morphArrReverse = filterPlugin(arrReverse);
export const morphArrSort = filterPlugin(arrSort);
export const morphCapitalize = filterPlugin(capitalize);
export const morphChop = filterPlugin(chop);
export const morphCurrency = filterPlugin(currency);
export const morphDateFormat = filterPlugin(dateFormat);
export const morphFileSize = filterPlugin(fileSize);
export const morphJson = filterPlugin(json);
export const morphLowerCase = filterPlugin(lowerCase);
export const morphObjectSize = filterPlugin(objectSize);
export const morphPlaceholder = filterPlugin(placeholder);
export const morphReplace = filterPlugin(replace);
export const morphReverse = filterPlugin(reverse);
export const morphSandwich = filterPlugin(sandwich);
export const morphTruncate = filterPlugin(truncate);
export const morphUpperCase = filterPlugin(uppercase);

// The plain functions behind every filter, keyed like their `$morph*` method
// (`$morphCapitalize` -> `morphFilters.capitalize`). Handy in Vue 3
// `<script setup>`, where global properties are not in scope.
export const morphFilters = Object.fromEntries(filters.map(({ method, fn }) => [
  method.charAt(6).toLowerCase() + method.slice(7),
  fn
]));

export const VueMorphling = {
  install (app) {
    directives.forEach(definition => registerDirective(app, definition));
    filters.forEach(definition => registerFilter(app, definition));
  }
};
