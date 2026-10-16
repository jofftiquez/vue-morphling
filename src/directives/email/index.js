import { escapeHtml, replaceMatches } from '../../lib/html';

// RFC 5322 pattern: control characters and escapes are intentional.
// eslint-disable-next-line no-control-regex, no-useless-escape
const re = /(?:[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

export const email = (Vue) => {
  Vue.directive('morph-email', {
    bind
  });

  function bind (el) {
    const html = replaceMatches(el.textContent, re, address =>
      `<a target="_blank" rel="noopener noreferrer" href="mailto:${escapeHtml(address)}">${escapeHtml(address)}</a>`
    );
    if (html !== null) el.innerHTML = html;
  }
};
