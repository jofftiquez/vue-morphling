import { escapeHtml, replaceMatches } from '../../lib/html';

const re = /\b(https|http|ftp)?:\/\/\S+/gi;

function apply (el, binding) {
  const html = replaceMatches(el.textContent, re, link =>
    `<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(link)}" style="${escapeHtml(binding.value || '')}">${escapeHtml(link)}</a>`
  );
  if (html !== null) el.innerHTML = html;
}

export const url = { directive: 'morph-url', apply };
