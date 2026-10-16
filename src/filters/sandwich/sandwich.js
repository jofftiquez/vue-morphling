const corpus = {
  '<': '>',
  '>': '<',
  '[': ']',
  ']': '[',
  '(': ')',
  ')': '(',
  '{': '}',
  '}': '{'
};
const corpusRegex = /(<|>|\[|\]|\(|\)|\{|\})/g;

function flip (str) {
  return str.replace(corpusRegex, match => corpus[match])
    .split('')
    .reverse()
    .join('');
}

function morphSandwich (value, start, end) {
  start = start || '';
  end = end || flip(start);

  return `${start}${value}${end}`;
}

export const sandwich = { filter: 'morph-sandwich', method: '$morphSandwich', fn: morphSandwich };
