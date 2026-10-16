function morphReplace (value, replacee, replacer) {
  return value.replace(replacee, replacer);
}

export const replace = { filter: 'morph-replace', method: '$morphReplace', fn: morphReplace };
