import { formatBytes } from '../../lib/format-bytes';
import { utf8Length } from '../../lib/utf8-length';

function morphObjectSize (value, option) {
  // JSON.stringify returns undefined for undefined, functions and symbols.
  const json = JSON.stringify(value);
  return formatBytes(json === undefined ? 0 : utf8Length(json), option);
}

export const objectSize = { filter: 'morph-object-size', method: '$morphObjectSize', fn: morphObjectSize };
