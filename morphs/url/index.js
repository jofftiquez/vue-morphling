// URL regex only recognizes letters, numbers, dot, slash, and hyphen for now
// for simplicity
const urlRegex
  = /(https?:\/\/)?[A-Za-z0-9/.-]+\.[a-z]{2,6}\b\/?[A-Za-z0-9/.-]*/g;

const surroundAnchor = str => `<a href="${str}">${str}</a>`;

function morphUrl(str) {
  if (!str || typeof str !== 'string') {
    throw new Error('Cannot morph non-string.');
  }

  return str.replace(urlRegex, surroundAnchor);
}

