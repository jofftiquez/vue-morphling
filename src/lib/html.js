const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml (value) {
  return String(value).replace(/[&<>"']/g, char => entities[char]);
}

export function escapeRegExp (value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Rebuilds `text` as HTML: every match of the global regex `re` goes through
// `toHtml`, everything else is escaped. Returns null when nothing matches.
export function replaceMatches (text, re, toHtml) {
  let html = '';
  let last = 0;
  let matched = false;
  for (const match of text.matchAll(re)) {
    html += escapeHtml(text.slice(last, match.index)) + toHtml(match[0]);
    last = match.index + match[0].length;
    matched = true;
  }
  if (!matched) return null;
  return html + escapeHtml(text.slice(last));
}
