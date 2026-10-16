import { format } from 'date-fns';

function morphDateFormat (value, formatting) {
  return format(value, formatting);
}

export const dateFormat = { filter: 'morph-date-format', method: '$morphDateFormat', fn: morphDateFormat };
