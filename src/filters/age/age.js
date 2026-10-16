function morphAge (date) {
  const today = new Date();
  const birthday = date instanceof Date ? date : new Date(date);
  const age = today.getFullYear() - birthday.getFullYear();
  const months = today.getMonth() - birthday.getMonth();
  const birthdayPending = months < 0 || (months === 0 && today.getDate() < birthday.getDate());
  return birthdayPending ? age - 1 : age;
}

export const age = { filter: 'morph-age', method: '$morphAge', fn: morphAge };
