import {
  age,
  arrReverse,
  arrSort,
  capitalize,
  chop,
  currency,
  date,
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

// Directives
export const vMorphHighlight = {
  install(Vue, options) {
    highlight(Vue, options);
  }
}

export const vMorphUrl = {
  install(Vue, options) {
    url(Vue, options);
  }
}

export const vMorphEmail = {
  install(Vue, options) {
    email(Vue, options);
  }
}

// Filters
export const morphAge = {
  install(Vue, options) {
    age(Vue, options);
  }
}

export const morphArrReverse = {
  install(Vue, options) {
    arrReverse(Vue, options);
  }
}

export const morphArrSort = {
  install(Vue, options) {
    arrSort(Vue, options);
  }
}

export const morphCapitalize = {
  install(Vue, options) {
    capitalize(Vue, options);
  }
}

export const morphChop = {
  install(Vue, options) {
    chop(Vue, options);
  }
}

export const morphCurrency = {
  install(Vue, options) {
    currency(Vue, options);
  }
}

export const morphDate = {
  install(Vue, options) {
    date(Vue, options);
  }
}

export const morphFileSize = {
  install(Vue, options) {
    fileSize(Vue, options);
  }
}

export const morphJson = {
  install(Vue, options) {
    json(Vue, options);
  }
}

export const morphLowerCase = {
  install(Vue, options) {
    lowerCase(Vue, options);
  }
}

export const morphObjectSize = {
  install(Vue, options) {
    objectSize(Vue, options);
  }
}

export const morphPlaceholder = {
  install(Vue, options) {
    placeholder(Vue, options);
  }
}

export const morphReplace = {
  install(Vue, options) {
    replace(Vue, options);
  }
}

export const morphReverse = {
  install(Vue, options) {
    reverse(Vue, options);
  }
}

export const morphSandwich = {
  install(Vue, options) {
    sandwich(Vue, options);
  }
}

export const morphTruncate = {
  install(Vue, options) {
    truncate(Vue, options);
  }
}

export const morphUpperCase = {
  install(Vue, options) {
    uppercase(Vue, options);
  }
}

export const VueMorphling = {
  install(Vue, options) {
    // directives
    email(Vue, options);
    highlight(Vue, options);
    url(Vue, options);
    // filters
    age(Vue, options);
    arrReverse(Vue, options);
    arrSort(Vue, options);
    capitalize(Vue, options);
    chop(Vue, options);
    currency(Vue, options);
    date(Vue, options);
    fileSize(Vue, options);
    json(Vue, options);
    lowerCase(Vue, options);
    objectSize(Vue, options);
    placeholder(Vue, options);
    releaseEvents(Vue, options);
    reverse(Vue, options);
    sandwich(Vue, options);
    truncate(Vue, options);
    uppercase(Vue, options);
  }
}