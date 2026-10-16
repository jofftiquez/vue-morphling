const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;

// `new Date('1990-01-15')` is UTC midnight, which is the previous day west of
// UTC. A birthday has no time zone, so read date-only strings as local dates.
function toBirthday (date) {
  if (date instanceof Date) return date;
  const parts = typeof date === 'string' && date.match(dateOnly);
  return parts ? new Date(+parts[1], parts[2] - 1, +parts[3]) : new Date(date);
}

function morphAge (date) {
  const today = new Date();
  const birthday = toBirthday(date);
  const age = today.getFullYear() - birthday.getFullYear();
  const months = today.getMonth() - birthday.getMonth();
  const birthdayPending = months < 0 || (months === 0 && today.getDate() < birthday.getDate());
  return birthdayPending ? age - 1 : age;
}

export const age = { filter: 'morph-age', method: '$morphAge', fn: morphAge };
