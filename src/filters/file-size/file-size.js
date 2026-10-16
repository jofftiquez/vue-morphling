import { formatBytes } from '../../lib/format-bytes';

function morphFileSize (value, option) {
  const num = +value;
  if (Number.isNaN(num)) {
    console.warn('Warn: value must be a number.');
    return;
  }
  return formatBytes(num, option);
}

export const fileSize = { filter: 'morph-file-size', method: '$morphFileSize', fn: morphFileSize };
