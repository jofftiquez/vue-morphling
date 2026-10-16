import { escapeHtml, escapeRegExp, replaceMatches } from '../../lib/html';

export const highlight = (Vue) => {
  Vue.directive('morph-highlight', {
    bind
  });

  function bind (el, binding) {
    if (!binding.value) return;
    const [term, color = ''] = binding.value.split('::');
    if (!term) return;
    const html = replaceMatches(el.textContent, new RegExp(escapeRegExp(term), 'gi'), match =>
      `<mark style="background-color: ${escapeHtml(color)}">${escapeHtml(match)}</mark>`
    );
    if (html !== null) el.innerHTML = html;
  }
};
